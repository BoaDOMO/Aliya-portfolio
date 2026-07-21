import { useState, useRef, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Buildings } from "@phosphor-icons/react"
import Dashboard from "@/components/rag/dashboard"
import ChatArea from "@/components/rag/chat-area"
import KBEditor from "@/components/rag/kb-editor"
import type { ChatMessage } from "@/components/rag/chat-area"

interface Persona {
  company: string
  role: string
  instructions: string
}

interface KB {
  about: string
  products: string
  faq: string
  policies: string
}

interface Template {
  icon: string
  company: string
  tag: string
  role: string
  instructions: string
  about: string
  products: string
  faq: string
  policies: string
}

type Status = "ready" | "retrieving" | "generating" | "offline"
type PipelineStage = -1 | 0 | 1 | 2 | 3

const DEFAULT_PERSONA: Persona = {
  company: "Nova Finance",
  role: "Nova Finance AI Assistant",
  instructions:
    "You are a helpful AI customer service assistant for Nova Finance, a digital-first microfinance institution in Cambodia. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate. Do not make up information.",
}

const DEFAULT_KB: KB = {
  about:
    "Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces.",
  products:
    "Personal Loan: $200\u2013$10,000 | 3\u201336 months | From 1.2% per month\n\nBusiness Loan: $1,000\u2013$50,000 | 6\u201360 months | From 1.0% per month\n\nNova Savings Account: 5.5% annual interest | Minimum deposit $50\n\nNova Digital Wallet: Free instant transfers | 0.5% cashback on purchases",
  faq: "Q: How do I apply for a loan?\nA: Apply online at novafinance.com.kh or through the Nova Finance mobile app.\n\nQ: What documents do I need?\nA: Valid Cambodian National ID or Passport and last 3 months of bank statements.\n\nQ: How long does approval take?\nA: Within 4 business hours.\n\nQ: Can I repay my loan early?\nA: Yes, with no early repayment penalties.",
  policies:
    "Eligibility: Applicants must be aged 18\u201365 with a minimum monthly income of $250.\n\nData Privacy: Compliant with Cambodian Law on Data Privacy.\n\nSecurity: AES-256 encryption with quarterly security audits.",
}

const TEMPLATES: Template[] = [
  { icon: "\u{1F3E6}", company: "Nova Finance", tag: "Finance", role: "Nova Finance AI Assistant", instructions: "You are a helpful AI customer service assistant for Nova Finance, a digital-first microfinance institution in Cambodia. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate. Do not make up information.", about: "Nova Finance is a digital-first microfinance institution founded in 2020, headquartered in Phnom Penh, Cambodia. Licensed by the National Bank of Cambodia, we serve over 50,000 customers across 25 provinces.", products: "Personal Loan: $200\u2013$10,000 | 3\u201336 months | From 1.2% per month\n\nBusiness Loan: $1,000\u2013$50,000 | 6\u201360 months | From 1.0% per month\n\nNova Savings Account: 5.5% annual interest | Minimum deposit $50\n\nNova Digital Wallet: Free instant transfers | 0.5% cashback on purchases", faq: "Q: How do I apply for a loan?\nA: Apply online at novafinance.com.kh or through the Nova Finance mobile app.\n\nQ: What documents do I need?\nA: Valid Cambodian National ID or Passport and last 3 months of bank statements.\n\nQ: How long does approval take?\nA: Within 4 business hours.\n\nQ: Can I repay my loan early?\nA: Yes, with no early repayment penalties.", policies: "Eligibility: Applicants must be aged 18\u201365 with a minimum monthly income of $250.\n\nData Privacy: Compliant with Cambodian Law on Data Privacy.\n\nSecurity: AES-256 encryption with quarterly security audits." },
  { icon: "\u{1F33F}", company: "GreenLeaf Organics", tag: "E-commerce", role: "GreenLeaf Organics AI Assistant", instructions: "You are a helpful AI assistant for GreenLeaf Organics, an online organic grocery store. Answer questions based ONLY on the knowledge base provided. Be concise, friendly, and accurate.", about: "GreenLeaf Organics is an online marketplace for organic and sustainably sourced groceries, founded in 2021. We deliver fresh produce, pantry staples, and eco-friendly household products across major cities.", products: "Organic Produce Box: $35/week | Seasonal fruits and vegetables | Free delivery\n\nPantry Starter Pack: $60 | Grains, spices, oils, and legumes\n\nMeal Kit Subscription: $45/week | 3 recipes with pre-portioned ingredients\n\nEco-Home Bundle: $25 | Bamboo utensils, beeswax wraps, compostable bags", faq: "Q: Where do you deliver?\nA: We deliver to all major metropolitan areas.\n\nQ: What is your return policy?\nA: We guarantee freshness. Report issues within 24 hours for a full refund.\n\nQ: How often do subscriptions renew?\nA: Weekly, auto-renew every Monday. Skip or cancel anytime.", policies: "Delivery: Available within city limits. Minimum order $20.\n\nReturns: Perishable items reported within 24 hours. Non-perishables within 7 days.\n\nPrivacy: We never share customer data with third parties." },
  { icon: "\u{1F3E8}", company: "Skyline Hotels", tag: "Hospitality", role: "Skyline Hotels AI Assistant", instructions: "You are a helpful concierge AI for Skyline Hotels, a luxury hotel chain. Answer questions based ONLY on the knowledge base provided. Be polite, professional, and accurate.", about: "Skyline Hotels is a luxury hotel chain with 12 properties across Southeast Asia, established in 2015. We specialize in boutique accommodations with rooftop infinity pools and fine dining.", products: "Skyline Suite: $350/night | City view | King bed | 24h butler service\n\nDeluxe Room: $180/night | Partial skyline view | Premium amenities\n\nSpa Package: $120 | 60-min massage + sauna + herbal tea", faq: "Q: What time is check-in/check-out?\nA: Check-in from 3 PM, check-out by 11 AM.\n\nQ: Do you allow pets?\nA: Yes, small pets under 10kg welcome with a $50 cleaning fee.\n\nQ: Is breakfast included?\nA: Yes, complimentary buffet breakfast from 6:30 to 10:30 AM daily.", policies: "Check-in: 3 PM. Early check-in subject to availability.\n\nCancellation: Free up to 48 hours. 50% charge within 24 hours.\n\nSmoking: Non-smoking in rooms. Designated areas on level 3." },
  { icon: "\u{1F916}", company: "Acme Robotics", tag: "Technology", role: "Acme Robotics AI Assistant", instructions: "You are a helpful AI assistant for Acme Robotics, a robotics manufacturing company. Answer questions based ONLY on the knowledge base provided. Be precise and technical where appropriate.", about: "Acme Robotics designs and manufactures industrial and consumer robotics solutions. Founded in 2018, we serve over 200 manufacturing facilities globally.", products: "PickBot 3000: $12,000 | Industrial arm | 50kg payload | 6-axis\n\nHomeMate: $899 | Home companion | Voice-controlled | Navigation\n\nWarehouse Drone System: $25,000 | Inventory scanning | Autonomous fleet", faq: "Q: What is the warranty period?\nA: 2 years industrial, 1 year consumer.\n\nQ: Do you provide training?\nA: Yes, free online training for all industrial robot purchases.\n\nQ: Can HomeMate integrate with smart home systems?\nA: Yes, compatible with Alexa, Google Home, and Apple HomeKit.", policies: "Warranty: 2 years industrial, 1 year consumer. Extended warranty available.\n\nReturns: Unopened products returned within 30 days for full refund.\n\nCompliance: All products meet ISO 10218 safety standards." },
  { icon: "\u{1F4AA}", company: "Pulse Fitness", tag: "Fitness", role: "Pulse Fitness AI Assistant", instructions: "You are a helpful AI assistant for Pulse Fitness, a modern gym and wellness chain. Answer questions based ONLY on the knowledge base provided. Be motivating and concise.", about: "Pulse Fitness is a modern fitness chain with 25 locations, founded in 2019. We offer state-of-the-art equipment, group classes, personal training, and nutritional counseling.", products: "Premium Membership: $79/month | Unlimited classes | Gym access | Sauna\n\nBasic Plan: $39/month | Gym access during staffed hours | Locker\n\nPersonal Training: $60/session | 1-on-1 coaching | Customized plan", faq: "Q: What are your hours?\nA: Most locations open 5 AM to 11 PM, 7 days a week.\n\nQ: Is there a joining fee?\nA: Currently waived.\n\nQ: Can I freeze my membership?\nA: Yes, freeze for up to 3 months at $10/month.", policies: "Membership: Month-to-month or annual. 30-day cancellation notice.\n\nGuest Policy: Members may bring one guest per visit. $10 guest fee.\n\nCode of Conduct: Respectful behavior required." },
  { icon: "\u2615", company: "Brew & Bean", tag: "Food & Beverage", role: "Brew & Bean AI Assistant", instructions: "You are a helpful AI assistant for Brew & Bean, a specialty coffee roastery and cafe chain. Answer questions based ONLY on the knowledge base provided. Be warm and friendly.", about: "Brew & Bean is a specialty coffee company founded in 2017, with 15 cafes and an online bean subscription service. We source single-origin beans directly from farmers.", products: "Coffee Subscription: $24/month | 12oz single-origin | Free shipping\n\nEspresso Blend: $16/bag | Medium-dark roast | Chocolate & caramel notes\n\nCafe Gift Card: $25-$100 | Redeemable at all locations", faq: "Q: Where do you source your beans?\nA: Direct trade from Ethiopia, Colombia, Guatemala, and Vietnam.\n\nQ: How fresh is the coffee?\nA: Roasted within 48 hours of shipping.\n\nQ: Do you have dairy-free options?\nA: Yes, oat, almond, and soy milk at all cafes.", policies: "Shipping: Free on orders over $30. Delivered within 3-5 business days.\n\nReturns: 100% satisfaction guarantee within 14 days.\n\nCafe Policy: Laptop-friendly until 4 PM." },
  { icon: "\u2601\uFE0F", company: "CloudHive", tag: "SaaS", role: "CloudHive AI Assistant", instructions: "You are a helpful AI assistant for CloudHive, a cloud infrastructure and DevOps platform. Answer questions based ONLY on the knowledge base provided. Be technical and precise.", about: "CloudHive provides cloud infrastructure, DevOps tools, and managed hosting solutions for startups and mid-size businesses. Founded in 2020, we serve over 5,000 businesses across 40 countries.", products: "Hive Starter: $29/month | 2 vCPUs | 4GB RAM | 50GB SSD | 1TB transfer\n\nHive Pro: $99/month | 4 vCPUs | 16GB RAM | 200GB SSD | 5TB transfer\n\nManaged Kubernetes: $199/month | 3-node cluster | Auto-scaling", faq: "Q: What is your uptime SLA?\nA: 99.95% uptime guarantee across all paid plans.\n\nQ: Do you offer a free tier?\nA: Yes, Hive Free plan includes 1 vCPU, 1GB RAM, 10GB SSD.\n\nQ: What support options are available?\nA: 24/7 live chat, email support, and phone support for Enterprise.", policies: "SLA: 99.95% uptime. Credits issued for downtime.\n\nSecurity: SOC 2 Type II certified. Data encrypted at rest and in transit.\n\nCancellation: Cancel anytime. Data exported within 30 days." },
  { icon: "\u{1F3A8}", company: "Artisan Studio", tag: "Creative", role: "Artisan Studio AI Assistant", instructions: "You are a helpful AI assistant for Artisan Studio, a creative agency offering design, branding, and digital marketing services. Answer questions based ONLY on the knowledge base provided. Be creative and professional.", about: "Artisan Studio is a full-service creative agency founded in 2016. We specialize in branding, web design, illustration, and social media strategy.", products: "Brand Identity Package: $3,500 | Logo + color palette + typography + guidelines\n\nWebsite Design: $5,000+ | Custom | 5 pages | Responsive | CMS\n\nSocial Media Kit: $1,200/month | 12 posts | 4 stories | Analytics", faq: "Q: How long does a brand identity project take?\nA: Typically 3-4 weeks.\n\nQ: Do you offer revisions?\nA: Yes, each package includes 2 rounds at no extra cost.\n\nQ: Can you work within a specific brand style?\nA: Absolutely. We adapt to your existing brand.", policies: "Pricing: 50% deposit to start, 50% upon delivery.\n\nRevisions: 2 rounds included. Additional at $100/hr.\n\nLicensing: Full commercial rights upon final payment." },
  { icon: "\u{1F697}", company: "EcoRide", tag: "Transportation", role: "EcoRide AI Assistant", instructions: "You are a helpful AI assistant for EcoRide, an electric scooter and bike sharing service. Answer questions based ONLY on the knowledge base provided. Be friendly and helpful.", about: "EcoRide is a micro-mobility company offering electric scooter and bike sharing services in 30+ cities. Founded in 2022, we provide affordable, eco-friendly last-mile transportation.", products: "Pay-Per-Ride: $1 unlock + $0.30/min | No commitment\n\nDay Pass: $15 | Unlimited 30-min rides for 24 hours\n\nMonthly Commuter: $49 | 120 minutes daily | Priority parking", faq: "Q: How do I unlock a scooter?\nA: Download the EcoRide app and scan the QR code.\n\nQ: Where can I park?\nA: Park in designated zones marked in the app.\n\nQ: Are helmets provided?\nA: Helmet locks available on select scooters.", policies: "Age Requirement: Minimum 18 years old.\n\nRiding Rules: Follow traffic laws. Max speed 20 km/h.\n\nDamage Policy: Report damage immediately. Users responsible for negligence." },
  { icon: "\u{1F3E5}", company: "MedFlow", tag: "Healthcare", role: "MedFlow AI Assistant", instructions: "You are a helpful AI assistant for MedFlow, a telemedicine and healthcare platform. Answer questions based ONLY on the knowledge base provided. Be professional, empathetic, and accurate.", about: "MedFlow is a digital healthcare platform connecting patients with licensed physicians via video consultation. Founded in 2020, we have facilitated over 500,000 consultations.", products: "General Consultation: $49 | 15-min video call | Prescription if needed\n\nSpecialist Visit: $89 | 20-min video call | Cardiology, dermatology, etc.\n\nMental Health Session: $65 | 30-min therapy | Licensed psychologist", faq: "Q: How quickly can I see a doctor?\nA: Average wait time is under 10 minutes.\n\nQ: Do you accept insurance?\nA: Yes, we accept most major insurance plans.\n\nQ: Can I get a prescription?\nA: Yes, doctors can prescribe electronically to your pharmacy.", policies: "Privacy: HIPAA compliant. All consultations encrypted and confidential.\n\nCancellation: Free up to 2 hours before appointment.\n\nRefund: Full refund if doctor unable to address your concern." },
  { icon: "\u{1F4DA}", company: "LearnPath", tag: "Education", role: "LearnPath AI Assistant", instructions: "You are a helpful AI assistant for LearnPath, an online learning platform. Answer questions based ONLY on the knowledge base provided. Be encouraging, clear, and accurate.", about: "LearnPath is an online education platform founded in 2019, offering 500+ courses in tech, design, and business. We serve over 200,000 students worldwide.", products: "Individual Plan: $29/month | Unlimited courses | Certificates\n\nTeam Plan: $99/month per seat | Team dashboard | Tracking\n\nBootcamp: $1,499 | 12-week intensive | Mentor-led | Career support", faq: "Q: Can I learn at my own pace?\nA: Yes, all courses are self-paced with lifetime access.\n\nQ: Do you offer refunds?\nA: Full refund within 14 days if you're not satisfied.\n\nQ: Are courses accredited?\nA: Our certificates are recognized by 1,000+ partner companies.", policies: "Refund: Full refund within 14 days of purchase.\n\nAccess: Lifetime access to purchased courses.\n\nPrivacy: Student data is never shared with third parties." },
  { icon: "\u{1F4E1}", company: "WaveConnect", tag: "Telecom", role: "WaveConnect AI Assistant", instructions: "You are a helpful AI assistant for WaveConnect, a telecommunications provider. Answer questions based ONLY on the knowledge base provided. Be friendly, clear, and accurate.", about: "WaveConnect is a telecommunications provider offering mobile, fiber internet, and TV services across 15 countries. Founded in 2010, we serve over 10 million customers.", products: "Mobile Plan: $25/month | Unlimited calls | 50GB 5G data\n\nFiber Internet: $45/month | 500Mbps | Unlimited data\n\nTV Bundle: $60/month | 120 channels | Netflix included", faq: "Q: What is your 5G coverage area?\nA: Check our coverage map at waveconnect.com/coverage.\n\nQ: Is there a contract?\nA: No, all plans are month-to-month.\n\nQ: How do I pay my bill?\nA: Via the WaveConnect app, website, or auto-pay.", policies: "Cancellation: No fees. Cancel anytime with 30 days notice.\n\nEquipment: Return routers within 14 days of cancellation.\n\nFair Usage: 500GB/month cap on home internet." },
]

const STORAGE_KEY = "rag_rag_state"

interface SavedState {
  persona: Persona
  kb: KB
  chatHistory: ChatMessage[]
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SavedState
    if (parsed.chatHistory) {
      parsed.chatHistory = parsed.chatHistory.map((m, i) => ({
        ...m,
        id: m.id || `restored-${i}`,
        timestamp: m.timestamp || Date.now(),
      }))
    }
    return parsed
  } catch {
    return null
  }
}

function saveState(persona: Persona, kb: KB, chatHistory: ChatMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ persona, kb, chatHistory }))
}

const KB_SECTIONS = [
  { key: "about" as const, label: "About", question: "What does {company} do?" },
  { key: "products" as const, label: "Products", question: "What products does {company} offer?" },
  { key: "faq" as const, label: "FAQ", question: "What are common questions about {company}?" },
  { key: "policies" as const, label: "Policies", question: "What are {company}'s policies?" },
]

function computeSuggestions(kb: KB, company: string): string[] {
  const result: string[] = []
  const chunks = KB_SECTIONS.filter((s) => kb[s.key] && kb[s.key].trim().length > 0)
  chunks.forEach((s) => result.push(s.question.replace("{company}", company)))
  return result.slice(0, 3)
}

function collectKB(kb: KB): string {
  return KB_SECTIONS.map((s) => {
    const val = kb[s.key]?.trim()
    return val ? `## ${s.label}\n${val}` : ""
  })
    .filter(Boolean)
    .join("\n\n")
}

export default function RAG() {
  const [saved] = useState(loadState)

  const [persona, setPersona] = useState<Persona>(() => saved?.persona ?? DEFAULT_PERSONA)
  const [kb, setKB] = useState<KB>(() => saved?.kb ?? DEFAULT_KB)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => saved?.chatHistory ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [pipelineStage, setPipelineStage] = useState<PipelineStage>(-1)
  const [status, setStatus] = useState<Status>("ready")
  const [responseTimes, setResponseTimes] = useState<number[]>([])
  const [companyOpen, setCompanyOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "kb">("chat")

  const [sessionId] = useState(() => crypto.randomUUID())
  const [sessionStart] = useState(() => Date.now())
  const abortRef = useRef<AbortController | null>(null)
  const pipelineTimersRef = useRef<number[]>([])

  const clearPipelineTimers = useCallback(() => {
    for (const timer of pipelineTimersRef.current) window.clearTimeout(timer)
    pipelineTimersRef.current = []
  }, [])

  useEffect(() => () => {
    abortRef.current?.abort()
    clearPipelineTimers()
  }, [clearPipelineTimers])

  // Page title
  useEffect(() => {
    document.title = `AI Assistant Lab \u2014 ${persona.company}`
    return () => { document.title = "Aliya Koy" }
  }, [persona.company])

  // Persist
  useEffect(() => {
    saveState(persona, kb, chatHistory)
  }, [persona, kb, chatHistory])

  const suggestions = computeSuggestions(kb, persona.company)

  const handleSend = useCallback(
    async (text: string) => {
      if (isLoading) return

      abortRef.current?.abort()
      clearPipelineTimers()
      const controller = new AbortController()
      abortRef.current = controller

      const userMsg: ChatMessage = {
        id: `msg-${crypto.randomUUID()}`,
        timestamp: Date.now(),
        role: "user",
        content: text,
      }
      setChatHistory((prev) => [...prev, userMsg])
      setIsLoading(true)
      setStatus("retrieving")
      setPipelineStage(0)

      const startTime = performance.now()

      pipelineTimersRef.current = [
        window.setTimeout(() => setPipelineStage(1), 200),
        window.setTimeout(() => setStatus("generating"), 300),
        window.setTimeout(() => setPipelineStage(2), 400),
      ]

      try {
        const res = await fetch("/api/chat", {
          signal: controller.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: text,
            knowledgeBase: collectKB(kb),
            persona: persona.instructions,
            history: chatHistory.slice(-10),
            sessionId,
            companyName: persona.company,
          }),
        })

        clearPipelineTimers()
        setPipelineStage(3)
        const body = await res.json()

        if (res.ok) {
          const botMsg: ChatMessage = {
            id: `msg-${crypto.randomUUID()}`,
            timestamp: Date.now(),
            role: "assistant",
            content: body.answer,
          }
          setChatHistory((prev) => [...prev, botMsg])
          setResponseTimes((prev) => {
            const next = [...prev, performance.now() - startTime]
            return next.length > 10 ? next.slice(-10) : next
          })
        } else {
          const errMsg: ChatMessage = {
            id: `msg-${crypto.randomUUID()}`,
            timestamp: Date.now(),
            role: "assistant",
            content: body.error || "Something went wrong.",
            isError: true,
          }
          setChatHistory((prev) => [...prev, errMsg])
        }
      } catch (err) {
        clearPipelineTimers()
        if (err instanceof DOMException && err.name === "AbortError") return
        setStatus("offline")
        const errMsg: ChatMessage = {
          id: `msg-${crypto.randomUUID()}`,
          timestamp: Date.now(),
          role: "assistant",
          content: "Could not reach the server. Please check your connection.",
          isError: true,
        }
        setChatHistory((prev) => [...prev, errMsg])
      }

      setIsLoading(false)
      pipelineTimersRef.current = [window.setTimeout(() => {
        setStatus("ready")
        setPipelineStage(-1)
      }, 600)]
    },
    [isLoading, persona, kb, chatHistory, sessionId, clearPipelineTimers]
  )

  const handleStop = useCallback(() => {
    abortRef.current?.abort()
    clearPipelineTimers()
    setIsLoading(false)
    setStatus("ready")
    setPipelineStage(-1)
  }, [clearPipelineTimers])

  const handleClear = useCallback(() => {
    setChatHistory([])
  }, [])

  const handleCopyLog = useCallback(() => {
    const text = chatHistory
      .map((m) => (m.role === "user" ? "You: " : "Bot: ") + m.content)
      .join("\n\n")
    if (!text) return
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      ta.remove()
    })
    toast.success("Copied!")
  }, [chatHistory])

  const handleSaveKB = useCallback((p: Persona, k: KB) => {
    setPersona(p)
    setKB(k)
  }, [])

  const handleSwitchCompany = useCallback((t: Template) => {
    setPersona({
      company: t.company,
      role: t.role,
      instructions: t.instructions,
    })
    setKB({
      about: t.about,
      products: t.products,
      faq: t.faq,
      policies: t.policies,
    })
    setChatHistory([])
    setCompanyOpen(false)
    toast(`Switched to ${t.company}. Chat reset.`)
  }, [])

  const msgCount = chatHistory.filter((m) => m.role === "user").length
  const avgTime =
    responseTimes.length > 0
      ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 1000).toFixed(1) + "s"
      : "\u2014"
  const kbFillCount = [kb.about, kb.products, kb.faq, kb.policies].filter((s) => s.trim().length > 0).length
  const recentMessages = chatHistory.slice(-3)

  return (
    <div className="flex flex-1 bg-tool-canvas">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-3 pt-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        <span className="inline-flex h-8 items-center gap-1 rounded-full bg-muted px-3 font-mono text-xs font-semibold text-muted-foreground">
          AI Assistant Lab
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Prompt · Inspect · Debug
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "kb")}>
            <TabsList className="h-8">
              <TabsTrigger value="chat" className="text-xs">
                Ask
              </TabsTrigger>
              <TabsTrigger value="kb" className="text-xs">
                Sources
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCompanyOpen(true)}
            className="font-mono text-xs"
          >
            <Buildings className="mr-1.5 h-3.5 w-3.5" />
            {persona.company}
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 gap-4 overflow-hidden pt-3">
        {/* Left: Dashboard - desktop */}
        <div className="hidden lg:block lg:w-[360px] xl:w-[400px]">
          <Dashboard
            status={status}
            pipelineStage={pipelineStage}
            msgCount={msgCount}
            avgTime={avgTime}
            companyName={persona.company}
            sessionStart={sessionStart}
            kbFillCount={kbFillCount}
            recentMessages={recentMessages}
            responseTimes={responseTimes}
            onReset={handleClear}
            onCopy={handleCopyLog}
            onOpenCompanyPicker={() => setCompanyOpen(true)}
          />
        </div>

        {/* Right: Switch toggle + content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {activeTab === "kb" ? (
            <KBEditor
              key={persona.company}
              persona={persona}
              kb={kb}
              onSave={handleSaveKB}
              className="w-full flex-1"
            />
          ) : (
            <ChatArea
              messages={chatHistory}
              isLoading={isLoading}
              companyName={persona.company}
              suggestions={suggestions}
              onSend={handleSend}
              onStop={handleStop}
            />
          )}
        </div>
      </div>

      {/* Company picker */}
        <Dialog open={companyOpen} onOpenChange={setCompanyOpen}>
        <DialogContent className="max-w-2xl lg:max-w-4xl">
          <DialogTitle className="sr-only">Choose a company</DialogTitle>
          <div className="space-y-1">
            <p className="font-display text-lg font-semibold">Switch demo scenario</p>
            <p className="text-sm text-muted-foreground">
              Try the same assistant logic with different source material.
              Switching will clear your current chat.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-3">
            {TEMPLATES.slice(0, 3).map((t) => (
              <button
                key={t.company}
                type="button"
                onClick={() => handleSwitchCompany(t)}
                className="flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors hover:border-primary hover:bg-accent"
              >
                <span className="text-2xl">{t.icon}</span>
                <span className="font-mono text-xs font-medium leading-tight">
                  {t.company}
                </span>
                <Badge
                  variant="secondary"
                  className="font-mono text-[10px] leading-none"
                >
                  {t.tag}
                </Badge>
              </button>
            ))}
          </div>
        </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

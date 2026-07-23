import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowUp,
  Bot,
  BookOpen,
  CircleAlert,
  CircleCheck,
  Clock,
  Headset,
  Inbox,
  MessageCircle,
  RotateCcw,
  StickyNote,
  X,
  WandSparkles,
} from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { BlurredBackground } from "@/components/blurred-background"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ToolAtmosphere } from "@/components/tool-shell"

type ThreadStatus = "open" | "pending" | "resolved"
type MessageRole = "customer" | "agent" | "note" | "event"
type ComposerMode = "reply" | "note"
type InboxFilter = "all" | ThreadStatus
type AssistState = "idle" | "loading" | "ready"
type CustomerAssistState = "idle" | "loading"

interface AgentMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  author?: string
  action?: "offer-handoff"
}

interface Thread {
  id: string
  name: string
  initials: string
  email: string
  preview: string
  lastActivity: string
  status: ThreadStatus
  unread: boolean
  handoffRequested: boolean
  tags: string[]
  plan: string
  messages: AgentMessage[]
}

const KNOWLEDGE_KEY = "groundwork-coffee-knowledge-v1"
const CHAT_SESSION_KEY = "groundwork-coffee-chat-workspace-v1"

interface PersistedChatSession {
  threads: Thread[]
  activeThreadId: string
  workspaceView: "chat" | "inbox"
  inboxFilter: InboxFilter
  sessionId: string
}

const DEFAULT_KNOWLEDGE = [
  "# Groundwork Coffee Co.",
  "",
  "Groundwork Coffee Co. is a neighbourhood coffee chain with six locations across the city. We roast our own beans in-house at the East Side Roastery, source directly from small farms, and serve espresso drinks, filter coffee, seasonal specials, pastries, and light food all day. Our goal is simple: great coffee without the attitude.",
  "",
  "# Locations and opening hours",
  "",
  "All six stores are open Monday to Friday 6:30 AM to 8:00 PM and Saturday to Sunday 7:30 AM to 7:00 PM. Public holidays follow Sunday hours unless a location posts otherwise on the door or the app. The East Side Roastery doubles as a café and is open to the public during the same hours; roastery tours run Saturday at 10:00 AM with a $10 fee redeemable against any purchase.",
  "",
  "Store addresses: Downtown (12 Commerce St), East Side Roastery (88 Mill Lane), Midtown (350 Park Ave, suite lobby), Riverside (4 Wharf Rd), Northgate (Unit 9, Northgate Mall), and Westwood (201 Garden Blvd). Each location's exact hours and any temporary closures are listed in the Groundwork app under Stores.",
  "",
  "# The menu",
  "",
  "Espresso drinks include: Espresso (single or double), Americano, Flat White, Cappuccino, Latte, Cortado, Macchiato, Oat Latte, and Dirty Chai. Filter coffee is batch-brewed every 30 minutes and is always available as a pourover on request. Cold brew is available at all stores from 8:00 AM until sold out.",
  "",
  "Milk options: whole, semi-skimmed, skimmed, oat (default dairy-free), almond, soy, and coconut. Oat and almond are included at no extra charge; soy and coconut carry a $0.50 surcharge. Decaf espresso is available at all stores.",
  "",
  "Food: all-day avocado toast, sourdough breakfast sandwich (egg, cheese, smoked bacon or plant-based patty), banana bread, almond croissant, seasonal fruit bowl, and a rotating grain bowl for lunch. Vegan items are marked (V) on the menu board and the app. Gluten-free bread is available as a swap for $1 extra.",
  "",
  "Drinks are available in three sizes: Small (8 oz), Regular (12 oz), and Large (16 oz). Iced versions of any espresso drink are available. Extra shots cost $0.75 each. Syrups (vanilla, caramel, hazelnut, brown sugar, lavender) are $0.50 each.",
  "",
  "# Seasonal specials",
  "",
  "Groundwork releases a new seasonal menu every three months. The current season (Summer) features: Iced Mango Cold Brew, Coconut Cold Foam Latte, Strawberry Matcha (hot or iced), and Yuzu Sparkling Lemonade. Seasonal items are available while supplies last and are listed in the app under What's Seasonal. When a seasonal item sells out for the day, the app updates in real time.",
  "",
  "Limited single-origin filter coffees rotate monthly. The current single-origin is a washed Ethiopian Yirgacheffe with tasting notes of blueberry and jasmine, available as pourover or to purchase as whole beans (250 g bags, $22).",
  "",
  "# Loyalty programme — Groundwork Perks",
  "",
  "Groundwork Perks is free to join via the app or in-store. Every $1 spent earns 1 Perk Point. Rewards: 50 points = free add-on (extra shot, syrup, or milk upgrade); 100 points = free drink of any size; 200 points = free food item or retail bag of beans.",
  "",
  "Points are added automatically when you scan the app QR code at checkout or pay with a saved card in the app. Points cannot be added retroactively more than 7 days after a purchase, and only one QR code can be scanned per transaction. Points expire after 12 months of account inactivity.",
  "",
  "Birthday reward: members receive a free drink of any size during their birthday month. The birthday must be set in the app at least 48 hours before the visit. The birthday reward cannot be combined with a Perks redemption in the same transaction.",
  "",
  "Perk Points cannot be transferred between accounts, exchanged for cash, or used on catering orders. Dispute a missing points claim via the app under Help → Missing Points, or contact support. Resolution typically takes 2–3 business days.",
  "",
  "# Ordering ahead and the app",
  "",
  "The Groundwork app (iOS and Android) supports mobile ordering with a 10-minute pickup window. Orders can be placed up to 2 hours in advance. App orders earn Perks points automatically. The app also shows the live seasonal menu, store wait times, and a loyalty point balance.",
  "",
  "To cancel or modify a mobile order, you must do so within 2 minutes of placing it through the app. After that window, the order moves to the bar and cannot be changed. Refunds for cancelled orders are returned to the original payment method within 3–5 business days.",
  "",
  "If the app is unavailable, customers can order in-store or by calling the location directly. App account issues (password reset, payment method problems) can be resolved via the app's Help section or by contacting customer support.",
  "",
  "# Catering",
  "",
  "Groundwork offers catering for offices, events, and private bookings. The minimum catering order is $150, and orders must be placed at least 48 hours in advance via the catering enquiry form at groundworkcoffee.com/catering or by emailing catering@groundworkcoffee.com.",
  "",
  "Catering packages include: The Morning Box (serves 10–20, includes drip coffee, pastries, and fruit), The Espresso Bar (a barista + equipment on-site, 2-hour minimum, serves up to 50), and Custom Office Delivery (recurring weekly drops of whole beans or ground coffee with a filter machine option). Catering orders in the Downtown and Midtown areas can be delivered; other locations are collection only.",
  "",
  "Catering cancellations made more than 24 hours before the scheduled time receive a full refund. Cancellations within 24 hours forfeit a 50% deposit. The catering team will confirm all orders by email within 4 business hours.",
  "",
  "# Allergens and dietary information",
  "",
  "All Groundwork kitchens handle milk, eggs, gluten, nuts (including almonds and hazelnuts), sesame, and soy. Cross-contamination is possible, and we cannot guarantee any item is fully allergen-free. Customers with severe allergies should inform the barista before ordering so we can take extra care or advise on safer options.",
  "",
  "Vegan drinks: all espresso drinks made with oat or almond milk are vegan. Syrups (vanilla, caramel, hazelnut, brown sugar, lavender) are all vegan. The banana bread and grain bowl are vegan. The almond croissant contains butter and eggs and is not vegan.",
  "",
  "Nutrition and full allergen details for every menu item are available in the app under Menu → Allergen Info and on the printed allergen menu available at each store. Always ask a team member if unsure.",
  "",
  "# Retail and beans",
  "",
  "Whole bean and ground coffee is available to purchase in-store and online. Bag sizes: 250 g ($18–$22) and 500 g ($32–$38) depending on the origin. A subscription for fortnightly or monthly delivery of fresh-roasted beans is available at groundworkcoffee.com/subscribe and earns Perks points on every order.",
  "",
  "Retail merchandise (tumblers, branded tote bags, Fellow gear, Aeropress kits) is stocked at the Roastery and Downtown stores. Out-of-stock items can be requested for inter-store transfer with a 3–5 day lead time.",
  "",
  "# Quality, complaints, and feedback",
  "",
  "If a drink or food item is not right, let a barista know immediately and we will remake it. If an issue is raised after leaving the store, the customer can report it through the app under Help → Report an Issue within 24 hours, and a store credit or complimentary drink will be issued at a manager's discretion.",
  "",
  "Formal complaints about staff conduct, safety concerns, or recurring quality problems should be directed to hello@groundworkcoffee.com or through the chat's human support handoff. Groundwork responds to all written complaints within 2 business days.",
  "",
  "# Human support",
  "",
  "Offer a human support teammate for account-specific billing issues, missing Perks points disputes, catering enquiries, safety or conduct concerns, complaints that need manager escalation, or anything this assistant cannot clearly answer. Always ask the customer for their preferred contact method (email or phone) before closing the handoff.",
].join("\n")

function message(
  role: MessageRole,
  content: string,
  minutesAgo: number,
  author?: string
): AgentMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now() - minutesAgo * 60_000,
    author,
  }
}

function createSeedThreads(): Thread[] {
  return [
    {
      id: "simulator",
      name: "Customer",
      initials: "CU",
      email: "Customer chat",
      preview: "Welcome message",
      lastActivity: "now",
      status: "open",
      unread: false,
      handoffRequested: false,
      tags: ["customer"],
      plan: "Perks member",
      messages: [
        message(
          "agent",
          "Hey! Welcome to Groundwork Coffee Co. I can help with our menu, seasonal specials, Perks loyalty rewards, mobile ordering, catering, and more. What can I help you with?",
          0,
          "Groundwork Coffee"
        ),
      ],
    },
  ]
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })
}

function loadKnowledge() {
  try {
    return localStorage.getItem(KNOWLEDGE_KEY) || DEFAULT_KNOWLEDGE
  } catch {
    return DEFAULT_KNOWLEDGE
  }
}

function loadChatSession(): PersistedChatSession | null {
  try {
    const stored = localStorage.getItem(CHAT_SESSION_KEY)
    if (!stored) return null

    const session = JSON.parse(stored) as Partial<PersistedChatSession>
    if (!Array.isArray(session.threads) || session.threads.length === 0) return null
    if (typeof session.activeThreadId !== "string" || typeof session.sessionId !== "string") return null
    if (session.workspaceView !== "chat" && session.workspaceView !== "inbox") return null
    if (!["all", "open", "pending", "resolved"].includes(session.inboxFilter || "")) return null
    if (!session.threads.some((thread) => thread.id === session.activeThreadId)) return null

    return session as PersistedChatSession
  } catch {
    return null
  }
}

function fallbackSuggestion(question: string) {
  const normalized = question.toLowerCase()

  if (/\b(open|opening|hours|close|closing|when)\b/.test(normalized)) {
    return "All Groundwork stores are open Monday–Friday 6:30 AM–8:00 PM and Saturday–Sunday 7:30 AM–7:00 PM. Check the app under Stores for individual location hours."
  }

  if (/\b(point|perk|reward|loyalty|redeem|earn)\b/.test(normalized)) {
    return "Groundwork Perks earns 1 point per $1 spent. Redeem at 50, 100, or 200 points for add-ons, free drinks, or food items. Scan your app QR code at checkout to earn."
  }

  if (/\b(cater|catering|event|office|deliver)\b/.test(normalized)) {
    return "Catering orders (min. $150) must be placed 48 hours in advance via groundworkcoffee.com/catering or catering@groundworkcoffee.com. Packages include The Morning Box, Espresso Bar, and Custom Office Delivery."
  }

  if (/\b(menu|drink|coffee|milk|syrup|food|vegan|allerg|gluten)\b/.test(normalized)) {
    return "Groundwork serves espresso drinks, filter, cold brew, and seasonal specials. Oat and almond milk are included at no extra charge. Full allergen info is in the app under Menu → Allergen Info."
  }

  if (/\b(season|special|limited|summer|new)\b/.test(normalized)) {
    return "The current Summer seasonal menu includes Iced Mango Cold Brew, Coconut Cold Foam Latte, Strawberry Matcha, and Yuzu Sparkling Lemonade — available while supplies last."
  }

  return "I can help with Groundwork's menu, Perks loyalty rewards, seasonal drinks, mobile ordering, catering, and store locations."
}

function normalizeMessage(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function isExplicitHumanRequest(value: string) {
  const normalized = normalizeMessage(value)
  if (/^(human|agent|support|person|representative)$/.test(normalized)) return true

  return (
    /\b(talk|speak|chat|connect|transfer|contact|request|get|need|want)\b.{0,28}\b(human|person|someone|agent|representative|support)\b/.test(
      normalized
    ) ||
    /\b(human|person|someone|agent|representative|support)\b.{0,28}\b(talk|speak|chat|connect|help|please)\b/.test(
      normalized
    )
  )
}

function isAffirmative(value: string) {
  return /^(yes|yep|yeah|sure|okay|ok|please|yes please|sure please|that would be great)$/.test(
    normalizeMessage(value)
  )
}

function isNegative(value: string) {
  return /^(no|nope|nah|not now|no thanks|no thank you|maybe later)$/.test(
    normalizeMessage(value)
  )
}

function fallbackCustomerAnswer(
  question: string,
  history: AgentMessage[]
): {
  content: string
  offerHandoff?: boolean
} {
  const normalized = normalizeMessage(question)
  const previousCustomerMessage = [...history]
    .reverse()
    .find((item) => item.role === "customer")?.content
  const previousTopic = normalizeMessage(previousCustomerMessage || "")
  const contextualQuestion =
    /^(it|that|this|and|but)\b/.test(normalized) || normalized.split(" ").length <= 2
      ? `${previousTopic} ${normalized}`
      : normalized

  if (
    /^(h+i+|h+e+l+o+|h+e+l+l+o+|h+e+y+|hiya|yo|howdy|good morning|good afternoon|good evening)$/.test(
      normalized
    )
  ) {
    return {
      content:
        "Hey! Great to hear from you. I can help with our menu, seasonal drinks, Perks rewards, mobile ordering, catering, and store info. What's up?",
    }
  }

  if (/\b(thank|thanks|thx)\b/.test(normalized)) {
    return { content: "Of course! Come back any time — and don't forget to scan your Perks QR code next visit." }
  }

  if (/^(ok|okay|alright|got it|cool|great|makes sense|perfect|awesome)$/.test(normalized)) {
    return { content: "Great — is there anything else I can help with?" }
  }

  if (/^(how are you|how's it going|hows it going|what's up|whats up)$/.test(normalized)) {
    return { content: "All good, thanks for asking! What can I sort out for you today?" }
  }

  if (/\b(are you (a )?(bot|human|person|ai)|who are you)\b/.test(normalized)) {
    return {
      content:
        "I'm Groundwork's virtual assistant — I can answer questions about our coffee, stores, and loyalty programme. For anything account-specific, I can loop in a real team member.",
    }
  }

  if (/\b(what can you do|help me|what do you know|what.*help)\b/.test(normalized)) {
    return {
      content:
        "I can cover the menu, milk options, allergens, seasonal specials, Perks loyalty rewards, mobile ordering, catering packages, store hours, and retail beans. What do you need?",
    }
  }

  if (/\b(what is groundwork|about groundwork|tell me about|who are groundwork)\b/.test(contextualQuestion)) {
    return {
      content:
        "Groundwork Coffee Co. is a neighbourhood coffee chain with six city locations and an in-house roastery. We do direct-trade sourcing, seasonal menus, and a free loyalty programme called Groundwork Perks.",
    }
  }

  if (/\b(open|opening|hours|close|closing|when.*open|what time)\b/.test(contextualQuestion)) {
    return {
      content:
        "All stores are open Monday–Friday 6:30 AM–8:00 PM and Saturday–Sunday 7:30 AM–7:00 PM. Public holidays follow Sunday hours. Individual store info is in the app under Stores.",
    }
  }

  if (/\b(location|store|where|address|nearest|find us)\b/.test(contextualQuestion)) {
    return {
      content:
        "We have six locations: Downtown (12 Commerce St), East Side Roastery (88 Mill Lane), Midtown (350 Park Ave), Riverside (4 Wharf Rd), Northgate Mall, and Westwood (201 Garden Blvd). Use the app to find the nearest one.",
    }
  }

  if (/\b(perk|point|reward|loyalty|redeem|birthday|earn|stamp)\b/.test(contextualQuestion)) {
    return {
      content:
        "Groundwork Perks earns 1 point per $1 spent. Rewards start at 50 points (free add-on), 100 points (free drink), or 200 points (free food or beans). Birthday month means a free drink — just set your birthday in the app 48 hours before your visit.",
    }
  }

  if (/\b(miss|missing|add point|forgot|didn't scan|retroactive)\b/.test(contextualQuestion)) {
    return {
      content:
        "Missing points can be claimed up to 7 days after a purchase via the app under Help → Missing Points. After 7 days, a team member needs to review it — I can connect you with support if needed.",
      offerHandoff: true,
    }
  }

  if (/\b(order|mobile order|app order|pickup|cancel order|modify)\b/.test(contextualQuestion)) {
    return {
      content:
        "Mobile orders can be placed up to 2 hours ahead with a 10-minute pickup window. You can cancel or modify within 2 minutes of placing the order. After that, it's already with the bar. Refunds go back to your original payment in 3–5 business days.",
    }
  }

  if (/\b(cater|catering|event|office|delivery|morning box|espresso bar)\b/.test(contextualQuestion)) {
    return {
      content:
        "Catering orders (min. $150) need 48 hours notice. Options include The Morning Box (serves 10–20), The Espresso Bar (on-site barista), and Custom Office Delivery. Submit a request at groundworkcoffee.com/catering or email catering@groundworkcoffee.com.",
    }
  }

  if (/\b(season|special|limited|summer|mango|matcha|cold brew|yuzu|coconut foam)\b/.test(contextualQuestion)) {
    return {
      content:
        "This summer we have Iced Mango Cold Brew, Coconut Cold Foam Latte, Strawberry Matcha, and Yuzu Sparkling Lemonade. All are available while supplies last — check the app for real-time availability.",
    }
  }

  if (/\b(menu|drink|coffee|milk|oat|almond|soy|decaf|shot|syrup|latte|flat white|cold brew|filter|pourover)\b/.test(contextualQuestion)) {
    return {
      content:
        "We serve espresso drinks, filter, and cold brew. Milk options include whole, semi-skimmed, oat (default dairy-free), almond, soy, and coconut. Oat and almond are free; soy/coconut add $0.50. Decaf is always available. Syrups are $0.50 each.",
    }
  }

  if (/\b(food|eat|pastry|toast|sandwich|croissant|vegan|gluten|allergen|allerg)\b/.test(contextualQuestion)) {
    return {
      content:
        "Food includes avocado toast, sourdough breakfast sandwich, banana bread, almond croissant, fruit bowl, and a rotating grain bowl. Vegan items are marked (V). Gluten-free bread is a $1 swap. Full allergen info is in the app under Menu → Allergen Info.",
    }
  }

  if (/\b(bean|bag|retail|subscription|roastery|tour|buy|whole bean|ground)\b/.test(contextualQuestion)) {
    return {
      content:
        "Beans are sold in 250 g and 500 g bags ($18–$38 depending on origin). A fortnightly or monthly bean subscription is at groundworkcoffee.com/subscribe and earns Perks points. Roastery tours run Saturdays at 10:00 AM for $10 (redeemable in-store).",
    }
  }

  if (/\b(complain|complaint|wrong|bad|issue|cold|spill|refund|remake|quality)\b/.test(contextualQuestion)) {
    return {
      content:
        "If something's not right, let a barista know and we'll remake it on the spot. If you've already left, report it within 24 hours via the app under Help → Report an Issue — a store credit or complimentary drink is usually issued at the manager's discretion.",
    }
  }

  if (/\b(password|login|log in|sign in|locked out|account|app|reset)\b/.test(contextualQuestion)) {
    return {
      content:
        "For app access issues, use Forgot Password on the sign-in screen. For payment method problems or account-specific questions, go to Help in the app or I can connect you with our support team.",
    }
  }

  const recentClarification = [...history]
    .reverse()
    .find((item) => item.role === "agent")
    ?.content.startsWith("Not quite sure")

  if (!recentClarification) {
    return {
      content:
        "Not quite sure what you mean — could you tell me a bit more? I can help with our menu, Perks loyalty, seasonal drinks, mobile ordering, catering, or store info.",
    }
  }

  return {
    content:
      "I'm not finding a clear answer for that one. Would you like me to connect you with a team member?",
    offerHandoff: true,
  }
}

function answerFromQuestion(messages: AgentMessage[]) {
  return [...messages].reverse().find((item) => item.role === "customer")?.content || ""
}

export default function AgentDesk() {
  const [initialSession] = useState(loadChatSession)
  const [threads, setThreads] = useState<Thread[]>(() => initialSession?.threads || createSeedThreads())
  const [activeThreadId, setActiveThreadId] = useState(initialSession?.activeThreadId || "simulator")
  const [workspaceView, setWorkspaceView] = useState<"chat" | "inbox">(
    initialSession?.workspaceView || "chat"
  )
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>(initialSession?.inboxFilter || "all")
  const [customerDraft, setCustomerDraft] = useState("")
  const [agentDraft, setAgentDraft] = useState("")
  const [composerMode, setComposerMode] = useState<ComposerMode>("reply")
  const [knowledge, setKnowledge] = useState(loadKnowledge)
  const [knowledgeDraft, setKnowledgeDraft] = useState(loadKnowledge)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [assistDraft, setAssistDraft] = useState("")
  const [assistState, setAssistState] = useState<AssistState>("idle")
  const [customerAssistState, setCustomerAssistState] = useState<CustomerAssistState>("idle")
  const [typedBotReplies, setTypedBotReplies] = useState<Record<string, string>>({})
  const [botTypingMessageId, setBotTypingMessageId] = useState<string | null>(null)
  const customerComposerRef = useRef<HTMLTextAreaElement>(null)
  const agentComposerRef = useRef<HTMLTextAreaElement>(null)
  const customerConversationRef = useRef<HTMLDivElement>(null)
  const agentConversationRef = useRef<HTMLDivElement>(null)
  const sessionIdRef = useRef(initialSession?.sessionId || crypto.randomUUID())
  const botTypewriterTimerRef = useRef<number | null>(null)

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || threads[0],
    [activeThreadId, threads]
  )
  const simulatorThread = useMemo(
    () => threads.find((thread) => thread.id === "simulator") || threads[0],
    [threads]
  )

  const filteredThreads = useMemo(() => {
    if (inboxFilter === "all") return threads
    return threads.filter((thread) => thread.status === inboxFilter)
  }, [inboxFilter, threads])

  const counts = useMemo(
    () => ({
      all: threads.length,
      open: threads.filter((thread) => thread.status === "open").length,
      pending: threads.filter((thread) => thread.status === "pending").length,
      resolved: threads.filter((thread) => thread.status === "resolved").length,
    }),
    [threads]
  )

  const customerMessages = simulatorThread.messages.filter(
    (item) => item.role !== "note"
  )
  const latestQuestion = answerFromQuestion(activeThread.messages)
  const activeThreadResolved = activeThread.status === "resolved"
  const supportIsTyping =
    simulatorThread.handoffRequested &&
    activeThreadId === "simulator" &&
    composerMode === "reply" &&
    !activeThreadResolved &&
    agentDraft.trim().length > 0

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAT_SESSION_KEY,
        JSON.stringify({
          threads,
          activeThreadId,
          workspaceView,
          inboxFilter,
          sessionId: sessionIdRef.current,
        } satisfies PersistedChatSession)
      )
    } catch {
      // The chat remains usable when local persistence is unavailable.
    }
  }, [activeThreadId, inboxFilter, threads, workspaceView])

  useEffect(() => {
    return () => {
      if (botTypewriterTimerRef.current !== null) {
        window.clearTimeout(botTypewriterTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      customerConversationRef.current?.scrollTo({
        top: customerConversationRef.current.scrollHeight,
        behavior: "smooth",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [simulatorThread.messages.length, customerAssistState, botTypingMessageId, supportIsTyping])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      agentConversationRef.current?.scrollTo({
        top: agentConversationRef.current.scrollHeight,
        behavior: "smooth",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [activeThread.messages.length, assistState, activeThreadId])

  function updateThread(
    update: (thread: Thread) => Thread,
    threadId = activeThreadId
  ) {
    setThreads((current) =>
      current.map((thread) => (thread.id === threadId ? update(thread) : thread))
    )
  }

  function addMessage(role: MessageRole, content: string, threadId = activeThreadId, authorOverride?: string) {
    const nextMessage = message(
      role,
      content,
      0,
      role === "agent"
        ? authorOverride || "Groundwork Coffee"
        : role === "note"
          ? "Private note"
          : undefined
    )

    updateThread((thread) => ({
      ...thread,
      messages: [...thread.messages, nextMessage],
      preview: content,
      lastActivity: "now",
      status: role === "customer" ? "open" : thread.status,
      unread: role === "customer",
    }), threadId)
  }

  function startBotTypewriter(messageId: string, content: string) {
    if (botTypewriterTimerRef.current !== null) {
      window.clearTimeout(botTypewriterTimerRef.current)
    }

    let cursor = 0
    setTypedBotReplies((current) => ({ ...current, [messageId]: "" }))
    setBotTypingMessageId(messageId)

    const revealNext = () => {
      const char = content.charAt(cursor)
      let nextDelay = 10 + Math.random() * 15 // Base typing speed: 10-25ms

      if (/[.,!?]/.test(char)) {
        nextDelay = 150 + Math.random() * 150 // Pause at punctuation: 150-300ms
      } else if (char === " ") {
        nextDelay = 25 + Math.random() * 30 // Slight pause at spaces: 25-55ms
      }

      cursor += 1
      setTypedBotReplies((current) => ({ ...current, [messageId]: content.slice(0, cursor) }))

      if (cursor < content.length) {
        botTypewriterTimerRef.current = window.setTimeout(revealNext, nextDelay)
      } else {
        botTypewriterTimerRef.current = null
        setBotTypingMessageId(null)
      }
    }

    if (content.length > 0) {
      botTypewriterTimerRef.current = window.setTimeout(revealNext, 100) // Initial delay before typing starts
    } else {
      setBotTypingMessageId(null)
    }
  }

  function handleCustomerSend() {
    const content = customerDraft.trim()
    if (!content) return

    const latestBotMessage = [...simulatorThread.messages]
      .reverse()
      .find((item) => item.role === "agent")
    const isAnsweringHandoffOffer =
      latestBotMessage?.action === "offer-handoff"

    addMessage("customer", content, "simulator")
    setActiveThreadId("simulator")
    setCustomerDraft("")
    setAssistDraft("")
    setAssistState("idle")
    if (simulatorThread.handoffRequested) {
      // Once a teammate joins, new customer messages wait for the live agent.
    } else if (isAnsweringHandoffOffer && isAffirmative(content)) {
      handleRequestHuman()
    } else if (isAnsweringHandoffOffer && isNegative(content)) {
      addCustomerAnswer("No problem — I’m here if you need anything else.")
    } else if (isExplicitHumanRequest(content)) {
      handleRequestHuman()
    } else {
      void answerCustomerQuestion(content)
    }
    requestAnimationFrame(() => customerComposerRef.current?.focus())
  }

  async function answerCustomerQuestion(question: string) {
    setCustomerAssistState("loading")
    const startedAt = Date.now()
    const botReply = await (async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            knowledgeBase: knowledge,
            mode: "customer",
            history: simulatorThread.messages
              .filter((item) => item.role === "customer" || item.role === "agent")
              .slice(-10)
              .map((item) => ({
                role: item.role === "customer" ? "user" : "assistant",
                content: item.content,
              })),
            sessionId: sessionIdRef.current,
            companyName: "Groundwork Coffee",
          }),
        })
        const body = (await response.json()) as {
          answer?: string
          handoffSuggested?: boolean
        }
        if (!response.ok || !body.answer) throw new Error("Customer answer unavailable")
        return { content: body.answer, offerHandoff: body.handoffSuggested === true }
      } catch {
        const fallback = fallbackCustomerAnswer(question, simulatorThread.messages)
        return { content: fallback.content, offerHandoff: fallback.offerHandoff === true }
      }
    })()

    const remainingTypingTime = Math.max(0, 360 - (Date.now() - startedAt))
    if (remainingTypingTime > 0) {
      await new Promise<void>((resolve) => window.setTimeout(resolve, remainingTypingTime))
    }
    addCustomerAnswer(botReply.content, botReply.offerHandoff)
    setCustomerAssistState("idle")
  }

  function addCustomerAnswer(content: string, offerHandoff = false) {
    const nextMessage: AgentMessage = {
      ...message("agent", content, 0, "Groundwork Coffee"),
      action: offerHandoff ? "offer-handoff" : undefined,
    }
    updateThread((thread) => ({
      ...thread,
      messages: [...thread.messages, nextMessage],
      preview: content,
      lastActivity: "now",
    }), "simulator")
    startBotTypewriter(nextMessage.id, content)
  }

  function handleRequestHuman() {
    updateThread((thread) => {
      if (thread.handoffRequested) return thread

      return {
        ...thread,
        handoffRequested: true,
        status: "open",
        unread: true,
        preview: "Human support requested",
        lastActivity: "now",
        messages: [
          ...thread.messages.map((item) => ({ ...item, action: undefined })),
          message("note", "Human handoff requested from Chat.", 0, "System"),
          message(
            "event",
            "You’re now speaking with a Daydream Club support teammate.",
            0,
            "System"
          ),
        ],
      }
    }, "simulator")
    toast.success("Support request sent")
  }

  function handleDeclineHuman() {
    const customerReply = message("customer", "Not now, thanks.", 0)
    const botReply = message(
      "agent",
      "No problem — I’m here if you need anything else.",
      0,
      "Groundwork Coffee"
    )

    updateThread((thread) => ({
      ...thread,
      messages: [
        ...thread.messages.map((item) => ({ ...item, action: undefined })),
        customerReply,
        botReply,
      ],
      preview: botReply.content,
      lastActivity: "now",
    }), "simulator")
    startBotTypewriter(botReply.id, botReply.content)
    requestAnimationFrame(() => customerComposerRef.current?.focus())
  }

  function handleAgentSend() {
    if (activeThread.status === "resolved") return
    const content = agentDraft.trim()
    if (!content) return

    addMessage(composerMode === "reply" ? "agent" : "note", content, activeThreadId, composerMode === "reply" ? "Support" : undefined)
    setAgentDraft("")
    if (composerMode === "reply") {
      toast.success("Reply sent")
    } else {
      toast.success("Private note added")
      setComposerMode("reply")
    }
    requestAnimationFrame(() => agentComposerRef.current?.focus())
  }

  async function handleSuggestReply() {
    if (activeThread.status === "resolved") return
    if (!latestQuestion) {
      toast("Ask something from the customer first.")
      return
    }

    setAssistState("loading")
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: latestQuestion,
          knowledgeBase: knowledge,
          mode: "copilot",
          history: activeThread.messages
            .filter((item) => item.role === "customer" || item.role === "agent")
            .slice(-8)
            .map((item) => ({
              role: item.role === "customer" ? "user" : "assistant",
              content: item.content,
            })),
          sessionId: sessionIdRef.current,
          companyName: "Groundwork Coffee",
        }),
      })
      const body = (await response.json()) as { answer?: string }
      if (!response.ok || !body.answer) throw new Error("AI assist unavailable")
      setAssistDraft(body.answer)
      setAssistState("ready")
    } catch {
      setAssistDraft(fallbackSuggestion(latestQuestion))
      setAssistState("ready")
      toast("Using the local demo suggestion — add your API key for Gemini replies.")
    }
  }

  function handleInsertAssist() {
    if (activeThread.status === "resolved") return
    setComposerMode("reply")
    setAgentDraft(assistDraft)
    setAssistDraft("")
    setAssistState("idle")
    setCustomerAssistState("idle")
    requestAnimationFrame(() => agentComposerRef.current?.focus())
  }

  function handleWarmAssist() {
    if (!assistDraft) return
    setAssistDraft((current) =>
      current.startsWith("Absolutely") || current.startsWith("I’m")
        ? current
        : "Absolutely — " + current.charAt(0).toLowerCase() + current.slice(1)
    )
  }

  function handleSetStatus(status: ThreadStatus) {
    const returnsToBot = status === "resolved" && activeThread.handoffRequested
    const returnsToAgent =
      status === "open" &&
      activeThread.status === "resolved" &&
      activeThread.id === "simulator"

    if (status === "resolved") {
      setAgentDraft("")
      setAssistDraft("")
      setAssistState("idle")
      setComposerMode("reply")
      setInboxFilter("all")
    }

    updateThread((thread) => {
      const shouldHandBackToBot = status === "resolved" && thread.handoffRequested
      const shouldReturnToAgent =
        status === "open" && thread.status === "resolved" && thread.id === "simulator"
      const statusMessage = shouldHandBackToBot
        ? message(
            "event",
            "Your conversation with Groundwork support has been resolved. I’m back if you need anything else.",
            0,
            "System"
          )
        : shouldReturnToAgent
          ? message(
              "event",
              "A Groundwork support teammate has reopened this conversation.",
              0,
              "System"
            )
          : null

      return {
        ...thread,
        status,
        unread: false,
        handoffRequested: shouldHandBackToBot
          ? false
          : shouldReturnToAgent
            ? true
            : thread.handoffRequested,
        preview: statusMessage?.content || thread.preview,
        lastActivity: statusMessage ? "now" : thread.lastActivity,
        messages: statusMessage
          ? [...thread.messages, statusMessage]
          : thread.messages,
      }
    })
    toast.success(
      status === "resolved"
        ? returnsToBot
          ? "Conversation resolved — bot is back"
          : "Conversation resolved"
        : returnsToAgent
          ? "Conversation reopened — support is back"
          : "Marked " + status
    )
  }

  function handleReset() {
    try {
      localStorage.removeItem(CHAT_SESSION_KEY)
    } catch {
      // A new in-memory session is still created below.
    }
    setThreads(createSeedThreads())
    setActiveThreadId("simulator")
    setWorkspaceView("chat")
    setCustomerDraft("")
    setAgentDraft("")
    setAssistDraft("")
    setAssistState("idle")
    setComposerMode("reply")
    setTypedBotReplies({})
    setBotTypingMessageId(null)
    if (botTypewriterTimerRef.current !== null) {
      window.clearTimeout(botTypewriterTimerRef.current)
      botTypewriterTimerRef.current = null
    }
    sessionIdRef.current = crypto.randomUUID()
    toast.success("Demo session reset")
  }

  function handleOpenKnowledge(open: boolean) {
    setKnowledgeOpen(open)
    if (open) setKnowledgeDraft(knowledge)
  }

  function handleSaveKnowledge() {
    setKnowledge(knowledgeDraft)
    try {
      localStorage.setItem(KNOWLEDGE_KEY, knowledgeDraft)
    } catch {
      // Storage is optional for this demo.
    }
    setKnowledgeOpen(false)
    toast.success("Knowledge base updated")
  }

  function handleCustomerKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleCustomerSend()
    }
  }

  function handleAgentKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleAgentSend()
    }
  }

  return (
    <div className="rag-workspace relative flex min-h-0 flex-1 flex-col overflow-hidden bg-tool-canvas text-foreground">
      <BlurredBackground image="blue-flower" position="58% 38%" className="rag-blurred-background opacity-95" />
      <ToolAtmosphere className="opacity-35" />
      <header className="relative z-10 mt-3 flex h-[3.4rem] w-[calc(100%-1rem)] max-w-[36rem] shrink-0 self-center items-center rounded-full border border-border/70 bg-surface/95 px-2 shadow-[0_18px_48px_-24px_color-mix(in_oklch,var(--foreground)_36%,transparent)] backdrop-blur-2xl md:mt-4 md:w-[calc(100%-2rem)] md:px-3 lg:w-auto lg:max-w-none">
        <nav aria-label="Workspace navigation" className="flex min-w-0 shrink-0 items-center">
          <Link to="/" className="flex h-8 items-center rounded-full px-1 font-display text-[10px] font-semibold tracking-[-0.04em] outline-none transition-opacity hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:px-2 sm:text-xs md:px-3 md:text-sm">
            ALIYA KOY
          </Link>
          <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-border sm:mx-1" />
          <Link to="/lab" aria-label="Back to Lab" className="flex size-8 items-center justify-center rounded-full text-foreground/65 outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:size-9">
            <ArrowLeft className="size-3.5" />
          </Link>
          <span className="flex h-8 max-w-[5.5rem] items-center truncate rounded-full bg-accent px-1.5 text-[10px] font-medium text-accent-foreground max-[359px]:hidden sm:max-w-[8rem] sm:px-2.5 sm:text-xs md:h-9 md:max-w-none md:px-4 md:text-sm">
            Chat Workspace
          </span>
        </nav>

        <div className="mx-auto flex items-center gap-1 md:hidden" role="group" aria-label="Workspace view">
          <button
            type="button"
            onClick={() => setWorkspaceView("chat")}
            aria-label="Show chat"
            aria-pressed={workspaceView === "chat"}
            title="Show chat"
            className={cn("flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", workspaceView === "chat" && "bg-surface-featured text-foreground shadow-xs")}
          >
            <MessageCircle className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceView("inbox")}
            aria-label="Show support inbox"
            aria-pressed={workspaceView === "inbox"}
            title="Show support inbox"
            className={cn("flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", workspaceView === "inbox" && "bg-surface-featured text-foreground shadow-xs")}
          >
            <Inbox className="size-3.5" />
          </button>
        </div>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border md:block" />
        <div className="ml-1 flex shrink-0 gap-0.5 sm:gap-1.5 md:ml-auto">
          <Button variant="ghost" size="icon" onClick={handleReset} aria-label="Reset demo" className="size-10 rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
            <RotateCcw className="size-4" />
          </Button>
          <ModeToggle />
        </div>
      </header>

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden px-2 py-2.5 md:px-5 md:py-5">
        <div className="mx-auto grid h-full min-h-0 w-full max-w-[1320px] grid-cols-1 gap-4 md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
          <section className={cn("rag-glass-shell h-[calc(100dvh-6.5rem)] min-h-0 min-w-0 flex-col overflow-hidden rounded-[20px] border border-border/60 ring-1 ring-border/25 md:flex md:h-full", workspaceView === "chat" ? "flex" : "hidden")}>
            <div className="rag-glass-header flex h-14 items-center justify-between gap-3 border-b border-border/70 px-4 sm:px-5">
              <h1 className="font-display text-[17px] font-semibold tracking-tight">Chat</h1>
              {simulatorThread.handoffRequested ? (
                <span title="Human support requested" className="flex size-7 items-center justify-center rounded-md text-success">
                  <CircleCheck className="size-4" />
                </span>
              ) : (
                <button type="button" onClick={handleRequestHuman} aria-label="Request human support" title="Request human support" className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Headset className="size-4" />
                </button>
              )}
            </div>

            <div className="rag-glass-content flex min-h-0 flex-1 flex-col">
              <div ref={customerConversationRef} className="flex-1 overflow-y-auto px-3 py-6 md:px-4 md:py-7">
                <div className="mx-auto w-full space-y-5 md:max-w-[300px]">
                  {customerMessages.map((item, index) => {
                    const isBotReply =
                      item.role === "agent" && item.author === "Groundwork Coffee"
                    const displayContent = isBotReply && typedBotReplies[item.id] !== undefined
                      ? typedBotReplies[item.id]
                      : item.content

                    return (
                      <CustomerMessage
                        key={item.id}
                        message={item}
                        displayContent={displayContent}
                        showHandoffActions={
                          index === customerMessages.length - 1 &&
                          item.action === "offer-handoff" &&
                          !simulatorThread.handoffRequested
                        }
                        onRequestHuman={handleRequestHuman}
                        onDeclineHuman={handleDeclineHuman}
                      />
                    )
                  })}
                  {customerAssistState === "loading" && (
                    <CustomerTypingIndicator label="Groundwork is typing…" />
                  )}
                  {supportIsTyping && <CustomerTypingIndicator label="Support is typing…" />}
                </div>
              </div>

              <div className="px-3 pb-3 pt-2 md:px-4 md:pb-4">
                <div className="mx-auto w-full md:max-w-[300px]">
                  <div className="relative">
                    <Textarea
                      ref={customerComposerRef}
                      value={customerDraft}
                      disabled={false}
                      onChange={(event) => setCustomerDraft(event.target.value)}
                      onKeyDown={handleCustomerKeyDown}
                      rows={2}
                      placeholder="Write a message…"
                      className="rag-composer-input min-h-[78px] resize-none rounded-xl border-border-strong bg-white pr-11 text-sm disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-foreground"
                    />
                    <Button size="icon" onClick={handleCustomerSend} disabled={!customerDraft.trim() || customerAssistState === "loading"} aria-label="Send customer message" className="absolute right-2 bottom-2 size-8 rounded-full">
                      <ArrowUp className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={cn("rag-glass-shell h-[calc(100dvh-6.5rem)] min-h-0 min-w-0 flex-col overflow-hidden rounded-[20px] border border-border/60 ring-1 ring-border/25 md:flex md:h-full", workspaceView === "inbox" ? "flex" : "hidden")}>
            <div className="rag-glass-header flex h-14 items-center justify-between gap-3 border-b border-border/70 px-4 sm:px-5">
              <h2 className="font-display text-[17px] font-semibold tracking-tight">{knowledgeOpen ? "Knowledge Base" : "Support Inbox"}</h2>
              <button
                type="button"
                onClick={() => handleOpenKnowledge(!knowledgeOpen)}
                aria-label={knowledgeOpen ? "Show support inbox" : "Open knowledge base"}
                title={knowledgeOpen ? "Show support inbox" : "Open knowledge base"}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {knowledgeOpen ? <Inbox className="size-4" /> : <BookOpen className="size-4" />}
              </button>
            </div>

            {knowledgeOpen ? (
              <div className="rag-glass-content rag-workspace-view flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5">
                <Textarea value={knowledgeDraft} onChange={(event) => setKnowledgeDraft(event.target.value)} spellCheck={false} className="min-h-0 flex-1 resize-none rounded-xl border-border-strong bg-tool-emphasis font-mono text-xs leading-relaxed shadow-none" aria-label="Knowledge base" />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <Button variant="outline" onClick={() => setKnowledgeDraft(DEFAULT_KNOWLEDGE)}>Reset</Button>
                  <Button onClick={handleSaveKnowledge} disabled={knowledgeDraft === knowledge}>Save</Button>
                </div>
              </div>
            ) : (
            <div className="rag-workspace-view grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[190px_minmax(0,1fr)] lg:grid-rows-1">
              <aside className="rag-glass-sidebar shrink-0 border-b border-border/70 lg:min-h-0 lg:border-r lg:border-b-0">
                <div className="shrink-0 px-3 py-3">
                  <div className="grid grid-cols-2 gap-1 lg:block lg:space-y-0.5">
                    <InboxFilterButton active={inboxFilter === "all"} count={counts.all} label="All conversations" icon={<Inbox className="size-3.5" />} onClick={() => setInboxFilter("all")} />
                    <InboxFilterButton active={inboxFilter === "open"} count={counts.open} label="Open" icon={<span className="size-1.5 rounded-full bg-primary" />} onClick={() => setInboxFilter("open")} />
                    <InboxFilterButton active={inboxFilter === "pending"} count={counts.pending} label="Pending" icon={<Clock className="size-3.5" />} onClick={() => setInboxFilter("pending")} />
                    <InboxFilterButton active={inboxFilter === "resolved"} count={counts.resolved} label="Resolved" icon={<CircleCheck className="size-3.5" />} onClick={() => setInboxFilter("resolved")} />
                  </div>
                </div>

              </aside>

              <div className="rag-glass-content flex min-h-0 min-w-0 flex-col">
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-1 px-3 pt-3 sm:px-4 lg:px-8">
                    {activeThreadResolved ? (
                      <Button variant="outline" size="sm" onClick={() => handleSetStatus("open")} className="h-8 gap-1 border-primary/35 bg-primary/8 px-2.5 text-[11px] text-primary shadow-xs hover:bg-primary/15">
                        <RotateCcw className="size-3.5" />Reopen
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleSetStatus("pending")} className="h-8 gap-1 border-border-strong bg-tool-emphasis px-2.5 text-[11px] text-foreground shadow-xs hover:bg-muted">
                          <Clock className="size-3.5" />Snooze
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSetStatus("resolved")} className="h-8 gap-1 border-primary/35 bg-primary/8 px-2.5 text-[11px] text-primary shadow-xs hover:bg-primary/15">
                          <CircleCheck className="size-3.5" />Resolve
                        </Button>
                      </>
                    )}
                  </div>
                  <div ref={agentConversationRef} className="flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6 lg:px-8 lg:py-7">
                    <div className="mx-auto max-w-[720px] space-y-5">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        <span>{activeThread.status === "resolved" ? "Resolved" : "Today"}</span>
                        <span className="h-px flex-1 bg-border" />
                      </div>

                      {filteredThreads.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-border-strong bg-surface-raised p-6 text-center">
                          <CircleAlert className="mx-auto size-6 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">No {inboxFilter} conversations</p>
                          <p className="mt-1 text-xs text-muted-foreground">Try another inbox view.</p>
                        </div>
                      ) : (
                        activeThread.messages.map((item) => (
                          <AgentMessage key={item.id} message={item} customerName={activeThread.name} />
                        ))
                      )}

                      {assistState === "loading" && (
                        <div className="ml-8 flex max-w-xl items-center gap-2 border-l-2 border-primary px-3 py-2 text-xs text-muted-foreground">
                          <span className="size-1.5 animate-pulse rounded-full bg-primary" />Copilot is checking the knowledge base…
                        </div>
                      )}

                      {assistDraft && assistState === "ready" && (
                        <div className="ml-8 max-w-xl border-l-2 border-primary bg-surface-control px-4 py-3">
                          <div className="flex items-start gap-2">
                            <Bot className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-xs font-semibold">Suggested reply</p>
                              </div>
                              <p className="mt-2 text-sm leading-relaxed">{assistDraft}</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                <Button size="sm" onClick={handleInsertAssist}>Insert draft</Button>
                                <Button size="sm" variant="outline" onClick={handleWarmAssist}>Make warmer</Button>
                                <button type="button" aria-label="Dismiss AI suggestion" onClick={() => { setAssistDraft(""); setAssistState("idle") }} className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                                  <X className="size-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 lg:px-5">
                    <div className="mx-auto max-w-[720px]">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
                          <ComposerModeButton active={composerMode === "note"} disabled={activeThreadResolved} onClick={() => setComposerMode(composerMode === "note" ? "reply" : "note")} icon={<StickyNote className="size-3.5" />} label="Internal note" />
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleSuggestReply} disabled={activeThreadResolved || assistState === "loading" || !latestQuestion} className="gap-1.5 text-xs text-primary hover:text-primary">
                          <WandSparkles className="size-3.5" />Suggest reply
                        </Button>
                      </div>

                      <div className="relative">
                        <Textarea ref={agentComposerRef} value={agentDraft} disabled={activeThreadResolved} onChange={(event) => setAgentDraft(event.target.value)} onKeyDown={handleAgentKeyDown} rows={3} placeholder={activeThreadResolved ? "Conversation resolved" : composerMode === "reply" ? "Write a reply to the customer…" : "Leave a private note for the support team…"} className={cn("rag-composer-input min-h-[78px] resize-none rounded-xl pr-12 text-sm disabled:cursor-not-allowed disabled:opacity-60", composerMode === "note" ? "border-warning/40 bg-warning/5" : "border-border-strong bg-white dark:bg-white dark:text-foreground")} />
                        <Button size="icon" onClick={handleAgentSend} disabled={activeThreadResolved || !agentDraft.trim()} aria-label={composerMode === "reply" ? "Send reply" : "Add internal note"} className="absolute right-2 bottom-2 size-8 rounded-full">
                          {composerMode === "reply" ? <ArrowUp className="size-4" /> : <StickyNote className="size-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </section>
        </div>
      </main>

    </div>
  )
}

function CustomerMessage({
  message: item,
  displayContent,
  showHandoffActions = false,
  onRequestHuman,
  onDeclineHuman,
}: {
  message: AgentMessage
  displayContent?: string
  showHandoffActions?: boolean
  onRequestHuman: () => void
  onDeclineHuman: () => void
}) {
  if (item.role === "event") {
    return (
      <div className="rag-message mx-auto flex max-w-[280px] items-center gap-2 rounded-xl bg-success/10 px-3 py-2.5 text-xs text-success">
        <Headset className="size-3.5 shrink-0" />
        {displayContent ?? item.content}
      </div>
    )
  }

  const isCustomer = item.role === "customer"
  const isSupport = item.author === "Support"
  return (
    <div className={cn("rag-message flex flex-col gap-1", isCustomer ? "items-end" : "items-start")}>
      <div className={cn("flex items-center gap-2 font-mono text-[10px] text-muted-foreground", isCustomer && "flex-row-reverse")}>
        <span>{isCustomer ? "Customer" : isSupport ? "Support" : "Groundwork Coffee"}</span>
        <span>{formatTime(item.timestamp)}</span>
      </div>
      <div className={cn("max-w-[88%] text-sm leading-relaxed md:max-w-[280px]", isCustomer ? "text-foreground" : "rounded-2xl rounded-tl-md px-3.5 py-3", isSupport ? "bg-success/12 text-foreground" : !isCustomer ? "bg-primary/10 text-foreground" : "")}>
        {displayContent ?? item.content}
      </div>
      {showHandoffActions && (
        <div className="mt-1 flex flex-wrap gap-2">
          <Button size="sm" onClick={onRequestHuman} className="h-8 rounded-full px-3 text-xs">
            Talk to support
          </Button>
          <Button size="sm" variant="outline" onClick={onDeclineHuman} className="h-8 rounded-full bg-background/75 px-3 text-xs">
            Not now
          </Button>
        </div>
      )}
    </div>
  )
}

function CustomerTypingIndicator({ label }: { label: string }) {
  return (
    <div aria-live="polite" className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
      <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-primary" />
      <span className="ml-1">{label}</span>
    </div>
  )
}

function AgentMessage({ message: item, customerName }: { message: AgentMessage; customerName: string }) {
  if (item.role === "event") {
    return (
      <div className="rag-message mx-auto flex max-w-xl items-center gap-2 rounded-xl bg-success/10 px-3.5 py-3 text-xs text-success">
        <Headset className="size-3.5 shrink-0" />
        <span>{item.content}</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {formatTime(item.timestamp)}
        </span>
      </div>
    )
  }

  if (item.role === "note") {
    return (
      <div className="rag-message mx-auto max-w-2xl rounded-xl border border-warning/25 border-l-2 border-l-warning bg-warning/5 px-3.5 py-3">
        <div className="flex items-center gap-2 text-warning"><StickyNote className="size-3.5" /><span className="font-mono text-[10px] uppercase tracking-[0.12em]">Internal note</span><span className="ml-auto font-mono text-[10px] text-muted-foreground">{formatTime(item.timestamp)}</span></div>
        <p className="mt-1.5 text-sm leading-relaxed">{item.content}</p>
      </div>
    )
  }

  const isCustomer = item.role === "customer"
  const isSupport = item.author === "Support"
  return (
    <div className={cn("rag-message flex", isCustomer ? "justify-start" : "justify-end")}>
      <div className="max-w-[min(85%,42rem)]">
        <div className={cn("mb-1 flex items-center gap-2", !isCustomer && "justify-end")}><span className="text-xs font-medium">{isCustomer ? customerName : item.author || "Support"}</span><span className="font-mono text-[10px] text-muted-foreground">{formatTime(item.timestamp)}</span></div>
        <div className={cn("text-sm leading-relaxed", isCustomer ? "text-foreground" : "rounded-2xl rounded-tr-md px-4 py-3", isSupport ? "bg-success/12 text-foreground" : !isCustomer ? "bg-primary/10 text-foreground" : "")}>{item.content}</div>
      </div>
    </div>
  )
}

function InboxFilterButton({ active, count, label, icon, onClick }: { active: boolean; count: number; label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors", active ? "border-border-strong bg-surface-control font-medium text-foreground shadow-sm" : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground")}>
      <span className="flex w-4 items-center justify-center text-primary">{icon}</span><span className="min-w-0 flex-1 truncate">{label}</span><span className="font-mono text-[10px] text-muted-foreground">{count}</span>
    </button>
  )
}

function ComposerModeButton({ active, disabled = false, onClick, icon, label }: { active: boolean; disabled?: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-colors disabled:cursor-not-allowed disabled:opacity-45", active ? "bg-surface-featured text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground")}>{icon}{label}</button>
  )
}

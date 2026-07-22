export const capabilities = [
  {
    number: "01",
    title: "Direct the model",
    description:
      "Break a messy idea into clear prompts, useful constraints, and small steps the model can actually execute.",
  },
  {
    number: "02",
    title: "Debug the output",
    description:
      "Read what the AI produced, spot where it is bluffing or breaking, and keep testing until the real bug is gone.",
  },
  {
    number: "03",
    title: "Finish the software",
    description:
      "Turn the promising first pass into a coherent, responsive product instead of stopping at an impressive demo.",
  },
]

export const selectedExperience = [
  {
    company: "KB Prasac Bank",
    role: "Senior Digital Product Owner (AI Lead)",
    period: "Apr 2026 – Present",
    current: true,
    summary:
      "Leading an AI assistant for a banking app—from choosing models and shaping prompts to testing answers, debugging failures, and coordinating production delivery.",
  },
  {
    company: "Boost Capital",
    role: "Senior Product Specialist",
    period: "Jun 2023 – Jan 2026",
    current: false,
    summary:
      "Redesigned loan-application chatbot journeys using observed user behaviour, connecting product, marketing, and engineering around a clearer customer experience.",
  },
  {
    company: "Smart Axiata",
    role: "VAS & DCB Product Specialist",
    period: "Nov 2021 – Jun 2023",
    current: false,
    summary:
      "Managed gaming and direct-carrier-billing products across Google, Apple, and internal teams, turning recurring operational issues into product improvements.",
  },
]

export const earlierExperience = [
  ["2020 – 2021", "Retail Product Supervisor", "PTC Computer Co., Ltd."],
  ["2019 – 2020", "Bid & Tender Specialist", "PTC Computer Co., Ltd."],
  ["2018 – 2019", "Corporate & SMB Sales", "PTC Computer Co., Ltd."],
  ["2017 – 2018", "Translator / Assistant", "Fabric Arts (Cambodia)"],
  ["2016 – 2017", "Volunteer Teacher", "Takeo Adventist School"],
] as const

export const projects = [
  {
    number: "01",
    category: "AI · Retrieval augmented generation",
    status: "Working prototype",
    title: "RAG Chatbot",
    description:
      "A grounded assistant that retrieves the right knowledge before it answers—built for source-aware responses, prompt testing, and fast iteration.",
    tags: ["Source Retrieval", "Prompt Testing", "Grounded Answers"],
    link: "/rag",
    kind: "rag" as const,
  },
  {
    number: "02",
    category: "Systems · Frontend craft",
    status: "In active development",
    title: "Design System Studio",
    description:
      "A hands-on workspace for shaping design tokens, type, surfaces, responsive previews, accessibility checks, and production-ready exports.",
    tags: ["Design Tokens", "Live Preview", "Accessibility"],
    link: "/design-system",
    kind: "studio" as const,
  },
]

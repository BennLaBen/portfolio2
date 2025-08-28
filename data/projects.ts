export const projects = [
  {
    slug: "assistant-ia-securite",
    title: "Assistant IA cybersécurité",
    summary: "Assistant virtuel sécurisé pour détection proactive de menaces (POC).",
    stack: ["Python", "FastAPI", "Scikit-learn"],
    github: "",
    live: "",
    image: "/images/projects/assistant-ia.png"
  },
  {
    slug: "audit-securite-web",
    title: "Audits de sécurité web pour PME",
    summary: "Pentests applicatifs, rapports CVSS, remédiations (OWASP).",
    stack: ["OWASP ZAP", "Burp Suite", "Python"],
    github: "",
    live: "",
    image: "/images/projects/audit-web.png"
  },
  {
    slug: "mt4-bot-xauusd",
    title: "Bot de trading XAUUSD (MT4)",
    summary: "Algo avec break-even & trailing stop, focus XAUUSD (ICT).",
    stack: ["MQL4", "Python (analyse)"],
    github: "",
    live: "",
    image: "/images/projects/bot-xauusd.png"
  },
  {
    slug: "ecommerce-montres",
    title: "Plateforme e-commerce montres",
    summary: "Vente de montres via sites personnels, SEO/SEA et gestion des offres.",
    stack: ["Next.js / ou Shopify", "SEO", "Stripe (future)"],
    github: "",
    live: "",
    image: "/images/projects/montres.png"
  }
] as const;


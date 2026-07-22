export const profile = {
  name: "William Galeano",
  initials: "WG",
  headline: "Software Developer & Senior Logistics Coordinator",
  location: "Bogotá, Colombia",
  availability: "Abierto a oportunidades en tecnología y operaciones globales",
  languages: ["Español nativo", "Inglés B2+"],
  intro:
    "Construyo soluciones digitales con la misma disciplina con la que coordino operaciones internacionales: entendiendo el contexto, priorizando con claridad y cuidando cada entrega.",
  about: [
    "Mi perfil combina desarrollo de software, logística internacional y atención a clientes. Esa intersección me permite traducir necesidades de negocio en flujos claros, productos útiles y decisiones operativas concretas.",
    "He trabajado en entornos donde la comunicación, el seguimiento y la velocidad importan. Aprendo rápido, documento lo esencial y disfruto liderar conversaciones que convierten problemas ambiguos en próximos pasos accionables.",
  ],
  educationNote: "La información académica detallada y sus soportes se agregará cuando sea confirmada.",
  certificationsNote:
    "Las certificaciones se publicarán con sus enlaces verificables cuando estén disponibles.",
} as const;

export const socialLinks = {
  github: null,
  linkedin: null,
  email: null,
  whatsapp: null,
} satisfies Record<string, string | null>;

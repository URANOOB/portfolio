export const profile = {
  name: "William Galeano",
  initials: "WG",
  headline: "Desarrollador de Software Full Stack",
  location: "Bogotá, Colombia",
  availability: "Abierto a oportunidades en desarrollo de software",
  languages: ["Español nativo", "Inglés B2+"],
  intro:
    "Construyo productos web claros, rápidos y mantenibles que convierten necesidades reales en experiencias digitales útiles.",
  about: [
    "Me enfoco en desarrollo de software y en la construcción de productos digitales con interfaces claras, arquitectura mantenible y buen rendimiento.",
    "Disfruto transformar problemas ambiguos en funcionalidades concretas, aprender herramientas nuevas y mejorar cada entrega mediante iteración, documentación y criterio de producto.",
  ],
  educationNote: "La información académica detallada y sus soportes se agregará cuando sea confirmada.",
  certificationsNote:
    "Las certificaciones se publicarán con sus enlaces verificables cuando estén disponibles.",
} as const;

export const socialLinks = {
  github: "https://github.com/URANOOB",
  linkedin: "https://www.linkedin.com/in/william-eduardo-galeano-ramirez-861549368/",
  email: "mailto:will21@hotmail.es",
  phone: null,
  whatsapp: null,
} satisfies Record<string, string | null>;

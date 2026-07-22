import type { Experience } from "@/types/portfolio";

export const experience: Experience[] = [
  {
    track: "logistics",
    company: "Lean Group",
    role: "Coordinación logística senior",
    period: "Fechas por confirmar",
    summary:
      "Coordinación de operaciones, seguimiento de prioridades y comunicación con clientes y aliados internacionales.",
    responsibilities: [
      "Dar visibilidad al estado de operaciones y excepciones.",
      "Coordinar conversaciones entre clientes, transportistas y equipos internos.",
      "Priorizar incidencias en entornos de alta velocidad.",
    ],
    tools: ["TMS", "CRM", "Hojas de cálculo", "Inglés profesional"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "JB Hunt",
    role: "Operaciones logísticas",
    period: "Fechas por confirmar",
    summary: "Experiencia vinculada con seguimiento operativo, servicio y coordinación de transporte.",
    responsibilities: ["Seguimiento de cargas", "Comunicación operativa", "Gestión de novedades"],
    tools: ["Plataformas logísticas", "Inglés profesional"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "Avenger Logistics",
    role: "Operaciones logísticas",
    period: "Fechas por confirmar",
    summary: "Soporte a operaciones de transporte y atención a requerimientos de clientes internacionales.",
    responsibilities: ["Coordinación de operaciones", "Atención al cliente", "Seguimiento de entregas"],
    tools: ["TMS", "Correo", "Hojas de cálculo"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "USA Truck / DB Schenker",
    role: "Logística internacional",
    period: "Fechas por confirmar",
    summary: "Experiencia en ecosistemas de transporte y logística con múltiples actores.",
    responsibilities: ["Trazabilidad", "Gestión de excepciones", "Coordinación internacional"],
    tools: ["Plataformas logísticas", "Inglés profesional"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "Concentrix",
    role: "Servicio al cliente internacional",
    period: "Fechas por confirmar",
    summary: "Atención de clientes en un entorno de procesos, métricas y comunicación bilingüe.",
    responsibilities: ["Resolución de solicitudes", "Seguimiento de casos", "Comunicación bilingüe"],
    tools: ["CRM", "Sistemas de tickets"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "Ingenio Empresarial",
    role: "Experiencia profesional",
    period: "Fechas por confirmar",
    summary:
      "Participación en iniciativas de negocio y tecnología; el detalle contractual está pendiente de validación.",
    responsibilities: ["Trabajo colaborativo", "Aprendizaje rápido", "Orientación a resultados"],
    tools: ["Herramientas digitales"],
    achievements: [],
  },
  {
    track: "logistics",
    company: "Nexa BPO",
    role: "Servicio y operaciones",
    period: "Fechas por confirmar",
    summary: "Experiencia en atención, seguimiento y cumplimiento de procesos operativos.",
    responsibilities: ["Atención de solicitudes", "Documentación de casos", "Cumplimiento de procesos"],
    tools: ["CRM", "Telefonía", "Correo"],
    achievements: [],
  },
  {
    track: "software",
    company: "Inglés Pa’ la Paz",
    role: "Desarrollo web y contribución social",
    period: "En curso",
    summary:
      "Construcción de una experiencia digital para una iniciativa de educación en inglés con impacto social.",
    responsibilities: ["Desarrollo frontend", "Arquitectura de contenido", "Mejora continua"],
    tools: ["Next.js", "React", "TypeScript"],
    achievements: [],
  },
];

export const logisticsExperience = experience.filter((item) => item.track === "logistics");

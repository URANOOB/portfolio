import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "atlas-splitter",
    title: "Atlas Splitter",
    eyebrow: "Computer vision utility",
    description: "Herramienta para separar atlas WEBP y exportar elementos listos para flujos gráficos.",
    longDescription:
      "Una utilidad de escritorio enfocada en procesar atlas de imágenes, detectar sus regiones y exportar PNG, máscaras y archivos preparados para composición en PSD.",
    technologies: ["Python", "OpenCV", "Procesamiento de imágenes", "WEBP"],
    status: "En desarrollo",
    repository: null,
    demo: null,
    challenges: [
      "Detectar regiones con transparencias y bordes irregulares.",
      "Conservar calidad y metadatos durante la exportación.",
      "Diseñar una salida útil para distintos flujos creativos.",
    ],
    learnings: [
      "Segmentación y manipulación eficiente de imágenes.",
      "Diseño de herramientas orientadas a un flujo de trabajo real.",
    ],
    accent: "orange",
  },
  {
    slug: "ingles-pa-la-paz",
    title: "Inglés Pa’ la Paz",
    eyebrow: "Social impact platform",
    description: "Plataforma digital para acercar educación en inglés a comunidades vulnerables.",
    longDescription:
      "Sitio y plataforma web para una organización social que conecta contenido, comunidad y oportunidades de aprendizaje de inglés con una experiencia accesible.",
    technologies: ["Next.js", "React", "TypeScript", "Base de datos"],
    status: "Activo",
    repository: null,
    demo: null,
    challenges: [
      "Priorizar accesibilidad y desempeño en dispositivos diversos.",
      "Estructurar contenido fácil de mantener por el equipo.",
      "Equilibrar identidad social con una experiencia profesional.",
    ],
    learnings: [
      "Construcción de producto con propósito social.",
      "Arquitectura de contenido y componentes reutilizables.",
    ],
    accent: "blue",
  },
  {
    slug: "asistente-juridico-ia",
    title: "Asistente jurídico con IA",
    eyebrow: "Private AI workspace",
    description: "Concepto privado para gestionar conocimiento, documentos y relaciones de una firma legal.",
    longDescription:
      "Diseño conceptual de una plataforma privada para abogados con gestión documental, búsqueda semántica, CRM, agenda e integración con modelos de inteligencia artificial.",
    technologies: ["IA", "Búsqueda semántica", "Google Drive", "CRM"],
    status: "Concepto privado",
    repository: null,
    demo: null,
    challenges: [
      "Mantener privacidad y trazabilidad del conocimiento sensible.",
      "Unificar documentos, clientes y agenda sin fricción.",
      "Diseñar respuestas asistidas que conserven control humano.",
    ],
    learnings: [
      "Diseño de flujos con IA centrados en revisión profesional.",
      "Modelado de permisos y fuentes de conocimiento.",
    ],
    accent: "violet",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

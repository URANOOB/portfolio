import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "atlas-splitter",
    role: "Creador y desarrollador Python",
    period: "2026 - Presente",
    context: "Herramienta personal",
    outcome: "Automatiza la detección de regiones y exporta recursos listos para producción.",
    timeline: { start: 0, end: 100 },
    title: "Atlas Splitter",
    eyebrow: "Herramienta de visión por computador",
    description: "Herramienta para separar atlas WEBP y exportar elementos listos para flujos gráficos.",
    longDescription:
      "Una utilidad de escritorio enfocada en procesar atlas de imágenes, detectar sus regiones y exportar PNG, máscaras y archivos preparados para composición en PSD.",
    technologies: ["Python", "OpenCV", "Procesamiento de imágenes", "WEBP"],
    tasks: ["Aplicación de escritorio", "Visión por computador", "Automatización"],
    status: "En desarrollo",
    repository: "https://github.com/URANOOB/atlas-splitter",
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
    role: "Desarrollador de software full stack",
    period: "2026 - Presente",
    context: "Voluntariado · Impacto social",
    outcome: "Mantiene una plataforma educativa accesible con APIs, SEO y flujos de despliegue.",
    timeline: { start: 0, end: 100 },
    title: "Inglés Pa’ la Paz",
    eyebrow: "Plataforma de impacto social",
    description: "Plataforma digital para acercar educación en inglés a comunidades vulnerables.",
    longDescription:
      "Sitio y plataforma web para una organización social que conecta contenido, comunidad y oportunidades de aprendizaje de inglés con una experiencia accesible.",
    technologies: ["Next.js", "React", "TypeScript", "Base de datos"],
    tasks: ["Producto", "Frontend", "Backend", "Accesibilidad"],
    status: "Activo",
    repository: null,
    demo: "https://inglespalapaz.com/",
    links: [{ label: "Instagram", href: "https://www.instagram.com/ingles.pa.lapaz/" }],
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
    slug: "generacion-clasificacion-datos",
    role: "Desarrollador Java",
    period: "Mar–Abr 2026",
    context: "Académico · Procesamiento de datos",
    outcome: "Genera datos de prueba estructurados y clasifica ventas y productos en reportes CSV.",
    timeline: { start: 28.6, end: 57.2 },
    title: "Generación y clasificación de datos",
    eyebrow: "Proyecto Java de procesamiento de datos",
    description: "Generador y clasificador de datos de productos, vendedores y ventas con reportes CSV.",
    longDescription:
      "Proyecto desarrollado en Java para generar archivos de prueba, leer ventas por vendedor y producir reportes ordenados por recaudo y cantidad de productos vendidos.",
    technologies: ["Java 8", "Eclipse", "TXT", "CSV", "Git"],
    tasks: ["Generación de datos", "Procesamiento", "Reportes"],
    status: "Completado",
    repository: "https://github.com/URANOOB/generacion-clasificacion-datos",
    demo: null,
    challenges: [
      "Modelar productos, vendedores y ventas en archivos planos consistentes.",
      "Calcular y ordenar resultados a partir de múltiples fuentes de datos.",
      "Generar reportes CSV reutilizables y fáciles de verificar.",
    ],
    learnings: [
      "Lectura, escritura y transformación de archivos con Java.",
      "Separación de responsabilidades entre generación, dominio y reportes.",
    ],
    accent: "blue",
  },
  {
    slug: "food-project",
    role: "Desarrollador frontend y concepto de producto",
    period: "29 Abr–2 May 2026",
    context: "Concepto para restaurante",
    outcome:
      "Presenta un sitio de restaurante responsive con navegación de menú, SEO local y llamados a la acción.",
    timeline: { start: 42.9, end: 71.5 },
    title: "FoodProject",
    eyebrow: "Concepto digital para restaurante",
    description: "Concepto web para un restaurante de comida callejera con carta, ubicación y contacto.",
    longDescription:
      "Concepto de producto para Döminiös K·Ribe: una experiencia web responsiva que presenta su propuesta gastronómica, organiza la carta por categorías y facilita la conversión mediante ubicación y llamados a la acción.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO local"],
    tasks: ["Diseño de interfaz", "Frontend", "Diseño responsive", "SEO"],
    status: "Concepto",
    repository: "https://github.com/URANOOB/FoodProject",
    demo: "https://food-project-sjk6.vercel.app",
    challenges: [
      "Convertir una carta extensa en una navegación clara y adaptable.",
      "Mantener imágenes y contenido comercial ágiles en móvil.",
      "Integrar SEO estructurado para un negocio local en Bogotá.",
    ],
    learnings: [
      "Diseño de experiencias digitales orientadas a conversión local.",
      "Optimización responsiva de menús, imágenes y llamadas a la acción.",
    ],
    accent: "orange",
  },
  {
    slug: "ipp-concept",
    role: "Desarrollador frontend y concepto de interfaz",
    period: "5–26 Jun 2026",
    context: "Concepto educativo",
    outcome:
      "Explora una experiencia educativa con movimiento y arquitectura reutilizable por funcionalidades.",
    timeline: { start: 71.4, end: 85.7 },
    title: "IPP Concept",
    eyebrow: "Concepto de plataforma educativa",
    description: "Concepto visual y técnico para la experiencia digital de Inglés Pa’ la Paz.",
    longDescription:
      "Exploración de interfaz para Inglés Pa’ la Paz construida con Next.js y una arquitectura por features, enfocada en una identidad amigable, animaciones cuidadas y componentes reutilizables.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tasks: ["Concepto de interfaz", "Frontend", "Movimiento", "Sistema de diseño"],
    status: "Concepto",
    repository: "https://github.com/URANOOB/IPPConcept",
    demo: null,
    links: [
      { label: "Sitio web de IPP", href: "https://inglespalapaz.com/" },
      { label: "Instagram de IPP", href: "https://www.instagram.com/ingles.pa.lapaz/" },
    ],
    challenges: [
      "Traducir una identidad educativa cálida a un sistema visual coherente.",
      "Organizar rutas y componentes por features sin sobreestructurar el proyecto.",
      "Equilibrar movimiento, legibilidad y rendimiento.",
    ],
    learnings: [
      "Arquitectura frontend modular con Next.js App Router.",
      "Uso intencional de animación para reforzar una narrativa de marca.",
    ],
    accent: "violet",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

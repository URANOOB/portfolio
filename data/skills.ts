import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Interfaces rápidas, claras y adaptables.",
    skills: [
      { name: "React", level: "Principal", projects: ["Inglés Pa’ la Paz", "Urano OS"] },
      { name: "Next.js", level: "Principal", projects: ["Inglés Pa’ la Paz", "Urano OS"] },
      { name: "TypeScript", level: "Principal", projects: ["Inglés Pa’ la Paz", "Urano OS"] },
      { name: "JavaScript", level: "Trabajo habitual", projects: ["Aplicaciones web"] },
      { name: "Tailwind CSS", level: "Trabajo habitual", projects: ["Urano OS"] },
      { name: "HTML / CSS", level: "Trabajo habitual", projects: ["Interfaces web"] },
    ],
  },
  {
    title: "Backend y datos",
    description: "Servicios e información conectados al producto.",
    skills: [
      { name: "Node.js", level: "Trabajo habitual", projects: ["Aplicaciones web"] },
      { name: "API REST", level: "Trabajo habitual", projects: ["Integraciones"] },
      { name: "SQL", level: "Trabajo habitual", projects: ["Aplicaciones con datos"] },
      { name: "PostgreSQL", level: "En crecimiento", projects: ["Aplicaciones con datos"] },
      { name: "Supabase", level: "En crecimiento", projects: ["Inglés Pa’ la Paz"] },
    ],
  },
  {
    title: "Herramientas y exploración",
    description: "Tecnologías que amplían el alcance de cada solución.",
    skills: [
      { name: "Python / OpenCV", level: "Trabajo habitual", projects: ["Atlas Splitter"] },
      { name: "Java", level: "En crecimiento", projects: ["Formación técnica"] },
      { name: "Git / GitHub", level: "Trabajo habitual", projects: ["Control de versiones"] },
      { name: "Vercel", level: "Trabajo habitual", projects: ["Despliegues web"] },
      { name: "Docker", level: "En crecimiento", projects: ["Entornos reproducibles"] },
      { name: "IA y automatización", level: "En crecimiento", projects: ["Asistente jurídico con IA"] },
    ],
  },
];

export const skillsExperienceNote =
  "Los años exactos de experiencia se publicarán cuando hayan sido verificados; los niveles reflejan el uso relativo dentro del portafolio.";

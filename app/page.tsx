import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/DesktopShell";

export const metadata: Metadata = {
  title: { absolute: "William Galeano | Software Developer | R/COON OS" },
  description:
    "Portafolio interactivo de William Galeano, desarrollador de software full stack en Bogotá con experiencia en Next.js, React, TypeScript, Python, Java y soluciones digitales.",
};

export default function Home() {
  return <DesktopShell />;
}

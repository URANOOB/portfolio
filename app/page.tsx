import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DesktopShell } from "@/components/desktop/DesktopShell";
import { getLanguage } from "@/lib/language";

export async function generateMetadata(): Promise<Metadata> {
  const isEnglish = getLanguage((await cookies()).get("rcoon-language")?.value) === "en";
  return {
    title: { absolute: "William Galeano | Software Developer | R/COON OS" },
    description: isEnglish
      ? "Interactive portfolio of William Galeano, a full stack software developer in Bogotá."
      : "Portafolio interactivo de William Galeano, desarrollador de software full stack en Bogotá.",
  };
}

export default async function Home() {
  const language = getLanguage((await cookies()).get("rcoon-language")?.value);
  return <DesktopShell initialLanguage={language} />;
}

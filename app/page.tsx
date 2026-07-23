import type { Metadata } from "next";
import { DesktopShell } from "@/components/desktop/DesktopShell";

export const metadata: Metadata = {
  title: "Escritorio",
  description:
    "Explora el trabajo, la experiencia y el perfil profesional de William Galeano en R/COON Porfolio.",
};

export default function Home() {
  return <DesktopShell />;
}

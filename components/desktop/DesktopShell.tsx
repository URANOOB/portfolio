"use client";

import { useEffect } from "react";
import { BootScreen } from "@/components/desktop/BootScreen";
import { DesktopShortcut } from "@/components/desktop/DesktopShortcut";
import { Dock } from "@/components/desktop/Dock";
import { MenuBar } from "@/components/desktop/MenuBar";
import { SceneWallpaper } from "@/components/desktop/SceneWallpaper";
import { WindowLayer } from "@/components/windows/WindowLayer";
import { desktopShortcuts } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

export function DesktopShell() {
  const theme = usePreferencesStore((state) => state.theme);
  const accent = usePreferencesStore((state) => state.accent);
  const textSize = usePreferencesStore((state) => state.textSize);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openWindow("finder");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openWindow]);

  return (
    <main className="desktop" data-theme={theme} data-accent={accent} data-text-size={textSize}>
      <a className="skip-link" href="#desktop-intro">
        Saltar al contenido
      </a>
      <SceneWallpaper />

      <MenuBar />

      <section className="desktop-content" id="desktop-intro" aria-label="Escritorio del portafolio">
        <div className="desktop-shortcuts" aria-label="Accesos rápidos">
          {desktopShortcuts.map((id) => (
            <DesktopShortcut key={id} id={id} />
          ))}
        </div>

      </section>

      <WindowLayer />
      <Dock />
      <BootScreen />
    </main>
  );
}

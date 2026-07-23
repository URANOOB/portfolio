"use client";

import { useEffect, useRef, useState } from "react";
import { BootScreen } from "@/components/desktop/BootScreen";
import { DesktopShortcut } from "@/components/desktop/DesktopShortcut";
import { Dock } from "@/components/desktop/Dock";
import { MenuBar } from "@/components/desktop/MenuBar";
import { SceneWallpaper } from "@/components/desktop/SceneWallpaper";
import { WindowLayer } from "@/components/windows/WindowLayer";
import { desktopShortcuts } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

type ShortcutId = (typeof desktopShortcuts)[number];
type ShortcutPosition = { x: number; y: number };

const shortcutStorageKey = "rcoon-desktop-shortcuts";
const defaultShortcutPositions: Record<ShortcutId, ShortcutPosition> = {
  resume: { x: 16, y: 18 },
  logistics: { x: 16, y: 112 },
};

export function DesktopShell() {
  const shortcutAreaRef = useRef<HTMLDivElement>(null);
  const [shortcutPositions, setShortcutPositions] =
    useState<Record<ShortcutId, ShortcutPosition>>(defaultShortcutPositions);
  const theme = usePreferencesStore((state) => state.theme);
  const accent = usePreferencesStore((state) => state.accent);
  const textSize = usePreferencesStore((state) => state.textSize);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(shortcutStorageKey) ?? "{}") as Partial<
        Record<ShortcutId, ShortcutPosition>
      >;
      setShortcutPositions((current) => {
        const next = { ...current };
        const maxX = Math.max(0, (shortcutAreaRef.current?.clientWidth ?? 83) - 83);
        const maxY = Math.max(0, (shortcutAreaRef.current?.clientHeight ?? 78) - 78);
        desktopShortcuts.forEach((id) => {
          const position = saved[id];
          if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) {
            next[id] = {
              x: Math.min(Math.max(0, position.x), maxX),
              y: Math.min(Math.max(0, position.y), maxY),
            };
          }
        });
        return next;
      });
    } catch {
      localStorage.removeItem(shortcutStorageKey);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openWindow("search");
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
        <div ref={shortcutAreaRef} className="desktop-shortcuts" aria-label="Accesos rápidos movibles">
          {desktopShortcuts.map((id) => (
            <DesktopShortcut
              key={id}
              id={id}
              position={shortcutPositions[id]}
              constraintsRef={shortcutAreaRef}
              onMove={(position) => {
                setShortcutPositions((current) => {
                  const next = { ...current, [id]: position };
                  localStorage.setItem(shortcutStorageKey, JSON.stringify(next));
                  return next;
                });
              }}
            />
          ))}
        </div>
      </section>

      <WindowLayer />
      <Dock />
      <BootScreen />
    </main>
  );
}

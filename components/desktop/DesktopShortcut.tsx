"use client";

import { appDefinitions } from "@/data/navigation";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

export function DesktopShortcut({ id }: { id: AppId }) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const definition = appDefinitions[id];
  const Icon = definition.icon;

  return (
    <button
      className="desktop-shortcut"
      onClick={() => openWindow(id)}
      aria-label={`Abrir ${definition.title}`}
    >
      <span className="shortcut-icon" style={{ "--app-color": definition.color } as React.CSSProperties}>
        <Icon size={28} strokeWidth={1.7} />
      </span>
      <span>{definition.title}</span>
    </button>
  );
}

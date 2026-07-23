"use client";

import { motion, type MotionStyle, type PanInfo } from "framer-motion";
import { useRef, type RefObject } from "react";
import { appDefinitions } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

interface DesktopShortcutProps {
  id: AppId;
  position: { x: number; y: number };
  constraintsRef: RefObject<HTMLDivElement | null>;
  onMove: (position: { x: number; y: number }) => void;
}

export function DesktopShortcut({ id, position, constraintsRef, onMove }: DesktopShortcutProps) {
  const dragged = useRef(false);
  const openWindow = useWindowStore((state) => state.openWindow);
  const language = usePreferencesStore((state) => state.language);
  const definition = appDefinitions[id];
  const Icon = definition.icon;

  return (
    <motion.button
      className="desktop-shortcut"
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={(_, info: PanInfo) => {
        onMove({ x: position.x + info.offset.x, y: position.y + info.offset.y });
        window.setTimeout(() => {
          dragged.current = false;
        }, 0);
      }}
      onClick={() => {
        if (!dragged.current) openWindow(id);
      }}
      aria-label={`${language === "es" ? "Abrir" : "Open"} ${definition.title[language]}`}
      title={
        language === "es"
          ? `Arrastra para mover · Clic para abrir ${definition.title[language]}`
          : `Drag to move · Click to open ${definition.title[language]}`
      }
      style={
        {
          x: position.x,
          y: position.y,
          "--app-color": definition.color,
        } as MotionStyle & { "--app-color": string }
      }
    >
      <span className="shortcut-icon">
        <Icon size={28} strokeWidth={1.7} />
      </span>
      <span className="shortcut-label">{appDefinitions[id].title[language]}</span>
    </motion.button>
  );
}

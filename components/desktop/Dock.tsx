"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { appDefinitions, dockApps } from "@/data/navigation";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

function DockItem({ id, mouseX }: { id: AppId; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null);
  const windowState = useWindowStore((state) => state.windows[id]);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const definition = appDefinitions[id];
  const Icon = definition.icon;
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? value - (bounds.left + bounds.width / 2) : 200;
  });
  const sizeSync = useTransform(distance, [-140, 0, 140], [58, 78, 58]);
  const size = useSpring(sizeSync, { mass: 0.12, stiffness: 210, damping: 16 });

  const activate = () => {
    if (windowState.isOpen) focusWindow(id);
    else openWindow(id);
  };

  return (
    <motion.button
      ref={ref}
      className="dock-item"
      style={
        { "--app-color": definition.color } as MotionStyle & {
          "--app-color": string;
        }
      }
      onClick={activate}
      aria-label={`${windowState.isOpen ? "Enfocar" : "Abrir"} ${definition.title}`}
    >
      <motion.span className="dock-icon" style={{ width: size, height: size }} aria-hidden="true">
        <Icon size={34} strokeWidth={1.6} />
      </motion.span>
      <span className="dock-label">{definition.title}</span>
      {windowState.isOpen ? <span className="open-indicator" aria-hidden="true" /> : null}
    </motion.button>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <nav aria-label="Aplicaciones" className="dock-wrap">
      <motion.div
        className="dock glass-panel"
        onMouseMove={(event) => mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      >
        {dockApps.map((id) => (
          <DockItem key={id} id={id} mouseX={mouseX} />
        ))}
      </motion.div>
    </nav>
  );
}

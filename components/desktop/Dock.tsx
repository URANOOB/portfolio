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
  const widthSync = useTransform(distance, [-120, 0, 120], [46, 64, 46]);
  const size = useSpring(widthSync, { mass: 0.12, stiffness: 210, damping: 16 });

  const activate = () => {
    if (windowState.isOpen) focusWindow(id);
    else openWindow(id);
  };

  return (
    <motion.button
      ref={ref}
      className="dock-item"
      style={
        { width: size, height: size, "--app-color": definition.color } as MotionStyle & {
          "--app-color": string;
        }
      }
      onClick={activate}
      aria-label={`${windowState.isOpen ? "Enfocar" : "Abrir"} ${definition.title}`}
    >
      <span className="dock-tooltip" role="tooltip">
        {definition.title}
      </span>
      <Icon size={27} strokeWidth={1.65} />
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

"use client";

import { AnimatePresence } from "framer-motion";
import { WindowFrame } from "@/components/windows/WindowFrame";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const ids: AppId[] = [
  "finder",
  "about",
  "experience",
  "logistics",
  "help",
  "search",
  "settings",
  "projects",
  "skills",
  "terminal",
  "resume",
  "contact",
];

export function WindowLayer() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <div className="window-layer" aria-live="polite">
      <AnimatePresence>
        {ids
          .filter((id) => windows[id].isOpen && !windows[id].isMinimized)
          .map((id) => (
            <WindowFrame key={id} id={id} />
          ))}
      </AnimatePresence>
    </div>
  );
}

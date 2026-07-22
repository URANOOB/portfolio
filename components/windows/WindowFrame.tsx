"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minus, X } from "lucide-react";
import { useRef } from "react";
import { AppContent } from "@/components/windows/AppContent";
import { appDefinitions } from "@/data/navigation";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

interface PointerOrigin {
  pointerX: number;
  pointerY: number;
  valueX: number;
  valueY: number;
}

export function WindowFrame({ id }: { id: AppId }) {
  const windowState = useWindowStore((state) => state.windows[id]);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const toggleMaximize = useWindowStore((state) => state.toggleMaximize);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const moveWindow = useWindowStore((state) => state.moveWindow);
  const resizeWindow = useWindowStore((state) => state.resizeWindow);
  const dragOrigin = useRef<PointerOrigin | null>(null);
  const resizeOrigin = useRef<PointerOrigin | null>(null);
  const reduceMotion = useReducedMotion();
  const definition = appDefinitions[id];
  const Icon = definition.icon;

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (windowState.isMaximized || event.button !== 0) return;
    dragOrigin.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      valueX: windowState.position.x,
      valueY: windowState.position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    focusWindow(id);
  };

  const drag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOrigin.current) return;
    const x = dragOrigin.current.valueX + event.clientX - dragOrigin.current.pointerX;
    const y = dragOrigin.current.valueY + event.clientY - dragOrigin.current.pointerY;
    const maxX = Math.max(8, window.innerWidth - 140);
    const maxY = Math.max(52, window.innerHeight - 100);
    moveWindow(id, Math.min(x, maxX), Math.min(y, maxY));
  };

  const startResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (windowState.isMaximized || event.button !== 0) return;
    resizeOrigin.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      valueX: windowState.size.width,
      valueY: windowState.size.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const resize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!resizeOrigin.current) return;
    const maxWidth = window.innerWidth - windowState.position.x - 8;
    const maxHeight = window.innerHeight - windowState.position.y - 82;
    resizeWindow(
      id,
      Math.min(resizeOrigin.current.valueX + event.clientX - resizeOrigin.current.pointerX, maxWidth),
      Math.min(resizeOrigin.current.valueY + event.clientY - resizeOrigin.current.pointerY, maxHeight),
    );
  };

  const style = windowState.isMaximized
    ? { left: 8, top: 49, width: "calc(100vw - 16px)", height: "calc(100vh - 126px)" }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
      };

  return (
    <motion.section
      className={`window-frame ${windowState.isMaximized ? "is-maximized" : ""}`}
      style={{ ...style, zIndex: windowState.zIndex }}
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.92, y: reduceMotion ? 0 : 24 }}
      transition={{
        type: reduceMotion ? "tween" : "spring",
        duration: reduceMotion ? 0 : undefined,
        bounce: 0.18,
      }}
      onPointerDown={() => focusWindow(id)}
      aria-label={`Ventana ${definition.title}`}
    >
      <div
        className="window-titlebar"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={() => (dragOrigin.current = null)}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="window-controls" onPointerDown={(event) => event.stopPropagation()}>
          <button
            className="window-close"
            onClick={() => closeWindow(id)}
            aria-label={`Cerrar ${definition.title}`}
          >
            <X size={11} />
          </button>
          <button
            className="window-minimize"
            onClick={() => minimizeWindow(id)}
            aria-label={`Minimizar ${definition.title}`}
          >
            <Minus size={11} />
          </button>
          <button
            className="window-maximize"
            onClick={() => toggleMaximize(id)}
            aria-label={`Maximizar ${definition.title}`}
          >
            <Maximize2 size={9} />
          </button>
        </div>
        <div className="window-title">
          <Icon size={16} style={{ color: definition.color }} />
          <span>{definition.title}</span>
        </div>
        <span className="titlebar-spacer" />
      </div>
      <div className="window-body">
        <AppContent id={id} />
      </div>
      {!windowState.isMaximized ? (
        <button
          className="resize-handle"
          aria-label={`Cambiar tamaño de ${definition.title}`}
          onPointerDown={startResize}
          onPointerMove={resize}
          onPointerUp={() => (resizeOrigin.current = null)}
        />
      ) : null}
    </motion.section>
  );
}

"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function SceneWallpaper() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.55 });
  const backX = useTransform(smoothX, [-1, 1], [10, -10]);
  const middleX = useTransform(smoothX, [-1, 1], [22, -22]);
  const frontX = useTransform(smoothX, [-1, 1], [38, -38]);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) {
      pointerX.set(0);
      return;
    }

    const updatePointer = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
    };
    const resetPointer = () => pointerX.set(0);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("mouseleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("mouseleave", resetPointer);
    };
  }, [pointerX, reduceMotion]);

  return (
    <div className="scene-wallpaper" aria-hidden="true">
      <motion.img
        className="scene-layer scene-layer-back"
        src="/scene/scene-back.svg"
        alt=""
        draggable={false}
        decoding="async"
        fetchPriority="high"
        style={{ x: backX }}
      />
      <motion.img
        className="scene-layer scene-layer-middle"
        src="/scene/scene-mid.svg"
        alt=""
        draggable={false}
        decoding="async"
        loading="eager"
        style={{ x: middleX }}
      />
      <motion.img
        className="scene-layer scene-layer-front"
        src="/scene/scene-front.svg"
        alt=""
        draggable={false}
        decoding="async"
        loading="eager"
        style={{ x: frontX }}
      />
    </div>
  );
}

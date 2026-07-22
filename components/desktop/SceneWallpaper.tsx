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
      <motion.object
        className="scene-layer scene-layer-back"
        data="/scene/scene-back.svg"
        type="image/svg+xml"
        tabIndex={-1}
        style={{ x: backX }}
      />
      <motion.object
        className="scene-layer scene-layer-middle"
        data="/scene/scene-mid.svg"
        type="image/svg+xml"
        tabIndex={-1}
        style={{ x: middleX }}
      />
      <motion.object
        className="scene-layer scene-layer-front"
        data="/scene/scene-front.svg"
        type="image/svg+xml"
        tabIndex={-1}
        style={{ x: frontX }}
      />
    </div>
  );
}

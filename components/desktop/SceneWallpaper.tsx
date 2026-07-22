"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type SceneLayers = {
  back: string;
  middle: string;
  front: string;
};

const layerSources = [
  ["back", "/scene/scene-back.svg"],
  ["middle", "/scene/scene-mid.svg"],
  ["front", "/scene/scene-front.svg"],
] as const;

function prepareSvg(markup: string) {
  return markup.replace(
    "<svg ",
    '<svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" ',
  );
}

export function SceneWallpaper() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.55 });
  const backX = useTransform(smoothX, [-1, 1], [10, -10]);
  const middleX = useTransform(smoothX, [-1, 1], [22, -22]);
  const frontX = useTransform(smoothX, [-1, 1], [38, -38]);
  const [layers, setLayers] = useState<SceneLayers | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all(
      layerSources.map(async ([name, source]) => {
        const response = await fetch(source, { signal: controller.signal });
        if (!response.ok) throw new Error(`Unable to load ${source}`);
        return [name, prepareSvg(await response.text())] as const;
      }),
    )
      .then((entries) => setLayers(Object.fromEntries(entries) as SceneLayers))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setLayers(null);
      });

    return () => controller.abort();
  }, []);

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
      <motion.div
        className="scene-layer scene-layer-back"
        style={{ x: backX }}
        dangerouslySetInnerHTML={layers ? { __html: layers.back } : undefined}
      />
      <motion.div
        className="scene-layer scene-layer-middle"
        style={{ x: middleX }}
        dangerouslySetInnerHTML={layers ? { __html: layers.middle } : undefined}
      />
      <motion.div
        className="scene-layer scene-layer-front"
        style={{ x: frontX }}
        dangerouslySetInnerHTML={layers ? { __html: layers.front } : undefined}
      />
    </div>
  );
}

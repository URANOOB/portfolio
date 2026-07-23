"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePreferencesStore } from "@/store/preferences-store";

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const language = usePreferencesStore((state) => state.language);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 100 : 5000);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="boot-screen"
          role="status"
          aria-label="Iniciando R/COON Porfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <Image
            src="/terminal-raccoon-walk.gif"
            alt={language === "es" ? "Mapache cargando" : "Raccoon loading"}
            width={160}
            height={160}
            priority
            unoptimized
          />
          <p>R/COON</p>
          <span>{language === "es" ? "Preparando el espacio de trabajo" : "Preparing workspace"}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

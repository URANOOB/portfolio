"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getBootDelay, isBootDismissalKey } from "@/lib/boot";
import { usePreferencesStore } from "@/store/preferences-store";

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const language = usePreferencesStore((state) => state.language);

  useEffect(() => {
    const seen = sessionStorage.getItem("rcoon-boot-seen") === "true";
    const close = () => {
      sessionStorage.setItem("rcoon-boot-seen", "true");
      setVisible(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (isBootDismissalKey(event.key)) close();
    };
    const timer = window.setTimeout(close, getBootDelay(seen, Boolean(reduceMotion)));
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="boot-screen"
          role="status"
          aria-label={
            language === "es"
              ? "Iniciando R/COON OS. Pulsa una tecla o toca para continuar."
              : "Starting R/COON OS. Press a key or tap to continue."
          }
          onClick={() => {
            sessionStorage.setItem("rcoon-boot-seen", "true");
            setVisible(false);
          }}
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
          <p>R/COON OS</p>
          <span>
            {language === "es"
              ? "Preparando el espacio de trabajo · toca para continuar"
              : "Preparing workspace · tap to continue"}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

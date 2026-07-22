"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { UranoMark } from "@/components/ui/UranoMark";

export function BootScreen() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 100 : 1050);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="boot-screen"
          role="status"
          aria-label="Iniciando Urano OS"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <UranoMark size={58} />
          <p>URANO OS</p>
          <span>Preparando el espacio de trabajo</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

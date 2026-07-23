"use client";

import { useEffect } from "react";
import type { Language } from "@/store/preferences-store";

export function ProjectLanguageSync({ language }: { language: Language }) {
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}

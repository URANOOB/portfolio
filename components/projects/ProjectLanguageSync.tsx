"use client";

import { useEffect } from "react";
import { usePreferencesStore, type Language } from "@/store/preferences-store";

export function ProjectLanguageSync({ language }: { language: Language }) {
  const setLanguage = usePreferencesStore((state) => state.setLanguage);

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null;
}

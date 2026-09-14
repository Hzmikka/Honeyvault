"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("honeyvault-language");
    if (stored === "en" || stored === "es") {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("honeyvault-language", next);
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

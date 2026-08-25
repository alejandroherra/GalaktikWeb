/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { es } from "../data/translations_es";

const LanguageContext = createContext();

// Cache for loaded translations
const translationCache = { es };

const loadTranslations = async (lang) => {
  if (translationCache[lang]) return translationCache[lang];
  
  if (lang === "en") {
    const { en } = await import("../data/translations_en");
    translationCache.en = en;
    return en;
  }
  
  return translationCache.es;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [t, setT] = useState(es); // Start with ES as fallback (it's bundled)
  const [ready, setReady] = useState(false);

  // Load initial language (intentionally only on mount)
  useEffect(() => {
    loadTranslations(language).then((translations) => {
      setT(translations);
      setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = language === "en" ? "es" : "en";
    setLanguage(next);
    loadTranslations(next).then(setT);
  }, [language]);

  const value = { language, toggleLanguage, t, ready };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

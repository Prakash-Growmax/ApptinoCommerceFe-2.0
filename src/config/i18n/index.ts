import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import language resources
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

// Resources for i18next
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

void i18n
  // Use LanguageDetector to detect browser language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "userLanguage",
      caches: ["localStorage"],
    },
  });

export default i18n;

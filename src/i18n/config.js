import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../locales/ar.json";
import en from "../locales/en.json";

const savedLanguage =
  typeof window !== "undefined" ? window.localStorage.getItem("shophub_language") : null;
const initialLanguage = savedLanguage === "en" || savedLanguage === "ar" ? savedLanguage : "ar";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: ar,
      },
      en: {
        translation: en,
      },
    },

    lng: initialLanguage,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const updateDocumentLanguage = (language) => {
  if (typeof document === "undefined") return;
  const isArabic = language === "ar";
  window.localStorage.setItem("shophub_language", language);
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
};

updateDocumentLanguage(i18n.language);
i18n.on("languageChanged", updateDocumentLanguage);

export default i18n;
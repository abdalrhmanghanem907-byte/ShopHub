import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../locales/ar.json";
import en from "../locales/en.json";

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

    lng: "ar",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const updateDocumentLanguage = (language) => {
  if (typeof document === "undefined") return;
  const isArabic = language === "ar";
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
};

updateDocumentLanguage(i18n.language);
i18n.on("languageChanged", updateDocumentLanguage);

export default i18n;
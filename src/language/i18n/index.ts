import type { LanguageDetectorAsyncModule } from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { I18nManager } from "react-native";
import ar from "../locale/ar.json";
import en from "../locale/en.json";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (cb: (lang: string) => void) => cb(I18nManager.isRTL ? "ar" : "en"),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

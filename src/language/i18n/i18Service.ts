import i18next from "i18next";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import i18n from ".";

export const toggleLanguage = () => {
  if (I18nManager.isRTL) {
    I18nManager.forceRTL(false);
    i18next.changeLanguage("en");
  } else {
    I18nManager.forceRTL(true);
    i18next.changeLanguage("ar");
  }
  RNRestart.Restart();
};

export const lang = i18n.language as "en" | "ar";

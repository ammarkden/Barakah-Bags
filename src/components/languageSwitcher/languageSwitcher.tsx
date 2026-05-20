import { toggleLanguage } from "@/language/i18n/i18Service";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  return (
    <Pressable
      onPress={toggleLanguage}
      className="flex-row items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 active:opacity-80"
    >
      <Ionicons name="language-outline" size={18} color="#737373" />

      <Text className="font-medium text-black text-left">
        {t(i18n.language === "ar" ? "EN_SWITCHER" : "AR_SWITCHER")}
      </Text>
    </Pressable>
  );
};

export default LanguageSwitcher;

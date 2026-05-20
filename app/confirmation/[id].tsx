import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ConfirmationScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-8">
      <View className="items-center gap-4">
        <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center">
          <Text className="text-3xl">✓</Text>
        </View>

        <Text className="text-2xl font-semibold text-black text-center">
          {t("confirmation_title")}
        </Text>

        <Text className="text-gray-500 text-center text-sm">
          {t("confirmation_description", { id })}
        </Text>

        <Pressable
          className="mt-6 bg-black rounded-xl px-8 py-4 active:opacity-70"
          onPress={() => router.replace("/")}
        >
          <Text className="text-white font-semibold">
            {t("back_to_descover")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

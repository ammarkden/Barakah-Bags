import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const ErrorHandler = ({ error }: { error?: string }) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-white ">
      <Text className="text-neutral-400">
        {error ?? t("something_went_wrong")}.
      </Text>
    </View>
  );
};

export default ErrorHandler;

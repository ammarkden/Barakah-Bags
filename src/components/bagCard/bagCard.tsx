import { Bag } from "@/types/types";

import { useRouter } from "expo-router";

import { lang } from "@/language/i18n/i18Service";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  item: Bag;
  index: number;
};

export function BagCard({ item, index }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <Pressable
        onPress={() => router.push(`../bags/${item.id}`)}
        className="mb-3 overflow-hidden rounded-3xl bg-neutral-50 active:opacity-75"
      >
        <View className="h-44 w-full overflow-hidden">
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
        </View>

        <View className="gap-1 px-4 py-4">
          <Text className="text-xs uppercase tracking-widest text-neutral-400 text-left">
            {item.restaurantName}
          </Text>

          <Text className="text-lg font-semibold text-black text-left">
            {item.name[lang]}
          </Text>

          <View className="mt-1 flex-row items-center gap-2">
            <Text className="font-bold text-black ">{`${item.priceSAR} ${t("SAR")}`}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

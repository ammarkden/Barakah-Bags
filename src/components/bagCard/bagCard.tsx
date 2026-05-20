import { lang } from "@/i18n/i18Service";
import { Bag } from "@/types/types";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  item: Bag;
  index: number;
};

const BagCard = ({ item, index }: Props) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <Pressable
        onPress={() => router.push(`../bags/${item.id}`)}
        className="mb-4 overflow-hidden rounded-3xl bg-neutral-50 active:opacity-80"
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

        <View className="gap-2 px-4 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs uppercase tracking-widest text-neutral-400">
              {item.restaurantName}
            </Text>

            <View className="rounded-full bg-green-100 px-2 py-1">
              <Text className="text-xs font-semibold text-green-700">
                {item.quantityRemaining} {t("left")}
              </Text>
            </View>
          </View>

          <Text className="text-lg font-semibold text-black text-left">
            {item.name[lang]}
          </Text>

          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-black">
              {item.priceSAR} {t("SAR")}
            </Text>

            <Text className="text-sm text-neutral-400 line-through">
              {item.originalPriceSAR} {t("SAR")}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-sm text-neutral-500">
              {`${dayjs(item.pickupStart.toDate())
                .locale(lang)
                .format("h:mm A")} - ${dayjs(item.pickupEnd.toDate())
                .locale(lang)
                .format("h:mm A")}`}
            </Text>

            <Text className="text-sm text-neutral-500">📍 1.2 km</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default BagCard;

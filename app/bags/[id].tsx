import ErrorHandler from "@/components/errorHandler/errorHandling";
import { ActivityLoader } from "@/components/loader/loader";
import { useBag } from "@/hooks/bags/usebag";
import { useReserveBag } from "@/hooks/reservations/useCreateReservation";
import { lang } from "@/language/i18n/i18Service";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const BagDetailScreen = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { t } = useTranslation();

  const router = useRouter();

  const { data: bag, isLoading, isError } = useBag(id);
  const { mutateAsync: reserveBag, isPending } = useReserveBag();

  if (isLoading) {
    return <ActivityLoader />;
  }

  if (isError || !bag) {
    return <ErrorHandler />;
  }

  const discount = Math.round(
    ((bag.originalPriceSAR - bag.priceSAR) / bag.originalPriceSAR) * 100,
  );

  const handleReservation = async () => {
    try {
      const reservationId = await reserveBag({
        bagId: bag.id,
        totalSAR: bag.priceSAR,
      });

      router.push(`/confirmation/${reservationId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <Animated.View entering={FadeInDown.springify()}>
          <View className="h-80 w-full overflow-hidden bg-neutral-100">
            <Image
              source={{
                uri: bag.imageUrl,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="cover"
              transition={250}
              cachePolicy="memory-disk"
            />
          </View>
        </Animated.View>

        <View className="gap-5 px-5 py-5">
          <Animated.View
            entering={FadeInDown.delay(80).springify()}
            className="gap-2"
          >
            <Text className="text-xs uppercase tracking-widest text-neutral-400 text-left">
              {bag.restaurantName}
            </Text>

            <Text className="text-3xl font-bold text-black text-left">
              {bag.name[lang]}
            </Text>

            <View className="flex-row items-center gap-2">
              <Text className="text-2xl font-bold text-black text-left">
                {`${bag.priceSAR} ${t("SAR")}`}
              </Text>

              <Text className="text-base text-neutral-400 line-through">
                {`${bag.originalPriceSAR} ${t("SAR")}`}
              </Text>

              <View className="rounded-full bg-green-100 px-2 py-1">
                <Text className="text-xs font-semibold text-green-700">
                  {`${t("save")} ${discount}%`}
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(140).springify()}
            className="flex-row gap-3"
          >
            <View className="flex-1 rounded-3xl bg-neutral-100 p-4 items-start">
              <Ionicons name="time-outline" size={20} color="#737373" />

              <Text className="mt-3 text-xs uppercase tracking-wide text-neutral-400 text-left">
                {t("pickup_time")}
              </Text>

              <Text className="mt-1 font-semibold text-black text-left">
                {`${dayjs(bag.pickupStart.toDate())
                  .locale(lang)
                  .format("h:mm A")} - ${dayjs(bag.pickupEnd.toDate())
                  .locale(lang)
                  .format("h:mm A")}`}
              </Text>
            </View>

            <View className="flex-1 rounded-3xl bg-neutral-100 p-4 items-start">
              <Ionicons name="cube-outline" size={20} color="#737373" />

              <Text className="mt-3 text-xs uppercase tracking-wide text-neutral-400 text-left">
                {t("quantity_remaining")}
              </Text>

              <Text className="mt-1 font-semibold text-black text-left">
                {bag.quantityRemaining}
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(260).springify()}
        className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 py-5"
      >
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-neutral-400 line-through text-left">
              {bag.originalPriceSAR} {t("SAR")}
            </Text>

            <Text className="text-3xl font-bold text-black">
              {bag.priceSAR} {t("SAR")}
            </Text>
          </View>

          <View className="rounded-full bg-green-100 px-3 py-2">
            <Text className="font-semibold text-green-700">
              {`${t("save")} ${discount}%`}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={isPending}
          className="items-center rounded-3xl bg-black py-4 active:opacity-80 disabled:opacity-60"
          onPress={handleReservation}
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="font-semibold text-white">{t("buy_now")}</Text>
          )}
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

export default BagDetailScreen;

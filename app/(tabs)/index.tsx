import BagCard from "@/components/bagCard/bagCard";
import ErrorHandler from "@/components/errorHandler/errorHandling";
import LanguageSwitcher from "@/components/languageSwitcher/languageSwitcher";
import { useBags } from "@/hooks/bags/usebags";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["all", "bakery", "restaurant", "grocery"] as const;

type Category = (typeof categories)[number];

const ListScreen = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBags(selectedCategory);

  const bags = data?.pages.flatMap((p) => p.bags) ?? [];

  if (isError) {
    return <ErrorHandler />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={isLoading ? [] : bags}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <BagCard item={item} index={index} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <Animated.View entering={FadeInDown.springify()} className="py-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-3xl font-bold text-black text-left">
                  {t("barakah_bags")}
                </Text>

                <Text className="mt-1 text-neutral-400 text-left">
                  {t("discover")}
                </Text>
              </View>
              <LanguageSwitcher />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item}
              contentContainerStyle={{
                gap: 8,
                paddingTop: 20,
              }}
              renderItem={({ item: category }) => (
                <Pressable
                  onPress={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 ${
                    selectedCategory === category
                      ? "bg-black"
                      : "bg-neutral-100"
                  }`}
                >
                  <Text
                    className={`font-medium capitalize ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {t(category)}
                  </Text>
                </Pressable>
              )}
            />

            {isLoading && (
              <View className="items-center justify-center py-12">
                <ActivityIndicator />
              </View>
            )}
          </Animated.View>
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="items-center justify-center pt-24">
              <Text className="text-neutral-400">{t("no_bags_nearby")}</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default ListScreen;

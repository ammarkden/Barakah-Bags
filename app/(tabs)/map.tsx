import ErrorHandler from "@/components/errorHandler/errorHandling";
import { ActivityLoader } from "@/components/loader/loader";
import { useBags } from "@/hooks/bags/usebags";
import { lang } from "@/i18n/i18Service";
import { router } from "expo-router";
import { Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const RIYADH = {
  latitude: 24.7136,
  longitude: 46.6753,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const MapScreen = () => {
  const { data, isError, isLoading } = useBags();
  const bags = data?.pages.flatMap((p) => p.bags) ?? [];

  if (isLoading) return <ActivityLoader />;
  if (isError) return <ErrorHandler />;

  const markers = bags
    .filter((bag) => bag.latitude && bag.longitude)
    .map((bag) => (
      <Marker
        key={bag.id}
        coordinate={{
          latitude: bag.latitude!,
          longitude: bag.longitude!,
        }}
        onPress={() => router.push(`../bags/${bag.id}`)}
      >
        <View className="items-center">
          <View className="bg-black px-2 py-1 rounded-full mb-1">
            <Text className="text-white text-xs font-bold">
              {bag.name[lang]}
            </Text>
          </View>

          <View className="w-4 h-4 bg-black rounded-full border-2 border-white" />
        </View>
      </Marker>
    ));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}
        initialRegion={RIYADH}
        showsUserLocation
        showsMyLocationButton
        animationEnabled
        clusterColor="#000"
      >
        {markers}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

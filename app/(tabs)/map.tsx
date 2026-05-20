import ErrorHandler from "@/components/errorHandler/errorHandling";
import { ActivityLoader } from "@/components/loader/loader";
import { useBags } from "@/hooks/bags/usebags";
import React from "react";
import { useTranslation } from "react-i18next";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["all", "bakery", "restaurant", "grocery"] as const;
type Category = (typeof categories)[number];

const RIYADH = {
  latitude: 24.7136,
  longitude: 46.6753,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const MapScreen = () => {
  const { t, i18n } = useTranslation();
  const { data, isError, isLoading } = useBags();
  const bags = data?.pages.flatMap((p) => p.bags) ?? [];

  if (isLoading) return <ActivityLoader />;
  if (isError) return <ErrorHandler />;

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
        {bags.map((bag) =>
          bag.latitude && bag.longitude ? (
            <Marker
              key={bag.id}
              coordinate={{ latitude: bag.latitude, longitude: bag.longitude }}
              title={bag.name[i18n.language as "en" | "ar"]}
              description={`${bag.priceSAR} ${t("SAR")}`}
            />
          ) : null,
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

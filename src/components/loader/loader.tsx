import { ActivityIndicator, View } from "react-native";

const ActivityLoader = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator color={"#000"} />
    </View>
  );
};

export { ActivityLoader };

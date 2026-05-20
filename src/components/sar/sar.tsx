import { Image, Text, View } from "react-native";

const SARCurrency = ({
  price,
  textColor = "#000",
  tintColor = "#000",
  width = 13,
  height = 13,
  textSize = 16,
  textProps,
}: {
  price: number;
  textColor?: string;
  tintColor?: string;
  width?: number;
  height?: number;
  textSize?: number;
  textProps?: string;
}) => {
  return (
    <View className="flex-row  items-center gap-1">
      <Text
        className={`text-[${textSize}px] text-left text-[${textColor}] ${textProps}`}
      >
        {price}
      </Text>
      <Image
        style={{
          width,
          height,
          tintColor,
        }}
        source={require("./sar.png")}
      />
    </View>
  );
};

export default SARCurrency;

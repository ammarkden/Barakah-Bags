declare module "react-native-indicators" {
  import type { ComponentType } from "react";
  import type { Animated, StyleProp, ViewStyle } from "react-native";

  export type IndicatorRenderComponentArgs = {
    index: number;
    count: number;
    progress: Animated.Value;
  };

  export type IndicatorProps = {
    animationEasing?: (...args: unknown[]) => number;
    animationDuration?: number;
    hideAnimationDuration?: number;
    animating?: boolean;
    interaction?: boolean;
    hidesWhenStopped?: boolean;
    renderComponent?: (args: IndicatorRenderComponentArgs) => React.ReactNode;
    count?: number;
    style?: StyleProp<ViewStyle>;
  };

  export type IndicatorComponentProps = IndicatorProps & {
    color?: string;
    size?: number;
    trackWidth?: number;
  };

  export const Indicator: ComponentType<IndicatorProps>;
  export const BarIndicator: ComponentType<IndicatorComponentProps>;
  export const BallIndicator: ComponentType<IndicatorComponentProps>;
  export const DotIndicator: ComponentType<IndicatorComponentProps>;
  export const MaterialIndicator: ComponentType<IndicatorComponentProps>;
  export const PacmanIndicator: ComponentType<IndicatorComponentProps>;
  export const PulseIndicator: ComponentType<IndicatorComponentProps>;
  export const SkypeIndicator: ComponentType<IndicatorComponentProps>;
  export const UIActivityIndicator: ComponentType<IndicatorComponentProps>;
  export const WaveIndicator: ComponentType<IndicatorComponentProps>;
}

import { GlassView as RNGlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { styled } from "nativewind";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icons";
import { PressableScale } from "@/components/ui/pressable-scale";

import type { Tabs } from "expo-router";
import type { ComponentProps } from "react";

export type FloatingTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

const GlassView = styled(RNGlassView, { className: "style" });
const hasLiquidGlass = isLiquidGlassAvailable();

interface TabItemConfig {
  label: string;
  activeIcon: IconName;
  inactiveIcon: IconName;
}

const TAB_CONFIG: Record<string, TabItemConfig> = {
  home: {
    label: "Home",
    activeIcon: "homeFill",
    inactiveIcon: "home",
  },
  search: {
    label: "Search",
    activeIcon: "search",
    inactiveIcon: "search",
  },
  trips: {
    label: "Trips",
    activeIcon: "calendar",
    inactiveIcon: "calendar",
  },
  profile: {
    label: "Profile",
    activeIcon: "personFill",
    inactiveIcon: "person",
  },
};

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPosition = Math.max(insets.bottom, 16);

  const containerContent = (
    <View className="flex-row items-center justify-around py-2 px-3">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name] ?? {
          label: options.title ?? route.name,
          activeIcon: "homeFill",
          inactiveIcon: "home",
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            void Haptics.selectionAsync();
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PressableScale
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? config.label}
            className="flex-1 items-center justify-center py-1"
          >
            <View
              className={`size-12 items-center justify-center rounded-full ${isFocused ? "bg-primary" : "bg-transparent"
                }`}
              style={
                isFocused
                  ? {
                    shadowColor: "#ffc629",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.65,
                    shadowRadius: 10,
                    elevation: 6,
                  }
                  : undefined
              }
            >
              <Icon
                name={isFocused ? config.activeIcon : config.inactiveIcon}
                size={22}
                tone="ink"
              />
            </View>
            {/* <Text className="mt-1 font-jakarta-medium text-[11px] text-ink">
              {config.label}
            </Text> */}
          </PressableScale>
        );
      })}
    </View>
  );

  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: bottomPosition,
          left: 16,
          right: 16,
          maxWidth: 380,
          alignSelf: "center",
          zIndex: 50,
        },
        Platform.OS === "web"
          ? ({
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          } as any)
          : undefined,
      ]}
      className="overflow-hidden rounded-full border border-white/80 bg-white/75 shadow-overlay"
    >
      {hasLiquidGlass ? (
        <GlassView isInteractive className="rounded-full">
          {containerContent}
        </GlassView>
      ) : (
        containerContent
      )}
    </View>
  );
}

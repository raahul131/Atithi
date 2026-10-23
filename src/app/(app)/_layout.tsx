import { Tabs } from "expo-router";
import { DefaultTheme, ThemeProvider } from "expo-router/react-navigation";

import { FloatingTabBar } from "@/components/navigation/floating-tab-bar";

// Custom floating glass tab bar matching the design across iOS, Android, and Web.
export default function AppLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="trips" options={{ title: "Trips" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </ThemeProvider>
  );
}

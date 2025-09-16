import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

// UI Kitten imports
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => console.log(`Navigate to ${to}`)}
    >
      {/* Wrap everything inside ApplicationProvider */}
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeScreen style={{ flex: 1, backgroundColor: "#0b3e2aff" }}>
          <Slot />
        </SafeScreen>
        <StatusBar style="dark" />
      </ApplicationProvider>
    </ClerkProvider>
  );
}

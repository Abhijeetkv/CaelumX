import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} >
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;

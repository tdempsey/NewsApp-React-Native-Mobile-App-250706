import { View, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useCallback } from "react"; // Already imported
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  // *** FIX IS HERE: Add fontsLoaded and fontError to useCallback dependencies ***
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    // This setTimeout runs after the fonts are loaded
    setTimeout(() => {
      navigation.navigate("HomeTabs"); // As per our last discussion, navigate to HomeTabs
    }, 3000); // 3 seconds delay
  }, [fontsLoaded, fontError, navigation]); // <-- ADDED fontsLoaded, fontError, and navigation here

  // The useEffect is already correct as it depends on fontsLoaded and fontError
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]); // Changed to depend on onLayoutRootView itself after it's been memoized by useCallback

  // This check prevents rendering anything until fonts are loaded
  if (!fontsLoaded && !fontError) { // Added !fontError check here too for robustness
    return null;
  }

  return (
    <View
      // Removed onLayout={onLayoutRootView} from here as useEffect handles it
      className="flex-1 justify-center items-center"
    >
      <LinearGradient
        colors={["rgba(0, 85, 0, 0.95)", "rgba(0, 85, 0, 0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        // onLayout is often used for measuring, but here you want the effect to trigger on mount/font load
        // The useEffect hook with onLayoutRootView dependency already handles this,
        // so removing it from the JSX prevents potential double-triggers or issues.
        className=" "
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        <Text className="text-white text-3xl font-extrabold uppercase">
          Stacks news
        </Text>
      </View>
    </View>
  );
}
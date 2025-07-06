import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
// Add your ProfileScreen import if you have one
// import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#4285f4",
          tabBarInactiveTintColor: "#888",
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: 60,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <Ionicons name="home" size={size} color={color} />;
            }
            if (route.name === "Discover") {
              return <Ionicons name="compass" size={size} color={color} />;
            }
            if (route.name === "Saved") {
              return <Ionicons name="bookmark" size={size} color={color} />;
            }
            if (route.name === "Profile") {
              return <MaterialIcons name="person-outline" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
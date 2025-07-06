import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function NewsCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 8,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <Image
        source={{
          uri:
            item.urlToImage ||
            "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=500&q=60",
        }}
        style={{
          width: 110,
          height: 110,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          backgroundColor: "#eee",
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, padding: 12 }}>
        <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 16, color: "#202124" }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ fontSize: 13, color: "#5f6368", marginTop: 4 }}>
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "#4285f4", fontWeight: "bold" }}>
            {item.source?.name || ""}
          </Text>
          <Text style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
            {new Date(item.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
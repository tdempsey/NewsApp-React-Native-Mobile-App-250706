import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

export default function CategoryChips({ categories, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 12, backgroundColor: "#F5F6FA" }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={{
            backgroundColor: selected === cat ? "#4285f4" : "#e0e0e0",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            marginHorizontal: 4,
          }}
          onPress={() => onSelect(cat)}
        >
          <Text
            style={{
              color: selected === cat ? "#fff" : "#202124",
              fontWeight: "bold",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
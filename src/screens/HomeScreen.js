import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { fetchBreakingNews } from "../../utils/NewsApi";
import { categories } from "../constants";

const GOOGLE_COLORS = {
  background: "#F5F6FA",
  card: "#FFF",
  primary: "#4285f4",
  text: "#202124",
  secondaryText: "#5f6368",
};

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews(selectedCategory);
  }, [selectedCategory]);

  const loadNews = async (category) => {
    setLoading(true);
    try {
      // You may want to adjust this to fetch by category if supported by your API function
      const res = await fetchBreakingNews(category);
      setNews(res?.articles || []);
    } catch (error) {
      setNews([]);
    }
    setLoading(false);
  };

  const renderCategoryChip = (cat) => (
    <TouchableOpacity
      key={cat}
      style={{
        backgroundColor: selectedCategory === cat ? GOOGLE_COLORS.primary : "#e0e0e0",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 4,
      }}
      onPress={() => setSelectedCategory(cat)}
    >
      <Text
        style={{
          color: selectedCategory === cat ? "#fff" : GOOGLE_COLORS.text,
          fontWeight: "bold",
        }}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  const renderNewsCard = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: GOOGLE_COLORS.card,
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 8,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
      }}
      onPress={() => navigation.navigate("NewsDetails", item)}
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
        <Text numberOfLines={2} style={{ fontWeight: "bold", fontSize: 16, color: GOOGLE_COLORS.text }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ fontSize: 13, color: GOOGLE_COLORS.secondaryText, marginTop: 4 }}>
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: GOOGLE_COLORS.primary, fontWeight: "bold" }}>
            {item.source?.name || ""}
          </Text>
          <Text style={{ fontSize: 12, color: "#aaa", marginLeft: 8 }}>
            {new Date(item.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: GOOGLE_COLORS.background }}>
      {/* Top App Bar */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "bold", color: GOOGLE_COLORS.primary, letterSpacing: -1 }}>
          News
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Ionicons name="search" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="account-circle" size={30} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 12, backgroundColor: GOOGLE_COLORS.background }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {categories.map(renderCategoryChip)}
      </ScrollView>

      {/* News Feed */}
      <FlatList
        data={news}
        keyExtractor={(item, idx) => item.url || idx.toString()}
        renderItem={renderNewsCard}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshing={loading}
        onRefresh={() => loadNews(selectedCategory)}
        ListEmptyComponent={
          loading ? (
            <Text style={{ textAlign: "center", marginTop: 40 }}>Loading...</Text>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 40 }}>No news available.</Text>
          )
        }
      />

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 60,
          backgroundColor: "#fff",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 8,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="home" size={28} color={GOOGLE_COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DiscoverScreen")}>
          <Ionicons name="compass" size={28} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SavedScreen")}>
          <Ionicons name="bookmark" size={28} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <MaterialIcons name="person-outline" size={28} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
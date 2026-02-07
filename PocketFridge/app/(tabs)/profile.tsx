import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const name = "Kai Shaw"; // change as needed

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Gradient header */}
        <LinearGradient
          colors={["#7C3AED", "#4F46E5"]} // ← match your app palette
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        />

        {/* White card */}
        <View style={styles.card}>
          {/* Avatar overlapping seam */}
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: "https://placehold.co/200x200" }} // replace with real image
              style={styles.avatar}
            />
          </View>

          {/* Name */}
          <Text style={styles.name}>{name}</Text>

          {/* Extra content can go here */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_BORDER = "#E5E7EB";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerGradient: {
    height: 180,
    width: "100%",
  },

  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: CARD_BORDER,
    paddingTop: 64, // space for avatar overlap
    paddingHorizontal: 20,
    alignItems: "center",
  },

  avatarWrap: {
    position: "absolute",
    top: -48, // controls how much it overlaps the gradient
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: CARD_BORDER, // same as card border
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 4,
      },
    }),
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  name: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
});
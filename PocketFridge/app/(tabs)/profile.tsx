import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const name = "Kai Shaw";

  // swap these with your real receipt image URIs later
  const receiptImages = [
    "https://placehold.co/600x900",
    "https://placehold.co/600x900?text=Receipt+2",
    "https://placehold.co/600x900?text=Receipt+3",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient header */}
        <LinearGradient
          colors={["#3D8D15", "#74AF36"]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0.57, y: 1 }}
          style={styles.headerGradient}
        />

        {/* Top card */}
        <View style={styles.card}>
          {/* Avatar overlapping seam */}
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: "https://placehold.co/200x200" }}
              style={styles.avatar}
            />
          </View>

          {/* Header Name */}
          <Text style={styles.name}>{name}</Text>

          {/* Dashed divider */}
          <View style={styles.dashedDivider} />

          {/* Analytics section */}
          <Text style={styles.sectionHeader}>Analytics</Text>

          {/* Analytics card */}
          <View style={styles.innerCard}>
            <Text style={styles.muted}>Add your analytics content here</Text>
            {/* Example rows (optional)
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Receipts scanned</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            */}
          </View>

          {/* Past Receipts header */}
          <Text style={[styles.sectionHeader, { marginTop: 18 }]}>
            Past Receipts
          </Text>

          {/* Past receipts card */}
          <View style={styles.innerCard}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.receiptsRow}
            >
              {receiptImages.map((uri, idx) => (
                <Image key={idx} source={{ uri }} style={styles.receiptThumb} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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

  content: {
    paddingBottom: 28,
  },

  headerGradient: {
    height: 180,
    width: "100%",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: CARD_BORDER,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 22,
    alignItems: "center",

    // pulls the rounded card up to touch the gradient nicely
    marginTop: -18,
  },

  avatarWrap: {
    position: "absolute",
    top: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: CARD_BORDER,
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
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Offbit-DotBold",
    color: "#285B23",
    textAlign: "center",
    letterSpacing: 0.6,
  },

  dashedDivider: {
    width: "100%",
    marginTop: 16,
    marginBottom: 14,
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "#9CA3AF",
  },

  sectionHeader: {
    width: "100%",
    fontSize: 16,
    fontFamily: "Offbit-DotBold",
    color: "#285B23",
    marginBottom: 10,
  },

  innerCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 18,
    padding: 14,
  },

  muted: {
    color: "#6B7280",
    fontSize: 14,
  },

  receiptsRow: {
    gap: 12,
  },

  receiptThumb: {
    width: 140,
    height: 190,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: "#F3F4F6",
  },
});
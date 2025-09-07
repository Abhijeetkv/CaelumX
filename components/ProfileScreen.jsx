// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Abhijeet Kumar",
    email: "abhijeet@example.com",
    wallet: "1200 CC",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  });

  return (
    <View style={styles.container}>
      {/* Avatar + Wallet */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.wallet}>💳 {user.wallet}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>350</Text>
          <Text style={styles.statLabel}>Carbon Saved</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>A+</Text>
          <Text style={styles.statLabel}>Impact Rating</Text>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <MaterialIcons name="edit" size={20} color="#fff" />
        <Text style={styles.editText}> Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  wallet: {
    fontSize: 14,
    color: "#10B981",
    marginTop: 6,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 8,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
});

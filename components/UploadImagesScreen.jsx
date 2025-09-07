import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

export default function UploadImagesScreen() {
  const [images, setImages] = useState([]);

  // Ask permission & pick image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Expo SDK 48+ supports this
      quality: 1,
    });

    if (!result.canceled) {
      const selected = result.assets.map((a) => a.uri);
      setImages([...images, ...selected]);
    }
  };

  // Remove image
  const removeImage = (uri) => {
    setImages(images.filter((img) => img !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload Images</Text>
      <Text style={styles.subtitle}>
        Showcase your project's progress and impact.
      </Text>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="upload" size={28} color="#1E88E5" />
        </View>
        <Text style={styles.uploadTitle}>Tap to Upload</Text>
        <Text style={styles.uploadSubtitle}>Select images from gallery</Text>
      </TouchableOpacity>

      {/* Preview */}
      <Text style={styles.previewTitle}>Image Preview</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeImage(item)}
            >
              <MaterialIcons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Project</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 16 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    backgroundColor: "#E3F2FD",
    borderRadius: 50,
    padding: 12,
    marginBottom: 8,
  },
  uploadTitle: { fontSize: 16, fontWeight: "600" },
  uploadSubtitle: { fontSize: 12, color: "gray" },
  previewTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12 },
  imageWrapper: { flex: 1, margin: 4, position: "relative" },
  image: { width: "100%", aspectRatio: 1, borderRadius: 10 },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 4,
  },
  submitBtn: {
    backgroundColor: "#43A047",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: { color: "white", fontWeight: "700", fontSize: 16 },
});

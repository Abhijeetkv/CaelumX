import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Datepicker } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProjectFormScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    location: "",
    area: "",
    type: "",
    date_planted: new Date(),
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleNext = () => {
    // Format date only when submitting
    const formattedForm = {
      ...form,
      date_planted: form.date_planted.toISOString().split("T")[0], // YYYY-MM-DD
    };

    console.log("Form data:", formattedForm);
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Project</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.form}>
        {/* Project Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Project Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter project name"
            value={form.name}
            onChangeText={(t) => handleChange("name", t)}
          />
        </View>

        {/* Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              placeholder="Enter location or pick on map"
              value={form.location}
              onChangeText={(t) => handleChange("location", t)}
            />
            <MaterialIcons
              name="location-on"
              size={20}
              color="#94a3b8"
              style={styles.iconRight}
            />
          </View>
        </View>

        {/* Area */}
        <View style={styles.field}>
          <Text style={styles.label}>Area (hectares)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter area"
            keyboardType="numeric"
            value={form.area}
            onChangeText={(t) => handleChange("area", t)}
          />
        </View>

        {/* Type (Dropdown) */}
        <View style={styles.field}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={form.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <Picker.Item label="Select type" value="" />
              <Picker.Item label="Mangroves" value="mangroves" />
              <Picker.Item label="Seagrass" value="seagrass" />
              <Picker.Item label="Saltmarsh" value="saltmarsh" />
            </Picker>
          </View>
        </View>

        {/* Date Planted (UI Kitten Datepicker) */}
        <View style={styles.field}>
          <Text style={styles.label}>Date Planted</Text>
          <Datepicker
            date={form.date_planted}
            onSelect={(nextDate) => handleChange("date_planted", nextDate)}
            placeholder="Pick a date"
          />
        </View>
      </ScrollView>

      {/* Next button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  form: { padding: 16, gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: "500", color: "#334155" },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
  },
  inputWrapper: { position: "relative" },
  iconRight: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1E88E5",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

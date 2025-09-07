import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";

// --- A simple constant for colors ---
const COLORS = {
    background: '#F9FAFB',
};

// --- Data for the projects ---
const initialProjects = [
    {
        title: "Coastal Mangrove Restoration",
        location: "Philippines",
        area: "100 acres / Mangrove",
        planted: "2023-05-15",
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAIlWzdAUTdOmG3mXYm4Wkq9IvvuU9BA7NPYREB2NSisqXDjRkC3nGV0NFlDOxa_-8leXRqAUXBJGge9bGUQgaJpxSdzjY7rUm9Ldtj8ObHrqDJ0fhk_FzlzLLHVXDoMBE8NiGJCcw6kP5nWM9kr_K9nS5JcJ7lvRTJqigRewcHBswYEn9pEN52XGqLEN74CvTGaJ-YnWyGfpGctoS23-xAhAvmKy9788CRPYoY_Xo6o9dDPEWOFbY7D3d36r-6yIWzFKD3bCOZL8Q"]
    },
    {
        title: "Seagrass Bed Restoration",
        location: "Indonesia",
        area: "50 acres / Seagrass",
        planted: "2023-08-22",
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuACZ7qhr_t7Thurhm7biyFBh4POQJpIYQ0N_4encrO1BbRKp3nv1Qr0tPde3uf1UEOvUV2OUWhCfSH9aS2_aflgjIhf7HGKuPG_n3bykgtaXOUyiLQdkdaqzOLkzi5JExDehrr5_-i2HxCXL8cGGeyIxV5oFi-GZxchO4oSBbjV8sXMVAGZdR-hwAaIQNbYfwlXz35BxxTD1ZcOWpMmNkcf2j6vaSiNSz94BI6xtUMKPbllgASASkHp559hz5PldrVH1AodC6DSXaw"]
    },
    {
        title: "Coral Reef Restoration",
        location: "Fiji",
        area: "20 acres / Coral Reef",
        planted: "2024-01-10",
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCRR2UBZ1bQFoldPgA8s35k7dJvWAqdUPoTl_OnvB7GuOUzwJHcMDOsJRu_XHhHoj4IkVVlENU6H7cltUT-J0cg4QWUdUb_Ke_LV9AnKMvLwvmgbuiv8JNYx8mtEUuoFoDgY8Hhnpx0Yt3cvZ8gYCK9Udtv6y7v88ELrKLpcfu0uWmThmsyHgDsllvYb29ZCwuGvZU0U08owjDcRxYAnnzQQMf2ZGkoarVSEBgfgLecX-wyH5Z70jzBIAjyLtVWDxGTyvvXR3MpFn8"]
    }
];

// --- Reusable Project Card Component ---
const ProjectCard = ({ project }) => (
    <View style={styles.card}>
        <Image source={{ uri: project.images[0] }} style={styles.image} />
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{project.title}</Text>
            <View style={styles.cardInfo}>
                <View style={styles.infoRow}><MaterialIcons name="location-on" size={16} color="#6B7280" /><Text style={styles.infoText}>{project.location}</Text></View>
                <View style={styles.infoRow}><MaterialIcons name="area-chart" size={16} color="#6B7280" /><Text style={styles.infoText}>{project.area}</Text></View>
                <View style={styles.infoRow}><MaterialIcons name="calendar-today" size={16} color="#6B7280" /><Text style={styles.infoText}>Planted: {project.planted}</Text></View>
            </View>
        </View>
    </View>
);

// --- Add Project Form (Step 1) ---
const ProjectFormScreen = ({ onNext, onBack }) => {
    const [form, setForm] = useState({
        title: "",
        location: "",
        area: "",
        type: "mangroves",
        planted: new Date(),
    });

    const handleChange = (key, value) => {
        setForm(prevForm => ({ ...prevForm, [key]: value }));
    };

    const handleNext = () => {
        const projectDetails = {
            ...form,
            planted: form.planted.toISOString().split("T")[0],
            area: `${form.area} acres / ${form.type.charAt(0).toUpperCase() + form.type.slice(1)}`,
        };
        onNext(projectDetails);
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.formHeader}>
                <TouchableOpacity onPress={onBack}><MaterialIcons name="arrow-back" size={28} color="#475569" /></TouchableOpacity>
                <Text style={styles.formHeaderTitle}>Add New Project</Text>
                <View style={{ width: 28 }} />
            </View>
            <ScrollView contentContainerStyle={styles.formBody}>
                <View style={styles.field}><Text style={styles.label}>Project Name</Text><TextInput style={styles.input} placeholder="Enter project name" value={form.title} onChangeText={(val) => handleChange("title", val)} /></View>
                <View style={styles.field}><Text style={styles.label}>Location</Text><View style={styles.inputWrapper}><TextInput style={styles.input} placeholder="Enter location" value={form.location} onChangeText={(val) => handleChange("location", val)} /><MaterialIcons name="location-on" size={20} color="#94a3b8" style={styles.iconRight} /></View></View>
                <View style={styles.field}><Text style={styles.label}>Area (hectares)</Text><TextInput style={styles.input} placeholder="Enter area" keyboardType="numeric" value={form.area} onChangeText={(val) => handleChange("area", val)} /></View>
                <View style={styles.field}>
                    <Text style={styles.label}>Type</Text>
                    <View style={styles.dropdown}>
                        <Picker selectedValue={form.type} onValueChange={(itemValue) => handleChange("type", itemValue)}>
                            <Picker.Item label="Mangroves" value="mangroves" />
                            <Picker.Item label="Seagrass" value="seagrass" />
                            <Picker.Item label="Saltmarsh" value="saltmarsh" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Date Planted</Text>
                    {/* Note: A real app would use a date picker modal library here */}
                    <TouchableOpacity onPress={() => Alert.alert("Date Picker", "A date picker would be shown here.")}>
                        <Text style={styles.input}>{form.planted.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.formFooter}><TouchableOpacity style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Next</Text></TouchableOpacity></View>
        </View>
    );
};

// --- Upload Images Screen (Step 2) ---
const UploadImagesScreen = ({ onFormSubmit, onBack }) => {
    const [images, setImages] = useState([]);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert("Permission required", "We need access to your photos.");
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          quality: 1,
        });
        if (!result.canceled) {
          const selected = result.assets.map((a) => a.uri);
          setImages([...images, ...selected]);
        }
    };

    const removeImage = (uri) => {
        setImages(images.filter((img) => img !== uri));
    };

    return (
        <View style={styles.formContainer}>
             <View style={styles.formHeader}>
                <TouchableOpacity onPress={onBack}><MaterialIcons name="arrow-back" size={28} color="#475569" /></TouchableOpacity>
                <Text style={styles.formHeaderTitle}>Upload Images</Text>
                <View style={{ width: 28 }} />
            </View>
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={styles.formBody}
                ListHeaderComponent={() => (
                    <>
                        <Text style={styles.subtitle}>Showcase your project's progress and impact.</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                            <View style={styles.iconCircle}><MaterialIcons name="upload" size={28} color="#1E88E5" /></View>
                            <Text style={styles.uploadTitle}>Tap to Upload</Text>
                            <Text style={styles.uploadSubtitle}>Select images from gallery</Text>
                        </TouchableOpacity>
                        <Text style={styles.previewTitle}>Image Preview</Text>
                    </>
                )}
                data={images}
                keyExtractor={(item) => item}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item }} style={styles.previewImage} />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(item)}>
                            <MaterialIcons name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.formFooter}>
                <TouchableOpacity style={styles.submitBtn} onPress={() => onFormSubmit(images)}>
                    <Text style={styles.submitText}>Submit Project</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Screen Components ---
const HomeScreen = ({ projects }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProjects = useMemo(() => {
        if (!searchQuery) return projects;
        return projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, projects]);

    return (
        <ScrollView style={styles.main}>
            <Text style={styles.title}>My Projects</Text>
            <View style={styles.searchContainer}><MaterialIcons name="search" size={20} color="#6B7280" /><TextInput style={styles.searchInput} placeholder="Search projects..." value={searchQuery} onChangeText={setSearchQuery} /></View>
            {filteredProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
        </ScrollView>
    );
};

const ProfileScreen = () => (
    <View style={styles.placeholderContainer}><MaterialIcons name="person" size={64} color="#CBD5E1" /><Text style={styles.placeholderText}>Profile Screen</Text></View>
);

// --- Main App Component ---
export default function App() {
    const [activeScreen, setActiveScreen] = useState('Home');
    const [projects, setProjects] = useState(initialProjects);
    const [newProjectData, setNewProjectData] = useState(null);

    const handleFormStep1 = (formData) => {
        setNewProjectData(formData);
        setActiveScreen('UploadImages');
    };

    const handleFinalSubmit = (images) => {
        const finalProject = {
            ...newProjectData,
            images: images.length > 0 ? images : ["https://placehold.co/600x400/e2e8f0/e2e8f0?text=No%20Image"],
        };
        setProjects(prevProjects => [finalProject, ...prevProjects]);
        setNewProjectData(null);
        setActiveScreen('Home');
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 'AddProjectForm': return <ProjectFormScreen onNext={handleFormStep1} onBack={() => setActiveScreen('Home')} />;
            case 'UploadImages': return <UploadImagesScreen onFormSubmit={handleFinalSubmit} onBack={() => setActiveScreen('AddProjectForm')} />;
            case 'Profile': return <ProfileScreen />;
            default: return <HomeScreen projects={projects} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}><MaterialIcons name="waves" size={32} color="#1E88E5" /><View style={styles.wallet}><MaterialIcons name="account-balance-wallet" size={20} color="#43A047" /><Text style={styles.walletText}>1200 CC</Text></View></View>
            <View style={{flex: 1}}>
                {renderScreen()}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('Home')}><MaterialIcons name="home" size={24} color={activeScreen === 'Home' ? "#1E88E5" : "#6B7280"} /><Text style={activeScreen === 'Home' ? styles.footerTextActive : styles.footerText}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('AddProjectForm')}><MaterialIcons name="add" size={24} color={activeScreen.startsWith('AddProject') || activeScreen === 'UploadImages' ? "#1E88E5" : "#6B7280"} /><Text style={activeScreen.startsWith('AddProject') || activeScreen === 'UploadImages' ? styles.footerTextActive : styles.footerText}>Add Project</Text></TouchableOpacity>
                <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('Profile')}><MaterialIcons name="person" size={24} color={activeScreen === 'Profile' ? "#1E88E5" : "#6B7280"} /><Text style={activeScreen === 'Profile' ? styles.footerTextActive : styles.footerText}>Profile</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    // General App
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    wallet: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    walletText: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginLeft: 6 },
    main: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: 'white' },
    footerItem: { alignItems: 'center', gap: 4 },
    footerText: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
    footerTextActive: { fontSize: 12, fontWeight: '600', color: '#1E88E5' },
    
    // Project List
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, marginVertical: 16, borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
    searchInput: { flex: 1, height: 44, fontSize: 16, color: '#111827' },
    card: { marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, overflow: 'hidden', backgroundColor: 'white', shadowColor: '#1F2937', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    image: { width: '100%', height: 180, resizeMode: 'cover' },
    cardContent: { padding: 16 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
    cardInfo: { gap: 8 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    infoText: { fontSize: 14, color: '#374151' },
    
    // Placeholder
    placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    placeholderText: { marginTop: 16, fontSize: 18, color: '#9CA3AF', fontWeight: '500' },

    // Forms (General)
    formContainer: { flex: 1, backgroundColor: "#fff" },
    formHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#e2e8f0' },
    formHeaderTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1e293b' },
    formBody: { flexGrow: 1, padding: 16, gap: 16 },
    field: { gap: 6 },
    label: { fontSize: 14, fontWeight: '500', color: '#334155' },
    input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 16, color: '#1e293b', justifyContent: 'center', minHeight: 48 },
    inputWrapper: { position: 'relative', justifyContent: 'center' },
    iconRight: { position: 'absolute', right: 12 },
    dropdown: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, backgroundColor: '#f8fafc' },
    formFooter: { padding: 16, borderTopWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff' },
    button: { backgroundColor: '#1E88E5', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

    // Image Upload Screen
    subtitle: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 16 },
    uploadBox: { borderWidth: 1, borderColor: "#ccc", borderStyle: "dashed", borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 16 },
    iconCircle: { backgroundColor: "#E3F2FD", borderRadius: 50, padding: 12, marginBottom: 8 },
    uploadTitle: { fontSize: 16, fontWeight: "600" },
    uploadSubtitle: { fontSize: 12, color: "gray" },
    previewTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12 },
    imageWrapper: { flex: 1, margin: 4, position: "relative" },
    previewImage: { width: "100%", aspectRatio: 1, borderRadius: 10 },
    removeBtn: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 12, padding: 4 },
    submitBtn: { backgroundColor: "#43A047", padding: 14, borderRadius: 30, alignItems: "center", marginTop: 20 },
    submitText: { color: "white", fontWeight: "700", fontSize: 16 },
});


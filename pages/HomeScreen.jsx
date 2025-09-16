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
// Import SafeAreaView for the new Profile Screen
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "@/components/SignOutButton";


// --- A simple constant for colors ---
const COLORS = {
    background: '#F9FAFB',
};

// // --- Data for the projects ---
const initialProjects = [
    {
        _id: '1',
        title: "Coastal Mangrove Restoration",
        location: "Philippines",
        area: "100 acres / Mangrove",
        planted: "2023-05-15",
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAIlWzdAUTdOmG3mXYm4Wkq9IvvuU9BA7NPYREB2NSisqXDjRkC3nGV0NFlDOxa_-8leXRqAUXBJGge9bGUQgaJpxSdzjY7rUm9Ldtj8ObHrqDJ0fhk_FzlzLLHVXDoMBE8NiGJCcw6kP5nWM9kr_K9nS5JcJ7lvRTJqigRewcHBswYEn9pEN52XGqLEN74CvTGaJ-YnWyGfpGctoS23-xAhAvmKy9788CRPYoY_Xo6o9dDPEWOFbY7D3d36r-6yIWzFKD3bCOZL8Q"]
    },
    {
        _id: '2',
        title: "Seagrass Bed Restoration",
        location: "Indonesia",
        area: "50 acres / Seagrass",
        planted: "2023-08-22",
        images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuACZ7qhr_t7Thurhm7biyFBh4POQJpIYQ0N_4encrO1BbRKp3nv1Qr0tPde3uf1UEOvUV2OUWhCfSH9aS2_aflgjIhf7HGKuPG_n3bykgtaXOUyiLQdkdaqzOLkzi5JExDehrr5_-i2HxCXL8cGGeyIxV5oFi-GZxchO4oSBbjV8sXMVAGZdR-hwAaIQNbYfwlXz35BxxTD1ZcOWpMmNkcf2j6vaSiNSz94BI6xtUMKPbllgASASkHp559hz5PldrVH1AodC6DSXaw"]
    },
    {
        _id: '3',
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
        type: "MANGROVE",
        planted: "2025-09-13",
        ngoId : 1,
        name : 'Green World'
    });

    const handleChange = (key, value) => {
        setForm(prevForm => ({ ...prevForm, [key]: value }));
    };

    const handleNext = () => {
        // Basic validation
        if (!form.title || !form.location || !form.area) {
            Alert.alert("Missing Fields", "Please fill in all the required fields.");
            return;
        }
        const projectDetails = {
            ...form,
            // Format the area string before passing it to the next step
            area: `${form.area} acres / ${form.type.charAt(0).toUpperCase() + form.type.slice(1).toLowerCase()}`,
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
                            <Picker.Item label="MANGROVE" value="MANGROVE" />
                            <Picker.Item label="SEAGRASS" value="SEAGRASS" />
                            <Picker.Item label="SALTMARSH" value="SALTMARSH" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Date Planted</Text>
                    <TouchableOpacity onPress={() => Alert.alert("Date Picker", "A real app would use a date picker modal library here.")}>
                        <Text style={styles.input}>{form.planted}</Text>
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
            {filteredProjects.map((project) => <ProjectCard key={project._id} project={project} />)}
        </ScrollView>
    );
};

const ProfileScreen = ({ onNavigate }) => {
  const { user } = useUser();

  return (
    <SafeAreaViewContext style={profileStyles.container} edges={["top"]}>
      <View style={profileStyles.header}>
        <TouchableOpacity style={profileStyles.backButton} onPress={() => onNavigate("Home")}>
          <MaterialIcons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={profileStyles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={profileStyles.content}>
        <SignedIn>
          <View style={profileStyles.avatarContainer}>
            <Image source={{ uri: user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} style={profileStyles.avatar} />
            <Text style={profileStyles.name}>{user?.fullName || "Anonymous User"}</Text>
            <View style={profileStyles.infoRow}><MaterialIcons name="email" size={16} color="#6B7280" /><Text style={profileStyles.infoText}>{user?.emailAddresses?.[0]?.emailAddress || "No email"}</Text></View>
            <View style={profileStyles.infoRow}><MaterialIcons name="layers" size={16} color="#6B7280" /><Text style={profileStyles.infoText}>4 Projects</Text></View>
          </View>
          <View style={profileStyles.walletCard}>
            <Text style={profileStyles.cardTitle}>Wallet</Text>
            <View style={profileStyles.walletRow}>
              <View style={[profileStyles.walletIcon, { backgroundColor: "#1E88E5" }]}><MaterialIcons name="wallet" size={24} color="white" /></View>
              <View style={profileStyles.walletTextContainer}><Text style={profileStyles.walletLabel}>Wallet Address</Text><Text style={profileStyles.walletValue}>0x123...456</Text></View>
              <TouchableOpacity><MaterialIcons name="content-copy" size={20} color="#6B7280" /></TouchableOpacity>
            </View>
            <View style={profileStyles.divider} />
            <View style={profileStyles.walletRow}>
              <View style={[profileStyles.walletIcon, { backgroundColor: "#43A047" }]}><MaterialIcons name="eco" size={24} color="white" /></View>
              <View style={profileStyles.walletTextContainer}><Text style={profileStyles.walletLabel}>Total Carbon Credits</Text><Text style={profileStyles.carbonCredits}>1,234</Text></View>
            </View>
          </View>
          <View style={{ marginTop: 20, alignItems: "center", color: "black", backgroundColor: "#1E88E5", borderColor: "#1E88E5", borderWidth: 1, borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 }}>
            <SignOutButton />
          </View>
        </SignedIn>
      </ScrollView>
    </SafeAreaViewContext>
  );
};

// --- Component to manage the Add Project flow ---
const AddNewProjectFlow = ({ onSubmissionComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState(null);

    const handleNextStep = (data) => {
        setProjectData(data);
        setStep(2);
    };

    const handleGoBack = () => {
        setStep(1);
    };

    const handleFinalSubmit = async (images) => {
        if (!projectData || images.length === 0) {
            Alert.alert("Missing Information", "Please ensure all fields are filled and at least one image is uploaded.");
            return;
        }

        const formData = new FormData();
        Object.keys(projectData).forEach(key => formData.append(key, projectData[key]));

        images.forEach((uri) => {
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            formData.append('files', {
                uri,
                name: fileName,
                type: `image/${fileType}`,
            });
        });
        
        console.log("Submitting FormData to backend...");

        try {
            const res = await fetch("https://9647fc34027d.ngrok-free.app/project/upload", {
                method: "POST",
                body: formData,
            });
            
            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const savedProject = await res.json();
            console.log("Project saved successfully:", savedProject);
            Alert.alert("Success", "Your project has been submitted!");
            
            if (onSubmissionComplete) {
                onSubmissionComplete(savedProject);
            }

        } catch (error) {
            console.error("Error saving project:", error);
            Alert.alert("Error", "Failed to save project. Please try again.");
        }
    };

    if (step === 1) {
        return <ProjectFormScreen onNext={handleNextStep} onBack={onCancel} />;
    }
    
    if (step === 2) {
        return <UploadImagesScreen onFormSubmit={handleFinalSubmit} onBack={handleGoBack} />;
    }

    return null; // Should not happen
};


// --- Main App Component ---
export default function App() {
    const [activeScreen, setActiveScreen] = useState('Home');
    const [projects, setProjects] = useState(initialProjects);

    // ✅ FIXED: This function now transforms the server response to match the frontend's data structure
    const handleSubmissionComplete = (savedProject) => {
        // Guard against an unexpected server response
        if (!savedProject || !savedProject.project) {
            console.error("Received an invalid project object from the server.");
            return;
        }

        // Transform the server response to match the frontend's expected data structure
        const newProject = {
            _id: savedProject.project.id.toString(), // Map 'id' to '_id' and ensure it's a string for the key
            title: savedProject.project.name,        // Map 'name' to 'title'
            location: savedProject.project.location,
            // Recreate the formatted area string
            area: `${savedProject.project.area} acres / ${savedProject.project.type.charAt(0) + savedProject.project.type.slice(1).toLowerCase()}`,
            planted: savedProject.project.date_planted.split("T")[0], // Format the date
            // Use the gateway URLs for images, with a fallback
            images: savedProject.gateway && savedProject.gateway.length > 0 ? savedProject.gateway : ["https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"],
        };
        
        setProjects(prevProjects => [newProject, ...prevProjects]);
        setActiveScreen('Home');
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case 'AddNewProject': 
                return <AddNewProjectFlow 
                    onSubmissionComplete={handleSubmissionComplete}
                    onCancel={() => setActiveScreen('Home')} 
                />;
            case 'Profile': 
                return <ProfileScreen onNavigate={setActiveScreen} />;
            default: 
                return <HomeScreen projects={projects} />;
        }
    };

    const isFormOrProfileActive = activeScreen === 'Profile' || activeScreen === 'AddNewProject';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {!isFormOrProfileActive && (
                 <View style={styles.header}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{width:40, height: 40, paddingRight:16, resizeMode: 'contain' }}
                        />
                     <View style={styles.wallet}>
                         <MaterialIcons name="account-balance-wallet" size={20} color="#43A047" />
                         <Text style={styles.walletText}>1200 CC</Text>
                     </View>
                 </View>
            )}

            <View style={{flex: 1}}>
                {renderScreen()}
            </View>
            
            {!isFormOrProfileActive && (
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('Home')}>
                        <MaterialIcons name="home" size={24} color={activeScreen === 'Home' ? "#1E88E5" : "#6B7280"} />
                        <Text style={activeScreen === 'Home' ? styles.footerTextActive : styles.footerText}>Home</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('AddNewProject')}>
                        <MaterialIcons name="add" size={24} color={activeScreen === 'AddNewProject' ? "#1E88E5" : "#6B7280"} />
                        <Text style={activeScreen === 'AddNewProject' ? styles.footerTextActive : styles.footerText}>Add Project</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerItem} onPress={() => setActiveScreen('Profile')}>
                        <MaterialIcons name="person" size={24} color={activeScreen === 'Profile' ? "#1E88E5" : "#6B7280"} />
                        <Text style={activeScreen === 'Profile' ? styles.footerTextActive : styles.footerText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

// --- Main App Styles ---
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
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 12, paddingHorizontal: 12, marginVertical: 16, borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
    searchInput: { flex: 1, height: 44, fontSize: 16, color: '#111827' },
    card: { marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, overflow: 'hidden', backgroundColor: 'white', shadowColor: '#1F2937', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    image: { width: '100%', height: 180, resizeMode: 'cover' },
    cardContent: { padding: 16 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
    cardInfo: { gap: 8 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    infoText: { fontSize: 14, color: '#374151' },
    
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
    submitBtn: { backgroundColor: "#43A047", padding: 14, borderRadius: 8, alignItems: "center" },
    submitText: { color: "white", fontWeight: "700", fontSize: 16 },
});

// --- Styles for the new Profile Screen Component ---
const profileStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 128 / 2,
        marginBottom: 12,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    infoText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 4,
    },
    walletCard: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    walletRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIcon: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    walletTextContainer: {
        flex: 1,
    },
    walletLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    walletValue: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 16,
    },
    carbonCredits: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#43A047',
    },
});
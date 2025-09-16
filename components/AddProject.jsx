import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ProjectFormScreen from '../pages/HomeScreen'; // Assuming in separate file
import UploadImagesScreen from '../pages/HomeScreen'; // Assuming in separate file

const AddNewProject = ({ onSubmissionComplete }) => {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState(null);

    // 1. Receives data from the first screen and proceeds to the next step
    const handleNextStep = (data) => {
        setProjectData(data);
        setStep(2);
    };

    // 2. Navigates back to the previous step
    const handleGoBack = () => {
        setStep(1);
    };

    // 3. The final submission logic
    const handleFinalSubmit = async (images) => {
        // Combine data from step 1 and images from step 2
        if (!projectData || images.length === 0) {
            Alert.alert("Missing Information", "Please ensure all fields are filled and at least one image is uploaded.");
            return;
        }

        const formData = new FormData();

        // Append project details (text data)
        Object.keys(projectData).forEach(key => {
            formData.append(key, projectData[key]);
        });

        // Append images
        images.forEach((uri) => {
            const fileName = uri.split('/').pop();
            const fileType = fileName.split('.').pop();
            
            formData.append('images', {
                uri,
                name: fileName,
                type: `image/${fileType}`,
            });
        });
        
        console.log("Submitting FormData to backend...");

        try {
            // Send to backend and get the full project object back
            const res = await fetch("http://10.0.2.2:5000/projects", {
                method: "POST",
                body: formData,
                // NOTE: Do NOT set 'Content-Type': 'multipart/form-data'.
                // React Native's fetch will automatically set it with the correct boundary.
            });
            
            if (!res.ok) {
                 // Handle server-side errors
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const savedProject = await res.json();
            console.log("Project saved successfully:", savedProject);
            Alert.alert("Success", "Your project has been submitted!");
            
            // Optional: callback to parent to close modal or navigate
            if (onSubmissionComplete) {
                onSubmissionComplete(savedProject);
            }

        } catch (error) {
            console.error("Error saving project:", error);
            Alert.alert("Error", "Failed to save project. Please try again.");
        }
    };

    // Render the correct screen based on the current step
    return (
        <View style={{ flex: 1 }}>
            {step === 1 && (
                <ProjectFormScreen 
                    onNext={handleNextStep} 
                    onBack={() => console.log("Cannot go back from step 1")} // Or handle navigation
                />
            )}
            {step === 2 && (
                <UploadImagesScreen 
                    onFormSubmit={handleFinalSubmit} 
                    onBack={handleGoBack} 
                />
            )}
        </View>
    );
};

export default AddNewProject;
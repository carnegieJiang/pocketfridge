import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { parseReceipt } from '../../services/openaiService';
import { useRouter } from 'expo-router';
import CameraButton from '../../components/CameraButton'; // ui component for the round camera button

// Note: I removed storageService and useRouter imports for this test

export default function CameraScreen() {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  const takePicture = async () => {
    // 1. Request Permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow camera access to scan receipts.");
      return;
    }

    // 2. Open Camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.Images,
      base64: true, // <--- CRITICAL: need the image data for AI
      quality: 0.5, // <--- Lower quality = Faster API upload
    });
    if (!result.canceled && result.assets[0].base64) {
      setImageUri(result.assets[0].uri); // save image to display on next screen
      processReceipt(result.assets[0].base64);
    }
  };

  const processReceipt = async (base64: string) => {
    setLoading(true);
    
    console.log("Sending image to Chat API CALL...");

    // Call your AI services to parse the receipt
    const data = await parseReceipt(base64);
    
    console.log("---------------- API RESPONSE ----------------");
    console.log(JSON.stringify(data, null, 2)); // Prints pretty JSON to your Terminal
    console.log("----------------------------------------------");

    if (data && data.new_foods) {
      // Show success on phone screen
      const summary = data.new_foods.map((i: any) => `${i.quantity} ${i.food_type}`).join("\n");
      Alert.alert("Success!", `Found ${data.new_foods.length} items:\n\n${summary}`);
      router.push({
        pathname: "/confirm",
        params: { items: JSON.stringify(data.new_foods) } // <--- Pass data as string
      });
    } else {
      Alert.alert("Error", "Could not read receipt or API failed.");
    }
    
    setLoading(false);
  };

  if (loading && imageUri) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Processing Items...</Text>
        
        <View style={styles.panel}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          
          <View style={styles.loadingOverlay}>
             <ActivityIndicator size="large" color="#0000ff" />
             <Text style={styles.loadingText}>Analyzing Receipt...</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* This renders the round button and links it to your function */}
      <CameraButton onPress={takePicture} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5',
    padding: 20 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666'
  },
  panel: {
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden', // Keeps the image inside the rounded corners
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5 // Dim the image slightly so the spinner pops
  },
  loadingOverlay: {
    position: 'absolute', // Float on top of the image
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontWeight: '600',
    color: '#333'
  }
});
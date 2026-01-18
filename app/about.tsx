import { globalStyles } from '@/app/globalStyles';
import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutPage() {
  const router = useRouter();

  return (
    <View style={globalStyles.containerHome}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.push('/dashboard')}
        style={{
          position: 'absolute',
          top: 10,
          left: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="arrow-back-circle-outline" size={40} color="#FF69B4" />
      </TouchableOpacity>

      <Text style={globalStyles.title}>About Us</Text>

      <Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 22 }}>
        As a student eager to learn modern mobile development, I explored building a React Native app using Expo, integrated with Supabase to implement full CRUD operations. This project allowed me to understand how to securely handle user authentication, manage data by creating, reading, updating, and deleting records, and even work with images in the database. Through this experience, I gained practical skills in connecting a mobile front-end with a backend service, creating a responsive interface, and structuring an app that is both functional and scalable, all while deepening my understanding of how mobile apps interact with cloud databases in real-time.
      </Text>
    </View>
  );
}

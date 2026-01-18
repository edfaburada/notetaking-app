import { globalStyles } from '@/app/globalStyles';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';

const eveImage = require('../assets/images/eve.webp'); // adjust path if needed

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log('Error fetching user:', error.message);
        setEmail(null);
      } else {
        setEmail(data?.user?.email || null);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={globalStyles.containerProfile}>
      <Text style={globalStyles.title}>My Profile</Text>

      {/* Profile Image */}
      <Image source={eveImage} style={globalStyles.avatar} />

      {/* Name */}
      <Text style={globalStyles.name}>Evelyn Faburada</Text>

      {/* Bio */}
      <Text style={globalStyles.bio}>
        Aspiring Developer | Learning Expo Router
      </Text>

      {/* Email */}
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Email: {email || 'Not available'}
      </Text>

      {/* Back Button */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={globalStyles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

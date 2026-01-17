import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import { globalStyles } from '@/src/styles/globalStyles';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>My Profile</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18 }}>Email: {supabase.auth.getUser()?.email || 'Not available'}</Text>
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import { globalStyles } from './globalStyles';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Welcome to My Notes</Text>

      <TouchableOpacity style={btnStyle} onPress={() => router.push('/notes')}>
        <Text style={txtStyle}>My Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={btnStyle} onPress={() => router.push('/profile')}>
        <Text style={txtStyle}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={btnStyle} onPress={() => router.push('/about')}>
        <Text style={txtStyle}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={btnStyle} onPress={() => router.push('/contact')}>
        <Text style={txtStyle}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={btnStyle} onPress={handleLogout}>
        <Text style={txtStyle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const btnStyle: ViewStyle = { backgroundColor: '#FF69B4', padding: 12, borderRadius: 8, marginBottom: 12 };
const txtStyle: TextStyle = { color: '#fff', textAlign: 'center' };

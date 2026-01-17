import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase';
import { globalStyles } from '@/src/styles/globalStyles';

export default function DashboardIndex() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // ✅ Absolute path from app/ folder
    router.replace('/auth/login');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Welcome to My Notes</Text>

      {/* Notes */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/notes')} // ✅ Absolute path
      >
        <Text style={txtStyle}>My Notes</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/profile')} // ✅ Absolute path
      >
        <Text style={txtStyle}>Profile</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/about')} // ✅ Absolute path
      >
        <Text style={txtStyle}>About</Text>
      </TouchableOpacity>

      {/* Contact */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/contact')} // ✅ Absolute path
      >
        <Text style={txtStyle}>Contact</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={btnStyle} onPress={handleLogout}>
        <Text style={txtStyle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const btnStyle: ViewStyle = {
  backgroundColor: '#FF69B4',
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
};

const txtStyle: TextStyle = {
  color: '#fff',
  textAlign: 'center',
};

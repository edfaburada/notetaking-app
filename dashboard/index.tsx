import { View, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase';
import { globalStyles } from '@/src/styles/globalStyles';

export default function DashboardIndex() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace({ pathname: '/auth/login' }); // ✅ Absolute path
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Welcome to My Notes</Text>

      {/* Notes */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push({ pathname: '/notes' })}
      >
        <Text style={txtStyle}>My Notes</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push({ pathname: '/profile' })}
      >
        <Text style={txtStyle}>Profile</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push({ pathname: '/about' })}
      >
        <Text style={txtStyle}>About</Text>
      </TouchableOpacity>

      {/* Contact */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push({ pathname: '/contact' })}
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

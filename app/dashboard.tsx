import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextStyle, ViewStyle, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import { globalStyles } from './globalStyles';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.log('Session error:', error.message);
        router.replace('/login');
        return;
      }

      if (!session) {
        router.replace('/login'); // Redirect if not logged in
        return;
      }

      setUser(session.user); // Save user info
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={globalStyles.containerHome}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  return (
  <View style={globalStyles.containerHome}>
    <Text style={globalStyles.title}>Welcome TRUESOUL's SQUAD</Text>

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

import { useEffect, useState } from 'react';
import { globalStyles } from './globalStyles';
import { supabase } from '../supabase';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

export default function DashboardIndex() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.log('Error getting session:', error.message);
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
      <Text style={globalStyles.title}>Welcome, {user?.email}</Text>

      {/* Notes */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/notes')}
      >
        <Text style={txtStyle}>My Notes</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/profile')}
      >
        <Text style={txtStyle}>Profile</Text>
      </TouchableOpacity>

      {/* About */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/about')}
      >
        <Text style={txtStyle}>About</Text>
      </TouchableOpacity>

      {/* Contact */}
      <TouchableOpacity
        style={btnStyle}
        onPress={() => router.push('/contact')}
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

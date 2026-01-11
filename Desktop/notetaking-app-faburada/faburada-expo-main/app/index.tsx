// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';
import { globalStyles } from './styles';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Show spinner while checking session
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If no session, redirect to login
  if (!session) {
    router.replace('./login'); // <--- TypeScript-safe
    return null;
  }

  // Home page after login
  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Welcome Home</Text>

      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/about')}>
        <Text style={globalStyles.buttonText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/contact')}>
        <Text style={globalStyles.buttonText}>Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('./profile')}>
        <Text style={globalStyles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('/settings')}>
        <Text style={globalStyles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={() => router.push('./dashboard')}>
        <Text style={globalStyles.buttonText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace('./login'); // <--- logout to login
        }}
      >
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

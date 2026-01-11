import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase';
import { globalStyles } from '../styles';

export default function Dashboard() {
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace('./login'); // redirect to login if not authenticated
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('./login');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Welcome to Dashboard</Text>

      {/* Go to Notes page */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push('./notes')}
      >
        <Text style={globalStyles.buttonText}>Go to Notes</Text>
      </TouchableOpacity>

      {/* Go Back Home Button */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={globalStyles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

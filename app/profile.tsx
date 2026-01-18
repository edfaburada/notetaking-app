import { globalStyles } from '@/app/globalStyles';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { supabase } from '../supabase';

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log('Error fetching user:', error.message);
        setEmail(null);
      } else {
        setEmail(data.user?.email || null);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>My Profile</Text>

      <View style={{ marginBottom: 20 }}>
        {/* ✅ Use state variable instead of async call directly */}
        <Text style={{ fontSize: 18 }}>Email: {email || 'Not available'}</Text>
      </View>
    </View>
  );
}

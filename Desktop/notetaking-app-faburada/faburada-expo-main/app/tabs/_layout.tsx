// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function Layout() {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Stack>
      {!session && <Stack.Screen name="login" />}
      {!session && <Stack.Screen name="register" />}
      
      {session && <Stack.Screen name="index" />}
      {session && <Stack.Screen name="dashboard" />}
      {session && <Stack.Screen name="notes" />}
      {session && <Stack.Screen name="about" />}
      {session && <Stack.Screen name="contact" />}
      {session && <Stack.Screen name="profile" />}
      {session && <Stack.Screen name="settings" />}
    </Stack>
  );
}

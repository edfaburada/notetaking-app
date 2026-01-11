// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function Layout() {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session on mount
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // While loading, render nothing (or spinner if you want)
  if (loading) return null;

  return (
<Stack>
  {!session ? (
    <>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </>
  ) : (
    <>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="about" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
    </>
  )}
</Stack>

  );
}

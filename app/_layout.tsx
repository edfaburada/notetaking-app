import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      {/* AUTH */}
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />

      {/* MAIN */}
      <Stack.Screen name="dashboard" />

      {/* OTHER */}
      <Stack.Screen name="notes" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="about" />
      <Stack.Screen name="contact" />
    </Stack>
  );
}

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen name="dashboard/index" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="about" />
      <Stack.Screen name="contact" />
    </Stack>
  );
}

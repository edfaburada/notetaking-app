import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Login Screen
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF69B4',
          padding: 12,
          marginTop: 20,
          borderRadius: 8,
        }}
        onPress={() => router.replace('../dashboard')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('../auth/register')}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: 'center' }}>
          Go to Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

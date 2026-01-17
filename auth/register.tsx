import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Register Screen
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF69B4',
          padding: 12,
          marginTop: 20,
          borderRadius: 8,
        }}
        onPress={() => router.replace('../auth/login')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

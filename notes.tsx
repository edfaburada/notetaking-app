import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Notes() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: 'blue' }}>← Back</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Notes Screen
      </Text>
    </View>
  );
}

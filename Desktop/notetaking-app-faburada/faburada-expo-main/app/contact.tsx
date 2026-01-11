import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from './styles';

export default function Contact() {
  const router = useRouter();

  return (
    <View style={globalStyles.containerContact}>
      <Text style={globalStyles.title}>Contact Me</Text>

      {/* Contact Information */}
      <Text style={globalStyles.subtitle}>Email:</Text>
      <Text
        style={{ color: 'blue', marginBottom: 10 }}
        onPress={() => Linking.openURL('mailto:evelyn@example.com')}
      >
        evelyndagle07@gmail.com
      </Text>

      <Text style={globalStyles.subtitle}>Phone:</Text>
      <Text
        style={{ color: 'blue', marginBottom: 10 }}
        onPress={() => Linking.openURL('tel:+1234567890')}
      >
        +639 2072 02630
      </Text>

      <Text style={globalStyles.subtitle}>Address:</Text>
      <Text style={{ marginBottom: 20 }}>123 Main St, Dumaguete, Philippines</Text>

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

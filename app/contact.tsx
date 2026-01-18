import { globalStyles } from '@/app/globalStyles';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ContactPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !email || !message) return Alert.alert('Error', 'Please fill all fields');
    Alert.alert('Message sent', 'Thank you for contacting us!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={globalStyles.containerHome}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.push('/dashboard')}
        style={{
          position: 'absolute',
          top: 10,
          left: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="arrow-back-circle-outline" size={40} color="#FF69B4" />
      </TouchableOpacity>

      <Text style={globalStyles.title}>Kontaka Mi If naa moi reklamo!</Text>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />

      <TextInput
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />

      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6, height: 100 }}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleSend}>
        <Text style={globalStyles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

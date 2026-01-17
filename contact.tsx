import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '@/src/styles/globalStyles';

export default function ContactPage() {
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
      <Text style={globalStyles.title}>Contact Us</Text>

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

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from './authService';
import { useState } from 'react';
import { globalStyles } from './globalStyles';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const { error } = await registerUser(email, password);
    if (error) alert(error.message);
    else router.replace('/dashboard');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Register</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={globalStyles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={globalStyles.input} />

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

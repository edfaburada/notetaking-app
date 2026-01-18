import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from './authService';
import { useState } from 'react';
import { globalStyles } from './globalStyles';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await loginUser(email, password);
    if (error) alert(error.message);
    else router.replace('/dashboard');
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={globalStyles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={globalStyles.input} />

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={{ color: '#FF69B4', marginTop: 10 }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

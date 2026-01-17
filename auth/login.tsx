import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { signIn } from '@/src/services/authService';
import { globalStyles } from '@/src/components/styles/globalStyles';

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn(email,password);
    if(res) router.replace('./dashboard/index.tsx');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={globalStyles.input}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={globalStyles.input}/>
      
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.push('./auth/register')}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { signUp } from '@/src/services/authService';
import { globalStyles } from '@/src/components/styles/globalStyles';
export default function Register() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const res = await signUp(email,password);
    if(res) router.replace('./dashboard/index.tsx');
  };

  return (
    <View style={globalStyles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={globalStyles.input}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={globalStyles.input}/>
      
      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

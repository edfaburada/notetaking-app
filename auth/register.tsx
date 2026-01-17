import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '@/src/services/authService';
import { globalStyles } from '@/src/styles/globalStyles';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email and password cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await registerUser(email, password);

      if (error) {
        Alert.alert('Registration Error', error.message);
      } else {
        Alert.alert('Success', 'Account created successfully!');
        router.replace({ pathname: '/dashboard/index' });
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>Register</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <TouchableOpacity
        style={[globalStyles.button, { opacity: loading ? 0.7 : 1 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={globalStyles.buttonText}>
          {loading ? 'Registering...' : 'Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

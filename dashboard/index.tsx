import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/src/components/styles/globalStyles';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Dashboard</Text>

      <TouchableOpacity onPress={()=>router.push('./notes')} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.push('./profile')} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

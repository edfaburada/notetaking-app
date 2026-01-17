import { View, Text } from 'react-native';
import { globalStyles } from '@/src/styles/globalStyles';

export default function AboutPage() {
  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>About This App</Text>

      <Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 22 }}>
        This is a simple notetaking app built with React Native, Expo, and Supabase.  
        It allows users to create, edit, and delete notes, and manage their profile.
      </Text>
    </View>
  );
}

import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from './styles';

export default function About() {
  const router = useRouter();

  return (
    <View style={globalStyles.containerAbout || globalStyles.containerSettings}>
      <Text style={globalStyles.title}>About Page</Text>
      <Text style={globalStyles.bio}>
        Hi! I'm Evelyn Faburada, an aspiring developer learning to build mobile apps with Expo Router. 
  This app showcases navigation between multiple screens including Home, Profile, Contact, Settings, and About. 
  The goal is to demonstrate clean UI design, consistent styling, and interactive buttons for a smooth user experience.
      </Text>

      {/* Button linking back to Home */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={globalStyles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}
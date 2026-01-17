import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={titleStyle}>Dashboard</Text>

<TouchableOpacity
  onPress={() => router.push('../notes')}
  style={btnStyle}
>
  <Text style={txtStyle}>Notes</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../profile')}
  style={btnStyle}
>
  <Text style={txtStyle}>Profile</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../about')}
  style={btnStyle}
>
  <Text style={txtStyle}>About</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => router.push('../contact')}
  style={btnStyle}
>
  <Text style={txtStyle}>Contact</Text>
</TouchableOpacity>

    </View>
  );
}

const titleStyle: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
};

const btnStyle: ViewStyle = {
  backgroundColor: '#FF69B4',
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
};

const txtStyle: TextStyle = {
  color: '#fff',
  textAlign: 'center',
};

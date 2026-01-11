import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { globalStyles } from './styles';

export default function Settings() {
  const router = useRouter();

  // Example toggles for settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={globalStyles.containerSettings}>
      <Text style={globalStyles.title}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={globalStyles.subtitle}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={globalStyles.subtitle}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Account Preferences Placeholder */}
      <Text style={{ marginBottom: 20, fontSize: 16, textAlign: 'center' }}>
        Account Preferences and other settings will go here.
      </Text>

      {/* App Version */}
      <Text style={{ marginBottom: 30, fontSize: 14, color: '#888' }}>
        App Version: 1.0.0
      </Text>

      {/* Go Back Home Button */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={globalStyles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}

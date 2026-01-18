import { globalStyles } from '@/app/globalStyles';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { supabase } from '../supabase';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('Aspiring Developer | Learning Expo Router');
  const [uploading, setUploading] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log('Error fetching user:', error.message);
        setEmail(null);
      } else {
        setEmail(data.user?.email || null);

        // Load avatar if exists
        if (data.user?.id) {
          const { data: avatarData, error: avatarError } = await supabase
            .storage
            .from('avatars')
            .getPublicUrl(`${data.user.id}.png`);
          if (!avatarError && avatarData) setAvatarUrl(avatarData.publicUrl);
        }
      }
    };
    fetchUser();
  }, []);

  // Pick image from library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      uploadAvatar(imageUri);
    }
  };

  // Upload avatar to Supabase
  const uploadAvatar = async (uri: string) => {
    try {
      setUploading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `${userData.user.id}.png`;

      const { error } = await supabase
        .storage
        .from('avatars')
        .upload(fileName, blob, { upsert: true });

      if (error) throw error;

      const { data: publicData } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(publicData.publicUrl);
      Alert.alert('Success', 'Avatar updated!');
    } catch (error: any) {
      console.log('Upload error:', error.message);
      Alert.alert('Error', 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>My Profile</Text>

      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/eve.webp')}
          style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center' }}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: {email || 'Not available'}</Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Profile description"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity
        onPress={() => Alert.alert('Profile Saved', 'Your profile has been updated!')}
        style={[globalStyles.button, { width: '100%' }]}
      >
        <Text style={globalStyles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

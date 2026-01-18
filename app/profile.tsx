import { globalStyles } from '@/app/globalStyles';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabase';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';


export default function ProfilePage() {
  const [, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [description] = useState<string>('Aspiring Developer | Learning Expo Router');
  const [, setUploading] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log('Error fetching user:', error.message);
        setEmail(null);
      } else {
        setEmail(data.user?.email || null);
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
      <Text style={globalStyles.title}>Our Picsyurr!</Text>

      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20 }}>
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/TRUESOULS.png')}
          style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center' }}
        />
      </TouchableOpacity>

  {/* Description */}
  <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center' }}>
    {description || 'No description added yet.'}
  </Text>

  {/* Back to Home Button */}
  <TouchableOpacity
    onPress={() => router.push('/dashboard')}
    style={[globalStyles.button, { width: '50%', alignSelf: 'center' }]}
  >
    <Text style={globalStyles.buttonText}>Back to Home</Text>
  </TouchableOpacity>
</View>
  );
}

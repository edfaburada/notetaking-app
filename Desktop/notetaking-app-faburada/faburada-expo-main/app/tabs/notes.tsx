import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { globalStyles } from '../styles';

export default function Notes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState<any[]>([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setNotes(data || []);
    }
  };

  const addNote = async () => {
    if (!title) return;

    await supabase.from('notes').insert([
      { title, description }
    ]);

    setTitle('');
    setDescription('');
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={globalStyles.containerHome}>
      <Text style={globalStyles.title}>My Notes</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={globalStyles.button} onPress={addNote}>
        <Text style={globalStyles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>

            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

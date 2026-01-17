import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import NoteCard from '@/src/components/NoteCard';
import { fetchNotes, deleteNote } from '@/src/services/notesService';

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);

  const loadNotes = async () => {
    const { data } = await fetchNotes();
    if (data) setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        My Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            content={item.content}
            onDelete={async () => {
              await deleteNote(item.id);
              loadNotes();
            }}
          />
        )}
      />
    </View>
  );
}

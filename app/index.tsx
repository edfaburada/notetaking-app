import { globalStyles } from '@/app/globalStyles';
import NoteCard from './NoteCard';
import { Note, addNote, deleteNote, fetchNotes, updateNote } from './notesService';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ loadNotes wrapped in useCallback for safe reuse
  const loadNotes = useCallback(async () => {
    setLoading(true);

    // Get session
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log('Session error:', error.message);
      setLoading(false);
      return;
    }

    const session = data.session;
    if (!session) {
      router.replace({ pathname: '../login' });
      setLoading(false);
      return;
    }

    setUserId(session.user.id);

    // Fetch notes
    const { data: notesData, error: fetchError } = await fetchNotes(session.user.id);
    if (fetchError) {
  console.log("ERROR:", fetchError);
}
    else setNotes(notesData || []);

    setLoading(false);
  }, [router]);

  // Fetch notes on mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]); // ✅ now safe

  // Save note
  const handleSaveNote = async () => {
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    if (editingNoteId) {
      await updateNote(editingNoteId, title, content);
    } else {
      if (userId) await addNote(title, content, userId);
    }

    setTitle('');
    setContent('');
    setEditingNoteId(null);
    setModalVisible(false);
    loadNotes();
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
    setModalVisible(true);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  if (loading) return (
    <View style={globalStyles.containerHome}>
      <ActivityIndicator size="large" color="#FF69B4" />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fdf5e6' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        My Notes
      </Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 100,
        }}
      >
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            onEdit={() => handleEditNote(note)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={{ borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              style={{ borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10, height: 100 }}
              multiline
            />

            <TouchableOpacity
              style={[globalStyles.button, { width: '100%' }]}
              onPress={handleSaveNote}
            >
              <Text style={globalStyles.buttonText}>
                {editingNoteId ? 'Update Note' : 'Add Note'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.button, { backgroundColor: '#ccc', marginTop: 10, width: '100%' }]}
              onPress={() => {
                setModalVisible(false);
                setTitle('');
                setContent('');
                setEditingNoteId(null);
              }}
            >
              <Text style={{ color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#FF69B4',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 30, lineHeight: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

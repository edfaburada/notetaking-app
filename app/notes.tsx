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

  /* ================= READ ================= */
  const loadNotes = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      router.replace({ pathname: '../index' });
      setLoading(false);
      return;
    }

    const uid = data.session.user.id;
    setUserId(uid);

    const { data: notesData, error: fetchError } = await fetchNotes(uid);
    if (fetchError) {
  console.log("ERROR:", fetchError);
}
    else setNotes(notesData || []);

    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  /* ================= CREATE & UPDATE ================= */
const handleSaveNote = async () => {
  if (!title.trim()) {
    alert('Title cannot be empty');
    return;
  }

  try {
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
  } catch (error: any) {
    console.log('Error saving note:', error.message);
    alert('Failed to save note');
  }
};

  /* ================= EDIT ================= */
  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
    setModalVisible(true);
  };

  /* ================= DELETE ================= */
  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingNoteId(null);
    setModalVisible(false);
  };

  if (loading)
    return (
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

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
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
              style={{
                borderWidth: 1,
                borderRadius: 6,
                padding: 10,
                marginBottom: 10,
                height: 100,
              }}
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
              style={[
                globalStyles.button,
                { backgroundColor: '#ccc', marginTop: 10, width: '100%' },
              ]}
              onPress={resetForm}
            >
              <Text style={{ color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ADD BUTTON */}
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

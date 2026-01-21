import { globalStyles } from '@/app/globalStyles';
import NoteCard from './NoteCard';
import { Note, addNote, deleteNote, fetchNotes, updateNote } from './notesService';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';

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

  // SEARCH & PIN STATES
  const [search, setSearch] = useState('');
  const [pinnedNotes, setPinnedNotes] = useState<string[]>([]);
  const [showPinned, setShowPinned] = useState(false); // ✅ NEW

  /* ================= READ ================= */
  const loadNotes = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      router.replace({ pathname: '/dashboard' });
      setLoading(false);
      return;
    }

    const uid = data.session.user.id;
    setUserId(uid);

    const { data: notesData, error: fetchError } = await fetchNotes(uid);
    if (fetchError) console.log(fetchError);
    else setNotes(notesData || []);

    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  /* ================= CREATE & UPDATE ================= */
  const handleSaveNote = async () => {
    if (!title.trim()) return alert('Title cannot be empty');

    if (editingNoteId) {
      await updateNote(editingNoteId, title, content);
    } else {
      if (userId) await addNote(title, content, userId);
    }

    resetForm();
    loadNotes();
  };

  /* ================= PIN ================= */
  const togglePin = (id: string) => {
    setPinnedNotes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  /* ================= FILTER ================= */
  const filteredNotes = notes
    .filter((note) => {
      // show only pinned if toggle is ON
      if (showPinned && !pinnedNotes.includes(note.id)) return false;

      return (
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (pinnedNotes.includes(a.id)) return -1;
      if (pinnedNotes.includes(b.id)) return 1;
      return 0;
    });

  /* ================= EDIT ================= */
  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
    setModalVisible(true);
  };

  /* ================= DELETE ================= */
  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    loadNotes();
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
    <View style={{ flex: 1, backgroundColor: '#fdf5e6' }}>
      {/* BACK */}
      <TouchableOpacity
        onPress={() => router.push('/dashboard')}
        style={{ position: 'absolute', top: 10, left: 20, zIndex: 20 }}
      >
        <Ionicons name="arrow-back-circle-outline" size={40} color="#FF69B4" />
      </TouchableOpacity>

      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
        My Notes
      </Text>

      {/* SEARCH BAR */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          margin: 15,
          borderRadius: 8,
          padding: 10,
          alignItems: 'center',
        }}
      >
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search notes..."
          value={search}
          onChangeText={setSearch}
          style={{ marginLeft: 10, flex: 1 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 120,
        }}
      >
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            pinned={pinnedNotes.includes(note.id)}
            onPin={() => togglePin(note.id)}
            onEdit={() => handleEditNote(note)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </ScrollView>

      {/* MODAL */}
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
              style={{ borderWidth: 1, borderRadius: 6, padding: 10 }}
            />

            <TextInput
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              multiline
              style={{
                borderWidth: 1,
                borderRadius: 6,
                padding: 10,
                height: 100,
                marginTop: 10,
              }}
            />

            <TouchableOpacity
              style={[globalStyles.button, { width: '100%', marginTop: 10 }]}
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
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
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
  }}
>
  <Text style={{ color: '#fff', fontSize: 30 }}>+</Text>
</TouchableOpacity>

{/* PIN VIEW BUTTON */}
<TouchableOpacity
  onPress={() => setShowPinned(!showPinned)}
  style={{
    position: 'absolute',
    bottom: 100,   // 👈 above plus button
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: showPinned ? '#ffb6c1' : '#FF69B4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  }}
>
  <Ionicons
    name={showPinned ? 'list' : 'pin'}
    size={26}
    color="#fff"
  />
</TouchableOpacity>


      {/* PIN VIEW BUTTON */}
      <TouchableOpacity
        onPress={() => setShowPinned(!showPinned)}
        style={{
          position: 'absolute',
          bottom: 100, // above +
          right: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: showPinned ? '#ffb6c1' : '#FF69B4',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <Ionicons
          name={showPinned ? 'list' : 'pin'}
          size={26}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

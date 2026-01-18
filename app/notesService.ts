import { supabase } from '../supabase';

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
}

// Add a note
export async function addNote(title: string, content: string, userId: string) {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content, user_id: userId }])
    .select(); // <-- important to get the inserted data back
  if (error) throw error;
  return data;
}

// Update a note
export async function updateNote(id: string, title: string, content: string) {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

// Delete a note
export async function deleteNote(id: string) {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
}

// Fetch notes
export async function fetchNotes(userId: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data, error };
}

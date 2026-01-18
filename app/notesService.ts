import { supabase } from '../supabase';

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at?: string;
}

// Fetch notes by user
export const fetchNotes = async (userId: string): Promise<{ data: Note[] | null; error: any }> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Add note
export const addNote = async (title: string, content: string, userId: string) => {
  const { data, error } = await supabase
    .from('notes')
    .insert({ title, content, user_id: userId })
    .select(); // returning inserted row

  if (error) throw error;
  return data;
};

// Update note
export const updateNote = async (id: string, title: string, content: string) => {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', id)
    .select(); // returning updated row

  if (error) throw error;
  return data;
};

// Delete note
export const deleteNote = async (id: string) => {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};

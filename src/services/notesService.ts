import { supabase } from '../../supabase';

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export const fetchNotes = async (user_id: string) =>
  supabase.from ('notes').select('*').eq('user_id', user_id).order('created_at', { ascending: false });

export const addNote = async (title: string, content: string, user_id: string) =>
  supabase.from('notes').insert([{ title, content, user_id }]);

export const updateNote = async (id: string, title: string, content: string) =>
  supabase.from('notes').update({ title, content }).eq('id', id);

export const deleteNote = async (id: string) =>
  supabase.from('notes').delete().eq('id', id);

import { supabase } from '../supabase';

export interface Note {
  id: string;
  title: string;
  content: string;
  user_id: string;
}

/* CREATE */
export const addNote = async (
  title: string,
  content: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from('notes')
    .insert([
      { title, content, user_id: userId }
    ])
    .select();

  if (error) {
    console.log("ADD ERROR:", error.message);
    throw error;
  }

  return data;
};

/* READ */
export const fetchNotes = async (userId: string) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log("FETCH ERROR:", error.message);
    throw error;
  }

  return { data, error };
};

/* UPDATE */
export const updateNote = async (
  id: string,
  title: string,
  content: string
) => {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', id)        // 👈 target row
    .select();

  if (error) {
    console.log("UPDATE ERROR:", error.message);
    throw error;
  }

  return data;
};

/* DELETE */
export const deleteNote = async (id: string) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.log("DELETE ERROR:", error.message);
    throw error;
  }
};

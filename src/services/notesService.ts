import { supabase } from '../../supabase';

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const registerUser = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

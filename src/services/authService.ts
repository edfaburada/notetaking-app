import { supabase } from '../../supabase';

export const signUp = async (email:string,password:string)=>{
  const {data,error}=await supabase.auth.signUp({email,password});
  if(error) alert(error.message);
  return data?.user;
};

export const signIn = async (email:string,password:string)=>{
  const {data,error}=await supabase.auth.signInWithPassword({email,password});
  if(error) alert(error.message);
  return data?.user;
};

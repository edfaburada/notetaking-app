import { supabase } from '../../supabase';

export const getNotes = async (userId:string)=>{
  return await supabase.from('notes')
  .select('*')
  .eq('user_id',userId)
  .order('created_at',{ascending:false});
};

import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export const useAuth = ()=>{
  const [user,setUser]=useState<any>(null);

  useEffect(()=>{
    supabase.auth.getUser().then(res=>{
      setUser(res.data.user);
    });
  },[]);

  return user;
};

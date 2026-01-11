import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function useAuth() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return session;
}


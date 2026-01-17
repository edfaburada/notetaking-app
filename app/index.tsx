import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabase';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace({ pathname: '../dashboard/index' });
      else router.replace({ pathname: '../login' });
    };

    checkSession();
  }, [router]);

  return null;
}

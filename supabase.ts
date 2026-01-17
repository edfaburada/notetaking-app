import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nbzpkvqvdmaxwbpumcgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ienBrdnF2ZG1heHdicHVtY2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzODUxNjgsImV4cCI6MjA4Mzk2MTE2OH0.FUyDB8BAERaVWz1FMh1F7msB5QZ7XjGVMJaRU51_THg';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

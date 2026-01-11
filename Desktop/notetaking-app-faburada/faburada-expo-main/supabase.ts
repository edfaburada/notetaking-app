import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lhcpgngnujeegggkfwyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoY3BnbmdudWplZWdnZ2tmd3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTk1OTcsImV4cCI6MjA4MDk3NTU5N30.wvCc3FLmC9ukJvahQuf0kPbc5FovQsxnlFCckOzD4ww';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

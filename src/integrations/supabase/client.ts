import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ypilrdiemldwlmiarzlg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaWxyZGllbWxkd2xtaWFyemxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTQyNDMsImV4cCI6MjA2OTU5MDI0M30.528n7o6P35FVkgeKDRfFuVocYzG6Bmr8rFDi56R7Sjo";

console.log('Supabase Config:', {
  url: SUPABASE_URL,
  key: SUPABASE_PUBLISHABLE_KEY.substring(0, 20) + '...'
});

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});
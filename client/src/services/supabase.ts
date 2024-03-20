import { createClient } from '@supabase/supabase-js';

const { VITE_APP_SUPABASE_PROJECT_URL, VITE_APP_SUPABASE_KEY } = import.meta.env;
const supabase = createClient(VITE_APP_SUPABASE_PROJECT_URL, VITE_APP_SUPABASE_KEY);

export default supabase;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const fallbackSupabaseUrl = 'https://example.supabase.co';
const fallbackSupabaseAnonKey = 'public-anon-key-placeholder';

if (!isSupabaseConfigured) {
	console.warn(
		'Supabase environment variables are missing. Running in local fallback mode.'
	);
}

export const supabase = createClient(
	isSupabaseConfigured ? supabaseUrl : fallbackSupabaseUrl,
	isSupabaseConfigured ? supabaseKey : fallbackSupabaseAnonKey
);

export { isSupabaseConfigured };

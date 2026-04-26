import { createClient } from '@supabase/supabase-js'

// This is a placeholder initialization as we're mocking the database data initially.
// Provide actual Supabase URL/KEY in environment variables when going live.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_key_for_ui_only'

export const supabase = createClient(supabaseUrl, supabaseKey)

// You can use this supabase instance across the app to subscribe to live bot events

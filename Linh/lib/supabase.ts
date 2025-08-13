import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yfoabnlsnxxqkqlrqoua.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmb2Fibmxzbnh4cWtxbHJxb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTMyODUsImV4cCI6MjA3MDQ4OTI4NX0.ZY_Ejx4Qi1HLdcyZUEOny_cISMRK-E7_4NA5jKbOhZE'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key length:', supabaseAnonKey.length)
console.log('Supabase Key (first 50 chars):', supabaseAnonKey.substring(0, 50) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false
  }
}) 
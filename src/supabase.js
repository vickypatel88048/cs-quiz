import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

// Never fall back to a fake Supabase URL. A fake fallback causes confusing
// DNS errors such as `placeholder.supabase.co/auth/v1/signup`.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Vercel Production environment, then redeploy.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export async function notifyAuthEvent(event, user) {
  if (!user?.email) return

  try {
    await fetch('/api/notify-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        email: user.email,
        name: user.user_metadata?.name || user.user_metadata?.full_name || '',
      }),
    })
  } catch (error) {
    console.warn('Auth notification failed:', error)
  }
}

import { createClient } from './client'

export async function fetchSetting(key: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()
  if (error) return { data: null, error: error.message }
  return { data: data?.value ?? null, error: null }
}

export async function updateSetting(key: string, value: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' },
    )
  return { error: error?.message ?? null }
}

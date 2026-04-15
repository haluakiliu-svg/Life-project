import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  const USER_ID = 'owner'

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('projects_data')
      .select('payload')
      .eq('user_id', USER_ID)
      .single()

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ payload: data?.payload || null })
  }

  if (req.method === 'POST') {
    const { payload } = req.body
    const { error } = await supabase
      .from('projects_data')
      .upsert({ user_id: USER_ID, payload, updated_at: new Date().toISOString() })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  res.status(405).end()
}

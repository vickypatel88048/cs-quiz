export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { event, email, name } = req.body || {}
  if (!['login', 'signup'].includes(event) || !email) return res.status(400).json({ error: 'Invalid payload' })
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) return res.status(503).json({ error: 'Email service is not configured' })

  const subject = event === 'signup' ? 'New CS Quiz signup' : 'CS Quiz login activity'
  const title = event === 'signup' ? 'New user signup' : 'User login'
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>${title}</h2><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Name:</b> ${escapeHtml(name || 'Not provided')}</p><p><b>Time:</b> ${new Date().toISOString()}</p><p><b>Project:</b> BPSC TRE CS Quiz</p></div>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.RESEND_FROM, to: ['vicky.patel88048@gmail.com'], subject, html }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(502).json({ error: data?.message || 'Email provider rejected the request' })
    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Notification failed' })
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[char]))
}

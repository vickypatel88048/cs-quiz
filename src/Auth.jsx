import React from 'react'
import { ArrowLeft, BrainCircuit, Eye, EyeOff, LogIn, UserPlus, X } from 'lucide-react'
import { supabase, notifyAuthEvent } from './supabase'

export default function Auth({ onSuccess, onClose, language = 'en', modal = true }) {
  const [mode, setMode] = React.useState('login')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [error, setError] = React.useState('')

  const hi = language === 'hi'
  const submit = async (e) => {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true)
    try {
      if (mode === 'signup') {
        if (!name.trim()) throw new Error(hi ? 'नाम दर्ज करें।' : 'Please enter your name.')
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { name: name.trim(), full_name: name.trim() } },
        })
        if (signUpError) throw signUpError
        await notifyAuthEvent('signup', data.user)
        if (data.session) onSuccess(data.session)
        else setMessage(hi ? 'Signup सफल है। अपने email को verify करके फिर login करें।' : 'Signup successful. Verify your email, then log in to continue.')
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (signInError) throw signInError
        await notifyAuthEvent('login', data.user)
        onSuccess(data.session)
      }
    } catch (err) {
      setError(err.message || (hi ? 'कुछ गलत हो गया।' : 'Something went wrong.'))
    } finally { setLoading(false) }
  }

  const content = <div className="auth-card">
    <div className="auth-top">
      <div className="auth-brand"><span className="brand-mark"><BrainCircuit size={20}/></span><strong>BPSC TRE <span>CS</span></strong></div>
      {onClose && <button className="auth-close" onClick={onClose} aria-label="Close"><X size={20}/></button>}
    </div>
    <div className="auth-heading">
      <span className="eyebrow">{mode === 'login' ? <LogIn size={14}/> : <UserPlus size={14}/>} {mode === 'login' ? (hi ? 'LOGIN REQUIRED' : 'LOGIN REQUIRED') : (hi ? 'CREATE ACCOUNT' : 'CREATE ACCOUNT')}</span>
      <h1>{mode === 'login' ? (hi ? 'Login करके quiz शुरू करें' : 'Login to start the quiz') : (hi ? 'अपना account बनाएं' : 'Create your account')}</h1>
      <p>{mode === 'login' ? (hi ? 'Quiz attempt और leaderboard के लिए login जरूरी है।' : 'Login is required to attempt quizzes and appear on the leaderboard.') : (hi ? 'आपके attempts और score सुरक्षित रूप से save होंगे।' : 'Your attempts and scores will be securely saved.')}</p>
    </div>
    <form onSubmit={submit} className="auth-form">
      {mode === 'signup' && <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder={hi ? 'आपका नाम' : 'Your name'} autoComplete="name" /></label>}
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
      <label>Password<div className="password-field"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?'text':'password'} minLength="6" placeholder={hi ? 'कम से कम 6 characters' : 'At least 6 characters'} autoComplete={mode==='login'?'current-password':'new-password'} required /><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label="Show password">{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
      {error && <div className="auth-error">{error}</div>}
      {message && <div className="auth-message">{message}</div>}
      <button className="primary-btn large auth-submit" disabled={loading}>{loading ? (hi ? 'Please wait…' : 'Please wait…') : mode === 'login' ? (hi ? 'Login' : 'Login') : (hi ? 'Signup' : 'Create account')}</button>
    </form>
    <div className="auth-switch">{mode === 'login' ? (hi ? 'Account नहीं है?' : "Don't have an account?") : (hi ? 'पहले से account है?' : 'Already have an account?')} <button onClick={()=>{setMode(mode==='login'?'signup':'login');setError('');setMessage('')}}>{mode === 'login' ? (hi ? 'Signup करें' : 'Sign up') : (hi ? 'Login करें' : 'Log in')}</button></div>
    {onClose && <button className="auth-back" onClick={onClose}><ArrowLeft size={15}/> {hi ? 'वापस' : 'Back'}</button>}
  </div>

  return modal ? <div className="auth-overlay">{content}</div> : content
}

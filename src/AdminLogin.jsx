import React from 'react'
import { ArrowLeft, BrainCircuit, LockKeyhole, LogIn } from 'lucide-react'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'bpsc@123'

export default function AdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const submit = e => {
    e.preventDefault()
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('bpsc_tre_admin_auth', 'true')
      onLogin()
    } else {
      setError('Username ya password galat hai.')
    }
  }

  return <div className="admin-login-page">
    <div className="admin-login-card">
      <button className="admin-login-back" onClick={onBack}><ArrowLeft size={16}/> Back</button>
      <div className="admin-login-logo"><BrainCircuit size={28}/></div>
      <span className="admin-login-badge">BPSC TRE · ADMIN</span>
      <h1>Admin Login</h1>
      <p>Question Manager access karne ke liye login karein.</p>
      <form onSubmit={submit}>
        <label>Username<input value={username} onChange={e => { setUsername(e.target.value); setError('') }} placeholder="Enter username" autoComplete="username" /></label>
        <label>Password<input type="password" value={password} onChange={e => { setPassword(e.target.value); setError('') }} placeholder="Enter password" autoComplete="current-password" /></label>
        {error && <div className="admin-login-error">{error}</div>}
        <button className="admin-login-submit" type="submit"><LogIn size={17}/> Login</button>
      </form>
      <div className="admin-login-note"><LockKeyhole size={15}/><span>Admin area is protected.</span></div>
    </div>
  </div>
}

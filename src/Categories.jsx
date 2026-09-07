import React from 'react'
import { ArrowLeft, ArrowRight, BrainCircuit, Search, Menu, X, Monitor, GitBranch, Database, Cpu, Network, Code2, Binary, Braces, Blocks, ShieldCheck, Settings, LogOut } from 'lucide-react'
import { categories } from './data/categories'
import Admin from './Admin'
import AdminLogin from './AdminLogin'

const iconMap = { Monitor, GitBranch, Database, Cpu, Network, Code2, Binary, Braces, Blocks, BrainCircuit, ShieldCheck }

export default function Categories({ onStart, onHome }) {
  const [search, setSearch] = React.useState('')
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [adminView, setAdminView] = React.useState(null)
  const filtered = categories.filter(c => `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase()))
  const totalQuestions = categories.reduce((sum, c) => sum + c.count, 0)

  if (adminView === 'login') return <AdminLogin onLogin={() => setAdminView('dashboard')} onBack={() => setAdminView(null)} />
  if (adminView === 'dashboard') return <Admin onHome={() => setAdminView(null)} />

  const openAdmin = () => { setAdminView(sessionStorage.getItem('bpsc_tre_admin_auth') === 'true' ? 'dashboard' : 'login'); setMenuOpen(false) }
  const logout = () => { sessionStorage.removeItem('bpsc_tre_admin_auth'); setAdminView(null) }

  return <div className="site-shell" id="top">
    <header className="navbar">
      <button className="brand brand-button" onClick={onHome}><span className="brand-mark"><BrainCircuit size={21} /></span><span>BPSC TRE <span className="brand-accent">CS</span></span></button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}><button className="nav-home-btn" onClick={onHome}>Home</button><a className="active" href="#categories" onClick={() => setMenuOpen(false)}>Subjects</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><button className="admin-nav-btn" onClick={openAdmin}><Settings size={14}/> Admin</button></nav>
      <div className="nav-actions"><button className="admin-top-btn" onClick={openAdmin}><Settings size={15}/> Admin</button><button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
    </header>
    <main>
      <section className="category-hero"><div className="category-hero-copy"><button className="back-home" onClick={onHome}><ArrowLeft size={15} /> Back to Home</button><div className="eyebrow"><BrainCircuit size={15} /> BPSC TRE · Computer Science</div><h1>Choose your <span>subject.</span><br />Start preparing.</h1><p>Practice the core Computer Science subjects relevant to BPSC TRE with focused questions and instant explanations.</p></div><div className="subject-orbit"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit-center"><BrainCircuit size={34} /></div><span className="orbit-chip chip-one">DSA</span><span className="orbit-chip chip-two">DBMS</span><span className="orbit-chip chip-three">OS</span><span className="orbit-chip chip-four">Networks</span></div></section>
      <section className="stats-row"><div><strong>11</strong><span>Core CS Subjects</span></div><div><strong>{totalQuestions}+</strong><span>Subject Questions</span></div></section>
      <section className="category-section" id="categories"><div className="section-heading"><div><p className="kicker">BPSC TRE · Computer Science</p><h2>Practice by subject</h2></div><p className="result-count">{filtered.length} subjects</p></div><div className="category-tools"><label className="category-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search CS subjects..." /></label></div>{filtered.length ? <div className="full-category-grid">{filtered.map((item, index) => { const Icon = iconMap[item.icon] || BrainCircuit; return <article className="full-category-card" key={item.id}><div className="card-top"><div className="category-icon"><Icon size={21} /></div></div><span className="card-number">{String(index + 1).padStart(2, '0')}</span><h3>{item.name}</h3><p>{item.description}</p><div className="card-bottom"><span>{item.count}+ questions</span><button onClick={() => onStart(item.id)} aria-label={`Start ${item.name} practice`}>Start practice <ArrowRight size={15} /></button></div></article> })}</div> : <div className="empty-state"><Search size={28} /><h3>No subjects found</h3><p>Try another subject.</p></div>}</section>
    </main><footer className="footer" id="about"><span>© 2026 BPSC TRE CS · Computer Science practice platform</span><div><a href="#categories">Subjects</a><button className="footer-admin-btn" onClick={openAdmin}>Admin</button>{sessionStorage.getItem('bpsc_tre_admin_auth') === 'true' && <button className="footer-admin-btn" onClick={logout}><LogOut size={14}/> Logout</button>}</div></footer>
  </div>
}

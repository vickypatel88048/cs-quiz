import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, Binary, Blocks, BrainCircuit, Braces, ChevronRight, Code2,
  Cpu, Database, GitBranch, GraduationCap, Menu, Monitor, Network,
  Search, ShieldCheck, Sparkles, X
} from 'lucide-react'
import { categories } from './data/categories'
import './styles.css'

const icons = { Monitor, GitBranch, Database, Cpu, Network, Code2, Binary, Braces, Blocks, BrainCircuit, ShieldCheck, GraduationCap }

function CategoryIcon({ name }) {
  const Icon = icons[name] || BrainCircuit
  return <Icon size={24} strokeWidth={1.8} />
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All')

  const filtered = categories.filter((item) => {
    const matchesSearch = `${item.name} ${item.short}`.toLowerCase().includes(search.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty || item.difficulty === 'Mixed'
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#top">
          <span className="brand-mark"><BrainCircuit size={21} /></span>
          <span>CS<span className="brand-accent">Quiz</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#quizzes" onClick={() => setMenuOpen(false)}>Quizzes</a>
          <a className="active" href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search"><Search size={19} /></button>
          <button className="login-btn">Login</button>
          <button className="signup-btn">Get started</button>
          <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="category-hero" id="categories">
          <div className="category-hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> 12 focused subjects</div>
            <h1>Choose a subject.<br /><span>Start mastering it.</span></h1>
            <p>Explore focused Computer Science quizzes built to strengthen concepts, prepare for exams and make daily practice consistent.</p>
          </div>
          <div className="subject-orbit" aria-hidden="true">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="orbit-center"><BrainCircuit size={36} /></div>
            <span className="orbit-chip chip-one">DSA</span><span className="orbit-chip chip-two">DBMS</span>
            <span className="orbit-chip chip-three">OS</span><span className="orbit-chip chip-four">CN</span>
          </div>
        </section>

        <section className="stats-row">
          <div><strong>12</strong><span>subjects</span></div>
          <div><strong>1,105+</strong><span>questions</span></div>
          <div><strong>3</strong><span>difficulty levels</span></div>
          <div><strong>100%</strong><span>practice focused</span></div>
        </section>

        <section className="category-section" id="quizzes">
          <div className="section-heading category-heading">
            <div><p className="kicker">ALL CATEGORIES</p><h2>What do you want to practice?</h2></div>
            <p className="result-count">{filtered.length} subjects</p>
          </div>

          <div className="category-tools">
            <label className="category-search"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subjects..." /></label>
            <div className="difficulty-filter">
              {['All', 'Easy', 'Medium', 'Hard'].map(level => <button key={level} className={selectedDifficulty === level ? 'selected' : ''} onClick={() => setSelectedDifficulty(level)}>{level}</button>)}
            </div>
          </div>

          <div className="full-category-grid">
            {filtered.map((item, index) => (
              <article className="full-category-card" key={item.id}>
                <div className="card-top"><span className="category-icon"><CategoryIcon name={item.icon} /></span><span className={`difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span></div>
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="card-bottom"><span>{item.count}+ questions</span><button>Start quiz <ArrowRight size={16} /></button></div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && <div className="empty-state"><Search size={30} /><h3>No subject found</h3><p>Try a different subject or difficulty.</p></div>}
        </section>

        <section className="exam-banner" id="about">
          <div><p className="kicker">EXAM READY</p><h2>Preparing for an exam?</h2><p>Use mixed Computer Science practice to test yourself across multiple subjects.</p></div>
          <button>Explore exam practice <ChevronRight size={18} /></button>
        </section>
      </main>

      <footer className="footer"><div>© 2026 CSQuiz. Built for better CS practice.</div><div><a href="#top">Home</a><a href="#categories">Categories</a><a href="#about">About</a></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

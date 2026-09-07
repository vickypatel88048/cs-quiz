import React from 'react'
import { ArrowRight, BrainCircuit, CheckCircle2, Clock3, Database, Menu, Play, Trophy, X } from 'lucide-react'

const highlights = [
  { icon: Database, title: 'TRE Computer Science Subjects', text: 'Practice DSA, DBMS, OS, Networks, Programming and other core CS topics.' },
  { icon: Clock3, title: 'BPSC TRE Exam Practice', text: 'Build speed and accuracy with focused, timed Computer Science quizzes.' },
  { icon: Trophy, title: 'Track Your Performance', text: 'Review mistakes, explanations and identify the topics that need more practice.' },
]

export default function Home({ onStart, onCategories }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <div className="home-page">
    <header className="navbar home-navbar">
      <button className="brand brand-button" onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Go to home">
        <span className="brand-mark"><BrainCircuit size={21} /></span><span>BPSC TRE <span className="brand-accent">CS</span></span>
      </button>
      <nav className={`home-links ${menuOpen ? 'is-open' : ''}`}>
        <a className="active" href="#home" onClick={closeMenu}>Home</a>
        <button onClick={() => { closeMenu(); onCategories() }}>Subjects</button>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#about" onClick={closeMenu}>About</a>
      </nav>
      <div className="home-nav-actions">
        <button className="home-nav-cta" onClick={() => { closeMenu(); onStart() }}>Start Practice <ArrowRight size={16} /></button>
        <button className="mobile-menu home-mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
    <main id="home">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow"><BrainCircuit size={15} /> BPSC TRE · Computer Science</span>
          <h1>Prepare smarter.<br /><span>Crack BPSC TRE.</span></h1>
          <p>Focused Computer Science practice for BPSC Teacher Recruitment Exam aspirants. Strengthen concepts, improve speed and build exam confidence one question at a time.</p>
          <div className="hero-actions"><button className="primary-btn large" onClick={onStart}>Start practicing <ArrowRight size={18} /></button><button className="secondary-btn large" onClick={onCategories}>Explore subjects</button></div>
          <div className="hero-trust"><CheckCircle2 size={16} /><span>Instant results</span><i /> <span>Detailed explanations</span><i /> <span>TRE focused</span></div>
        </div>
        <div className="hero-visual"><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-quiz-card"><div className="mini-top"><span>BPSC TRE PRACTICE</span><b>01 / 10</b></div><div className="mini-progress"><span /></div><small>Data Structures</small><h3>Which data structure is best suited for implementing recursion?</h3><div className="mini-option"><b>A</b> Stack</div><div className="mini-option"><b>B</b> Queue</div><div className="mini-option"><b>C</b> Linked List</div><div className="mini-option"><b>D</b> Heap</div><button onClick={onStart}><Play size={13} fill="currentColor" /> Start practice</button></div></div>
      </section>
      <section className="home-stats"><div><strong>11+</strong><span>Core CS Subjects</span></div><div><strong>120+</strong><span>Practice Questions</span></div><div><strong>4</strong><span>Difficulty Levels</span></div><div><strong>24/7</strong><span>Self Practice</span></div></section>
      <section className="home-features" id="features"><div className="home-section-head"><span className="kicker">WHY BPSC TRE CS</span><h2>Practice with a purpose.</h2><p>Everything you need to turn Computer Science concepts into exam-ready confidence.</p></div><div className="feature-grid">{highlights.map(({ icon: Icon, title, text }) => <article key={title}><div className="feature-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><button onClick={onCategories}>Explore <ArrowRight size={15} /></button></article>)}</div></section>
      <section className="home-exam" id="about"><div><span className="kicker">BPSC TRE PREPARATION</span><h2>One platform focused on Computer Science.</h2><p>Practice core subjects with Easy, Medium and Hard questions designed around BPSC TRE Computer Science preparation.</p></div><button onClick={onStart}>Start TRE practice <ArrowRight size={17} /></button></section>
    </main>
    <footer className="footer"><span>© 2026 BPSC TRE CS. Computer Science practice platform.</span><span><a href="#home">Home</a><a href="#features">Features</a></span></footer>
  </div>
}

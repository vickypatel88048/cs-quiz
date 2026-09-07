import React from 'react'
import { ArrowRight, BrainCircuit, Search, Menu, X, Monitor, GitBranch, Database, Cpu, Network, Code2, Binary, Braces, Blocks, ShieldCheck, GraduationCap } from 'lucide-react'
import { categories } from './data/categories'

const iconMap = { Monitor, GitBranch, Database, Cpu, Network, Code2, Binary, Braces, Blocks, BrainCircuit, ShieldCheck, GraduationCap }

export default function Categories({ onStart }) {
  const [search, setSearch] = React.useState('')
  const [difficulty, setDifficulty] = React.useState('All')
  const [menuOpen, setMenuOpen] = React.useState(false)
  const filtered = categories.filter(c => (difficulty === 'All' || c.difficulty === difficulty) && `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase()))
  const totalQuestions = categories.reduce((sum, c) => sum + c.count, 0)

  return <div className="site-shell" id="top">
    <header className="navbar">
      <a className="brand" href="#top"><span className="brand-mark"><BrainCircuit size={21} /></span><span>CS<span className="brand-accent">Quiz</span></span></a>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}><a className="active" href="#categories">Categories</a><a href="#exam">Exam Practice</a><a href="#about">About</a></nav>
      <div className="nav-actions"><button className="mobile-menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
    </header>
    <main>
      <section className="category-hero"><div className="category-hero-copy"><div className="eyebrow"><BrainCircuit size={15} /> Computer Science Practice</div><h1>Choose your <span>subject.</span><br />Start learning.</h1><p>Practice Computer Science with focused quizzes across DSA, DBMS, Operating Systems, Networks, Programming and competitive exams.</p></div><div className="subject-orbit"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="orbit-center"><BrainCircuit size={34} /></div><span className="orbit-chip chip-one">DSA</span><span className="orbit-chip chip-two">DBMS</span><span className="orbit-chip chip-three">OS</span><span className="orbit-chip chip-four">Networks</span></div></section>
      <section className="stats-row"><div><strong>{categories.length}</strong><span>Subjects</span></div><div><strong>{totalQuestions}+</strong><span>Questions</span></div><div><strong>4</strong><span>Difficulty levels</span></div><div><strong>24×7</strong><span>Practice</span></div></section>
      <section className="category-section" id="categories"><div className="section-heading"><div><p className="kicker">Explore subjects</p><h2>Practice by category</h2></div><p className="result-count">{filtered.length} subjects</p></div><div className="category-tools"><label className="category-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subjects..." /></label><div className="difficulty-filter">{['All','Easy','Medium','Hard','Mixed'].map(item => <button key={item} className={difficulty === item ? 'selected' : ''} onClick={() => setDifficulty(item)}>{item}</button>)}</div></div>{filtered.length ? <div className="full-category-grid">{filtered.map((item, index) => { const Icon = iconMap[item.icon] || BrainCircuit; return <article className="full-category-card" key={item.id}><div className="card-top"><div className="category-icon"><Icon size={21} /></div><span className={`difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span></div><span className="card-number">{String(index + 1).padStart(2, '0')}</span><h3>{item.name}</h3><p>{item.description}</p><div className="card-bottom"><span>{item.count}+ questions</span><button onClick={onStart}>Start practice <ArrowRight size={15} /></button></div></article> })}</div> : <div className="empty-state"><Search size={28} /><h3>No subjects found</h3><p>Try another subject or difficulty.</p></div>}</section>
      <section className="exam-banner" id="exam"><div><p className="kicker">Competitive preparation</p><h2>Ready for exam-style practice?</h2><p>Build speed and accuracy for UGC NET, GATE, STET and placement preparation.</p></div><button onClick={onStart}>Start quiz <ArrowRight size={16} /></button></section>
    </main><footer className="footer" id="about"><span>© 2026 CSQuiz · Computer Science practice platform</span><div><a href="#categories">Subjects</a><a href="#exam">Exam Practice</a></div></footer>
  </div>
}

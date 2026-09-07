import React from 'react'
import { ArrowRight, BrainCircuit, CheckCircle2, Clock3, Database, Play, Trophy } from 'lucide-react'

const highlights = [
  { icon: Database, title: 'Core CS Subjects', text: 'Practice DBMS, OS, DSA, Networks, Programming and more.' },
  { icon: Clock3, title: 'Timed Practice', text: 'Build exam speed with focused quizzes and instant results.' },
  { icon: Trophy, title: 'Track Progress', text: 'Review mistakes and identify the topics that need work.' },
]

export default function Home({ onStart, onCategories }) {
  return <div className="home-page">
    <header className="navbar home-navbar">
      <a className="brand" href="#home"><span className="brand-mark"><BrainCircuit size={21} /></span><span>CS<span className="brand-accent">Quiz</span></span></a>
      <nav className="home-links"><a className="active" href="#home">Home</a><button onClick={onCategories}>Categories</button><a href="#features">Features</a><a href="#about">About</a></nav>
      <button className="home-nav-cta" onClick={onStart}>Start Quiz <ArrowRight size={16} /></button>
    </header>
    <main id="home">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow"><BrainCircuit size={15} /> Computer Science Practice</span>
          <h1>Learn. Practice.<br /><span>Master CS.</span></h1>
          <p>Challenge yourself with carefully designed Computer Science quizzes. Improve concepts, speed and exam confidence one question at a time.</p>
          <div className="hero-actions"><button className="primary-btn large" onClick={onStart}>Start practicing <ArrowRight size={18} /></button><button className="secondary-btn large" onClick={onCategories}>Explore subjects</button></div>
          <div className="hero-trust"><CheckCircle2 size={16} /><span>Instant results</span><i /> <span>Detailed explanations</span><i /> <span>Exam-focused</span></div>
        </div>
        <div className="hero-visual"><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="hero-quiz-card"><div className="mini-top"><span>LIVE PRACTICE</span><b>01 / 10</b></div><div className="mini-progress"><span /></div><small>Data Structures</small><h3>Which data structure is best suited for implementing recursion?</h3><div className="mini-option"><b>A</b> Stack</div><div className="mini-option"><b>B</b> Queue</div><div className="mini-option"><b>C</b> Linked List</div><div className="mini-option"><b>D</b> Heap</div><button onClick={onStart}><Play size={13} fill="currentColor" /> Start quiz</button></div></div>
      </section>
      <section className="home-stats"><div><strong>12+</strong><span>CS Subjects</span></div><div><strong>1,000+</strong><span>Practice Questions</span></div><div><strong>4</strong><span>Difficulty Levels</span></div><div><strong>24/7</strong><span>Self Practice</span></div></section>
      <section className="home-features" id="features"><div className="home-section-head"><span className="kicker">WHY CSQUIZ</span><h2>Practice with a purpose.</h2><p>Everything you need to turn weak concepts into exam-ready confidence.</p></div><div className="feature-grid">{highlights.map(({ icon: Icon, title, text }) => <article key={title}><div className="feature-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><button onClick={onCategories}>Explore <ArrowRight size={15} /></button></article>)}</div></section>
      <section className="home-exam" id="about"><div><span className="kicker">EXAM PRACTICE</span><h2>Prepare for your next Computer Science exam.</h2><p>Practice concepts relevant to UGC NET, GATE, STET, placements and competitive exams.</p></div><button onClick={onStart}>Start exam practice <ArrowRight size={17} /></button></section>
    </main>
    <footer className="footer"><span>© 2026 CSQuiz. Learn Computer Science smarter.</span><span><a href="#home">Home</a><a href="#features">Features</a></span></footer>
  </div>
}

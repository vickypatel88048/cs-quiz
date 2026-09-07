import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrainCircuit, ChevronDown, Menu, Search, Sparkles } from 'lucide-react'
import './styles.css'

const categories = [
  { name: 'Data Structures', count: '120+ quizzes' },
  { name: 'DBMS', count: '95+ quizzes' },
  { name: 'Operating System', count: '80+ quizzes' },
  { name: 'Computer Networks', count: '85+ quizzes' },
  { name: 'Programming', count: '150+ quizzes' },
  { name: 'Computer Fundamentals', count: '100+ quizzes' },
]

const highlights = [
  ['01', 'Practice by topic', 'Pick a subject and focus on the concepts that matter most.'],
  ['02', 'Learn from mistakes', 'See explanations after each attempt and improve faster.'],
  ['03', 'Track progress', 'Build consistency with scores, streaks and performance insights.'],
]

function App() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="site-shell">
      <header className="navbar">
        <a className="brand" href="#top" aria-label="CS Quiz home">
          <span className="brand-mark"><BrainCircuit size={21} strokeWidth={2.3} /></span>
          <span>CS<span className="brand-accent">Quiz</span></span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <a className="active" href="#top">Home</a>
          <a href="#quizzes">Quizzes</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search"><Search size={19} /></button>
          <button className="login-btn">Login</button>
          <button className="signup-btn">Get started</button>
          <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <div className="eyebrow"><Sparkles size={15} /> Built for serious CS practice</div>
            <h1>Master Computer Science,<br /><span>one quiz at a time.</span></h1>
            <p className="hero-copy">
              Sharpen your concepts with focused quizzes on programming, DSA, DBMS, OS, networking and more — all in one place.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#quizzes">Start practicing <span>→</span></a>
              <a className="secondary-btn" href="#categories">Explore categories</a>
            </div>
            <div className="hero-meta">
              <div><strong>750+</strong><span>questions ready</span></div>
              <i></i>
              <div><strong>12+</strong><span>CS subjects</span></div>
              <i></i>
              <div><strong>Free</strong><span>to get started</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="glow"></div>
            <div className="quiz-window">
              <div className="quiz-window-top"><span></span><span></span><span></span><b>CS Quiz / DSA</b></div>
              <div className="quiz-progress"><span></span></div>
              <small>Question 7 of 20</small>
              <h3>Which data structure is best suited for implementing recursion?</h3>
              <div className="option correct"><b>A</b><span>Stack</span><em>✓</em></div>
              <div className="option"><b>B</b><span>Queue</span></div>
              <div className="option"><b>C</b><span>Graph</span></div>
              <div className="option"><b>D</b><span>Heap</span></div>
            </div>
            <div className="score-pill"><strong>92%</strong><span>Best score</span></div>
            <div className="streak-pill"><strong>12</strong><span>day streak</span></div>
          </div>
        </section>

        <section className="trust-strip">
          <p>Designed for learners preparing for</p>
          <div><span>College exams</span><span>Placements</span><span>Competitive exams</span><span>Technical interviews</span></div>
        </section>

        <section className="section" id="categories">
          <div className="section-heading">
            <div><p className="kicker">TOPICS</p><h2>Practice by subject</h2></div>
            <a href="#categories">View all <span>→</span></a>
          </div>
          <div className="category-grid">
            {categories.map((item, index) => (
              <article className="category-card" key={item.name}>
                <div className={`category-number n${index + 1}`}>0{index + 1}</div>
                <h3>{item.name}</h3>
                <p>{item.count}</p>
                <a href="#quizzes">Practice <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section split" id="quizzes">
          <div className="split-copy"><p className="kicker">HOW IT WORKS</p><h2>Less scrolling.<br />More learning.</h2><p>Everything is structured around one goal: helping you spend your time answering better questions and understanding why an answer is right.</p><a className="text-link" href="#about">See the platform <span>→</span></a></div>
          <div className="highlights">{highlights.map(([n,t,d])=><div className="highlight" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
        </section>

        <section className="cta" id="about">
          <div><p className="kicker">READY?</p><h2>Turn practice into confidence.</h2><p>Start with a quiz, learn from every answer, and keep moving forward.</p></div>
          <a className="primary-btn light" href="#quizzes">Start your first quiz <span>→</span></a>
        </section>
      </main>

      <footer className="footer"><div>© 2026 CSQuiz. Built for better CS practice.</div><div><a href="#top">Home</a><a href="#categories">Categories</a><a href="#about">About</a></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

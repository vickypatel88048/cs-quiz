import React from 'react'
import { ArrowLeft, BrainCircuit, Check, Copy, Edit3, Plus, Save, Search, Trash2, X } from 'lucide-react'
import { categories } from './data/categories'
import { questionBank } from './data/questionBank'
import './admin.css'

const STORAGE_KEY = 'bpsc_tre_cs_custom_questions'
const subjects = categories.filter(c => c.id !== 'exam-practice')
const emptyForm = { subject: subjects[0]?.id || '', topic: '', question: '', options: ['', '', '', ''], answer: 0, explanation: '', difficulty: 'Medium' }

const loadQuestions = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
const saveQuestions = items => localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
const addToBank = items => { items.forEach(q => { if (!questionBank[q.subject]) questionBank[q.subject] = []; const index = questionBank[q.subject].findIndex(x => x.id === q.id); if (index >= 0) questionBank[q.subject][index] = q; else questionBank[q.subject].push(q) }) }
const removeFromBank = id => Object.keys(questionBank).forEach(key => { questionBank[key] = questionBank[key].filter(q => q.id !== id) })
addToBank(loadQuestions())

export default function Admin({ onHome }) {
  const [questions, setQuestions] = React.useState(loadQuestions)
  const [form, setForm] = React.useState(emptyForm)
  const [editingId, setEditingId] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [filterSubject, setFilterSubject] = React.useState('All')
  const [filterDifficulty, setFilterDifficulty] = React.useState('All')
  const [message, setMessage] = React.useState('')

  const subjectName = id => subjects.find(s => s.id === id)?.name || id
  const resetForm = () => { setForm(emptyForm); setEditingId(null) }
  const updateField = (key, value) => setForm(v => ({ ...v, [key]: value }))
  const updateOption = (index, value) => setForm(v => ({ ...v, options: v.options.map((o, i) => i === index ? value : o) }))

  const submit = e => {
    e.preventDefault()
    if (!form.question.trim() || form.options.some(o => !o.trim()) || !form.topic.trim()) return setMessage('Question, topic aur 4 options fill karein.')
    const clean = { ...form, question: form.question.trim(), topic: form.topic.trim(), options: form.options.map(o => o.trim()), explanation: form.explanation.trim() || 'Correct answer ko syllabus concept ke according review karein.' }
    const next = editingId ? questions.map(q => q.id === editingId ? { ...q, ...clean } : q) : [{ ...clean, id: `custom-${Date.now()}` }, ...questions]
    setQuestions(next); saveQuestions(next); addToBank(next); setMessage(editingId ? 'Question updated successfully.' : 'Question added successfully.'); resetForm()
    setTimeout(() => setMessage(''), 2200)
  }

  const edit = q => { setEditingId(q.id); setForm({ ...q, options: [...q.options] }); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const remove = id => { if (!window.confirm('Is question ko delete karna hai?')) return; const next = questions.filter(q => q.id !== id); setQuestions(next); saveQuestions(next); removeFromBank(id); if (editingId === id) resetForm() }
  const duplicate = q => { const copy = { ...q, id: `custom-${Date.now()}`, question: `${q.question} (Copy)` }; const next = [copy, ...questions]; setQuestions(next); saveQuestions(next); addToBank([copy]); setMessage('Question duplicated.') }
  const filtered = questions.filter(q => (filterSubject === 'All' || q.subject === filterSubject) && (filterDifficulty === 'All' || q.difficulty === filterDifficulty) && `${q.question} ${q.topic}`.toLowerCase().includes(search.toLowerCase()))

  return <div className="admin-page">
    <header className="admin-header"><button className="brand brand-button" onClick={onHome}><span className="brand-mark"><BrainCircuit size={21}/></span><span>BPSC TRE <span className="brand-accent">CS</span></span></button><div><span className="admin-badge">ADMIN</span><h1>Question Manager</h1></div><button className="admin-back" onClick={onHome}><ArrowLeft size={16}/> Back</button></header>
    <main className="admin-main">
      <section className="admin-intro"><div><p className="admin-kicker">BPSC TRE · COMPUTER SCIENCE</p><h2>{editingId ? 'Edit question' : 'Add new question'}</h2><p>Apne questions add karein. Added questions browser me save rahenge aur subject quiz + Full Mock me automatically use honge.</p></div><div className="admin-count"><strong>{questions.length}</strong><span>Your questions</span></div></section>
      <section className="admin-card form-card"><div className="card-heading"><div><span className="admin-kicker">QUESTION BUILDER</span><h3>{editingId ? 'Update question' : 'Create a question'}</h3></div>{editingId && <button className="ghost-btn" onClick={resetForm}><X size={15}/> Cancel edit</button>}</div>
        <form onSubmit={submit} className="question-form">
          <div className="form-grid two"><label>Subject<select value={form.subject} onChange={e => updateField('subject', e.target.value)}>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label>Topic<input value={form.topic} onChange={e => updateField('topic', e.target.value)} placeholder="e.g. Process Scheduling" /></label></div>
          <label>Question<textarea rows="3" value={form.question} onChange={e => updateField('question', e.target.value)} placeholder="Enter BPSC TRE Computer Science question..." /></label>
          <div className="options-grid">{form.options.map((option, i) => <label key={i}>Option {String.fromCharCode(65+i)}<input value={option} onChange={e => updateOption(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65+i)}`} /></label>)}</div>
          <div className="form-grid two"><label>Correct answer<select value={form.answer} onChange={e => updateField('answer', Number(e.target.value))}>{form.options.map((o, i) => <option key={i} value={i}>{String.fromCharCode(65+i)} — {o || `Option ${String.fromCharCode(65+i)}`}</option>)}</select></label><label>Difficulty<select value={form.difficulty} onChange={e => updateField('difficulty', e.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label></div>
          <label>Explanation <span className="optional">(optional)</span><textarea rows="3" value={form.explanation} onChange={e => updateField('explanation', e.target.value)} placeholder="Explain why this answer is correct..." /></label>
          {message && <div className="form-message"><Check size={16}/> {message}</div>}
          <div className="form-actions"><button type="button" className="ghost-btn" onClick={resetForm}>Clear</button><button className="primary-btn" type="submit">{editingId ? <><Save size={17}/> Update question</> : <><Plus size={17}/> Add question</>}</button></div>
        </form>
      </section>

      <section className="admin-card manage-card"><div className="card-heading"><div><span className="admin-kicker">QUESTION BANK</span><h3>Manage your questions</h3></div><strong className="manage-total">{filtered.length} shown</strong></div>
        <div className="manage-tools"><label className="admin-search"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." /></label><select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}><option value="All">All subjects</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}><option>All</option><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
        <div className="admin-list">{filtered.length ? filtered.map(q => <article className="admin-question" key={q.id}><div className="admin-question-top"><span>{subjectName(q.subject)}</span><span>{q.topic}</span><span className={`difficulty-pill ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span></div><h4>{q.question}</h4><div className="admin-options">{q.options.map((o,i)=><span className={i===q.answer?'correct':''} key={i}><b>{String.fromCharCode(65+i)}</b>{o}{i===q.answer && <Check size={14}/>}</span>)}</div><div className="admin-question-actions"><button onClick={() => edit(q)}><Edit3 size={15}/> Edit</button><button onClick={() => duplicate(q)}><Copy size={15}/> Duplicate</button><button className="danger-btn" onClick={() => remove(q.id)}><Trash2 size={15}/> Delete</button></div></article>) : <div className="admin-empty"><BrainCircuit size={30}/><h3>No questions yet</h3><p>Upar form se apna pehla BPSC TRE CS question add karein.</p></div>}</div>
      </section>
    </main>
  </div>
}

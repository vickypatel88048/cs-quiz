'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Question } from '@/data/questions';

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({question:'',a:'',b:'',c:'',d:'',answer:'0',chapter:'Digital Logic',difficulty:'Easy'});

  useEffect(() => { try { setQuestions(JSON.parse(localStorage.getItem('biharExamQuestions') || '[]')); } catch {} }, []);

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.a || !form.b || !form.c || !form.d) { setMessage('Please fill all fields.'); return; }
    const item: Question = { id: Date.now(), exam:'Bihar STET Computer Science', chapter:form.chapter, difficulty:form.difficulty as Question['difficulty'], question:form.question, options:[form.a,form.b,form.c,form.d], answer:Number(form.answer), explanation:'Added from Admin Dashboard.' };
    const next = [...questions, item]; localStorage.setItem('biharExamQuestions', JSON.stringify(next)); setQuestions(next); setMessage('✅ Question added successfully.'); setForm({question:'',a:'',b:'',c:'',d:'',answer:'0',chapter:'Digital Logic',difficulty:'Easy'});
  };

  const clearQuestions = () => { localStorage.removeItem('biharExamQuestions'); setQuestions([]); setMessage('Question list cleared from this browser.'); };
  const cards=[['Exams','4'],['Subjects','6'],['Chapters','50+'],['Questions',String(1200 + questions.length)],['Mock Tests','25+'],['Jobs','0'],['Results','0'],['Notes','50+']];
  return <main className="page"><div className="container"><h1>Admin Dashboard</h1><p className="muted">Content manage karo. Added questions is browser mein save honge aur Mock Test mein available honge.</p><div className="stats">{cards.map(c=><div className="stat" key={c[0]}><b>{c[1]}</b><small>{c[0]}</small></div>)}</div><div className="card" style={{marginTop:22}}><h2>➕ Add MCQ Question</h2><form onSubmit={addQuestion} style={{display:'grid',gap:12,marginTop:16}}><textarea required placeholder="Question" value={form.question} onChange={e=>setForm({...form,question:e.target.value})} style={{padding:12,borderRadius:10,border:'1px solid var(--border)',minHeight:90}}/><div className="grid2"><input required placeholder="Option A" value={form.a} onChange={e=>setForm({...form,a:e.target.value})}/><input required placeholder="Option B" value={form.b} onChange={e=>setForm({...form,b:e.target.value})}/><input required placeholder="Option C" value={form.c} onChange={e=>setForm({...form,c:e.target.value})}/><input required placeholder="Option D" value={form.d} onChange={e=>setForm({...form,d:e.target.value})}/></div><div className="grid3"><select value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})}><option value="0">Correct: A</option><option value="1">Correct: B</option><option value="2">Correct: C</option><option value="3">Correct: D</option></select><input placeholder="Chapter" value={form.chapter} onChange={e=>setForm({...form,chapter:e.target.value})}/><select value={form.difficulty} onChange={e=>setForm({...form,difficulty:e.target.value})}><option>Easy</option><option>Medium</option><option>Hard</option></select></div><button className="btn primary" type="submit">Save Question</button>{message && <p className="muted">{message}</p>}</form></div><div className="card" style={{marginTop:18}}><div className="sectionhead"><div><h2>My Added Questions</h2><p className="muted">{questions.length} questions stored locally</p></div>{questions.length>0 && <button className="btn" onClick={clearQuestions}>Clear</button>}</div>{questions.length===0 ? <p className="muted">Abhi koi custom question nahi hai.</p> : <div className="list">{questions.map((q,i)=><div className="row" key={q.id}><div><strong>{i+1}. {q.question}</strong><span>{q.chapter} • {q.difficulty} • Correct: {q.options[q.answer]}</span></div></div>)}</div>}</div></div></main>;
}

'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Question } from '@/data/questions';
import { ChapterNote, chapterNotes as seedNotes } from '@/data/notes';

type NoteForm = { title: string; description: string; topics: string; revision: string };
const emptyNote: NoteForm = { title: '', description: '', topics: '', revision: '' };
const STORAGE = 'biharExamNotes';

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notes, setNotes] = useState<ChapterNote[]>([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({question:'',a:'',b:'',c:'',d:'',answer:'0',chapter:'Digital Logic',difficulty:'Easy'});
  const [noteForm, setNoteForm] = useState<NoteForm>(emptyNote);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      setQuestions(JSON.parse(localStorage.getItem('biharExamQuestions') || '[]'));
      setNotes(JSON.parse(localStorage.getItem(STORAGE) || '[]'));
    } catch {}
  }, []);

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.a || !form.b || !form.c || !form.d) { setMessage('Please fill all fields.'); return; }
    const item: Question = { id: Date.now(), exam:'Bihar STET Computer Science', chapter:form.chapter, difficulty:form.difficulty as Question['difficulty'], question:form.question, options:[form.a,form.b,form.c,form.d], answer:Number(form.answer), explanation:'Added from Admin Dashboard.' };
    const next = [...questions, item]; localStorage.setItem('biharExamQuestions', JSON.stringify(next)); setQuestions(next); setMessage('✅ Question added successfully.');
    setForm({question:'',a:'',b:'',c:'',d:'',answer:'0',chapter:'Digital Logic',difficulty:'Easy'});
  };

  const saveNote = (e: FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim() || !noteForm.topics.trim()) { setMessage('Note title and at least one topic are required.'); return; }
    const slug = editingSlug || noteForm.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `note-${Date.now()}`;
    const topics = noteForm.topics.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
      const [title, ...rest] = line.split('|');
      return { title: title.trim(), points: (rest.join('|') || title).split(';').map((p) => p.trim()).filter(Boolean) };
    });
    const revision = noteForm.revision.split('\n').map((x) => x.trim()).filter(Boolean);
    const item: ChapterNote = { slug, title: noteForm.title.trim(), description: noteForm.description.trim(), topics, revision };
    const next = editingSlug ? notes.map((n) => n.slug === editingSlug ? item : n) : [...notes, item];
    localStorage.setItem(STORAGE, JSON.stringify(next)); setNotes(next); setNoteForm(emptyNote); setEditingSlug(null); setMessage(editingSlug ? '✅ Note updated.' : '✅ Note added.');
  };

  const editNote = (note: ChapterNote) => {
    setEditingSlug(note.slug);
    setNoteForm({ title: note.title, description: note.description, topics: note.topics.map((t) => `${t.title}|${t.points.join(';')}`).join('\n'), revision: note.revision.join('\n') });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const deleteNote = (slug: string) => {
    const next = notes.filter((n) => n.slug !== slug); localStorage.setItem(STORAGE, JSON.stringify(next)); setNotes(next); setMessage('Note deleted from this browser.');
  };

  const clearQuestions = () => { localStorage.removeItem('biharExamQuestions'); setQuestions([]); setMessage('Question list cleared from this browser.'); };
  const clearNotes = () => { localStorage.removeItem(STORAGE); setNotes([]); setMessage('Custom notes cleared. Built-in notes remain available.'); };
  const cards=[['Exams','4'],['Subjects','6'],['Chapters',String(seedNotes.length + notes.length)],['Questions',String(1200 + questions.length)],['Mock Tests','25+'],['Jobs','0'],['Results','0'],['Notes',String(seedNotes.length + notes.length)]];

  return <main className="page"><div className="container">
    <h1>Admin Dashboard</h1><p className="muted">Questions aur Notes manage karo. Abhi content browser ke local storage mein save hota hai; production ke liye database + secure admin auth next phase mein add karenge.</p>
    <div className="stats">{cards.map(c=><div className="stat" key={c[0]}><b>{c[1]}</b><small>{c[0]}</small></div>)}</div>

    <div className="card" style={{marginTop:22}}><h2>➕ Add MCQ Question</h2><form onSubmit={addQuestion} style={{display:'grid',gap:12,marginTop:16}}><textarea required placeholder="Question" value={form.question} onChange={e=>setForm({...form,question:e.target.value})}/><div className="grid2"><input required placeholder="Option A" value={form.a} onChange={e=>setForm({...form,a:e.target.value})}/><input required placeholder="Option B" value={form.b} onChange={e=>setForm({...form,b:e.target.value})}/><input required placeholder="Option C" value={form.c} onChange={e=>setForm({...form,c:e.target.value})}/><input required placeholder="Option D" value={form.d} onChange={e=>setForm({...form,d:e.target.value})}/></div><div className="grid3"><select value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})}><option value="0">Correct: A</option><option value="1">Correct: B</option><option value="2">Correct: C</option><option value="3">Correct: D</option></select><input placeholder="Chapter" value={form.chapter} onChange={e=>setForm({...form,chapter:e.target.value})}/><select value={form.difficulty} onChange={e=>setForm({...form,difficulty:e.target.value})}><option>Easy</option><option>Medium</option><option>Hard</option></select></div><button className="btn primary" type="submit">Save Question</button></form></div>

    <div className="card" style={{marginTop:18}}><div className="sectionhead"><div><h2>📚 Manage Notes</h2><p className="muted">Custom chapter notes add, edit aur delete karo.</p></div>{notes.length>0 && <button className="btn" onClick={clearNotes}>Clear Custom Notes</button>}</div>
      <form onSubmit={saveNote} style={{display:'grid',gap:12,marginTop:16}}>
        <div className="grid2"><input required placeholder="Chapter title e.g. Computer Architecture" value={noteForm.title} onChange={e=>setNoteForm({...noteForm,title:e.target.value})}/><input placeholder="Short description" value={noteForm.description} onChange={e=>setNoteForm({...noteForm,description:e.target.value})}/></div>
        <textarea required rows={7} placeholder={'One topic per line. Format:\n1. CPU | ALU;Control Unit;Registers\n2. Memory | RAM is volatile;Cache is fast'} value={noteForm.topics} onChange={e=>setNoteForm({...noteForm,topics:e.target.value})}/>
        <textarea rows={5} placeholder="Quick revision — one point per line" value={noteForm.revision} onChange={e=>setNoteForm({...noteForm,revision:e.target.value})}/>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}><button className="btn primary" type="submit">{editingSlug ? 'Update Note' : 'Save Note'}</button>{editingSlug && <button className="btn" type="button" onClick={()=>{setEditingSlug(null);setNoteForm(emptyNote)}}>Cancel Edit</button>}</div>
      </form>
      <div className="list">{notes.length===0 ? <p className="muted">No custom notes yet. Built-in notes are available on the Notes page.</p> : notes.map((note)=><div className="row" key={note.slug}><div><strong>{note.title}</strong><span>{note.topics.length} topics • {note.revision.length} revision points</span></div><div style={{display:'flex',gap:8}}><button className="btn" onClick={()=>editNote(note)}>Edit</button><button className="btn" onClick={()=>deleteNote(note.slug)}>Delete</button></div></div>)}</div>
    </div>

    <div className="card" style={{marginTop:18}}><div className="sectionhead"><div><h2>My Added Questions</h2><p className="muted">{questions.length} questions stored locally</p></div>{questions.length>0 && <button className="btn" onClick={clearQuestions}>Clear</button>}</div>{questions.length===0 ? <p className="muted">Abhi koi custom question nahi hai.</p> : <div className="list">{questions.map((q,i)=><div className="row" key={q.id}><div><strong>{i+1}. {q.question}</strong><span>{q.chapter} • {q.difficulty} • Correct: {q.options[q.answer]}</span></div></div>)}</div>}</div>
    {message && <p className="muted" style={{marginTop:14}}>{message}</p>}
  </div></main>;
}

'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Trash2, Pencil, X, Plus, BookOpen, HelpCircle } from 'lucide-react';
import { Question } from '@/data/questions';
import { ChapterNote, chapterNotes as seedNotes } from '@/data/notes';

type NoteForm = { title: string; description: string; topics: string; revision: string };
type QuestionForm = { question: string; a: string; b: string; c: string; d: string; answer: string; chapter: string; difficulty: string };

const emptyNote: NoteForm = { title: '', description: '', topics: '', revision: '' };
const emptyQuestion: QuestionForm = { question: '', a: '', b: '', c: '', d: '', answer: '0', chapter: 'Digital Logic', difficulty: 'Easy' };
const QUESTION_STORAGE = 'biharExamQuestions';
const NOTE_STORAGE = 'biharExamNotes';

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notes, setNotes] = useState<ChapterNote[]>([]);
  const [message, setMessage] = useState('');
  const [questionForm, setQuestionForm] = useState<QuestionForm>(emptyQuestion);
  const [noteForm, setNoteForm] = useState<NoteForm>(emptyNote);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editingNoteSlug, setEditingNoteSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      setQuestions(JSON.parse(localStorage.getItem(QUESTION_STORAGE) || '[]'));
      setNotes(JSON.parse(localStorage.getItem(NOTE_STORAGE) || '[]'));
    } catch {
      setMessage('Saved browser data could not be loaded.');
    }
  }, []);

  const flash = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2500);
  };

  const saveQuestions = (next: Question[]) => {
    localStorage.setItem(QUESTION_STORAGE, JSON.stringify(next));
    setQuestions(next);
  };

  const addOrUpdateQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (![questionForm.question, questionForm.a, questionForm.b, questionForm.c, questionForm.d].every(v => v.trim())) {
      flash('Please fill question and all 4 options.');
      return;
    }

    const item: Question = {
      id: editingQuestionId ?? Date.now(),
      exam: 'Bihar STET Computer Science',
      chapter: questionForm.chapter.trim() || 'General',
      difficulty: questionForm.difficulty as Question['difficulty'],
      question: questionForm.question.trim(),
      options: [questionForm.a.trim(), questionForm.b.trim(), questionForm.c.trim(), questionForm.d.trim()],
      answer: Number(questionForm.answer),
      explanation: 'Added from Admin Dashboard.',
    };

    const next = editingQuestionId === null
      ? [...questions, item]
      : questions.map(q => q.id === editingQuestionId ? item : q);

    saveQuestions(next);
    setQuestionForm(emptyQuestion);
    setEditingQuestionId(null);
    flash(editingQuestionId === null ? '✅ Question added.' : '✅ Question updated.');
  };

  const editQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setQuestionForm({ question: q.question, a: q.options[0] || '', b: q.options[1] || '', c: q.options[2] || '', d: q.options[3] || '', answer: String(q.answer), chapter: q.chapter, difficulty: q.difficulty });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteQuestion = (id: number) => {
    if (!window.confirm('Delete this question?')) return;
    saveQuestions(questions.filter(q => q.id !== id));
    if (editingQuestionId === id) { setEditingQuestionId(null); setQuestionForm(emptyQuestion); }
    flash('Question deleted.');
  };

  const clearQuestions = () => {
    if (!questions.length || !window.confirm('Delete all custom questions?')) return;
    localStorage.removeItem(QUESTION_STORAGE);
    setQuestions([]);
    flash('All custom questions deleted.');
  };

  const saveNote = (e: FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim() || !noteForm.topics.trim()) {
      flash('Chapter title and at least one topic are required.');
      return;
    }

    const slug = editingNoteSlug || noteForm.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `note-${Date.now()}`;
    const topics = noteForm.topics.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
      const [title, ...rest] = line.split('|');
      return { title: title.trim(), points: (rest.join('|') || title).split(';').map(p => p.trim()).filter(Boolean) };
    });
    const revision = noteForm.revision.split('\n').map(x => x.trim()).filter(Boolean);
    const item: ChapterNote = { slug, title: noteForm.title.trim(), description: noteForm.description.trim(), topics, revision };
    const next = editingNoteSlug ? notes.map(n => n.slug === editingNoteSlug ? item : n) : [...notes, item];

    localStorage.setItem(NOTE_STORAGE, JSON.stringify(next));
    setNotes(next);
    setNoteForm(emptyNote);
    setEditingNoteSlug(null);
    flash(editingNoteSlug ? '✅ Note updated.' : '✅ Note added.');
  };

  const editNote = (note: ChapterNote) => {
    setEditingNoteSlug(note.slug);
    setNoteForm({ title: note.title, description: note.description, topics: note.topics.map(t => `${t.title}|${t.points.join(';')}`).join('\n'), revision: note.revision.join('\n') });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const deleteNote = (slug: string) => {
    if (!window.confirm('Delete this custom chapter note?')) return;
    const next = notes.filter(n => n.slug !== slug);
    localStorage.setItem(NOTE_STORAGE, JSON.stringify(next));
    setNotes(next);
    if (editingNoteSlug === slug) { setEditingNoteSlug(null); setNoteForm(emptyNote); }
    flash('Note deleted.');
  };

  const clearNotes = () => {
    if (!notes.length || !window.confirm('Delete all custom notes?')) return;
    localStorage.removeItem(NOTE_STORAGE);
    setNotes([]);
    setEditingNoteSlug(null);
    setNoteForm(emptyNote);
    flash('All custom notes deleted. Built-in notes remain available.');
  };

  return (
    <main className="page">
      <div className="container">
        <div className="sectionhead">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="muted">Yahin se MCQ aur chapter-wise Notes add, edit aur delete karo.</p>
          </div>
          <span className="badge">Local Admin</span>
        </div>

        <div className="stats">
          <div className="stat"><b>{seedNotes.length + notes.length}</b><small>Total Chapters</small></div>
          <div className="stat"><b>{notes.length}</b><small>Custom Notes</small></div>
          <div className="stat"><b>{questions.length}</b><small>Custom MCQs</small></div>
          <div className="stat"><b>15 min</b><small>Mock Timer</small></div>
        </div>

        <section className="card" style={{ marginTop: 22 }}>
          <div className="sectionhead">
            <div><h2><HelpCircle size={20} /> {editingQuestionId ? 'Edit MCQ Question' : 'Add MCQ Question'}</h2><p className="muted">Question Mock Test aur MCQ Practice mein use hoga.</p></div>
            {editingQuestionId && <button className="btn" type="button" onClick={() => { setEditingQuestionId(null); setQuestionForm(emptyQuestion); }}><X size={16} /> Cancel</button>}
          </div>
          <form onSubmit={addOrUpdateQuestion} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <textarea required rows={4} placeholder="Question likhiye..." value={questionForm.question} onChange={e => setQuestionForm({ ...questionForm, question: e.target.value })} />
            <div className="grid2">
              <input required placeholder="Option A" value={questionForm.a} onChange={e => setQuestionForm({ ...questionForm, a: e.target.value })} />
              <input required placeholder="Option B" value={questionForm.b} onChange={e => setQuestionForm({ ...questionForm, b: e.target.value })} />
              <input required placeholder="Option C" value={questionForm.c} onChange={e => setQuestionForm({ ...questionForm, c: e.target.value })} />
              <input required placeholder="Option D" value={questionForm.d} onChange={e => setQuestionForm({ ...questionForm, d: e.target.value })} />
            </div>
            <div className="grid3">
              <select value={questionForm.answer} onChange={e => setQuestionForm({ ...questionForm, answer: e.target.value })}><option value="0">Correct: A</option><option value="1">Correct: B</option><option value="2">Correct: C</option><option value="3">Correct: D</option></select>
              <input placeholder="Chapter" value={questionForm.chapter} onChange={e => setQuestionForm({ ...questionForm, chapter: e.target.value })} />
              <select value={questionForm.difficulty} onChange={e => setQuestionForm({ ...questionForm, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select>
            </div>
            <button className="btn primary" type="submit">{editingQuestionId ? <><Pencil size={16} /> Update Question</> : <><Plus size={16} /> Save Question</>}</button>
          </form>
        </section>

        <section className="card" style={{ marginTop: 18 }}>
          <div className="sectionhead">
            <div><h2><BookOpen size={20} /> Manage Notes</h2><p className="muted">Custom chapter notes add/edit/delete karo. Built-in notes safe rahenge.</p></div>
            {notes.length > 0 && <button className="btn" onClick={clearNotes}><Trash2 size={16} /> Clear Custom</button>}
          </div>
          <form onSubmit={saveNote} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <div className="grid2"><input required placeholder="Chapter title" value={noteForm.title} onChange={e => setNoteForm({ ...noteForm, title: e.target.value })} /><input placeholder="Short description" value={noteForm.description} onChange={e => setNoteForm({ ...noteForm, description: e.target.value })} /></div>
            <textarea required rows={7} placeholder={'One topic per line\nFormat: CPU | ALU;Control Unit;Registers\nMemory | RAM is volatile;Cache is fast'} value={noteForm.topics} onChange={e => setNoteForm({ ...noteForm, topics: e.target.value })} />
            <textarea rows={5} placeholder="Quick revision — one point per line" value={noteForm.revision} onChange={e => setNoteForm({ ...noteForm, revision: e.target.value })} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn primary" type="submit">{editingNoteSlug ? 'Update Note' : 'Save Note'}</button>{editingNoteSlug && <button className="btn" type="button" onClick={() => { setEditingNoteSlug(null); setNoteForm(emptyNote); }}>Cancel Edit</button>}</div>
          </form>

          <div className="list" style={{ marginTop: 18 }}>
            {notes.length === 0 ? <p className="muted">No custom notes yet. Built-in {seedNotes.length} chapters Notes page par available hain.</p> : notes.map(note => (
              <div className="row" key={note.slug}>
                <div><strong>{note.title}</strong><span>{note.topics.length} topics • {note.revision.length} revision points</span></div>
                <div style={{ display: 'flex', gap: 8 }}><button className="btn" onClick={() => editNote(note)}><Pencil size={15} /> Edit</button><button className="btn" onClick={() => deleteNote(note.slug)}><Trash2 size={15} /> Delete</button></div>
              </div>
            ))}
          </div>
        </section>

        <section className="card" style={{ marginTop: 18 }}>
          <div className="sectionhead">
            <div><h2>My Added Questions</h2><p className="muted">Sirf browser mein saved custom questions.</p></div>
            {questions.length > 0 && <button className="btn" onClick={clearQuestions}><Trash2 size={16} /> Clear All</button>}
          </div>
          {questions.length === 0 ? <p className="muted" style={{ marginTop: 16 }}>Abhi koi custom question nahi hai.</p> : <div className="list" style={{ marginTop: 16 }}>{questions.map((q, i) => (
            <div className="row" key={q.id}>
              <div><strong>{i + 1}. {q.question}</strong><span>{q.chapter} • {q.difficulty} • Correct: {q.options[q.answer]}</span></div>
              <div style={{ display: 'flex', gap: 8 }}><button className="btn" onClick={() => editQuestion(q)}><Pencil size={15} /> Edit</button><button className="btn" onClick={() => deleteQuestion(q.id)}><Trash2 size={15} /> Delete</button></div>
            </div>
          ))}</div>}
        </section>

        {message && <div className="notice" style={{ marginTop: 16 }}>{message}</div>}
        <p className="muted" style={{ marginTop: 16 }}>Note: Abhi Admin data browser localStorage mein hai. Real production admin ke liye next step MongoDB + secure authentication hoga.</p>
      </div>
    </main>
  );
}

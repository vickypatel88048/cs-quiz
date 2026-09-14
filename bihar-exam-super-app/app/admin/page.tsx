'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, HelpCircle, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { Question } from '@/data/questions';
import { ChapterNote, chapterNotes as seedNotes } from '@/data/notes';

type QuestionForm = { question: string; a: string; b: string; c: string; d: string; answer: string; chapter: string; difficulty: 'Easy' | 'Medium' | 'Hard' };
type NoteForm = { title: string; description: string; topics: string; revision: string };
const emptyQuestion: QuestionForm = { question: '', a: '', b: '', c: '', d: '', answer: '0', chapter: 'Digital Logic', difficulty: 'Easy' };
const emptyNote: NoteForm = { title: '', description: '', topics: '', revision: '' };
const QUESTION_STORAGE = 'biharExamQuestions';
const NOTE_STORAGE = 'biharExamNotes';

export default function Admin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notes, setNotes] = useState<ChapterNote[]>([]);
  const [questionForm, setQuestionForm] = useState<QuestionForm>(emptyQuestion);
  const [noteForm, setNoteForm] = useState<NoteForm>(emptyNote);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editingNoteSlug, setEditingNoteSlug] = useState<string | null>(null);
  const [questionSearch, setQuestionSearch] = useState('');
  const [noteSearch, setNoteSearch] = useState('');
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState<'overview' | 'questions' | 'notes'>('overview');

  useEffect(() => {
    try {
      setQuestions(JSON.parse(localStorage.getItem(QUESTION_STORAGE) || '[]'));
      setNotes(JSON.parse(localStorage.getItem(NOTE_STORAGE) || '[]'));
    } catch { setMessage('Saved browser data load nahi ho saka.'); }
  }, []);

  const flash = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(''), 2800); };
  const saveQuestions = (next: Question[]) => { localStorage.setItem(QUESTION_STORAGE, JSON.stringify(next)); setQuestions(next); };
  const saveNotes = (next: ChapterNote[]) => { localStorage.setItem(NOTE_STORAGE, JSON.stringify(next)); setNotes(next); };

  const addOrUpdateQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (![questionForm.question, questionForm.a, questionForm.b, questionForm.c, questionForm.d].every(v => v.trim())) return flash('Question aur 4 options complete karein.');
    const item: Question = { id: editingQuestionId ?? Date.now(), exam: 'Bihar STET Computer Science', chapter: questionForm.chapter.trim() || 'General', difficulty: questionForm.difficulty, question: questionForm.question.trim(), options: [questionForm.a.trim(), questionForm.b.trim(), questionForm.c.trim(), questionForm.d.trim()], answer: Number(questionForm.answer), explanation: 'Added from Admin Dashboard.' };
    saveQuestions(editingQuestionId === null ? [...questions, item] : questions.map(q => q.id === editingQuestionId ? item : q));
    const editing = editingQuestionId !== null; setQuestionForm(emptyQuestion); setEditingQuestionId(null); flash(editing ? '✅ Question updated.' : '✅ Question added.');
  };

  const editQuestion = (q: Question) => { setEditingQuestionId(q.id); setQuestionForm({ question: q.question, a: q.options[0] || '', b: q.options[1] || '', c: q.options[2] || '', d: q.options[3] || '', answer: String(q.answer), chapter: q.chapter, difficulty: q.difficulty }); setActiveSection('questions'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const deleteQuestion = (id: number) => { if (!window.confirm('Is question ko delete karein?')) return; saveQuestions(questions.filter(q => q.id !== id)); if (editingQuestionId === id) { setEditingQuestionId(null); setQuestionForm(emptyQuestion); } flash('Question deleted.'); };
  const clearQuestions = () => { if (!questions.length || !window.confirm('Saare custom questions delete karein?')) return; localStorage.removeItem(QUESTION_STORAGE); setQuestions([]); flash('All custom questions deleted.'); };

  const saveNote = (e: FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim() || !noteForm.topics.trim()) return flash('Chapter title aur kam se kam ek topic required hai.');
    const slug = editingNoteSlug || noteForm.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `note-${Date.now()}`;
    const topics = noteForm.topics.split('\n').map(x => x.trim()).filter(Boolean).map(line => { const [title, ...rest] = line.split('|'); return { title: title.trim(), points: (rest.join('|') || title).split(';').map(p => p.trim()).filter(Boolean) }; });
    const revision = noteForm.revision.split('\n').map(x => x.trim()).filter(Boolean);
    const item: ChapterNote = { slug, title: noteForm.title.trim(), description: noteForm.description.trim(), topics, revision };
    saveNotes(editingNoteSlug ? notes.map(n => n.slug === editingNoteSlug ? item : n) : [...notes, item]);
    const editing = !!editingNoteSlug; setNoteForm(emptyNote); setEditingNoteSlug(null); flash(editing ? '✅ Note updated.' : '✅ Note added.');
  };

  const editNote = (note: ChapterNote) => { setEditingNoteSlug(note.slug); setNoteForm({ title: note.title, description: note.description, topics: note.topics.map(t => `${t.title}|${t.points.join(';')}`).join('\n'), revision: note.revision.join('\n') }); setActiveSection('notes'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const deleteNote = (slug: string) => { if (!window.confirm('Is custom note ko delete karein?')) return; saveNotes(notes.filter(n => n.slug !== slug)); if (editingNoteSlug === slug) { setEditingNoteSlug(null); setNoteForm(emptyNote); } flash('Note deleted.'); };
  const clearNotes = () => { if (!notes.length || !window.confirm('Saare custom notes delete karein?')) return; localStorage.removeItem(NOTE_STORAGE); setNotes([]); setEditingNoteSlug(null); setNoteForm(emptyNote); flash('All custom notes deleted. Built-in notes safe hain.'); };

  const filteredQuestions = useMemo(() => questions.filter(q => `${q.question} ${q.chapter} ${q.difficulty}`.toLowerCase().includes(questionSearch.toLowerCase())), [questions, questionSearch]);
  const filteredNotes = useMemo(() => notes.filter(n => `${n.title} ${n.description}`.toLowerCase().includes(noteSearch.toLowerCase())), [notes, noteSearch]);

  return <main className="adminPage"><div className="adminShell">
    <aside className="adminSide">
      <div className="adminLogo"><div className="adminLogoMark">BE</div><div><b>BiharExam</b><small>Admin Panel</small></div></div>
      <div className="adminMenu">
        <button className={activeSection === 'overview' ? 'adminMenuItem active' : 'adminMenuItem'} onClick={() => setActiveSection('overview')}>▦ <span>Overview</span></button>
        <button className={activeSection === 'questions' ? 'adminMenuItem active' : 'adminMenuItem'} onClick={() => setActiveSection('questions')}>? <span>MCQ Questions</span><em>{questions.length}</em></button>
        <button className={activeSection === 'notes' ? 'adminMenuItem active' : 'adminMenuItem'} onClick={() => setActiveSection('notes')}>▤ <span>Chapter Notes</span><em>{notes.length}</em></button>
      </div>
      <div className="adminSideBottom"><span>● Admin mode</span><small>Local browser storage</small></div>
    </aside>

    <section className="adminMain">
      <header className="adminTop"><div><span className="adminEyebrow">BIHAR EXAM SUPER APP</span><h1>{activeSection === 'overview' ? 'Dashboard Overview' : activeSection === 'questions' ? 'MCQ Questions' : 'Chapter Notes'}</h1></div><a className="btn" href="/">← Website</a></header>

      {message && <div className="adminNotice"><CheckCircle2 size={18} /> {message}</div>}

      {activeSection === 'overview' && <>
        <div className="adminStats"><div className="adminStat"><span>Total Chapters</span><strong>{seedNotes.length + notes.length}</strong><small>Built-in + custom</small></div><div className="adminStat"><span>Custom Notes</span><strong>{notes.length}</strong><small>Created by you</small></div><div className="adminStat"><span>Custom MCQs</span><strong>{questions.length}</strong><small>Available in practice</small></div><div className="adminStat"><span>Mock Duration</span><strong>15 min</strong><small>Current test timer</small></div></div>
        <div className="adminWelcome"><div><span className="adminPill">CONTENT MANAGEMENT</span><h2>Exam content yahin se manage karein</h2><p>Students ke liye chapter-wise Notes aur MCQ Practice content create, update aur maintain karein.</p><div className="adminActions"><button className="btn primary" onClick={() => setActiveSection('questions')}><Plus size={16}/> Add MCQ</button><button className="btn" onClick={() => setActiveSection('notes')}><BookOpen size={16}/> Manage Notes</button></div></div><div className="adminWelcomeIcon">✦</div></div>
        <div className="adminQuick"><button onClick={() => setActiveSection('questions')}><div className="quickIcon">?</div><div><b>MCQ Question Bank</b><span>{questions.length} custom questions • Add/Edit/Delete</span></div><ChevronDown size={18}/></button><button onClick={() => setActiveSection('notes')}><div className="quickIcon">▤</div><div><b>Chapter Notes</b><span>{seedNotes.length} built-in + {notes.length} custom chapters</span></div><ChevronDown size={18}/></button></div>
      </>}

      {activeSection === 'questions' && <section className="adminContentCard">
        <div className="adminCardHead"><div><span className="adminPill">QUESTION BANK</span><h2>{editingQuestionId ? 'Edit MCQ Question' : 'Add New MCQ Question'}</h2><p>Ye question MCQ Practice aur Mock Test dono mein available hoga.</p></div>{editingQuestionId && <button className="btn" onClick={() => { setEditingQuestionId(null); setQuestionForm(emptyQuestion); }}><X size={16}/> Cancel</button>}</div>
        <form onSubmit={addOrUpdateQuestion} className="adminForm">
          <label>Question<textarea required rows={4} placeholder="Example: Which gate is known as a universal gate?" value={questionForm.question} onChange={e => setQuestionForm({...questionForm, question:e.target.value})}/></label>
          <div className="adminOptionGrid"><label>Option A<input required value={questionForm.a} onChange={e=>setQuestionForm({...questionForm,a:e.target.value})}/></label><label>Option B<input required value={questionForm.b} onChange={e=>setQuestionForm({...questionForm,b:e.target.value})}/></label><label>Option C<input required value={questionForm.c} onChange={e=>setQuestionForm({...questionForm,c:e.target.value})}/></label><label>Option D<input required value={questionForm.d} onChange={e=>setQuestionForm({...questionForm,d:e.target.value})}/></label></div>
          <div className="adminOptionGrid"><label>Correct Answer<select value={questionForm.answer} onChange={e=>setQuestionForm({...questionForm,answer:e.target.value})}><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></label><label>Chapter<input value={questionForm.chapter} onChange={e=>setQuestionForm({...questionForm,chapter:e.target.value})}/></label><label>Difficulty<select value={questionForm.difficulty} onChange={e=>setQuestionForm({...questionForm,difficulty:e.target.value as QuestionForm['difficulty']})}><option>Easy</option><option>Medium</option><option>Hard</option></select></label><div className="formAction"><button className="btn primary" type="submit">{editingQuestionId ? <><Pencil size={16}/> Update Question</> : <><Plus size={16}/> Save Question</>}</button></div></div>
        </form>
        <div className="adminListHead"><div><h3>Saved Questions</h3><span>{filteredQuestions.length} of {questions.length}</span></div><div className="adminSearch"><Search size={16}/><input placeholder="Search question or chapter..." value={questionSearch} onChange={e=>setQuestionSearch(e.target.value)}/></div>{questions.length>0 && <button className="btn danger" onClick={clearQuestions}><Trash2 size={15}/> Clear All</button>}</div>
        <div className="adminQuestionList">{filteredQuestions.length === 0 ? <div className="adminEmpty"><HelpCircle size={28}/><b>{questions.length ? 'No matching questions' : 'No custom questions yet'}</b><span>Upar form se apna pehla question add karein.</span></div> : filteredQuestions.map((q,i)=><article className="adminQuestion" key={q.id}><div className="questionNo">{i+1}</div><div className="questionBody"><b>{q.question}</b><div className="questionMeta"><span>{q.chapter}</span><span>{q.difficulty}</span><span>Correct: {String.fromCharCode(65 + q.answer)}</span></div></div><div className="questionActions"><button onClick={()=>editQuestion(q)} aria-label="Edit"><Pencil size={16}/></button><button onClick={()=>deleteQuestion(q.id)} aria-label="Delete"><Trash2 size={16}/></button></div></article>)}</div>
      </section>}

      {activeSection === 'notes' && <section className="adminContentCard">
        <div className="adminCardHead"><div><span className="adminPill">NOTES MANAGER</span><h2>{editingNoteSlug ? 'Edit Chapter Note' : 'Create Chapter Note'}</h2><p>Chapter-wise concept notes students ko Notes page par dikhenge.</p></div>{editingNoteSlug && <button className="btn" onClick={()=>{setEditingNoteSlug(null);setNoteForm(emptyNote)}}><X size={16}/> Cancel</button>}</div>
        <form onSubmit={saveNote} className="adminForm"><div className="adminOptionGrid"><label>Chapter Title<input required placeholder="Digital Logic" value={noteForm.title} onChange={e=>setNoteForm({...noteForm,title:e.target.value})}/></label><label>Short Description<input placeholder="Chapter ka short introduction" value={noteForm.description} onChange={e=>setNoteForm({...noteForm,description:e.target.value})}/></label></div><label>Topics & Concepts<textarea required rows={8} placeholder={'One topic per line\nFormat: Number Systems | Binary;Octal;Decimal;Hexadecimal\nBoolean Algebra | AND;OR;NOT;De Morgan laws'} value={noteForm.topics} onChange={e=>setNoteForm({...noteForm,topics:e.target.value})}/></label><label>Quick Revision<textarea rows={5} placeholder="One revision point per line" value={noteForm.revision} onChange={e=>setNoteForm({...noteForm,revision:e.target.value})}/></label><div><button className="btn primary" type="submit">{editingNoteSlug ? 'Update Chapter' : <><Plus size={16}/> Save Chapter</>}</button></div></form>
        <div className="adminListHead"><div><h3>Custom Chapters</h3><span>{filteredNotes.length} of {notes.length}</span></div><div className="adminSearch"><Search size={16}/><input placeholder="Search chapter..." value={noteSearch} onChange={e=>setNoteSearch(e.target.value)}/></div>{notes.length>0 && <button className="btn danger" onClick={clearNotes}><Trash2 size={15}/> Clear All</button>}</div>
        <div className="adminQuestionList">{filteredNotes.length === 0 ? <div className="adminEmpty"><BookOpen size={28}/><b>{notes.length ? 'No matching chapters' : 'No custom notes yet'}</b><span>Built-in notes safe hain. Yahan se custom chapter add karein.</span></div> : filteredNotes.map(note=><article className="adminQuestion" key={note.slug}><div className="questionNo"><BookOpen size={17}/></div><div className="questionBody"><b>{note.title}</b><div className="questionMeta"><span>{note.topics.length} topics</span><span>{note.revision.length} revision points</span></div></div><div className="questionActions"><button onClick={()=>editNote(note)} aria-label="Edit"><Pencil size={16}/></button><button onClick={()=>deleteNote(note.slug)} aria-label="Delete"><Trash2 size={16}/></button></div></article>)}</div>
      </section>}

      <footer className="adminFooter">Admin data abhi <b>browser localStorage</b> mein hai. Production version mein MongoDB + secure admin authentication connect kiya jayega.</footer>
    </section>
  </div></main>;
}

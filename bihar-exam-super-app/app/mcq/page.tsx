'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { questions as seedQuestions, Question } from '@/data/questions';

export default function MCQ() {
  const params = useSearchParams();
  const initialChapter = params.get('chapter') || 'All';
  const [difficulty, setDifficulty] = useState<'All' | Question['difficulty']>('All');
  const [chapter, setChapter] = useState(initialChapter);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const custom = useMemo<Question[]>(() => { if(typeof window==='undefined') return []; try{return JSON.parse(localStorage.getItem('biharExamQuestions')||'[]')}catch{return []} }, []);
  const allQuestions = useMemo(() => [...seedQuestions, ...custom], [custom]);
  const chapters = Array.from(new Set(allQuestions.map(q=>q.chapter)));
  const filtered = useMemo(() => allQuestions.filter(q=>(difficulty==='All'||q.difficulty===difficulty)&&(chapter==='All'||q.chapter===chapter)), [allQuestions,difficulty,chapter]);
  const q = filtered[index];
  const reset = (d: typeof difficulty, c: string) => {setDifficulty(d);setChapter(c);setIndex(0);setSelected(null);setShowAnswer(false)};
  const next = () => {setIndex(i=>Math.min(i+1,filtered.length-1));setSelected(null);setShowAnswer(false)};
  return <main className="page"><div className="container"><h1>❓ MCQ Practice</h1><p className="muted">Notes ke baad chapter-wise questions practice karein.</p><div className="card" style={{marginTop:22}}><div className="grid3"><select value={difficulty} onChange={e=>reset(e.target.value as typeof difficulty,chapter)}><option>All</option><option>Easy</option><option>Medium</option><option>Hard</option></select><select value={chapter} onChange={e=>reset(difficulty,e.target.value)}><option>All</option>{chapters.map(c=><option key={c}>{c}</option>)}</select><div className="tag" style={{alignSelf:'center',textAlign:'center'}}>{filtered.length} Questions</div></div></div>{!q?<div className="card" style={{marginTop:18}}><h2>No questions found</h2><p className="muted">Is chapter/difficulty ke liye questions available nahi hain.</p></div>:<div className="card" style={{maxWidth:850,margin:'18px auto'}}><div className="sectionhead"><div><span className="tag">{q.chapter}</span><span className="tag">{q.difficulty}</span></div><span className="muted">{index+1} / {filtered.length}</span></div><h2 style={{lineHeight:1.5,marginTop:18}}>{q.question}</h2><div className="list">{q.options.map((option,i)=><button key={option} className="row" style={{textAlign:'left',cursor:showAnswer?'default':'pointer',border:selected===i?'2px solid var(--primary)':undefined}} onClick={()=>!showAnswer&&setSelected(i)}><strong>{String.fromCharCode(65+i)}. {option}</strong>{showAnswer&&i===q.answer&&<span>✅ Correct</span>}{showAnswer&&selected===i&&i!==q.answer&&<span>❌ Your answer</span>}</button>)}</div>{!showAnswer?<button className="btn primary" style={{marginTop:20}} disabled={selected===null} onClick={()=>setShowAnswer(true)}>Check Answer</button>:<div className="card" style={{marginTop:20,background:'#f8fafc'}}><strong>{selected===q.answer?'🎉 Correct!':`❌ Incorrect — Correct answer: ${q.options[q.answer]}`}</strong><p className="muted">{q.explanation}</p></div>}<div className="sectionhead" style={{marginTop:20}}><button className="btn" disabled={index===0} onClick={()=>{setIndex(i=>i-1);setSelected(null);setShowAnswer(false)}}>← Previous</button><button className="btn primary" disabled={index===filtered.length-1||!showAnswer} onClick={next}>Next →</button></div></div>}</div></main>;
}

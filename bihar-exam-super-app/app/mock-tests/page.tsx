'use client';

import { useEffect, useMemo, useState } from 'react';
import { questions as seedQuestions, Question } from '@/data/questions';

const TEST_SIZE = 10;
const TOTAL_SECONDS = 15 * 60;

export default function MockTests() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);

  const availableQuestions = useMemo(() => {
    if (typeof window === 'undefined') return seedQuestions;
    try {
      const extra = JSON.parse(localStorage.getItem('biharExamQuestions') || '[]');
      return [...seedQuestions, ...extra];
    } catch { return seedQuestions; }
  }, [started]);

  useEffect(() => {
    if (!started || finished) return;
    if (seconds <= 0) { setFinished(true); return; }
    const timer = window.setInterval(() => setSeconds(s => s - 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, finished, seconds]);

  const startTest = () => {
    setTestQuestions(availableQuestions.slice(0, Math.min(TEST_SIZE, availableQuestions.length)));
    setAnswers({}); setCurrent(0); setSeconds(TOTAL_SECONDS); setFinished(false); setStarted(true);
  };

  const score = testQuestions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);
  const formatTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  if (!started) return <main className="page"><div className="container"><h1>⏱️ Mock Tests</h1><p className="muted">Bihar exams ke liye timed practice tests.</p><div className="card" style={{maxWidth:720,marginTop:22}}><h2>Bihar STET Computer Science Mock #1</h2><p className="muted">{Math.min(TEST_SIZE, availableQuestions.length)} Questions • 15 Minutes • Instant Result</p><div className="stats"><div className="stat"><b>{Math.min(TEST_SIZE, availableQuestions.length)}</b><small>Questions</small></div><div className="stat"><b>15:00</b><small>Time Limit</small></div><div className="stat"><b>+1</b><small>Correct</small></div><div className="stat"><b>0</b><small>Negative</small></div></div><button className="btn primary" style={{marginTop:22}} onClick={startTest}>Start Test →</button></div></div></main>;

  if (finished) return <main className="page"><div className="container"><div className="card" style={{maxWidth:760,margin:'20px auto'}}><h1>🎉 Test Completed</h1><p className="muted">Your practice result</p><div className="stat" style={{marginTop:20,textAlign:'center'}}><b style={{fontSize:48}}>{score}/{testQuestions.length}</b><small>Score</small></div><div className="actions"><button className="btn primary" onClick={startTest}>Try Again</button><button className="btn" onClick={() => {setStarted(false);setFinished(false)}}>Back to Tests</button></div><div className="list">{testQuestions.map((q,i)=><div className="row" key={q.id}><div><strong>Q{i+1}. {q.question}</strong><span>{answers[i] === q.answer ? '✅ Correct' : `❌ Incorrect • Correct: ${q.options[q.answer]}`}</span></div></div>)}</div></div></div></main>;

  const q = testQuestions[current];
  return <main className="page"><div className="container"><div className="sectionhead"><div><h1>Mock Test</h1><p className="muted">Question {current + 1} of {testQuestions.length}</p></div><div className="tag" style={{fontSize:15}}>⏱️ {formatTime}</div></div><div className="card" style={{maxWidth:850,margin:'0 auto'}}><span className="tag">{q.chapter}</span><span className="tag">{q.difficulty}</span><h2 style={{lineHeight:1.5,marginTop:20}}>{q.question}</h2><div className="list">{q.options.map((option,i)=><button key={option} className="row" style={{textAlign:'left',cursor:'pointer',fontSize:15,border: answers[current] === i ? '2px solid var(--primary)' : undefined}} onClick={() => setAnswers(a => ({...a,[current]:i}))}><strong>{String.fromCharCode(65+i)}. {option}</strong>{answers[current] === i && <span>Selected</span>}</button>)}</div><div className="sectionhead" style={{marginTop:24}}><button className="btn" disabled={current===0} onClick={() => setCurrent(c=>c-1)}>← Previous</button>{current === testQuestions.length-1 ? <button className="btn primary" onClick={() => setFinished(true)}>Submit Test</button> : <button className="btn primary" onClick={() => setCurrent(c=>c+1)}>Next →</button>}</div></div></div></main>;
}

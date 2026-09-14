'use client';

import { useMemo, useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { chapterNotes } from '@/data/notes';

export default function Notes() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(chapterNotes[0].slug);
  const [openTopic, setOpenTopic] = useState(0);
  const filtered = useMemo(() => { const q=search.trim().toLowerCase(); return q ? chapterNotes.filter(n=>`${n.title} ${n.description} ${n.topics.map(t=>t.title+' '+t.points.join(' ')).join(' ')}`.toLowerCase().includes(q)) : chapterNotes; }, [search]);
  const current = chapterNotes.find(n=>n.slug===active) ?? filtered[0] ?? chapterNotes[0];
  return <main className="page"><div className="container">
    <div className="notesHero"><span className="badge"><BookOpen size={15}/> Bihar STET Computer Science</span><h1>📚 Chapter-wise Notes</h1><p className="muted">Concept-first study material. Notes page par sirf study notes hain — MCQ alag section mein hai.</p></div>
    <div className="searchBox" style={{marginTop:20}}><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search chapter or concept..."/></div>
    <div className="notesLayout" style={{marginTop:24}}>
      <aside className="card notesSidebar"><h3>Chapters</h3><div className="list compactList">{filtered.map((n,i)=><button key={n.slug} className={`chapterBtn ${current.slug===n.slug?'active':''}`} onClick={()=>{setActive(n.slug);setOpenTopic(0)}}><span><small>Unit {chapterNotes.indexOf(n)+1}</small>{n.title}</span><span>›</span></button>)}</div>{!filtered.length&&<p className="muted">No chapter found.</p>}</aside>
      <section className="card notesContent"><span className="badge">Unit {chapterNotes.indexOf(current)+1}</span><h2>{current.title}</h2><p className="muted">{current.description}</p><div className="topicList">{current.topics.map((topic,i)=>{const open=openTopic===i;return <div className="topic" key={topic.title}><button className="topicHead" onClick={()=>setOpenTopic(open?-1:i)}><strong>{topic.title}</strong>{open?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</button>{open&&<ul>{topic.points.map(p=><li key={p}>{p}</li>)}</ul>}</div>})}</div><div className="revisionBox"><h3>⚡ Quick Revision</h3><ul>{current.revision.map(p=><li key={p}>{p}</li>)}</ul></div></section>
    </div>
  </div></main>;
}

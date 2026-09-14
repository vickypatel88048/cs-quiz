'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react';
import { chapterNotes } from '@/data/notes';

export default function Notes() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(chapterNotes[0].slug);
  const [openTopic, setOpenTopic] = useState(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chapterNotes;
    return chapterNotes.filter((note) => `${note.title} ${note.description} ${note.topics.map((t) => `${t.title} ${t.points.join(' ')}`).join(' ')}`.toLowerCase().includes(q));
  }, [search]);

  const current = chapterNotes.find((note) => note.slug === active) ?? filtered[0] ?? chapterNotes[0];

  function selectChapter(slug: string) {
    setActive(slug);
    setOpenTopic(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="page">
      <div className="container">
        <div className="hero">
          <div>
            <span className="badge"><BookOpen size={15} /> Bihar STET Computer Science</span>
            <h1>📚 Chapter-wise Notes</h1>
            <p className="muted">Concept-first notes, important points and quick revision — chapter by chapter.</p>
          </div>
        </div>

        <div className="searchBox" style={{ marginTop: 20 }}>
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search chapter or concept..." />
          {search && <button className="ghost" onClick={() => setSearch('')}><RotateCcw size={16} /></button>}
        </div>

        <div className="notesLayout" style={{ marginTop: 24 }}>
          <aside className="card notesSidebar">
            <h3>Chapters</h3>
            <div className="list compactList">
              {filtered.map((note) => (
                <button key={note.slug} className={`chapterBtn ${current.slug === note.slug ? 'active' : ''}`} onClick={() => selectChapter(note.slug)}>
                  <span><small>Unit {chapterNotes.indexOf(note) + 1}</small>{note.title}</span><span>›</span>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <p className="muted">No chapter found.</p>}
          </aside>

          <section className="card notesContent">
            <div className="noteHeader">
              <div><span className="badge">Unit {chapterNotes.indexOf(current) + 1}</span><h2>{current.title}</h2><p className="muted">{current.description}</p></div>
              <Link className="btn" href={`/mcq?chapter=${encodeURIComponent(current.title)}`}>Practice MCQs →</Link>
            </div>

            <div className="topicList">
              {current.topics.map((topic, index) => {
                const isOpen = openTopic === index;
                return <div className="topic" key={topic.title}>
                  <button className="topicHead" onClick={() => setOpenTopic(isOpen ? -1 : index)}><span>{topic.title}</span>{isOpen ? <ChevronUp size={19} /> : <ChevronDown size={19} />}</button>
                  {isOpen && <ul>{topic.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </div>;
              })}
            </div>

            <div className="revisionBox"><h3>⚡ Quick Revision</h3><ul>{current.revision.map((point) => <li key={point}>{point}</li>)}</ul></div>
          </section>
        </div>
      </div>
    </main>
  );
}

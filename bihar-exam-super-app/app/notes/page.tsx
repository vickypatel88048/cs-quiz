import { chapterNotes } from '@/data/notes';

export default function Notes() {
  return (
    <main className="page">
      <div className="container">
        <h1>📚 Chapter-wise Notes</h1>
        <p className="muted">Bihar STET Computer Science — concept-first preparation.</p>

        <div className="list" style={{ marginTop: 24 }}>
          {chapterNotes.map((chapter, index) => (
            <article className="card" key={chapter.slug}>
              <div className="sectionhead">
                <div>
                  <span className="badge">Unit {index + 1}</span>
                  <h2 style={{ marginTop: 8 }}>{chapter.title}</h2>
                  <p className="muted">{chapter.description}</p>
                </div>
              </div>

              <div className="list" style={{ marginTop: 16 }}>
                {chapter.topics.map((topic) => (
                  <section className="topic" key={topic.title} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 12, background: '#fff' }}>
                    <h3>{topic.title}</h3>
                    <ul style={{ margin: '10px 0 0', paddingLeft: 22, lineHeight: 1.8 }}>
                      {topic.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="revisionBox" style={{ marginTop: 18 }}>
                <h3>⚡ Quick Revision</h3>
                <ul style={{ marginBottom: 0, lineHeight: 1.8 }}>
                  {chapter.revision.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

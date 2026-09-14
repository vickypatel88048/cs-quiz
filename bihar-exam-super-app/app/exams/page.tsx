import Link from 'next/link';

const exams = [
  { name: 'Bihar STET — Computer Science', desc: 'Notes, chapter-wise MCQs and timed mock tests', href: '/notes', live: true },
  { name: 'BPSC — General Studies', desc: 'Preparation module coming soon', href: '#', live: false },
  { name: 'TRE — Teacher Recruitment', desc: 'Preparation module coming soon', href: '#', live: false },
  { name: 'BTET — Teacher Eligibility', desc: 'Preparation module coming soon', href: '#', live: false },
];

export default function Exams(){return <main className="page"><div className="container"><h1>🎓 All Exams</h1><p className="muted">Sirf wahi module open hoga jo abhi available hai. Baaki exams clearly Coming Soon hain.</p><div className="list" style={{marginTop:24}}>{exams.map(x=>x.live?<Link className="row" href={x.href} key={x.name}><div><strong>{x.name}</strong><span>{x.desc}</span></div><span>Open →</span></Link>:<div className="row" key={x.name} style={{opacity:.65}}><div><strong>{x.name}</strong><span>{x.desc}</span></div><span>Coming Soon</span></div>)}</div></div></main>}

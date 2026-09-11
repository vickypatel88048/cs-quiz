import React from 'react'
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight } from 'lucide-react'

const chapters = [
  { id:'digital-logic', title:'Digital Logic', topics:['Number Systems','BCD, ASCII, EBCDIC & Gray Code','1’s & 2’s Complement','Boolean Algebra','Logic Gates','K-Map','Combinational Circuits','Sequential Circuits'], notes:[
    ['Number Systems','Binary has base 2 and uses 0,1. Octal has base 8 and uses 0–7. Decimal has base 10 and uses 0–9. Hexadecimal has base 16 and uses 0–9 and A–F.'],
    ['Binary Conversion','For binary to decimal, multiply each bit by its corresponding power of 2 and add. For decimal to binary, repeatedly divide by 2 and read remainders from bottom to top.'],
    ['Quick Rules','3 binary bits = 1 octal digit. 4 binary bits = 1 hexadecimal digit. These rules make binary–octal and binary–hexadecimal conversion fast.'],
    ['Exam Focus','Practice conversions, code conversions, complements, Boolean laws, truth tables and gate-based questions.']
  ]},
  { id:'coa', title:'Computer Organization & Architecture', topics:['CPU','Memory','Registers','Instruction Cycle','I/O Organization','Cache'], notes:[['CPU','The CPU executes instructions and mainly consists of the ALU, Control Unit and registers.'],['Memory','Primary memory includes RAM and ROM. Cache is a high-speed memory placed close to the CPU.']]},
  { id:'data-structures', title:'Data Structures', topics:['Array','Linked List','Stack','Queue','Tree','Graph','Hashing'], notes:[['Stack','Stack follows LIFO: Last In, First Out. Push and pop are the fundamental operations.'],['Queue','Queue follows FIFO: First In, First Out. Enqueue inserts and dequeue removes an element.']]},
  { id:'algorithms', title:'Algorithms', topics:['Complexity','Searching','Sorting','Recursion','Greedy','Dynamic Programming'], notes:[['Complexity','Time complexity describes how running time grows with input size. Big-O notation is commonly used for the upper-growth rate.']]},
  { id:'programming', title:'Programming / C & C++', topics:['Variables','Data Types','Operators','Functions','Pointers','OOP'], notes:[['C Basics','C is a procedural programming language with variables, data types, operators, functions, arrays and pointers.'],['OOP','Core OOP concepts include encapsulation, inheritance, polymorphism and abstraction.']]},
  { id:'os', title:'Operating System', topics:['Process','Thread','Scheduling','Deadlock','Memory Management','File System'], notes:[['Process & Thread','A process is a program in execution. A thread is a smaller execution unit within a process.'],['Deadlock','The four necessary conditions are mutual exclusion, hold and wait, no preemption and circular wait.']]},
  { id:'dbms', title:'Database Management System', topics:['ER Model','Relational Model','Keys','SQL','Normalization','Transactions'], notes:[['Keys','A primary key uniquely identifies records. A foreign key creates a relationship by referencing a key in another table.'],['Normalization','Normalization reduces redundancy and update anomalies by organizing relational data into appropriate structures.']]},
  { id:'networks', title:'Computer Networks', topics:['OSI Model','TCP/IP','IP Addressing','Routing','TCP & UDP','Network Devices'], notes:[['OSI Model','The seven layers are Physical, Data Link, Network, Transport, Session, Presentation and Application.'],['TCP vs UDP','TCP is connection-oriented and reliable. UDP is connectionless and generally has lower overhead.']]},
  { id:'software', title:'Software Engineering', topics:['SDLC','Models','Requirements','Testing','Maintenance'], notes:[['SDLC','Common software life-cycle activities include requirements, design, implementation, testing, deployment and maintenance.']]},
  { id:'web', title:'Web Technology', topics:['HTML','CSS','JavaScript','HTTP','Frontend','Backend'], notes:[['Web Basics','HTML structures content, CSS controls presentation and JavaScript adds behavior and interactivity.']]},
  { id:'toc', title:'Theory of Computation', topics:['Automata','DFA','NFA','Regular Languages','CFG','Turing Machine'], notes:[['Automata','Finite automata are abstract machines used to recognize regular languages. DFA has exactly one transition for each state and input symbol.']]},
  { id:'compiler', title:'Compiler Design', topics:['Lexical Analysis','Parsing','Syntax Tree','Semantic Analysis','Code Generation'], notes:[['Compiler Phases','A compiler typically performs lexical analysis, syntax analysis, semantic analysis, intermediate representation, optimization and code generation.']]},
  { id:'graphics', title:'Computer Graphics', topics:['Pixels','Raster','Vector','Transformations','Clipping'], notes:[['Transformations','Translation, rotation and scaling are fundamental 2D/3D geometric transformations.']]},
  { id:'ai', title:'Artificial Intelligence', topics:['AI Basics','Search','Knowledge Representation','Machine Learning','Expert Systems'], notes:[['AI Basics','Artificial Intelligence deals with systems that perform tasks requiring capabilities such as reasoning, learning, perception and decision making.']]},
  { id:'cyber', title:'Cyber Security', topics:['Threats','Authentication','Encryption','Malware','Network Security'], notes:[['Security Basics','Confidentiality, integrity and availability form the CIA triad of information security.']]},
  { id:'discrete', title:'Discrete Mathematics', topics:['Logic','Sets','Relations','Functions','Graphs','Combinatorics'], notes:[['Logic','Propositions are statements that can be either true or false. Logical operators include AND, OR and NOT.']]}
]

export default function Notes({onHome}){
  const [open,setOpen]=React.useState('digital-logic')
  const chapter=chapters.find(c=>c.id===open)||chapters[0]
  return <div className="notes-page">
    <header className="notes-header"><button className="secondary-btn" onClick={onHome}><ArrowLeft size={16}/> Home</button><div><div className="notes-kicker">BPSC TRE COMPUTER SCIENCE</div><h1><BookOpen size={28}/> Chapter-wise Notes</h1><p>Concepts ko chapter aur topic ke hisaab se revise karein.</p></div></header>
    <main className="notes-layout">
      <aside className="notes-sidebar">{chapters.map(c=><button key={c.id} className={open===c.id?'chapter-btn active':'chapter-btn'} onClick={()=>setOpen(c.id)}><span><b>{chapters.indexOf(c)+1}.</b> {c.title}</span>{open===c.id?<ChevronDown size={17}/>:<ChevronRight size={17}/>}</button>)}</aside>
      <section className="notes-content"><div className="notes-title"><span>Chapter {chapters.findIndex(c=>c.id===chapter.id)+1}</span><h2>{chapter.title}</h2><p>{chapter.topics.join(' • ')}</p></div>{chapter.notes.map(([title,text])=><article className="note-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}<div className="exam-tip"><strong>🎯 BPSC TRE Tip</strong><p>Is chapter ke concepts clear karne ke baad isi chapter ke MCQs practice karein.</p></div></section>
    </main>
  </div>
}

import React from 'react'
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight } from 'lucide-react'

const digitalTopics = [
['Number Systems',`A number system is a method of representing numbers using a base (radix).

• Decimal (base 10): digits 0–9.
• Binary (base 2): digits 0 and 1. It is the fundamental number system used by digital computers.
• Octal (base 8): digits 0–7.
• Hexadecimal (base 16): digits 0–9 and A–F, where A=10, B=11, C=12, D=13, E=14, F=15.

Positional value: (d_n × b^n) + ... + (d_1 × b^1) + (d_0 × b^0).
Example: 101101₂ = 32+8+4+1 = 45₁₀.

Decimal → binary: repeatedly divide by 2 and read remainders from bottom to top.
Binary → octal: group bits in 3 from the right. Binary → hexadecimal: group bits in 4 from the right.

Exam shortcut: 1 octal digit = 3 bits; 1 hexadecimal digit = 4 bits.`],
['Fractional & Mixed Conversion',`Binary fractions use negative powers of 2.
Example: 0.101₂ = 1×2⁻¹ + 0×2⁻² + 1×2⁻³ = 0.625₁₀.

Decimal fraction → binary: repeatedly multiply the fractional part by 2 and record the integer part at each step.

For octal and hexadecimal fractions, group bits from the binary point outward: 3 bits for octal and 4 bits for hexadecimal. Add leading/trailing zeroes when needed.`],
['Binary Arithmetic',`Binary addition rules:
0+0=0, 0+1=1, 1+0=1, 1+1=10, 1+1+1=11.

Binary subtraction rules:
0−0=0, 1−0=1, 1−1=0, 0−1 requires a borrow.

Multiplication is similar to decimal multiplication, but each partial product is either 0 or the multiplicand. Division follows the same long-division idea.

Important: overflow occurs when the result cannot be represented with the available number of bits.`],
['BCD Code',`BCD (Binary Coded Decimal) represents each decimal digit separately using 4 bits.

Example: decimal 59 → BCD = 0101 1001. It is NOT the same as converting 59 directly to binary (111011).

Valid 8421 BCD codes are 0000 to 1001. Codes 1010–1111 are invalid in standard 8421 BCD.

BCD is useful when decimal digit representation is important, such as digital displays and decimal-oriented systems.

Exam point: BCD uses 4 bits per decimal digit.`],
['ASCII & EBCDIC',`ASCII (American Standard Code for Information Interchange) is a character encoding. Standard ASCII uses 7 bits and represents 128 characters; extended variants commonly use 8-bit storage.

EBCDIC (Extended Binary Coded Decimal Interchange Code) is an 8-bit character encoding historically associated with IBM mainframe systems.

Do not confuse BCD with ASCII: BCD represents decimal digits, while ASCII/EBCDIC represent characters.`],
['Gray Code',`Gray code is a unit-distance code in which two consecutive code words differ by only one bit.

Binary → Gray:
• MSB remains the same.
• Each next Gray bit = XOR of the current binary bit and the previous binary bit.

Gray → Binary:
• Binary MSB = Gray MSB.
• Each next binary bit = previous binary bit XOR current Gray bit.

Gray code is useful in rotary/position encoders because a one-bit transition reduces ambiguity during changes.

Exam point: consecutive Gray-code values differ in exactly one bit.`],
['Signed Binary Numbers',`Signed numbers need a sign representation. Common methods are sign-magnitude, 1’s complement and 2’s complement.

For n bits:
• Sign-magnitude: MSB is sign; remaining n−1 bits represent magnitude. Both +0 and −0 exist.
• 1’s complement: negative value is obtained by complementing every bit. Both +0 and −0 exist.
• 2’s complement: negative value is obtained by complementing every bit and adding 1. Only one zero exists.

For n-bit 2’s complement, range is −2^(n−1) to +2^(n−1)−1.
Example for 8 bits: −128 to +127.`],
['1’s & 2’s Complement',`1’s complement: replace every 0 by 1 and every 1 by 0.
Example: 00101100 → 11010011.

2’s complement: take 1’s complement and add 1.
00101100 → 11010011 → 11010100.

Subtraction using 2’s complement:
A−B = A + (2’s complement of B). Discard the final carry when appropriate for fixed-width arithmetic.

Why 2’s complement is preferred: one representation of zero and addition hardware can be used for subtraction.`],
['Boolean Algebra',`Boolean algebra works with binary variables and logical operations. Common notation: + means OR, · means AND, and bar/prime means NOT.

Important laws:
• Identity: A+0=A; A·1=A
• Null: A+1=1; A·0=0
• Idempotent: A+A=A; A·A=A
• Complement: A+A̅=1; A·A̅=0
• Involution: (A̅)̅=A
• Commutative: A+B=B+A; AB=BA
• Associative: A+(B+C)=(A+B)+C; A(BC)=(AB)C
• Distributive: A(B+C)=AB+AC; A+BC=(A+B)(A+C)
• Absorption: A+AB=A; A(A+B)=A

De Morgan’s laws:
(A+B)̅ = A̅B̅
(AB)̅ = A̅+B̅

These laws are heavily used for simplification and gate conversion.`],
['Logic Gates',`AND: output 1 only when all inputs are 1. Y=AB.
OR: output 1 when at least one input is 1. Y=A+B.
NOT: output is complement. Y=A̅.
NAND: NOT of AND. Y=(AB)̅.
NOR: NOT of OR. Y=(A+B)̅.
XOR: output 1 when inputs are different. Y=A⊕B=A̅B+AB̅.
XNOR: output 1 when inputs are equal. Y=(A⊕B)̅=AB+A̅B̅.

Universal gates: NAND and NOR. Any Boolean function can be implemented using only NAND gates or only NOR gates.

Two-input truth values:
AND: 00→0, 01→0, 10→0, 11→1.
OR: 00→0, 01→1, 10→1, 11→1.
XOR: 00→0, 01→1, 10→1, 11→0.
XNOR: 00→1, 01→0, 10→0, 11→1.`],
['SOP, POS & Canonical Forms',`SOP (Sum of Products) is an OR of AND terms. POS (Product of Sums) is an AND of OR terms.

Minterm corresponds to a truth-table row where output is 1. A canonical SOP is the sum of minterms: F=Σm(...).
Maxterm corresponds to a row where output is 0. A canonical POS is the product of maxterms: F=ΠM(...).

For a minterm, a variable is uncomplemented when its row value is 1 and complemented when its row value is 0.
For a maxterm, the rule is reversed.

Exam point: SOP → group 1s in K-map; POS → group 0s.`],
['Karnaugh Map (K-Map)',`K-map is a graphical method for simplifying Boolean expressions.

Rules:
• Cells are arranged in Gray-code order, so adjacent cells differ in one variable.
• Make groups of 1, 2, 4, 8, ... cells.
• Groups should be as large as possible.
• Groups may wrap around edges; corner cells can be adjacent through wrapping.
• Overlapping groups are allowed when they produce a simpler expression.
• Every required 1 in SOP must be covered; every required 0 in POS must be covered.
• Don't-care conditions (X) may be used when they help create larger groups.

For SOP, group 1s and retain variables that remain constant inside each group. For POS, group 0s and form sum terms from constants.

Exam focus: 2-variable, 3-variable and 4-variable K-maps, don't-care conditions, minimal SOP/POS.`],
['Combinational Circuits',`In a combinational circuit, output depends only on present input values; there is no stored previous state.

Half Adder:
Sum = A⊕B
Carry = AB

Full Adder has A, B and Cin:
Sum = A⊕B⊕Cin
Carry = AB + BCin + ACin

Half Subtractor:
Difference = A⊕B
Borrow = A̅B

Full Subtractor has A, B and Bin:
Difference = A⊕B⊕Bin
Borrow = A̅B + A̅Bin + BBin

Other important circuits: multiplexer (MUX), demultiplexer (DEMUX), encoder, priority encoder and decoder.`],
['MUX, DEMUX, Encoder & Decoder',`Multiplexer: many inputs → one output. Select lines choose which input reaches the output. For 2^n inputs, n select lines are required.

Demultiplexer: one input → one of many outputs, selected by select lines.

Encoder: 2^n input lines → n output bits, assuming valid one-hot input in a basic encoder.
Priority encoder resolves cases where multiple inputs may be active by assigning priority.

Decoder: n input lines → up to 2^n output lines. It converts an n-bit input into one selected output line in a basic decoder.

Exam shortcut: MUX selects; DEMUX distributes; Encoder compresses; Decoder expands.`],
['Sequential Circuits & Flip-Flops',`A sequential circuit depends on present inputs and previous state. It therefore contains memory elements.

Latch is level-sensitive; flip-flop is generally edge-triggered.

SR flip-flop: Set and Reset inputs. In the basic NOR implementation, S=R=1 is the forbidden condition.
JK flip-flop: improvement over SR; J=K=1 causes toggle.
D flip-flop: single data input; next state follows D on the active clock edge. It avoids the invalid SR input combination.
T flip-flop: T=0 holds state; T=1 toggles state.

Characteristic equations:
D: Q(next)=D
T: Q(next)=T⊕Q
JK: Q(next)=JQ̅ + K̅Q

Important applications: registers, counters, frequency division and state machines.`],
['Registers & Counters',`Register: group of flip-flops used to store multiple bits.

Shift registers move data left/right on clock pulses. Types include SISO, SIPO, PISO and PIPO.

Counter: sequential circuit that advances through a sequence of states.
• Asynchronous/ripple counter: clock is not applied simultaneously to all flip-flops; propagation delay accumulates.
• Synchronous counter: flip-flops receive a common clock, giving better speed.
• Up counter increments; down counter decrements.

An n-bit binary counter has up to 2^n states.

Exam focus: shift-register types, ripple vs synchronous counter, mod-N counters and flip-flop-based state sequences.`],
['Important Exam Revision',`🔥 Must remember:
1. Binary=base 2, Octal=base 8, Decimal=base 10, Hex=base 16.
2. 3 binary bits = 1 octal digit; 4 binary bits = 1 hex digit.
3. BCD encodes each decimal digit separately using 4 bits.
4. Standard ASCII is 7-bit; EBCDIC is 8-bit.
5. Gray code changes one bit between consecutive values.
6. 2’s complement = 1’s complement + 1.
7. n-bit 2’s-complement range = −2^(n−1) to 2^(n−1)−1.
8. NAND and NOR are universal gates.
9. De Morgan: (A+B)̅=A̅B̅ and (AB)̅=A̅+B̅.
10. K-map groups have 1,2,4,8,... cells.
11. SOP → group 1s; POS → group 0s.
12. Combinational = no memory; Sequential = memory/state.
13. MUX: many-to-one; DEMUX: one-to-many.
14. JK with J=K=1 toggles; T=1 toggles; D stores input.
15. Full Adder: Sum=A⊕B⊕Cin; Carry=AB+BCin+ACin.`]
]

const chapters=[
{id:'digital',title:'Digital Logic',topics:digitalTopics},
{id:'coa',title:'Computer Organization & Architecture',topics:[['Computer Basics','Computer system: input, processing, memory/storage and output. CPU executes instructions. ALU performs arithmetic/logic; Control Unit coordinates operations.'],['Registers','PC stores next instruction address; IR holds current instruction; accumulator stores intermediate results; flag register stores status.'],['Instruction Cycle','Fetch → Decode → Execute, with memory/I/O operations as required.'],['Memory Hierarchy','Registers → Cache → Main Memory → Secondary Storage, generally from faster/smaller to slower/larger.'],['Cache & Virtual Memory','Cache reduces average memory access time. Virtual memory provides a larger logical address space using methods such as paging.'],['I/O','Programmed I/O, interrupt-driven I/O and DMA are important I/O techniques.']]},
{id:'ds',title:'Data Structures',topics:[['Array','Contiguous indexed collection; direct access is typically O(1).'],['Linked List','Nodes contain data and links. Singly and doubly linked lists are common.'],['Stack','LIFO; push, pop and peek. Used in recursion and expression evaluation.'],['Queue','FIFO; enqueue and dequeue. Variants include circular queue, priority queue and deque.'],['Tree','Hierarchical structure. Binary tree has at most two children per node; BST maintains ordered keys.'],['Heap & Graph','Heap is a complete binary tree used for priority queues. Graph has vertices and edges.'],['Hashing','Hash function maps keys to positions; collisions use chaining or open addressing.']]},
{id:'algo',title:'Algorithms',topics:[['Complexity','Common growth rates: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).'],['Searching','Linear search works on unsorted data. Binary search requires sorted data and halves the search space.'],['Sorting','Bubble, selection, insertion, merge and quick sort are important. Merge sort is O(n log n); quicksort average O(n log n).'],['Recursion','Recursive solution needs a base case. Used in trees, divide-and-conquer and backtracking.'],['Greedy','Makes locally optimal choices and requires suitable problem properties.'],['Dynamic Programming','Stores overlapping-subproblem results using memoization or tabulation.']]},
{id:'programming',title:'Programming / C & C++',topics:[['C Basics','Variables, data types, operators, control statements, arrays, strings, functions, pointers and structures.'],['Pointers','Pointer stores an address. & obtains address; * dereferences.'],['Functions','Functions improve modularity. C commonly passes arguments by value; pointers can modify caller data.'],['Memory','Automatic storage commonly uses stack frames; dynamic allocation uses heap memory.'],['C++ OOP','Encapsulation, abstraction, inheritance and polymorphism are core OOP concepts.'],['STL','Important containers: vector, list, stack, queue, set and map.']]},
{id:'os',title:'Operating System',topics:[['OS Basics','Manages hardware and provides services to applications: process, memory, file, device and security management.'],['Process & Thread','Process is a program in execution; threads are execution units within a process.'],['Scheduling','FCFS, SJF, SRTF, Priority and Round Robin. Measures include waiting, turnaround and response time.'],['Deadlock','Four conditions: mutual exclusion, hold and wait, no preemption, circular wait.'],['Memory Management','Paging, segmentation and page replacement algorithms such as FIFO, LRU and Optimal.'],['File System','Manages files, directories, permissions, allocation and storage.']]},
{id:'dbms',title:'Database Management System',topics:[['DBMS Basics','Organized storage, retrieval, integrity, concurrency and security; relational databases use tables.'],['Keys','Super key, candidate key, primary key and foreign key are essential concepts.'],['SQL','DDL: CREATE/ALTER/DROP. DML: INSERT/UPDATE/DELETE. SELECT retrieves data; WHERE filters rows; GROUP BY groups; HAVING filters groups.'],['Normalization','1NF removes repeating groups; 2NF removes partial dependency; 3NF removes transitive dependency; BCNF requires determinants to be candidate keys.'],['Transactions','ACID = Atomicity, Consistency, Isolation, Durability.'],['ER Model','Entities, attributes, relationships and cardinalities such as 1:1, 1:N and M:N.']]},
{id:'net',title:'Computer Networks',topics:[['OSI Model','Physical, Data Link, Network, Transport, Session, Presentation, Application.'],['TCP/IP','Link, Internet, Transport and Application are common conceptual layers.'],['TCP vs UDP','TCP is connection-oriented and reliable; UDP is connectionless with lower overhead.'],['IP Addressing','IPv4 uses 32 bits; IPv6 uses 128 bits. Subnetting divides networks.'],['Devices','Hub broadcasts; switch forwards using MAC addresses; router forwards packets between networks.'],['Security','Firewalls filter traffic; HTTPS uses TLS to protect HTTP communication in transit.']]},
{id:'software',title:'Software Engineering',topics:[['SDLC','Requirements, planning, design, implementation, testing, deployment and maintenance.'],['Models','Waterfall is sequential; Agile uses short iterations and continuous feedback.'],['Requirements','Functional describes behavior; non-functional describes qualities such as security, performance and usability.'],['Testing','Unit, integration, system and acceptance testing.'],['Maintenance','Corrective, adaptive, perfective and preventive maintenance.']]},
{id:'web',title:'Web Technology',topics:[['HTML','Structures web content using headings, links, lists, forms, tables and semantic elements.'],['CSS','Controls presentation using selectors, box model, flexbox, grid and responsive media queries.'],['JavaScript','Dynamic language used for browser behavior; scope, closures, promises, async/await and DOM are important.'],['HTTP','GET, POST, PUT, PATCH, DELETE. 2xx success, 4xx client errors, 5xx server errors.'],['Frontend & Backend','Frontend mainly runs in browser; backend handles server logic, APIs and data access.']]},
{id:'toc',title:'Theory of Computation',topics:[['Languages & Automata','Alphabet is a finite set of symbols; string is a finite sequence; language is a set of strings.'],['DFA','Exactly one transition for each state-symbol pair and no epsilon transition.'],['NFA','May have multiple transitions and epsilon transitions. DFA and NFA recognize regular languages.'],['Regular Expressions','Describe regular languages; union, concatenation and Kleene star are key operations.'],['CFG','Context-free grammars describe context-free languages and are important in parsing.'],['Turing Machine','Abstract machine with an unbounded tape and read/write head.']]},
{id:'compiler',title:'Compiler Design',topics:[['Phases','Lexical analysis, syntax analysis, semantic analysis, intermediate code, optimization and target code generation.'],['Lexical Analysis','Converts character streams into tokens.'],['Parsing','Checks grammar. Top-down starts from start symbol; bottom-up builds toward it.'],['Semantic Analysis','Checks type compatibility, declarations and scope.'],['Optimization','Improves performance/resource use without changing program meaning.']]},
{id:'graphics',title:'Computer Graphics',topics:[['Basics','Raster graphics use pixels; vector graphics represent shapes mathematically.'],['Transformations','Translation, rotation and scaling are fundamental transformations.'],['Viewing','Window selects world-coordinate region; viewport is the display region.'],['Clipping','Removes portions outside a viewing region.']]},
{id:'ai',title:'Artificial Intelligence',topics:[['AI Basics','Systems performing reasoning, learning, perception, language and decision making.'],['Search','BFS and DFS are uninformed; A* is informed and combines path cost with a heuristic.'],['Knowledge Representation','Logic, semantic networks, frames, rules and ontologies.'],['Machine Learning','Supervised uses labeled data; unsupervised finds patterns; reinforcement learns from rewards.'],['Expert Systems','Knowledge base plus inference engine solves domain-specific problems.']]},
{id:'cyber',title:'Cyber Security',topics:[['CIA Triad','Confidentiality, Integrity and Availability.'],['Authentication','Verifies identity; authorization determines permissions.'],['Cryptography','Symmetric uses shared key; asymmetric uses public/private keys; hashing creates fixed-length digests.'],['Threats','Viruses, worms, trojans, ransomware and phishing are common threats.'],['Network Security','Secure protocols, access control, patching, least privilege, backups and monitoring reduce risk.']]},
{id:'discrete',title:'Discrete Mathematics',topics:[['Logic','Propositions have truth values. AND, OR, NOT, implication and biconditional are important.'],['Sets','Union, intersection, difference and complement.'],['Relations & Functions','Relation is a set of ordered pairs; function maps every domain input to exactly one output.'],['Graphs','Vertices and edges; degree, path, cycle, connectivity and trees.'],['Combinatorics','Permutation considers order; combination does not. nPr=n!/(n-r)! and nCr=n!/[r!(n-r)!].']]}
]

export default function Notes({onHome}){
 const [open,setOpen]=React.useState('digital'); const [topic,setTopic]=React.useState(0)
 const chapter=chapters.find(c=>c.id===open)||chapters[0]
 React.useEffect(()=>setTopic(0),[open])
 const current=chapter.topics[topic]
 return <div className="notes-page"><header className="notes-header"><button className="secondary-btn" onClick={onHome}><ArrowLeft size={16}/> Home</button><div><div className="notes-kicker">BPSC TRE · COMPUTER SCIENCE</div><h1><BookOpen size={28}/> Complete Notes</h1><p>Chapter-wise • Topic-wise • Exam-focused revision</p></div></header><main className="notes-layout"><aside className="notes-sidebar">{chapters.map((c,i)=><button key={c.id} className={open===c.id?'chapter-btn active':'chapter-btn'} onClick={()=>setOpen(c.id)}><span><b>{i+1}.</b> {c.title}</span>{open===c.id?<ChevronDown size={17}/>:<ChevronRight size={17}/>}</button>)}</aside><section className="notes-content"><div className="notes-title"><span>CHAPTER {chapters.findIndex(c=>c.id===chapter.id)+1} · {chapter.topics.length} TOPICS</span><h2>{chapter.title}</h2><div className="topic-tabs">{chapter.topics.map(([name],i)=><button key={name} className={topic===i?'topic-tab active':'topic-tab'} onClick={()=>setTopic(i)}>{i+1}. {name}</button>)}</div></div><article className="note-card"><div className="note-label">📖 COMPLETE CONCEPT</div><h3>{current[0]}</h3><p>{current[1]}</p></article><div className="revision-box"><strong>🎯 BPSC TRE EXAM TIP</strong><p>Definition + formula + difference + example + important fact ko revise karein. Is topic ke baad MCQs practice karna best rahega.</p></div><div className="notes-nav"><button className="secondary-btn" disabled={topic===0} onClick={()=>setTopic(topic-1)}>← Previous</button><span>{topic+1} / {chapter.topics.length}</span><button className="primary-btn" disabled={topic===chapter.topics.length-1} onClick={()=>setTopic(topic+1)}>Next Topic →</button></div></section></main></div>
}

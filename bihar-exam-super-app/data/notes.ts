export type NoteTopic = { title: string; points: string[] };
export type ChapterNote = { slug: string; title: string; description: string; topics: NoteTopic[]; revision: string[] };

export const chapterNotes: ChapterNote[] = [
  {
    slug: 'digital-logic', title: 'Digital Logic', description: 'Number systems, codes, complements, Boolean algebra, logic gates and K-map basics.',
    topics: [
      { title: '1. Number Systems', points: ['Decimal uses base 10, Binary base 2, Octal base 8 and Hexadecimal base 16.', 'Binary digits are 0 and 1. Octal digits are 0–7. Hexadecimal digits are 0–9 and A–F.', 'Binary to decimal: multiply each bit by the corresponding power of 2 and add.', 'Binary ↔ octal: group binary digits in sets of 3. Binary ↔ hexadecimal: group in sets of 4.', 'For a fractional binary number, use negative powers of 2 after the binary point.'] },
      { title: '2. Codes', points: ['BCD represents each decimal digit separately using 4 bits; for example, decimal 59 is 0101 1001.', 'ASCII is a character encoding standard commonly represented with 7-bit codes in its basic form.', 'EBCDIC is an 8-bit character encoding developed by IBM.', 'Gray code changes only one bit between adjacent values and is useful in position/rotary encoders.', 'Binary to Gray: keep the MSB; each next Gray bit is XOR of adjacent binary bits.'] },
      { title: '3. Signed Binary & Complements', points: ['Signed numbers can be represented using sign-magnitude, 1’s complement and 2’s complement.', '1’s complement is obtained by changing every 0 to 1 and every 1 to 0.', '2’s complement = 1’s complement + 1.', 'For n-bit 2’s complement, the range is −2^(n−1) to 2^(n−1)−1.', '2’s complement is widely used because subtraction can be performed using binary addition.'] },
      { title: '4. Binary Arithmetic', points: ['Binary addition: 0+0=0, 0+1=1, 1+0=1, 1+1=10.', 'Binary subtraction follows borrow rules; 0−1 requires borrowing from the next higher bit.', 'Multiplication and division use the same basic principles as decimal arithmetic but with bits 0 and 1.', 'Overflow can occur when the mathematical result cannot be represented in the available number of bits.'] },
      { title: '5. Boolean Algebra', points: ['Identity: A+0=A and A·1=A. Null: A+1=1 and A·0=0.', 'Idempotent: A+A=A and A·A=A. Complement: A+A̅=1 and A·A̅=0.', 'Involution: (A̅)̅=A. Absorption: A+AB=A and A(A+B)=A.', 'De Morgan: (A+B)̅=A̅B̅ and (AB)̅=A̅+B̅.', 'Boolean expressions can be simplified using algebraic laws or Karnaugh maps.'] },
      { title: '6. Logic Gates', points: ['AND gives 1 only when all inputs are 1. OR gives 1 when at least one input is 1.', 'NOT produces the complement of its input.', 'NAND = NOT(AND), while NOR = NOT(OR).', 'XOR gives 1 when inputs are different; XNOR gives 1 when inputs are equal.', 'NAND and NOR are universal gates: either can be used to construct basic gates.'] },
      { title: '7. SOP, POS & K-Map Basics', points: ['SOP means Sum of Products; POS means Product of Sums.', 'A minterm corresponds to a row where a Boolean function is 1; a maxterm corresponds to a row where it is 0.', 'K-map groups adjacent 1s for SOP simplification or adjacent 0s for POS simplification.', 'Valid K-map groups contain 1, 2, 4, 8, ... cells and wrapping around edges is allowed.', 'Make the largest possible groups to obtain a simpler expression.'] },
    ],
    revision: ['Remember bases: Binary 2, Octal 8, Decimal 10, Hexadecimal 16.', '2’s complement = invert bits + 1.', 'NAND and NOR are universal gates.', 'XOR = 1 for different inputs; XNOR = 1 for same inputs.', 'De Morgan: complement of OR becomes AND of complements; complement of AND becomes OR of complements.']
  },
  {
    slug: 'computer-fundamentals', title: 'Computer Fundamentals', description: 'Computer organization basics, memory, I/O, data representation and generations.',
    topics: [
      { title: '1. Computer Basics', points: ['A computer accepts input, processes data, stores information and produces output.', 'CPU consists mainly of ALU, Control Unit and registers.', 'ALU performs arithmetic and logical operations; the Control Unit coordinates execution.'] },
      { title: '2. Memory', points: ['RAM is volatile main memory; ROM is non-volatile memory.', 'Cache is high-speed memory placed close to the CPU and reduces average memory access time.', 'Primary memory is directly accessible by the CPU; secondary storage provides long-term storage.'] },
      { title: '3. I/O & Software', points: ['Keyboard, mouse and scanner are input devices; monitor and printer are output devices.', 'System software includes operating systems and utilities.', 'Application software performs user-oriented tasks such as word processing and spreadsheets.'] },
    ],
    revision: ['RAM is volatile; ROM is non-volatile.', 'CPU = ALU + Control Unit + Registers.', 'Cache is faster and smaller than main memory.']
  },
  {
    slug: 'operating-system', title: 'Operating System', description: 'Processes, scheduling, memory management, files and core OS concepts.',
    topics: [
      { title: '1. OS Basics', points: ['An operating system manages hardware resources and provides services to application programs.', 'Core responsibilities include process, memory, file and device management.'] },
      { title: '2. Process & Scheduling', points: ['A process is a program in execution.', 'Common CPU scheduling algorithms include FCFS, SJF, Priority and Round Robin.', 'Round Robin uses a fixed time quantum and is suitable for time-sharing systems.'] },
      { title: '3. Memory & Files', points: ['Virtual memory allows a system to use secondary storage to extend the apparent memory space.', 'Paging divides memory into fixed-size pages and frames.', 'File systems organize files and directories and manage storage allocation.'] },
    ],
    revision: ['Round Robin uses a time quantum.', 'A process is a program in execution.', 'Paging uses pages and frames.']
  },
  {
    slug: 'dbms', title: 'DBMS', description: 'Database fundamentals, keys, normalization, SQL and transactions.',
    topics: [
      { title: '1. Database Basics', points: ['A DBMS is software used to create, store, organize and retrieve data.', 'A relational database stores data in tables made of rows and columns.'] },
      { title: '2. Keys & Relationships', points: ['A primary key uniquely identifies each row and cannot contain duplicate values.', 'A foreign key references a key in another table and helps maintain referential integrity.', 'Relationships may be one-to-one, one-to-many or many-to-many.'] },
      { title: '3. Normalization & SQL', points: ['Normalization reduces redundancy and update anomalies.', '1NF requires atomic values; 2NF removes partial dependency; 3NF removes transitive dependency.', 'SQL is used to define, manipulate and query relational data.'] },
    ],
    revision: ['Primary key uniquely identifies a row.', 'Foreign key connects related tables.', 'Normalization reduces redundancy.']
  },
  {
    slug: 'computer-networks', title: 'Computer Networks', description: 'Network models, protocols, addressing and common networking concepts.',
    topics: [
      { title: '1. Network Basics', points: ['LAN covers a small area; MAN covers a metropolitan area; WAN covers a large geographic area.', 'A protocol is a set of rules used for communication between networked devices.'] },
      { title: '2. TCP/IP & OSI', points: ['The OSI model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation and Application.', 'TCP is connection-oriented and provides reliable, ordered delivery.', 'UDP is connectionless and has lower overhead but does not guarantee delivery.'] },
      { title: '3. Addressing', points: ['IP addresses identify interfaces on IP networks.', 'Routers forward packets between networks; switches primarily connect devices within a LAN.'] },
    ],
    revision: ['OSI has 7 layers.', 'TCP is reliable and connection-oriented.', 'Router connects different networks; switch connects devices in a LAN.']
  },
  {
    slug: 'data-structures', title: 'Data Structures', description: 'Arrays, linked lists, stacks, queues, trees and algorithmic basics.',
    topics: [
      { title: '1. Linear Structures', points: ['An array stores elements in contiguous memory and supports fast indexed access.', 'A linked list stores nodes connected through links and allows flexible insertion/deletion.', 'A stack follows LIFO: Last In, First Out.', 'A queue follows FIFO: First In, First Out.'] },
      { title: '2. Trees & Graphs', points: ['A tree is a hierarchical structure with nodes and edges and no cycles in a standard tree.', 'A binary tree has at most two children per node.', 'A graph consists of vertices and edges and can represent networks and relationships.'] },
      { title: '3. Complexity', points: ['Time complexity describes how running time grows with input size.', 'Big-O notation describes an asymptotic upper bound, such as O(1), O(log n), O(n) and O(n²).'] },
    ],
    revision: ['Stack = LIFO.', 'Queue = FIFO.', 'Array gives direct indexed access.', 'Big-O describes asymptotic growth.']
  }
];

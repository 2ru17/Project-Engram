---
id: Problem-Set-Cache-Memory-2
type: problem-set
course: CSARCH2
topic: Cache Memory Performance in Looping Constructs, Set Associativity, and Conflict Miss Analysis
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Subject Area:** [[Computer Architecture]], [[Memory Hierarchy]], [[Cache Organization]], [[Program Performance Optimization]]

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Cache Memory]] #[[Computer Architecture]] #[[Set Associative Mapping]] #[[Direct Mapping]] #[[Loop Optimization]] #[[Cache Thrashing]] #[[AMAT]] #[[LRU Replacement]]

---

# Problem Set: Cache Memory 2

## Architectural Foundations & Program Execution Analysis

### 1. Instruction Stream Locality & Block Fetch Dynamics
During sequential and iterative program execution, processor memory references exhibit intense [[Spatial Locality|spatial]] and [[Temporal Locality|temporal locality]]:
- **Spatial Locality in Block Transfers**: When an instruction fetch causes a cache miss, the memory controller fetches an entire block ($B$ words) into cache. The first word incurs the full miss latency ($t_{\text{miss}}$), while the subsequent $B - 1$ sequential words within that same block hit the cache ($t_{\text{hit}}$).
- **Temporal Locality in Looping Structures**: When a program executes a loop of size $L$ words, if the loop footprint fits within the cache without thrashing, only the first iteration incurs compulsory misses; all subsequent iterations achieve a $100\%$ hit rate.

```text
                  Memory Block (B words)
   ┌──────────┬──────────┬──────────┬──────────┬──────────┐
   │  Word 0  │  Word 1  │  Word 2  │   ...    │ Word B-1 │
   └────┬─────┴────┬─────┴────┬─────┴──────────┴────┬─────┘
        │          │          │                     │
      MISS        HIT        HIT                   HIT
   (Fetch MM)   (Cache)    (Cache)               (Cache)
```

---

### 2. Set Associativity & Working Set Thrashing
In a $K$-way set associative cache with $S$ sets:
$$\text{Set Index} = \text{Block Number} \pmod S$$
- **Working Set Capacity**: Each set can hold at most $K$ distinct blocks concurrently.
- **Set Thrashing (The Pigeonhole Effect)**: If a tight loop references $W$ distinct memory blocks that all map to the same set index, and $W > K$, then under [[Least Recently Used (LRU)|LRU replacement]], every block access will cyclically evict the block needed next, reducing the cache hit rate to near zero despite available space in other sets.

---

### 3. Timing Models & Performance Equations
- **Memory Access Time Without Cache**:
  $$T_{\text{no\_cache}} = N_{\text{fetches}} \times t_{\text{mem}}$$
- **Cache Timing Models**:
  - *Non-Load-Through / Sequential Architecture*:
    $$t_{\text{hit}} = t_{\text{cache}}, \quad t_{\text{miss}} = t_{\text{cache}} + t_{\text{mem}}$$
    $$T_{\text{total}} = (N_{\text{word hits}} \times t_{\text{cache}}) + (N_{\text{word misses}} \times (t_{\text{cache}} + t_{\text{mem}}))$$
    $$\text{AMAT} = \frac{T_{\text{total}}}{N_{\text{fetches}}} = t_{\text{cache}} + (1 - H_{\text{word}}) \cdot t_{\text{mem}}$$
  - *Load-Through / Simultaneous Architecture*:
    $$T_{\text{total}} = (N_{\text{word hits}} \times t_{\text{cache}}) + (N_{\text{word misses}} \times t_{\text{mem}})$$
    $$\text{AMAT} = H_{\text{word}} \cdot t_{\text{cache}} + (1 - H_{\text{word}}) \cdot t_{\text{mem}}$$
- **Effective Performance Speedup**:
  $$\text{Speedup} = \frac{T_{\text{no\_cache}}}{T_{\text{with\_cache}}}$$

---

## Problem 6: Set-Associative Execution Trace under Sequential Looping

### Problem Statement
A system has a main memory consisting of $1\text{ Mwords}$ ($2^{20}\text{ words}$). It possesses a $4\text{K-word}$ cache ($4096\text{ words}$) organized in a **block-set-associative** manner with $4\text{ blocks per set}$ ($K = 4$) and $64\text{ words per block}$ ($B = 64$).
- Cache access time: $t_{\text{cache}} = 1\text{ ns}$
- Memory access time: $t_{\text{mem}} = 10\text{ ns}$

```text
+--------------------------------------------------------------------+
| Main Memory: 1 Mwords = 2^20 words (20-bit address)                |
| Cache Capacity: 4 Kwords = 4096 words                              |
| Block Size (B): 64 words = 2^6 words/block                         |
| Associativity (K): 4 blocks/set (4-way Set Associative)            |
| Total Cache Blocks: 4096 / 64 = 64 blocks                          |
| Total Cache Sets (S): 64 / 4 = 16 sets (2^4 sets)                  |
| Timing: t_cache = 1 ns, t_mem = 10 ns                              |
+--------------------------------------------------------------------+
```

---

### Step-by-Step Solutions

#### a. Main Memory Address Format
- Total Main Memory Words: $2^{20}\text{ words} \implies \text{Address Bits } A = 20\text{ bits}$.
- $\text{WORD Offset Field } (w)$:
  $$w = \log_2(64\text{ words/block}) = \mathbf{6\text{ bits}}$$
- Total Cache Blocks:
  $$C = \frac{4096\text{ words}}{64\text{ words/block}} = 64\text{ blocks}$$
- Total Cache Sets:
  $$S = \frac{64\text{ blocks}}{4\text{ blocks/set}} = 16\text{ sets}$$
- $\text{SET Index Field } (d)$:
  $$d = \log_2(16\text{ sets}) = \mathbf{4\text{ bits}}$$
- $\text{TAG Field } (t)$:
  $$t = A - (d + w) = 20 - (4 + 6) = \mathbf{10\text{ bits}}$$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG Field} & \textbf{SET Index Field} & \textbf{WORD Offset Field} \\
\hline
\text{10 bits (Bits [19:10])} & \text{4 bits (Bits [9:6])} & \text{6 bits (Bits [5:0])} \\
\hline
\end{array}$$

---

#### b. Total Instruction Fetch Time with NO Cache Memory
- **Sequence Parameters**:
  - The processor fetches $4352\text{ words}$ from word addresses $0, 1, 2, \dots, 4351$ sequentially.
  - The sequence is repeated $9\text{ more times}$, giving a total of:
    $$\text{Total Iterations} = 1 + 9 = 10\text{ iterations}$$
- **Total Word Fetches**:
  $$N_{\text{total words}} = 4352\text{ words/iteration} \times 10\text{ iterations} = \mathbf{43,520\text{ word fetches}}$$
- **Execution Time Without Cache**:
  Since every word fetch must be serviced directly from main memory at $t_{\text{mem}} = 10\text{ ns}$:
  $$T_{\text{no\_cache}} = 43,520 \times 10\text{ ns} = \mathbf{435,200\text{ ns}} = \mathbf{435.20\ \mu\text{s}}$$

---

#### c. Cache Memory Performance with LRU Replacement

##### 1. Working Set & Block Distribution Analysis
- Total memory blocks spanned per iteration:
  $$N_{\text{blocks/iteration}} = \frac{4352\text{ words}}{64\text{ words/block}} = 68\text{ blocks} \quad (\text{Blocks } 0 \text{ through } 67)$$
- Mapping function: $\text{Set Index} = \text{Block Number} \pmod{16}$.
- Distribution of the 68 blocks across the 16 cache sets:
  $$68 = (4 \times 16) + 4$$
  - **Sets 0, 1, 2, and 3** receive **5 blocks** each:
    - Set 0: Blocks $\{0, 16, 32, 48, 64\}$
    - Set 1: Blocks $\{1, 17, 33, 49, 65\}$
    - Set 2: Blocks $\{2, 18, 34, 50, 66\}$
    - Set 3: Blocks $\{3, 19, 35, 51, 67\}$
  - **Sets 4 through 15** ($12\text{ sets}$) receive **4 blocks** each:
    - Set 4: Blocks $\{4, 20, 36, 52\}$
    - Set 5: Blocks $\{5, 21, 37, 53\}$
    - $\dots$
    - Set 15: Blocks $\{15, 31, 47, 63\}$

---

##### 2. Iteration-by-Iteration Cache Behavior

###### A. Sets 4 through 15 (12 Sets $\times$ 4 Blocks = 48 Blocks)
- Since each set capacity is $K = 4\text{ blocks}$, all 4 blocks fit simultaneously in the set without eviction.
- **Iteration 1**:
  - The 1st word of each block incurs a compulsory miss: $48\text{ block misses}$ ($48\text{ word misses}$).
  - The remaining $63\text{ words}$ in each block hit: $48 \times 63 = 3,024\text{ word hits}$.
- **Iterations 2 through 10** ($9\text{ iterations}$):
  - All 48 blocks remain resident in cache.
  - Block misses: $\mathbf{0}$
  - Block hits: $48 \times 9 = \mathbf{432\text{ block hits}}$
  - Word hits: $48 \times 64\text{ words} \times 9 = \mathbf{27,648\text{ word hits}}$

###### B. Sets 0 through 3 (4 Sets $\times$ 5 Blocks = 20 Blocks)
- In each set, 5 blocks compete for 4 slots under LRU replacement:
  - Sequence in Set 0: Block 0 $\rightarrow$ Block 16 $\rightarrow$ Block 32 $\rightarrow$ Block 48 $\rightarrow$ Block 64.
  - Accessing Block 64 evicts the LRU block (Block 0).
  - In the subsequent iteration, when Block 0 is accessed, it misses and evicts Block 16.
  - When Block 16 is accessed, it misses and evicts Block 32, creating a **cyclical thrashing loop**.
- **Every Iteration (Iterations 1 through 10)**:
  - All 5 blocks in each of the 4 sets suffer a block miss on their first word access.
  - Block misses per iteration: $4\text{ sets} \times 5\text{ blocks} = 20\text{ block misses}$.
  - Block hits per iteration: $\mathbf{0\text{ block hits}}$.
  - Word fetches per iteration: $20\text{ word misses}$ (first word of each block) and $20 \times 63 = 1,260\text{ word hits}$.
- **Total across all 10 Iterations for Sets 0..3**:
  - Total block misses: $20 \times 10 = \mathbf{200\text{ block misses}}$
  - Total block hits: $\mathbf{0\text{ block hits}}$
  - Total word misses: $200\text{ word misses}$
  - Total word hits: $1,260 \times 10 = \mathbf{12,600\text{ word hits}}$

---

##### 3. Aggregate Performance Metrics (across all 10 iterations)

###### Block-Level Access Metrics:
- **Total Block Accesses**:
  $$N_{\text{block accesses}} = 68\text{ blocks/iteration} \times 10\text{ iterations} = \mathbf{680\text{ block accesses}}$$
- **Total Block Misses**:
  $$N_{\text{block misses}} = \text{Iter 1 (Sets 4..15)} + \text{All Iters (Sets 0..3)} = 48 + 200 = \mathbf{248\text{ block misses}}$$
- **Total Block Hits**:
  $$N_{\text{block hits}} = \text{Iters 2..10 (Sets 4..15)} = 48 \times 9 = \mathbf{432\text{ block hits}}$$
- **Block Hit Ratio**:
  $$H_{\text{block}} = \frac{432}{680} = \mathbf{63.53\%}$$
- **Block Miss Ratio**:
  $$M_{\text{block}} = \frac{248}{680} = \mathbf{36.47\%}$$

###### Word-Level Instruction Fetch Metrics:
- **Total Word Fetches**: $43,520\text{ words}$
- **Total Word Misses**: $\mathbf{248\text{ word misses}}$
- **Total Word Hits**: $43,520 - 248 = \mathbf{43,272\text{ word hits}}$
- **Word Hit Ratio**:
  $$H_{\text{word}} = \frac{43,272}{43,520} = \mathbf{99.4301\%}$$
- **Word Miss Ratio**:
  $$M_{\text{word}} = \frac{248}{43,520} = \mathbf{0.5699\%}$$

###### Total Execution Time & Average Memory Access Time:
Under the **non-load-through policy** ($t_{\text{hit}} = 1\text{ ns}, t_{\text{miss}} = 1 + 10 = 11\text{ ns}$):
$$T_{\text{total}} = (43,272 \times 1\text{ ns}) + (248 \times 11\text{ ns}) = 43,272 + 2,728 = \mathbf{46,000\text{ ns}} = \mathbf{46.00\ \mu\text{s}}$$
$$\text{AMAT} = \frac{46,000\text{ ns}}{43,520} \approx \mathbf{1.0570\text{ ns}}$$

*(Under load-through policy: $T_{\text{total}} = 43,272 \times 1 + 248 \times 10 = 45,752\text{ ns} \implies \text{AMAT} \approx 1.0513\text{ ns}$)*

###### Performance Comparison:
$$\text{Speedup over No Cache} = \frac{435,200\text{ ns}}{46,000\text{ ns}} \approx \mathbf{9.46\times \text{ faster}}$$

---

## Problem 7: Direct-Mapped Cache with Nested Looping Architecture

### Problem Statement
A program consists of two nested loops executed on a computer with a **direct-mapped cache**.
- Main Memory Size: $64\text{ Kwords} = 2^{16}\text{ words}$
- Cache Size: $1\text{ Kwords} = 1024\text{ words}$
- Block Size: $128\text{ words} = 2^7\text{ words}$
- Memory Access Time: $t_{\text{mem}} = 10\text{ ns}$
- Cache Access Time: $t_{\text{cache}} = 1\text{ ns}$
- Addresses are in decimal word addresses.

```text
                  Program Flow Graph & Address Bounds
                  ───────────────────────────────────
                  
                               0 ──┐
                                   │ Straight-line Prologue (1x)
                             127 ──┘
                             128 ──┐
                                   │ 
                             255 ──┘
                             256 ──┐ 
                                   │ │ Inner Loop
                                   │ │ (20x per outer)
                             511 ──┘ 
                             512 ──┐ 
                                   │ │ Outer Loop (10x)
                                   │ │
                            1279 ──┘ 
                            1280 ──┐
                                   │ Straight-line Epilogue (1x)
                            1535 ──┘
```

---

### Step-by-Step Solutions

#### a. Main Memory Address Field Partitioning
- Main Memory Words: $64\text{ Kwords} = 2^{16}\text{ words} \implies \text{Address Bits } A = 16\text{ bits}$.
- $\text{WORD Offset Field } (w)$:
  $$w = \log_2(128\text{ words/block}) = \mathbf{7\text{ bits}}$$
- Total Cache Blocks:
  $$C = \frac{1024\text{ words}}{128\text{ words/block}} = 8\text{ blocks} \quad (\text{Lines } 0 \text{ through } 7)$$
- $\text{BLOCK Index Field } (s)$:
  $$s = \log_2(8\text{ cache blocks}) = \mathbf{3\text{ bits}}$$
- $\text{TAG Field } (t)$:
  $$t = A - (s + w) = 16 - (3 + 7) = \mathbf{6\text{ bits}}$$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG Field} & \textbf{BLOCK Index Field} & \textbf{WORD Offset Field} \\
\hline
\text{6 bits (Bits [15:10])} & \text{3 bits (Bits [9:7])} & \text{7 bits (Bits [6:0])} \\
\hline
\end{array}$$

---

#### Memory Block Mapping Table
Each block contains 128 words ($\text{MM Block Number } B = \lfloor \text{Address} / 128 \rfloor$):

| Address Range | Block Number ($B$) | Direct Cache Line ($B \pmod 8$) | Code Section Description |
| :---: | :---: | :---: | :--- |
| $0 - 127$ | **Block 0** | **Line 0** | Straight-line Prologue ($1\times$) |
| $128 - 255$ | **Block 1** | **Line 1** | Outer Loop Header ($10\times$) |
| $256 - 383$ | **Block 2** | **Line 2** | Inner Loop Body ($20\times$ per outer) |
| $384 - 511$ | **Block 3** | **Line 3** | Inner Loop Body ($20\times$ per outer) |
| $512 - 639$ | **Block 4** | **Line 4** | Outer Loop Body ($10\times$) |
| $640 - 767$ | **Block 5** | **Line 5** | Outer Loop Body ($10\times$) |
| $768 - 895$ | **Block 6** | **Line 6** | Outer Loop Body ($10\times$) |
| $896 - 1023$ | **Block 7** | **Line 7** | Outer Loop Body ($10\times$) |
| $1024 - 1151$ | **Block 8** | **Line 0** | Outer Loop Body ($10\times$, maps to Line 0) |
| $1152 - 1279$ | **Block 9** | **Line 1** | Outer Loop Body ($10\times$, maps to Line 1) |
| $1280 - 1407$ | **Block 10** | **Line 2** | Straight-line Epilogue ($1\times$, maps to Line 2) |
| $1408 - 1535$ | **Block 11** | **Line 3** | Straight-line Epilogue ($1\times$, maps to Line 3) |

---

#### b. Execution Trace & Performance Calculations

##### 1. Phase-by-Phase Execution Analysis

###### Phase 1: Straight-Line Prologue ($0 - 127$)
- Access Block 0 (Line 0): Line 0 is empty $\implies$ **1 Block Miss**, **0 Block Hits**.
- Line 0 loaded with Block 0.

###### Phase 2: Outer Loop Iteration 1
1. **Access Block 1** (Line 1): Empty $\implies$ **Miss** (Line 1 = Block 1).
2. **Inner Loop (20 iterations of Blocks 2 and 3)**:
   - *Inner Iteration 1*:
     - Block 2 (Line 2): Empty $\implies$ **Miss** (Line 2 = Block 2).
     - Block 3 (Line 3): Empty $\implies$ **Miss** (Line 3 = Block 3).
   - *Inner Iterations 2 through 20 (19 iterations)*:
     - Block 2: Present in Line 2 $\implies$ **19 Hits**.
     - Block 3: Present in Line 3 $\implies$ **19 Hits**.
3. **Outer Loop Remaining Blocks ($512 - 1279$)**:
   - Block 4 (Line 4): Empty $\implies$ **Miss** (Line 4 = Block 4).
   - Block 5 (Line 5): Empty $\implies$ **Miss** (Line 5 = Block 5).
   - Block 6 (Line 6): Empty $\implies$ **Miss** (Line 6 = Block 6).
   - Block 7 (Line 7): Empty $\implies$ **Miss** (Line 7 = Block 7).
   - Block 8 (Line 0): Line 0 contains Block 0 $\implies$ **Miss (Conflict)** (Line 0 = Block 8).
   - Block 9 (Line 1): Line 1 contains Block 1 $\implies$ **Miss (Conflict)** (Line 1 = Block 9).
- **Iteration 1 Subtotal**:
  - Block Misses: $1\text{ (Blk 1)} + 2\text{ (Blks 2,3)} + 4\text{ (Blks 4..7)} + 2\text{ (Blks 8,9)} = \mathbf{9\text{ block misses}}$
  - Block Hits: $19 + 19 = \mathbf{38\text{ block hits}}$
  - Total Block Accesses in Iter 1: $1 + (20 \times 2) + 6 = \mathbf{47\text{ block accesses}}$

*Cache State at End of Outer Iteration 1*:
$$\begin{array}{|c|c|c|c|c|c|c|c|}
\hline
\textbf{Line 0} & \textbf{Line 1} & \textbf{Line 2} & \textbf{Line 3} & \textbf{Line 4} & \textbf{Line 5} & \textbf{Line 6} & \textbf{Line 7} \\
\hline
\text{Block 8} & \text{Block 9} & \text{Block 2} & \text{Block 3} & \text{Block 4} & \text{Block 5} & \text{Block 6} & \text{Block 7} \\
\hline
\end{array}$$

---

###### Phase 3: Outer Loop Iterations 2 through 10 (9 Iterations)
In each of the remaining 9 iterations:
1. **Access Block 1** (Line 1): Line 1 currently contains Block 9 $\implies$ **Miss (Conflict)**. Line 1 is overwritten with Block 1.
2. **Inner Loop (20 iterations of Blocks 2 and 3)**:
   - Blocks 2 and 3 are resident in Lines 2 and 3 and were never overwritten!
   - All 20 accesses to Block 2 $\implies$ **20 Hits**.
   - All 20 accesses to Block 3 $\implies$ **20 Hits**.
3. **Outer Loop Remaining Blocks**:
   - Block 4 (Line 4): Resident $\implies$ **1 Hit**.
   - Block 5 (Line 5): Resident $\implies$ **1 Hit**.
   - Block 6 (Line 6): Resident $\implies$ **1 Hit**.
   - Block 7 (Line 7): Resident $\implies$ **1 Hit**.
   - Block 8 (Line 0): Resident (Line 0 holds Block 8) $\implies$ **1 Hit**.
   - Block 9 (Line 1): Line 1 contains Block 1 $\implies$ **Miss (Conflict)**. Line 1 is overwritten with Block 9.
- **Per-Iteration Subtotal (Iter 2..10)**:
  - Block Misses per iteration: $\mathbf{2\text{ misses}}$ (Block 1 and Block 9)
  - Block Hits per iteration: $20 + 20 + 1 + 1 + 1 + 1 + 1 = \mathbf{45\text{ hits}}$
- **Subtotal across Iterations 2 through 10 (9 iterations)**:
  - Block Misses: $9 \times 2 = \mathbf{18\text{ block misses}}$
  - Block Hits: $9 \times 45 = \mathbf{405\text{ block hits}}$
  - Block Accesses: $9 \times 47 = \mathbf{423\text{ block accesses}}$

---

###### Phase 4: Straight-Line Epilogue ($1280 - 1535$)
- Access Block 10 (Line 2): Line 2 contains Block 2 $\implies$ **Miss (Conflict)** (Line 2 = Block 10).
- Access Block 11 (Line 3): Line 3 contains Block 3 $\implies$ **Miss (Conflict)** (Line 3 = Block 11).
- Epilogue Subtotal: **2 Block Misses**, **0 Block Hits**.

---

##### 2. Grand Totals & Performance Metrics

###### A. Block-Level Statistics
- **Total Block Accesses**:
  $$N_{\text{block accesses}} = 1\text{ (prologue)} + 47\text{ (iter 1)} + 423\text{ (iters 2..10)} + 2\text{ (epilogue)} = \mathbf{473\text{ block accesses}}$$
- **Total Block Misses**:
  $$N_{\text{block misses}} = 1 + 9 + 18 + 2 = \mathbf{30\text{ block misses}}$$
- **Total Block Hits**:
  $$N_{\text{block hits}} = 0 + 38 + 405 + 0 = \mathbf{443\text{ block hits}}$$
- **Block Hit Rate**:
  $$H_{\text{block}} = \frac{443}{473} \approx \mathbf{93.6575\%}$$
- **Block Miss Rate**:
  $$M_{\text{block}} = \frac{30}{473} \approx \mathbf{6.3425\%}$$

---

###### B. Word-Level Statistics
- **Total Word Fetches**:
  $$N_{\text{words}} = 473\text{ block accesses} \times 128\text{ words/block} = \mathbf{60,544\text{ words}}$$
- **Total Word Misses**:
  Each block miss results in exactly 1 word miss (the first word requested, which triggers the 128-word block refill):
  $$N_{\text{word misses}} = \mathbf{30\text{ word misses}}$$
- **Total Word Hits**:
  $$N_{\text{word hits}} = 60,544 - 30 = \mathbf{60,514\text{ word hits}}$$
  *(Composed of $443 \times 128 = 56,704\text{ hits}$ from block hits + $30 \times 127 = 3,810\text{ hits}$ from spatial locality within missed blocks)*
- **Word Hit Rate**:
  $$H_{\text{word}} = \frac{60,514}{60,544} \approx \mathbf{99.9504\%}$$
- **Word Miss Rate**:
  $$M_{\text{word}} = \frac{30}{60,544} \approx \mathbf{0.0496\%}$$

---

###### C. Total Execution Time & Average Memory Access Time
Under the **non-load-through policy** ($t_{\text{cache}} = 1\text{ ns}, t_{\text{mem}} = 10\text{ ns} \implies t_{\text{miss}} = 11\text{ ns}$):
$$T_{\text{total}} = (60,514 \times 1\text{ ns}) + (30 \times 11\text{ ns}) = 60,514 + 330 = \mathbf{60,844\text{ ns}} = \mathbf{60.844\ \mu\text{s}}$$
$$\text{AMAT} = \frac{60,844\text{ ns}}{60,544} \approx \mathbf{1.004955\text{ ns}} \approx \mathbf{1.0050\text{ ns}}$$

*(Under load-through policy: $T_{\text{total}} = 60,514 \times 1 + 30 \times 10 = 60,814\text{ ns} \implies \text{AMAT} \approx 1.0045\text{ ns}$)*

---

### Master Execution Summary Table for Problem 7

| Program Phase | Iterations | Block Accesses | Block Misses | Block Hits | Word Misses | Word Hits | Phase Time (ns) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Prologue (0–127)** | 1 | 1 | 1 | 0 | 1 | 127 | 138 |
| **Outer Loop Iter 1** | 1 | 47 | 9 | 38 | 9 | 6,007 | 6,106 |
| **Outer Loop Iters 2–10** | 9 | 423 | 18 | 405 | 18 | 54,126 | 54,324 |
| **Epilogue (1280–1535)**| 1 | 2 | 2 | 0 | 2 | 254 | 276 |
| **Grand Total** | — | **473** | **30** | **443** | **30** | **60,514** | **60,844** |

---

## Key Architectural Insights & Performance Analysis

1. **The Role of Spatial Locality in Loop Structures**:
   - Even when block hit rates are around $93.66\%$, the word hit rate exceeds **$99.95\%$** because a single 128-word block fetch provides 127 consecutive cache hits.
   - Increasing block size amortizes miss penalties across larger sequential instruction runs.

2. **Conflict Miss Dynamics**:
   - In Problem 7, the outer loop references 9 distinct blocks (Blocks 1 through 9) on an 8-line direct-mapped cache.
   - The conflict occurs strictly between **Block 1 and Block 9**, both mapping to **Line 1**.
   - If the cache were 2-way set associative with the same capacity (4 sets of 2 lines), Blocks 1 and 9 would coexist in Set 1 without eviction, eliminating all 18 conflict misses in iterations 2 through 10.

3. **Compiler and Software Optimization Strategies**:
   - **Loop Alignment**: Aligning loop entry points to cache line boundaries prevents loops from straddling unnecessary line boundaries.
   - **Code Reordering / Loop Splitting**: Restructuring code so that concurrent working sets do not alias to the same cache sets eliminates thrashing.


## References & Navigation

- **Related Notes:** [[Cache Memory]]

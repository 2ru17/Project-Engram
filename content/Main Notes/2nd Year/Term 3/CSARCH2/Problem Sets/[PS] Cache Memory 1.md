---
id: Problem-Set-Cache-Memory-1
type: problem-set
course: CSARCH2
topic: Cache Memory Organization, Mapping Functions, and Replacement Policies
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Subject Area:** [[Computer Architecture]], [[Memory Hierarchy]], [[Cache Organization]]

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Cache Memory]] #[[Computer Architecture]] #[[Direct Mapping]] #[[Fully Associative Mapping]] #[[Set Associative Mapping]] #[[LRU Replacement]] #[[MRU Replacement]] #[[AMAT]]

---

# Problem Set: Cache Memory 1

## 📚 Architectural Foundations & Formula Reference

### 1. Memory Hierarchy & Locality Principles
Cache memory serves as a high-speed buffer positioned between the processor core and main memory ($\text{DRAM}$). Its effectiveness relies upon two fundamental properties of program execution:
- **Temporal Locality**: If a memory location is referenced, it is highly likely to be referenced again in the near future (e.g., loop variables, subroutine instructions).
- **Spatial Locality**: If a memory location is referenced, nearby memory locations are likely to be referenced soon (e.g., sequential instruction execution, array traversals).

```text
   ┌─────────────────────────────────────────────────────────────┐
   │                        Processor Core                       │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ (Address Bus)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                         Cache Memory                        │
   │  ┌───────────────┬─────────────────────────┬─────────────┐  │
   │  │ Valid Bit (V) │ Tag Directory (TAG)     │ Data Block  │  │
   │  └───────────────┴─────────────────────────┴─────────────┘  │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ (Cache Miss Refill)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                         Main Memory                         │
   └─────────────────────────────────────────────────────────────┘
```

---

### 2. Address Bit-Field Partitioning Derivations
For a memory system with word-addressable or byte-addressable main memory:
- Let $M$ be the total number of addressable units (words or bytes) in main memory $\implies \text{Address Bits } A = \log_2(M)$.
- Let $B$ be the block size (in addressable units) $\implies \text{Offset Bits } w = \log_2(B)$.
- Let $C$ be the total number of lines/blocks in the cache.

#### A. Direct Mapping
Every main memory block maps to exactly one cache line:
$$\text{Line Index} = \text{MM Block Number} \pmod C$$
$$\text{Address Format: } [\ \text{TAG } (t) \mid \text{BLOCK INDEX } (s) \mid \text{WORD/BYTE OFFSET } (w)\ ]$$
Where:
- $\text{Offset Bits } w = \log_2(B)$
- $\text{Block/Line Bits } s = \log_2(C)$
- $\text{Tag Bits } t = A - (s + w) = \log_2\left(\frac{\text{Total MM Blocks}}{C}\right)$

#### B. Fully Associative Mapping
A main memory block can be placed in any available cache line:
$$\text{Address Format: } [\ \text{TAG } (t) \mid \text{WORD/BYTE OFFSET } (w)\ ]$$
Where:
- $\text{Offset Bits } w = \log_2(B)$
- $\text{Tag Bits } t = A - w = \log_2(\text{Total MM Blocks})$

#### C. $K$-Way Set Associative Mapping
Cache lines are grouped into $S$ sets, where each set contains $K$ lines ($C = S \times K$):
$$\text{Set Index} = \text{MM Block Number} \pmod S$$
$$\text{Address Format: } [\ \text{TAG } (t) \mid \text{SET INDEX } (d) \mid \text{WORD/BYTE OFFSET } (w)\ ]$$
Where:
- $\text{Offset Bits } w = \log_2(B)$
- $\text{Set Bits } d = \log_2(S) = \log_2\left(\frac{C}{K}\right)$
- $\text{Tag Bits } t = A - (d + w) = \log_2\left(\frac{\text{Total MM Blocks}}{S}\right)$

---

### 3. Cache Storage Overhead Derivations
Total physical storage required for an SRAM cache implementation comprises data payload, tag directory, and status flags:
$$\text{Total Bits per Line} = \text{Data Bits} + \text{Tag Bits} + \text{Valid Bit} + \text{Dirty Bit (if Write-Back)}$$
$$\text{Total Cache Storage (Bits)} = C \times \left( B \times \text{Bits per Unit} + t + 1 \right)$$

---

### 4. Memory Performance & Timing Models
- **Hit Ratio ($H$)**: Fraction of memory accesses satisfied by the cache:
  $$H = \frac{N_{\text{hits}}}{N_{\text{total accesses}}}$$
- **Miss Ratio ($M$)**: Fraction of accesses resulting in cache misses:
  $$M = 1 - H = \frac{N_{\text{misses}}}{N_{\text{total accesses}}}$$
- **Average Memory Access Time ([[Average Memory Access Time (AMAT)|AMAT]])**:
  - *Non-Load-Through / Sequential Access* (Cache is checked first; upon miss, main memory is accessed):
    $$t_{\text{miss}} = t_{\text{cache}} + t_{\text{mem}}$$
    $$\text{AMAT} = H \cdot t_{\text{cache}} + (1-H) \cdot (t_{\text{cache}} + t_{\text{mem}}) = t_{\text{cache}} + (1-H) \cdot t_{\text{mem}}$$
  - *Load-Through / Simultaneous Access* (Main memory delivers word directly to CPU in parallel):
    $$\text{AMAT} = H \cdot t_{\text{cache}} + (1-H) \cdot t_{\text{mem}}$$

---

## 📝 Problem 0a: Sizing & Address Format Analysis

### Problem Statement
A cache contains $4\text{ blocks}$. Main memory contains $16\text{ blocks}$. Each block contains $2\text{ words}$. Each word is $16\text{ bits}$. Assume a word-addressable memory architecture.

```text
+--------------------------------------------------------------------+
| Cache Capacity: 4 blocks                                           |
| Main Memory Capacity: 16 blocks                                    |
| Block Size (B): 2 words (32 bits per block)                        |
| Word Width: 16 bits                                                |
+--------------------------------------------------------------------+
```

---

### Detailed Derivations & Solutions

#### a. Main Memory Address Width
- Total words in main memory:
  $$N_{\text{words}} = 16\text{ blocks} \times 2\text{ words/block} = 32\text{ words}$$
- Total address bits:
  $$A = \log_2(32) = 5\text{ bits}$$

*(Note: If byte-addressing with 2 bytes/word were specified, total bytes = 64, requiring $A = 6\text{ bits}$ with 1 byte-offset bit. In standard word-addressing, $A = 5\text{ bits}$.)*

---

#### b. Direct Mapping Field Partitioning
- $\text{WORD Offset Field } (w) = \log_2(2\text{ words/block}) = 1\text{ bit}$
- $\text{BLOCK Index Field } (s) = \log_2(4\text{ cache blocks}) = 2\text{ bits}$
- $\text{TAG Field } (t) = 5 - (2 + 1) = 2\text{ bits}$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG (2 bits)} & \textbf{BLOCK (2 bits)} & \textbf{WORD (1 bit)} \\
\hline
\text{Bits [4:3]} & \text{Bits [2:1]} & \text{Bit [0]} \\
\hline
\end{array}$$

---

#### c. Fully Associative Mapping Field Partitioning
- $\text{WORD Offset Field } (w) = \log_2(2\text{ words/block}) = 1\text{ bit}$
- $\text{TAG Field } (t) = 5 - 1 = 4\text{ bits}$

$$\begin{array}{|c|c|}
\hline
\textbf{TAG (4 bits)} & \textbf{WORD (1 bit)} \\
\hline
\text{Bits [4:1]} & \text{Bit [0]} \\
\hline
\end{array}$$

---

#### d. Block Set Associative Mapping Field Partitioning (2 blocks/set)
- Number of Sets:
  $$S = \frac{4\text{ cache blocks}}{2\text{ blocks/set}} = 2\text{ sets}$$
- $\text{WORD Offset Field } (w) = \log_2(2) = 1\text{ bit}$
- $\text{SET Index Field } (d) = \log_2(2\text{ sets}) = 1\text{ bit}$
- $\text{TAG Field } (t) = 5 - (1 + 1) = 3\text{ bits}$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG (3 bits)} & \textbf{SET (1 bit)} & \textbf{WORD (1 bit)} \\
\hline
\text{Bits [4:2]} & \text{Bit [1]} & \text{Bit [0]} \\
\hline
\end{array}$$

---

#### e. Cache Memory Size (Direct-Mapped)
- **Data Capacity**:
  $$\text{Data Bits} = 4\text{ blocks} \times 2\text{ words/block} \times 16\text{ bits/word} = 128\text{ bits}$$
- **Total Physical Cache Size (with 1 Valid Bit + 2 Tag Bits per line)**:
  $$\text{Size} = 4 \times (32\text{ data} + 2\text{ tag} + 1\text{ valid}) = 4 \times 35 = 140\text{ bits}$$
  *(Data-only: $128\text{ bits}$; Without valid bit: $4 \times 34 = 136\text{ bits}$)*

---

#### f. Cache Memory Size (Fully Associative)
- **Data Capacity**: $128\text{ bits}$
- **Total Physical Cache Size (with 1 Valid Bit + 4 Tag Bits per line)**:
  $$\text{Size} = 4 \times (32\text{ data} + 4\text{ tag} + 1\text{ valid}) = 4 \times 37 = 148\text{ bits}$$
  *(Data-only: $128\text{ bits}$; Without valid bit: $4 \times 36 = 144\text{ bits}$)*

---

#### g. Cache Memory Size (2-Way Set Associative)
- **Data Capacity**: $128\text{ bits}$
- **Total Physical Cache Size (with 1 Valid Bit + 3 Tag Bits per line)**:
  $$\text{Size} = 4 \times (32\text{ data} + 3\text{ tag} + 1\text{ valid}) = 4 \times 36 = 144\text{ bits}$$
  *(Data-only: $128\text{ bits}$; Without valid bit: $4 \times 35 = 140\text{ bits}$)*

---

#### h. Main Memory Size
$$\text{MM Size} = 16\text{ blocks} \times 2\text{ words/block} \times 16\text{ bits/word} = 32\text{ words} \times 16\text{ bits} = 512\text{ bits} \quad (64\text{ bytes})$$

---

#### i. Mapping of Memory Block 9 (Direct Mapping)
$$\text{Cache Block} = \text{MM Block} \pmod{\text{Total Cache Blocks}} = 9 \pmod 4 = 1$$
$$\mathbf{\text{Memory Block 9 maps to Cache Block 1}}$$

---

#### j. Mapping of Memory Address 9 (Direct Mapping)
- Memory Address $9_{10} = 01001_2$
- Main Memory Block Number:
  $$\text{MM Block} = \left\lfloor \frac{\text{Address}}{\text{Block Size}} \right\rfloor = \left\lfloor \frac{9}{2} \right\rfloor = 4$$
- Target Cache Block:
  $$\text{Cache Block} = 4 \pmod 4 = 0$$
- Binary Verification:
  - $\text{TAG} = 01_2 = 1$
  - $\text{BLOCK} = 00_2 = 0$
  - $\text{WORD} = 1_2 = 1$
$$\mathbf{\text{Memory Address 9 maps to Cache Block 0}}$$

---

#### k. Mapping of Memory Block 9 (Set Associative, 2 sets)
$$\text{Cache Set} = \text{MM Block} \pmod{\text{Total Sets}} = 9 \pmod 2 = 1$$
$$\mathbf{\text{Memory Block 9 maps to Cache Set 1}}$$

---

#### l. Mapping of Memory Address 9 (Set Associative, 2 sets)
- Memory Address $9_{10} = 01001_2 \implies \text{MM Block} = \lfloor 9/2 \rfloor = 4$
- Target Cache Set:
  $$\text{Cache Set} = 4 \pmod 2 = 0$$
- Binary Verification:
  - $\text{TAG} = 010_2 = 2$
  - $\text{SET} = 0_2 = 0$
  - $\text{WORD} = 1_2 = 1$
$$\mathbf{\text{Memory Address 9 maps to Cache Set 0}}$$

---

## 📝 Problem 0b: Access Traces & Replacement Algorithms

### Problem Statement
Using the cache parameters from Problem 0a ($4\text{ cache blocks}$, $16\text{ MM blocks}$, $2\text{ words/block}$, $16\text{ bits/word}$, $t_{\text{cache}} = 1\text{ ns}$, $t_{\text{mem}} = 10\text{ ns}$), evaluate the following main memory block reference sequence:
$$\text{Sequence: } 1, 7, 5, 0, 2, 1, 3, 6, 1, 3, 4, 7, 9 \quad (N = 13\text{ accesses})$$

Assuming a **non-load-through read policy**:
- Hit Penalty: $t_{\text{hit}} = t_{\text{cache}} = 1\text{ ns}$
- Miss Penalty: $t_{\text{miss}} = t_{\text{cache}} + t_{\text{mem}} = 1\text{ ns} + 10\text{ ns} = 11\text{ ns}$

---

### Step-by-Step Access Traces

#### 1. Direct-Mapped Cache Trace ($n, o$)
Line mapping rule: $\text{Line} = \text{Block} \pmod 4$.

| Step | Block Ref | Target Line | Initial Line Content | Hit/Miss | Evicted Block | Cache State $[L_0, L_1, L_2, L_3]$ | Access Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **1** | Line 1 | Empty | **MISS** | None | $[-, 1, -, -]$ | $11\text{ ns}$ |
| 2 | **7** | Line 3 | Empty | **MISS** | None | $[-, 1, -, 7]$ | $11\text{ ns}$ |
| 3 | **5** | Line 1 | 1 | **MISS** | 1 | $[-, 5, -, 7]$ | $11\text{ ns}$ |
| 4 | **0** | Line 0 | Empty | **MISS** | None | $[0, 5, -, 7]$ | $11\text{ ns}$ |
| 5 | **2** | Line 2 | Empty | **MISS** | None | $[0, 5, 2, 7]$ | $11\text{ ns}$ |
| 6 | **1** | Line 1 | 5 | **MISS** | 5 | $[0, 1, 2, 7]$ | $11\text{ ns}$ |
| 7 | **3** | Line 3 | 7 | **MISS** | 7 | $[0, 1, 2, 3]$ | $11\text{ ns}$ |
| 8 | **6** | Line 2 | 2 | **MISS** | 2 | $[0, 1, 6, 3]$ | $11\text{ ns}$ |
| 9 | **1** | Line 1 | 1 | **HIT** | None | $[0, 1, 6, 3]$ | $1\text{ ns}$ |
| 10 | **3** | Line 3 | 3 | **HIT** | None | $[0, 1, 6, 3]$ | $1\text{ ns}$ |
| 11 | **4** | Line 0 | 0 | **MISS** | 0 | $[4, 1, 6, 3]$ | $11\text{ ns}$ |
| 12 | **7** | Line 3 | 3 | **MISS** | 3 | $[4, 1, 6, 7]$ | $11\text{ ns}$ |
| 13 | **9** | Line 1 | 1 | **MISS** | 1 | $[4, 9, 6, 7]$ | $11\text{ ns}$ |

- **Performance Metrics**:
  - Hits: $2$, Misses: $11$
  - Hit Ratio: $H = \frac{2}{13} \approx 15.38\%$
  - Miss Ratio: $M = \frac{11}{13} \approx 84.62\%$
  - Final Cache Contents: **Line 0 = 4, Line 1 = 9, Line 2 = 6, Line 3 = 7**
  - Total Access Time: $T_{\text{total}} = (2 \times 1\text{ ns}) + (11 \times 11\text{ ns}) = 2 + 121 = 123\text{ ns}$
  - Average Access Time: $\text{AMAT} = \frac{123\text{ ns}}{13} \approx \mathbf{9.4615\text{ ns}}$

---

#### 2. Fully Associative + LRU Trace ($p, q$)
Capacity = 4 blocks. LRU order: $\text{[MRU} \rightarrow \dots \rightarrow \text{LRU]}$.

| Step | Block Ref | Hit/Miss | Replacement / Insertion Action | Cache State (MRU $\rightarrow$ LRU) | Access Time |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **1** | **MISS** | Insert 1 | $[1]$ | $11\text{ ns}$ |
| 2 | **7** | **MISS** | Insert 7 | $[7, 1]$ | $11\text{ ns}$ |
| 3 | **5** | **MISS** | Insert 5 | $[5, 7, 1]$ | $11\text{ ns}$ |
| 4 | **0** | **MISS** | Insert 0 (Full) | $[0, 5, 7, 1]$ | $11\text{ ns}$ |
| 5 | **2** | **MISS** | Evict LRU (1), Insert 2 | $[2, 0, 5, 7]$ | $11\text{ ns}$ |
| 6 | **1** | **MISS** | Evict LRU (7), Insert 1 | $[1, 2, 0, 5]$ | $11\text{ ns}$ |
| 7 | **3** | **MISS** | Evict LRU (5), Insert 3 | $[3, 1, 2, 0]$ | $11\text{ ns}$ |
| 8 | **6** | **MISS** | Evict LRU (0), Insert 6 | $[6, 3, 1, 2]$ | $11\text{ ns}$ |
| 9 | **1** | **HIT** | Promote 1 to MRU | $[1, 6, 3, 2]$ | $1\text{ ns}$ |
| 10 | **3** | **HIT** | Promote 3 to MRU | $[3, 1, 6, 2]$ | $1\text{ ns}$ |
| 11 | **4** | **MISS** | Evict LRU (2), Insert 4 | $[4, 3, 1, 6]$ | $11\text{ ns}$ |
| 12 | **7** | **MISS** | Evict LRU (6), Insert 7 | $[7, 4, 3, 1]$ | $11\text{ ns}$ |
| 13 | **9** | **MISS** | Evict LRU (1), Insert 9 | $[9, 7, 4, 3]$ | $11\text{ ns}$ |

- **Performance Metrics**:
  - Hits: $2$, Misses: $11$
  - Final Cache Contents: **$\{9, 7, 4, 3\}$**
  - Total Access Time: $123\text{ ns}$
  - Average Access Time: $\text{AMAT} = \frac{123\text{ ns}}{13} \approx \mathbf{9.4615\text{ ns}}$

---

#### 3. Fully Associative + MRU Trace ($r, s$)
Capacity = 4 blocks. On miss when full, evict the Most Recently Used block ($\text{MRU}$).

| Step | Block Ref | Hit/Miss | Current MRU | Action / Evicted Block | Cache Contents | New MRU | Access Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **1** | **MISS** | None | Insert 1 | $\{1\}$ | 1 | $11\text{ ns}$ |
| 2 | **7** | **MISS** | 1 | Insert 7 | $\{1, 7\}$ | 7 | $11\text{ ns}$ |
| 3 | **5** | **MISS** | 7 | Insert 5 | $\{1, 7, 5\}$ | 5 | $11\text{ ns}$ |
| 4 | **0** | **MISS** | 5 | Insert 0 (Full) | $\{1, 7, 5, 0\}$ | 0 | $11\text{ ns}$ |
| 5 | **2** | **MISS** | 0 | Evict MRU (0), Insert 2 | $\{1, 7, 5, 2\}$ | 2 | $11\text{ ns}$ |
| 6 | **1** | **HIT** | 2 | Update MRU to 1 | $\{1, 7, 5, 2\}$ | 1 | $1\text{ ns}$ |
| 7 | **3** | **MISS** | 1 | Evict MRU (1), Insert 3 | $\{3, 7, 5, 2\}$ | 3 | $11\text{ ns}$ |
| 8 | **6** | **MISS** | 3 | Evict MRU (3), Insert 6 | $\{6, 7, 5, 2\}$ | 6 | $11\text{ ns}$ |
| 9 | **1** | **MISS** | 6 | Evict MRU (6), Insert 1 | $\{1, 7, 5, 2\}$ | 1 | $11\text{ ns}$ |
| 10 | **3** | **MISS** | 1 | Evict MRU (1), Insert 3 | $\{3, 7, 5, 2\}$ | 3 | $11\text{ ns}$ |
| 11 | **4** | **MISS** | 3 | Evict MRU (3), Insert 4 | $\{4, 7, 5, 2\}$ | 4 | $11\text{ ns}$ |
| 12 | **7** | **HIT** | 4 | Update MRU to 7 | $\{4, 7, 5, 2\}$ | 7 | $1\text{ ns}$ |
| 13 | **9** | **MISS** | 7 | Evict MRU (7), Insert 9 | $\{4, 9, 5, 2\}$ | 9 | $11\text{ ns}$ |

- **Performance Metrics**:
  - Hits: $2$ (Access 6: Block 1, Access 12: Block 7)
  - Misses: $11$
  - Final Cache Contents: **$\{4, 9, 5, 2\}$**
  - Total Access Time: $123\text{ ns}$
  - Average Access Time: $\text{AMAT} = \frac{123\text{ ns}}{13} \approx \mathbf{9.4615\text{ ns}}$

---

#### 4. 2-Way Set Associative + LRU Trace ($t, u$)
Number of Sets = 2 (Set 0 for even blocks, Set 1 for odd blocks). Set Capacity = 2 blocks.

| Step | Block Ref | Target Set | Set Hit/Miss | Evicted Block | Set 0 (MRU $\rightarrow$ LRU) | Set 1 (MRU $\rightarrow$ LRU) | Access Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **1** | Set 1 | **MISS** | None | $[]$ | $[1]$ | $11\text{ ns}$ |
| 2 | **7** | Set 1 | **MISS** | None | $[]$ | $[7, 1]$ | $11\text{ ns}$ |
| 3 | **5** | Set 1 | **MISS** | 1 (LRU) | $[]$ | $[5, 7]$ | $11\text{ ns}$ |
| 4 | **0** | Set 0 | **MISS** | None | $[0]$ | $[5, 7]$ | $11\text{ ns}$ |
| 5 | **2** | Set 0 | **MISS** | None | $[2, 0]$ | $[5, 7]$ | $11\text{ ns}$ |
| 6 | **1** | Set 1 | **MISS** | 7 (LRU) | $[2, 0]$ | $[1, 5]$ | $11\text{ ns}$ |
| 7 | **3** | Set 1 | **MISS** | 5 (LRU) | $[2, 0]$ | $[3, 1]$ | $11\text{ ns}$ |
| 8 | **6** | Set 0 | **MISS** | 0 (LRU) | $[6, 2]$ | $[3, 1]$ | $11\text{ ns}$ |
| 9 | **1** | Set 1 | **HIT** | None | $[6, 2]$ | $[1, 3]$ | $1\text{ ns}$ |
| 10 | **3** | Set 1 | **HIT** | None | $[6, 2]$ | $[3, 1]$ | $1\text{ ns}$ |
| 11 | **4** | Set 0 | **MISS** | 2 (LRU) | $[4, 6]$ | $[3, 1]$ | $11\text{ ns}$ |
| 12 | **7** | Set 1 | **MISS** | 1 (LRU) | $[4, 6]$ | $[7, 3]$ | $11\text{ ns}$ |
| 13 | **9** | Set 1 | **MISS** | 3 (LRU) | $[4, 6]$ | $[9, 7]$ | $11\text{ ns}$ |

- **Performance Metrics**:
  - Hits: $2$ (Access 9: Block 1, Access 10: Block 3)
  - Misses: $11$
  - Final Cache Contents: **Set 0 = $\{4, 6\}$, Set 1 = $\{9, 7\}$**
  - Total Access Time: $123\text{ ns}$
  - Average Access Time: $\text{AMAT} = \frac{123\text{ ns}}{13} \approx \mathbf{9.4615\text{ ns}}$

---

#### 5. 2-Way Set Associative + MRU Trace ($v, w$)
Number of Sets = 2. On miss in a full set, evict the set's Most Recently Used block.

| Step | Block Ref | Target Set | Set Hit/Miss | Evicted Block | Set 0 [MRU] | Set 1 [MRU] | Access Time |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **1** | Set 1 | **MISS** | None | $[]$ | $\{1\} \ [1]$ | $11\text{ ns}$ |
| 2 | **7** | Set 1 | **MISS** | None | $[]$ | $\{1, 7\} \ [7]$ | $11\text{ ns}$ |
| 3 | **5** | Set 1 | **MISS** | 7 (MRU) | $[]$ | $\{1, 5\} \ [5]$ | $11\text{ ns}$ |
| 4 | **0** | Set 0 | **MISS** | None | $\{0\} \ [0]$ | $\{1, 5\} \ [5]$ | $11\text{ ns}$ |
| 5 | **2** | Set 0 | **MISS** | None | $\{0, 2\} \ [2]$ | $\{1, 5\} \ [5]$ | $11\text{ ns}$ |
| 6 | **1** | Set 1 | **HIT** | None | $\{0, 2\} \ [2]$ | $\{1, 5\} \ [1]$ | $1\text{ ns}$ |
| 7 | **3** | Set 1 | **MISS** | 1 (MRU) | $\{0, 2\} \ [2]$ | $\{3, 5\} \ [3]$ | $11\text{ ns}$ |
| 8 | **6** | Set 0 | **MISS** | 2 (MRU) | $\{0, 6\} \ [6]$ | $\{3, 5\} \ [3]$ | $11\text{ ns}$ |
| 9 | **1** | Set 1 | **MISS** | 3 (MRU) | $\{0, 6\} \ [6]$ | $\{1, 5\} \ [1]$ | $11\text{ ns}$ |
| 10 | **3** | Set 1 | **MISS** | 1 (MRU) | $\{0, 6\} \ [6]$ | $\{3, 5\} \ [3]$ | $11\text{ ns}$ |
| 11 | **4** | Set 0 | **MISS** | 6 (MRU) | $\{0, 4\} \ [4]$ | $\{3, 5\} \ [3]$ | $11\text{ ns}$ |
| 12 | **7** | Set 1 | **MISS** | 3 (MRU) | $\{0, 4\} \ [4]$ | $\{7, 5\} \ [7]$ | $11\text{ ns}$ |
| 13 | **9** | Set 1 | **MISS** | 7 (MRU) | $\{0, 4\} \ [4]$ | $\{9, 5\} \ [9]$ | $11\text{ ns}$ |

- **Performance Metrics**:
  - Hits: $1$ (Access 6: Block 1)
  - Misses: $12$
  - Hit Ratio: $H = \frac{1}{13} \approx 7.69\%$
  - Miss Ratio: $M = \frac{12}{13} \approx 92.31\%$
  - Final Cache Contents: **Set 0 = $\{0, 4\}$, Set 1 = $\{9, 5\}$**
  - Total Access Time: $T_{\text{total}} = (1 \times 1\text{ ns}) + (12 \times 11\text{ ns}) = 1 + 132 = 133\text{ ns}$
  - Average Access Time: $\text{AMAT} = \frac{133\text{ ns}}{13} \approx \mathbf{10.2308\text{ ns}}$

---

### Comparative Summary Table for Problem 0b

| Cache Architecture | Hits | Misses | Hit Ratio ($H$) | Miss Ratio ($M$) | Final Cache Blocks | AMAT (ns) |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **Direct-Mapped** | 2 | 11 | $15.38\%$ | $84.62\%$ | $L_0:4, L_1:9, L_2:6, L_3:7$ | $9.4615$ |
| **Fully Associative (LRU)** | 2 | 11 | $15.38\%$ | $84.62\%$ | $\{9, 7, 4, 3\}$ | $9.4615$ |
| **Fully Associative (MRU)** | 2 | 11 | $15.38\%$ | $84.62\%$ | $\{4, 9, 5, 2\}$ | $9.4615$ |
| **2-Way Set Assoc (LRU)** | 2 | 11 | $15.38\%$ | $84.62\%$ | $S_0:\{4, 6\}, S_1:\{9, 7\}$ | $9.4615$ |
| **2-Way Set Assoc (MRU)** | 1 | 12 | $7.69\%$ | $92.31\%$ | $S_0:\{0, 4\}, S_1:\{9, 5\}$ | $10.2308$ |

---

## 📝 Problem 1: Sizing a 64-Block Direct-Mapped Cache

### Problem Statement
A **direct-mapped cache** consists of $64\text{ blocks}$. Main memory contains $4096\text{ blocks}$, each consisting of $128\text{ words}$. Each word is $16\text{ bits}$.

```text
+--------------------------------------------------------------------+
| Cache Organization: Direct-Mapped (64 lines)                       |
| Main Memory Size: 4096 blocks                                      |
| Block Size: 128 words per block (2048 data bits)                   |
| Word Width: 16 bits                                                |
+--------------------------------------------------------------------+
```

---

### Step-by-Step Solutions

#### a. Main Memory Address Width
- Total words in main memory:
  $$N_{\text{words}} = 4096\text{ blocks} \times 128\text{ words/block} = 2^{12} \times 2^7 = 2^{19}\text{ words} = 524,288\text{ words}$$
- Total address bits:
  $$A = \log_2(524,288) = \mathbf{19\text{ bits}}$$

---

#### b. TAG, BLOCK, and WORD Fields
- $\text{WORD Offset } (w) = \log_2(128\text{ words/block}) = 7\text{ bits}$
- $\text{BLOCK Index } (s) = \log_2(64\text{ cache blocks}) = 6\text{ bits}$
- $\text{TAG Field } (t) = 19 - (6 + 7) = \mathbf{6\text{ bits}}$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG} & \textbf{BLOCK INDEX} & \textbf{WORD OFFSET} \\
\hline
\text{6 bits (Bits [18:13])} & \text{6 bits (Bits [12:7])} & \text{7 bits (Bits [6:0])} \\
\hline
\end{array}$$

---

#### c. Total Cache Size (including Tag and Valid bits)
- Bits per cache line:
  $$\text{Data Bits} = 128\text{ words} \times 16\text{ bits/word} = 2048\text{ bits}$$
  $$\text{Tag Bits} = 6\text{ bits}$$
  $$\text{Valid Bit} = 1\text{ bit}$$
  $$\text{Bits per Line} = 2048 + 6 + 1 = 2055\text{ bits}$$
- Total cache memory size:
  $$\text{Total Bits} = 64\text{ lines} \times 2055\text{ bits/line} = \mathbf{131,520\text{ bits}} \quad (16,440\text{ bytes} \approx 16.05\text{ KiB})$$
  *(Pure Data Storage = $64 \times 2048 = 131,072\text{ bits} = 16\text{ KiB}$)*

---

#### d. Total Main Memory Size
$$\text{MM Size} = 524,288\text{ words} \times 16\text{ bits/word} = \mathbf{8,388,608\text{ bits}} \quad (1,048,576\text{ bytes} = 1\text{ MiB})$$

---

#### e. Mapping of Memory Block 1000
$$\text{Cache Block Index} = \text{MM Block Number} \pmod{\text{Total Cache Blocks}} = 1000 \pmod{64} = \mathbf{40}$$
$$\mathbf{\text{Memory Block 1000 maps to Cache Block 40}}$$

---

#### f. Mapping of Memory Address 1000
- Memory Address $1000_{10} = 0000000001111101000_2$
- Block Number:
  $$\text{MM Block} = \left\lfloor \frac{1000}{128} \right\rfloor = 7$$
- Cache Block:
  $$\text{Cache Block} = 7 \pmod{64} = \mathbf{7}$$
- Bit verification:
  - $\text{Word Offset} = 1000 \pmod{128} = 104 = 1101000_2$ (Bits [6:0])
  - $\text{Block Index} = 000111_2 = 7$ (Bits [12:7])
  - $\text{Tag} = 000000_2 = 0$ (Bits [18:13])
$$\mathbf{\text{Memory Address 1000 maps to Cache Block 7}}$$

---

## 📝 Problem 2: Sizing a 64-Block Fully Associative Cache

### Problem Statement
An **associative cache** consists of $64\text{ blocks}$. Main memory contains $4096\text{ blocks}$, each of $128\text{ words}$, with $16\text{ bits}$ per word.

---

### Step-by-Step Solutions

#### a. Main Memory Address Width
$$A = \log_2(4096 \times 128) = \log_2(2^{19}) = \mathbf{19\text{ bits}}$$

---

#### b. TAG and WORD Fields
- $\text{WORD Offset } (w) = \log_2(128) = 7\text{ bits}$
- $\text{TAG Field } (t) = 19 - 7 = \mathbf{12\text{ bits}} \quad (\log_2(4096) = 12\text{ bits})$

$$\begin{array}{|c|c|}
\hline
\textbf{TAG (12 bits)} & \textbf{WORD OFFSET (7 bits)} \\
\hline
\text{Bits [18:7]} & \text{Bits [6:0]} \\
\hline
\end{array}$$

---

#### c. Mapping of Memory Block 1000
In a fully associative cache, there is no fixed line assignment. Memory Block 1000 can be placed in **ANY of the 64 cache blocks** (Blocks 0 through 63), subject to the cache replacement policy.

---

#### d. Mapping of Memory Address 1000
Memory Address 1000 belongs to MM Block 7 ($\lfloor 1000/128 \rfloor = 7$). It can be placed in **ANY of the 64 cache blocks** (Blocks 0 through 63).

---

#### e. Total Cache Size (including Tag and Valid bits)
- Bits per cache line:
  $$\text{Line Bits} = 2048\text{ data} + 12\text{ tag} + 1\text{ valid} = 2061\text{ bits}$$
- Total cache memory size:
  $$\text{Total Bits} = 64 \times 2061 = \mathbf{131,904\text{ bits}} \quad (16,488\text{ bytes} \approx 16.10\text{ KiB})$$

---

## 📝 Problem 3: Sizing a 4-Way Set Associative Cache

### Problem Statement
A **4-way block set associative cache** consists of $64\text{ blocks}$ total ($K = 4$). Main memory contains $4096\text{ blocks}$, each of $128\text{ words}$, with $16\text{ bits}$ per word.

---

### Step-by-Step Solutions

#### a. Main Memory Address Width
$$A = \log_2(4096 \times 128) = \mathbf{19\text{ bits}}$$

---

#### b. TAG, SET, and WORD Fields
- Number of Sets:
  $$S = \frac{64\text{ cache blocks}}{4\text{ blocks/set}} = 16\text{ sets}$$
- $\text{WORD Offset } (w) = \log_2(128) = 7\text{ bits}$
- $\text{SET Index } (d) = \log_2(16\text{ sets}) = 4\text{ bits}$
- $\text{TAG Field } (t) = 19 - (4 + 7) = \mathbf{8\text{ bits}} \quad \left(\log_2\left(\frac{4096}{16}\right) = \log_2(256) = 8\text{ bits}\right)$

$$\begin{array}{|c|c|c|}
\hline
\textbf{TAG (8 bits)} & \textbf{SET INDEX (4 bits)} & \textbf{WORD OFFSET (7 bits)} \\
\hline
\text{Bits [18:11]} & \text{Bits [10:7]} & \text{Bits [6:0]} \\
\hline
\end{array}$$

---

#### c. Mapping of Memory Block 1000
$$\text{Cache Set} = \text{MM Block Number} \pmod{\text{Total Sets}} = 1000 \pmod{16} = \mathbf{8}$$
$$\mathbf{\text{Memory Block 1000 maps to Cache Set 8 (within any of its 4 lines)}}$$

---

#### d. Mapping of Memory Address 1000
- Memory Address $1000 \implies \text{MM Block} = \lfloor 1000/128 \rfloor = 7$
- Target Cache Set:
  $$\text{Cache Set} = 7 \pmod{16} = \mathbf{7}$$
$$\mathbf{\text{Memory Address 1000 maps to Cache Set 7 (within any of its 4 lines)}}$$

---

#### e. Total Cache Size (including Tag and Valid bits)
- Bits per cache line:
  $$\text{Line Bits} = 2048\text{ data} + 8\text{ tag} + 1\text{ valid} = 2057\text{ bits}$$
- Total cache memory size:
  $$\text{Total Bits} = 64 \times 2057 = \mathbf{131,648\text{ bits}} \quad (16,456\text{ bytes} \approx 16.07\text{ KiB})$$

---

### Comparative Architecture Summary (64-Block Configurations)

| Cache Organization | Tag Bits | Index/Set Bits | Offset Bits | Bits/Line | Total Size (Bits) | Tag Overhead (Bits) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Direct-Mapped** | $6$ | $6$ (Line) | $7$ | $2055$ | $131,520$ | $384$ |
| **4-Way Set Associative** | $8$ | $4$ (Set) | $7$ | $2057$ | $131,648$ | $512$ |
| **Fully Associative** | $12$ | $0$ | $7$ | $2061$ | $131,904$ | $768$ |

---

## 📝 Problem 4: Byte-Addressable Cache Reference Traces

### Problem Statement
A **byte-addressable computer** has a data cache of $32\text{ bytes}$. Each cache block is $4\text{ bytes}$.
- Number of Cache Blocks: $C = \frac{32\text{ bytes}}{4\text{ bytes/block}} = 8\text{ blocks}$
- Byte Offset: $w = \log_2(4) = 2\text{ bits}$

Sequence of hex byte addresses ($12\text{ references}$):
$$\text{Addresses: } \text{200, 204, 208, 20C, 2F4, 2F0, 200, 204, 218, 21C, 24C, 2F4}$$

---

### Address Translation Table
For each byte address $A$, Block Number $B = \lfloor A / 4 \rfloor = A \gg 2$:

| Step | Hex Address | Decimal Address | Binary Address | Block Number ($B$) | Direct Line ($B \pmod 8$) | 4-Way Set ($B \pmod 2$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | `0x200` | 512 | `...0010 0000 0000` | **128** (`0x80`) | 0 | Set 0 |
| 2 | `0x204` | 516 | `...0010 0000 0100` | **129** (`0x81`) | 1 | Set 1 |
| 3 | `0x208` | 520 | `...0010 0000 1000` | **130** (`0x82`) | 2 | Set 0 |
| 4 | `0x20C` | 524 | `...0010 0000 1100` | **131** (`0x83`) | 3 | Set 1 |
| 5 | `0x2F4` | 756 | `...0010 1111 0100` | **189** (`0xBD`) | 5 | Set 1 |
| 6 | `0x2F0` | 752 | `...0010 1111 0000` | **188** (`0xBC`) | 4 | Set 0 |
| 7 | `0x200` | 512 | `...0010 0000 0000` | **128** (`0x80`) | 0 | Set 0 |
| 8 | `0x204` | 516 | `...0010 0000 0100` | **129** (`0x81`) | 1 | Set 1 |
| 9 | `0x218` | 536 | `...0010 0001 1000` | **134** (`0x86`) | 6 | Set 0 |
| 10 | `0x21C` | 540 | `...0010 0001 1100` | **135** (`0x87`) | 7 | Set 1 |
| 11 | `0x24C` | 588 | `...0010 0100 1100` | **147** (`0x93`) | 3 | Set 1 |
| 12 | `0x2F4` | 756 | `...0010 1111 0100` | **189** (`0xBD`) | 5 | Set 1 |

---

### Trace Evaluations

#### 4a. Direct-Mapped Cache (8 lines $L_0 \dots L_7$)
- Access 1 (`0x200` $\rightarrow$ Blk 128 $\rightarrow$ $L_0$): **MISS** $\implies L_0 = 128$ (`200-203`)
- Access 2 (`0x204` $\rightarrow$ Blk 129 $\rightarrow$ $L_1$): **MISS** $\implies L_1 = 129$ (`204-207`)
- Access 3 (`0x208` $\rightarrow$ Blk 130 $\rightarrow$ $L_2$): **MISS** $\implies L_2 = 130$ (`208-20B`)
- Access 4 (`0x20C` $\rightarrow$ Blk 131 $\rightarrow$ $L_3$): **MISS** $\implies L_3 = 131$ (`20C-20F`)
- Access 5 (`0x2F4` $\rightarrow$ Blk 189 $\rightarrow$ $L_5$): **MISS** $\implies L_5 = 189$ (`2F4-2F7`)
- Access 6 (`0x2F0` $\rightarrow$ Blk 188 $\rightarrow$ $L_4$): **MISS** $\implies L_4 = 188$ (`2F0-2F3`)
- Access 7 (`0x200` $\rightarrow$ Blk 128 $\rightarrow$ $L_0$): **HIT** ($L_0$ holds 128)
- Access 8 (`0x204` $\rightarrow$ Blk 129 $\rightarrow$ $L_1$): **HIT** ($L_1$ holds 129)
- Access 9 (`0x218` $\rightarrow$ Blk 134 $\rightarrow$ $L_6$): **MISS** $\implies L_6 = 134$ (`218-21B`)
- Access 10 (`0x21C` $\rightarrow$ Blk 135 $\rightarrow$ $L_7$): **MISS** $\implies L_7 = 135$ (`21C-21F`)
- Access 11 (`0x24C` $\rightarrow$ Blk 147 $\rightarrow$ $L_3$): **MISS** $\implies L_3 = 147$ (`24C-24F`) (evicts 131)
- Access 12 (`0x2F4` $\rightarrow$ Blk 189 $\rightarrow$ $L_5$): **HIT** ($L_5$ holds 189)

**Final Direct-Mapped Cache Contents**:
- $L_0$: Block 128 (`0x200 - 0x203`)
- $L_1$: Block 129 (`0x204 - 0x207`)
- $L_2$: Block 130 (`0x208 - 0x20B`)
- $L_3$: Block 147 (`0x24C - 0x24F`)
- $L_4$: Block 188 (`0x2F0 - 0x2F3`)
- $L_5$: Block 189 (`0x2F4 - 0x2F7`)
- $L_6$: Block 134 (`0x218 - 0x21B`)
- $L_7$: Block 135 (`0x21C - 0x21F`)
- **Total Hits = 3, Total Misses = 9**

---

#### 4b. Fully Associative Cache + LRU (8 slots)
- Access 1 (`0x200`, Blk 128): MISS $\implies [128]$
- Access 2 (`0x204`, Blk 129): MISS $\implies [129, 128]$
- Access 3 (`0x208`, Blk 130): MISS $\implies [130, 129, 128]$
- Access 4 (`0x20C`, Blk 131): MISS $\implies [131, 130, 129, 128]$
- Access 5 (`0x2F4`, Blk 189): MISS $\implies [189, 131, 130, 129, 128]$
- Access 6 (`0x2F0`, Blk 188): MISS $\implies [188, 189, 131, 130, 129, 128]$
- Access 7 (`0x200`, Blk 128): **HIT** $\implies [128, 188, 189, 131, 130, 129]$
- Access 8 (`0x204`, Blk 129): **HIT** $\implies [129, 128, 188, 189, 131, 130]$
- Access 9 (`0x218`, Blk 134): MISS $\implies [134, 129, 128, 188, 189, 131, 130]$
- Access 10 (`0x21C`, Blk 135): MISS $\implies [135, 134, 129, 128, 188, 189, 131, 130]$ (Cache full)
- Access 11 (`0x24C`, Blk 147): MISS (Evict LRU 130) $\implies [147, 135, 134, 129, 128, 188, 189, 131]$
- Access 12 (`0x2F4`, Blk 189): **HIT** $\implies [189, 147, 135, 134, 129, 128, 188, 131]$

**Final Fully Associative LRU Cache Contents**:
- Blocks: **$\{189, 147, 135, 134, 129, 128, 188, 131\}$** (Addresses `0x2F4, 0x24C, 0x21C, 0x218, 0x204, 0x200, 0x2F0, 0x20C`)
- **Total Hits = 3, Total Misses = 9**

---

#### 4c. Fully Associative Cache + MRU (8 slots)
- Accesses 1–6: Compulsory misses filling slots with Blocks $\{128, 129, 130, 131, 189, 188\}$, $\text{MRU} = 188$.
- Access 7 (`0x200`, Blk 128): **HIT**, $\text{MRU} \rightarrow 128$.
- Access 8 (`0x204`, Blk 129): **HIT**, $\text{MRU} \rightarrow 129$.
- Access 9 (`0x218`, Blk 134): MISS $\implies$ inserts into slot 7, $\text{MRU} \rightarrow 134$.
- Access 10 (`0x21C`, Blk 135): MISS $\implies$ inserts into slot 8 (cache now full), $\text{MRU} \rightarrow 135$.
- Access 11 (`0x24C`, Blk 147): MISS $\implies$ evicts MRU (135), loads 147, $\text{MRU} \rightarrow 147$.
- Access 12 (`0x2F4`, Blk 189): **HIT** (189 is in cache), $\text{MRU} \rightarrow 189$.

**Final Fully Associative MRU Cache Contents**:
- Blocks: **$\{128, 129, 130, 131, 189, 188, 134, 147\}$**
- **Total Hits = 3, Total Misses = 9**

---

#### 4d. 4-Way Set Associative Cache + LRU (2 sets: Set 0 and Set 1, 4 blocks/set)
- Set 0 (Even blocks: 128, 130, 188, 134):
  - Access 1 (128): MISS $\implies [128]$
  - Access 3 (130): MISS $\implies [130, 128]$
  - Access 6 (188): MISS $\implies [188, 130, 128]$
  - Access 7 (128): **HIT** $\implies [128, 188, 130]$
  - Access 9 (134): MISS $\implies [134, 128, 188, 130]$ (Set 0 Full)
- Set 1 (Odd blocks: 129, 131, 189, 135, 147):
  - Access 2 (129): MISS $\implies [129]$
  - Access 4 (131): MISS $\implies [131, 129]$
  - Access 5 (189): MISS $\implies [189, 131, 129]$
  - Access 8 (129): **HIT** $\implies [129, 189, 131]$
  - Access 10 (135): MISS $\implies [135, 129, 189, 131]$ (Set 1 Full)
  - Access 11 (147): MISS $\implies$ Evicts LRU (131) $\implies [147, 135, 129, 189]$
  - Access 12 (189): **HIT** $\implies [189, 147, 135, 129]$

**Final 4-Way Set Associative LRU Cache Contents**:
- **Set 0**: $\{134, 128, 188, 130\}$ (Hex `0x218, 0x200, 0x2F0, 0x208`)
- **Set 1**: $\{189, 147, 135, 129\}$ (Hex `0x2F4, 0x24C, 0x21C, 0x204`)
- **Total Hits = 3, Total Misses = 9**

---

#### 4e. 4-Way Set Associative Cache + MRU (2 sets, 4 blocks/set)
- Set 0:
  - Access 1 (128): MISS $\implies \{128\}$, $\text{MRU} = 128$
  - Access 3 (130): MISS $\implies \{128, 130\}$, $\text{MRU} = 130$
  - Access 6 (188): MISS $\implies \{128, 130, 188\}$, $\text{MRU} = 188$
  - Access 7 (128): **HIT**, $\text{MRU} = 128$
  - Access 9 (134): MISS $\implies \{128, 130, 188, 134\}$, $\text{MRU} = 134$ (Set 0 Full)
- Set 1:
  - Access 2 (129): MISS $\implies \{129\}$, $\text{MRU} = 129$
  - Access 4 (131): MISS $\implies \{129, 131\}$, $\text{MRU} = 131$
  - Access 5 (189): MISS $\implies \{129, 131, 189\}$, $\text{MRU} = 189$
  - Access 8 (129): **HIT**, $\text{MRU} = 129$
  - Access 10 (135): MISS $\implies \{129, 131, 189, 135\}$, $\text{MRU} = 135$ (Set 1 Full)
  - Access 11 (147): MISS $\implies$ Evicts MRU (135) $\implies \{129, 131, 189, 147\}$, $\text{MRU} = 147$
  - Access 12 (189): **HIT**, $\text{MRU} = 189$

**Final 4-Way Set Associative MRU Cache Contents**:
- **Set 0**: $\{128, 130, 188, 134\}$
- **Set 1**: $\{129, 131, 189, 147\}$
- **Total Hits = 3, Total Misses = 9**

---

## 📝 Problem 5: Non-Load-Through Read Policy Benchmark

### Problem Statement
Given:
- Cache Capacity = $4\text{ cache blocks}$
- Block Size = $4\text{ words/block}$
- Associativity: $2\text{ blocks/set}$ (for set associative $\implies 2\text{ sets}$)
- $t_{\text{cache}} = 1\text{ ns}$, $t_{\text{mem}} = 10\text{ ns}$
- **Non-load-through read policy**:
  - $t_{\text{hit}} = 1\text{ ns}$
  - $t_{\text{miss}} = 1\text{ ns} + 10\text{ ns} = 11\text{ ns}$
- Main Memory Block Sequence:
  $$\text{Sequence: } 1, 2, 3, 4, 5, 4, 6, 3 \quad (N = 8\text{ accesses})$$

---

### Step-by-Step Derivations for all 5 Configurations

#### 1. Direct Mapping ($\text{Line} = B \pmod 4$)
- Access 1 ($B=1 \rightarrow L_1$): MISS $\implies L_1 = 1$
- Access 2 ($B=2 \rightarrow L_2$): MISS $\implies L_2 = 2$
- Access 3 ($B=3 \rightarrow L_3$): MISS $\implies L_3 = 3$
- Access 4 ($B=4 \rightarrow L_0$): MISS $\implies L_0 = 4$
- Access 5 ($B=5 \rightarrow L_1$): MISS (Evicts 1) $\implies L_1 = 5$
- Access 6 ($B=4 \rightarrow L_0$): **HIT** ($L_0$ holds 4)
- Access 7 ($B=6 \rightarrow L_2$): MISS (Evicts 2) $\implies L_2 = 6$
- Access 8 ($B=3 \rightarrow L_3$): **HIT** ($L_3$ holds 3)

**Metrics**:
- Hits = $2$, Misses = $6$
- Hit Rate = $\frac{2}{8} = \mathbf{25.00\%}$, Miss Rate = $\frac{6}{8} = \mathbf{75.00\%}$
- Total Memory Access Time:
  $$T_{\text{total}} = (2 \times 1\text{ ns}) + (6 \times 11\text{ ns}) = 2 + 66 = \mathbf{68\text{ ns}}$$
- Average Memory Access Time:
  $$\text{AMAT} = \frac{68\text{ ns}}{8} = \mathbf{8.50\text{ ns}}$$
- Final Cache: $[L_0: 4, L_1: 5, L_2: 6, L_3: 3]$

---

#### 2. Fully Associative Mapping (LRU)
- Access 1 (1): MISS $\implies [1]$
- Access 2 (2): MISS $\implies [2, 1]$
- Access 3 (3): MISS $\implies [3, 2, 1]$
- Access 4 (4): MISS $\implies [4, 3, 2, 1]$ (Full)
- Access 5 (5): MISS $\implies$ Evict LRU (1) $\implies [5, 4, 3, 2]$
- Access 6 (4): **HIT** $\implies$ Promote 4 $\implies [4, 5, 3, 2]$
- Access 7 (6): MISS $\implies$ Evict LRU (2) $\implies [6, 4, 5, 3]$
- Access 8 (3): **HIT** $\implies$ Promote 3 $\implies [3, 6, 4, 5]$

**Metrics**:
- Hits = $2$, Misses = $6$
- Hit Rate = $\mathbf{25.00\%}$, Miss Rate = $\mathbf{75.00\%}$
- Total Access Time: $T_{\text{total}} = \mathbf{68\text{ ns}}$, $\text{AMAT} = \mathbf{8.50\text{ ns}}$
- Final Cache: $\{3, 6, 4, 5\}$

---

#### 3. Fully Associative Mapping (MRU)
- Access 1 (1): MISS $\implies \{1\}$, $\text{MRU} = 1$
- Access 2 (2): MISS $\implies \{1, 2\}$, $\text{MRU} = 2$
- Access 3 (3): MISS $\implies \{1, 2, 3\}$, $\text{MRU} = 3$
- Access 4 (4): MISS $\implies \{1, 2, 3, 4\}$, $\text{MRU} = 4$ (Full)
- Access 5 (5): MISS $\implies$ Evict MRU (4) $\implies \{1, 2, 3, 5\}$, $\text{MRU} = 5$
- Access 6 (4): MISS $\implies$ Evict MRU (5) $\implies \{1, 2, 3, 4\}$, $\text{MRU} = 4$
- Access 7 (6): MISS $\implies$ Evict MRU (4) $\implies \{1, 2, 3, 6\}$, $\text{MRU} = 6$
- Access 8 (3): **HIT** (3 in cache) $\implies \{1, 2, 3, 6\}$, $\text{MRU} = 3$

**Metrics**:
- Hits = $1$, Misses = $7$
- Hit Rate = $\frac{1}{8} = \mathbf{12.50\%}$, Miss Rate = $\frac{7}{8} = \mathbf{87.50\%}$
- Total Access Time:
  $$T_{\text{total}} = (1 \times 1\text{ ns}) + (7 \times 11\text{ ns}) = 1 + 77 = \mathbf{78\text{ ns}}$$
- Average Memory Access Time:
  $$\text{AMAT} = \frac{78\text{ ns}}{8} = \mathbf{9.75\text{ ns}}$$
- Final Cache: $\{1, 2, 3, 6\}$

---

#### 4. Block Set Associative (LRU, 2 sets)
- Set 0 (Even: 2, 4, 6), Set 1 (Odd: 1, 3, 5)
- Access 1 ($B=1 \rightarrow S_1$): MISS $\implies S_1: [1]$
- Access 2 ($B=2 \rightarrow S_0$): MISS $\implies S_0: [2]$
- Access 3 ($B=3 \rightarrow S_1$): MISS $\implies S_1: [3, 1]$ (Full)
- Access 4 ($B=4 \rightarrow S_0$): MISS $\implies S_0: [4, 2]$ (Full)
- Access 5 ($B=5 \rightarrow S_1$): MISS $\implies$ Evict LRU (1) $\implies S_1: [5, 3]$
- Access 6 ($B=4 \rightarrow S_0$): **HIT** $\implies S_0: [4, 2]$
- Access 7 ($B=6 \rightarrow S_0$): MISS $\implies$ Evict LRU (2) $\implies S_0: [6, 4]$
- Access 8 ($B=3 \rightarrow S_1$): **HIT** $\implies S_1: [3, 5]$

**Metrics**:
- Hits = $2$, Misses = $6$
- Hit Rate = $\mathbf{25.00\%}$, Miss Rate = $\mathbf{75.00\%}$
- Total Access Time: $T_{\text{total}} = \mathbf{68\text{ ns}}$, $\text{AMAT} = \mathbf{8.50\text{ ns}}$
- Final Cache: Set 0 = $\{6, 4\}$, Set 1 = $\{3, 5\}$

---

#### 5. Block Set Associative (MRU, 2 sets)
- Access 1 ($B=1 \rightarrow S_1$): MISS $\implies S_1: \{1\}$, $\text{MRU} = 1$
- Access 2 ($B=2 \rightarrow S_0$): MISS $\implies S_0: \{2\}$, $\text{MRU} = 2$
- Access 3 ($B=3 \rightarrow S_1$): MISS $\implies S_1: \{1, 3\}$, $\text{MRU} = 3$
- Access 4 ($B=4 \rightarrow S_0$): MISS $\implies S_0: \{2, 4\}$, $\text{MRU} = 4$
- Access 5 ($B=5 \rightarrow S_1$): MISS $\implies$ Evict MRU (3) $\implies S_1: \{1, 5\}$, $\text{MRU} = 5$
- Access 6 ($B=4 \rightarrow S_0$): **HIT** $\implies S_0: \{2, 4\}$, $\text{MRU} = 4$
- Access 7 ($B=6 \rightarrow S_0$): MISS $\implies$ Evict MRU (4) $\implies S_0: \{2, 6\}$, $\text{MRU} = 6$
- Access 8 ($B=3 \rightarrow S_1$): MISS (3 was evicted) $\implies$ Evict MRU (5) $\implies S_1: \{1, 3\}$, $\text{MRU} = 3$

**Metrics**:
- Hits = $1$, Misses = $7$
- Hit Rate = $\frac{1}{8} = \mathbf{12.50\%}$, Miss Rate = $\frac{7}{8} = \mathbf{87.50\%}$
- Total Access Time:
  $$T_{\text{total}} = (1 \times 1\text{ ns}) + (7 \times 11\text{ ns}) = \mathbf{78\text{ ns}}$$
- Average Memory Access Time:
  $$\text{AMAT} = \frac{78\text{ ns}}{8} = \mathbf{9.75\text{ ns}}$$
- Final Cache: Set 0 = $\{2, 6\}$, Set 1 = $\{1, 3\}$

---

### Master Comparison Table for Problem 5

| Mapping & Replacement Policy | Hits | Misses | Hit Rate | Miss Rate | Total Access Time | AMAT | Final Cache State |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Direct Mapping** | 2 | 6 | $25.00\%$ | $75.00\%$ | $68\text{ ns}$ | $8.50\text{ ns}$ | $[4, 5, 6, 3]$ |
| **2. Full Associative (LRU)** | 2 | 6 | $25.00\%$ | $75.00\%$ | $68\text{ ns}$ | $8.50\text{ ns}$ | $\{3, 6, 4, 5\}$ |
| **3. Full Associative (MRU)** | 1 | 7 | $12.50\%$ | $87.50\%$ | $78\text{ ns}$ | $9.75\text{ ns}$ | $\{1, 2, 3, 6\}$ |
| **4. Set Associative (LRU)** | 2 | 6 | $25.00\%$ | $75.00\%$ | $68\text{ ns}$ | $8.50\text{ ns}$ | $S_0:\{6, 4\}, S_1:\{3, 5\}$ |
| **5. Set Associative (MRU)** | 1 | 7 | $12.50\%$ | $87.50\%$ | $78\text{ ns}$ | $9.75\text{ ns}$ | $S_0:\{2, 6\}, S_1:\{1, 3\}$ |

---

## 💡 Key Architectural Takeaways

1. **Mapping Trade-offs**:
   - **Direct Mapping** offers minimal hardware complexity ($1\text{ comparator}$) and fastest hit time, but suffers from conflict misses when multiple active blocks map to the same line index.
   - **Fully Associative Mapping** eliminates conflict misses entirely, maximizing hit rate for small caches, but requires $C\text{ comparators}$ operating in parallel, introducing area and power overheads.
   - **Set Associative Mapping** provides an optimal engineering compromise, capturing most of the hit rate benefit of full associativity with $K\text{ comparators}$ per set.

2. **Replacement Policy Impact**:
   - **LRU** aligns naturally with the principle of temporal locality, preserving recently used blocks.
   - **MRU** is generally disadvantageous for typical sequential or looping workloads, but is useful in specific scan-resistant access patterns where large datasets exceed cache capacity.

3. **Overhead Calculations**:
   - Tag storage constitutes a significant percentage of total on-chip SRAM area. As block size increases, tag overhead per data bit decreases because fewer lines are required to cover the same data capacity.


## References & Navigation

- **Related Notes:** [[Cache Memory]]

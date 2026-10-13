---
id: csarch2_module_14_cache_policies
type: note
course: CSARCH2
topic: "Cache Replacement Policies & Write Strategies"
status: completed
---

# Module 14: Cache Replacement Policies & Write Strategies

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Cache Replacement Policies & Write Strategies]]

---

## Overview

> When a cache miss occurs in a set-associative or fully associative cache and all candidate lines within the target set are populated, hardware must choose a victim line to evict. The efficiency of this selection is governed by the **Cache Replacement Policy**. Furthermore, memory write operations must balance cache consistency against memory bus bandwidth through coordinated **Write Hit (Write-Through vs. Write-Back)** and **Write Miss (Write-Allocate vs. No-Write-Allocate)** policies. This module formalizes the 3Cs miss classification model, analyzes hardware replacement algorithms (LRU, FIFO, Random, MRU), and establishes the quantitative formulas for **Average Memory Access Time (AMAT)** across single-level and multi-level cache hierarchies.

## Key Definitions

- **Compulsory (Cold) Miss:** A cache miss caused by the very first access to a memory block, unavoidable regardless of cache capacity or associativity.
- **Capacity Miss:** A cache miss occurring because the overall active working set of the program exceeds the total capacity of the cache.
- **Conflict (Collision) Miss:** A cache miss occurring in direct-mapped or set-associative caches when multiple active memory blocks compete for the same line/set index, even though empty space exists elsewhere in the cache.
- **Least Recently Used (LRU):** A replacement algorithm that tracks access history and evicts the block that has remained unreferenced for the longest duration.
- **First-In, First-Out (FIFO):** A replacement algorithm that evicts the block that has resided in the cache for the longest time, regardless of recent access frequency.
- **Write-Through:** A write strategy where every write to the cache is simultaneously propagated to main memory, ensuring main memory is always consistent.
- **Write-Back:** A write strategy where modified data is updated exclusively in the cache, setting a **Dirty Bit ($D=1$)**, and written to main memory only when the line is evicted.
- **Write-Allocate (Fetch on Write):** A write miss strategy where the missing block is loaded from main memory into the cache before executing the write.
- **No-Write-Allocate (Write Around):** A write miss strategy where data is written directly to main memory, bypassing the cache entirely.
- **Average Memory Access Time (AMAT):** The mean time required for the CPU to access a memory operand:
  $$AMAT = \text{Hit Time } (t_h) + \text{Miss Rate } (m) \times \text{Miss Penalty } (t_p)$$

## Theoretical Framework / Core Concepts

### 1. The 3Cs (+1) Cache Miss Classification Model

Mark Hill formalized cache misses into three fundamental categories (expanded to 4 for multicore):

```text
+--------------------------------------------------------------------------+
|                       THE 3Cs (+1) MISS TAXONOMY                         |
|                                                                          |
| 1. Compulsory (Cold) Miss:                                               |
|    - First time block is referenced.                                     |
|    - Solution: Increase block size (prefetching).                        |
|                                                                          |
| 2. Capacity Miss:                                                        |
|    - Working set > Cache Size.                                           |
|    - Solution: Increase total cache capacity.                            |
|                                                                          |
| 3. Conflict Miss:                                                        |
|    - Multiple active blocks map to the exact same Set.                   |
|    - Solution: Increase associativity (e.g., 2-way -> 4-way -> 8-way).    |
|                                                                          |
| 4. Coherence Miss (Multi-Core Systems):                                  |
|    - Another CPU core wrote to the block, invalidating this core's copy. |
|    - Solution: Optimize inter-thread data sharing / false sharing.       |
+--------------------------------------------------------------------------+
```

### 2. Cache Replacement Algorithms

When a set is full ($k$ lines valid), one of the following algorithms selects the victim line:

```text
+--------------------------------------------------------------------------+
| Policy      | Selection Metric           | Hardware Overhead & Notes     |
|-------------+----------------------------+-------------------------------|
| LRU         | Maximum time since access  | Requires aging bits/matrix;   |
|             |                            | optimal empirical performance |
| FIFO        | Maximum time since load    | Simple circular counter;      |
|             |                            | ignores frequency of access   |
| MRU         | Minimum time since access  | Used in cyclical scan loops   |
| Random      | Pseudo-random choice       | Uses LFSR; cheap & effective  |
| OPT (MIN)   | Furthest future access     | Theoretical upper bound       |
+--------------------------------------------------------------------------+
```

#### LRU Implementation (Age Matrix for $k$-Way Cache):
For a 4-way associative set, a $4 \times 4$ triangular matrix of flip-flops tracks pairwise recency:
- When Way $i$ is accessed, row $i$ is set to all `1`s, and column $i$ is set to all `0`s.
- The LRU line is the one whose row contains all `0`s (smallest numeric value).

### 3. Memory Write Strategies

```text
WRITE HIT OPTIONS:
1. Write-Through:                      2. Write-Back:
   CPU Write ---> [ Cache ]               CPU Write ---> [ Cache (Set Dirty=1) ]
                     |                                         |
                     v (Immediate)                             v (Deferred until Eviction)
                 [ DRAM ]                                  [ DRAM ]
   - Memory always coherent.               - Dramatically reduces memory bus traffic.
   - Requires Write Buffer to avoid stalls.- Requires Dirty bit per line.

WRITE MISS OPTIONS:
1. Write-Allocate (Fetch on Write):    2. No-Write-Allocate (Write Around):
   Miss ---> [ Fetch Block to Cache ]     Miss ---> [ Write Directly to DRAM ]
   Then perform write into cache.          Do not load block into cache.
```

- **Standard Pairings:**
  - **Write-Back + Write-Allocate:** Industry standard for L1, L2, L3 performance caches.
  - **Write-Through + No-Write-Allocate:** Used in real-time embedded systems and GPU framebuffers.

### 4. Average Memory Access Time (AMAT) Formulations

#### Single-Level Cache:
$$AMAT = t_h + m \cdot t_p$$
where:
- $t_h$ is the cache Hit Time.
- $m$ is the Miss Rate ($1 - \text{Hit Rate } h$).
- $t_p$ is the Miss Penalty (latency to fetch block from main DRAM).

#### Miss Penalty Components:
- **Without Load-Through (CPU waits for entire block):**
  $$t_p = t_{\text{tag\_check}} + (\text{Block Size in Words} \times t_{\text{word\_bus}}) + t_{\text{read}}$$
- **With Load-Through / Early Restart (CPU receives requested word first):**
  $$t_p = t_{\text{tag\_check}} + t_{\text{word\_bus}}$$

#### Multi-Level Cache Hierarchy (L1, L2, L3, Main Memory):
Let $m_1, m_2, m_3$ be the **local miss rates** of L1, L2, and L3 caches respectively:
$$AMAT = t_{h1} + m_1 \times \left( t_{h2} + m_2 \times (t_{h3} + m_3 \times t_{\text{memory}}) \right)$$

- **Global Miss Rate:**
  $$m_{\text{global, L2}} = m_1 \times m_2$$
  $$m_{\text{global, L3}} = m_1 \times m_2 \times m_3$$

## Worked Examples / Calculations / Hardware Traces

### Example 1: Replacement Policy Execution Trace (LRU vs. FIFO)

**Problem:** A 2-Way Set-Associative cache consists of a single set ($S=1$, acting as fully associative with 2 lines). Trace the Hit/Miss behavior and line contents for the sequence of block requests:
$$\text{Access Sequence: } 1, 2, 3, 2, 1, 4, 3$$
for both **LRU** and **FIFO** replacement policies.

**Solution:**

#### 1. LRU Execution Trace:

| Step | Request | Line 0 | Line 1 | Result | Explanation / Recency Order (MRU $\to$ LRU) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `1` | Empty | **MISS** | Compulsory miss; loaded into Line 0. Order: $[1]$ |
| 2 | `2` | `1` | `2` | **MISS** | Compulsory miss; loaded into Line 1. Order: $[2, 1]$ |
| 3 | `3` | `3` | `2` | **MISS** | Set full; LRU is `1` $\implies$ Evict `1`, load `3`. Order: $[3, 2]$ |
| 4 | `2` | `3` | `2` | **HIT** | Block `2` found in Line 1. Updated Order: $[2, 3]$ |
| 5 | `1` | `3` | `1` | **MISS** | LRU is `3` $\implies$ Evict `3`, load `1`. Order: $[1, 2]$ |
| 6 | `4` | `4` | `1` | **MISS** | LRU is `2` $\implies$ Evict `2`, load `4`. Order: $[4, 1]$ |
| 7 | `3` | `4` | `3` | **MISS** | LRU is `1` $\implies$ Evict `1`, load `3`. Order: $[3, 4]$ |

- **LRU Summary:** 1 Hit, 6 Misses ($\text{Hit Rate} = 1/7 \approx 14.3\%$).

#### 2. FIFO Execution Trace:

| Step | Request | Line 0 | Line 1 | Result | Explanation / Queue Order (Oldest $\to$ Newest) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `1` | `1` | Empty | **MISS** | Load `1` into Line 0. Queue: $[1]$ |
| 2 | `2` | `1` | `2` | **MISS** | Load `2` into Line 1. Queue: $[1, 2]$ (Oldest is `1`) |
| 3 | `3` | `3` | `2` | **MISS** | Oldest is `1` $\implies$ Evict `1`, load `3`. Queue: $[2, 3]$ |
| 4 | `2` | `3` | `2` | **HIT** | Block `2` found. (FIFO queue unchanged: $[2, 3]$) |
| 5 | `1` | `3` | `1` | **MISS** | Oldest is `2` $\implies$ Evict `2`, load `1`. Queue: $[3, 1]$ |
| 6 | `4` | `4` | `1` | **MISS** | Oldest is `3` $\implies$ Evict `3`, load `4`. Queue: $[1, 4]$ |
| 7 | `3` | `4` | `3` | **MISS** | Oldest is `1` $\implies$ Evict `1`, load `3`. Queue: $[4, 3]$ |

- **FIFO Summary:** 1 Hit, 6 Misses ($\text{Hit Rate} = 14.3\%$).

### Example 2: Multi-Level Cache AMAT Calculation

**Problem:** A processor core has the following memory hierarchy parameters:
- L1 Cache: Hit Time $t_{h1} = 1\text{ ns}$, Local Miss Rate $m_1 = 5\%$.
- L2 Cache: Hit Time $t_{h2} = 6\text{ ns}$, Local Miss Rate $m_2 = 15\%$.
- L3 Cache: Hit Time $t_{h3} = 20\text{ ns}$, Local Miss Rate $m_3 = 25\%$.
- Main Memory: Access Latency $t_{\text{memory}} = 80\text{ ns}$.

Calculate:
1. The global miss rate of the L3 cache.
2. The Average Memory Access Time (AMAT) of the processor.

**Solution:**
1. **Global L3 Miss Rate:**
   $$m_{\text{global, L3}} = m_1 \times m_2 \times m_3 = 0.05 \times 0.15 \times 0.25 = 0.001875 = 0.1875\%$$

2. **AMAT Calculation:**
   Using the recursive AMAT formula:
   $$\text{L3 Penalty} = t_{h3} + m_3 \times t_{\text{memory}} = 20\text{ ns} + (0.25 \times 80\text{ ns}) = 20 + 20 = 40\text{ ns}$$
   $$\text{L2 Penalty} = t_{h2} + m_2 \times (\text{L3 Penalty}) = 6\text{ ns} + (0.15 \times 40\text{ ns}) = 6 + 6 = 12\text{ ns}$$
   $$AMAT = t_{h1} + m_1 \times (\text{L2 Penalty}) = 1\text{ ns} + (0.05 \times 12\text{ ns}) = 1 + 0.60 = 1.60\text{ ns}$$

*Result:* The multi-level cache hierarchy achieves an effective memory access latency of just $1.60\text{ ns}$, approaching the speed of L1 SRAM despite an $80\text{ ns}$ DRAM penalty.

## Complexity Analysis / Common Pitfalls

- **Confusing Local vs. Global Miss Rates:** Local miss rate measures misses relative to the accesses reaching that specific cache level ($m_2 = \text{L2 Misses} / \text{L1 Misses}$). Global miss rate measures misses relative to total CPU memory requests ($m_{\text{global}} = \text{L2 Misses} / \text{Total CPU Requests}$). Using local miss rates in global formulas produces severe errors.
- **Write-Through Buffer Saturation:** While Write-Through appears simple, a burst of consecutive write instructions can fill the Write Buffer faster than main memory can drain it, causing the CPU core to stall completely.
- **Belady's Anomaly in FIFO:** In FIFO replacement policies, increasing cache capacity can paradoxically *increase* the total number of cache misses for specific access sequences. LRU is immune to Belady's anomaly because it is a stack algorithm.

## Multiple Choice Questions

1. Which cache miss classification represents misses that occur regardless of cache capacity and associativity?
    - **A)** Capacity Misses
    - **B)** Conflict Misses
    - **C)** Compulsory (Cold) Misses
    - **D)** Coherence Misses

2. What is the key operational difference between Write-Through and Write-Back cache write policies?
    - **A)** Write-Through writes to cache and main memory simultaneously, while Write-Back writes only to cache and updates main memory upon eviction
    - **B)** Write-Through requires a Dirty bit, while Write-Back does not
    - **C)** Write-Through can only be used with Fully Associative caches
    - **D)** Write-Back requires all reads to be forwarded through the ALU

3. In a system with L1 Hit Time $= 1.2\text{ ns}$, L1 Miss Rate $= 4\%$, and Main Memory Penalty $= 50\text{ ns}$, what is the Average Memory Access Time (AMAT)?
    - **A)** $1.20\text{ ns}$
    - **B)** $2.00\text{ ns}$
    - **C)** $3.20\text{ ns}$
    - **D)** $5.20\text{ ns}$

4. What is the purpose of the Dirty bit ($D$) in a Write-Back cache entry?
    - **A)** To signal that the data has experienced a parity error
    - **B)** To indicate that the cache block has been modified and must be written to main memory when evicted
    - **C)** To lock the line from being replaced by the LRU algorithm
    - **D)** To prevent instruction fetches from accessing data lines

5. Which cache replacement policy is provably immune to Belady's Anomaly?
    - **A)** First-In, First-Out (FIFO)
    - **B)** Least Recently Used (LRU)
    - **C)** Random Replacement
    - **D)** Direct Mapping

### Answer Key & Explanations

1. **C**. Compulsory misses happen on the initial reference to a block of memory and cannot be eliminated by increasing cache capacity or associativity.
2. **A**. Write-Through updates main memory immediately on every write, keeping memory coherent. Write-Back updates only the cache and defers memory writes until the modified dirty line is evicted.
3. **C**. $AMAT = t_h + m \cdot t_p = 1.2\text{ ns} + (0.04 \times 50\text{ ns}) = 1.2 + 2.0 = 3.20\text{ ns}$.
4. **B**. The Dirty bit tracks modification state. If $D=1$, the line contains data newer than main memory and must be written back to DRAM upon replacement; if $D=0$, the line can simply be overwritten.
5. **B**. LRU belongs to the class of stack algorithms (where the contents of an $n$-block cache are always a strict subset of an $(n+1)$-block cache), guaranteeing that expanding cache size will never increase miss counts.

## References & Navigation

- **Previous Topic:** [[Cache Memory Principles & Mapping Architectures]]
- **Next Topic:** [[Virtual Memory & Address Translation (Paging & TLB)]]
- **Related Notes:** [[Memory System Organization & Hierarchy]], [[Functional Units & Performance Fundamentals]]

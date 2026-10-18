---
id: csarch2_module_12_memory_hierarchy
type: note
course: CSARCH2
topic: "Memory System Organization & Hierarchy"
status: completed
---

# Module 12: Memory System Organization & Hierarchy

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Memory System Organization & Hierarchy]]

---

## Overview

> The performance of modern computing systems is fundamentally bounded by the **Memory Wall**—the widening latency gap between high-speed CPU execution units and high-capacity storage subsystems. Because no single semiconductor technology can simultaneously achieve picosecond access times, terabyte capacities, non-volatility, and low unit cost, computer architects construct a tiered **Memory Hierarchy**. This module analyzes the physical properties of modern memory technologies (SRAM, DRAM, SDRAM/DDR, Flash), formalizes the **Principle of Locality** (Temporal and Spatial), and establishes the quantitative trade-offs governing memory access latency, bandwidth, capacity, and cost per bit.

## Key Definitions

- **Memory Hierarchy:** A tiered architectural arrangement of storage technologies organized such that levels closest to the CPU offer the fastest access speeds and smallest capacities, while lower levels provide progressively larger capacities at lower costs and longer latencies.
- **Static RAM (SRAM):** A volatile memory technology that stores each bit using a 6-transistor (6T) cross-coupled bistable inverter latch, offering sub-nanosecond access times without requiring periodic refresh cycles.
- **Dynamic RAM (DRAM):** A volatile memory technology that stores each bit as an electrical charge on a microscopic capacitor paired with an access transistor (1T-1C), requiring periodic read-and-rewrite **refresh cycles** due to charge leakage.
- **Row Address Strobe (RAS) / Column Address Strobe (CAS):** Control strobes used in DRAM address multiplexing to latch the row address and column address across shared pin lines in two consecutive steps.
- **Double Data Rate (DDR) SDRAM:** Synchronous DRAM that transfers data words on both the rising and falling edges of the memory clock bus, doubling effective data bandwidth.
- **Temporal Locality:** The empirical tendency of a program to access the exact same memory locations repeatedly within a short temporal window (e.g., loop counters, hot code paths, stack frames).
- **Spatial Locality:** The empirical tendency of a program to access memory locations physically adjacent to recently accessed addresses (e.g., linear array traversals, sequential instruction streams).

## Theoretical Framework / Core Concepts

### 1. The Architectural Memory Hierarchy Pyramid

```text
+-------------------------------------------------------------------------+
|                        THE MEMORY HIERARCHY PYRAMID                     |
|                                                                         |
|                     / \                                                 |
|                    /   \        Level 0: CPU Registers                  |
|                   / CPU \       (< 1 ns, 1 - 2 KB, ~$10,000/GB)         |
|                  / Regs  \                                              |
|                 /---------\     Level 1: L1 Cache (On-Chip SRAM)        |
|                /  L1 Cache \    (0.5 - 2 ns, 32 - 128 KB)               |
|               /-------------\   Level 2: L2 Cache (On-Chip SRAM)        |
|              /   L2 Cache    \  (3 - 10 ns, 512 KB - 2 MB)              |
|             /-----------------\ Level 3: L3 Cache (Shared SRAM)         |
|            /     L3 Cache      \ (10 - 25 ns, 16 - 128 MB)              |
|           /---------------------\                                       |
|          /     Main Memory       \ Level 4: Main DRAM (DDR5 SDRAM)      |
|         /     (DDR4 / DDR5)       \ (50 - 100 ns, 16 - 128 GB, ~$3/GB)  |
|        /---------------------------\                                    |
|       /      Secondary Storage      \ Level 5: NVMe SSD / NAND Flash    |
|      /      (NVMe / SATA Flash)      \ (10 - 100 us, 512 GB - 8 TB)     |
|     /---------------------------------\                                 |
|    /         Tertiary Storage          \ Level 6: Magnetic HDD / Tape   |
|   /      (Magnetic Disk, Cloud)         \ (5 - 15 ms, 10 - 100 TB)      |
|  +---------------------------------------+                              |
+-------------------------------------------------------------------------+
```

#### Hierarchy Scaling Trends:
Moving from top (Registers) to bottom (Tertiary Disk):
1. **Access Latency:** Increases exponentially (from $< 1\text{ ns}$ to $10\text{ ms}$, a factor of $10^7$).
2. **Storage Capacity:** Increases exponentially (from kilobytes to terabytes).
3. **Cost per Bit ($\$/\text{bit}$):** Decreases by orders of magnitude.
4. **Access Frequency by CPU:** Decreases sharply due to filtering by upper levels.

### 2. Physical Memory Technologies Compared

```text
SRAM Cell (6T Bistable Latch):        DRAM Cell (1T-1C Capacitor):
      Vdd       Vdd                                Word Line (Row)
       |         |                                      |
     +---+     +---+                                    v
     | P |     | P |                              +-----------+
     +---+     +---+                              | Transistor|
       |         |                                +-----------+
       +----+----+                                      |
       |    |    |                                      v
     +---+  |  +---+                              +-----------+
BL---| N |  +--| N |---~BL                        | Storage   | (Capacitor C)
     +---+     +---+                              | Capacitor |
       |         |                                +-----------+
      Gnd       Gnd                                     |
                                                       Gnd
- No refresh needed; fast; low density.   - Must refresh; tiny cell; high density.
```

| Metric | Static RAM (SRAM) | Dynamic RAM (DRAM) | NAND Flash Memory | Magnetic Hard Disk |
| :--- | :--- | :--- | :--- | :--- |
| **Cell Structure** | 6 Transistors (6T) | 1 Transistor, 1 Cap (1T-1C) | 1 Floating-Gate Transistor | Magnetic Domain on Platter |
| **Typical Latency** | $0.5\text{ to }2.5\text{ ns}$ | $50\text{ to }80\text{ ns}$ | $25\text{ to }100\ \mu\text{s}$ | $5\text{ to }15\text{ ms}$ |
| **Data Volatility** | Volatile | Volatile | Non-Volatile | Non-Volatile |
| **Periodic Refresh** | No | Yes (Every 64 ms) | No | No |
| **Relative Cost/GB** | Very High ($\sim \$1,000$) | Moderate ($\sim \$3$) | Low ($\sim \$0.08$) | Extremely Low ($\sim \$0.02$) |
| **Primary Placement**| L1, L2, L3 Caches | Primary System Memory | SSD, NVMe Drives | Backup / Mass Storage |

### 3. The Principle of Locality

The effectiveness of the memory hierarchy rests on the empirical observation that programs do not access all code and data uniformly:

```text
Memory Address Space
  ^
  |        [ Loop Code Block ]  <--- High Temporal Locality (Instructions executed 10,000x)
  |        +-----------------+
  |        | Inst 1, 2, 3, 4 |
  |        +-----------------+
  |
  |        [ Array Buffer ]     <--- High Spatial Locality (Elements A[0], A[1], A[2] in sequence)
  |        +-----------------+
  |        | A[0]| A[1]| A[2]|
  |        +-----------------+
  +--------------------------------------------------------> Time
```

1. **Temporal Locality (Locality in Time):**
   - If an address is accessed at time $t$, it is highly likely to be accessed again at time $t + \Delta t$.
   - *Exploited by:* Retaining recently accessed data blocks in high-speed upper cache levels.
2. **Spatial Locality (Locality in Space):**
   - If address $A$ is accessed at time $t$, nearby addresses $A \pm k$ are highly likely to be accessed soon.
   - *Exploited by:* Fetching multi-word **cache blocks (lines)** of 32, 64, or 128 contiguous bytes whenever a single word is referenced.

## Worked Examples / Calculations / Hardware Traces

### Example 1: DRAM Refresh Overhead Calculation

**Problem:** A 16 GiB DDR4 DRAM module contains 65,536 rows per bank across 8 banks. The memory controller must refresh all rows every $64\text{ ms}$ to prevent capacitor charge degradation.
- Each row refresh operation takes $35\text{ ns}$ of busy bus time ($t_{\text{RFC}}$).

Calculate:
1. The total time spent refreshing the DRAM module per $64\text{ ms}$ retention interval.
2. The percentage of total memory availability lost to refresh cycles (the refresh overhead).

**Solution:**
1. **Total Refresh Time per Interval:**
   $$\text{Total Rows} = 65,536\text{ rows}$$
   $$\text{Total Refresh Time} = 65,536 \times 35 \times 10^{-9}\text{ s} \approx 0.00229376\text{ seconds} = 2.294\text{ ms}$$

2. **Refresh Overhead Percentage:**
   $$\text{Overhead} = \frac{\text{Total Refresh Time}}{\text{Refresh Interval}} \times 100\% = \frac{2.294\text{ ms}}{64.0\text{ ms}} \times 100\% \approx 3.58\%$$

*Analysis:* Refresh cycles consume approximately $3.58\%$ of total memory subsystem bandwidth, during which regular CPU memory read/write requests are queued or stalled.

### Example 2: Analyzing Code for Temporal vs Spatial Locality

**Problem:** Analyze the following matrix processing algorithm in C for spatial and temporal locality on an $N \times N$ integer matrix:

```c
int sum = 0;
for (int j = 0; j < N; j++) {
    for (int i = 0; i < N; i++) {
        sum += matrix[i][j]; // Column-major access
    }
}
```

**Solution:**
1. **Scalar Variable `sum`:**
   - **Temporal Locality:** **Extremely High**. The variable `sum` is read and updated on every iteration of the inner loop ($N^2$ times).
   - **Spatial Locality:** N/A (Scalar stored in register).
2. **Matrix Array `matrix[i][j]` (Stored in Row-Major order in C memory):**
   - In C, 2D arrays are stored in memory row-by-row: `matrix[0][0], matrix[0][1], ..., matrix[0][N-1], matrix[1][0], ...`
   - The loop iterates over `i` in the inner loop: successive memory addresses accessed are separated by $N \times 4\text{ bytes}$ (stride $= N$).
   - **Spatial Locality:** **Extremely Poor**. Because stride $= N$, every read misses the current cache block for large $N$.
   - **Optimization:** Inverting loop nest order (`for i` outer, `for j` inner) converts the stride to $+1$ (sequential access), maximizing spatial locality and improving cache hit rate from $< 10\%$ to $> 95\%$.

## Complexity Analysis / Common Pitfalls

- **Row-Major vs Column-Major Memory Traversal:** Accessing multi-dimensional arrays along the wrong dimension (stride-$N$ access) causes continuous cache misses because hardware loads contiguous multi-word lines that are never utilized before eviction.
- **Volatile vs Non-Volatile Disparities:** A common misconception is assuming Flash memory functions identical to DRAM. Flash requires block-level erasure cycles prior to page-level writes, creating an asymmetric write-latency penalty not present in DRAM.
- **SRAM Density vs Latency:** Attempting to build gigabytes of primary memory out of 6T SRAM cells is physically unviable because 6 transistors per bit consume massive silicon die real estate, driving wafer fabrication costs beyond commercial feasibility.

## Multiple Choice Questions

1. Which memory technology stores data bits in cross-coupled transistor inverters without requiring refresh cycles?
    - **A)** Dynamic RAM (DRAM)
    - **B)** Static RAM (SRAM)
    - **C)** NAND Flash
    - **D)** EEPROM

2. What is the fundamental principle exploited when a CPU fetches an entire 64-byte cache block upon missing a single 4-byte word?
    - **A)** Temporal Locality
    - **B)** Spatial Locality
    - **C)** Amdahl's Law
    - **D)** Dennard Scaling

3. In a modern computer memory hierarchy, which storage tier offers the lowest latency and highest cost per bit?
    - **A)** Main DDR5 DRAM
    - **B)** L1 On-Chip Cache
    - **C)** NVMe Solid-State Drive
    - **D)** Internal CPU Registers

4. Why must Dynamic RAM (DRAM) undergo periodic refresh cycles?
    - **A)** The transistors lose their clock synchronization
    - **B)** The microscopic storage capacitors leak electrical charge over time
    - **C)** The row address decoders overheat
    - **D)** The magnetic polarization decays

5. If an algorithm exhibits high Temporal Locality, how should the memory hierarchy be configured to optimize its performance?
    - **A)** Retain recently accessed blocks in the fastest, nearest cache levels
    - **B)** Increase the block transfer size to 4096 bytes
    - **C)** Bypass the cache and read directly from secondary storage
    - **D)** Disable pipelined instruction decoding

### Answer Key & Explanations

1. **B**. Static RAM (SRAM) uses a 6-transistor bistable latch that retains data indefinitely as long as power is applied, without needing refresh cycles.
2. **B**. Spatial locality indicates that memory addresses adjacent to the current address will likely be requested soon; loading an entire block (line) brings these adjacent words into cache ahead of time.
3. **D**. CPU internal registers operate at processor core clock speeds ($< 1\text{ ns}$) and have the highest cost per bit of any storage in the system.
4. **B**. DRAM stores bits as tiny capacitive charges ($1\text{T}-1\text{C}$). Sub-threshold silicon leakage causes these charges to dissipate within milliseconds if not periodically refreshed.
5. **A**. High temporal locality means the same memory locations are reused frequently; keeping these items in high-level L1/L2 caches minimizes repetitive trips to slower main memory.

## References & Navigation

- **Previous Topic:** [[Control Unit Design & Microprogramming]]
- **Next Topic:** [[Cache Memory Principles & Mapping Architectures]]
- **Related Notes:** [[Functional Units & Performance Fundamentals]], [[Cache Replacement Policies & Write Strategies]]

---
id: csarch2_module_01_performance
type: note
course: CSARCH2
topic: "Functional Units & Performance Fundamentals"
status: completed
---

# Module 01: Functional Units & Performance Fundamentals

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Functional Units & Performance Fundamentals]]

---

## Overview

> Processor performance is evaluated by analyzing how efficiently hardware executes a given workload. This module formalizes the core functional units comprising digital computer systems—the Arithmetic Logic Unit (ALU), Control Unit (CU), Register File, Memory, and Input/Output subsystems—and establishes the quantitative mathematical models governing CPU execution time, Cycles Per Instruction (CPI), Amdahl's Law, and system bus throughput. Mastering these performance formulas provides the analytical tools required to evaluate microarchitectural design trade-offs.

## Key Definitions

- **Arithmetic Logic Unit (ALU):** The combinational and sequential execution engine that performs arithmetic operations (addition, subtraction, multiplication, division) and bitwise logical operations (AND, OR, XOR, shifts).
- **Control Unit (CU):** The digital state machine that orchestrates instruction execution by decoding opcodes and emitting timed control signals to the datapath and system buses.
- **Clock Cycle Time ($T$):** The duration of one complete electrical clock oscillation period, measured in seconds (typically nanoseconds, $1\text{ ns} = 10^{-9}\text{ s}$, or picoseconds, $1\text{ ps} = 10^{-12}\text{ s}$).
- **Clock Frequency / Rate ($f$):** The number of clock oscillations per second, expressed in Hertz ($\text{Hz}$), where $f = \frac{1}{T}$.
- **Cycles Per Instruction (CPI):** The average number of clock cycles required by the processor to execute a single instruction across a given program workload.
- **Million Instructions Per Second (MIPS):** A raw processing rate metric defined as the number of instructions executed per second divided by $10^6$.
- **Amdahl's Law:** A fundamental law of parallel computing stating that the maximum overall speedup achieved by optimizing a system component is bounded by the fraction of execution time that utilizes that enhanced component.
- **System Bus:** A shared parallel electrical communication highway consisting of an **Address Bus**, **Data Bus**, and **Control Bus** connecting the CPU, Memory, and I/O devices.

## Theoretical Framework / Core Concepts

### 1. Functional Units of a Digital Computer

A classical digital computer is structured into five primary functional blocks:

```text
+--------------------------------------------------------------------------+
|                              CENTRAL PROCESSING UNIT                     |
|                                                                          |
|  +--------------------+     Internal CPU Bus      +-------------------+  |
|  |    Control Unit    | <-----------------------> | Register File     |  |
|  |  (Sequencer / ROM) |                           | (PC, IR, GPRs)    |  |
|  +--------------------+                           +-------------------+  |
|            |                                                |            |
|            v                                                v            |
|  +--------------------------------------------------------------------+  |
|  |                     Arithmetic Logic Unit (ALU)                    |  |
|  +--------------------------------------------------------------------+  |
+--------------------------------------------------------------------------+
          ^                                                   ^
          | Address / Control Lines                           | Data Lines
          v                                                   v
+--------------------------------------------------------------------------+
|                             SYSTEM BUS TOPOLOGY                          |
|  - Address Bus (Unidirectional from CPU: defines memory location)        |
|  - Data Bus (Bidirectional: carries instructions and data operands)      |
|  - Control Bus (Bidirectional: Read, Write, Clock, Reset, Interrupts)    |
+--------------------------------------------------------------------------+
          ^                                                   ^
          |                                                   |
          v                                                   v
+--------------------+                             +--------------------+
|   Primary Memory   |                             |   Input / Output   |
|   (SRAM / DRAM)    |                             | (Disk, NIC, Ports) |
+--------------------+                             +--------------------+
```

1. **Input Unit:** Transducers and peripheral controllers that digitize external data streams into binary words for storage.
2. **Memory Unit:** High-speed storage hierarchy that holds active machine instructions and data buffers.
3. **ALU:** High-speed functional hardware that executes arithmetic computations and boolean evaluations.
4. **Output Unit:** Peripherals that convert binary output from memory into external human- or machine-readable signals.
5. **Control Unit:** Master timing supervisor that fetches instructions sequentially from memory, interprets their operational fields, and gates data through internal registers.

### 2. The Fundamental CPU Performance Equation

CPU execution time for a program is the product of three interdependent variables:

$$CPU\text{ Time} = \text{Instruction Count } (I) \times \text{Average Cycles Per Instruction } (CPI) \times \text{Clock Cycle Time } (T)$$

Since $T = \frac{1}{f}$:
$$CPU\text{ Time} = \frac{I \times CPI}{f}$$

#### Architectural Dependencies of the Performance Equation:
- **Instruction Count ($I$):** Determined by the software algorithm, high-level language, and compiler optimization, as well as the Instruction Set Architecture (ISA).
- **Cycles Per Instruction ($CPI$):** Determined by the microarchitecture design (e.g., pipelining, cache hit rates, ALU latency) and instruction mix.
- **Clock Cycle Time ($T$) / Frequency ($f$):** Determined by semiconductor technology, critical path circuit delay in the ALU/datapath, and transistor layout.

### 3. Calculating Average CPI for Multi-Class Instruction Mixes

In real-world workloads, different classes of instructions require different numbers of clock cycles to complete:

$$CPI_{\text{avg}} = \frac{\sum_{j=1}^{n} (IC_j \times CPI_j)}{I_{\text{total}}} = \sum_{j=1}^{n} \left( \frac{IC_j}{I_{\text{total}}} \times CPI_j \right)$$

where:
- $IC_j$ is the instruction count of instruction class $j$.
- $CPI_j$ is the clock cycle cost of instruction class $j$.
- $\frac{IC_j}{I_{\text{total}}} = F_j$ is the relative execution frequency of class $j$.

### 4. MIPS and MFLOPS: Definitions and Limitations

- **MIPS (Million Instructions Per Second):**
  $$MIPS = \frac{I}{CPU\text{ Time} \times 10^6} = \frac{f}{CPI \times 10^6}$$
  *Pitfall:* MIPS cannot be used to compare processors with different ISAs because a complex CISC instruction may perform the equivalent work of multiple simple RISC instructions.

- **MFLOPS (Million Floating-Point Operations Per Second):**
  $$MFLOPS = \frac{\text{Number of Floating-Point Operations}}{CPU\text{ Time} \times 10^6}$$
  Measures floating-point execution intensity in scientific computing workloads.

### 5. Amdahl's Law for Speedup Analysis

When a specific hardware enhancement improves a fraction $F$ of the total execution time by a speedup factor of $k$, the new execution time and overall speedup $S$ are:

$$T_{\text{enhanced}} = T_{\text{original}} \times \left( (1 - F) + \frac{F}{k} \right)$$

$$S_{\text{overall}} = \frac{T_{\text{original}}}{T_{\text{enhanced}}} = \frac{1}{(1 - F) + \frac{F}{k}}$$

As $k \to \infty$ (infinite speedup on the enhanced portion), the theoretical maximum speedup is asymptotically bounded:
$$S_{\max} = \frac{1}{1 - F}$$

```text
Amdahl's Law Speedup Ceiling:
Speedup S
   ^
10 |                                   -------------- Limit: 1 / (1 - F)
   |                             . - -'
 5 |                       . - -'
   |                 . - -'
 2 |           . - -'
 1 |-----+-----|-----|-----|-----|-----|-----> Acceleration Factor k
   0     2     4     8    16    32    64
```

### 6. System Bus Bandwidth and Timing Calculations

The system bus capacity dictates how rapidly data moves between the CPU, caches, and memory.

$$\text{Bus Clock Period } T_{\text{bus}} = \frac{1}{f_{\text{bus}}}$$

$$\text{Peak Bus Throughput / Bandwidth } = \text{Bus Data Width (Bytes)} \times f_{\text{bus}}$$

For multi-word burst transfers involving an initial address handshake overhead of $N_{\text{addr}}$ cycles followed by $N_{\text{data}}$ cycles per word:
$$\text{Total Bus Transfer Time} = (N_{\text{addr}} + W \times N_{\text{data}}) \times T_{\text{bus}}$$
where $W$ is the number of data words transferred in the burst.

## Worked Examples / Calculations / Hardware Traces

### Example 1: Multi-Class Workload CPI and Execution Time Analysis

**Problem:** A processor runs at a clock frequency of $2.5\text{ GHz}$ ($T = 0.4\text{ ns}$). A benchmark program containing $50\text{ million instructions}$ exhibits the following instruction distribution:

| Instruction Class | Frequency ($F_j$) | Cycle Cost ($CPI_j$) |
| :--- | :--- | :--- |
| Arithmetic & Logic | $45\%$ | 1 |
| Load / Store Memory | $25\%$ | 4 |
| Branch / Jump | $20\%$ | 2 |
| Floating-Point Multiply | $10\%$ | 8 |

Calculate:
1. The overall average CPI.
2. The total CPU execution time.
3. The MIPS rating of the processor on this benchmark.

**Solution:**
1. **Average CPI:**
   $$CPI_{\text{avg}} = (0.45 \times 1) + (0.25 \times 4) + (0.20 \times 2) + (0.10 \times 8)$$
   $$CPI_{\text{avg}} = 0.45 + 1.00 + 0.40 + 0.80 = 2.65\text{ cycles/instruction}$$

2. **CPU Execution Time:**
   $$CPU\text{ Time} = \frac{I \times CPI}{f} = \frac{(50 \times 10^6) \times 2.65}{2.5 \times 10^9\text{ Hz}} = \frac{132.5 \times 10^6}{2.5 \times 10^9} = 0.053\text{ seconds} = 53\text{ ms}$$

3. **MIPS Rating:**
   $$MIPS = \frac{f}{CPI \times 10^6} = \frac{2.5 \times 10^9}{2.65 \times 10^6} \approx 943.40\text{ MIPS}$$

### Example 2: Amdahl's Law Speedup Evaluation

**Problem:** In a rendering application, floating-point vector calculations account for $70\%$ of total execution time. An engineering team is considering two microarchitectural improvements:
- **Proposal A:** Implement a specialized SIMD vector unit that accelerates vector calculations by $5\times$, increasing total manufacturing cost by $15\%$.
- **Proposal B:** Redesign the memory pipeline, accelerating non-vector instructions by $2.5\times$ (applicable to the remaining $30\%$ of runtime), with no cost increase.

Evaluate which proposal yields higher overall speedup.

**Solution:**
- **Proposal A ($F = 0.70, k = 5$):**
  $$S_A = \frac{1}{(1 - 0.70) + \frac{0.70}{5}} = \frac{1}{0.30 + 0.14} = \frac{1}{0.44} \approx 2.273\times$$

- **Proposal B ($F = 0.30, k = 2.5$):**
  $$S_B = \frac{1}{(1 - 0.30) + \frac{0.30}{2.5}} = \frac{1}{0.70 + 0.12} = \frac{1}{0.82} \approx 1.220\times$$

*Conclusion:* Proposal A delivers significantly higher overall speedup ($2.273\times$ vs $1.220\times$) because it targets the dominant $70\%$ fraction of the workload.

### Example 3: System Bus Burst Transfer Calculation

**Problem:** A 64-bit wide system bus ($8\text{ bytes}$) operates at a clock frequency of $400\text{ MHz}$. Reading a 64-byte cache block from main memory requires:
- 3 bus cycles to transmit the address and establish the handshake.
- 1 bus cycle per 64-bit word transferred in synchronous burst mode.

Calculate:
1. The bus cycle period.
2. The total time required to transfer the 64-byte block.
3. The effective data transfer rate (in MB/s).

**Solution:**
1. **Bus Cycle Period:**
   $$T_{\text{bus}} = \frac{1}{400 \times 10^6\text{ Hz}} = 2.5\text{ ns}$$

2. **Words in 64-byte block:**
   $$W = \frac{64\text{ bytes}}{8\text{ bytes/word}} = 8\text{ words}$$

3. **Total Bus Cycles:**
   $$\text{Cycles} = N_{\text{addr}} + W \times N_{\text{data}} = 3 + (8 \times 1) = 11\text{ cycles}$$

4. **Total Transfer Time:**
   $$t_{\text{transfer}} = 11 \times 2.5\text{ ns} = 27.5\text{ ns}$$

5. **Effective Transfer Rate:**
   $$\text{Effective Throughput} = \frac{64\text{ bytes}}{27.5 \times 10^{-9}\text{ s}} \approx 2,327.27\text{ MB/s} \approx 2.327\text{ GB/s}$$

## Complexity Analysis / Common Pitfalls

- **MIPS as an Absolute Performance Metric:** Comparing two processors solely by MIPS can be deceptive. A RISC processor executing simple instructions at 1200 MIPS may execute more instructions than a CISC processor at 800 MIPS to achieve the same task, resulting in slower wall-clock completion time.
- **Neglecting the Non-Enhanced Fraction in Amdahl's Law:** Engineers frequently over-optimize a sub-component with extreme speedup ($k = 100\times$) without realizing that if that component only represents $5\%$ of total runtime ($F = 0.05$), the maximum system speedup is capped at $\frac{1}{1 - 0.05} = 1.0526\times$ (a mere $5.26\%$ gain).
- **Ignoring Bus Overhead Cycles:** When calculating bus data transfer rates, calculating raw peak throughput ($\text{Width} \times f$) ignores mandatory address transmission and arbitration cycles, leading to over-optimistic performance estimates.

## Multiple Choice Questions

1. A benchmark program's execution time on a $3.0\text{ GHz}$ CPU is 12 seconds with an average CPI of 1.8. What is the total instruction count of the program?
    - **A)** $1.5 \times 10^{10}$ instructions
    - **B)** $2.0 \times 10^{10}$ instructions
    - **C)** $3.6 \times 10^{10}$ instructions
    - **D)** $6.48 \times 10^{10}$ instructions

2. If an architectural enhancement accelerates database search operations by $4\times$, and search operations consume $60\%$ of total execution time, what is the overall system speedup according to Amdahl's Law?
    - **A)** $1.82\times$
    - **B)** $2.00\times$
    - **C)** $2.35\times$
    - **D)** $2.86\times$

3. Why is MFLOPS a more reliable metric than MIPS when benchmarking scientific computation engines?
    - **A)** Floating-point operations always execute in exactly one clock cycle
    - **B)** It normalizes performance by counting standard arithmetic floating-point operations rather than arbitrary instruction counts
    - **C)** It includes branch prediction accuracy within the formula
    - **D)** It directly measures semiconductor transistor switching latency

4. A 32-bit wide memory bus operates at $200\text{ MHz}$. What is the theoretical peak data bandwidth of this bus?
    - **A)** $400\text{ MB/s}$
    - **B)** $600\text{ MB/s}$
    - **C)** $800\text{ MB/s}$
    - **D)** $1600\text{ MB/s}$

5. Under the CPU performance equation, which variable is primarily determined by compiler optimization and algorithm design?
    - **A)** Clock cycle time ($T$)
    - **B)** Clock frequency ($f$)
    - **C)** Instruction Count ($I$)
    - **D)** Transistor gate delay

### Answer Key & Explanations

1. **B**. From $CPU\text{ Time} = \frac{I \times CPI}{f}$, we rearrange for $I$:
$$I = \frac{CPU\text{ Time} \times f}{CPI} = \frac{12\text{ s} \times 3.0 \times 10^9\text{ Hz}}{1.8} = \frac{36 \times 10^9}{1.8} = 2.0 \times 10^{10}\text{ instructions}$$
2. **A**. Using Amdahl's Law with $F = 0.60$ and $k = 4$:
$$S = \frac{1}{(1 - 0.60) + \frac{0.60}{4}} = \frac{1}{0.40 + 0.15} = \frac{1}{0.55} \approx 1.818\times \approx 1.82\times$$
3. **B**. MFLOPS measures the throughput of standardized arithmetic operations (additions, multiplications of real numbers) necessary to solve a mathematical problem, avoiding the instruction-set composition disparities that invalidate MIPS.
4. **C**. A 32-bit bus transfers $\frac{32}{8} = 4\text{ bytes}$ per clock cycle. Peak bandwidth $= 4\text{ bytes} \times 200 \times 10^6\text{ cycles/s} = 800\text{ MB/s}$.
5. **C**. The total number of instructions executed ($I$) is directly determined by the algorithmic implementation and the compiler's code generation/optimization strategies. Clock parameters ($f, T$) are determined by circuit design and semiconductor technology.

## References & Navigation

- **Previous Topic:** [[Course Overview & Architecture Foundations]]
- **Next Topic:** [[Integer Representation & Fixed-Point Arithmetic]]
- **Related Notes:** [[Processing Unit Organization & Single-Bus Datapath]], [[Memory System Organization & Hierarchy]]

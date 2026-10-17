---
id: csarch2_module_00_foundations
type: note
course: CSARCH2
topic: "Course Overview & Architecture Foundations"
status: completed
---

# Module 00: Course Overview & Architecture Foundations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Course Overview & Architecture Foundations]]

---

## Overview

> Computer Systems Architecture 2 (CSARCH2) explores the critical bridge between software specifications and physical hardware execution. This course analyzes the internal design and mathematical mechanics of modern computing systems, focusing on low-level arithmetic logic unit (ALU) algorithms, data representation standards, processor datapath and control unit microprogramming, and memory hierarchy optimization. Understanding these architectural foundations enables computer scientists to reason about execution efficiency, hardware resource constraints, and hardware-software co-design principles.

## Key Definitions

- **Computer Architecture:** The conceptual structure and functional behavior of a computer system as seen by the assembly-level programmer, encompassing the Instruction Set Architecture (ISA), addressing modes, register formats, and data representations.
- **Computer Organization (Microarchitecture):** The operational units and physical interconnections that implement the architectural specifications, including bus topologies, ALU adder circuits, pipeline stages, and control logic implementations.
- **Hardware Implementation:** The specific physical realization of microarchitectural components using silicon semiconductor processes, transistor lithography (e.g., CMOS, FinFET, GAAFET), and circuit layout topologies.
- **Stored-Program Concept:** The architectural principle where both program instructions and user data reside together in shared, addressable primary memory, enabling arbitrary execution branching and dynamic code loading.
- **Moore's Law:** An empirical observation by Gordon Moore stating that the number of transistors packed onto a dense integrated circuit doubles approximately every 18 to 24 months.
- **Dennard Scaling:** The principle of MOSFET scaling asserting that as transistors become smaller, their power density remains constant because operating voltage and current scale downward proportionally with physical dimensions.
- **Power Wall:** The practical constraint in modern microprocessors where dynamic power dissipation ($P = C \cdot V^2 \cdot f$) and thermal limits prevent further increases in single-core clock frequencies, forcing industry transitions toward multicore and domain-specific architectures.

## Theoretical Framework / Core Concepts

### 1. The Architectural Hierarchy: Architecture vs. Organization vs. Implementation

In computer systems engineering, a clear distinction is maintained between the layers of abstraction:

```text
+-----------------------------------------------------------------------+
| Application Software & High-Level Languages (C, Python, Java, Rust)   |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
| Computer Architecture (ISA): Registers, Instructions, Addressing Modes|
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
| Computer Organization (Microarchitecture): Single-Bus Datapath,       |
| Pipelining, Control Store, Cache Mapping, ALU Hardware Engines        |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
| Physical Hardware Implementation: CMOS Gates, FinFETs, 3nm Silicon    |
+-----------------------------------------------------------------------+
```

1. **Architecture Level (What the machine does):**
   - Visible to the compiler writer and assembly programmer.
   - Includes the instruction set, opcode formats, operand types, memory addressing modes, and architectural register sets (e.g., `EAX`, `EBX`, `PC`, `FLAGS`).
   - Guarantees backward binary compatibility across multiple chip generations (e.g., x86-64, ARMv8, RISC-V).

2. **Organization Level (How the machine executes it):**
   - Invisible to user-level code.
   - Includes the number of internal data buses, pipeline depth, branch prediction mechanisms, cache associativity, and microcode control stores.
   - Different microarchitectures can execute the exact same ISA with vastly different performance profiles.

3. **Implementation Level (The physical substrate):**
   - Pertains to semiconductor device physics, lithography scale (e.g., 5 nm, 3 nm, 2 nm GAAFET), transistor switching delays, voltage thresholds, and thermal dissipation packaging.

### 2. The Stored-Program Paradigm: Von Neumann vs. Harvard

The stored-program concept forms the bedrock of universal computation. Prior to this innovation, computers were programmed by manually rewiring patch cables or physically altering hardware switches (e.g., ENIAC).

```text
Von Neumann Architecture:
+-------------------+       Unified System Bus       +-------------------+
|                   | <============================> |  Unified Memory   |
|        CPU        |   (Instructions & Data Share   |   (Instructions   |
| (Control + ALU)   |    Same Address/Data Bus)      |      + Data)      |
+-------------------+                                +-------------------+

Harvard Architecture:
+-------------------+    Instruction Bus (Fetch)     +-------------------+
|                   | =============================> |  Instruction RAM  |
|        CPU        |                                +-------------------+
| (Control + ALU)   |       Data Bus (Read/Write)    +-------------------+
|                   | <============================> |     Data RAM      |
+-------------------+                                +-------------------+
```

- **Von Neumann Model:**
  - Uses a **unified memory address space** for both machine instructions and application data.
  - A single system bus (address/data) handles both instruction fetch and operand read/write operations.
  - **Von Neumann Bottleneck:** CPU execution throughput is fundamentally constrained because instructions and data cannot be accessed simultaneously across the single shared bus.
- **Harvard Model:**
  - Uses **physically separated memory banks and buses** for instructions and data.
  - Allows simultaneous instruction fetch and data operand read/write within the same clock cycle.
  - **Modern Modified Harvard Organization:** High-performance processors adopt a modified Harvard architecture at Level 1 (split L1 Instruction Cache and L1 Data Cache) while maintaining a unified Von Neumann memory space at Level 2/L3 cache and main DRAM.

### 3. Technological Evolution & Semiconductor Scaling

The evolution of digital electronic computers is categorized across distinct hardware generations:

| Generation | Era | Active Switching Element | Key Milestone Systems | Typical Switching Time |
| :--- | :--- | :--- | :--- | :--- |
| **First** | 1940–1955 | Vacuum Tubes | ENIAC, EDVAC, UNIVAC I | Milliseconds ($10^{-3}\text{ s}$) |
| **Second** | 1955–1965 | Discrete Transistors | IBM 7090, CDC 6600 | Microseconds ($10^{-6}\text{ s}$) |
| **Third** | 1965–1975 | Integrated Circuits (SSI / MSI) | IBM System/360, PDP-8 | Nanoseconds ($10^{-9}\text{ s}$) |
| **Fourth** | 1975–Present | VLSI / ULSI Microprocessors | Intel 4004, 8086, Pentium, Core | Sub-nanoseconds ($< 10^{-9}\text{ s}$) |
| **Fifth** | Present–Future | 3D Heterogeneous & GAAFETs | Apple M-Series, AMD Zen, Tensor Processors | Picoseconds ($10^{-12}\text{ s}$) |

### 4. Limits of Scaling: Dennard Scaling Breakdown and the Power Wall

For decades, Moore's Law was paired with Dennard Scaling. If the linear dimension of a transistor is scaled by factor $\kappa < 1$ (e.g., $0.7\times$):
- Transistor area scales by $\kappa^2 \approx 0.5\times$ (doubling density).
- Capacitance $C$ scales by $\kappa$.
- Supply voltage $V_{dd}$ scaled by $\kappa$.
- Switching delay scaled by $\kappa$ (allowing frequency $f$ to increase by $1/\kappa$).

Dynamic power dissipation is modeled as:
$$P_{\text{dynamic}} = \alpha \cdot C \cdot V_{dd}^2 \cdot f$$

When Dennard scaling held, power density remained flat:
$$\text{Power Density} = \frac{P}{\text{Area}} \approx \frac{\kappa \cdot (\kappa V)^2 \cdot (f/\kappa)}{\kappa^2} = 1$$

Around 2005, sub-threshold leakage current ($I_{\text{leakage}} \propto e^{-V_{th}/kT}$) prevented further lowering of supply voltage $V_{dd}$ without exponential increases in static leakage power ($P_{\text{static}} = V_{dd} \cdot I_{\text{leakage}}$). The inability to dissipate the resulting heat gave rise to the **Power Wall**, terminating the era of aggressive single-core clock frequency scaling and accelerating multi-core parallelism.

## Worked Examples / Calculations / Hardware Traces

### Example 1: Calculating Dynamic Power Scaling Under Clock Frequency Adjustments

**Problem:** A processor core operates at a clock frequency of $3.6\text{ GHz}$ with a supply voltage of $1.2\text{ V}$, consuming $65\text{ W}$ of dynamic power. If the voltage is scaled down to $0.95\text{ V}$ to manage thermals and the clock frequency is reduced to $2.8\text{ GHz}$, calculate:
1. The new dynamic power consumption.
2. The percentage reduction in dynamic power.

**Solution:**
Using the proportional dynamic power relation:
$$P_2 = P_1 \times \left(\frac{V_2}{V_1}\right)^2 \times \left(\frac{f_2}{f_1}\right)$$

Substitute the given values:
$$P_2 = 65\text{ W} \times \left(\frac{0.95\text{ V}}{1.20\text{ V}}\right)^2 \times \left(\frac{2.8\text{ GHz}}{3.6\text{ GHz}}\right)$$

$$P_2 = 65 \times (0.79167)^2 \times (0.77778)$$
$$P_2 = 65 \times 0.62674 \times 0.77778 \approx 31.68\text{ W}$$

The percentage power reduction is:
$$\Delta P = \frac{65\text{ W} - 31.68\text{ W}}{65\text{ W}} \times 100\% = \frac{33.32}{65} \times 100\% \approx 51.26\%$$

### Example 2: Transistor Density Scaling via Moore's Law

**Problem:** A microprocessor fabricated in year $T_0$ contains 4 billion transistors. Assuming historical Moore's Law scaling of doubling transistor count every 24 months, calculate the expected transistor count after 8 years.

**Solution:**
$$\text{Transistors}(t) = N_0 \cdot 2^{t / \tau}$$
where $N_0 = 4 \times 10^9$, $t = 8\text{ years} = 96\text{ months}$, and $\tau = 24\text{ months}$.

$$\text{Doubling periods } k = \frac{96}{24} = 4$$
$$N(8\text{ years}) = 4 \times 10^9 \times 2^4 = 4 \times 10^9 \times 16 = 64 \times 10^9 = 64\text{ Billion transistors}$$

## Complexity Analysis / Common Pitfalls

- **Confusing ISA with Microarchitecture:** A frequent misconception is assuming that the x86-64 instruction set dictates a specific internal pipeline or bus width. The ISA defines the software interface contract, whereas microarchitectures (e.g., Intel Alder Lake vs AMD Zen 4) implement completely different pipelines, execution units, and control logic while executing identical binary instructions.
- **Ignoring Leakage Power at Nanometer Nodes:** Students often assume dynamic switching power is the sole contributor to thermal dissipation. In sub-7nm fabrication processes, static leakage power can account for $30\%\text{ to }50\%$ of total chip power dissipation if unused silicon domains are not actively power-gated.
- **Von Neumann Bottleneck Misinterpretation:** The Von Neumann bottleneck is not a limitation in ALU computational throughput, but rather the memory-bus bandwidth constraint caused by sharing a single path for instruction fetching and data transfers.

## Multiple Choice Questions

1. Which of the following architectural features is part of the computer architecture rather than computer organization?
- **A)** The presence of a 32-entry branch target buffer
- **B)** The number of pipeline stages in the integer execution unit
- **C)** The instruction set opcodes and available addressing modes
- **D)** The cache replacement policy and write-back queue depth

2. What is the fundamental cause of the Von Neumann bottleneck?
- **A)** Arithmetic logic units cannot perform multiplication in a single cycle
- **B)** Instructions and data must share the same physical bus and memory subsystem
- **C)** Transistor gate leakage increases exponentially at high clock frequencies
- **D)** Branch instructions introduce bubbles into deep pipelined execution units

3. Why did Dennard Scaling cease to hold true around the mid-2000s?
- **A)** Integrated circuit lithography reached the physical wavelength of visible light
- **B)** Microprocessors transitioned from 32-bit to 64-bit address buses
- **C)** Threshold voltage could not be scaled down further without causing intolerable leakage current
- **D)** Dynamic random-access memory (DRAM) could no longer refresh capacitors fast enough

4. In a pure Harvard architecture, what design feature prevents the Von Neumann bottleneck?
- **A)** Physically isolated instruction and data memories with dedicated buses for each
- **B)** Out-of-order instruction scheduling with register renaming
- **C)** Multi-level unified caches that share a single wide bus to main DRAM
- **D)** Microcoded control units that horizontalize vertical control words

5. If the supply voltage of a microprocessor core is reduced by $20\%$ while maintaining the same clock frequency, what is the approximate percentage reduction in dynamic power?
- **A)** $20\%$
- **B)** $36\%$
- **C)** $40\%$
- **D)** $64\%$

### Answer Key & Explanations

1. **C**. Instruction opcodes and addressing modes are visible to the assembly programmer/compiler and define the software-hardware interface (Computer Architecture). The number of pipeline stages, branch buffers, and cache queues are organizational implementation choices invisible to user-level code.
2. **B**. The Von Neumann bottleneck occurs because instructions and data share a single memory address space and physical system bus, preventing simultaneous instruction fetches and data operand transfers.
3. **C**. As physical transistor dimensions shrunk below 90 nm, the threshold voltage could not be proportionally lowered without triggering exponential increases in sub-threshold static leakage current, breaking constant power density scaling.
4. **A**. Pure Harvard architecture maintains separate memory arrays and independent buses for instructions and data, allowing the CPU to fetch an instruction and read/write a data operand in parallel within the same clock cycle.
5. **B**. Dynamic power scales quadratically with voltage: $P \propto V^2$. If $V_{new} = 0.80 \cdot V_{orig}$, then $P_{new} \propto (0.80)^2 = 0.64 \cdot P_{orig}$. The reduction is $1 - 0.64 = 0.36 = 36\%$.

## References & Navigation

- **Next Topic:** [[Functional Units & Performance Fundamentals]]
- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]], [[Processing Unit Organization & Single-Bus Datapath]]

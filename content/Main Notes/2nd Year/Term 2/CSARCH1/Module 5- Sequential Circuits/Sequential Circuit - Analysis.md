---
id: sequential_circuit___analysis
type: note
course: CSARCH1
topic: Sequential Circuit - Analysis
status: completed
---

# Sequential Circuit - Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M5]]

---

## Overview

Analysis of a synchronous sequential circuit entails determining its behavior from a given logic circuit, moving ultimately to its state diagram.
The maximum number of values an `n`-bit memory can store is `2^n`. This is also the maximum number of states a sequential circuit with `n` flip-flops can have.

Steps to analyze:
1. Solve for flip-flop input equations (if not given).
2. Create the state transition table.
3. Draw the state transition diagram.

## Finite State Machines

### Mealy Finite State Machine
- Output is a function of **both the present state and the input**.
- The state diagram shows both input and output values along the directed lines (e.g., `input/output`).
- Outputs may change if inputs change during the clock cycle.
- May produce momentary false values (glitches) due to combinational delays before the active clock edge.

### Moore Finite State Machine
- Output is a function of **only the present state**.
- The state diagram usually shows the outputs inside the circles along with the state name. The directed lines only show the inputs.
- Outputs are strictly synchronized with the clock.

## Important Formulas

### Flip-Flop Characteristic Tables

**D Flip-Flop:**
| D | Q(t+1) |
|---|--------|
| 0 | 0      |
| 1 | 1      |

**T Flip-Flop:**
| T | Q(t+1) |
|---|--------|
| 0 | Q(t)   |
| 1 | Q'(t)  |

**JK Flip-Flop:**
| J | K | Q(t+1) |
|---|---|--------|
| 0 | 0 | Q(t)   |
| 0 | 1 | 0      |
| 1 | 0 | 1      |
| 1 | 1 | Q'(t)  |

**SR Flip-Flop:**
| S | R | Q(t+1) |
|---|---|--------|
| 0 | 0 | Q(t)   |
| 0 | 1 | 0      |
| 1 | 0 | 1      |
| 1 | 1 | Indeterminate |

## Worked Examples

### Example 1: D Flip-Flop Analysis
Given 2 D Flip-Flops (A, B); input: `x`, output: `y`.
**Input equations:**
- `DA = Ax + Bx`
- `DB = A'x`
- `y = (A+B)x' = Ax' + Bx'`

Derive the State Table by evaluating `DA` and `DB` for every combination of `A`, `B`, and `x`, which gives the next states `A(t+1)` and `B(t+1)`.

### Example 2: JK Flip-Flop Analysis
Given 2 JK Flip-Flops (A, B); input: `x`.
**Input equations:**
- `JA = B`
- `KA = Bx'`
- `JB = x'`
- `KB = A ⊕ x = Ax' + A'x`

Determine next states using the JK characteristic table.

### Example 3: T Flip-Flop Analysis
Given 2 T Flip-Flops (A, B); input: `x`, output: `y`.
**Input equations:**
- `TA = Bx`
- `TB = x`
- `y = AB`

Determine next states using the T characteristic table. (This represents a Moore Machine where output `y` depends only on states `A` and `B`).

## Multiple Choice Questions

1. What is the maximum number of states a sequential circuit with n flip-flops can have?
    - **A)** n
    - **B)** 2n
    - **C)** 2^n
    - **D)** n^2

2. What is the first step in analyzing a synchronous sequential circuit if the flip-flop input equations are not given?
    - **A)** Draw the state diagram
    - **B)** Derive the state transition table
    - **C)** Determine the flip-flop input equations from the logic diagram
    - **D)** Perform state reduction

3. What distinguishes a Mealy Finite State Machine from a Moore FSM?
    - **A)** The output in a Mealy FSM is a function only of the present state.
    - **B)** The output in a Mealy FSM is a function of both the present state and the input.
    - **C)** Mealy machines do not use flip-flops.
    - **D)** Mealy machines operate without a clock.

4. In a Moore Finite State Machine, the output depends entirely on:
    - **A)** Both present state and input
    - **B)** Only the input
    - **C)** Only the present state
    - **D)** Only the previous state

5. Where are outputs typically indicated in the state diagram of a Mealy machine?
    - **A)** Inside the circles representing the states
    - **B)** Along the directed lines, separated from the input by a slash
    - **C)** In a separate output diagram
    - **D)** Next to the clock signal

6. In a Moore machine's state diagram, where are the outputs typically shown?
    - **A)** Next to the input on the transition lines
    - **B)** Inside the circles together with the present state
    - **C)** In the transition condition
    - **D)** They are not shown on the diagram

7. Why might the output of a Mealy machine have momentary false values (glitches)?
    - **A)** Because it uses T flip-flops instead of D flip-flops
    - **B)** Due to the delay between the time inputs change and the time flip-flop outputs change
    - **C)** Because Moore machines are faster
    - **D)** Because of the clock frequency being too low

8. When analyzing a circuit with JK flip-flops, what is needed to determine the next state from the present state and inputs?
    - **A)** The flip-flop input equations and the characteristic table of the JK flip-flop
    - **B)** Only the D flip-flop characteristic equation
    - **C)** The state reduction algorithm
    - **D)** The output equation alone

9. What is the characteristic equation for a T flip-flop?
    - **A)** Q(t+1) = T
    - **B)** Q(t+1) = T ⊕ Q(t)
    - **C)** Q(t+1) = T' + Q
    - **D)** Q(t+1) = JQ' + K'Q

10. Which of the following equations accurately represents a D flip-flop's behavior?
    - **A)** Q(t+1) = D'Q
    - **B)** Q(t+1) = D
    - **C)** Q(t+1) = D ⊕ Q
    - **D)** Q(t+1) = D + Q'

### Answer Key & Explanations
1. **C)** An n-bit memory (n flip-flops) can store up to 2^n values, translating to a maximum of 2^n states.
2. **C)** Before creating tables or diagrams, you must derive the input equations directly from the circuit layout.
3. **B)** A Mealy machine computes output based on both the current state and the current inputs.
4. **C)** A Moore machine's output is derived exclusively from the present state of the flip-flops.
5. **B)** Mealy machine outputs are written on transition arcs next to the input condition (e.g., input/output).
6. **B)** Because Moore outputs depend only on the state, they are usually drawn inside the state nodes.
7. **B)** If inputs change while the state remains steady between clock edges, the Mealy output can temporarily compute an incorrect value until the next clock cycle.
8. **A)** You use the derived J and K equations for each state/input combination and apply them to the JK characteristic table to find the next state.
9. **B)** A T flip-flop toggles its output when T=1, which corresponds to the XOR logic: T ⊕ Q.
10. **B)** A D flip-flop simply latches its D input at the clock edge, making Q(t+1) equal to D.

## References & Navigation

- **Previous Topic:** [[Introduction to Sequential Circuit]]
- **Next Topic:** [[Sequential Circuit - State reduction and assignment]]
- **Related Notes:** [[Introduction to Sequential Circuit]], [[Sequential Circuit - Design]]
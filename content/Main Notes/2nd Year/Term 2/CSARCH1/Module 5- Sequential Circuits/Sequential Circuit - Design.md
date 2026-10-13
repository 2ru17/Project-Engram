---
id: sequential_circuit___design
type: note
course: CSARCH1
topic: Sequential Circuit - Design
status: completed
---

# Sequential Circuit - Design

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M5]]

---

## Overview

The process of designing a synchronous sequential circuit goes from a high-level word description down to the logic diagram.

### Design Procedure
1. From the word description, derive a **state diagram** for the circuit.
2. **Reduce the number of states** if necessary.
3. **Assign binary values** to the states.
4. Obtain the binary-coded **state table**.
5. Choose the **type of flip-flops** to be used.
6. Derive the **simplified flip-flop input equations and output equations** (using K-maps and Excitation Tables).
7. Draw the **logic diagram**.

*Workflow: Word problem -> State Diagram -> State Table -> Excitation Table -> Equations -> Circuit.*

## Important Formulas: Excitation Tables

Excitation tables specify what inputs are required at the flip-flops to cause a desired state transition from `Q(t)` to `Q(t+1)`.

**D Flip-Flop:**
| Q(t) | Q(t+1) | D |
|------|--------|---|
| 0    | 0      | 0 |
| 0    | 1      | 1 |
| 1    | 0      | 0 |
| 1    | 1      | 1 |

**T Flip-Flop:**
| Q(t) | Q(t+1) | T |
|------|--------|---|
| 0    | 0      | 0 |
| 0    | 1      | 1 |
| 1    | 0      | 1 |
| 1    | 1      | 0 |

**JK Flip-Flop:**
| Q(t) | Q(t+1) | J | K |
|------|--------|---|---|
| 0    | 0      | 0 | X |
| 0    | 1      | 1 | X |
| 1    | 0      | X | 1 |
| 1    | 1      | X | 0 |

**SR Flip-Flop:**
| Q(t) | Q(t+1) | S | R |
|------|--------|---|---|
| 0    | 0      | 0 | X |
| 0    | 1      | 1 | 0 |
| 1    | 0      | 0 | 1 |
| 1    | 1      | X | 0 |

## Worked Examples

### Example: Sequence Detector (Consecutive 1s)
Design a circuit that detects a sequence of three or more consecutive 1’s in a string of bits. Output is 1 when there are 3 or more 1s. Use D flip-flops.

- **State Assignment:** `S0 = 00`, `S1 = 01`, `S2 = 10`, `S3 = 11`
- Use the **D Flip-flop Excitation Table** to determine inputs `DA` and `DB` required for state transitions.
- Simplify logic using Karnaugh maps for `DA`, `DB`, and `Y`.
- Draw the circuit logic diagram using basic gates and D Flip-Flops.

### Example: 3-bit Binary Counter
Design a 3-bit binary counter using T flip-flops.
- Since it counts from 0 to 7 (000 to 111), it requires 3 T flip-flops (`A2`, `A1`, `A0`).
- Use the **T Flip-flop Excitation Table** to determine inputs `TA2`, `TA1`, and `TA0`.
- Generate K-maps and find input formulas.
- Draw the circuit logic diagram.

## Multiple Choice Questions

1. What is typically the first step in the design procedure for a synchronous sequential circuit?
    - **A)** Draw the logic diagram
    - **B)** Derive a state diagram from the word description and specifications
    - **C)** Assign binary values to states
    - **D)** Choose the type of flip-flop

2. After obtaining the state diagram, what is often the next step to optimize the design?
    - **A)** Immediately draw the circuit diagram
    - **B)** Reduce the number of states if necessary
    - **C)** Route the clock signal
    - **D)** Generate the testbench

3. What tool is heavily used to find the simplified flip-flop input equations from the excitation table?
    - **A)** Boolean algebraic division
    - **B)** Karnaugh Maps (K-maps)
    - **C)** State reduction table
    - **D)** Truth table inversion

4. What is the purpose of an excitation table in sequential circuit design?
    - **A)** It defines the present state values for given outputs.
    - **B)** It specifies what inputs are required at the flip-flops to cause a desired state transition.
    - **C)** It lists the gate delays of the combinational logic.
    - **D)** It maps the clock frequency to the states.

5. In an excitation table for a D flip-flop, what must the input D be to transition from Q(t)=0 to Q(t+1)=1?
    - **A)** 0
    - **B)** 1
    - **C)** X (don't care)
    - **D)** Toggle

6. In an excitation table for a JK flip-flop, if Q(t)=0 and Q(t+1)=0, what are the values of J and K?
    - **A)** J=0, K=0
    - **B)** J=1, K=X
    - **C)** J=0, K=X
    - **D)** J=X, K=0

7. For a T flip-flop, what must the input T be to maintain the current state (Q(t) to Q(t+1) is 1 to 1)?
    - **A)** 1
    - **B)** X
    - **C)** 0
    - **D)** High-Z

8. When designing a 3-bit binary counter, how many flip-flops are required?
    - **A)** 2
    - **B)** 3
    - **C)** 4
    - **D)** 8

9. What is the sequence of steps for sequential design?
    - **A)** Word problem -> State Diagram -> State Table -> Excitation Table -> Equations -> Circuit
    - **B)** Circuit -> Equations -> State Table -> State Diagram -> Word problem
    - **C)** Equations -> State Diagram -> Excitation Table -> Word problem -> Circuit
    - **D)** Word problem -> Circuit -> State Table -> State Diagram -> Equations

10. During state assignment, what is done?
    - **A)** Clock signals are assigned to gates
    - **B)** Binary values are assigned to the different states
    - **C)** Input variables are minimized
    - **D)** Output logic is eliminated

### Answer Key & Explanations
1. **B)** The design begins by translating the specifications into a visual state diagram.
2. **B)** State reduction minimizes the number of required states, potentially saving hardware.
3. **B)** Karnaugh maps are used to derive simplified Boolean expressions from the excitation table.
4. **B)** It maps the required flip-flop inputs (like J, K, D, or T) to achieve the transition from present state to next state.
5. **B)** For a D flip-flop, D is identical to the next state Q(t+1).
6. **C)** To remain at 0, J must be 0, but K can be anything (0 or 1), so K is an X condition.
7. **C)** T must be 0 to not toggle the state.
8. **B)** A 3-bit counter has 8 states (000 to 111), which requires 3 flip-flops.
9. **A)** The standard process starts with the problem and systematically produces the schematic.
10. **B)** State assignment maps symbolic state names (like S0, S1) to actual binary codes (like 00, 01) required for digital hardware.

## References & Navigation

- **Previous Topic:** [[Sequential Circuit - State reduction and assignment]]
- **Next Topic:** [[Hardware Description Language for sequential circuit]]
- **Related Notes:** [[Sequential Circuit - State reduction and assignment]]
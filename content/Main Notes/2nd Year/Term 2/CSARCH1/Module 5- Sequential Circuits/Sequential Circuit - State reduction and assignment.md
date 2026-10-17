---
id: sequential_circuit___state_reduction_and_assignment
type: note
course: CSARCH1
topic: Sequential Circuit - State reduction and assignment
status: completed
---

# Sequential Circuit - State reduction and assignment

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M5]]

---

## Overview

Reduction in the number of flip-flops in a sequential circuit is referred to as the state-reduction problem. Minimizing states simplifies the combinational logic and can lead to fewer flip-flops required, as long as external input-output requirements remain unchanged.

### State Reduction

Two states are **equivalent** if, for each possible input, they give **exactly the same output** and send the circuit to the **same state or to an equivalent state**.
When two states are found to be equivalent, one of them can be removed without altering the system's input-output relationships. The state table is then rebuilt using the remaining states.

### State Assignment

After state reduction, symbolic state names (e.g., a, b, c) must be mapped to physical binary values (e.g., 000, 001, 010). 
Common state assignment encodings include:
- **Straight Binary:** Normal counting sequence (`000`, `001`, `010`, `011`). Minimizes flip-flop count (e.g. 5 states -> 3 bits).
- **Gray Code:** Only one bit changes per state transition (`000`, `001`, `011`, `010`). Good for minimizing power consumption and glitching.
- **One-Hot:** Uses one bit per state, where only one bit is '1' at a time (`00001`, `00010`, `00100`, `01000`). Requires more flip-flops (5 states -> 5 bits) but often drastically simplifies combinational logic.

## Worked Examples

Given a state table with abstract states (a, b, c, d, e, f, g), state reduction iteratively merges rows that have identical next states and outputs for all inputs. Once the minimized set of states is found (e.g., 5 states remaining), an assignment strategy is chosen to build a binary-coded state table. 

## Multiple Choice Questions

1. What is the primary goal of the state-reduction problem?
- **A)** To increase the number of flip-flops for redundancy
- **B)** To reduce the number of flip-flops or simplify the combinational logic by minimizing states
- **C)** To reduce the clock frequency of the circuit
- **D)** To remove output dependencies from the inputs

2. Under what condition are two states considered equivalent?
- **A)** If they have the same binary assignment
- **B)** If they lead to the same next state for at least one input
- **C)** If, for every input, they give the same output and send the circuit to the same or equivalent state
- **D)** If they are adjacent in the state diagram

3. What can be done when two states are found to be equivalent?
- **A)** Both states must be kept to maintain stability.
- **B)** One of them can be removed without altering the input-output relationships.
- **C)** They must be merged into a single state with a new output.
- **D)** A new flip-flop must be added to distinguish them.

4. Which of the following are common methods for state assignment?
- **A)** Hexadecimal Code
- **B)** Binary, Gray Code, and One-Hot
- **C)** ASCII Code
- **D)** Floating Point Encoding

5. In a one-hot state assignment for 5 states, how many bits (and thus flip-flops) are used?
- **A)** 2
- **B)** 3
- **C)** 5
- **D)** 10

### Answer Key & Explanations
1. **B)** Reducing states may allow using fewer flip-flops or simplify the resulting combinational logic, maintaining exactly the same input-output behavior.
2. **C)** Equivalent states produce identical outputs and transition to identical (or equivalent) next states for all possible inputs.
3. **B)** Removing one of the equivalent states simplifies the design without changing the circuit's external functionality.
4. **B)** Straight Binary, Gray Code, and One-Hot are standard binary assignments for finite state machines.
5. **C)** One-Hot encoding uses one bit per state, so 5 states require 5 bits.

## References & Navigation

- **Previous Topic:** [[Sequential Circuit - Analysis]]
- **Next Topic:** [[Sequential Circuit - Design]]
- **Related Notes:** [[Sequential Circuit - Analysis]], [[Sequential Circuit - Design]]
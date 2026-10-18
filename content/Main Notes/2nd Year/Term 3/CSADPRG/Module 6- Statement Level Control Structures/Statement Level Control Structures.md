---
id: 6_statement_level_control_structures
type: note
course: CSADPRG
topic: "6 - Statement Level Control Structures"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Statement Level Control Structures]]

## Overview
Control statements are fundamentally necessary because simple variable assignment is not enough to fully automate computation. They allow a program to choose different execution paths (conditionals) or repeat statements (loops). Together, a control statement and the statements it governs form a control structure. The design and inclusion of these structures in programming languages are an ongoing balance between writability (which favors more specialized structures) and readability.

## Key Definitions
- **Control Structure**: A control statement and the collection of statements whose execution it controls.
- **Selection Statement**: A control structure that provides a means of choosing between two or more execution paths (e.g., Two-way, N-way or Multiple selection).
- **Iterative Statement**: A control structure that causes a collection of statements to be executed zero, one, or more times. Often simply referred to as loops.
- **Guarded Command**: A control structure where a selectable segment can be considered independently of other segments, introducing non-determinism when multiple conditions are met.

## Theoretical Framework / Concepts

### Selection Statements
Selection statements provide the capability to choose between alternate paths of execution. 
- **Two-way Selection:** Usually implemented as `if...then...else` constructs. 
  - *Design issues:* What is the form and type of the control expression (Boolean vs arithmetic)? How are `then` and `else` clauses specified (single vs compound statements)? How should nested selectors be evaluated? (e.g., the dangling else problem, which is typically addressed by using block braces or specific end markers like `end` or `fi`).
- **Multiple-selection Statements:** Allow selecting one path from any number of statements or statement groups. Often implemented using `switch` or `case` statements, or via nested two-way selectors.
  - *Design issues:* What is the form and type of the control expression? How are selectable segments specified? Is flow restricted to a single segment (e.g., requiring a `break` in C, vs automatic exit in C#)? How are unrepresented values handled (e.g., `default` cases)?

### Iterative Statements
Loops are used to automate repetitive tasks that would otherwise be too cumbersome or impossible to write sequentially.
- **Iteration Control Mechanisms:**
  - *Logical:* Repetition control is based on a Boolean expression (e.g., `while` loops).
  - *Counting:* Controlled by a loop variable, terminal value, and a step size specification (e.g., `for` loops).
- **Location of Control Mechanism:**
  - *Pretest:* The loop completion condition is evaluated *before* the body is executed.
  - *Posttest:* The condition is evaluated *after* the body is executed (e.g., `do...while`), guaranteeing at least one execution.
  - *User-located:* Control mechanisms can be placed arbitrarily within the loop body using restricted branches (e.g., `break` or `continue`).
- **Iteration based on Data Structures:** Iteration is controlled by the number of elements in a data structure, often using an iterator function that traverses elements until none remain.
- **Iteration in Functional Languages:** Pure functional languages do not have variables, so iteration is instead implemented using recursion.

### Unconditional Branching
The `goto` statement transfers control to a specified place in the program. While theoretically powerful (all other control structures can be built with `goto` and a selector), it is considered dangerous because unrestricted use makes programs extremely difficult to read. However, restricted forms of unconditional branching (like `break`, `continue`, or labeled exits in Java) are legitimate and widely used.

### Guarded Commands
Proposed by Edsger Dijkstra (1975) in the Guarded Command Language (GCL), these commands evaluate all boolean expressions (guards). 
- If more than one guard is true, a statement is chosen non-deterministically.
- If none of the guards are true, it raises a runtime exception.
This concept can be applied to both selection (`if`) and iteration (`do`), simplifying reasoning about program correctness.

## Examples

**Selection Statements:**
```c
// Two-way Selection with block statements in C
if (count == 0) {
    result = 0;
} else {
    result = 1;
}
```
```ruby
# End marker in Ruby
if sum == 0
    result = 0
end
```

**Multiple Selection:**
```python
# Multiple selection via nested selectors
if count < 10:
    bag1 = True
elif count < 100:
    bag2 = True
```
```scheme
;; Multiple selection in Scheme
(cond
  ((> x y) "X is greater than Y")
  ((< x y) "Y is greater than X")
  (ELSE "X and Y are equal")
)
```

**Iterative Statements:**
```c
// Counting (Pretest)
for (int i = 0; i < 5; i++) {
    printf("%d", i);
}

// Logical (Posttest)
do {
    printf("%d", i);
    i++;
} while (i < 5);
```
```python
# Iteration based on a data structure
mytuple = ("apple", "banana", "cherry")
for x in mytuple:
    print(x)
```

**Guarded Commands:**
```text
// Guarded Selection
if x >= y -> max := x
[] y >= x -> max := y
fi

// Guarded Iteration
do q1 > q2 -> temp := q1; q1 := q2; q2 := temp; 
[] q2 > q3 -> temp := q2; q2 := q3; q3 := temp; 
od
```

## Multiple Choice Questions

1. What do a control statement and the statements it governs form together?
    - **A)** Iterative Statement
    - **B)** Guarded Command
    - **C)** Control Structure
    - **D)** Selection Statement

2. Which statement provides a means of choosing between two or more execution paths?
    - **A)** Iterative Statement
    - **B)** Control Structure
    - **C)** Guarded Command
    - **D)** Selection Statement

3. What design issue is typically addressed by using block braces or specific end markers like `end` or `fi` in two-way selection?
    - **A)** The dangling else problem
    - **B)** Non-determinism
    - **C)** Automatic exit
    - **D)** Multiple-selection representation

4. In multiple-selection statements, how does C differ from C# regarding flow restriction?
    - **A)** C requires automatic exit, while C# requires `break`
    - **B)** C requires `break` to exit a segment, while C# provides automatic exit
    - **C)** C does not allow multiple selection, while C# does
    - **D)** C# raises a runtime exception, while C defaults to the next case

5. Which iteration control mechanism evaluates the loop completion condition *after* the body is executed?
    - **A)** Pretest
    - **B)** Logical
    - **C)** Counting
    - **D)** Posttest

6. How is iteration implemented in pure functional languages?
    - **A)** Using `for` loops
    - **B)** Using `do...while` loops
    - **C)** Using iterators
    - **D)** Using recursion

7. Which control structure was proposed by Edsger Dijkstra in 1975?
    - **A)** Selection Commands
    - **B)** Guarded Commands
    - **C)** Two-way Iterations
    - **D)** Unconditional Branches

8. What happens in a Guarded Command if none of the guards are true?
    - **A)** It defaults to the first guard
    - **B)** It raises a runtime exception
    - **C)** It loops infinitely
    - **D)** It chooses non-deterministically

9. Why is the unrestricted `goto` statement generally considered dangerous?
    - **A)** Because it requires block braces
    - **B)** Because it evaluates boolean expressions randomly
    - **C)** Because unrestricted use makes programs extremely difficult to read
    - **D)** Because it only supports pure functional languages

10. Which iteration mechanism is typically controlled by traversing elements until none remain?
    - **A)** Counting iteration
    - **B)** Iteration based on Data Structures
    - **C)** User-located iteration
    - **D)** Guarded Iteration

### Answer Key & Explanations

1. **C**. A control structure is defined as a control statement combined with the collection of statements whose execution it controls.
2. **D**. A selection statement is a control structure that allows a program to choose between alternate paths of execution.
3. **A**. The dangling else problem occurs when nested selectors are ambiguous, and it is resolved using specific block markers.
4. **B**. In C, flow falls through unless a `break` is explicitly used, whereas C# automatically exits a switch case.
5. **D**. Posttest loops, like `do...while`, evaluate the condition after execution, guaranteeing at least one run.
6. **D**. Pure functional languages lack variables for standard loops, so iteration is instead handled using recursion.
7. **B**. Guarded Commands were proposed by Dijkstra in 1975 to introduce non-determinism and evaluate all boolean guards.
8. **B**. In a Guarded Command, if multiple guards are true, a statement is chosen non-deterministically; if none are true, it raises a runtime exception.
9. **C**. Unrestricted unconditional branching makes control flow hard to follow, reducing program readability.
10. **B**. Iteration based on data structures operates over the elements in a collection, often using an iterator to traverse them.

## References & Navigation

- **Previous Topic:** [[Expressions and Assignment Statements]]
- **Next Topic:** [[Subprograms]]
- **Related Notes:** [[Expressions and Assignment Statements]]

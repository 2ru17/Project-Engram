---
id: 1_overview_of_programming_languages
type: note
course: CSADPRG
topic: "1 - Overview of Programming Languages"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Overview of Programming Languages]]

## Overview
Programming as a skill involves developing knowledge in both logic (knowing what to do) and syntax (knowing how to express what to do). Studying programming languages (PLs) enhances an individual's capacity to express ideas, improves the background for selecting the right language for a project, makes learning new languages easier, provides a better understanding of implementation significance, and improves usage of known languages. This module covers programming domains, criteria for evaluating languages, design trade-offs, and various implementation methods like compilation, interpretation, and hybrid systems.

## Key Definitions
- **Logic:** Knowing what a program should do.
- **Syntax:** Knowing how to express the logic within the bounds of a language.
- **Readability:** The ease with which programs can be read and understood. It encompasses overall simplicity, orthogonality, data types, and syntax design.
- **Writability:** How easily a language can be used to create programs. Affected by readability factors and includes the balance of simplicity and orthogonality, support for abstraction, and expressivity.
- **Reliability:** A program's ability to perform to its specifications under all conditions. Influenced by readability, writability, type checking, exception handling, and aliasing.
- **Orthogonality:** Refers to a language having a relatively small set of primitive constructs that can be combined in a relatively small number of ways to build structures. Good orthogonality means independent features do not interact badly.
- **Aliasing:** Referring to a memory cell using multiple names, which can be dangerous if modifications are not obvious.

## Theoretical Framework / Concepts

### Programming Domains
The needs of a specific domain drive the development of programming languages.
- **Scientific:** Driven by simple data structures and intense floating-point computations (e.g., Fortran).
- **Business:** Driven by the need to produce reports, precisely store decimal/character data, and perform decimal operations (e.g., COBOL).
- **Artificial Intelligence:** Driven by symbolic vs. arithmetic computation, precise representation, and flexible storage (e.g., Lisp, Prolog, C, Scheme).
- **Web Software:** Driven by the need for dynamic web content and mixing computation with presentation (e.g., JavaScript, PHP).

### Language Evaluation Criteria
Programming languages are primarily evaluated based on three criteria:
1. **Readability:** Affected by feature multiplicity (having more than one way to accomplish an operation) and operator overloading (a single symbol representing multiple operations).
2. **Writability:** Dependent on the context or domain. A good balance of simplicity and orthogonality, support for abstraction, and expressivity all contribute.
3. **Reliability:** Affected by type checking, exception handling, and aliasing.

Other factors include the **Cost** (training, writing, compiling, executing, language implementation system, poor reliability, and maintenance).

### Design Trade-Offs
Language design often requires balancing competing goals:
- **Reliability vs. Cost of Execution:** For instance, Java checks array indices for reliability, adding to execution cost, whereas C does not, making it faster but potentially less reliable.
- **Writability vs. Reliability:** C++ allows flexible pointer manipulation (high writability for specific tasks), while Java restricts pointers to prevent reliability issues.

### Implementation Methods
The interaction with computers happens through machine language, executed by the processor and internal memory. High-level languages use different methods to translate source code:
1. **Compilation:** Translates source code to machine language before execution. Phases include Lexical Analyzer, Syntax Analyzer (forms parse trees), Intermediate Code Generator, Semantic Analyzer, Optimization (optional), and Code Generator.
2. **Pure Interpretation:** Interprets source code without translation. It is easier for source-level debugging but 10 to 100 times slower than compiled systems. 
3. **Hybrid Interpretation Systems:** Translates high-level language to an intermediate language (like byte code) for easier interpretation. Modern systems often include Just-in-Time (JIT) compilation to compile intermediate code to machine code at runtime for faster subsequent calls.

## Examples

- **Feature Multiplicity (Java):**
  Incrementing a variable can be written in multiple ways:
  ```java
  count = count + 1;
  count += 1;
  count++;
  ++count;
  ```
- **Operator Overloading:**
  In Python, `+` is overloaded to handle both addition and string concatenation:
  ```python
  _sum = 10 + 3
  name = "hello" + "world"
  ```
  In C++, `<<` can be used as a bitwise shift operator or an output stream operator.
- **Lack of Orthogonality (C vs. Java):**
  - In C, structs can be returned from functions, but arrays cannot, despite both being data structures.
  - In Java, primitive and reference types share syntax declaration (e.g., `int x` vs `MyClass y`), but `x` holds an actual value while `y` holds a reference.

## Multiple Choice Questions

1. Which of the following describes the skill of programming as discussed in the overview?
    - **A)** Exclusively understanding mathematical formulas
    - **B)** Developing knowledge in both logic and syntax
    - **C)** Memorizing various machine languages
    - **D)** Learning how to configure hardware systems

2. What does "syntax" mean in the context of programming languages?
    - **A)** Knowing what a program should do
    - **B)** The execution speed of the program
    - **C)** Knowing how to express logic within the bounds of a language
    - **D)** The ease with which programs can be read

3. What is defined as referring to a memory cell using multiple names?
    - **A)** Orthogonality
    - **B)** Expressivity
    - **C)** Overloading
    - **D)** Aliasing

4. Which programming domain was primarily driven by the need for simple data structures and intense floating-point computations?
    - **A)** Scientific
    - **B)** Business
    - **C)** Artificial Intelligence
    - **D)** Web Software

5. Having multiple ways to accomplish a single operation is an example of what factor that affects readability?
    - **A)** Operator overloading
    - **B)** Feature multiplicity
    - **C)** Exception handling
    - **D)** Aliasing

6. What is considered a design trade-off between C and Java concerning array indices?
    - **A)** Java does not check array indices, making it faster than C.
    - **B)** C checks array indices to ensure reliability, while Java focuses on speed.
    - **C)** Java checks array indices for reliability, which adds to execution cost compared to C.
    - **D)** Both C and Java check array indices for reliability.

7. Which implementation method translates source code entirely into machine language before execution?
    - **A)** Pure Interpretation
    - **B)** Compilation
    - **C)** Hybrid Interpretation Systems
    - **D)** Just-in-Time Processing

8. Why is pure interpretation generally considered slower than compilation?
    - **A)** Because it translates code to machine language before execution.
    - **B)** Because it forms intermediate parse trees that are complex.
    - **C)** Because it interprets source code without translation, making it 10 to 100 times slower.
    - **D)** Because it involves an optional optimization phase during runtime.

9. What describes a language having a relatively small set of primitive constructs that can be combined in a relatively small number of ways?
    - **A)** Orthogonality
    - **B)** Readability
    - **C)** Type Checking
    - **D)** Expressivity

10. Which of the following is an example of operator overloading in Python as mentioned in the text?
    - **A)** The `<<` symbol used for bitwise shift and output stream.
    - **B)** The `+` symbol used for addition and string concatenation.
    - **C)** The `++` operator used for incrementing a variable.
    - **D)** Returning structs from functions but not arrays.

### Answer Key & Explanations

1. **B**. The text explicitly states that programming as a skill involves developing knowledge in both logic and syntax.
2. **C**. Syntax is defined in the text as knowing how to express the logic within the bounds of a language.
3. **D**. Aliasing is defined as referring to a memory cell using multiple names.
4. **A**. The Scientific programming domain is driven by simple data structures and intense floating-point computations.
5. **B**. Feature multiplicity is described as having more than one way to accomplish an operation, which affects readability.
6. **C**. The text notes that Java checks array indices for reliability, adding to execution cost, whereas C does not, making it faster but potentially less reliable.
7. **B**. Compilation translates source code to machine language before execution.
8. **C**. Pure interpretation interprets source code without translation, which the text states is 10 to 100 times slower than compiled systems.
9. **A**. Orthogonality refers to a language having a relatively small set of primitive constructs that can be combined in a small number of ways to build structures.
10. **B**. In Python, the `+` operator is overloaded to handle both addition and string concatenation, as shown in the examples section.

## References & Navigation

- **Next Topic:** [[Evolution of Programming Languages]]
- **Related Notes:** [[Evolution of Programming Languages]], [[Introduction to Software Engineering]]

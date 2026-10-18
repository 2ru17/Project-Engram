---
id: 2_evolution_of_programming_languages
type: note
course: CSADPRG
topic: "2 - Evolution of Programming Languages"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Evolution of Programming Languages]]

## Overview
The evolution of programming languages highlights a progression from early machine codes and pseudocodes toward more abstract, human-readable, and versatile languages. Early developments focused on specific domains like scientific computing (Fortran) and business processing (COBOL), driven by hardware limitations where machine efficiency outweighed programmer efficiency. Over time, as computer capabilities expanded and software complexity grew, languages evolved to incorporate structured programming, data abstraction, object-oriented paradigms, and logic programming, continuously optimizing for programmer productivity and expressive power.

## Key Definitions
- **Pseudocode:** Early alternative to direct machine code programming designed to address issues of poor readability, modifiability, and tedious expression coding.
- **Orthogonality:** A design principle where a relatively small set of primitive constructs can be combined in a relatively small number of ways to build the control and data structures of the language (seen in ALGOL 68).
- **Coroutines:** A kind of subprogram that allows execution to be suspended and resumed, pioneering data abstraction (introduced in SIMULA 67).
- **Logic Programming:** The use of a formal logic notation to communicate computational processes to a computer, usually operating as an inferencing process on a database of facts and rules (e.g., Prolog).
- **Scripting Languages:** Initially, languages used by putting a list of commands (a script) into a file to be interpreted sequentially, later evolving into more sophisticated tools for web and general-purpose development (e.g., Perl, JavaScript).

## Theoretical Framework / Concepts

### Early Languages and Paradigms
- **Plankalkül (1945):** Designed by Konrad Zuse but never implemented. It featured advanced data structures (floating-point, arrays, records) and invariants (similar to assertions in Java). 
- **Pseudocodes (1949):** E.g., Short Code (1949) and Speedcoding (1954). Emerged because writing direct machine code was tedious and error-prone, lacking indexing and floating-point support.
- **Fortran (1957 - 1990):** The first major scientific language. 
  - **Fortran I (1957):** Focused heavily on machine efficiency. Introduced if statements, do loops, and formatted I/O, but lacked data typing and separate compilation.
  - **Evolution:** Fortran II added independent compilation. Fortran IV introduced explicit typing. Fortran 77 added character handling and IF-THEN-ELSE. Fortran 90 added modules, dynamic arrays, pointers, and recursion.
- **LISP (1959):** Designed for AI and symbolic computation at MIT. It pioneered functional programming, based on lambda calculus, with control via recursion and conditional expressions instead of variables and assignment.
- **ALGOL 58 & 60 (1958 - 1960):** Designed for communicating algorithms with mathematical notation. 
  - **ALGOL 58:** Formalized data types, introduced block structure concepts.
  - **ALGOL 60:** Introduced block structure, local scope, pass-by-value/name, recursive procedures, and stack-dynamic arrays. It became the first machine-independent language with a formally defined syntax (BNF), influencing all subsequent imperative languages.
- **COBOL (1960):** Designed for business data processing (based on FLOW-MATIC). Required to look like simple English. Introduced hierarchical data structures (records) and a distinct Data Division. Heavily supported by the US DoD.

### Multipurpose, Systems, and Dynamic Languages
- **BASIC (1964):** Designed for ease of use by non-science students; prioritized user time over computer time.
- **PL/1 (1965):** Attempted to merge the needs of scientific and business users. Introduced unit-level concurrency, exception handling, and pointers.
- **Dynamic Languages:** 
  - **APL (1962):** Highly expressive, based on hardware description, famous for matrix operators but notoriously difficult to read.
  - **SNOBOL (1964):** Powerful string pattern matching.
- **C (1972):** Designed for systems programming at Bell Labs. Evolved from B and ALGOL 68. Features a powerful set of operators but poor type checking; heavily tied to UNIX.
- **Pascal (1971):** Designed primarily for teaching structured programming; small and simple.
- **Prolog (1972):** A non-procedural, logic-based language that acts as an intelligent database inferring truths of given queries.

### The Rise of Abstraction and Object-Oriented Programming (OOP)
- **SIMULA 67 (1967):** Originally for system simulation. Introduced the concept of *classes* containing both local data and functionality, marking the beginning of data abstraction.
- **Smalltalk (1972-1980):** Developed at Xerox PARC. The first full implementation of an object-oriented language (data abstraction, inheritance, and dynamic type binding) and pioneered the graphical user interface.
- **Ada (1983):** Developed by the DoD with huge design effort. Notable for packages (data abstraction), exception handling, and concurrency. Ada 95 added true OOP support.
- **C++ (1985):** Combined imperative features of C with OOP features inspired by SIMULA 67, including exception handling.
- **Java (1995):** Developed at Sun for embedded devices, based on C++ but significantly simplified. It is purely object-oriented (imperative-based OOP), supporting references instead of pointers, and features built-in concurrency.

### Scripting Languages Evolution
- **Perl (1972):** Developed by Larry Wall (combining sh and awk). Features implicit variables, dynamic sparse arrays, and associative arrays (hashes). Powerful but can be unsafe due to weak typing between strings and numbers.
- **JavaScript (1995):** Originally Mocha/LiveScript by Netscape. Primarily designed for client-side web programming, DOM manipulation, and dynamic HTML validation.

## Examples
- **Plankalkül Notation:**
  - `A(7) := 5 * B(6)`
  - Used subscripts and strict typing notation.
- **Functional Paradigm (LISP-style concept):**
  - Processing depends on `atoms` and `lists`.
  - Operations heavily utilize recursion rather than traditional `for` or `while` loops.
- **Scripting Pattern (Perl/JS concept):**
  - Dynamic interpretation of commands stored in simple text files ("scripts").

## Multiple Choice Questions

1. Which early programming language was designed by Konrad Zuse but never implemented?
    - **A)** Plankalkül
    - **B)** Speedcoding
    - **C)** Fortran
    - **D)** LISP

2. What design principle involves combining a small set of primitive constructs in a few ways to build control and data structures, as seen in ALGOL 68?
    - **A)** Coroutines
    - **B)** Data abstraction
    - **C)** Orthogonality
    - **D)** Logic programming

3. Which language was the first major scientific language and focused heavily on machine efficiency?
    - **A)** COBOL
    - **B)** Fortran
    - **C)** C
    - **D)** LISP

4. LISP pioneered which programming paradigm?
    - **A)** Object-oriented programming
    - **B)** Functional programming
    - **C)** Logic programming
    - **D)** Structured programming

5. What was a key contribution of ALGOL 60 to programming language history?
    - **A)** It introduced hierarchical data structures for business processing.
    - **B)** It was the first full implementation of an object-oriented language.
    - **C)** It became the first machine-independent language with a formally defined syntax.
    - **D)** It introduced the use of a formal logic notation.

6. Which language was designed for business data processing and was required to look like simple English?
    - **A)** BASIC
    - **B)** PL/1
    - **C)** Pascal
    - **D)** COBOL

7. Which language introduced the concept of *classes* containing both local data and functionality, marking the beginning of data abstraction?
    - **A)** SIMULA 67
    - **B)** Smalltalk
    - **C)** C++
    - **D)** Java

8. What was Smalltalk's major contribution to programming languages?
    - **A)** It was the first language designed for systems programming.
    - **B)** It was the first full implementation of an object-oriented language and pioneered the graphical user interface.
    - **C)** It introduced block structures and local scopes.
    - **D)** It was designed primarily for teaching structured programming.

9. Prolog operates under which programming paradigm?
    - **A)** Imperative programming
    - **B)** Scripting
    - **C)** Object-oriented programming
    - **D)** Logic programming

10. Which language was developed by Larry Wall and features implicit variables and associative arrays (hashes)?
    - **A)** JavaScript
    - **B)** C
    - **C)** Perl
    - **D)** APL

### Answer Key & Explanations

1. **A**. Plankalkül was designed by Konrad Zuse in 1945 but was never implemented, despite featuring advanced data structures and invariants.
2. **C**. Orthogonality is a design principle where a small set of primitive constructs can be combined to build the language's structures, a concept notable in ALGOL 68.
3. **B**. Fortran (1957) was the first major scientific language, with early versions focusing heavily on machine efficiency over programmer efficiency.
4. **B**. Designed in 1959, LISP pioneered functional programming, relying heavily on lambda calculus and utilizing recursion instead of loops.
5. **C**. ALGOL 60 became the first machine-independent language with a formally defined syntax using BNF, significantly influencing subsequent imperative languages.
6. **D**. COBOL (1960) was designed for business data processing to look like simple English and introduced hierarchical data structures (records).
7. **A**. SIMULA 67, originally designed for system simulation, introduced the concept of classes, which pioneered data abstraction.
8. **B**. Developed at Xerox PARC, Smalltalk was the first full implementation of an object-oriented language and was a pioneer of the graphical user interface.
9. **D**. Prolog is a non-procedural, logic-based language that acts as an intelligent database, inferring truths based on queries.
10. **C**. Perl was developed by Larry Wall, combining features of sh and awk, and it features implicit variables and associative arrays known as hashes.

## References & Navigation

- **Previous Topic:** [[Overview of Programming Languages]]
- **Next Topic:** [[Names, Variables, Binding, Scope]]
- **Related Notes:** [[Overview of Programming Languages]]

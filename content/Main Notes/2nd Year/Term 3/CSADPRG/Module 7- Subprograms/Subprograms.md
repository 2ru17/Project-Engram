---
id: 7_subprograms
type: note
course: CSADPRG
topic: "7 - Subprograms"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Subprograms]]

## Overview
Subprograms are a fundamental form of process abstraction in programming languages that allow the reuse of code. By hiding the statements of a process behind a statement call, subprograms improve space management, coding time, and code readability. General characteristics include having a single entry point, suspending the calling program unit during execution, and returning control to the caller upon termination.

## Key Definitions
- **Subprogram definition:** Describes the interface to and the actions of the subprogram abstraction.
- **Subprogram call:** An explicit request for a subprogram to be executed.
- **Active:** A subprogram that is currently executing.
- **Subprogram Header:** The first part of the definition which specifies that the syntactic unit is a subprogram, provides a name (if not anonymous), and may specify a list of parameters.
- **Subprogram Body:** Defines the actions performed by the subprogram.
- **Parameter Profile:** The number, order, and types of its formal parameters.
- **Protocol:** The parameter profile plus the return type if the subprogram is a function.
- **Subprogram Declaration:** Provides the protocol but not the body (e.g., function prototypes in C/C++).
- **Formal Parameters:** Dummy variables listed in the subprogram header and used in the subprogram body.
- **Actual Parameters (Arguments):** The actual values or addresses used in the subprogram call statement.
- **Closure:** A nested subprogram and its referencing environment.
- **Coroutine:** A subprogram with multiple entry points controlled by the coroutines themselves.

## Theoretical Framework / Concepts

### Categories of Subprograms
1. **Procedures:** Do not return values. They produce results by modifying non-formal parameter variables that remain visible in both the procedure and the caller, or by modifying formal parameters that allow data transfer back to the caller.
2. **Functions:** Return values and are modeled after mathematical functions. Ideally, a function should have no side effects, meaning it only produces a return value without modifying parameters or variables outside the function.

### Parameter Passing Methods
- **Pass by Value (In Mode):** The actual parameter's value initializes the formal parameter. It's normally implemented by copying the value. Fast for scalars, but copying large structures can be costly.
- **Pass by Result (Out Mode):** No value is transmitted to the subprogram. The formal parameter acts as a local variable. Before control returns, its value is transmitted back to the actual parameter. Issues include actual parameter collisions and evaluation timing.
- **Pass by Value-Result (Inout Mode):** Also called pass by copy. The actual parameter is copied into the formal parameter at entry, and then copied back out at termination.
- **Pass by Reference (Inout Mode):** Transmits an access path (e.g., pointer) to the subprogram. It is efficient in time and space but can lead to slower accesses and potential aliasing.
- **Pass by Name (Inout Mode):** The actual parameter is textually substituted for the formal parameter in all its occurrences. It's difficult to read and not part of widely used modern languages.

### Local Referencing Environments
- **Local Variables:** Defined inside subprograms and their scope is usually the subprogram body.
  - **Stack-dynamic:** Support recursion and share storage among subprograms, but incur allocation/deallocation costs and prevent history-sensitive subprograms.
  - **Static:** No allocation overhead and allow history-sensitive subprograms, but do not support recursion and do not share storage.

### Subprograms as Parameters
Passing subprograms as parameters requires type checking for the parameters of the passed subprogram and introduces referencing environment issues. Depending on the language binding rules, the environment could be:
- **Shallow binding:** The environment of the subprogram that enacts it (natural for dynamic-scoped languages).
- **Deep binding:** The environment of the subprogram that declared it (natural for static-scoped languages).
- **Ad hoc binding:** The environment of the subprogram that passed it.

### Generic Subprograms
Allow programmers to write code that accommodates processes for different types of data, increasing software reusability.
- **Ad hoc polymorphism:** Implemented via overloaded subprograms (same name, different behaviors/protocols).
- **Subtype polymorphism:** Commonly supported by object-oriented languages (e.g., an `Animal` type accessing an object of any derived type like `Dog`).
- **Parametric polymorphism:** Uses generic parameters handled by the compiler (e.g., templates in C++ and generic methods in Java).

## Examples

### Positional and Keyword Parameters (Python)
```python
def get_sum(x1, x2, x3, x4):
    return x1 + x2 + x3 + x4

# Positional
_sum = get_sum(1, 2, 3, 4)

# Keyword
_sum2 = get_sum(1, x2=2, x3=3, x4=4)
```

### Closures (JavaScript)
```javascript
function makeAdder(x) {
    return function(y) { return x + y; }
}

var add10 = makeAdder(10);
console.log(add10(20)); // Outputs 30
```

### Coroutines (Python)
```python
def grep(pattern):
    print("Searching for", pattern)
    while True:
        line = (yield)
        if pattern in line:
            print(line)

search = grep('Waldo')
next(search) # Starts the coroutine
search.send("You've found Waldo!")
```

## Multiple Choice Questions

1. What is the fundamental form of process abstraction in programming languages that allow the reuse of code?
    - **A)** Variables
    - **B)** Subprograms
    - **C)** Compilers
    - **D)** Pointers

2. Which part of a subprogram provides the protocol but not the body?
    - **A)** Subprogram Declaration
    - **B)** Subprogram Header
    - **C)** Subprogram Definition
    - **D)** Parameter Profile

3. What is the term for dummy variables listed in the subprogram header?
    - **A)** Actual Parameters
    - **B)** Closure
    - **C)** Local Variables
    - **D)** Formal Parameters

4. Which category of subprograms is modeled after mathematical functions and returns values?
    - **A)** Procedures
    - **B)** Coroutines
    - **C)** Closures
    - **D)** Functions

5. Which parameter passing method initializes the formal parameter with the actual parameter's value and is normally implemented by copying?
    - **A)** Pass by Reference
    - **B)** Pass by Value
    - **C)** Pass by Name
    - **D)** Pass by Result

6. What type of local variable allows history-sensitive subprograms but does not support recursion?
    - **A)** Stack-dynamic
    - **B)** Coroutines
    - **C)** Static
    - **D)** Shallow

7. In the context of passing subprograms as parameters, which binding rule uses the environment of the subprogram that declared it?
    - **A)** Shallow binding
    - **B)** Ad hoc binding
    - **C)** Deep binding
    - **D)** Dynamic binding

8. What type of polymorphism is implemented via overloaded subprograms with the same name but different protocols?
    - **A)** Subtype polymorphism
    - **B)** Ad hoc polymorphism
    - **C)** Parametric polymorphism
    - **D)** Deep polymorphism

9. What is a closure?
    - **A)** A subprogram that modifies its actual parameters
    - **B)** A nested subprogram and its referencing environment
    - **C)** A subprogram with multiple entry points
    - **D)** A parameter passing method

10. A subprogram with multiple entry points controlled by the subprograms themselves is called a:
    - **A)** Procedure
    - **B)** Function
    - **C)** Coroutine
    - **D)** Prototype

### Answer Key & Explanations

1. **B) Subprograms** - Subprograms are defined as a fundamental form of process abstraction that allow the reuse of code by hiding process statements behind a call.
2. **A) Subprogram Declaration** - A subprogram declaration provides the protocol (parameter profile and return type) but not the body, unlike a definition.
3. **D) Formal Parameters** - Formal parameters are dummy variables listed in the subprogram header and used within the subprogram's body.
4. **D) Functions** - Functions return values and are modeled after mathematical functions, ideally producing no side effects.
5. **B) Pass by Value** - In pass by value, the actual parameter's value is used to initialize the formal parameter, usually by copying the value.
6. **C) Static** - Static local variables have no allocation overhead and allow history-sensitive subprograms, but they do not support recursion.
7. **C) Deep binding** - Deep binding uses the environment of the subprogram that declared it, which is natural for static-scoped languages.
8. **B) Ad hoc polymorphism** - Ad hoc polymorphism allows writing generic subprograms and is implemented via overloaded subprograms that share the same name but have different protocols.
9. **B) A nested subprogram and its referencing environment** - A closure is defined as a combination of a nested subprogram along with its referencing environment.
10. **C) Coroutine** - A coroutine is a special type of subprogram that has multiple entry points which are controlled by the coroutines themselves.

## References & Navigation

- **Previous Topic:** [[Statement Level Control Structures]]
- **Next Topic:** [[Abstract Data Types]]
- **Related Notes:** [[Functions and Programs]]

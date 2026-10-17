---
id: ccprog1_testing_debugging
type: note
course: CCPROG1
topic: Testing and Debugging
status: completed
---

# Testing and Debugging

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Conceptual]] #[[CCPROG1]] #[[Debugging]] #[[Software Quality]] #[[M7]]

---

## Overview

> Testing is the process of evaluating a program to verify that it functions exactly as intended, while debugging is the process of finding and fixing the defects (bugs) discovered during testing or execution.

## Key Definitions
 **Bug:** An error, flaw, or fault in a computer program that produces an incorrect or unexpected result. **Syntax Error:** Mistakes in the source code grammar that prevent the code from compiling. **Logic Error:** The program runs but produces incorrect outputs because the underlying algorithm is flawed. **Runtime Error:** Errors that occur during the execution of a program (e.g., dividing by zero). **Test Cases:** Specific sets of inputs and expected outputs used to test a program.

## Theoretical Framework

### The Debugging Process
1. **Identify the Error:** Notice that the program is not behaving as expected.
3. **Analyze the Cause:** Understand *why* the error is occurring.
4. **Fix the Bug:** Modify the code to resolve the issue.
5. **Re-test:** Verify that the fix worked and did not introduce new bugs.

### Testing Strategies **Black-box Testing:** Testing functionality without looking at the internal code structure. Focuses purely on inputs and expected outputs. **White-box Testing:** Testing internal structures, logic paths, and edge cases by reading the source code. **Boundary/Edge Cases:** Testing values at the extremes of allowed inputs (e.g., an empty string, `0`, negative numbers).

> [!tip] Best Practice
> When debugging in C, a simple but effective technique is adding `printf()` statements at key points to track variable values and control flow. For complex issues, use a debugger like `gdb` to step through the code line by line.

## Common Pitfalls
 Changing code randomly in hopes of fixing a bug ("shotgun debugging") instead of tracing the logic. Testing only the "happy path" (normal inputs) and ignoring edge cases. Failing to properly read compiler error messages, which often point directly to the source of syntax errors.

## Multiple Choice Questions

1. What best describes the role of **Test Cases**?
- **A)** An error, flaw, or fault in a computer program that produces an incorrect or ...
- **B)** Specific sets of inputs and expected outputs used to test a program
- **C)** Testing functionality without looking at the internal code structure. Focuses...
- **D)** A software-only abstraction that does not correspond to physical hardware

2. What best describes the role of **Bug**?
- **A)** A theoretical concept with no practical hardware implementation
- **B)** An error, flaw, or fault in a computer program that produces an incorrect or ...
- **C)** Testing values at the extremes of allowed inputs (e.g., an empty string, `0`,...
- **D)** Verify that the fix worked and did not introduce new bugs

3. What best describes the role of **White-box Testing**?
- **A)** An error, flaw, or fault in a computer program that produces an incorrect or ...
- **B)** A measurement unit used exclusively in network performance benchmarking
- **C)** Testing internal structures, logic paths, and edge cases by reading the sourc...
- **D)** Specific sets of inputs and expected outputs used to test a program

4. What best describes the role of **Re-test**?
- **A)** A deprecated standard that has been replaced in modern implementations
- **B)** Verify that the fix worked and did not introduce new bugs
- **C)** The program runs but produces incorrect outputs because the underlying algori...
- **D)** Testing functionality without looking at the internal code structure. Focuses...

5. In the sequence described in this topic, what happens during the **Fix the Bug:** step?
- **A)** Modify the code to resolve the issue.
- **B)** Verify that the fix worked and did not introduce new bugs.
- **C)** Notice that the program is not behaving as expected.
- **D)** Understand *why* the error is occurring.

6. Which step immediately follows **Fix the Bug:**?
- **A)** Re-test:
- **B)** Analyze the Cause:
- **C)** Identify the Error:
- **D)** There is no subsequent step

7. According to the material on **Testing and Debugging**, which statement is correct?
- **A)** The opposite of the stated principle applies
- **B)** 4. Fix the Bug: Modify the code to resolve the issue.
- **C)** This principle only applies in theoretical models, not practical systems
- **D)** The described behavior is considered deprecated in modern implementations

8. According to the material on **Testing and Debugging**, which statement is correct?
- **A)** The described behavior is considered deprecated in modern implementations
- **B)** This principle only applies in theoretical models, not practical systems
- **C)** 5. Re-test: Verify that the fix worked and did not introduce new bugs.
- **D)** The opposite of the stated principle applies

9. According to the material on **Testing and Debugging**, which statement is correct?
- **A)** This principle only applies in theoretical models, not practical systems
- **B)** Testing is the process of evaluating a program to verify that it functions exactly as intended, w...
- **C)** The described behavior is considered deprecated in modern implementations
- **D)** Testing is not the process of evaluating a program to verify that it functions exactly as intended, w...

10. According to the material on **Testing and Debugging**, which statement is correct?
- **A)** 1. Identify the Error: Notice that the program is not not behaving as expected.
- **B)** The described behavior is considered deprecated in modern implementations
- **C)** This principle only applies in theoretical models, not practical systems
- **D)** 1. Identify the Error: Notice that the program is not behaving as expected.

### Answer Key & Explanations
1. **B)** **Test Cases** is defined in the note as: Specific sets of inputs and expected outputs used to test a program.

2. **B)** **Bug** is defined in the note as: An error, flaw, or fault in a computer program that produces an incorrect or unexpected result.

3. **C)** **White-box Testing** is defined in the note as: Testing internal structures, logic paths, and edge cases by reading the source code.

4. **B)** **Re-test** is defined in the note as: Verify that the fix worked and did not introduce new bugs.

5. **A)** The Fix the Bug: step involves: Modify the code to resolve the issue.

6. **A)** According to the sequence, Re-test: directly follows Fix the Bug:.

7. **B)** The note explicitly states: "4. Fix the Bug: Modify the code to resolve the issue."

8. **C)** The note explicitly states: "5. Re-test: Verify that the fix worked and did not introduce new bugs."

9. **B)** The note explicitly states: "Testing is the process of evaluating a program to verify that it functions exactly as intended, w..."

10. **D)** The note explicitly states: "1. Identify the Error: Notice that the program is not behaving as expected."

## References & Navigation

- **Previous Topic:** [[Iterative Statements in C]]
- **Next Topic:** [[Coding Standards]]
- **Related Notes:** [[Debugging and Test Tools]], [[Exception Handling]]

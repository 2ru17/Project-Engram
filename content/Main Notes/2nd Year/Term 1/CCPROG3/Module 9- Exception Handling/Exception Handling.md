---
id: exception_handling
type: note
course: CCPROG3
topic: Exception Handling
status: completed
---

# Exception Handling

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Exception Handling]] #[[Code Snippets]] #[[M9]]

---
## Key Definitions

> **Exception Handling** is a mechanism to handle runtime errors, ensuring the normal flow of the application can be maintained.

## Theoretical Framework

In Java, exceptions are objects that wrap an error event that occurred within a method. **Checked Exceptions:** Checked at compile-time (e.g., `IOException`). Must be declared or handled. **Unchecked Exceptions:** Runtime exceptions (e.g., `NullPointerException`). Not checked at compile-time. **Errors:** Serious problems that a reasonable application should not try to catch (e.g., `OutOfMemoryError`).

## Code Implementation

```java
import java.io.*;

public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // Throws ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        } finally {
            System.out.println("This block always executes.");
        }
    }
    
    // Method declaring a checked exception
    public void readFile(String path) throws IOException {
        FileReader file = new FileReader(path);
        BufferedReader fileInput = new BufferedReader(file);
        
        // Print first 3 lines
        for (int counter = 0; counter < 3; counter++) 
            System.out.println(fileInput.readLine());
            
        fileInput.close();
    }
}
```

## Syntax Breakdown
 `try`: Defines a block of code to be tested for errors. `catch`: Defines a block of code to be executed if an error occurs. `finally`: Defines a block of code to be executed regardless of the result. `throw`: Used to throw an exception explicitly. `throws`: Used in a method signature to declare that it might throw exceptions.

## Complexity Analysis

Exception handling introduces slight runtime overhead during the normal execution flow and significant overhead when an exception is actually thrown and caught, due to stack trace generation and stack unwinding. Avoid using exceptions for normal control flow.

## Multiple Choice Questions

1. What is the primary purpose of Exception Handling in Java?
- **A)** To optimize the execution speed of the program.
- **B)** To handle runtime errors and maintain the normal flow of the application.
- **C)** To hide source code implementation details.
- **D)** To prevent compile-time syntax errors.

2. How do Checked Exceptions differ from Unchecked Exceptions?
- **A)** Checked exceptions are checked at runtime, while unchecked exceptions are checked at compile-time.
- **B)** Checked exceptions must be declared or handled at compile-time, unlike unchecked exceptions.
- **C)** Checked exceptions represent serious system errors like `OutOfMemoryError`.
- **D)** Unchecked exceptions require a `throws` declaration in the method signature.

3. Which block of code executes regardless of whether an exception occurs or not?
- **A)** `try`
- **B)** `catch`
- **C)** `finally`
- **D)** `throw`

4. What does the `throws` keyword indicate when used in a method signature?
- **A)** It explicitly throws a new exception object immediately.
- **B)** It catches any exceptions thrown within the method.
- **C)** It declares that the method might throw exceptions, passing the responsibility to the caller.
- **D)** It defines a custom exception class.

5. Why is it recommended to avoid using exceptions for normal control flow?
- **A)** Because exceptions can only be thrown once per application run.
- **B)** Because they introduce significant overhead due to stack trace generation and stack unwinding.
- **C)** Because it causes the Java Virtual Machine to crash immediately.
- **D)** Because checked exceptions cannot be caught by standard `catch` blocks.

### Answer Key & Explanations
1. **B)** Exception handling provides a safety net to catch errors gracefully, preventing the entire application from crashing unexpectedly.
2. **B)** The compiler mandates that Checked Exceptions (e.g., `IOException`) be explicitly handled, whereas Unchecked Exceptions (like logic errors) bypass compile-time checks.
3. **C)** The `finally` block is specifically designed for cleanup tasks (like closing resources) because it is guaranteed to execute in all scenarios.
4. **C)** The `throws` clause alerts calling methods that they must be prepared to handle or further propagate potential exceptions.
5. **B)** Gathering the stack trace and unwinding the call stack are computationally expensive operations meant only for exceptional, rare failure states.

## References & Navigation

- **Previous Topic:** [[Abstract Classes and Interfaces]]
- **Next Topic:** [[Files I-O (via Streams)]]
- **Related Notes:** [[Overview of Programming Languages]]

---
id: csadprg_finals_reviewer
type: note
course: CSADPRG
topic: "Finals Reviewer"
status: completed
---

# CSADPRG Finals Reviewer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Finals Review]]

---

## 1. Subprograms – Fundamentals

### Definition, Purpose, and Benefits
- **Definition:** A sequence of instructions that perform a specific task, packaged as a unit.
- **Benefits:**
  - **Reusability:** Write once, call multiple times.
  - **Modularity:** Breaks complex problems into smaller, manageable chunks.
  - **Reduced LOC (Lines of Code):** Prevents code duplication.

### Header vs. Body vs. Signature
- **Header:** The first part of the definition, including the name, kind of subprogram, and formal parameters.
- **Signature:** The number, order, and types of the parameters. *(Note: Return type is usually NOT part of the signature in languages like Java/C).*
- **Body:** The block of code that defines the actions the subprogram executes.

### Types of Subprograms
- **Functions:** Subprograms that **return a value**. They are structurally meant to be evaluated as expressions (e.g., `y = calculate(x);`).
- **Procedures:** Subprograms that **do not return a value** (like `void` in Java/C). They are executed for their side effects (e.g., modifying a global variable, printing to console).
- **Methods:** Subprograms that are bound to a specific class or object in Object-Oriented Programming.

### Recursion
- **How it works:** A subprogram calls itself, pushing a new activation record (stack frame) onto the call stack for each invocation.
- **Missing Base Case:** Without a proper base case to terminate the recursive calls, it will lead to an infinite loop, eventually resulting in a **Stack Overflow Error** when memory is exhausted.

### Closures
- **Definition:** A subprogram and the referencing environment where it was defined. It "closes over" or remembers the variables in its lexical scope even when called outside that scope.
- **When they're needed:** Essential in languages that support nested subprograms, first-class functions, and **static scoping** (e.g., returning a function from a function in JavaScript or Python).
- **When they're NOT needed:** If a language uses strictly dynamic scoping, or if it doesn't allow nested subprograms (like standard C).

---

## 2. Parameter Passing Mechanisms (Tracing Masterclass)

> [!IMPORTANT] Exam Strategy
> Expect explicit code tracing. Practice tracing the exact variable values array indices.

### The 5 Mechanisms
1. **Pass-by-Value:** The actual parameter is evaluated, and its **value is copied** into the formal parameter. The caller's variable *never* changes.
2. **Pass-by-Reference:** An access path (pointer/reference) is transmitted. Both formal and actual parameters share the **same memory location**. Changes persist to the caller. High risk of *aliasing*.
3. **Pass-by-Value-Result:** The value is copied in, and when the subprogram terminates, the final value is **copied back out** to the actual parameter. Safe from aliasing during execution, but costly for large structs/arrays.
4. **Pass-by-Result:** No value is passed in (initial value is undefined). Before the subprogram terminates, the formal parameter's value is **copied out** to the actual parameter.
5. **Pass-by-Name:** The actual parameter expression is textually substituted into the subprogram. The expression is **re-evaluated on every access**. Highly unpredictable with loop variables or array indices like `a[i]`.

### Master Tracing Example

Consider the following pseudo-code. Trace the values of `i` and `a[0], a[1], a[2]` after `swap(i, a[i])` is called.

```text
int i = 1;
int a[3] = {10, 20, 30};

void swap(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    i = 2; // Global variable changed mid-execution!
}

void main() {
    swap(i, a[i]);
    print(i, a[0], a[1], a[2]);
}
```

| Mechanism | Trace Execution & Final Output |
| :--- | :--- |
| **Pass-by-Value** | `x=1`, `y=20`. `swap` modifies local copies. Global `i` becomes `2`. `a` is unmodified.<br>**Output:** `2, 10, 20, 30` |
| **Pass-by-Reference** | `x` points to `i`, `y` points to `a[1]`. `temp=1`. `x` (which is `i`) becomes `20`. `y` (which is `a[1]`) becomes `1`. Then global `i` becomes `2`.<br>**Output:** `2, 10, 1, 30` |
| **Pass-by-Value-Result** | Copies in: `x=1`, `y=20`. Local swap: `x=20`, `y=1`. Global `i` becomes `2`. End of subprogram, copy out: `i = x` (so `i=20`), then `a[1] = y` (so `a[1]=1`).<br>**Output:** `20, 10, 1, 30` |
| **Pass-by-Name** | Textual substitution: `temp = i; i = a[i]; a[i] = temp; i = 2;`<br>Trace: `temp = 1`. Then `i = a[1]` -> `i = 20`. Then `a[i] = temp` -> evaluates as `a[20] = 1` -> **OUT OF BOUNDS ERROR!** |

### Default Mechanisms in Languages
- **Java:** Strictly **Pass-by-Value**.
  - Primitives: Passes a copy of the primitive value.
  - Objects: Passes a copy of the *reference* (memory address) to the object. You can mutate the object's internals, but you cannot reassign the caller's reference.
- **C:** Strictly **Pass-by-Value**.
  - To simulate pass-by-reference, you must explicitly pass pointers (e.g., `&x`) and dereference them inside the function (`*x`).

---

## 3. Abstract Data Types (ADT) & Encapsulation

### Interface vs. Implementation
- **Interface:** The contract. It defines *what* operations are available (the public methods and their signatures) without revealing how they work.
- **Implementation:** The hidden logic and data structures inside the ADT that actually perform the operations.

### Encapsulation and Accessors
- **Private Fields + Public Methods:** By making fields `private`, you prevent external code from directly modifying internal state in an invalid way. This protects data integrity.
- **Getters/Setters (Accessors):** They provide controlled access to private fields. A setter can include validation logic (e.g., `if (age > 0) this.age = age;`).

### Language Enforcement
- **Java Classes:** Strictly enforce encapsulation using access modifiers (`private`, `protected`, `public`).
- **C Structs:** Do NOT natively enforce encapsulation. All members of a C struct are publicly accessible by default, meaning any code can break internal invariants.

---

## 4. Inheritance, Polymorphism, Overriding & Overloading

### Overriding vs. Overloading
| Feature | Overloading | Overriding |
| :--- | :--- | :--- |
| **Definition** | Same method name, **different parameter list** (signature). | Same method name, **same signature**, subclass changes behavior. |
| **Binding Time** | **Static Binding** (Resolved at Compile-time). | **Dynamic Binding** (Resolved at Runtime based on object type). |
| **Location** | Typically within the same class. | Between Parent and Child classes. |

### Polymorphic Assignment
```java
Parent p = new Child();
```
- **Accessible Methods:** The reference type (`Parent`) dictates *what* methods can be called at compile-time. If you try to call a method that only exists in `Child`, the compiler throws an error.
- **Executed Methods:** The object type (`Child`) dictates *which overridden version* of the method executes at runtime (Dynamic Binding).

### Master OOP Tracing Example

```java
class A {
    void print(int x) { System.out.println("A int"); }
    void show() { System.out.println("A show"); }
}

class B extends A {
    // Overriding
    void show() { System.out.println("B show"); }
    // Overloading
    void print(double x) { System.out.println("B double"); }
    // Subclass exclusive
    void exclusive() { System.out.println("B exclusive"); }
}

public class Main {
    public static void main(String[] args) {
        A obj1 = new A();
        B obj2 = new B();
        A obj3 = new B(); // Polymorphic Assignment
        
        obj3.show();         // Output: "B show" (Dynamic binding to B's overriding method)
        obj3.print(5);       // Output: "A int" (Static binding based on reference type A)
        // obj3.print(5.5);  // ERROR: A does not have a print(double) method.
        // obj3.exclusive(); // ERROR: exclusive() is not defined in reference type A.
    }
}
```

---

## 5. ADT - Interfaces & Programming by Interface

### Contracts
- An interface is purely a contract. It declares the method signatures that a class *must* implement, completely separating the definition of operations from their implementation.

### Programming by Interface
- **Concept:** Declaring variables, parameters, and return types as Interfaces rather than concrete classes. (e.g., `List<String> list = new ArrayList<>();`).
- **Benefits:**
  - **Flexibility/Loose Coupling:** You can easily swap out the underlying implementation (e.g., changing `ArrayList` to `LinkedList`) without changing the code that uses it.
  - **Testability:** Makes it incredibly easy to inject mock implementations during unit testing.


## References & Navigation

- **Related Notes:** [[Advanced Programming]]

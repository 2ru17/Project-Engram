---
id: design_principles
type: note
course: CCPROG3
topic: Design Principles
status: completed
---

# Design Principles

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Design Principles]] #[[Conceptual]] #[[M11]]

---
## Key Definitions

> **Design Principles** are guidelines that help software engineers design better, more maintainable, and scalable object-oriented software. The most prominent are the SOLID principles.

## Theoretical Framework

**SOLID** is an acronym for five design principles:
1. **Single Responsibility Principle (SRP):** A class should have one, and only one, reason to change.
2. **Open/Closed Principle (OCP):** Software entities should be open for extension, but closed for modification.
3. **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering the correctness of the program.
4. **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use.
5. **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions.

## Important Formulas

**Coupling vs. Cohesion:** Good design aims for **Low Coupling** (dependencies between modules are minimized) and **High Cohesion** (responsibilities within a module are strongly related).

## Worked Examples

**Violating SRP:** A `User` class that handles user data storage, user validation, and email notification.
**Fixing SRP:** Create separate classes: `UserRepository` (storage), `UserValidator` (validation), and `EmailService` (notification).

## Multiple Choice Questions

1. What does the Single Responsibility Principle (SRP) dictate?
    - **A)** A class should have only one public method.
    - **B)** A class should have one, and only one, reason to change.
    - **C)** A program should consist of only a single class.
    - **D)** A class should manage exactly one database connection.

2. According to the Open/Closed Principle (OCP), how should software entities be designed?
    - **A)** Open for modification, closed for extension.
    - **B)** Open for public access, closed for private access.
    - **C)** Open for extension, but closed for modification.
    - **D)** Open for inheritance, closed for instantiation.

3. Which principle states that subtypes must be substitutable for their base types without altering program correctness?
    - **A)** Single Responsibility Principle
    - **B)** Dependency Inversion Principle
    - **C)** Interface Segregation Principle
    - **D)** Liskov Substitution Principle

4. What is the goal of having "High Cohesion" in software design?
    - **A)** To minimize dependencies between different modules.
    - **B)** To ensure that responsibilities within a module are strongly related.
    - **C)** To force clients to depend on interfaces they do not use.
    - **D)** To allow high-level modules to depend on low-level modules directly.

5. How would you fix a `User` class that handles user data storage, validation, and email notifications to adhere to SRP?
    - **A)** Combine all methods into a single `manageUser()` method.
    - **B)** Make the `User` class abstract and force subclasses to implement the methods.
    - **C)** Create separate classes for storage, validation, and notification.
    - **D)** Change all the methods to be static so they belong to the class.

### Answer Key & Explanations
1. **B)** SRP ensures that a class is highly cohesive by focusing its duties; if requirements change for one aspect, only that specific class needs modification.
2. **C)** OCP dictates that new functionality should be added by writing new code (extension) rather than altering existing, tested code (modification).
3. **D)** LSP ensures reliable inheritance behavior; any code relying on a parent class should function flawlessly when given a subclass instead.
4. **B)** High Cohesion means all elements within a class or module belong together and serve a singular, unified purpose.
5. **C)** Breaking the monolith into `UserRepository`, `UserValidator`, and `EmailService` ensures each class handles exactly one discrete responsibility.

## References & Navigation

- **Previous Topic:** [[Files I-O (via Streams)]]
- **Related Notes:** [[Overview of Programming Languages]]

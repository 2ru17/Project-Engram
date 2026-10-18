---
id: abstract_classes_and_interfaces
type: note
course: CCPROG3
topic: Abstract Classes and Interfaces
status: completed
---

# Abstract Classes and Interfaces

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Abstract Classes and Interfaces]] #[[Code Snippets]] #[[M8]]

---
## Key Definitions

> An **Abstract Class** is a class that cannot be instantiated and is used as a base class for other classes to extend. It can have both abstract and non-abstract methods.
> An **Interface** is a completely "abstract class" that is used to group related methods with empty bodies.

## Theoretical Framework

In Java, abstraction is a fundamental principle of Object-Oriented Programming (OOP) that helps to reduce complexity and hide implementation details.  **Abstract Classes** allow sharing code among closely related classes. They can hold state (fields) and have constructors. **Interfaces** represent a contract. They are used to guarantee that a class implements a specific set of methods, enabling multiple inheritance of type.

## Code Implementation

```java
// Abstract Class Example
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract method (does not have a body)
    public abstract void makeSound();
    
    // Regular method
    public void sleep() {
        System.out.println("Zzz");
    }
}

// Interface Example
interface Movable {
    void move();
}

// Concrete Class implementing both
class Dog extends Animal implements Movable {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof");
    }
    
    @Override
    public void move() {
        System.out.println("Running");
    }
}
```

## Syntax Breakdown
 `abstract` keyword: Used before `class` to define an abstract class, and before method signatures to define abstract methods. `interface` keyword: Used to define an interface. `extends`: Keyword used by a class to inherit from an abstract class. `implements`: Keyword used by a class to implement an interface.

## Complexity Analysis

Abstract classes and interfaces do not inherently change runtime complexity, but they affect architectural complexity. Interfaces increase architectural flexibility (loose coupling) but might require more classes to define behaviors. Method resolution at runtime (polymorphism) incurs a very slight overhead (virtual method tables).

## Multiple Choice Questions

1. What is a key characteristic of an Abstract Class?
    - **A)** It can only contain abstract methods.
    - **B)** It cannot be instantiated and is used as a base class.
    - **C)** It supports multiple inheritance of state.
    - **D)** All its methods must have empty bodies.

2. How does an Interface differ from an Abstract Class in terms of inheritance?
    - **A)** A class can only implement one Interface, but extend multiple Abstract Classes.
    - **B)** Interfaces can hold state (fields), while Abstract Classes cannot.
    - **C)** A class can implement multiple Interfaces, enabling multiple inheritance of type.
    - **D)** Interfaces can have constructors, while Abstract Classes cannot.

3. Which keyword is used by a class to guarantee it fulfills the contract of an Interface?
    - **A)** `extends`
    - **B)** `implements`
    - **C)** `abstract`
    - **D)** `inherits`

4. In the provided code, why does the `Animal` class have a constructor if it cannot be instantiated?
    - **A)** To allow external classes to create Animal objects directly.
    - **B)** To initialize state (like `name`) that subclasses can use.
    - **C)** Because all classes in Java must have a public constructor.
    - **D)** To prevent subclasses from having their own constructors.

5. How do abstract classes and interfaces affect the complexity of a program?
    - **A)** They increase architectural flexibility but may require more classes to define behaviors.
    - **B)** They drastically reduce runtime overhead by avoiding virtual method tables.
    - **C)** They eliminate the need for polymorphism.
    - **D)** They make the program run faster by skipping compile-time checks.

### Answer Key & Explanations

1. **B**. Abstract classes serve as structural templates for subclasses but are incomplete themselves, forbidding direct instantiation via `new`.
2. **C**. While Java restricts classes to extending only one Abstract Class, it allows implementing any number of Interfaces to inherit multiple behaviors.
3. **B**. The `implements` keyword explicitly binds a class to provide concrete implementations for the methods declared in an Interface.
4. **B**. Abstract classes can contain shared fields (state). Their constructors ensure this state is properly initialized when a concrete subclass is instantiated.
5. **A**. Using these abstractions reduces tight coupling and enhances design flexibility, though it naturally introduces more structural files to the project.

## References & Navigation

- **Previous Topic:** [[Model-View-Controller]]
- **Next Topic:** [[Exception Handling]]
- **Related Notes:** [[Overview of Programming Languages]]

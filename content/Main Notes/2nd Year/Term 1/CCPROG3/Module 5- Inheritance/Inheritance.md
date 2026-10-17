---
id: inheritance
type: note
course: CCPROG3
topic: Inheritance
status: completed
---

# Inheritance

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Inheritance]] #[[Code Snippets]] #[[M5]]

---
## Key Definitions

> **Inheritance** is an OOP principle where a new class (subclass) acquires the properties and behaviors (fields and methods) of an existing class (superclass).

## Theoretical Framework
 Inherited members can be used as-is, overridden, or hidden. Java supports single inheritance of state (a class can only extend one superclass) but multiple inheritance of type (a class can implement multiple interfaces). Enhances code reusability and establishes an "is-a" relationship.

## Code Implementation

```java
// Superclass
class Vehicle {
    protected String brand = "Ford";
    
    public void honk() {
        System.out.println("Tuut, tuut!");
    }
}

// Subclass extending Vehicle
class Car extends Vehicle {
    private String modelName = "Mustang";
    
    public void printDetails() {
        System.out.println(brand + " " + modelName);
    }
    
    // Overriding the superclass method
    @Override
    public void honk() {
        System.out.println("Beep, beep!");
    }
}
```

## Syntax Breakdown
 `extends`: Keyword used to inherit from a class. `super`: Keyword used to refer to the immediate parent class object. `@Override`: Annotation to indicate that the child class method is over-writing its base class method. `protected`: Access modifier allowing subclasses to access the member.

## Complexity Analysis

Inheritance structures create a virtual method table (vtable) for dynamic method dispatch. Calling overridden methods has a negligible O(1) overhead. Deep inheritance trees can make code difficult to maintain and trace (the "yo-yo problem").

## Multiple Choice Questions

1. What is Inheritance in the context of Object-Oriented Programming?
- **A)** A mechanism to hide internal implementation details.
- **B)** A principle where a new class acquires the properties and behaviors of an existing class.
- **C)** The process of grouping related classes into a single package.
- **D)** The ability of an object to take on many forms.

2. Which keyword is used in Java to indicate that a child class method is over-writing its base class method?
- **A)** `extends`
- **B)** `super`
- **C)** `@Override`
- **D)** `protected`

3. In Java, what is meant by the rule that a class supports "single inheritance of state"?
- **A)** A class can only implement one interface.
- **B)** A class can only extend one superclass.
- **C)** A class can only have one subclass.
- **D)** A class can only instantiate one object.

4. What is the purpose of the `super` keyword in a subclass?
- **A)** To refer to the immediate parent class object.
- **B)** To define a new method that overrides a parent method.
- **C)** To prevent a class from being inherited.
- **D)** To access private variables of the parent class from anywhere.

5. What potential maintainability issue arises from deep inheritance trees?
- **A)** The "yo-yo problem", making code difficult to maintain and trace.
- **B)** Excessive garbage collection overhead.
- **C)** Inability to use dynamic method dispatch.
- **D)** Reduced memory footprint.

### Answer Key & Explanations
1. **B)** Inheritance allows a subclass to reuse and build upon the fields and methods defined in a superclass.
2. **C)** The `@Override` annotation is a compiler directive that ensures a method is properly overriding a superclass method.
3. **B)** Java avoids the complexities of multiple inheritance by restricting classes to extend only a single parent class.
4. **A)** The `super` keyword provides a direct reference to the superclass, allowing access to its constructors and methods.
5. **A)** Deep hierarchies force developers to constantly trace logic up and down multiple class layers, famously termed the "yo-yo problem".

## References & Navigation

- **Previous Topic:** [[Collections]]
- **Next Topic:** [[Graphical User Interfaces and Event Handling]]
- **Related Notes:** [[Overview of Programming Languages]]

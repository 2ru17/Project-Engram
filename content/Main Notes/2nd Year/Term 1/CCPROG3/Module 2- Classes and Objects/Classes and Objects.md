---
id: classes_and_objects
type: note
course: CCPROG3
topic: Classes and Objects
status: completed
---

# Classes and Objects

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Classes and Objects]] #[[Conceptual]] #[[M2]]

---

## Overview
In the Object-Oriented Programming (OOP) paradigm, modeling real-world entities effectively in software requires a robust foundational structure. This is achieved through the use of **Classes** and **Objects**. While procedural programming treats data and procedures as separate entities, OOP encapsulates them. A class acts as a central blueprint or prototype from which individual objects are created. By understanding the distinction between a class (the abstract definition) and an object (the concrete manifestation), developers can design highly modular, reusable, and secure software architectures.

## Key Definitions

- **Class:** A blueprint, template, or prototype that defines the variables (state) and the methods (behavior) common to all objects of a certain kind. It is an abstract definition and does not represent a specific instance.
- **Object:** A concrete instance of a class. It is a specific entity constructed from a class blueprint that possesses its own unique state, predefined behavior, and distinct identity.
- **Instantiation:** The process of creating a specific object from a class blueprint using the `new` keyword in Java.

## Theoretical Framework / Core Concepts

### The Anatomy of an Object
Object-Oriented Programming revolves entirely around "objects". Every object constructed in OOP conceptually consists of three core characteristics:
1. **State:** Represented by attributes, fields, or variables within the class. The state reflects the current data or condition of the object at a given point in time (e.g., a car is "red" and currently going "60 mph").
2. **Behavior:** Represented by methods or functions. Behavior defines what an object can do or how it can interact with other objects (e.g., a car can "accelerate" or "brake").
3. **Identity:** A unique property that distinguishes one object from every other object, even if they have the exact same state. In Java, this is typically handled intrinsically by the JVM via memory addresses.

### Encapsulation and Data Hiding
Classes provide encapsulation, logically grouping related data and the operations that manipulate that data together into a cohesive unit. A critical sub-principle of this is **Data Hiding**:
- **Access Modifiers:** Keywords like `private`, `protected`, and `public` are used to control the visibility and accessibility of a class's internal state.
- By making state `private` and exposing `public` methods (like getters and setters), a class strictly controls how its data is modified, protecting it from invalid external manipulation.

## Worked Examples / Protocol Walkthroughs / Calculations

Consider modeling a vehicle in software.

**The Class Blueprint (`Car.java`)**
We define a `Car` class, specifying the general attributes and methods that any car should have:
```java
public class Car {
    // State (Attributes)
    private String color;
    private String brand;
    private int speed;

    // Constructor
    public Car(String color, String brand) {
        this.color = color;
        this.brand = brand;
        this.speed = 0;
    }

    // Behavior (Methods)
    public void accelerate(int amount) {
        this.speed += amount;
    }

    public void brake() {
        this.speed = 0;
    }
}
```

**Object Instantiation**
When the program runs, we can create distinct, concrete objects from this blueprint.
```java
// Instantiating specific objects
Car myCar = new Car("Red", "Toyota");
Car yourCar = new Car("Blue", "Ford");

// Manipulating the state of a specific object
myCar.accelerate(50);
```
Here, `myCar` and `yourCar` possess different identities and states, despite being born from the identical `Car` class blueprint.

## Summary & Key Takeaways
- A class is merely an abstract blueprint, while an object is a concrete, living instance of that class in memory.
- Every object inherently possesses State (attributes), Behavior (methods), and a unique Identity.
- Classes facilitate encapsulation, grouping related data and behaviors together.
- Data Hiding through access modifiers is essential for protecting an object's internal state from unintended interference.

## Multiple Choice Questions

1. What is the fundamental difference between a Class and an Object?
- **A)** A class is an instance of an object.
- **B)** A class is a blueprint, while an object is a concrete instance created from that blueprint.
- **C)** A class contains only state, while an object contains only behavior.
- **D)** There is no difference; the terms are interchangeable.

2. Which of the following best describes an object's "State"?
- **A)** The methods or functions the object can execute.
- **B)** The unique memory address assigned by the JVM.
- **C)** The current data held in the object's attributes or fields.
- **D)** The access modifiers applied to the class.

3. How does the Java Virtual Machine (JVM) typically handle an object's "Identity"?
- **A)** By the object's memory address.
- **B)** By the names of the attributes in the object.
- **C)** By the return values of the object's methods.
- **D)** By the public access modifiers.

4. What is the primary purpose of Encapsulation in class design?
- **A)** To make code execute faster by the JVM.
- **B)** To logically group related data and the operations that manipulate it into a single unit.
- **C)** To allow multiple classes to inherit from a single superclass.
- **D)** To translate Bytecode into machine code.

5. What does "Data Hiding" achieve in Object-Oriented Programming?
- **A)** It encrypts the source code to prevent plagiarism.
- **B)** It restricts access to a class's internal state using access modifiers like `private`.
- **C)** It deletes temporary variables after a method finishes execution.
- **D)** It hides the source code from the compiler.

6. When instantiating an object in Java, which keyword is primarily used?
- **A)** `create`
- **B)** `instance`
- **C)** `new`
- **D)** `build`

7. In the context of a `Car` class, which of the following represents "Behavior"?
- **A)** The `color` of the car.
- **B)** The `accelerate()` method.
- **C)** The `brand` of the car.
- **D)** The specific `Car` object created in memory.

8. If you create two `Car` objects, `car1` and `car2`, both with the exact same color and brand, which statement is true?
- **A)** They share the same identity in memory.
- **B)** Modifying `car1`'s speed will also modify `car2`'s speed.
- **C)** They have identical state but distinct, unique identities.
- **D)** The compiler will throw an error because they are identical.

9. Why is it generally recommended to make class attributes `private`?
- **A)** It forces the JVM to optimize the variables.
- **B)** It prevents external classes from accessing or modifying the variables in invalid or unexpected ways.
- **C)** It allows the variables to be inherited by subclasses.
- **D)** It is a strict requirement for the code to compile.

10. What is the role of a Constructor in a class?
- **A)** To destroy an object and free up memory.
- **B)** To define the behavior of the object.
- **C)** To initialize a newly instantiated object's state.
- **D)** To compile the class into Bytecode.

### Answer Key & Explanations

1. **B** - A class is the abstract template defining structure, whereas an object is the tangible realization of that structure in memory.
2. **C** - State refers strictly to the data attributes/fields of the object at a specific moment in time.
3. **A** - Even if two objects hold the exact same data, the JVM distinguishes them by their distinct locations (addresses) in memory.
4. **B** - Encapsulation ensures that the data and the methods acting on that data are strictly bundled together, improving modularity.
5. **B** - Data hiding protects internal state from outside interference and misuse by utilizing access modifiers to restrict visibility.
6. **C** - The `new` keyword is responsible for allocating memory and instantiating an object from a class blueprint.
7. **B** - Behavior refers to the actions or methods that an object can perform, such as accelerating.
8. **C** - Objects possess a unique identity irrespective of their state; two cars with the same specifications are still two separate physical entities.
9. **B** - Making attributes `private` enforces strict control over state changes, typically requiring interaction via public getter and setter methods.
10. **C** - Constructors are special methods automatically invoked upon instantiation specifically to set the initial state of the object.

## References & Navigation

- **Previous Topic:** [[The Object-Oriented Paradigm and an Overview of Java]]
- **Next Topic:** [[Class Relationships]]
- **Related Notes:** [[Overview of Programming Languages]]

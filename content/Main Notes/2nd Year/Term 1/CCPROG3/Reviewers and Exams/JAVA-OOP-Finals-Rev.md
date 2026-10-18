---
id: JAVA-OOP-Finals-Rev
type: note
course: CCPROG3
topic: Object-Oriented Concepts
status: completed
---

# JAVA-OOP-Finals-Rev

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG3]] #[[Object-Oriented Concepts]] #[[Programming]] #[[Computer Science]] #[[Java]] #[[Object-Oriented Programming]] #[[Software Engineering Principles]] #[[Algorithms]]

---

## Overview

> 1. [Java Fundamentals & OOP Basics (Weeks 1-2)](#1-java-fundamentals--oop-basics-weeks-1-2)

## Details / Theory

## Table of Contents

1. [Java Fundamentals & OOP Basics (Weeks 1-2)](#1-java-fundamentals--oop-basics-weeks-1-2)
2. [Classes, Objects & Encapsulation (Weeks 3-4)](#2-classes-objects--encapsulation-weeks-3-4)
3. [Class Relationships (Weeks 5-6)](#3-class-relationships-weeks-5-6)
4. [Collections Framework (Week 6)](#4-collections-framework-week-6)
5. [Inheritance & Polymorphism (Weeks 8-10)](#5-inheritance--polymorphism-weeks-8-10)
6. [Abstraction: Abstract Classes & Interfaces (Week 11)](#6-abstraction-abstract-classes--interfaces-week-11)
7. [Exception Handling (Week 12)](#7-exception-handling-week-12)
8. [Bonus: MVC & GUI (Week 9)](#8-bonus-mvc--gui-week-9)

---

## 1. Java Fundamentals & OOP Basics (Weeks 1-2)

### 1. Theory (Multiple Choice)
 **The Paradigm Shift:**
**Procedural (C):** Focuses on _actions_ (verbs). Data and functions are separate.
**Object-Oriented (Java):** Focuses on _entities_ (nouns). Data (attributes) and behavior (methods) are encapsulated into Objects.
**4 Pillars of OOP:** 1. **Encapsulation:** Hiding internal details (security/integrity). 2. **Inheritance:** Reusability of code (Parent-Child). 3. **Polymorphism:** Flexibility (One interface, many forms). 4. **Abstraction:** Hiding complexity (Showing only what's necessary).
 **Data Types & Memory Management:**
**Primitive Types (Stack Memory):**
Stores the _actual value_.
**Types:** `byte` (8-bit), `short` (16-bit), `int` (32-bit), `long` (64-bit), `float` (32-bit), `double` (64-bit), `char` (16-bit Unicode), `boolean` (true/false).
**Comparison:** `==` compares the actual bits (values).
**Reference Types (Heap Memory):**
Stores the _memory address_ (reference) pointing to an object in the Heap.
**Types:** Classes, Interfaces, Arrays, Strings.
**Comparison:** `==` compares the _memory address_ (are they the same object?). `.equals()` compares the _content_ (logical equality, if overridden).
**Default Value:** `null`.
 **Key Modifiers:**
**Static (`static`):**
Belongs to the **Class**, not an instance.
Loaded once into memory (Class Area).
Shared by ALL objects of that class.
_Rule:_ Static methods cannot access non-static (instance) members directly (no `this` context).
**Final (`final`):**
**Variable:** Constant. Value cannot be changed once assigned.
_Blank Final:_ A final variable not initialized at declaration. MUST be initialized in the constructor.
**Method:** Cannot be overridden by subclasses.
**Class:** Cannot be inherited (e.g., `String`, `Math`).
 **Essential APIs:**
**String API:** Strings are **Immutable** (cannot be changed). Modifying a string creates a new object.
`length()`, `charAt(i)`, `substring(start, end)`, `equals(str)`, `indexOf(str)`.
**Math API:** All methods are `static`.
`Math.abs()`, `Math.pow(a, b)`, `Math.sqrt()`, `Math.random()` (returns 0.0 to 1.0).
**Scanner API:** Used for user input.
`next()` (word), `nextLine()` (full line), `nextInt()`, `nextDouble()`.
_Pitfall:_ Mixing `nextInt()` and `nextLine()` leaves a newline character in the buffer. Fix: Call `nextLine()` once to consume it.

### 2. Code Analysis & Patterns

**Pattern 1: Primitive vs. Reference Behavior**

```java
// Primitives: Pass-by-value (Copy)
int x = 5;
int y = x;
y = 10;
// x is still 5.

// References: Pass-by-value (Copy of Reference)
int[] arr1 = {10, 20};
int[] arr2 = arr1; // arr2 holds the SAME address as arr1
arr2[0] = 99;
// arr1[0] is now 99.
```

**Pattern 2: The String Pool & Equality**

```java
String s1 = "Hello"; // String Literal (Goes to String Pool)
String s2 = "Hello"; // Reuses object from Pool
String s3 = new String("Hello"); // Forces new object in Heap

System.out.println(s1 == s2); // true (Same address)
System.out.println(s1 == s3); // false (Different addresses)
System.out.println(s1.equals(s3)); // true (Same content)
```

**Pattern 3: Static Variable Tracing**

```java
class Counter {
    static int count = 0; // Shared
    int id = 0; // Unique per object

    Counter() {
        count++;
        id = count;
    }
}
// If we create 3 objects:
// Object 1: id=1, count=3
// Object 2: id=2, count=3
// Object 3: id=3, count=3
// 'count' is shared and updated by all.
```

### 3. Implementation Summary
 **Naming Conventions:**
**Classes:** `PascalCase` (e.g., `StudentGrade`).
**Methods/Variables:** `camelCase` (e.g., `calculateAverage`, `studentName`).
**Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_VALUE`).

---

## 2. Classes, Objects & Encapsulation (Weeks 3-4)

### 1. Theory
 **Class vs. Object:**
**Class:** The blueprint/template. Defines structure (attributes) and behavior (methods).
**Object:** The instance. Occupies memory. Created using `new`. **Encapsulation (Data Hiding):**
The practice of wrapping data (variables) and code (methods) together as a single unit.
**Goal:** Protect data from unauthorized access or modification.
**Implementation:** Mark fields as `private` and provide `public` Getters (Accessors) and Setters (Mutators). **Access Modifiers (Scope):**

  | Modifier                 | Class | Package | Subclass | World |
  | :----------------------- | :---: | :-----: | :------: | :---: |
  | **public**               |     |       |        |     |
  | **protected**            |     |       |        |     |
  | **default** (no keyword) |     |       |        |     |
  | **private**              |     |       |        |     |
 **Constructors:**
**Purpose:** Initialize the object's state.
**Rules:** 1. Name must match Class name exactly. 2. **NO** return type (not even `void`). 3. Called automatically upon instantiation (`new`).
**Default Constructor:** If you write NO constructor, Java provides a hidden no-arg constructor. If you write ANY constructor, the default one disappears.
**Constructor Overloading:** Multiple constructors with different parameter lists.
**`this` keyword:** 1. Refers to the _current object_. 2. Used to resolve ambiguity (e.g., `this.name = name`). 3. Used to call another constructor in the same class (`this(args)`). _Must be the first line._
 **Documentation (Javadoc):**
Standard for documenting Java code.
**Format:** `/** ... */` (placed above class/method).
**Tags:** `@author`, `@param`, `@return`, `@throws`.

### 2. UML Analysis Studio

**Concept:** A `Student` class with private fields and public accessors.

**Class Diagram Representation:**

```text
+---------------------------------------+
|               Student                 |
+---------------------------------------+
| - name : String                       |
| - id : int                            |
| # gpa : double                        |
+---------------------------------------+
| + Student(name: String, id: int)      |
| + getName() : String                  |
| + setName(name: String) : void        |
| ~ updateInternal() : void             |
+---------------------------------------+
```
 **Analysis Guide:**
**Visibility Symbols:**
`+` : Public
`-` : Private
`#` : Protected
`~` : Package/Default
**Underline:** Static member.
**Italics:** Abstract member.

## 3. Class Relationships (Weeks 5-6)

### 1. Theory
 **Association ("Uses-a"):**
General relationship where two classes interact.
**Independence:** Both classes have their own lifecycle.
**Implementation:** Usually passed as a method parameter.
_Example:_ `Doctor` treats `Patient`. If Doctor leaves, Patient still exists. **Aggregation ("Has-a" - Weak):**
A specialized form of Association. Represents "Whole-Part" relationship.
**Weak Coupling:** The "Part" can exist independently of the "Whole".
**Implementation:** The "Part" is passed into the "Whole" (via Constructor or Setter).
_Example:_ `Classroom` has `Students`. If Classroom is demolished, Students still exist. **Composition ("Part-of" - Strong):**
A specialized form of Aggregation. Strong "Whole-Part" relationship.
**Strong Coupling:** The "Part" **cannot** exist without the "Whole".
**Implementation:** The "Part" is **instantiated inside** the "Whole".
_Example:_ `Human` has a `Heart`. If Human dies, Heart dies. **Dependency:**
A temporary relationship. One class depends on another to function.
Usually a local variable in a method.

### 2. UML Analysis Studio

**Relationship Diagram Representation:**

```text
[Driver] ----(drives)----> [Car]
   ^
   | Association (Arrow)
   | "Driver uses Car"

[Library] <>(stores)---- [Book]
   ^
   | Aggregation (Empty Diamond at Library)
   | "Library has Books (but Books can exist elsewhere)"

[House] <*>(consists of)---- [Room]
   ^
   | Composition (Filled Diamond at House)
   | "House owns Rooms (Rooms die with House)"
```
 **Multiplicity Guide:**
`1` : Exactly one.
`0..1` : Zero or one (Optional).
`*` or `0..*` : Zero to many.
`1..*` : One to many (At least one).
_Reading:_ Read from the "Diamond" side to the other side. "One House contains 1 to many Rooms".

### 3. Code Analysis & Patterns

**Pattern 1: Aggregation vs. Composition Implementation**

**Aggregation (Passed In):**

```java
class Student {}

class Course {
    private List<Student> students;

    public Course(List<Student> existingStudents) {
        // Students were created OUTSIDE. They survive if Course dies.
        this.students = existingStudents;
    }
}
```

**Composition (Created Inside):**

```java
class Engine {}

class Car {
    private Engine engine;

    public Car() {
        // Engine is created INSIDE. It dies if Car dies.
        this.engine = new Engine();
    }
}
```

## 4. Collections Framework (Week 6)

### 1. Theory
 **The Framework:** A unified architecture for storing and manipulating groups of objects. **Core Interfaces:**
**List (`List<E>`):** Ordered collection (sequence). **Allows duplicates**.
**`ArrayList`:** Resizable array. Fast random access (`get(i)` is $O(1)$). Slow insertion/deletion in middle ($O(n)$). Best for reading.
**`LinkedList`:** Doubly-linked nodes. Slow random access ($O(n)$). Fast insertion/deletion ($O(1)$ if at ends). Best for manipulation.
**Set (`Set<E>`):** Unordered collection. **NO duplicates**.
**`HashSet`:** Uses Hash Table. Unordered. Fast access ($O(1)$). Relies on `hashCode()` and `equals()`.
**`LinkedHashSet`:** Preserves insertion order.
**Map (`Map<K,V>`):** Key-Value pairs. Unique keys. (Not always covered but good to know). **Wrapper Classes & Autoboxing:**
Collections **cannot** store primitives (`int`, `double`). They only store Objects.
**Wrapper Classes:** `Integer`, `Double`, `Boolean`, `Character`.
**Autoboxing:** Automatic conversion of primitive to wrapper. `list.add(5)` -> `list.add(new Integer(5))`.
**Unboxing:** Automatic conversion of wrapper to primitive. `int x = list.get(0)`.

### 2. Code Analysis & Patterns

**Pattern 1: ArrayList Operations**

```java
// Declaration (Polymorphism: List reference, ArrayList object)
List<String> names = new ArrayList<>();

// Operations
names.add("Alice");
names.add("Bob");
names.add(1, "Charlie"); // Insert at index 1

String s = names.get(0); // "Alice"
names.remove("Bob"); // Remove by Object
names.remove(0); // Remove by Index

System.out.println(names.size()); // Check size
System.out.println(names.contains("Charlie")); // Check existence
```

**Pattern 2: Iterating Safely**

```java
// 1. Enhanced For-Loop (Read-only mostly)
for (String name : names) {
    System.out.println(name);
    // names.remove(name); // ERROR: ConcurrentModificationException
}

// 2. Iterator (Safe removal)
Iterator<String> it = names.iterator();
while(it.hasNext()) {
    String name = it.next();
    if(name.equals("Alice")) {
        it.remove(); // Safe
    }
}
```

**Common Pitfalls:**
 `ArrayList<int>` is invalid. Use `ArrayList<Integer>`. `remove(int index)` vs `remove(Object o)` with Integers.
`list.remove(5)` removes index 5.
`list.remove(Integer.valueOf(5))` removes the value 5.

## 5. Inheritance & Polymorphism (Weeks 8-10)

### 1. Theory
 **Inheritance ("Is-a"):**
Mechanism where a `Subclass` (Child) acquires properties/methods of a `Superclass` (Parent).
**Keyword:** `extends`.
**Single Inheritance:** Java classes can only extend **ONE** parent class.
**Constructors:** Constructors are NOT inherited. But the child constructor MUST call the parent constructor (implicitly or explicitly via `super()`). **The `super` keyword:**
`super.variable`: Access parent's variable (if shadowed).
`super.method()`: Call parent's method (if overridden).
`super()`: Call parent's constructor. **Must be the first line**. **Polymorphism ("Many Forms"):**
**Compile-time (Static):** Method Overloading. Same method name, different parameters.
**Runtime (Dynamic):** Method Overriding. Same method signature in Child class.
**Dynamic Binding:** The JVM decides which method to run based on the **actual object** in memory, not the reference type. **The `Object` Class:** The root of all classes.
`toString()`: Returns string representation. Should be overridden.
`equals()`: Compares references by default. Should be overridden for content comparison. **Typecasting & `instanceof`:**
**Upcasting:** Child -> Parent. Implicit. Safe. (`Animal a = new Dog();`)
**Downcasting:** Parent -> Child. Explicit. Unsafe. (`Dog d = (Dog) a;`)
**`instanceof`:** Checks if an object is an instance of a specific class. Use before downcasting to avoid `ClassCastException`.
`if (a instanceof Dog) { Dog d = (Dog) a; }`

### 2. UML Analysis Studio

**Inheritance Diagram Representation:**

```text
      [Animal]
     /        \
    /          \
(extends)    (extends)
  /              \
[Dog]           [Cat]

Details:
[Animal] -> +makeSound()
[Dog]    -> +makeSound() (Overrides Parent)
```
 **Analysis Guide:**
**Solid line with closed, empty arrow (`<|--`):** Inheritance. Points to the Parent.
Read as: "Dog is an Animal".

### 3. Code Analysis & Patterns

**Pattern 1: Method Overriding & Dynamic Binding**

```java
class Animal {
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    @Override // Good practice annotation
    void speak() { System.out.println("Woof"); }
}

public class Test {
    public static void main(String[] args) {
        Animal a = new Dog(); // Upcasting (Implicit)
        a.speak(); // Output: "Woof" (Runtime Polymorphism)

        // a.fetch(); // ERROR: 'fetch' is not defined in Animal reference.
    }
}
```

## 6. Abstraction: Abstract Classes & Interfaces (Week 11)

### 1. Theory
 **Abstraction:** Hiding implementation details and showing only functionality. **Abstract Class:**
A class declared with `abstract`.
**Cannot be instantiated** (`new AbstractClass()` is illegal).
Can contain **Abstract Methods** (no body, must be overridden) AND **Concrete Methods** (with body).
Can have constructors (called by subclasses).
_Use when:_ Classes share a common core identity and code (e.g., `Animal` -> `Dog`, `Cat`). **Interface:**
A contract of behavior.
**Keyword:** `interface` and `implements`.
All methods are implicitly `public abstract` (pre-Java 8).
All variables are implicitly `public static final` (Constants).
A class can implement **multiple** interfaces.
_Use when:_ Unrelated classes share a capability (e.g., `Bird` and `Airplane` both `Flyable`).

### 2. UML Analysis Studio

**Abstraction Diagram Representation:**

```text
   <<abstract>>                  <<interface>>
    [Shape]                       [Drawable]
   +getArea()*                      +draw()
       ^                               ^
       | (extends)                     | (implements)
       |                               |
       +-----------[Circle]------------+
```
 **Analysis Guide:**
`<<abstract>>` or italics: Abstract class/method.
`<<interface>>`: Interface.
**Dashed line with closed arrow (`<|..`):** Implementation (Realization).
**Solid line with closed arrow (`<|--`):** Extension (Inheritance).

### 3. Implementation Summary

**Abstract Class:**

```java
public abstract class Shape {
    String color;
    public Shape(String c) { this.color = c; } // Constructor allowed
    public abstract double getArea(); // No body
}
```

**Interface:**

```java
public interface Drawable {
    int MAX_OPACITY = 100; // implicitly public static final
    void draw(); // implicitly public abstract
}
```

**Concrete Class:**

```java
public class Circle extends Shape implements Drawable {
    double r;
    public Circle(String c, double radius) {
        super(c);
        this.r = radius;
    }

    @Override
    public double getArea() { return Math.PI * r * r; }

    @Override
    public void draw() { System.out.println("Drawing..."); }
}
```

## 7. Exception Handling (Week 12)

### 1. Theory
 **Exception:** An event that disrupts the normal flow of the program. **The Hierarchy:**
`Throwable` (Root)
`Error`: Serious system problems (e.g., `StackOverflowError`, `OutOfMemoryError`). Usually not caught.
`Exception`: Conditions the app might want to catch.
**Checked Exceptions:** Checked at **Compile-time**. Must be handled (`try-catch`) or declared (`throws`). Examples: `IOException`, `FileNotFoundException`.
**Unchecked Exceptions (Runtime):** Checked at **Runtime**. Usually logic errors. Examples: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`. **Keywords:**
`try`: Block of code to monitor for errors.
`catch`: Block that handles the specific exception.
`finally`: Block that executes **ALWAYS** (success or failure). Used for cleanup (closing files/scanners).
`throw`: Used to explicitly throw an exception object (`throw new Exception()`).
`throws`: Used in method signature to declare that a method _might_ throw an exception.

### 2. Code Analysis & Patterns

**Pattern 1: Flow Tracing (The "Finally" Trap)**

```java
try {
    System.out.println("Start");
    int x = 10 / 0; // ArithmeticException occurs here
    System.out.println("End"); // Skipped
} catch (NullPointerException e) {
    System.out.println("Caught Null"); // Skipped (Wrong catch)
} catch (ArithmeticException e) {
    System.out.println("Caught Math"); // Executed
} finally {
    System.out.println("Cleanup"); // Executed ALWAYS
}
```
 **Output:** `Start` -> `Caught Math` -> `Cleanup`. **Note:** `finally` executes even if there is a `return` statement in the `try` or `catch` block.

**Pattern 2: The "Handle or Declare" Rule**

```java
// Option 1: Handle it
void readFile() {
    try {
        FileReader f = new FileReader("file.txt");
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
}

// Option 2: Declare it (Pass the buck)
void readFile() throws FileNotFoundException {
    FileReader f = new FileReader("file.txt");
}
```

**Common Pitfalls:**
 **Catch Order:** Always catch specific exceptions _before_ generic ones.

  ```java
  catch (Exception e) { ... } // Generic
  catch (ArithmeticException e) { ... } // Unreachable Code Error!
  ```
 **Swallowing Exceptions:** Empty catch blocks make debugging impossible. Always print the stack trace.

---

## 8. Bonus: MVC & GUI (Week 9)

### 1. Theory
 **MVC Pattern:** Architectural pattern to separate concerns.
**Model:** The "Brain". Holds data and business logic. Knows nothing about View or Controller.
**View:** The "Face". Displays data (GUI). Listens for updates from Model (Observer pattern).
**Controller:** The "Bridge". Handles user input (clicks, typing), updates Model, and refreshes View. **Java Swing Basics:**
**Container:** `JFrame` (Window), `JPanel` (Div/Section).
**Component:** `JButton`, `JLabel`, `JTextField`.
**Layout Managers:**
`FlowLayout`: Left to right.
`BorderLayout`: North, South, East, West, Center.
`GridLayout`: Grid of cells.
**Event Handling:** `ActionListener` interface.

### 2. Implementation Summary

```java
// 1. The View (Button)
JButton btn = new JButton("Click Me");

// 2. The Controller (Listener)
btn.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        // 3. Update Model
        System.out.println("CLICKED ME RAAAA");
    }
});
```

---

## Common Pitfalls
 Confusing **overloading** (same name, different parameters, compile-time) with **overriding** (same signature, subclass, runtime). Forgetting that Java is **pass-by-value** for primitives and **pass-by-reference-value** for objects (the reference is copied, not the object). Mixing up `==` (reference equality) with `.equals()` (content equality) for Strings and objects. Not understanding constructor chaining — `super()` is called implicitly if not explicitly specified.

## Summary

> TL;DR — Comprehensive Java OOP reviewer: fundamentals (memory, static/final, String pool), encapsulation (access modifiers, constructors), relationships (association/aggregation/composition), Collections, inheritance/polymorphism, abstraction (abstract classes vs. interfaces), exception handling, and MVC/Swing.

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Object-Oriented Programming in Java]]

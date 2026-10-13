---
id: class_relationships
type: note
course: CCPROG3
topic: Class Relationships
status: completed
---

# Class Relationships

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Class Relationships]] #[[Code Snippets]] #[[M3]]

---
## Key Definitions

> **Class Relationships** describe how various classes and objects interact with each other in an object-oriented system. The primary types are Dependency, Association, Aggregation, and Composition.

## Theoretical Framework
 **Dependency (uses-a):** A class depends on another if it uses it as a parameter, return type, or local variable. **Association (has-a):** A broad relationship where all objects have their own lifecycle and there is no owner. **Aggregation (has-a):** A specialized form of association where there is a whole-part relationship, but the part can exist independently of the whole. **Composition (part-of):** A strict whole-part relationship where the lifecycle of the part is strictly managed by the whole.

## Code Implementation

```java
// Dependency
class Printer {
    void print(Document doc) { ... }
}

// Association
class Teacher {
    List<Student> students; // Teacher associates with Students
}

// Aggregation
class Department {
    List<Professor> professors; 
    // Professors can exist without the Department
}

// Composition
class House {
    private Room room; 
    public House() {
        this.room = new Room(); // Room lifecycle bound to House
    }
}
```

## Syntax Breakdown
 Relationships are typically implemented via fields referencing other classes. Composition uses instantiation within the constructor of the whole to ensure strict lifecycle binding. Aggregation usually passes references via constructors or setters.

## Complexity Analysis

Establishing relationships does not inherently impact time complexity but increases memory usage (space complexity) due to object references. Proper design minimizes memory leaks and tangled dependencies.
## Multiple Choice Questions

1. What type of relationship is described as a "uses-a" relationship where a class depends on another as a parameter or local variable?
    - **A)** Aggregation
    - **B)** Composition
    - **C)** Dependency
    - **D)** Association

2. How does Aggregation differ from Composition in class relationships?
    - **A)** Aggregation requires the part to be instantiated inside the constructor of the whole.
    - **B)** In Aggregation, the part can exist independently of the whole, whereas in Composition it cannot.
    - **C)** Composition represents a "uses-a" relationship while Aggregation is "part-of".
    - **D)** Aggregation is strictly used for inheritance.

3. Which of the following code snippets best demonstrates Composition?
    - **A)** `class House { private Room room; public House() { this.room = new Room(); } }`
    - **B)** `class Teacher { List<Student> students; }`
    - **C)** `class Printer { void print(Document doc) { } }`
    - **D)** `class Department { List<Professor> professors; }`

4. What is the primary characteristic of an Association relationship?
    - **A)** It strictly manages the lifecycle of the associated objects.
    - **B)** It represents a whole-part relationship.
    - **C)** All objects involved have their own lifecycle and there is no owner.
    - **D)** One class is inherited from another.

5. How does establishing class relationships impact complexity?
    - **A)** It drastically increases time complexity.
    - **B)** It has no impact on memory usage.
    - **C)** It increases memory usage (space complexity) due to object references.
    - **D)** It reduces the number of classes needed.

### Answer Key & Explanations
1. **C)** Dependency describes a temporary "uses-a" relationship where a class relies on another for a specific operation, often via parameters.
2. **B)** Aggregation allows parts to exist independently (e.g. Professors in a Department), whereas Composition strictly binds the part's lifecycle to the whole.
3. **A)** In Composition, the `Room` object is instantiated within the `House` constructor, binding its lifecycle to the `House`.
4. **C)** Association is a broad relationship where interacting objects are independent and maintain their own distinct lifecycles.
5. **C)** Object references inherently require memory allocation, which increases the overall space complexity of the system.

## Multiple Choice Questions

1. What type of relationship is described as a "uses-a" relationship where a class depends on another as a parameter or local variable?
    - **A)** Aggregation
    - **B)** Composition
    - **C)** Dependency
    - **D)** Association

2. How does Aggregation differ from Composition in class relationships?
    - **A)** Aggregation requires the part to be instantiated inside the constructor of the whole.
    - **B)** In Aggregation, the part can exist independently of the whole, whereas in Composition it cannot.
    - **C)** Composition represents a "uses-a" relationship while Aggregation is "part-of".
    - **D)** Aggregation is strictly used for inheritance.

3. Which of the following code snippets best demonstrates Composition?
    - **A)** `class House { private Room room; public House() { this.room = new Room(); } }`
    - **B)** `class Teacher { List<Student> students; }`
    - **C)** `class Printer { void print(Document doc) { } }`
    - **D)** `class Department { List<Professor> professors; }`

4. What is the primary characteristic of an Association relationship?
    - **A)** It strictly manages the lifecycle of the associated objects.
    - **B)** It represents a whole-part relationship.
    - **C)** All objects involved have their own lifecycle and there is no owner.
    - **D)** One class is inherited from another.

5. How does establishing class relationships impact complexity?
    - **A)** It drastically increases time complexity.
    - **B)** It has no impact on memory usage.
    - **C)** It increases memory usage (space complexity) due to object references.
    - **D)** It reduces the number of classes needed.

### Answer Key & Explanations
1. **C)** Dependency describes a temporary "uses-a" relationship where a class relies on another for a specific operation, often via parameters.
2. **B)** Aggregation allows parts to exist independently (e.g. Professors in a Department), whereas Composition strictly binds the part's lifecycle to the whole.
3. **A)** In Composition, the `Room` object is instantiated within the `House` constructor, binding its lifecycle to the `House`.
4. **C)** Association is a broad relationship where interacting objects are independent and maintain their own distinct lifecycles.
5. **C)** Object references inherently require memory allocation, which increases the overall space complexity of the system.

## References & Navigation

- **Previous Topic:** [[Classes and Objects]]
- **Next Topic:** [[Collections]]
- **Related Notes:** [[Overview of Programming Languages]]

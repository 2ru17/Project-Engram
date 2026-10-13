---
id: 8_abstract_data_types
type: note
course: CSADPRG
topic: "8 - Abstract Data Types"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Abstract Data Types]]

## Overview
Abstraction is a fundamental concept in programming that reduces complexity by removing irrelevant information and highlighting important attributes, allowing entities to be grouped based on common characteristics. Data abstraction involves the use of abstract data types (ADTs), enclosures that bundle data representations with subprograms to manipulate them. This module covers the theoretical principles of ADTs, their language design issues, and implementations in object-oriented languages like C++ and Java. 

## Key Definitions
- **Abstraction**: A view or representation of an entity that includes only the most significant attributes, hiding irrelevant details.
- **Process Abstraction**: Using subprograms to encapsulate logic, one of the oldest concepts in programming language design.
- **Abstract Data Type (ADT)**: An enclosure that includes both the data representation of a specific type and the operations (subprograms) allowed on that type.
- **Object**: An instance of an abstract data type.
- **Information Hiding**: A principle where the actual data representation is hidden from the user, preventing direct manipulation and enforcing access via specified operations.
- **Encapsulation**: A grouping of logically related subprograms into a unit that can be separately compiled, addressing the needs for code organization and partial compilation.
- **Constructors**: Functions used to initialize the data members of an instance and sometimes allocate storage (e.g., heap-dynamic).
- **Destructors**: Functions meant for cleanup after an instance's lifetime ends, often used to reclaim heap storage.

## Theoretical Framework / Concepts

### Built-in vs User-Defined ADTs
All built-in data types (like floating-point types) are inherently abstract data types because their actual implementation is hidden from the user, and they can only be manipulated via predefined operations.
For user-defined abstract data types to have the same characteristics, they must satisfy two conditions:
1. **Hidden Representation:** The type definition must allow program units to declare variables, but the representation itself must be hidden. The only direct operations possible are those explicitly provided.
2. **Single Syntactic Unit:** The declarations of the type and the protocols of its operations (which provide the interface) must be contained in a single syntactic unit. The interface remains independent of the underlying representation.

### Benefits of Abstraction
- **Reliability:** Restricting user manipulation of internal object representation increases code reliability.
- **Simplicity:** Reduces the number of variables and the range of code a developer needs to track.
- **Flexibility:** Developers can change internal structures and operations without directly affecting the users/programmers relying on the interface.

### Access Controls
Language designers provide mechanisms to control visibility:
- **Accessor Methods:** Getters and setters that offer restricted direct access to data.
- **Access Modifiers:** Keywords (e.g., `public`, `private`, `protected`) that specify levels of visibility. Some languages (like Ruby) restrict public access more strictly.

### Language Design Issues for ADTs
When designing languages that support ADTs, creators must decide:
1. Can abstract types be parameterized?
2. What specific access controls should be provided?
3. Should the specification of the type be physically separated from its implementation?

## Examples

### C++ Implementations
C++ supports ADTs via the `class` construct, derived from C `struct`s and Simula 67 classes.
- **Data Members & Member Functions:** Instances have their own copies of data members, but share a single copy of member functions.
- **Information Hiding:** Enforced via clauses like `private` (hidden), `public` (visible), and `protected` (visible to subclasses).
- **Friend Functions:** C++ uses "friend" functions/classes to grant private member access to specific, unrelated units.

**Example: A basic C++ class with access modifiers:**
```cpp
class Base {
public: 
    int publicMember;
protected: 
    int protectedMember;
private: 
    int privateMember; 
};
```

**Example: C++ Stack Implementation (Constructors & Destructors):**
```cpp
class Stack {
private: 
    int *stackPtr;
    int maxLen;
    int topSub; 
public:
    Stack() { // Constructor
        stackPtr = new int [100];
        maxLen = 99;
        topSub = -1;
    }
    ~Stack() { // Destructor
        delete [] stackPtr;
    }
    void push(int number) { /*...*/ }
    void pop() { /*...*/ }
    int top() { /*...*/ }
    int empty() { /*...*/ }
};
```

### Java Implementations
Java is similar to C++ but has notable differences:
- All user-defined types are classes.
- All objects are heap-allocated and accessed exclusively through reference variables.
- Access control modifiers are applied per individual entity rather than using C++-style grouped clauses.
- **Package Scope:** Instead of C++ "friends", Java uses package scoping where entities in the same package lacking explicit access modifiers are mutually visible.

### Encapsulation Examples Across Languages
- **C:** Header files
- **C++:** Header and implementation files, classes, namespaces
- **C#:** Assembly files, namespaces
- **Java:** JAR files, packages
- **Ada:** Packages
- **Ruby:** Modules

## Multiple Choice Questions

1. Which of the following best describes the principle of information hiding in Abstract Data Types (ADTs)?
    - **A)** The grouping of logically related subprograms into a single unit.
    - **B)** The prevention of direct user manipulation of the actual data representation by enforcing access via specified operations.
    - **C)** The use of subprograms to encapsulate logic and reduce the number of variables.
    - **D)** The ability to allocate and reclaim heap storage automatically.

2. What are the two conditions user-defined abstract data types must satisfy to have the same characteristics as built-in data types?
    - **A)** Public representation and multiple syntactic units
    - **B)** Parametrized typing and explicit access modifiers
    - **C)** Hidden representation and a single syntactic unit
    - **D)** Friend functions and accessor methods

3. In C++, what is the purpose of "friend" functions or classes?
    - **A)** To group logically related subprograms into a separately compiled unit.
    - **B)** To initialize the data members of an instance automatically.
    - **C)** To allow objects to share a single copy of member functions.
    - **D)** To grant private member access to specific, unrelated units.

4. How does Java handle objects and memory allocation compared to C++?
    - **A)** Java objects are stored on the stack and accessed directly.
    - **B)** Java objects are exclusively heap-allocated and accessed through reference variables.
    - **C)** Java allows users to manually reclaim heap storage using destructors.
    - **D)** Java requires objects to be allocated using C-style structs.

5. Which programming language utilizes "Package Scope" as an alternative to C++'s "friend" mechanisms?
    - **A)** C#
    - **B)** Ruby
    - **C)** Ada
    - **D)** Java

6. Which of the following is NOT one of the primary benefits of abstraction mentioned in the text?
    - **A)** Reliability
    - **B)** Simplicity
    - **C)** Inheritance
    - **D)** Flexibility

7. What term refers to a view or representation of an entity that includes only the most significant attributes while hiding irrelevant details?
    - **A)** Encapsulation
    - **B)** Abstraction
    - **C)** Object
    - **D)** Process Abstraction

8. In the context of C++ implementations of ADTs, which of the following is true regarding data members and member functions?
    - **A)** Instances share a single copy of data members and have their own copies of member functions.
    - **B)** Instances have their own copies of data members but share a single copy of member functions.
    - **C)** Instances have their own copies of both data members and member functions.
    - **D)** Instances share a single copy of both data members and member functions.

9. Which of the following encapsulation mechanisms is correctly paired with its programming language?
    - **A)** Ruby: Header files
    - **B)** C#: JAR files
    - **C)** Ada: Packages
    - **D)** C: Modules

10. What is a key language design issue for Abstract Data Types?
    - **A)** Determining if accessor methods should be private or protected.
    - **B)** Deciding whether all user-defined types must be classes.
    - **C)** Deciding whether the specification of the type should be physically separated from its implementation.
    - **D)** Choosing between destructors and garbage collection for memory reclamation.

### Answer Key & Explanations

**1. Answer: B**
Explanation: Information hiding means the actual data representation is concealed from the user, ensuring manipulation is only done via specified operations.

**2. Answer: C**
Explanation: The text states user-defined ADTs must have a hidden representation and be contained within a single syntactic unit.

**3. Answer: D**
Explanation: C++ uses "friend" functions/classes to selectively grant access to private members for specific, unrelated units.

**4. Answer: B**
Explanation: Unlike C++, Java requires all objects to be heap-allocated and accessed exclusively through reference variables.

**5. Answer: D**
Explanation: Java uses package scoping, where entities in the same package lacking explicit access modifiers are mutually visible, replacing C++'s "friend" mechanism.

**6. Answer: C**
Explanation: The benefits of abstraction listed in the text are reliability, simplicity, and flexibility; inheritance is not mentioned.

**7. Answer: B**
Explanation: Abstraction is defined as a view or representation that includes only the most significant attributes, hiding irrelevant details.

**8. Answer: B**
Explanation: In C++, instances maintain their own copies of data members, but they all share a single copy of the member functions to conserve memory.

**9. Answer: C**
Explanation: The text explicitly lists "Packages" as the encapsulation mechanism used in Ada.

**10. Answer: C**
Explanation: One of the three main language design issues mentioned is whether the specification of the type should be physically separated from its implementation.

## References & Navigation

- **Previous Topic:** [[Subprograms]]
- **Related Notes:** [[Classes and Objects]], [[Data Structures]]

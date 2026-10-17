---
id: Topic-3--Structs
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Topic 3- Structs

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Abstraction]] #[[Data Types]] #[[Searching]] #[[Structured Data]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> A `struct` (structure) in C groups related variables of different types under a single name. It is the primary mechanism for creating custom data types.

## Key Concepts
 `struct` groups heterogeneous data into one unit Members are accessed with `.` (direct) or `->` (pointer) `typedef` creates an alias to avoid repeating `struct` keyword Structs can contain arrays, other structs, and pointers

## Details / Theory

### Defining a Struct

```c
struct Student {
    char name[50];
    int age;
    float gpa;
};

// Declaring a variable
struct Student s1;
```

### Using `typedef`

```c
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

Student s1;  // No need for 'struct' keyword
```

### Initialization

```c
Student s1 = {"Alice", 20, 3.85};

// Designated initializers (C99)
Student s2 = {.name = "Bob", .gpa = 3.50, .age = 21};
```

### Accessing Members

```c
// Direct access with dot operator
printf("Name: %s\n", s1.name);
printf("GPA: %.2f\n", s1.gpa);

// Pointer access with arrow operator
Student *ptr = &s1;
printf("Age: %d\n", ptr->age);  // Equivalent to (*ptr).age
```

### Arrays of Structs

```c
Student class[30];

// Initialize and access
strcpy(class[0].name, "Alice");
class[0].age = 20;
class[0].gpa = 3.85;

// Traverse
for (int i = 0; i < 30; i++) {
    printf("%s: %.2f\n", class[i].name, class[i].gpa);
}
```

### Nested Structs

```c
typedef struct {
    int day, month, year;
} Date;

typedef struct {
    char name[50];
    Date birthday;
} Person;

Person p = {"Alice", {15, 3, 2004}};
printf("Birth year: %d\n", p.birthday.year);
```

### Passing Structs to Functions

```c
// By value (copies entire struct)
void printStudent(Student s) {
    printf("%s - %.2f\n", s.name, s.gpa);
}

// By pointer (efficient, allows modification)
void updateGPA(Student *s, float newGPA) {
    s->gpa = newGPA;
}
```

### Struct Size and Padding

The compiler may add **padding bytes** for alignment:

```c
struct Example {
    char a;    // 1 byte + 3 padding
    int b;     // 4 bytes
    char c;    // 1 byte + 3 padding
};
// sizeof may be 12, not 6
```

## Common Pitfalls
 Cannot use `==` to compare structs — must compare member by member. Cannot directly assign strings to `char[]` members — use `strcpy()`. Passing large structs by value is inefficient — use pointers. Forgetting `->` when accessing members through a pointer (using `.` instead).

## Summary

> TL;DR — `struct` groups variables of different types into a custom type. Use `typedef` for cleaner syntax. Access members with `.` (direct) or `->` (pointer). Pass by pointer for efficiency. Combine with arrays for collections of records.

## Review Questions

_To be added._

## Links
 **Related:** [[What is an Array]] — [[Strings]] — [[File Handling]] — [[Declaration]] — [[Element Type]] **Source / Reference:**

## Multiple Choice Questions

1. What is the primary purpose of a `struct` in C?
- **A)** To store homogeneous data
- **B)** To group related variables of different types under a single name
- **C)** To execute multiple functions simultaneously
- **D)** To allocate memory dynamically

2. Which keyword can be used to create an alias for a `struct` to avoid repeating the `struct` keyword?
- **A)** `define`
- **B)** `alias`
- **C)** `typedef`
- **D)** `union`

3. How do you access a member of a `struct` using a direct variable?
- **A)** With the arrow operator `->`
- **B)** With the dot operator `.`
- **C)** With the subscript operator `[]`
- **D)** With the address-of operator `&`

4. How do you access a member of a `struct` when you have a pointer to the `struct`?
- **A)** With the dot operator `.`
- **B)** With the arrow operator `->`
- **C)** With the asterisk operator `*`
- **D)** With the comma operator `,`

5. What is the correct syntax for C99 designated initializers for a `struct Student`?
- **A)** `Student s = {name: "Bob", gpa: 3.5};`
- **B)** `Student s = ["Bob", 3.5];`
- **C)** `Student s = {.name = "Bob", .gpa = 3.5};`
- **D)** `Student s = (name="Bob", gpa=3.5);`

6. Why might the `sizeof` a `struct` be larger than the sum of the sizes of its members?
- **A)** The compiler adds padding bytes for alignment
- **B)** Structs always allocate extra heap memory
- **C)** Structs include hidden pointers for garbage collection
- **D)** The standard library automatically doubles struct sizes

7. Which of the following is true about nested structs?
- **A)** A struct cannot contain another struct
- **B)** A struct can contain another struct as a member
- **C)** Nested structs must use identical member names
- **D)** Nested structs cannot be initialized

8. How should you assign a string to a `char[]` member inside a struct after initialization?
- **A)** By using the `=` operator directly
- **B)** By using `strcpy()`
- **C)** By using the `==` operator
- **D)** By using `strassign()`

9. What is a key advantage of passing a struct to a function by pointer instead of by value?
- **A)** It prevents the function from accessing struct members
- **B)** It is more efficient and allows the function to modify the original struct
- **C)** It automatically frees the struct's memory
- **D)** It converts the struct to a primitive type

10. Which common pitfall should be avoided when comparing two structs?
- **A)** Using `==` to compare structs directly instead of comparing member by member
- **B)** Using pointers to compare memory addresses
- **C)** Passing structs by value to a sorting algorithm
- **D)** Using `typedef` before comparison

### Answer Key & Explanations
1. **B)** Structs define distinct logical groupings organizing fundamentally disparate datatypes collectively.
2. **C)** The aliasing capability establishes shorter cleaner typenames sidestepping repetitive standard keywords.
3. **B)** Accessing local initialized structure variables necessitates using the literal property dot path.
4. **B)** Operating on object references inherently mandates replacing explicit dot referencing with directional operator routing.
5. **C)** Tagging member initializers utilizing dots provides clear explicit targeting independent from original declaration ordering.
6. **A)** Aligning variable blocks optimizes CPU retrieval rendering structures intermittently thicker than component arithmetic implies.
7. **B)** Encapsulating discrete compound logic enables incorporating full secondary structural groupings internally as regular objects.
8. **B)** Because primitive assignment fails across immutable array structures natively, data transfers mandate library replication tools.
9. **B)** Eliminating substantial structural copy processes conserves execution timelines while exposing native roots to alterations.
10. **A)** Deep equivalence requires granular iterative inspection given structural wrappers lack implicit relational operation overloads.

## References & Navigation

- **Previous Topic:** [[Strings]]
- **Next Topic:** [[File Handling]]
- **Related Notes:** [[Data Types]], [[Abstract Data Types]]

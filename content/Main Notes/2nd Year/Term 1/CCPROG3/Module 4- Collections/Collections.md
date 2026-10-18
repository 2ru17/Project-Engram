---
id: collections
type: note
course: CCPROG3
topic: Collections
status: completed
---

# Collections

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Collections]] #[[Code Snippets]] #[[M4]]

---
## Key Definitions

> The **Java Collections Framework** is a unified architecture for representing and manipulating collections (groups of objects). It contains interfaces, implementations, and algorithms.

## Theoretical Framework

Core interfaces include:
**List:** An ordered collection (e.g., `ArrayList`, `LinkedList`). Can contain duplicates.
**Set:** A collection that cannot contain duplicate elements (e.g., `HashSet`, `TreeSet`).
**Map:** An object that maps keys to values (e.g., `HashMap`, `TreeMap`). Cannot contain duplicate keys.

## Code Implementation

```java
import java.util.*;

public class CollectionExample {
    public static void main(String[] args) {
        // List Example
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        
        // Set Example
        Set<Integer> set = new HashSet<>();
        set.add(1);
        set.add(2);
        set.add(1); // Ignored
        
        // Map Example
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 90);
        map.put("Bob", 85);
    }
}
```

## Syntax Breakdown

`<Type>`: Generics are used to specify the type of objects the collection will hold, ensuring type safety at compile time.
`new ArrayList<>()`: The diamond operator `<>` infers the generic type from the variable declaration.

## Complexity Analysis

| Collection | Add | Remove | Contains |
| :--- | :--- | :--- | :--- |
| `ArrayList` | O(1) am. | O(n) | O(n) |
| `LinkedList` | O(1) | O(1)* | O(n) |
| `HashSet` | O(1) | O(1) | O(1) |
| `TreeSet` | O(log n) | O(log n) | O(log n) |
| `HashMap` | O(1) | O(1) | O(1) |

## Multiple Choice Questions

1. What is the primary purpose of the Java Collections Framework?
    - **A)** To manage memory allocation for variables.
    - **B)** To provide a unified architecture for representing and manipulating groups of objects.
    - **C)** To handle graphical user interface events.
    - **D)** To compile Java source code into Bytecode.

2. Which core interface in the Collections Framework cannot contain duplicate elements?
    - **A)** List
    - **B)** Set
    - **C)** Map
    - **D)** ArrayList

3. In the context of a Map, which of the following is true?
    - **A)** It maps keys to values and cannot contain duplicate keys.
    - **B)** It is an ordered collection that allows duplicates.
    - **C)** It is a specialized form of a List.
    - **D)** It can only hold primitive data types.

4. What is the amortized time complexity for adding an element to an ArrayList?
    - **A)** O(n)
    - **B)** O(log n)
    - **C)** O(1)
    - **D)** O(n^2)

5. What does the diamond operator `<>` do in the statement `List<String> list = new ArrayList<>();`?
    - **A)** It indicates that the collection is empty.
    - **B)** It infers the generic type from the variable declaration.
    - **C)** It prevents the addition of any elements to the list.
    - **D)** It casts the ArrayList to a String.

### Answer Key & Explanations

1. **B**. The framework provides interfaces, implementations, and algorithms specifically designed for handling object collections efficiently.
2. **B**. The `Set` interface, implemented by classes like `HashSet`, enforces uniqueness and ignores duplicate entries.
3. **A**. A `Map` establishes a key-value mapping where each key must be unique, though values can be duplicated.
4. **C**. While resizing takes O(n), the amortized cost for most add operations in an `ArrayList` remains O(1).
5. **B**. The diamond operator simplifies instantiation by inferring the type parameter (`String`) from the left-hand declaration.

## References & Navigation

- **Previous Topic:** [[Class Relationships]]
- **Next Topic:** [[Inheritance]]
- **Related Notes:** [[Overview of Programming Languages]]

---
id: JAVA-OOP-Mock-Answers
type: note
course: CCPROG3
topic: Object-Oriented Concepts
status: completed
---

# JAVA-OOP-Mock-Answers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG3]] #[[Object-Oriented Concepts]] #[[Programming]] #[[Computer Science]] #[[Java]] #[[Object-Oriented Programming]] #[[Software Engineering Principles]] #[[Algorithms]]

---

## Overview

> 1. C. Object-Oriented Programming

## Details / Theory

## Part I: Multiple Choice (Theory & Concepts)

1. **C. Object-Oriented Programming**
_Explanation:_ OOP focuses on objects (entities/nouns) that encapsulate data and behavior, whereas Procedural focuses on functions (actions/verbs).

2. **B. Stack**
_Explanation:_ Primitive types (int, double, etc.) are stored directly in the Stack memory. Objects are stored in the Heap.

3. **C. null**
_Explanation:_ The default value for any object reference (String, Arrays, Classes) is `null`.

4. **C. final**
_Explanation:_ The `final` keyword makes a variable constant, a method non-overridable, or a class non-inheritable.

5. **C. It can be called without creating an object of the class.**
_Explanation:_ Static members belong to the class itself, not any specific instance.

6. **C. Encapsulation**
_Explanation:_ Encapsulation is about bundling data and methods and restricting access (hiding details) via access modifiers.

7. **B. private**
_Explanation:_ Fields should be `private` to enforce encapsulation, accessible only via public getters/setters.

8. **D. It has no return type**
_Explanation:_ Constructors look like methods but have NO return type, not even `void`.

9. **C. Aggregation**
_Explanation:_ Aggregation is a "Has-a" relationship where the child can exist independently (Weak coupling).

10. **B. Composition**
_Explanation:_ Composition is a strong "Part-of" relationship where the child dies if the parent dies.

11. **C. Set**
_Explanation:_ The `Set` interface (e.g., `HashSet`) strictly prohibits duplicate elements.

12. **B. LinkedList**
_Explanation:_ `LinkedList` is faster for insertion/deletion ($O(1)$) compared to `ArrayList` ($O(n)$) because it doesn't need to shift elements.

13. **C. Autoboxing**
_Explanation:_ Java automatically converts primitives to their wrapper classes (e.g., `int` to `Integer`).

14. **C. extends**
_Explanation:_ The keyword `extends` is used for class inheritance.

15. **A. One**
_Explanation:_ Java supports **Single Inheritance** only for classes. A class can extend only one parent.

16. **B. Calls the superclass's constructor.**
_Explanation:_ `super()` invokes the constructor of the parent class and must be the first line in the child constructor.

17. **C. Compile-time Polymorphism**
_Explanation:_ Method Overloading is resolved at compile-time (static binding).

18. **C. `equals()`**
_Explanation:_ `==` compares memory addresses. `equals()` is used to compare the actual content/values of objects.

19. **C. It causes a Compilation Error.**
_Explanation:_ Abstract classes cannot be instantiated directly using `new`.

20. **C. A class can implement multiple interfaces.**
_Explanation:_ While classes allow single inheritance, they can implement multiple interfaces.

21. **B. implements**
_Explanation:_ The keyword `implements` is used to use an Interface.

22. **C. Throwable**
_Explanation:_ `Throwable` is the superclass of both `Error` and `Exception`.

23. **C. finally**
_Explanation:_ The `finally` block executes always, regardless of whether an exception was thrown or caught.

24. **C. IOException**
_Explanation:_ `IOException` is a Checked Exception (must be handled). The others are RuntimeExceptions (Unchecked).

25. **C. `void method() throws Exception`**
_Explanation:_ The `throws` keyword in the method signature declares that the method might throw an exception.

26. **C. Controller**
_Explanation:_ In MVC, the Controller handles user input and updates the Model.

27. **C. JButton**
_Explanation:_ `JButton` is the Swing class for a push button.

28. **B. Returns a random double between 0.0 and 1.0.**
_Explanation:_ `Math.random()` returns a `double` value greater than or equal to 0.0 and less than 1.0.

29. **D. private**
_Explanation:_ `private` members are accessible only within the class they are defined in.

30. **B. Linking a method call to the method body at runtime based on the object type.**
_Explanation:_ This is the mechanism behind Method Overriding (Runtime Polymorphism).

---

## Part II: UML Analysis

31. **B. Private**
_Explanation:_ The minus sign (`-`) represents private visibility.

32. **A. Public**
_Explanation:_ The plus sign (`+`) represents public visibility.

33. **C. Composition**
_Explanation:_ A **filled/solid** diamond represents Composition (Strong relationship).

34. **B. They are also destroyed.**
_Explanation:_ In Composition, the lifecycle of the part is dependent on the whole.

35. **B. Aggregation**
_Explanation:_ An **empty/hollow** diamond represents Aggregation (Weak relationship).

36. **B. They continue to exist independently.**
_Explanation:_ In Aggregation, the parts can survive without the container.

37. **A. Vehicle**
_Explanation:_ The arrow points **towards** the parent (Superclass).

38. **C. `class Car extends Vehicle`**
_Explanation:_ Solid line with closed arrow means Inheritance (`extends`).

39. **B. It cannot be instantiated and has abstract methods.**
_Explanation:_ Interfaces are abstract contracts.

40. **B. `class Guitar implements Playable`**
_Explanation:_ Dashed line with closed arrow means Implementation (`implements`).

41. **C. Zero to many.**
_Explanation:_ `0..*` means zero or more (many).

42. **A. Exactly one.**
_Explanation:_ `"1"` means exactly one.

43. **C. Protected**
_Explanation:_ The `#` symbol stands for protected visibility.

44. **B. Static method**
_Explanation:_ Underlined members in UML denote `static`.

45. **A. Abstract class**
_Explanation:_ Italicized names denote abstract classes or methods.

---

## Part III: Code Analysis

46. **B. `1 2`**
_Explanation:_ `id` is instance-specific (1, then 2). `count` is static (shared), so it increments to 2 and stays 2 for everyone.

47. **C. `false true`**
_Explanation:_ `s1 == s2` is false (different memory addresses). `s1.equals(s2)` is true (same content "Java").

48. **B. `B`**
_Explanation:_ Polymorphism. The object is of type `B`, so `B`'s overridden `show()` method is called.

49. **D. `P C`**
_Explanation:_ Constructor chaining. Child constructor implicitly calls `super()` (Parent constructor) first.

50. **C. `Error Done`**
_Explanation:_ Index 3 is out of bounds (0, 1, 2 exist). Exception is caught ("Error"), then `finally` executes (" Done").

51. **B. `[A, C, B]`**
_Explanation:_ `add(1, "C")` inserts "C" at index 1, shifting "B" to the right.

52. **C. Compilation Error**
_Explanation:_ `Shape` is abstract and cannot be instantiated.

53. **A. `IntDouble`**
_Explanation:_ Method overloading selects the method matching the parameter type (`int` vs `double`).

54. **C. `Caught Next`**
_Explanation:_ Exception is thrown, caught ("Caught "), and then program flow continues ("Next").

55. **B. Compilation Error**
_Explanation:_ Interface variables are implicitly `final` (constants) and cannot be reassigned.

56. **C. `9`**
_Explanation:_ Casting `double` to `int` truncates the decimal part (does not round).

57. **B. `false`**
_Explanation:_ `true && false` is `false`.

58. **B. `Java`**
_Explanation:_ Strings are immutable. `s.concat()` returns a _new_ string, but `s` itself remains "Java" unless reassigned.

59. **B. `1`**
_Explanation:_ `10 % 3` is the remainder of 10 divided by 3 (3 \* 3 = 9, remainder 1).

60. **A. `012`**
_Explanation:_ Loop runs for i = 0, 1, 2. Stops when i = 3.

61. **B. `One Two`**
_Explanation:_ Case 1 matches. There is no `break` after Case 1, so it "falls through" and executes Case 2 as well.

62. **B. `false`**
_Explanation:_ The default `equals()` implementation in `Object` compares memory addresses (like `==`), which are different for two new objects.

63. **B. `2`**
_Explanation:_ Integer division (`int / int`) results in an `int`. The decimal .5 is truncated.

64. **A. `5 6`**
_Explanation:_ `x++` (post-increment) prints the current value (5) _then_ increments it. Next print shows 6.

65. **C. `ArrayIndexOutOfBoundsException`**
_Explanation:_ Array size is 5, so valid indices are 0-4. Index 5 is out of bounds.

66. **B. `20`**
_Explanation:_ `this.x = x` correctly assigns the parameter 20 to the instance variable `x`.

67. **A. `10`**
_Explanation:_ `super.x` accesses the parent's variable `x` (10), ignoring the child's shadowed `x` (20).

68. **B. `Null`**
_Explanation:_ Calling a method on `null` throws `NullPointerException`, which is caught.

69. **C. `3`**
_Explanation:_ `arr[1]` selects the second array `{3, 4}`. `[0]` selects the first element of that array, which is 3.

70. **C. Compilation Error**
_Explanation:_ `final` variables cannot be reassigned.

---

## Code Example

_To be added._

## Common Pitfalls

Checking only the letter answer without reading the explanation — understanding **why** is crucial for exam variants.
Memorizing code output without understanding the underlying mechanism (e.g., dynamic dispatch, String immutability).
Ignoring the UML analysis rationales — UML notation rules (visibility, line styles, multiplicity) are commonly tested.

## Summary

> TL;DR — Complete 70-item answer key with explanations covering OOP theory, UML notation rules, and code tracing mechanics (static sharing, polymorphic dispatch, constructor chaining, exception flow, autoboxing).

## Review Questions

_To be added._

## Links

**Related:**
**Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Object-Oriented Programming in Java]]

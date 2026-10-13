---
id: JAVA-OOP-Finals-Mock
type: note
course: CCPROG3
topic: Object-Oriented Concepts
status: completed
---

# JAVA-OOP-Finals-Mock

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG3]] #[[Object-Oriented Concepts]] #[[Programming]] #[[Computer Science]] #[[Java]] #[[Object-Oriented Programming]] #[[Software Engineering Principles]] #[[Algorithms]]

---

## Overview

> Instructions:

## Details / Theory

# JAVA OOP Master Class: Final Mock Exam

**Instructions:**
 **Time Limit:** 2 Hours (Recommended) **Total Items:** 70 **Formats:**
  1. Multiple Choice (Theory) - 30 Items
  2. UML Analysis (Diagrams) - 15 Items
  3. Code Analysis (Tracing) - 25 Items

---

## Part I: Multiple Choice (Theory & Concepts)

_Select the best answer for each question._

1. **Which programming paradigm focuses on "entities" (nouns) rather than "actions" (verbs)?**
**A)** Procedural Programming
**B)** Functional Programming
**C)** Object-Oriented Programming
**D)** Scripting

2. **Where are Primitive Data Types stored in Java memory?**
**A)** Heap
**B)** Stack
**C)** Class Area
**D)** String Pool

3. **What is the default value of a Reference Type (e.g., String, Student) if not initialized?**
**A)** 0
**B)** false
**C)** null
**D)** undefined

4. **Which keyword is used to create a constant variable that cannot be changed once assigned?**
**A)** static
**B)** const
**C)** final
**D)** abstract

5. **If a method is declared `static`, which of the following is TRUE?**
**A)** It can access non-static instance variables directly.
**B)** It belongs to the object instance.
**C)** It can be called without creating an object of the class.
**D)** It cannot be called from the main method.

6. **Which pillar of OOP involves hiding internal details and providing a public interface?**
**A)** Inheritance
**B)** Polymorphism
**C)** Encapsulation
**D)** Abstraction

7. **In Encapsulation, what is the standard visibility for class attributes (fields)?**
**A)** public
**B)** private
**C)** protected
**D)** default

8. **What is the return type of a Constructor?**
**A)** void
**B)** The class name
**C)** int
**D)** It has no return type

9. **Which relationship is described as "Has-a" where the part can exist independently of the whole?**
**A)** Association
**B)** Composition
**C)** Aggregation
**D)** Inheritance

10. **Which relationship implies a strong lifecycle dependency (if the container dies, the part dies)?**
**A)** Association
**B)** Composition
**C)** Aggregation
**D)** Dependency

11. **Which Collection interface does NOT allow duplicate elements?**
**A)** List
**B)** ArrayList
**C)** Set
**D)** LinkedList

12. **Which `List` implementation is best for frequent insertion and deletion of elements?**
**A)** ArrayList
**B)** LinkedList
**C)** Vector
**D)** Array

13. **What is the process of automatically converting a primitive `int` to an `Integer` object?**
**A)** Casting
**B)** Unboxing
**C)** Autoboxing
**D)** Wrapping

14. **Which keyword is used to inherit from a class?**
**A)** implements
**B)** inherits
**C)** extends
**D)** super

15. **In Java, how many classes can a single class extend (inherit from)?**
**A)** One
**B)** Two
**C)** Unlimited
**D)** Zero

16. **What does `super()` do in a constructor?**
**A)** Calls the superclass's method.
**B)** Calls the superclass's constructor.
**C)** Creates a new instance of the parent.
**D)** Accesses a private variable in the parent.

17. **Which type of Polymorphism is achieved via Method Overloading?**
**A)** Runtime Polymorphism
**B)** Dynamic Binding
**C)** Compile-time Polymorphism
**D)** Ad-hoc Polymorphism

18. **Which method is used to compare the _content_ of two String objects?**
**A)** `==`
**B)** `compare()`
**C)** `equals()`
**D)** `=`

19. **What happens if you try to instantiate an Abstract Class?**
**A)** It creates a null object.
**B)** It throws a RuntimeException.
**C)** It causes a Compilation Error.
**D)** It works normally.

20. **Which of the following is TRUE about Interfaces?**
**A)** They can have constructors.
**B)** Methods are implicitly `private`.
**C)** A class can implement multiple interfaces.
**D)** Variables are mutable (can be changed).

21. **Which keyword is used to implement an Interface?**
**A)** extends
**B)** implements
**C)** interface
**D)** using

22. **In the Exception Hierarchy, which class is the root of all errors and exceptions?**
**A)** Exception
**B)** RuntimeException
**C)** Throwable
**D)** Error

23. **Which block in exception handling executes regardless of whether an exception occurred or not?**
**A)** try
**B)** catch
**C)** finally
**D)** throws

24. **Which type of exception is checked at compile-time?**
**A)** NullPointerException
**B)** ArithmeticException
**C)** IOException
**D)** ArrayIndexOutOfBoundsException

25. **What is the correct way to declare that a method _might_ throw an exception?**
**A)** `void method() catch Exception`
**B)** `void method() throw Exception`
**C)** `void method() throws Exception`
**D)** `void method() try Exception`

26. **In MVC, which component handles user input and updates the Model?**
**A)** Model
**B)** View
**C)** Controller
**D)** Database

27. **Which Swing component represents a clickable button?**
**A)** JLabel
**B)** JTextField
**C)** JButton
**D)** JPanel

28. **What is the purpose of `Math.random()`?**
**A)** Returns a random int between 0 and 100.
**B)** Returns a random double between 0.0 and 1.0.
**C)** Returns a random boolean.
**D)** Returns a random char.

29. **Which access modifier allows access ONLY within the same class?**
**A)** public
**B)** protected
**C)** default
**D)** private

30. **What is "Dynamic Binding"?**
**A)** Linking a method call to the method body at compile-time.
**B)** Linking a method call to the method body at runtime based on the object type.
**C)** Binding a variable to a value.
**D)** Importing a library dynamically.

---

## Part II: UML Analysis (Diagram Logic)

_Analyze the diagrams and answer the questions._

**Diagram A:**

```text
+---------------------+
|      Account        |
+---------------------+
| - balance : double  |
+---------------------+
| + deposit(a: double)|
+---------------------+
```

31. **What is the visibility of the `balance` attribute?**
**A)** Public
**B)** Private
**C)** Protected
**D)** Package/Default

32. **What is the visibility of the `deposit` method?**
**A)** Public
**B)** Private
**C)** Protected
**D)** Package/Default

**Diagram B:**

```text
[Team] <*>(consists of)---- [Player]
```

_(Note: The diamond is filled/solid)_

33. **What relationship does this diagram represent?**
**A)** Association
**B)** Aggregation
**C)** Composition
**D)** Inheritance

34. **If the `Team` object is destroyed, what happens to the `Player` objects?**
**A)** They continue to exist.
**B)** They are also destroyed.
**C)** They are moved to another Team.
**D)** Nothing happens.

**Diagram C:**

```text
[Department] <>(has)---- [Teacher]
```

_(Note: The diamond is empty/hollow)_

35. **What relationship does this diagram represent?**
**A)** Association
**B)** Aggregation
**C)** Composition
**D)** Inheritance

36. **If the `Department` is closed, what happens to the `Teacher` objects?**
**A)** They cease to exist.
**B)** They continue to exist independently.
**C)** They become null.
**D)** They are garbage collected immediately.

**Diagram D:**

```text
      [Vehicle]
         ^
         |
     (extends)
         |
       [Car]
```

_(Note: Solid line with closed, empty arrow pointing to Vehicle)_

37. **Which class is the Superclass?**
**A)** Vehicle
**B)** Car
**C)** Both
**D)** Neither

38. **How would you write this in Java?**
**A)** `class Vehicle extends Car`
**B)** `class Car implements Vehicle`
**C)** `class Car extends Vehicle`
**D)** `class Vehicle implements Car`

**Diagram E:**

```text
   <<interface>>
    [Playable]
         ^
         |
    (implements)
         |
      [Guitar]
```

_(Note: Dashed line with closed, empty arrow pointing to Playable)_

39. **What does the `<<interface>>` stereotype imply about `Playable`?**
**A)** It is a normal class.
**B)** It cannot be instantiated and has abstract methods.
**C)** It is a final class.
**D)** It is a primitive type.

40. **How would you write this in Java?**
**A)** `class Guitar extends Playable`
**B)** `class Guitar implements Playable`
**C)** `interface Guitar extends Playable`
**D)** `abstract Guitar implements Playable`

**Diagram F (Multiplicity):**

```text
[Order] "1" ---- "0..*" [Item]
```

41. **How many `Item` objects can be associated with one `Order`?**
**A)** Exactly one.
**B)** Zero or one.
**C)** Zero to many.
**D)** One to many.

42. **How many `Order` objects is an `Item` associated with?**
**A)** Exactly one.
**B)** Zero or one.
**C)** Many.
**D)** Unknown.

**General UML Symbols:**

43. **What does the `#` symbol represent?**
**A)** Public
**B)** Private
**C)** Protected
**D)** Static

44. **What does an underlined method name (e.g., `<u>getCount()</u>`) represent?**
**A)** Abstract method
**B)** Static method
**C)** Final method
**D)** Void method

45. **What does an italicized class name (e.g., _Shape_) represent?**
**A)** Abstract class
**B)** Interface
**C)** Static class
**D)** Final class

---

## Part III: Code Analysis (Tracing & Output)

_Analyze the code snippets and determine the output or result._

**Snippet 1: Static vs Instance**

```java
class Counter {
    static int count = 0;
    int id = 0;
    Counter() { count++; id = count; }
}
// Main:
Counter c1 = new Counter();
Counter c2 = new Counter();
System.out.println(c1.id + " " + Counter.count);
```

46. **What is the output?**
**A)** `1 1`
**B)** `1 2`
**C)** `2 2`
**D)** `2 1`

**Snippet 2: String Equality**

```java
String s1 = "Java";
String s2 = new String("Java");
System.out.println(s1 == s2);
System.out.println(s1.equals(s2));
```

47. **What is the output?**
**A)** `true true`
**B)** `false false`
**C)** `false true`
**D)** `true false`

**Snippet 3: Polymorphism**

```java
class A { void show() { System.out.print("A"); } }
class B extends A { void show() { System.out.print("B"); } }
// Main:
A obj = new B();
obj.show();
```

48. **What is the output?**
**A)** `A`
**B)** `B`
**C)** `AB`
**D)** Compilation Error

**Snippet 4: Inheritance & Constructors**

```java
class Parent {
    Parent() { System.out.print("P "); }
}
class Child extends Parent {
    Child() { System.out.print("C "); }
}
// Main:
new Child();
```

49. **What is the output?**
**A)** `C`
**B)** `P`
**C)** `C P`
**D)** `P C`

**Snippet 5: Arrays**

```java
int[] arr = {1, 2, 3};
try {
    System.out.println(arr[3]);
} catch (Exception e) {
    System.out.print("Error");
} finally {
    System.out.print(" Done");
}
```

50. **What is the output?**
**A)** `3 Done`
**B)** `Error`
**C)** `Error Done`
**D)** `Done`

**Snippet 6: ArrayList**

```java
ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add(1, "C");
System.out.println(list);
```

51. **What is the output?**
**A)** `[A, B, C]`
**B)** `[A, C, B]`
**C)** `[C, A, B]`
**D)** `[C, B, A]`

**Snippet 7: Abstract Classes**

```java
abstract class Shape { abstract void draw(); }
// Main:
Shape s = new Shape();
s.draw();
```

52. **What is the result?**
**A)** Runs successfully, does nothing.
**B)** Prints "null".
**C)** Compilation Error (Cannot instantiate).
**D)** Runtime Exception.

**Snippet 8: Method Overloading**

```java
void print(int a) { System.out.print("Int"); }
void print(double a) { System.out.print("Double"); }
// Main:
print(10);
print(10.5);
```

53. **What is the output?**
**A)** `IntDouble`
**B)** `DoubleInt`
**C)** `IntInt`
**D)** `DoubleDouble`

**Snippet 9: Exception Flow**

```java
try {
    throw new Exception();
} catch (Exception e) {
    System.out.print("Caught ");
}
System.out.print("Next");
```

54. **What is the output?**
**A)** `Caught`
**B)** `Next`
**C)** `Caught Next`
**D)** Runtime Error

**Snippet 10: Interface Variables**

```java
interface Data { int X = 10; }
// Main:
// Data.X = 20; // Line 1
System.out.println(Data.X);
```

55. **If Line 1 is uncommented, what happens?**
**A)** X becomes 20.
**B)** Compilation Error (Cannot assign to final variable).
**C)** Runtime Error.
**D)** Nothing.

**Snippet 11: Casting**

```java
double d = 9.99;
int i = (int) d;
System.out.println(i);
```

56. **What is the output?**
**A)** `9.99`
**B)** `10`
**C)** `9`
**D)** Error

**Snippet 12: Boolean Logic**

```java
boolean b1 = true;
boolean b2 = false;
System.out.println(b1 && b2);
```

57. **What is the output?**
**A)** `true`
**B)** `false`
**C)** `null`
**D)** `1`

**Snippet 13: String Immutability**

```java
String s = "Java";
s.concat(" Rules");
System.out.println(s);
```

58. **What is the output?**
**A)** `Java Rules`
**B)** `Java`
**C)** `Rules`
**D)** `null`

**Snippet 14: Modulo Operator**

```java
System.out.println(10 % 3);
```

59. **What is the output?**
**A)** `3`
**B)** `1`
**C)** `3.33`
**D)** `0`

**Snippet 15: Loop Logic**

```java
for(int i=0; i<3; i++) {
    System.out.print(i);
}
```

60. **What is the output?**
**A)** `012`
**B)** `123`
**C)** `0123`
**D)** `12`

**Snippet 16: Switch Statement**

```java
int x = 1;
switch(x) {
    case 1: System.out.print("One ");
    case 2: System.out.print("Two"); break;
}
```

61. **What is the output?**
**A)** `One`
**B)** `One Two`
**C)** `Two`
**D)** Error

**Snippet 17: Object Equality**

```java
class A {}
A a1 = new A();
A a2 = new A();
System.out.println(a1.equals(a2));
```

62. **What is the output (assuming equals is NOT overridden)?**
**A)** `true`
**B)** `false`
**C)** `null`
**D)** Error

**Snippet 18: Integer Division**

```java
System.out.println(5 / 2);
```

63. **What is the output?**
**A)** `2.5`
**B)** `2`
**C)** `3`
**D)** `2.0`

**Snippet 19: Post-Increment**

```java
int x = 5;
System.out.println(x++);
System.out.println(x);
```

64. **What is the output?**
**A)** `5 6`
**B)** `6 6`
**C)** `5 5`
**D)** `6 5`

**Snippet 20: Array Index**

```java
int[] a = new int[5];
System.out.println(a[5]);
```

65. **What is the result?**
**A)** `0`
**B)** `null`
**C)** `ArrayIndexOutOfBoundsException`
**D)** `5`

**Snippet 21: `this` keyword**

```java
class A {
    int x = 10;
    void set(int x) {
        this.x = x;
    }
}
// Main:
A a = new A();
a.set(20);
System.out.println(a.x);
```

66. **What is the output?**
**A)** `10`
**B)** `20`
**C)** `0`
**D)** Error

**Snippet 22: `super` keyword**

```java
class P { int x = 10; }
class C extends P {
    int x = 20;
    void print() { System.out.print(super.x); }
}
// Main:
new C().print();
```

67. **What is the output?**
**A)** `10`
**B)** `20`
**C)** `30`
**D)** Error

**Snippet 23: NullPointerException**

```java
String s = null;
try {
    System.out.println(s.length());
} catch(NullPointerException e) {
    System.out.print("Null");
}
```

68. **What is the output?**
**A)** `0`
**B)** `Null`
**C)** Runtime Error (Crash)
**D)** `null`

**Snippet 24: 2D Array**

```java
int[][] arr = { {1, 2}, {3, 4} };
System.out.println(arr[1][0]);
```

69. **What is the output?**
**A)** `1`
**B)** `2`
**C)** `3`
**D)** `4`

**Snippet 25: Final Variable**

```java
final int x = 10;
// x = 20; // Uncommenting this line
System.out.println(x);
```

70. **What happens if the line is uncommented?**
**A)** Prints 20
**B)** Prints 10
**C)** Compilation Error
**D)** Runtime Error

---

**End of Exam**

## Common Pitfalls
 Rushing code-tracing questions without tracking the **exact** state of variables at each step. Confusing UML diamond types — filled diamond = **composition** (strong ownership), empty diamond = **aggregation** (weak ownership). Not accounting for `finally` blocks that **always** execute, even when exceptions are thrown or caught. Forgetting integer division truncation in Java: `7 / 2 = 3`, not `3.5`.

## Summary

> TL;DR — 70-item mock exam: 30 theory (OOP concepts), 15 UML analysis (visibility, relationships), and 25 code tracing (polymorphism, exceptions, collections, casting). Full coverage of CCPROG3 Java OOP syllabus.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Object-Oriented Programming in Java]]

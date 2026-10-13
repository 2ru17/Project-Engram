---
id: Concepts-Finals-Mock-Answers
type: note
course: CCINFOM
topic: Data Modeling
status: completed
---

# Concepts-Finals-Mock-Answers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCINFOM]] #[[Data Modeling]] #[[Information Structures]] #[[Computer Science]] #[[Databases]] #[[SQL]]

---

## Overview

> Subject: Information and Database Management

## Details / Theory

# Concept Finals Mock Exam - ANSWERS

**Subject:** Information and Database Management

---

## Part 1: Multiple Choice

1. **B** - **Software that manages...** (The DBMS is the tool/software, the Database is the collection of data).
2. **C** - **A Row** (Relation = Table, Attribute = Column, Tuple = Row).
3. **B** - **Physical Data Independence** (Physical deals with storage/indexes; Logical deals with schema/tables).
4. **C** - **Insertion Anomaly** (You can't insert the child because the parent doesn't exist or you don't have the data yet).
5. **C** - **It has no partial dependencies** (2NF is about the Whole Key. Partial dependency means depending on only part of a composite key).
6. **A** - **Atomicity** (Atoms are indivisible. The transaction happens fully or not at all).
7. **B** - **2NF** (StudentName depends only on StudentID, which is _part_ of the composite PK. This is a Partial Dependency).
8. **C** - **Referential Integrity** (Ensures references between tables are valid).
9. **C** - **An artificial key...** (Surrogate keys like Auto-Increment IDs have no business meaning, unlike Natural keys like SSN).
10. **B** - **The "Many" side...** (The three branching lines look like a crow's foot, indicating "Many").

---

## Part 2: True or False

11. **FALSE** - Primary Keys identify the row; NULL means "unknown", so it can't identify anything. (Entity Integrity).
12. **TRUE** - A NULL Foreign Key usually implies an **Optional** relationship (e.g., an Employee with no Manager).
13. **TRUE** - You can have many unique columns (Candidate Keys), but you must choose only one to be the Primary Key.
14. **FALSE** - Normalization **reduces** redundancy. Denormalization increases it.
15. **TRUE** - This is the definition of Logical Data Independence.
16. **FALSE** - This is a Transitive Dependency, which is forbidden in 3NF.
17. **TRUE** - In the Relational Model, a Relation is a Table.
18. **TRUE** - Consistency ensures database rules (constraints) are not violated.
19. **FALSE** - A Weak Entity depends on the existence of a Strong Entity (Parent) for its identity.
20. **FALSE** - SQL is **Declarative** (Non-procedural). You tell it _what_ you want (`SELECT`), not _how_ to get it (loops/pointers).

---

## Part 3: Identification

21. **Normalization**
22. **Composite Key**
23. **Transitive Dependency**
24. **SQL (Structured Query Language)**
25. **Conceptual Model** (or Conceptual Schema)

---

## Part 4: Advanced Concepts (New Topics)

26. **C** - **Cartesian Product** (Combines every row of A with every row of B).
27. **B** - **Total Participation** (or Completeness Constraint). The double line in ERD.
28. **B** - **Read Committed** (Prevents Dirty Reads, but allows Non-Repeatable Reads).
29. **B** - **Clustered Index** (Sorts the physical data rows).
30. **B** - **SQL Injection** (Malicious code insertion).

---

## Part 5: Scenario Analysis

31. **Missing Index**
_Analysis:_ Scanning 1 million rows (Full Table Scan) is slow.
_Fix:_ Create an **Index** on the `OrderDate` column.

32. **Isolation Failure (Race Condition)**
_Analysis:_ The database allowed two transactions to read the same state ("Available") before either committed the change.
_Violation:_ **Isolation** (specifically, likely running at a lower isolation level like Read Committed instead of Serializable or Repeatable Read).
_Mechanism:_ **Locking** failed (or wasn't used correctly).

---

## Part 6: Normalization Analysis

33. **1NF**
_Reason:_ It violates 2NF because `ProductName` depends only on `ProductID` (Partial Dependency), which is just _part_ of the composite Primary Key.
34. **UNF (Unnormalized)**
_Reason:_ It violates 1NF because `PhoneNumbers` contains multiple values (Repeating Group/Non-atomic).
35. **2NF**
_Reason:_ It violates 3NF because `DeptName` depends on `DeptID` (Transitive Dependency), which is not the Primary Key. It is in 2NF because the PK is a single column, so Partial Dependency is impossible.

## Common Pitfalls

Accepting short answers without understanding the **reasoning** — use this key to learn _why_ each answer is correct.
Memorizing answers instead of understanding the underlying concept — exam questions may be rephrased.
Skipping the normalization analysis explanations — they show how to identify UNF/1NF/2NF violations step by step.

## Summary

> TL;DR — Complete answer key with explanations for the Concept-Finals-Mock. Each answer includes a rationale connecting to the underlying DBMS concept.

## Review Questions

_To be added._

## Links

**Related:**
**Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Information Management]]

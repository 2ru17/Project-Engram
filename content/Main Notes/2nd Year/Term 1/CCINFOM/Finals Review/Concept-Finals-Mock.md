---
id: Concept-Finals-Mock
type: note
course: CCINFOM
topic: Data Modeling
status: completed
---

# Concept-Finals-Mock

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCINFOM]] #[[Data Modeling]] #[[Information Structures]] #[[Computer Science]] #[[Databases]] #[[SQL]]

---

## Overview

> Subject: Information and Database Management

## Details / Theory

**Subject:** Information and Database Management
**Coverage:** Module 1, Relational Model, Keys, Normalization, ACID
**Time Limit:** 45 Minutes

---

## Part 1: Multiple Choice

_Select the best answer for each question._

1. **Which of the following best describes a DBMS?**
**A)** A collection of related data.
**B)** Software that manages and controls access to the database.
**C)** The physical hardware where data is stored.
**D)** A diagram showing entity relationships.

2. **In the Relational Model, a "Tuple" corresponds to which of the following?**
**A)** A Column
**B)** A Table
**C)** A Row
**D)** A Key

3. **Which level of data independence allows you to change the physical storage structures (like indexes) without affecting the logical schema?**
**A)** Logical Data Independence
**B)** Physical Data Independence
**C)** Conceptual Data Independence
**D)** View Data Independence

4. **Which anomaly occurs when you cannot add a new record because you are missing a required parent record (e.g., cannot add a Course without a Student)?**
**A)** Update Anomaly
**B)** Deletion Anomaly
**C)** Insertion Anomaly
**D)** Modification Anomaly

5. **A table is in 2NF if it is in 1NF and:**
**A)** It has no transitive dependencies.
**B)** It has no repeating groups.
**C)** It has no partial dependencies.
**D)** Every determinant is a candidate key.

6. **Which ACID property ensures that a transaction is "all or nothing"?**
**A)** Atomicity
**B)** Consistency
**C)** Isolation
**D)** Durability

7. **If a table has a Composite Primary Key `(StudentID, CourseID)`, and the attribute `StudentName` depends ONLY on `StudentID`, this violates which normal form?**
**A)** 1NF
**B)** 2NF
**C)** 3NF
**D)** BCNF

8. **Which constraint ensures that a Foreign Key value must match an existing Primary Key value in the parent table?**
**A)** Entity Integrity
**B)** Domain Integrity
**C)** Referential Integrity
**D)** User-Defined Integrity

9. **What is a "Surrogate Key"?**
**A)** A key derived from real-world data (like SSN).
**B)** A key made of multiple columns.
**C)** An artificial key with no business meaning (like an auto-increment ID).
**D)** A key that allows NULL values.

10. **In an ER Diagram, what does a "Crow's Foot" symbol represent?**
**A)** The "One" side of a relationship.
**B)** The "Many" side of a relationship.
**C)** An optional relationship.
**D)** A weak entity.

---

## Part 2: True or False

_Write TRUE if the statement is correct, and FALSE if it is incorrect._

11. A Primary Key can contain NULL values.
12. A Foreign Key can contain NULL values.
13. A table can have multiple Candidate Keys but only one Primary Key.
14. Normalization is primarily used to increase data redundancy for faster reads.
15. Logical Data Independence means you can add a new column to a table without breaking existing applications that don't use that column.
16. In 3NF, non-key attributes are allowed to depend on other non-key attributes.
17. A "Relation" in database terminology is simply a Table.
18. The "Consistency" property in ACID guarantees that the database remains in a valid state before and after a transaction.
19. A Weak Entity can exist without its owner/parent entity.
20. SQL is considered a procedural language (you tell the computer _how_ to get data step-by-step).

---

## Part 3: Identification / Fill in the Blanks

_Identify the term being described._

21. The process of organizing data to reduce redundancy and improve data integrity.
22. A key consisting of two or more attributes that uniquely identify a row.
23. The specific type of dependency where `A -> B` and `B -> C`, therefore `A -> C`.
24. The standard language used for defining and manipulating relational databases.
25. A representation of the database that is independent of both hardware and software (usually an ERD).

---

## Part 4: Advanced Concepts (New Topics)

_Select the best answer._

26. **Which Relational Algebra operation combines every row of Table A with every row of Table B?**
**A)** Union ($\cup$)
**B)** Intersection ($\cap$)
**C)** Cartesian Product ($\times$)
**D)** Join ($\bowtie$)

27. **In an EER model, if a Supertype (e.g., Employee) MUST belong to a Subtype (e.g., Pilot or Mechanic), this is called:**
**A)** Partial Participation
**B)** Total Participation (Completeness Constraint)
**C)** Disjoint Rule
**D)** Overlapping Rule

28. **Which Isolation Level prevents "Dirty Reads" but still allows "Non-Repeatable Reads"?**
**A)** Read Uncommitted
**B)** Read Committed
**C)** Repeatable Read
**D)** Serializable

29. **Which type of index sorts the actual data rows on the disk?**
**A)** Non-Clustered Index
**B)** Clustered Index
**C)** Composite Index
**D)** Hash Index

30. **What is the main risk of allowing User Input directly into a SQL query string without sanitization?**
**A)** Deadlock
**B)** SQL Injection
**C)** Phantom Read
**D)** Data Redundancy

---

## Part 5: Scenario Analysis

_Briefly analyze the situation._

31. **Scenario:** You have a table `Orders` with 1 million rows. A query `SELECT * FROM Orders WHERE OrderDate = '2023-01-01'` takes 5 seconds to run.
**Question:** What is the most likely reason for the slowness, and what single change could fix it?
_(Think about Indexing)_

32. **Scenario:** Two users try to book the last seat on a flight at the exact same millisecond. Both see the seat as "Available", click "Book", and the system confirms both. Now the flight is overbooked.
**Question:** Which ACID property was violated, and what mechanism failed?
_(Think about Isolation and Concurrency)_

---

## Part 6: Normalization Analysis

_Determine the highest Normal Form (1NF, 2NF, or 3NF) of the table described._

33. **Table:** `Orders(OrderID, ProductID, Qty, ProductName)`
**PK:** `(OrderID, ProductID)`
**Dependencies:** `ProductID -> ProductName`
**Status:** \***\*\_\_\_\*\***

34. **Table:** `Student(StudentID, Name, PhoneNumbers)`
**Data:** `PhoneNumbers` contains "555-0101, 555-0102" in a single cell.
**Status:** \***\*\_\_\_\*\***

35. **Table:** `Employee(EmpID, Name, DeptID, DeptName)`
**PK:** `EmpID`
**Dependencies:** `DeptID -> DeptName`
**Status:** \***\*\_\_\_\*\***

## Common Pitfalls

Rushing through scenario questions without identifying the **specific** concept being tested (e.g., missing index vs. isolation failure).
Confusing relational algebra operators — selection ($\sigma$) filters rows, projection ($\pi$) filters columns.
Not reading normalization questions carefully — identify **all** functional dependencies before determining the normal form.

## Summary

> TL;DR — 35-item mock exam covering DBMS concepts, relational algebra, EER, normalization, concurrency, and scenario analysis. Practice under timed conditions.

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

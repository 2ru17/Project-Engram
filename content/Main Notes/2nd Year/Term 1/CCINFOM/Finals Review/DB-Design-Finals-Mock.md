---
id: DB-Design-Finals-Mock
type: note
course: CCINFOM
topic: Data Modeling
status: completed
---

# DB-Design-Finals-Mock

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCINFOM]] #[[Data Modeling]] #[[Information Structures]] #[[Computer Science]] #[[Databases]] #[[SQL]]

---

## Overview

> INSTRUCTION: For each of the following scenarios, you are required to design the database schema. You must identify the entities, attributes, and r...

## Details / Theory

**INSTRUCTION:** For each of the following scenarios, you are required to design the database schema. You must identify the entities, attributes, and relationships, and then **DRAW the ER Diagram** (physically or using a tool).

**GOAL:** Analyze the business rules carefully. Once you have drawn your ERD, compare it with the **Answer Key** (`DB-Design-Finals-Answers.md`) to check if your logic matches the solution. Pay close attention to Cardinality, Participation, and Normalization.

---

## Problem 1: The Public Library (Medium)

**Context:** A library needs to track books and who borrows them.
**Business Rules:**

1.  **Books & Copies:** The library has many "Titles" (e.g., "Harry Potter"). For each Title, they may have multiple physical "Copies" on the shelf.
2.  **Patrons:** The library tracks Patrons (Name, Email, CardNumber).
3.  **Loans:** Patrons borrow Copies. We need to track the **CheckoutDate** and the **DueDate**. Keep history of past loans.
4.  **Authors:** A Title can have **multiple** Authors. An Author can write many Titles.

**Task:**

1.  Draw the ER diagram of the library database. Handle the M:N relationship between Authors and Titles, and correctly model the Title vs. Copy distinction.

---

## Problem 2: Employee Project Management (Medium)

**Context:** A consulting firm manages employees and their projects.
**Business Rules:**

1.  **Employees:** Have an EmpID, Name, and Role.
2.  **Departments:** An Employee belongs to **one** Department. A Department has **many** Employees. A Department _must_ have a Manager (who is also an Employee).
3.  **Projects:** Have a ProjectID and Name.
4.  **Assignments:** Employees work on Projects. Track **HoursWorked** and **Role** per assignment.
5.  **Dependents:** Employees can have Dependents (Spouse, Children). This is a **Weak Entity**.

**Task:**

1.  Draw the ER diagram of the firm's database. Pay attention to the Manager relationship (Recursive/1:1?) and the Dependent entity (Weak Entity).

---

## Problem 3: E-Commerce with Split Shipments (Hard)

**Context:** An advanced online shop.
**Business Rules:**

1.  **Customers & Orders:** A Customer places many Orders.
2.  **Products:** Products have a Price and StockQuantity.
3.  **Order Details:** An Order contains many Products. Track `Quantity` and `PriceAtPurchase`.
4.  **Shipments:** An Order can be split into **multiple** Shipments. A Shipment contains a subset of the items from that Order.

**Task:**

1.  Draw the ER diagram of the e-commerce system. Focus on how to link Shipments to specific items in an Order.

---

## Problem 4: University Hospital System (Expert)

**Context:** A teaching hospital needs to manage staff, patients, and treatments.
**Business Rules:**

1.  **Person (Supertype):** All people (Staff and Patients) have a Name, Address, and DOB.
2.  **Staff (Subtype):** Can be a **Doctor** (has Specialty) or a **Nurse** (has Shift).
_Constraint:_ A Staff member cannot be both a Doctor and a Nurse (Disjoint).
3.  **Patients (Subtype):** Have a MedicalHistory.
_Constraint:_ A Person can be both a Staff member and a Patient (Overlapping).
4.  **Treatments (Ternary):** A **Doctor** prescribes a **Medication** to a **Patient**. We need to track the `Dosage` and `Date`.

**Task:**

1.  Draw the EER diagram. Use Supertype/Subtype notation (Circle with 'd' or 'o'). Handle the Ternary relationship correctly.

## Common Pitfalls
 Starting to draw the ERD before fully reading the business rules — identify **all** entities and relationships first. Forgetting junction/associative entities for M:N relationships. Missing weak entities (like Dependent) that cannot exist without their identifying owner. Not modeling the ternary relationship in the hospital scenario correctly — it connects Doctor, Patient, **and** Medication.

## Summary

> TL;DR — Four ERD design problems (library, employee/project, e-commerce, hospital EER). Practice entity identification, cardinality, weak entities, and EER supertype/subtype modeling.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Database Design]]

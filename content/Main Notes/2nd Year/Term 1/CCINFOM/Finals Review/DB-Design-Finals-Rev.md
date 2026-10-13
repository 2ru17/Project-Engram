---
id: DB-Design-Finals-Rev
type: note
course: CCINFOM
topic: Data Modeling
status: completed
---

# DB-Design-Finals-Rev

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCINFOM]] #[[Data Modeling]] #[[Information Structures]] #[[Computer Science]] #[[Databases]] #[[SQL]]

---

## Overview

> Coverage: Relational Database Design Techniques & Normalization (Handwritten/Practical)

## Details / Theory

**Coverage:** Relational Database Design Techniques & Normalization (Handwritten/Practical)

## Table of Contents

1. [Relational Database Design Techniques](#1-relational-database-design-techniques)
2. [Applied Normalization (The "Handwritten" Part)](#2-applied-normalization-the-handwritten-part)
3. [Advanced Design Concepts](#3-advanced-design-concepts)

---

## 1. Relational Database Design Techniques

### 1. Concepts

Database Design is the process of producing a detailed data model of a database. It requires translating business rules into a structure.
 **Business Rules:** Constraints that enforce business logic.
**Database-Oriented:** Enforced by the DBMS (e.g., "Student ID must be unique", "Age > 18"). Implemented via Constraints (PK, FK, Check).
**Application-Oriented:** Enforced by the software code (e.g., "Cannot return items after 30 days"). Harder to enforce in DB structure alone.
 **Criteria of a Good Database Design:**
**Data Integrity & Consistency:** Data remains accurate across tables (e.g., Cascading deletes).
**Normalization:** Redundancy is minimized to prevent anomalies.
**Scalability:** Structure can handle growth in data volume and user load.
 **Entities:** Objects of interest (e.g., Customer, Order). Become **Tables**. **Attributes:** Characteristics (e.g., Name, Price). Become **Columns**. **Relationships:** Associations between entities. Become **Foreign Keys**.
**Degree of Relationship:**
**Unary (Recursive):** Entity relates to itself (e.g., Employee manages Employee).
**Binary:** Two entities related (e.g., Student takes Course). Most common.
**Ternary:** Three entities related (e.g., Doctor prescribes Drug to Patient).
**Cardinality:**
**One-to-One (1:1):** Rare. FK can go in either table (or merge them).
**One-to-Many (1:M):** Most common. FK goes in the "Many" side.
**Many-to-Many (M:N):** Requires a **Junction Table** (Associative Entity) with two FKs.
**Participation (Constraints):**
**Mandatory (Total):** Every instance _must_ participate (e.g., Order must have a Customer). FK is `NOT NULL`.
**Optional (Partial):** Instance _may_ participate (e.g., Employee _may_ be assigned to a Project). FK can be `NULL`.

### 2. Design & Visualization (UML/ERD)

**Step-by-Step ERD Construction:**

1. **Identify Entities:** List all nouns.
2. **Identify Relationships:** Connect nouns with verbs. Determine cardinality (1 or Many?).
3. **Resolve M:N:** If you see M:N, break it into two 1:M relationships with a new entity in the middle.
4. **Notation (Crow's Foot):**
`||` : Mandatory One
`|{` : Mandatory Many
`o|` : Optional One
`o{` : Optional Many

**Mapping ERD to Schema (The Translation):**
 **Entity** -> **Table** **Attribute** -> **Column** **PK Attribute** -> **Primary Key** **1:M Relationship** -> **Foreign Key** in the "Many" table. **M:N Relationship** -> **New Table** (Junction Table) with two FKs. **1:1 Relationship** -> **Foreign Key** in either table (usually the one that is "optional" to save space).

_(ERD Visualization: Customer --< Order --< OrderDetail >-- Product)_

### 4. Database Creation Guide

1. **Analyze Business Rules:** "A student can take many courses" -> M:N.
2. **Draft Schema:** Write down table names and columns.
3. **Assign Keys:** Pick PKs. Add FKs to link tables.
4. **Refine:** Check for normalization violations.

### 5. Exam Edge Cases
 **Recursive Relationships:** An entity related to itself (e.g., Employee manages Employee). The FK points to the _same_ table's PK. **Weak Entities:** An entity that cannot exist without a parent (e.g., `Dependent` of an `Employee`). Its PK usually includes the parent's PK. **Supertype/Subtype:** Inheritance in DBs (e.g., `Person` is supertype, `Student` and `Teacher` are subtypes). Implemented as 1:1 relationships sharing the PK.

---

## 2. Applied Normalization (The "Handwritten" Part)

### 1. Concepts

In the exam, you might be given a "flat file" (a big spreadsheet) and asked to normalize it.
 **Unnormalized Form (UNF):** Raw data with repeating groups. **Process:** UNF -> 1NF -> 2NF -> 3NF.

### 2. Applied Normalization Walkthrough (Schema Notation)

**Scenario:** An Invoice Table (UNF)
`Invoice(InvNum, Date, CustID, CustName, {ProdID, ProdName, Qty, Price})`
_Note: {} indicates a repeating group._

**Step 1: UNF -> 1NF (Remove Repeating Groups)**
 Flatten the table. The PK becomes Composite: `(InvNum, ProdID)`. Schema: `(InvNum, Date, CustID, CustName, ProdID, ProdName, Qty, Price)`

**Step 2: 1NF -> 2NF (Remove Partial Dependencies)**
 PK is `(InvNum, ProdID)`. Does `Date` depend on `ProdID`? No, just `InvNum`. -> **Move to Invoices**. Does `CustName` depend on `ProdID`? No, just `InvNum` (via CustID). -> **Move to Invoices**. Does `ProdName` depend on `InvNum`? No, just `ProdID`. -> **Move to Products**. Does `Price` depend on `InvNum`? No, just `ProdID`. -> **Move to Products**. Does `Qty` depend on both? Yes. -> **Stay in LineItems**.
 **Resulting Tables:**
  1. `Invoices(InvNum, Date, CustID, CustName)`
  2. `Products(ProdID, ProdName, Price)`
  3. `InvLineItems(InvNum, ProdID, Qty)`

**Step 3: 2NF -> 3NF (Remove Transitive Dependencies)**
 Look at `Invoices(InvNum, Date, CustID, CustName)`. `CustName` depends on `CustID`, not `InvNum`. This is Transitive: `InvNum -> CustID -> CustName`. **Action:** Move Customer data to its own table.
 **Final 3NF Schema:**
  1. `Customers(CustID, CustName)`
  2. `Invoices(InvNum, Date, CustID)`
  3. `Products(ProdID, ProdName, Price)`
  4. `InvLineItems(InvNum, ProdID, Qty)`

### 3. Design & Visualization (UML/ERD)

**Visualizing the Split:**

_(Diagram: UNF [Big Messy Table] --> 1NF [Remove Repeating Groups] --> 2NF [Remove Partial Dependencies] --> 3NF [Remove Transitive Dependencies])_

### 4. Database Creation Guide

**The "3-Step" Algorithm:**

1. **Identify the PK** of the big table (usually composite).
2. **Draw Arrows:** Draw arrows from the PK to other columns.
If A -> B (and A is part of PK), it's a Partial Dependency (Violation of 2NF).
If B -> C (and B is not PK), it's a Transitive Dependency (Violation of 3NF).
3. **Create Tables:** Make a new table for every determinant (the left side of the arrow).

**Example Walkthrough:**
 **Given:** `Order(OrderID, ProductID, Qty, ProductName, CustomerName)` **PK:** `(OrderID, ProductID)` **Dependencies:**
`ProductID` -> `ProductName` (Partial! `ProductID` is part of PK) -> **New Table: Product**
`OrderID` -> `CustomerName` (Partial! `OrderID` is part of PK) -> **New Table: Order**
`(OrderID, ProductID)` -> `Qty` (Full Dependency) -> **Stays in OrderDetail**

### 5. Exam Edge Cases
 **Derived Attributes:** Columns like `TotalCost` (Quantity \* Price) should generally be **removed** in 3NF because they depend on other non-key attributes (and can be calculated). **Multi-valued Attributes:** "Phone Numbers" (plural). In 1NF, this must be moved to a separate table `Employee_Phones`. **Historical Data:** Sometimes `Price` _should_ be in the LineItem table if prices change over time. This is a subtle design choice (snapshotting data).

---

## 3. Advanced Design Concepts

### 1. Concepts

Beyond basic normalization, real-world design involves handling complex relationships and performance trade-offs.
 **Surrogate Keys vs. Natural Keys:**
**Natural Key:** A key derived from the data (e.g., SSN, Email). Good for meaning, bad if it changes.
**Surrogate Key:** An artificial key (e.g., Auto-increment ID). Good for stability and performance. **Composite Keys:**
Keys made of multiple columns. Common in Junction Tables (M:N relationships).

### 2. Advanced Relationship Patterns
 **Polymorphic Associations:**
When a table can belong to multiple other tables (e.g., a `Comment` can be on a `Post` or a `Photo`).
_Implementation:_ Often uses a `TargetType` and `TargetID` column (complex to enforce FKs) or separate tables (`PostComments`, `PhotoComments`). **Table Inheritance (Subtypes):**
**Single Table Inheritance:** One big table with a `Type` column and many NULLs. Fast but messy.
**Class Table Inheritance:** One table per class. Clean but requires JOINs.

### 3. Denormalization Techniques
 **Why Denormalize?** To improve read performance at the cost of write performance and storage. **Common Techniques:**
**Pre-joining:** Storing `CustomerName` in the `Orders` table to avoid a JOIN.
**Derived Columns:** Storing `TotalAmount` in `Orders` instead of summing `OrderDetails` every time.
**Hard-coded Values:** Storing `StatusName` ('Active') instead of `StatusID` (1).

### 4. Data Integrity & Constraints
 **Check Constraints:** Enforce domain rules (e.g., `CHECK (Age >= 18)`). **Unique Constraints:** Ensure no duplicates in non-PK columns (e.g., `UNIQUE (Email)`). **Default Values:** Sets a value if none is provided (e.g., `DEFAULT GETDATE()`). **Not Null:** Ensures a column cannot be empty. **Triggers:** Automated scripts that run on INSERT/UPDATE/DELETE. Used for complex validation or auditing.

## Common Pitfalls
 Confusing **entity** attributes with **relationship** attributes — an attribute belongs to whatever it depends on. Mixing up total vs. partial participation and 1:M vs. M:N cardinality in ERD notation. Normalizing too aggressively — strategic denormalization can improve performance for known query patterns. Forgetting surrogate keys when natural keys are composite or subject to change.

## Summary

> TL;DR — DB design reviewer: business rules → ERD (Crow’s Foot) → schema mapping → normalization (UNF→ 3NF walkthrough). Covers advanced design: surrogate keys, polymorphic associations, table inheritance, denormalization, and integrity constraints.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Database Design]]

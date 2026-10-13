---
id: Concept-Exam-Finals-Rev
type: note
course: CCINFOM
topic: Data Modeling
status: completed
---

# Concept-Exam-Finals-Rev

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCINFOM]] #[[Data Modeling]] #[[Information Structures]] #[[Computer Science]] #[[Databases]] #[[SQL]]

---

## Overview

> Coverage: Module 1 & Relational Database Design Concepts

## Details / Theory

**Coverage:** Module 1 & Relational Database Design Concepts

## Table of Contents

1. [Database Fundamentals & Architecture](#1-database-fundamentals--architecture)
2. [The Relational Model & Keys](#2-the-relational-model--keys)
3. [Relational Algebra (The Math Behind SQL)](#3-relational-algebra-the-math-behind-sql)
4. [Enhanced Entity-Relationship (EER) Model](#4-enhanced-entity-relationship-eer-model)
5. [Normalization Theory](#5-normalization-theory)
6. [Transaction Management (ACID)](#6-transaction-management-acid)
7. [Concurrency Control](#7-concurrency-control)
8. [Indexing & Performance Optimization](#8-indexing--performance-optimization)
9. [Database Security](#9-database-security)
10. [Final Exam Strategy](#10-final-exam-strategy)

---

## 1. Database Fundamentals & Architecture

### 1. Concepts

A **Database Management System (DBMS)** is software that acts as an intermediary between users/applications and the database. It ensures data is stored efficiently, securely, and consistently.
 **Data vs. Information:**
**Data:** Raw facts and figures without context (e.g., `32`, `Red`, `10:00`).
**Information:** Processed data with context and meaning (e.g., `32 degrees Celsius`, `Red Traffic Light`, `10:00 AM Meeting`).
**Dimensions of Quality Information:**
**Accurate:** Error-free.
**Timely:** Available when needed.
**Relevant:** Fits the user's needs.
**Complete:** No missing details.
**Verifiable:** Can be checked for correctness.
**Accessible:** Easily obtained by authorized users.
**Secure:** Protected from unauthorized access.
**Economical:** Value exceeds cost of production.
**Flexible:** Usable for various purposes.
**Reliable:** Trusted source/collection method.
**Simple:** Not overly complex.
 **File-Based Systems vs. Databases:**
**File-Based:** Data stored in separate files (txt, csv). Hard to manage, prone to duplication, hard to secure.
**Database:** Centralized storage. Reduces redundancy, improves integrity, easier to secure.
 **Database Application Architectures:**
**Client-Server (2-Tier):** Application logic is on the client (Desktop), Database is on the server.
**3-Tier Architecture:** Client (Browser) <-> Application Server (Logic/Processing) <-> Database Server (Storage). Common in Web Apps.
 **Data Models (The Tiers):** Representations of real-world data structures.
**Conceptual (High-Level):**
_Focus:_ What data is stored? (Business Rules).
_Output:_ Entity-Relationship Diagram (ERD).
_Independence:_ Hardware & Software independent.
**Logical (Implementation-Level):**
_Focus:_ How is data structured? (Tables, Columns, FKs).
_Output:_ Relational Schema.
_Independence:_ Specific to a DBMS family (Relational) but product-independent.
**Physical (Low-Level):**
_Focus:_ How is data stored on disk? (Indexes, Partitions, File Organization).
_Output:_ SQL DDL / Internal Schema.
_Independence:_ Specific to a DBMS product (e.g., Oracle, SQL Server).
 **Data Independence:**
**Logical Data Independence:** The ability to change the logical schema (e.g., adding a new column to a table) without changing external views or application programs. _Example: Adding a 'DateOfBirth' column to the 'Students' table shouldn't break the 'Class Roster' report._
**Physical Data Independence:** The ability to change the physical storage structures (e.g., creating an index, changing hard drives) without changing the logical schema. _Example: Moving the database from an HDD to an SSD to improve speed shouldn't require rewriting SQL queries._ **Evolution:**
**Hierarchical/Network:** Old, navigational access (pointers). Rigid structure.
**Relational:** Current standard, uses tables and keys. Declarative access (SQL).
**NoSQL:** Emerging, for unstructured/massive data (Key-value, Document). Flexible schema. **DBMS Components:**
**Query Processor:** Parses and optimizes queries.
**Storage Manager:** Handles access to the physical data on disk.
**Transaction Manager:** Ensures ACID properties.
 **Roles in the Database Environment:**
**System Analyst:** Gathers requirements and translates them into system specifications. Identifies improvements.
**Database Designer / Architect:** Designs the Logical and Physical structure (ERDs, Normalization).
**Database Administrator (DBA):** Manages the DB system. Ensures availability, performance, security, and backups.
**Database Developer:** Creates application logic to interact with the DB.
**Database Operator:** Executes pre-written queries and generates reports.

### 2. Design & Visualization (UML/ERD)

**Conceptual Model Visualization:**

1. Identify **Entities** (Nouns: Student, Course).
2. Identify **Attributes** (Adjectives: Name, ID).
3. Identify **Relationships** (Verbs: Enrolls in).

_(ERD Visualization: Student --< Enrolls in >-- Course)_

### 4. Database Creation Guide

1. **Requirements Gathering:** Define what data is needed (Functional Requirements). _Output: Requirements Doc._
2. **Conceptual Design:** Draw the ERD. Identify entities and relationships. _Output: ER Diagram._
3. **Logical Design:** Map ERD to Tables (Relations). Normalize data. _Output: Relational Schema._
4. **Physical Design:** Write SQL `CREATE TABLE` statements. Tune performance. _Output: SQL Script / Database._

### 5. Exam Edge Cases
 **Logical vs. Physical:** Don't confuse them. Logical is about _tables and columns_; Physical is about _indexes and storage_. **DBMS vs. Database:** The Database is the collection of data; the DBMS is the software managing it. **Metadata:** Data about data (e.g., table names, column types), stored in the System Catalog / Data Dictionary.

---

## 2. The Relational Model & Keys

### 1. Concepts

The **Relational Model** stores data in **Relations** (Tables) composed of **Tuples** (Rows) and **Attributes** (Columns). The power of this model lies in **Keys** and **Integrity**.
 **Keys (The Identity System):**
**Super Key:** Any set of attributes that uniquely identifies a row. (e.g., `ID`, `ID + Name`, `ID + Email`). It's the superset of Candidate Keys.
**Candidate Key:** A "minimal" Super Key. No unnecessary attributes. (e.g., `ID` is a candidate, `Email` is a candidate).
**Primary Key (PK):** The _chosen_ Candidate Key to be the main identifier. **Cannot be NULL**. Minimal.
**Alternate Key:** All Candidate Keys that were _not_ chosen as the PK. (e.g., if `ID` is PK, then `Email` is the Alternate Key).
**Foreign Key (FK):** Links to a PK in another table. Enforces **Referential Integrity**.
**Composite Key:** A PK made of multiple columns. Common in Junction Tables.
**Surrogate Key:** Artificial ID (e.g., `1, 2, 3`). Used when no good natural key exists.
**Natural Key:** Real-world unique ID (e.g., `SSN`, `ISBN`). **Integrity Constraints:**
**Entity Integrity:** PK cannot be NULL. Each row must be identifiable.
**Referential Integrity:** FK must match a valid PK in the parent table, or be NULL.
**Domain Integrity:** Column values must match the defined data type (e.g., Age must be an integer).
 **Relation Schema vs. Relation Instance:**
**Relation Schema:** The blueprint or structure (Table name, Column names, Data types). Changes rarely.
**Relation Instance:** The snapshot of data (rows) at a specific moment. Changes frequently (Insert/Update/Delete).

### 2. Design & Visualization (UML/ERD)

**Visualizing Keys:**
 **PK:** Marked with a key icon or `PK`. **FK:** Marked with `FK`.

_(ERD Visualization: Student (PK) --< Enrollment (FKs) >-- Course (PK))_

### 4. Database Creation Guide

1. Identify the unique identifier for each entity (PK).
2. Identify relationships (1:M, M:N).
3. For 1:M, put the PK of the "1" side as an FK in the "M" side.
4. For M:N, create a **Junction Table** (like `Enrollments` above) with two FKs.
5. **Check Integrity:** Ensure every FK points to a valid table.

### 5. Exam Edge Cases
 **Null FKs:** Foreign Keys _can_ be NULL (unless specified `NOT NULL`), meaning the relationship is optional. Primary Keys _cannot_ be NULL. **Unique vs. PK:** A table can have multiple `UNIQUE` constraints (Candidate Keys), but only **one** `PRIMARY KEY`. **Self-Referencing FK:** A table can have an FK pointing to itself (e.g., `ManagerID` in `Employees` table).

---

## 3. Relational Algebra (The Math Behind SQL)

### 1. Concepts

Relational Algebra is a procedural query language. It provides a theoretical foundation for relational databases and SQL.
 **Basic Operations:**
**Select ($\sigma$):** Filters rows based on a condition (like SQL `WHERE`).
**Project ($\pi$):** Selects specific columns (like SQL `SELECT`).
**Union ($\cup$):** Combines rows from two tables (removes duplicates). Tables must be union-compatible.
**Set Difference ($-$):** Rows in A but not in B.
**Cartesian Product ($\times$):** Combines every row of A with every row of B.
**Rename ($\rho$):** Renames a table or attribute.
 **Derived Operations:**
**Intersection ($\cap$):** Rows common to both tables.
**Join ($\bowtie$):** Combines related tuples from two relations. (Basically $\sigma$ applied to $\times$).
**Division ($\div$):** Used for queries like "Find students who have taken _all_ courses".

### 2. Logical Query Processing Order

Understanding how the DBMS executes a query is crucial for optimization. It differs from the order you write it.

1. **FROM / JOIN:** The database first identifies the tables and joins them.
2. **WHERE:** It filters the rows based on conditions.
3. **GROUP BY:** It groups the remaining rows.
4. **HAVING:** It filters the groups.
5. **SELECT:** It finally selects the columns to return.
6. **ORDER BY:** It sorts the final result.

---

## 4. Enhanced Entity-Relationship (EER) Model

### 1. Concepts

The EER model extends the standard ER model to handle more complex requirements.
 **Supertype / Subtype (Inheritance):**
**Supertype:** A generic entity (e.g., `Employee`). Contains common attributes (Name, ID).
**Subtype:** A specific subgroup (e.g., `Pilot`, `Mechanic`). Contains specific attributes (LicenseNum, ToolSet).
**Inheritance:** Subtypes inherit attributes and relationships from the Supertype.
 **Constraints:**
**Disjointness Constraint:**
**Disjoint (d):** An entity can be only ONE subtype (e.g., A generic `Person` cannot be both `Dead` and `Alive`).
**Overlapping (o):** An entity can be multiple subtypes (e.g., A `Person` can be both `Employee` and `Student`).
**Completeness Constraint:**
**Total Participation (Double Line):** Every Supertype _must_ be a member of at least one Subtype.
**Partial Participation (Single Line):** A Supertype _can_ exist without belonging to any Subtype.

---

## 5. Normalization Theory

### 1. Concepts

**Normalization** is the process of organizing data to **reduce redundancy** and **improve integrity**. It prevents **Anomalies**:
 **Insertion Anomaly:** Cannot add data because missing other data. **Update Anomaly:** Updating one fact requires multiple changes. **Deletion Anomaly:** Deleting one fact causes loss of unrelated data.

**Core Concepts:**
 **Decomposition:** Breaking a large table into smaller, related tables. **Lossless Join:** The ability to recreate the original table by JOINing the decomposed tables without losing data or creating fake rows.

**The Forms:**
 **1NF (Atomic):** No repeating groups or lists. One value per cell. **2NF (Whole Key):** 1NF + No **Partial Dependencies**. Non-key attributes must depend on the _entire_ PK (applies to Composite Keys). **3NF (Nothing but the Key):** 2NF + No **Transitive Dependencies**. Non-key attributes must depend _only_ on the PK, not on other non-key attributes. **BCNF (Boyce-Codd):** Stricter 3NF. Every determinant must be a candidate key. Handles cases where a table has multiple overlapping candidate keys. **4NF (Multi-valued Dependencies):** Removes independent multi-valued facts (e.g., A student has multiple Skills AND multiple Hobbies, but Skills and Hobbies are unrelated. They should be in separate tables).

### 2. Design & Visualization (UML/ERD)

**Visualizing Dependencies:**
 **2NF Violation:** An attribute points to only _part_ of the PK. **3NF Violation:** An attribute points to another _non-key_ attribute.

_(Diagram: UserID [PK] --> ZipCode --> City. Note: City depends on ZipCode, not UserID directly. This is a Transitive Dependency.)_

### 3. Database Creation Guide

1. **Start with 1NF:** Ensure all fields are atomic. Remove comma-separated lists.
2. **Check 2NF:** If you have a composite PK, check if any field depends on just _one_ part of it. If so, move it to a new table.
3. **Check 3NF:** Look for fields that depend on each other (e.g., `State` depends on `City` or `Zip`). Move them to a lookup table.
4. **Denormalization:** Sometimes we intentionally break 3NF for performance (e.g., storing `TotalOrderValue` in `Orders` table to avoid calculating it every time).

### 4. Exam Edge Cases
 **2NF Trick:** If a table has a **Single Column PK**, it is automatically in 2NF (because you can't have a partial dependency on a single column). **BCNF:** A stricter version of 3NF. Every determinant must be a candidate key. (Often asked if 3NF isn't enough). **Lossless Decomposition:** When splitting tables, you must be able to JOIN them back together without losing or creating fake data.

---

## 6. Transaction Management (ACID)

### 1. Concepts

Transactions ensure data integrity during complex operations.
 **ACID Properties:**
**Atomicity:** All or nothing. If one part fails, the whole transaction rolls back.
**Consistency:** Database remains in a valid state before and after the transaction.
**Isolation:** Transactions don't interfere with each other.
**Durability:** Saved changes survive power loss.
 **Isolation Levels (Dirty Reads vs Performance):**
**Read Uncommitted:** Lowest level. Allows "Dirty Reads" (reading uncommitted data). Fast but dangerous.
**Read Committed:** Default for many DBs. Prevents Dirty Reads.
**Repeatable Read:** Prevents "Non-Repeatable Reads" (data changing between two reads in the same transaction).
**Serializable:** Highest level. Prevents "Phantom Reads". Transactions run as if they were sequential. Slowest.

---

## 7. Concurrency Control

### 1. Concepts

When multiple transactions execute simultaneously, we need mechanisms to ensure data integrity.
 **Locking Methods:**
**Binary Lock:** Two states: Locked (1) or Unlocked (0). Simple but restrictive.
**Shared/Exclusive Locks:**
**Shared (S-Lock):** Read-only access. Multiple transactions can hold S-locks on the same item.
**Exclusive (X-Lock):** Read/Write access. Only one transaction can hold an X-lock.
**Two-Phase Locking (2PL):** A protocol that guarantees serializability.
**Growing Phase:** Transaction acquires all needed locks. Cannot release any.
**Shrinking Phase:** Transaction releases locks. Cannot acquire any new ones.
 **Deadlock:**
A situation where two transactions wait for each other to release a lock, creating a cycle.
**Prevention:** Wait-Die or Wound-Wait schemes.
**Detection:** Wait-for graphs.

### 2. Timestamp Ordering
 Assigns a unique timestamp to every transaction. Ensures that transactions execute in the order of their timestamps. If an older transaction tries to access data modified by a newer transaction, the older transaction is rolled back and restarted.

---

## 8. Indexing & Performance Optimization

### 1. Concepts

Indexes are data structures used to speed up data retrieval.
 **How it works:** Think of an index like a book's index. Instead of scanning every page (Full Table Scan), the database looks up the page number in the index. **Trade-off:** Indexes speed up `SELECT` queries but slow down `INSERT`, `UPDATE`, and `DELETE` operations (because the index must be updated too).

### 2. Types of Indexes
 **Clustered Index:**
Sorts the actual data rows in the table based on the key.
Only **one** clustered index per table (usually the Primary Key). **Non-Clustered Index:**
Creates a separate structure pointing to the data rows.
You can have multiple non-clustered indexes. **Composite Index:**
An index on multiple columns (e.g., `Lastname, Firstname`). Order matters!

### 3. Query Optimization Tips
 **Avoid `SELECT *`:** Retrieve only needed columns. **Use Indexes Wisely:** Index columns used frequently in `WHERE`, `JOIN`, and `ORDER BY` clauses. **Avoid Functions on Columns:** `WHERE YEAR(OrderDate) = 2023` prevents index usage. Use `WHERE OrderDate BETWEEN '2023-01-01' AND '2023-12-31'` instead.

---

## 9. Database Security

### 1. Concepts
 **Authentication:** Verifying identity (Who are you?). **Authorization:** Verifying permissions (What can you do?). **Views:** Can be used to hide sensitive columns from specific users. **SQL Injection:** A security vulnerability where an attacker interferes with the queries an application makes.
**Prevention:** Use Parameterized Queries (Prepared Statements).

---

## 10. Final Exam Strategy

1. **Read Carefully:** Identify if the question asks for _Logical_ (ERD) or _Physical_ (Schema) design.
2. **Check Cardinalities:** Always verify the "One" and "Many" sides.
3. **Normalize:** If in doubt, check for partial and transitive dependencies.
4. **ACID:** Remember that transactions must be All-or-Nothing.
5. **Draw Clearly:** In the drawing section, use standard Crow's Foot notation.

Good luck! You got this.

## Common Pitfalls
 Confusing **logical data independence** (change schema without affecting views) with **physical data independence** (change storage without affecting schema). Mixing up normalization forms — 2NF removes partial dependencies, 3NF removes transitive dependencies, BCNF is stricter. Forgetting that ACID’s **Isolation** requires proper locking/serialization; just implementing transactions doesn’t guarantee it.

## Summary

> TL;DR — Comprehensive CCINFOM concepts review: DBMS architecture, relational model & keys, relational algebra, EER, normalization (1NF–4NF), ACID transactions, concurrency control (2PL, deadlocks), indexing, and SQL injection prevention.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_


## References & Navigation

- **Related Notes:** [[Information Management]]

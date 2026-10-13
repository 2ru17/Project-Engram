---
id: ccinfom_relational_model_normalization
type: note
course: CCINFOM
topic: Relational Model and Normalization
status: completed
---

# Relational Model and Normalization

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Problem Solving]] #[[CCINFOM]] #[[Normalization]] #[[Database Design]] #[[Relational Model]] #[[M7]]

---

## Key Definitions
 **Relation**: A 2-dimensional table with columns (attributes) and rows (tuples). **Domain**: The allowable values for one or more attributes. **Degree**: The number of attributes (columns) in a relation. **Cardinality**: The number of tuples (rows) in a relation. **Functional Dependency**: The value of one attribute (the determinant) determines the value of another attribute.

## Theoretical Framework

### Properties of a Relation
For a table to be considered a relation:
1. It must have a unique name.
2. Every attribute value must be atomic (not multi-valued or composite).
3. Every tuple must be unique.
4. Attributes must have unique names.
5. Order of columns is irrelevant.
6. Order of rows is irrelevant.

### Integrity Constraints **Domain Constraints**: Validates the correct data format/range. **Entity Integrity**: No primary key attribute may be null. **Referential Integrity**: A foreign key value must match a primary key value in the parent relation (or be completely null). Deletion rules include *Restrict*, *Cascade*, and *Set-to-Null*.

### Data Anomalies
Poorly structured relations cause data anomalies: **Insertion Anomaly**: Cannot add new data without entering redundant information or being forced to add unrelated data. **Deletion Anomaly**: Deleting a record inadvertently results in the loss of other important information. **Modification Anomaly**: Updating a value requires changes to multiple redundant rows, increasing the risk of inconsistencies.

---

## Important Formulas / Normal Forms

### Normalization Process

**Data Normalization** is a technique used to validate and improve a logical design, reducing data redundancy and avoiding anomalies by decomposing relations.

#### First Normal Form (1NF) **Requirement**: No multi-valued attributes and every attribute value must be atomic. **Action**: Flatten the table by ensuring each cell contains only one value.

#### Second Normal Form (2NF) **Requirement**: Must be in 1NF **PLUS** every non-key attribute must be fully functionally dependent on the ENTIRE primary key.  **Action**: Identify and remove *partial functional dependencies*. If a non-key attribute depends on only part of a composite primary key, move it to a new table along with that part of the key.

#### Third Normal Form (3NF) **Requirement**: Must be in 2NF **PLUS** no transitive dependencies. **Action**: Identify and remove *transitive dependencies* (where a non-key attribute is determined by another non-key attribute). Move the dependent attributes to a new table where the determinant becomes the primary key, and leave the determinant in the original table as a foreign key.

---

## Worked Examples

### Normalizing a Purchase Order

**Unnormalized Form (UNF)**:
`PO (PO#, PODate, ClientName, ClientAddress, ClientEmail, ClientPhone, {Prod#, ProdName, Price, Qty, Size, Color, Total})` The brackets `{}` denote a multi-valued group.

**Step 1: 1NF (Remove multi-valued attributes)**
Flatten into a single relation:
`PO_1NF (PO#, PODate, ClientName, ClientAddress, ClientEmail, ClientPhone, Prod#, ProdName, Price, Qty, Size, Color, Total)`
*(Primary Key is composite: `PO#, Prod#`)*

**Step 2: 2NF (Remove Partial Dependencies)** `PODate, ClientName, ClientAddress, ClientEmail, ClientPhone` depend ONLY on `PO#`. `ProdName, Price, Size, Color` depend ONLY on `Prod#`. `Qty, Total` depend on BOTH `PO#` and `Prod#`.

Resulting 2NF Relations:
1. `PODetail (PO#, Prod#, Qty, Total)`
2. `Product (Prod#, ProdName, Price, Size, Color)`
3. `PO (PO#, PODate, ClientName, ClientAddress, ClientEmail, ClientPhone)`

**Step 3: 3NF (Remove Transitive Dependencies)** In the `PO` table, `ClientAddress, ClientEmail, ClientPhone` depend on `ClientName` (assuming ClientName uniquely identifies a client in this context).

Resulting 3NF Relations:
1. `PODetail (PO#, Prod#, Qty, Total)`
2. `Product (Prod#, ProdName, Price, Size, Color)`
3. `PO (PO#, PODate, ClientName)`
4. `Customer (ClientName, ClientAddress, ClientEmail, ClientPhone)`

## Multiple Choice Questions

1. In the relational model, what does the term "Degree" refer to?
    - **A)** The number of tuples (rows) in a relation.
    - **B)** The number of attributes (columns) in a relation.
    - **C)** The allowable values for an attribute.
    - **D)** The number of foreign keys in a table.

2. Which integrity constraint ensures that no primary key attribute is ever null?
    - **A)** Domain Constraint
    - **B)** Referential Integrity
    - **C)** Entity Integrity
    - **D)** Functional Constraint

3. What anomaly occurs when you cannot add new data without entering redundant information or unrelated data?
    - **A)** Deletion Anomaly
    - **B)** Modification Anomaly
    - **C)** Insertion Anomaly
    - **D)** Functional Anomaly

4. What is a fundamental property of a relation regarding its rows and columns?
    - **A)** The order of columns is strict, but rows can be random.
    - **B)** Both the order of rows and the order of columns are irrelevant.
    - **C)** Rows must be sorted by the primary key.
    - **D)** Multi-valued attributes are allowed if the column is wide enough.

5. In order for a table to be in First Normal Form (1NF), what must be true?
    - **A)** It must have no partial dependencies.
    - **B)** Every non-key attribute must depend on the entire primary key.
    - **C)** It must contain no transitive dependencies.
    - **D)** Every attribute value must be atomic and there can be no multi-valued attributes.

6. Second Normal Form (2NF) specifically addresses and removes which of the following?
    - **A)** Transitive dependencies
    - **B)** Multi-valued attributes
    - **C)** Partial functional dependencies
    - **D)** Domain constraint violations

7. A transitive dependency exists when:
    - **A)** A non-key attribute is functionally determined by another non-key attribute.
    - **B)** A non-key attribute depends only on part of a composite primary key.
    - **C)** The primary key is dependent on a foreign key.
    - **D)** An attribute has multiple values within a single cell.

8. When resolving a Referential Integrity constraint during deletion, which rule prevents the deletion of a parent record if a child record exists?
    - **A)** Cascade
    - **B)** Restrict
    - **C)** Set-to-Null
    - **D)** Ignore

9. In the normalization example provided, moving `ClientAddress, ClientEmail, ClientPhone` to a new `Customer` table is done to achieve which normal form?
    - **A)** First Normal Form (1NF)
    - **B)** Second Normal Form (2NF)
    - **C)** Third Normal Form (3NF)
    - **D)** Boyce-Codd Normal Form (BCNF)

10. What does the term "Cardinality" mean in the context of a relation's structure?
    - **A)** The total number of columns.
    - **B)** The number of tuples (rows) present in the relation.
    - **C)** The maximum number of tables that can be joined.
    - **D)** The number of dependencies between attributes.

### Answer Key & Explanations
1. **B)** The degree of a relation is defined strictly as the number of attributes or columns it contains.
2. **C)** Entity integrity is the rule stating that primary keys must remain fully populated (no nulls) to ensure row uniqueness.
3. **C)** An insertion anomaly prevents you from successfully adding new, isolated data into a table due to the table's flawed structure requiring additional unrelated data.
4. **B)** For a table to qualify as a relation, the sequence and ordering of both its rows and columns are completely irrelevant.
5. **D)** 1NF's core requirement is that all attributes must hold atomic, single values rather than multi-valued sets.
6. **C)** 2NF builds upon 1NF by identifying and eliminating partial dependencies, ensuring non-key attributes rely on the entire composite primary key.
7. **A)** Transitive dependency occurs when one non-key attribute relies on another non-key attribute, rather than directly on the primary key.
8. **B)** The "Restrict" deletion rule ensures referential integrity by actively blocking the deletion of a parent record if corresponding foreign key records exist in child tables.
9. **C)** Removing client details that depend on `ClientName` instead of the primary key resolves a transitive dependency, achieving 3NF.
10. **B)** Cardinality describes the number of instances, which translates to the total number of tuples (or rows) in a given relation.

## References & Navigation

- **Previous Topic:** [[Enhanced ER Model and Transformation]]
- **Related Notes:** [[Introduction to Databases]]

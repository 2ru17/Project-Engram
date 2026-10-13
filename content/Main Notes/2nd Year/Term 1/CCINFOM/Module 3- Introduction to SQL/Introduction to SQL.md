---
id: ccinfom_intro_to_sql
type: note
course: CCINFOM
topic: Introduction to SQL
status: completed
---

# Introduction to SQL

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Code Snippets]] #[[CCINFOM]] #[[SQL]] #[[DDL]] #[[DML]] #[[Database]] #[[M3]]

---

## Overview
Structured Query Language (SQL) serves as the universal vernacular for interacting with Relational Database Management Systems (RDBMS). It is a comprehensive standard that specifies the exact syntax and semantics required to define data structures, manipulate stored information, and exert rigorous control over data access. Understanding SQL is essential for any database practitioner, as it forms the bedrock for communicating with complex data repositories, enabling everything from structural database design to intricate data analysis.

## Key Definitions
- **SQL (Structured Query Language)**: The standardized programming language utilized to manage, query, and design relational databases.
- **DDL (Data Definition Language)**: The subset of SQL commands used to define, modify, or destroy the structural framework of a database (e.g., tables, views, indexes).
- **DML (Data Manipulation Language)**: The subset of SQL commands concerned with maintaining and retrieving the actual data stored within those structures.
- **DCL (Data Control Language)**: The subset of SQL commands used to manage administration privileges and control user access to the database.

## Theoretical Framework / Core Concepts

### SQL Environment Components
The SQL environment is broadly divided into distinct sub-languages based on their functional purpose:
1. **Data Definition Language (DDL)**: This includes commands like `CREATE`, `ALTER`, and `DROP`. DDL is strictly concerned with the schema—the blueprints of the database. When you execute a DDL command, you are physically changing the structure of the database rather than the data housed within it.
2. **Data Manipulation Language (DML)**: Comprising commands such as `SELECT`, `INSERT`, `UPDATE`, and `DELETE`, DML is what users and applications utilize most frequently. It governs the insertion of new records, the modification of existing data, and the execution of queries to retrieve specific datasets.
3. **Data Control Language (DCL)**: While not the primary focus of initial database modeling, DCL (including `GRANT` and `REVOKE`) is critical for security, determining which users have the authority to view or manipulate data.

## Worked Examples / Code Walkthroughs

### Data Definition Language (DDL) in Practice

#### Creating a Table
When instantiating a new table, one must specify the attributes (columns), assign appropriate data types (like `NUMBER` or `VARCHAR2`), define default values, and establish integrity constraints such as Primary Keys.
```sql
CREATE TABLE CUSTOMER_T (
    CUSTOMER_ID NUMBER(11) NOT NULL,
    CUSTOMER_NAME VARCHAR2(50) NOT NULL,
    CUSTOMER_ADDRESS VARCHAR2(100),
    CITY VARCHAR2(50),
    STATE VARCHAR2(2) DEFAULT 'NY',
    POSTAL_CODE VARCHAR2(10),
    CONSTRAINT CUSTOMER_PK PRIMARY KEY (CUSTOMER_ID)
);
```
*Explanation*: This command creates a structured entity named `CUSTOMER_T`. The `CUSTOMER_ID` is forced to be non-null and acts as the unique identifier (Primary Key). If a state is not provided upon insertion, it defaults to 'NY'.

#### Altering and Dropping Tables
As business requirements evolve, so too must the database schema.
```sql
-- Appends a new column named 'TYPE' to the existing table
ALTER TABLE CUSTOMER_T ADD (TYPE VARCHAR(2));

-- Permanently eradicates the table and all its structural metadata
DROP TABLE CUSTOMER_T;
```

#### Creating Indexes and Views
Indexes are internal structures that drastically speed up data retrieval times, akin to a book's index. Views are virtual tables generated dynamically from underlying base tables, useful for security (hiding columns) and simplifying complex queries.
```sql
-- Generates an index on the CUSTOMER_NAME column for faster lookups
CREATE INDEX NAME_IDX ON CUSTOMER_T(CUSTOMER_NAME);

-- Creates a virtual table restricting visibility to only high-value products
CREATE VIEW EXPENSIVE_STUFF_V AS
SELECT PRODUCT_ID, PRODUCT_NAME, UNIT_PRICE
FROM PRODUCT_T
WHERE UNIT_PRICE > 300
WITH CHECK_OPTION;
```

### Data Manipulation Language (DML) in Practice

#### Modifying Data: INSERT, UPDATE, DELETE
Data is dynamic; DML allows for seamless modification of this data.
```sql
-- Populates an entire row, mapping values exactly to the column order
INSERT INTO CUSTOMER_T VALUES (1, 'Contemporary Casuals', '1355 S. Himes Blvd.', 'Gainesville', 'FL', '32601');

-- Selectively populates specific columns; unspecified columns will be null or use defaults
INSERT INTO PRODUCT_T (PRODUCT_ID, PRODUCT_DESCRIPTION, STANDARD_PRICE) 
VALUES (1, 'End Table', 175);

-- Modifies an existing record based on a specific condition
UPDATE PRODUCT_T SET UNIT_PRICE = 775 WHERE PRODUCT_ID = 7;

-- Removes specific records satisfying the WHERE clause
DELETE FROM CUSTOMER_T WHERE STATE = 'HI';

-- Flushes all data from the table while retaining its DDL structure
DELETE FROM CUSTOMER_T;
```

#### Querying Data: The SELECT Statement
The `SELECT` statement is the cornerstone of SQL data retrieval. A fully fleshed-out query leverages several clauses, fundamentally structured as follows:
- **SELECT**: Dictates which specific columns to return.
- **FROM**: Identifies the source tables or views.
- **WHERE**: Applies a row-level filter to the initial dataset.
- **GROUP BY**: Aggregates identical data into distinct groups.
- **HAVING**: Applies a filter to the aggregated groups (similar to WHERE, but for groups).
- **ORDER BY**: Defines the final sorting order (ascending or descending) of the output.

```sql
SELECT STATE, COUNT(STATE) 
FROM CUSTOMER_T
WHERE STATE IN ('FL', 'TX', 'CA', 'HI')
GROUP BY STATE
HAVING COUNT(STATE) > 1
ORDER BY STATE;
```
*Explanation*: This query extracts the state names and a tally of customers within those states. It initially filters the raw data to only include four specific states. It then aggregates the counts by state, further restricting the final output to only show those states that have more than one customer, finally organizing the list alphabetically.

> [!tip] Processing Order of SQL Statements
> Internally, the DBMS does not read a query top-to-bottom. It processes in this strict logical sequence: `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY`. Understanding this internal logic is crucial for troubleshooting complex nested queries and aggregate functions.

## Summary & Key Takeaways
- SQL is categorized into DDL (structure), DML (data modification and retrieval), and DCL (security).
- DDL commands (`CREATE`, `ALTER`, `DROP`) physically modify the database schema and its metadata.
- DML commands (`INSERT`, `UPDATE`, `DELETE`) allow for the manipulation of the records stored within the tables.
- The `SELECT` statement is a powerful DML tool for extracting specific datasets using filtering (`WHERE`), aggregating (`GROUP BY`), and sorting (`ORDER BY`).
- To construct accurate and optimized queries, one must understand the logical internal processing order of SQL clauses.

## Multiple Choice Questions

1. Which SQL subset is strictly responsible for modifying the structural blueprint of the database?
- **A)** Data Control Language (DCL)
- **B)** Data Definition Language (DDL)
- **C)** Data Manipulation Language (DML)
- **D)** Database Processing Language (DPL)

2. Which command is used to permanently remove an entire table structure from a database?
- **A)** DELETE TABLE
- **B)** REMOVE TABLE
- **C)** DROP TABLE
- **D)** TRUNCATE TABLE

3. When a query contains a GROUP BY clause, which clause is used to apply conditions specifically to the aggregated groups?
- **A)** WHERE
- **B)** FILTER
- **C)** SORT
- **D)** HAVING

4. What is the primary purpose of a SQL View?
- **A)** To physically duplicate data for backup purposes.
- **B)** To speed up hardware read times across the disk.
- **C)** To create a virtual table for controlled data access and query simplification.
- **D)** To assign primary keys automatically.

5. What happens when you execute the command `DELETE FROM CUSTOMER_T;`?
- **A)** The table structure is removed permanently.
- **B)** The table is renamed to a null state.
- **C)** All records are removed, but the table structure remains intact.
- **D)** An error occurs because no WHERE clause is provided.

6. Which DML command modifies existing records already stored in a database?
- **A)** ALTER
- **B)** INSERT
- **C)** MODIFY
- **D)** UPDATE

7. What is the first clause processed logically by the DBMS when executing a SELECT query?
- **A)** SELECT
- **B)** FROM
- **C)** WHERE
- **D)** ORDER BY

8. Which SQL component manages user access privileges and administration?
- **A)** DML
- **B)** DDL
- **C)** DCL
- **D)** SQL-Admin

9. In a `CREATE TABLE` statement, what does the `DEFAULT` keyword achieve?
- **A)** It forces the user to input a specific value or the command fails.
- **B)** It automatically drops the table if data is missing.
- **C)** It automatically inserts a pre-defined value if no specific value is provided during data insertion.
- **D)** It sets the column as a primary key.

10. The `ALTER TABLE` command falls under which category of SQL?
- **A)** Data Definition Language (DDL)
- **B)** Data Manipulation Language (DML)
- **C)** Data Control Language (DCL)
- **D)** Relational Query Language (RQL)

### Answer Key & Explanations

1. **B** - DDL (Data Definition Language) handles the schema structure (creating, altering, dropping tables).
2. **C** - `DROP TABLE` is the correct DDL command used to completely eradicate a table and its structural metadata.
3. **D** - While the `WHERE` clause filters individual rows before aggregation, the `HAVING` clause is specifically designed to filter aggregated groups.
4. **C** - A view is a stored query that acts as a virtual table, often used to restrict access to certain columns or simplify complex multi-table joins for the end-user.
5. **C** - Running a `DELETE` statement without a `WHERE` clause flushes all data from the table, but as a DML command, it does not destroy the DDL structure.
6. **D** - `UPDATE` is the designated DML command used to change the values of existing records. `ALTER` is DDL and changes structure, not data.
7. **B** - The internal logical processing order of SQL begins with the `FROM` clause to identify the initial data source before any filtering or selecting occurs.
8. **C** - Data Control Language (DCL), which includes `GRANT` and `REVOKE`, is used for database security and access control.
9. **C** - The `DEFAULT` constraint ensures that if a row is inserted without specifying a value for that column, the predetermined default value will be utilized.
10. **A** - `ALTER TABLE` modifies the schema blueprint, meaning it is definitively a Data Definition Language (DDL) command.

## References & Navigation

- **Previous Topic:** [[Database and Its Environment]]
- **Next Topic:** [[Advanced SQL]]
- **Related Notes:** [[Introduction to Databases]]

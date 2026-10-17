---
id: 170_introduction_to_databases
type: note
course: CCICOMP
topic: "17.0 Introduction to Databases"
status: completed
---

# 17.0 Introduction to Databases

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Database]] #[[SQL]] #[[M8]]

---

## Overview

This document provides a foundational introduction to databases. It covers the core concepts, the various types of database models (such as Relational and NoSQL), and the fundamental components that make up a database system. Additionally, it introduces Database Management Systems (DBMS) and provides a practical overview of Structured Query Language (SQL), covering both Data Definition Language (DDL) and Data Manipulation Language (DML) with common query examples.

## Key Definitions
 **Database:** An organized collection of structured data, typically stored and accessed electronically from a computer system. **Database Management System (DBMS):** Software that interacts with end users, applications, and the database itself to capture and analyze the data. It enables users to define, create, maintain, and control access (e.g., MySQL, Oracle, MongoDB). **SQL (Structured Query Language):** The standard language (standardized by ANSI) used for managing and manipulating relational databases. **DDL (Data Definition Language):** A subset of SQL commands used to define and modify the structure of the database (e.g., `CREATE`, `ALTER`, `DROP`). **DML (Data Manipulation Language):** A subset of SQL commands used to manipulate the data residing within the tables (e.g., `SELECT`, `INSERT`, `UPDATE`, `DELETE`).

## Theoretical Framework

### Components of a Database **Data:** The actual information being stored. **Database Schema:** The blueprint or structure of the database, including tables, fields, and relationships. **Query Processor:** The component that interprets and executes database queries. **Indexes:** Data structures that improve the speed of data retrieval operations.

### Types of Databases
1. **Hierarchical Database:** Data is organized in a tree-like structure with parent-child relationships (1-to-many).
2. **Network Database:** Similar to hierarchical, but child records can have multiple parent records (many-to-many).
3. **Object-Oriented Database:** Data is represented as objects and classes, useful for processing complex data rapidly.
4. **Relational Database:** Stores data in tables consisting of rows (records) and columns (fields). Every piece of information has a relationship with others, maintained via Primary and Foreign Keys. Prioritizes data integrity.
5. **NoSQL Database:** Non-relational database with a flexible hierarchy (similar to file folders). Lacks strict structure, allowing for rapid processing of large data volumes and high horizontal scalability. Frequently used in cloud computing.

### Benefits and Applications **Benefits:** Efficient management, easy retrieval, scalability, robust data integrity/security, and concurrent access capabilities. **Applications:** Electronic health records (Healthcare), transaction processing (Finance), inventory management (Retail), user profiles (Social Media).

## Worked Examples

### Common SQL Commands

**1. Data Definition Language (DDL): Creating a Table**
```sql
CREATE TABLE employees ( 
    name VARCHAR(50),
    age INT,
    department VARCHAR(50)
);
```

**2. Data Manipulation Language (DML): Inserting Data**
```sql
INSERT INTO employees (name, age, department) 
VALUES ('John Doe', 35, 'Sales');
```

**3. Data Manipulation Language (DML): Querying Data**
```sql
SELECT name, age 
FROM employees 
WHERE age > 30;
```

**4. Data Manipulation Language (DML): Updating Data**
```sql
UPDATE employees 
SET department = 'Marketing' 
WHERE name = 'John Doe';
```

**5. Data Manipulation Language (DML): Deleting Data**
```sql
DELETE FROM employees 
WHERE name = 'John Doe';
```

## Multiple Choice Questions

1. What is a Database Management System (DBMS)?
- **A)** The physical hard drive where data is stored.
- **B)** Software that interacts with users and applications to capture, analyze, and manage structured data.
- **C)** A hardware firewall protecting stored data.
- **D)** A single table of rows and columns.

2. Which language is the standard used for managing and manipulating relational databases?
- **A)** Python
- **B)** C++
- **C)** SQL (Structured Query Language)
- **D)** HTML

3. Which subset of SQL commands is used to define and modify the structure of the database (e.g., CREATE, ALTER)?
- **A)** Data Manipulation Language (DML)
- **B)** Data Definition Language (DDL)
- **C)** Extensible Markup Language (XML)
- **D)** Object-Oriented Programming (OOP)

4. In database components, what is a Database Schema?
- **A)** The component that executes database queries.
- **B)** The blueprint or structure of the database, including tables, fields, and relationships.
- **C)** The actual information being stored.
- **D)** The indexing algorithm for rapid data retrieval.

5. Which type of database stores data in tables of rows and columns, using Primary and Foreign Keys to maintain relationships?
- **A)** Hierarchical Database
- **B)** Object-Oriented Database
- **C)** NoSQL Database
- **D)** Relational Database

6. What characterizes a NoSQL database compared to a relational one?
- **A)** It relies heavily on strict Primary Key relationships.
- **B)** It lacks strict structure, allowing for rapid processing of large data volumes and high horizontal scalability.
- **C)** It organizes data in a strict parent-child tree structure.
- **D)** It can only be used for small, local desktop applications.

7. Which SQL command is part of the Data Manipulation Language (DML) used to add new records to a table?
- **A)** CREATE
- **B)** INSERT
- **C)** DROP
- **D)** ALTER

8. What are Indexes used for in a database?
- **A)** Data structures that improve the speed of data retrieval operations.
- **B)** Scripts that automatically back up the database.
- **C)** Rules that prevent unauthorized user access.
- **D)** Relationships between foreign and primary keys.

9. What type of database organizes data in a tree-like structure with 1-to-many parent-child relationships?
- **A)** Network Database
- **B)** Hierarchical Database
- **C)** Relational Database
- **D)** Object-Oriented Database

10. Which SQL clause is typically used with the SELECT command to filter the queried data based on specific conditions?
- **A)** SET
- **B)** VALUES
- **C)** WHERE
- **D)** UPDATE

### Answer Key & Explanations
1. **B)** A DBMS is software that enables users to define, create, maintain, and control access to data.
2. **C)** SQL is the standard language (ANSI) used for managing and manipulating relational databases.
3. **B)** Data Definition Language (DDL) is used to define and modify database structure.
4. **B)** The Database Schema is the blueprint or structure of the database.
5. **D)** Relational Databases store data in tables of rows/columns and maintain relationships via Primary/Foreign Keys.
6. **B)** NoSQL databases lack strict structure, allowing rapid processing and high horizontal scalability.
7. **B)** INSERT is a DML command used to insert new data/records.
8. **A)** Indexes are data structures that improve the speed of data retrieval operations.
9. **B)** A Hierarchical Database organizes data in a tree-like structure with parent-child relationships (1-to-many).
10. **C)** The WHERE clause is used in the SELECT command to filter queried data based on conditions (e.g., WHERE age > 30).

## References & Navigation

- **Previous Topic:** [[Software Development Process]]
- **Related Notes:** [[Database and Its Environment]], [[Introduction to SQL]]

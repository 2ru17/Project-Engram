---
id: ccinfom_advanced_sql
type: note
course: CCINFOM
topic: Advanced SQL
status: completed
---

# Advanced SQL

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Code Snippets]] #[[CCINFOM]] #[[SQL]] #[[Joins]] #[[Subqueries]] #[[Union]] #[[M4]]

---

## Overview

Advanced SQL focuses on querying across multiple tables, using `JOIN` operations, combining query results with `UNION`, and nesting queries (Subqueries).

## Syntax Breakdown

### JOINS
Joins combine data from different tables based on related columns.

#### 1. INNER JOIN
Only includes rows where there is a match in both tables based on the join condition.

```sql
SELECT T1.PROD_CODE, T1.DESCRIPTION, T2.QTY
FROM TABLE1 T1
INNER JOIN TABLE2 T2 
ON T1.PROD_CODE = T2.PROD_CODE;

-- Alternative syntax if column names match exactly:
SELECT *
FROM TABLE1 
INNER JOIN TABLE2 USING (PROD_CODE);
```

#### 2. LEFT (OUTER) JOIN
Returns all rows from the left table. If there is no matching row in the right table, NULL values are filled in for the right table's columns.

```sql
SELECT c.customerNumber, c.customerName, o.orderNumber, o.status
FROM customers c
LEFT JOIN orders o 
ON c.customerNumber = o.customerNumber;
```

**Condition placement (WHERE vs ON):**
In a `LEFT JOIN`, putting a condition in the `ON` clause acts differently than putting it in the `WHERE` clause. 
In `ON`: It restricts the matching process (unmatched left-table rows still appear with NULLs).
In `WHERE`: It filters the final result set (effectively turning the query into an inner join if filtering a right-table column).
*(Note: For an `INNER JOIN`, placing conditions in `ON` or `WHERE` is logically equivalent).*

### UNION
Combines the result sets of two or more `SELECT` statements vertically. Both tables must have the same number of columns, same column names, and compatible data types.

```sql
-- Find items bought for themselves OR as gifts
SELECT CUST_NO, PROD_CODE, QTY
FROM BOUGHT_FOR_SELF
UNION
SELECT CUST_NO, PROD_CODE, QTY
FROM BOUGHT_AS_GIFT;
```

### Subqueries
A query nested inside another query (Select within a Select).

```sql
-- Find customers who bought product T0001
SELECT * 
FROM CUSTOMERS 
WHERE CUST_NO IN (
    SELECT CUST_NO 
    FROM ORDERS 
    WHERE PROD_CODE = 'T0001'
);
```

> [!tip] Thinking Discipline for SQL
> 1. **FROM**: Identify where the data comes from.
> 2. **WHERE/ON**: Identify filtering and joining conditions.
> 3. **SELECT**: Pick the fields required.
> 4. **ORDER BY**: Sort the output as needed.

## Multiple Choice Questions

1. What is the primary purpose of an INNER JOIN in SQL?
    - **A)** It returns all rows from both tables, filling in NULL values where there are no matches.
    - **B)** It only includes rows where there is a match in both tables based on the join condition.
    - **C)** It vertically combines the result sets of two or more SELECT statements.
    - **D)** It returns all rows from the left table and matches from the right table.

2. Which SQL keyword is used as an alternative syntax to the ON clause in an INNER JOIN when the column names match exactly?
    - **A)** LIKE
    - **B)** MATCH
    - **C)** USING
    - **D)** HAVING

3. In a LEFT JOIN, what happens if there is no matching row in the right table?
    - **A)** The query produces an error.
    - **B)** The row from the left table is omitted from the result set.
    - **C)** NULL values are filled in for the right table's columns.
    - **D)** The query defaults to an INNER JOIN.

4. How does placing a condition in the ON clause differ from placing it in the WHERE clause during a LEFT JOIN?
    - **A)** There is no difference; they are logically equivalent.
    - **B)** Placing it in the ON clause restricts the matching process, while the WHERE clause filters the final result set.
    - **C)** The ON clause filters the final result set, while the WHERE clause restricts the matching process.
    - **D)** The ON clause can only be used with INNER JOINs.

5. Which of the following is a requirement for combining result sets using the UNION operator?
    - **A)** Both tables must have different numbers of columns.
    - **B)** Both tables must have the same number of columns and compatible data types.
    - **C)** The data in both tables must be sorted prior to using UNION.
    - **D)** The UNION must be followed by an ORDER BY clause.

6. What is a Subquery in SQL?
    - **A)** A query that updates the database schema before execution.
    - **B)** A query nested inside another query, typically within the WHERE or FROM clause.
    - **C)** A query that joins more than three tables simultaneously.
    - **D)** A query that combines results using UNION.

7. According to the "Thinking Discipline for SQL", which clause should you identify first when constructing a query?
    - **A)** SELECT
    - **B)** WHERE/ON
    - **C)** ORDER BY
    - **D)** FROM

8. What does the LEFT OUTER JOIN guarantee about the final result set?
    - **A)** It will only contain records that have a match in both tables.
    - **B)** It will include every row from the left table, regardless of a match in the right table.
    - **C)** It will include every row from both the left and right tables.
    - **D)** It will exclude rows from the left table that have no match in the right table.

9. In the context of the SQL execution order, what is the primary role of the SELECT clause?
    - **A)** To sort the output.
    - **B)** To identify filtering and joining conditions.
    - **C)** To pick the specific fields or columns required in the output.
    - **D)** To identify the data source.

10. Which SQL operation would you use to vertically stack the results of "Items bought for self" and "Items bought as gifts"?
    - **A)** INNER JOIN
    - **B)** LEFT JOIN
    - **C)** Subquery
    - **D)** UNION

### Answer Key & Explanations

1. **B**. INNER JOIN only includes rows where there is a match in both tables based on the join condition.
2. **C**. The USING keyword is an alternative syntax for the ON clause when the joining columns share the exact same name.
3. **C**. In a LEFT JOIN, if there is no match in the right table, the result still includes the left table row but with NULL values for the right table's columns.
4. **B**. For LEFT JOINs, conditions in ON restrict the joining matches, whereas conditions in WHERE filter the entire final result set.
5. **B**. A UNION requires that both combining queries have the same number of columns, the same names, and compatible data types.
6. **B**. A subquery is explicitly defined as a query nested inside another query.
7. **D**. The discipline identifies FROM as the first step (Identify where the data comes from).
8. **B**. The defining feature of a LEFT JOIN is that it returns all rows from the left table regardless of matches.
9. **C**. The SELECT clause is used to pick the required fields after the source and filtering conditions have been established.
10. **D**. UNION is the operation used to combine result sets of two or more SELECT statements vertically.

## References & Navigation

- **Previous Topic:** [[Introduction to SQL]]
- **Next Topic:** [[Modeling Data]]
- **Related Notes:** [[Introduction to Databases]]

---
id: ccinfom_modeling_data
type: note
course: CCINFOM
topic: Modeling Data
status: completed
---

# Modeling Data

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Conceptual]] #[[CCINFOM]] #[[ER Diagram]] #[[Data Modeling]] #[[M5]]

---

## Key Definitions
 **Business Rules**: Statements that define or constrain aspects of the business. Good business rules are declarative, precise, atomic, consistent, expressible, distinct, and business-oriented. **Entity Instance**: A single person, place, object, event, or concept (corresponds to a row). **Entity Type**: A collection of entities (corresponds to a table). **Attribute**: A property or characteristic of an entity type. **Relationship Type**: A meaningful association between entity types.

## Theoretical Framework

### Types of Attributes **Simple vs. Composite**: Simple cannot be broken down (e.g., Age). Composite can be (e.g., Address broken into Street, City). **Single-Valued vs. Multi-Valued**: A person can have one DOB but multiple Skills. **Stored vs. Derived**: DOB is stored, but Age can be derived from DOB and the current date. **Identifier (Key)**: Uniquely identifies an entity instance. Can be simple or composite. Should not change in value, cannot be null, and should not contain intelligent information that might change.

### Types of Entities **Strong Entity**: Exists independently and has its own unique identifier. Represented by a single-line rectangle. **Weak Entity**: Depends on a strong entity and cannot exist on its own. It has a partial identifier and is represented by a double-line rectangle. **Associative Entity**: An entity that acts as both a relationship and an entity. Used when a many-to-many relationship needs to have its own attributes or when it participates in other relationships.

### Degree of Relationships **Unary**: One entity related to another of the same entity type (e.g., an Employee managing another Employee). **Binary**: Entities of two different types related to each other. **Ternary**: Entities of three different types related to each other.

### Cardinality Constraints
Defines the number of instances of one entity that can or must be associated with each instance of another entity. **Minimum Cardinality**: If zero, the relationship is optional. If one or more, it is mandatory. **Maximum Cardinality**: The maximum number of related instances allowed (One-to-One, One-to-Many, Many-to-Many).

## Multiple Choice Questions

1. Which term describes a single person, place, object, event, or concept in data modeling?
    - **A)** Entity Type
    - **B)** Entity Instance
    - **C)** Attribute
    - **D)** Relationship Type

2. What type of attribute can be broken down into smaller, meaningful components like Street and City?
    - **A)** Simple Attribute
    - **B)** Derived Attribute
    - **C)** Composite Attribute
    - **D)** Multi-Valued Attribute

3. A person's "Age" can be calculated from their "Date of Birth" and the current date. What kind of attribute is "Age"?
    - **A)** Stored Attribute
    - **B)** Derived Attribute
    - **C)** Multi-Valued Attribute
    - **D)** Composite Attribute

4. Which of the following is a characteristic of a valid Identifier (Key)?
    - **A)** It can frequently change its value.
    - **B)** It may contain null values.
    - **C)** It should not contain intelligent information that might change.
    - **D)** It must always be a simple attribute.

5. How is a Weak Entity visually represented in an Entity-Relationship (ER) diagram?
    - **A)** A single-line rectangle
    - **B)** A dashed-line rectangle
    - **C)** A double-line rectangle
    - **D)** A single-line diamond

6. What type of entity acts as both a relationship and an entity, often used to resolve many-to-many relationships?
    - **A)** Weak Entity
    - **B)** Associative Entity
    - **C)** Strong Entity
    - **D)** Unary Entity

7. A relationship where entities of three different types are associated with each other is called a:
    - **A)** Unary relationship
    - **B)** Binary relationship
    - **C)** Ternary relationship
    - **D)** Complex relationship

8. If an instance of an entity is not required to participate in a relationship, what is its minimum cardinality?
    - **A)** Zero (Optional)
    - **B)** One (Mandatory)
    - **C)** Many
    - **D)** Infinite

9. In a Unary relationship, the entity type is related to:
    - **A)** Another strong entity type.
    - **B)** A weak entity type.
    - **C)** An associative entity type.
    - **D)** Another instance of the same entity type.

10. Which of the following is NOT a characteristic of a good business rule?
    - **A)** Declarative
    - **B)** Atomic
    - **C)** Ambiguous
    - **D)** Business-oriented

### Answer Key & Explanations
1. **B)** An entity instance represents a single occurrence (like a specific person or object), corresponding to a table row.
2. **C)** Composite attributes are those that can be logically broken down into smaller, simpler attributes, such as splitting an address.
3. **B)** Derived attributes are not physically stored but are calculated dynamically from other stored attributes (like DOB).
4. **C)** An identifier must uniquely identify an instance, cannot be null, should not change, and should avoid containing intelligent information prone to changing.
5. **C)** Weak entities depend on strong entities and are visually represented by a double-line rectangle in ER diagrams.
6. **B)** An associative entity functions as both a relationship and an entity, particularly useful for handling M:N relationships with their own attributes.
7. **C)** A ternary relationship involves entities of three distinct types interacting together.
8. **A)** A minimum cardinality of zero indicates that participation in the relationship is entirely optional.
9. **D)** A unary relationship describes an association where an entity type is related to itself (e.g., an employee managing another employee).
10. **C)** Good business rules are meant to be precise, consistent, and distinct. They should explicitly avoid being ambiguous.

## References & Navigation

- **Previous Topic:** [[Advanced SQL]]
- **Next Topic:** [[Enhanced ER Model and Transformation]]
- **Related Notes:** [[Introduction to Databases]]

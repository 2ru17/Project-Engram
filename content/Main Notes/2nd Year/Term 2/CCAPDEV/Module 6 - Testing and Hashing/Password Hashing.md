---
id: password_hashing
type: note
course: CCAPDEV
topic: Password Hashing
status: completed
---

# Password Hashing

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Password Hashing]] #[[Code Snippets]] #[[M6]]

---

## Overview

> Extracted notes for Password Hashing covering both theoretical and practical elements.

## Key Definitions
 Outline Password Hashing Password Hashing through mongoose mongoose middlewares bcrypt
 Setting up the User schema First, we define the schema, and specify which fields are going to be required. The, we set the username's (or any other field that is meant to serve as the id) unique field to true
 Inserting the hashing code First, we must import the bcrypt module You can install bcrypt via: npm install bcrypt Then, we define a constant called SALT_WORK_FACTOR and set its value to 10. This will define how long the salt string will be
 Further Reading Why bcrypt? – Coda Hale https://codahale.com/how-to-safely-store-a-password/ How NOT to Store Passwords! – Computerphile https://www.youtube.com/watch?v=8ZtInClXe1Q

## Code Implementation

```text
Password Hashing
password hashing is the process of transforming plaintext data into an unreadable* format through hashing techniques. 
plaintext refers to information that is fed as an input to a coding process
plaintext data, when stored as is, is often referred to as cleartext.
cleartext is what we want to avoid as this leads to a vulnerability and confidentiality when storing user credentials into a database. 
Hashing is the process of transforming a string of characters into another value. 
Hashing functions are one-way, meaning you cannot convert a hashed string back to its plaintext form.
*in human standards
ISO/IEC7498-2, Information Processing Systems--Open Systems Interconnection Reference Model--Part 2: Security Architecture
```

```text
Password Hashing through Mongoose
Mongoose provides functionalities that make it easier to perform password hashing. 
Do note that it is still possible with the native mongodb driver, but additional code must be written first.
The ff steps are usually involved when password hashing:
User registers a user -> server checks if the username already exists
If not, server reads credentials in plaintext
Before the document is saved, the password must be hashed using some hashing algorithm.
The document with the hashed password is then saved into the database.
When logging in, the server hashes the input password and compares whether the hashed password from the database matches.
```

```text
Password Hashing through Mongoose
To implement password hashing through mongoose, we will be using the following concepts:
mongoose middlewares – allows us to perform functions before a certain database operation is performed.
bcrypt – a npm module which makes use of the bcrypt hashing function 
```

```text
mongoose middlewares
Mongoose also features middleware functions (aka pre and post hooks).
It allows you define working code for pre- and post- mongoose operation execution.
General Syntax for pre hooks:
schema.pre([operation], function (next) {...});
where:
operation – string representing the method name of the mongoose operation (e.g., find, save, insertMany, etc.)
function(next) – the working code to be executed. Calling next() will invoke the next middleware function for the same operation. 
https://mongoosejs.com/docs/middleware.html
```

```text
Using a middleware for hashing
The following middleware function will be performed before the 'save' operation is executed. 
For save, this refers to the document being saved. Depending on the operation, this could be linked to other references. 
user.isModified('password') checks whether the password field of the document has been modified or is newly created. 
```

## Syntax Breakdown
 Ensure correct syntax for Password Hashing Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Why is it dangerous to store a user's password as "cleartext" in a database?
- **A)** Cleartext takes up significantly more database storage space than hashed passwords.
- **B)** Cleartext cannot be used to authenticate a session in MongoDB.
- **C)** It creates a severe security vulnerability, compromising user confidentiality if the database is breached.
- **D)** Cleartext passwords automatically expire after a set time limit.

2. What is a key property of a proper hashing function used for passwords?
- **A)** It is a two-way function, allowing admins to retrieve the original password if forgotten.
- **B)** It is a one-way function, meaning it cannot be converted back to its original plaintext form.
- **C)** It encrypts the password uniquely for every separate database table automatically.
- **D)** It is completely bypassable if the `SALT_WORK_FACTOR` is set to 0.

3. How does a Mongoose "pre hook" (middleware) assist in password hashing?
- **A)** It connects directly to the user's browser to hash the password before it travels over the network.
- **B)** It decrypts the password when the user logs in.
- **C)** It allows you to execute working code (such as applying a bcrypt hash) *before* a specific operation (like `save`) is performed on the database.
- **D)** It automatically creates a new database collection just for storing passwords.

### Answer Key & Explanations
1. **C)** Plaintext data stored as is is referred to as cleartext, which leads to a severe vulnerability and breaches confidentiality.
2. **B)** Hashing functions are one-way, meaning you cannot convert a hashed string back to its plaintext form.
3. **C)** Mongoose middleware functions (pre hooks) allow you to perform code, such as hashing a modified password, right before the document is saved to the database.

## References & Navigation

- **Previous Topic:** [[Security & Authentication]]
- **Next Topic:** [[Debugging and Test Tools]]
- **Related Notes:** [[Client Server Architecture]]

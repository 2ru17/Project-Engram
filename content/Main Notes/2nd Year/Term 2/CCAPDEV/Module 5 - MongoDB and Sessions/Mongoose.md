---
id: mongoose
type: note
course: CCAPDEV
topic: Mongoose
status: completed
---

# Mongoose

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Mongoose]] #[[Code Snippets]] #[[M5]]

---

## Overview

> Extracted notes for Mongoose covering both theoretical and practical elements.

## Key Definitions
 What is Mongoose? Mongoose provides a straightforward, schema-based solution to model your application data It manages relationships between data It provides schema validation It translates objects in code to MongoDB document representation It is an Object Data Modelling (ODM) library for MongoDB and Nodejs It includes built-in typecasting, schema validation, query building, and many more It is built on top of the MongoDB Nodejs driver, ‘mongodb’ on npm
 Installing Mongoose Search for mongoose in the npm repository and follow the installation instructions Navigate to your project directory Run the command npm init Run the command npm install mongoose
 Mongoose Terminologies There are a couple of Mongoose terminologies that needs defining, starting with schemas Schemas define the structure of the document MongoDB is a schema-less database management system It can be quite flexible However, documents can look very different from one another even if they’re in the same collection https://mongoosejs.com/docs/guide.html
 Mongoose Terminologies Although MongoDB is schema-less, a Mongoose schema can define the document structure to be enforced (which is useful for validation) Mongoose still works on the MongoDB DBMS However, Mongoose allows for strongly-typed documents/collections to exist This is a big help with validation, since you’d normally want to check strings against strings, numbers against numbers, etc. https://mongoosejs.com/docs/guide.html
 Mongoose Terminologies Another concept in Mongoose is the model A mongoose model is a constructor that lets you create instances of a document using the defined schema A model is a rough equivalent of a collection in the underlying MongoDB database. Models are also responsible for the CRUD operations performed unto the specified collection on the database https://mongoosejs.com/docs/models.html

## Code Implementation

```text
Getting Started
Similar to the mongodb nodejs driver way, pass the URI and connection options, if needed
mongoose.connect(uri, options)
You can specify the database in either the uri or in the options, through the field dbName
This function call returns a promise, which you can the attach callback statements using .then
If you are working with multiple databases, you can use mongoose.createConnection to create additional connections
This function call returns a connection object which can be used to access the specified database
https://mongoosejs.com/docs/connections.html
```

```text
Getting Started
mongoose.connect("mongodb://localhost:27017/myProject")
or
mongoose.connect("mongodb://localhost:27017/“, {dbName: 'myProject’});
Other options can be found here:
https://mongoosejs.com/docs/connections.html#options
https://mongoosejs.com/docs/connections.html
```

```text
// A Sample Schema
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { 
    type: Number,
    min: 0
  }
});

 Text Editor
 models/user.js 
https://mongoosejs.com/docs/guide.html
```

```text

 models/user.js 
// A Sample Schema
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { 
    type: Number,
    min: 0
  }
});
// A Sample Model
const User = mongoose.model('user', userSchema);

 Text Editor
 models/user.js
```

```text
const UserSchema = new mongoose.Schema({
    fName: String,
    idNum: Number,
    pw: {
        type: String,
        required: true
    }
});

 Text Editor
models/user.js
```

## Syntax Breakdown
 Ensure correct syntax for Mongoose Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. What is the primary role of Mongoose in a Node.js application?
    - **A)** It acts as an Object Data Modelling (ODM) library for MongoDB, providing schema-based solutions and validation.
    - **B)** It serves as a front-end framework for dynamically rendering HTML templates.
    - **C)** It is a relational database management system designed to replace MongoDB.
    - **D)** It is a middleware strictly used for session authentication.

2. Even though MongoDB is naturally schema-less, what is the advantage of defining a Mongoose Schema?
    - **A)** It entirely disables NoSQL properties, forcing MongoDB to act exactly like an SQL database.
    - **B)** It automatically compresses all documents to save storage space.
    - **C)** It allows for strongly-typed documents, making it easier to enforce validation (e.g., checking strings against strings).
    - **D)** It prevents users from performing CRUD operations on the database.

3. In Mongoose, what is a "Model"?
    - **A)** The raw unformatted JSON data retrieved from a query.
    - **B)** A constructor compiled from a Schema that lets you create instances of a document and perform CRUD operations.
    - **C)** The connection string used to connect to the MongoDB instance.
    - **D)** A middleware function that triggers after a document is saved.

### Answer Key & Explanations

1. **A**. Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model application data.
2. **C**. A Mongoose schema defines a document structure to be enforced, allowing for strongly-typed documents and robust validation.
3. **B**. A mongoose model is a constructor that lets you create instances of a document using a defined schema and perform CRUD operations on a collection.

## References & Navigation

- **Previous Topic:** [[MongoDB]]
- **Next Topic:** [[Cookies and Sessions]]
- **Related Notes:** [[Client Server Architecture]]

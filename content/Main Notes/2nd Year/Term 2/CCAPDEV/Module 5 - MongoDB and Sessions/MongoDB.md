---
id: mongodb
type: note
course: CCAPDEV
topic: MongoDB
status: completed
---

# MongoDB

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[MongoDB]] #[[Code Snippets]] #[[M5]]

---

## Overview

> Extracted notes for MongoDB covering both theoretical and practical elements.

## Key Definitions
 Model-View-Controller https://developer.mozilla.org/en-US/docs/Glossary/MVC
 Model-View-Controller https://medium.com/@joespinelli_6190/mvc-model-view-controller-ef878e2fd6f5
 What is MongoDB? “MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era” MongoDB is a document database wherein one collection (equiv. to a table in RDBMS) holds different documents (equiv. to a tuple in RDBMS). Number of fields, content, and size of the document can differ from one document to another
 What is MongoDB? A record in MongoDB is referred to as a document, which is a data structure compose of field and value pairs.  Just like JSON objects The values of fields may include other documents, arrays, and arrays of documents
 Installing MongoDB (Locally) Search for MongoDB in the npm registry and follow the installation instructions Navigate to your project directory Run npm install mongodb This will install the MongoDB driver for a node.js project Install the MongoDB service (mongod) into your machine. https://www.mongodb.com/docs/manual/administration/install-community/

## Code Implementation

```text
Side: CommonJS/ES6 Modules
There are two ways to import modules:
CommonJS
ES6
CommonJS is the NodeJS default, and follows the syntax:
For imports: const <name> = require(<module name/path to module>);
For exports: module.exports = { <objects/functions to be exported> }
```

```text
Side: CommonJS/ES6 Modules
ES6 follows the syntax:
For imports:import <name> from <module_name/path>;orimport {<obj/func to import>, <other obj/funcs>} from <module_name/path>; 
For exports:export const obj = ...orexport function myFunc() { ... }or export {<prevDefinedConst>, <prevDefinedFunc>};
```

```text
Creating a MongoDB Connection
Inside conn.js:
To create an instance, use the constructornew MongoClient(<url>)
url – the socket where we will connect to. The port can be set to anything as long as it is not occupied by another service.
```

```text
Creating a MongoDB Connection
Inside conn.js:
Two functions are exported:
connectToMongo (callback)
getDb (dbName)
connectToMongo(callback)
Establishes the initial connection to the mongodb process. The connection should be maintained until the main program (e.g., app.js/server.js) is closed
Has to be called before any other operations on the database.
getDb(dbName)
Returns an instance of the database with the specified name. 
```

```text
Side: Environment Variables
For best practices: config values, credentials, and sensitive information should be stored inside a .env file.
This .env file will then be loaded as environment variables which can then be accessed in NodeJS via:
process.env.<var_name>
In version control (e.g., git), ignore the .env file from your repository.
This is to prevent your credentials from being leaked to the internet!
```

## Syntax Breakdown
 Ensure correct syntax for MongoDB Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. In MongoDB, a "document" is functionally equivalent to which concept in a traditional Relational Database Management System (RDBMS)?
    - **A)** A Table
    - **B)** A Schema
    - **C)** A Tuple (Row)
    - **D)** A Column

2. Which of the following best describes the CommonJS syntax used by default in Node.js for importing modules?
    - **A)** `import <name> from <module_name>;`
    - **B)** `const <name> = require(<module_name>);`
    - **C)** `include <module_name> as <name>;`
    - **D)** `loadModule(<module_name>);`

3. Why is it considered a best practice to use `.env` files for configuration values and credentials?
    - **A)** Because `.env` files automatically compress data to save disk space.
    - **B)** Because they execute much faster than standard JavaScript files.
    - **C)** Because they allow sensitive information to be kept out of version control (like git) to prevent credentials from being leaked.
    - **D)** Because `.env` files are natively encrypted by the Node.js runtime environment.

### Answer Key & Explanations
1. **C)** In MongoDB, a collection holds different documents, where a document is equivalent to a tuple (row) in an RDBMS.
2. **B)** CommonJS is the Node.js default for imports and follows the syntax `const <name> = require(<module_name>);`.
3. **C)** Config values, credentials, and sensitive information are stored in `.env` files which are ignored from version control to prevent leaks.

## References & Navigation

- **Previous Topic:** [[RE Handlebars]]
- **Next Topic:** [[Mongoose]]
- **Related Notes:** [[Introduction to Databases]], [[Data Representation]]

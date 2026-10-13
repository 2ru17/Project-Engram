---
id: nodejs
type: note
course: CCAPDEV
topic: NodeJS
status: completed
---

# NodeJS

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[NodeJS]] #[[Code Snippets]] #[[M4]]

---

## Overview

> Extracted notes for NodeJS covering both theoretical and practical elements.

## Key Definitions
 For this lecture: NodeJS Features Creating a Server The Request object The Response object Status Codes URL routing
 Let’s do a quick review... on the last few things we have discussed
 What is NodeJS? NodeJS is an open-source JavaScript runtime environment JavaScript was originally meant to run only on browsers NodeJS allowed JavaScript to run outside of browsers No need to learn another programming language since it uses JavaScript everywhere
 Back to our current lecture... Let’s talk about NodeJS’ features
 Features of NodeJS So what can NodeJS even do? with NodeJS's HTTP API, we can... generate dynamic page content create, open, read, write, delete, and close server files collect form data add, delete, modify data in the database

## Code Implementation

```text
Creating a Server
To create a server, you need to include the http module
A common way to include modules is as follows:
const varName = require('modulename');
➥ varName
constant variable to hold your module
➥ modulename
the name of the module to include
```

```text
Creating a Server
To create a server, you need to include the http module
A common way to include modules is as follows:
const http = require(‘http');
➥ varName
constant variable to hold your module
➥ modulename
the name of the module to include
```

```text
Creating a Server
After including the http module, let’s use the http variable to create a server
http.createServer([requestListener]);
➥ .createServer()
method that return the http.Server object
➥ [requestListener]
listens to a port and executes a functioneach time a request is made to the server
```

```text
The Request Listener
The requestListener handles requests and responses from the client and back to the client respectively
function (req, res) { }
➥ req
represents an IncomingMessage object containing
details about the client request
➥ res
represents a ServerResponse object, responsible for
the response stream back to the client
```

```text
Creating a Server
To activate the server, we have to make it listen to a port.
This can be done using server.listen
server.listen([port], [host], [callback]);
➥ port
the port to bind the server into
➥ host
the IP address to bind the server
➥ callback
the function executed after the server has been
bounded
```

## Syntax Breakdown
 Ensure correct syntax for NodeJS Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Which Node.js module must be required to create a basic web server manually?
    - **A)** `express`
    - **B)** `fs`
    - **C)** `http`
    - **D)** `path`

2. What does the `req` parameter represent in the request listener function `function (req, res) { }`?
    - **A)** A ServerResponse object responsible for the stream back to the client.
    - **B)** An IncomingMessage object containing details about the client request.
    - **C)** A configuration file for the server's active port.
    - **D)** The HTTP status code of the incoming connection.

3. How do you make a Node.js HTTP server start accepting requests?
    - **A)** By invoking `server.start()`
    - **B)** By invoking `http.init()`
    - **C)** By invoking `server.listen([port])`
    - **D)** By invoking `req.accept()`

### Answer Key & Explanations
1. **C)** To create a server, you need to include the core `http` module using `require('http')`.
2. **B)** The `req` parameter represents an `IncomingMessage` object containing details about the client request.
3. **C)** To activate the server and make it accept requests, `server.listen([port])` must be called.

## References & Navigation

- **Previous Topic:** [[Client Server Architecture]]
- **Next Topic:** [[Express]]
- **Related Notes:** [[Client Server Architecture]]

---
id: express
type: note
course: CCAPDEV
topic: Express
status: completed
---

# Express

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Express]] #[[Code Snippets]] #[[M4]]

---

## Overview

> Extracted notes for Express covering both theoretical and practical elements.

## Key Definitions
 What is Express? Express is a light-weight NodeJS framework that provides robust features for web and mobile applications
 Installing Express Search for Express in the npm repository and follow the installation instructions From a terminal, navigate to your project directory Generate a package.json file through npm init Run the command npm install express or npm i express This will install express to that specific project.
 Creating an Express App Create your first Express App Create a project folder Generate a package.json file Install Express Create an app.js file Require express inside app.js Create an instance of an Express app
 Creating a Server Use your Express app instance to listen for requests app.listen([port]) ➥ app variable containing your express app instance ➥ .listen listen to requests, just like server.listen() ➥ port the port number you wish to listen to
 Creating a Server Use your Express app instance to listen for requests app.listen(3000) ➥ app variable containing your express app instance ➥ .listen listen to requests, just like server.listen() ➥ port the port number you wish to listen to We are now currently listening to requests in port 3000

## Code Implementation

```text
The Request Listener
Use app.get() to listen to GET requests (more on GET & POST requests next meeting). 
Let’s write a GET request listener:
app.get([url], [callback]);
➥ .get
specifies that we are listening to GET requests
➥ url
the value of the request URL
➥ callback
the function performed when a GET request for a
certain URL is made
```

```text
The Request Listener
Use app.get() to listen to GET requests (more on GET & POST requests next meeting). 
Let’s write a GET request listener:
app.get(‘/home’, function(req, res){ });
➥ .get
specifies that we are listening to GET requests
➥ url
the value of the request URL
➥ callback
the function performed when a GET request for a
certain URL is made
```

```text
URL Routing
Let’s handle requests to our web application
app.get(‘/’, function(req, res){ });
Same as before, use the res object to reply to the request
res.write() and res.end()
or use express’ new method:
res.send()
For new response methods provided by express:
https://expressjs.com/en/guide/routing.html#response-methods
```

```text
Route Paths
app.get([path], function (req, res) { ... });
The route path can be strings, string patterns, and even regular expressions
```

```text
Route Paths
app.get(`/`, function (req, res) { ... });
This route path will match requests to the root route, /.
```

## Syntax Breakdown
 Ensure correct syntax for Express Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. What is Express?
    - **A)** A built-in database management system for Node.js.
    - **B)** A heavyweight front-end CSS framework.
    - **C)** A light-weight NodeJS framework that provides robust features for web and mobile applications.
    - **D)** A command-line tool used exclusively to generate package.json files.

2. When defining a route in Express, what does the `req` parameter in the callback function represent?
    - **A)** The response that will be sent back to the client.
    - **B)** The request object containing information about the incoming HTTP request.
    - **C)** The template engine configuration.
    - **D)** The URL route path string.

3. Which method is used to bind and listen for connections on a specified host and port in an Express application?
    - **A)** `app.listen()`
    - **B)** `app.get()`
    - **C)** `app.init()`
    - **D)** `app.bind()`

### Answer Key & Explanations
1. **C)** Express is a light-weight NodeJS framework that provides robust features for web and mobile applications.
2. **B)** The `req` parameter represents the request object, which contains information about the HTTP request.
3. **A)** The `app.listen([port])` method is used to start a UNIX socket and listen for connections on the given path/port.

## References & Navigation

- **Previous Topic:** [[NodeJS]]
- **Next Topic:** [[REST]]
- **Related Notes:** [[Client Server Architecture]]

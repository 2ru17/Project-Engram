---
id: handlebars
type: note
course: CCAPDEV
topic: Handlebars
status: completed
---

# Handlebars

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Handlebars]] #[[Code Snippets]] #[[M4]]

---

## Overview

> Extracted notes for Handlebars covering both theoretical and practical elements.

## Key Definitions
 What is Handlebars? Handlebars is a templating language It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular HTML with embedded Handlebars expressions
 What is Handlebars? In express, it is possible to integrate a template engine. A template engine improves on static template files by allowing the use of variables in the HTML documents, which could then be replaced on runtime. For this session, we are going to discuss express-handlebars, a template engine that utilizes the handlebars templating language.
 Installing Handlebars Setup: Create package.json Navigate to your project folder with a terminal npm init Install express npm i express Install Handlebars npm i express-handlebars
 Project Hierarchy ProjectFolder ├─ views │  ├─ layouts │  └─ partials ├─ public ├─ node_modules ├─ app.js └─ package.json
 Project Hierarchy Place all views (.hbs files) in the views folder Views will contain the main ‘content’ of a page. Typically populates the body element of the HTML document. Place all CSS, JavaScript, image files, and other “local” media in the public folder This will be the folder for our static files Static files are files that clients download from the server

## Code Implementation

```text
What is Handlebars?
Handlebars provides a way to integrate variables into an HTML document.
It makes use of double (sometimes triple) curly braces to integrate handlebars templating functionality into standard HTML syntax
Handlebars files are template files that will be compiled into a standard HTML document on runtime.
```

```text
Implementing Handlebars
Let’s set-up our app.js file to handle Handlebars
Require Express
Add in: const express = require(“express”);
Require Handlebars
Add in: const exphbs = require(“express-handlebars”);
```

```text
Implementing Handlebars
Create a main.hbs file in your layouts folder
main.hbs serves as the default layout which will contain your views
you do not have to specify main.hbs when rendering views. It is used as the container by default
views will be rendered inside {{{body}}}
<views_folder>/layouts/main.hbs is the default directory for the default layout
The views_folder can be set with app.set(“views”, <path>)
```

```text
Implementing Handlebars
The layouts directory can be changed in as part of the configuration of exphbs.engine.
e.g., exphbs.engine({layoutsDir: <path>})
The default layout filename can also be changed in the config through the defaultLayout property
```

```text
Implementing Handlebars
Create an index.hbs file in your views folder
index.hbs will serve as your landing page for this example.
views will be rendered inside main.hbs’ {{{body}}}
```

## Syntax Breakdown
 Ensure correct syntax for Handlebars Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. What is Handlebars primarily used for in an Express application?
    - **A)** Handling database migrations and queries.
    - **B)** Managing the server's local file system and static assets.
    - **C)** Compiling template files with an input object to generate HTML or other text formats dynamically.
    - **D)** Routing HTTP requests to different controllers.

2. In an Express-Handlebars project structure, where are static files (like CSS, JavaScript, and images) typically stored?
    - **A)** In the `views` folder.
    - **B)** In the `layouts` folder.
    - **C)** In the `public` folder.
    - **D)** In the `node_modules` folder.

3. What is the purpose of the `main.hbs` file?
    - **A)** It acts as the primary JavaScript entry point for the backend server.
    - **B)** It serves as the default layout container where other views are rendered inside `{{{body}}}`.
    - **C)** It stores all CSS styling for the application.
    - **D)** It handles all client-side JavaScript interactions.

### Answer Key & Explanations
1. **C)** Handlebars is a templating language that uses a template and an input object to generate HTML documents on runtime.
2. **C)** The `public` folder is designated for static files like CSS, JS, images, and other local media that clients download from the server.
3. **B)** `main.hbs` serves as the default layout template, providing the standard HTML skeleton where specific view content is injected via `{{{body}}}`.

## References & Navigation

- **Previous Topic:** [[REST]]
- **Next Topic:** [[RE Handlebars]]
- **Related Notes:** [[Client Server Architecture]]

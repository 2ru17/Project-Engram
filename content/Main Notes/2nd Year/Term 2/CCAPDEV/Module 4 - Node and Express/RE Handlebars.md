---
id: re_handlebars
type: note
course: CCAPDEV
topic: RE_Handlebars
status: completed
---

# RE_Handlebars

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[RE Handlebars]] #[[Code Snippets]] #[[M4]]

---

## Overview

> Extracted notes for RE_Handlebars covering both theoretical and practical elements.

## Key Definitions
 Expressions HTML Escaping If Statements Loops Helpers Partials For Today
 Remember to properly set-up your project to use Handlebars Require “express” and “express-handlebars” Set the link to your public folder Set your Express app’s view engine to hbs The sample app.js starting code set-up and the proper project hierarchy is shown in the next set of slides This lecture will focus on Handlebars code samples. For each sample, assume that index.hbs is the main content rendered into main.hbs (this is also shown in the next set of slides) A Few Reminders Before We Proceed
 ├── views │	├── layouts │	│	└── main.hbs │	├── partials │	│	├── header.hbs │	│	└── footer.hbs │	└── index.hbs ├── public ├── node_modules ├── app.js ├── package-lock.json └── package.json ★ Project Folder
 ├── views │	├── layouts │	│	└── main.hbs │	├── partials │	│	├── header.hbs │	│	└── footer.hbs │	└── index.hbs ├── public ├── node_modules ├── app.js ├── package-lock.json └── package.json ★ Project Folder Highlighted text are folders
 ├── views │	├── layouts │	│	└── main.hbs │	├── partials │	│	├── header.hbs │	│	└── footer.hbs │	└── index.hbs ├── public ├── node_modules ├── app.js ├── package-lock.json └── package.json ★ Project Folder Mind the file extensions

## Code Implementation

```text
Important functions to improve your page templates 
.RE:Handlebars.
```

```text
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
app.use(express.static(__dirname + "/public")); 
app.set("view engine", "hbs");
app.engine("hbs", exphbs({extname: "hbs"}));
// Server.listen() and routing methods omitted
★
★ Text Editor
app.js 
```

```text
// Previous HTML tags are omitted
// Assume all proper imports are included
<div id="page">
	{{> header }}
	{{{ body }}}
	{{> footer }}
</div>
★
★ Text Editor
main.hbs 
```

```text
Code Samples | Expressions
Handlebars Expressions are the basic unit of a Handlebars template
You can use them alone, in a {{mustache}}, pass them to a Handlebars helper, or use them as values in hash arguments
```

```text
Code Samples | Expressions
Handlebars expressions are some content(s) enclosed by double curly braces {{}}
The template in the next set of slides include firstname, which is a variable enclosed by double curly braces. This means that it is an expression
```

## Syntax Breakdown
 Ensure correct syntax for RE_Handlebars Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. In Handlebars, what syntax is used to denote a basic expression that will be replaced by a variable's value?
    - **A)** `[[ variable ]]`
    - **B)** `{{ variable }}`
    - **C)** `<%= variable %>`
    - **D)** `${ variable }`

2. When setting up an Express application to use Handlebars, what does `app.set("view engine", "hbs");` accomplish?
    - **A)** It tells the browser to interpret all JavaScript as Handlebars syntax.
    - **B)** It configures Express to use Handlebars (`hbs`) as the default template engine for rendering views.
    - **C)** It compiles all static assets into a single Handlebars file.
    - **D)** It establishes a database connection for storing Handlebars partials.

3. In a typical Handlebars project structure (e.g., `main.hbs`), what is the purpose of `{{{ body }}}`?
    - **A)** It automatically includes the `footer.hbs` partial.
    - **B)** It renders the raw HTML content of the specific view being requested into the default layout container.
    - **C)** It escapes all HTML characters to prevent cross-site scripting attacks.
    - **D)** It links the external CSS files from the public folder.

### Answer Key & Explanations
1. **B)** Handlebars expressions are content(s) enclosed by double curly braces `{{}}`.
2. **B)** `app.set("view engine", "hbs");` is the Express configuration line that sets `hbs` as the template engine.
3. **B)** The `{{{ body }}}` expression is used inside a layout (like `main.hbs`) as a placeholder where the specific view's content will be rendered.

## References & Navigation

- **Previous Topic:** [[Handlebars]]
- **Next Topic:** [[MongoDB]]
- **Related Notes:** [[Client Server Architecture]]

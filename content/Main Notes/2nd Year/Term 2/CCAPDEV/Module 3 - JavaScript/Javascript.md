---
id: javascript
type: note
course: CCAPDEV
topic: Javascript
status: completed
---

# Javascript

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Javascript]] #[[Code Snippets]] #[[M3]]

---

## Overview

> Extracted notes for Javascript covering both theoretical and practical elements.

## Key Definitions
 JavaScript Programming language that is used for web development Designed to add interactivity to HTML pages is multi-paradigm, as it supports object-oriented, imperative, and declarative styles. 
 JavaScript Accept Input Text fields, checkboxes, buttons, etc. Process Data Make decisions, manipulate variables Modify Pages on the Fly Change text, replace mages, special effects Manipulate Windows Open windows, write to them, close them
 External JS Best used to control multiple web pages. type – specifies the media type of the linked document (common values include text/css and text/javascript

## Code Implementation

```text
JavaScript
Attaching JavaScript to your webpage
External – Separate file
Internal – Embedded in <head> and/or in <body>
Inline – Placed inside HTML element tags as attributes
```

```text
JavaScript
Scripts in the <head> section will be processed first before the page loads
Scripts in the <body> section will execute when the page loads
You can place an unlimited number of scripts in your document, so you can have scripts in both the <head> and the <body> section
Scripts you want to be called later should be in a function
```

```text
External JS
A separate .js file connected using a <script> element inside the <head> and/or <body> element of the HTML.
<head>
	<title> Sample Title </title>
	<script src=“external.js”></script>
</head>
```

```text
External JS
A separate .js file connected using a <script> element inside the <head> and/or <body> element of the HTML.
<body>
	<script src=“external.js”></script>
</body>
```

```text
External JS
Best used to control multiple web pages.
<script src=“external.js”></script>
src – specifies the URI of an external script file
```

## Syntax Breakdown
 Ensure correct syntax for Javascript Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Where should scripts be placed if you want them to be processed *before* the page loads?
    - **A)** In the `<body>` section.
    - **B)** In the `<head>` section.
    - **C)** At the very bottom of the HTML document.
    - **D)** Inside an inline CSS `<style>` block.

2. Which of the following is an advantage of using an External JavaScript file over inline scripts?
    - **A)** It restricts the JavaScript from running on mobile devices.
    - **B)** It is best used to control multiple web pages efficiently.
    - **C)** It automatically transpiles older JavaScript into modern syntax.
    - **D)** It forces the HTML document to render instantly without styling.

3. Which HTML attribute is used within a `<script>` tag to specify the URI of an external script file?
    - **A)** `href`
    - **B)** `link`
    - **C)** `type`
    - **D)** `src`

### Answer Key & Explanations
1. **B)** Scripts in the `<head>` section are processed first before the page loads.
2. **B)** External JS is best used to control multiple web pages, as you can link the same `.js` file across them.
3. **D)** The `src` attribute specifies the URI of an external script file, e.g., `<script src="external.js"></script>`.

## References & Navigation

- **Previous Topic:** [[Specificity-Properties-and-Others]]
- **Next Topic:** [[JavaScript Basic Syntax]]
- **Related Notes:** [[Overview of Programming Languages]]

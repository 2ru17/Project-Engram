---
id: javascript_dom
type: note
course: CCAPDEV
topic: JavaScript DOM
status: completed
---

# JavaScript DOM

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Web Development]] #[[CCAPDEV]] #[[JavaScript DOM]] #[[Code Snippets]] #[[M3]]

---

## Overview

> Extracted notes for JavaScript DOM covering both theoretical and practical elements.

## Key Definitions
 Document Object Model Allows programs and scripts to dynamically access and update the content, structure, and style of a document. Can change all HTML elements Can change all HTML attributes Can change all CSS styles The HTML DOM API essentially provides write access to the HTML document through JavaScript
 Document Object Model HTML DOM is a standard object model and programming interface for HTML. Figure 1. An HTML document in DOM format
 DOM Methods Finding HTML elements: document.getElementById(id) document.getElementsByTagName(name) document.getElementsByClassName(class)
 After getting references to the elements... You can change the following: Content Attributes Styles
 DOM Nodes https://developer.mozilla.org/en-US/docs/Web/API/Node

## Code Implementation

```text
Get Element By ID
The easiest way to find an HTML element in the DOM is by using the element id
<p id=“txt1”> Text 1 </p>
<p id=“txt2”> Text 2 </p>
document.getElementById(“txt1”).innerHTML=“Hi!”;
```

```text
Get Elements By TAG
This will return an array of objects of a specific <tag>
<p id=“intro”> Hello world! </p>
<p> Hello universe! </p>
<p class=“comment”> New comment </p>
document.getElementsByTagname(“p”);
```

```text
Get Elements By CLASS
This will return an array of objects of a specific class name.
<p class=“txt”> Text 1 </p>
<p> Hello universe! </p>
<p class=“txt”> Text 2 </p>
var txtElements = document.getElementsByClassName(“txt”);
```

```text
Changing Content
HTML
<p id=“p1”> Hello World </p>
JS
document.getElementById(“p1”).innerHTML = “New Text!”;
https://developer.mozilla.org/en-US/docs/Web/API/Element
```

```text
Changing Content
HTML
<p id=“p1”> Hello World </p>
JS
var x = document.getElementById(“p1”);
x.innerHTML = “New Text!”;
https://developer.mozilla.org/en-US/docs/Web/API/Element
```

## Syntax Breakdown
 Ensure correct syntax for JavaScript DOM Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. What does the HTML Document Object Model (DOM) primarily allow scripts to do?
    - **A)** Connect directly to backend SQL databases.
    - **B)** Dynamically access and update the content, structure, and style of an HTML document.
    - **C)** Compile JavaScript code into machine language for faster execution.
    - **D)** Manage routing for single-page applications automatically.

2. Which DOM method is used to return an array of objects based on a specific HTML tag, such as `<p>`?
    - **A)** `document.getElementById()`
    - **B)** `document.getElementsByClassName()`
    - **C)** `document.querySelector()`
    - **D)** `document.getElementsByTagName()`

3. How would you change the textual content of an HTML element with the id "p1" using JavaScript?
    - **A)** `document.getElementById("p1").text = "New Text!";`
    - **B)** `document.getElementById("p1").content = "New Text!";`
    - **C)** `document.getElementById("p1").innerHTML = "New Text!";`
    - **D)** `document.getElementById("p1").value = "New Text!";`

### Answer Key & Explanations

1. **B**. The DOM allows programs and scripts to dynamically access and update the content, structure, and style of a document.
2. **D**. `document.getElementsByTagName(name)` returns an array of objects of a specific tag.
3. **C**. The property `.innerHTML` is used to change the content of an HTML element retrieved via its ID.

## References & Navigation

- **Previous Topic:** [[JavaScript Basic Syntax]]
- **Next Topic:** [[JQuery]]
- **Related Notes:** [[Overview of Programming Languages]]

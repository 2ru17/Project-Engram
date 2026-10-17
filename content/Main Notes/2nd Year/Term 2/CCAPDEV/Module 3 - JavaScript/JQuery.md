---
id: jquery
type: note
course: CCAPDEV
topic: JQuery
status: completed
---

# JQuery

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[JQuery]] #[[Code Snippets]] #[[M3]]

---

## Overview

> Extracted notes for JQuery covering both theoretical and practical elements.

## Key Definitions
 JQuery Lightweight but feature-rich JavaScript library Designed to simplify HTML DOM manipulation Accessing an element can be done through CSS Selector rules Provides an easier way to attach callbacks/event handlers “Write Less, Do More”
 JavaScript vs JQuery Setting Text Content document.getElementById(“p1”).innerText = “Hello World”; vs $(“#p1”).text(“Hello World!”);
 Further Reading Bubbling vs Capturing (Events Order) https://www.w3.org/TR/DOM-Level-3-Events/#event-flow https://www.quirksmode.org/js/events_order.html#link4 Event interface https://developer.mozilla.org/en-US/docs/Web/API/Event Event Creation https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events

## Code Implementation

```text
Adding JQuery
Import via CDN (Content-Delivery Network)
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
or, import locally:
Download from https://code.jquery.com/jquery-3.6.0.min.js, then:
<script src=“[filepath]"></script>
```

```text
Adding JQuery
<script>
$(document).ready(function(){
// your code here
});
</script>
$(document).ready ... is used to prevent jQuery code from running before the document is ready.
```

```text
JavaScript vs JQuery
Finding HTML Element by Id
var x = document.getElementById(“menu”);
vs
var x = $(“#menu”);
```

```text
JavaScript vs JQuery
Finding HTML Elements by Tag Name
var x = document.getElementsByTagName(“p”);
vs
var x = $(“p”);
```

```text
JavaScript vs JQuery
Finding HTML Elements by Class Name
var x = document.getElementsByClassName(“post”);
vs
var x = $(“.post”);
```

## Syntax Breakdown
 Ensure correct syntax for JQuery Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. What is the primary purpose of the `$(document).ready(function(){...});` syntax in jQuery?
- **A)** To force the browser to reload the page before executing any scripts.
- **B)** To prevent jQuery code from running before the HTML document is fully loaded and ready.
- **C)** To convert all standard JavaScript functions into jQuery functions automatically.
- **D)** To ensure that external stylesheets are loaded before the DOM elements.

2. How do you select an HTML element with the id "menu" using jQuery?
- **A)** `$(".menu")`
- **B)** `$("menu")`
- **C)** `$("#menu")`
- **D)** `getElement("#menu")`

3. Which of the following best describes jQuery compared to vanilla JavaScript?
- **A)** A heavier, more complex framework that replaces JavaScript entirely.
- **B)** A lightweight, feature-rich library designed to simplify HTML DOM manipulation.
- **C)** A backend-only language used for database queries.
- **D)** A CSS preprocessor used to simplify styling rules.

### Answer Key & Explanations
1. **B)** `$(document).ready` is used to prevent jQuery code from running before the document is ready.
2. **C)** The syntax `$("#menu")` is the jQuery equivalent of `document.getElementById("menu")`.
3. **B)** jQuery is a lightweight but feature-rich JavaScript library designed to simplify HTML DOM manipulation.

## References & Navigation

- **Previous Topic:** [[JavaScript DOM]]
- **Next Topic:** [[JSON and Fetch]]
- **Related Notes:** [[Client Server Architecture]]

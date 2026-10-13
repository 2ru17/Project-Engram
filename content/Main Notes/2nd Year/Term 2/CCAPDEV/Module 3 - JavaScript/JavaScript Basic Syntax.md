---
id: javascript_basic_syntax
type: note
course: CCAPDEV
topic: JavaScript Basic Syntax
status: completed
---

# JavaScript Basic Syntax

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[JavaScript Basic Syntax]] #[[Code Snippets]] #[[M3]]

---

## Overview

> Extracted notes for JavaScript Basic Syntax covering both theoretical and practical elements.

## Key Definitions
 Data Types JavaScript supports the following primitive data types: Numbers – such as 125, 12.9, etc. Strings – text such as “Hello World” Boolean – true or false
 Variables JavaScript is an untyped language – a variable can be of any data type. The data type of a variable can change based on the data type of the value assigned to it.

## Code Implementation

```text
Variables
<script>
	var id;
	var name;
</script>
```

```text
Variables
<script>
	var id, name;
</script>
```

```text
Variables
<script>
	var id = 113;
	var name;
	name = “Ned”
</script>
```

```text
Variables
Global Scope – variables defined anywhere in the JavaScript code. These variables are accessible to all functions that have no duplicate identifier names.
Function Scope – variables declared within a function. These variables are only visible within its function.
Block Scope – variables declared within a block (i.e., { }). These variables are only visible within its block. New feature as of ES6 (2015) & onwards. 
```

```text
Variables... example
<script>
	var myVar = "global"; // global scope
	function sample() {
		var myVar = "func"; //function scope
		document.write(myVar);
		if (myVar == "func")
		{
			let myVar = "block"; // block scope
			document.write("block" + myVar);
			var myVar2 = "func"; // STILL function scope		}
	}
</script>
```

## Syntax Breakdown
 Ensure correct syntax for JavaScript Basic Syntax Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Which of the following variable scopes was introduced in ES6 (2015) and is limited to variables declared within `{ }`?
    - **A)** Global Scope
    - **B)** Function Scope
    - **C)** Block Scope
    - **D)** Lexical Scope

2. Because JavaScript is an untyped language, which of the following statements is true?
    - **A)** Variables can only be assigned string values upon initialization.
    - **B)** The data type of a variable can change based on the value assigned to it.
    - **C)** You must explicitly declare the data type of a variable before using it.
    - **D)** Variables cannot hold boolean values.

3. Which of the following correctly describes "Function Scope" in JavaScript?
    - **A)** Variables declared within a function are only visible within that function.
    - **B)** Variables declared within a function are accessible globally anywhere in the script.
    - **C)** Variables are limited to the nearest enclosing loop or conditional block.
    - **D)** It allows functions to automatically hoist all global variables.

### Answer Key & Explanations
1. **C)** Block Scope applies to variables declared within a block (i.e., `{ }`) and is a feature introduced in ES6.
2. **B)** JavaScript is an untyped language, meaning a variable can be of any data type, and its type can change dynamically.
3. **A)** Function Scope means variables declared within a function are only visible within its function.

## References & Navigation

- **Previous Topic:** [[Javascript]]
- **Next Topic:** [[JavaScript DOM]]
- **Related Notes:** [[Overview of Programming Languages]]

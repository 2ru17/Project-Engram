---
id: json_and_fetch
type: note
course: CCAPDEV
topic: JSON and Fetch
status: completed
---

# JSON and Fetch

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[JSON and Fetch]] #[[Code Snippets]] #[[M3]]

---

## Overview

> Extracted notes for JSON and Fetch covering both theoretical and practical elements.

## Key Definitions
 JSON ‹#›
 JSON JSON stands for JavaScript Object Notation. It is a lightweight format for storing and transporting data. ‹#›
 JSON Syntax Rules JSON syntax follows the JavaScript object notation syntax: Pairs of name and value represents data Data is separated by commas Objects are enclosed in curly braces Arrays are enclosed in square brackets. ‹#›
 JSON Syntax Rules JSON Data Consists of a field name (in double quotes), followed by a colon and the corresponding value of the field name. “name”: “Ned” ‹#›
 JSON Data Types Values must be of the following data types: String Number JSON object Array Boolean null ‹#›

## Code Implementation

```text
Forms in JS
There are several ways to work with forms in JS
We can:
Get each input element and get their values through .value
or use document.forms.<form’s name/id> and the FormData interface
‹#›
```

```text
Forms in JS
HTML
<form id="myform">
	<input type="text" name="name" id="name"> 	
	<br>
	<input type="number" name="number" id="number"> 
	<br>
	<input type="button" name="submit" id="submit" value="SUBMIT">
</form>
‹#›
```

```text
Forms in JS
Get each input element and get their values through .value
let formInputs = $("#myform input");
for (let input of formInputs) {
	console.log(input.name + ": " + input.value);
}
‹#›
```

```text
Forms in JS
document.forms.<form’s name/id> 
let formElement = document.forms.myform;
let formData = new FormData(formElement);
for (let data of formData) {
	console.log(data[0] + ": " + data[1]);
}
‹#›
https://developer.mozilla.org/en-US/docs/Web/API/FormData
```

```text
JSON Data Types
JSON Strings
Strings in JSON must be written in double quotes
{
	“school”: “the university”
}
‹#›
```

## Syntax Breakdown
 Ensure correct syntax for JSON and Fetch Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Which of the following is NOT a valid JSON data type?
- **A)** Boolean
- **B)** Number
- **C)** Undefined
- **D)** Array

2. In JSON syntax, how must string values be formatted?
- **A)** They must be enclosed in double quotes.
- **B)** They must be enclosed in single quotes.
- **C)** They can be enclosed in either single or double quotes.
- **D)** They do not require any quotes.

3. When working with forms in JavaScript, what is the purpose of the `FormData` interface?
- **A)** To style the form elements using CSS dynamically.
- **B)** To easily retrieve and structure the data from a form element for processing.
- **C)** To permanently save form inputs to the user's local file system.
- **D)** To prevent users from submitting empty forms.

### Answer Key & Explanations
1. **C)** Valid JSON data types include String, Number, JSON object, Array, Boolean, and null. "Undefined" is a JavaScript type but not a valid JSON type.
2. **A)** Strings in JSON must be written in double quotes.
3. **B)** The `FormData` interface allows you to easily get data from a form, structured as key-value pairs, by passing `document.forms.myform` to it.

## References & Navigation

- **Previous Topic:** [[JQuery]]
- **Next Topic:** [[Client Server Architecture]]
- **Related Notes:** [[Client Server Architecture]]

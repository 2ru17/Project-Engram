---
id: html
type: note
course: CCAPDEV
topic: "HTML"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCAPDEV]] #[[Conceptual]] #[[HTML]]

---

## Overview
HTML (Hypertext Markup Language) serves as the foundational building block of the Web. It defines the meaning and structure of web content. Unlike programming languages that contain logic and execute instructions, HTML is a markup language used to annotate documents for presentation. This annotation is done using tags that define various elements in the document based on their purpose or importance, which browsers then interpret to display web pages correctly. 

## Key Definitions
- **HTML (Hypertext Markup Language):** The standard markup language used to create and structure web pages.
- **Markup Language:** A system for annotating a document in a way that is syntactically distinguishable from the text, primarily focusing on structure and presentation rather than logic.
- **Programming Language:** A formalized set of instructions used to produce various kinds of output, primarily involving logic execution (e.g., C, Java, Python).
- **Tags:** Specific keywords surrounded by angle brackets (e.g., `<html>`) used to create elements in a markup language.

## Theoretical Framework / Core Concepts

### Markup vs. Programming Languages
Understanding the distinction between markup and programming languages is crucial for web development:
- **Markup Languages:** Focus on the presentation and structuring of documents. They are interpreted directly by the web browser. Examples include HTML, XML, XHTML, and CityGML.
- **Programming Languages:** Focus on logical operations and instructions. These must be either compiled by a compiler or interpreted by an interpreter before execution. Examples include Java, C++, and Python.

### Basic HTML Structure
Every HTML document follows a fundamental structure to ensure proper interpretation by the web browser.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

#### Core Components:
- `<!DOCTYPE html>`: The document type declaration that informs the browser this is an HTML5 document.
- `<html>`: The root element of an HTML page that encapsulates all content.
- `<head>`: Contains metadata about the document, such as the title and links to stylesheets.
- `<body>`: Contains the visible page content, like headings, paragraphs, and images.

## Worked Examples / Protocol Walkthroughs / Calculations

### Example: Virtual Keyboards and User Experience
In modern web development, particularly for mobile devices, maximizing available functions enhances user experience. For instance, using specific HTML input types triggers the appropriate virtual keyboard.

```html
<!-- Triggers standard text keyboard -->
<input type="text" name="username">

<!-- Triggers numeric keypad on mobile devices -->
<input type="number" name="age">

<!-- Triggers email keyboard (with '@' symbol) -->
<input type="email" name="user_email">
```
*By simply changing the `type` attribute, developers can significantly improve the ease of data entry on mobile platforms without complex logic.*

## Summary & Key Takeaways
- HTML is the standard markup language for creating web pages, focusing on document structure rather than logic.
- Markup languages differ fundamentally from programming languages; the former annotates for presentation, while the latter executes logical instructions.
- A standard HTML document starts with the `<!DOCTYPE html>` declaration and is structured with a root `<html>` element.
- Proper use of HTML tags and attributes (like input types) directly impacts and enhances user experience, especially on mobile devices.

## Multiple Choice Questions

1. What does HTML stand for?
    - **A)** Hypertext Markup Language
    - **B)** Hypertext Machine Language
    - **C)** Hyperlink and Text Markup Language
    - **D)** Home Tool Markup Language

2. Which of the following is considered a markup language?
    - **A)** Java
    - **B)** Python
    - **C)** XML
    - **D)** C++

3. What is the primary purpose of a markup language like HTML?
    - **A)** To execute logical calculations
    - **B)** To annotate documents for presentation and structure
    - **C)** To compile source code into machine language
    - **D)** To manage database connections

4. Which HTML tag represents the root element of an HTML page?
    - **A)** `<head>`
    - **B)** `<body>`
    - **C)** `<html>`
    - **D)** `<!DOCTYPE html>`

5. What is the function of the `<!DOCTYPE html>` declaration?
    - **A)** It links the HTML document to a CSS stylesheet.
    - **B)** It specifies that the document is to be read as an HTML5 document.
    - **C)** It executes JavaScript code.
    - **D)** It acts as the main container for visible page content.

6. How does a markup language differ from a programming language?
    - **A)** Markup languages are compiled, while programming languages are interpreted.
    - **B)** Markup languages contain logical instructions, while programming languages do not.
    - **C)** Markup languages focus on document presentation and structure, while programming languages execute logical operations.
    - **D)** There is no difference between the two.

7. Which element is used to define the metadata and title of the HTML document?
    - **A)** `<body>`
    - **B)** `<footer>`
    - **C)** `<head>`
    - **D)** `<h1>`

8. Why is setting the correct input type (e.g., `type="email"`) important in HTML?
    - **A)** It changes the color of the text field.
    - **B)** It allows the server to compile the code faster.
    - **C)** It triggers the appropriate virtual keyboard on mobile devices, enhancing user experience.
    - **D)** It prevents hackers from accessing the form.

9. Which of the following is an example of a programming language mentioned in the text?
    - **A)** XML
    - **B)** CityGML
    - **C)** XHTML
    - **D)** C++

10. Who interprets an HTML document to display the web page?
    - **A)** A compiler
    - **B)** The web browser
    - **C)** A database server
    - **D)** The operating system's kernel

### Answer Key & Explanations

1. **A**. HTML stands for Hypertext Markup Language, the standard for creating web pages.
2. **C**. XML is a markup language, whereas Java, Python, and C++ are programming languages.
3. **B**. Markup languages are designed to annotate text to describe its structure and presentation.
4. **C**. The `<html>` tag encapsulates all the content on the page and serves as the root element.
5. **B**. The document type declaration tells the browser the specific version of HTML (typically HTML5) being used.
6. **C**. Markup languages structure content, while programming languages execute step-by-step logical instructions.
7. **C**. The `<head>` tag contains meta-information and links necessary for the document but not displayed directly in the content area.
8. **C**. On mobile devices, input types tell the browser which virtual keyboard layout (like adding an '@' sign for emails) to show.
9. **D**. C++ is a programming language used for logic execution, unlike the others which are markup languages.
10. **B**. Web browsers read HTML documents and interpret the tags to render the visible web page.

## References & Navigation

- **Next Topic:** [[CSS]]
- **Related Notes:** [[Client Server Architecture]]

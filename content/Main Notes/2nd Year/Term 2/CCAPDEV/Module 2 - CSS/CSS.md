---
id: css
type: note
course: CCAPDEV
topic: "CSS"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCAPDEV]] #[[Conceptual]] #[[CSS]]

---

## Overview
While HTML provides the structural foundation of a web page, CSS (Cascading Style Sheets) brings it to life through design and layout. CSS acts as a presentation language that allows developers to style documents independently of their HTML content. This separation of concerns means that the same HTML can be styled in vastly different ways, promoting cleaner code and greater design flexibility.

## Key Definitions
- **CSS (Cascading Style Sheet):** A styling language that dictates how HTML elements should be displayed on the screen, in print, or in other media.
- **Cascading:** The process of resolving conflicts when multiple styles apply to the same element. It uses inheritance, meaning properties applied to parent elements can cascade down to their children.
- **Style:** The specific design attributes—such as colors, margins, layouts, and fonts—applied to HTML elements.
- **Selector:** The HTML tag, class, or ID that the styling rules will be applied to.
- **Property:** The specific visual characteristic (e.g., `background-color`, `font-size`) that you want to change.
- **Value:** The setting assigned to a CSS property (e.g., `red`, `12px`).

## Theoretical Framework / Core Concepts

### Separation of Content and Presentation
The fundamental philosophy behind CSS is the separation of content (HTML) and presentation (CSS). A `.css` file is a simple text file that contains a set of rules. This separation allows multiple HTML pages to link to a single CSS file, avoiding repetitive styling declarations and making site-wide design updates significantly more efficient.

### The CSS Rule Structure
A CSS rule consists of a selector and a declaration block. The declaration block contains one or more declarations separated by semicolons. Each declaration includes a CSS property name and a value, separated by a colon.

```css
selector {
    property: value;
    property: value;
}
```
- **Selector:** Indicates which element(s) are being styled.
- **Declaration block (`{ ... }`):** Houses the style rules.
- **Property:** The attribute you are modifying.
- **Value:** The specific style assigned to the property.

## Worked Examples / Protocol Walkthroughs / Calculations

### Example: Styling Basic Elements
In this example, we style the `<body>` and an `<img>` tag to understand how multiple properties work together.

```css
/* Styling the body to have a specific background color */
body {
    background-color: #b7d1c4; /* Hex color code for a soft green */
}

/* Styling all image elements */
img {
    height: 170px;
    width: 170px;
    /* Adding a subtle drop shadow */
    box-shadow: rgba(0, 0, 0, 0.2) 10px 10px;
}
```

*Walkthrough:* 
1. The browser reads the `body` selector and changes the page's entire background color.
2. It then finds every `<img>` element on the page, constraining them to 170x170 pixels and applying a semi-transparent black shadow offset by 10 pixels on the X and Y axes.

## Summary & Key Takeaways
- CSS is essential for designing and styling HTML content.
- It separates presentation from structure, enabling cleaner and more maintainable codebases.
- The "Cascading" nature of CSS means styles follow a hierarchy and inherit properties from parent elements.
- Every CSS rule is made of a selector, property, and value, which together instruct the browser on how to render specific elements.

## Multiple Choice Questions

1. What does CSS stand for?
    - **A)** Creative Style System
    - **B)** Cascading Style Sheets
    - **C)** Computer Styling System
    - **D)** Colorful Style Sheets

2. What is the primary purpose of CSS?
    - **A)** To structure the database
    - **B)** To execute logical scripts on the web server
    - **C)** To style the visual presentation of HTML documents
    - **D)** To compile HTML code

3. What does the term "Cascading" refer to in CSS?
    - **A)** The speed at which styles are applied
    - **B)** The ability to create dropdown menus
    - **C)** The procedure that determines which style rules apply and how they inherit down to children
    - **D)** The process of linking multiple HTML files

4. In a CSS rule, what dictates which HTML element will be styled?
    - **A)** The Property
    - **B)** The Value
    - **C)** The Declaration block
    - **D)** The Selector

5. Which of the following is an example of a CSS property?
    - **A)** `body`
    - **B)** `background-color`
    - **C)** `#b7d1c4`
    - **D)** `<h1>`

6. Why is it beneficial that CSS is separate from HTML content?
    - **A)** It avoids repetitive style declarations and makes site-wide updates easier.
    - **B)** It makes the website load faster by compressing the HTML.
    - **C)** It encrypts the code to protect it from hackers.
    - **D)** It allows HTML to perform mathematical operations.

7. Which punctuation mark separates a CSS property from its value?
    - **A)** Semicolon (;)
    - **B)** Comma (,)
    - **C)** Colon (:)
    - **D)** Period (.)

8. In the rule `p { color: blue; }`, what is `blue`?
    - **A)** The Selector
    - **B)** The Property
    - **C)** The Value
    - **D)** The HTML tag

9. What does the CSS property `box-shadow` do?
    - **A)** Creates a physical box around the element
    - **B)** Adds a shadow effect around an element's frame
    - **C)** Darkens the entire background of the page
    - **D)** Hides the element in a shadow

10. What punctuation mark is used to separate multiple declarations within a CSS block?
    - **A)** Semicolon (;)
    - **B)** Colon (:)
    - **C)** Hyphen (-)
    - **D)** Forward slash (/)

### Answer Key & Explanations

1. **B**. CSS stands for Cascading Style Sheets.
2. **C**. CSS is specifically designed to handle the styling and presentation of documents created with HTML.
3. **C**. Cascading dictates the hierarchy of styles and how properties are inherited by child elements, preventing conflicts.
4. **D**. The selector points to the specific HTML tag, class, or ID that you want to apply the styles to.
5. **B**. `background-color` is a property that can be adjusted. `body` is a selector, and `#b7d1c4` is a value.
6. **A**. Separating styles into a distinct file allows developers to reuse code and easily update the look of an entire site from one place.
7. **C**. A colon separates the property name from the assigned value (e.g., `color: red`).
8. **C**. `blue` is the value being assigned to the `color` property for the `p` selector.
9. **B**. `box-shadow` is used to add shadow effects to elements, creating depth on the page.
10. **A**. Semicolons are used at the end of each declaration to separate it from the next one within the same block.

## References & Navigation

- **Previous Topic:** [[HTML]]
- **Next Topic:** [[CSS Selectors]]
- **Related Notes:** [[Client Server Architecture]]

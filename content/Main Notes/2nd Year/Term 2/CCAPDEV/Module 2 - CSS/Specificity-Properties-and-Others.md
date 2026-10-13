---
id: specificity-properties-and-others
type: note
course: CCAPDEV
topic: Specificity-Properties-and-Others
status: completed
---

# Specificity-Properties-and-Others

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Specificity-Properties-and-Others]] #[[Code Snippets]] #[[M2]]

---

## Overview

> Extracted notes for Specificity-Properties-and-Others covering both theoretical and practical elements.

## Key Definitions
 CSS Specificity order/hierarchy of CSS rules ‹#›
 Style Sheet Sources The cascade of the rules start from the farthest to the closest to the element. User-agent (browser) default style sheets External style sheets Internal/Embedded style sheets Inline style sheets ‹#› REVIEW – Style Sheet Sources
 CSS Selectors element .class #id Combinators Attribute Selectors Pseudo-classes & Pseudo-elements ‹#› REVIEW – CSS Selectors
 CSS Specificity The styling declared in CSS cascade depending on the source (where it was declared) and the selector used. Good reading: CSS Specificity Wars (Star Wars themed explanation) ‹#›
 Specificity Hierarchy Groups Inline styles. Anything placed in the style attribute of the element has precedence over anything. IDs. Unique identifier for an element (#div) Classes, attributes, and pseudo-classes. Includes .class, [attributes], :hover, :focus, etc. Elements (and pseudo-elements). For example :before, :after, :first-line ‹#›

## Code Implementation

```text
float
float (can be left/right/none/inherit)
Makes elements float to the right or left of the screen, positioned where they are in the HTML.
#box {   float: left;   margin-right: 10px; }
‹#›
```

```text
float
float (can be left/right/none/inherit)
‘Float’-ing an element essentially removes it from the normal flow of the layout, but other elements would still flow around it. 
#box {   float: left;   margin-right: 10px; }
‹#›
```

```text
clear
clear
Specifies whether it should be or not be rendered below a preceding floated element.
#box1 { float: left; }
#box2 { float: left; }
#box3 { clear: left; } /* also works for clear: both; */
‹#›
```

```text
border
border
Specifies the style, width, and color of an element’s border.
Also has a shorthand property, border
#box {
	border-width: 1px;
	border-style: dotted;
	border-color: red;
}
border-top, border-bottom, border-left, border-right can be used to style each border line manually.
‹#›
border documentation:https://developer.mozilla.org/en-US/docs/Web/CSS/border
```

```text
padding
padding
Generates space around an element’s content, inside of any defined borders.
#box {
	padding: 5px;
}
padding-top, padding-left, padding-right, padding-bottom can be used to adjust each padding manually.
‹#›
```

## Syntax Breakdown
 Ensure correct syntax for Specificity-Properties-and-Others Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. Which of the following defines the correct order of the CSS Specificity hierarchy from highest precedence to lowest?
    - **A)** Inline styles, IDs, Classes/Pseudo-classes, Elements
    - **B)** IDs, Inline styles, Elements, Classes/Pseudo-classes
    - **C)** Elements, Classes/Pseudo-classes, IDs, Inline styles
    - **D)** Inline styles, Classes/Pseudo-classes, IDs, Elements

2. What is the effect of setting the `float` property on an element in CSS?
    - **A)** It permanently fixes the element to the viewport, regardless of scrolling.
    - **B)** It removes the element from the normal layout flow, allowing other elements to flow around it.
    - **C)** It centers the element within its parent container.
    - **D)** It hides the element from the document flow completely.

3. Which property generates space around an element's content, *inside* of any defined borders?
    - **A)** `margin`
    - **B)** `clear`
    - **C)** `padding`
    - **D)** `float`

### Answer Key & Explanations
1. **A)** The specificity hierarchy places inline styles at the top, followed by IDs, then classes/attributes/pseudo-classes, and finally elements.
2. **B)** 'Float'-ing an element removes it from the normal flow of the layout, but other elements still flow around it.
3. **C)** The `padding` property generates space around an element’s content, inside of any defined borders, whereas margin is outside the border.

## References & Navigation

- **Previous Topic:** [[CSS Selectors]]
- **Next Topic:** [[Javascript]]
- **Related Notes:** [[Client Server Architecture]]

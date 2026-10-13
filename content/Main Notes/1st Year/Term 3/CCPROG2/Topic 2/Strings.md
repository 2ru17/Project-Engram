---
id: Topic-2--Strings
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Topic 2- Strings

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Types]] #[[Data Structures]] #[[Structured Data]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> In C, strings are null-terminated arrays of characters. There is no dedicated `string` type — strings are represented as `char` arrays ending with `'\0'`.

## Key Concepts
 A string is a `char` array terminated by `'\0'` String literals (e.g., `"Hello"`) are stored in read-only memory The `<string.h>` library provides essential string functions `scanf("%s", ...)` stops at whitespace; `fgets()` reads full lines

## Details / Theory

### String Declaration and Initialization

```c
char str1[6] = "Hello";                // Size 6: 'H','e','l','l','o','\0'
char str2[] = "Hello";                  // Compiler infers size = 6
char str3[6] = {'H','e','l','l','o','\0'};  // Character-by-character
char *str4 = "Hello";                   // Pointer to string literal (read-only)
```

### String Input/Output

```c
char name[50];

// scanf — stops at whitespace
scanf("%s", name);

// fgets — reads entire line (safer, includes newline)
fgets(name, sizeof(name), stdin);

// printf
printf("Name: %s\n", name);

// puts — prints string + newline
puts(name);
```

### Common `<string.h>` Functions

| Function                | Purpose                      | Example                   |
| ----------------------- | ---------------------------- | ------------------------- |
| `strlen(s)`             | Length (excluding `'\0'`)    | `strlen("Hi")` → 2        |
| `strcpy(dest, src)`     | Copy `src` to `dest`         | `strcpy(dest, "Hi")`      |
| `strncpy(dest, src, n)` | Copy at most `n` chars       | Safer than `strcpy`       |
| `strcat(dest, src)`     | Append `src` to `dest`       | `strcat(buf, " World")`   |
| `strncat(dest, src, n)` | Append at most `n` chars     | Safer than `strcat`       |
| `strcmp(a, b)`          | Compare: 0 if equal          | `strcmp("ab", "ab")` → 0  |
| `strncmp(a, b, n)`      | Compare first `n` chars      | Partial comparison        |
| `strchr(s, c)`          | Find first occurrence of `c` | Returns pointer or `NULL` |
| `strstr(s, sub)`        | Find substring               | Returns pointer or `NULL` |

### String Comparison

```c
char a[] = "apple";
char b[] = "banana";

if (strcmp(a, b) < 0)
    printf("%s comes before %s\n", a, b);
// Cannot use == to compare strings; that compares addresses
```

### String Manipulation Example

```c
#include <stdio.h>
#include <string.h>

int main() {
    char first[20] = "John";
    char last[20] = "Doe";
    char full[50];

    strcpy(full, first);   // full = "John"
    strcat(full, " ");     // full = "John "
    strcat(full, last);    // full = "John Doe"

    printf("Full name: %s (length: %lu)\n", full, strlen(full));
    return 0;
}
```

### Character Functions (`<ctype.h>`)

| Function     | Description         |
| ------------ | ------------------- |
| `isalpha(c)` | Is letter?          |
| `isdigit(c)` | Is digit?           |
| `isalnum(c)` | Is letter or digit? |
| `toupper(c)` | Uppercase version   |
| `tolower(c)` | Lowercase version   |
| `isspace(c)` | Is whitespace?      |

## Common Pitfalls
 Using `==` to compare strings instead of `strcmp()`. Buffer overflow: writing more characters than array size allows. Forgetting the null terminator when building strings manually. `scanf("%s", ...)` is unsafe — no bounds checking. Prefer `fgets()`. Modifying a string literal via pointer (`char *s = "abc"; s[0] = 'x';` → undefined behavior).

## Summary

> TL;DR — C strings are null-terminated `char` arrays. Use `<string.h>` functions (`strlen`, `strcpy`, `strcmp`, `strcat`) for manipulation. Always ensure buffers are large enough and terminated with `'\0'`. Never compare strings with `==`.

## Review Questions

_To be added._

## Links
 **Related:** [[What is an Array]] — [[Declaration]] — [[Accessing Elements]] — [[Structs]] — [[File Handling]] **Source / Reference:**

## Multiple Choice Questions

1. How are strings fundamentally represented in C?
    - **A)** As a dedicated `string` data type
    - **B)** As dynamically resizing arrays of integers
    - **C)** As null-terminated arrays of characters
    - **D)** As pointers to void

2. What happens when you initialize a string as `char str[] = "Hello";`?
    - **A)** The compiler infers a size of 5
    - **B)** The compiler infers a size of 6, including the null terminator
    - **C)** A compilation error occurs
    - **D)** The string is stored in a linked list

3. Which function from `<string.h>` is used to find the length of a string excluding the null terminator?
    - **A)** `strsize()`
    - **B)** `sizeof()`
    - **C)** `length()`
    - **D)** `strlen()`

4. Why is using `scanf("%s", name)` generally considered unsafe or problematic?
    - **A)** It crashes if the input is too short
    - **B)** It stops reading at whitespace and lacks bounds checking
    - **C)** It automatically adds multiple null terminators
    - **D)** It cannot read lowercase letters

5. Which function is recommended over `scanf` for reading full lines of string input safely?
    - **A)** `gets()`
    - **B)** `read()`
    - **C)** `fgets()`
    - **D)** `getchar()`

6. What is the correct way to compare two strings in C?
    - **A)** `string1 == string2`
    - **B)** `string1 = string2`
    - **C)** `compare(string1, string2)`
    - **D)** `strcmp(string1, string2)`

7. If `strcmp(a, b)` returns a value of 0, what does it mean?
    - **A)** String `a` is longer than string `b`
    - **B)** String `a` comes before string `b` alphabetically
    - **C)** The strings are identical
    - **D)** String `b` is empty

8. What is the primary difference between `strcpy` and `strncpy`?
    - **A)** `strncpy` copies at most `n` characters, providing a safeguard
    - **B)** `strcpy` only works on read-only memory
    - **C)** `strncpy` allocates memory dynamically
    - **D)** `strcpy` appends to the string instead of replacing

9. Which header file contains functions like `isalpha` and `isdigit` for character manipulation?
    - **A)** `<string.h>`
    - **B)** `<ctype.h>`
    - **C)** `<stdio.h>`
    - **D)** `<stdlib.h>`

10. What undefined behavior occurs if you attempt to modify a string literal like `char *s = "abc"; s[0] = 'x';`?
    - **A)** The program converts it to uppercase
    - **B)** The compiler fixes it automatically
    - **C)** It causes a segmentation fault because string literals are in read-only memory
    - **D)** The string expands dynamically

### Answer Key & Explanations
1. **C)** C does not feature an innate string object, utilizing character arrays terminating in `\0` instead.
2. **B)** The compiler calculates character length and auto-appends the required null character footprint.
3. **D)** `strlen()` iterates to measure characters right before reaching the null byte marker.
4. **B)** `scanf()` blindly pulls characters into buffers risking severe memory overwrites upon long entries.
5. **C)** `fgets()` limits reads strictly to buffer boundaries securing input against dangerous buffer overflows.
6. **D)** Evaluative comparisons in C involve utilizing library routines like `strcmp` which iterate through character blocks.
7. **C)** The function calculates the difference resulting in 0 specifically when sequences match identically.
8. **A)** Using the bounded copy prevents unintentional spillage overriding non-allocated adjoining block domains.
9. **B)** Standard character-level inspection and manipulation tools trace back directly to the `<ctype.h>` definition header.
10. **C)** Modifying immutable constant text memory sections generally invokes OS protection protocols triggering critical application faults.

## References & Navigation

- **Previous Topic:** [[Advantages and Disadvantages]]
- **Next Topic:** [[Structs]]
- **Related Notes:** [[One-Dimensional Arrays (1D Arrays)]], [[Data Representation - Characters and Boolean]]

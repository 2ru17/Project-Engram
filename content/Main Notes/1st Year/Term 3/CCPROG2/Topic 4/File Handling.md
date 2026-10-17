---
id: Topic-4--File-Handling
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Topic 4- File Handling

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Files]] #[[Data Analysis]] #[[Searching]] #[[Structured Data]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> File handling in C allows programs to read from and write to files on disk using the `<stdio.h>` library and the `FILE` pointer type.

## Key Concepts
 `FILE *` pointer represents an open file stream `fopen()` opens a file; `fclose()` closes it Modes: `"r"` (read), `"w"` (write), `"a"` (append), `"rb"`/`"wb"` (binary) Text I/O: `fprintf`, `fscanf`, `fgets`, `fputs` Binary I/O: `fread`, `fwrite`

## Details / Theory

### Opening and Closing Files

```c
FILE *fp = fopen("data.txt", "r");  // Open for reading
if (fp == NULL) {
    printf("Error: Cannot open file.\n");
    return 1;
}

// ... use the file ...

fclose(fp);  // Always close when done
```

### File Modes

| Mode   | Description                       |
| ------ | --------------------------------- |
| `"r"`  | Read (file must exist)            |
| `"w"`  | Write (creates/overwrites)        |
| `"a"`  | Append (creates if needed)        |
| `"r+"` | Read + Write (file must exist)    |
| `"w+"` | Read + Write (creates/overwrites) |
| `"rb"` | Read binary                       |
| `"wb"` | Write binary                      |

### Writing to a Text File

```c
FILE *fp = fopen("output.txt", "w");
if (fp != NULL) {
    fprintf(fp, "Name: %s\n", "Alice");
    fprintf(fp, "Score: %d\n", 95);
    fputs("End of record.\n", fp);
    fclose(fp);
}
```

### Reading from a Text File

```c
FILE *fp = fopen("data.txt", "r");
char line[256];

// Read line by line
while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);
}
fclose(fp);
```

```c
// Structured reading with fscanf
FILE *fp = fopen("students.txt", "r");
char name[50];
int age;
float gpa;

while (fscanf(fp, "%s %d %f", name, &age, &gpa) == 3) {
    printf("%s is %d with GPA %.2f\n", name, age, gpa);
}
fclose(fp);
```

### Binary File I/O

```c
typedef struct {
    char name[50];
    int age;
} Student;

// Write binary
FILE *fp = fopen("students.bin", "wb");
Student s = {"Alice", 20};
fwrite(&s, sizeof(Student), 1, fp);
fclose(fp);

// Read binary
fp = fopen("students.bin", "rb");
Student s2;
fread(&s2, sizeof(Student), 1, fp);
printf("%s, %d\n", s2.name, s2.age);
fclose(fp);
```

### File Position Functions

| Function                    | Description               |
| --------------------------- | ------------------------- |
| `ftell(fp)`                 | Current position in bytes |
| `fseek(fp, offset, origin)` | Move to position          |
| `rewind(fp)`                | Go back to beginning      |

Origins for `fseek`: `SEEK_SET` (beginning), `SEEK_CUR` (current), `SEEK_END` (end).

### Checking for End of File

```c
while (!feof(fp)) {
    // Read data...
}
```

> **Note:** Prefer checking the return value of `fread`/`fgets`/`fscanf` rather than using `feof()` in loop conditions.

## Common Pitfalls
 Not checking if `fopen()` returns `NULL` — leads to segfault. Forgetting to `fclose()` — causes resource leaks and data loss. Using `"w"` mode when intending to append — overwrites the file. Using `feof()` as a loop condition — can read one extra iteration. Mixing text and binary modes on Windows (newline translation issues).

## Summary

> TL;DR — File handling uses `FILE *` with `fopen`/`fclose`. Use `fprintf`/`fscanf`/`fgets` for text and `fread`/`fwrite` for binary. Always check for `NULL` on open and close files when done.

## Review Questions

_To be added._

## Links
 **Related:** [[Strings]] — [[Structs]] — [[Recursion]] — [[What is an Array]] **Source / Reference:**

## Multiple Choice Questions

1. Which library is required for file handling in C?
- **A)** `<stdlib.h>`
- **B)** `<math.h>`
- **C)** `<stdio.h>`
- **D)** `<file.h>`

2. What type of pointer is used to represent an open file stream in C?
- **A)** `STREAM *`
- **B)** `FILE *`
- **C)** `void *`
- **D)** `char *`

3. What is the result of using the `"w"` mode with `fopen()` on an existing file?
- **A)** The file is opened for reading only
- **B)** Data is appended to the end of the file
- **C)** The file is overwritten, destroying previous contents
- **D)** An error is returned

4. Which function must always be called when you are finished using an open file?
- **A)** `fstop()`
- **B)** `fclose()`
- **C)** `fflush()`
- **D)** `fexit()`

5. What does `fopen()` return if it fails to open a file?
- **A)** `-1`
- **B)** `0`
- **C)** `NULL`
- **D)** `EOF`

6. Which function is specifically used for structured reading of text files, similar to reading from standard input?
- **A)** `fgets()`
- **B)** `fputs()`
- **C)** `fscanf()`
- **D)** `fread()`

7. Which functions are primarily used for reading and writing binary files in C?
- **A)** `fscanf` and `fprintf`
- **B)** `fgets` and `fputs`
- **C)** `fread` and `fwrite`
- **D)** `fgetc` and `fputc`

8. What does the `ftell(fp)` function return?
- **A)** The total size of the file in bytes
- **B)** The current position in the file in bytes
- **C)** The remaining number of lines
- **D)** A boolean indicating if the file is open

9. Why is using `feof()` directly as a loop condition generally discouraged?
- **A)** It can cause an infinite loop
- **B)** It may read one extra iteration because EOF is only set after a failed read
- **C)** It automatically closes the file
- **D)** It only works for binary files

10. What origin constant is used with `fseek()` to move relative to the beginning of the file?
- **A)** `SEEK_CUR`
- **B)** `SEEK_END`
- **C)** `SEEK_SET`
- **D)** `SEEK_START`

### Answer Key & Explanations
1. **C)** Standard inputs/outputs operations encompass disc storage manipulation bridging directly from the `stdio.h` suite.
2. **B)** Interaction requires assigning streaming handles utilizing the defined macro standard `FILE`.
3. **C)** Employing write designation truncates pre-existing targets immediately purging older unretrieved iterations.
4. **B)** Completing processes involves explicit finalization returning file handles to operational system availability.
5. **C)** Initializer failures evaluate into unassigned pointers inherently terminating expected procedural operation pathways.
6. **C)** Extrapolating formatted string data mirrors command prompt behavior employing specific parsed variables mapping.
7. **C)** Direct byte transferring mandates raw block replication protocols specifically implemented in binary routines.
8. **B)** Position checking traces exact structural index offsets mapping stream progression directly via integral markers.
9. **B)** Premature loop conditionals trigger unexpected duplicate iteration evaluations skewing retrieved structural dataset mappings.
10. **C)** Index offsets mapping relies on explicit anchor constants mapping structural file layouts properly.

## References & Navigation

- **Previous Topic:** [[Structs]]
- **Next Topic:** [[Recursion]]
- **Related Notes:** [[Files I-O (via Streams)]], [[Computer Hardware - IO Devices]]

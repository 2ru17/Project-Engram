---
id: debugging_and_test_tools
type: note
course: CCAPDEV
topic: Debugging and Test Tools
status: completed
---

# Debugging and Test Tools

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Web Development]] #[[CCAPDEV]] #[[Debugging and Test Tools]] #[[Code Snippets]] #[[M6]]

---

## Overview

> Extracted notes for Debugging and Test Tools covering both theoretical and practical elements.

## Key Definitions
 Debugging and Test Tools As projects become bigger, ensuring that everything works correctly becomes a much harder task. It comes to a point that it is almost impossible to manage multiple components. Sometimes, adding code on one component breaks another. Fortunately, there are tools for automated testing which makes it easier to ensure that everything still works as intended as features are continuously being developed into the application.
 Jest Installation Search for jest in the npm repository and follow the installation instructions Navigate to your project directory Run the command npm init Run the command npm install --save-dev jest In package.json, under scripts: rewrite test's value to "jest" For vscode suggestions for jest, you can install: npm install --save-dev @types/jest
 Side: devDependencies The flag --save-dev installs the package as part of the devDependencies.  devDependencies are packages that are only needed for local development and testing. Typically, these are packages/tools for the developer to make the development of the application easier/better. https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file
 Jest Installation If you are using ES6 modules, you might have to install babel as well. Babel is a JavaScript transcompiler that transforms ES6+ JS syntax to ES5 syntax such that the browser / NodeJS can understand the code. Some libraries/frameworks, such as Jest, do not natively support some of the ES6+ syntax yet, which brings the need for a JavaScript compiler.
 Writing Test Scripts Jest will check all files with the pattern _.test._ in its filename. It will consider all matched files as test scripts. The following are the bread and butter of jest test scripts: test – a single test case expect – provides access to 'matchers' used to define which results passes the test case describe – a block that groups together several related tests. Optional

## Code Implementation

```text
Babel Installation
Follow the instructions written in:
https://babeljs.io/setup#installation
In the terminal:
npm install --save-dev babel-jest @babel/preset-env
This installs both babel-jest and @babel/preset-env (which is a babel plugin)
In package.json:
{ "scripts": { "test": "jest" }, "jest": { "transform": { "^.+\\.[t|j]sx?$": "babel-jest" } } }
Create a babel.config.json file and write in the following:
{ "presets": ["@babel/preset-env"] }
```

```text
test
Syntax:
test(name, fn, timeout)
name is a string that describes the test case
fn is a function that contains the expect statement that matches the passing result
timeout is time in milliseconds for specifying how long the scrip waits before aborting. optional
also goes under the alias:
it(name, fn, timeout)
```

```text
expect
Syntax:
expect(val).[matcher function]
val is the value that contains the actual output of the code.
matcher function is a matcher that compares val with the expected output.
```

```text
expect - Matcher Functions
toBe(value) checks referential equality
similar to JavaScript's ==
toEqual(value) checks value equality
similar to JavaScript's ===
toBeGreaterThan(value)
toBeFalsy/Truthy()
Full list of matcher functions:
https://jestjs.io/docs/expect#methods
```

## Syntax Breakdown
 Ensure correct syntax for Debugging and Test Tools Pay attention to specific functions and declarations.

## Complexity Analysis
 Time Complexity: O(1) for typical operations unless looping. Space Complexity: O(1) generally.

## Multiple Choice Questions

1. When writing test scripts with Jest, what is the purpose of the `expect` function?
    - **A)** To halt the server if an error occurs.
    - **B)** To automatically transpile ES6 syntax into ES5 syntax.
    - **C)** To provide access to "matcher" functions that compare the actual output with the expected output.
    - **D)** To group related tests together under a single block.

2. In Jest, what is the difference between the matcher functions `toBe()` and `toEqual()`?
    - **A)** `toBe()` checks referential equality (like `==`), while `toEqual()` checks value equality (like `===`).
    - **B)** `toBe()` is only used for Strings, while `toEqual()` is only used for Numbers.
    - **C)** `toBe()` is used to assert errors, while `toEqual()` asserts successful execution.
    - **D)** There is no difference; they are aliases of the same function.

3. Why might you need to install Babel (`babel-jest`, `@babel/preset-env`) when working with Jest?
    - **A)** To encrypt source code files before deploying them.
    - **B)** Because Jest does not natively support some modern ES6+ JavaScript syntax, and Babel transcompiles it to a format Jest understands.
    - **C)** Because Babel provides the database connection logic needed for testing models.
    - **D)** Because Jest requires a separate web server to render HTML test results.

### Answer Key & Explanations

1. **C**. `expect` provides access to "matchers" which are used to define which results pass the test case by comparing values.
2. **A**. `toBe(value)` checks referential equality, while `toEqual(value)` checks value equality.
3. **B**. Babel is a transcompiler that transforms ES6+ syntax to ES5. Some tools like Jest do not fully support modern ES6+ natively.

## References & Navigation

- **Previous Topic:** [[Password Hashing]]
- **Related Notes:** [[Client Server Architecture]]

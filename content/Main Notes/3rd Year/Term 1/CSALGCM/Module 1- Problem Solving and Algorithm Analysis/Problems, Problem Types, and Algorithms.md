---
id: problems_problem_types_and_algorithms
type: note
course: CSALGCM
topic: "Problems, Problem Types, and Algorithms"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[Problems, Problem Types, and Algorithms]]

---

# Problems, Problem Types, and Algorithms

## Overview
In the realm of Computer Science, the systematic approach to formulating and solving problems is paramount. A **computational problem** is a formalized question that computers can theoretically solve. It is defined strictly by its **input** and **output** specifications. Bridging the gap between these inputs and outputs is the **algorithm**—a rigorous, unambiguous sequence of steps designed to transform an input state into a desired output state, satisfying the problem's criteria.

## Key Concepts

### 1. Computational Problems
A computational problem mathematically captures a task that a computer needs to perform. 
- **Input Specifications**: The precise format, type, and constraints of the data provided to the system.
- **Output Specifications**: The precise format and properties of the data that must be produced relative to the given input.

### 2. Definition of an Algorithm
An **algorithm** is a finite sequence of exact, unambiguous instructions that operate on the specified input to produce the correct output in a finite amount of time. Every algorithm must eventually halt, either returning a valid output or indicating that no solution exists.

### 3. Algorithm Analysis Framework
To critically evaluate an algorithm, we look at three fundamental pillars:
- **Correctness**: Does the algorithm mathematically guarantee the correct output for *every* valid input? This often requires rigorous mathematical proofs (e.g., loop invariants, induction). When mathematical proof is intractable, rigorous software testing and evaluation techniques (like property-based testing) are employed.
- **Efficiency**: How does the resource consumption scale as the input size grows?
  - **Time Complexity**: The number of basic operations executed as a function of the input size.
  - **Space Complexity**: The amount of auxiliary memory required as a function of the input size.
- **Elegance**: Based on *Occam's Razor*, the simplest solution is often the best. An elegant algorithm avoids unnecessary complexity, making it easier to read, maintain, and verify.

## Algorithms & Formulas

Computational problems can be classified into several broad types based on the nature of their desired output:

1. **Decision Problem**: Asks a "YES" or "NO" question. 
   - *Example*: Is integer $N$ a prime number? Is string $S$ a palindrome?
2. **Search Problem**: Requires finding a specific configuration or path that satisfies a set of constraints.
   - *Example*: Solving a Sudoku puzzle, navigating a maze (Pathfinding), or finding a sequence of moves to solve a Rubik's cube.
3. **Counting Problem**: Asks for the *total number* of valid solutions that satisfy specific constraints.
   - *Example*: How many distinct paths exist from node $A$ to node $B$ in a Directed Acyclic Graph (DAG)? How many ways can you make change for $100$ using given coin denominations?
4. **Optimization Problem**: Seeks the "best" solution from a vast pool of valid solutions, minimizing or maximizing a particular objective function.
   - *Example*: Finding the Shortest Path in a network, the Minimum Spanning Tree of a graph, or generating an optimal Huffman Encoding for data compression.
5. **Function Problem**: Requires computing a specifically defined mathematical or algorithmic function.
   - *Example*: Calculating the arithmetic mean or standard deviation of an array, computing the Euler Totient (Phi) function.

## Code Examples

### 1. SORT-SEQUENCE (Bubble Sort)
**Input**: A sequence of $n$ integers $a_1, a_2, \ldots, a_n$.  
**Output**: A permutation of the input $b_1, b_2, \ldots, b_n$ such that $b_{i+1} \ge b_i$ for all $i$.

```python
def bubble_sort(arr):
    """
    Takes an array of integers arr.
    Returns a non-decreasing permutation of arr.
    """
    n = len(arr)
    # Loop from n down to 2
    for i in range(n - 1, 0, -1):
        for j in range(i):
            if arr[j] > arr[j + 1]:
                # Swap elements if they are out of order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
```
*Analysis*: The nested loops give this algorithm an $O(N^2)$ time complexity. While not the most efficient, it is highly elegant and simple to implement.

### 2. COUNT-FACTORS
**Input**: A positive integer $n$.  
**Output**: An integer $m$ denoting the number of distinct positive integers $k$ that divide $n$.

```python
def count_factors(n):
    """
    Takes a positive integer n.
    Returns an integer denoting the number of factors of n.
    """
    i = 1
    ctr = 0
    while i <= n:
        if n % i == 0:
            ctr += 1
        i += 1
    return ctr
```
*Analysis*: This simple algorithm iterates exactly $n$ times, resulting in an $O(n)$ time complexity. (Note: A more efficient approach would iterate up to $\sqrt{n}$).

## Multiple Choice Questions

1. Which of the following is NOT a pillar of algorithm analysis discussed in this module?
    A) Efficiency
    B) Correctness
    C) Extensibility
    D) Elegance
2. Determining whether a given graph contains a cycle is an example of which type of problem?
    A) Search Problem
    B) Decision Problem
    C) Counting Problem
    D) Function Problem
3. What is the primary characteristic of an Optimization Problem?
    A) It returns a strictly YES or NO answer.
    B) It counts the number of possible valid paths.
    C) It computes a formally defined mathematical expression.
    D) It seeks the best possible solution among all valid constraints based on a criterion.
4. An algorithm must be a sequence of finite and unambiguous instructions. What does "finite" mean in this context?
    A) It must use a finite amount of RAM.
    B) It must complete execution in a bounded number of steps.
    C) Its code must be less than 1000 lines.
    D) It can only accept inputs of finite length.
5. In the context of computational problems, what do Occam's Razor and "Elegance" advocate?
    A) Algorithms should run as fast as possible regardless of code size.
    B) A simpler algorithmic logic is preferred over unnecessarily complex ones.
    C) Every algorithm must be rigorously proven using mathematics.
    D) All optimization problems must be reduced to decision problems.
6. The problem "Finding the Minimum Spanning Tree of a network" is classified as:
    A) Decision
    B) Optimization
    C) Counting
    D) Function
7. If an algorithm is designed to return the number of ways to climb stairs, what type of problem is it solving?
    A) Counting Problem
    B) Search Problem
    C) Optimization Problem
    D) Decision Problem
8. Which of the following best describes the difference between a Search problem and a Decision problem?
    A) Search problems ask for a YES/NO, Decision problems find the path.
    B) Search problems find a configuration satisfying constraints, Decision problems only ask if such a configuration exists.
    C) There is no fundamental difference; they are the same.
    D) Search problems look for the best solution, Decision problems look for any solution.
9. What is the time complexity of the provided `COUNT-FACTORS` algorithm?
    A) $O(\log n)$
    B) $O(1)$
    C) $O(n)$
    D) $O(n^2)$
10. If a computational problem lacks an unambiguous output specification, what is the consequence?
    A) It becomes a Function Problem.
    B) It can only be solved with $O(n!)$ time complexity.
    C) It is impossible to mathematically prove an algorithm's correctness for it.
    D) It automatically requires a heuristic approach.

### Answer Key & Explanations
1. **C** - Extensibility is a software engineering concern, whereas the module strictly lists Correctness, Efficiency, and Elegance as the three pillars of algorithm analysis.
2. **B** - Asking "whether" something is true (e.g., does a cycle exist?) requires a YES or NO answer, making it a Decision Problem.
3. **D** - Optimization problems involve maximizing or minimizing a certain measure.
4. **B** - Finiteness in an algorithm means it must eventually halt; it cannot loop infinitely.
5. **B** - Occam's Razor applied to algorithms (Elegance) means simplicity in logic should be favored.
6. **B** - A Minimum Spanning Tree seeks to *minimize* the total edge weight, which is an optimization.
7. **A** - Finding "the number of ways" strictly corresponds to a Counting Problem.
8. **B** - Decision problems evaluate a boolean condition, whereas search problems return the actual state or path.
9. **C** - The loop iterates exactly `n` times, incrementing `i` by 1 each time.
10. **C** - Without clear output specifications, correctness cannot be proven since the goal is undefined.

## References & Navigation

- **Previous Topic:** None
- **Next Topic:** [[Complexity Analysis]]
- **Related Notes:** 

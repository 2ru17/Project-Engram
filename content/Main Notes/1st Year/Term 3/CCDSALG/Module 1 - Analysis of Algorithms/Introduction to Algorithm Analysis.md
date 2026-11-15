---
id: ccdsalg_introduction_to_algorithm_analysis
type: note
course: CCDSALG
topic: Introduction to Algorithm Analysis
status: completed
---
# Introduction to Algorithm Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Intro]] #[[Conceptual]] #[[M1]]

---

## Overview

An **algorithm** is any well-defined computational procedure that takes value(s) as input and produces some value(s) as output in a finite amount of time. The main design issues to consider are correctness and efficiency (performance in terms of time and space).

Analyzing an algorithm involves studying its behavior to predict its performance. This includes understanding what happens as the input size gets larger and how much resources (time and memory) are used. The purpose of this analysis is to predict the behavior of algorithms without implementing them, and to compare different algorithms to determine the best one for a given purpose. While exact prediction is not possible due to numerous factors, the analysis provides a useful approximation.

There are two primary methods for analysis:
* **A Posteriori Analysis**: An empirical analysis where the program is implemented using a programming language, executed on an actual machine, and exact time and space usage are measured.
* **A Priori Analysis**: A theoretical analysis where the program is analyzed assuming all factors are constant and independent of specific implementation details.

### Assumptions for A Priori Analysis (RAM Model)
A Priori Analysis relies on the Random-Access Machine (RAM) model with the following assumptions:
* Algorithms are implemented as computer programs.
* They run on a generic, single-processor, random-access machine model.
* Instructions are executed sequentially, one at a time (no concurrent operations).
* Each instruction or data access takes a constant amount of time.
* The RAM model contains standard instructions commonly found in real computers.

### Order of Growth
The rate of growth, or order of growth, of an algorithm is an approximation of the time required by the algorithm as the input size increases.
* **Input size** usually refers to the number of items in the input.
* **Running time** is the number of instructions or data accesses executed, independent of a specific computer but within the RAM model framework. The running time $T(n)$ for an input size $n$ is the sum of the running times of each statement executed.
* It considers only the leading term of the running time polynomial (e.g., in $an^2 + bn + c$, it focuses on $an^2$).

## Important Formulas

Running time $T(n)$ is represented by order of growth classes (Big-O notation). If an algorithm takes $t_1$ time for input size $n_1$, you can estimate the time $t_2$ for a larger input size $n_2$ using ratios, depending on the complexity class:

* Constant: $O(1)$ $\rightarrow t_2 = t_1$
* Logarithmic: $O(\log_2 n)$ $\rightarrow t_2 = t_1 \times \frac{\log_2 n_2}{\log_2 n_1}$
* Linear: $O(n)$ $\rightarrow t_2 = t_1 \times \frac{n_2}{n_1}$
* Linearithmic: $O(n \log_2 n)$ $\rightarrow t_2 = t_1 \times \frac{n_2 \log_2 n_2}{n_1 \log_2 n_1}$
* Quadratic: $O(n^2)$ $\rightarrow t_2 = t_1 \times \left(\frac{n_2}{n_1}\right)^2$
* Cubic: $O(n^3)$ $\rightarrow t_2 = t_1 \times \left(\frac{n_2}{n_1}\right)^3$
* Exponential: $O(2^n)$ $\rightarrow t_2 = t_1 \times \frac{2^{n_2}}{2^{n_1}}$

## Worked Examples

**Example 1: Scaling Input Size**
If an algorithm takes 1 second to run a problem with an input size of $8$ ($n_1=8, t_1=1$), what is the approximate time for that algorithm to run a problem with an input size of $16$ ($n_2=16$)?

* **$O(1)$**: $T(16) = 1$ second
* **$O(\log_2 n)$**: $T(16) = 1 \times \frac{\log_2 16}{\log_2 8} = \frac{4}{3}$ seconds
* **$O(n)$**: $T(16) = 1 \times \frac{16}{8} = 2$ seconds
* **$O(n \log_2 n)$**: $T(16) = 1 \times \frac{16 \log_2 16}{8 \log_2 8} = \frac{16 \times 4}{8 \times 3} = \frac{64}{24} = \frac{8}{3}$ seconds
* **$O(n^2)$**: $T(16) = 1 \times \left(\frac{16}{8}\right)^2 = 2^2 = 4$ seconds
* **$O(n^3)$**: $T(16) = 1 \times \left(\frac{16}{8}\right)^3 = 2^3 = 8$ seconds
* **$O(2^n)$**: $T(16) = 1 \times \frac{2^{16}}{2^8} = 2^8 = 256$ seconds


## Multiple Choice Questions

1. What are the two primary design issues emphasized when evaluating an algorithm?
    - **A)** Code readability and compiler optimization
    - **B)** Correctness and efficiency in terms of time and space
    - **C)** Hardware portability and programming language syntax
    - **D)** Empirical benchmarking and parallel throughput

2. How does A Posteriori Analysis differ from A Priori Analysis?
    - **A)** A Posteriori Analysis assumes constant hardware factors, whereas A Priori Analysis times live executions
    - **B)** A Posteriori Analysis only counts loop headers, whereas A Priori Analysis profiles CPU cache misses
    - **C)** A Posteriori Analysis executes an implemented program on a real machine to measure exact time and space, whereas A Priori Analysis is theoretical and implementation-independent
    - **D)** A Posteriori Analysis applies strictly to recursive algorithms, whereas A Priori Analysis applies only to iterative loops

3. Which of the following is NOT an assumption of the Random-Access Machine (RAM) model used in A Priori Analysis?
    - **A)** Multiple processors execute instructions concurrently to minimize runtime
    - **B)** Instructions execute sequentially one at a time
    - **C)** Each basic instruction or data access takes a constant amount of time
    - **D)** Algorithms run on a generic, single-processor machine with standard computer instructions

4. Within the RAM model framework, how is the running time $T(n)$ of an algorithm defined for an input of size $n$?
    - **A)** The wall-clock time measured in milliseconds on a specific CPU
    - **B)** The number of lines of source code written by the programmer
    - **C)** The memory size in bytes allocated for input variables
    - **D)** The sum of the running times of each instruction or data access executed

5. If an algorithm's exact running time polynomial is $T(n) = 4n^3 + 12n^2 + 50n + 9$, which part determines its order of growth?
    - **A)** The constant term 9, because it establishes the baseline overhead
    - **B)** The leading term 4n^3, because order of growth focuses on the highest-order term of the polynomial
    - **C)** The linear term 50n, because it has the largest numeric coefficient
    - **D)** The sum of all coefficients 4 + 12 + 50 + 9

6. An $O(n \log_2 n)$ algorithm takes $3$ seconds for an input of size $n_1 = 8$. Using the complexity scaling ratio, approximately how long will it take for $n_2 = 32$?
    - **A)** 12 seconds
    - **B)** 15 seconds
    - **C)** 20 seconds
    - **D)** 48 seconds

7. An $O(\log_2 n)$ algorithm runs in $6$ seconds on input size $n_1 = 8$. What is its estimated running time for $n_2 = 64$?
    - **A)** 12 seconds
    - **B)** 18 seconds
    - **C)** 24 seconds
    - **D)** 48 seconds

8. Suppose an exponential $O(2^n)$ algorithm requires $2$ seconds to solve a problem of size $n_1 = 10$. Approximately how long will it take for input size $n_2 = 15$?
    - **A)** 3 seconds
    - **B)** 10 seconds
    - **C)** 32 seconds
    - **D)** 64 seconds

9. In the worked scaling example where an input size doubles from $n_1 = 8$ ($t_1 = 1\text{ s}$) to $n_2 = 16$, which complexity class increases its running time by a factor of $8$?
    - **A)** Logarithmic O(log₂ n)
    - **B)** Quadratic O(n^2)
    - **C)** Cubic O(n^3)
    - **D)** Exponential O(2^n)

10. Why do computer scientists perform theoretical algorithm analysis before writing and running code?
    - **A)** To predict approximate performance as inputs scale and compare algorithms independently of machine details
    - **B)** To obtain exact, nanosecond-level execution timings on every future processor architecture
    - **C)** To eliminate the need to verify whether an algorithm produces correct output
    - **D)** To convert recursive procedures automatically into constant-time O(1) operations

### Answer Key & Explanations

1. **B)** An algorithm is evaluated primarily on correctness (producing valid output in finite time) and efficiency (time and space resource usage).
2. **C)** A Posteriori Analysis is empirical—implementing and running the program on real hardware—whereas A Priori Analysis is theoretical and independent of implementation or hardware specifics.
3. **A)** The RAM model explicitly assumes a single-processor machine executing instructions sequentially one at a time with no concurrent operations.
4. **D)** Under the RAM model, $T(n)$ is the total number of instructions or data accesses executed, summed across every statement run for input size $n$.
5. **B)** Order of growth considers only the leading (highest-degree) term of the running time polynomial ($4n^3$ here, analogous to $an^2$ in $an^2 + bn + c$).
6. **C)** Using $t_2 = t_1 \times \frac{n_2 \log_2 n_2}{n_1 \log_2 n_1} = 3 \times \frac{32 \times 5}{8 \times 3} = 3 \times \frac{160}{24} = 20\text{ seconds}$.
7. **A)** Using $t_2 = t_1 \times \frac{\log_2 n_2}{\log_2 n_1} = 6 \times \frac{\log_2 64}{\log_2 8} = 6 \times \frac{6}{3} = 12\text{ seconds}$.
8. **D)** Using $t_2 = t_1 \times \frac{2^{n_2}}{2^{n_1}} = 2 \times \frac{2^{15}}{2^{10}} = 2 \times 2^5 = 2 \times 32 = 64\text{ seconds}$.
9. **C)** For $O(n^3)$, doubling $n$ from $8$ to $16$ scales time by $(16/8)^3 = 2^3 = 8$ seconds.
10. **A)** Algorithm analysis gives a useful approximation of scaling behavior and enables comparing competing algorithms without first implementing them.

## References & Navigation

- **Previous Topic:** None
- **Next Topic:** [[Frequency Counting]]
- **Related Notes:** [[Algorithm Analysis]], [[RAM Model]]

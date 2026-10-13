---
id: Handout_01_-_Intro
type: note
course: CCDSALG
topic: Intro
status: completed
---

# Intro

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Intro]] #[[Conceptual]] #[[M1]]

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


## References & Navigation

- **Related Notes:** [[Introduction to Algorithm Analysis]]

---
id: Contingency-Table
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Contingency Table]]

---

## Overview

A **Contingency Table** (two-way cross-tabulation table) organizes bivariate categorical counts or probabilities across $r$ rows (levels of variable $A$) and $c$ columns (levels of variable $B$). It allows immediate extraction of **joint**, **marginal**, and **conditional** probabilities.

## Key Definitions

- **Joint Probability ($P(A_i \cap B_j)$):** Probability in interior cell $(i, j)$, computed as $\frac{n_{ij}}{N}$ where $N$ is the grand total.
- **Marginal Probability ($P(A_i)$ or $P(B_j)$):** Row total $\frac{n_{i\cdot}}{N} = \sum_j P(A_i \cap B_j)$ or column total $\frac{n_{\cdot j}}{N} = \sum_i P(A_i \cap B_j)$ along the margins.
- **Conditional Probability ($P(A_i \mid B_j)$):** Interior cell divided by its corresponding column (or row) marginal total: $P(A_i \mid B_j) = \frac{n_{ij}}{n_{\cdot j}} = \frac{P(A_i \cap B_j)}{P(B_j)}$.

## Worked Example

| Traffic Type | Flagged ($F$) | Passed ($F^c$) | Row Total |
| :--- | :---: | :---: | :---: |
| **Malicious ($M$)** | $90$ | $10$ | $100$ |
| **Benign ($M^c$)** | $60$ | $840$ | $900$ |
| **Column Total** | $150$ | $850$ | **$1000$** |

- **Joint:** $P(M \cap F) = \frac{90}{1000} = 0.09$.
- **Marginal:** $P(F) = \frac{150}{1000} = 0.15$.
- **Conditional:** $P(M \mid F) = \frac{90}{150} = 0.60$.

## Multiple Choice Questions

1. In a contingency table with grand total $N$, how is a **joint probability** $P(A_i \cap B_j)$ calculated?
    - **A)** Divide the interior cell count $n_{ij}$ by the grand total $N$.
    - **B)** Divide the interior cell count $n_{ij}$ by the row total $n_{i\cdot}$.
    - **C)** Divide the row total $n_{i\cdot}$ by the column total $n_{\cdot j}$.
    - **D)** Add the row total and column total and divide by $N$.

2. Using the worked example table ($N = 1000$), what is the conditional probability $P(F \mid M^c)$ that a benign packet is flagged?
    - **A)** $\frac{60}{1000} = 0.06$
    - **B)** $\frac{60}{150} = 0.40$
    - **C)** $\frac{60}{900} = \frac{1}{15} \approx 0.0667$
    - **D)** $\frac{900}{1000} = 0.90$

3. Why are the row and column totals in a two-way table called **marginal** distributions?
    - **A)** Because they are written in the outer margins of the table and represent the unconditional distribution of a single variable summed across all levels of the other variable.
    - **B)** Because their probabilities are negligibly small.
    - **C)** Because they exclude the intersection cells.
    - **D)** Because they only apply to independent variables.

4. How can you test whether row event $A_i$ and column event $B_j$ are statistically independent directly from a contingency table of counts?
    - **A)** Check if $n_{ij} = 0$.
    - **B)** Check if $n_{i\cdot} = n_{\cdot j}$.
    - **C)** Check if the cell count equals the expected count under independence: $n_{ij} = \frac{n_{i\cdot} \times n_{\cdot j}}{N}$ (i.e., $P(A_i \cap B_j) = P(A_i)P(B_j)$).
    - **D)** Check if $n_{ij} = N / 4$.

5. Using the worked example table ($N = 1000$), what is $P(M \cup F)$?
    - **A)** $\frac{250}{1000} = 0.25$
    - **B)** $\frac{100 + 150 - 90}{1000} = \frac{160}{1000} = 0.16$
    - **C)** $\frac{90}{1000} = 0.09$
    - **D)** $\frac{840}{1000} = 0.84$

### Answer Key & Explanations

1. **A**. A joint probability measures the proportion of the entire sample space $N$ that falls simultaneously into row $i$ and column $j$: $P(A_i \cap B_j) = n_{ij} / N$.
2. **C**. Conditioning on $M^c$ restricts the denominator to the **Benign** row total ($n_{M^c} = 900$). Within that row, $60$ packets are flagged, so $P(F \mid M^c) = 60 / 900 = 1/15 \approx 0.0667$.
3. **A**. Summing across a row ($\sum_j P(A_i \cap B_j) = P(A_i)$) or down a column ($\sum_i P(A_i \cap B_j) = P(B_j)$) eliminates the other variable and places the single-variable totals in the table margins.
4. **C**. Independence holds when $P(A_i \cap B_j) = P(A_i)P(B_j) \iff \frac{n_{ij}}{N} = \frac{n_{i\cdot}}{N} \cdot \frac{n_{\cdot j}}{N} \iff n_{ij} = \frac{n_{i\cdot} n_{\cdot j}}{N}$.
5. **B**. By the Additive Rule, $P(M \cup F) = P(M) + P(F) - P(M \cap F) = \frac{100}{1000} + \frac{150}{1000} - \frac{90}{1000} = \frac{160}{1000} = 0.16$.

## References & Navigation

- **Previous Topic:** [[Independent Events]]
- **Next Topic:** [[Partition of  Sample Space]]
- **Related Notes:** [[Total Probability Rule]], [[Generalized Multiplication]]

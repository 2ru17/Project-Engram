---
id: calculator-guide
type: note
course: CSMODEL
topic: Mock Exams
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Mock Exams]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Calculator Guide for CSMODEL Exam

This guide covers step-by-step instructions for calculating the most common formulas on a standard scientific calculator during the CSMODEL final exam.

## 1. Association Rule Mining (Apriori)

### Formulas:
* **Support(A)** = Frequency(A) / Total Transactions
* **Confidence(A → B)** = Frequency(A and B) / Frequency(A)
* **Lift(A → B)** = Confidence(A → B) / Support(B) = Support(A and B) / [Support(A) * Support(B)]

### Calculator Usage:
**Calculating Lift:**
Given: Confidence of A → B = 0.8, Support of B = 0.2
1. Type `0.8`
2. Press `/` (divide)
3. Type `0.2`
4. Press `=` (Result: 4.0)

## 2. Clustering (Euclidean Distance)

### Formula:
* **Distance** = √[ (x₂ - x₁)² + (y₂ - y₁)² ]

### Calculator Usage:
Given: Point 1 = (1, 2), Point 2 = (4, 6)
**Method 1 (Step-by-step):**
1. Calculate X difference: Type `4 - 1`, press `=`, press the squaring key `x²` (Result: 9)
2. Add Y difference: Press `+`, open parenthesis `(`, type `6 - 2`, close parenthesis `)`, press the squaring key `x²`, press `=` (Result: 25)
3. Take the square root: Press the `√` (square root) key, type `25` (or press `Ans`), then press `=` (Result: 5)

**Method 2 (One-liner using parentheses):**
1. Press `√`
2. Open parenthesis `(`
3. Open parenthesis `(`, type `4 - 1`, close parenthesis `)`, press `x²`
4. Press `+`
5. Open parenthesis `(`, type `6 - 2`, close parenthesis `)`, press `x²`
6. Close parenthesis `)`
7. Press `=` (Result: 5)

## 3. Recommender Systems (Cosine Similarity)

### Formula:
* **Cosine Similarity** = (A · B) / (||A|| * ||B||)

### Calculator Usage:
Given: Vector A = [3, 4], Vector B = [4, 3]

**Step 1: Compute Dot Product (A · B)**
1. Type `3 * 4`
2. Press `+`
3. Type `4 * 3`
4. Press `=` (Result: 24)
*(Write this number down: 24)*

**Step 2: Compute Magnitude of A (||A||)**
1. Type `3² + 4²`, press `=` (Result: 25)
2. Press `√` on the result (Result: 5)
*(Write this number down: 5)*

**Step 3: Compute Magnitude of B (||B||)**
1. Type `4² + 3²`, press `=` (Result: 25)
2. Press `√` on the result (Result: 5)
*(Write this number down: 5)*

**Step 4: Final Calculation**
1. Type `24`
2. Press `/`
3. Open parenthesis `(`
4. Type `5 * 5`
5. Close parenthesis `)`
6. Press `=` (Result: 0.96)

## 4. Basic Statistics (Standard Error)

### Formula:
* **Standard Error (SE)** = Standard Deviation / √(Sample Size)

### Calculator Usage:
Given: Standard Deviation = 12, Sample Size = 36
1. Type `12`
2. Press `/`
3. Press `√` (square root), type `36`
4. Press `=` (Result: 2.0)

## 5. Bayesian Inference (Bayes' Theorem)

### Formula:
* **P(A|B)** = [ P(B|A) * P(A) ] / P(B)

### Calculator Usage:
Given: P(B|A) = 0.9, P(A) = 0.01, P(B) = 0.05
1. Type `0.9 * 0.01`
2. Press `/`
3. Type `0.05`
4. Press `=` (Result: 0.18)

---
## 💡 General Calculator Tips for the Exam:
- **Parentheses are your best friend:** When dealing with fractions (like Cosine Similarity or Bayes' theorem) with multiple terms in the denominator, always wrap the denominator in parentheses. `A / (B * C)` is NOT the same as `A / B * C`.
- **Store intermediate values:** For complex calculations like Cosine Similarity, write down the intermediate dot product and magnitudes on your scratch paper to avoid making a syntax error on a long one-line equation.
- **Square Roots:** Depending on your calculator (Casio vs. Sharp vs. TI), you either press `√` *before* the number, or type the number and press `√` *after*. Make sure you know which way your specific calculator works!
- **Clear Memory:** Hit `AC` or `Clear` twice before starting a completely new problem to ensure nothing is accidentally carried over from the previous calculation.


## References & Navigation

- **Related Notes:** [[Modeling and Simulation]]

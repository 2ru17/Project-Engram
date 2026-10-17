---
id: 07_Naive_Bayes
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 07_Naive_Bayes

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Naive Bayes is a probabilistic classifier based on Bayes' Theorem. It is called "Naive" because it makes a strong assumption that features are inde...

## Details / Theory

# 7. Naive Bayes Reviewer

## Overview

**Naive Bayes** is a probabilistic classifier based on **Bayes' Theorem**. It is called "Naive" because it makes a strong assumption that features are **independent** of each other given the class. Despite this simplification, it works surprisingly well, especially for text classification (e.g., Spam Filtering).

## Bayes' Theorem

$$ P(C|X) = \frac{P(X|C) \times P(C)}{P(X)} $$
 $P(C|X)$: **Posterior Probability**. The probability of Class $C$ given features $X$. (What we want to find). $P(X|C)$: **Likelihood**. The probability of features $X$ appearing given Class $C$. $P(C)$: **Prior Probability**. The initial probability of Class $C$ (before seeing data). $P(X)$: **Evidence**. The probability of features $X$ appearing. (Usually ignored in comparison since it's constant for all classes).

## The "Naive" Assumption

We assume features $x_1, x_2, \dots, x_n$ are independent.
$$ P(X|C) = P(x_1|C) \times P(x_2|C) \times \dots \times P(x_n|C) $$

## Classification Rule

To classify a new instance $X$, we calculate the score for each class and pick the highest one:
$$ Class = \text{argmax}_C P(C) \prod_{i=1}^{n} P(x_i|C) $$

## Example: Spam Filter
 **Classes**: Spam, Ham (Not Spam). **Message**: "Free Money". **Calculation**:
$Score(Spam) = P(Spam) \times P("Free"|Spam) \times P("Money"|Spam)$
$Score(Ham) = P(Ham) \times P("Free"|Ham) \times P("Money"|Ham)$ Compare scores. If $Score(Spam) > Score(Ham)$, classify as Spam.

## Laplace Smoothing (Add-One Smoothing)
 **Problem**: If a word (feature) never appears in the training data for a specific class, its probability $P(word|Class)$ will be **0**. **Consequence**: Since we multiply probabilities, a single 0 will make the entire score 0, regardless of other evidence. **Solution**: Add a small count (usually 1) to all frequency counts.
  $$ P(x_i|C) = \frac{count(x_i, C) + 1}{count(C) + V} $$
$V$: Vocabulary size (total number of unique words).
This ensures no probability is ever exactly zero.

## Solved Example: Spam Classification

**Dataset**:
 **Spam** (3 messages): "Buy cheap meds", "Cheap money", "Buy money" **Ham** (2 messages): "Cheap meds", "Study hard"

**Vocabulary**: {Buy, Cheap, Meds, Money, Study, Hard} (Size $V=6$)

**Priors**:
 $P(Spam) = 3/5 = 0.6$ $P(Ham) = 2/5 = 0.4$

**Likelihoods (with Laplace Smoothing +1)**:
 **Spam Word Count**: 6 words total.
Count("Cheap" | Spam) = 2.
$P("Cheap" | Spam) = \frac{2 + 1}{6 + 6} = \frac{3}{12} = 0.25$
Count("Money" | Spam) = 2.
$P("Money" | Spam) = \frac{2 + 1}{6 + 6} = \frac{3}{12} = 0.25$
 **Ham Word Count**: 4 words total.
Count("Cheap" | Ham) = 1.
$P("Cheap" | Ham) = \frac{1 + 1}{4 + 6} = \frac{2}{10} = 0.2$
Count("Money" | Ham) = 0.
$P("Money" | Ham) = \frac{0 + 1}{4 + 6} = \frac{1}{10} = 0.1$

**Test Message**: "Cheap Money"

**Calculate Scores**:

1.  **Spam Score**:
    $$ P(Spam) \times P("Cheap"|Spam) \times P("Money"|Spam) $$
    $$ 0.6 \times 0.25 \times 0.25 = 0.0375 $$

2.  **Ham Score**:
    $$ P(Ham) \times P("Cheap"|Ham) \times P("Money"|Ham) $$
    $$ 0.4 \times 0.2 \times 0.1 = 0.008 $$

**Conclusion**:
Since $0.0375 > 0.008$, the message is classified as **Spam**.

---

## Common Pitfalls
 Forgetting **Laplace smoothing** when a feature value has zero occurrences in a class — without it, the entire probability becomes 0. Violating the "naive" independence assumption without awareness — Naive Bayes assumes features are conditionally independent given the class. Comparing raw products instead of normalizing — final classification compares $P(C) \prod P(x_i|C)$ across all classes.

## Summary

> TL;DR — Naive Bayes classifies by computing $P(C|X) \propto P(C) \prod P(x_i|C)$ for each class and picking the maximum. It assumes feature independence and uses Laplace smoothing to handle zero-count features.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. Why is the Naive Bayes classifier called "Naive"?
- **A)** It assumes that all prior probabilities are equal.
- **B)** It assumes that features are completely independent of each other given the class.
- **C)** It can only handle numerical features and ignores text.
- **D)** It doesn't require any training data to function.

2. In Bayes' Theorem, what does the term $P(C|X)$ represent?
- **A)** The Prior Probability
- **B)** The Likelihood
- **C)** The Evidence
- **D)** The Posterior Probability

3. Which term in Bayes' Theorem describes the probability of observing the features given a specific class, $P(X|C)$?
- **A)** Prior
- **B)** Posterior
- **C)** Likelihood
- **D)** Evidence

4. When computing probabilities for different classes, why is the Evidence term $P(X)$ often ignored?
- **A)** Because it evaluates to zero for most datasets.
- **B)** Because it is constant across all classes and doesn't affect the comparison.
- **C)** Because it requires computing the prior first.
- **D)** Because Laplace smoothing eliminates the need for it.

5. How does Naive Bayes mathematically represent its independence assumption?
- **A)** $P(X|C) = P(x_1|C) \times P(x_2|C) \times \dots \times P(x_n|C)$
- **B)** $P(X|C) = P(x_1|C) + P(x_2|C) + \dots + P(x_n|C)$
- **C)** $P(X|C) = P(C) / P(X)$
- **D)** $P(X|C) = 1 - P(C)$

6. How does a Naive Bayes classifier finally determine the predicted class for a new instance?
- **A)** It selects the class with the lowest posterior probability.
- **B)** It randomly picks a class weighted by the prior probabilities.
- **C)** It calculates the score $P(C) \prod P(x_i|C)$ for each class and picks the maximum.
- **D)** It averages the likelihoods of all features.

7. What problem arises if a word in a test instance never appeared in the training data for a specific class?
- **A)** The prior probability becomes zero.
- **B)** The probability $P(word|Class)$ becomes 0, making the entire product for that class 0.
- **C)** The denominator of Bayes' theorem becomes infinite.
- **D)** The algorithm crashes due to a division by zero error.

8. What technique is used to solve the zero-probability problem in Naive Bayes?
- **A)** Cross-validation
- **B)** Dimensionality reduction
- **C)** Laplace Smoothing (Add-One Smoothing)
- **D)** Term Frequency scaling

9. In the context of Laplace smoothing, what does the variable $V$ represent in the formula?
- **A)** The variance of the training data
- **B)** The total number of instances in the dataset
- **C)** The total vocabulary size (number of unique words)
- **D)** The value of the highest frequency word

10. If an email classification dataset has 10 Spam messages and 40 Ham messages, what is the Prior Probability of Spam, $P(Spam)$?
- **A)** 0.10
- **B)** 0.20
- **C)** 0.40
- **D)** 0.25

### Answer Key & Explanations
1. **B)** It makes a "naive" or strong assumption that all features (e.g., words in a text) are independent of each other given the class.
2. **D)** $P(C|X)$ is the Posterior Probability, representing the probability of Class $C$ given the observed features $X$.
3. **C)** The term $P(X|C)$ is the Likelihood, the probability of features appearing given a specific class.
4. **B)** The Evidence $P(X)$ is the same for all classes being compared, so it can be omitted when finding the maximum score (argmax).
5. **A)** The assumption means the joint probability is just the product of individual feature probabilities: $P(x_1|C) \times \dots \times P(x_n|C)$.
6. **C)** The classification rule takes the argmax of the product of the prior probability and the likelihoods of all observed features.
7. **B)** Since probabilities are multiplied, a single zero likelihood forces the entire score for that class to be zero, completely overriding other evidence.
8. **C)** Laplace Smoothing adds a small constant (usually 1) to all counts to ensure no probability is exactly zero.
9. **C)** $V$ stands for the vocabulary size, which is added to the denominator to balance the $+1$ added to the numerator for every possible word.
10. **B)** $P(Spam) = 10 / (10 + 40) = 10 / 50 = 0.20$.

## References & Navigation

- **Previous Topic:** [[Decision Tree]]
- **Next Topic:** [[K Means Clustering]]
- **Related Notes:** [[Naive Bayes]]

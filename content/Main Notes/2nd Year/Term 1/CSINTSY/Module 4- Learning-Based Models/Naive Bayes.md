---
id: naive_bayes
type: note
course: CSINTSY
topic: Naive Bayes
status: completed
---

# Naive Bayes

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Naive Bayes]] #[[Problem Solving]] #[[M4]]

---

## Overview

Naive Bayes is a statistical supervised learning model that leverages Bayes' Theorem for classification. The core assumption that makes the model "naive" is the assumption of conditional independence between all input features given the target class. Even though features are rarely completely independent in real life, this assumption greatly simplifies computation and often works surprisingly well.

**Bayes' Theorem Framework:**
**Prior:** The probability of a target class occurring, $P(\text{Class})$.
**Likelihood:** The probability of observing the features given a target class.
**Evidence/Marginal:** The total probability of observing the features, which is often ignored during classification since it's the same across all target classes.
**Posterior:** The final computed probability of a class given the features.

## Important Formulas

**Bayes' Theorem:**
$$ P(T | F) = \frac{P(F | T)P(T)}{P(F)} $$
Where $T$ is the target class and $F$ is the observed features.

**Naive Bayes Assumption (Feature Independence):**
For features $X_1, X_2, \dots, X_d$:
$$ P(X_1, X_2, \dots, X_d | T) = P(X_1 | T) \times P(X_2 | T) \times \dots \times P(X_d | T) $$

**Continuous Features (Gaussian Naive Bayes):**
For numerical features, the likelihood is computed using the probability density function of a normal distribution defined by the mean $\mu$ and standard deviation $\sigma$ of the feature for that class.

## Worked Examples

**Categorical Classification:**
Given training data for student grades and study hours predicting a pass/fail outcome.
1. Compute Prior for passing: $P(Pass) = \frac{N_{pass}}{N_{total}}$
2. Compute Likelihood of features for a Pass: $P(\text{Math=Bad} | Pass) \times P(\text{Study} \ge 4 | Pass)$
3. Calculate posterior score by multiplying Prior and Likelihood. Repeat for the Fail class. Predict the class with the highest score.

## Multiple Choice Questions

1. What makes the Naive Bayes algorithm "naive"?
    - **A)** It assumes all data points belong to the same class initially.
    - **B)** It assumes that all input features are conditionally independent of each other given the target class.
    - **C)** It only works on binary classification problems.
    - **D)** It assumes prior probabilities are always equal.

2. In the Bayes' Theorem framework, what does the "Prior" probability represent?
    - **A)** The initial probability of a target class occurring, regardless of the features.
    - **B)** The probability of the observed features occurring given a target class.
    - **C)** The final computed probability used to make a prediction.
    - **D)** The overall probability of the features occurring across all classes.

3. Why is the "Evidence/Marginal" probability ($P(F)$) often ignored during classification using Naive Bayes?
    - **A)** Because it evaluates to zero for most datasets.
    - **B)** Because computing it violates the independence assumption.
    - **C)** Because it requires knowing the test labels beforehand.
    - **D)** Because it is a constant denominator across all classes being compared, so it doesn't affect which class has the highest score.

4. How does Gaussian Naive Bayes calculate the likelihood for continuous, numerical features?
    - **A)** By converting all numerical values into discrete "bins" before calculation.
    - **B)** By ignoring numerical features and only computing categorical ones.
    - **C)** By applying a uniform probability distribution.
    - **D)** By using the probability density function of a normal distribution defined by the feature's mean and standard deviation.

5. When combining multiple feature likelihoods in Naive Bayes, which mathematical operation is primarily used based on the independence assumption?
    - **A)** Addition
    - **B)** Multiplication
    - **C)** Subtraction
    - **D)** Division

### Answer Key & Explanations

1. **B**. The "naive" assumption is that every feature is completely independent of every other feature, a simplifying assumption rarely true in real life.
2. **A**. The Prior ($P(T)$) represents the historical or baseline probability of a class before observing any specific data evidence.
3. **D**. Since we want to find the class with the maximum probability, and $P(F)$ is exactly the same for all classes, we can safely drop it from the comparison.
4. **D**. Gaussian Naive Bayes models numerical features using a bell curve (normal distribution), relying on the mean and variance to estimate likelihoods.
5. **B**. Because of conditional independence, the joint probability of all features is the mathematical product (multiplication) of their individual conditional probabilities.

## References & Navigation

- **Previous Topic:** [[Decision Trees]]
- **Next Topic:** [[K-Means Clustering]]
- **Related Notes:** [[Naive Bayes]], [[Bayesian Inference]]

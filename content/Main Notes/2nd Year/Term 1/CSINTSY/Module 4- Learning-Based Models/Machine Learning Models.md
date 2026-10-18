---
id: machine_learning_models
type: note
course: CSINTSY
topic: Machine Learning Models
status: completed
---

# Machine Learning Models

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Machine Learning Models]] #[[Code Snippets]] #[[M4]]

---

## Overview

Unlike traditional AI (symbolic AI) that uses a top-down approach by modeling rules to process data, Machine Learning employs a bottom-up approach. It feeds data and expected outputs into an algorithm to discover the underlying rules. A machine learning model acts as a hypothesis function that transforms input features $X$ into an output $y$.

**Types of Machine Learning:**
1. **Supervised Learning**: Models learn from labeled data to predict target variables.
*Classification*: Predicts categorical variables (e.g., binary, multi-class).
*Regression*: Predicts continuous/numerical variables.
2. **Unsupervised Learning**: Models identify patterns from data without labels (e.g., clustering).

**Training Pipeline:**
Data collection $\rightarrow$ Preprocessing $\rightarrow$ Train/Test split $\rightarrow$ Model training $\rightarrow$ Evaluation.
Models are evaluated on a test set to ensure they generalize well to unseen data.

## Code Implementation
*(No direct code provided, but the process involves dataset splitting, defining the model, and evaluation.)*

## Syntax Breakdown
*(Not applicable)*

## Complexity Analysis
**Evaluation Metrics:**
**Classification:** 
Accuracy: $\frac{TP + TN}{TP + TN + FP + FN}$
Precision: $\frac{TP}{TP + FP}$
Recall: $\frac{TP}{TP + FN}$
F1-Score: Harmonic mean of precision and recall.
**Regression:** 
Mean Squared Error (MSE)
Root Mean Squared Error (RMSE)

**Cross-Validation:** K-Fold cross-validation divides the dataset into $K$ parts, using $K-1$ for training and $1$ for testing, repeating $K$ times and averaging the performance.

## Multiple Choice Questions

1. How does Machine Learning primarily differ from traditional (symbolic) AI?
    - **A)** ML models rules explicitly from the top-down to process data.
    - **B)** ML uses a bottom-up approach, taking data and outputs to discover underlying rules automatically.
    - **C)** ML relies entirely on logic programming languages.
    - **D)** ML can only be applied to text-based data, whereas traditional AI handles images.

2. In supervised learning, what is the key difference between classification and regression tasks?
    - **A)** Classification predicts continuous variables, while regression groups unlabeled data.
    - **B)** Classification groups data without labels, while regression uses labeled data.
    - **C)** Classification predicts categorical variables (classes), while regression predicts continuous numerical variables.
    - **D)** Classification uses K-Fold cross-validation, while regression relies on Accuracy.

3. Which evaluation metric is specifically defined as the harmonic mean of precision and recall?
    - **A)** Accuracy
    - **B)** Mean Squared Error (MSE)
    - **C)** Root Mean Squared Error (RMSE)
    - **D)** F1-Score

4. What is the primary purpose of splitting a dataset into training and testing sets?
    - **A)** To ensure the model evaluates fast enough on production hardware.
    - **B)** To evaluate how well the trained model generalizes to unseen data.
    - **C)** To double the amount of data the algorithm can learn from.
    - **D)** To convert unsupervised data into supervised labels.

5. How does K-Fold Cross-Validation operate?
    - **A)** It trains $K$ separate models and discards the worst performing ones.
    - **B)** It divides the data into $K$ parts, using $K-1$ parts for training and 1 part for testing, repeating this process $K$ times.
    - **C)** It repeats the training process exactly $K$ times on the exact same train/test split to ensure stability.
    - **D)** It applies $K$ different algorithms to the data to find the best fit.

### Answer Key & Explanations

1. **B**. Traditional AI manually defines rules to generate answers, while ML feeds answers and data into an algorithm to figure out the rules.
2. **C**. Classification assigns data into discrete categories (e.g., spam or not spam), whereas regression predicts a quantity (e.g., price).
3. **D**. The F1-Score is mathematically defined as the harmonic mean of precision and recall, balancing both metrics.
4. **B**. Testing on unseen data prevents the model from just memorizing the training set, verifying its ability to generalize.
5. **B**. K-Fold rotates which fold acts as the test set over $K$ iterations, ensuring every data point is tested exactly once and training occurs on maximum data.

## References & Navigation

- **Previous Topic:** [[Adversarial Games]]
- **Next Topic:** [[Decision Trees]]
- **Related Notes:** [[Machine Learning]], [[Data Representation]]

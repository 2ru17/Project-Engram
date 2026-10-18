---
id: 05_Machine_Learning
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 05_Machine_Learning

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Machine Learning (ML) is a field of AI where computers learn from data without being explicitly programmed for specific tasks.

## Details / Theory

# 5. Machine Learning Reviewer

## Overview

**Machine Learning (ML)** is a field of AI where computers learn from data without being explicitly programmed for specific tasks.

## Types of Machine Learning

### 1. Supervised Learning
 **Data**: Labeled dataset. Input ($X$) and correct Output ($Y$) are provided. **Goal**: Learn a mapping function $Y = f(X)$ to predict outputs for new inputs. **Examples**:
**Classification**: Predicting a category (e.g., Spam vs. Not Spam, Dog vs. Cat).
**Regression**: Predicting a continuous value (e.g., House Price, Temperature). **Algorithms**: Decision Trees, Naive Bayes, Linear Regression, Support Vector Machines.

### 2. Unsupervised Learning
 **Data**: Unlabeled dataset. Only Input ($X$) is provided. **Goal**: Find hidden structures or patterns in the data. **Examples**:
**Clustering**: Grouping similar data points (e.g., Customer Segmentation).
**Dimensionality Reduction**: Simplifying data while keeping important info. **Algorithms**: K-Means Clustering, PCA.

### 3. Reinforcement Learning
 **Data**: Interaction with an environment (States, Actions, Rewards). **Goal**: Learn a policy to maximize cumulative reward. **Examples**: Game playing (Chess, Mario), Robot control. **Algorithms**: Q-Learning.

## Evaluation Metrics (for Classification)

### Confusion Matrix

A table comparing predicted vs. actual labels.

|                         | Predicted Positive (PP) | Predicted Negative (PN) |
| :---------------------- | :---------------------: | :---------------------: |
| **Actual Positive (P)** | **True Positive (TP)**  | **False Negative (FN)** |
| **Actual Negative (N)** | **False Positive (FP)** | **True Negative (TN)**  |
 **TP**: Correctly predicted positive. **TN**: Correctly predicted negative. **FP**: Incorrectly predicted positive (Type I Error). **FN**: Incorrectly predicted negative (Type II Error).

### Formulas

1.  **Accuracy**: Overall correctness.
    $$ \text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN} $$
_Warning_: Misleading for imbalanced datasets (e.g., 99% benign, 1% cancer).

2.  **Precision**: Quality of positive predictions. "Of all the ones I labeled positive, how many were actually positive?"
    $$ \text{Precision} = \frac{TP}{TP + FP} $$

3.  **Recall** (Sensitivity): Coverage of actual positives. "Of all the actual positives, how many did I find?"
    $$ \text{Recall} = \frac{TP}{TP + FN} $$

4.  **F1 Score**: Harmonic mean of Precision and Recall. Balances both.
    $$ F1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} $$

## Feature Engineering

The process of using domain knowledge to extract features from raw data.
 **Feature Selection**: Choosing the most relevant features (e.g., removing irrelevant columns). **Feature Extraction**: Creating new features (e.g., calculating BMI from Height and Weight). **One-Hot Encoding**: Converting categorical data (Red, Blue) into binary vectors (Red=[1,0], Blue=[0,1]). **TF-IDF**: A statistical measure used in text mining to evaluate how important a word is to a document in a collection.

## Solved Example: Calculating Metrics

**Scenario**: A model predicts whether an email is Spam (Positive) or Not Spam (Negative).
**Confusion Matrix**:
 **TP** (Spam correctly identified): 80 **TN** (Not Spam correctly identified): 900 **FP** (Not Spam labeled as Spam): 20 **FN** (Spam labeled as Not Spam): 10

**Calculations**:

1.  **Accuracy**:
    $$ \frac{TP + TN}{Total} = \frac{80 + 900}{80 + 900 + 20 + 10} = \frac{980}{1010} \approx 0.97 \text{ or } 97\% $$

2.  **Precision** (for Spam):
    $$ \frac{TP}{TP + FP} = \frac{80}{80 + 20} = \frac{80}{100} = 0.80 \text{ or } 80\% $$
_Interpretation_: When the model says "Spam", it is correct 80% of the time.

3.  **Recall** (for Spam):
    $$ \frac{TP}{TP + FN} = \frac{80}{80 + 10} = \frac{80}{90} \approx 0.89 \text{ or } 89\% $$
_Interpretation_: The model catches 89% of all actual spam emails.

4.  **F1 Score**:
    $$ 2 \times \frac{0.80 \times 0.89}{0.80 + 0.89} = 2 \times \frac{0.712}{1.69} \approx 2 \times 0.421 = 0.842 $$

---

---

## Common Pitfalls
 Confusing **accuracy** (overall correct) with **precision** (correct among predicted positive) and **recall** (correct among actual positive). Using accuracy alone on imbalanced datasets — F1 score gives a better picture. Mixing up supervised (labeled data), unsupervised (no labels), and reinforcement (reward signals) learning paradigms.

## Summary

> TL;DR — ML splits into supervised (classification/regression), unsupervised (clustering), and reinforcement learning. Evaluation uses confusion matrices to compute accuracy, precision, recall, and F1 score. Feature engineering and proper train/test splits are essential.

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. In supervised learning, what kind of data is provided to the algorithm?
    - **A)** Only unlabeled input data
    - **B)** A labeled dataset containing both input features and correct outputs
    - **C)** Raw environmental interactions with reward signals
    - **D)** An entirely randomized set of noise data

2. Which task is an example of regression in supervised learning?
    - **A)** Identifying an image as a dog or cat
    - **B)** Predicting the exact continuous price of a house
    - **C)** Grouping customers into distinct segments
    - **D)** Filtering spam emails from a inbox

3. What is the main objective of unsupervised learning?
    - **A)** To maximize cumulative rewards through actions
    - **B)** To learn a mapping from inputs to predefined labels
    - **C)** To find hidden structures or patterns in unlabeled data
    - **D)** To classify data into positive and negative classes

4. Which machine learning paradigm involves an agent interacting with an environment to maximize cumulative reward?
    - **A)** Reinforcement Learning
    - **B)** Dimensionality Reduction
    - **C)** Supervised Classification
    - **D)** Unsupervised Clustering

5. In a confusion matrix, what does a False Positive (FP) represent?
    - **A)** An instance that is actually positive but predicted as negative
    - **B)** An instance that is actually negative but incorrectly predicted as positive
    - **C)** An instance correctly predicted as positive
    - **D)** An instance correctly predicted as negative

6. Why might "Accuracy" be a misleading metric for evaluating a classification model?
    - **A)** It ignores True Negatives entirely.
    - **B)** It is mathematically complex to compute.
    - **C)** It can appear high on highly imbalanced datasets even if the model performs poorly on the minority class.
    - **D)** It only measures how well the model predicts the negative class.

7. Which metric specifically answers the question: "Of all the actual positives in the dataset, how many did the model successfully find?"
    - **A)** Precision
    - **B)** Recall (Sensitivity)
    - **C)** Accuracy
    - **D)** The F1 Score

8. What is the purpose of the F1 Score?
    - **A)** To provide a metric that solely focuses on False Positives.
    - **B)** To provide the arithmetic mean of Accuracy and Recall.
    - **C)** To act as a harmonic mean that balances both Precision and Recall.
    - **D)** To substitute for the confusion matrix entirely.

9. In feature engineering, what does One-Hot Encoding accomplish?
    - **A)** It removes irrelevant features from the dataset.
    - **B)** It converts categorical data into binary vectors.
    - **C)** It extracts the frequency of words in text data.
    - **D)** It clusters numerical data into continuous ranges.

10. What is TF-IDF primarily used for?
    - **A)** Training Reinforcement Learning agents.
    - **B)** Converting categorical labels to binary numbers.
    - **C)** Reducing the dimensionality of image datasets.
    - **D)** Evaluating how important a word is to a document in text mining.

### Answer Key & Explanations

1. **B**. Supervised learning relies on labeled datasets where both the input ($X$) and correct output ($Y$) are provided.
2. **B**. Regression is the task of predicting a continuous value, such as a house price or temperature.
3. **C**. Unsupervised learning works with unlabeled data to discover hidden structures, such as clusters or groups.
4. **A**. Reinforcement learning trains agents to make sequences of decisions to maximize a cumulative reward signal from the environment.
5. **B**. A False Positive is a Type I Error, where the model incorrectly predicts the positive class for an actual negative instance.
6. **C**. Accuracy can be misleading for imbalanced datasets (e.g., 99% benign, 1% cancer) because predicting everything as the majority class still yields 99% accuracy.
7. **B**. Recall (Sensitivity) measures the coverage of actual positives, calculated as $TP / (TP + FN)$.
8. **C**. The F1 Score is the harmonic mean of Precision and Recall, offering a single balanced metric.
9. **B**. One-Hot Encoding is a feature engineering technique that converts categorical data (e.g., Red, Blue) into binary vectors.
10. **D**. TF-IDF (Term Frequency-Inverse Document Frequency) is a statistical measure used in text mining to weigh the importance of words.

## References & Navigation

- **Previous Topic:** [[Adversarial Games]]
- **Next Topic:** [[Decision Tree]]
- **Related Notes:** [[Machine Learning Models]]

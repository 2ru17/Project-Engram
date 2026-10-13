---
id: 06_Decision_Tree
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 06_Decision_Tree

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> A Decision Tree is a supervised learning model used for classification and regression. It predicts the value of a target variable by learning simpl...

## Details / Theory

# 6. Decision Tree Reviewer

## Overview

A **Decision Tree** is a supervised learning model used for classification and regression. It predicts the value of a target variable by learning simple decision rules inferred from the data features. It looks like a flowchart structure.

## Structure
 **Root Node**: The top-most node that represents the entire dataset. It is the first decision point. **Internal Nodes**: Decision points that test an attribute (e.g., "Is it raining?"). Each branch represents the outcome of the test (e.g., "Yes" or "No"). **Leaf Nodes**: Terminal nodes that represent the final outcome or class label (e.g., "Play Tennis" or "Don't Play").

## How it Works

1.  Start at the root node.
2.  Test the attribute specified by the node.
3.  Move down the branch corresponding to the value of the attribute.
4.  Repeat until a leaf node is reached.
5.  Return the class label of the leaf node.

## Splitting Criteria

How do we choose which attribute to split on? We want the attribute that best separates the data into pure classes.

### Gini Index (Impurity)
 **Definition**: A measure of how often a randomly chosen element from the set would be incorrectly labeled if it was randomly labeled according to the distribution of labels in the subset. **Goal**: Minimize the Gini Index. A Gini Index of 0 means the node is pure (all elements belong to the same class). **Formula**:
  $$ Gini(D) = 1 - \sum\_{i=1}^{c} (p_i)^2 $$
$D$: The dataset at the node.
$c$: Number of classes.
$p_i$: Probability (proportion) of class $i$ in $D$.

### Example Calculation

Suppose a node has 5 examples: 3 Positive (+), 2 Negative (-).
 $p(+) = 3/5 = 0.6$ $p(-) = 2/5 = 0.4$ $Gini = 1 - (0.6^2 + 0.4^2) = 1 - (0.36 + 0.16) = 1 - 0.52 = 0.48$

### Weighted Gini Index (for a split)

When splitting a parent node into children nodes, we calculate the weighted average of the Gini Impurity of the children.
$$ Gini*{split} = \sum \frac{N*{child}}{N\_{parent}} \times Gini(child) $$
 We choose the attribute that produces the **lowest** weighted Gini index.

## Overfitting
 **Problem**: Trees can become very deep and complex, memorizing the training data (including noise). This leads to poor performance on new data. **Solutions**:
**Pruning**: Removing branches that provide little power.
**Max Depth**: Limiting how deep the tree can grow.
**Min Samples Split**: Requiring a minimum number of samples to create a split.

## Solved Example: Choosing the Best Split

**Dataset**: 10 Students.
 Target: **Passed** (6 Yes, 4 No). Feature A: **Studied** (Yes/No).
Studied=Yes: 5 Students (5 Passed, 0 Failed).
Studied=No: 5 Students (1 Passed, 4 Failed).

**Step 1: Calculate Gini of Parent (Root)**
 $P(Pass) = 6/10 = 0.6$ $P(Fail) = 4/10 = 0.4$ $Gini(Parent) = 1 - (0.6^2 + 0.4^2) = 1 - (0.36 + 0.16) = 0.48$

**Step 2: Calculate Gini of Split on "Studied"**
 **Left Node (Studied=Yes)**:
Total: 5. Pass: 5. Fail: 0.
$Gini(Yes) = 1 - ((5/5)^2 + (0/5)^2) = 1 - (1 + 0) = 0$. (Pure node!)
 **Right Node (Studied=No)**:
Total: 5. Pass: 1. Fail: 4.
$Gini(No) = 1 - ((1/5)^2 + (4/5)^2) = 1 - (0.04 + 0.64) = 1 - 0.68 = 0.32$.

**Step 3: Calculate Weighted Gini for Split**
$$ Gini\_{split} = \frac{5}{10}(0) + \frac{5}{10}(0.32) = 0 + 0.16 = 0.16 $$

**Conclusion**:
The Gini dropped from **0.48** (Parent) to **0.16** (Split). This is a huge improvement (Information Gain), so "Studied" is a very good feature to split on.

---

---

## Common Pitfalls
 Confusing Gini Index (impurity) with information gain (entropy-based) — both measure split quality but use different formulas. Forgetting to use **weighted** Gini when child nodes have different sample sizes. Overfitting by growing the tree too deep — use pruning or maximum depth limits.

## Summary

> TL;DR — Decision trees split data recursively by choosing the attribute that minimizes impurity (Gini Index) or maximizes information gain. The best split creates the most homogeneous child nodes. Pruning prevents overfitting.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What is the primary purpose of a Decision Tree in machine learning?
    - **A)** Unsupervised clustering of unlabeled data.
    - **B)** Supervised learning for classification and regression tasks.
    - **C)** Dimensionality reduction and feature extraction.
    - **D)** To model continuous time-series data without decision points.

2. In a decision tree structure, what does a leaf node represent?
    - **A)** The first decision point for the entire dataset.
    - **B)** A test applied to an attribute to split the data.
    - **C)** A terminal node that represents the final outcome or class label.
    - **D)** A branch connecting two internal nodes.

3. Which of the following best describes the Gini Index?
    - **A)** A measure of how deep a decision tree can grow before overfitting.
    - **B)** The minimum number of samples required to create a leaf node.
    - **C)** A metric used to maximize the number of branches in a tree.
    - **D)** A measure of impurity used to evaluate the quality of a split.

4. What does a Gini Index of 0 indicate about a node?
    - **A)** The node is perfectly pure, meaning all elements belong to the same class.
    - **B)** The node contains an equal number of elements from all classes.
    - **C)** The node cannot be split any further due to depth limits.
    - **D)** The node has no data points left to evaluate.

5. How do you decide which attribute is best to split on?
    - **A)** Choose the attribute that produces the highest weighted Gini Index.
    - **B)** Choose the attribute that produces the lowest weighted Gini Index.
    - **C)** Choose the attribute with the most possible values.
    - **D)** Choose the attribute that balances the tree perfectly.

6. If a node has 4 elements, where 2 belong to Class A and 2 belong to Class B, what is its Gini Index?
    - **A)** 0.0
    - **B)** 0.25
    - **C)** 0.5
    - **D)** 1.0

7. What is a major problem caused by decision trees growing too deep?
    - **A)** They fail to memorize the training data.
    - **B)** They begin to overfit by memorizing the training data, including noise.
    - **C)** They underfit the training data and fail to find patterns.
    - **D)** The Gini Index becomes negative.

8. Which of the following is NOT a technique to prevent overfitting in decision trees?
    - **A)** Pruning branches that provide little predictive power.
    - **B)** Setting a maximum depth for the tree.
    - **C)** Forcing the tree to split until all leaf nodes have a Gini Index of 0.
    - **D)** Requiring a minimum number of samples to split a node.

9. Why is a weighted Gini Index used when evaluating a split?
    - **A)** Because parent nodes always have more impurity than child nodes.
    - **B)** To account for child nodes that have different sample sizes.
    - **C)** To penalize attributes that create only two branches.
    - **D)** Because it prevents the tree from overfitting the noise.

10. In a decision tree, an internal node functions as:
    - **A)** The final prediction for a subset of data.
    - **B)** The origin point of the entire dataset.
    - **C)** A decision point that tests a specific attribute.
    - **D)** A measure of entropy.

### Answer Key & Explanations
1. **B)** A decision tree is a supervised learning model that is primarily used for predicting values in classification and regression problems.
2. **C)** Leaf nodes are the terminal nodes at the end of the tree and signify the final predicted outcome or class label.
3. **D)** The Gini Index measures how often a randomly chosen element would be incorrectly labeled, serving as a measure of a node's impurity.
4. **A)** A Gini Index of 0 means there is zero impurity; all items in that node belong to exactly one class.
5. **B)** The goal is to minimize impurity, so the attribute that produces the lowest weighted Gini Index for the resulting children is chosen as the split.
6. **C)** The probabilities are 0.5 for Class A and 0.5 for Class B. The formula is $1 - (0.5^2 + 0.5^2) = 1 - 0.5 = 0.5$.
7. **B)** Overly deep trees memorize the training set perfectly (including noise), which is known as overfitting and hurts performance on new data.
8. **C)** Forcing all leaves to be perfectly pure (Gini=0) often leads to fully overgrown trees, which causes overfitting rather than preventing it.
9. **B)** The weighted Gini Index takes the proportion of samples at each child node into account because child nodes often receive unequal portions of the parent's data.
10. **C)** Internal nodes represent intermediate decision points where the data is tested against a specific attribute before moving down a branch.

## References & Navigation

- **Previous Topic:** [[Machine Learning]]
- **Next Topic:** [[Naive Bayes]]
- **Related Notes:** [[Decision Trees]]

---
id: 08_K_Means_Clustering
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 08_K_Means_Clustering

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> K-Means Clustering is an unsupervised learning algorithm that partitions a dataset into $k$ distinct, non-overlapping subgroups (clusters).

## Details / Theory

# 8. K-Means Clustering Reviewer

## Overview

**K-Means Clustering** is an **unsupervised learning** algorithm that partitions a dataset into $k$ distinct, non-overlapping subgroups (clusters).

## Goal

To group similar data points together such that:

1.  Data points within the same cluster are as similar as possible (minimize intra-cluster distance).
2.  Data points in different clusters are as different as possible (maximize inter-cluster distance).

## Algorithm Steps

1.  **Initialize**: Choose $k$ (the number of clusters). Select $k$ random data points as initial **centroids** (center of the cluster).
2.  **Assign**: For every data point in the dataset, calculate its distance to each centroid. Assign the point to the cluster with the nearest centroid.
3.  **Update**: Recalculate the new centroids. The new centroid of a cluster is the **mean** (average) position of all points assigned to that cluster.
4.  **Repeat**: Repeat steps 2 and 3 until **convergence**:
Centroids do not change position.
Or points do not change clusters.
Or a maximum number of iterations is reached.

## Solved Example: 1-Dimensional Clustering

**Dataset**: Points on a line: $2, 3, 10, 11, 12$.
**K = 2**.

**Iteration 1**:

1.  **Initialize Centroids**: Randomly pick $C_1 = 2$ and $C_2 = 10$.
2.  **Assign Points**:
Point 2: $|2-2|=0$ (Near $C_1$), $|2-10|=8$. $\to$ Cluster 1.
Point 3: $|3-2|=1$ (Near $C_1$), $|3-10|=7$. $\to$ Cluster 1.
Point 10: $|10-2|=8$, $|10-10|=0$ (Near $C_2$). $\to$ Cluster 2.
Point 11: $|11-2|=9$, $|11-10|=1$ (Near $C_2$). $\to$ Cluster 2.
Point 12: $|12-2|=10$, $|12-10|=2$ (Near $C_2$). $\to$ Cluster 2.
**Clusters**: $K_1=\{2, 3\}$, $K_2=\{10, 11, 12\}$.
3.  **Update Centroids**:
New $C_1 = \text{mean}(2, 3) = 2.5$.
New $C_2 = \text{mean}(10, 11, 12) = 11$.

**Iteration 2**:

1.  **Assign Points** (using new centroids 2.5 and 11):
Point 2: $|2-2.5|=0.5$, $|2-11|=9$. $\to$ Cluster 1.
Point 3: $|3-2.5|=0.5$, $|3-11|=8$. $\to$ Cluster 1.
Point 10: $|10-2.5|=7.5$, $|10-11|=1$. $\to$ Cluster 2.
Point 11: $|11-2.5|=8.5$, $|11-11|=0$. $\to$ Cluster 2.
Point 12: $|12-2.5|=9.5$, $|12-11|=1$. $\to$ Cluster 2.
2.  **Check Convergence**:
Clusters are still $K_1=\{2, 3\}$ and $K_2=\{10, 11, 12\}$.
No change in assignment. **Converged!**

**Final Clusters**: $\{2, 3\}$ and $\{10, 11, 12\}$.

## Distance Measures

How do we measure "nearest"?
 **Euclidean Distance**: The straight-line distance between two points. Most common.
  $$ d(p, q) = \sqrt{\sum\_{i=1}^{n} (q_i - p_i)^2} $$ **Manhattan Distance**: The sum of absolute differences. Used for grid-like paths.
  $$ d(p, q) = \sum\_{i=1}^{n} |q_i - p_i| $$

## Choosing K (Elbow Method)

How do we know the best number of clusters ($k$)?

1.  Run K-Means for a range of $k$ values (e.g., 1 to 10).
2.  Calculate the **Inertia** (Sum of Squared Errors - SSE) for each $k$. This measures how spread out the clusters are (lower is better).
3.  Plot Inertia vs. $k$.
4.  Look for the **"Elbow"**: The point where the inertia starts decreasing slowly. This is usually the optimal $k$.

---

## Common Pitfalls
 Sensitive to **initial centroid placement** — different initializations can yield different clusters. Assuming K-Means works well with non-spherical or unequal-variance clusters — it assumes roughly equal-sized, spherical clusters. Choosing $k$ arbitrarily — use the **Elbow Method** (plot SSE vs. $k$) to find a reasonable number of clusters.

## Summary

> TL;DR — K-Means iteratively assigns points to the nearest centroid (using Euclidean or Manhattan distance) and updates centroids as cluster means until convergence. Use the Elbow Method to select $k$.

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. K-Means Clustering is primarily classified as what type of algorithm?
    - **A)** Supervised Learning
    - **B)** Unsupervised Learning
    - **C)** Reinforcement Learning
    - **D)** Semi-supervised Learning

2. What is the main objective of K-Means Clustering regarding distances?
    - **A)** Maximize intra-cluster distance and minimize inter-cluster distance.
    - **B)** Minimize both intra-cluster and inter-cluster distances.
    - **C)** Maximize both intra-cluster and inter-cluster distances.
    - **D)** Minimize intra-cluster distance and maximize inter-cluster distance.

3. In the K-Means algorithm, what does the value $k$ represent?
    - **A)** The number of iterations to run.
    - **B)** The number of features in the dataset.
    - **C)** The number of distinct clusters to form.
    - **D)** The maximum allowed distance between two points.

4. During the "Update" step of the K-Means algorithm, how is the new centroid calculated?
    - **A)** By finding the median of all points in the dataset.
    - **B)** By taking the mean (average) position of all points assigned to that cluster.
    - **C)** By choosing the data point closest to the previous centroid.
    - **D)** By selecting a completely random point in the feature space.

5. Which condition does NOT typically signify the convergence of the K-Means algorithm?
    - **A)** Centroids do not change their positions.
    - **B)** Points do not change their cluster assignments.
    - **C)** A maximum number of predefined iterations is reached.
    - **D)** The sum of squared errors drops to exactly zero.

6. Which distance metric calculates the straight-line distance between two points?
    - **A)** Manhattan Distance
    - **B)** Minkowski Distance
    - **C)** Euclidean Distance
    - **D)** Chebyshev Distance

7. Which method is commonly used to determine the optimal number of clusters ($k$)?
    - **A)** The Gradient Descent Method
    - **B)** The Gini Index
    - **C)** The Elbow Method
    - **D)** The Minimax Algorithm

8. What does "Inertia" (Sum of Squared Errors) measure in K-Means clustering?
    - **A)** How spread out the clusters are.
    - **B)** The distance between the furthest two centroids.
    - **C)** The number of data points assigned to the wrong cluster.
    - **D)** The total number of iterations taken to converge.

9. What is a known pitfall of the K-Means Clustering algorithm?
    - **A)** It always converges to the global optimum regardless of initialization.
    - **B)** It is highly sensitive to the initial placement of centroids.
    - **C)** It automatically determines the optimal number of clusters $k$.
    - **D)** It works perfectly with non-spherical and unequal-variance clusters.

10. When using the Elbow Method, what are you looking for on the plot of Inertia vs. $k$?
    - **A)** The point where the inertia increases sharply.
    - **B)** The highest possible value of inertia.
    - **C)** The point where the inertia starts decreasing slowly.
    - **D)** The point where $k$ equals the number of data points.

### Answer Key & Explanations

1. **B**. K-Means is an unsupervised learning algorithm because it works with unlabeled data to find hidden subgroups.
2. **D**. The goal is to group similar items closely together (minimize intra-cluster distance) and separate different groups as much as possible (maximize inter-cluster distance).
3. **C**. The parameter $k$ dictates the number of distinct, non-overlapping clusters the dataset will be partitioned into.
4. **B**. The centroid is updated by taking the mathematical mean of all the data points currently assigned to its cluster.
5. **D**. Convergence means the assignments or centroids stop changing, or a limit is hit; SSE almost never reaches exactly zero unless every point is a centroid.
6. **C**. Euclidean distance measures the standard straight-line distance between points.
7. **C**. The Elbow Method involves plotting Inertia vs. $k$ and finding the "elbow" to choose the optimal number of clusters.
8. **A**. Inertia (SSE) measures the sum of squared distances from each point to its assigned centroid, indicating cluster spread.
9. **B**. Different initial random placements of centroids can lead to different final clusters, which is why it is often run multiple times.
10. **C**. The "elbow" is the point on the graph where the rate of decrease in inertia slows down significantly, suggesting diminishing returns for adding more clusters.

## References & Navigation

- **Previous Topic:** [[Naive Bayes]]
- **Next Topic:** [[MDP]]
- **Related Notes:** [[K-Means Clustering]]

---
id: k-means_clustering
type: note
course: CSINTSY
topic: K-Means Clustering
status: completed
---

# K-Means Clustering

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSINTSY]] #[[K-Means Clustering]] #[[Problem Solving]] #[[M4]]

---

## Overview

K-Means Clustering is an unsupervised machine learning algorithm designed to partition a dataset into $k$ distinct, non-overlapping groups (clusters) based on feature similarity. It is particularly effective with numerical features where distance metrics can be applied. The number of clusters $k$ is a hyperparameter that must be manually defined prior to running the algorithm.

**Algorithm Steps:**
1. Decide the number of clusters, $k$.
2. Initialize $k$ random centroids.
3. Assign each data point to the cluster of the nearest centroid (using Euclidean distance).
4. Recompute the centroids by taking the mean of all points assigned to each cluster.
5. Repeat steps 3 and 4 until convergence (i.e., until assignments no longer change).

**Choosing $k$:**
A higher $k$ is not necessarily better. Strategies for selecting an appropriate $k$ include: Utilizing domain knowledge. The **Elbow Method**, where the model's Inertia is plotted against various $k$ values, and the "elbow" point is chosen as the optimal $k$.

## Important Formulas

**Inertia (Within-Cluster Sum of Squares):**
A metric to measure cluster quality (lower is better, meaning tighter clusters).
$$ \text{Inertia} = \sum_{i=1}^{k} \sum_{x \in C_i} (x - \mu_i)^2 $$
Where $C_i$ is cluster $i$ and $\mu_i$ is the centroid of $C_i$.

## Worked Examples

**Algorithm Walkthrough:**
Imagine a dataset with numerical features for temperature and humidity.  Initialize $k=2$ random points in this 2D space. Calculate the Euclidean distance of all data points to these two centroids. Assign points to the closest centroid. Shift the centroids to the average position of their respective assigned points. Repeat the assignment and shifting until the centroids no longer move. The final groupings represent the clusters.

## Multiple Choice Questions

1. Which category of machine learning does K-Means Clustering belong to?
    - **A)** Supervised Learning
    - **B)** Reinforcement Learning
    - **C)** Unsupervised Learning
    - **D)** Semi-Supervised Learning

2. What is the primary role of the hyperparameter $k$ in the K-Means algorithm?
    - **A)** It defines the number of features in the dataset.
    - **B)** It specifies the number of distinct, non-overlapping clusters to form.
    - **C)** It determines the maximum number of iterations before the algorithm stops.
    - **D)** It acts as the learning rate for updating centroids.

3. During the K-Means algorithm execution, how are data points assigned to clusters?
    - **A)** By calculating the Euclidean distance to the nearest centroid.
    - **B)** By picking a cluster at random for each iteration.
    - **C)** By evaluating the target label of the data point.
    - **D)** By sorting the data points and dividing them evenly into $k$ groups.

4. What does the "Inertia" (Within-Cluster Sum of Squares) metric measure in K-Means clustering?
    - **A)** The distance between different cluster centroids.
    - **B)** The algorithm's computational execution time.
    - **C)** The total number of points successfully assigned to clusters.
    - **D)** Cluster quality, by calculating the sum of squared distances of samples to their closest cluster center.

5. How is the "Elbow Method" used to select the optimal number of clusters $k$?
    - **A)** By finding the $k$ value that maximizes Inertia.
    - **B)** By plotting Inertia against various $k$ values and selecting the point where the rate of decrease sharply shifts.
    - **C)** By testing random $k$ values until a specific target Inertia is reached.
    - **D)** By visually inspecting the dataset in a 3D scatter plot.

### Answer Key & Explanations
1. **C)** K-Means is an unsupervised learning algorithm because it works with unlabeled data to find hidden structures (clusters).
2. **B)** $k$ represents the user-defined number of partitions or groups the algorithm must divide the data into.
3. **A)** Data points are assigned to the cluster of the centroid that is closest to them, typically using Euclidean distance.
4. **D)** Inertia measures how tightly grouped the clusters are; lower inertia indicates that points are very close to their centroids.
5. **B)** The Elbow Method visualizes the trade-off between increasing $k$ (which naturally lowers inertia) and overfitting, choosing the "elbow" where adding more clusters yields diminishing returns.

## References & Navigation

- **Previous Topic:** [[Naive Bayes]]
- **Next Topic:** [[Expert Systems Overview]]
- **Related Notes:** [[K Means Clustering]], [[Clustering]]

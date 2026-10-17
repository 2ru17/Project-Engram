---
id: Mock-Exam-3
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

# Mock Exam 3

## Overview

> This third mock examination assesses mastery of probability models, information retrieval, NLP preprocessing (stemming vs. lemmatization), association rule mining, and optimization functions.

## Exam Questions

**1.** A bowl contains 6 red apples and 20 green apples. What is the chance of randomly picking a red apple?
- **A)** 3/13
- **B)** 1/4
- **C)** 3/52
- **D)** 4/13

**2.** A 2x2 patch in an activation map has the following entries: [0, 4], [4, 8]. What is the result of applying an average pooling operation over this patch?
- **A)** 4
- **B)** 7
- **C)** 5
- **D)** 16

**3.** In a poll of 400 voters, 250 stated they support the new law. Calculate the 99% confidence interval for the population proportion. (Let z=2.576)
- **A)** (0.563, 0.687)
- **B)** (0.577, 0.673)
- **C)** (0.552, 0.698)
- **D)** (0.580, 0.670)

**4.** A box holds 5 red balls, 3 blue balls, and 2 green balls. If you draw two balls sequentially without putting them back, what is the likelihood that both are red?
- **A)** 2/9
- **B)** 1/4
- **C)** 5/18
- **D)** 1/5

**5.** A text file has the tokens ["swimming", "swims", "swam"]. If you use a dictionary-backed Lemmatizer (configured for verbs), how many distinct lemmas will you get?
- **A)** 1
- **B)** 2
- **C)** 3
- **D)** 0

**6.** Given that the variance of a continuous random variable Y is 16, what is its standard deviation?
- **A)** 4
- **B)** 8
- **C)** 256
- **D)** 2

**7.** Does the coordinate (1, 1) satisfy the inequality 5x + 5y <= 10?
- **A)** Yes, it is feasible but not on the boundary.
- **B)** No, it is not feasible.
- **C)** Cannot be determined.
- **D)** It is exactly on the boundary.

**8.** Does the coordinate (2, 2) satisfy the inequality 2x + 3y <= 12?
- **A)** Yes, it is feasible.
- **B)** No, it is not feasible.
- **C)** Cannot be determined.
- **D)** It is exactly on the boundary.

**9.** When applying K-Means clustering, what usually happens if you increase K until it equals the total number of observations?
- **A)** WCSS increases
- **B)** WCSS remains constant
- **C)** WCSS decreases to zero
- **D)** Centroids become randomized

**10.** For a dataset that is heavily skewed, lacks normality, and contains many outliers, which correlation metric should be chosen, and what assumption needs checking prior to an ANOVA?
- **A)** Pearson correlation; ANOVA requires checking for equal variances (homogeneity of variance).
- **B)** Spearman correlation; ANOVA requires checking for equal variances (homogeneity of variance).
- **C)** Pearson correlation; ANOVA assumes unequal variances by default.
- **D)** Spearman correlation; ANOVA does not require checking any assumptions.

**11.** The chance of selecting a broken widget is 0.01. If a batch of 500 widgets is inspected, how many broken widgets do you expect to find?
- **A)** 5
- **B)** 10
- **C)** 1
- **D)** 50

**12.** Compute the test statistic for a single proportion test given a sample proportion of 0.55, a null proportion of 0.50, and a sample size of 100.
- **A)** 1.00
- **B)** 2.00
- **C)** 1.50
- **D)** 2.50

**13.** You convolve a 3x3 block of an image (all pixels having an intensity of 2) with a 3x3 filter consisting entirely of ones. What is the scalar output prior to any activation? (Ignore bias)
- **A)** 18
- **B)** 9
- **C)** 2
- **D)** 27

**14.** Suppose support(A) = 0.2, support(B) = 0.3, and support(A U B) = 0.1. What is the Lift for the association rule A -> B?
- **A)** 1.67
- **B)** 0.16
- **C)** 0.50
- **D)** 2.0

**15.** Compute the cosine similarity between product X (scores: [2, 2, 1]) and product Y (scores: [1, 2, 2]).
- **A)** 0.8889
- **B)** 1.0
- **C)** 0.5
- **D)** 0.75

**16.** Determine the 95% confidence interval given a sample average of 50, a standard deviation of 10, and 100 observations. (Use z=1.96)
- **A)** (48.04, 51.96)
- **B)** (49.02, 50.98)
- **C)** (40.00, 60.00)
- **D)** (48.35, 51.65)

**17.** A collection has 100 files. The word "info" shows up 5 times in File X, which contains 50 words overall. The word "info" appears in exactly 10 files. Using TF = (term count) / (total words) and IDF = log10(N / df), compute the TF-IDF score for "info" in File X.
- **A)** 0.05
- **B)** 0.10
- **C)** 0.50
- **D)** 1.00

**18.** An Exponential Moving Average (EMA) uses a smoothing factor of 0.2. If the prior EMA was 50 and the newly observed value is 60, calculate the updated EMA.
- **A)** 52
- **B)** 58
- **C)** 55
- **D)** 50

**19.** Find the Euclidean distance separating coordinate A(2, 3) from coordinate B(5, 7).
- **A)** 4
- **B)** 5
- **C)** 7
- **D)** 25

**20.** In a log of 10 purchases, Product X is bought 7 times, and Product Y is bought 6 times. They are bought together 4 times. What is the support for the itemset {X, Y}?
- **A)** 40%
- **B)** 60%
- **C)** 70%
- **D)** 100%

**21.** Consider the TF-IDF vectors: vec1 = [0.6, 0.8, 0] and vec2 = [0.3, 0.4, 0]. Calculate the cosine similarity between vec1 and vec2.
- **A)** 1.0
- **B)** 0.5
- **C)** 0.0
- **D)** 0.75

**22.** In a K-Means algorithm, two data points A(2,2) and B(4,4) are assigned to the same cluster. Where is their centroid located?
- **A)** (2,4)
- **B)** (4,2)
- **C)** (3,3)
- **D)** (6,6)

**23.** When analyzing clusters, if a subset of instances is segregated into an "Anomalies" cluster, how should you interpret this group?
- **A)** It should be ignored since outliers should have been removed prior to scaling.
- **B)** The cluster's averages indicate extreme values that pull the overall averages away from the main distribution.
- **C)** It indicates that the PCA failed to reduce the dimensions correctly.
- **D)** It implies that the Elbow method suggested too few clusters.

**24.** Compute the local clustering coefficient for a vertex connected to 3 other vertices, assuming those connected vertices share exactly 1 edge among themselves.
- **A)** 0.33
- **B)** 0.5
- **C)** 0.16
- **D)** 0.66

**25.** What is the defining characteristic of a Stationary time series?
- **A)** The variance of the time series strictly increases over time.
- **B)** The statistical properties of the series (mean, variance, autocorrelation) remain constant over time.
- **C)** The data points are completely independent of one another.
- **D)** The time series has a clear and predictable seasonal pattern.

**26.** Find the cosine similarity between client A with profile [1, 2] and client B with profile [2, 4].
- **A)** 1.0
- **B)** 0.5
- **C)** 0.0
- **D)** 0.8

**27.** An Augmented Dickey-Fuller (ADF) test on a dataset yields a p-value of 0.02. Using an alpha level of 0.05, what is the appropriate interpretation?
- **A)** The series is stationary because 0.02 < 0.05 (Reject Null Hypothesis).
- **B)** The series is non-stationary because 0.02 < 0.05 (Fail to Reject Null Hypothesis).
- **C)** The series is stationary because 0.02 > 0.01.
- **D)** The series is non-stationary and requires double differencing.

**28.** In a small web graph (Page 1 links to 2 and 3; Page 2 links to 3; Page 3 links to 1) with an initial PageRank of 1/3 for each, what is the PageRank of Page 2 after one update step?
- **A)** 1/6
- **B)** 1/3
- **C)** 1/2
- **D)** 5/18

**29.** A dataset of 25 measurements yields a mean of 120 and a standard deviation of 15. Determine the 90% confidence interval for the true mean. (t-value for df=24 is 1.711)
- **A)** (114.87, 125.13)
- **B)** (115.00, 125.00)
- **C)** (113.82, 126.18)
- **D)** (116.20, 123.80)

**30.** Does the origin (0, 0) satisfy the linear constraint 3x + 4y >= 12?
- **A)** Yes, it is feasible.
- **B)** No, it is not feasible.
- **C)** Cannot be determined.
- **D)** It is exactly on the boundary.

**31.** What term describes the phenomenon where similar entities in a graph tend to form connections with one another?
- **A)** Homophily
- **B)** Bipartite matching
- **C)** Isomorphism
- **D)** Triadic closure

**32.** In Recommendation Engines, what is the main goal of content-based filtering?
- **A)** To recommend items based on the item's attributes and the user's past preferences.
- **B)** To recommend items that similar users have liked.
- **C)** To group items into random clusters.
- **D)** To filter out inappropriate content from the system.

**33.** Which challenge is frequently encountered by collaborative filtering techniques when introducing fresh products to the catalog?
- **A)** The Cold Start problem
- **B)** The Matrix Sparsity problem
- **C)** The Shilling attack problem
- **D)** The Grey Sheep problem

**34.** To identify the correct order for a Moving Average (MA) model, which visualization helps pinpoint the appropriate lag 'q'?
- **A)** ACF (Autocorrelation Function) plot
- **B)** PACF (Partial Autocorrelation Function) plot
- **C)** Residuals QQ-plot
- **D)** Exponential Smoothing plot

**35.** A drawer contains 2 rigged coins (75% probability of heads) and 3 normal coins (50% probability of heads). You blindly pick one and flip it, getting heads. What is the chance that you picked a rigged coin?
- **A)** 50%
- **B)** 60%
- **C)** 40%
- **D)** 75%

**36.** Suppose a quiz has 5 questions, each offering 4 choices. What is the chance of guessing exactly 3 of them right?
- **A)** 0.0879
- **B)** 0.2500
- **C)** 0.0156
- **D)** 0.1055

**37.** When analyzing digital pictures, what is the main difference between color (RGB) and monochrome (grayscale) formats?
- **A)** An RGB image has 3 color channels, whereas a grayscale image has only 1 channel.
- **B)** An RGB image is compressed, whereas a grayscale image is uncompressed.
- **C)** An RGB image uses float32 values, whereas a grayscale image uses uint8 values.
- **D)** An RGB image has higher spatial resolution than a grayscale image.

**38.** Compute the Within-Cluster Sum of Squares (WCSS) for a cluster that has instances at (1,1) and (1,3) with its center at (1,2).
- **A)** 1
- **B)** 2
- **C)** 4
- **D)** 0

**39.** A network of 5 individuals has an average shortest path length of 2.5. What is the total sum of the shortest paths across all unique pairs of individuals?
- **A)** 25
- **B)** 50
- **C)** 12.5
- **D)** 20

**40.** Why do standard Convolutional Neural Networks (CNNs) struggle when applied directly to graph structures?
- **A)** Graphs do not have a fixed grid structure, so standard convolutional filters cannot slide over them uniformly.
- **B)** Graphs only contain continuous numerical data, which CNNs cannot process.
- **C)** Graph data always lacks node features required for CNN input.
- **D)** CNNs require undirected edges, but most graphs are directed.

**41.** The leverage metric for an association rule A -> B is support(A U B) - (support(A) * support(B)). If A has support 0.4, B has support 0.5, and A U B has support 0.25, calculate the leverage.
- **A)** 0.05
- **B)** 1.25
- **C)** -0.05
- **D)** 0.25

**42.** Consider the chronological sequence: 10, 20, 30, 40, 50. Calculate the Simple Moving Average (SMA) for the final period using a 3-period window.
- **A)** 30
- **B)** 40
- **C)** 50
- **D)** 20

**43.** Find the cosine similarity between reviewer X (ratings: [3, 4]) and reviewer Y (ratings: [4, 3]).
- **A)** 0.96
- **B)** 1.0
- **C)** 0.82
- **D)** 0.5

**44.** A dataset contains 5 sequences: {M, O, N, K, E, Y}, {D, O, N, K, E, Y}, {M, A, K, E}, {M, U, C, K}, {C, O, O, K, I, E}. Compute the support for element 'K'.
- **A)** 60%
- **B)** 80%
- **C)** 100%
- **D)** 40%

**45.** Given true targets [10, 20] and model outputs [12, 16], calculate the Mean Squared Error (MSE).
- **A)** 10.0
- **B)** 3.0
- **C)** 5.0
- **D)** 20.0

**46.** Calculate the total number of trainable weights (including biases) in a 2D convolution layer that has 8 filters of size 3x3 and processes an input volume with 3 channels.
- **A)** 224
- **B)** 216
- **C)** 72
- **D)** 80

**47.** In collaborative filtering, what is the role of the Pearson correlation coefficient?
- **A)** The linear correlation between two variables, adjusting for user rating averages.
- **B)** The Euclidean distance between two vectors.
- **C)** The absolute difference in ratings.
- **D)** The number of co-rated items.

**48.** The association rule {Chips, Salsa} -> {Guacamole} boasts an 80% confidence, and the itemset {Chips, Salsa} appears in 25% of transactions. What is the support for {Chips, Salsa, Guacamole}?
- **A)** 20%
- **B)** 32%
- **C)** 105%
- **D)** 5%

**49.** Calculate the value of the function Z = 5x + 2y at the coordinates (4, 1).
- **A)** 22
- **B)** 20
- **C)** 15
- **D)** 25

**50.** What primarily distinguishes Stemming from Lemmatization?
- **A)** Stemming uses a dictionary lookup; Lemmatization applies heuristic chopping rules.
- **B)** Stemming is rule-based and may output non-words; Lemmatization is dictionary-based and outputs valid base words.
- **C)** Stemming is computationally slower than Lemmatization because it parses grammatical context.
- **D)** Stemming requires Part-Of-Speech (POS) tags, while Lemmatization does not.

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 3]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


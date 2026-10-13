---
id: Mock-Exam-2
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

# Mock Exam 2

## Overview

> This second mock examination evaluates advanced topics in machine learning, vector distance metrics, PageRank algorithms, naive Bayes classification, linear programming, and time series differences.

## Exam Questions

**1.** Suppose we have a time sequence [10, 12, 15, 19, 24]. Calculate the second-order difference at the 5th step (the value 24).
    - **A)** 1
    - **B)** 5
    - **C)** 4
    - **D)** 2

**2.** When reviewing an Elbow curve in K-Means to find the best k, what causes the sum of squared distances to drop as k grows?
    - **A)** Outliers are systematically ignored.
    - **B)** Centroids are pushed further from the dataset.
    - **C)** With more clusters, data points naturally fall closer to their specific cluster center.
    - **D)** High k values perfectly remove all variance within clusters.

**3.** Compute the scalar product of the vector for a movie [5, 5, 5] and a user's preference vector [1, 1, 1].
    - **A)** 15
    - **B)** 5
    - **C)** 10
    - **D)** 3

**4.** In a clustering task, the centers are at C1(0, 0) and C2(10, 10). A new observation is at (3, 4). Which center will it be allocated to based on straight-line distance?
    - **A)** C1
    - **B)** C2
    - **C)** Both C1 and C2
    - **D)** Neither C1 nor C2

**5.** Imagine a basic PageRank setup (no damping). Website A points to B and C. Website B points to C. Website C points to A. All start with a score of 1/3. What is C's score after a single step?
    - **A)** 1/3
    - **B)** 1/2
    - **C)** 1/6
    - **D)** 5/18

**6.** Calculate the scalar product of an article's vector [0, 2, 4] and a reader's vector [3, 1, 0].
    - **A)** 8
    - **B)** 6
    - **C)** 2
    - **D)** 0

**7.** Out of 1000 store receipts, the association rule X -> Y has 15% support and 60% confidence. How many receipts include both item X and item Y?
    - **A)** 60
    - **B)** 150
    - **C)** 600
    - **D)** 90

**8.** For the same network (A points to B, C; B points to C; C points to A) with starting PR=1/3, find A's PR after one step.
    - **A)** 1/2
    - **B)** 1/3
    - **C)** 1/6
    - **D)** 5/18

**9.** A model for seasonal forecasting is written as SARIMA(1, 0, 1)(0, 1, 1)[12]. What is the order of seasonal differencing (D)?
    - **A)** 12
    - **B)** 0
    - **C)** 1
    - **D)** 2

**10.** How many subjects do we need to survey to guess a true average with a margin of error of 2 and 95% confidence, assuming the standard deviation is 15? (Use z=1.96)
    - **A)** 217
    - **B)** 216
    - **C)** 218
    - **D)** 215

**11.** Determine the storage size (in bytes) needed for an uncompressed 100x100 RGB photograph, given 8 bits (1 byte) for each color channel per pixel.
    - **A)** 30000 bytes
    - **B)** 10000 bytes
    - **C)** 80000 bytes
    - **D)** 240000 bytes

**12.** In a one-way network, Node A connects to B, C, and D. Meanwhile, C and D connect back to A. What are A's in-degree and out-degree respectively?
    - **A)** In: 3, Out: 2
    - **B)** In: 2, Out: 3
    - **C)** In: 3, Out: 3
    - **D)** In: 2, Out: 2

**13.** Calculate the value of Z = 3x + 4y at the coordinates (2, 3).
    - **A)** 18
    - **B)** 12
    - **C)** 24
    - **D)** 10

**14.** A network contains 6 vertices. If you sum all the values in its adjacency matrix, you get 14. How many connections exist in this undirected network?
    - **A)** 14
    - **B)** 7
    - **C)** 28
    - **D)** 6

**15.** Based on our class discussion, what does Principal Component Analysis (PCA) actually do when given variables like cost, rating, and duration?
    - **A)** It strictly drops the least significant variables from the dataset.
    - **B)** It blends the initial variables into new components for visualization and reducing dimensions.
    - **C)** It boosts the variance of unusual data points to isolate them.
    - **D)** It is a method for finding common groups of items.

**16.** A text collection has 500 files, and the term "the" shows up in every single one. What is its standard IDF value if computed using log base 10 (log10(N/df))?
    - **A)** 1.0
    - **B)** 500.0
    - **C)** 0.0
    - **D)** 0.5

**17.** Calculate the value of Z = 2x + 9y at the coordinates (3, 1).
    - **A)** 11
    - **B)** 15
    - **C)** 21
    - **D)** 17

**18.** What is the dot product of a product vector [2, 3, 1] and a customer vector [1, 2, 3]?
    - **A)** 11
    - **B)** 10
    - **C)** 12
    - **D)** 14

**19.** An image grid of size 10x10 goes through Max Pooling with a 2x2 area and a jump step of 2. What are the dimensions of the resulting grid?
    - **A)** 5x5
    - **B)** 4x4
    - **C)** 8x8
    - **D)** 9x9

**20.** Which of these is NOT an underlying assumption for conducting an independent two-sample t-test?
    - **A)** The data from the two groups must be matched or paired.
    - **B)** The values within both sets should be approximately normally distributed.
    - **C)** The two sets of observations must be independent.
    - **D)** The population variances of the groups should be roughly equal (for Student's t).

**21.** For a two-sided hypothesis test with a significance level of 0.05, what is the boundary z-score?
    - **A)** ±1.96
    - **B)** ±1.645
    - **C)** ±2.576
    - **D)** ±2.33

**22.** Suppose our dataset is: Doc1 = "hello world", Doc2 = "hello". Using Bag of Words, what is the one-hot representation for "world" if the words are sorted alphabetically?
    - **A)** [0, 1]
    - **B)** [1, 0]
    - **C)** [1, 1]
    - **D)** [0, 0]

**23.** In a neural network, the first convolution uses a 3x3 filter (stride 1). The second uses another 3x3 filter (stride 1). How large is the receptive field of a neuron in the second layer relative to the initial image?
    - **A)** 5x5
    - **B)** 3x3
    - **C)** 6x6
    - **D)** 7x7

**24.** Node A has 4 mutual acquaintances. There are 3 links between these 4 acquaintances. What is Node A's local clustering coefficient?
    - **A)** 0.5
    - **B)** 0.25
    - **C)** 0.75
    - **D)** 0.33

**25.** What is the main goal of using the Apriori technique in data analysis?
    - **A)** To figure out the best amount of clusters.
    - **B)** To uncover sets of items that frequently occur together and their association rules.
    - **C)** To forecast a numerical target value.
    - **D)** To sort items into existing groups.

**26.** Compute the Lift for the rule {X} -> {Y} given (Total=10, Supp(X)=0.7, Supp(Y)=0.6, Supp(X,Y)=0.4).
    - **A)** 0.95
    - **B)** 1.05
    - **C)** 0.57
    - **D)** 1.15

**27.** What principle asserts that if a linear programming problem has an optimal result, it will be found at a corner of the valid region?
    - **A)** The Fundamental Theorem of Linear Programming
    - **B)** Simplex Theorem
    - **C)** Duality Theorem
    - **D)** Convexity Theorem

**28.** In hierarchical clustering (agglomerative), which metric uses the smallest gap between any point in one cluster and any point in another?
    - **A)** Complete linkage
    - **B)** Average linkage
    - **C)** Single linkage
    - **D)** Ward's linkage

**29.** Which method in agglomerative clustering computes the distance between clusters by averaging the distances of all pairs of their points?
    - **A)** Complete Linkage
    - **B)** Single Linkage
    - **C)** Centroid Linkage
    - **D)** Average Linkage

**30.** Why is it problematic to apply `fit_transform()` on validation/test sets during text categorization?
    - **A)** Test sets lack the size needed for proper transformation.
    - **B)** It constructs a totally new vocabulary from the test set alone, causing mismatched features and leakage.
    - **C)** Predictive models cannot process sparse matrices that are transformed.
    - **D)** Vocabulary size is required to be an even number.

**31.** A sentence has the terms ["running", "runs", "ran"]. If processed by a standard Porter Stemmer, how many distinct tokens will likely remain?
    - **A)** 1
    - **B)** 2
    - **C)** 3
    - **D)** 0

**32.** Consider an AR(1) equation: y_t = 5 + 0.6 * y_{t-1}. If the previous value y_{t-1} was 10, predict y_t (with zero error).
    - **A)** 11.0
    - **B)** 6.0
    - **C)** 15.0
    - **D)** 5.6

**33.** Assuming all other factors are unchanged, what occurs to the width of a confidence interval when you increase the sample size?
    - **A)** It decreases
    - **B)** It increases
    - **C)** It stays identical
    - **D)** It shrinks to zero

**34.** Which scenario describes a Type I error?
    - **A)** Rejecting a null hypothesis when it is actually correct.
    - **B)** Failing to reject a null hypothesis that is incorrect.
    - **C)** Rejecting an incorrect null hypothesis.
    - **D)** Failing to reject a correct null hypothesis.

**35.** Compute the objective function Z = x + y given the coordinates (5, 5).
    - **A)** 5
    - **B)** 10
    - **C)** 25
    - **D)** 0

**36.** Compute the objective function Z = 10x + 15y given the coordinates (1, 2).
    - **A)** 25
    - **B)** 30
    - **C)** 40
    - **D)** 50

**37.** A network with 3 vertices (X, Y, Z) contains the links (X,Y) and (X,Z). What is the trace of its corresponding adjacency matrix?
    - **A)** 0
    - **B)** 2
    - **C)** 3
    - **D)** 1

**38.** To decide the lag parameter 'p' for an Autoregressive (AR) model, which chart is mostly utilized to spot the significant cut-off point?
    - **A)** ACF (Autocorrelation Function) plot
    - **B)** PACF (Partial Autocorrelation Function) plot
    - **C)** Residuals QQ-plot
    - **D)** Exponential Smoothing plot

**39.** A chi-square goodness-of-fit analysis involves 5 distinct groups. How many degrees of freedom does it have?
    - **A)** 4
    - **B)** 5
    - **C)** 6
    - **D)** 3

**40.** A collection of numbers is at x = {2, 4, 10, 12, 3, 20, 30, 11, 25}. Using k-means (k=2) with initial centers at c1=3 and c2=4, what will the updated center c1 be after one step?
    - **A)** 3
    - **B)** 2.5
    - **C)** 3.5
    - **D)** 2

**41.** What is the core reason for adding a pooling layer in a CNN architecture?
    - **A)** To lower the spatial size of the features, cutting down on computation and parameters.
    - **B)** To expand the depth (channels) of the feature maps.
    - **C)** To inject non-linear capabilities into the model.
    - **D)** To combat overfitting by deactivating random nodes.

**42.** If you use `CountVectorizer(ngram_range=(1, 2))` on the text "data science is fun", how many distinct terms/phrases are extracted?
    - **A)** 4
    - **B)** 7
    - **C)** 3
    - **D)** 6

**43.** What is a recognized disadvantage of the K-Means algorithm?
    - **A)** It only works on categorical data.
    - **B)** It is very vulnerable to extreme outliers.
    - **C)** It is guaranteed to discover the global best solution.
    - **D)** It doesn't need you to guess the number of clusters beforehand.

**44.** In the aforementioned database, calculate the support for the combination {O, K}.
    - **A)** 40%
    - **B)** 60%
    - **C)** 80%
    - **D)** 100%

**45.** Two distinct groups provided these measurements: n1=30, mean1=50, sd1=10; n2=40, mean2=45, sd2=12. Calculate the 95% confidence interval for their mean difference. (Use z=1.96)
    - **A)** (−0.12, 10.12)
    - **B)** (0.00, 10.00)
    - **C)** (1.00, 9.00)
    - **D)** (−1.00, 11.00)

**46.** Given a sequence [12, 15, 14, 18, 20], compute the first-order difference at time step 4 (the value 18).
    - **A)** 4
    - **B)** -1
    - **C)** 3
    - **D)** 2

**47.** A virus is present in 1% of people. The testing kit has 99% accuracy (for both positives and negatives). If someone gets a positive result, what is the chance they truly have the virus?
    - **A)** 50%
    - **B)** 99%
    - **C)** 1%
    - **D)** 90%

**48.** Check if the coordinate (5, 0) satisfies the boundary condition 2x + y <= 8.
    - **A)** Yes, it is allowed.
    - **B)** No, it violates the condition.
    - **C)** Cannot be determined.
    - **D)** It lands precisely on the line.

**49.** About 30% of messages are junk. A junk filter intercepts 95% of junk messages but also mistakenly flags 2% of normal messages as junk. If a message is flagged, what is the probability it is genuinely junk?
    - **A)** 95.3%
    - **B)** 98.0%
    - **C)** 95.0%
    - **D)** 90.0%

**50.** Calculate the value of Z = 7x + 8y given the coordinates (2, 2).
    - **A)** 30
    - **B)** 28
    - **C)** 15
    - **D)** 14

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 2]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


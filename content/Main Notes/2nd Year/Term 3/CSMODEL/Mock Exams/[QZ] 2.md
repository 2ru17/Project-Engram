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

**Tags:** #[[CSMODEL]] #[[Mock Exams]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Mock Exam 2

## Overview

> This second mock examination evaluates advanced topics in machine learning, vector distance metrics, PageRank algorithms, naive Bayes classification, linear programming, and time series differences.

## Multiple Choice Questions

1. Suppose we have a time sequence [10, 12, 15, 19, 24]. Calculate the second-order difference at the 5th step (the value 24).
    - **A)** 1
    - **B)** 5
    - **C)** 4
    - **D)** 2

2. When reviewing an Elbow curve in K-Means to find the best k, what causes the sum of squared distances to drop as k grows?
    - **A)** Outliers are systematically ignored.
    - **B)** Centroids are pushed further from the dataset.
    - **C)** With more clusters, data points naturally fall closer to their specific cluster center.
    - **D)** High k values perfectly remove all variance within clusters.

3. Compute the scalar product of the vector for a movie [5, 5, 5] and a user's preference vector [1, 1, 1].
    - **A)** 15
    - **B)** 5
    - **C)** 10
    - **D)** 3

4. In a clustering task, the centers are at C1(0, 0) and C2(10, 10). A new observation is at (3, 4). Which center will it be allocated to based on straight-line distance?
    - **A)** C1
    - **B)** C2
    - **C)** Both C1 and C2
    - **D)** Neither C1 nor C2

5. Imagine a basic PageRank setup (no damping). Website A points to B and C. Website B points to C. Website C points to A. All start with a score of 1/3. What is C's score after a single step?
    - **A)** 1/3
    - **B)** 1/2
    - **C)** 1/6
    - **D)** 5/18

6. Calculate the scalar product of an article's vector [0, 2, 4] and a reader's vector [3, 1, 0].
    - **A)** 8
    - **B)** 6
    - **C)** 2
    - **D)** 0

7. Out of 1000 store receipts, the association rule X -> Y has 15% support and 60% confidence. How many receipts include both item X and item Y?
    - **A)** 60
    - **B)** 150
    - **C)** 600
    - **D)** 90

8. For the same network (A points to B, C; B points to C; C points to A) with starting PR=1/3, find A's PR after one step.
    - **A)** 1/2
    - **B)** 1/3
    - **C)** 1/6
    - **D)** 5/18

9. A model for seasonal forecasting is written as SARIMA(1, 0, 1)(0, 1, 1)[12]. What is the order of seasonal differencing (D)?
    - **A)** 12
    - **B)** 0
    - **C)** 1
    - **D)** 2

10. How many subjects do we need to survey to guess a true average with a margin of error of 2 and 95% confidence, assuming the standard deviation is 15? (Use z=1.96)
    - **A)** 217
    - **B)** 216
    - **C)** 218
    - **D)** 215

11. Determine the storage size (in bytes) needed for an uncompressed 100x100 RGB photograph, given 8 bits (1 byte) for each color channel per pixel.
    - **A)** 30000 bytes
    - **B)** 10000 bytes
    - **C)** 80000 bytes
    - **D)** 240000 bytes

12. In a one-way network, Node A connects to B, C, and D. Meanwhile, C and D connect back to A. What are A's in-degree and out-degree respectively?
    - **A)** In: 3, Out: 2
    - **B)** In: 2, Out: 3
    - **C)** In: 3, Out: 3
    - **D)** In: 2, Out: 2

13. Calculate the value of Z = 3x + 4y at the coordinates (2, 3).
    - **A)** 18
    - **B)** 12
    - **C)** 24
    - **D)** 10

14. A network contains 6 vertices. If you sum all the values in its adjacency matrix, you get 14. How many connections exist in this undirected network?
    - **A)** 14
    - **B)** 7
    - **C)** 28
    - **D)** 6

15. Based on our class discussion, what does Principal Component Analysis (PCA) actually do when given variables like cost, rating, and duration?
    - **A)** It strictly drops the least significant variables from the dataset.
    - **B)** It blends the initial variables into new components for visualization and reducing dimensions.
    - **C)** It boosts the variance of unusual data points to isolate them.
    - **D)** It is a method for finding common groups of items.

16. A text collection has 500 files, and the term "the" shows up in every single one. What is its standard IDF value if computed using log base 10 (log10(N/df))?
    - **A)** 1.0
    - **B)** 500.0
    - **C)** 0.0
    - **D)** 0.5

17. Calculate the value of Z = 2x + 9y at the coordinates (3, 1).
    - **A)** 11
    - **B)** 15
    - **C)** 21
    - **D)** 17

18. What is the dot product of a product vector [2, 3, 1] and a customer vector [1, 2, 3]?
    - **A)** 11
    - **B)** 10
    - **C)** 12
    - **D)** 14

19. An image grid of size 10x10 goes through Max Pooling with a 2x2 area and a jump step of 2. What are the dimensions of the resulting grid?
    - **A)** 5x5
    - **B)** 4x4
    - **C)** 8x8
    - **D)** 9x9

20. Which of these is NOT an underlying assumption for conducting an independent two-sample t-test?
    - **A)** The data from the two groups must be matched or paired.
    - **B)** The values within both sets should be approximately normally distributed.
    - **C)** The two sets of observations must be independent.
    - **D)** The population variances of the groups should be roughly equal (for Student's t).

21. For a two-sided hypothesis test with a significance level of 0.05, what is the boundary z-score?
    - **A)** ±1.96
    - **B)** ±1.645
    - **C)** ±2.576
    - **D)** ±2.33

22. Suppose our dataset is: Doc1 = "hello world", Doc2 = "hello". Using Bag of Words, what is the one-hot representation for "world" if the words are sorted alphabetically?
    - **A)** [0, 1]
    - **B)** [1, 0]
    - **C)** [1, 1]
    - **D)** [0, 0]

23. In a neural network, the first convolution uses a 3x3 filter (stride 1). The second uses another 3x3 filter (stride 1). How large is the receptive field of a neuron in the second layer relative to the initial image?
    - **A)** 5x5
    - **B)** 3x3
    - **C)** 6x6
    - **D)** 7x7

24. Node A has 4 mutual acquaintances. There are 3 links between these 4 acquaintances. What is Node A's local clustering coefficient?
    - **A)** 0.5
    - **B)** 0.25
    - **C)** 0.75
    - **D)** 0.33

25. What is the main goal of using the Apriori technique in data analysis?
    - **A)** To figure out the best amount of clusters.
    - **B)** To uncover sets of items that frequently occur together and their association rules.
    - **C)** To forecast a numerical target value.
    - **D)** To sort items into existing groups.

26. Compute the Lift for the rule {X} -> {Y} given (Total=10, Supp(X)=0.7, Supp(Y)=0.6, Supp(X,Y)=0.4).
    - **A)** 0.95
    - **B)** 1.05
    - **C)** 0.57
    - **D)** 1.15

27. What principle asserts that if a linear programming problem has an optimal result, it will be found at a corner of the valid region?
    - **A)** The Fundamental Theorem of Linear Programming
    - **B)** Simplex Theorem
    - **C)** Duality Theorem
    - **D)** Convexity Theorem

28. In hierarchical clustering (agglomerative), which metric uses the smallest gap between any point in one cluster and any point in another?
    - **A)** Complete linkage
    - **B)** Average linkage
    - **C)** Single linkage
    - **D)** Ward's linkage

29. Which method in agglomerative clustering computes the distance between clusters by averaging the distances of all pairs of their points?
    - **A)** Complete Linkage
    - **B)** Single Linkage
    - **C)** Centroid Linkage
    - **D)** Average Linkage

30. Why is it problematic to apply `fit_transform()` on validation/test sets during text categorization?
    - **A)** Test sets lack the size needed for proper transformation.
    - **B)** It constructs a totally new vocabulary from the test set alone, causing mismatched features and leakage.
    - **C)** Predictive models cannot process sparse matrices that are transformed.
    - **D)** Vocabulary size is required to be an even number.

31. A sentence has the terms ["running", "runs", "ran"]. If processed by a standard Porter Stemmer, how many distinct tokens will likely remain?
    - **A)** 1
    - **B)** 2
    - **C)** 3
    - **D)** 0

32. Consider an AR(1) equation: y_t = 5 + 0.6 * y_{t-1}. If the previous value y_{t-1} was 10, predict y_t (with zero error).
    - **A)** 11.0
    - **B)** 6.0
    - **C)** 15.0
    - **D)** 5.6

33. Assuming all other factors are unchanged, what occurs to the width of a confidence interval when you increase the sample size?
    - **A)** It decreases
    - **B)** It increases
    - **C)** It stays identical
    - **D)** It shrinks to zero

34. Which scenario describes a Type I error?
    - **A)** Rejecting a null hypothesis when it is actually correct.
    - **B)** Failing to reject a null hypothesis that is incorrect.
    - **C)** Rejecting an incorrect null hypothesis.
    - **D)** Failing to reject a correct null hypothesis.

35. Compute the objective function Z = x + y given the coordinates (5, 5).
    - **A)** 5
    - **B)** 10
    - **C)** 25
    - **D)** 0

36. Compute the objective function Z = 10x + 15y given the coordinates (1, 2).
    - **A)** 25
    - **B)** 30
    - **C)** 40
    - **D)** 50

37. A network with 3 vertices (X, Y, Z) contains the links (X,Y) and (X,Z). What is the trace of its corresponding adjacency matrix?
    - **A)** 0
    - **B)** 2
    - **C)** 3
    - **D)** 1

38. To decide the lag parameter 'p' for an Autoregressive (AR) model, which chart is mostly utilized to spot the significant cut-off point?
    - **A)** ACF (Autocorrelation Function) plot
    - **B)** PACF (Partial Autocorrelation Function) plot
    - **C)** Residuals QQ-plot
    - **D)** Exponential Smoothing plot

39. A chi-square goodness-of-fit analysis involves 5 distinct groups. How many degrees of freedom does it have?
    - **A)** 4
    - **B)** 5
    - **C)** 6
    - **D)** 3

40. A collection of numbers is at x = {2, 4, 10, 12, 3, 20, 30, 11, 25}. Using k-means (k=2) with initial centers at c1=3 and c2=4, what will the updated center c1 be after one step?
    - **A)** 3
    - **B)** 2.5
    - **C)** 3.5
    - **D)** 2

41. What is the core reason for adding a pooling layer in a CNN architecture?
    - **A)** To lower the spatial size of the features, cutting down on computation and parameters.
    - **B)** To expand the depth (channels) of the feature maps.
    - **C)** To inject non-linear capabilities into the model.
    - **D)** To combat overfitting by deactivating random nodes.

42. If you use `CountVectorizer(ngram_range=(1, 2))` on the text "data science is fun", how many distinct terms/phrases are extracted?
    - **A)** 4
    - **B)** 7
    - **C)** 3
    - **D)** 6

43. What is a recognized disadvantage of the K-Means algorithm?
    - **A)** It only works on categorical data.
    - **B)** It is very vulnerable to extreme outliers.
    - **C)** It is guaranteed to discover the global best solution.
    - **D)** It doesn't need you to guess the number of clusters beforehand.

44. In the aforementioned database, calculate the support for the combination {O, K}.
    - **A)** 40%
    - **B)** 60%
    - **C)** 80%
    - **D)** 100%

45. Two distinct groups provided these measurements: n1=30, mean1=50, sd1=10; n2=40, mean2=45, sd2=12. Calculate the 95% confidence interval for their mean difference. (Use z=1.96)
    - **A)** (−0.12, 10.12)
    - **B)** (0.00, 10.00)
    - **C)** (1.00, 9.00)
    - **D)** (−1.00, 11.00)

46. Given a sequence [12, 15, 14, 18, 20], compute the first-order difference at time step 4 (the value 18).
    - **A)** 4
    - **B)** -1
    - **C)** 3
    - **D)** 2

47. A virus is present in 1% of people. The testing kit has 99% accuracy (for both positives and negatives). If someone gets a positive result, what is the chance they truly have the virus?
    - **A)** 50%
    - **B)** 99%
    - **C)** 1%
    - **D)** 90%

48. Check if the coordinate (5, 0) satisfies the boundary condition 2x + y <= 8.
    - **A)** Yes, it is allowed.
    - **B)** No, it violates the condition.
    - **C)** Cannot be determined.
    - **D)** It lands precisely on the line.

49. About 30% of messages are junk. A junk filter intercepts 95% of junk messages but also mistakenly flags 2% of normal messages as junk. If a message is flagged, what is the probability it is genuinely junk?
    - **A)** 95.3%
    - **B)** 98.0%
    - **C)** 95.0%
    - **D)** 90.0%

50. Calculate the value of Z = 7x + 8y given the coordinates (2, 2).
    - **A)** 30
    - **B)** 28
    - **C)** 15
    - **D)** 14

### Answer Key & Explanations

1. **A**. 1st difference: [NaN, 2, 3, 4, 5]. 2nd difference (the difference of the 1st differences): [NaN, NaN, 1, 1, 1]. The element at t=5 is 1. *Calculator Instructions:* (1) Find 1st differences: 12-10=2, 15-12=3, 19-15=4, 24-19=5. (2) Find 2nd difference for t=5: 5 - 4 = 1.
2. **C**. Adding more clusters (larger k) means there are more centers spread throughout the space. Because there are more centers, the data points don't have to reach as far to find their assigned center, reducing the total distance metric.
3. **A**. The sum of products is (5*1) + (5*1) + (5*1) = 15. *Calculator Instructions:* (1) Multiply pairs of values. (2) Add them up.
4. **A**. Distance to C1: sqrt(3^2 + 4^2) = 5. Distance to C2: sqrt((10-3)^2 + (10-4)^2) = sqrt(49 + 36) = sqrt(85) ≈ 9.22. The new point is closer to C1. *Calculator Instructions:* (1) Dist to C1 = sqrt(9 + 16) = 5 (2) Dist to C2 = sqrt(49 + 36) = 9.219 (3) 5 < 9.219, hence C1.
5. **B**. C gets value from A and B. A gives half its score (1/3) to C, which is 1/6. B gives all its score (1/3) to C. C's updated score = 1/6 + 1/3 = 1/2. *Calculator Instructions:* (1) A's share to C: (1/3) / 2 = 1/6 (2) B's share to C: (1/3) / 1 = 1/3 (3) Sum: 1/6 + 1/3 = 1/2
6. **C**. The sum of products is (0*3) + (2*1) + (4*0) = 0 + 2 + 0 = 2. *Calculator Instructions:* (1) Multiply pairs of values. (2) Add them up.
7. **B**. The 15% support indicates that 15% of all 1000 receipts contain X and Y. 1000 * 0.15 = 150. *Calculator Instructions:* (1) Result = Total * Support fraction (2) 1000 * 0.15 = 150
8. **B**. A only gets value from C. C passes its entire score (1/3) to A. A's updated score = 1/3. *Calculator Instructions:* (1) C's share to A: (1/3) / 1 = 1/3
9. **C**. The seasonal segment is formatted as (P, D, Q)[s]. In this case, D is the middle value, which is 1. *Calculator Instructions:* (1) Check format (P, D, Q)[s] (2) D = 1
10. **A**. Margin = z * (sd / sqrt(n)), thus n = (z * sd / Margin)^2. Using the values: n = (1.96 * 15 / 2)^2 = (29.4 / 2)^2 = 14.7^2 = 216.09. Rounding up gives 217. *Calculator Instructions:* (1) Compute (1.96 * 15 / 2)^2 (2) Round up to the next integer
11. **A**. Total pixels = 100 * 100 = 10000. There are 3 color channels. Each channel takes 1 byte. Total = 10000 * 3 * 1 = 30000 bytes. *Calculator Instructions:* (1) Pixels: 100 * 100 = 10000 (2) Total bytes: 10000 * 3 = 30000
12. **B**. Node A receives incoming paths from C and D (In = 2). Node A sends paths to B, C, and D (Out = 3). *Calculator Instructions:* (1) Count incoming to A (C, D) = 2 (2) Count outgoing from A (B, C, D) = 3
13. **A**. Plug in x = 2 and y = 3. Z = 3(2) + 4(3) = 6 + 12 = 18. *Calculator Instructions:* (1) 3 * 2 = 6 (2) 4 * 3 = 12 (3) 6 + 12 = 18
14. **B**. For an undirected matrix, the sum of all its values equals double the total edge count. 14 / 2 = 7 edges. *Calculator Instructions:* (1) 14 / 2 = 7
15. **B**. PCA extracts features rather than simply dropping them. It generates new composite dimensions (like PC1, PC2) from the original data to compress and visualize it, rather than just picking one attribute.
16. **C**. The term appears everywhere, so df = N = 500. N/df = 1. Therefore, log10(1) = 0. *Calculator Instructions:* (1) df = 500 (2) log10(500/500) = log10(1) = 0
17. **B**. Plug in x = 3 and y = 1. Z = 2(3) + 9(1) = 6 + 9 = 15. *Calculator Instructions:* (1) 2 * 3 = 6 (2) 9 * 1 = 9 (3) 6 + 9 = 15
18. **A**. The sum of products is (2*1) + (3*2) + (1*3) = 2 + 6 + 3 = 11. *Calculator Instructions:* (1) Multiply pairs of values. (2) Add them up.
19. **A**. The new size is ((Input - Filter) / Stride) + 1. ((10 - 2) / 2) + 1 = (8/2) + 1 = 5. *Calculator Instructions:* (1) 10 - 2 = 8 (2) 8 / 2 = 4 (3) 4 + 1 = 5
20. **A**. An independent t-test assumes the data points are NOT matched or paired. If they were, you would use a paired test instead.
21. **A**. At alpha=0.05 for a two-sided test, the rejection region is 0.025 on each side, which translates to a z-score of 1.96. *Calculator Instructions:* (1) Lookup z for 0.975
22. **A**. Sorted words are ['hello', 'world']. The term 'world' is the second item, giving the vector [0, 1]. *Calculator Instructions:* (1) Vocab: ['hello', 'world'] (2) 'world' is at index 1 (3) Vector is [0, 1]
23. **A**. RF = RF_prev + (Filter - 1) * Stride. Layer 1 RF is 3. Layer 2 RF is 3 + (3 - 1)*1 = 5. The field is 5x5. *Calculator Instructions:* (1) First layer RF: 3 (2) Second layer RF: 3 + (3 - 1) = 5
24. **A**. 4 acquaintances can have at most (4*3)/2 = 6 links. They actually have 3. The ratio is 3/6 = 0.5. *Calculator Instructions:* (1) Max links: (4 * 3) / 2 = 6 (2) Actual / Max: 3 / 6 = 0.5
25. **B**. Apriori focuses on finding sets of items that appear together often, establishing rules for association.
26. **A**. Lift = Support(X, Y) / (Support(X) * Support(Y)) = 0.4 / (0.7 * 0.6) = 0.4 / 0.42 = 0.952. *Calculator Instructions:* (1) 0.7 * 0.6 = 0.42 (2) 0.4 / 0.42 = 0.952
27. **A**. The Fundamental Theorem of Linear Programming guarantees that the best solution lies at one of the vertices (corners) of the allowable space.
28. **C**. Single linkage calculates cluster distance using the closest pair of points across the two clusters.
29. **D**. Average linkage finds the mean of all distances between every point in the first cluster and every point in the second. *Calculator Instructions:* (1) None
30. **B**. Using `fit_transform()` on a test set creates a completely separate vocabulary from the training set, causing the features to not match up when making predictions. You should use `transform()` instead.
31. **C**. Porter stemmers remove common endings. "running" and "runs" usually reduce to "run", but "ran" is irregular and remains "ran". Thus, there are 2 unique stems: "run" and "ran". *Calculator Instructions:* (1) Stem words: "run", "run", "ran" (2) Count distinct: 2
32. **A**. y_t = 5 + 0.6 * 10 = 5 + 6 = 11.0. *Calculator Instructions:* (1) 0.6 * 10 = 6 (2) 5 + 6 = 11
33. **A**. Increasing the sample size shrinks the standard error, which makes the confidence interval narrower (decreases its width).
34. **A**. A Type I error, or false positive, happens when you wrongly reject a true null hypothesis.
35. **B**. Plug in x = 5 and y = 5. Z = 5 + 5 = 10. *Calculator Instructions:* (1) 5 + 5 = 10
36. **C**. Plug in x = 1 and y = 2. Z = 10(1) + 15(2) = 10 + 30 = 40. *Calculator Instructions:* (1) 10 * 1 = 10 (2) 15 * 2 = 30 (3) 10 + 30 = 40
37. **A**. An adjacency matrix for a standard graph has zeros down its diagonal. The trace is the sum of these diagonal values, which is 0. *Calculator Instructions:* (1) Diagonals are all 0 (2) Sum = 0
38. **B**. For an AR(p) model, the PACF chart will cut off quickly after the p-th lag, making it ideal for determining the order.
39. **A**. For a goodness-of-fit test, degrees of freedom = number of groups - 1 = 5 - 1 = 4. *Calculator Instructions:* (1) 5 - 1 = 4
40. **B**. Checking proximity to c1=3 and c2=4. Value 2 is closer to c1. Value 3 is closer to c1. Value 4 is closer to c2. Cluster 1 gets {2, 3}. Its new mean is (2+3)/2 = 2.5. *Calculator Instructions:* (1) Cluster 1 contains {2, 3} (2) Mean = (2+3) / 2 = 2.5
41. **A**. Pooling scales down the physical dimensions of the data layers, which reduces the number of parameters and lowers processing requirements.
42. **B**. Unigrams: "data", "science", "is", "fun" (4). Bigrams: "data science", "science is", "is fun" (3). Total = 7. *Calculator Instructions:* (1) 4 unigrams (2) 3 bigrams (3) 4 + 3 = 7
43. **B**. Because K-Means relies on averages to update its centers, it is easily pulled off course by extreme outliers.
44. **B**. Items 'O' and 'K' show up together in 3 of the 5 transactions. The support is 3 / 5 = 0.60 or 60%. *Calculator Instructions:* (1) Total appearances = 3 (2) 3 / 5 = 0.6
45. **A**. Std Error = sqrt(100/30 + 144/40) = sqrt(3.33 + 3.6) = sqrt(6.933) ≈ 2.633. Margin = 1.96 * 2.633 ≈ 5.16. Difference = 50 - 45 = 5. Range is 5 ± 5.16, which is (-0.16, 10.16). Option A is the best fit. *Calculator Instructions:* (1) sqrt((10^2 / 30) + (12^2 / 40)) = 2.633 (2) 1.96 * 2.633 = 5.161 (3) 5 - 5.161 = -0.161 (4) 5 + 5.161 = 10.161
46. **A**. First difference is Y_t - Y_{t-1}. At t=4, Y_4 = 18 and Y_3 = 14. 18 - 14 = 4. *Calculator Instructions:* (1) Y_4 = 18, Y_3 = 14 (2) 18 - 14 = 4
47. **A**. P(Virus) = 0.01, P(+|Virus) = 0.99, P(No Virus) = 0.99, P(+|No Virus) = 0.01. Bayes formula: (0.99*0.01) / ((0.99*0.01) + (0.01*0.99)) = 0.0099 / 0.0198 = 0.5. *Calculator Instructions:* (1) (0.99 * 0.01) / ((0.99 * 0.01) + (0.01 * 0.99)) = 0.5
48. **B**. Evaluating 2(5) + 0 gives 10. Since 10 is greater than 8, it does not satisfy the constraint. *Calculator Instructions:* (1) 2 * 5 + 0 = 10 (2) 10 > 8
49. **A**. P(Junk)=0.3, P(Flag|Junk)=0.95, P(Valid)=0.7, P(Flag|Valid)=0.02. Probability = (0.3*0.95) / ((0.3*0.95) + (0.7*0.02)) = 0.285 / (0.285 + 0.014) = 0.285 / 0.299 ≈ 0.9532. *Calculator Instructions:* (1) Calculate (0.3 * 0.95) / ((0.3 * 0.95) + (0.7 * 0.02))
50. **A**. Plug in x = 2 and y = 2. Z = 7(2) + 8(2) = 14 + 16 = 30. *Calculator Instructions:* (1) 7 * 2 = 14 (2) 8 * 2 = 16 (3) 14 + 16 = 30

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 2]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


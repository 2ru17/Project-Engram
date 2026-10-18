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

**Tags:** #[[CSMODEL]] #[[Mock Exams]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Mock Exam 3

## Overview

> This third mock examination assesses mastery of probability models, information retrieval, NLP preprocessing (stemming vs. lemmatization), association rule mining, and optimization functions.

## Multiple Choice Questions

1. A bowl contains 6 red apples and 20 green apples. What is the chance of randomly picking a red apple?
    - **A)** 1/4
    - **B)** 3/13
    - **C)** 3/52
    - **D)** 4/13

2. A 2x2 patch in an activation map has the following entries: [0, 4], [4, 8]. What is the result of applying an average pooling operation over this patch?
    - **A)** 4
    - **B)** 7
    - **C)** 5
    - **D)** 16

3. In a poll of 400 voters, 250 stated they support the new law. Calculate the 99% confidence interval for the population proportion. (Let z=2.576)
    - **A)** (0.552, 0.698)
    - **B)** (0.577, 0.673)
    - **C)** (0.563, 0.687)
    - **D)** (0.580, 0.670)

4. A box holds 5 red balls, 3 blue balls, and 2 green balls. If you draw two balls sequentially without putting them back, what is the likelihood that both are red?
    - **A)** 1/5
    - **B)** 1/4
    - **C)** 5/18
    - **D)** 2/9

5. A text file has the tokens ["swimming", "swims", "swam"]. If you use a dictionary-backed Lemmatizer (configured for verbs), how many distinct lemmas will you get?
    - **A)** 2
    - **B)** 1
    - **C)** 3
    - **D)** 0

6. Given that the variance of a continuous random variable Y is 16, what is its standard deviation?
    - **A)** 256
    - **B)** 8
    - **C)** 4
    - **D)** 2

7. Does the coordinate (1, 1) satisfy the inequality 5x + 5y <= 10?
    - **A)** It is exactly on the boundary.
    - **B)** No, it is not feasible.
    - **C)** Cannot be determined.
    - **D)** Yes, it is feasible but not on the boundary.

8. Does the coordinate (2, 2) satisfy the inequality 2x + 3y <= 12?
    - **A)** It is exactly on the boundary.
    - **B)** No, it is not feasible.
    - **C)** Cannot be determined.
    - **D)** Yes, it is feasible.

9. When applying K-Means clustering, what usually happens if you increase K until it equals the total number of observations?
    - **A)** WCSS increases
    - **B)** WCSS remains constant
    - **C)** WCSS decreases to zero
    - **D)** Centroids become randomized

10. For a dataset that is heavily skewed, lacks normality, and contains many outliers, which correlation metric should be chosen, and what assumption needs checking prior to an ANOVA?
    - **A)** Spearman correlation; ANOVA requires checking for equal variances (homogeneity of variance).
    - **B)** Pearson correlation; ANOVA requires checking for equal variances (homogeneity of variance).
    - **C)** Pearson correlation; ANOVA assumes unequal variances by default.
    - **D)** Spearman correlation; ANOVA does not require checking any assumptions.

11. The chance of selecting a broken widget is 0.01. If a batch of 500 widgets is inspected, how many broken widgets do you expect to find?
    - **A)** 10
    - **B)** 5
    - **C)** 1
    - **D)** 50

12. Compute the test statistic for a single proportion test given a sample proportion of 0.55, a null proportion of 0.50, and a sample size of 100.
    - **A)** 1.00
    - **B)** 2.00
    - **C)** 1.50
    - **D)** 2.50

13. You convolve a 3x3 block of an image (all pixels having an intensity of 2) with a 3x3 filter consisting entirely of ones. What is the scalar output prior to any activation? (Ignore bias)
    - **A)** 2
    - **B)** 9
    - **C)** 18
    - **D)** 27

14. Suppose support(A) = 0.2, support(B) = 0.3, and support(A U B) = 0.1. What is the Lift for the association rule A -> B?
    - **A)** 2.0
    - **B)** 0.16
    - **C)** 0.50
    - **D)** 1.67

15. Compute the cosine similarity between product X (scores: [2, 2, 1]) and product Y (scores: [1, 2, 2]).
    - **A)** 1.0
    - **B)** 0.8889
    - **C)** 0.5
    - **D)** 0.75

16. Determine the 95% confidence interval given a sample average of 50, a standard deviation of 10, and 100 observations. (Use z=1.96)
    - **A)** (40.00, 60.00)
    - **B)** (49.02, 50.98)
    - **C)** (48.04, 51.96)
    - **D)** (48.35, 51.65)

17. A collection has 100 files. The word "info" shows up 5 times in File X, which contains 50 words overall. The word "info" appears in exactly 10 files. Using TF = (term count) / (total words) and IDF = log10(N / df), compute the TF-IDF score for "info" in File X.
    - **A)** 0.10
    - **B)** 0.05
    - **C)** 0.50
    - **D)** 1.00

18. An Exponential Moving Average (EMA) uses a smoothing factor of 0.2. If the prior EMA was 50 and the newly observed value is 60, calculate the updated EMA.
    - **A)** 50
    - **B)** 58
    - **C)** 55
    - **D)** 52

19. Find the Euclidean distance separating coordinate A(2, 3) from coordinate B(5, 7).
    - **A)** 4
    - **B)** 7
    - **C)** 5
    - **D)** 25

20. In a log of 10 purchases, Product X is bought 7 times, and Product Y is bought 6 times. They are bought together 4 times. What is the support for the itemset {X, Y}?
    - **A)** 40%
    - **B)** 60%
    - **C)** 70%
    - **D)** 100%

21. Consider the TF-IDF vectors: vec1 = [0.6, 0.8, 0] and vec2 = [0.3, 0.4, 0]. Calculate the cosine similarity between vec1 and vec2.
    - **A)** 0.5
    - **B)** 1.0
    - **C)** 0.0
    - **D)** 0.75

22. In a K-Means algorithm, two data points A(2,2) and B(4,4) are assigned to the same cluster. Where is their centroid located?
    - **A)** (3,3)
    - **B)** (4,2)
    - **C)** (2,4)
    - **D)** (6,6)

23. When analyzing clusters, if a subset of instances is segregated into an "Anomalies" cluster, how should you interpret this group?
    - **A)** It should be ignored since outliers should have been removed prior to scaling.
    - **B)** It indicates that the PCA failed to reduce the dimensions correctly.
    - **C)** The cluster's averages indicate extreme values that pull the overall averages away from the main distribution.
    - **D)** It implies that the Elbow method suggested too few clusters.

24. Compute the local clustering coefficient for a vertex connected to 3 other vertices, assuming those connected vertices share exactly 1 edge among themselves.
    - **A)** 0.66
    - **B)** 0.5
    - **C)** 0.16
    - **D)** 0.33

25. What is the defining characteristic of a Stationary time series?
    - **A)** The variance of the time series strictly increases over time.
    - **B)** The statistical properties of the series (mean, variance, autocorrelation) remain constant over time.
    - **C)** The data points are completely independent of one another.
    - **D)** The time series has a clear and predictable seasonal pattern.

26. Find the cosine similarity between client A with profile [1, 2] and client B with profile [2, 4].
    - **A)** 0.0
    - **B)** 0.5
    - **C)** 1.0
    - **D)** 0.8

27. An Augmented Dickey-Fuller (ADF) test on a dataset yields a p-value of 0.02. Using an alpha level of 0.05, what is the appropriate interpretation?
    - **A)** The series is stationary because 0.02 < 0.05 (Reject Null Hypothesis).
    - **B)** The series is non-stationary because 0.02 < 0.05 (Fail to Reject Null Hypothesis).
    - **C)** The series is stationary because 0.02 > 0.01.
    - **D)** The series is non-stationary and requires double differencing.

28. In a small web graph (Page 1 links to 2 and 3; Page 2 links to 3; Page 3 links to 1) with an initial PageRank of 1/3 for each, what is the PageRank of Page 2 after one update step?
    - **A)** 5/18
    - **B)** 1/3
    - **C)** 1/2
    - **D)** 1/6

29. A dataset of 25 measurements yields a mean of 120 and a standard deviation of 15. Determine the 90% confidence interval for the true mean. (t-value for df=24 is 1.711)
    - **A)** (113.82, 126.18)
    - **B)** (115.00, 125.00)
    - **C)** (114.87, 125.13)
    - **D)** (116.20, 123.80)

30. Does the origin (0, 0) satisfy the linear constraint 3x + 4y >= 12?
    - **A)** No, it is not feasible.
    - **B)** Yes, it is feasible.
    - **C)** Cannot be determined.
    - **D)** It is exactly on the boundary.

31. What term describes the phenomenon where similar entities in a graph tend to form connections with one another?
    - **A)** Bipartite matching
    - **B)** Homophily
    - **C)** Isomorphism
    - **D)** Triadic closure

32. In Recommendation Engines, what is the main goal of content-based filtering?
    - **A)** To recommend items based on the item's attributes and the user's past preferences.
    - **B)** To recommend items that similar users have liked.
    - **C)** To group items into random clusters.
    - **D)** To filter out inappropriate content from the system.

33. Which challenge is frequently encountered by collaborative filtering techniques when introducing fresh products to the catalog?
    - **A)** The Shilling attack problem
    - **B)** The Matrix Sparsity problem
    - **C)** The Cold Start problem
    - **D)** The Grey Sheep problem

34. To identify the correct order for a Moving Average (MA) model, which visualization helps pinpoint the appropriate lag 'q'?
    - **A)** Exponential Smoothing plot
    - **B)** PACF (Partial Autocorrelation Function) plot
    - **C)** Residuals QQ-plot
    - **D)** ACF (Autocorrelation Function) plot

35. A drawer contains 2 rigged coins (75% probability of heads) and 3 normal coins (50% probability of heads). You blindly pick one and flip it, getting heads. What is the chance that you picked a rigged coin?
    - **A)** 60%
    - **B)** 50%
    - **C)** 40%
    - **D)** 75%

36. Suppose a quiz has 5 questions, each offering 4 choices. What is the chance of guessing exactly 3 of them right?
    - **A)** 0.0156
    - **B)** 0.2500
    - **C)** 0.0879
    - **D)** 0.1055

37. When analyzing digital pictures, what is the main difference between color (RGB) and monochrome (grayscale) formats?
    - **A)** An RGB image has 3 color channels, whereas a grayscale image has only 1 channel.
    - **B)** An RGB image is compressed, whereas a grayscale image is uncompressed.
    - **C)** An RGB image uses float32 values, whereas a grayscale image uses uint8 values.
    - **D)** An RGB image has higher spatial resolution than a grayscale image.

38. Compute the Within-Cluster Sum of Squares (WCSS) for a cluster that has instances at (1,1) and (1,3) with its center at (1,2).
    - **A)** 1
    - **B)** 0
    - **C)** 4
    - **D)** 2

39. A network of 5 individuals has an average shortest path length of 2.5. What is the total sum of the shortest paths across all unique pairs of individuals?
    - **A)** 12.5
    - **B)** 50
    - **C)** 25
    - **D)** 20

40. Why do standard Convolutional Neural Networks (CNNs) struggle when applied directly to graph structures?
    - **A)** Graphs do not have a fixed grid structure, so standard convolutional filters cannot slide over them uniformly.
    - **B)** Graphs only contain continuous numerical data, which CNNs cannot process.
    - **C)** Graph data always lacks node features required for CNN input.
    - **D)** CNNs require undirected edges, but most graphs are directed.

41. The leverage metric for an association rule A -> B is support(A U B) - (support(A) * support(B)). If A has support 0.4, B has support 0.5, and A U B has support 0.25, calculate the leverage.
    - **A)** 1.25
    - **B)** 0.05
    - **C)** -0.05
    - **D)** 0.25

42. Consider the chronological sequence: 10, 20, 30, 40, 50. Calculate the Simple Moving Average (SMA) for the final period using a 3-period window.
    - **A)** 40
    - **B)** 30
    - **C)** 50
    - **D)** 20

43. Find the cosine similarity between reviewer X (ratings: [3, 4]) and reviewer Y (ratings: [4, 3]).
    - **A)** 0.82
    - **B)** 1.0
    - **C)** 0.96
    - **D)** 0.5

44. A dataset contains 5 sequences: {M, O, N, K, E, Y}, {D, O, N, K, E, Y}, {M, A, K, E}, {M, U, C, K}, {C, O, O, K, I, E}. Compute the support for element 'K'.
    - **A)** 60%
    - **B)** 80%
    - **C)** 40%
    - **D)** 100%

45. Given true targets [10, 20] and model outputs [12, 16], calculate the Mean Squared Error (MSE).
    - **A)** 3.0
    - **B)** 10.0
    - **C)** 5.0
    - **D)** 20.0

46. Calculate the total number of trainable weights (including biases) in a 2D convolution layer that has 8 filters of size 3x3 and processes an input volume with 3 channels.
    - **A)** 72
    - **B)** 216
    - **C)** 224
    - **D)** 80

47. In collaborative filtering, what is the role of the Pearson correlation coefficient?
    - **A)** The linear correlation between two variables, adjusting for user rating averages.
    - **B)** The Euclidean distance between two vectors.
    - **C)** The absolute difference in ratings.
    - **D)** The number of co-rated items.

48. The association rule {Chips, Salsa} -> {Guacamole} boasts an 80% confidence, and the itemset {Chips, Salsa} appears in 25% of transactions. What is the support for {Chips, Salsa, Guacamole}?
    - **A)** 5%
    - **B)** 32%
    - **C)** 105%
    - **D)** 20%

49. Calculate the value of the function Z = 5x + 2y at the coordinates (4, 1).
    - **A)** 15
    - **B)** 20
    - **C)** 22
    - **D)** 25

50. What primarily distinguishes Stemming from Lemmatization?
    - **A)** Stemming is rule-based and may output non-words; Lemmatization is dictionary-based and outputs valid base words.
    - **B)** Stemming uses a dictionary lookup; Lemmatization applies heuristic chopping rules.
    - **C)** Stemming is computationally slower than Lemmatization because it parses grammatical context.
    - **D)** Stemming requires Part-Of-Speech (POS) tags, while Lemmatization does not.

### Answer Key & Explanations

1. **B**. A bowl has 6 red and 20 green apples, totaling 26 apples. The probability of picking a red apple is 6/26, which simplifies to 3/13. *Calculator Instructions:* (1) Calculate 6 / 26 (2) Simplify to get 3/13
2. **A**. Average = (0 + 4 + 4 + 8) / 4 = 16 / 4 = 4. *Calculator Instructions:* (1) Sum the elements: 0 + 4 + 4 + 8 = 16 (2) Divide by the number of elements: 16 / 4 = 4
3. **C**. p-hat = 250/400 = 0.625. SE = sqrt(0.625 * 0.375 / 400) = sqrt(0.234375 / 400) ≈ 0.0242. Margin of error = 2.576 * 0.0242 ≈ 0.0623. CI = 0.625 ± 0.0623 = (0.5627, 0.6873). *Calculator Instructions:* (1) Calculate 250 / 400 (2) Calculate sqrt((0.625 * 0.375) / 400) (3) Calculate 2.576 * Ans (4) Calculate 0.625 - Ans and 0.625 + Ans
4. **D**. P(First Red) = 5/10. P(Second Red | First Red) = 4/9. (5/10) * (4/9) = 20/90 = 2/9. *Calculator Instructions:* (1) Calculate (5 / 10) * (4 / 9)
5. **B**. A lemmatizer reduces words to their dictionary base form. "swimming", "swims", and "swam" are all forms of the verb "swim", so they will all be reduced to "swim", resulting in 1 unique lemma. *Calculator Instructions:* (1) Lemmatize "swimming" -> "swim" (2) Lemmatize "swims" -> "swim" (3) Lemmatize "swam" -> "swim" (4) Count unique: "swim" -> 1
6. **C**. Standard deviation is the square root of the variance. sqrt(16) = 4. *Calculator Instructions:* (1) Calculate sqrt(16)
7. **A**. Since 5(1) + 5(1) = 10, it satisfies the constraint exactly on the boundary. *Calculator Instructions:* (1) Compute 5*1 + 5*1. (2) Compare the result to 10.
8. **D**. Since 2(2) + 3(2) = 4 + 6 = 10, which is <= 12, the point is feasible. *Calculator Instructions:* (1) Compute 2*2 + 3*2. (2) Compare the result to 12.
9. **C**. As K approaches the number of points, each point becomes its own cluster. The distance from a point to its cluster centroid becomes zero, meaning the Within-Cluster Sum of Squares (WCSS) reaches zero. *Calculator Instructions:* (1) WCSS = 0 when K = N.
10. **A**. For highly skewed and non-normal data with outliers, the non-parametric Spearman correlation is appropriate rather than Pearson. When running ANOVA, it is crucial to verify assumptions such as the equality of variances (homogeneity of variances) across groups.
11. **B**. Expected value E(X) = n * p = 500 * 0.01 = 5. *Calculator Instructions:* (1) Calculate 500 * 0.01
12. **A**. z = (p_hat - p0) / sqrt(p0*(1-p0)/n) = (0.55 - 0.50) / sqrt(0.50*0.50/100) = 0.05 / sqrt(0.0025) = 0.05 / 0.05 = 1.0. *Calculator Instructions:* (1) Calculate sqrt((0.50 * 0.50) / 100) (2) Calculate (0.55 - 0.50) / Ans
13. **C**. The filter has 9 elements, all equal to 1. The image region has 9 elements, all equal to 2. The element-wise product sum is 9 * (1 * 2) = 18. *Calculator Instructions:* (1) Calculate number of elements: 3 * 3 = 9 (2) Multiply element count by the product of individual corresponding elements: 9 * (1 * 2) = 18
14. **D**. Lift = Supp(A U B) / (Supp(A) * Supp(B)) = 0.1 / (0.2 * 0.3) = 0.1 / 0.06 = 1.666... *Calculator Instructions:* (1) P(A)*P(B) = 0.2 * 0.3 = 0.06 (2) Lift = 0.1 / 0.06 = 1.6667
15. **B**. The dot product is (2*1)+(2*2)+(1*2) = 8. The magnitudes are sqrt(4+4+1)=3 and sqrt(1+4+4)=3. 8 / 9 = 0.8889. *Calculator Instructions:* (1) Calculate dot product: 2*1 + 2*2 + 1*2 (2) Calculate magnitude of X: sqrt(2^2 + 2^2 + 1^2) (3) Calculate magnitude of Y: sqrt(1^2 + 2^2 + 2^2) (4) Divide dot product by product of magnitudes.
16. **C**. Standard error = s / sqrt(n) = 10 / sqrt(100) = 1. Margin of error = z * SE = 1.96 * 1 = 1.96. CI = 50 ± 1.96 = (48.04, 51.96). *Calculator Instructions:* (1) Calculate 10 / sqrt(100) (2) Calculate 1.96 * 1 (3) Calculate 50 - 1.96 and 50 + 1.96
17. **A**. TF = 5 / 50 = 0.10. IDF = log10(100 / 10) = log10(10) = 1.0. TF-IDF = 0.10 * 1.0 = 0.10. *Calculator Instructions:* (1) Calculate TF: 5 / 50 = 0.1 (2) Calculate IDF: log10(100 / 10) = 1 (3) Multiply TF and IDF: 0.1 * 1 = 0.1
18. **D**. EMA_t = alpha * Y_t + (1 - alpha) * EMA_{t-1} = 0.2 * 60 + 0.8 * 50 = 12 + 40 = 52. *Calculator Instructions:* (1) Calculate 0.2 * 60 = 12 (2) Calculate (1 - 0.2) * 50 = 0.8 * 50 = 40 (3) Add results: 12 + 40 = 52
19. **C**. sqrt((5-2)^2 + (7-3)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5. *Calculator Instructions:* (1) dx = 5 - 2 = 3 (2) dy = 7 - 3 = 4 (3) Dist = sqrt(3^2 + 4^2) = 5
20. **A**. Support is the proportion of total transactions containing the itemset. 4 / 10 = 0.40 or 40%. *Calculator Instructions:* (1) Count transactions with {X, Y} = 4 (2) Total transactions = 10 (3) Support = 4 / 10 = 0.40
21. **B**. Dot product = (0.6*0.3) + (0.8*0.4) = 0.18 + 0.32 = 0.50. Magnitude of vec1 = sqrt(0.36 + 0.64) = 1.0. Magnitude of vec2 = sqrt(0.09 + 0.16) = 0.5. Cosine similarity = 0.50 / (1.0 * 0.5) = 1.0. *Calculator Instructions:* (1) Calculate dot product: (0.6*0.3) + (0.8*0.4) = 0.5 (2) Calculate ||vec1||: sqrt(0.6^2 + 0.8^2) = 1.0 (3) Calculate ||vec2||: sqrt(0.3^2 + 0.4^2) = 0.5 (4) Calculate similarity: 0.5 / (1.0 * 0.5) = 1.0
22. **A**. Centroid = ((2+4)/2, (2+4)/2) = (6/2, 6/2) = (3,3). *Calculator Instructions:* (1) X = (2+4)/2 = 3 (2) Y = (2+4)/2 = 3
23. **C**. Outliers can form their own cluster if their values are significantly distinct. This pulls the averages and justifies labeling the distinct group as an anomaly or outlier cluster compared to the general trend.
24. **D**. Max edges = 3*2/2 = 3. Actual = 1. Coefficient = 1/3 ≈ 0.33. *Calculator Instructions:* (1) Calculate max possible edges: 3 * 2 / 2 = 3 (2) Divide actual edges by max possible edges: 1 / 3 ≈ 0.33
25. **B**. Stationarity means that the statistical properties (mean, variance, autocorrelation) do not change over time, and there is no trend or seasonality.
26. **C**. The dot product is (1*2) + (2*4) = 10. The magnitudes are sqrt(5) and sqrt(20). 10 / (sqrt(5)*sqrt(20)) = 10 / 10 = 1.0. *Calculator Instructions:* (1) Calculate dot product: 1*2 + 2*4 (2) Calculate magnitude of A: sqrt(1^2 + 2^2) (3) Calculate magnitude of B: sqrt(2^2 + 4^2) (4) Divide dot product by product of magnitudes.
27. **A**. The null hypothesis of ADF is that the series is non-stationary. A p-value less than 0.05 leads to rejecting the null hypothesis, meaning the series is stationary. *Calculator Instructions:* (1) Compare p-value to alpha: 0.02 < 0.05 (2) Conclude Reject H0 -> Stationary
28. **D**. Page 2 only receives PR from Page 1. Page 1 splits its PR (1/3) to Page 2 and Page 3. New PR of Page 2 = 1/6. *Calculator Instructions:* (1) Calculate contribution from Page 1 to Page 2: (1/3) / 2 = 1/6
29. **C**. SE = 15 / sqrt(25) = 3. Margin of error = t * SE = 1.711 * 3 = 5.133. CI = 120 ± 5.133 = (114.867, 125.133). *Calculator Instructions:* (1) Calculate 15 / sqrt(25) (2) Calculate 1.711 * 3 (3) Calculate 120 - 5.133 and 120 + 5.133
30. **A**. Since 3(0) + 4(0) = 0, which is < 12, the point is not feasible. *Calculator Instructions:* (1) Compute 3*0 + 4*0. (2) Compare the result to 12.
31. **B**. Homophily (often summarized as "birds of a feather flock together") is the principle that similar nodes are more likely to share an edge.
32. **A**. Content-based filtering uses item features and user profiles to recommend similar items to what the user liked in the past.
33. **C**. The cold start problem occurs when a recommender system cannot draw any inferences for users or items about which it has not yet gathered sufficient information.
34. **D**. The ACF plot cuts off sharply after lag q for an MA(q) process, making it the primary tool to determine the MA order.
35. **B**. P(Rigged) = 2/5 = 0.4. P(Normal) = 3/5 = 0.6. P(H|Rigged) = 0.75. P(H|Normal) = 0.5. P(Rigged|H) = (0.4 * 0.75) / ((0.4 * 0.75) + (0.6 * 0.5)) = 0.3 / (0.3 + 0.3) = 0.5. *Calculator Instructions:* (1) Calculate (0.4 * 0.75) / ((0.4 * 0.75) + (0.6 * 0.5))
36. **C**. Using binomial probability: C(5,3) * (0.25)^3 * (0.75)^2 = 10 * 0.015625 * 0.5625 ≈ 0.08789. *Calculator Instructions:* (1) Calculate 10 * (0.25^3) * (0.75^2)
37. **A**. RGB represents Red, Green, and Blue, requiring three separate channels to store pixel intensities. Grayscale represents only light intensity and requires a single channel.
38. **D**. The squared Euclidean distances to centroid (1,2): for (1,1) it is 0^2 + (-1)^2 = 1. For (1,3) it is 0^2 + 1^2 = 1. Total WCSS = 1 + 1 = 2. *Calculator Instructions:* (1) Point 1 dist^2 = (1-1)^2 + (1-2)^2 = 1 (2) Point 2 dist^2 = (1-1)^2 + (3-2)^2 = 1 (3) WCSS = 1 + 1 = 2
39. **C**. The number of distinct pairs is 5*4/2 = 10. Average path length = (Sum of path lengths) / (Number of pairs). 2.5 = Sum / 10. Sum = 25. *Calculator Instructions:* (1) Calculate number of distinct pairs: 5 * 4 / 2 = 10 (2) Multiply average path length by number of pairs: 2.5 * 10 = 25
40. **A**. Images have a strict Euclidean grid structure (pixels arranged in rows/columns), allowing a fixed-size filter to slide over them. Graphs have arbitrary, non-Euclidean topologies with varying neighborhood sizes.
41. **B**. Leverage = 0.25 - (0.4 * 0.5) = 0.25 - 0.20 = 0.05. *Calculator Instructions:* (1) Exp = 0.4 * 0.5 = 0.2 (2) Leverage = 0.25 - 0.2 = 0.05
42. **A**. The SMA with window size 3 at the last point (50) averages the last 3 values: (30 + 40 + 50) / 3 = 120 / 3 = 40. *Calculator Instructions:* (1) Identify the last 3 values: 30, 40, 50 (2) Calculate sum: 30 + 40 + 50 = 120 (3) Calculate average: 120 / 3 = 40
43. **C**. The dot product is (3*4) + (4*3) = 24. The magnitudes are sqrt(25)=5 and sqrt(25)=5. 24 / 25 = 0.96. *Calculator Instructions:* (1) Calculate dot product: 3*4 + 4*3 (2) Calculate magnitude of X: sqrt(3^2 + 4^2) (3) Calculate magnitude of Y: sqrt(4^2 + 3^2) (4) Divide dot product by product of magnitudes.
44. **D**. The item 'K' appears in all 5 sequences. Support = 5 / 5 = 100%. *Calculator Instructions:* (1) Count transactions with 'K' = 5 (2) Total transactions = 5 (3) Support = 5 / 5 = 1.0
45. **B**. Errors are (10-12)=-2 and (20-16)=4. Squared errors are 4 and 16. Sum = 20. MSE = 20 / 2 = 10.0. *Calculator Instructions:* (1) Calculate errors: (10-12)=-2, (20-16)=4 (2) Square errors: (-2)^2 = 4, (4)^2 = 16 (3) Sum squared errors: 4 + 16 = 20 (4) Divide by n: 20 / 2 = 10.0
46. **C**. Parameters per filter = (F * F * input_channels) + 1 (bias) = (3 * 3 * 3) + 1 = 28. Total parameters = 28 * 8 = 224. *Calculator Instructions:* (1) Calculate weights per filter: 3 * 3 * 3 = 27 (2) Add bias term per filter: 27 + 1 = 28 (3) Multiply by number of filters: 28 * 8 = 224
47. **A**. Pearson correlation measures the linear relationship between ratings of two users, adjusting for their mean rating tendencies.
48. **D**. Confidence = Supp(Chips,Salsa,Guacamole)/Supp(Chips,Salsa). Therefore Supp(Chips,Salsa,Guacamole) = Confidence * Supp(Chips,Salsa) = 0.8 * 0.25 = 0.20 or 20%. *Calculator Instructions:* (1) Support = Confidence * Support(Antecedent) (2) Support = 0.8 * 0.25 = 0.2
49. **C**. Substitute x = 4 and y = 1 into Z. Z = 5(4) + 2(1) = 20 + 2 = 22. *Calculator Instructions:* (1) Multiply 5 by 4. (2) Multiply 2 by 1. (3) Add the results.
50. **A**. Stemming relies on rule-based heuristics that chop off affixes (often yielding non-words), whereas Lemmatization uses dictionary morphing to return valid canonical base words (lemmas).

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 3]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


---
id: Mock-Exam-1
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

# Mock Exam 1

## Overview

> This mock examination assesses comprehensive statistical modeling concepts across probability distributions, hypothesis testing, regression analysis, clustering, classification, association rule mining, and time series modeling.

## Exam Questions

**1.** What is the probability of drawing two Aces consecutively from a standard deck of 52 cards without replacement?
- **A)** 1/221
- **B)** 1/169
- **C)** 1/26
- **D)** 4/52

**2.** If a coin is flipped 3 times, what is the probability of getting exactly 2 heads?
- **A)** 3/8
- **B)** 1/8
- **C)** 1/4
- **D)** 1/2

**3.** In a one-sample z-test, the sample mean is 105, population mean is 100, population standard deviation is 15, and sample size is 36. What is the z-statistic?
- **A)** 2.00
- **B)** 1.50
- **C)** 2.50
- **D)** 3.00

**4.** Given support(X) = 0.5, support(Y) = 0.4, confidence(X -> Y) = 0.6. What is support(X U Y)?
- **A)** 0.24
- **B)** 0.20
- **C)** 0.30
- **D)** 0.15

**5.** An input volume of size 32x32x3 is convolved with 10 filters of size 5x5x3, stride 1, padding 2. What are the dimensions of the resulting output volume?
- **A)** 32x32x10
- **B)** 28x28x10
- **C)** 32x32x3
- **D)** 30x30x10

**6.** In a factory, Machine A produces 60% of the items and Machine B produces 40%. Machine A has a defect rate of 2% and Machine B has a defect rate of 5%. If a randomly selected item is defective, what is the probability it came from Machine B?
- **A)** 62.5%
- **B)** 37.5%
- **C)** 40.0%
- **D)** 50.0%

**7.** An input volume has size 12x12x1. A convolution is applied using a 5x5 filter with stride 1 and padding 0. How many multiplications are performed in total during this single forward pass (ignoring bias addition)?
- **A)** 1600
- **B)** 1024
- **C)** 25
- **D)** 3600

**8.** If a dense network layer takes the flattened output of a 7x7x64 max pooling layer as input, and the dense layer has 10 neurons, how many weights (excluding bias) connect the max pooling layer to the dense layer?
- **A)** 31360
- **B)** 3136
- **C)** 640
- **D)** 448

**9.** According to the presentation Q&A, what is the primary reason for choosing Standard Scaling (Standardization) over Min-Max Scaling (Normalization), and what is a common misconception about the resulting values of Standardization?
- **A)** Standardization handles outliers better, and it maps all values strictly to a 0 to 1 range.
- **B)** Standardization handles outliers better, but it does NOT map values strictly to a 0 to 1 range (it can produce negative values or values > 1).
- **C)** Min-Max scaling is preferred when outliers are present, and standardization normalizes everything to a 0 to 1 range.
- **D)** Standardization is only used when the data has already had outliers removed.

**10.** You have an MA(1) model: y_t = 10 + 0.5 * e_{t-1}. If the previous forecast error e_{t-1} was -4, what is the forecast for y_t?
- **A)** 8.0
- **B)** 12.0
- **C)** 10.5
- **D)** -2.0

**11.** Consider the corpus: ["apple banana apple", "banana cherry"]. If we use a Bag of Words approach with `CountVectorizer` and alphabetical ordering of features, what is the feature vector for the first document?
- **A)** [2, 1, 0]
- **B)** [1, 2, 0]
- **C)** [2, 1]
- **D)** [1, 1, 1]

**12.** Consider finding Apriori candidates. The frequent 2-itemsets are {1,2}, {1,3}, {2,3}, {2,4}. What are the candidate 3-itemsets generated before pruning?
- **A)** {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}
- **B)** {1,2,3}, {2,3,4}
- **C)** {1,2,3}
- **D)** {1,2,3,4}

**13.** Calculate the 95% confidence interval for the variance of a sample of size 10 with a sample variance of 20. (Chi-square critical values for df=9: 2.700 and 19.023)
- **A)** (9.46, 66.67)
- **B)** (10.00, 60.00)
- **C)** (8.50, 68.20)
- **D)** (9.00, 70.00)

**14.** What is the probability of rolling a sum of 7 with two fair six-sided dice?
- **A)** 1/6
- **B)** 1/12
- **C)** 1/8
- **D)** 1/36

**15.** In the context of K-Means clustering, what does "inertia" represent and what is the ideal direction for this metric?
- **A)** Inertia is the number of points in a cluster; a higher inertia means more points belong to a cluster.
- **B)** Inertia is the squared distance from each point to its cluster centroid; a lower inertia means the points are tightly grouped around the centroid.
- **C)** Inertia measures the distance between different centroids; higher inertia means better separation.
- **D)** Inertia is the average playtime of games in a cluster; a lower inertia indicates budget games.

**16.** Consider an undirected graph with 5 nodes. The degree sequence is 2, 2, 3, 3, 2. How many edges does this graph have?
- **A)** 6
- **B)** 12
- **C)** 5
- **D)** 7

**17.** What is the dot product of item profile [2, 4, 6] and user profile [1, 0, 0]?
- **A)** 8
- **B)** 12
- **C)** 2
- **D)** 6

**18.** Evaluate the objective function Z = 4x + 6y at the point (0, 3).
- **A)** 12
- **B)** 10
- **C)** 18
- **D)** 24

**19.** What does the p-value represent in hypothesis testing?
- **A)** The probability of observing a test statistic as extreme as, or more extreme than, the one observed, assuming the null hypothesis is true.
- **B)** The probability that the null hypothesis is true.
- **C)** The probability of committing a Type I error.
- **D)** The probability of rejecting the alternative hypothesis.

**20.** What is the interpretation of a "Lift" value greater than 1 in an association rule A -> B?
- **A)** A and B appear together less often than expected by chance
- **B)** A and B are completely independent
- **C)** The occurrence of A decreases the likelihood of B
- **D)** A and B appear together more often than expected, indicating a positive correlation

**21.** Calculate the Jaccard distance between Set A = {1, 2, 3} and Set B = {2, 3, 4, 5}.
- **A)** 0.6
- **B)** 0.4
- **C)** 0.25
- **D)** 0.75

**22.** What is the dot product of item profile [4, 5] and user profile [-1, 2]?
- **A)** 5
- **B)** 6
- **C)** 14
- **D)** 2

**23.** Calculate the Root Mean Squared Error (RMSE) for actual values [5, 10] and predictions [2, 6].
- **A)** 3.53
- **B)** 12.50
- **C)** 5.00
- **D)** 25.00

**24.** A document contains the text: "Very good very very good". What is the raw term frequency (count) of the unigram "very"?
- **A)** 1
- **B)** 2
- **C)** 3
- **D)** 4

**25.** What is the maximum possible value for Confidence of an association rule?
- **A)** 0
- **B)** 1
- **C)** Infinity
- **D)** It depends on the size of the dataset

**26.** Calculate the cosine similarity between user A [1, 1] and user B [1, 1].
- **A)** 0.0
- **B)** 0.5
- **C)** 1.0
- **D)** 2.0

**27.** A 64x64 RGB image is flattened into a 1D vector. What is the dimension of the resulting vector?
- **A)** 12288
- **B)** 4096
- **C)** 8192
- **D)** 256

**28.** In an ARIMA(1, 1, 0) model, what does the middle '1' signify?
- **A)** The series has been differenced once to achieve stationarity.
- **B)** The model uses one autoregressive term.
- **C)** The model uses one moving average term.
- **D)** The seasonality period is 1.

**29.** The actual values are [100, 200] and predictions are [90, 210]. What is the Mean Absolute Percentage Error (MAPE)?
- **A)** 10.0%
- **B)** 7.5%
- **C)** 5.0%
- **D)** 15.0%

**30.** Which distribution is used for hypothesis testing of a population variance?
- **A)** Chi-Square distribution
- **B)** Normal distribution
- **C)** Student's t-distribution
- **D)** F-distribution

**31.** Calculate the Weighted Moving Average (WMA) for a time series [10, 20, 30] at t=3 with weights [1, 2, 3] (where the most recent observation has the highest weight).
- **A)** 23.33
- **B)** 20.00
- **C)** 15.00
- **D)** 25.00

**32.** A feature map of size 24x24 is subjected to a Max Pooling layer with a 3x3 filter and stride 3. What is the output dimension?
- **A)** 8x8
- **B)** 7x7
- **C)** 9x9
- **D)** 22x22

**33.** Calculate the Manhattan distance between point P(2, 3) and point Q(5, 7).
- **A)** 5
- **B)** 7
- **C)** 12
- **D)** 25

**34.** Calculate the cosine similarity between user A [3, 0, 4] and user B [0, 3, 4].
- **A)** 0.64
- **B)** 0.5
- **C)** 0.75
- **D)** 0.8

**35.** In Word2Vec architectures, which statement correctly describes the Continuous Bag of Words (CBOW) and Skip-Gram models?
- **A)** CBOW predicts context words using a single target word; Skip-Gram predicts a target word using context words.
- **B)** CBOW predicts a target word using surrounding context words; Skip-Gram predicts surrounding context words using a single target word.
- **C)** CBOW uses frequency-based count vectors, whereas Skip-Gram uses TF-IDF weights.
- **D)** CBOW preserves strict full-sentence word ordering, while Skip-Gram ignores word order completely.

**36.** Calculate the cosine similarity between user A with ratings [1, 0] and user B with ratings [0, 1].
- **A)** 0.5
- **B)** 1.0
- **C)** 0.0
- **D)** -1.0

**37.** You have two urns. Urn 1 has 4 red balls and 6 blue balls. Urn 2 has 5 red balls and 5 blue balls. You randomly pick an urn and then randomly pick a ball. It is red. What is the probability you picked Urn 1?
- **A)** 44.4%
- **B)** 50.0%
- **C)** 40.0%
- **D)** 55.6%

**38.** In Linear Programming, what represents the set of all possible points that satisfy all constraints?
- **A)** Feasible region
- **B)** Optimal solution
- **C)** Objective function
- **D)** Unbounded space

**39.** In a paired t-test with 20 pairs, the mean difference is 3.5 and standard deviation of differences is 4.0. What is the t-statistic?
- **A)** 3.91
- **B)** 3.50
- **C)** 4.10
- **D)** 2.85

**40.** After the pruning step of Apriori for the candidates {1,2,3} and {2,3,4} from the previous question, which candidates remain? The frequent 2-itemsets were {1,2}, {1,3}, {2,3}, {2,4}.
- **A)** {1,2,3}
- **B)** {2,3,4}
- **C)** {1,2,3} and {2,3,4}
- **D)** None

**41.** A graph has 4 nodes (A, B, C, D). Edges exist between (A,B), (B,C), (C,D), and (A,D). The edge weights are respectively 2, 3, 1, 5. What is the shortest path length from A to C?
- **A)** 4
- **B)** 5
- **C)** 6
- **D)** 7

**42.** In a document of 200 words, the word "algorithm" appears 8 times. What is the normalized Term Frequency (TF)?
- **A)** 0.04
- **B)** 0.08
- **C)** 8.00
- **D)** 25.0

**43.** Calculate the Minkowski distance (p=3) between P(0,0) and Q(3,4).
- **A)** 5
- **B)** 7
- **C)** 4.5
- **D)** 4.1

**44.** Using the same dataset (Total=10, Supp(A)=0.7, Supp(B)=0.6, Supp(A,B)=0.4), what is the confidence of the rule {A} -> {B}?
- **A)** 40.0%
- **B)** 57.1%
- **C)** 66.7%
- **D)** 83.3%

**45.** A random walk starts at node A, which has 4 outgoing edges with equal probability. One of the edges goes to B. Node B has 2 outgoing edges, one going to C. What is the probability of traversing the path A -> B -> C?
- **A)** 1/8
- **B)** 1/6
- **C)** 1/4
- **D)** 1/2

**46.** Is the point (3, 4) feasible for the constraint x + y <= 5?
- **A)** Yes, it is feasible.
- **B)** No, it is not feasible.
- **C)** Cannot be determined.
- **D)** It is exactly on the boundary.

**47.** In agglomerative clustering, the distance between Cluster 1 {A(0,0)} and Cluster 2 {B(3,0), C(4,0)} using complete linkage is:
- **A)** 3
- **B)** 4
- **C)** 3.5
- **D)** 1

**48.** An image of size 28x28 is processed by a convolutional layer with a 3x3 filter, stride of 1, and no padding (valid padding). What is the spatial dimension of the output feature map?
- **A)** 26x26
- **B)** 28x28
- **C)** 27x27
- **D)** 25x25

**49.** What is the dot product of item profile [-1, -1] and user profile [2, 2]?
- **A)** 0
- **B)** -2
- **C)** -4
- **D)** 4

**50.** The actual values for a time series are [10, 15, 20] and the predicted values are [12, 14, 23]. What is the Mean Absolute Error (MAE)?
- **A)** 2.0
- **B)** 2.5
- **C)** 1.5
- **D)** 4.6

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 1]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]



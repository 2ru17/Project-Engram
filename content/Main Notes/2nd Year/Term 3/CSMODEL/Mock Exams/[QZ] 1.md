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

**Tags:** #[[CSMODEL]] #[[Mock Exams]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Mock Exam 1

## Overview

> This mock examination assesses comprehensive statistical modeling concepts across probability distributions, hypothesis testing, regression analysis, clustering, classification, association rule mining, and time series modeling.

## Multiple Choice Questions

1. What is the probability of drawing two Aces consecutively from a standard deck of 52 cards without replacement?
    - **A)** 1/221
    - **B)** 1/169
    - **C)** 1/26
    - **D)** 4/52

2. If a coin is flipped 3 times, what is the probability of getting exactly 2 heads?
    - **A)** 3/8
    - **B)** 1/8
    - **C)** 1/4
    - **D)** 1/2

3. In a one-sample z-test, the sample mean is 105, population mean is 100, population standard deviation is 15, and sample size is 36. What is the z-statistic?
    - **A)** 2.00
    - **B)** 1.50
    - **C)** 2.50
    - **D)** 3.00

4. Given support(X) = 0.5, support(Y) = 0.4, confidence(X -> Y) = 0.6. What is support(X U Y)?
    - **A)** 0.24
    - **B)** 0.20
    - **C)** 0.30
    - **D)** 0.15

5. An input volume of size 32x32x3 is convolved with 10 filters of size 5x5x3, stride 1, padding 2. What are the dimensions of the resulting output volume?
    - **A)** 32x32x10
    - **B)** 28x28x10
    - **C)** 32x32x3
    - **D)** 30x30x10

6. In a factory, Machine A produces 60% of the items and Machine B produces 40%. Machine A has a defect rate of 2% and Machine B has a defect rate of 5%. If a randomly selected item is defective, what is the probability it came from Machine B?
    - **A)** 62.5%
    - **B)** 37.5%
    - **C)** 40.0%
    - **D)** 50.0%

7. An input volume has size 12x12x1. A convolution is applied using a 5x5 filter with stride 1 and padding 0. How many multiplications are performed in total during this single forward pass (ignoring bias addition)?
    - **A)** 1600
    - **B)** 1024
    - **C)** 25
    - **D)** 3600

8. If a dense network layer takes the flattened output of a 7x7x64 max pooling layer as input, and the dense layer has 10 neurons, how many weights (excluding bias) connect the max pooling layer to the dense layer?
    - **A)** 31360
    - **B)** 3136
    - **C)** 640
    - **D)** 448

9. According to the presentation Q&A, what is the primary reason for choosing Standard Scaling (Standardization) over Min-Max Scaling (Normalization), and what is a common misconception about the resulting values of Standardization?
    - **A)** Standardization handles outliers better, and it maps all values strictly to a 0 to 1 range.
    - **B)** Standardization handles outliers better, but it does NOT map values strictly to a 0 to 1 range (it can produce negative values or values > 1).
    - **C)** Min-Max scaling is preferred when outliers are present, and standardization normalizes everything to a 0 to 1 range.
    - **D)** Standardization is only used when the data has already had outliers removed.

10. You have an MA(1) model: y_t = 10 + 0.5 * e_{t-1}. If the previous forecast error e_{t-1} was -4, what is the forecast for y_t?
    - **A)** 8.0
    - **B)** 12.0
    - **C)** 10.5
    - **D)** -2.0

11. Consider the corpus: ["apple banana apple", "banana cherry"]. If we use a Bag of Words approach with `CountVectorizer` and alphabetical ordering of features, what is the feature vector for the first document?
    - **A)** [2, 1, 0]
    - **B)** [1, 2, 0]
    - **C)** [2, 1]
    - **D)** [1, 1, 1]

12. Consider finding Apriori candidates. The frequent 2-itemsets are {1,2}, {1,3}, {2,3}, {2,4}. What are the candidate 3-itemsets generated before pruning?
    - **A)** {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}
    - **B)** {1,2,3}, {2,3,4}
    - **C)** {1,2,3}
    - **D)** {1,2,3,4}

13. Calculate the 95% confidence interval for the variance of a sample of size 10 with a sample variance of 20. (Chi-square critical values for df=9: 2.700 and 19.023)
    - **A)** (9.46, 66.67)
    - **B)** (10.00, 60.00)
    - **C)** (8.50, 68.20)
    - **D)** (9.00, 70.00)

14. What is the probability of rolling a sum of 7 with two fair six-sided dice?
    - **A)** 1/6
    - **B)** 1/12
    - **C)** 1/8
    - **D)** 1/36

15. In the context of K-Means clustering, what does "inertia" represent and what is the ideal direction for this metric?
    - **A)** Inertia is the number of points in a cluster; a higher inertia means more points belong to a cluster.
    - **B)** Inertia is the squared distance from each point to its cluster centroid; a lower inertia means the points are tightly grouped around the centroid.
    - **C)** Inertia measures the distance between different centroids; higher inertia means better separation.
    - **D)** Inertia is the average playtime of games in a cluster; a lower inertia indicates budget games.

16. Consider an undirected graph with 5 nodes. The degree sequence is 2, 2, 3, 3, 2. How many edges does this graph have?
    - **A)** 6
    - **B)** 12
    - **C)** 5
    - **D)** 7

17. What is the dot product of item profile [2, 4, 6] and user profile [1, 0, 0]?
    - **A)** 8
    - **B)** 12
    - **C)** 2
    - **D)** 6

18. Evaluate the objective function Z = 4x + 6y at the point (0, 3).
    - **A)** 12
    - **B)** 10
    - **C)** 18
    - **D)** 24

19. What does the p-value represent in hypothesis testing?
    - **A)** The probability of observing a test statistic as extreme as, or more extreme than, the one observed, assuming the null hypothesis is true.
    - **B)** The probability that the null hypothesis is true.
    - **C)** The probability of committing a Type I error.
    - **D)** The probability of rejecting the alternative hypothesis.

20. What is the interpretation of a "Lift" value greater than 1 in an association rule A -> B?
    - **A)** A and B appear together less often than expected by chance
    - **B)** A and B are completely independent
    - **C)** The occurrence of A decreases the likelihood of B
    - **D)** A and B appear together more often than expected, indicating a positive correlation

21. Calculate the Jaccard distance between Set A = {1, 2, 3} and Set B = {2, 3, 4, 5}.
    - **A)** 0.6
    - **B)** 0.4
    - **C)** 0.25
    - **D)** 0.75

22. What is the dot product of item profile [4, 5] and user profile [-1, 2]?
    - **A)** 5
    - **B)** 6
    - **C)** 14
    - **D)** 2

23. Calculate the Root Mean Squared Error (RMSE) for actual values [5, 10] and predictions [2, 6].
    - **A)** 3.53
    - **B)** 12.50
    - **C)** 5.00
    - **D)** 25.00

24. A document contains the text: "Very good very very good". What is the raw term frequency (count) of the unigram "very"?
    - **A)** 1
    - **B)** 2
    - **C)** 3
    - **D)** 4

25. What is the maximum possible value for Confidence of an association rule?
    - **A)** 0
    - **B)** 1
    - **C)** Infinity
    - **D)** It depends on the size of the dataset

26. Calculate the cosine similarity between user A [1, 1] and user B [1, 1].
    - **A)** 0.0
    - **B)** 0.5
    - **C)** 1.0
    - **D)** 2.0

27. A 64x64 RGB image is flattened into a 1D vector. What is the dimension of the resulting vector?
    - **A)** 12288
    - **B)** 4096
    - **C)** 8192
    - **D)** 256

28. In an ARIMA(1, 1, 0) model, what does the middle '1' signify?
    - **A)** The series has been differenced once to achieve stationarity.
    - **B)** The model uses one autoregressive term.
    - **C)** The model uses one moving average term.
    - **D)** The seasonality period is 1.

29. The actual values are [100, 200] and predictions are [90, 210]. What is the Mean Absolute Percentage Error (MAPE)?
    - **A)** 10.0%
    - **B)** 7.5%
    - **C)** 5.0%
    - **D)** 15.0%

30. Which distribution is used for hypothesis testing of a population variance?
    - **A)** Chi-Square distribution
    - **B)** Normal distribution
    - **C)** Student's t-distribution
    - **D)** F-distribution

31. Calculate the Weighted Moving Average (WMA) for a time series [10, 20, 30] at t=3 with weights [1, 2, 3] (where the most recent observation has the highest weight).
    - **A)** 23.33
    - **B)** 20.00
    - **C)** 15.00
    - **D)** 25.00

32. A feature map of size 24x24 is subjected to a Max Pooling layer with a 3x3 filter and stride 3. What is the output dimension?
    - **A)** 8x8
    - **B)** 7x7
    - **C)** 9x9
    - **D)** 22x22

33. Calculate the Manhattan distance between point P(2, 3) and point Q(5, 7).
    - **A)** 5
    - **B)** 7
    - **C)** 12
    - **D)** 25

34. Calculate the cosine similarity between user A [3, 0, 4] and user B [0, 3, 4].
    - **A)** 0.64
    - **B)** 0.5
    - **C)** 0.75
    - **D)** 0.8

35. In Word2Vec architectures, which statement correctly describes the Continuous Bag of Words (CBOW) and Skip-Gram models?
    - **A)** CBOW predicts context words using a single target word; Skip-Gram predicts a target word using context words.
    - **B)** CBOW predicts a target word using surrounding context words; Skip-Gram predicts surrounding context words using a single target word.
    - **C)** CBOW uses frequency-based count vectors, whereas Skip-Gram uses TF-IDF weights.
    - **D)** CBOW preserves strict full-sentence word ordering, while Skip-Gram ignores word order completely.

36. Calculate the cosine similarity between user A with ratings [1, 0] and user B with ratings [0, 1].
    - **A)** 0.5
    - **B)** 1.0
    - **C)** 0.0
    - **D)** -1.0

37. You have two urns. Urn 1 has 4 red balls and 6 blue balls. Urn 2 has 5 red balls and 5 blue balls. You randomly pick an urn and then randomly pick a ball. It is red. What is the probability you picked Urn 1?
    - **A)** 44.4%
    - **B)** 50.0%
    - **C)** 40.0%
    - **D)** 55.6%

38. In Linear Programming, what represents the set of all possible points that satisfy all constraints?
    - **A)** Feasible region
    - **B)** Optimal solution
    - **C)** Objective function
    - **D)** Unbounded space

39. In a paired t-test with 20 pairs, the mean difference is 3.5 and standard deviation of differences is 4.0. What is the t-statistic?
    - **A)** 3.91
    - **B)** 3.50
    - **C)** 4.10
    - **D)** 2.85

40. After the pruning step of Apriori for the candidates {1,2,3} and {2,3,4} from the previous question, which candidates remain? The frequent 2-itemsets were {1,2}, {1,3}, {2,3}, {2,4}.
    - **A)** {1,2,3}
    - **B)** {2,3,4}
    - **C)** {1,2,3} and {2,3,4}
    - **D)** None

41. A graph has 4 nodes (A, B, C, D). Edges exist between (A,B), (B,C), (C,D), and (A,D). The edge weights are respectively 2, 3, 1, 5. What is the shortest path length from A to C?
    - **A)** 4
    - **B)** 5
    - **C)** 6
    - **D)** 7

42. In a document of 200 words, the word "algorithm" appears 8 times. What is the normalized Term Frequency (TF)?
    - **A)** 0.04
    - **B)** 0.08
    - **C)** 8.00
    - **D)** 25.0

43. Calculate the Minkowski distance (p=3) between P(0,0) and Q(3,4).
    - **A)** 5
    - **B)** 7
    - **C)** 4.5
    - **D)** 4.1

44. Using the same dataset (Total=10, Supp(A)=0.7, Supp(B)=0.6, Supp(A,B)=0.4), what is the confidence of the rule {A} -> {B}?
    - **A)** 40.0%
    - **B)** 57.1%
    - **C)** 66.7%
    - **D)** 83.3%

45. A random walk starts at node A, which has 4 outgoing edges with equal probability. One of the edges goes to B. Node B has 2 outgoing edges, one going to C. What is the probability of traversing the path A -> B -> C?
    - **A)** 1/8
    - **B)** 1/6
    - **C)** 1/4
    - **D)** 1/2

46. Is the point (3, 4) feasible for the constraint x + y <= 5?
    - **A)** Yes, it is feasible.
    - **B)** No, it is not feasible.
    - **C)** Cannot be determined.
    - **D)** It is exactly on the boundary.

47. In agglomerative clustering, the distance between Cluster 1 {A(0,0)} and Cluster 2 {B(3,0), C(4,0)} using complete linkage is:
    - **A)** 3
    - **B)** 4
    - **C)** 3.5
    - **D)** 1

48. An image of size 28x28 is processed by a convolutional layer with a 3x3 filter, stride of 1, and no padding (valid padding). What is the spatial dimension of the output feature map?
    - **A)** 26x26
    - **B)** 28x28
    - **C)** 27x27
    - **D)** 25x25

49. What is the dot product of item profile [-1, -1] and user profile [2, 2]?
    - **A)** 0
    - **B)** -2
    - **C)** -4
    - **D)** 4

50. The actual values for a time series are [10, 15, 20] and the predicted values are [12, 14, 23]. What is the Mean Absolute Error (MAE)?
    - **A)** 2.0
    - **B)** 2.5
    - **C)** 1.5
    - **D)** 4.6

### Answer Key & Explanations

1. **A**. Probability of first Ace is 4/52. Probability of second Ace given first is 3/51. (4/52) * (3/51) = (1/13) * (1/17) = 1/221. *Calculator Instructions:* (1) Calculate (4 / 52) * (3 / 51)
2. **A**. The possible outcomes with exactly 2 heads are HHT, HTH, THH. There are 2^3 = 8 total outcomes. Probability is 3/8. *Calculator Instructions:* (1) Calculate 3 / 8
3. **A**. z = (x_bar - mu) / (sigma / sqrt(n)) = (105 - 100) / (15 / sqrt(36)) = 5 / (15 / 6) = 5 / 2.5 = 2.0. *Calculator Instructions:* (1) Calculate 15 / sqrt(36) (2) Calculate (105 - 100) / Ans
4. **C**. Confidence = Support(X U Y) / Support(X). Support(X U Y) = 0.6 * 0.5 = 0.30. *Calculator Instructions:* (1) Support = Conf * Supp(X) (2) Support = 0.6 * 0.5 = 0.3
5. **A**. Output size = ((W - F + 2P) / S) + 1. W=32, F=5, P=2, S=1. Output = ((32 - 5 + 4) / 1) + 1 = 32. The number of filters determines the depth, so 10. Volume = 32x32x10. *Calculator Instructions:* (1) Compute 2P: 2 * 2 = 4 (2) Compute W - F + 2P: 32 - 5 + 4 = 31 (3) Divide by S and add 1: (31 / 1) + 1 = 32 (4) Output depth = number of filters = 10
6. **A**. P(A)=0.6, P(B)=0.4, P(D|A)=0.02, P(D|B)=0.05. P(B|D) = (0.4*0.05) / ((0.6*0.02) + (0.4*0.05)) = 0.02 / (0.012 + 0.02) = 0.02 / 0.032 = 0.625. *Calculator Instructions:* (1) Calculate (0.4 * 0.05) / ((0.6 * 0.02) + (0.4 * 0.05))
7. **A**. Output dimension = (12 - 5 + 0)/1 + 1 = 8. Output map is 8x8. Each of the 8*8=64 output pixels requires a 5*5=25 multiplication. Total = 64 * 25 = 1600. *Calculator Instructions:* (1) Calculate output width: (12 - 5) / 1 + 1 = 8 (2) Calculate number of output pixels: 8 * 8 = 64 (3) Calculate multiplications per pixel: 5 * 5 = 25 (4) Multiply output pixels by multiplications per pixel: 64 * 25 = 1600
8. **A**. Flattened size = 7 * 7 * 64 = 3136. Number of weights = input_size * output_size = 3136 * 10 = 31360. *Calculator Instructions:* (1) Calculate flattened size: 7 * 7 * 64 = 3136 (2) Multiply by number of neurons in dense layer: 3136 * 10 = 31360
9. **B**. Standard Scaling is less affected by outliers than Min-Max scaling. However, unlike Normalization which restricts values strictly between 0 and 1, Standardization computes the z-score, meaning values can be negative or greater than 1 (e.g., -3.6, 3.6).
10. **A**. y_t = 10 + 0.5 * (-4) = 10 - 2 = 8.0. *Calculator Instructions:* (1) Multiply 0.5 * -4 = -2 (2) Add 10: 10 + (-2) = 8
11. **A**. The vocabulary is alphabetically ['apple', 'banana', 'cherry']. In the first document, 'apple' appears 2 times, 'banana' 1 time, and 'cherry' 0 times. The vector is [2, 1, 0]. *Calculator Instructions:* (1) Identify vocabulary: 'apple', 'banana', 'cherry' (2) Count in Doc 1: apple=2, banana=1, cherry=0 (3) Form vector: [2, 1, 0]
12. **B**. Candidate generation joins pairs that share the first k-1 items. {1,2} and {1,3} share '1', generating {1,2,3}. {2,3} and {2,4} share '2', generating {2,3,4}. *Calculator Instructions:* (1) Identify pairs sharing first k-1 elements. (2) Join {1,2} and {1,3} -> {1,2,3} (3) Join {2,3} and {2,4} -> {2,3,4}
13. **A**. CI for variance = [ (n-1)*s^2 / chi2_upper, (n-1)*s^2 / chi2_lower ]. [ 9*20 / 19.023, 9*20 / 2.700 ] = [ 180 / 19.023, 180 / 2.700 ] = [ 9.46, 66.67 ]. *Calculator Instructions:* (1) Calculate 9 * 20 (2) Calculate 180 / 19.023 (3) Calculate 180 / 2.700
14. **A**. There are 6 combinations that result in a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). The total number of possible outcomes is 36. 6/36 = 1/6. *Calculator Instructions:* (1) Calculate 6 / 36
15. **B**. Inertia is the sum of squared distances of samples to their closest cluster center. A lower inertia means the points are closer to their centroid, indicating tighter clusters. It does NOT represent the number of data points in a group.
16. **A**. By the Handshaking Lemma, the sum of degrees is twice the number of edges. 2+2+3+3+2 = 12. 12/2 = 6. *Calculator Instructions:* (1) Sum the degree sequence: 2 + 2 + 3 + 3 + 2 = 12 (2) Divide the sum by 2 to get the number of edges: 12 / 2 = 6
17. **C**. The dot product is (2*1) + (4*0) + (6*0) = 2. *Calculator Instructions:* (1) Multiply corresponding elements. (2) Sum the products.
18. **C**. Substitute x = 0 and y = 3 into Z. Z = 4(0) + 6(3) = 18. *Calculator Instructions:* (1) Multiply 4 by 0. (2) Multiply 6 by 3. (3) Add the results.
19. **A**. The p-value measures the evidence against the null hypothesis; it is the probability of the observed data (or more extreme) if the null is true.
20. **D**. A Lift > 1 indicates a positive association between the antecedent and consequent, meaning the rule is more significant than a random coincidence.
21. **A**. Jaccard similarity = |Intersection| / |Union|. Intersection = {2, 3} (size 2). Union = {1, 2, 3, 4, 5} (size 5). Similarity = 2/5 = 0.4. Distance = 1 - 0.4 = 0.6. *Calculator Instructions:* (1) Intersection size = 2 (2) Union size = 5 (3) Sim = 2 / 5 = 0.4 (4) Dist = 1 - 0.4 = 0.6
22. **B**. The dot product is (4*-1) + (5*2) = -4 + 10 = 6. *Calculator Instructions:* (1) Multiply corresponding elements. (2) Sum the products.
23. **A**. Errors are 3 and 4. Squared errors are 9 and 16. Sum = 25. MSE = 12.5. RMSE = sqrt(12.5) ≈ 3.53. *Calculator Instructions:* (1) Calculate errors: (5-2)=3, (10-6)=4 (2) Square errors: 3^2=9, 4^2=16 (3) Calculate mean: (9+16)/2 = 12.5 (4) Calculate square root: sqrt(12.5) ≈ 3.53
24. **C**. "very" appears 3 times in the text (case-insensitive assuming standard tokenization). *Calculator Instructions:* (1) Count occurrences of "very": 3
25. **B**. Confidence is a conditional probability, representing the proportion of transactions containing X that also contain Y. The maximum value for any probability is 1 (or 100%). *Calculator Instructions:* (1) Probability max = 1.
26. **C**. The dot product is 1 + 1 = 2. The magnitudes are sqrt(2) and sqrt(2). 2 / 2 = 1.0. *Calculator Instructions:* (1) Calculate dot product: 1*1 + 1*1 (2) Calculate magnitude of A: sqrt(1^2 + 1^2) (3) Calculate magnitude of B: sqrt(1^2 + 1^2) (4) Divide dot product by product of magnitudes.
27. **A**. Flattened size = width * height * channels = 64 * 64 * 3 = 12288. *Calculator Instructions:* (1) Multiply width and height: 64 * 64 = 4096 (2) Multiply by channels: 4096 * 3 = 12288
28. **A**. In ARIMA(p, d, q), the middle parameter 'd' represents the degree of differencing. d=1 means first-order differencing was applied. *Calculator Instructions:* (1) Identify ARIMA(p, d, q) format (2) Map d = 1 (differencing)
29. **B**. Absolute percentage errors: |100-90|/100 = 10%, |200-210|/200 = 5%. Average = (10% + 5%) / 2 = 7.5%. *Calculator Instructions:* (1) Calculate % error 1: |100-90|/100 = 0.10 (10%) (2) Calculate % error 2: |200-210|/200 = 0.05 (5%) (3) Average % errors: (10% + 5%) / 2 = 7.5%
30. **A**. The chi-square distribution is used to test inferences about a single population variance.
31. **A**. WMA = (1*10 + 2*20 + 3*30) / (1 + 2 + 3) = (10 + 40 + 90) / 6 = 140 / 6 = 23.33. *Calculator Instructions:* (1) Multiply values by weights: 10*1, 20*2, 30*3 (2) Sum products: 10 + 40 + 90 = 140 (3) Sum weights: 1 + 2 + 3 = 6 (4) Divide: 140 / 6 = 23.33
32. **A**. Output size = ((W - F) / S) + 1 = ((24 - 3) / 3) + 1 = (21 / 3) + 1 = 7 + 1 = 8. *Calculator Instructions:* (1) Compute W - F: 24 - 3 = 21 (2) Divide by S: 21 / 3 = 7 (3) Add 1: 7 + 1 = 8
33. **B**. |5-2| + |7-3| = 3 + 4 = 7. *Calculator Instructions:* (1) dx = abs(5 - 2) = 3 (2) dy = abs(7 - 3) = 4 (3) Dist = 3 + 4 = 7
34. **A**. The dot product is 0 + 0 + 16 = 16. The magnitudes are sqrt(9+16)=5 and sqrt(9+16)=5. 16 / 25 = 0.64. *Calculator Instructions:* (1) Calculate dot product: 3*0 + 0*3 + 4*4 (2) Calculate magnitude of A: sqrt(3^2 + 0^2 + 4^2) (3) Calculate magnitude of B: sqrt(0^2 + 3^2 + 4^2) (4) Divide dot product by product of magnitudes.
35. **B**. CBOW takes multiple surrounding context words as input to predict the missing central target word. Skip-Gram takes a single central target word as input to predict its surrounding context words.
36. **C**. The dot product is (1*0) + (0*1) = 0. Since the dot product is 0, the cosine similarity is 0. *Calculator Instructions:* (1) Calculate dot product: 1*0 + 0*1 (2) Calculate magnitude of A: sqrt(1^2 + 0^2) (3) Calculate magnitude of B: sqrt(0^2 + 1^2) (4) Divide dot product by product of magnitudes.
37. **A**. P(U1)=0.5, P(U2)=0.5. P(R|U1)=0.4, P(R|U2)=0.5. P(U1|R) = (0.5*0.4) / ((0.5*0.4) + (0.5*0.5)) = 0.2 / (0.2 + 0.25) = 0.2 / 0.45 ≈ 0.444. *Calculator Instructions:* (1) Calculate 0.2 / 0.45
38. **A**. The feasible region is the intersection of all constraint inequalities, representing all valid solutions.
39. **A**. t = (d_bar - 0) / (s_d / sqrt(n)) = 3.5 / (4.0 / sqrt(20)) = 3.5 / (4.0 / 4.472) = 3.5 / 0.8944 = 3.913. *Calculator Instructions:* (1) Calculate 4.0 / sqrt(20) (2) Calculate 3.5 / Ans
40. **A**. Subsets of {1,2,3} are {1,2}, {1,3}, {2,3} (all frequent). Subsets of {2,3,4} are {2,3}, {2,4}, {3,4}. But {3,4} is not frequent. So {2,3,4} is pruned. *Calculator Instructions:* (1) Check subsets of {1,2,3}: {1,2}, {1,3}, {2,3}. All exist. (2) Check subsets of {2,3,4}: {2,3}, {2,4}, {3,4}. {3,4} is missing. Prune.
41. **B**. Path A->B->C has length 2+3 = 5. Path A->D->C has length 5+1 = 6. The shortest is 5. *Calculator Instructions:* (1) Calculate path A->B->C: 2 + 3 = 5 (2) Calculate path A->D->C: 5 + 1 = 6 (3) Find the minimum: min(5, 6) = 5
42. **A**. The normalized TF is the count of the term divided by the total number of words. 8 / 200 = 0.04. *Calculator Instructions:* (1) Calculate 8 / 200 = 0.04
43. **C**. (|3-0|^3 + |4-0|^3)^(1/3) = (27 + 64)^(1/3) = 91^(1/3) ≈ 4.497. *Calculator Instructions:* (1) (3^3 + 4^3) = 27 + 64 = 91 (2) 91^(1/3) = 4.4979
44. **B**. Confidence is Support(A, B) / Support(A). 0.4 / 0.7 = 0.5714 or 57.1%. *Calculator Instructions:* (1) Support({A, B}) = 0.4 (2) Support(A) = 0.7 (3) Confidence = 0.4 / 0.7 = 0.5714
45. **A**. Probability = P(A->B) * P(B->C) = (1/4) * (1/2) = 1/8. *Calculator Instructions:* (1) Calculate probability of A->B: 1/4 (2) Calculate probability of B->C: 1/2 (3) Multiply probabilities: (1/4) * (1/2) = 1/8
46. **B**. Since 3 + 4 = 7, which is > 5, the point is not feasible. *Calculator Instructions:* (1) Compute 3 + 4. (2) Compare the result to 5.
47. **B**. Complete linkage takes the maximum distance between points in the two clusters. Dist(A,B)=3, Dist(A,C)=4. Maximum is 4. *Calculator Instructions:* (1) Dist A to B = 3 (2) Dist A to C = 4 (3) Max(3, 4) = 4
48. **A**. Output size = ((W - F + 2P) / S) + 1. W=28, F=3, P=0, S=1. Output = ((28 - 3 + 0) / 1) + 1 = 26. *Calculator Instructions:* (1) Compute W - F: 28 - 3 = 25 (2) Divide by S: 25 / 1 = 25 (3) Add 1: 25 + 1 = 26
49. **C**. The dot product is (-1*2) + (-1*2) = -2 - 2 = -4. *Calculator Instructions:* (1) Multiply corresponding elements. (2) Sum the products.
50. **A**. Absolute errors are |10-12|=2, |15-14|=1, |20-23|=3. Sum = 6. MAE = 6 / 3 = 2.0. *Calculator Instructions:* (1) Calculate abs errors: |10-12|=2, |15-14|=1, |20-23|=3 (2) Sum errors: 2 + 1 + 3 = 6 (3) Divide by n: 6 / 3 = 2.0

## References & Navigation

- **Detailed Step-by-Step Solutions:** [[[ANS] 1]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]



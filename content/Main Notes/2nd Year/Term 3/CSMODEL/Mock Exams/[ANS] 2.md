---
id: Detailed-Solution-2
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

# Detailed Solutions - Exam 2

## Overview

> This document contains comprehensive step-by-step mathematical derivations, vector similarity calculations, probability proofs, and calculator usage steps for all 50 questions in Mock Exam 2.

## Solutions & Explanations

**Question 1:** **Answer:** A
**Explanation:** 1st difference: [NaN, 2, 3, 4, 5]. 2nd difference (the difference of the 1st differences): [NaN, NaN, 1, 1, 1]. The element at t=5 is 1.
*Calculator Instructions:*
1. Find 1st differences: 12-10=2, 15-12=3, 19-15=4, 24-19=5.
2. Find 2nd difference for t=5: 5 - 4 = 1.

**Question 2:** **Answer:** C
**Explanation:** Adding more clusters (larger k) means there are more centers spread throughout the space. Because there are more centers, the data points don't have to reach as far to find their assigned center, reducing the total distance metric.

**Question 3:** **Answer:** A
**Explanation:** The sum of products is (5*1) + (5*1) + (5*1) = 15.
*Calculator Instructions:*
1. Multiply pairs of values.
2. Add them up.

**Question 4:** **Answer:** A
**Explanation:** Distance to C1: sqrt(3^2 + 4^2) = 5. Distance to C2: sqrt((10-3)^2 + (10-4)^2) = sqrt(49 + 36) = sqrt(85) ≈ 9.22. The new point is closer to C1.
*Calculator Instructions:*
1. Dist to C1 = sqrt(9 + 16) = 5
2. Dist to C2 = sqrt(49 + 36) = 9.219
3. 5 < 9.219, hence C1.

**Question 5:** **Answer:** B
**Explanation:** C gets value from A and B. A gives half its score (1/3) to C, which is 1/6. B gives all its score (1/3) to C. C's updated score = 1/6 + 1/3 = 1/2.
*Calculator Instructions:*
1. A's share to C: (1/3) / 2 = 1/6
2. B's share to C: (1/3) / 1 = 1/3
3. Sum: 1/6 + 1/3 = 1/2

**Question 6:** **Answer:** C
**Explanation:** The sum of products is (0*3) + (2*1) + (4*0) = 0 + 2 + 0 = 2.
*Calculator Instructions:*
1. Multiply pairs of values.
2. Add them up.

**Question 7:** **Answer:** B
**Explanation:** The 15% support indicates that 15% of all 1000 receipts contain X and Y. 1000 * 0.15 = 150.
*Calculator Instructions:*
1. Result = Total * Support fraction
2. 1000 * 0.15 = 150

**Question 8:** **Answer:** B
**Explanation:** A only gets value from C. C passes its entire score (1/3) to A. A's updated score = 1/3.
*Calculator Instructions:*
1. C's share to A: (1/3) / 1 = 1/3

**Question 9:** **Answer:** C
**Explanation:** The seasonal segment is formatted as (P, D, Q)[s]. In this case, D is the middle value, which is 1.
*Calculator Instructions:*
1. Check format (P, D, Q)[s]
2. D = 1

**Question 10:** **Answer:** A
**Explanation:** Margin = z * (sd / sqrt(n)), thus n = (z * sd / Margin)^2. Using the values: n = (1.96 * 15 / 2)^2 = (29.4 / 2)^2 = 14.7^2 = 216.09. Rounding up gives 217.
*Calculator Instructions:*
1. Compute (1.96 * 15 / 2)^2
2. Round up to the next integer

**Question 11:** **Answer:** A
**Explanation:** Total pixels = 100 * 100 = 10000. There are 3 color channels. Each channel takes 1 byte. Total = 10000 * 3 * 1 = 30000 bytes.
*Calculator Instructions:*
1. Pixels: 100 * 100 = 10000
2. Total bytes: 10000 * 3 = 30000

**Question 12:** **Answer:** B
**Explanation:** Node A receives incoming paths from C and D (In = 2). Node A sends paths to B, C, and D (Out = 3).
*Calculator Instructions:*
1. Count incoming to A (C, D) = 2
2. Count outgoing from A (B, C, D) = 3

**Question 13:** **Answer:** A
**Explanation:** Plug in x = 2 and y = 3. Z = 3(2) + 4(3) = 6 + 12 = 18.
*Calculator Instructions:*
1. 3 * 2 = 6
2. 4 * 3 = 12
3. 6 + 12 = 18

**Question 14:** **Answer:** B
**Explanation:** For an undirected matrix, the sum of all its values equals double the total edge count. 14 / 2 = 7 edges.
*Calculator Instructions:*
1. 14 / 2 = 7

**Question 15:** **Answer:** B
**Explanation:** PCA extracts features rather than simply dropping them. It generates new composite dimensions (like PC1, PC2) from the original data to compress and visualize it, rather than just picking one attribute.

**Question 16:** **Answer:** C
**Explanation:** The term appears everywhere, so df = N = 500. N/df = 1. Therefore, log10(1) = 0.
*Calculator Instructions:*
1. df = 500
2. log10(500/500) = log10(1) = 0

**Question 17:** **Answer:** B
**Explanation:** Plug in x = 3 and y = 1. Z = 2(3) + 9(1) = 6 + 9 = 15.
*Calculator Instructions:*
1. 2 * 3 = 6
2. 9 * 1 = 9
3. 6 + 9 = 15

**Question 18:** **Answer:** A
**Explanation:** The sum of products is (2*1) + (3*2) + (1*3) = 2 + 6 + 3 = 11.
*Calculator Instructions:*
1. Multiply pairs of values.
2. Add them up.

**Question 19:** **Answer:** A
**Explanation:** The new size is ((Input - Filter) / Stride) + 1. ((10 - 2) / 2) + 1 = (8/2) + 1 = 5.
*Calculator Instructions:*
1. 10 - 2 = 8
2. 8 / 2 = 4
3. 4 + 1 = 5

**Question 20:** **Answer:** A
**Explanation:** An independent t-test assumes the data points are NOT matched or paired. If they were, you would use a paired test instead.

**Question 21:** **Answer:** A
**Explanation:** At alpha=0.05 for a two-sided test, the rejection region is 0.025 on each side, which translates to a z-score of 1.96.
*Calculator Instructions:*
1. Lookup z for 0.975

**Question 22:** **Answer:** A
**Explanation:** Sorted words are ['hello', 'world']. The term 'world' is the second item, giving the vector [0, 1].
*Calculator Instructions:*
1. Vocab: ['hello', 'world']
2. 'world' is at index 1
3. Vector is [0, 1]

**Question 23:** **Answer:** A
**Explanation:** RF = RF_prev + (Filter - 1) * Stride. Layer 1 RF is 3. Layer 2 RF is 3 + (3 - 1)*1 = 5. The field is 5x5.
*Calculator Instructions:*
1. First layer RF: 3
2. Second layer RF: 3 + (3 - 1) = 5

**Question 24:** **Answer:** A
**Explanation:** 4 acquaintances can have at most (4*3)/2 = 6 links. They actually have 3. The ratio is 3/6 = 0.5.
*Calculator Instructions:*
1. Max links: (4 * 3) / 2 = 6
2. Actual / Max: 3 / 6 = 0.5

**Question 25:** **Answer:** B
**Explanation:** Apriori focuses on finding sets of items that appear together often, establishing rules for association.

**Question 26:** **Answer:** A
**Explanation:** Lift = Support(X, Y) / (Support(X) * Support(Y)) = 0.4 / (0.7 * 0.6) = 0.4 / 0.42 = 0.952.
*Calculator Instructions:*
1. 0.7 * 0.6 = 0.42
2. 0.4 / 0.42 = 0.952

**Question 27:** **Answer:** A
**Explanation:** The Fundamental Theorem of Linear Programming guarantees that the best solution lies at one of the vertices (corners) of the allowable space.

**Question 28:** **Answer:** C
**Explanation:** Single linkage calculates cluster distance using the closest pair of points across the two clusters.

**Question 29:** **Answer:** D
**Explanation:** Average linkage finds the mean of all distances between every point in the first cluster and every point in the second.
*Calculator Instructions:*
1. None

**Question 30:** **Answer:** B
**Explanation:** Using `fit_transform()` on a test set creates a completely separate vocabulary from the training set, causing the features to not match up when making predictions. You should use `transform()` instead.

**Question 31:** **Answer:** C
**Explanation:** Porter stemmers remove common endings. "running" and "runs" usually reduce to "run", but "ran" is irregular and remains "ran". Thus, there are 2 unique stems: "run" and "ran".
*Calculator Instructions:*
1. Stem words: "run", "run", "ran"
2. Count distinct: 2

**Question 32:** **Answer:** A
**Explanation:** y_t = 5 + 0.6 * 10 = 5 + 6 = 11.0.
*Calculator Instructions:*
1. 0.6 * 10 = 6
2. 5 + 6 = 11

**Question 33:** **Answer:** A
**Explanation:** Increasing the sample size shrinks the standard error, which makes the confidence interval narrower (decreases its width).

**Question 34:** **Answer:** A
**Explanation:** A Type I error, or false positive, happens when you wrongly reject a true null hypothesis.

**Question 35:** **Answer:** B
**Explanation:** Plug in x = 5 and y = 5. Z = 5 + 5 = 10.
*Calculator Instructions:*
1. 5 + 5 = 10

**Question 36:** **Answer:** C
**Explanation:** Plug in x = 1 and y = 2. Z = 10(1) + 15(2) = 10 + 30 = 40.
*Calculator Instructions:*
1. 10 * 1 = 10
2. 15 * 2 = 30
3. 10 + 30 = 40

**Question 37:** **Answer:** A
**Explanation:** An adjacency matrix for a standard graph has zeros down its diagonal. The trace is the sum of these diagonal values, which is 0.
*Calculator Instructions:*
1. Diagonals are all 0
2. Sum = 0

**Question 38:** **Answer:** B
**Explanation:** For an AR(p) model, the PACF chart will cut off quickly after the p-th lag, making it ideal for determining the order.

**Question 39:** **Answer:** A
**Explanation:** For a goodness-of-fit test, degrees of freedom = number of groups - 1 = 5 - 1 = 4.
*Calculator Instructions:*
1. 5 - 1 = 4

**Question 40:** **Answer:** B
**Explanation:** Checking proximity to c1=3 and c2=4. Value 2 is closer to c1. Value 3 is closer to c1. Value 4 is closer to c2. Cluster 1 gets {2, 3}. Its new mean is (2+3)/2 = 2.5.
*Calculator Instructions:*
1. Cluster 1 contains {2, 3}
2. Mean = (2+3) / 2 = 2.5

**Question 41:** **Answer:** A
**Explanation:** Pooling scales down the physical dimensions of the data layers, which reduces the number of parameters and lowers processing requirements.

**Question 42:** **Answer:** B
**Explanation:** Unigrams: "data", "science", "is", "fun" (4). Bigrams: "data science", "science is", "is fun" (3). Total = 7.
*Calculator Instructions:*
1. 4 unigrams
2. 3 bigrams
3. 4 + 3 = 7

**Question 43:** **Answer:** B
**Explanation:** Because K-Means relies on averages to update its centers, it is easily pulled off course by extreme outliers.

**Question 44:** **Answer:** B
**Explanation:** Items 'O' and 'K' show up together in 3 of the 5 transactions. The support is 3 / 5 = 0.60 or 60%.
*Calculator Instructions:*
1. Total appearances = 3
2. 3 / 5 = 0.6

**Question 45:** **Answer:** A
**Explanation:** Std Error = sqrt(100/30 + 144/40) = sqrt(3.33 + 3.6) = sqrt(6.933) ≈ 2.633. Margin = 1.96 * 2.633 ≈ 5.16. Difference = 50 - 45 = 5. Range is 5 ± 5.16, which is (-0.16, 10.16). Option A is the best fit.
*Calculator Instructions:*
1. sqrt((10^2 / 30) + (12^2 / 40)) = 2.633
2. 1.96 * 2.633 = 5.161
3. 5 - 5.161 = -0.161
4. 5 + 5.161 = 10.161

**Question 46:** **Answer:** A
**Explanation:** First difference is Y_t - Y_{t-1}. At t=4, Y_4 = 18 and Y_3 = 14. 18 - 14 = 4.
*Calculator Instructions:*
1. Y_4 = 18, Y_3 = 14
2. 18 - 14 = 4

**Question 47:** **Answer:** A
**Explanation:** P(Virus) = 0.01, P(+|Virus) = 0.99, P(No Virus) = 0.99, P(+|No Virus) = 0.01. Bayes formula: (0.99*0.01) / ((0.99*0.01) + (0.01*0.99)) = 0.0099 / 0.0198 = 0.5.
*Calculator Instructions:*
1. (0.99 * 0.01) / ((0.99 * 0.01) + (0.01 * 0.99)) = 0.5

**Question 48:** **Answer:** B
**Explanation:** Evaluating 2(5) + 0 gives 10. Since 10 is greater than 8, it does not satisfy the constraint.
*Calculator Instructions:*
1. 2 * 5 + 0 = 10
2. 10 > 8

**Question 49:** **Answer:** A
**Explanation:** P(Junk)=0.3, P(Flag|Junk)=0.95, P(Valid)=0.7, P(Flag|Valid)=0.02. Probability = (0.3*0.95) / ((0.3*0.95) + (0.7*0.02)) = 0.285 / (0.285 + 0.014) = 0.285 / 0.299 ≈ 0.9532.
*Calculator Instructions:*
1. Calculate (0.3 * 0.95) / ((0.3 * 0.95) + (0.7 * 0.02))

**Question 50:** **Answer:** A
**Explanation:** Plug in x = 2 and y = 2. Z = 7(2) + 8(2) = 14 + 16 = 30.
*Calculator Instructions:*
1. 7 * 2 = 14
2. 8 * 2 = 16
3. 14 + 16 = 30

## References & Navigation

- **Question Sheet:** [[[QZ] 2]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


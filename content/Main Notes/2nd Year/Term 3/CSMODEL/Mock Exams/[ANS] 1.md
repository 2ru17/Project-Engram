---
id: Detailed-Solution-1
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

# Detailed Solutions - Exam 1

## Overview

> This document contains comprehensive, step-by-step mathematical solutions, conceptual explanations, and scientific calculator execution instructions for all 50 questions in Mock Exam 1.

## Solutions & Explanations

**Question 1:** **Answer:** A
**Explanation:** Probability of first Ace is 4/52. Probability of second Ace given first is 3/51. (4/52) * (3/51) = (1/13) * (1/17) = 1/221.
*Calculator Instructions:*
1. Calculate (4 / 52) * (3 / 51)

**Question 2:** **Answer:** A
**Explanation:** The possible outcomes with exactly 2 heads are HHT, HTH, THH. There are 2^3 = 8 total outcomes. Probability is 3/8.
*Calculator Instructions:*
1. Calculate 3 / 8

**Question 3:** **Answer:** A
**Explanation:** z = (x_bar - mu) / (sigma / sqrt(n)) = (105 - 100) / (15 / sqrt(36)) = 5 / (15 / 6) = 5 / 2.5 = 2.0.
*Calculator Instructions:*
1. Calculate 15 / sqrt(36)
2. Calculate (105 - 100) / Ans

**Question 4:** **Answer:** C
**Explanation:** Confidence = Support(X U Y) / Support(X). Support(X U Y) = 0.6 * 0.5 = 0.30.
*Calculator Instructions:*
1. Support = Conf * Supp(X)
2. Support = 0.6 * 0.5 = 0.3

**Question 5:** **Answer:** A
**Explanation:** Output size = ((W - F + 2P) / S) + 1. W=32, F=5, P=2, S=1. Output = ((32 - 5 + 4) / 1) + 1 = 32. The number of filters determines the depth, so 10. Volume = 32x32x10.
*Calculator Instructions:*
1. Compute 2P: 2 * 2 = 4
2. Compute W - F + 2P: 32 - 5 + 4 = 31
3. Divide by S and add 1: (31 / 1) + 1 = 32
4. Output depth = number of filters = 10

**Question 6:** **Answer:** A
**Explanation:** P(A)=0.6, P(B)=0.4, P(D|A)=0.02, P(D|B)=0.05. P(B|D) = (0.4*0.05) / ((0.6*0.02) + (0.4*0.05)) = 0.02 / (0.012 + 0.02) = 0.02 / 0.032 = 0.625.
*Calculator Instructions:*
1. Calculate (0.4 * 0.05) / ((0.6 * 0.02) + (0.4 * 0.05))

**Question 7:** **Answer:** A
**Explanation:** Output dimension = (12 - 5 + 0)/1 + 1 = 8. Output map is 8x8. Each of the 8*8=64 output pixels requires a 5*5=25 multiplication. Total = 64 * 25 = 1600.
*Calculator Instructions:*
1. Calculate output width: (12 - 5) / 1 + 1 = 8
2. Calculate number of output pixels: 8 * 8 = 64
3. Calculate multiplications per pixel: 5 * 5 = 25
4. Multiply output pixels by multiplications per pixel: 64 * 25 = 1600

**Question 8:** **Answer:** A
**Explanation:** Flattened size = 7 * 7 * 64 = 3136. Number of weights = input_size * output_size = 3136 * 10 = 31360.
*Calculator Instructions:*
1. Calculate flattened size: 7 * 7 * 64 = 3136
2. Multiply by number of neurons in dense layer: 3136 * 10 = 31360

**Question 9:** **Answer:** B
**Explanation:** Standard Scaling is less affected by outliers than Min-Max scaling. However, unlike Normalization which restricts values strictly between 0 and 1, Standardization computes the z-score, meaning values can be negative or greater than 1 (e.g., -3.6, 3.6).

**Question 10:** **Answer:** A
**Explanation:** y_t = 10 + 0.5 * (-4) = 10 - 2 = 8.0.
*Calculator Instructions:*
1. Multiply 0.5 * -4 = -2
2. Add 10: 10 + (-2) = 8

**Question 11:** **Answer:** A
**Explanation:** The vocabulary is alphabetically ['apple', 'banana', 'cherry']. In the first document, 'apple' appears 2 times, 'banana' 1 time, and 'cherry' 0 times. The vector is [2, 1, 0].
*Calculator Instructions:*
1. Identify vocabulary: 'apple', 'banana', 'cherry'
2. Count in Doc 1: apple=2, banana=1, cherry=0
3. Form vector: [2, 1, 0]

**Question 12:** **Answer:** B
**Explanation:** Candidate generation joins pairs that share the first k-1 items. {1,2} and {1,3} share '1', generating {1,2,3}. {2,3} and {2,4} share '2', generating {2,3,4}.
*Calculator Instructions:*
1. Identify pairs sharing first k-1 elements.
2. Join {1,2} and {1,3} -> {1,2,3}
3. Join {2,3} and {2,4} -> {2,3,4}

**Question 13:** **Answer:** A
**Explanation:** CI for variance = [ (n-1)*s^2 / chi2_upper, (n-1)*s^2 / chi2_lower ]. [ 9*20 / 19.023, 9*20 / 2.700 ] = [ 180 / 19.023, 180 / 2.700 ] = [ 9.46, 66.67 ].
*Calculator Instructions:*
1. Calculate 9 * 20
2. Calculate 180 / 19.023
3. Calculate 180 / 2.700

**Question 14:** **Answer:** A
**Explanation:** There are 6 combinations that result in a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). The total number of possible outcomes is 36. 6/36 = 1/6.
*Calculator Instructions:*
1. Calculate 6 / 36

**Question 15:** **Answer:** B
**Explanation:** Inertia is the sum of squared distances of samples to their closest cluster center. A lower inertia means the points are closer to their centroid, indicating tighter clusters. It does NOT represent the number of data points in a group.

**Question 16:** **Answer:** A
**Explanation:** By the Handshaking Lemma, the sum of degrees is twice the number of edges. 2+2+3+3+2 = 12. 12/2 = 6.
*Calculator Instructions:*
1. Sum the degree sequence: 2 + 2 + 3 + 3 + 2 = 12
2. Divide the sum by 2 to get the number of edges: 12 / 2 = 6

**Question 17:** **Answer:** C
**Explanation:** The dot product is (2*1) + (4*0) + (6*0) = 2.
*Calculator Instructions:*
1. Multiply corresponding elements.
2. Sum the products.

**Question 18:** **Answer:** C
**Explanation:** Substitute x = 0 and y = 3 into Z. Z = 4(0) + 6(3) = 18.
*Calculator Instructions:*
1. Multiply 4 by 0.
2. Multiply 6 by 3.
3. Add the results.

**Question 19:** **Answer:** A
**Explanation:** The p-value measures the evidence against the null hypothesis; it is the probability of the observed data (or more extreme) if the null is true.

**Question 20:** **Answer:** D
**Explanation:** A Lift > 1 indicates a positive association between the antecedent and consequent, meaning the rule is more significant than a random coincidence.

**Question 21:** **Answer:** A
**Explanation:** Jaccard similarity = |Intersection| / |Union|. Intersection = {2, 3} (size 2). Union = {1, 2, 3, 4, 5} (size 5). Similarity = 2/5 = 0.4. Distance = 1 - 0.4 = 0.6.
*Calculator Instructions:*
1. Intersection size = 2
2. Union size = 5
3. Sim = 2 / 5 = 0.4
4. Dist = 1 - 0.4 = 0.6

**Question 22:** **Answer:** B
**Explanation:** The dot product is (4*-1) + (5*2) = -4 + 10 = 6.
*Calculator Instructions:*
1. Multiply corresponding elements.
2. Sum the products.

**Question 23:** **Answer:** A
**Explanation:** Errors are 3 and 4. Squared errors are 9 and 16. Sum = 25. MSE = 12.5. RMSE = sqrt(12.5) ≈ 3.53.
*Calculator Instructions:*
1. Calculate errors: (5-2)=3, (10-6)=4
2. Square errors: 3^2=9, 4^2=16
3. Calculate mean: (9+16)/2 = 12.5
4. Calculate square root: sqrt(12.5) ≈ 3.53

**Question 24:** **Answer:** C
**Explanation:** "very" appears 3 times in the text (case-insensitive assuming standard tokenization).
*Calculator Instructions:*
1. Count occurrences of "very": 3

**Question 25:** **Answer:** B
**Explanation:** Confidence is a conditional probability, representing the proportion of transactions containing X that also contain Y. The maximum value for any probability is 1 (or 100%).
*Calculator Instructions:*
1. Probability max = 1.

**Question 26:** **Answer:** C
**Explanation:** The dot product is 1 + 1 = 2. The magnitudes are sqrt(2) and sqrt(2). 2 / 2 = 1.0.
*Calculator Instructions:*
1. Calculate dot product: 1*1 + 1*1
2. Calculate magnitude of A: sqrt(1^2 + 1^2)
3. Calculate magnitude of B: sqrt(1^2 + 1^2)
4. Divide dot product by product of magnitudes.

**Question 27:** **Answer:** A
**Explanation:** Flattened size = width * height * channels = 64 * 64 * 3 = 12288.
*Calculator Instructions:*
1. Multiply width and height: 64 * 64 = 4096
2. Multiply by channels: 4096 * 3 = 12288

**Question 28:** **Answer:** A
**Explanation:** In ARIMA(p, d, q), the middle parameter 'd' represents the degree of differencing. d=1 means first-order differencing was applied.
*Calculator Instructions:*
1. Identify ARIMA(p, d, q) format
2. Map d = 1 (differencing)

**Question 29:** **Answer:** B
**Explanation:** Absolute percentage errors: |100-90|/100 = 10%, |200-210|/200 = 5%. Average = (10% + 5%) / 2 = 7.5%.
*Calculator Instructions:*
1. Calculate % error 1: |100-90|/100 = 0.10 (10%)
2. Calculate % error 2: |200-210|/200 = 0.05 (5%)
3. Average % errors: (10% + 5%) / 2 = 7.5%

**Question 30:** **Answer:** A
**Explanation:** The chi-square distribution is used to test inferences about a single population variance.

**Question 31:** **Answer:** A
**Explanation:** WMA = (1*10 + 2*20 + 3*30) / (1 + 2 + 3) = (10 + 40 + 90) / 6 = 140 / 6 = 23.33.
*Calculator Instructions:*
1. Multiply values by weights: 10*1, 20*2, 30*3
2. Sum products: 10 + 40 + 90 = 140
3. Sum weights: 1 + 2 + 3 = 6
4. Divide: 140 / 6 = 23.33

**Question 32:** **Answer:** A
**Explanation:** Output size = ((W - F) / S) + 1 = ((24 - 3) / 3) + 1 = (21 / 3) + 1 = 7 + 1 = 8.
*Calculator Instructions:*
1. Compute W - F: 24 - 3 = 21
2. Divide by S: 21 / 3 = 7
3. Add 1: 7 + 1 = 8

**Question 33:** **Answer:** B
**Explanation:** |5-2| + |7-3| = 3 + 4 = 7.
*Calculator Instructions:*
1. dx = abs(5 - 2) = 3
2. dy = abs(7 - 3) = 4
3. Dist = 3 + 4 = 7

**Question 34:** **Answer:** A
**Explanation:** The dot product is 0 + 0 + 16 = 16. The magnitudes are sqrt(9+16)=5 and sqrt(9+16)=5. 16 / 25 = 0.64.
*Calculator Instructions:*
1. Calculate dot product: 3*0 + 0*3 + 4*4
2. Calculate magnitude of A: sqrt(3^2 + 0^2 + 4^2)
3. Calculate magnitude of B: sqrt(0^2 + 3^2 + 4^2)
4. Divide dot product by product of magnitudes.

**Question 35:** **Answer:** B
**Explanation:** CBOW takes multiple surrounding context words as input to predict the missing central target word. Skip-Gram takes a single central target word as input to predict its surrounding context words.

**Question 36:** **Answer:** C
**Explanation:** The dot product is (1*0) + (0*1) = 0. Since the dot product is 0, the cosine similarity is 0.
*Calculator Instructions:*
1. Calculate dot product: 1*0 + 0*1
2. Calculate magnitude of A: sqrt(1^2 + 0^2)
3. Calculate magnitude of B: sqrt(0^2 + 1^2)
4. Divide dot product by product of magnitudes.

**Question 37:** **Answer:** A
**Explanation:** P(U1)=0.5, P(U2)=0.5. P(R|U1)=0.4, P(R|U2)=0.5. P(U1|R) = (0.5*0.4) / ((0.5*0.4) + (0.5*0.5)) = 0.2 / (0.2 + 0.25) = 0.2 / 0.45 ≈ 0.444.
*Calculator Instructions:*
1. Calculate 0.2 / 0.45

**Question 38:** **Answer:** A
**Explanation:** The feasible region is the intersection of all constraint inequalities, representing all valid solutions.

**Question 39:** **Answer:** A
**Explanation:** t = (d_bar - 0) / (s_d / sqrt(n)) = 3.5 / (4.0 / sqrt(20)) = 3.5 / (4.0 / 4.472) = 3.5 / 0.8944 = 3.913.
*Calculator Instructions:*
1. Calculate 4.0 / sqrt(20)
2. Calculate 3.5 / Ans

**Question 40:** **Answer:** A
**Explanation:** Subsets of {1,2,3} are {1,2}, {1,3}, {2,3} (all frequent). Subsets of {2,3,4} are {2,3}, {2,4}, {3,4}. But {3,4} is not frequent. So {2,3,4} is pruned.
*Calculator Instructions:*
1. Check subsets of {1,2,3}: {1,2}, {1,3}, {2,3}. All exist.
2. Check subsets of {2,3,4}: {2,3}, {2,4}, {3,4}. {3,4} is missing. Prune.

**Question 41:** **Answer:** B
**Explanation:** Path A->B->C has length 2+3 = 5. Path A->D->C has length 5+1 = 6. The shortest is 5.
*Calculator Instructions:*
1. Calculate path A->B->C: 2 + 3 = 5
2. Calculate path A->D->C: 5 + 1 = 6
3. Find the minimum: min(5, 6) = 5

**Question 42:** **Answer:** A
**Explanation:** The normalized TF is the count of the term divided by the total number of words. 8 / 200 = 0.04.
*Calculator Instructions:*
1. Calculate 8 / 200 = 0.04

**Question 43:** **Answer:** C
**Explanation:** (|3-0|^3 + |4-0|^3)^(1/3) = (27 + 64)^(1/3) = 91^(1/3) ≈ 4.497.
*Calculator Instructions:*
1. (3^3 + 4^3) = 27 + 64 = 91
2. 91^(1/3) = 4.4979

**Question 44:** **Answer:** B
**Explanation:** Confidence is Support(A, B) / Support(A). 0.4 / 0.7 = 0.5714 or 57.1%.
*Calculator Instructions:*
1. Support({A, B}) = 0.4
2. Support(A) = 0.7
3. Confidence = 0.4 / 0.7 = 0.5714

**Question 45:** **Answer:** A
**Explanation:** Probability = P(A->B) * P(B->C) = (1/4) * (1/2) = 1/8.
*Calculator Instructions:*
1. Calculate probability of A->B: 1/4
2. Calculate probability of B->C: 1/2
3. Multiply probabilities: (1/4) * (1/2) = 1/8

**Question 46:** **Answer:** B
**Explanation:** Since 3 + 4 = 7, which is > 5, the point is not feasible.
*Calculator Instructions:*
1. Compute 3 + 4.
2. Compare the result to 5.

**Question 47:** **Answer:** B
**Explanation:** Complete linkage takes the maximum distance between points in the two clusters. Dist(A,B)=3, Dist(A,C)=4. Maximum is 4.
*Calculator Instructions:*
1. Dist A to B = 3
2. Dist A to C = 4
3. Max(3, 4) = 4

**Question 48:** **Answer:** A
**Explanation:** Output size = ((W - F + 2P) / S) + 1. W=28, F=3, P=0, S=1. Output = ((28 - 3 + 0) / 1) + 1 = 26.
*Calculator Instructions:*
1. Compute W - F: 28 - 3 = 25
2. Divide by S: 25 / 1 = 25
3. Add 1: 25 + 1 = 26

**Question 49:** **Answer:** C
**Explanation:** The dot product is (-1*2) + (-1*2) = -2 - 2 = -4.
*Calculator Instructions:*
1. Multiply corresponding elements.
2. Sum the products.

**Question 50:** **Answer:** A
**Explanation:** Absolute errors are |10-12|=2, |15-14|=1, |20-23|=3. Sum = 6. MAE = 6 / 3 = 2.0.
*Calculator Instructions:*
1. Calculate abs errors: |10-12|=2, |15-14|=1, |20-23|=3
2. Sum errors: 2 + 1 + 3 = 6
3. Divide by n: 6 / 3 = 2.0

## References & Navigation

- **Question Sheet:** [[[QZ] 1]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]



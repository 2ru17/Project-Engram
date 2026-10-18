---
id: Detailed-Solution-3
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

# Detailed Solutions - Exam 3

## Overview

> This document provides fully worked step-by-step solutions, probability formulas, NLP classification rationales, and calculator procedures for all 50 questions in Mock Exam 3.

## Solutions & Explanations

**Question 1:** **Answer:** A
**Explanation:** A bowl has 6 red and 20 green apples, totaling 26 apples. The probability of picking a red apple is 6/26, which simplifies to 3/13.
*Calculator Instructions:*
1. Calculate 6 / 26
2. Simplify to get 3/13

**Question 2:** **Answer:** A
**Explanation:** Average = (0 + 4 + 4 + 8) / 4 = 16 / 4 = 4.
*Calculator Instructions:*
1. Sum the elements: 0 + 4 + 4 + 8 = 16
2. Divide by the number of elements: 16 / 4 = 4

**Question 3:** **Answer:** A
**Explanation:** p-hat = 250/400 = 0.625. SE = sqrt(0.625 * 0.375 / 400) = sqrt(0.234375 / 400) ≈ 0.0242. Margin of error = 2.576 * 0.0242 ≈ 0.0623. CI = 0.625 ± 0.0623 = (0.5627, 0.6873).
*Calculator Instructions:*
1. Calculate 250 / 400
2. Calculate sqrt((0.625 * 0.375) / 400)
3. Calculate 2.576 * Ans
4. Calculate 0.625 - Ans and 0.625 + Ans

**Question 4:** **Answer:** A
**Explanation:** P(First Red) = 5/10. P(Second Red | First Red) = 4/9. (5/10) * (4/9) = 20/90 = 2/9.
*Calculator Instructions:*
1. Calculate (5 / 10) * (4 / 9)

**Question 5:** **Answer:** A
**Explanation:** A lemmatizer reduces words to their dictionary base form. "swimming", "swims", and "swam" are all forms of the verb "swim", so they will all be reduced to "swim", resulting in 1 unique lemma.
*Calculator Instructions:*
1. Lemmatize "swimming" -> "swim"
2. Lemmatize "swims" -> "swim"
3. Lemmatize "swam" -> "swim"
4. Count unique: "swim" -> 1

**Question 6:** **Answer:** A
**Explanation:** Standard deviation is the square root of the variance. sqrt(16) = 4.
*Calculator Instructions:*
1. Calculate sqrt(16)

**Question 7:** **Answer:** D
**Explanation:** Since 5(1) + 5(1) = 10, it satisfies the constraint exactly on the boundary.
*Calculator Instructions:*
1. Compute 5*1 + 5*1.
2. Compare the result to 10.

**Question 8:** **Answer:** A
**Explanation:** Since 2(2) + 3(2) = 4 + 6 = 10, which is <= 12, the point is feasible.
*Calculator Instructions:*
1. Compute 2*2 + 3*2.
2. Compare the result to 12.

**Question 9:** **Answer:** C
**Explanation:** As K approaches the number of points, each point becomes its own cluster. The distance from a point to its cluster centroid becomes zero, meaning the Within-Cluster Sum of Squares (WCSS) reaches zero.
*Calculator Instructions:*
1. WCSS = 0 when K = N.

**Question 10:** **Answer:** B
**Explanation:** For highly skewed and non-normal data with outliers, the non-parametric Spearman correlation is appropriate rather than Pearson. When running ANOVA, it is crucial to verify assumptions such as the equality of variances (homogeneity of variances) across groups.

**Question 11:** **Answer:** A
**Explanation:** Expected value E(X) = n * p = 500 * 0.01 = 5.
*Calculator Instructions:*
1. Calculate 500 * 0.01

**Question 12:** **Answer:** A
**Explanation:** z = (p_hat - p0) / sqrt(p0*(1-p0)/n) = (0.55 - 0.50) / sqrt(0.50*0.50/100) = 0.05 / sqrt(0.0025) = 0.05 / 0.05 = 1.0.
*Calculator Instructions:*
1. Calculate sqrt((0.50 * 0.50) / 100)
2. Calculate (0.55 - 0.50) / Ans

**Question 13:** **Answer:** A
**Explanation:** The filter has 9 elements, all equal to 1. The image region has 9 elements, all equal to 2. The element-wise product sum is 9 * (1 * 2) = 18.
*Calculator Instructions:*
1. Calculate number of elements: 3 * 3 = 9
2. Multiply element count by the product of individual corresponding elements: 9 * (1 * 2) = 18

**Question 14:** **Answer:** A
**Explanation:** Lift = Supp(A U B) / (Supp(A) * Supp(B)) = 0.1 / (0.2 * 0.3) = 0.1 / 0.06 = 1.666...
*Calculator Instructions:*
1. P(A)*P(B) = 0.2 * 0.3 = 0.06
2. Lift = 0.1 / 0.06 = 1.6667

**Question 15:** **Answer:** A
**Explanation:** The dot product is (2*1)+(2*2)+(1*2) = 8. The magnitudes are sqrt(4+4+1)=3 and sqrt(1+4+4)=3. 8 / 9 = 0.8889.
*Calculator Instructions:*
1. Calculate dot product: 2*1 + 2*2 + 1*2
2. Calculate magnitude of X: sqrt(2^2 + 2^2 + 1^2)
3. Calculate magnitude of Y: sqrt(1^2 + 2^2 + 2^2)
4. Divide dot product by product of magnitudes.

**Question 16:** **Answer:** A
**Explanation:** Standard error = s / sqrt(n) = 10 / sqrt(100) = 1. Margin of error = z * SE = 1.96 * 1 = 1.96. CI = 50 ± 1.96 = (48.04, 51.96).
*Calculator Instructions:*
1. Calculate 10 / sqrt(100)
2. Calculate 1.96 * 1
3. Calculate 50 - 1.96 and 50 + 1.96

**Question 17:** **Answer:** B
**Explanation:** TF = 5 / 50 = 0.10. IDF = log10(100 / 10) = log10(10) = 1.0. TF-IDF = 0.10 * 1.0 = 0.10.
*Calculator Instructions:*
1. Calculate TF: 5 / 50 = 0.1
2. Calculate IDF: log10(100 / 10) = 1
3. Multiply TF and IDF: 0.1 * 1 = 0.1

**Question 18:** **Answer:** A
**Explanation:** EMA_t = alpha * Y_t + (1 - alpha) * EMA_{t-1} = 0.2 * 60 + 0.8 * 50 = 12 + 40 = 52.
*Calculator Instructions:*
1. Calculate 0.2 * 60 = 12
2. Calculate (1 - 0.2) * 50 = 0.8 * 50 = 40
3. Add results: 12 + 40 = 52

**Question 19:** **Answer:** B
**Explanation:** sqrt((5-2)^2 + (7-3)^2) = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5.
*Calculator Instructions:*
1. dx = 5 - 2 = 3
2. dy = 7 - 3 = 4
3. Dist = sqrt(3^2 + 4^2) = 5

**Question 20:** **Answer:** A
**Explanation:** Support is the proportion of total transactions containing the itemset. 4 / 10 = 0.40 or 40%.
*Calculator Instructions:*
1. Count transactions with {X, Y} = 4
2. Total transactions = 10
3. Support = 4 / 10 = 0.40

**Question 21:** **Answer:** A
**Explanation:** Dot product = (0.6*0.3) + (0.8*0.4) = 0.18 + 0.32 = 0.50. Magnitude of vec1 = sqrt(0.36 + 0.64) = 1.0. Magnitude of vec2 = sqrt(0.09 + 0.16) = 0.5. Cosine similarity = 0.50 / (1.0 * 0.5) = 1.0.
*Calculator Instructions:*
1. Calculate dot product: (0.6*0.3) + (0.8*0.4) = 0.5
2. Calculate ||vec1||: sqrt(0.6^2 + 0.8^2) = 1.0
3. Calculate ||vec2||: sqrt(0.3^2 + 0.4^2) = 0.5
4. Calculate similarity: 0.5 / (1.0 * 0.5) = 1.0

**Question 22:** **Answer:** C
**Explanation:** Centroid = ((2+4)/2, (2+4)/2) = (6/2, 6/2) = (3,3).
*Calculator Instructions:*
1. X = (2+4)/2 = 3
2. Y = (2+4)/2 = 3

**Question 23:** **Answer:** B
**Explanation:** Outliers can form their own cluster if their values are significantly distinct. This pulls the averages and justifies labeling the distinct group as an anomaly or outlier cluster compared to the general trend.

**Question 24:** **Answer:** A
**Explanation:** Max edges = 3*2/2 = 3. Actual = 1. Coefficient = 1/3 ≈ 0.33.
*Calculator Instructions:*
1. Calculate max possible edges: 3 * 2 / 2 = 3
2. Divide actual edges by max possible edges: 1 / 3 ≈ 0.33

**Question 25:** **Answer:** B
**Explanation:** Stationarity means that the statistical properties (mean, variance, autocorrelation) do not change over time, and there is no trend or seasonality.

**Question 26:** **Answer:** A
**Explanation:** The dot product is (1*2) + (2*4) = 10. The magnitudes are sqrt(5) and sqrt(20). 10 / (sqrt(5)*sqrt(20)) = 10 / 10 = 1.0.
*Calculator Instructions:*
1. Calculate dot product: 1*2 + 2*4
2. Calculate magnitude of A: sqrt(1^2 + 2^2)
3. Calculate magnitude of B: sqrt(2^2 + 4^2)
4. Divide dot product by product of magnitudes.

**Question 27:** **Answer:** A
**Explanation:** The null hypothesis of ADF is that the series is non-stationary. A p-value less than 0.05 leads to rejecting the null hypothesis, meaning the series is stationary.
*Calculator Instructions:*
1. Compare p-value to alpha: 0.02 < 0.05
2. Conclude Reject H0 -> Stationary

**Question 28:** **Answer:** A
**Explanation:** Page 2 only receives PR from Page 1. Page 1 splits its PR (1/3) to Page 2 and Page 3. New PR of Page 2 = 1/6.
*Calculator Instructions:*
1. Calculate contribution from Page 1 to Page 2: (1/3) / 2 = 1/6

**Question 29:** **Answer:** A
**Explanation:** SE = 15 / sqrt(25) = 3. Margin of error = t * SE = 1.711 * 3 = 5.133. CI = 120 ± 5.133 = (114.867, 125.133).
*Calculator Instructions:*
1. Calculate 15 / sqrt(25)
2. Calculate 1.711 * 3
3. Calculate 120 - 5.133 and 120 + 5.133

**Question 30:** **Answer:** B
**Explanation:** Since 3(0) + 4(0) = 0, which is < 12, the point is not feasible.
*Calculator Instructions:*
1. Compute 3*0 + 4*0.
2. Compare the result to 12.

**Question 31:** **Answer:** A
**Explanation:** Homophily (often summarized as "birds of a feather flock together") is the principle that similar nodes are more likely to share an edge.

**Question 32:** **Answer:** A
**Explanation:** Content-based filtering uses item features and user profiles to recommend similar items to what the user liked in the past.

**Question 33:** **Answer:** A
**Explanation:** The cold start problem occurs when a recommender system cannot draw any inferences for users or items about which it has not yet gathered sufficient information.

**Question 34:** **Answer:** A
**Explanation:** The ACF plot cuts off sharply after lag q for an MA(q) process, making it the primary tool to determine the MA order.

**Question 35:** **Answer:** A
**Explanation:** P(Rigged) = 2/5 = 0.4. P(Normal) = 3/5 = 0.6. P(H|Rigged) = 0.75. P(H|Normal) = 0.5. P(Rigged|H) = (0.4 * 0.75) / ((0.4 * 0.75) + (0.6 * 0.5)) = 0.3 / (0.3 + 0.3) = 0.5.
*Calculator Instructions:*
1. Calculate (0.4 * 0.75) / ((0.4 * 0.75) + (0.6 * 0.5))

**Question 36:** **Answer:** A
**Explanation:** Using binomial probability: C(5,3) * (0.25)^3 * (0.75)^2 = 10 * 0.015625 * 0.5625 ≈ 0.08789.
*Calculator Instructions:*
1. Calculate 10 * (0.25^3) * (0.75^2)

**Question 37:** **Answer:** A
**Explanation:** RGB represents Red, Green, and Blue, requiring three separate channels to store pixel intensities. Grayscale represents only light intensity and requires a single channel.

**Question 38:** **Answer:** B
**Explanation:** The squared Euclidean distances to centroid (1,2): for (1,1) it is 0^2 + (-1)^2 = 1. For (1,3) it is 0^2 + 1^2 = 1. Total WCSS = 1 + 1 = 2.
*Calculator Instructions:*
1. Point 1 dist^2 = (1-1)^2 + (1-2)^2 = 1
2. Point 2 dist^2 = (1-1)^2 + (3-2)^2 = 1
3. WCSS = 1 + 1 = 2

**Question 39:** **Answer:** A
**Explanation:** The number of distinct pairs is 5*4/2 = 10. Average path length = (Sum of path lengths) / (Number of pairs). 2.5 = Sum / 10. Sum = 25.
*Calculator Instructions:*
1. Calculate number of distinct pairs: 5 * 4 / 2 = 10
2. Multiply average path length by number of pairs: 2.5 * 10 = 25

**Question 40:** **Answer:** A
**Explanation:** Images have a strict Euclidean grid structure (pixels arranged in rows/columns), allowing a fixed-size filter to slide over them. Graphs have arbitrary, non-Euclidean topologies with varying neighborhood sizes.

**Question 41:** **Answer:** A
**Explanation:** Leverage = 0.25 - (0.4 * 0.5) = 0.25 - 0.20 = 0.05.
*Calculator Instructions:*
1. Exp = 0.4 * 0.5 = 0.2
2. Leverage = 0.25 - 0.2 = 0.05

**Question 42:** **Answer:** B
**Explanation:** The SMA with window size 3 at the last point (50) averages the last 3 values: (30 + 40 + 50) / 3 = 120 / 3 = 40.
*Calculator Instructions:*
1. Identify the last 3 values: 30, 40, 50
2. Calculate sum: 30 + 40 + 50 = 120
3. Calculate average: 120 / 3 = 40

**Question 43:** **Answer:** A
**Explanation:** The dot product is (3*4) + (4*3) = 24. The magnitudes are sqrt(25)=5 and sqrt(25)=5. 24 / 25 = 0.96.
*Calculator Instructions:*
1. Calculate dot product: 3*4 + 4*3
2. Calculate magnitude of X: sqrt(3^2 + 4^2)
3. Calculate magnitude of Y: sqrt(4^2 + 3^2)
4. Divide dot product by product of magnitudes.

**Question 44:** **Answer:** C
**Explanation:** The item 'K' appears in all 5 sequences. Support = 5 / 5 = 100%.
*Calculator Instructions:*
1. Count transactions with 'K' = 5
2. Total transactions = 5
3. Support = 5 / 5 = 1.0

**Question 45:** **Answer:** A
**Explanation:** Errors are (10-12)=-2 and (20-16)=4. Squared errors are 4 and 16. Sum = 20. MSE = 20 / 2 = 10.0.
*Calculator Instructions:*
1. Calculate errors: (10-12)=-2, (20-16)=4
2. Square errors: (-2)^2 = 4, (4)^2 = 16
3. Sum squared errors: 4 + 16 = 20
4. Divide by n: 20 / 2 = 10.0

**Question 46:** **Answer:** A
**Explanation:** Parameters per filter = (F * F * input_channels) + 1 (bias) = (3 * 3 * 3) + 1 = 28. Total parameters = 28 * 8 = 224.
*Calculator Instructions:*
1. Calculate weights per filter: 3 * 3 * 3 = 27
2. Add bias term per filter: 27 + 1 = 28
3. Multiply by number of filters: 28 * 8 = 224

**Question 47:** **Answer:** A
**Explanation:** Pearson correlation measures the linear relationship between ratings of two users, adjusting for their mean rating tendencies.

**Question 48:** **Answer:** A
**Explanation:** Confidence = Supp(Chips,Salsa,Guacamole)/Supp(Chips,Salsa). Therefore Supp(Chips,Salsa,Guacamole) = Confidence * Supp(Chips,Salsa) = 0.8 * 0.25 = 0.20 or 20%.
*Calculator Instructions:*
1. Support = Confidence * Support(Antecedent)
2. Support = 0.8 * 0.25 = 0.2

**Question 49:** **Answer:** A
**Explanation:** Substitute x = 4 and y = 1 into Z. Z = 5(4) + 2(1) = 20 + 2 = 22.
*Calculator Instructions:*
1. Multiply 5 by 4.
2. Multiply 2 by 1.
3. Add the results.

**Question 50:** **Answer:** B
**Explanation:** Stemming relies on rule-based heuristics that chop off affixes (often yielding non-words), whereas Lemmatization uses dictionary morphing to return valid canonical base words (lemmas).

## References & Navigation

- **Question Sheet:** [[[QZ] 3]]
- **Consolidated Answer Key:** [[[ANS] Answer Key]]
- **Calculator Guide:** [[[HO] calculator]]


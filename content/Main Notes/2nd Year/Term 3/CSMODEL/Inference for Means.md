---
id: Module-08-Inference-for-Means
type: note
course: CSMODEL
topic: Inference for Means
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Inference for Means]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 08: Inference for Means

## Key Concepts

### 1. Central Limit Theorem & The Student's t-Distribution
When estimating a population mean $\mu$ using a sample mean $\bar{x}$, the Central Limit Theorem (CLT) states that for independent observations from a population with mean $\mu$ and standard deviation $\sigma$, the sampling distribution of $\bar{x}$ is approximately normal:
$$\bar{x} \sim N\left(\mu, \frac{\sigma}{\sqrt{n}}\right)$$

* **The Unknown $\sigma$ Problem**: In almost all real-world applications, the true population standard deviation $\sigma$ is **unknown**. We must estimate $\sigma$ using the sample standard deviation $s$, yielding an estimated standard error:
  $$SE = \frac{s}{\sqrt{n}}$$
* **Why the t-Distribution?** Substituting $s$ for $\sigma$ introduces additional variability into the test statistic, especially when sample size $n$ is small. Consequently, the standard normal distribution ($Z$) underestimates tail probabilities. To account for this extra uncertainty, we use the **Student's t-distribution**.
* **Properties of the t-Distribution**:
Symmetric and bell-shaped, centered at 0.
Has **thicker (heavier) tails** than the standard normal distribution ($Z$), meaning extreme values are more likely under a t-distribution.
Parameterized by **degrees of freedom ($df$)**.
As $df$ increases ($df \to \infty$), the t-distribution approaches the standard normal distribution $N(0, 1)$.

### 2. Conditions for Inference Using the t-Distribution
Before performing any t-test or constructing t-confidence intervals, two core conditions must be verified:
1. **Independence Condition**:
Observations in the sample must be independent of one another.
Collected via random sampling or random assignment.
If sampling without replacement, the sample size must not exceed 10% of the population ($n < 10\% N$).
2. **Normality / Sample Size Condition**:
If the population distribution is **normal**, the sampling distribution of $\bar{x}$ is normal even for small $n$ ($n < 30$).
If the population distribution is **not normal** or unknown:
**Small samples ($n < 30$)**: Data should be nearly normal with no severe skewness or prominent outliers.
**Large samples ($n \ge 30$)**: The Central Limit Theorem guarantees that the sampling distribution of $\bar{x}$ is nearly normal, even if the underlying population data exhibits moderate skewness.

### 3. One-Sample t-Test
* **When to Use**: Testing whether the sample mean $\bar{x}$ from a single numeric variable significantly differs from a hypothesized population value $\mu_0$.
* **Hypotheses**:
Null Hypothesis ($H_0$): $\mu = \mu_0$ (No difference from hypothesized mean)
Alternative Hypothesis ($H_A$): $\mu \neq \mu_0$ (Two-tailed) OR $\mu > \mu_0$ / $\mu < \mu_0$ (One-tailed)
* **Test Statistic**:
  $$t = \frac{\bar{x} - \mu_0}{\frac{s}{\sqrt{n}}}$$
* **Degrees of Freedom**: $df = n - 1$.
* **Confidence Interval**:
  $$\text{CI} = \bar{x} \pm t^*_{df, 1-\alpha/2} \times \frac{s}{\sqrt{n}}$$

### 4. Paired Observations (Dependent Samples t-Test)
* **When to Use**: Comparing two sets of quantitative observations that are paired or matched (e.g., pre-test vs. post-test scores of the same individuals, textbook prices at UCLA Bookstore vs. Amazon for the exact same titles).
* **Methodology**: Paired data is reduced to a single vector of differences:
  $$d_i = x_{1, i} - x_{2, i}$$
  The inference is then conducted as a **one-sample t-test** on the differences $d_i$.
* **Hypotheses**:
$H_0: \mu_d = 0$ (The true average difference is zero)
$H_A: \mu_d \neq 0$ (The true average difference is non-zero)
* **Test Statistic**:
  $$t = \frac{\bar{x}_d - 0}{\frac{s_d}{\sqrt{n_{\text{pairs}}}}}$$
* **Degrees of Freedom**: $df = n_{\text{pairs}} - 1$.

### 5. Independent Two-Sample t-Test (Unpaired Observations)
* **When to Use**: Comparing the means of two distinct, independent groups (e.g., birth weight of babies born to smoker vs. non-smoker mothers). Sample sizes $n_1$ and $n_2$ do not need to be equal.
* **Hypotheses**:
$H_0: \mu_1 - \mu_2 = 0 \iff \mu_1 = \mu_2$
$H_A: \mu_1 - \mu_2 \neq 0 \iff \mu_1 \neq \mu_2$
* **Point Estimate**: Difference between sample means $\bar{x}_1 - \bar{x}_2$.
* **Standard Error (Welch's / Unequal Variances)**:
  $$SE = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$$
* **Test Statistic**:
  $$t = \frac{(\bar{x}_1 - \bar{x}_2) - 0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$
* **Degrees of Freedom ($df$)**:
**Conservative Manual Rule (Exam Standard)**: $df = \min(n_1 - 1, n_2 - 1)$.
**Welch-Satterthwaite Approximation**: Used automatically by `scipy.stats.ttest_ind(..., equal_var=False)`.

### 6. One-Tailed vs. Two-Tailed Tests & p-Value Adjustments
* **Two-Tailed Test ($H_A: \mu \neq \mu_0$)**: Measures extreme values in both tails. $p = 2 \times P(T \ge |t|)$.
* **One-Tailed Test ($H_A: \mu > \mu_0$ or $H_A: \mu < \mu_0$)**: Measures extreme values in a specific direction.
* **Converting p-values**:
If test statistic $t$ aligns with the direction specified in $H_A$:
    $$p_{\text{one-tailed}} = \frac{p_{\text{two-tailed}}}{2}$$
If test statistic $t$ goes in the direction *opposite* of $H_A$:
    $$p_{\text{one-tailed}} = 1 - \frac{p_{\text{two-tailed}}}{2}$$

### 7. Comparing Multiple Means: ANOVA & Bonferroni Correction
* **When to Use**: Comparing means across $k \ge 3$ independent groups simultaneously (e.g., batting averages among Outfielders, Infielders, and Catchers).
* **Why Not Multiple Pairwise t-Tests?** Running many pairwise t-tests causes **Type I Error Inflation**. If $\alpha = 0.05$ for a single test, running $K$ tests increases the overall probability of at least one false positive to $1 - (1 - \alpha)^K$.
* **ANOVA Hypotheses**:
$H_0: \mu_1 = \mu_2 = \dots = \mu_k$ (All group means are equal)
$H_A$: At least one group mean is different.
* **ANOVA F-Statistic**:
  $$F = \frac{MSG}{MSE}$$
$MSG$ (Mean Square between Groups): Measures variability between group means ($\frac{SSG}{k-1}$).
$MSE$ (Mean Square Error): Measures variability within groups ($\frac{SSE}{n_{\text{total}} - k}$).
* **Post-Hoc Analysis & Bonferroni Correction**:
If ANOVA rejects $H_0$, conduct pairwise t-tests to identify specific group differences.
Apply **Bonferroni Correction** to control family-wise error rate:
    $$\alpha^* = \frac{\alpha}{K} \quad \text{where } K = \binom{k}{2} = \frac{k(k-1)}{2}$$

### 8. Step-by-Step Manual Calculator Steps for t-Tests
1. **State Hypotheses**: Define $H_0$ and $H_A$ clearly with population parameters ($\mu, \mu_d, \mu_1 - \mu_2$).
2. **Verify Assumptions**: Check independence and normality / $n \ge 30$.
3. **Compute Sample Statistics**: Calculate $\bar{x}$, $s$, $n$ (or $\bar{x}_d, s_d, n_{\text{pairs}}$, or $\bar{x}_1, \bar{x}_2, s_1, s_2, n_1, n_2$).
4. **Calculate Standard Error ($SE$)**:
One-sample / Paired: $SE = \frac{s}{\sqrt{n}}$
Independent Two-sample: $SE = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$
5. **Compute Test Statistic ($t$)**:
   $$t = \frac{\text{Point Estimate} - \text{Null Value}}{SE}$$
6. **Find Degrees of Freedom ($df$) & Critical Value ($t^*$)**:
Look up $t^*$ in t-table for given $\alpha$ and $df$.
7. **Make Decision & State Conclusion**:
If $|t| > t^*$ (or $p$-value $< \alpha$), **reject $H_0$**.
If $|t| \le t^*$ (or $p$-value $\ge \alpha$), **fail to reject $H_0$**.
State conclusion in plain language relative to the problem context.

---

## Python Snippets

### 1. One-Sample t-Test (`scipy.stats.ttest_1samp`)
Tests if a sample vector `data` has a population mean equal to `popmean`.

```python
import numpy as np
from scipy import stats

# Sample data: housing lot areas (in sq ft)
lot_area_sample = np.array([9500, 10200, 8900, 9800, 10500, 9100, 9400, 9900, 10100, 8800])
hypothesized_mean = 10000

# Perform one-sample t-test (two-sided by default)
res = stats.ttest_1samp(lot_area_sample, popmean=hypothesized_mean)

print(f"t-statistic: {res.statistic:.4f}")
print(f"p-value: {res.pvalue:.4f}")
print(f"Degrees of freedom: {res.df}")

# Decision rule at alpha = 0.05
alpha = 0.05
if res.pvalue < alpha:
    print("Reject H0: Sample mean differs significantly from 10,000.")
else:
    print("Fail to reject H0: Insufficient evidence of a difference.")
```

### 2. Independent Two-Sample t-Test (`scipy.stats.ttest_ind`)
Compares two independent samples. Use `equal_var=False` for Welch's t-test (standard best practice).

```python
import pandas as pd
from scipy import stats

# Load birth records dataset
nc_df = pd.read_csv('nc.csv')

# Extract baby weights for smoker and non-smoker mothers
smoker_weights = nc_df[nc_df['habit'] == 'smoker']['weight'].dropna()
nonsmoker_weights = nc_df[nc_df['habit'] == 'nonsmoker']['weight'].dropna()

# Perform Welch's t-test (equal_var=False)
res_ind = stats.ttest_ind(smoker_weights, nonsmoker_weights, equal_var=False)

print(f"t-statistic: {res_ind.statistic:.4f}")
print(f"p-value: {res_ind.pvalue:.4f}")

# Interpretation:
# If p-value < 0.05, reject H0 (significant difference in newborn weight).
```

### 3. Paired Two-Sample t-Test (`scipy.stats.ttest_rel`)
Compares two dependent/paired samples (e.g., store price vs. Amazon price for the same items).

```python
import numpy as np
from scipy import stats

# Prices of 6 textbooks at campus bookstore vs. Amazon
store_prices = np.array([30, 19, 19, 45, 25, 60])
amazon_prices = np.array([20, 15, 19, 38, 21, 52])

# Method A: Using scipy.stats.ttest_rel
res_paired = stats.ttest_rel(store_prices, amazon_prices)

# Method B: Equivalent one-sample t-test on differences
diffs = store_prices - amazon_prices
res_diff = stats.ttest_1samp(diffs, popmean=0)

print(f"Paired t-stat: {res_paired.statistic:.4f}, p-value: {res_paired.pvalue:.4f}")
print(f"Differences 1-sample t-stat: {res_diff.statistic:.4f}, p-value: {res_diff.pvalue:.4f}")
# Note: Both methods produce identical t-statistic and p-value!
```

### 4. Critical Values and Quantiles (`scipy.stats.t.ppf`)
Finds critical values $t^*$ for confidence intervals and hypothesis rejection regions.

```python
from scipy import stats

n = 20
df = n - 1
alpha = 0.05

# Two-tailed critical t-value for 95% confidence level
t_star_95 = stats.t.ppf(1 - alpha / 2, df=df)
print(f"95% Two-tailed critical t-value (df={df}): {t_star_95:.4f}")

# One-tailed critical t-value for 95% confidence level (alpha = 0.05 in one tail)
t_star_one_tailed = stats.t.ppf(1 - alpha, df=df)
print(f"95% One-tailed critical t-value (df={df}): {t_star_one_tailed:.4f}")
```

### 5. Constructing Confidence Intervals for Means
Calculates margin of error and confidence bounds manually and using `stats.t.interval`.

```python
import numpy as np
from scipy import stats

sample_data = np.array([4.4, 3.8, 5.1, 4.9, 4.2, 5.5, 3.9, 4.7, 4.1, 4.6])
n = len(sample_data)
sample_mean = np.mean(sample_data)
sample_std = np.std(sample_data, ddof=1)  # Sample std (ddof=1)
se = sample_std / np.sqrt(n)

alpha = 0.05
df = n - 1
t_crit = stats.t.ppf(1 - alpha / 2, df=df)
margin_of_error = t_crit * se

ci_lower = sample_mean - margin_of_error
ci_upper = sample_mean + margin_of_error

print(f"Sample Mean: {sample_mean:.2f}")
print(f"Margin of Error: {margin_of_error:.4f}")
print(f"Manual 95% CI: ({ci_lower:.4f}, {ci_upper:.4f})")

# Built-in SciPy method:
ci_scipy = stats.t.interval(confidence=0.95, df=df, loc=sample_mean, scale=se)
print(f"SciPy 95% CI: ({ci_scipy[0]:.4f}, {ci_scipy[1]:.4f})")
```

### 6. One-Way ANOVA & Bonferroni Post-Hoc Correction
Tests equality of means across multiple groups and applies Bonferroni correction.

```python
import numpy as np
from scipy import stats

outfielders = np.array([0.32, 0.31, 0.35, 0.29, 0.33, 0.30])
infielders = np.array([0.318, 0.310, 0.325, 0.305, 0.312, 0.320])
catchers = np.array([0.302, 0.295, 0.288, 0.310, 0.290, 0.300])

# 1. Run One-Way ANOVA
f_stat, p_val = stats.f_oneway(outfielders, infielders, catchers)
print(f"ANOVA F-statistic: {f_stat:.4f}, p-value: {p_val:.4f}")

# 2. Bonferroni Correction for post-hoc pairwise tests
k = 3  # Number of groups
num_comparisons = k * (k - 1) // 2  # 3 comparisons
alpha_original = 0.05
alpha_bonferroni = alpha_original / num_comparisons

print(f"Original Alpha: {alpha_original}")
print(f"Bonferroni Adjusted Alpha*: {alpha_bonferroni:.4f}")

# Compare Outfielders vs Catchers post-hoc
res_posthoc = stats.ttest_ind(outfielders, catchers, equal_var=False)
print(f"Outfielder vs Catcher p-value: {res_posthoc.pvalue:.4f}")
if res_posthoc.pvalue < alpha_bonferroni:
    print("Significant difference between Outfielders and Catchers after Bonferroni correction.")
```

---

## Formulas & Key Equations

| Concept / Test Type | Parameter / Quantity | Mathematical Formula | Degrees of Freedom ($df$) |
| :--- | :--- | :--- | :--- |
| **Standard Error (1 Sample)** | $SE$ | $SE = \frac{s}{\sqrt{n}}$ | $df = n - 1$ |
| **1-Sample t-Statistic** | $t$ | $t = \frac{\bar{x} - \mu_0}{\frac{s}{\sqrt{n}}}$ | $df = n - 1$ |
| **1-Sample Confidence Interval** | $\text{CI}$ | $\bar{x} \pm t^*_{df, 1-\alpha/2} \times \frac{s}{\sqrt{n}}$ | $df = n - 1$ |
| **Paired Samples t-Statistic** | $t$ | $t = \frac{\bar{x}_d - 0}{\frac{s_d}{\sqrt{n_{\text{pairs}}}}}$ | $df = n_{\text{pairs}} - 1$ |
| **Independent Samples $SE$ (Welch)** | $SE$ | $SE = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$ | $df_{\text{cons}} = \min(n_1-1, n_2-1)$ |
| **Independent Samples t-Statistic** | $t$ | $t = \frac{(\bar{x}_1 - \bar{x}_2) - 0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$ | $df_{\text{cons}} = \min(n_1-1, n_2-1)$ |
| **ANOVA Between-Group Variance** | $MSG$ | $MSG = \frac{SSG}{k - 1} = \frac{\sum n_i (\bar{x}_i - \bar{x})^2}{k - 1}$ | $df_1 = k - 1$ |
| **ANOVA Within-Group Variance** | $MSE$ | $MSE = \frac{SSE}{n_{\text{total}} - k} = \frac{SST - SSG}{n_{\text{total}} - k}$ | $df_2 = n_{\text{total}} - k$ |
| **ANOVA F-Statistic** | $F$ | $F = \frac{MSG}{MSE}$ | $(df_1, df_2) = (k-1, n_{\text{total}}-k)$ |
| **Bonferroni Correction** | $\alpha^*$ | $\alpha^* = \frac{\alpha}{K} = \frac{\alpha}{\binom{k}{2}}$ | N/A |

---

## Common Exam Traps

*  **Trap 1: Confusing Paired vs. Independent t-Tests**
  * *Mistake*: Running `ttest_ind` on data where measurements come from the same individuals (e.g., pre-treatment vs. post-treatment weights).
  * *Correction*: If observations are linked/paired, use `ttest_rel` (or 1-sample t-test on differences). Using independent t-test ignores pairing and reduces test power.

*  **Trap 2: Forgetting `equal_var=False` in SciPy**
  * *Mistake*: Calling `scipy.stats.ttest_ind(a, b)` without specifying `equal_var=False`.
  * *Correction*: By default, SciPy sets `equal_var=True` (Student's pooled t-test). In CSMODEL and modern statistics, Welch's t-test (`equal_var=False`) is required unless equal population variances are proven.

*  **Trap 3: Incorrect Degrees of Freedom Calculation**
  * *Paired t-test*: $df = n_{\text{pairs}} - 1$ (NOT $2n - 2$).
  * *Independent t-test (Manual Exam Rule)*: $df = \min(n_1 - 1, n_2 - 1)$ (NOT $n_1 + n_2 - 2$ unless pooled variance is assumed).
  * *ANOVA*: Numerator $df_1 = k - 1$, Denominator $df_2 = n_{\text{total}} - k$.

*  **Trap 4: One-Tailed p-Value Division Error**
  * *Mistake*: Always dividing SciPy's `pvalue` by 2 to get a one-tailed p-value.
  * *Correction*: Dividing by 2 is valid **ONLY IF** the sample statistic lies in the direction of the alternative hypothesis. If the sample statistic goes against $H_A$, the one-tailed p-value is $1 - \frac{p_{\text{two-tailed}}}{2}$. Alternatively, use `alternative='greater'` or `alternative='less'`.

*  **Trap 5: Misinterpreting $n \ge 30$ Normality Rule**
  * *Mistake*: Believing that $n \ge 30$ means the sample data itself becomes normally distributed.
  * *Correction*: The sample data distribution does not change. $n \ge 30$ ensures that the **sampling distribution of the mean** $\bar{x}$ is approximately normal due to the Central Limit Theorem.

*  **Trap 6: Misinterpreting Confidence Intervals**
  * *Mistake*: Claiming "There is a 95% probability that the true mean $\mu$ falls inside the interval $(3.29, 5.51)$."
  * *Correction*: In frequentist statistics, $\mu$ is a fixed unknown constant, not a random variable. The correct phrasing is: *"We are 95% confident that the true population mean lies between 3.29 and 5.51"*, meaning 95% of intervals constructed using this procedure will capture $\mu$.

*  **Trap 7: Omitting Bonferroni Correction for Multiple Comparisons**
  * *Mistake*: Running multiple pairwise t-tests after ANOVA using standard $\alpha = 0.05$.
  * *Correction*: Running $K$ tests inflates overall Type I error rate. You must compare p-values against $\alpha^* = \alpha / K$.

---

## Practice Questions

**Q1.** A factory manufactures precision steel rods. The target mean diameter is $\mu_0 = 15.00$ mm. A quality control inspector takes a random sample of $n = 16$ rods and measures their diameters. The sample mean is $\bar{x} = 14.82$ mm and the sample standard deviation is $s = 0.36$ mm.
Perform a two-tailed hypothesis test at $\alpha = 0.05$ to determine if the manufacturing process is out of calibration. (Given: For $df = 15$, $t^*_{0.025} = 2.131$). A) $t = -2.000$; Fail to reject $H_0$ because $|-2.000| \le 2.131$. B) $t = -2.000$; Reject $H_0$ because $|-2.000| > 2.131$. C) $t = -0.500$; Fail to reject $H_0$ because $|-0.500| \le 2.131$. D) $t = -2.131$; Reject $H_0$ because $t = t^*$.

**Q2.** Inspect the following Python code snippet analyzing two independent website layout variations (A and B):

```python
import numpy as np
from scipy import stats

layout_A = np.array([45, 52, 48, 60, 55, 50, 49, 53])
layout_B = np.array([38, 42, 40, 47, 44, 39, 41, 43])

stat, pval = stats.ttest_ind(layout_A, layout_B, equal_var=False)
print(f"Statistic: {stat:.3f}, p-value: {pval:.5f}")
```

Output:
`Statistic: 3.842, p-value: 0.00179`

What is the correct conclusion at a 5% significance level ($\alpha = 0.05$)? A) Fail to reject $H_0$ because the t-statistic (3.842) is greater than 0.05. B) Reject $H_0$ using Student's paired t-test; layout A and B have identical performance. C) Reject $H_0$ using Welch's t-test (`equal_var=False`); there is a statistically significant difference in user engagement between layout A and layout B ($p = 0.00179 < 0.05$). D) Accept $H_0$; layout B is significantly better than layout A.

**Q3.** A medical clinic tested a new cholesterol-lowering drug on $n = 25$ patients. The blood cholesterol level (in mg/dL) was measured before and 8 weeks after treatment for each patient. The average difference (Before - After) was $\bar{x}_d = 12.0$ mg/dL, and the sample standard deviation of differences was $s_d = 15.0$ mg/dL.
Construct the 95% confidence interval for the mean reduction in cholesterol. (Given: For $df = 24$, $t^*_{0.025} = 2.064$). A) $(5.808, 18.192)$ mg/dL B) $(0.000, 24.000)$ mg/dL C) $(9.523, 14.477)$ mg/dL D) $(6.192, 17.808)$ mg/dL

**Q4.** Consider the Python script below testing whether a new compiler produces faster execution times than a benchmark standard of $25.0$ seconds:

```python
from scipy import stats

exec_times = [23.5, 24.1, 22.8, 24.8, 23.9, 24.2, 23.0] # n = 7
res = stats.ttest_1samp(exec_times, popmean=25.0, alternative='less')
t_crit = stats.t.ppf(0.05, df=len(exec_times)-1)

print(f"t_stat = {res.statistic:.3f}, p_val = {res.pvalue:.4f}")
print(f"t_crit = {t_crit:.3f}")
```

Output:
`t_stat = -4.382, p_val = 0.0023`
`t_crit = -1.943`

Which statement correctly interprets this output at $\alpha = 0.05$? A) Fail to reject $H_0$ because execution times cannot be negative. B) Reject $H_0$ because the observed t-statistic ($-4.382$) is more extreme than the critical value ($-1.943$) and $p = 0.0023 < 0.05$, proving the compiler significantly reduces execution time. C) Reject $H_0$ because $p = 0.0023 > 0.05$. D) Fail to reject $H_0$ because a two-sided test was required instead of `alternative='less'`.

**Q5.** A data scientist compares the processing time of 3 different algorithm implementations (Algorithm A, B, and C) across multiple benchmark tests ($k = 3$, $n_{\text{total}} = 33$).
An ANOVA test yields $SSG = 120.0$ and $SST = 420.0$.
Calculate the ANOVA $F$-statistic and determine the Bonferroni-adjusted significance level $\alpha^*$ for post-hoc pairwise comparisons at overall $\alpha = 0.05$. A) $F = 6.00$, $\alpha^* = 0.0167$ B) $F = 3.00$, $\alpha^* = 0.0500$ C) $F = 12.00$, $\alpha^* = 0.0250$ D) $F = 4.00$, $\alpha^* = 0.0167$

**Q6.** Match each research scenario (1, 2, 3) to its appropriate statistical test function in Python SciPy:
  1. Comparing the exam scores of Section 1 vs. Section 2 (two separate groups of students).
  2. Testing if the average test score of Section 1 differs from the historical departmental mean of 75.0.
  3. Comparing midterm vs. final exam scores of the *same* group of students. A) 1: `ttest_rel`, 2: `ttest_1samp`, 3: `ttest_ind` B) 1: `ttest_ind`, 2: `ttest_1samp`, 3: `ttest_rel` C) 1: `ttest_1samp`, 2: `ttest_ind`, 3: `ttest_rel` D) 1: `f_oneway`, 2: `ttest_ind`, 3: `ttest_1samp`

---

### **Answer Key:**
 **Q1: A — $t = -2.000$; Fail to reject $H_0$**
  *Step-by-step solution*:
  1. $H_0: \mu = 15.00$, $H_A: \mu \neq 15.00$.
  2. $SE = \frac{s}{\sqrt{n}} = \frac{0.36}{\sqrt{16}} = \frac{0.36}{4} = 0.09$ mm.
  3. Test Statistic $t = \frac{\bar{x} - \mu_0}{SE} = \frac{14.82 - 15.00}{0.09} = \frac{-0.18}{0.09} = -2.000$.
  4. Compare $|t| = 2.000$ to critical value $t^* = 2.131$ ($df = 15$).
  5. Since $|-2.000| \le 2.131$, fail to reject $H_0$. There is insufficient evidence to conclude the process is out of calibration.
 **Q2: C — Reject $H_0$ using Welch's t-test (`equal_var=False`)**
  *Explanation*: The code calls `ttest_ind(..., equal_var=False)`, which performs Welch's independent two-sample t-test. The resulting $p$-value ($0.00179$) is less than $\alpha = 0.05$, so we reject $H_0$ and conclude that user engagement differs significantly between layouts.
 **Q3: A — $(5.808, 18.192)$ mg/dL**
  *Step-by-step solution*:
  1. $n = 25$, $df = 24$, $\bar{x}_d = 12.0$, $s_d = 15.0$.
  2. $SE = \frac{s_d}{\sqrt{n}} = \frac{15.0}{\sqrt{25}} = \frac{15.0}{5} = 3.0$ mg/dL.
  3. Margin of Error $ME = t^* \times SE = 2.064 \times 3.0 = 6.192$ mg/dL.
  4. $\text{CI} = \bar{x}_d \pm ME = 12.0 \pm 6.192 = (5.808, 18.192)$ mg/dL.
 **Q4: B — Reject $H_0$ because $t_{\text{stat}} (-4.382) < t_{\text{crit}} (-1.943)$ and $p = 0.0023 < 0.05$**
  *Explanation*: The left-tailed test $H_A: \mu < 25.0$ yields a negative t-statistic. Since $t_{\text{stat}} = -4.382$ is less than the critical value $-1.943$ (falls deep into the rejection region) and $p = 0.0023 < 0.05$, we reject $H_0$.
 **Q5: A — $F = 6.00$, $\alpha^* = 0.0167$**
  *Step-by-step solution*:
  1. $k = 3$ groups, $n_{\text{total}} = 33$.
  2. $df_1 = k - 1 = 3 - 1 = 2$.
  3. $df_2 = n_{\text{total}} - k = 33 - 3 = 30$.
  4. $MSG = \frac{SSG}{df_1} = \frac{120.0}{2} = 60.0$.
  5. $SSE = SST - SSG = 420.0 - 120.0 = 300.0$.
  6. $MSE = \frac{SSE}{df_2} = \frac{300.0}{30} = 10.0$.
  7. $F = \frac{MSG}{MSE} = \frac{60.0}{10.0} = 6.00$.
  8. Pairwise comparisons $K = \frac{k(k-1)}{2} = \frac{3 \times 2}{2} = 3$.
  9. Bonferroni adjusted $\alpha^* = \frac{0.05}{3} \approx 0.0167$.
 **Q6: B — 1: `ttest_ind`, 2: `ttest_1samp`, 3: `ttest_rel`**
  *Explanation*: Scenario 1 compares two separate/independent groups (`ttest_ind`). Scenario 2 compares a single group against a known standard (`ttest_1samp`). Scenario 3 compares paired measurements from the same students (`ttest_rel`).

## Multiple Choice Questions

1. When estimating a population mean with an unknown standard deviation, which distribution is used?
    - **A)** Standard Normal (Z) Distribution
    - **B)** Students t-Distribution
    - **C)** Chi-Square Distribution
    - **D)** F-Distribution

2. Which test is appropriate for comparing pre-test and post-test scores of the same individuals?
    - **A)** Independent Two-Sample t-Test
    - **B)** ANOVA
    - **C)** Paired (Dependent) t-Test
    - **D)** Chi-Square Test

3. Why is Welchs t-test generally preferred over the standard Students independent t-test?
    - **A)** It assumes equal population variances
    - **B)** It does not assume equal population variances
    - **C)** It only works on paired data
    - **D)** It handles categorical data

4. When conducting multiple pairwise t-tests, why is the Bonferroni correction used?
    - **A)** To increase the statistical power of the tests
    - **B)** To control for Type I Error inflation
    - **C)** To correct for small sample sizes
    - **D)** To convert the data to a normal distribution

5. What is the correct degrees of freedom formula for a One-Sample t-Test?
    - **A)** n - 1
    - **B)** n - 2
    - **C)** 2n - 1
    - **D)** min(n1-1, n2-1)

### Answer Key & Explanations

1. **B**. The t-distribution accounts for the extra uncertainty introduced by using sample std dev.
2. **C**. A paired t-test is used when observations are dependent or linked.
3. **B**. Welchs t-test (`equal_var=False`) is safer because it drops the restrictive assumption of equal variances.
4. **B**. Running multiple tests inflates the chance of a false positive; Bonferroni adjusts alpha to prevent this.
5. **A**. For a single sample, df = n - 1.

## References & Navigation

- **Previous Topic:** [[Foundations for Inference]]
- **Next Topic:** [[Inference for Categorical Data]]
- **Related Notes:** [[Foundations for Inference]], [[Bayesian Inference]]

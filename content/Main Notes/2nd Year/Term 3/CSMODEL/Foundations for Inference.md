---
id: Module-07-Foundations-for-Inference
type: note
course: CSMODEL
topic: Foundations for Inference
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Foundations for Inference]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 07: Foundations for Inference

## 📚 Key Concepts

### 1. Point Estimate vs. Interval Estimate
In statistical inference, our goal is to draw conclusions about unknown **population parameters** (such as the population mean $\mu$ or population proportion $p$) using data collected from a sample.

* **Point Estimate**: A single numerical value calculated from sample data used as the best single guess for an unknown population parameter.
  * Examples: Sample mean $\bar{x}$ estimates $\mu$; sample proportion $\hat{p}$ estimates $p$; sample standard deviation $s$ estimates $\sigma$.
  * **Limitation**: A point estimate almost never exactly equals the true population parameter due to sampling variation. It gives no information about how uncertain or precise the estimate is.
* **Interval Estimate (Confidence Interval)**: A range of plausible values for a population parameter, computed with a specified level of confidence (e.g., 90%, 95%, 99%).
  * General Form: $\text{Point Estimate} \pm \text{Margin of Error}$
  * Benefit: Accounts for sampling variability and quantifies uncertainty.

#### Sources of Error in Estimation
* **Bias (Systematic Error)**: Introduced by flawed data collection or sampling design (e.g., non-response bias, convenience sampling). Bias shifts estimates away from the true value in one direction. *Increasing sample size $n$ does NOT fix bias.*
* **Sampling Error (Random Variability)**: Natural variation that occurs because a sample contains only a subset of the population. Different random samples yield different point estimates. *Sampling error decreases as sample size $n$ increases.*

---

### 2. Sampling Distribution of the Sample Mean & Central Limit Theorem (CLT)
* **Sampling Distribution**: The probability distribution of a point estimate (e.g., sample mean $\bar{x}$) obtained by drawing all possible random samples of size $n$ from a population.
* **Central Limit Theorem (CLT)**:
  * For independent random observations, as the sample size $n$ increases, the sampling distribution of the sample mean $\bar{x}$ (and sample proportion $\hat{p}$) approaches a **Normal Distribution**, regardless of the shape of the underlying population distribution.
  * **Rule of Thumb for Sample Size**:
    * If the population is already normally distributed, the sampling distribution of $\bar{x}$ is normal for **any** sample size $n$.
    * If the population is non-normal (skewed, uniform, bimodal, etc.), the sampling distribution of $\bar{x}$ is **approximately normal** provided $n \ge 30$.
  * **Conditions for CLT**:
    1. **Independence**: Observations must be independent (e.g., random sampling / assignment). If sampling without replacement, sample size must be $n < 10\%$ of the population.
    2. **Sample Size / Normality**: $n \ge 30$ for non-normal populations, or population itself must be nearly normal.

---

### 3. Standard Error (SE)
The **Standard Error** measures the standard deviation (spread) of a statistic's sampling distribution. It quantifies how much a point estimate fluctuates from sample to sample.

* **Standard Error of the Mean**:
  $$\text{SE}_{\bar{x}} = \frac{\sigma}{\sqrt{n}}$$
  If the population standard deviation $\sigma$ is unknown, we substitute the sample standard deviation $s$:
  $$\text{SE}_{\bar{x}} \approx \frac{s}{\sqrt{n}}$$
* **Standard Error of a Proportion**:
  $$\text{SE}_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}} \quad \text{or} \quad \text{SE}_{\hat{p}} \approx \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$
* **Key Takeaway**: Standard error is inversely proportional to $\sqrt{n}$. To cut the standard error in half, you must quadruple the sample size ($4n$).

---

### 4. Confidence Intervals (CI) & Confidence Levels
A $(1 - \alpha) \times 100\%$ confidence interval provides a range $[L, U]$ within which we are confident the true population parameter lies.

* **General Formula**:
  $$\text{Confidence Interval} = \text{Point Estimate} \pm \text{Margin of Error}$$
  $$\text{CI} = \bar{x} \pm \left(z^* \times \text{SE}\right) = \bar{x} \pm \left(z^* \times \frac{s}{\sqrt{n}}\right)$$

#### Critical Values ($z^*$) for Common Confidence Levels:
The critical value $z^*$ corresponds to the upper tail cutoff for a two-tailed confidence level of $1 - \alpha$:

| Confidence Level ($1 - \alpha$) | Significance Level ($\alpha$) | Tail Probability ($\alpha/2$) | Critical Value ($z^*$) |
| :--- | :--- | :--- | :--- |
| **90%** | 0.10 | 0.050 | **1.645** |
| **95%** | 0.05 | 0.025 | **1.960** |
| **99%** | 0.01 | 0.005 | **2.576** (or 2.58) |

#### Correct Interpretation of a Confidence Interval:
* **Correct**: *"We are 95% confident that the true population mean $\mu$ falls within the interval $[L, U]$."* (This means that if we repeat the sampling process 100 times and construct 100 CIs, approximately 95 of them will contain the true fixed parameter $\mu$).
* **Incorrect**: *"There is a 95% probability that the true mean $\mu$ is inside $[10.5, 14.2]$."* (The true mean $\mu$ is a fixed constant, not a random variable. The specific interval either contains $\mu$ or it doesn't; the probability is 0 or 1).

---

### 5. Hypothesis Testing Framework
Hypothesis testing is a formal statistical procedure for making decisions using sample data.

#### Step-by-Step Procedure:
1. **State the Hypotheses**:
   * **Null Hypothesis ($H_0$)**: Skeptical claim, status quo, or statement of no effect/no difference. Assumed true until proven otherwise (e.g., $H_0: \mu = \mu_0$ or $H_0: p = p_0$).
   * **Alternative Hypothesis ($H_a$ or $H_A$)**: Claim to be supported; represents a change, difference, or effect (e.g., two-sided $H_a: \mu \neq \mu_0$, one-sided $H_a: \mu > \mu_0$ or $H_a: \mu < \mu_0$).
2. **Choose Significance Level ($\alpha$)**:
   * Common thresholds: $\alpha = 0.05$ (default), $0.01$, or $0.10$. Represents maximum tolerable risk of a Type I error.
3. **Calculate Test Statistic & $p$-value**:
   * Test Statistic (Z-score for mean when $\sigma$ known or $n \ge 30$):
     $$Z = \frac{\bar{x} - \mu_0}{\text{SE}} = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$$
   * Test Statistic (Z-score for proportion):
     $$Z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$$
   * **$p$-value**: The probability of obtaining a test statistic at least as extreme as the observed sample value, assuming $H_0$ is true.
4. **Make Decision & Draw Conclusion**:
   * **Rule**:
     $$\text{If } p\text{-value} < \alpha \implies \text{Reject } H_0 \quad (\text{Statistically Significant})$$
     $$\text{If } p\text{-value} \ge \alpha \implies \text{Fail to Reject } H_0 \quad (\text{Insufficient Evidence})$$
   * **Never say "Accept $H_0$"**. We only fail to reject $H_0$.

---

### 6. Type I and Type II Errors
Because hypothesis testing relies on sample data, errors can occur:

| Truth \ Decision | Do Not Reject $H_0$ (Fail to Reject) | Reject $H_0$ (In favor of $H_a$) |
| :--- | :--- | :--- |
| **$H_0$ is True** | Correct Decision ($1 - \alpha$) | **Type I Error** ($\alpha$) — False Positive |
| **$H_a$ is True ($H_0$ False)** | **Type II Error** ($\beta$) — False Negative | Correct Decision ($1 - \beta$) — **Power** |

* **Type I Error ($\alpha$)**: Rejecting $H_0$ when $H_0$ is actually true (False Positive).
  * Example: Convicting an innocent person; declaring a drug effective when it is not.
  * Probability $= \alpha$ (significance level).
* **Type II Error ($\beta$)**: Failing to reject $H_0$ when $H_0$ is actually false (False Negative).
  * Example: Acquitting a guilty person; failing to detect an effective drug.
  * Probability $= \beta$.
* **Power ($1 - \beta$)**: The probability of correctly rejecting a false $H_0$. Power increases with larger sample size $n$, larger effect size, or higher significance level $\alpha$.

---

## 🐍 Python Snippets

### 1. Importing Libraries & Overview of `scipy.stats`
```python
import numpy as np
import pandas as pd
from scipy import stats

# scipy.stats functions used for inference:
# stats.norm.ppf() -> Percent point function (Quantile / inverse CDF) for Z
# stats.norm.cdf() -> Cumulative distribution function for Z
# stats.t.ppf()    -> Inverse CDF for Student's t-distribution
# stats.t.cdf()    -> Cumulative distribution function for t
# stats.sem()      -> Standard error of the mean
```

---

### 2. Computing Critical Values ($z^*$ and $t^*$)
```python
# Finding z* for a given confidence level (Two-Tailed)
confidence_level = 0.95
alpha = 1 - confidence_level

# z* for 95% CI (alpha = 0.05) -> norm.ppf(1 - alpha/2) = norm.ppf(0.975)
z_star_95 = stats.norm.ppf(1 - alpha / 2)
print(f"95% z*: {z_star_95:.4f}")  # Output: 1.95996

# z* for 90% and 99% CIs
z_star_90 = stats.norm.ppf(1 - (1 - 0.90) / 2)
z_star_99 = stats.norm.ppf(1 - (1 - 0.99) / 2)
print(f"90% z*: {z_star_90:.4f}, 99% z*: {z_star_99:.4f}")
# Output: 90% z*: 1.6449, 99% z*: 2.5758

# Finding t* for small sample sizes (e.g., n = 15, df = n - 1 = 14)
n = 15
df = n - 1
t_star_95 = stats.t.ppf(1 - alpha / 2, df=df)
print(f"95% t* (df=14): {t_star_95:.4f}")  # Output: 2.1448
```

---

### 3. Computing Standard Error
```python
data = np.array([102.3, 98.6, 104.1, 99.8, 101.5, 103.0, 97.9, 100.4])

# Method A: Using scipy.stats.sem (ddof=1 by default)
se_scipy = stats.sem(data)

# Method B: Manual calculation
sample_std = np.std(data, ddof=1)
n = len(data)
se_manual = sample_std / np.sqrt(n)

print(f"SE (scipy): {se_scipy:.4f}, SE (manual): {se_manual:.4f}")
```

---

### 4. Computing Confidence Intervals Manually in Python
```python
# Sample data summary statistics
sample_mean = 94.48
sample_std = 15.20
n = 60
confidence_level = 0.95

# Step 1: Calculate alpha and critical value z*
alpha = 1 - confidence_level
z_star = stats.norm.ppf(1 - alpha / 2)

# Step 2: Compute Standard Error and Margin of Error
se = sample_std / np.sqrt(n)
margin_of_error = z_star * se

# Step 3: Compute CI bounds
ci_lower = sample_mean - margin_of_error
ci_upper = sample_mean + margin_of_error

print(f"Sample Mean: {sample_mean:.2f}")
print(f"Margin of Error: {margin_of_error:.2f}")
print(f"95% Confidence Interval: ({ci_lower:.2f}, {ci_upper:.2f})")
```

---

### 5. Calculating p-values for Z-tests
```python
# Given sample statistics and null hypothesis value mu_0
sample_mean = 105.2
mu_0 = 100.0
sample_std = 12.5
n = 50
alpha = 0.05

# Compute Z test statistic
se = sample_std / np.sqrt(n)
z_stat = (sample_mean - mu_0) / se

# Compute p-value
# Two-tailed test: p-value = 2 * (1 - CDF(|Z|))
p_val_two_tailed = 2 * (1 - stats.norm.cdf(np.abs(z_stat)))

# Upper-tailed test (H_a: mu > mu_0): p-value = 1 - CDF(Z)
p_val_upper = 1 - stats.norm.cdf(z_stat)

print(f"Z-statistic: {z_stat:.4f}")
print(f"Two-tailed p-value: {p_val_two_tailed:.4f}")

# Decision rule
if p_val_two_tailed < alpha:
    print("Decision: Reject H0 (Statistically Significant)")
else:
    print("Decision: Fail to Reject H0")
```

---

## 📊 Formulas & Key Equations

| Concept | Formula | Notes / Variable Definitions |
| :--- | :--- | :--- |
| **Sample Mean** | $\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$ | Point estimate for $\mu$ |
| **Sample Variance** | $s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$ | Sample variance ($ddof=1$) |
| **SE (Sample Mean)** | $\text{SE}_{\bar{x}} = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}}$ | Standard error of the mean |
| **SE (Sample Proportion)** | $\text{SE}_{\hat{p}} = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ | Standard error of proportion |
| **Margin of Error (ME)** | $\text{ME} = z^* \times \text{SE}$ | $z^*$ comes from confidence level |
| **Confidence Interval** | $\text{CI} = \text{Point Estimate} \pm (z^* \times \text{SE})$ | $[\bar{x} - z^*\text{SE}, \bar{x} + z^*\text{SE}]$ |
| **Critical Value $z^*$** | $z^* = \text{norm.ppf}\left(1 - \frac{\alpha}{2}\right)$ | Two-tailed quantile function |
| **Z-statistic (Mean)** | $Z = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$ | One-sample Z-test |
| **Z-statistic (Proportion)** | $Z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$ | Uses null proportion $p_0$ in SE |
| **Two-Tailed $p$-value** | $p\text{-value} = 2 \times \left(1 - \Phi(|Z|)\right)$ | $\Phi(Z) = \text{norm.cdf}(Z)$ |

---

## ⚠️ Common Exam Traps

> [!CAUTION]
> **Trap 1: Misinterpreting Confidence Interval Probability**
> * **Wrong**: "There is a 95% probability that the true mean $\mu$ is between 45.2 and 52.8."
> * **Right**: "We are 95% confident that the true population mean $\mu$ is between 45.2 and 52.8." (Once computed, the specific interval either contains $\mu$ or it doesn't).

> [!WARNING]
> **Trap 2: Confusing Standard Deviation ($s$) with Standard Error ($\text{SE}$)**
> * Standard deviation $s$ measures the dispersion of **individual data points** around the mean.
> * Standard error $\text{SE} = s / \sqrt{n}$ measures the dispersion of **sample means** around the true population mean. As sample size $n$ increases, $s$ remains steady, but $\text{SE}$ shrinks!

> [!IMPORTANT]
> **Trap 3: Believing CLT Requires a Normal Population**
> * CLT applies **specifically when the population is non-normal**, assuring us that the sampling distribution of $\bar{x}$ becomes approximately normal if $n \ge 30$. If the population is already normal, the sample mean is normal for any $n$.

> [!NOTE]
> **Trap 4: One-Tailed vs. Two-Tailed $z^*$ Cutoffs**
> * For a 95% **Confidence Interval** (always two-sided), $\alpha = 0.05 \implies \alpha/2 = 0.025 \implies z^* = \text{norm.ppf}(0.975) = 1.96$.
> * Do not use `norm.ppf(0.95) = 1.645` for a 95% two-sided confidence interval! `norm.ppf(0.95)` is used for a 90% CI or a 95% one-tailed test.

> [!WARNING]
> **Trap 5: Using $\hat{p}$ instead of $p_0$ in Hypothesis Test SE**
> * When constructing a **confidence interval** for a proportion, use $\text{SE} = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$.
> * When performing a **hypothesis test** for a proportion $H_0: p = p_0$, use $\text{SE}_0 = \sqrt{\frac{p_0(1-p_0)}{n}}$ because we assume $H_0$ is true when deriving the sampling distribution.

> [!CAUTION]
> **Trap 6: Saying "Accept $H_0$" or Confusing $p$-value with $P(H_0 \text{ is true})$**
> * Never conclude "Accept $H_0$". The formal outcome is "Fail to reject $H_0$".
> * The $p$-value is $P(\text{Data as extreme or more extreme} \mid H_0 \text{ is True})$. It is **NOT** the probability that $H_0$ is true.

---

## 🧪 Practice Questions

### Question 1 (Calculation: 95% Confidence Interval for Mean)
A random sample of $n = 36$ battery lifetimes yields a sample mean of $\bar{x} = 85.0$ hours with a sample standard deviation of $s = 12.0$ hours. Assuming the sample observations are independent, construct a **95% confidence interval** for the population mean battery lifetime $\mu$.
 A) $[81.71, 88.29]$ B) $[81.08, 88.92]$ C) $[81.71, 88.29]$ D) $[79.85, 90.15]$

---

### Question 2 (Python Snippet: Finding $z^*$ and CI Output)
Consider the following Python code snippet:

```python
import numpy as np
from scipy import stats

scores = np.array([78, 85, 92, 88, 74, 80, 95, 90, 82, 86])
n = len(scores)
sample_mean = np.mean(scores)
se = stats.sem(scores)

alpha = 0.10  # 90% confidence level
z_star = stats.norm.ppf(1 - alpha / 2)
me = z_star * se
ci = (sample_mean - me, sample_mean + me)

print(f"z_star: {z_star:.3f}, CI: ({ci[0]:.2f}, {ci[1]:.2f})")
```

What will be the printed output of this code? (Note: `sample_mean = 84.90`, `sample_std = 6.6408`, `se = 2.1001`).
 A) `z_star: 1.645, CI: (81.45, 88.35)` B) `z_star: 1.960, CI: (80.78, 89.02)` C) `z_star: 1.282, CI: (82.21, 87.59)` D) `z_star: 2.576, CI: (79.49, 90.31)`

---

### Question 3 (Conceptual: Central Limit Theorem)
A population of customer wait times at a bank has a heavily right-skewed distribution with population mean $\mu = 12.0$ minutes and population standard deviation $\sigma = 8.0$ minutes. A data analyst draws a random sample of $n = 64$ bank customers. Which of the following statements regarding the sampling distribution of the sample mean wait time $\bar{x}$ is **TRUE**?
 A) The sampling distribution of $\bar{x}$ will be heavily right-skewed with a mean of 12.0 minutes and standard error of 8.0 minutes. B) The Central Limit Theorem does not apply because the underlying population is not normally distributed. C) The sampling distribution of $\bar{x}$ will be approximately normal with a mean of 12.0 minutes and standard error of 1.0 minute. D) The sampling distribution of $\bar{x}$ will be approximately normal with a mean of 12.0 minutes and standard error of 8.0 minutes.

---

### Question 4 (Calculation & Hypothesis Test: One-Sample Z-Test for Proportion)
A tech survey of $n = 400$ randomly selected computer science students reveals that $220$ students prefer working in Linux over Windows ($\hat{p} = 0.55$). Test the null hypothesis $H_0: p = 0.50$ (no preference majority) against $H_a: p \neq 0.50$ at significance level $\alpha = 0.05$. 

Compute the test statistic $Z$ and the $p$-value, and state the conclusion.
 A) $Z = 2.00$, $p\text{-value} = 0.0456 \implies$ Reject $H_0$; there is statistically significant evidence of a preference. B) $Z = 2.00$, $p\text{-value} = 0.0228 \implies$ Fail to reject $H_0$; there is insufficient evidence of a preference. C) $Z = 1.645$, $p\text{-value} = 0.1000 \implies$ Reject $H_0$; there is statistically significant evidence of a preference. D) $Z = 2.01$, $p\text{-value} = 0.0444 \implies$ Fail to reject $H_0$; there is insufficient evidence of a preference.

---

### Question 5 (Python Snippet & Decision Rule / Error Types)
Consider the Python script below evaluating a hypothesis test:

```python
from scipy import stats

# Observed Z statistic from a sample
z_stat = 2.15
alpha = 0.05

# Two-tailed p-value computation
p_val = 2 * (1 - stats.norm.cdf(abs(z_stat)))
print(f"p-value: {p_val:.4f}")

if p_val < alpha:
    print("Result: Reject H0")
else:
    print("Result: Fail to Reject H0")
```

If $H_0$ is actually **true** in reality for this population, what is the printed output and what type of decision error occurred?
 A) `p-value: 0.0316`, `Result: Reject H0`; Type I Error (False Positive). B) `p-value: 0.0158`, `Result: Reject H0`; Type II Error (False Negative). C) `p-value: 0.0316`, `Result: Fail to Reject H0`; Type I Error (False Positive). D) `p-value: 0.9842`, `Result: Fail to Reject H0`; Type II Error (False Negative).

---

### 📝 Answer Key

* **Q1: B** — **Step-by-step solution**:
  1. Given: $n = 36$, $\bar{x} = 85.0$, $s = 12.0$, Confidence Level $= 95\%$.
  2. Standard Error: $\text{SE} = \frac{s}{\sqrt{n}} = \frac{12.0}{\sqrt{36}} = \frac{12.0}{6} = 2.0$.
  3. Critical value $z^*$ for $95\%$ confidence level: $z^* = 1.960$.
  4. Margin of Error: $\text{ME} = z^* \times \text{SE} = 1.960 \times 2.0 = 3.92$.
  5. Confidence Interval bounds:
     $$\text{Lower Bound} = 85.0 - 3.92 = 81.08$$
     $$\text{Upper Bound} = 85.0 + 3.92 = 88.92$$
     Hence, the $95\%$ CI is $[81.08, 88.92]$.

* **Q2: A** — **Step-by-step solution**:
  1. `alpha = 0.10` corresponds to a $90\%$ confidence level.
  2. `z_star = stats.norm.ppf(1 - 0.10/2) = stats.norm.ppf(0.95) = 1.64485 \approx 1.645`.
  3. `sample_mean = 84.90`, `se = 2.1001`.
  4. `me = 1.64485 * 2.1001 = 3.4544`.
  5. `ci_lower = 84.90 - 3.45 = 81.45`, `ci_upper = 84.90 + 3.45 = 88.35`.
  6. Printed string format gives `z_star: 1.645, CI: (81.45, 88.35)`.

* **Q3: C** — **Step-by-step solution**:
  1. According to the Central Limit Theorem, since $n = 64 \ge 30$, the sampling distribution of $\bar{x}$ is **approximately normal** regardless of the population skewness.
  2. The mean of the sampling distribution equals the population mean: $\mu_{\bar{x}} = \mu = 12.0$ minutes.
  3. The standard error is $\text{SE} = \frac{\sigma}{\sqrt{n}} = \frac{8.0}{\sqrt{64}} = \frac{8.0}{8} = 1.0$ minute.

* **Q4: A** — **Step-by-step solution**:
  1. Hypotheses: $H_0: p = 0.50$ vs $H_a: p \neq 0.50$.
  2. Sample proportion $\hat{p} = \frac{220}{400} = 0.55$.
  3. Under $H_0$, $\text{SE}_0 = \sqrt{\frac{p_0(1-p_0)}{n}} = \sqrt{\frac{0.50 \times 0.50}{400}} = \sqrt{\frac{0.25}{400}} = \sqrt{0.000625} = 0.025$.
  4. Test statistic: $Z = \frac{\hat{p} - p_0}{\text{SE}_0} = \frac{0.55 - 0.50}{0.025} = \frac{0.05}{0.025} = 2.00$.
  5. Two-tailed $p$-value for $Z = 2.00$:
     $$p\text{-value} = 2 \times (1 - \text{norm.cdf}(2.00)) = 2 \times (1 - 0.9772) = 2 \times 0.0228 = 0.0456$$
  6. Decision: Since $p\text{-value} = 0.0456 < \alpha = 0.05$, we reject $H_0$.

* **Q5: A** — **Step-by-step solution**:
  1. `z_stat = 2.15`.
  2. `stats.norm.cdf(2.15) \approx 0.98422`.
  3. `1 - 0.98422 = 0.01578`.
  4. `p_val = 2 * 0.01578 = 0.03156 \approx 0.0316`.
  5. Since `0.0316 < 0.05`, the condition `p_val < alpha` is True, so it prints `Result: Reject H0`.
  6. Rejecting a true null hypothesis $H_0$ is by definition a **Type I Error** (False Positive).

## Multiple Choice Questions

1. What does the Central Limit Theorem (CLT) state?
    - **A)** The distribution of sample means approaches normality as sample size increases, regardless of the population distribution
    - **B)** The population distribution will become normal if the sample size is large enough
    - **C)** A sample size of 10 is sufficient for normal approximation
    - **D)** Standard error increases as sample size increases

2. A Type I error occurs when:
    - **A)** We fail to reject a false null hypothesis
    - **B)** We reject a true null hypothesis
    - **C)** We calculate the p-value incorrectly
    - **D)** The sample size is too small

3. What is a p-value?
    - **A)** The probability that the alternative hypothesis is true
    - **B)** The probability of observing a test statistic as extreme as, or more extreme than, the one observed, assuming the null hypothesis is true
    - **C)** The probability that the null hypothesis is false
    - **D)** The exact confidence interval

4. The standard error of the mean is calculated as:
    - **A)** Sample standard deviation multiplied by n
    - **B)** Sample standard deviation divided by the square root of n
    - **C)** Population mean divided by n
    - **D)** Variance squared

5. A point estimate is:
    - **A)** A range of plausible values for a parameter
    - **B)** A single value used as an estimate of a population parameter
    - **C)** The exact population parameter
    - **D)** The difference between Type I and Type II errors

### Answer Key & Explanations
1. **A)** CLT is fundamental: the sampling distribution of the mean is approx normal for large n.
2. **B)** Type I error is a false positive - rejecting H0 when its actually true.
3. **B)** The p-value quantifies evidence against the null under the assumption the null is true.
4. **B)** SE = s / sqrt(n).
5. **B)** A point estimate is a single statistic (like sample mean) estimating the true parameter.

## References & Navigation

- **Previous Topic:** [[EDA]]
- **Next Topic:** [[Inference for Means]]
- **Related Notes:** [[Inference for Means]], [[Inference for Categorical Data]]

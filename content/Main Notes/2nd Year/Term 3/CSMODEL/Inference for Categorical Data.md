---
id: Module-09-Inference-for-Categorical-Data
type: note
course: CSMODEL
topic: Inference for Categorical Data
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Inference for Categorical Data]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 09: Inference for Categorical Data

## Key Concepts

### 1. Introduction to Categorical Data Inference
In statistical modeling and data science, categorical data consists of variables representing qualitative categories rather than numerical measurements (e.g., survey agreement, political affiliation, health status, race, or success/failure outcomes). 

While numerical data is analyzed using inference on means ($\mu$) and standard deviations ($\sigma$), categorical data requires inference based on **proportions ($p$)** and **frequencies/counts ($O_i$)**.

Categorical inference is categorized based on the number of variables and categories involved:
1. **One Proportion:** Testing or estimating the population proportion $p$ for a single binary variable ($H_0: p = p_0$).
2. **Two Proportions:** Comparing population proportions across two independent groups ($H_0: p_1 = p_2$).
3. **Goodness-of-Fit (Single Variable, $k > 2$ Categories):** Comparing observed sample frequencies across $k$ categories to a theoretical or historical population distribution.
4. **Test of Independence (Two Variables, $r \times c$ Contingency Table):** Evaluating whether two categorical variables are independent or statistically associated.

---

### 2. Inference for a Single Proportion (One-Proportion z-Test)

#### Concept & Hypotheses
The **One-Proportion z-Test** assesses whether a population proportion $p$ equals a hypothesized baseline proportion $p_0$.
 **Null Hypothesis ($H_0$):** $p = p_0$ (The true population proportion is equal to the hypothesized value $p_0$). **Alternative Hypothesis ($H_A$):** 
Two-tailed: $p \neq p_0$
One-tailed: $p > p_0$ or $p < p_0$

#### Sample Proportion & Standard Error
Given a sample of size $n$ with $x$ observed successes:
$$\hat{p} = \frac{x}{n}$$

Under $H_0$, the sampling distribution of $\hat{p}$ is centered at $p_0$ with standard error:
$$SE_0 = \sqrt{\frac{p_0(1 - p_0)}{n}}$$

#### Test Statistic
$$z = \frac{\hat{p} - p_0}{SE_0} = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1 - p_0)}{n}}}$$

#### Confidence Interval for a Proportion
To construct a $(1-\alpha) \times 100\%$ confidence interval for $p$, we use the sample proportion $\hat{p}$ for standard error estimation:
$$CI = \hat{p} \pm z^* \cdot SE_{\hat{p}} = \hat{p} \pm z^* \cdot \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$
where $z^*$ is the critical value from the standard normal distribution (e.g., $z^* = 1.96$ for $95\%$ confidence).

#### Relationship Between $p$ and Margin of Error (ME)
The Margin of Error $ME = z^* \sqrt{\frac{p(1-p)}{n}}$ varies depending on $p$: **Maximum ME:** Achieved when $p = 0.5$. (Worst-case scenario; used when planning sample size without prior knowledge of $p$). **Minimum ME:** Achieved when $p$ approaches $0$ or $1$.

#### Conditions for One-Proportion z-Test & CI
1. **Independence:** The sample observations must be independent.
Random sampling / random assignment.
**$10\%$ Condition:** If sampling without replacement, sample size $n \le 10\%$ of the total population.
2. **Success-Failure Condition:**
For **Hypothesis Testing:** Expected successes $n p_0 \ge 10$ AND expected failures $n (1 - p_0) \ge 10$.
For **Confidence Intervals:** Observed successes $n \hat{p} \ge 10$ AND observed failures $n (1 - \hat{p}) \ge 10$.

---

### 3. Inference for Two Proportions (Two-Proportion z-Test)

#### Concept & Hypotheses
The **Two-Proportion z-Test** compares the proportions of two independent populations ($p_1$ and $p_2$).
 **Null Hypothesis ($H_0$):** $p_1 - p_2 = 0 \iff p_1 = p_2$ (There is no difference between the two population proportions). **Alternative Hypothesis ($H_A$):** $p_1 - p_2 \neq 0$ (or $p_1 > p_2$, $p_1 < p_2$).

#### Pooled Proportion ($\hat{p}_{\text{pool}}$)
Under $H_0$, we assume $p_1 = p_2 = p$. The best estimate of this common proportion $p$ is obtained by **pooling** the successes and sample sizes from both groups:
$$\hat{p}_{\text{pool}} = \frac{x_1 + x_2}{n_1 + n_2} = \frac{n_1 \hat{p}_1 + n_2 \hat{p}_2}{n_1 + n_2}$$

#### Standard Error & Test Statistic
The pooled standard error for the difference $(\hat{p}_1 - \hat{p}_2)$ under $H_0$ is:
$$SE_{\text{pool}} = \sqrt{\hat{p}_{\text{pool}}(1 - \hat{p}_{\text{pool}}) \left( \frac{1}{n_1} + \frac{1}{n_2} \right)}$$

The z-test statistic is:
$$z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}_{\text{pool}}(1 - \hat{p}_{\text{pool}}) \left( \frac{1}{n_1} + \frac{1}{n_2} \right)}}$$

#### Conditions for Two-Proportion z-Test
1. **Independence:** Within each group and between the two groups (independent random samples).
2. **Success-Failure Condition:** Expected successes and failures in BOTH groups under $\hat{p}_{\text{pool}}$ must be at least 10:
   $$n_1 \hat{p}_{\text{pool}} \ge 10, \quad n_1 (1 - \hat{p}_{\text{pool}}) \ge 10, \quad n_2 \hat{p}_{\text{pool}} \ge 10, \quad n_2 (1 - \hat{p}_{\text{pool}}) \ge 10$$

---

### 4. Chi-Square ($\chi^2$) Goodness-of-Fit Test

#### Concept & Hypotheses
The **Chi-Square Goodness-of-Fit Test** determines whether an observed categorical frequency distribution across $k$ categories ($k \ge 2$) matches an expected theoretical or baseline population distribution.
 **Null Hypothesis ($H_0$):** The sample distribution follows the specified population distribution (there is no difference between observed and expected proportions). **Alternative Hypothesis ($H_A$):** The sample distribution does NOT follow the specified population distribution (at least one category proportion differs).

#### Expected Frequencies ($E_i$)
Given total sample size $n$ and hypothesized category probabilities $p_1, p_2, \dots, p_k$:
$$E_i = n \cdot p_i \quad \text{for } i = 1, 2, \dots, k$$
Note that $\sum_{i=1}^k O_i = \sum_{i=1}^k E_i = n$.

#### Test Statistic
The Chi-Square statistic measures the aggregate normalized squared deviation of observed frequencies ($O_i$) from expected frequencies ($E_i$):
$$\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}$$
 $\chi^2 \ge 0$ always. If $O_i = E_i$ for all $i$, $\chi^2 = 0$ (perfect fit). Larger values of $\chi^2$ indicate greater discrepancy between sample data and $H_0$.

#### Degrees of Freedom ($df$)
$$df = k - 1$$
where $k$ is the number of categories/bins.

#### Conditions for Goodness-of-Fit Test
1. **Independence:** Each observation in the sample must be independent of all other observations.
2. **Expected Cell Counts Condition:** EVERY expected cell count must be at least 5 ($E_i \ge 5$ for all $i$).
   >  **Crucial Note:** This condition applies to **expected counts ($E_i$)**, NOT observed counts ($O_i$).

---

### 5. Chi-Square ($\chi^2$) Test of Independence

#### Concept & Hypotheses
The **Chi-Square Test of Independence** evaluates whether two categorical variables measured on the same sample are independent of each other or statistically associated.
 **Null Hypothesis ($H_0$):** Variable A and Variable B are **independent** (the outcome of one variable does not depend on the outcome of the other). **Alternative Hypothesis ($H_A$):** Variable A and Variable B are **dependent / associated** (the distribution of one variable differs across levels of the other).

#### Contingency Table ($r \times c$)
Observations are summarized in a two-way contingency table with $r$ rows (categories of Variable A) and $c$ columns (categories of Variable B).

#### Expected Frequencies ($E_{i,j}$)
Under the null hypothesis of independence, $P(A_i \cap B_j) = P(A_i) \times P(B_j)$. The expected frequency for cell $(i, j)$ is:
$$E_{i,j} = \frac{(\text{Row } i \text{ Total}) \times (\text{Column } j \text{ Total})}{\text{Grand Total } (N)}$$

#### Test Statistic & Degrees of Freedom
$$\chi^2 = \sum_{i=1}^{r} \sum_{j=1}^{c} \frac{(O_{i,j} - E_{i,j})^2}{E_{i,j}}$$
$$df = (r - 1) \times (c - 1)$$

#### Conditions for Test of Independence
1. **Independence:** Sample observations are randomly selected and independent of one another.
2. **Expected Cell Counts Condition:** EVERY expected cell count $E_{i,j} \ge 5$.

---

### 6. Interpreting Chi-Square Test Results
 **Right-Tailed Nature:** Because discrepancies are squared, all non-zero terms are positive. Chi-Square tests are **inherently one-sided (right-tailed)**. **p-value:** $P(\chi^2_{df} \ge \text{calculated } \chi^2)$. **Decision Rule:**
If $p\text{-value} \le \alpha$ (e.g., $0.05$): **Reject $H_0$**. Conclude there is statistically significant evidence of a difference or relationship.
If $p\text{-value} > \alpha$: **Fail to reject $H_0$** (or accept $H_0$). The sample data does not provide sufficient evidence to rule out chance variation.

---

## Python Snippets

### 1. Contingency Tables with `pd.crosstab()`
Creates a frequency cross-tabulation of two categorical series from a pandas DataFrame.

```python
import pandas as pd

# Load dataset
cdc_df = pd.read_csv('cdcpartial.csv')

# Create a contingency table of exercise history vs general health status
counts = pd.crosstab(cdc_df['exerany'], cdc_df['genhlth'])

# Format into a clean DataFrame with custom row labels
table = pd.DataFrame([counts.loc[0], counts.loc[1]], index=['no exercise', 'exercise'])
print(table)
```

### 2. Chi-Square Test of Independence with `scipy.stats.chi2_contingency()`
Calculates the $\chi^2$ statistic, p-value, degrees of freedom, and expected frequencies for a contingency table.

```python
from scipy.stats import chi2_contingency

# Perform Chi-Square Test of Independence
# Note: set correction=False to get standard Pearson chi-square without Yates' continuity correction
chi2_stat, p_val, dof, expected = chi2_contingency(table, correction=False)

print(f"Chi-Square Statistic : {chi2_stat:.4f}")
print(f"p-value              : {p_val:.4e}")
print(f"Degrees of Freedom   : {dof}")
print("Expected Frequencies :\n", expected)

# Statistical Decision
alpha = 0.05
if p_val < alpha:
    print("Reject H0: The two categorical variables are dependent.")
else:
    print("Fail to reject H0: The two categorical variables are independent.")
```

### 3. Chi-Square Goodness-of-Fit Test with `scipy.stats.chisquare()`
Tests whether observed category counts differ significantly from expected theoretical frequencies.

```python
from scipy.stats import chisquare

# Example: Juror race distribution vs expected counts based on voter registration
observed = [205, 26, 25, 19]          # Observed counts: White, Black, Hispanic, Other
expected = [198.0, 19.25, 33.0, 24.75] # Expected counts: Total (275) * voter %

# Perform Goodness-of-Fit test
gof_result = chisquare(f_obs=observed, f_exp=expected)

print(f"Goodness-of-Fit Chi2 Stat : {gof_result.statistic:.4f}")
print(f"p-value                   : {gof_result.pvalue:.4f}")
```

### 4. Proportion z-Tests with `statsmodels.stats.proportion.proportions_ztest()`
Handles both 1-proportion z-tests and 2-proportion z-tests.

```python
from statsmodels.stats.proportion import proportions_ztest

# --- ONE-PROPORTION z-TEST ---
# H0: p = 0.10 vs H1: p != 0.10
# Observed: 140 atheists in sample of 1000 respondents
count_1 = 140
nobs_1 = 1000
value_0 = 0.10

z_stat_1, p_val_1 = proportions_ztest(count=count_1, nobs=nobs_1, value=value_0, alternative='two-sided')
print(f"1-Prop z-statistic: {z_stat_1:.4f}, p-value: {p_val_1:.4f}")

# --- TWO-PROPORTION z-TEST ---
# Group 1 (Smokers): 150 had condition out of 500
# Group 2 (Non-Smokers): 180 had condition out of 700
counts_2 = [150, 180]
nobs_2 = [500, 700]

z_stat_2, p_val_2 = proportions_ztest(count=counts_2, nobs=nobs_2, alternative='two-sided')
print(f"2-Prop z-statistic: {z_stat_2:.4f}, p-value: {p_val_2:.4f}")
```

### 5. Computing Sample Proportion Confidence Intervals & Margin of Error
Calculates the point estimate, standard error, margin of error, and confidence interval bounds in Python.

```python
import numpy as np
from scipy.stats import norm

# Sample statistics from Atheism survey (US 2012 sample)
n = 1002
atheist_count = 50
atheist_prop = atheist_count / n

# 95% Confidence Interval Calculation
confidence_level = 0.95
z_crit = norm.ppf(1 - (1 - confidence_level) / 2) # approx 1.96

# Standard Error and Margin of Error
se = np.sqrt(atheist_prop * (1 - atheist_prop) / n)
margin_of_error = z_crit * se

minimum_value = atheist_prop - margin_of_error
maximum_value = atheist_prop + margin_of_error

print(f"Sample Proportion : {atheist_prop * 100:.4f}%")
print(f"Margin of Error   : {margin_of_error * 100:.4f}%")
print(f"95% CI            : ({minimum_value * 100:.4f}%, {maximum_value * 100:.4f}%)")
```

---

## Formulas & Key Equations

| Formula / Metric | Mathematical Expression | Key Context / Notes |
| :--- | :--- | :--- |
| **Sample Proportion** | $\hat{p} = \frac{x}{n}$ | Ratio of observed successes $x$ to sample size $n$. |
| **1-Prop Hypothesis Test SE** | $SE_0 = \sqrt{\frac{p_0(1-p_0)}{n}}$ | Uses **hypothesized value $p_0$** under $H_0$. |
| **1-Prop Confidence Interval SE** | $SE_{\hat{p}} = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ | Uses **sample proportion $\hat{p}$**. |
| **1-Prop z-Test Statistic** | $z = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$ | Tests $H_0: p = p_0$. |
| **Proportion Margin of Error** | $ME = z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$ | Maximized when $\hat{p} = 0.5$. |
| **Pooled Proportion (2-Prop)** | $\hat{p}_{\text{pool}} = \frac{x_1 + x_2}{n_1 + n_2}$ | Combines successes under $H_0: p_1 = p_2$. |
| **2-Prop z-Test Statistic** | $z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}_{\text{pool}}(1-\hat{p}_{\text{pool}})\left(\frac{1}{n_1} + \frac{1}{n_2}\right)}}$ | Compares two independent proportions. |
| **Chi-Square Expected Cell Count (GOF)** | $E_i = n \cdot p_i$ | $n$ = sample size, $p_i$ = theoretical probability. |
| **Chi-Square Expected Cell Count (Independence)** | $E_{i,j} = \frac{(\text{Row } i \text{ Total}) \times (\text{Col } j \text{ Total})}{N}$ | Calculated for each cell in an $r \times c$ table. |
| **Chi-Square Statistic ($\chi^2$)** | $\chi^2 = \sum \frac{(O - E)^2}{E}$ | Aggregate normalized squared deviation. |
| **Degrees of Freedom (GOF)** | $df = k - 1$ | $k$ = number of categories. |
| **Degrees of Freedom (Independence)** | $df = (r - 1)(c - 1)$ | $r$ = number of rows, $c$ = number of columns. |

---

## Common Exam Traps

1. **Checking $E \ge 5$ on Observed Counts instead of Expected Counts:**
 **Wrong:** Rejecting a Chi-Square test because an observed cell count is $O_{ij} = 2$.
 **Correct:** The condition requires **EXPECTED counts ($E_{ij} \ge 5$)**. It is completely fine if observed counts $O_{ij}$ are small or even $0$, as long as all $E_{ij} \ge 5$.

2. **Standard Error Formula: $p_0$ vs $\hat{p}$ Confusion:**
 **Wrong:** Using $\hat{p}$ in the SE denominator when calculating the 1-proportion z-test statistic.
 **Correct:**
For **Hypothesis Testing** ($z$-test), use $p_0$: $SE = \sqrt{\frac{p_0(1-p_0)}{n}}$.
For **Confidence Intervals** ($CI$), use $\hat{p}$: $SE = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$.

3. **Degrees of Freedom Miscalculation in Contingency Tables:**
 **Wrong:** Setting $df = (r \times c) - 1$ for a Test of Independence.
 **Correct:** For a Test of Independence, $df = (r - 1)(c - 1)$. For Goodness-of-Fit, $df = k - 1$.

4. **Yates' Continuity Correction in Python (`chi2_contingency`):**
 **Wrong:** Expecting `scipy.stats.chi2_contingency(table)` to equal hand calculations when analyzing a $2 \times 2$ table without checking parameters.
 **Correct:** By default, SciPy applies Yates' continuity correction (`correction=True`) for $2 \times 2$ tables, which shrinks $\chi^2$. Set `correction=False` to reproduce exact Pearson hand calculations on exams.

5. **Assuming Chi-Square Tests are Two-Tailed:**
 **Wrong:** Splitting $\alpha$ into two tails ($\alpha/2$) for a Chi-Square p-value.
 **Correct:** Chi-Square tests are **always right-tailed** because squared terms $(O-E)^2$ enforce $\chi^2 \ge 0$. Any deviation from $H_0$ pushes $\chi^2$ further into the upper tail.

6. **Maximum Margin of Error Misinterpretation:**
 **Wrong:** Thinking Margin of Error is highest when sample proportion is close to $0$ or $1$.
 **Correct:** Margin of Error $ME = z^* \sqrt{\frac{p(1-p)}{n}}$ is **maximized at $p = 0.5$** and shrinks as $p \to 0$ or $p \to 1$.

---

## Practice Questions

**Q1.** A Computer Science department wants to test if students are equally distributed across 4 elective tracks: Data Science (DS), Software Technology (ST), Network & Security (NS), and Interactive Media (IM). In a random sample of $N = 200$ students, the observed counts are: DS: $65$ ST: $55$ NS: $45$ IM: $35$

Calculate the Chi-Square statistic $\chi^2$ and state the degrees of freedom $df$. At a significance level of $\alpha = 0.05$ (critical value $\chi^2_{0.05, 3} = 7.815$), what is the statistical conclusion? A) $\chi^2 = 5.00, df = 3$; Fail to reject $H_0$ (distribution is equal). B) $\chi^2 = 10.00, df = 3$; Reject $H_0$ (distribution is not equal). C) $\chi^2 = 10.00, df = 4$; Reject $H_0$ (distribution is not equal). D) $\chi^2 = 12.50, df = 3$; Reject $H_0$ (distribution is not equal).

---

**Q2.** A researcher surveys 200 university students to test whether major choice (Major A vs Major B) is independent of obtaining an internship (Interned vs Did Not Intern). The observed contingency table is:

| Major | Interned | Did Not Intern | Total |
| :--- | :---: | :---: | :---: |
| **Major A** | $40$ | $60$ | **100** |
| **Major B** | $60$ | $40$ | **100** |
| **Total** | **100** | **100** | **200** |

What is the expected count $E$ for Major A students who Interned under $H_0$, and what is the Pearson Chi-Square test statistic $\chi^2$? A) $E = 40.0, \chi^2 = 4.00$ B) $E = 50.0, \chi^2 = 8.00$ C) $E = 50.0, \chi^2 = 4.00$ D) $E = 60.0, \chi^2 = 16.00$

---

**Q3.** An e-commerce platform tests two website layouts (Layout 1 and Layout 2) to determine if there is a difference in conversion proportions. Layout 1: $x_1 = 120$ conversions out of $n_1 = 400$ visitors ($\hat{p}_1 = 0.30$). Layout 2: $x_2 = 180$ conversions out of $n_2 = 600$ visitors ($\hat{p}_2 = 0.30$).

What is the pooled sample proportion $\hat{p}_{\text{pool}}$ and the calculated z-test statistic? A) $\hat{p}_{\text{pool}} = 0.30, z = 0.00$ B) $\hat{p}_{\text{pool}} = 0.30, z = 1.96$ C) $\hat{p}_{\text{pool}} = 0.25, z = 0.50$ D) $\hat{p}_{\text{pool}} = 0.35, z = 0.00$

---

**Q4.** Inspect the following Python code snippet:

```python
import pandas as pd
from scipy.stats import chi2_contingency

df_table = pd.DataFrame({
    'Pass': [85, 65],
    'Fail': [15, 35]
}, index=['Course_X', 'Course_Y'])

chi2, p_val, dof, expected = chi2_contingency(df_table, correction=False)
print(f"dof={dof}, exp_CourseX_Fail={expected[0,1]:.1f}")
```

What is the exact output printed by this script? A) `dof=1, exp_CourseX_Fail=25.0` B) `dof=2, exp_CourseX_Fail=25.0` C) `dof=1, exp_CourseX_Fail=15.0` D) `dof=4, exp_CourseX_Fail=50.0`

---

**Q5.** A data analyst runs the following Python code to test if a coin is biased towards heads ($H_0: p = 0.50$ vs $H_A: p > 0.50$):

```python
from statsmodels.stats.proportion import proportions_ztest

# Observed 60 heads in 100 tosses
count = 60
nobs = 100
value = 0.50

z_stat, p_val = proportions_ztest(count=count, nobs=nobs, value=value, alternative='larger')
print(f"z={z_stat:.2f}")
```

Given that under $H_0$, $SE_0 = \sqrt{\frac{0.5 \times 0.5}{100}} = 0.05$, what exact value is printed for `z`? A) `z=1.00` B) `z=1.96` C) `z=2.00` D) `z=4.00`

---

**Q6.** A statistical consultant is conducting a Chi-Square Test of Independence on a $3 \times 4$ contingency table. Which of the following statements regarding test assumptions and degrees of freedom is **TRUE**? A) The degrees of freedom for this test is $df = (3 \times 4) - 1 = 11$. B) Every observed cell count $O_{ij}$ must be greater than or equal to 5. C) Every expected cell count $E_{ij}$ must be greater than or equal to 5, and $df = (3 - 1)(4 - 1) = 6$. D) The Chi-Square test statistic can be negative if observed counts are less than expected counts.

---

### Answer Key
 **Q1: B — $\chi^2 = 10.00, df = 3$; Reject $H_0$**
**Step-by-step Solution:**
Total sample $N = 200$. Under equal distribution ($H_0$), expected probability for each of the $k = 4$ tracks is $p_i = 0.25$.
Expected frequency for each track: $E_i = 200 \times 0.25 = 50$.
Degrees of freedom: $df = k - 1 = 4 - 1 = 3$.
Chi-Square components:
      $$\frac{(65-50)^2}{50} = \frac{225}{50} = 4.50$$
      $$\frac{(55-50)^2}{50} = \frac{25}{50} = 0.50$$
      $$\frac{(45-50)^2}{50} = \frac{25}{50} = 0.50$$
      $$\frac{(35-50)^2}{50} = \frac{225}{50} = 4.50$$
$\chi^2 = 4.50 + 0.50 + 0.50 + 4.50 = 10.00$.
Since calculated $\chi^2 = 10.00 > \text{critical value } 7.815$, we **reject $H_0$**.
 **Q2: B — $E = 50.0, \chi^2 = 8.00$**
**Step-by-step Solution:**
Row total for Major A = $100$. Column total for Interned = $100$. Grand Total $N = 200$.
Expected count for cell (Major A, Interned):
      $$E_{\text{MajorA, Interned}} = \frac{100 \times 100}{200} = 50.0$$
Similarly, all four expected counts equal $50.0$.
Chi-Square Statistic:
      $$\chi^2 = \frac{(40-50)^2}{50} + \frac{(60-50)^2}{50} + \frac{(60-50)^2}{50} + \frac{(40-50)^2}{50} = \frac{100}{50} \times 4 = 2.0 \times 4 = 8.00$$
 **Q3: A — $\hat{p}_{\text{pool}} = 0.30, z = 0.00$**
**Step-by-step Solution:**
Pooled proportion:
      $$\hat{p}_{\text{pool}} = \frac{x_1 + x_2}{n_1 + n_2} = \frac{120 + 180}{400 + 600} = \frac{300}{1000} = 0.30$$
Sample proportions: $\hat{p}_1 = \frac{120}{400} = 0.30$, $\hat{p}_2 = \frac{180}{600} = 0.30$.
Difference in sample proportions: $\hat{p}_1 - \hat{p}_2 = 0.30 - 0.30 = 0$.
$z = \frac{0}{SE_{\text{pool}}} = 0.00$.
 **Q4: A — `dof=1, exp_CourseX_Fail=25.0`**
**Step-by-step Solution:**
`df_table` dimensions: 2 rows (Course_X, Course_Y), 2 columns (Pass, Fail).
Degrees of freedom: $df = (2-1)(2-1) = 1$.
Row Total for Course_X = $85 + 15 = 100$. Column Total for Fail = $15 + 35 = 50$. Grand Total $N = 200$.
Expected count for Course_X Fail (index `[0,1]`):
      $$E_{0,1} = \frac{100 \times 50}{200} = 25.0$$
Python prints: `dof=1, exp_CourseX_Fail=25.0`.
 **Q5: C — `z=2.00`**
**Step-by-step Solution:**
Sample proportion: $\hat{p} = \frac{60}{100} = 0.60$.
Hypothesized proportion under $H_0$: $p_0 = 0.50$.
Standard Error under $H_0$: $SE_0 = \sqrt{\frac{0.50 \times 0.50}{100}} = \sqrt{0.0025} = 0.05$.
$z = \frac{\hat{p} - p_0}{SE_0} = \frac{0.60 - 0.50}{0.05} = \frac{0.10}{0.05} = 2.00$.
 **Q6: C — Every expected cell count $E_{ij} \ge 5$, and $df = (3 - 1)(4 - 1) = 6$.**
**Step-by-step Solution:**
For a Test of Independence on an $r \times c$ table, degrees of freedom $df = (r-1)(c-1) = (3-1)(4-1) = 2 \times 3 = 6$.
The sample size condition requires expected cell counts $E_{ij} \ge 5$, not observed cell counts $O_{ij}$.
Chi-Square statistics cannot be negative because all terms $\frac{(O-E)^2}{E} \ge 0$.

## Multiple Choice Questions

1. Which of the following is true about categorical data compared to numerical data in statistical inference?
    - **A)** Categorical data is analyzed using inference on means and standard deviations.
    - **B)** Categorical data inference relies on analyzing proportions and frequencies/counts.
    - **C)** Categorical data cannot be used in hypothesis testing.
    - **D)** Categorical data requires the population standard deviation to be known.

2. In a One-Proportion z-Test, what is the correct formula for the standard error under the null hypothesis?
    - **A)** $\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$
    - **B)** $\sqrt{\frac{p_0(1 - p_0)}{n}}$
    - **C)** $\frac{\hat{p} - p_0}{\sqrt{n}}$
    - **D)** $\sqrt{n \cdot p_0 \cdot (1 - p_0)}$

3. When planning sample sizes for a confidence interval, under which condition is the Margin of Error maximized?
    - **A)** When the sample proportion $p = 1.0$
    - **B)** When the sample proportion $p = 0.5$
    - **C)** When the sample proportion $p = 0.0$
    - **D)** When the sample size $n$ is very large

4. Which condition must be met to use the normal approximation in a One-Proportion z-Test?
    - **A)** The expected successes $n p_0$ and expected failures $n (1 - p_0)$ must both be $\ge 10$.
    - **B)** The sample size must be exactly 10% of the total population.
    - **C)** The expected cell counts must be at least 5.
    - **D)** The data must be normally distributed before testing.

5. What is the purpose of calculating a pooled proportion ($\hat{p}_{\text{pool}}$) in a Two-Proportion z-Test?
    - **A)** To adjust for unequal variances between the two groups.
    - **B)** To estimate the common proportion assuming the null hypothesis ($p_1 = p_2$) is true.
    - **C)** To find the degrees of freedom for the test statistic.
    - **D)** To ensure the success-failure condition is met.

6. In a Chi-Square Goodness-of-Fit Test, what does the null hypothesis ($H_0$) generally state?
    - **A)** The two categorical variables are completely independent.
    - **B)** The sample distribution matches the specified population distribution.
    - **C)** There is a significant difference between observed and expected frequencies.
    - **D)** The sample standard deviation equals the population standard deviation.

7. How are the degrees of freedom calculated for a Chi-Square Test of Independence on an $r \times c$ contingency table?
    - **A)** $df = (r \times c) - 1$
    - **B)** $df = k - 1$
    - **C)** $df = (r - 1) \times (c - 1)$
    - **D)** $df = r + c - 2$

8. What is the "Expected Cell Counts Condition" for a valid Chi-Square test?
    - **A)** Every expected cell count $E_i$ must be $\ge 5$.
    - **B)** Every observed cell count $O_i$ must be $\ge 5$.
    - **C)** At least one expected cell count must be $\ge 10$.
    - **D)** The total sample size must be $> 30$.

9. Why are Chi-Square tests inherently one-sided (right-tailed)?
    - **A)** Because frequency data can only increase over time.
    - **B)** Because the test statistic measures negative deviations only.
    - **C)** Because the squared differences $(O_i - E_i)^2$ enforce $\chi^2 \ge 0$, accumulating deviations in the upper tail.
    - **D)** Because the standard normal curve is asymmetric.

10. When using Python's `scipy.stats.chi2_contingency` function on a $2 \times 2$ table, why might the results differ from manual Pearson calculations?
    - **A)** Scipy applies Yates' continuity correction by default, which shrinks the $\chi^2$ statistic.
    - **B)** Scipy automatically pools proportions across rows.
    - **C)** Manual calculations often miscalculate the degrees of freedom.
    - **D)** Scipy assumes a left-tailed test by default.

### Answer Key & Explanations

1. **B**. Categorical data inference relies on analyzing proportions and frequencies/counts. While numerical data uses means, categorical data focuses on proportions and discrete counts.
2. **B**. $\sqrt{\frac{p_0(1 - p_0)}{n}}$. The standard error for hypothesis testing uses the hypothesized baseline proportion $p_0$, not the sample proportion.
3. **B**. When the sample proportion $p = 0.5$. The margin of error formula scales with $p(1-p)$, which forms a parabola peaking at $p = 0.5$, representing maximum uncertainty.
4. **A**. The expected successes $n p_0$ and expected failures $n (1 - p_0)$ must both be $\ge 10$. This is the Success-Failure Condition required to approximate the binomial distribution as normal.
5. **B**. To estimate the common proportion assuming the null hypothesis ($p_1 = p_2$) is true. Pooling combines successes and sample sizes under the assumption that both groups share the same true proportion.
6. **B**. The sample distribution matches the specified population distribution. The null hypothesis for goodness-of-fit assumes no difference between observed sample proportions and theoretical expectations.
7. **C**. $df = (r - 1) \times (c - 1)$. For an $r \times c$ table test of independence, the degrees of freedom are the product of rows minus one and columns minus one.
8. **A**. Every expected cell count $E_i$ must be $\ge 5$. It is a common trap to check observed counts, but the condition strictly applies to expected cell counts.
9. **C**. Because the squared differences $(O_i - E_i)^2$ enforce $\chi^2 \ge 0$, accumulating deviations in the upper tail. Any deviation between observed and expected pushes the statistic into the positive right tail.
10. **A**. Scipy applies Yates' continuity correction by default, which shrinks the $\chi^2$ statistic. The `correction=True` default for $2 \times 2$ tables adjusts the statistic, which must be set to `False` to match standard Pearson calculations.

## References & Navigation

- **Previous Topic:** [[Inference for Means]]
- **Next Topic:** [[Bayesian Inference]]
- **Related Notes:** [[Foundations for Inference]], [[Inference for Means]]

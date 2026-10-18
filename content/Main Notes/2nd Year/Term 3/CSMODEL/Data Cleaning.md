---
id: Module-04-Data-Cleaning
type: note
course: CSMODEL
topic: Data Cleaning
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Data Cleaning]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 04: Data Cleaning

## Key Concepts

### Data Cleaning Overview
Raw data collected from real-world sources is almost always "dirty." Data cleaning is the process of detecting and correcting (or removing) corrupt, inaccurate, incomplete, incorrectly formatted, or duplicate records from a dataset prior to analysis or model training.

Common real-world data imperfections include: **Missing Values**: Unrecorded observations, failed sensor readings, or survey dropouts. **Duplicate Data**: Multiple recordings of the exact same event or entity. **Incorrect Data Types**: Numerical data encoded as text strings (e.g., `'100'` instead of `100`). **Inconsistent Formatting & Multiple Representations**: Case differences (`'Male'`, `'male'`, `'M'`), spelling errors (`'water'` vs `'Water'`), or mixed date formats (`'2026-08-10'` vs `'10/08/2026'`). **Default / Sentinel Values**: Arbitrary placeholder values (e.g., `9999`, `-1`, `'N/A'`) used by legacy databases to represent missing entries. **Separate Files**: Splitting related observations across multiple files requiring merging (`pd.concat()`, `pd.merge()`).

---

### Types of Missing Data (Missingness Mechanisms)
Understanding *why* data is missing dictates the appropriate strategy for handling it. Missing data mechanisms fall into three categories:

```text
                      ┌─────────────────────────────────┐
                      │  Missing Data Mechanisms (Rubin)│
                      └────────────────┬────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
│      MCAR       │           │       MAR       │           │      MNAR       │
│Missing Completely│           │Missing at Random│           │Missing Not at   │
│   at Random     │           │                 │           │     Random      │
└────────┬────────┘           └────────┬────────┘           └────────┬────────┘
         │                             │                             │
 Probability of being        Probability depends on        Probability depends on
 missing is independent      observed data, but NOT        the unobserved missing
 of ALL data.                on missing values.            value itself.
```

1. **MCAR (Missing Completely at Random)**
**Definition**: The probability of a data point being missing is completely independent of both observed variables and unobserved (missing) values.
**Example**: A laboratory scale runs out of battery randomly while taking measurements.
**Impact**: Removing missing cases reduces statistical power (sample size) but introduces **no systematic bias**.

2. **MAR (Missing at Random)**
**Definition**: The probability of data being missing depends on other *observed* variables in the dataset, but is independent of the missing value itself.
**Example**: In a health survey, male respondents are statistically less likely to complete a depression questionnaire than female respondents. The missingness depends on the observed attribute (`Gender`), not their actual depression score.
**Impact**: Listwise deletion introduces sample bias. However, valid unbiased estimates can be obtained via conditional imputation or weighting based on observed variables.

3. **MNAR (Missing Not at Random)**
**Definition**: The probability of missingness depends directly on the unobserved value itself.
**Example**: High-income earners deliberately refusing to report their income on tax or survey forms.
**Impact**: Most severe form of missingness. Simple deletion or mean/median imputation causes severe estimation bias. Requires specialized modeling or domain-specific assumptions.

---

### Handling Missing Values

#### 1. Deletion Strategies **Listwise Deletion (Complete Case Analysis)**:
Drops any row that contains at least one `NaN` entry across selected or all columns.
**Pros**: Simple to implement; preserves unbiased parameter estimates *only if data is MCAR*.
**Cons**: Can drastically shrink dataset size if missingness is spread across many features. Introduces bias under MAR or MNAR. **Pairwise Deletion (Available Case Analysis)**:
Retains all available data on a calculation-by-calculation basis (e.g., calculating correlation between $X$ and $Y$ using all rows where both $X$ and $Y$ exist, even if $Z$ is missing).
**Pros**: Preserves maximum available sample size for each individual statistic.
**Cons**: Different statistical calculations end up using different sample sizes $N$, creating inconsistent covariance matrices.

#### 2. Imputation Strategies
Imputation is the process of replacing missing values with substituted values.
 **Mean Imputation**: Replaces `NaN` with the average of non-missing values in that column. Suitable for symmetric, normally distributed continuous data.
*Caution*: Reduces sample variance and distorts correlations between features. **Median Imputation**: Replaces `NaN` with the 50th percentile value. Preferred for skewed numerical features or datasets containing strong outliers. **Mode Imputation**: Replaces `NaN` with the most frequently occurring categorical value. Standard choice for categorical features. **Forward-Fill (`ffill`) & Backward-Fill (`bfill`)**: Propagates the last non-null value forward or next valid value backward. Crucial for sequential or time-series datasets. **Sentinel Value Imputation**: Replaces `NaN` with an artificial indicator (e.g., `-1` for numerical features, `'None'` or `'Missing'` for categorical features). Useful when retaining row counts is required and model algorithms can interpret sentinel flags without dropping data.

---

### Outlier Detection Methods
An **outlier** is an observation that lies an abnormal distance away from other values in a random sample from a population.

```text
            Q1 - 1.5*IQR                      Q1          Q3                    Q3 + 1.5*IQR
Outliers ◄───────|─────────────────────────────|───────────|─────────────────────────────|────────► Outliers
           Lower Fence                       25th %      75th %                        Upper Fence
                                               └─────┬─────┘
                                                    IQR
```

#### 1. Interquartile Range (IQR) Method (Non-parametric)
The IQR method evaluates data dispersion around the median and makes no assumptions about data distribution shape.
 **Interquartile Range**: $\text{IQR} = Q_3 - Q_1$ **Lower Bound (Fence)**: $Q_1 - 1.5 \times \text{IQR}$ **Upper Bound (Fence)**: $Q_3 + 1.5 \times \text{IQR}$ Any data point $x < Q_1 - 1.5 \times \text{IQR}$ or $x > Q_3 + 1.5 \times \text{IQR}$ is classified as an **outlier**. Extreme outliers are defined using $3.0 \times \text{IQR}$.

#### 2. Z-Score Method (Parametric)
The Z-score measures how many standard deviations an individual observation is away from the mean.
 **Z-Score Formula**: $z = \frac{x - \mu}{\sigma}$ Assumes the underlying data is normally distributed (Gaussian). Standard rule of thumb: An observation is flagged as an outlier if $|z| > 3$.

---

### Duplicate Detection & Removal
Duplicate records inflate sample size, skew summary statistics, and cause data leakage if identical records appear in both training and testing datasets. **Exact Duplicates**: Entire rows that match across all columns. **Partial Duplicates**: Rows matching on specific identifier key columns (e.g., `Student_ID`). **Resolution**: Identified using boolean indexing (`df.duplicated()`) and eliminated using `df.drop_duplicates()`.

---

### Data Type Correction & String Cleaning
Raw datasets frequently mix data types or use non-standard text representations.
 **Type Mismatches**: Numeric values saved as string objects (e.g., `'15.4'`). High priority to cast using `.astype()` or `pd.to_numeric()`. **String Normalization**:
Whitespace removal: `.str.strip()` removes leading/trailing spaces.
Case normalization: `.str.lower()` or `.str.upper()`.
Inconsistent text categories: Mapping variants (e.g., `'water'`, `'Water'`, `'WATER'`) to a single standard category (`'Water'`) using `.replace()` or `.map()`.
Inspection: Using `df['col'].unique()` and `df['col'].value_counts()` to identify unexpected variations.

---

## Python Snippets

### 1. Identifying Missing Data (`isnull`, `isnull().sum`, `isnull().any`)
Check for `NaN` / `None` values across a DataFrame.

```python
import pandas as pd
import numpy as np

# Sample DataFrame
df = pd.DataFrame({
    'Name': ['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle'],
    'Type_1': ['Electric', 'Fire', 'Grass', 'Water'],
    'Type_2': [np.nan, 'Flying', np.nan, np.nan],
    'HP': [35, np.nan, 45, 44],
    'Weight_kg': [6.0, 90.5, 6.9, np.nan]
})

# 1. Return a boolean DataFrame showing True for NaN values
print(df.isnull())

# 2. Count total missing values per column
print(df.isnull().sum())

# 3. Check if any missing values exist per column (returns boolean Series)
print(df.isnull().any())

# 4. Extract list of column names that contain at least one missing value
nan_cols = df.columns[df.isnull().any()].tolist()
print("Columns with NaNs:", nan_cols)
```

---

### 2. Dropping Missing Data (`dropna`)
Remove rows or columns containing missing values.

```python
# Drop all rows that contain AT LEAST ONE missing value (Listwise Deletion)
df_clean = df.dropna()

# Drop rows where missing values occur ONLY in specific columns
df_subset = df.dropna(subset=['HP', 'Weight_kg'])

# Drop rows only if ALL values in the row are missing
df_all = df.dropna(how='all')

# Drop COLUMNS that contain any missing values
df_cols = df.dropna(axis=1)
```

---

### 3. Imputing Missing Values (`fillna`, `loc` assignment)
Fill missing values with mean, median, mode, forward-fill, or sentinel values.

```python
# 1. Impute missing values in a numerical column with the MEAN
mean_hp = df['HP'].mean()
df['HP_mean_imputed'] = df['HP'].fillna(mean_hp)

# 2. Impute missing values with the MEDIAN
median_hp = df['HP'].median()
df['HP_median_imputed'] = df['HP'].fillna(median_hp)

# 3. Impute categorical missing values with Sentinel Value 'None' using .loc
df.loc[df['Type_2'].isnull(), 'Type_2'] = 'None'

# 4. Impute numerical missing values with Sentinel Value -1 using fillna
df['Weight_kg'] = df['Weight_kg'].fillna(-1)

# 5. Forward-fill missing values (time-series propagation)
df['HP_ffill'] = df['HP'].ffill()

# 6. Backward-fill missing values
df['HP_bfill'] = df['HP'].bfill()
```

---

### 4. Duplicate Detection & Removal (`duplicated`, `drop_duplicates`)
Find and drop duplicate rows in a DataFrame.

```python
# Sample DataFrame with duplicates
data = pd.DataFrame({
    'Name': ['Robb', 'Sansa', 'Bran', 'Sansa', 'Robb', 'Arya'],
    'Age': [14, 11, 10, 11, 14, 9]
})

# 1. Check for boolean mask of duplicates (keep='first' marks 2nd+ occurrences as True)
print(data.duplicated())

# 2. Count total number of duplicate rows
print(data.duplicated().sum())

# 3. Check duplicates based on a specific subset of columns
print(data.duplicated(subset=['Name']))

# 4. Drop duplicate rows, keeping the FIRST occurrence (default)
data_unique = data.drop_duplicates()

# 5. Drop duplicate rows based on subset, keeping LAST occurrence
data_last = data.drop_duplicates(subset=['Name'], keep='last')

# 6. Drop ALL occurrences of duplicated rows (keep=False)
data_no_dups = data.drop_duplicates(subset=['Name'], keep=False)
```

---

### 5. String Cleaning & Categorical Harmonization (`replace`, `map`, `str` methods)
Clean text formatting, strip whitespace, fix casing, and map category labels.

```python
df_pokemon = pd.DataFrame({
    'Name': [' Pikachu ', 'CHARIZARD', 'bulbasaur', 'Squirtle'],
    'Type': ['electric', 'Fire', 'grund', 'water']
})

# 1. Strip leading and trailing whitespace from string column
df_pokemon['Name'] = df_pokemon['Name'].str.strip()

# 2. Convert text to lowercase or titlecase
df_pokemon['Name'] = df_pokemon['Name'].str.title()
df_pokemon['Type_lower'] = df_pokemon['Type'].str.lower()

# 3. Replace typos and inconsistent categorical values using a dictionary
type_mapping = {
    'electric': 'Electric',
    'grund': 'Ground',
    'water': 'Water',
    'Fire': 'Fire'
}
df_pokemon['Type'] = df_pokemon['Type'].replace(type_mapping)

# 4. Using map() for explicit dictionary transformation
gender_series = pd.Series(['m', 'Female', 'M', 'f', 'mALe'])
clean_gender = gender_series.str.lower().str.strip().map({
    'm': 'Male',
    'male': 'Male',
    'f': 'Female',
    'female': 'Female'
})
```

---

### 6. Data Type Inspection & Correction (`astype`, `apply`)
Detect wrong column types and convert them appropriately.

```python
df_sales = pd.DataFrame({
    'Item': ['A', 'B', 'C'],
    'Count': ['1', '3', '4'],  # Stored as strings!
    'Price': ['10.50', '20.00', '15.75']
})

# 1. Inspect data types
print(df_sales.dtypes)

# 2. Cast column data type using .astype()
df_sales['Count'] = df_sales['Count'].astype(int)

# 3. Cast numeric strings using pd.to_numeric()
df_sales['Price'] = pd.to_numeric(df_sales['Price'])

# 4. Using apply() with a lambda function for element-wise conversion
df_sales['Count_float'] = df_sales['Count'].apply(lambda x: float(x))
```

---

### 7. IQR Outlier Detection Code (`quantile`)
Calculate IQR and extract outlier rows.

```python
# Sample Dataset
df_stats = pd.DataFrame({'Weight': [45, 52, 55, 58, 60, 62, 65, 68, 70, 72, 150]})

# Calculate Q1 (25th percentile) and Q3 (75th percentile)
Q1 = df_stats['Weight'].quantile(0.25)
Q3 = df_stats['Weight'].quantile(0.75)
IQR = Q3 - Q1

# Define Upper and Lower Fences
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# Filter Outliers
outliers = df_stats[(df_stats['Weight'] < lower_bound) | (df_stats['Weight'] > upper_bound)]
clean_data = df_stats[(df_stats['Weight'] >= lower_bound) & (df_stats['Weight'] <= upper_bound)]

print(f"Q1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"Lower Fence: {lower_bound}, Upper Fence: {upper_bound}")
print("Outliers:\n", outliers)
```

---

### 8. Z-Score Outlier Detection Code
Detect outliers using standard deviation distance from the mean.

```python
import scipy.stats as stats

df_scores = pd.DataFrame({'Score': [10, 12, 12, 14, 15, 15, 16, 18, 19, 100]})

# Calculate Z-Scores
df_scores['Z_Score'] = stats.zscore(df_scores['Score'])

# Identify Outliers where |Z| > 3
outliers_z = df_scores[df_scores['Z_Score'].abs() > 3]
print("Outliers based on Z-score:\n", outliers_z)
```

---

## Formulas & Key Equations

### 1. Interquartile Range (IQR) & Outlier Boundaries
$$\text{IQR} = Q_3 - Q_1$$

$$\text{Lower Fence} = Q_1 - 1.5 \times \text{IQR}$$

$$\text{Upper Fence} = Q_3 + 1.5 \times \text{IQR}$$

$$\text{Extreme Lower Fence} = Q_1 - 3.0 \times \text{IQR}$$

$$\text{Extreme Upper Fence} = Q_3 + 3.0 \times \text{IQR}$$

---

### 2. Z-Score Formula
$$z = \frac{x - \mu}{\sigma}$$

Where: $x$ = observed sample value $\mu$ = sample mean ($\bar{x}$) $\sigma$ = sample standard deviation ($s$) **Outlier Condition**: $|z| > 3 \iff z > 3 \text{ or } z < -3$

---

### 3. Mean Imputation Formula
$$\hat{x}_i = \bar{x}_{\text{observed}} = \frac{1}{N_{\text{obs}}} \sum_{j \in \text{observed}} x_j$$

---

### 4. Proportion of Missing Data
$$\text{Missing Ratio} = \frac{N_{\text{missing}}}{N_{\text{total}}} \times 100\%$$

---

## Common Exam Traps

> [!WARNING]
> **Trap 1: The `inplace=True` Assignment Bug**
> Writing `df = df.dropna(inplace=True)` or `df = df.fillna(0, inplace=True)` sets `df` to `None`! Methods with `inplace=True` mutate the DataFrame in place and return `None`. Either assign without `inplace` (`df = df.dropna()`) OR use `inplace=True` without reassignment (`df.dropna(inplace=True)`).

> [!IMPORTANT]
> **Trap 2: `df.duplicated()` Default Behavior vs `keep=False`**
> By default, `df.duplicated(keep='first')` marks the **second and subsequent** occurrences of a duplicate row as `True`, leaving the first occurrence as `False`. If an exam question asks how many rows are returned by `df[df.duplicated(keep=False)]`, remember that `keep=False` marks **ALL** duplicate instances (including the first one) as `True`!

> [!CAUTION]
> **Trap 3: MCAR vs MAR Conceptual Distinction**
> - **MCAR**: Missingness is completely random and unrelated to ANY column (observed or unobserved).
> - **MAR**: Missingness depends on *observed* features (e.g., age or gender recorded in the dataset), but NOT on the missing feature itself. Students often wrongly assume "Missing at Random" means completely random!

> [!NOTE]
> **Trap 4: Listwise Deletion Bias**
> Listwise deletion (`df.dropna()`) is ONLY guaranteed to yield unbiased statistical estimates when data is **MCAR**. If data is MAR or MNAR, dropping rows creates selection bias.

> [!TIP]
> **Trap 5: IQR vs Z-Score Applicability**
> Z-score assumes a **Gaussian (Normal) distribution** and relies on mean and standard deviation, which are heavily distorted by extreme values. The IQR method is **non-parametric** and robust against skewed data. Do not use Z-score on heavily skewed data!

> [!WARNING]
> **Trap 6: Forgetting the `.str` Vectorized Accessor**
> Calling `df['col'].strip()` or `df['col'].lower()` raises an `AttributeError`. Pandas string methods require the `.str` accessor: `df['col'].str.strip()` and `df['col'].str.lower()`.

> [!IMPORTANT]
> **Trap 7: String Numbers in Arithmetic & Aggregation**
> If a column contains string numbers (e.g., `'4'`), adding them results in string concatenation (`'4' + '5' = '45'`), and operations like `.mean()` will fail or give incorrect outputs. Always inspect types with `.dtypes` or `.info()` and cast with `.astype()`.

---

## Practice Questions

**Q1.** A researcher is analyzing a dataset of patient medical records. Patients diagnosed with mild symptoms are less likely to report their post-treatment pain levels on follow-up surveys. However, the diagnosis level ("Mild", "Moderate", "Severe") is recorded in the dataset. Which missing data mechanism best describes the missing pain levels? A) Missing Completely at Random (MCAR) B) Missing at Random (MAR) C) Missing Not at Random (MNAR) D) Pairwise Missing Data (PMD)

---

**Q2.** Consider the following Python code snippet:

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [10, np.nan, 30, 40, np.nan],
    'B': ['x', 'y', np.nan, 'z', 'w']
})

df_step1 = df.dropna(subset=['A'])
res = df_step1['B'].fillna('missing')
print(len(res))
```

What is the output of the code? A) `5` B) `4` C) `3` D) `2`

---

**Q3.** Given the following dataset and Python code:

```python
import pandas as pd

df = pd.DataFrame({
    'ID': [101, 102, 101, 103, 102, 101],
    'Val': ['A', 'B', 'A', 'C', 'B', 'A']
})

ans1 = df.duplicated().sum()
ans2 = df.duplicated(keep=False).sum()
print(f"{ans1}, {ans2}")
```

What will be printed? A) `2, 5` B) `3, 5` C) `3, 6` D) `2, 6`

---

**Q4.** A dataset has a variable $X$ with the following 9 ordered values:
$$[10, 20, 25, 30, 35, 40, 45, 50, 120]$$
Using the standard IQR method ($Q_1$ as the 25th percentile and $Q_3$ as the 75th percentile), what are the lower and upper fences for outlier detection, and which value(s) are flagged as outliers? A) Lower Fence: $-5$, Upper Fence: $75$; Outlier: $120$ B) Lower Fence: $0$, Upper Fence: $70$; Outliers: none C) Lower Fence: $-12.5$, Upper Fence: $82.5$; Outlier: $120$ D) Lower Fence: $5$, Upper Fence: $65$; Outlier: $120$

---

**Q5.** Consider the following Python snippet performing string cleaning on a Pandas DataFrame:

```python
import pandas as pd

df = pd.DataFrame({
    'Category': ['  Apple ', 'apple', 'APPLE', 'Banana ', 'banana ', ' Cherry']
})

df['Category'] = df['Category'].str.strip().str.lower()
result = df['Category'].value_counts()
print(result['apple'])
```

What is the output of the final `print` statement? A) `1` B) `2` C) `3` D) `6`

---

### Answer Key
 **Q1: B — Missing at Random (MAR)**
*Explanation*: The missingness of post-treatment pain levels depends on the observed variable `Diagnosis Level` ("Mild"), but not on the unobserved pain value itself. Therefore, it satisfies the definition of MAR.
 **Q2: C — 3**
*Explanation*: 
`df.dropna(subset=['A'])` drops rows where column `'A'` is `NaN` (indices 1 and 4). `df_step1` has 3 rows left (indices 0, 2, 3).
`df_step1['B'].fillna('missing')` fills any `NaN` in column `'B'` of the remaining 3 rows (index 2 becomes `'missing'`).
`len(res)` returns the number of elements in the resulting Series, which is `3`.
 **Q3: B — 3, 5**
*Explanation*:
`df.duplicated()` with default `keep='first'` marks subsequent duplicate rows (indices 2, 4, 5) as `True`, giving `ans1 = 3`.
`df.duplicated(keep=False)` marks ALL rows that belong to any duplicate set (indices 0, 1, 2, 4, 5) as `True`, giving `ans2 = 5`.
The output printed is `3, 5`.
 **Q4: C — Lower Fence: -12.5, Upper Fence: 82.5; Outlier: 120**
*Explanation*:
For 9 sorted values: $[10, 20, 25, 30, 35, 40, 45, 50, 120]$
Median ($Q_2$) = 35 (5th value).
Lower half: $[10, 20, 25, 30] \implies Q_1 = \frac{20 + 25}{2} = 22.5$
Upper half: $[40, 45, 50, 120] \implies Q_3 = \frac{45 + 50}{2} = 47.5$
$\text{IQR} = Q_3 - Q_1 = 47.5 - 22.5 = 25.0$
Lower Fence $= 22.5 - 1.5(25) = 22.5 - 37.5 = -12.5$
Upper Fence $= 47.5 + 1.5(25) = 47.5 + 37.5 = 82.5$
Value $120 > 82.5$, so $120$ is flagged as an outlier.
 **Q5: C — 3**
*Explanation*:
Original values: `'  Apple '`, `'apple'`, `'APPLE'`, `'Banana '`, `'banana '`, `' Cherry'`.
Applying `.str.strip()` removes spaces: `'Apple'`, `'apple'`, `'APPLE'`, `'Banana'`, `'banana'`, `'Cherry'`.
Applying `.str.lower()` normalizes casing: `'apple'`, `'apple'`, `'apple'`, `'banana'`, `'banana'`, `'cherry'`.
`'apple'` appears 3 times. Thus `result['apple']` equals `3`.

## Multiple Choice Questions

1. What does the missing data mechanism MCAR stand for?
    - **A)** Missing Categorically And Randomly
    - **B)** Missing Completely At Random
    - **C)** Missing Correlated At Random
    - **D)** Mean Calculation At Random

2. Which outlier detection method uses the formula: [Q1 - 1.5 * IQR, Q3 + 1.5 * IQR]?
    - **A)** Z-score method
    - **B)** Isolation Forest
    - **C)** IQR method
    - **D)** Standard deviation method

3. When data is MAR (Missing At Random), the missingness is related to:
    - **A)** The missing value itself
    - **B)** Unobserved variables
    - **C)** Observed variables in the dataset
    - **D)** Completely random chance

4. Which imputation strategy can introduce the most bias if the data is not MCAR?
    - **A)** Mean imputation
    - **B)** Multiple imputation
    - **C)** K-Nearest Neighbors imputation
    - **D)** Regression imputation

5. A Z-score threshold of 3 implies that an observation is considered an outlier if it is:
    - **A)** More than 3 standard deviations from the mean
    - **B)** Less than 3% of the total range
    - **C)** Greater than the 3rd quartile
    - **D)** 3 times the median value

### Answer Key & Explanations

1. **B**. MCAR means the missingness is completely independent of both observed and unobserved data.
2. **C**. This is the standard Interquartile Range (IQR) method for outlier bounds.
3. **C**. MAR means missingness depends on the observed data, not the missing values themselves.
4. **A**. Mean imputation severely distorts variance and relationships, especially if data is not MCAR.
5. **A**. A Z-score measures how many standard deviations a value is away from the mean.

## References & Navigation

- **Previous Topic:** [[Data Collection]]
- **Next Topic:** [[Data Preprocessing]]
- **Related Notes:** [[Data Collection]], [[Data Preprocessing]]

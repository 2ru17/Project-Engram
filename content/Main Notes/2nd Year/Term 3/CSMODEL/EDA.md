---
id: Module-06-EDA
type: note
course: CSMODEL
topic: EDA
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[EDA]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 06: Exploratory Data Analysis

## 📚 Key Concepts

### 1. Introduction to Exploratory Data Analysis (EDA)
Exploratory Data Analysis (EDA) is an approach to analyzing data sets to summarize their main characteristics, often using visual methods and summary statistics. It allows data scientists to get a first look at the data, understand its structure, detect anomalies/outliers, test assumptions, and form hypotheses for inferential or predictive modeling.

EDA is anchored on three main pillars:
1. **Statistics**: Measures of central tendency, dispersion, and distribution shape.
2. **Data Cleaning**: Identifying inconsistencies, duplicate records, missing values, and formatting errors.
3. **Visualization**: Graphical representations (histograms, box plots, scatterplots, heatmaps) to uncover underlying patterns.

#### Spectrum of Data Analysis Questions **Descriptive**: Summarizes features of a dataset without interpretation or extrapolation. **Exploratory**: Discovers connections, patterns, or relationships to generate hypotheses. **Inferential**: Tests whether patterns observed in a sample hold true for a broader population. **Predictive**: Uses historical data to predict future individual observations. **Causal**: Evaluates whether changing one variable changes another on average. **Mechanistic**: Determines deterministic exact physical/biological mechanisms causing changes.

---

### 2. Measures of Central Tendency
Measures of central tendency quantify the "center" or typical value of a probability distribution or dataset.

#### A. Arithmetic Mean ($\mu$ or $\bar{x}$)
The sum of all values divided by the total number of observations. **Formula**:
  $$\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}$$ **When to use**: Continuous or discrete numerical data that is approximately symmetric. **Pros & Cons**: Uses every data point; highly sensitive to extreme values (outliers). Cannot be computed for nominal categorical data.

#### B. Trimmed Mean
The mean calculated after removing a top and bottom percentage ($p\%$) of extreme values. **Example**: A 12% trimmed mean on 15 values removes the 2 highest and 2 lowest values ($15 \times 0.12 = 1.8 \approx 2$). **When to use**: Numerical data with suspected outliers or heavy tails. **Pros & Cons**: Combines the efficiency of the mean with the robustness of the median.

#### C. Median
The middle observation in an ordered dataset (or average of the two middle values if $n$ is even). **When to use**: Skewed numerical data or ordinal categorical data. **Pros & Cons**: Robust against extreme outliers. Does not take into account the exact magnitude of values outside the center.

#### D. Mode
The most frequently occurring value in the dataset. **When to use**: Categorical data (nominal or ordinal) and discrete numerical distributions. **Pros & Cons**: Works for non-numerical data. May not represent the distribution center well if multimodal or uniform (no mode).

| Measure | Data Type | Outlier Sensitivity | Unique Value? |
| :--- | :--- | :--- | :--- |
| **Mean** | Numeric (Interval/Ratio) | High (Sensitive) | Yes |
| **Trimmed Mean** | Numeric (Interval/Ratio) | Moderate (Robust) | Yes |
| **Median** | Numeric & Ordinal | Low (Robust) | Yes |
| **Mode** | Nominal, Ordinal, Numeric | None | No (Bimodal/Multimodal/None) |

---

### 3. Measures of Spread & Dispersion
Dispersion quantifies the variability, spread, or scatter of data points around the central tendency.

#### A. Range
The numerical difference between the maximum and minimum observations. **Formula**: $\text{Range} = X_{\text{max}} - X_{\text{min}}$ **Pros & Cons**: Simple to compute; extremely sensitive to outliers as it only considers two observations.

#### B. Interquartile Range (IQR)
The range covered by the middle 50% of the data. **Formula**: $\text{IQR} = Q_3 - Q_1$
  where $Q_1$ is the 25th percentile (first quartile) and $Q_3$ is the 75th percentile (third quartile). **Pros & Cons**: Highly robust against extreme outliers; useful for skewed data.

#### C. Variance ($s^2$ or $\sigma^2$)
The average of the squared deviations from the mean. **Sample Variance Formula ($s^2$)**:
  $$s^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}$$ **Population Variance Formula ($\sigma^2$)**:
  $$\sigma^2 = \frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}$$

#### D. Standard Deviation ($s$ or $\sigma$)
The square root of the variance, expressed in the same units as the original data. **Formula**: $s = \sqrt{s^2}$ **Pros & Cons**: Incorporates all observations; sensitive to extreme values/outliers.

---

### 4. Shape of Distribution: Skewness and Kurtosis

#### A. Skewness
Skewness measures the degree of asymmetry of a distribution around its mean. **Symmetric Distribution**: $\text{Mean} \approx \text{Median} \approx \text{Mode}$. Skewness $= 0$. **Positively Skewed (Right-Skewed)**: Right tail is longer/fatter. $\text{Mean} > \text{Median} > \text{Mode}$. Skewness $> 0$. **Negatively Skewed (Left-Skewed)**: Left tail is longer/fatter. $\text{Mean} < \text{Median} < \text{Mode}$. Skewness $< 0$.

#### B. Kurtosis
Kurtosis measures the "tailedness" and sharpness of the peak relative to a standard normal distribution. **Mesokurtic** ($\text{Kurtosis} \approx 0$ excess): Normal distribution shape. **Leptokurtic** ($\text{Kurtosis} > 0$ excess): High sharp peak, fat/heavy tails (higher likelihood of extreme outliers). **Platykurtic** ($\text{Kurtosis} < 0$ excess): Flat peak, light/thin tails.

---

### 5. Univariate Analysis
Univariate analysis examines one variable at a time to inspect its distribution and statistics.
 **Dot Plot**: Plots individual observations along a single axis. Best for small numerical datasets. **Histogram**: Groups continuous observations into discrete ranges (bins) to show density and identify modes. **Bar Plot**: Uses rectangular bars proportional to frequencies or aggregated values across discrete categorical groups. **Box Plot (Box-and-Whisker Plot)**: Visual representation of the **Five-Number Summary**:
  1. Minimum / Lower Whisker boundary: $Q_1 - 1.5 \times \text{IQR}$ (or lowest data point within this limit)
  2. First Quartile ($Q_1$)
  3. Median ($Q_2$)
  4. Third Quartile ($Q_3$)
  5. Maximum / Upper Whisker boundary: $Q_3 + 1.5 \times \text{IQR}$ (or highest data point within this limit)
Data points beyond the whiskers are flagged as **suspected outliers**.

---

### 6. Bivariate & Multivariate Analysis

#### A. Scatter Plot
Visualizes paired numerical data $(x_i, y_i)$ to identify linear, non-linear, or zero correlation between two variables.

#### B. Correlation Coefficients
Correlation measures the strength and direction of a relationship between two variables, bounded in $[-1, 1]$.

1. **Pearson Correlation Coefficient ($r_{xy}$)**:
   Assesses the **linear** relationship between continuous interval or ratio variables.
Assumes normal distribution of variables and linear trend.
Formula:
     $$r_{xy} = \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n} (x_i - \bar{x})^2} \sqrt{\sum_{i=1}^{n} (y_i - \bar{y})^2}}$$

2. **Spearman Rank Correlation Coefficient ($r_s$ or $\rho$)**:
   Assesses the **monotonic** relationship (whether linear or non-linear) between two variables using ranked values.
Non-parametric: does not require normal distribution or continuous interval scale (works on ordinal data).
Formula (when no ties exist):
     $$r_s = 1 - \frac{6 \sum_{i=1}^{n} d_i^2}{n(n^2 - 1)}$$
     where $d_i = \text{rank}(x_i) - \text{rank}(y_i)$.

#### Comparison: Pearson vs. Spearman
| Feature | Pearson Correlation | Spearman Correlation |
| :--- | :--- | :--- |
| **Relationship Type** | Strict Linear Relationship | Monotonic (Linear or Non-Linear) |
| **Data Types** | Continuous Interval / Ratio | Continuous or Ordinal Ranks |
| **Normality Assumption** | Requires normal distribution | Non-parametric (No distribution assumption) |
| **Outlier Sensitivity** | High | Low (Robust because ranks are used) |

#### C. Multivariate Visualizations **Heatmap**: Displays a matrix of values (e.g., correlation matrix) using color gradients for quick pattern recognition. **Pair Plot**: Grid of pairwise scatter plots for multiple numerical variables with histograms/KDEs along the diagonal.

---

### 7. Grouping & Aggregation
Grouping collapses data across categorical factors using a split-apply-combine strategy:
1. **Split**: Break data into groups based on key values (`groupby('type_1')`).
2. **Apply**: Compute statistical metrics (`mean`, `std`, `median`, `count`) on numerical target columns.
3. **Combine**: Aggregate results into a summary DataFrame.

---

## 🐍 Python Snippets

### 1. `pandas.DataFrame.describe()`
Generates summary statistics of numeric columns in a DataFrame (count, mean, std, min, 25%, 50%, 75%, max). **Parameters**: `include='all'` (includes categorical columns), `percentiles=[.25, .5, .75]`. **Returns**: DataFrame containing summary statistics.

```python
import pandas as pd

# Read dataset
pokemon_df = pd.read_csv('pokemon.csv')

# Display summary statistics of numeric columns
stats_df = pokemon_df[['hp', 'attack', 'defense', 'speed]].describe()
print(stats_df)
```

---

### 2. Summary Statistics Functions (`mean`, `median`, `std`, `var`, `skew`, `kurt`)
Computes univariate summary statistics across Series or DataFrame columns. **Parameters**: `axis=0` (columns) or `1` (rows), `numeric_only=True`, `ddof=1` (delta degrees of freedom for sample variance/std). **Returns**: Scalar value (Series) or Series (DataFrame).

```python
# Compute individual summary statistics for HP column
hp_mean = pokemon_df['hp'].mean()
hp_median = pokemon_df['hp'].median()
hp_std = pokemon_df['hp'].std()      # Sample standard deviation (ddof=1 by default)
hp_var = pokemon_df['hp'].var()      # Sample variance
hp_skew = pokemon_df['hp'].skew()    # Positive > 0, Negative < 0
hp_kurt = pokemon_df['hp'].kurt()    # Excess kurtosis

print(f"Mean: {hp_mean:.2f}, Median: {hp_median:.2f}, Skew: {hp_skew:.2f}")
```

---

### 3. `pandas.DataFrame.corr()`
Computes pairwise correlation matrix of columns. **Parameters**: `method='pearson'` (default) or `'spearman'`, `numeric_only=True`. **Returns**: Square DataFrame of correlation coefficients ranging from -1.0 to 1.0.

```python
# Pearson correlation matrix (linear)
pearson_corr = pokemon_df[['hp', 'attack', 'defense]].corr(method='pearson')

# Spearman correlation matrix (monotonic/rank)
spearman_corr = pokemon_df[['hp', 'attack', 'defense]].corr(method='spearman')

print("Pearson Correlation:")
print(pearson_corr)
print("\nSpearman Correlation:")
print(spearman_corr)
```

---

### 4. `pandas.DataFrame.groupby()` & `pandas.DataFrame.agg()`
Groups data by categorical column(s) and applies aggregation functions. **Parameters**: `groupby(by='column_name')`, `agg({'target_col': ['mean', 'std', 'median']})`. **Returns**: Grouped DataFrame with simple or hierarchical (MultiIndex) columns.

```python
# Group by primary type and compute mean & std of Attack
attack_stats = pokemon_df.groupby('type_1').agg({'attack': ['mean', 'std', 'median']})

# Sort by mean attack descending (using tuple for MultiIndex column)
sorted_attack = attack_stats.sort_values(('attack', 'mean'), ascending=False)
print(sorted_attack.head(5))
```

---

### 5. Matplotlib Plotting (`plt.hist`, `plt.boxplot`, `plt.scatter`)
Renders basic univariate and bivariate plots.

```python
import matplotlib.pyplot as plt

plt.style.use('seaborn-v0_8-darkgrid')

# 1. Histogram of Weight
plt.figure(figsize=(7, 4))
plt.hist(pokemon_df['weight_kg'].dropna(), bins=30, edgecolor='white', color='skyblue')
plt.title('Weight Distribution of Pokemon')
plt.xlabel('Weight (kg)')
plt.ylabel('Frequency')
plt.show()

# 2. Side-by-side Boxplot of Attack by Primary Type
pokemon_df.boxplot(column='attack', by='type_1', figsize=(12, 6))
plt.title('Attack by Primary Type')
plt.suptitle('')
plt.xlabel('Primary Type')
plt.ylabel('Attack Point')
plt.xticks(rotation=45)
plt.show()

# 3. Scatter plot of HP vs Attack
plt.figure(figsize=(7, 4))
plt.scatter(pokemon_df['hp'], pokemon_df['attack'], alpha=0.6, c='coral', edgecolors='k')
plt.title('HP vs Attack')
plt.xlabel('HP')
plt.ylabel('Attack')
plt.show()
```

---

### 6. Seaborn Visualizations (`sns.histplot`, `sns.boxplot`, `sns.scatterplot`, `sns.heatmap`, `sns.pairplot`, `sns.barplot`)
Renders high-level statistical data plots with enhanced styling.

```python
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Seaborn Histplot with KDE
sns.histplot(data=pokemon_df, x='hp', kde=True, bins=20, color='teal')
plt.title('HP Distribution')
plt.show()

# 2. Seaborn Boxplot
sns.boxplot(data=pokemon_df, x='type_1', y='defense')
plt.xticks(rotation=90)
plt.title('Defense Distribution per Type')
plt.show()

# 3. Seaborn Scatterplot with Hue
sns.scatterplot(data=pokemon_df, x='attack', y='defense', hue='status')
plt.title('Attack vs Defense by Status')
plt.show()

# 4. Correlation Heatmap
corr_matrix = pokemon_df[['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed]].corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title('Pokemon Base Stats Correlation Matrix')
plt.show()

# 5. Pairplot for Multivariate Analysis
sns.pairplot(pokemon_df[['hp', 'attack', 'defense', 'status]], hue='status')
plt.show()

# 6. Barplot for Group Comparisons
sns.barplot(data=pokemon_df, x='type_1', y='attack', estimator='mean', errorbar=None)
plt.xticks(rotation=90)
plt.title('Mean Attack per Primary Type')
plt.show()
```

---

## 📊 Formulas & Key Equations

### Central Tendency **Sample Mean ($\bar{x}$)**:
  $$\bar{x} = \frac{\sum x_i}{n}$$ **Trimmed Mean ($k$ observations trimmed from each end)**:
  $$\bar{x}_{\text{trimmed}} = \frac{\sum_{i=k+1}^{n-k} x_{(i)}}{n - 2k}$$

### Dispersion **Sample Variance ($s^2$)**:
  $$s^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}$$ **Sample Standard Deviation ($s$)**:
  $$s = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}$$ **Range**:
  $$\text{Range} = x_{\text{max}} - x_{\text{min}}$$ **Interquartile Range (IQR)**:
  $$\text{IQR} = Q_3 - Q_1$$

### Outlier Limits (Boxplot Rule) **Lower Outlier Boundary**:
  $$\text{Lower Limit} = Q_1 - 1.5 \times \text{IQR}$$ **Upper Outlier Boundary**:
  $$\text{Upper Limit} = Q_3 + 1.5 \times \text{IQR}$$

### Correlation Coefficients **Pearson Correlation ($r$)**:
  $$r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2} \sqrt{\sum (y_i - \bar{y})^2}} = \frac{\text{cov}(x, y)}{s_x s_y}$$ **Spearman Rank Correlation ($r_s$)**:
  $$r_s = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}$$

---

## ⚠️ Common Exam Traps

1. **Mean vs. Median in Skewed Distributions**:
In a **positively skewed (right-skewed)** distribution, the mean is pulled towards the high values in the right tail: $\text{Mean} > \text{Median} > \text{Mode}$.
In a **negatively skewed (left-skewed)** distribution, the mean is pulled towards the low values in the left tail: $\text{Mean} < \text{Median} < \text{Mode}$.
*Exam Trap*: Students often confuse the tail direction with the peak direction. Remember: **Skewness refers to the direction of the tail**.

2. **Pearson vs. Spearman Correlation Assumptions**:
Pearson assumes **linear relationship** and **normally distributed continuous variables**. It is sensitive to extreme outliers.
Spearman evaluates **monotonic relationships** (increasing/decreasing trends, linear or non-linear) and works on **ordinal ranks**. It is robust to outliers.
*Exam Trap*: Asking for correlation on non-linear monotonic data (e.g. $y = x^3$). Pearson will be $< 1.0$, while Spearman rank correlation will be exactly $1.0$!

3. **Boxplot Whisker Boundaries vs. Actual Data Points**:
The lower whisker limit is defined as $Q_1 - 1.5 \times \text{IQR}$ and upper whisker as $Q_3 + 1.5 \times \text{IQR}$.
*Exam Trap*: The whisker line itself in software plots extends to the **lowest/highest actual observation** inside those limits, NOT necessarily the mathematical limit calculation.

4. **Histogram vs. Bar Plot Distinctions**:
**Histograms** display **continuous quantitative variables** grouped into adjacent numeric bins (no gaps between bars unless a bin has 0 count).
**Bar plots** display **categorical variables** or separate group aggregations (bars are separated by visual gaps).

5. **pandas `std()` vs NumPy `std()` Degrees of Freedom**:
`pandas.Series.std()` defaults to sample standard deviation (`ddof=1`, dividing by $n-1$).
`numpy.std()` defaults to population standard deviation (`ddof=0`, dividing by $N$).
*Exam Trap*: Comparing manual standard deviation formulas with pandas output without accounting for `ddof`.

6. **Hierarchical MultiIndex Columns in Groupby Aggregations**:
When running `df.groupby('type_1').agg({'attack': ['mean', 'std']})`, the columns become a MultiIndex.
*Exam Trap*: Sorting requires indexing with a tuple: `df.sort_values(('attack', 'mean'))`. Sorting by string `'mean'` or `'attack'` causes a `KeyError`.

---

## 🧪 Practice Questions

**Q1.** A dataset contains the following 10 values of Pokemon height (in meters): `[0.3, 0.5, 0.6, 0.6, 1.0, 1.1, 1.5, 2.0, 3.0, 19.4]`. What are the median and the interquartile range (IQR) of this dataset? A) Median = 1.05, IQR = 1.40 B) Median = 1.05, IQR = 1.20 C) Median = 1.10, IQR = 1.40 D) Median = 0.85, IQR = 0.90

---

**Q2.** Consider the following Python code snippet:
```python
import pandas as pd

data = {'Type': ['Fire', 'Fire', 'Water', 'Water', 'Water'],
        'Attack': [52, 64, 48, 63, 83]}
df = pd.DataFrame(data)

res = df.groupby('Type').agg({'Attack': ['mean', 'median']})
print(res.loc['Water', ('Attack', 'median')])
```
What is the output of the print statement? A) 64.67 B) 63.0 C) 58.0 D) 48.0

---

**Q3.** An analyst computes both the Pearson correlation coefficient ($r$) and the Spearman rank correlation coefficient ($r_s$) for two continuous variables $X$ and $Y$. The scatter plot shows a perfect monotonic curve ($y = e^x$), where $Y$ strictly increases as $X$ increases, but the relationship is non-linear. What can be concluded about the values of $r$ and $r_s$? A) $r = 1.0$ and $r_s = 1.0$ B) $r < 1.0$ and $r_s = 1.0$ C) $r = 1.0$ and $r_s < 1.0$ D) $r < 0$ and $r_s > 0$

---

**Q4.** Consider the following Python code snippet using pandas:
```python
import pandas as pd

vals = [10, 20, 30, 40, 250]
s = pd.Series(vals)
print(s.skew() > 0, s.mean() > s.median())
```
What does this code print? A) `True True` B) `False False` C) `True False` D) `False True`

---

**Q5.** In a standard boxplot with $Q_1 = 30$ and $Q_3 = 70$, which of the following data points in a dataset would be flagged as a suspected outlier? A) 10 B) -35 C) 120 D) Both B and C

---

**Q6.** A data scientist wants to compare the frequency distribution of categorical Pokemon primary types (`type_1`) across generations. Which visualization tool is most appropriate for comparing these categorical group frequencies side-by-side? A) Scatter plot B) Grouped Bar plot C) Histogram D) Line plot

---

### Answer Key
 **Q1: A** — 
Ordered data ($n=10$): `[0.3, 0.5, 0.6, 0.6, 1.0, 1.1, 1.5, 2.0, 3.0, 19.4]`
Median = average of 5th and 6th values = $\frac{1.0 + 1.1}{2} = 1.05$.
$Q_1$ (median of lower 5 values `[0.3, 0.5, 0.6, 0.6, 1.0]`) = `0.6`.
$Q_3$ (median of upper 5 values `[1.1, 1.5, 2.0, 3.0, 19.4]`) = `2.0`.
$\text{IQR} = Q_3 - Q_1 = 2.0 - 0.6 = 1.40$.
 **Q2: B** — 
For `Water` attack values `[48, 63, 83]`, the sorted values are `[48, 63, 83]`.
The median value is `63.0`.
Indexing the MultiIndex column `('Attack', 'median')` for row `'Water'` retrieves `63.0`.
 **Q3: B** — 
Spearman rank correlation measures monotonic relationships. Since $y=e^x$ is strictly increasing, ranks match perfectly, so $r_s = 1.0$.
Pearson correlation measures linear relationships. Because $y=e^x$ is non-linear, $r < 1.0$.
 **Q4: A** — 
The single high value `250` creates a long right tail, resulting in a positively skewed distribution ($\text{skew} > 0 \implies \text{True}$).
Mean = $\frac{10+20+30+40+250}{5} = \frac{350}{5} = 70.0$.
Median = `30.0`. Since $\text{Mean} (70.0) > \text{Median} (30.0)$, `s.mean() > s.median()` evaluates to `True`.
 **Q5: B** — 
$\text{IQR} = Q_3 - Q_1 = 70 - 30 = 40$.
Lower Limit = $Q_1 - 1.5 \times \text{IQR} = 30 - 1.5(40) = 30 - 60 = -30$.
Upper Limit = $Q_3 + 1.5 \times \text{IQR} = 70 + 1.5(40) = 70 + 60 = 130$.
Data point `-35` is below $-30$, so `-35` is outside the lower whisker limit and flagged as a suspected outlier. Data point `120` is within the upper limit ($120 \le 130$).
 **Q6: B** — 
Categorical group comparisons are best visualized using a Bar plot (specifically a grouped bar plot across generations). Histograms are for continuous numeric data; scatter plots are for bivariate continuous data.

## Multiple Choice Questions

1. Which measure of central tendency is most robust to extreme outliers?
    - **A)** Mean
    - **B)** Median
    - **C)** Mode
    - **D)** Range

2. What does positive skewness indicate about a distribution?
    - **A)** The tail on the right side is longer or fatter than the left side
    - **B)** The tail on the left side is longer or fatter than the right side
    - **C)** The distribution is perfectly symmetrical
    - **D)** The distribution has a high peak (leptokurtic)

3. Kurtosis measures:
    - **A)** The asymmetry of the distribution
    - **B)** The peakedness and the heaviness of the tails of a distribution
    - **C)** The average distance from the mean
    - **D)** The linear correlation between two variables

4. A Pearson correlation coefficient of -0.9 implies:
    - **A)** A weak negative linear relationship
    - **B)** A strong negative linear relationship
    - **C)** A strong non-linear relationship
    - **D)** No relationship

5. In descriptive statistics, standard deviation represents:
    - **A)** The difference between the max and min values
    - **B)** The square of the variance
    - **C)** The average amount of dispersion or deviation from the mean
    - **D)** The most frequently occurring value

### Answer Key & Explanations
1. **B)** The median is resistant to outliers, unlike the mean.
2. **A)** Positive (right) skew means the bulk of data is on the left, with a long right tail.
3. **B)** Kurtosis identifies if data has heavy tails or is sharply peaked.
4. **B)** -0.9 is close to -1, indicating a very strong inverse linear relationship.
5. **C)** Standard deviation quantifies the amount of variation or dispersion.

## References & Navigation

- **Previous Topic:** [[Data Representation]]
- **Next Topic:** [[Foundations for Inference]]
- **Related Notes:** [[Data Representation]], [[Foundations for Inference]]

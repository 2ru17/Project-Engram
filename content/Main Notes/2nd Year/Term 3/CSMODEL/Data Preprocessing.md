---
id: Module-05-Data-Preprocessing
type: note
course: CSMODEL
topic: Data Preprocessing
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Data Preprocessing]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 05: Data Preprocessing

## Key Concepts

Data preprocessing is a critical step in the data science pipeline that involves cleaning, transforming, and organizing raw data into an accurate, efficient, and machine-readable format prior to exploratory data analysis (EDA) or machine learning modeling.

---

### 1. Feature Scaling: Min-Max Normalization vs. Standardization

Feature scaling modifies the numeric range of features in a dataset so that every feature contributes proportionally during model training.

#### **Min-Max Normalization (Rescaling)** **Definition**: Rescales feature values to a fixed, bounded range (typically $[0, 1]$). **Formula**:
  $$x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$ **Properties**:
Bounded interval $[0, 1]$.
Preserves exact relative distance and relationships between values within a bounded domain.
**High Sensitivity to Outliers**: A single extreme minimum or maximum outlier dramatically compresses non-outlier data into a very narrow range. **When to Use**:
Distance-based algorithms that do **NOT** assume a normal distribution (e.g., **$K$-Nearest Neighbors (KNN)**, **$K$-Means Clustering**).
Neural Networks requiring bounded input ranges (e.g., $[0, 1]$ or $[-1, 1]$).
Image processing (rescaling pixel intensity values from $[0, 255]$ to $[0, 1]$).

#### **Standardization (Z-Score Normalization)** **Definition**: Centers feature values around a mean of zero ($\mu = 0$) with a standard deviation of one ($\sigma = 1$). **Formula**:
  $$z = \frac{x - \mu}{\sigma}$$ **Properties**:
Unbounded output (no minimum or maximum value limit).
**Robust to Outliers**: Incorporates global standard deviation, preventing a single outlier from dominating the scaled values. **When to Use**:
Algorithms that **assume normally distributed features** or rely on variance metrics (e.g., **Linear Regression**, **Logistic Regression**, **Principal Component Analysis (PCA)**, **Linear Discriminant Analysis (LDA)**, **Support Vector Machines (SVM)** with Gaussian RBF kernel).
Gradient descent-based optimization algorithms (speeds up gradient convergence).

#### **Summary Comparison**

| Feature | Min-Max Normalization | Standardization (Z-Score) |
| :--- | :--- | :--- |
| **Output Range** | Bounded: $[0, 1]$ (or $[a, b]$) | Unbounded: $(-\infty, +\infty)$ |
| **Mean & Variance** | Variable mean & variance | $\mu = 0$, $\sigma^2 = 1$ |
| **Outlier Sensitivity** | Extremely sensitive | Less sensitive (robust) |
| **Distribution Shape** | Preserves original shape | Preserves shape, recenters to 0 |
| **Primary Use Cases** | KNN, Neural Nets, Bounded inputs | Linear models, PCA, Logistic Regression |

---

### 2. Train-Test Split & Prevention of Data Leakage

#### **The Concept of Data Leakage**
Data leakage occurs when information from outside the training dataset (such as the test or validation set) is inadvertently used to fit preprocessing parameters. This creates overly optimistic performance estimates during validation that fail in real-world deployment.

#### **The Cardinal Rule of Preprocessing**
> **Always split data into training and test sets BEFORE fitting any preprocessing transformers.**
 **Fit step (`.fit()`)**: Computes summary statistics ($\mu, \sigma, x_{\min}, x_{\max}$, imputation median/mode, encoded category maps) **EXCLUSIVELY** on `X_train`. **Transform step (`.transform()`)**: Applies the learned parameters from `X_train` to transform `X_train`, `X_test`, and future unseen data. **NEVER** call `.fit()` or `.fit_transform()` on `X_test` or on the full dataset before splitting!

---

### 3. Encoding Categorical Variables

Machine learning algorithms require numerical inputs. Categorical variables must be converted into numerical representations based on whether an inherent ordering exists.

#### **A. Ordinal Encoding (`OrdinalEncoder` / `LabelEncoder`)** **Use Case**: **Ordinal Variables** — categorical variables with a clear, natural rank or hierarchy (e.g., `['Low', 'Medium', 'High']` $\to [0, 1, 2]$). **Functionality**: Maps distinct categorical values to ordered integers. **Key Difference**:
`LabelEncoder`: Intended for encoding **1D target vectors ($y$)**.
`OrdinalEncoder`: Intended for encoding **2D feature matrices ($X$)**. **Trap**: Applying ordinal encoding to nominal (unordered) data forces an artificial ranking (e.g., `Red=0`, `Green=1`, `Blue=2` implies `Blue > Green > Red`), leading to invalid mathematical operations in distance or linear models.

#### **B. One-Hot Encoding (`OneHotEncoder` / `pd.get_dummies`)** **Use Case**: **Nominal Variables** — categorical variables without any inherent ordering (e.g., `['Red', 'Green', 'Blue']`, `['City', 'State']`). **Functionality**: Creates $k$ binary columns (0 or 1) for a categorical feature with $k$ unique levels. **Dummy Variable Trap & Multicollinearity**:
If all $k$ binary columns are included, their sum equals $1$ for every row, introducing perfect collinearity.
In linear models, drop one category column ($k-1$ columns, e.g. using `drop='first'`) to avoid matrix singularity.

---

### 4. Data Cleaning: Querying, Imputation & Binning

#### **Querying (`pandas.DataFrame.query`)** Filters DataFrame rows using clear Boolean string expressions. Streamlines subsetting compared to traditional bracket indexing. Supports numeric comparisons, string equality, multi-condition logic (`and`, `or`), and index filtering (`index > threshold`).

#### **Missing Value Imputation**
Missing values arise from data collection errors, user privacy refusals, or sensor failures. **Deletion Thresholds**:
Column deletion: Drop columns where missing ratio exceeds threshold $t$ (`df.isnull().mean() >= t`).
Row deletion: Drop rows where missing ratio exceeds threshold $t$ (`df.loc[df.isnull().mean(axis=1) < t]`). **Imputation Approaches**:
**Numerical Data**: Impute with **Mean** (for symmetric distributions) or **Median** (for skewed distributions).
**Categorical Data**: Impute with **Mode** (most frequent class).

#### **Binning** Groups continuous numerical data or detailed categorical data into broader bins/categories. **Numerical Binning**: Maps age numbers $[14, 11, 10, 9, 4] \to ['13-15', '10-12', '10-12', '7-9', '4-6']$. **Categorical Binning**: Groups districts (`['Malate', 'Ermita', 'Quiapo']`) into cities (`'Manila'`). **Benefits**: Reduces noise, simplifies models, and **prevents overfitting** by forcing models to learn general ranges rather than specific noise values.

---

### 5. Outlier Detection & Handling

Outliers are extreme data points that deviate significantly from the rest of the distribution.
 **Detection Methods**:
  1. **Visualization**: Box plots, scatter plots.
  2. **Z-Score Rule**: Data points with $|z| > 3$ are considered outliers (under normal distribution assumptions, $99.7\%$ of data falls within $\mu \pm 3\sigma$).
  3. **IQR Method**: Points outside $[Q_1 - 1.5 \times \text{IQR}, Q_3 + 1.5 \times \text{IQR}]$. **Handling Strategies**:
**Removal (Dropping)**: Delete outlier rows if they stem from measurement error or extreme rare cases.
**Capping / Clamping (Winsorization)**: Clamp extreme values to predefined lower/upper boundaries to preserve dataset size without distorting model stability.

---

### 6. Log Transformation & Column Transformation

#### **Log Transformation** Applied to heavily **right-skewed (positively skewed)** numerical data to compress wide value ranges and make distributions more Gaussian/normal. **Formula**: $y = \log_{10}(x)$ or $y = \ln(x + 1)$ (used when $x=0$ is present). **Properties**:
Preserves ordinal rank (monotonic transformation).
**Distorts Scale/Distances**: Reduces distances between high values while stretching distances between small values.

#### **Column Transformations & Feature Engineering** **Date Decomposition**: Splits unstructured date strings (`"2026-08-10"`) into structured components: Year (`2026`), Month (`8`), Day (`10`), Day of Week, or elapsed seconds from epoch. **Feature Engineering**: Incorporates domain knowledge to create informative derived attributes (e.g., calculating $\text{BMI} = \frac{\text{weight}}{\text{height}^2}$ from raw height and weight columns).

---

### 7. Scikit-Learn Pipelines (`sklearn.pipeline.Pipeline`)
 **Definition**: Encapsulates multiple data transformers and an estimator into a single unified object. **Benefits**:
Prevents data leakage automatically during cross-validation.
Code cleanliness: Avoids repeating manual `fit` and `transform` calls.
Hyperparameter tuning: Allows optimizing preprocessing parameters together with model parameters using `GridSearchCV`.

---

## Python Snippets

### 1. Feature Scaling (`MinMaxScaler` & `StandardScaler`)

```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Sample dataset (2D array / DataFrame)
X_raw = np.array([[163.0, 29000.0],
                  [164.5, 35000.0],
                  [162.0, 60000.0],
                  [162.6, 19000.0],
                  [180.2, 15000.0]])

# --- Min-Max Normalization (Scales to [0, 1]) ---
min_max_scaler = MinMaxScaler(feature_range=(0, 1))
X_minmax = min_max_scaler.fit_transform(X_raw)

print("Min-Max Scaled Data:\n", X_minmax)
print("Min values:", min_max_scaler.data_min_)
print("Max values:", min_max_scaler.data_max_)

# Revert back to original values
X_restored = min_max_scaler.inverse_transform(X_minmax)

# --- Standardization / Z-Score (Mean=0, Std=1) ---
std_scaler = StandardScaler()
X_std = std_scaler.fit_transform(X_raw)

print("\nStandardized Data:\n", X_std)
print("Mean:", std_scaler.mean_)
print("Variance:", std_scaler.var_)
```

---

### 2. Train-Test Split with Stratification

```python
from sklearn.model_selection import train_test_split

# Sample Features X and Class Labels y
X = pd.DataFrame({'age': [22, 25, 47, 52, 46, 56, 55, 60],
                   'income': [20000, 24000, 50000, 62000, 58000, 80000, 75000, 90000]})
y = pd.Series([0, 0, 1, 1, 1, 1, 1, 1])  # Imbalanced target

# Split into 75% Training and 25% Testing
# test_size: proportion for test set
# random_state: fixed seed for reproducibility
# stratify: preserves target class distribution ratio in both splits
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

print("X_train shape:", X_train.shape)
print("X_test shape:", X_test.shape)
```

---

### 3. The WRONG Way vs. The RIGHT Way (Data Leakage)

#### ** THE WRONG WAY (Data Leakage!)**
```python
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Scaling BEFORE splitting leaks test set mean & variance into the scaler!
scaler = StandardScaler()
X_scaled_WRONG = scaler.fit_transform(X)  # BAD: fit on entire dataset!

# Train-test split after scaling
X_train_bad, X_test_bad, y_train, y_test = train_test_split(
    X_scaled_WRONG, y, test_size=0.2, random_state=42
)
```

#### ** THE RIGHT WAY (Proper Preprocessing)**
```python
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 1. Split FIRST
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. Instantiate Scaler
scaler = StandardScaler()

# 3. Fit AND Transform ONLY on Training set
X_train_scaled = scaler.fit_transform(X_train)

# 4. Transform Test set using learned Training parameters ONLY
X_test_scaled = scaler.transform(X_test)  # NOTE: call .transform(), NOT .fit_transform()!
```

---

### 4. Categorical Encoding (`LabelEncoder`, `OrdinalEncoder`, `OneHotEncoder`)

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder, OneHotEncoder

df = pd.DataFrame({
    'Education': ['High School', 'Bachelor', 'Master', 'Bachelor'],  # Ordinal
    'Color': ['Red', 'Blue', 'Green', 'Red'],                        # Nominal
    'Target': ['No', 'Yes', 'No', 'Yes']                            # 1D Target Label
})

# --- 1. LabelEncoder (FOR 1D TARGET Y ONLY) ---
label_enc = LabelEncoder()
df['Target_Encoded'] = label_enc.fit_transform(df['Target'])
print("LabelEncoder Target:\n", df[['Target', 'Target_Encoded]])

# --- 2. OrdinalEncoder (FOR 2D ORDINAL FEATURES X) ---
education_order = [['High School', 'Bachelor', 'Master]]
ordinal_enc = OrdinalEncoder(categories=education_order)
df['Education_Encoded'] = ordinal_enc.fit_transform(df[['Education]])
print("\nOrdinalEncoder Features:\n", df[['Education', 'Education_Encoded]])

# --- 3. OneHotEncoder (FOR NOMINAL FEATURES X) ---
ohe = OneHotEncoder(sparse_output=False, drop='first') # drop='first' avoids dummy trap
color_ohe = ohe.fit_transform(df[['Color]])
ohe_cols = ohe.get_feature_names_out(['Color'])
df_ohe = pd.DataFrame(color_ohe, columns=ohe_cols)
print("\nOneHotEncoder (drop='first'):\n", df_ohe)

# --- 4. Pandas get_dummies alternative ---
df_dummies = pd.get_dummies(df['Color'], prefix='Color', drop_first=True)
print("\nPandas get_dummies:\n", df_dummies)
```

---

### 5. Scikit-Learn Pipeline (`sklearn.pipeline.Pipeline`)

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

# Define feature subsets
numeric_features = ['age', 'income']
categorical_features = ['city']

# Numerical Pipeline: Impute missing with median -> Standardize
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Categorical Pipeline: Impute missing with mode -> One-Hot Encode
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# Bundle transformers into ColumnTransformer
preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# Complete Machine Learning Pipeline
full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

# Train pipeline safely (fits preprocessor ONLY on X_train)
# full_pipeline.fit(X_train, y_train)
# predictions = full_pipeline.predict(X_test)
```

---

### 6. Pandas Querying & Threshold Missing Value Dropping

```python
import pandas as pd

df = pd.DataFrame({
    'Section': ['S17', 'S18', 'S17', 'S17', 'S18'],
    'CCPROG1': [3.0, 1.0, 3.5, 2.5, 4.0],
    'CCPROG2': [1.0, None, 4.0, 1.0, 4.0]
})

# --- Querying ---
res1 = df.query("CCPROG1 >= 3.0 and Section == 'S17'")
res2 = df.query("index > 2")
res3 = df.query("CCPROG1 > CCPROG2")

# --- Threshold Dropping ---
# Drop columns with missing value fraction >= 0.20
t = 0.20
df_clean_cols = df[df.columns[df.isnull().mean() < t]]

# Drop rows with missing value fraction >= 0.20
df_clean_rows = df.loc[df.isnull().mean(axis=1) < t]
```

---

## Formulas & Key Equations

### 1. Min-Max Normalization
$$x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$

Scaling to custom range $[a, b]$:
$$x'' = a + \frac{(x - x_{\min})(b - a)}{x_{\max} - x_{\min}}$$

---

### 2. Standardization (Z-Score)
$$z = \frac{x - \mu}{\sigma}$$

where:
$$\mu = \frac{1}{N}\sum_{i=1}^{N} x_i, \quad \sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N} (x_i - \mu)^2}$$

---

### 3. Log Transformation
$$y = \log_{10}(x) \quad \text{or} \quad y = \ln(x + 1) \quad (\text{log1p for } x \ge 0)$$

---

### 4. IQR Outlier Bounds
$$\text{IQR} = Q_3 - Q_1$$
$$\text{Lower Bound} = Q_1 - 1.5 \times \text{IQR}$$
$$\text{Upper Bound} = Q_3 + 1.5 \times \text{IQR}$$

---

### 5. Missing Value Proportion Thresholds
$$\text{Missing Ratio}_{\text{column } j} = \frac{1}{N}\sum_{i=1}^{N} \mathbb{I}(x_{i,j} \text{ is NaN})$$

---

## Common Exam Traps
 **Data Leakage Trap**: Calling `.fit_transform()` on the full dataset before `train_test_split()`, or calling `.fit_transform(X_test)` on test data. **Always `fit_transform` on train, `transform` on test!** **Inplace Reassignment Mutation**: Executing `df = df.dropna(inplace=True)` sets `df` to `None` because methods with `inplace=True` return `None`. **Target vs. Feature Encoders**: Using `LabelEncoder` on a 2D feature matrix `X` instead of `OrdinalEncoder`. `LabelEncoder` expects a 1D vector and is intended for target labels $y$. **Nominal Ordinality Trap**: Using `OrdinalEncoder` on unordered nominal features (e.g., `['Red', 'Green', 'Blue']`). This introduces false numeric ordering that degrades linear and distance-based models. **Log Transformation of Zero / Negative Values**: Performing `np.log(x)` when $x \le 0$ results in `-inf` or `NaN`. Use `np.log1p(x)` ($\log(1+x)$) for non-negative data. **MinMaxScaler Sensitivity**: Assuming `MinMaxScaler` is robust to outliers. If $x_{\max}$ is an extreme outlier, all normal data will be compressed into a tiny window near $0$. **Forgetting `stratify=y`**: Splitting imbalanced classification datasets without `stratify=y` can result in test sets with zero instances of minority classes. **Log Distance Distortion**: Forgetting that log transformation distorts absolute distances between data points, even though it preserves rank order.

---

## Practice Questions

**Q1.** A data scientist scales a feature vector $X = [10, 20, 30, 40, 100]$ using Min-Max Normalization to the range $[0, 1]$. What is the normalized value of $x = 25$? A) $0.15$ B) $0.1667$ C) $0.25$ D) $0.30$

---

**Q2.** Inspect the following Python code snippet:

```python
import numpy as np
from sklearn.preprocessing import StandardScaler

X_train = np.array([[10], [20], [30], [40], [50]])
X_test = np.array([[15], [60]])

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(round(X_test_scaled[1][0], 2))
```

What is the printed output value for `X_test_scaled[1][0]`? A) $1.00$ B) $2.12$ C) $1.41$ D) $0.71$

---

**Q3.** Why must missing value imputation and feature scaling be fitted **ONLY** on the training dataset rather than the entire dataset prior to splitting? A) Fitting on the entire dataset increases computational complexity exponentially. B) Fitting on the entire dataset leads to data leakage, producing overfitted models and unrealistically optimistic validation scores. C) Scikit-learn estimators raise a `ValueError` if transformers are fitted on unsplit data. D) Test datasets contain different feature columns than training datasets.

---

**Q4.** Consider the following code snippet executing preprocessing operations:

```python
import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

df = pd.DataFrame({'Size': ['Small', 'Medium', 'Large', 'Medium']})
encoder = OrdinalEncoder(categories=[['Small', 'Medium', 'Large]])
df['Size_Enc'] = encoder.fit_transform(df[['Size]])

res = df.query("Size_Enc > 0")['Size'].tolist()
print(res)
```

What is the output of `res`? A) `['Small', 'Medium', 'Large']` B) `['Medium', 'Large', 'Medium']` C) `['Small']` D) `['Large']`

---

**Q5.** Which feature scaling technique and rationale are most appropriate when training a $K$-Nearest Neighbors (KNN) classifier on a dataset containing bounded non-Gaussian features without severe outliers? A) Standardization (Z-score), because KNN requires zero-mean feature distributions. B) Min-Max Normalization, because KNN relies on distance metrics and Min-Max scales features to a uniform bounded range $[0, 1]$. C) Log Transformation, because KNN cannot compute Euclidean distance on un-logged inputs. D) No scaling is necessary because KNN is tree-based and scale-invariant.

---

### **Answer Key:**
 **Q1: B** — **Calculation**: Min-Max formula is $x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$. Here $x_{\min} = 10$, $x_{\max} = 100$. For $x = 25$: $x' = \frac{25 - 10}{100 - 10} = \frac{15}{90} = \frac{1}{6} \approx 0.1667$. **Q2: B** — **Calculation**: `X_train` mean $\mu = \frac{10+20+30+40+50}{5} = 30$. Population variance $\sigma^2 = \frac{(-20)^2 + (-10)^2 + 0^2 + 10^2 + 20^2}{5} = \frac{400+100+0+100+400}{5} = \frac{1000}{5} = 200$. Population standard deviation $\sigma = \sqrt{200} \approx 14.1421$. For `X_test` value $60$: $z = \frac{60 - 30}{14.1421} = \frac{30}{14.1421} \approx 2.1213 \to 2.12$. **Q3: B** — **Explanation**: Fitting statistics ($\mu, \sigma, x_{\min}, x_{\max}$) on test data causes data leakage, contaminating training with future test distribution knowledge. **Q4: B** — **Explanation**: Categories mapped: `'Small'` $\to 0$, `'Medium'` $\to 1$, `'Large'` $\to 2$. Query `Size_Enc > 0` selects indices 1, 2, 3 corresponding to `['Medium', 'Large', 'Medium']`. **Q5: B** — **Explanation**: KNN relies on distance calculations (e.g., Euclidean distance) which are heavily distorted when feature scales differ. Min-Max Normalization bounds features to $[0, 1]$, making it ideal for non-Gaussian bounded data.

## Multiple Choice Questions

1. What is the main purpose of feature scaling (e.g., Min-Max, Standardization)?
    - **A)** To convert categorical text to numerical formats
    - **B)** To ensure features have a similar scale, preventing features with large values from dominating
    - **C)** To remove missing data
    - **D)** To select the most important features

2. What is Data Leakage in machine learning?
    - **A)** When information from outside the training dataset is used to create the model
    - **B)** When the model is too complex and overfits
    - **C)** When missing values are imputed incorrectly
    - **D)** When categorical variables are not encoded

3. Standard Scaler transforms data such that:
    - **A)** It scales values between 0 and 1
    - **B)** It has a mean of 1 and a standard deviation of 0
    - **C)** It has a mean of 0 and a standard deviation of 1
    - **D)** It removes all outliers automatically

4. Why must One-Hot Encoding be used instead of Label Encoding for nominal categorical variables?
    - **A)** One-Hot encoding handles missing values better
    - **B)** One-Hot encoding uses less memory
    - **C)** Label encoding can only handle numeric inputs
    - **D)** Label encoding creates an artificial ordinal relationship between categories

5. When performing a train-test split, when should scaling parameters (like min/max or mean) be calculated?
    - **A)** On the entire dataset before splitting
    - **B)** On the training set only, then applied to both train and test
    - **C)** On the test set only
    - **D)** Independently on both train and test sets

### Answer Key & Explanations

1. **B**. Feature scaling normalizes the ranges so distance-based and gradient-based algorithms perform correctly.
2. **A**. Data leakage occurs when future/test info leaks into the training process, causing over-optimistic results.
3. **C**. Standardization centers data at 0 with a standard deviation of 1.
4. **D**. Label encoding assigns numbers (0, 1, 2) which algorithms might interpret as having inherent order/magnitude.
5. **B**. Calculating scaling params on the entire dataset causes data leakage from the test set.

## References & Navigation

- **Previous Topic:** [[Data Cleaning]]
- **Next Topic:** [[Data Representation]]
- **Related Notes:** [[Data Cleaning]], [[Data Representation]]

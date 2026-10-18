---
id: Module-03-Data-Representation
type: note
course: CSMODEL
topic: Data Representation
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Data Representation]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 03: Data Representation

## Key Concepts

### 1. Real-World Data to Data Structure Representation
Real-world data (raw text, sensor readings, logs, physical measurements) cannot be directly processed by machine learning algorithms or statistical models. It must first be transformed into a structured representation—most commonly a **Data Matrix** or **Tabular Dataset**.
 **Data Matrix Layout**:
**Rows ($\text{Axis } 0$) — Observations**: Each row represents a single, distinct **observation** (also known as an instance, sample, record, or entity). For example, a single row might represent one student, one patient, or one Pokemon.
**Columns ($\text{Axis } 1$) — Variables**: Each column represents a **variable** (also known as a feature, attribute, field, or characteristic). A variable captures a specific property measured across all observations (e.g., `Height`, `Weight`, `Age`, `Section`).
**Cells / Entries**: A single cell holds the specific value of a given variable for a given observation.

### 2. Pandas Architecture: DataFrame & Series
`pandas` (derived from *Panel Data*) is the core Python package for tabular data analysis, built on top of `NumPy` for high-performance vectorized operations.

#### Series **Definition**: A 1-dimensional labeled array capable of holding any data type (integers, floats, strings, booleans). **Indexing**: Supports both integer-positional (`.iloc`) and label-based (`.loc`) indexing. Crucially, **index labels do not need to be unique**. **Scalar Operations**: Applying an arithmetic or boolean operation to a Series and a scalar performs the operation element-wise across the entire Series. **Series-to-Series Operations & Index Alignment**:
Operations between two Series perform **element-wise calculations aligned by index labels**, NOT positional order.
If indices do not match between Series, pandas introduces `NaN` for missing labels, and the resulting Series length expands to the union of both index sets. The Series do not need to be of equal length.

#### DataFrame **Definition**: A 2-dimensional, size-mutable, potentially heterogeneous tabular data structure with labeled axes (rows and columns). **Structure**: A DataFrame can be conceptualized as a dictionary-like container of `Series` objects sharing a common row index. **Axis Alignment**: Arithmetic operations on DataFrames align on both row and column labels.

### 3. Tidy Data Principles (Hadley Wickham)
Formulated by statistician Hadley Wickham in 2014, **Tidy Data** provides a standard framework for mapping the physical layout of a dataset to its underlying semantic meaning.

A dataset is considered **Tidy** if and only if it satisfies three rules:
1. **Each variable forms a column.**
2. **Each observation forms a row.**
3. **Each type of observational unit forms a table.**

#### Common Signs of Untidy Data: **Column headers are values, not variable names**: (e.g., columns named `2021`, `2022`, `2023` containing sales amounts instead of a single `Year` column and a `Sales` column). **Multiple variables stored in one column**: (e.g., a column `Gender_Age` containing `'M_25'`, `'F_30'`). **Variables stored in both rows and columns**: (e.g., row labels containing metric names like `MinTemp`, `MaxTemp`). **Multiple types of observational units in the same table**: (e.g., mixing student demographic data with course enrollment data in a single table).

### 4. Wide vs. Long Data Formats & Reshaping
Tabular data often exists in either Wide or Long formats, requiring reshaping tools to convert between them.

#### Wide Format Characteristics/variables are spread across multiple columns (e.g., columns `CCPROG1`, `CCPROG2`, `CSMODEL` representing grades in different subjects). **Pros**: Easy for human reading and data entry. **Cons**: Difficult for computer algorithms to aggregate and analyze; often violates Tidy Data if column names represent data values rather than distinct attributes.

#### Long Format Data is collapsed into key-value pairs (e.g., one column `Subject` and one column `Grade`). **Pros**: Complies with Tidy Data principles; enables effortless grouping, statistical aggregation (`groupby`), and seamless visualization with libraries like Seaborn. **Cons**: Less compact for human manual inspection.

#### Reshaping Tools in Pandas: **`pd.melt()` (Unpivoting Wide $\rightarrow$ Long)**: Flattens a DataFrame by converting specified feature columns into row values under a key-value column pair. **`pd.pivot()` / `pd.pivot_table()` (Pivoting Long $\rightarrow$ Wide)**: Reshapes long-format data into wide format by turning unique values of a column into separate column headers. `pd.pivot_table()` handles duplicate index-column combinations by applying an aggregation function (e.g., `mean`, `sum`).

### 5. Pandas Data Types (`dtypes`)
Understanding and managing pandas data types is critical for accurate computation, algorithm compatibility, and memory optimization.

| Pandas Data Type | Native Python / NumPy Equivalent | Common Usage / Description |
| :--- | :--- | :--- |
| **`int64`** | `int` / `np.int64` | 64-bit integer numbers (e.g., counts, IDs, age). Standard `int64` **cannot** store `NaN` values. |
| **`float64`** | `float` / `np.float64` | 64-bit continuous floating-point numbers (e.g., weight, height, probabilities, grades). Native support for `NaN`. |
| **`object`** | `str` / Python objects | Text strings or mixed data types. Storage is memory-inefficient compared to specialized types. |
| **`bool`** | `bool` / `np.bool_` | Boolean truth values (`True` or `False`). |
| **`datetime64`** | `datetime.datetime` / `np.datetime64` | Date and time stamps. Enables access to `.dt` accessor (e.g., `.dt.year`, `.dt.day_name()`). |
| **`category`** | `pd.Categorical` | Fixed set of discrete values (levels). Highly memory-efficient for low-cardinality string columns; supports ordinal sorting. |

### 6. Encoding Categorical Data
Machine learning models (e.g., linear regression, logistic regression, SVMs, neural networks) require pure numerical inputs. Categorical data must be converted into numeric encodings.

#### Nominal vs. Ordinal Categorical Variables **Nominal Variables**: Categories have **no inherent ordering or rank** (e.g., Pokemon Types: `Fire`, `Water`, `Grass`; Eye Color: `Blue`, `Brown`). **Ordinal Variables**: Categories possess a **natural, logical sequence or hierarchy** (e.g., Education Level: `High School` < `Bachelors` < `Instructor`; Status: `Common` < `Rare` < `Legendary`).

#### Encoding Techniques:
1. **Label Encoding (`sklearn.preprocessing.LabelEncoder` or `pd.Categorical.codes`)**:
Maps each of the $K$ unique categories to an integer from $0$ to $K-1$.
**When to Use**: Exclusively for **Ordinal Variables**, where numerical order reflects real-world ranking.
**Exam Warning / Trap**: Applying LabelEncoder to **Nominal** features introduces a false mathematical inequality ($0 < 1 < 2$). Models will incorrectly infer that category 2 is "greater than" or "twice as large as" category 1.

2. **One-Hot Encoding (OHE) (`pd.get_dummies()` or `sklearn.preprocessing.OneHotEncoder`)**:
Creates $K$ binary indicator columns ($0$ or $1$) for a categorical variable with $K$ unique categories.
**When to Use**: For **Nominal Variables**, as it treats every category symmetrically without imposing numerical ranking.
**The Dummy Variable Trap & Multicollinearity**:
When all $K$ binary columns are included in a linear model that also has an intercept term, the columns sum to $1$ ($\sum_{i=1}^K D_i = 1$), causing perfect multicollinearity.
**Solution**: Drop one column using `drop_first=True` in `pd.get_dummies()`, producing $K-1$ dummy variables. The omitted column becomes the baseline/reference category.

### 7. Data Cleaning & Handling Missing Values (Audit & Sentinel Strategy)
From dataset inspection techniques demonstrated in the module labs (e.g., Pokemon dataset cleaning): **Data Inspection**:
`df.info()`: Displays non-null counts and dtypes.
`df.isnull().sum()`: Counts missing values (`NaN`) per variable.
`df.isnull().any()`: Returns boolean mask of columns containing missing values. **Missing Value Handling Strategies**:
**Row Deletion (`df.dropna()`)**: Applied when the number of missing rows is negligible and missingness is completely random.
**Sentinel Value Imputation**: Replacing `NaN` with a specific dummy value outside the valid domain (e.g., setting missing numerical `hp` to `-1`, or missing secondary categorical `type_2` to `'None'`). This retains rows for analysis without confusing missing values with valid data.

---

## Python Snippets

### 1. Data Type Inspection & Conversion (`df.dtypes`, `df.astype()`)
```python
import pandas as pd

# Load dataset
df = pd.DataFrame({
    'id': [101, 102, 103],
    'generation': [1, 2, 1],
    'weight_kg': ['6.9', '13.0', '9.0']
})

# Inspect column data types
print(df.dtypes)

# Convert string column to float64
df['weight_kg'] = df['weight_kg'].astype('float64')

# Convert integer generation column to categorical type for memory efficiency
df['generation'] = df['generation'].astype('category')

print(df.dtypes)
```

### 2. Explicit Ordinal Categoricals (`pd.Categorical`)
```python
import pandas as pd

df = pd.DataFrame({'status': ['Legendary', 'Common', 'Rare', 'Common']})

# Define explicit ordinal ranking
status_order = ['Common', 'Rare', 'Legendary']
df['status'] = pd.Categorical(df['status'], categories=status_order, ordered=True)

# Sorting respects custom categorical order (Common < Rare < Legendary)
df_sorted = df.sort_values(by='status')

# Extract numerical codes (0 for Common, 1 for Rare, 2 for Legendary)
df['status_code'] = df['status'].cat.codes
```

### 3. Reshaping Wide to Long Format (`pd.melt()`)
```python
import pandas as pd

# Wide format dataframe
wide_df = pd.DataFrame({
    'Student_ID': [1, 2],
    'CCPROG1': [3.5, 2.0],
    'CCPROG2': [4.0, 3.0]
})

# Melt wide dataframe into long format
long_df = pd.melt(
    wide_df,
    id_vars=['Student_ID'],               # Identifier column(s) to leave unchanged
    value_vars=['CCPROG1', 'CCPROG2'],   # Column(s) to unpivot/melt
    var_name='Course',                   # Name of new column holding variable names
    value_name='Grade'                   # Name of new column holding values
)

print(long_df)
# Output:
# Student_ID   Course  Grade
# 0           1  CCPROG1    3.5
# 1           2  CCPROG1    2.0
# 2           1  CCPROG2    4.0
# 3           2  CCPROG2    3.0
```

### 4. Reshaping Long to Wide Format (`pd.pivot()` & `pd.pivot_table()`)
```python
import pandas as pd

# Pivot long dataframe back to wide format (requires unique index-column pairs)
pivoted_df = long_df.pivot(
    index='Student_ID',
    columns='Course',
    values='Grade'
).reset_index()

# Use pivot_table when duplicate entries exist for index-column pairs (supports aggregation)
pivot_agg = pd.pivot_table(
    long_df,
    index='Student_ID',
    columns='Course',
    values='Grade',
    aggfunc='mean'
)
```

### 5. One-Hot Encoding (`pd.get_dummies()`)
```python
import pandas as pd

df = pd.DataFrame({
    'Pokemon': ['Pikachu', 'Charmander', 'Squirtle'],
    'type_1': ['Electric', 'Fire', 'Water']
})

# Perform One-Hot Encoding and drop first column to prevent dummy variable trap
df_ohe = pd.get_dummies(df, columns=['type_1'], prefix='type1', drop_first=True, dtype=int)

print(df_ohe)
# Output:
# Pokemon  type1_Fire  type1_Water
# 0   Pikachu           0            0
# 1  Charmander           1            0
# 2   Squirtle           0            1
```

### 6. Label Encoding (`sklearn.preprocessing.LabelEncoder`)
```python
from sklearn.preprocessing import LabelEncoder
import pandas as pd

df = pd.DataFrame({'tier': ['Bronze', 'Gold', 'Silver', 'Bronze']})

le = LabelEncoder()

# Fit encoder and transform categories into integers 0 to K-1
df['tier_encoded'] = le.fit_transform(df['tier'])

# Retrieve original string labels from encoded integers
df['tier_restored'] = le.inverse_transform(df['tier_encoded'])
```

### 7. Dataset Quality Audit & Sentinel Value Imputation (Pokemon Dataset Workflow)
```python
import pandas as pd

# 1. Load dataset
df = pd.read_csv('pokedex.csv')

# 2. Audit missing values across all columns
nan_columns = df.columns[df.isnull().any()].tolist()
print("Columns with missing values:", nan_columns)
print(df[nan_columns].isnull().sum())

# 3. Clean string spelling inconsistencies using replace()
df['type_1'] = df['type_1'].replace({'water': 'Water', 'normal': 'Normal'})

# 4. Fill missing categorical variables with sentinel string 'None'
df.loc[df['type_2'].isnull(), 'type_2'] = 'None'

# 5. Fill missing numerical variables with sentinel integer -1 using fillna()
df['hp'] = df['hp'].fillna(-1)
df['defense'] = df['defense'].fillna(-1)
```

---

## Formulas & Key Equations

### 1. One-Hot Encoding Dimensionality & Matrix Transformation
For a dataset with $N$ observations and a nominal categorical column $X$ containing $K$ unique categories:
$$\text{OHE}(X) \in \{0, 1\}^{N \times K}$$
When setting `drop_first=True` to eliminate the baseline category and prevent perfect multicollinearity:
$$\text{OHE}_{\text{reduced}}(X) \in \{0, 1\}^{N \times (K - 1)}$$

### 2. Conservation of Data Points in Reshaping (`pd.melt`)
When unpivoting $C_{\text{melted}}$ value columns across $R_{\text{wide}}$ initial rows into a long format DataFrame:
$$R_{\text{long}} = R_{\text{wide}} \times C_{\text{melted}}$$
The total number of data values in the value grid remains invariant:
$$N_{\text{total\_values}} = R_{\text{wide}} \times C_{\text{melted}}$$

### 3. Series Element-wise Index Alignment Formula
For two pandas Series $S_A$ and $S_B$ with index label sets $I_A$ and $I_B$ respectively, their element-wise sum $S_{\text{res}} = S_A + S_B$ is evaluated for each index label $i \in (I_A \cup I_B)$ as:
$$(S_A + S_B)[i] = \begin{cases} 
S_A[i] + S_B[i] & \text{if } i \in I_A \cap I_B \\ 
\text{NaN} & \text{if } i \in (I_A \cup I_B) \setminus (I_A \cap I_B) 
\end{cases}$$

### 4. Label Encoding Lexicographical Mapping
Given an alphabetical ordered set of unique string categories $S = (s_0, s_1, \dots, s_{K-1})$ where $s_0 < s_1 < \dots < s_{K-1}$:
$$f: S \to \{0, 1, \dots, K-1\}, \quad f(s_i) = i$$

---

## Common Exam Traps

1. **Series Index Label Alignment vs. Positional Indexing**:
**Trap**: Assuming `s1 + s2` performs positional addition like standard lists or NumPy arrays.
**Reality**: Pandas aligns elements by **index labels**. If `s1` has index `[0, 1]` and `s2` has index `[1, 2]`, `(s1 + s2)[0]` yields `NaN` because index label `0` is absent in `s2`.

2. **Using LabelEncoder for Nominal Features**:
**Trap**: Applying `LabelEncoder` to nominal categories like `City` (`'Chicago'=0`, `'Dallas'=1`, `'Houston'=2`).
**Reality**: Linear models and distance-based algorithms (KNN, SVM, K-Means) interpret numeric values as quantitative magnitudes ($2 > 1 > 0$). This forces a non-existent rank ordering on the data. Always use `OneHotEncoder` / `pd.get_dummies()` for nominal variables!

3. **The Dummy Variable Trap**:
**Trap**: Including all $K$ One-Hot Encoded binary columns in a linear regression model with a constant intercept term.
**Reality**: Causes perfect multicollinearity because $\sum_{k=1}^K D_k = 1$. The matrix $(X^T X)$ becomes non-invertible. Always drop one dummy column (`drop_first=True`) to serve as the reference level.

4. **Automatic Coercion of `int64` to `float64` on `NaN` Insertion**:
**Trap**: Expecting a pandas integer column (`int64`) to preserve its data type when a missing value (`NaN`) is introduced.
**Reality**: Standard NumPy/pandas `int64` cannot store `NaN`. Pandas automatically coerces the column's `dtype` to `float64` (unless using pandas nullable integer extension `Int64`).

5. **`pd.pivot()` Failure on Non-Unique Index-Column Pairs**:
**Trap**: Calling `pd.pivot(df, index='ID', columns='Subject', values='Grade')` when a single `ID` has multiple grade entries for the same `Subject`.
**Reality**: Raises `ValueError: Index contains duplicate entries, cannot reshape`. You must use `pd.pivot_table()` and supply an explicit aggregation function (`aggfunc='mean'`).

6. **Expecting In-place Mutation by Default**:
**Trap**: Calling `df.replace()`, `df.fillna()`, or `df.melt()` and assuming `df` was modified in place.
**Reality**: Pandas functions return a **new DataFrame** object by default. You must explicitly reassign the result (`df = df.fillna(-1)`) or set `inplace=True` where supported.

---

## Practice Questions

**Q1.** Which of the following statements strictly adheres to Hadley Wickham's **Tidy Data** principles? A) Each row represents a variable, each column represents an observation, and each table represents a data type. B) Each variable forms a column, each observation forms a row, and each type of observational unit forms a table. C) Wide format datasets are tidy because they minimize the total number of rows. D) Numerical features must be label encoded, and categorical features must be stored as separate tables.

**Q2.** Consider the following Python code snippet:
```python
import pandas as pd

s1 = pd.Series([10, 20], index=[0, 1])
s2 = pd.Series([30, 40], index=[1, 2])
res = s1 + s2
print(res)
```
What is the resulting output printed by Python? A) 
```text
0    40
1    60
dtype: int64
``` B) 
```text
0    10
1    50
2    40
dtype: int64
``` C) 
```text
0     NaN
1    50.0
2     NaN
dtype: float64
``` D) `ValueError: cannot align Series with mismatched indices`

**Q3.** A data scientist runs the following Python snippet to melt a wide DataFrame:
```python
import pandas as pd

wide_df = pd.DataFrame({
    'ID': [101, 102, 103],
    'Q1_Sales': [50, 60, 70],
    'Q2_Sales': [55, 65, 75]
})

long_df = pd.melt(
    wide_df,
    id_vars=['ID'],
    value_vars=['Q1_Sales', 'Q2_Sales'],
    var_name='Quarter',
    value_name='Sales'
)
print(long_df.shape)
```
What is the shape `(rows, columns)` of `long_df`? A) `(3, 3)` B) `(6, 3)` C) `(6, 2)` D) `(3, 5)`

**Q4.** Consider the following code performing One-Hot Encoding on a DataFrame:
```python
import pandas as pd

df = pd.DataFrame({'Type': ['Fire', 'Water', 'Grass', 'Fire']})
df_encoded = pd.get_dummies(df, columns=['Type'], drop_first=True)
print(list(df_encoded.columns))
```
Assuming standard alphabetical ordering of categories by pandas, what is the exact list of column names printed? A) `['Type_Fire', 'Type_Grass', 'Type_Water']` B) `['Type_Grass', 'Type_Water']` C) `['Type_Fire', 'Type_Water']` D) `['Type_Fire', 'Type_Grass']`

**Q5.** Why is applying `LabelEncoder` to a **nominal** categorical column (such as `City` with values `['Manila', 'Cebu', 'Davao']`) problematic when training a linear regression model? A) `LabelEncoder` creates $K$ new columns, causing memory bloat and model overfitting. B) It replaces nominal string values with `NaN` whenever missing values exist in other columns. C) It imposes an artificial numerical rank (e.g., `0 < 1 < 2`) that linear models interpret as magnitude differences, distorting model coefficients. D) `LabelEncoder` can only be executed on continuous floating-point numbers.

**Q6.** In pandas, what happens when a single missing value (`NaN`) is assigned to a column containing integers of data type `int64` (without using pandas nullable integer extensions)? A) The column maintains its `int64` data type and replaces `NaN` with `-1`. B) The column data type is automatically coerced to `float64`. C) The column data type is automatically converted to `category`. D) Pandas throws a `TypeError: Cannot store NaN in integer column`.

---

### Answer Key
 **Q1: B** — Tidy Data is defined by three rules: 1) Each variable forms a column, 2) Each observation forms a row, and 3) Each type of observational unit forms a table. **Q2: C** — Series arithmetic aligns on **index labels**. Label `0` exists only in `s1` (`10 + NaN = NaN`). Label `1` exists in both (`20 + 30 = 50.0`). Label `2` exists only in `s2` (`NaN + 40 = NaN`). The presence of `NaN` forces the resulting Series dtype to `float64`. **Q3: B** — `wide_df` has $3$ rows and $2$ value variables to melt (`Q1_Sales`, `Q2_Sales`). After `pd.melt()`, the total row count becomes $3 \times 2 = 6$. The columns are `['ID', 'Quarter', 'Sales']` (3 columns), resulting in shape `(6, 3)`. **Q4: B** — The unique categories in `Type` ordered alphabetically are `Fire`, `Grass`, `Water`. The corresponding OHE columns created are `Type_Fire`, `Type_Grass`, and `Type_Water`. Setting `drop_first=True` drops the first alphabetical column (`Type_Fire`), leaving `['Type_Grass', 'Type_Water']`. **Q5: C** — `LabelEncoder` maps unique strings to integers ($0, 1, 2$). For nominal variables with no natural ranking, distance-based and linear models interpret higher integer codes as having greater value/weight, introducing false model assumptions. **Q6: B** — Standard NumPy/pandas `int64` does not support missing value (`NaN`) representation. Inserting `NaN` into an integer column automatically coerces the column's data type to `float64`.

## Multiple Choice Questions

1. What is the defining characteristic of `Tidy Data`?
    - **A)** Every column is an observation and every row is a variable
    - **B)** Every variable forms a column, every observation forms a row, and each type of observational unit forms a table
    - **C)** The dataset contains no missing values
    - **D)** Data is stored entirely in wide format

2. In pandas architecture, what is a Series?
    - **A)** A 2D tabular data structure
    - **B)** A 1D labeled array capable of holding any data type
    - **C)** A 3D panel of data
    - **D)** An index object only

3. Transforming data from `wide` format to `long` format is often called:
    - **A)** Pivoting
    - **B)** Melting
    - **C)** Grouping
    - **D)** Merging

4. What is a Data Matrix?
    - **A)** A matrix where only numerical variables are represented for linear algebra operations
    - **B)** A list of dictionaries in Python
    - **C)** A file format similar to CSV
    - **D)** An unstructured text document

5. When would you prefer a long format over a wide format?
    - **A)** When plotting time series with libraries like Seaborn that expect one variable per column
    - **B)** When trying to read the data manually as a human
    - **C)** When running correlation matrices across all distinct time steps
    - **D)** When performing one-hot encoding

### Answer Key & Explanations

1. **B**. This is Hadley Wickhams standard definition of tidy data structure.
2. **B**. A Series is a single column/1D array with an index.
3. **B**. `melt` in pandas converts wide formats into long format.
4. **A**. Data matrices (often X) contain numeric features for modeling.
5. **A**. Many visualization tools and mixed-effects models expect long format where a single column holds the value and another holds the variable type.

## References & Navigation

- **Previous Topic:** [[Data Preprocessing]]
- **Next Topic:** [[EDA]]
- **Related Notes:** [[Data Preprocessing]], [[EDA]]

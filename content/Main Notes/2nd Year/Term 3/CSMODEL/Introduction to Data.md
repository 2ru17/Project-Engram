---
id: module_01_introduction_to_data
type: note
course: CSMODEL
topic: "Introduction to Data"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMODEL]] #[[Conceptual]] #[[Introduction to Data]]

---

## Overview
Data Science is an interdisciplinary field that fundamentally bridges the gap between raw data and actionable knowledge. By synthesizing computational techniques, statistical analysis, and deep domain expertise, it allows practitioners to extract meaningful patterns from increasingly vast and complex datasets. The typical data science pipeline forms the backbone of any data-driven project, systematically guiding the process from the initial data collection and structural cleaning phases, through exploratory data analysis (EDA), to the final stages of mathematical modeling and stakeholder communication.

## Key Definitions
- **Data Science:** The scientific domain combining IT/Computer Science, Mathematics/Statistics, and Business/Domain Knowledge to draw insights from data.
- **Population:** The exhaustive set of all individuals, objects, or events of interest in a study ($N$).
- **Sample:** A representative subset carefully selected from the population to allow for inferential analysis ($n$).
- **Parameter:** A fixed numerical characteristic of an entire population (e.g., $\mu, \sigma$).
- **Statistic:** A numerical measure calculated from sample data, used to estimate population parameters (e.g., $\bar{x}, s$).
- **Observational Study:** Research where characteristics are merely observed and recorded, identifying correlations but never establishing causation due to potential confounding variables.
- **Randomized Controlled Trial (RCT):** An experimental design involving the intentional application of treatments with random assignment, uniquely capable of establishing causal relationships.

## Theoretical Framework / Core Concepts

### Types of Data by Structure
Modern data architectures can be categorized based on their schema strictness:
1. **Structured Data:** Highly organized and tabular, natively conforming to relational schemas. This data is intuitively queried using SQL and stored in relational database management systems.
2. **Semi-Structured Data:** Lacks a strict tabular schema but utilizes tags and hierarchical markers to structure semantics. Common formats include JSON, XML, and document-oriented databases like MongoDB.
3. **Unstructured Data:** Raw formats devoid of any pre-defined structural models, such as images, natural text, and audio. It necessitates specialized processing like natural language processing (NLP) or computer vision for feature extraction.

### Types of Variables and Levels of Measurement
Variables are the fundamental units of observation and can be split into Qualitative (Categorical) and Quantitative (Numerical) branches. The classification of these variables rigorously dictates the mathematical and statistical operations that can validly be applied to them. This is formalized in the NOIR Taxonomy (Nominal, Ordinal, Interval, Ratio).

#### The NOIR Taxonomy
| Level of Measurement | Characteristic | Equal Intervals? | True Absolute Zero? | Central Tendency | Examples |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Nominal** | Unordered categories or labels. | No | No | Mode | Blood Type, Zip Code, Nationality |
| **Ordinal** | Meaningful rank or natural order. | No | No | Median, Mode | Likert Scales, Academic Grades |
| **Interval** | Meaningful differences between points. | Yes | No | Mean, Median, Mode | Temperature (Celsius/Fahrenheit), Calendar Years |
| **Ratio** | Meaningful differences and a true absolute zero point. | Yes | Yes | Geometric Mean, Mean | Weight, Height, Kelvin Temperature, Age |

### Sampling Methods
Sampling fundamentally dictates the external validity of statistical conclusions.
- **Simple Random Sampling (SRS):** Every possible subset has an equal probability of selection.
- **Systematic Sampling:** Elements are chosen at regular intervals ($k$) from an ordered frame.
- **Stratified Sampling:** The population is divided into homogeneous strata, and an SRS is drawn from **every** stratum. This ensures representation across key subgroups.
- **Cluster Sampling:** The population is divided into heterogeneous clusters. Entire clusters are randomly selected, and **all** elements within those chosen clusters are sampled.

## Worked Examples / Protocol Walkthroughs / Calculations

### Example 1: Calculating the Systematic Sampling Interval
Imagine a quality assurance scenario where an engineer must sample 50 microchips from a batch of 2,000 continuous units.
1. Define the population size $N = 2000$.
2. Define the target sample size $n = 50$.
3. Calculate the interval $k = \lfloor N / n \rfloor = 2000 / 50 = 40$.
4. Randomly pick a starting index $r \in [1, 40]$. Suppose $r = 12$.
5. The selected indices are $12, 52, 92, 132, \dots$ until 50 chips are collected.

### Example 2: Python Data Type Verification
Using the `pandas` library, one can programmatically inspect the structure and data types of a dataset.
```python
import pandas as pd

# Load dataset
df = pd.read_csv('housing_data.csv')

# Inspect dimensions and data types
rows, cols = df.shape
print(f"Dataset has {rows} rows and {cols} columns.")
print(df.dtypes)

# Summarize central tendencies and dispersion
print(df.describe(include='all'))
```

## Summary & Key Takeaways
- Data structure dictates processing complexity, moving from simple Structured data to complex Unstructured forms.
- The NOIR taxonomy (Nominal, Ordinal, Interval, Ratio) is crucial for selecting appropriate statistical methods; you cannot validly compute an arithmetic mean on Ordinal or Nominal data.
- While observational studies can only suggest associations, meticulously designed randomized experiments are required to prove causality.
- Proper sampling techniques (like Stratified and Systematic sampling) mitigate bias and ensure sample statistics accurately estimate population parameters.

## Multiple Choice Questions

1. Which of the following data formats is considered Semi-Structured?
    - **A)** A PostgreSQL relational database table
    - **B)** A raw MP4 video file
    - **C)** A JSON file mapping hierarchical configuration settings
    - **D)** A pure text document containing a narrative essay

2. A survey asks respondents to indicate their socioeconomic status as "Lower Class," "Middle Class," or "Upper Class." What level of measurement does this variable represent?
    - **A)** Nominal
    - **B)** Ordinal
    - **C)** Interval
    - **D)** Ratio

3. What is the defining characteristic that separates Interval data from Ratio data?
    - **A)** Interval data possesses a true absolute zero point.
    - **B)** Ratio data possesses a true absolute zero point, whereas Interval data has an arbitrary zero.
    - **C)** Interval data does not possess equal mathematical distances between ranks.
    - **D)** Ratio data can only consist of whole integers.

4. A pharmaceutical company tests a new vaccine. Subjects are randomly assigned to receive the vaccine or a saline injection. The researchers observing the outcomes do not know who received which. What kind of study is this?
    - **A)** Stratified Observational Study
    - **B)** Single-Blind Observational Study
    - **C)** Double-Blind Randomized Controlled Trial
    - **D)** Cluster Experiment

5. If a researcher calculates the average age of a specific sample of 100 individuals, the resulting numerical value is formally called a:
    - **A)** Population Parameter
    - **B)** Sample Statistic
    - **C)** Standard Error
    - **D)** Confidence Interval

6. A university wishes to survey its student body. It randomly selects 5 entire college departments and surveys every single student enrolled in those 5 departments. Which sampling method was utilized?
    - **A)** Stratified Sampling
    - **B)** Simple Random Sampling
    - **C)** Cluster Sampling
    - **D)** Systematic Sampling

7. Which sampling method involves dividing the population into homogeneous subgroups and taking a random sample from *every* subgroup?
    - **A)** Systematic Sampling
    - **B)** Cluster Sampling
    - **C)** Stratified Sampling
    - **D)** Convenience Sampling

8. What is a key limitation of Observational Studies compared to Randomized Controlled Trials?
    - **A)** Observational studies cannot demonstrate correlations.
    - **B)** Observational studies are generally more expensive and invasive.
    - **C)** Observational studies cannot definitively establish causal relationships due to unmeasured confounders.
    - **D)** Observational studies can only utilize nominal data.

9. An analyst has a dataset of calendar years (e.g., 1999, 2005, 2021). Which measure of central tendency is statistically valid for this Interval-level data?
    - **A)** Arithmetic Mean only
    - **B)** Arithmetic Mean, Median, and Mode
    - **C)** Mode only
    - **D)** Geometric Mean

10. Which of the following pandas methods is most appropriate for counting the exact frequencies of distinct nominal categories in a DataFrame column?
    - **A)** `df.describe()`
    - **B)** `df['col'].nunique()`
    - **C)** `df['col'].value_counts()`
    - **D)** `df.info()`

### Answer Key & Explanations

1. **C**. JSON files utilize structural markers (keys) to organize data hierarchies, which defines them as semi-structured, unlike strict tabular DBs or fully unstructured media files.
2. **B**. Socioeconomic classes possess a meaningful natural order, but the exact mathematical distance between "Lower" and "Middle" is undefined, making it Ordinal.
3. **B**. Ratio data has an absolute zero (meaning the total absence of the quantity, like $0\text{ kg}$), whereas Interval data has an arbitrary zero (like $0^\circ\text{C}$).
4. **C**. It involves random assignment to treatment/control (making it an RCT), and the researchers evaluating the outcomes are blind to the assignments, making it double-blind.
5. **B**. Any numerical summary derived from a *sample* is termed a statistic (represented by Latin letters like $\bar{x}$).
6. **C**. Cluster sampling selects entire intact heterogeneous groups (departments) and surveys everyone within them, contrasting with stratified sampling which pulls a few individuals from every group.
7. **C**. Stratified sampling ensures representation by breaking the population into homogeneous strata and sampling individuals from all of them.
8. **C**. Due to the lack of random assignment and control over variables, observational studies are vulnerable to confounding factors, meaning they can only prove association, not causation.
9. **B**. For Interval data, differences are mathematically meaningful, making it valid to calculate the Mean, Median, and Mode. Multiplication/division operations (like Geometric Mean) remain invalid due to the lack of a true zero.
10. **C**. `value_counts()` directly tallies and returns the frequency count for each distinct category in a pandas Series.

## References & Navigation

- **Next Topic:** [[Data Collection]]
- **Related Notes:** [[Data Collection]], [[Fundamentals of Data and Information]]

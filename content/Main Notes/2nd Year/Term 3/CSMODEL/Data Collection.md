---
id: Module-02-Data-Collection
type: note
course: CSMODEL
topic: Data Collection
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Data Collection]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 2: Data Collection and Sampling

## 1. Introduction to Data Collection in Statistics
In statistical modelling, data collection is the process of selecting a subset of individuals (a **sample**) from a larger group (a **population**) to estimate characteristics of the whole population. Because examining an entire population is usually impractical or impossible, proper sampling techniques are essential to ensure the sample is representative.

## 2. Populations and Samples **Population:** The entire group of individuals or instances about whom we hope to learn. **Sample:** A smaller, representative group drawn from the population used for actual analysis. **Parameter:** A numerical summary of the population (e.g., population mean, $\mu$). **Statistic:** A numerical summary of a sample (e.g., sample mean, $\bar{x}$).

## 3. Sampling Strategies (Techniques)
To avoid biased data, statistical sampling methods must involve randomization: **Simple Random Sampling (SRS):** Every individual in the population has an equal chance of being selected. **Stratified Sampling:** The population is divided into distinct, non-overlapping groups (strata) based on a specific characteristic (e.g., gender, age group). A simple random sample is then drawn from *each* stratum. **Cluster Sampling:** The population is divided into clusters (usually geographically). A random sample of *clusters* is chosen, and *all* individuals within the chosen clusters are sampled. **Systematic Sampling:** Selecting every $k^{th}$ individual from a population list. **Convenience Sampling (Non-Probability):** Sampling individuals who are easily accessible. This often leads to severe bias and should generally be avoided.

## 4. Types of Studies **Observational Study:** Researchers observe individuals and measure variables of interest but do not intervene or manipulate the environment. It can show association, but *not* causation. **Experimental Study (Experiment):** Researchers deliberately impose some treatment on individuals to measure their responses. Well-designed experiments can prove *causation*.

### Principles of Experimental Design
1. **Control:** Control for lurking variables by comparing treatment groups to control groups.
2. **Randomization:** Randomly assign subjects to treatments to eliminate bias.
3. **Replication:** Ensure an adequate number of subjects in each group to measure variability.
4. **Blocking:** If there are variables known to affect the outcome, group similar individuals into blocks and randomize treatments within those blocks.

## 5. Sampling in Python
While collecting data manually happens in the real world, we often simulate sampling or create data partitions (like train/test splits) in Python using `pandas`.

```python
import pandas as pd
import numpy as np

# Create a dummy population dataset
np.random.seed(42)
population = pd.DataFrame({
    'ID': range(1, 101),
    'Age': np.random.randint(18, 65, size=100),
    'Category': np.random.choice(['A', 'B', 'C'], size=100)
})

# 1. Simple Random Sampling
# Sample 10 random rows without replacement
srs_sample = population.sample(n=10, replace=False, random_state=1)
print("Simple Random Sample:\n", srs_sample.head(3))

# 2. Stratified Sampling
# Sample 2 items from each category (stratum)
stratified_sample = population.groupby('Category', group_keys=False).apply(lambda x: x.sample(n=2, random_state=1))
print("\nStratified Sample:\n", stratified_sample)
```

## 6. Sampling Biases **Selection Bias:** Occurs when the sample is not representative of the population (e.g., using convenience sampling). **Non-response Bias:** Occurs when individuals chosen for the sample cannot be contacted or refuse to participate, and these individuals differ from those who do participate. **Response Bias:** Occurs when respondents give inaccurate answers (e.g., due to poorly worded questions or lying about sensitive topics).

---

## Practice Questions

**Q1.** A researcher divides a city into 50 distinct neighborhoods, randomly selects 5 of these neighborhoods, and surveys every household in those 5 neighborhoods. What sampling method is this?
**A)** Simple Random Sampling
**B)** Stratified Sampling
**C)** Cluster Sampling
**D)** Systematic Sampling

**Q2.** Which of the following study designs is best suited for establishing a cause-and-effect relationship between two variables?
**A)** A retrospective observational study
**B)** A randomized controlled experiment
**C)** A voluntary response survey
**D)** A cross-sectional study

**Q3.** A polling agency conducts a phone survey during working hours. People who work full-time are less likely to answer. What type of bias does this primarily introduce?
**A)** Response bias
**B)** Non-response bias
**C)** Measurement bias
**D)** Confounding bias

## Multiple Choice Questions

1. What is the difference between a population and a sample?
- **A)** A sample includes all items of interest, a population is a subset
- **B)** A population includes all items of interest, a sample is a subset
- **C)** A population is numerical, a sample is categorical
- **D)** They are interchangeable terms in statistics

2. Which sampling strategy involves dividing the population into non-overlapping groups and randomly sampling from each group?
- **A)** Simple random sampling
- **B)** Systematic sampling
- **C)** Stratified sampling
- **D)** Cluster sampling

3. Selection bias occurs when:
- **A)** The sample is perfectly representative of the population
- **B)** Certain groups are systematically over or underrepresented in the sample
- **C)** Respondents give inaccurate answers
- **D)** Data is collected over an extremely long time period

4. An observational study differs from an experiment in that:
- **A)** An observational study introduces interventions or treatments
- **B)** An experiment observes variables without interference
- **C)** An observational study does not manipulate the environment or variables
- **D)** Observational studies always imply causation

5. What is cluster sampling?
- **A)** Every nth item is selected
- **B)** The population is divided into groups, and entire groups are randomly selected
- **C)** Sampling based on user convenience
- **D)** Ensuring equal proportions of demographic features

### Answer Key & Explanations
1. **B)** A population is the entire group, while a sample is a subset drawn from it.
2. **C)** Stratified sampling ensures all subgroups (strata) are proportionally represented.
3. **B)** Selection bias happens when the sampling method is flawed, leading to unrepresentative data.
4. **C)** Observational studies just observe, whereas experiments involve active manipulation (treatments).
5. **B)** In cluster sampling, the population is divided into clusters, and random clusters are chosen in their entirety.

## References & Navigation

- **Previous Topic:** [[Introduction to Data]]
- **Next Topic:** [[Data Cleaning]]
- **Related Notes:** [[Data Cleaning]], [[Data Preprocessing]]

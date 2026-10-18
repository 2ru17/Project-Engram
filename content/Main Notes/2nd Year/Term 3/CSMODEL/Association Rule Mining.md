---
id: Module-11-Association-Rule-Mining
type: note
course: CSMODEL
topic: Association Rule Mining
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Association Rule Mining]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 11: Association Rule Mining

---

## Key Concepts

### Market Basket Model A common framework for describing **many-to-many relationships** between two kinds of objects (customers ↔ items). **Goal:** Identify sets of items (*itemsets*) that are **frequently bought together** by sufficiently many customers. **Key Assumptions:**
There is a **large set of items** (e.g., all products in a grocery store).
There is a **large set of baskets** (e.g., each customer transaction).
Each basket contains a **small subset** of all possible items.

#### Applications
| Domain | Use Case |
|---|---|
| Retail | Store navigation / shelf layout optimization |
| Marketing | Tie-in promotions (buy X, get Y discount) |
| Academia | Plagiarism detection (co-occurring phrases) |
| Healthcare | Drug side-effect identification |

---

### Itemset & Support

**Definitions:** **Item:** A single entity (product, word, drug, etc.) **Itemset (I):** A set of one or more items, e.g., `{milk, beer}` **Support of I (`S_I`):** The **count** of baskets that contain *all* items in `I` as a subset. **Support Threshold (`S_θ`):** The minimum support required to call an itemset *frequent*. **Frequent Itemset:** An itemset `I` where `S_I >= S_θ`.

**Formula:**
$$S_I = |\{B \in \text{Baskets} : I \subseteq B\}|$$

> Note: `mlxtend` uses **relative support** (a fraction between 0 and 1), while the lecture uses **absolute support** (raw count).

#### Worked Example (from lecture)
Given 8 baskets over items `{m, c, p, j, b}` (milk, coke, pepsi, juice, beer):

| Basket | Contents |
|---|---|
| B1 | m, c, b |
| B2 | m, p, j |
| B3 | m, b |
| B4 | c, j |
| B5 | m, p, b |
| B6 | m, c, j, b |
| B7 | c, j, b |
| B8 | c, b |

With `S_θ = 3`:

| Itemset | Support | Frequent? |
|---|---|---|
| {m} | 5 |  |
| {c} | 5 |  |
| {p} | 2 |  |
| {j} | 4 |  |
| {b} | 6 |  |
| {m, b} | 4 |  |
| {c, j} | 3 |  |
| {c, b} | 4 |  |
| {j, b} | 2 |  |

**Key insight:** Adding more items to an itemset can only *decrease or maintain* support — never increase it. This is the **anti-monotone property** of support.

---

### Confidence

**Definition:** The **conditional probability** that a basket contains item `j`, *given* it already contains the antecedent `{i1, i2, ..., ik}`.

$$C_{\{i_1,\ldots,i_k\} \to j} = \frac{S_{\{i_1,\ldots,i_k,j\}}}{S_{\{i_1,\ldots,i_k\}}}$$

In plain English:
$$\text{Confidence}(X \to Y) = \frac{\text{# baskets with both } X \text{ and } Y}{\text{# baskets with } X}$$

#### Worked Example
Rule: `{m, b} → c` Baskets containing `{m, b, c}` = **2** (B1, B6) Baskets containing `{m, b}` = **4** (B1, B3, B5, B6) **Confidence = 2/4 = 0.50**

Rule: `{m, p} → b` Baskets containing `{m, p, b}` = **1** (B5) Baskets containing `{m, p}` = **2** (B2, B5) **Confidence = 1/2 = 0.50**

Rule: `{c, j} → b` Baskets containing `{c, j, b}` = **2** (B6, B7) Baskets containing `{c, j}` = **3** (B4, B6, B7) **Confidence = 2/3 ≈ 0.67**

---

### Association Rules

**Definition:** An **association rule** takes the form:
$$\{i_1, i_2, \ldots, i_k\} \to j$$ **Antecedent (LHS):** The left-hand side set — what the customer already has. **Consequent (RHS):** The right-hand side item — what they are likely to also buy.

A rule is considered **useful** if *both* thresholds are met:
1. `S_{antecedent} >= S_θ` — the antecedent itemset is frequent
2. `C_{antecedent → consequent} >= C_θ` — the rule has high enough confidence

#### Generating All Possible Rules from a Frequent Itemset
For a frequent itemset of size `n`, you generate rules by picking every non-empty proper subset as the antecedent and the rest as the consequent.

**Example:** From itemset `{1, 2, 3}` (S=2, with S_θ=2, C_θ=0.6):
| Rule | Support (S) | Confidence (C) | Passes? |
|---|---|---|---|
| 1 → {2, 3} | 5 | 0.40 |  |
| 2 → {1, 3} | 7 | 0.29 |  |
| 3 → {1, 2} | 5 | 0.40 |  |
| {1,2} → 3 | 4 | 0.50 |  |
| {1,3} → 2 | 3 | **0.67** |  |
| {2,3} → 1 | 4 | 0.50 |  |

From itemset `{1, 2, 5}` (notable rules):
| Rule | Support (S) | Confidence (C) | Passes? |
|---|---|---|---|
| 5 → {1,2} | 2 | **1.00** |  |
| {1,5} → 2 | 2 | **1.00** |  |
| {2,5} → 1 | 2 | **1.00** |  |
| {1,2} → 5 | 4 | 0.50 |  |

---

### Lift

**Definition:** A measure that tells you **how much more likely** the consequent is given the antecedent, compared to its base rate in the entire dataset.

$$\text{Lift}(X \to Y) = \frac{\text{Confidence}(X \to Y)}{\text{Support}(Y)}$$

Or equivalently (using relative support):
$$\text{Lift}(X \to Y) = \frac{P(X \cup Y)}{P(X) \cdot P(Y)}$$

| Lift Value | Meaning |
|---|---|
| **> 1** | X and Y are **positively correlated** — buying X makes Y more likely |
| **= 1** | X and Y are **independent** — no association |
| **< 1** | X and Y are **negatively correlated** — buying X makes Y less likely |

> Lift is **symmetric**: `Lift(X→Y) = Lift(Y→X)`. Confidence is NOT symmetric.

---

### Apriori Algorithm

The classic algorithm for finding frequent itemsets. It exploits the **anti-monotone property**:

> **If an itemset is infrequent, ALL of its supersets are also infrequent.**

This allows early pruning of the search space.

**Steps:**
1. Start with all **1-itemsets** (single items).
2. Count support for each; discard those below `S_θ`.
3. **Merge** surviving itemsets to generate **(k+1)-itemsets** (candidate generation).
4. Repeat steps 2–3 until no new frequent itemsets can be found.
5. Generate all possible rules from all found frequent itemsets.
6. Keep only rules with `Confidence >= C_θ`.

**Candidate Generation (merge rule):** Two k-itemsets can be merged into a (k+1)-itemset **only if they share k-1 items**. Example: `[1, 2]` and `[1, 3]` → merge to `[1, 2, 3]`  Example: `[1, 2]` and `[3, 4]` → cannot merge (share 0 items) 

---

### FP-Growth (Frequent Pattern Growth)

An alternative to Apriori that avoids repeated database scans by compressing the data into an **FP-Tree** (prefix tree / trie).

**Advantages over Apriori:** Does **not** generate candidate itemsets explicitly Requires only **2 database scans** (vs. Apriori's repeated scans) Much faster for dense datasets

**Steps (high-level):**
1. Scan the database once to find all frequent 1-itemsets and their counts.
2. Order items in each transaction by decreasing frequency.
3. Build the FP-Tree by inserting transactions one by one, sharing common prefixes.
4. Mine the FP-Tree recursively using **conditional pattern bases**.

> The `mlxtend` library supports both `apriori` and `fpgrowth` algorithms.

---

### The `RuleMiner` Class (Custom Implementation)

The course notebook implements a custom `RuleMiner` class in `rule_miner.py` that mirrors the theoretical concepts:

| Method | Purpose |
|---|---|
| `__init__(support_t, confidence_t)` | Set support and confidence thresholds |
| `get_support(data, itemset)` | Count baskets containing the itemset |
| `merge_itemsets(itemsets)` | Generate (k+1)-itemsets from k-itemsets (Apriori join step) |
| `get_rules(itemset)` | Generate all `[antecedent, consequent]` pairs from an itemset |
| `get_frequent_itemsets(data)` | Run Apriori loop; return all frequent itemsets |
| `get_confidence(data, rule)` | Compute `support(X∪Y) / support(X)` |
| `get_association_rules(data)` | Return all rules meeting both thresholds |

**Data Format Requirement:** The `RuleMiner` uses a **binary matrix** DataFrame where: Each **row** = one basket/transaction Each **column** = one item Cell value = `1` if the item is in that basket, `0` otherwise

---

## Python Snippets

### Setting Up Imports
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

---

### Creating a Synthetic Dataset (Binary Matrix)
```python
# Generate 300 random baskets, each containing 1–8 items chosen from 0–19
np.random.seed(1)
baskets = [
    np.sort(np.random.choice(20, size=np.random.randint(1, 9), replace=False))
    for i in range(300)
]

# Convert to binary matrix DataFrame (300 rows x 20 columns)
syn_df = pd.DataFrame(
    [[0 for _ in range(20)] for _ in range(300)],
    columns=[i for i in range(20)]
)

for i, basket in enumerate(baskets):
    syn_df.iloc[i, basket] = 1  # Mark items present as 1
``` `np.random.choice(20, size=k, replace=False)` — picks `k` unique items from 0–19 `syn_df.iloc[i, basket] = 1` — uses integer-position indexing to set columns

---

### Instantiating and Using `RuleMiner`
```python
from rule_miner import RuleMiner

# Create a rule miner with support threshold=10, confidence threshold=0.6
rule_miner = RuleMiner(support_t=10, confidence_t=0.6)
```

---

### `get_support(data, itemset)` — Count Basket Occurrences
```python
# Support of single item {0}
support_0 = rule_miner.get_support(syn_df, [0])

# Support of pair {0, 1}
support_0_1 = rule_miner.get_support(syn_df, [0, 1])

# Support of triple {0, 1, 2}
support_0_1_2 = rule_miner.get_support(syn_df, [0, 1, 2])

print(support_0)      # e.g., 64
print(support_0_1)    # smaller (subset of above)
print(support_0_1_2)  # even smaller (e.g., 4)
```
**Internal implementation:**
```python
return int(data[itemset].all(axis=1).sum())
# data[itemset]       → select only the columns for those items
# .all(axis=1)        → True for rows where ALL selected items = 1
# .sum()              → count those True rows = support
``` `axis=1` means "check across columns, row by row" Returns an **integer count** (absolute support)

---

### `get_frequent_itemsets(data)` — Apriori Loop
```python
frequent_itemsets = rule_miner.get_frequent_itemsets(syn_df)
print(frequent_itemsets)
# Example output: [[1,2], [4,5], [7,8], [10,11]] (varies by seed)
```
**What it does (internally):**
1. Starts with all 1-itemsets (one per column)
2. Checks support >= `support_t`; keeps frequent ones
3. Merges surviving itemsets using `merge_itemsets()`
4. Repeats until no new frequent itemsets found
5. Returns the **last level** of frequent itemsets found

---

### `get_rules(itemset)` — Generate Candidate Rules
```python
for itemset in frequent_itemsets:
    print(rule_miner.get_rules(itemset))

# For itemset [1, 2, 3], returns:
# [[[1,2],[3]], [[3],[1,2]], [[1,3],[2]], [[2],[1,3]], [[2,3],[1]], [[1],[2,3]]]
```
Each rule is `[antecedent_list, consequent_list]`. Both directions (X→Y and Y→X) are generated.

---

### `get_confidence(data, rule)` — Compute Confidence
```python
# Confidence of rule {1, 2} -> {3}
confidence_rule1 = rule_miner.get_confidence(syn_df, [[1, 2], [3]])

# Confidence of rule {4, 5} -> {6}
confidence_rule2 = rule_miner.get_confidence(syn_df, [[4, 5], [6]])

print(f'{confidence_rule1:.2f}')
print(f'{confidence_rule2:.2f}')
```
**Internal implementation:**
```python
X = rule[0]          # antecedent (e.g., [1, 2])
y = rule[1]          # consequent (e.g., [3])
combined = X + y     # union list (e.g., [1, 2, 3])
return self.get_support(data, combined) / self.get_support(data, X)
# = support({1,2,3}) / support({1,2})
```

---

### `get_association_rules(data)` — Full Pipeline
```python
rules = rule_miner.get_association_rules(syn_df)
print(rules)

# Get confidences of all returned rules (sorted ascending)
rule_confidences = sorted([
    rule_miner.get_confidence(syn_df, rule) for rule in rules
])
print(rule_confidences)
```
**What it does:**
1. Calls `get_frequent_itemsets()` to find all frequent itemsets
2. Generates all candidate rules from each frequent itemset
3. Filters rules by `confidence >= confidence_t`
4. Returns valid association rules as `[[antecedent], [consequent]]` lists

---

### Loading and Processing the Grocery Dataset
```python
# Step 1: Read raw CSV (each row = one transaction, items in separate columns)
temp_df = pd.read_csv('groceries.csv', header=None)

# Step 2: Build a string->integer mapping dictionary
values = temp_df.values.ravel()                          # flatten to 1D array
values = [v for v in pd.unique(values) if not pd.isnull(v)]  # remove NaN
value_dict = {}
for i, value in enumerate(values):
    value_dict[value] = i   # e.g., {'flour': 0, 'sugar': 1, ...}

# Step 3: Convert item names to integers; extract basket lists
temp_df = temp_df.stack().map(value_dict).unstack()
baskets = []
for i in range(temp_df.shape[0]):
    basket = np.sort([int(x) for x in temp_df.iloc[i].values.tolist()
                      if str(x) != 'nan'])
    baskets.append(basket)

# Step 4: Build binary matrix (9835 rows x 169 columns)
grocery_df = pd.DataFrame(
    [[0 for _ in range(169)] for _ in range(9835)],
    columns=values  # column names are the item name strings
)
for i, basket in enumerate(baskets):
    grocery_df.iloc[i, basket] = 1
``` **9835 transactions**, **169 unique grocery items** Result: binary matrix where columns are item *name strings* (e.g., `'flour'`, `'sugar'`)

---

### Querying the Grocery Dataset with `RuleMiner`
```python
rule_miner_grocery = RuleMiner(support_t=80, confidence_t=0.6)

# Q8: How many baskets contain 'flour'?
support_flour = rule_miner_grocery.get_support(grocery_df, ['flour'])
print('Baskets containing flour:', support_flour)  # Answer: 171

# Q9: How many baskets contain flour, sugar, AND baking powder?
support_fsb = rule_miner_grocery.get_support(
    grocery_df, ['flour', 'sugar', 'baking powder']
)
print('Baskets with flour+sugar+baking powder:', support_fsb)

# Q10: confidence(flour -> sugar)
conf_flour_sugar = rule_miner_grocery.get_confidence(
    grocery_df, [['flour'], ['sugar]]
)
print(f'conf(flour -> sugar): {conf_flour_sugar:.2f}')

# Q11: confidence(sugar -> flour)  [NOTE: different from above!]
conf_sugar_flour = rule_miner_grocery.get_confidence(
    grocery_df, [['sugar'], ['flour]]
)
print(f'conf(sugar -> flour): {conf_sugar_flour:.2f}')

# Get all association rules from grocery dataset
grocery_rules = rule_miner_grocery.get_association_rules(grocery_df)
print(grocery_rules)
```

---

## Formulas & Key Equations

| Measure | Formula | Range | Notes |
|---|---|---|---|
| **Support** (absolute) | $S_I = \|\{B : I \subseteq B\}\|$ | 0 to N | Count of transactions |
| **Support** (relative) | $\text{supp}(I) = S_I / N$ | [0, 1] | Used by mlxtend |
| **Confidence** | $C_{X \to Y} = S_{X \cup Y} / S_X$ | [0, 1] | Asymmetric measure |
| **Lift** | $\text{Lift}(X \to Y) = C_{X \to Y} / \text{supp}(Y)$ | [0, ∞) | Symmetric measure |
| **Anti-monotone** | If I infrequent → all supersets infrequent | — | Core Apriori pruning |

### Confidence vs. Lift **Confidence** can be misleading when the consequent is very popular (appears in most baskets). **Lift** corrects for the base rate of Y:
`Lift > 1`: buying X genuinely makes Y more likely than baseline.
`Lift = 1`: X gives no additional information about Y (independent).
`Lift < 1`: buying X actually makes Y *less* likely.

### Number of Possible Rules from a Frequent Itemset
For a frequent itemset of size `n`, the number of possible association rules is:
$$\sum_{k=1}^{n-1} \binom{n}{k} = 2^n - 2$$
(Every non-empty proper subset can be the antecedent.)

---

## Common Exam Traps
 **Confidence is NOT symmetric.** `conf(X → Y) ≠ conf(Y → X)` in general. The denominator changes (support of the antecedent). Always check which side is the antecedent.
 **Support threshold in mlxtend is relative (0–1), not an absolute count.** If you have 1000 transactions and want `min_support = 50 baskets`, pass `min_support=0.05`, not `50`.
 **High confidence does not imply a meaningful rule.** If Y appears in 95% of baskets, then `conf(anything → Y)` will be near 95% regardless. **Always check Lift**.
 **The custom `get_frequent_itemsets()` returns only the *last* (largest) frequent itemsets**, not all levels. This is different from mlxtend's `apriori()` which returns *all* frequent itemsets at every size level.
 **`S_{antecedent}` is the denominator for confidence, not `S_{antecedent ∪ consequent}`.** Confidence = support of the whole rule / support of the left-hand side *only*.
 **Infrequent itemsets can still produce high-confidence rules**, but the framework requires the antecedent's support to meet `S_θ`. An infrequent antecedent means the rule is not generated.
 **Lift is symmetric; confidence is not.** `Lift(X→Y) = Lift(Y→X)` always. Useful for cross-checking.
 **More items in an itemset → support can only decrease or stay the same** (anti-monotone). It can NEVER increase as you add more items.
 **When generating rules from `{A, B, C}`, both `[A] → [B,C]` and `[B,C] → [A]` are distinct rules** with potentially different confidences. The `get_rules()` function generates both directions for all splits.
 **`data[itemset].all(axis=1)`** — `axis=1` checks *across columns* (all items must be 1 in each row). Using `axis=0` instead would check across rows, which is wrong for computing per-basket presence.

---

## Practice Questions

**Q1.** Given 10 baskets and a support threshold `S_θ = 3`, itemset `{bread, butter}` appears in 4 baskets. What is true? A) {bread, butter} is NOT a frequent itemset because 4 < 10 B) {bread, butter} IS a frequent itemset because 4 >= 3 C) We cannot determine without knowing all items D) {bread, butter, jam} must also be frequent

**Q2.** Given the rule `{milk, bread} → eggs`, there are 8 baskets with `{milk, bread}` and 5 baskets with `{milk, bread, eggs}`. What is the confidence? A) 5/13 B) 8/5 C) 5/8 = 0.625 D) 5/5 = 1.0

**Q3.** What does the following code compute?
```python
rule_miner.get_confidence(syn_df, [[4, 5], [6]])
``` A) The support of itemset `{4, 5, 6}` B) The confidence of rule `{6} → {4, 5}` C) The confidence of rule `{4, 5} → {6}` D) The lift of rule `{4, 5} → {6}`

**Q4.** You have a dataset with 1000 transactions. Item `Y` appears in 900 baskets. You find rule `X → Y` with confidence = 0.92. What is most likely true? A) This is a very strong rule because confidence > 0.9 B) The rule is useful because confidence > support(Y) C) The lift of this rule is close to 1, meaning X and Y may be near-independent D) X appears in very few baskets

**Q5.** What does the following code block do?
```python
syn_df = pd.DataFrame(
    [[0 for _ in range(20)] for _ in range(300)],
    columns=[i for i in range(20)]
)
for i, basket in enumerate(baskets):
    syn_df.iloc[i, basket] = 1
``` A) Creates a 20×300 matrix of random values B) Creates a 300×20 binary matrix where `1` indicates an item is in a basket C) Creates a list of 300 baskets each with 20 items D) Creates a DataFrame and fills all values with 1

**Q6.** Given frequent itemset `{A, B, C}` with support = 6, support of `{A, B}` = 10, and support of `{C}` = 15. What is the confidence of rule `{A, B} → C`? A) 6/15 = 0.40 B) 6/10 = 0.60 C) 10/6 ≈ 1.67 D) 15/10 = 1.50

**Q7.** What is the anti-monotone property of support and why is it useful for Apriori? A) Support increases as itemsets grow larger; allows early expansion B) Support can only decrease or stay the same as itemsets grow; allows pruning supersets of infrequent sets C) Confidence is always higher than support; allows filtering D) All itemsets of the same size have equal support

**Q8.** Which of the following correctly describes the `get_support()` implementation?
```python
return int(data[itemset].all(axis=1).sum())
``` A) It sums all values in the selected columns B) It checks if ANY column is 1 for each row, then counts C) It checks if ALL selected item columns are 1 for each row, then counts those rows D) It averages the selected columns across all rows

**Q9.** You run `get_association_rules(grocery_df)` with `support_t=80` and `confidence_t=0.6`. A rule `{flour, sugar} → baking powder` is returned. What does this mean? A) At least 80% of all baskets contain {flour, sugar} B) At least 80 baskets contain {flour, sugar}, AND at least 60% of those also contain baking powder C) The rule has lift > 0.6 D) Exactly 80 baskets contain all three items

**Q10.** Given baskets `B1={1,2,5}`, `B2={2,4}`, `B3={2,3}`, `B4={1,2,4}`, `B5={1,3}`, `B6={2,3}`, `B7={1,2,3}`, `B8={1,2,3,5}`. What is the confidence of the rule `5 → {1, 2}`? A) 0.50 B) 0.75 C) 1.00 D) 0.40

---

### Answer Key

| Q | Answer | Explanation |
|---|---|---|
| Q1 | **B** | 4 >= S_θ=3, so {bread, butter} is frequent. D is wrong — supersets of frequent sets are NOT guaranteed to be frequent. |
| Q2 | **C** | Confidence = support(antecedent ∪ consequent) / support(antecedent) = 5/8 = 0.625 |
| Q3 | **C** | Rule format is `[X, y]`, so X={4,5}, y={6} → confidence of `{4,5} → {6}` |
| Q4 | **C** | Y appears in 90% of baskets. confidence/support(Y) = 0.92/0.90 ≈ 1.02 — lift near 1 means near-independence. |
| Q5 | **B** | Creates a 300-row × 20-column DataFrame initialized to 0, then sets cells to 1 for each basket's items — a binary transaction matrix. |
| Q6 | **B** | Confidence({A,B}→C) = support({A,B,C}) / support({A,B}) = 6/10 = 0.60 |
| Q7 | **B** | Anti-monotone: if itemset I is infrequent, all supersets of I are infrequent. Apriori prunes entire branches without counting them. |
| Q8 | **C** | `data[itemset]` selects those columns; `.all(axis=1)` returns True only if ALL selected columns = 1 per row; `.sum()` counts those rows. |
| Q9 | **B** | `support_t=80` is an **absolute count** threshold — at least 80 baskets must contain the antecedent {flour, sugar}, AND at least 60% of those must also have baking powder. |
| Q10 | **C** | Item 5 appears in B1={1,2,5} and B8={1,2,3,5}. Both also contain {1,2}. Confidence = 2/2 = 1.00. |

---

## Quick Reference: RuleMiner vs. mlxtend

| Feature | Custom `RuleMiner` | mlxtend `apriori` + `association_rules` |
|---|---|---|
| Input format | Binary int matrix (0/1) | Boolean matrix OR `TransactionEncoder` output |
| Support type | **Absolute count** | **Relative** (0–1 fraction) |
| Algorithm | Custom Apriori | Apriori or FP-Growth |
| Output | List of `[antecedent, consequent]` lists | Pandas DataFrame with metric columns |
| Metrics available | Support, Confidence | Support, Confidence, Lift, Leverage, Conviction |
| Filtering | Built into `get_association_rules()` | Post-process the returned DataFrame with boolean indexing |

### mlxtend Typical Workflow (for reference)
```python
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# Step 1: Encode transactions as boolean DataFrame
dataset = [['milk', 'bread'], ['bread', 'butter'], ['milk', 'bread', 'butter]]
te = TransactionEncoder()
te_array = te.fit(dataset).transform(dataset)   # Boolean array
df = pd.DataFrame(te_array, columns=te.columns_)

# Step 2: Find frequent itemsets (min_support is RELATIVE: 0.5 = 50% of baskets)
frequent_itemsets = apriori(df, min_support=0.5, use_colnames=True)

# Step 3: Generate association rules filtered by confidence
rules = association_rules(frequent_itemsets, metric='confidence', min_threshold=0.6)

# Step 4: Further filter by lift
strong_rules = rules[rules['lift'] > 1.2]
print(strong_rules[['antecedents', 'consequents', 'support', 'confidence', 'lift]])
```

**Key `apriori()` Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `df` | DataFrame | Binary/boolean transaction matrix |
| `min_support` | float | **Relative** support threshold (0–1) |
| `use_colnames` | bool | If True, use column names instead of indices in output |
| `max_len` | int | Max itemset size (optional, for performance) |

**Key `association_rules()` Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `df` | DataFrame | Output from `apriori()` |
| `metric` | str | `'confidence'`, `'lift'`, `'support'`, `'leverage'`, `'conviction'` |
| `min_threshold` | float | Minimum value for the chosen metric |

**Output DataFrame Columns from `association_rules()`:**
| Column | Description |
|---|---|
| `antecedents` | Frozenset of LHS items |
| `consequents` | Frozenset of RHS items |
| `antecedent support` | Relative support of LHS alone |
| `consequent support` | Relative support of RHS alone |
| `support` | Relative support of full rule (LHS ∪ RHS) |
| `confidence` | `support(LHS∪RHS) / support(LHS)` |
| `lift` | `confidence / support(RHS)` |
| `leverage` | `support(LHS∪RHS) - support(LHS)*support(RHS)` |
| `conviction` | `(1 - support(RHS)) / (1 - confidence)` |

## Multiple Choice Questions

1. What does the `support` metric measure in Association Rule Mining?
    - **A)** The probability of the consequent given the antecedent
    - **B)** The frequency of an itemset appearing in the database
    - **C)** The ratio of confidence to expected confidence
    - **D)** The statistical significance of a rule

2. Which algorithm uses a candidate generation step to find frequent itemsets?
    - **A)** FP-Growth
    - **B)** Apriori
    - **C)** K-Means
    - **D)** DBSCAN

3. In rule A -> B, how is `confidence` defined?
    - **A)** Support(A U B) / Support(A)
    - **B)** Support(A U B) / Support(B)
    - **C)** Support(A) * Support(B)
    - **D)** Support(A) / Support(A U B)

4. A lift value greater than 1 indicates that:
    - **A)** The antecedent and consequent are negatively correlated
    - **B)** The antecedent and consequent are independent
    - **C)** The antecedent and consequent are positively correlated
    - **D)** The rule is invalid

5. How does FP-Growth improve upon Apriori?
    - **A)** By generating more candidate itemsets
    - **B)** By avoiding the candidate generation phase entirely
    - **C)** By only finding association rules with 100% confidence
    - **D)** By converting all categorical variables into numeric values

### Answer Key & Explanations

1. **B**. Support is the proportion of transactions that contain the itemset.
2. **B**. Apriori works by generating candidates of length k from length k-1.
3. **A**. Confidence measures the probability of B given A, calculated as Support(A U B) / Support(A).
4. **C**. Lift > 1 implies that the occurrence of A increases the probability of B.
5. **B**. FP-Growth uses an FP-tree structure to find frequent itemsets without candidate generation.

## References & Navigation

- **Previous Topic:** [[Clustering]]
- **Next Topic:** [[Recommender Systems]]
- **Related Notes:** [[Clustering]], [[Machine Learning Models]]

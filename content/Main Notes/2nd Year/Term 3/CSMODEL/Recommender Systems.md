---
id: Module-13-Recommender-Systems
type: note
course: CSMODEL
topic: Recommender Systems
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMODEL]] #[[Recommender Systems]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 13: Recommender Systems

---

## Key Concepts

---

### 1. Motivation — Why Recommender Systems?
 **Traditional stores** are limited by physical shelf space; **online stores** are not. **The Long Tail:** A huge catalog of items are *not* popular — they don't get physical shelf space. Online platforms can surface niche items only with good recommendation engines. Real-world use cases: Netflix, Spotify, Lazada, Shopee, Twitter "Who to Follow," Facebook "People You May Know." Three types of recommendations:

| Type | Description | Drawback |
|---|---|---|
| Editorial / Hand-Curated | Editor's favorites, "must-have" lists | No user input |
| Simple Aggregates | Top 10, most popular, recent uploads | Ignores individual preferences |
| **Tailored Recommendations** | Based on *this* user's history | Needs data collection |

---

### 2. Formal Model — Utility Matrix
 **C** = set of Customers (users) **S** = set of Items **Utility function:** `u: C × S → R` where **R** is a totally ordered set of ratings (e.g., 0–5 stars)

The **Utility Matrix** stores every user's rating for every item:

|    | HIMYM | TBBT | GoT | Friends |
|----|-------|------|-----|---------|
| P1 | 5     | ?    | ?   | 1       |
| P2 | ?     | 3    | 4   | ?       |
| P3 | 4     | ?    | 4   | ?       |
| P4 | ?     | 3    | ?   | 2       |

`?` entries are **unknown** — predicting them is the core problem.

#### Key Issues

1. **Gathering ratings:**
*Explicit method:* Ask users to rate items → only a small fraction leave ratings.
*Implicit method:* Infer from actions (purchase, watch, listen) → cannot learn *low* ratings.
2. **Extrapolating values:**
Matrix is **sparse** (most entries are unknown).
**Cold start problem:** new users have no history; new items have no ratings.

---

### 3. Two Main Approaches

| Approach | Core Idea |
|---|---|
| **Content-Based** | Recommend items *similar* to items the same user liked before |
| **Collaborative Filtering** | Recommend items liked by *other users* similar to the current user |

---

### 4. Content-Based Filtering

**Main idea:** Build a profile for each item using features; build a user profile as a weighted average of liked items; recommend items whose profile best matches the user profile.

#### Item Profile

Represent each item as a feature vector (Boolean or real-valued): Movies: actors, director, genre Music: artist, genre, BPM Products: color, category, size

#### User Profile Construction

**Boolean example (no star ratings):** Features: Actor 1 (A1), Actor 2 (A2) User watched 5 movies; A1 appears in 3, A2 in 2. User profile: `A1 = 3/5 = 0.6`, `A2 = 2/5 = 0.4` **Issue:** Ignores the actual star rating for each movie.

**With 1–5 star ratings (better approach):**

Step 1 — Normalize ratings by subtracting the user's mean:

```text
Ratings: M1=3, M2=1, M3=2, M4=5, M5=4
User mean = (3+1+2+5+4)/5 = 3
Normalized: [0, -2, -1, +2, +1]
```

Step 2 — Compute weighted average per feature:

```text
A1 appears in M2, M3, M4:
  A1 weight = (-2 + -1 + 2) / 3 = -1/3 ≈ -0.3

A2 appears in M1, M5:
  A2 weight = (0 + 1) / 2 = 0.5
```

Result: `A1 = -0.3` (user dislikes A1 movies), `A2 = +0.5` (user likes A2 movies).

Step 3 — **Match** user profile against unrated item profiles using **cosine similarity.**

#### Cosine Similarity (Content-Based)

$$S_C(\mathbf{A}, \mathbf{B}) = \frac{\mathbf{A} \cdot \mathbf{B}}{|\mathbf{A}||\mathbf{B}|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \cdot \sqrt{\sum_{i=1}^{n} B_i^2}}$$

#### Pros & Cons of Content-Based

| Pros | Cons |
|---|---|
| No need for data on other users | Hard to find appropriate features |
| Works for users with unique tastes | **Overspecialization** — never recommends outside user profile |
| Can recommend new/unpopular items | **Cold start** for brand-new users (no history) |
| Explanations are possible | |

---

### 5. Collaborative Filtering

**Main idea:** Find a set N of users with similar ratings to user x, then estimate x's ratings based on what users in N rated.

Two sub-types: **User-User:** find similar *users*, predict based on their ratings. **Item-Item:** find similar *items*, predict based on user's rating of those items.

---

### 5a. Similarity Metrics

#### Jaccard Similarity

$$S_J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$

Only considers *whether* items were rated (set overlap) — **ignores rating values.**

> **Example:** SJ(U1,U2) = 1/5 = 0.2, SJ(U1,U3) = 2/4 = 0.5, but U1 and U2 rated their common movie similarly (both high). Jaccard fails to capture this.

---

#### Cosine Similarity (Raw)

$$S_C(A, B) = \frac{\sum A_i B_i}{\sqrt{\sum A_i^2} \cdot \sqrt{\sum B_i^2}}$$

Considers rating magnitudes. **Issue:** Treats missing ratings as 0 (negative signal), penalizing users simply because they haven't rated an item.

---

#### Centered Cosine Similarity = Pearson Correlation ⭐

**Step 1:** Subtract each user's (row) mean from their ratings. Missing values become 0 after centering (treated as *average*).

**Step 2:** Apply cosine similarity on the centered vectors.

$$S_{CC}(A, B) = \frac{\sum_{i \in I_{AB}} (r_{Ai} - \bar{r}_A)(r_{Bi} - \bar{r}_B)}{\sqrt{\sum_{i \in I_{AB}} (r_{Ai} - \bar{r}_A)^2} \cdot \sqrt{\sum_{i \in I_{AB}} (r_{Bi} - \bar{r}_B)^2}}$$

where $I_{AB}$ = items rated by **both** A and B, $\bar{r}_A$, $\bar{r}_B$ = user means.

**Key interpretations:** Centered rating > 0 → user liked item *more* than average Centered rating < 0 → user liked item *less* than average Magnitude = strength of preference Missing values → centered to 0 = treated as average

> **Slide example:** SC(U1,U2) = 0.09, SC(U1,U3) = -0.56 → U1 correctly more similar to U2.

---

### 5b. User-User Rating Prediction

Let `r_x` = rating vector of user x, `N` = k most similar users who rated item i.

**Option 1 — Simple average (naive):**

$$r_{xi} = \frac{1}{k} \sum_{y \in N} r_{yi}$$

> Issue: All neighbors count equally, ignoring how similar they actually are.

**Option 2 — Similarity-weighted average (preferred):**

$$r_{xi} = \frac{\sum_{y \in N} s_{xy} \cdot r_{yi}}{\sum_{y \in N} s_{xy}}$$

where $s_{xy}$ = similarity between user x and user y.

---

### 5c. Item-Item Rating Prediction

Let `N` = k items most similar to item i that *user x has rated*.

$$r_{xi} = \frac{\sum_{j \in N} s_{ij} \cdot r_{xj}}{\sum_{j \in N} s_{ij}}$$

**Worked example (k=2, predicting r_{M1,U5} from the slides):**

1. Normalize item matrix by subtracting each row (movie) mean.
2. Compute cosine similarity between M1 and all other movies:
S(M1,M6) = 0.59, S(M1,M3) = 0.41, S(M1,M2) = -0.18, S(M1,M4) = -0.10, S(M1,M5) = -0.31
3. Top k=2: M6 (0.59) and M3 (0.41).
4. U5's raw ratings: r(U5,M3) = 2, r(U5,M6) = 3.
5. Predict: `(0.41×2 + 0.59×3) / (0.41+0.59) = (0.82+1.77)/1.00 = 2.59 ≈ 2.6`

---

### 5d. User-User vs Item-Item

| | User-User | Item-Item |
|---|---|---|
| Works well when | Many users, few items | Many items, few users |
| Stability | Less stable (preferences change) | More stable (item similarity is static) |
| Scalability | Must recompute as users join | Pre-compute offline |
| Real-world use | Early systems | Amazon, Netflix |

---

### 5e. Pros & Cons of Collaborative Filtering

| Pros | Cons |
|---|---|
| Works for any item type (no feature engineering needed) | **Cold start** — need enough users/ratings |
| Leverages community wisdom | **Sparsity** — most users haven't rated most items |
| Can discover cross-genre recommendations | **First rater** — new items can't be recommended |

---

### 6. Matrix Factorization (SVD)

**Idea:** Decompose the utility matrix R into latent factor matrices:

$$R \approx U \cdot \Sigma \cdot V^T$$
 **U** (m×k): user-factor matrix **Σ** (k×k): diagonal matrix of singular values **V^T** (k×n): item-factor matrix **k** = number of latent factors (hyperparameter)

SVD finds a low-rank approximation that fills in unknown entries. Each latent dimension may correspond to a concept (e.g., "action", "romance", "sci-fi").

**In Surprise:** `SVD` implements this with SGD-based optimization and supports `n_factors`, `n_epochs`, `lr_all`, `reg_all` hyperparameters.

---

### 7. Evaluation Metrics

#### Mean Absolute Error (MAE)

$$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |r_i - \hat{r}_i|$$

Average magnitude of prediction errors. Less sensitive to outliers.

#### Root Mean Squared Error (RMSE)

$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (r_i - \hat{r}_i)^2}$$

Penalizes large errors more heavily than MAE. **Lower is better.** RMSE >= MAE always.

---

### 8. The `surprise` Library

**Surprise** = Simple Python Recommendation System Engine — designed for explicit rating data.

| Object | Role |
|---|---|
| `Reader` | Defines the rating scale (e.g., 1–5) |
| `Dataset` | Loads data from DataFrame or CSV |
| `SVD` | Matrix factorization |
| `KNNBasic` | Basic nearest-neighbor CF |
| `KNNWithMeans` | KNN with mean normalization |
| `cross_validate` | k-fold cross-validation, returns MAE/RMSE |

---

## Python Snippets

---

### `pandas.pivot_table` — Building a Utility Matrix

Converts long-format ratings into a users × items matrix.

```python
import pandas as pd

ratings = pd.read_csv('ratings.csv')  # columns: userId, movieId, rating

utility_matrix = ratings.pivot_table(
    index='userId',       # rows = users
    columns='movieId',    # columns = movies
    values='rating'       # values = ratings
)
# NaN = user has not rated that movie
print(utility_matrix.shape)   # (n_users, n_movies)
```

---

### `CollaborativeFiltering` — Row Mean & Normalization

```python
import numpy as np
import pandas as pd

class CollaborativeFiltering:
    def __init__(self, k):
        """k = number of similar items/users to consider"""
        self.k = k

    def get_row_mean(self, data):
        """Returns mean of each row, ignoring NaN.
Series input  → returns np.float64 (single mean)
DataFrame input → returns Series  (one mean per row)
        """
        if isinstance(data, pd.Series):
            return data.mean()           # skipna=True by default
        else:
            return data.mean(axis=1)     # axis=1 → row-wise mean

    def normalize_data(self, data, row_mean):
        """Subtract row mean from data (center ratings to 0).
DataFrame + Series   → returns DataFrame
Series   + float64   → returns Series
        """
        if isinstance(data, pd.DataFrame) and isinstance(row_mean, pd.Series):
            return data.subtract(row_mean, axis=0)  # axis=0 aligns on row index
        elif isinstance(data, pd.Series):
            return data.subtract(row_mean)
```

---

### `get_cosine_similarity` — Series and DataFrame Broadcast

```python
    def get_cosine_similarity(self, vector1, vector2):
        """Cosine similarity between two vectors.
Series vs Series      → returns np.float64
DataFrame vs Series   → returns pd.Series (one value per row)

        NaN filled with 0: unrated items contribute 0 to the dot product.
        """
        v1 = vector1.fillna(0)
        v2 = vector2.fillna(0)

        if isinstance(v1, pd.DataFrame):
            numerator = (v1 * v2).sum(axis=1)
            denom = np.sqrt((v1 ** 2).sum(axis=1)) * np.sqrt((v2 ** 2).sum())
        else:
            numerator = (v1 * v2).sum()
            denom = np.sqrt((v1 ** 2).sum()) * np.sqrt((v2 ** 2).sum())

        return numerator / denom
```

**sklearn equivalent (full matrix at once):**

```python
from sklearn.metrics.pairwise import cosine_similarity

matrix = utility_matrix.fillna(0).values  # shape: (n_items, n_users)

item_sim = cosine_similarity(matrix)     # (n_items, n_items)
user_sim = cosine_similarity(matrix.T)   # (n_users, n_users)
```

---

### `get_k_similar` — Top-k Most Similar Items

```python
    def get_k_similar(self, data, vector):
        """Find top-k rows in data most similar to vector.
        IMPORTANT: pass data with the target item/user already removed
        to avoid trivial self-match.

        Returns:
            Index  — indices of top-k similar items
            Series — their similarity scores
        """
        row_mean_data   = self.get_row_mean(data)
        row_mean_vector = self.get_row_mean(vector)
        normalized_data   = self.normalize_data(data, row_mean_data)
        normalized_vector = self.normalize_data(vector, row_mean_vector)

        similarity = self.get_cosine_similarity(normalized_data, normalized_vector)
        top_k = similarity.nlargest(self.k)
        return top_k.index, top_k

# Usage:
cfilter = CollaborativeFiltering(k=2)
similar_movies = cfilter.get_k_similar(
    ml_df.drop('Lion King, The (1994)'),  # exclude target
    ml_df.loc['Lion King, The (1994)']    # target's row
)
```

---

### `get_rating` — Predict a Missing Rating (Item-Item CF)

```python
    def get_rating(self, data, index, column):
        """Predict rating for item (row=index) by user (column=column).

        Steps:
          1. Remove target item from data.
          2. Find k most similar items.
          3. r_xi = sum(s_ij * r_xj) / sum(s_ij) for j in top-k
        """
        before_df = data.iloc[:index, :]
        after_df  = data.iloc[index + 1:, :]
        new_data  = pd.concat([before_df, after_df])  # data minus target item
        vector    = data.iloc[index, :]                # target item's full row

        indices, similarities = self.get_k_similar(new_data, vector)

        raw_ratings = new_data.loc[indices, data.columns[column]]
        rating = (similarities * raw_ratings).sum() / similarities.sum()
        return rating

# Usage:
cfilter = CollaborativeFiltering(k=2)
# Predict: User 1's rating for Movie 4
rating_1_4 = cfilter.get_rating(syn_df, index=4, column=1)
print(round(rating_1_4, 2))
```

---

### `surprise` Library — End-to-End Workflow

#### 1. Loading Data

```python
from surprise import Reader, Dataset

reader = Reader(rating_scale=(1, 5))

# From pandas DataFrame (must have exactly 3 columns: user, item, rating)
data = Dataset.load_from_df(ratings_df[['userId', 'movieId', 'rating]], reader)

# From CSV
data = Dataset.load_from_file('ratings.csv', reader=reader)
```

#### 2. SVD (Matrix Factorization)

```python
from surprise import SVD
from surprise.model_selection import cross_validate

algo = SVD(n_factors=50, n_epochs=20, lr_all=0.005, reg_all=0.02)

results = cross_validate(
    algo, data,
    measures=['RMSE', 'MAE'],
    cv=5,          # 5-fold cross-validation
    verbose=True
)

print(f"Mean RMSE: {results['test_rmse'].mean():.4f}")
print(f"Mean MAE:  {results['test_mae'].mean():.4f}")
```

#### 3. KNNBasic (Nearest-Neighbor CF)

```python
from surprise import KNNBasic
from surprise.model_selection import cross_validate

sim_options = {
    'name': 'pearson',    # metric: 'cosine', 'pearson', 'msd'
    'user_based': False   # False = item-item CF; True = user-user CF
}

algo = KNNBasic(k=40, sim_options=sim_options)
results = cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
```

#### 4. Training & Single Prediction

```python
from surprise.model_selection import train_test_split

trainset, testset = train_test_split(data, test_size=0.2)
algo.fit(trainset)

# Predict user '196' rating for item '302' (true rating is 4)
pred = algo.predict(uid='196', iid='302', r_ui=4, verbose=True)
print(pred.est)   # estimated rating (float)
```

---

### MovieLens Dataset Workflow (Notebook)

```python
import numpy as np
import pandas as pd
from collaborative_filtering import CollaborativeFiltering

# Load pre-processed MovieLens 100k (rows=movies, columns=users)
ml_df = pd.read_csv('ml-100k.csv', header=None)
ml_df = ml_df.replace(0, np.nan)   # 0 = unrated → NaN

# Attach movie names from u.txt
indices = []
with open('u.txt', 'r', encoding='ISO-8859-1') as f:
    line = f.readline()
    while line:
        indices.append(line.strip())
        line = f.readline()
ml_df.index = indices

# Dataset: 1682 movies × 943 users, 100k total ratings (scale 1–5)

cfilter = CollaborativeFiltering(k=3)
movie_name = 'Lion King, The (1994)'
similar_movies = cfilter.get_k_similar(
    ml_df.drop(movie_name),     # all other movies
    ml_df.loc[movie_name]       # Lion King's row
)
print(similar_movies[1].round(2))
```

---

## Formulas & Key Equations

| Formula | Expression | Range | Notes |
|---------|-----------|-------|-------|
| **Jaccard Similarity** | $S_J = \frac{\|A \cap B\|}{\|A \cup B\|}$ | [0, 1] | Ignores rating values |
| **Cosine Similarity** | $S_C = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\|\|\mathbf{B}\|}$ | [-1, 1] | Missing → 0 (problematic) |
| **Centered Cosine / Pearson** | Cosine of mean-subtracted vectors | [-1, 1] | Missing → average (good) |
| **User Profile Weight** | $w_f = \frac{\sum_{i \in I_f}(r_i - \bar{r})}{|I_f|}$ | unbounded | Content-based |
| **User-User (simple avg)** | $r_{xi} = \frac{1}{k}\sum_{y \in N} r_{yi}$ | — | Naive |
| **User-User (weighted avg)** | $r_{xi} = \frac{\sum_{y \in N} s_{xy} r_{yi}}{\sum_{y \in N} s_{xy}}$ | — | Preferred |
| **Item-Item prediction** | $r_{xi} = \frac{\sum_{j \in N} s_{ij} r_{xj}}{\sum_{j \in N} s_{ij}}$ | — | Symmetric to user-user |
| **MAE** | $\frac{1}{n}\sum |r - \hat{r}|$ | ≥ 0 | Less sensitive to outliers |
| **RMSE** | $\sqrt{\frac{1}{n}\sum (r - \hat{r})^2}$ | ≥ 0 | Penalizes large errors |
| **SVD** | $R \approx U \Sigma V^T$ | — | Matrix factorization |

---

## Common Exam Traps

1. **Jaccard ignores rating values** — it only counts how many items were *commonly rated*, not what the ratings were. An exam might give two users who agree on ratings but Jaccard gives low similarity because they rated few items in common.

2. **Raw cosine treats unrated (NaN/0) as a negative signal.** A missing rating being 0 says "user hates this item," which is wrong. Always use **centered cosine** for collaborative filtering.

3. **Centered cosine = Pearson correlation.** The slides state this explicitly. They are mathematically equivalent — do not treat them as different metrics in an exam.

4. **Row normalization direction matters:**
User-User CF → subtract **user's** mean (row = user in user-item matrix)
Item-Item CF → subtract **item's** mean (row = item in item-user matrix)

5. **User-user uses $s_{xy}$ (user similarity); item-item uses $s_{ij}$ (item similarity).** The prediction formulas look the same — make sure you're using the right similarity.

6. **Cold start has two flavors:**
*New user* → both content-based AND collaborative filtering suffer
*New item* → collaborative filtering suffers (first-rater problem); content-based can still recommend using item features

7. **Overspecialization is a content-based problem only.** Collaborative filtering can accidentally recommend cross-genre items because it follows other users.

8. **Sparsity** is primarily a collaborative filtering weakness. With very few ratings, finding truly similar users is unreliable.

9. **`get_k_similar` must exclude the target item/user first.** Otherwise, a vector will match itself with similarity 1.0 and trivially become its own best neighbor.

10. **`surprise` expects long-format data** (user, item, rating triplets), not a utility matrix. `pivot_table` is needed separately if you want the matrix; `surprise` builds the matrix internally.

11. **`fillna(0)` before custom cosine similarity.** After mean normalization, zeros mean "average sentiment" — not "dislike." The fill makes unrated positions numerically neutral.

12. **RMSE ≥ MAE always** for the same model on the same data. If an exam asks which is larger, it is always RMSE.

---

## Practice Questions

---

**Q1.** A user rated 4 movies: M1=2, M2=4, M3=5, M4=3. Feature "Actor A" appears in M2 and M3. Using the slide's method (normalize by user mean, then average normalized ratings per feature), what is Actor A's weight?
 A) 0.50 B) 1.00 C) 0.75 D) 1.50

---

**Q2.** Two user rating vectors (NaN = unrated):
```text
User A: [5, 3, NaN, 1, NaN]
User B: [4, NaN, 2, NaN, 5]
```
Which similarity metric is most appropriate for collaborative filtering here?
 A) Jaccard, because it handles missing values automatically B) Raw cosine, because it accounts for rating magnitude C) Centered cosine (Pearson), because it normalizes rating bias and treats missing as average D) Euclidean distance, because it penalizes large rating differences

---

**Q3.** What does this code compute?

```python
cfilter = CollaborativeFiltering(k=2)
rating_1_4 = cfilter.get_rating(syn_df, 4, 1)
print(round(rating_1_4, 2))
```
 A) The cosine similarity between Movie 4 and Movie 1 B) The predicted rating of User 1 for Movie 4, using the top 2 most similar movies C) The mean rating of Movie 4 across all users D) The normalized rating of User 1 for Movie 4

---

**Q4.** In user-user CF, user X wants a rating for item i. The top 3 neighbors are:

| User | sim to X | Rating for i |
|------|----------|-------------|
| Y1 | 0.8 | 4 |
| Y2 | 0.5 | 2 |
| Y3 | 0.3 | 5 |

Using the **similarity-weighted average** formula, what is the predicted rating?
 A) 3.67 B) 3.56 C) 3.44 D) 4.00

---

**Q5.** Why is item-item collaborative filtering preferred over user-user for large-scale systems?
 A) Item-item requires fewer similarity calculations at training time B) Item similarities can be pre-computed offline and rarely change, making query time fast C) Item-item avoids the cold start problem entirely D) Item-item works without any user ratings

---

**Q6.** What type of collaborative filtering does this code implement?

```python
from surprise import KNNBasic
from surprise.model_selection import cross_validate

sim_options = {'name': 'pearson', 'user_based': False}
algo = KNNBasic(k=40, sim_options=sim_options)
results = cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5)
print(results['test_rmse'].mean())
```
 A) User-user CF using Pearson correlation, k=40 neighbors B) Item-item CF using Pearson correlation, k=40 neighbors C) Matrix factorization using SVD with 40 latent factors D) Content-based filtering using cosine similarity

---

**Q7.** A brand-new movie is added to a streaming platform. It has zero ratings. Which problem does this illustrate, and which approach can still recommend it?
 A) Sparsity; SVD with matrix factorization can handle it B) First-rater problem; content-based filtering can recommend it using its features C) Cold start (user); collaborative filtering recommends it via crowd wisdom D) Overspecialization; centered cosine solves it by normalizing bias

---

**Q8.** What is the output shape of this code?

```python
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

utility = ratings_df.pivot_table(
    index='userId', columns='movieId', values='rating'
).fillna(0)
item_similarity = cosine_similarity(utility.T)
print(item_similarity.shape)
```

Assume 943 unique users and 1682 unique movies in `ratings_df`.
 A) (943, 943) B) (1682, 943) C) (1682, 1682) D) (943, 1682)

---

**Q9.** In the `normalize_data` method, why is `axis=0` specified in `data.subtract(row_mean, axis=0)`?

```python
return data.subtract(row_mean, axis=0)
```
 A) `axis=0` makes the operation faster by vectorizing across columns B) `axis=0` aligns the row_mean Series with the DataFrame's row (index) axis, subtracting each movie's mean from all of its values C) `axis=0` ensures that NaN values are preserved during subtraction D) `axis=0` transposes the DataFrame before subtraction

---

**Q10.** A recommender system achieves RMSE=0.89 and MAE=0.71. A colleague's achieves RMSE=0.95 and MAE=0.68. Which statement is most accurate?
 A) Your system is strictly better on all metrics B) Your system is better at avoiding large prediction errors; the colleague's is better on average absolute error C) The colleague's system is better because lower RMSE is always the primary metric D) Both are equivalent since the differences are within noise

---

### Answer Key

| Q | Answer | Explanation |
|---|--------|-------------|
| **Q1** | **B) 1.00** | Mean = (2+4+5+3)/4 = 3.5. Normalized: M1=−1.5, M2=+0.5, M3=+1.5, M4=−0.5. Actor A in M2, M3 → weight = (0.5+1.5)/2 = **1.0** |
| **Q2** | **C** | Centered cosine normalizes per-user rating bias and treats NaN as average (0 after centering), which is more semantically accurate than raw cosine or Jaccard. |
| **Q3** | **B** | `get_rating(syn_df, index=4, column=1)` → Movie 4 (row 4), User 1 (column 1). Returns the item-item CF predicted rating using k=2. |
| **Q4** | **B) 3.56** | Weighted avg: (0.8×4 + 0.5×2 + 0.3×5) / (0.8+0.5+0.3) = (3.2+1.0+1.5)/1.6 = 5.7/1.6 = **3.5625 ≈ 3.56** |
| **Q5** | **B** | Item similarities are static — a movie's genre and feel don't change. These can be pre-computed once offline. User preferences fluctuate. |
| **Q6** | **B** | `user_based=False` → item-item CF. `name='pearson'` → Pearson (centered cosine). `k=40` → 40 nearest neighbor items. |
| **Q7** | **B** | No ratings = first-rater problem (a collaborative filtering issue). Content-based can still use the item's feature profile (genre, cast, etc.) to recommend it. |
| **Q8** | **C) (1682, 1682)** | `utility` is (943, 1682). `utility.T` is (1682, 943). `cosine_similarity` of (1682, 943) vs itself → (1682, 1682) item-item similarity matrix. |
| **Q9** | **B** | `axis=0` tells pandas to align the Series index along the row (index=0) dimension of the DataFrame, so each row's mean is subtracted from that row's values. |
| **Q10** | **B** | RMSE penalizes large errors more (good for your system). MAE is the average absolute error (good for the colleague). Both measure different aspects — lower RMSE wins if avoiding catastrophic mistakes is priority. |

---

> **Exam Tip:** When computing a prediction from a utility matrix:
> 1. Subtract the appropriate **row mean** (item mean for item-item; user mean for user-user)
> 2. Compute **centered cosine** similarity between target and all candidates
> 3. Take the **top-k** by similarity score
> 4. Apply the **weighted average formula**: $r_{xi} = \frac{\sum_{j \in N} s \cdot r}{\sum_{j \in N} s}$
> 
> Show intermediate steps — partial credit is awarded at each stage.

## Multiple Choice Questions

1. Which approach recommends items based on features of items the user liked in the past?
    - **A)** Collaborative Filtering
    - **B)** Content-Based Filtering
    - **C)** Matrix Factorization
    - **D)** Simple Aggregates

2. What is the `Cold Start` problem in recommender systems?
    - **A)** The system crashes when too many users log in
    - **B)** The inability to recommend accurately for brand new users or items lacking history
    - **C)** Over-recommending highly popular items
    - **D)** The sparse matrix taking too long to compute

3. Why is Centered Cosine Similarity (Pearson correlation) preferred over Raw Cosine Similarity in collaborative filtering?
    - **A)** It ignores rating magnitudes completely
    - **B)** It treats unrated items as `dislikes`
    - **C)** It normalizes individual user rating biases and treats missing ratings neutrally
    - **D)** It only works for content-based models

4. In Matrix Factorization (e.g., SVD), what do the latent factors represent?
    - **A)** Explicit user demographic data like age and gender
    - **B)** Unobserved underlying concepts (like movie genres) that link users to items
    - **C)** The exact title names of the items
    - **D)** The exact geographical location of the users

5. What is a key weakness of Content-Based Filtering?
    - **A)** It suffers from overspecialization, rarely recommending items outside the users established profile
    - **B)** It requires a massive amount of ratings from other users to work
    - **C)** It cannot handle new items
    - **D)** It relies exclusively on the Jaccard similarity metric

### Answer Key & Explanations

1. **B**. Content-based filtering uses item profiles (features) to match against a users past preferences.
2. **B**. Cold start refers to the lack of initial data (ratings/history) for new entities.
3. **C**. Centered cosine subtracts user means, handling strict/generous raters and making zero numerically average instead of negative.
4. **B**. Matrix factorization decomposes ratings into hidden (latent) dimensions explaining preferences.
5. **A**. Without community input, content-based systems only suggest more of the exact same type of items.

## References & Navigation

- **Previous Topic:** [[Association Rule Mining]]
- **Next Topic:** [[Text Data Modelling]]
- **Related Notes:** [[Machine Learning Models]], [[Clustering]]

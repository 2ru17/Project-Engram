---
id: Module-10-Bayesian-Inference
type: note
course: CSMODEL
topic: Bayesian Inference
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Bayesian Inference]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 10: Bayesian Inference

## 📚 Key Concepts

### 1. Frequentist vs. Bayesian Paradigm
Statistical inference seeks to draw conclusions about population parameters based on sample data. Two main paradigms exist in modern statistics:

| Feature | Frequentist Statistics | Bayesian Statistics |
| :--- | :--- | :--- |
| **Definition of Probability** | Long-run relative frequency of an event occurring over infinite repetitions of an experiment. | Degree of belief or certainty regarding an event or parameter given available evidence. |
| **Parameter View** | **Fixed, unknown constant**. True value is deterministic (e.g., population mean $\mu$ is a single unknown number). | **Random variable with a probability distribution**. Parameters express uncertainty. |
| **Data View** | Random variable generated from repeated trials. | Fixed, observed evidence once collected. |
| **Prior Information** | Disregarded; inference relies solely on current experimental sample data. | Formally integrated into inference via a **prior distribution** $P(\theta)$. |
| **Stopping Rules / Sample Size** | Sensitive to experimental design, sample size $N$, and stopping intentions (can alter p-values). | Immune to stopping rules; inference depends only on observed data via the Likelihood Principle. |
| **Interval Estimation** | **Confidence Interval** (e.g., 95% of intervals constructed under repeated sampling contain true $\theta$). | **Credible Interval** (e.g., 95% probability that true $\theta$ lies within the interval). |

> [!IMPORTANT]
> **Key Exam Takeaway**: The foundational difference between Frequentist and Bayesian paradigms is that **Bayesian statistics treats parameters as random variables with probability distributions**, whereas Frequentist statistics treats parameters as fixed, unknown constants.

---

### 2. Bayes' Theorem & Its Components
Bayes' Theorem provides the mathematical framework for updating our belief about a parameter or hypothesis $\theta$ upon observing new evidence or data $D$.

#### Mathematical Formulation
Derived from the conditional probability rule $P(A \cap B) = P(A|B)P(B) = P(B|A)P(A)$:

$$P(\theta \mid D) = \frac{P(D \mid \theta) \cdot P(\theta)}{P(D)}$$

Where: **Prior Distribution $P(\theta)$**: The probability distribution representing prior strength of belief about parameter $\theta$ *before* observing the current data $D$. **Likelihood $P(D \mid \theta)$**: The probability of observing data $D$ given a specific parameter value $\theta$. This represents the data-generating generative model. **Marginal Likelihood / Evidence $P(D)$**: The total probability of observing the data across all possible parameter values:
Continuous case: $P(D) = \int_{\Theta} P(D \mid \theta) P(\theta) \, d\theta$
Discrete case: $P(D) = \sum_{i} P(D \mid \theta_i) P(\theta_i)$
Acts as a **normalizing constant** ensuring that the posterior probability density integrates or sums to 1. **Posterior Distribution $P(\theta \mid D)$**: The updated probability distribution of parameter $\theta$ *after* observing data $D$.

---

### 3. Proportionality & Sequential Updating

#### Unnormalized Posterior Proportionality
Since the denominator $P(D)$ is independent of $\theta$ and serves only to normalize the distribution, Bayesian inference frequently relies on the unnormalized relation:

$$P(\theta \mid D) \propto P(D \mid \theta) \cdot P(\theta)$$

$$\text{Posterior} \propto \text{Likelihood} \times \text{Prior}$$

#### Sequential Belief Updating
Bayesian learning is dynamic. When data arrives incrementally in batches $D_1, D_2, \dots, D_k$, the posterior distribution obtained after batch $D_1$ serves as the prior distribution for batch $D_2$:

$$P(\theta \mid D_1, D_2) \propto P(D_2 \mid \theta) \cdot P(\theta \mid D_1)$$

> [!TIP]
> **Today's Posterior is Tomorrow's Prior!** Updating beliefs sequentially batch-by-batch yields the exact same final posterior distribution as processing all data in a single large combined batch.

---

### 4. Conjugate Priors & The Beta-Binomial Model

#### Definition of Conjugacy
A prior distribution $P(\theta)$ is called a **conjugate prior** for a likelihood function $P(D \mid \theta)$ if the resulting posterior distribution $P(\theta \mid D)$ belongs to the exact same algebraic family of distributions as the prior.

Conjugate priors allow analytical, closed-form updates for posterior parameters without needing expensive numerical integration (like MCMC sampling).

#### The Beta-Binomial Conjugate Pair
The Beta-Binomial pair is the most essential conjugate pair in introductory Bayesian statistics. It models binary outcomes (success/failure, heads/tails, pass/fail).

1. **Likelihood (Binomial / Bernoulli)**:
   For $N$ independent coin flips yielding $z$ heads (successes) given success probability parameter $\theta \in [0, 1]$:
   $$P(z, N \mid \theta) = \binom{N}{z} \theta^z (1 - \theta)^{N - z} \propto \theta^z (1 - \theta)^{N - z}$$

2. **Prior Distribution (Beta Distribution)**:
   The Beta distribution is parameterized by hyperparameters $\alpha > 0$ and $\beta > 0$:
   $$P(\theta \mid \alpha, \beta) = \frac{\theta^{\alpha - 1} (1 - \theta)^{\beta - 1}}{B(\alpha, \beta)} \propto \theta^{\alpha - 1} (1 - \theta)^{\beta - 1}$$
Hyperparameter interpretation: $\alpha - 1$ prior successes, $\beta - 1$ prior failures (pseudo-counts).
Beta Mean: $\mu = \frac{\alpha}{\alpha + \beta}$
Beta Variance: $\sigma^2 = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}$

3. **Posterior Derivation**:
   $$\begin{aligned}
   P(\theta \mid z, N, \alpha, \beta) &\propto P(z, N \mid \theta) \cdot P(\theta \mid \alpha, \beta) \\
   &\propto \left[ \theta^z (1 - \theta)^{N - z} \right] \cdot \left[ \theta^{\alpha - 1} (1 - \theta)^{\beta - 1} \right] \\
   &= \theta^{(\alpha + z) - 1} (1 - \theta)^{(\beta + N - z) - 1}
   \end{aligned}$$

   Thus, the posterior distribution is also a Beta distribution:

   $$\theta \mid z, N \sim \text{Beta}(\alpha_{\text{post}}, \, \beta_{\text{post}})$$

   $$\alpha_{\text{post}} = \alpha_{\text{prior}} + z, \quad \beta_{\text{post}} = \beta_{\text{prior}} + (N - z)$$

#### Impact of Data Volume ($N$) When sample size $N$ is **small**, the prior parameters $\alpha, \beta$ heavily pull the posterior mean towards the prior mean. As sample size $N \to \infty$, the observed data $z, N$ dominates the update, and the posterior mean $\frac{\alpha + z}{\alpha + \beta + N}$ converges to the Frequentist Maximum Likelihood Estimate (MLE) $\hat{\theta}_{\text{MLE}} = \frac{z}{N}$.

---

### 5. Credible Intervals vs. Confidence Intervals

#### Definition of a 95% Credible Interval
A 95% **Credible Interval** $[a, b]$ is an interval in parameter space such that the integrated posterior probability density equals 0.95:

$$P(a \le \theta \le b \mid D) = \int_{a}^{b} P(\theta \mid D) d\theta = 0.95$$

#### Key Distinctions **Bayesian Credible Interval**: Direct statement about probability of parameter $\theta$. "There is a 95% probability that the true parameter $\theta$ lies between $a$ and $b$ given the observed data." **Frequentist Confidence Interval**: Indirect statement about sampling repeatability. "If this experiment is repeated infinitely under identical conditions, 95% of the calculated intervals will contain the fixed true parameter $\theta$."

#### Types of Credible Intervals
1. **Equal-Tailed Credible Interval**: Trims equal probability tail areas ($\frac{\alpha_{level}}{2} = 2.5\%$ on each tail). Easy to compute using quantiles (`scipy.stats.beta.interval`).
2. **Highest Density Interval (HDI)**: The shortest interval containing 95% of probability density, where every point inside the interval has higher probability density than any point outside.

---

### 6. Naive Bayes Classifier
Naive Bayes is a supervised learning classification algorithm built directly on Bayes' Theorem.

#### Bayes Rule for Classification
Given a feature vector $\mathbf{X} = (X_1, X_2, \dots, X_n)$ and class labels $Y \in \{c_1, c_2, \dots, c_K\}$:

$$P(Y = c_k \mid X_1, \dots, X_n) = \frac{P(Y = c_k) \cdot P(X_1, \dots, X_n \mid Y = c_k)}{P(X_1, \dots, X_n)}$$

#### The "Naive" Conditional Independence Assumption
To avoid computing joint likelihoods for high-dimensional feature spaces (which would require massive data), Naive Bayes makes the simplifying assumption that **all features $X_i$ are conditionally independent of each other given the class label $Y$**:

$$P(X_1, X_2, \dots, X_n \mid Y = c_k) = \prod_{i=1}^{n} P(X_i \mid Y = c_k)$$

#### Classification Decision Rule
Since denominator $P(\mathbf{X})$ is constant across all candidate classes $c_k$:

$$\hat{y} = \arg\max_{c_k} \left[ P(Y = c_k) \prod_{i=1}^{n} P(X_i \mid Y = c_k) \right]$$

#### Naive Bayes Variants
1. **Gaussian Naive Bayes (`GaussianNB`)**: Used for continuous numeric features. Assumes features follow a Normal (Gaussian) distribution within each class:
   $$P(X_i = x \mid Y = c_k) = \frac{1}{\sqrt{2\pi \sigma_{k,i}^2}} \exp\left( -\frac{(x - \mu_{k,i})^2}{2\sigma_{k,i}^2} \right)$$
2. **Multinomial Naive Bayes (`MultinomialNB`)**: Used for discrete feature counts (e.g., word occurrence frequencies in text document classification).
3. **Bernoulli Naive Bayes (`BernoulliNB`)**: Used for binary indicator features (0 or 1).

#### Laplace Smoothing (Additive Smoothing)
If a feature value $x_i$ does not appear in training data for class $c_k$, $P(X_i = x_i \mid Y = c_k) = 0$, causing the entire product $\prod P(X_i|Y)$ to become zero.

Laplace smoothing adds a smoothing constant $\alpha > 0$ (typically $\alpha = 1.0$) to count estimates:

$$P(X_i = t \mid Y = c_k) = \frac{c(t, c_k) + \alpha}{\sum_{w \in V} c(w, c_k) + \alpha \cdot |V|}$$

Where $|V|$ is the size of the feature vocabulary.

---

## 🐍 Python Snippets

### 1. `scipy.stats.beta` — Beta Distribution Operations
Computes Beta distribution PDF values, exact theoretical mean, variance, and 95% equal-tailed credible intervals.

```python
import numpy as np
from scipy.stats import beta

# Parameters of posterior Beta(28, 22)
a_param, b_param = 28, 22

# 1. Theoretical mean: E[\theta] = a / (a + b)
mean_val = beta.mean(a_param, b_param)
print(f"Posterior Mean: {mean_val:.4f}")  # 28 / (28 + 22) = 0.5600

# 2. Variance & Standard Deviation
var_val = beta.var(a_param, b_param)
std_val = beta.std(a_param, b_param)
print(f"Variance: {var_val:.6f}, Std Dev: {std_val:.4f}")

# 3. 95% Equal-Tailed Credible Interval
# Returns percentiles at 2.5% and 97.5%
ci_lower, ci_upper = beta.interval(0.95, a_param, b_param)
print(f"95% Credible Interval: [{ci_lower:.4f}, {ci_upper:.4f}]")

# 4. Evaluating PDF at specific theta grid point (e.g. theta = 0.5)
pdf_at_05 = beta.pdf(0.5, a_param, b_param)
print(f"PDF at theta=0.5: {pdf_at_05:.4f}")
```

---

### 2. Manual Discrete Bayesian Posterior Calculation (Grid Approximation)
Computes unnormalized posterior by multiplying prior and likelihood on a grid, then normalizes by dividing by the marginal likelihood sum.

```python
import numpy as np
import scipy.stats as stats

# Step 1: Define discrete parameter grid for theta in [0, 1]
theta_grid = np.linspace(0, 1, 101)  # 101 points from 0.0 to 1.0

# Step 2: Define Prior distribution (e.g., Uniform prior Beta(1,1) -> flat array)
prior = stats.beta.pdf(theta_grid, 1, 1)
# Normalize prior over grid
prior = prior / np.sum(prior)

# Step 3: Observe Data: N=10 flips, z=8 heads
N = 10
z = 8
# Likelihood function: P(Data | theta) = Binomial PMF
likelihood = stats.binom.pmf(z, n=N, p=theta_grid)

# Step 4: Unnormalized Posterior = Likelihood * Prior
unnormalized_posterior = likelihood * prior

# Step 5: Marginal Likelihood (Evidence P(D)) = sum across grid
evidence = np.sum(unnormalized_posterior)

# Step 6: Normalized Posterior
posterior = unnormalized_posterior / evidence

# Verification: Posterior Mean via expected value sum(theta * posterior)
posterior_mean = np.sum(theta_grid * posterior)
print(f"Marginal Evidence P(D): {evidence:.6e}")
print(f"Grid Posterior Mean: {posterior_mean:.4f}")
```

---

### 3. Full Beta-Binomial Sequential Updating Example
Demonstrates how beliefs update across multiple data batches using `scipy.stats.beta`.

```python
import numpy as np
from scipy.stats import beta

def report_beta(stage_name, a, b):
    mu = beta.mean(a, b)
    ci_low, ci_high = beta.interval(0.95, a, b)
    print(f"--- {stage_name} ---")
    print(f"Beta({a}, {b}) | Mean: {mu:.4f} | 95% Credible Interval: [{ci_low:.4f}, {ci_high:.4f}]\n")

# 1. Initial Prior: Strong belief coin is roughly fair (20 prior heads, 20 prior tails)
a, b = 20, 20
report_beta("Initial Prior", a, b)

# 2. Batch 1: Observe N1=10 flips, z1=8 heads
N1, z1 = 10, 8
a = a + z1
b = b + (N1 - z1)
report_beta("Posterior after Batch 1 (8H/10)", a, b)  # Beta(28, 22)

# 3. Batch 2: Observe N2=10 more flips, z2=9 heads
N2, z2 = 10, 9
a = a + z2
b = b + (N2 - z2)
report_beta("Posterior after Batch 2 (9H/10)", a, b)  # Beta(37, 23)
```

---

### 4. `sklearn.naive_bayes.GaussianNB` Classifier
Fits Gaussian Naive Bayes on continuous numeric data and extracts predictions, probabilities, and class parameters.

```python
import numpy as np
from sklearn.naive_bayes import GaussianNB

# Synthetic continuous training data: 4 samples, 2 features
X_train = np.array([
    [1.0, 2.1],
    [1.5, 1.8],
    [5.0, 8.2],
    [6.1, 9.0]
])
y_train = np.array([0, 0, 1, 1])  # Class 0 vs Class 1

# 1. Instantiate and Fit Model
gnb = GaussianNB()
gnb.fit(X_train, y_train)

# 2. Test sample
X_test = np.array([[2.0, 3.0]])

# 3. Predict Class and Class Probabilities
pred_class = gnb.predict(X_test)
pred_proba = gnb.predict_proba(X_test)

print("Predicted Class:", pred_class[0])
print(f"P(Y=0|X): {pred_proba[0][0]:.4f}, P(Y=1|X): {pred_proba[0][1]:.4f}")

# 4. Inspect Learned Attributes
print("Class Priors P(Y):", gnb.class_prior_)
print("Learned Feature Means (Theta):")
print(gnb.theta_)
```

---

### 5. `sklearn.naive_bayes.MultinomialNB` Classifier
Performs text document classification using word frequency counts and Laplace smoothing ($\alpha=1.0$).

```python
import numpy as np
from sklearn.naive_bayes import MultinomialNB

# Feature word counts: [count("buy"), count("discount"), count("meeting")]
X_train = np.array([
    [4, 3, 0],  # Document 1 (Spam)
    [3, 2, 1],  # Document 2 (Spam)
    [0, 1, 4],  # Document 3 (Ham)
    [1, 0, 5]   # Document 4 (Ham)
])
y_train = np.array([1, 1, 0, 0])  # 1: Spam, 0: Ham

# Fit MultinomialNB with Laplace Smoothing alpha=1.0
mnb = MultinomialNB(alpha=1.0)
mnb.fit(X_train, y_train)

# Unseen test document: [2, 1, 0] ("buy", "discount" present)
X_test = np.array([[2, 1, 0]])

pred_label = mnb.predict(X_test)
probabilities = mnb.predict_proba(X_test)

print("Predicted Label (1=Spam, 0=Ham):", pred_label[0])
print("Probabilities [P(Ham|X), P(Spam|X)]:", np.round(probabilities[0], 4))
```

---

## 📊 Formulas & Key Equations

### Bayes' Theorem & Core Inference
$$\text{Bayes' Theorem}: \quad P(\theta \mid D) = \frac{P(D \mid \theta) P(\theta)}{P(D)}$$

$$\text{Unnormalized Posterior}: \quad P(\theta \mid D) \propto P(D \mid \theta) \cdot P(\theta)$$

$$\text{Marginal Likelihood (Evidence)}: \quad P(D) = \int_{\Theta} P(D \mid \theta) P(\theta) \, d\theta \quad \text{or} \quad \sum_{\theta_i} P(D \mid \theta_i) P(\theta_i)$$

---

### Beta Distribution & Conjugate Updates
$$\text{Beta PDF}: \quad f(\theta; \alpha, \beta) = \frac{\theta^{\alpha - 1} (1 - \theta)^{\beta - 1}}{B(\alpha, \beta)}, \quad \theta \in [0, 1]$$

$$\text{Beta Mean}: \quad \mu = \frac{\alpha}{\alpha + \beta}$$

$$\text{Beta Variance}: \quad \sigma^2 = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}$$

$$\text{Beta-Binomial Update Rule}: \quad \text{Prior Beta}(\alpha, \beta) + \text{Data}(z \text{ heads in } N \text{ trials}) \implies \text{Posterior Beta}(\alpha + z, \, \beta + N - z)$$

---

### Naive Bayes Classification
$$\text{Naive Bayes Decision Rule}: \quad \hat{y} = \arg\max_{c_k} P(Y = c_k) \prod_{i=1}^{n} P(X_i \mid Y = c_k)$$

$$\text{GaussianNB Likelihood}: \quad P(X_i = x \mid Y = c_k) = \frac{1}{\sqrt{2\pi \sigma_{k,i}^2}} \exp\left( -\frac{(x - \mu_{k,i})^2}{2\sigma_{k,i}^2} \right)$$

$$\text{MultinomialNB Laplace Smoothing}: \quad P(X_i = t \mid Y = c_k) = \frac{c(t, c_k) + \alpha}{\sum_{w \in V} c(w, c_k) + \alpha \cdot |V|}$$

---

## ⚠️ Common Exam Traps

> [!WARNING]
> **Trap 1: Confusing 95% Credible Intervals with 95% Confidence Intervals**
> - *Incorrect Exam Answer*: "A 95% Credible Interval means 95% of sample intervals contain the true fixed parameter."
> - *Correct Exam Answer*: "A 95% Credible Interval means there is a **95% probability that the parameter lies within that interval given the observed data**."

> [!WARNING]
> **Trap 2: Beta Update Parameter Confusion ($\beta_{\text{post}}$ calculation)**
> - *Incorrect*: $\beta_{\text{post}} = \beta_{\text{prior}} + N$ (adding total trials $N$ to $\beta$).
> - *Correct*: $\beta_{\text{post}} = \beta_{\text{prior}} + (N - z)$ (adding **failures/tails** $N - z$ to $\beta$).

> [!WARNING]
> **Trap 3: Interpreting Beta Hyperparameters vs Pseudo-Counts**
> - In $\text{Beta}(\alpha, \beta)$, the prior pseudo-counts of successes and failures are $\alpha - 1$ and $\beta - 1$.
> - For example, a completely uninformative uniform prior over $[0, 1]$ is $\text{Beta}(1, 1)$, which corresponds to 0 prior successes and 0 prior failures!

> [!WARNING]
> **Trap 4: Forgetting to Normalize Discrete Posteriors**
> - Multiplying prior $\times$ likelihood gives the *unnormalized* posterior. To find exact probabilities $P(\theta_i \mid D)$, you MUST divide each unnormalized value by the sum of all unnormalized values $\sum P(D|\theta_i)P(\theta_i)$.

> [!WARNING]
> **Trap 5: Misinterpreting the "Naive" Independence Assumption**
> - Naive Bayes does **NOT** assume features are independent overall ($X_1 \perp X_2$).
> - It assumes features are **conditionally independent given the class label** ($X_1 \perp X_2 \mid Y$).

> [!WARNING]
> **Trap 6: Missing Laplace Smoothing Zero-Probability Trap**
> - If an unseen feature count is 0 without smoothing ($\alpha=0$), $P(X_i \mid Y) = 0$, which multiplies the entire class probability to zero regardless of how strong all other feature evidence is.

---

## 🧪 Practice Questions

### Q1. Medical Diagnostic Calculation (Bayes' Theorem)
A rare disease affects $1\%$ of a population ($P(D) = 0.01$). A diagnostic test for the disease has a sensitivity of $95\%$ ($P(T^+ \mid D) = 0.95$) and a specificity of $90\%$ ($P(T^- \mid \neg D) = 0.90$).

A randomly selected patient tests positive ($T^+$). Calculate the exact posterior probability $P(D \mid T^+)$ that the patient actually has the disease.
 A) 0.9500 B) 0.0876 C) 0.5000 D) 0.1085

---

### Q2. Beta-Binomial Posterior Parameter & Moments Update
A machine learning engineer models the probability $\theta$ that a web user clicks an ad using a Beta prior $\text{Beta}(\alpha=3, \beta=7)$. In a test campaign of $N=25$ users, $z=5$ users click the ad.

1. Find the posterior distribution parameters $\alpha_{\text{post}}$ and $\beta_{\text{post}}$.
2. Calculate the exact posterior mean $\mu_{\text{post}}$ and posterior variance $\sigma^2_{\text{post}}$.
 A) $\text{Beta}(8, 32)$, $\mu_{\text{post}} = 0.2000$, $\sigma^2 = 0.0039$ B) $\text{Beta}(8, 27)$, $\mu_{\text{post}} = 0.2286$, $\sigma^2 = 0.0049$ C) $\text{Beta}(5, 20)$, $\mu_{\text{post}} = 0.2000$, $\sigma^2 = 0.0062$ D) $\text{Beta}(8, 20)$, $\mu_{\text{post}} = 0.2857$, $\sigma^2 = 0.0070$

---

### Q3. Python Snippet Output Analysis (`scipy.stats.beta`)
Examine the following Python script:

```python
from scipy.stats import beta

# Prior belief: Beta(4, 4)
a_prior, b_prior = 4, 4

# Observed data: 12 successes out of 16 trials
z, N = 12, 16

# Posterior update
a_post = a_prior + z
b_post = b_prior + (N - z)

mean_val = beta.mean(a_post, b_post)
print(f"a={a_post}, b={b_post}, mean={mean_val:.4f}")
```

What is the output printed by this program?
 A) `a=16, b=20, mean=0.4444` B) `a=16, b=8, mean=0.6667` C) `a=12, b=16, mean=0.4286` D) `a=16, b=12, mean=0.5714`

---

### Q4. Multinomial Naive Bayes & Laplace Smoothing Calculation
Consider a text classification problem with two classes: **Spam** ($Y=1$) and **Ham** ($Y=0$). Class Priors: $P(\text{Spam}) = 0.5$, $P(\text{Ham}) = 0.5$. Vocabulary size $|V| = 2$ words: $w_1 =$ "cash", $w_2 =$ "hello". Training word counts:
**Ham**: $w_1$ appears 1 time, $w_2$ appears 3 times (Total Ham words = 4).
**Spam**: $w_1$ appears 3 times, $w_2$ appears 1 time (Total Spam words = 4).

Using Multinomial Naive Bayes with **Laplace smoothing $\alpha = 1.0$**, classify a test message $X = [w_1=2, w_2=0]$ (contains 2 instances of $w_1$ and 0 instances of $w_2$). Compute $P(\text{Spam} \mid X)$.
 A) 0.2000 B) 0.5000 C) 0.8000 D) 0.6667

---

### Q5. Python Code Analysis (`sklearn.naive_bayes`)
Consider the execution of the following `scikit-learn` code snippet:

```python
import numpy as np
from sklearn.naive_bayes import GaussianNB

X = np.array([[1], [2], [10], [12]])
y = np.array([0, 0, 1, 1])

gnb = GaussianNB()
gnb.fit(X, y)

print("Class Priors:", gnb.class_prior_)
print("Predicted Class for X=6:", gnb.predict([[6]])[0])
```

What will be displayed for `Class Priors` and `Predicted Class for X=6`?
 A) `Class Priors: [0.5 0.5]`, `Predicted Class for X=6: 0` B) `Class Priors: [0.5 0.5]`, `Predicted Class for X=6: 1` C) `Class Priors: [0.25 0.75]`, `Predicted Class for X=6: 0` D) `Class Priors: [0.5 0.5]`, `Predicted Class for X=6: [0, 1]`

---

## 🎯 Answer Key & Step-by-Step Solutions

### Q1 Answer: B
**Step-by-Step Solution:**
1. Identify given probabilities:
$P(D) = 0.01 \implies P(\neg D) = 0.99$
Sensitivity $P(T^+ \mid D) = 0.95$
Specificity $P(T^- \mid \neg D) = 0.90 \implies P(T^+ \mid \neg D) = 1 - 0.90 = 0.10$
2. Apply Law of Total Probability to find marginal evidence $P(T^+)$:
   $$\begin{aligned}
   P(T^+) &= P(T^+ \mid D)P(D) + P(T^+ \mid \neg D)P(\neg D) \\
   &= (0.95 \times 0.01) + (0.10 \times 0.99) \\
   &= 0.0095 + 0.0990 = 0.1085
   \end{aligned}$$
3. Apply Bayes' Theorem:
   $$P(D \mid T^+) = \frac{P(T^+ \mid D)P(D)}{P(T^+)} = \frac{0.0095}{0.1085} \approx 0.0875576 \approx 8.76\%$$

---

### Q2 Answer: B
**Step-by-Step Solution:**
1. Prior: $\text{Beta}(\alpha=3, \beta=7)$.
2. Data: $N=25$ trials, $z=5$ successes (clicks), and $N - z = 20$ failures (non-clicks).
3. Posterior parameters:
$\alpha_{\text{post}} = \alpha_{\text{prior}} + z = 3 + 5 = 8$
$\beta_{\text{post}} = \beta_{\text{prior}} + (N - z) = 7 + 20 = 27$
Posterior distribution is $\text{Beta}(8, 27)$.
4. Posterior Mean:
   $$\mu_{\text{post}} = \frac{\alpha_{\text{post}}}{\alpha_{\text{post}} + \beta_{\text{post}}} = \frac{8}{8 + 27} = \frac{8}{35} \approx 0.22857 \approx 0.2286$$
5. Posterior Variance:
   $$\sigma^2_{\text{post}} = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)} = \frac{8 \times 27}{(35)^2 \times (35 + 1)} = \frac{216}{1225 \times 36} = \frac{216}{44100} = \frac{6}{1225} \approx 0.004898 \approx 0.0049$$

---

### Q3 Answer: B
**Step-by-Step Solution:**
1. Given prior: $\alpha=4, \beta=4$.
2. Observed: $z=12, N=16 \implies N - z = 4$ failures.
3. Updated parameters:
$\alpha_{\text{post}} = 4 + 12 = 16$
$\beta_{\text{post}} = 4 + 4 = 8$
4. Mean of $\text{Beta}(16, 8)$:
   $$\mu = \frac{16}{16 + 8} = \frac{16}{24} = \frac{2}{3} \approx 0.6667$$
5. Output string: `a=16, b=8, mean=0.6667`.

---

### Q4 Answer: C
**Step-by-Step Solution:**
1. Calculate feature likelihoods with Laplace smoothing $\alpha=1.0$ ($|V| = 2$):
**Ham Class** ($Y=0$, total words $N_{\text{Ham}} = 4$):
Denominator $= N_{\text{Ham}} + \alpha \cdot |V| = 4 + 1.0 \times 2 = 6$.
$P(w_1 \mid \text{Ham}) = \frac{1 + 1}{6} = \frac{2}{6} = \frac{1}{3}$.
$P(w_2 \mid \text{Ham}) = \frac{3 + 1}{6} = \frac{4}{6} = \frac{2}{3}$.
Likelihood $P(X \mid \text{Ham}) = P(w_1 \mid \text{Ham})^2 \times P(w_2 \mid \text{Ham})^0 = \left(\frac{1}{3}\right)^2 \times 1 = \frac{1}{9}$.
Unnormalized Posterior $(\text{Ham}) = P(\text{Ham}) \times P(X \mid \text{Ham}) = 0.5 \times \frac{1}{9} = \frac{1}{18}$.

**Spam Class** ($Y=1$, total words $N_{\text{Spam}} = 4$):
Denominator $= N_{\text{Spam}} + \alpha \cdot |V| = 4 + 1.0 \times 2 = 6$.
$P(w_1 \mid \text{Spam}) = \frac{3 + 1}{6} = \frac{4}{6} = \frac{2}{3}$.
$P(w_2 \mid \text{Spam}) = \frac{1 + 1}{6} = \frac{2}{6} = \frac{1}{3}$.
Likelihood $P(X \mid \text{Spam}) = P(w_1 \mid \text{Spam})^2 \times P(w_2 \mid \text{Spam})^0 = \left(\frac{2}{3}\right)^2 \times 1 = \frac{4}{9}$.
Unnormalized Posterior $(\text{Spam}) = P(\text{Spam}) \times P(X \mid \text{Spam}) = 0.5 \times \frac{4}{9} = \frac{4}{18}$.

2. Normalize probabilities:
Total Evidence $P(X) = \frac{1}{18} + \frac{4}{18} = \frac{5}{18}$.
$P(\text{Spam} \mid X) = \frac{4/18}{5/18} = \frac{4}{5} = 0.8000$ ($80\%$).
Correct Option is **C**.

## Multiple Choice Questions

1. In Bayes theorem, what does the `prior` represent?
- **A)** The probability of the data given the hypothesis
- **B)** The initial belief about the hypothesis before seeing data
- **C)** The updated belief after observing data
- **D)** The marginal likelihood of the data

2. Which term describes a prior distribution that, when multiplied by the likelihood, results in a posterior from the same distribution family?
- **A)** Uniform prior
- **B)** Objective prior
- **C)** Conjugate prior
- **D)** Empirical prior

3. What is the fundamental assumption of the Naive Bayes classifier?
- **A)** Features are mutually exclusive
- **B)** Features are conditionally independent given the class label
- **C)** The prior probabilities are equal for all classes
- **D)** The likelihood function is normally distributed

4. How does the Bayesian approach differ from the Frequentist approach?
- **A)** Bayesian inference treats parameters as fixed and unknown
- **B)** Bayesian inference treats parameters as random variables with probability distributions
- **C)** Frequentist inference incorporates prior beliefs natively
- **D)** Bayesian inference does not use likelihood functions

5. The `posterior` probability is proportional to:
- **A)** Likelihood + Prior
- **B)** Likelihood / Prior
- **C)** Likelihood * Prior
- **D)** Prior - Likelihood

### Answer Key & Explanations
1. **B)** The prior is the initial probability of the hypothesis.
2. **C)** A conjugate prior ensures the posterior is in the same family, simplifying calculations.
3. **B)** Naive Bayes assumes that all features are independent of each other given the class.
4. **B)** Bayesian treats parameters as distributions, while Frequentists treat them as fixed constants.
5. **C)** According to Bayes theorem, Posterior is proportional to Likelihood * Prior.

## References & Navigation

- **Previous Topic:** [[Inference for Categorical Data]]
- **Next Topic:** [[Linear Programming]]
- **Related Notes:** [[Inference for Means]], [[Inference for Categorical Data]]

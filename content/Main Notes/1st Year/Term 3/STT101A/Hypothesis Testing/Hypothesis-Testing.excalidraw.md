---
id: unknown
type: note
course: STT101A
topic: "Unknown Topic"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Hypothesis-Testing.excalidraw]]

---

## Overview

This visual reference summarizes the **Statistical Hypothesis Testing Decision Framework**: partitioning the sampling distribution of a test statistic into the **Acceptance (Non-Rejection) Region** and the **Critical (Rejection) Region** under the Null Hypothesis $H_0$, along with the trade-off between **Type I Error ($\alpha$)** and **Type II Error ($\beta$)**.

## Key Definitions

| Reality \\ Decision | Do Not Reject $H_0$ | Reject $H_0$ |
| :--- | :---: | :---: |
| **$H_0$ is True** | Correct Decision ($1 - \alpha$, Confidence Level) | **Type I Error** (False Positive, $P = \alpha$) |
| **$H_0$ is False ($H_a$ True)** | **Type II Error** (False Negative, $P = \beta$) | Correct Decision ($1 - \beta$, **Statistical Power**) |

- **Test Statistic ($Z$ or $T$):** Standardized distance between sample estimate $\bar{X}$ and hypothesized parameter $\mu_0$:
  $$Z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}}, \qquad T = \frac{\bar{X} - \mu_0}{S / \sqrt{n}} \sim t_{n-1}$$
- **Decision Rule ($p$-value vs. $\alpha$):** Reject $H_0$ if and only if $p\text{-value} \le \alpha$ (equivalently, if the test statistic falls inside the critical region).

## Worked Example

**Problem:** Test $H_0: \mu = 50$ vs. $H_a: \mu \ne 50$ (two-tailed) at significance level $\alpha = 0.05$ ($z_{\alpha/2} = \pm 1.96$) when a sample of size $n = 36$ with known $\sigma = 12$ yields $\bar{x} = 54.5$.

**Solution:**
- Standard error: $\sigma_{\bar{X}} = \frac{12}{\sqrt{36}} = 2.0$.
- Test statistic: $z = \frac{54.5 - 50}{2.0} = +2.25$.
- Since $|z| = 2.25 > 1.96$ (and two-tailed $p\text{-value} = 2(1 - \Phi(2.25)) \approx 0.0244 < 0.05$), **reject $H_0$**.

## Multiple Choice Questions

1. What is a **Type I Error** in statistical hypothesis testing, and what symbol denotes its probability?
    - **A)** Failing to reject a false null hypothesis $H_0$; denoted $\beta$.
    - **B)** Rejecting the null hypothesis $H_0$ when $H_0$ is actually **true** (a false positive); its probability is the significance level $\alpha = P(\text{Reject } H_0 \mid H_0 \text{ is true})$.
    - **C)** Correctly rejecting a false null hypothesis $H_0$; denoted $1 - \beta$.
    - **D)** Computing a negative sample variance.

2. What does the **Statistical Power** ($1 - \beta$) of a hypothesis test measure?
    - **A)** The probability of correctly rejecting $H_0$ when the alternative hypothesis $H_a$ is actually true: $1 - \beta = P(\text{Reject } H_0 \mid H_a \text{ is true})$.
    - **B)** The probability that $H_0$ is true.
    - **C)** $1 - \alpha$.
    - **D)** The sample size $n$ divided by $\sigma$.

3. For a fixed sample size $n$, if a researcher makes the significance level $\alpha$ smaller (e.g., changing from $\alpha = 0.05$ to $\alpha = 0.01$ to reduce Type I errors), what happens to the Type II error rate $\beta$ and power $1 - \beta$?
    - **A)** $\beta$ decreases and power increases.
    - **B)** Both $\alpha$ and $\beta$ become $0$.
    - **C)** The critical region shrinks (moves further into the tails), so it becomes harder to reject $H_0$; consequently, **$\beta$ increases** and **statistical power $1 - \beta$ decreases**.
    - **D)** $\beta$ always equals $1 - \alpha$.

4. What is the **only** way to simultaneously reduce both Type I error ($\alpha$) and Type II error ($\beta$) for a given effect size?
    - **A)** Switch from a one-tailed test to a two-tailed test.
    - **B)** Guess the parameter without sampling.
    - **C)** Increase the population variance $\sigma^2$.
    - **D)** **Increase the sample size $n$**, which decreases the standard error $\sigma / \sqrt{n}$ and narrows the sampling distributions under both $H_0$ and $H_a$.

5. What is the correct formal interpretation of a **$p$-value** of $0.018$?
    - **A)** There is a $1.8\%$ probability that the null hypothesis $H_0$ is true.
    - **B)** Assuming the null hypothesis $H_0$ is **true**, the probability of observing a test statistic at least as extreme as the one actually observed in the sample is $0.018$.
    - **C)** There is a $98.2\%$ probability that the alternative hypothesis $H_a$ is false.
    - **D)** The Type II error rate is $\beta = 0.018$.

### Answer Key & Explanations

1. **B**. A Type I error occurs when we reject a true null hypothesis $H_0$; its maximum probability is controlled by the chosen significance level $\alpha$.
2. **A**. Since $\beta = P(\text{Fail to reject } H_0 \mid H_a \text{ true})$ is the Type II error rate, its complement $1 - \beta = P(\text{Reject } H_0 \mid H_a \text{ true})$ is the power of the test to detect a true effect.
3. **C**. Lowering $\alpha$ pushes the critical value $z_\alpha$ further out, expanding the non-rejection region and increasing the probability $\beta$ of missing a true alternative when $n$ is fixed.
4. **D**. Increasing $n$ shrinks $\sigma/\sqrt{n}$, reducing the overlap between the null and alternative sampling distributions so both $\alpha$ and $\beta$ can be made smaller simultaneously.
5. **B**. The $p$-value is a conditional probability conditioned on $H_0$ being true ($P(|T| \ge |t_{\text{obs}}| \mid H_0)$), NOT the posterior probability $P(H_0 \mid \text{data})$.

## References & Navigation

- **Related Notes:** [[Hypothesis Testing]]

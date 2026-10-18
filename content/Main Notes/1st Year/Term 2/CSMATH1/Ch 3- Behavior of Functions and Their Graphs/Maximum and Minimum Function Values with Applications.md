---
id: maximum_and_minimum_function_values_with_applications
type: note
course: CSMATH1
topic: Maximum and Minimum Function Values with Applications
status: completed
---

# Maximum and Minimum Function Values with Applications

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]] #[[Calculus]] #[[Optimization]]

---

## Overview

Finding maximum and minimum function values (extrema) is among the most consequential practical applications of differential calculus. By computing first and second derivatives and locating critical points, mathematicians and engineers determine optimal configurations across physical geometry, cost curves, and machine learning loss functions.

## Key Definitions

- **Absolute (Global) Extremum:** The highest value (absolute maximum) or lowest value (absolute minimum) that a function attains across its entire domain or a specified interval $[a, b]$.
- **Local (Relative) Extremum:** A point $c$ where $f(c) \ge f(x)$ (local max) or $f(c) \le f(x)$ (local min) for all $x$ within an open neighborhood $(c - \delta, c + \delta)$.
- **Critical Point:** An interior point $c$ in the domain of $f$ where either the derivative is zero ($f'(c) = 0$) or the derivative does not exist ($f'(c) \text{ undefined}$).
- **Fermat's Theorem on Stationary Points:** If $f$ has a local extremum at $c$, and $f'(c)$ exists, then $f'(c) = 0$.
- **Extreme Value Theorem (EVT):** If $f$ is continuous on a closed interval $[a, b]$, then $f$ attains both an absolute maximum and an absolute minimum on $[a, b]$.

---

## Theoretical Framework: Optimization Procedure

1. **Identify the Objective & Constraint Equations:** State clearly what quantity is to be maximized or minimized.
2. **Formulate a Single-Variable Objective Function:** Use constraints to eliminate secondary variables: $f(x)$.
3. **Establish the Feasible Domain:** Determine physical and geometric boundary limits: $x \in [a, b]$ or $x \in (a, b)$.
4. **Locate Critical Points:** Solve $f'(x) = 0$ and identify where $f'(x)$ is undefined.
5. **Classify Extrema:**
   - **First Derivative Test:** Analyze the sign change of $f'(x)$ across critical points ($+ \to -$ gives local max; $- \to +$ gives local min).
   - **Second Derivative Test:** If $f'(c) = 0$:
     - $f''(c) < 0 \implies$ Local Maximum (concave downward).
     - $f''(c) > 0 \implies$ Local Minimum (concave upward).
     - $f''(c) = 0 \implies$ Inconclusive (must revert to First Derivative Test).
   - **Closed Interval Method:** Compare $f(a)$, $f(b)$, and $f(c_i)$ for all critical points $c_i \in (a, b)$.

---

## Stepped Mathematical Proofs & Optimization Problems

### Problem 1: Maximum Volume Open-Top Box

**Problem Statement:** An open-top box is constructed from a rectangular sheet of cardboard with dimensions $16\text{ cm} \times 30\text{ cm}$ by cutting congruent squares of side length $x$ from each of the four corners and folding up the resulting flaps. Determine the cut length $x$ that maximizes the interior volume, and compute the maximum volume.

#### Step 1: Formulate the Objective Function
- Box Height: $h = x$
- Box Width: $w = 16 - 2x$
- Box Length: $l = 30 - 2x$
- Volume Function:
  $$
  V(x) = x(16 - 2x)(30 - 2x) = x(480 - 92x + 4x^2) = 4x^3 - 92x^2 + 480x
  $$

#### Step 2: Determine the Physical Feasible Domain
All dimensions must be strictly positive:
$$
x > 0, \quad 16 - 2x > 0 \implies x < 8, \quad 30 - 2x > 0 \implies x < 15
$$
Thus, the feasible domain is the open interval $x \in (0, 8)$.

#### Step 3: Differentiate & Find Critical Points
$$
V'(x) = \frac{d}{dx}\left(4x^3 - 92x^2 + 480x\right) = 12x^2 - 184x + 480
$$
Set $V'(x) = 0$ and factor out the common scalar 4:
$$
4(3x^2 - 46x + 120) = 0
$$
Factoring the quadratic:
$$
(3x - 10)(x - 12) = 0 \implies x_1 = \frac{10}{3} \approx 3.33\text{ cm}, \quad x_2 = 12\text{ cm}
$$
Because $x_2 = 12 \notin (0, 8)$, it is physically extraneous (it would yield a negative width: $16 - 2(12) = -8$). The only feasible critical point is $x = \frac{10}{3}$.

#### Step 4: Classify Extrema via the Second Derivative Test
$$
V''(x) = \frac{d}{dx}(12x^2 - 184x + 480) = 24x - 184
$$
Evaluate at $x = \frac{10}{3}$:
$$
V''\left(\frac{10}{3}\right) = 24\left(\frac{10}{3}\right) - 184 = 80 - 184 = -104 < 0
$$
Because $V''\left(\frac{10}{3}\right) < 0$, the function is concave downward at this point, proving that $x = \frac{10}{3}\text{ cm}$ yields an **absolute maximum** on $(0, 8)$.

#### Step 5: Compute Maximum Volume
$$
V\left(\frac{10}{3}\right) = \left(\frac{10}{3}\right) \left(16 - \frac{20}{3}\right) \left(30 - \frac{20}{3}\right) = \left(\frac{10}{3}\right) \left(\frac{28}{3}\right) \left(\frac{70}{3}\right) = \frac{19600}{27} \approx 725.93\text{ cm}^3
$$

---

### Problem 2: Minimizing Surface Area of a Cylindrical Can (Fixed Volume)

**Problem Statement:** A manufacturing plant produces closed cylindrical cans holding a fixed volume $V_0 = 1000\text{ cm}^3$ ($1\text{ L}$). Determine the ratio of height $h$ to radius $r$ that minimizes the total surface area of metal required.

#### Step 1: Equations & Constraints
- Volume Constraint: $V_0 = \pi r^2 h \implies h = \frac{V_0}{\pi r^2}$
- Surface Area (Objective): $S = 2\pi r^2 + 2\pi r h$

#### Step 2: Express Objective in Single Variable $r$
$$
S(r) = 2\pi r^2 + 2\pi r \left(\frac{V_0}{\pi r^2}\right) = 2\pi r^2 + \frac{2V_0}{r}, \quad r \in (0, \infty)
$$

#### Step 3: Differentiate & Solve for Critical Radius
$$
S'(r) = 4\pi r - \frac{2V_0}{r^2}
$$
Setting $S'(r) = 0$:
$$
4\pi r = \frac{2V_0}{r^2} \implies 4\pi r^3 = 2V_0 \implies r^3 = \frac{V_0}{2\pi} \implies r = \sqrt[3]{\frac{V_0}{2\pi}}
$$

#### Step 4: Optimal Aspect Ratio Derivation
Substitute $r^3 = \frac{V_0}{2\pi}$ back into the height constraint equation:
$$
h = \frac{V_0}{\pi r^2} = \frac{2\pi r^3}{\pi r^2} = 2r
$$
**Key Engineering Finding:** The optimal can has a height equal to its diameter ($h = 2r$), minimizing manufacturing material for any given volume.

#### Step 5: Second Derivative Test Verification
$$
S''(r) = 4\pi + \frac{4V_0}{r^3}
$$
Since $V_0 > 0$ and $r > 0$, $S''(r) > 0$ everywhere on $(0, \infty)$. The objective function is strictly convex, confirming that $r = \sqrt[3]{\frac{V_0}{2\pi}}$ is a unique global minimum.

---

### Problem 3: Closest Point on a Parabola (Distance Minimization)

**Problem Statement:** Find the points on the parabola $y = x^2$ that are closest to the point $(0, 2)$.

#### Step 1: Distance Formulation
The Euclidean distance from any point $(x, x^2)$ to $(0, 2)$ is:
$$
d(x) = \sqrt{(x - 0)^2 + (x^2 - 2)^2}
$$
Because the square root function is monotonically increasing for non-negative arguments, minimizing $d(x)$ is equivalent to minimizing the squared distance $f(x) = [d(x)]^2$:
$$
f(x) = x^2 + (x^4 - 4x^2 + 4) = x^4 - 3x^2 + 4, \quad x \in (-\infty, \infty)
$$

#### Step 2: Differentiate & Find Critical Points
$$
f'(x) = 4x^3 - 6x = 2x(2x^2 - 3) = 0
$$
Critical points:
$$
x = 0 \quad \text{or} \quad 2x^2 - 3 = 0 \implies x = \pm\sqrt{\frac{3}{2}}
$$

#### Step 3: Second Derivative Test
$$
f''(x) = 12x^2 - 6
$$
- At $x = 0$: $f''(0) = -6 < 0 \implies$ Local **Maximum** distance!
- At $x = \pm\sqrt{\frac{3}{2}}$:
  $$
  f''\left(\pm\sqrt{\frac{3}{2}}\right) = 12\left(\frac{3}{2}\right) - 6 = 18 - 6 = 12 > 0 \implies \text{Local Minima!}
  $$

#### Step 4: Closest Coordinate & Minimal Distance
Substitute $x = \pm\sqrt{\frac{3}{2}}$ into $y = x^2$:
$$
y = \left(\pm\sqrt{\frac{3}{2}}\right)^2 = \frac{3}{2}
$$
The two closest points are $\left(-\sqrt{\frac{3}{2}}, \frac{3}{2}\right)$ and $\left(\sqrt{\frac{3}{2}}, \frac{3}{2}\right)$.
The minimum distance is:
$$
d_{\min} = \sqrt{\left(\sqrt{\frac{3}{2}}\right)^2 + \left(\frac{3}{2} - 2\right)^2} = \sqrt{\frac{3}{2} + \frac{1}{4}} = \sqrt{\frac{7}{4}} = \frac{\sqrt{7}}{2} \approx 1.323
$$
*(Note: At $x = 0$, $d(0) = \sqrt{0 + (0-2)^2} = 2 > \frac{\sqrt{7}}{2}$, confirming $(0, 0)$ is a local maximum relative to the parabola's arms).*

---

## Multiple Choice Questions

1. Which condition mathematically defines a critical point $c$ of a differentiable function $f$?
    - **A)** $f(c) = 0$
    - **B)** $f'(c) = 0$ or $f'(c)$ is undefined, with $c$ in the domain of $f$
    - **C)** $f''(c) = 0$
    - **D)** $f'(c) > 0$ and $f''(c) < 0$

2. If $f'(c) = 0$ and $f''(c) < 0$, what does the Second Derivative Test conclude about $x = c$?
    - **A)** The function has an inflection point at $c$.
    - **B)** The test is inconclusive.
    - **C)** The function attains a local maximum at $c$.
    - **D)** The function attains a local minimum at $c$.

3. Why can one minimize squared distance $D(x) = [d(x)]^2$ instead of Euclidean distance $d(x)$ in geometric optimization?
    - **A)** Because squaring eliminates negative values in the domain.
    - **B)** Because $g(u) = u^2$ is strictly increasing for $u \ge 0$, preserving the location of extrema while eliminating radical differentiation.
    - **C)** Because square roots cannot be differentiated using the power rule.
    - **D)** Because squaring converts local extrema into absolute extrema.

4. In the cylindrical can problem with fixed volume $V$, what is the optimal geometric relationship between height $h$ and radius $r$ to minimize surface area?
    - **A)** $h = r$
    - **B)** $h = \pi r$
    - **C)** $h = 2r$ (height equals diameter)
    - **D)** $h = 4r$

5. Under the Closed Interval Method for finding absolute extrema of a continuous function on $[a, b]$, which set of candidate points must be evaluated?
    - **A)** Only points where $f''(x) = 0$.
    - **B)** The endpoints $a, b$ and all critical points $c \in (a, b)$.
    - **C)** Only the midpoint $(a + b)/2$.
    - **D)** Only the roots where $f(x) = 0$.

6. What occurs if $f'(c) = 0$ and $f''(c) = 0$?
    - **A)** $c$ is guaranteed to be an inflection point.
    - **B)** $c$ cannot be an extremum.
    - **C)** The Second Derivative Test is inconclusive; one must use the First Derivative Test.
    - **D)** The function is discontinuous at $c$.

7. In the open-top box problem with cardboard $16 \times 30$, why was the critical point $x = 12$ rejected?
    - **A)** Because $V'(12) \ne 0$.
    - **B)** Because $x = 12$ falls outside the physical domain $(0, 8)$, producing negative width $16 - 2(12) = -8$.
    - **C)** Because $V''(12) < 0$.
    - **D)** Because volume cannot be an integer.

8. According to the Extreme Value Theorem, which conditions guarantee the existence of both an absolute maximum and an absolute minimum?
    - **A)** Differentiability on an open interval $(a, b)$.
    - **B)** Continuity on a closed interval $[a, b]$.
    - **C)** Monotonicity across the entire real line $\mathbb{R}$.
    - **D)** Non-zero second derivative on $[a, b]$.

9. What does a sign change of $f'(x)$ from negative to positive as $x$ increases through $c$ signify?
    - **A)** $f$ transitions from concave up to concave down.
    - **B)** $f$ has a local minimum at $c$.
    - **C)** $f$ has a local maximum at $c$.
    - **D)** $f$ has a vertical asymptote at $c$.

10. When optimizing the cost of a rectangular fence where one side borders a river (requiring no fencing), which principle applies?
    - **A)** The perimeter constraint equation omits one length variable ($P = 2w + l$), altering the optimal aspect ratio to $l = 2w$.
    - **B)** The area must be zero.
    - **C)** Calculus cannot be applied when boundaries are asymmetric.
    - **D)** The cost will be identical to a 4-sided enclosure.

### Answer Key & Explanations

1. **B**. A critical point requires $c \in \text{Domain}(f)$ where $f'(c) = 0$ or $f'(c)$ does not exist.
2. **C**. A negative second derivative implies the curve is concave downward ($\cap$), meaning the stationary point is a local crest (maximum).
3. **B**. Since distance $d \ge 0$ and $u^2$ is strictly increasing on $[0, \infty)$, the critical point that minimizes $d^2$ identically minimizes $d$, avoiding tedious quotient/chain rule derivations.
4. **C**. Solving $S'(r) = 4\pi r - 2V/r^2 = 0$ yields $h = V/(\pi r^2) = 2r$, meaning optimal cans have equal height and diameter.
5. **B**. The Extreme Value Theorem ensures extrema occur either at boundary endpoints or at interior critical points.
6. **C**. When $f''(c) = 0$, the curvature test fails (e.g., $f(x) = x^4$ has a minimum at 0, while $f(x) = x^3$ has an inflection point at 0). The First Derivative Test must be applied.
7. **B**. Geometric optimization requires physical feasibility; cutting $12\text{ cm}$ from each side of a $16\text{ cm}$ sheet is geometrically impossible.
8. **B**. The Extreme Value Theorem strictly requires both continuity and a closed, bounded interval.
9. **B**. A transition from negative slope (decreasing) to positive slope (increasing) indicates a local trough (minimum).
10. **A**. With the river eliminating one side, $P = 2w + l \implies l = P - 2w$. Maximizing $A(w) = w(P - 2w) = Pw - 2w^2$ yields $A'(w) = P - 4w = 0 \implies w = P/4, l = P/2 = 2w$.

## References & Navigation

- **Previous Topic:** [[Linear Approximations and Differentials]]
- **Next Topic:** [[Absolute Extremum]]
- **Related Notes:** [[Absolute Extremum]], [[Derivative as Rate of Change and Related Rates Part 1]]

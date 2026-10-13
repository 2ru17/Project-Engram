---
id: derivative_as_rate_of_change_and_related_rates_part_1
type: note
course: CSMATH1
topic: Derivative as Rate of Change and Related Rates Part 1
status: completed
---

# Derivative as Rate of Change and Related Rates Part 1

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]] #[[Calculus]] #[[Related Rates]] #[[Differentiation]]

---

## Overview

The derivative can be interpreted as the instantaneous rate of change of one variable with respect to another. A prominent application of this concept is in "Related Rates" problems. 

## Key Definitions

**Derivative as Rate of Change:** The derivative $f'(x)$ or $\frac{dy}{dx}$ measures how the quantity $y$ changes with respect to a change in $x$. If $x$ is time ($t$), then $\frac{dy}{dt}$ is the rate of change of $y$ with respect to time.
**Related Rates Problems:** These are problems that involve finding the rate of change of one or more related variables or quantities with respect to time, where we know the rate of change of at least one of them. It is not necessary to explicitly express these variables as functions of time.

## Theoretical Framework: 6-Step Solution Protocol

1. **Sketch & Identify Variables:** Draw the physical geometry. Assign variables ($x, y, r, h, V, \theta$) to all quantities that vary with time $t$. Label constants that do not change.
2. **List Given and Target Rates:** Formally state known quantities and derivatives (e.g., $\frac{dx}{dt} = 0.5\text{ m/s}$), and identify the target derivative (e.g., $\frac{dy}{dt} \Big|_{x=5}$).
3. **Formulate the Governing Equation:** Relate the variables using Pythagorean theorem, trigonometric ratios, similar triangles, or standard solid geometry volume/area formulas.
4. **Eliminate Extraneous Variables (If Applicable):** If an equation contains more than two time-dependent variables, use geometric proportions (e.g., similar triangles in cones) to express the equation in terms of the target variable.
5. **Differentiate Implicitly with Respect to $t$:** Apply $\frac{d}{dt}$ to both sides of the equation using the Chain Rule.
6. **Substitute Known Values & Solve:** **Crucial Rule:** Never substitute instantaneous numerical values *before* differentiation, as doing so erroneously treats dynamic variables as constants. Substitute values only into the differentiated rate equation.

---

## Stepped Quantitative Problems & Calculations

### Problem 1: The Sliding Ladder Problem

**Problem Statement:** A $13\text{ m}$ rigid ladder leans against a vertical wall. The base of the ladder is pulled away from the wall at a constant rate of $\frac{dx}{dt} = 0.5\text{ m/s}$.
1. How fast is the top of the ladder sliding down the wall when the base is $5\text{ m}$ from the wall?
2. At what rate is the area of the triangle formed by the ladder, wall, and ground changing at that instant?

#### Step 1: Governing Geometric Equation
Let $x(t)$ be the horizontal distance from the wall to the base, and $y(t)$ be the vertical height of the top of the ladder above the ground. By the Pythagorean theorem:
$$
x^2 + y^2 = 13^2 = 169
$$

#### Step 2: Instantaneous Geometry at $x = 5$
When $x = 5$:
$$
5^2 + y^2 = 169 \implies y = \sqrt{169 - 25} = \sqrt{144} = 12\text{ m}
$$

#### Step 3: Differentiate Implicitly with Respect to $t$
$$
\frac{d}{dt}\left[x^2 + y^2\right] = \frac{d}{dt}[169] \implies 2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0
$$
Solve for $\frac{dy}{dt}$:
$$
\frac{dy}{dt} = -\frac{x}{y} \frac{dx}{dt}
$$

#### Step 4: Substitute Values
$$
\frac{dy}{dt} = -\frac{5}{12}(0.5) = -\frac{5}{24} \approx \mathbf{-0.2083\text{ m/s}}
$$
The negative sign confirms that the ladder's top is moving **downward** at a rate of $\frac{5}{24}\text{ m/s}$.

#### Step 5: Rate of Change of Triangular Area
The area enclosed is $A = \frac{1}{2}xy$. Applying the Product Rule with respect to $t$:
$$
\frac{dA}{dt} = \frac{1}{2}\left( \frac{dx}{dt}y + x\frac{dy}{dt} \right)
$$
Substitute $x = 5, y = 12, \frac{dx}{dt} = 0.5, \frac{dy}{dt} = -\frac{5}{24}$:
$$
\frac{dA}{dt} = \frac{1}{2}\left( (0.5)(12) + 5\left(-\frac{5}{24}\right) \right) = \frac{1}{2}\left( 6 - \frac{25}{24} \right) = \frac{1}{2}\left( \frac{119}{24} \right) = \frac{119}{48} \approx \mathbf{+2.479\text{ m}^2/\text{s}}
$$
The enclosed area is increasing at approximately $2.48\text{ m}^2/\text{s}$.

---

### Problem 2: The Inverted Conical Reservoir

**Problem Statement:** An inverted right-circular cone water tank has height $H = 10\text{ m}$ and base radius $R = 4\text{ m}$. Water is pumped out of the reservoir at a constant rate of $\frac{dV}{dt} = -2\text{ m}^3/\text{min}$. At what rate is the water level falling when the water depth is $h = 5\text{ m}$?

#### Step 1: Geometry & Variable Elimination
The volume of water inside the cone at depth $h$ and water surface radius $r$ is:
$$
V = \frac{1}{3}\pi r^2 h
$$
By similar triangles formed by the conical cross-section:
$$
\frac{r}{h} = \frac{R}{H} = \frac{4}{10} = \frac{2}{5} \implies r = \frac{2}{5}h
$$
Substitute $r = \frac{2}{5}h$ into the volume formula to eliminate $r$:
$$
V = \frac{1}{3}\pi \left(\frac{2}{5}h\right)^2 h = \frac{1}{3}\pi \left(\frac{4}{25}h^2\right) h = \frac{4\pi}{75}h^3
$$

#### Step 2: Differentiate with Respect to Time $t$
$$
\frac{dV}{dt} = \frac{d}{dt}\left[\frac{4\pi}{75}h^3\right] = \frac{4\pi}{75} \left(3h^2 \frac{dh}{dt}\right) = \frac{4\pi}{25}h^2 \frac{dh}{dt}
$$

#### Step 3: Substitute & Solve for $\frac{dh}{dt}$ at $h = 5$
Given $\frac{dV}{dt} = -2\text{ m}^3/\text{min}$ and $h = 5\text{ m}$:
$$
-2 = \frac{4\pi}{25}(5^2) \frac{dh}{dt} = \frac{4\pi}{25}(25) \frac{dh}{dt} = 4\pi \frac{dh}{dt}
$$
$$
\frac{dh}{dt} = -\frac{2}{4\pi} = -\frac{1}{2\pi} \approx \mathbf{-0.1592\text{ m/min}}
$$
The water level is dropping at $\frac{1}{2\pi}\text{ m/min}$ (approximately $15.92\text{ cm/min}$).

---

### Problem 3: Expanding Spherical Weather Balloon

**Problem Statement:** Helium is pumped into a spherical balloon at a constant volumetric rate of $\frac{dV}{dt} = 100\text{ cm}^3/\text{s}$.
1. Find the rate of increase of the radius when $r = 5\text{ cm}$.
2. Find the rate of increase of the balloon's surface area at that same instant.

#### Step 1: Rate of Radius Expansion
Volume of a sphere: $V = \frac{4}{3}\pi r^3$.
$$
\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt} \implies \frac{dr}{dt} = \frac{1}{4\pi r^2} \frac{dV}{dt}
$$
When $r = 5$:
$$
\frac{dr}{dt} = \frac{100}{4\pi (5^2)} = \frac{100}{100\pi} = \frac{1}{\pi} \approx \mathbf{0.3183\text{ cm/s}}
$$

#### Step 2: Rate of Surface Area Expansion
Surface area of a sphere: $S = 4\pi r^2$.
$$
\frac{dS}{dt} = 8\pi r \frac{dr}{dt}
$$
Substitute $r = 5$ and $\frac{dr}{dt} = \frac{1}{\pi}$:
$$
\frac{dS}{dt} = 8\pi (5) \left(\frac{1}{\pi}\right) = \mathbf{40\text{ cm}^2/\text{s}}
$$

---

## Multiple Choice Questions

1. In a related rates problem, why must numerical values of time-dependent variables NOT be substituted into the governing equation prior to differentiation?
    - **A)** Because substituting values first treats dynamic variables as constants, causing their rates of change to incorrectly differentiate to zero.
    - **B)** Because numbers cannot be manipulated using algebraic operations.
    - **C)** Because rates of change must always be negative.
    - **D)** Because differentiation is only valid for non-Euclidean geometries.

2. In the sliding ladder problem with $x^2 + y^2 = L^2$, what is the algebraic expression for the rate of vertical descent $\frac{dy}{dt}$?
    - **A)** $\frac{dy}{dt} = \frac{y}{x} \frac{dx}{dt}$
    - **B)** $\frac{dy}{dt} = -\frac{x}{y} \frac{dx}{dt}$
    - **C)** $\frac{dy}{dt} = -2xy \frac{dx}{dt}$
    - **D)** $\frac{dy}{dt} = -\sqrt{L^2 - x^2}$

3. For a spherical balloon inflating with constant volumetric rate $\frac{dV}{dt} = C$, how does the rate of radial growth $\frac{dr}{dt}$ behave as the radius $r$ increases?
    - **A)** $\frac{dr}{dt}$ increases linearly with $r$.
    - **B)** $\frac{dr}{dt}$ remains constant.
    - **C)** $\frac{dr}{dt}$ decreases inversely proportional to $r^2$ ($\frac{dr}{dt} = \frac{C}{4\pi r^2}$).
    - **D)** $\frac{dr}{dt}$ becomes negative.

4. In the inverted conical tank problem ($H=10\text{ m}, R=4\text{ m}$), what geometric principle eliminates the radius variable $r$ in terms of water depth $h$?
    - **A)** Cavalieri's Principle
    - **B)** The Law of Cosines
    - **C)** Similar Triangles ($\frac{r}{h} = \frac{R}{H}$)
    - **D)** Green's Theorem

5. If the base of a $13\text{ m}$ ladder moves away from a wall at $0.5\text{ m/s}$, how fast is the top descending when the base is $5\text{ m}$ from the wall?
    - **A)** $0.50\text{ m/s}$
    - **B)** $0.2083\text{ m/s}$ (or $-5/24\text{ m/s}$)
    - **C)** $1.20\text{ m/s}$
    - **D)** $0.0833\text{ m/s}$

6. In the conical tank draining problem at $\frac{dV}{dt} = -2\text{ m}^3/\text{min}$, what is the rate of height drop $\frac{dh}{dt}$ when $h = 5\text{ m}$?
    - **A)** $-\frac{1}{2\pi}\text{ m/min}$
    - **B)** $-\frac{1}{\pi}\text{ m/min}$
    - **C)** $-2\pi\text{ m/min}$
    - **D)** $-\frac{4}{25}\text{ m/min}$

7. Two cars depart an intersection simultaneously; Car A travels North at $60\text{ km/h}$ and Car B travels East at $80\text{ km/h}$. At what rate is the straight-line distance $z$ between them separating?
    - **A)** $140\text{ km/h}$
    - **B)** $100\text{ km/h}$
    - **C)** $20\text{ km/h}$
    - **D)** $70\text{ km/h}$

8. For an inflating sphere, if $\frac{dr}{dt} = \frac{1}{\pi}\text{ cm/s}$ when $r = 5\text{ cm}$, what is the instantaneous rate of increase of its surface area $\frac{dS}{dt}$?
    - **A)** $20\text{ cm}^2/\text{s}$
    - **B)** $40\text{ cm}^2/\text{s}$
    - **C)** $80\pi\text{ cm}^2/\text{s}$
    - **D)** $100/\pi\text{ cm}^2/\text{s}$

9. What does a negative rate of change (e.g., $\frac{dy}{dt} < 0$) signify in physical modeling?
    - **A)** The quantity is increasing over time.
    - **B)** The quantity is decreasing over time.
    - **C)** The mathematical model is invalid.
    - **D)** The measurement is stationary.

10. If the area of a circle $A = \pi r^2$ expands at a constant rate of $10\pi\text{ cm}^2/\text{s}$, how fast is the radius increasing when $r = 5\text{ cm}$?
    - **A)** $2\text{ cm/s}$
    - **B)** $1\text{ cm/s}$
    - **C)** $5\text{ cm/s}$
    - **D)** $0.5\text{ cm/s}$

---

### Answer Key & Explanations

1. **A** - Substituting before differentiating converts a variable into a constant, causing its derivative to vanish ($\frac{d}{dt}[5^2] = 0$).
2. **B** - Differentiating $x^2 + y^2 = L^2$ gives $2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0 \implies \frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$.
3. **C** - Since $\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$, solving for $\frac{dr}{dt} = \frac{C}{4\pi r^2}$ shows radial growth slows quadratically as size expands.
4. **C** - Cross-sectional similar triangles maintain the constant ratio $r/h = R/H$, expressing $r$ directly as a linear function of $h$.
5. **B** - $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt} = -\frac{5}{12}(0.5) = -\frac{5}{24} \approx -0.2083\text{ m/s}$.
6. **A** - Differentiating $V = \frac{4\pi}{75}h^3$ gives $\frac{dV}{dt} = \frac{4\pi}{25}h^2\frac{dh}{dt}$. At $h=5$, $-2 = 4\pi\frac{dh}{dt} \implies \frac{dh}{dt} = -\frac{1}{2\pi}$.
7. **B** - $z^2 = x^2 + y^2 \implies z\frac{dz}{dt} = x\frac{dx}{dt} + y\frac{dy}{dt}$. Because velocities are constant from origin: $x = 60t, y = 80t, z = 100t \implies 100t \frac{dz}{dt} = 60t(60) + 80t(80) \implies \frac{dz}{dt} = \frac{3600 + 6400}{100} = 100\text{ km/h}$.
8. **B** - $\frac{dS}{dt} = 8\pi r \frac{dr}{dt} = 8\pi(5)(1/\pi) = 40\text{ cm}^2/\text{s}$.
9. **B** - A negative first derivative indicates a monotonic decrease with respect to the independent variable (time).
10. **B** - $\frac{dA}{dt} = 2\pi r \frac{dr}{dt} \implies 10\pi = 2\pi(5)\frac{dr}{dt} \implies 10\pi = 10\pi \frac{dr}{dt} \implies \frac{dr}{dt} = 1\text{ cm/s}$.

---

## References & Navigation

- **Previous Topic:** [[Implicit Differentiation]]
- **Next Topic:** [[Linear Approximations and Differentials]]
- **Related Notes:** [[The Tangent Line and the Derivative]], [[Maximum and Minimum Function Values with Applications]]

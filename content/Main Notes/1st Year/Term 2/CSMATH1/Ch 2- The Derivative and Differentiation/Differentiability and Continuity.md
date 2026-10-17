---
id: differentiability_and_continuity
type: note
course: CSMATH1
topic: Differentiability and Continuity
status: completed
---

# Differentiability and Continuity

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

### Differentiability
A function $f(x)$ is **differentiable** at a point $x=c$ if its derivative $f'(c)$ exists. This means the limit:
$$\lim_{h \to 0} \frac{f(c+h) - f(c)}{h}$$
must exist. Graphically, this means the function has a well-defined, non-vertical tangent line at the point. A function is differentiable on an interval if it is differentiable at every point in that interval.

### Differentiability Implies Continuity
One of the most important theorems in calculus states that **if a function is differentiable at a point, then it must be continuous at that point**. The existence of a derivative requires the function to be continuous. 
However, the converse is **not** true: **Continuity does not imply differentiability.** A function can be continuous at a point but fail to be differentiable there.

### When does a function fail to be differentiable?
A function $f(x)$ is not differentiable at a point if its graph has any of the following features:
1. **A Discontinuity**: Jump, removable, or infinite discontinuity. If it's not continuous, it cannot be differentiable.
2. **A Sharp Corner or Cusp**: The slope of the curve approaches different values from the left and the right (e.g., the absolute value function $f(x) = |x|$ at $x=0$).
3. **A Vertical Tangent**: The curve goes straight up or down, making the slope undefined (approaching infinity).

## Important Formulas

**Differentiability Condition**: $f'(c)$ exists if and only if $\lim_{h \to 0} \frac{f(c+h) - f(c)}{h} = L$ for some real number $L$.

## Worked Examples

**Example 1: Continuous but not Differentiable**
Consider the absolute value function $f(x) = |x|$. 
*Continuity*: The function is continuous everywhere because its graph can be drawn without lifting the pencil.
*Differentiability*: At $x = 0$, the function comes to a sharp corner.
The left-hand derivative (slope for $x < 0$) is $-1$.
The right-hand derivative (slope for $x > 0$) is $1$.
Because the limits from the left and right are different, the derivative at $x = 0$ does not exist. Thus, $f(x) = |x|$ is continuous but not differentiable at $x=0$.

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Differentiability and Continuity?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Differentiability and Continuity without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[The Tangent Line and the Derivative]]
- **Next Topic:** [[Differentiation Rules]]
- **Related Notes:** [[Continuity]], [[The Tangent Line and the Derivative]]

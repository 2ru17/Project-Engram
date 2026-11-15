---
id: propositional_functions_03
type: note
course: CCDSTRU
topic: Propositional Functions
status: completed
---
# Propositional Functions (Predicate Logic)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Conceptual]] #[[Propositional Functions]] #[[Predicate Logic]] #[[CCDSTRU]] #[[M3]]

---

## Key Definitions
 **Predicate Logic (Predicate Calculus):** A more powerful type of logic that deals with predicates and quantifiers, allowing reasoning about object relationships. **Predicates:** Refers to the property that the subject of the statement can have (e.g., $P(x)$ meaning "$x$ is greater than 5", where $P$ is the predicate). **Propositional Function:** Also known as an $n$-ary predicate. A statement involving variables (e.g., $P(x)$). It is **not** a proposition until its variables are given specific values or it is quantified. **Quantification:** Expresses the extent to which a predicate is true over a range of elements. **Universe of Discourse (Domain):** Specifies all possible values of the variables. The meaning of the statement changes when the domain changes. Note: An implicit assumption is usually made that the universe of discourse is not empty. **Bound vs Free Variables:** When a variable is quantified, it is *bound*. If not, it is *free*. A propositional function becomes a proposition when all its variables are bound. **Counterexample:** An element in the domain for which $P(x)$ is false in a universal quantification statement.

## Theoretical Framework

### Types of Quantification
1. **Universal Quantification ($\forall x P(x)$):**
Read as: "For all $x, P(x)$".
Meaning: $P(x)$ is true for every element of $x$ in the domain.
Equivalent to $P(x_1) \land P(x_2) \land \dots \land P(x_n)$.
   
2. **Existential Quantification ($\exists x P(x)$):**
Read as: "There exists $x, P(x)$".
Meaning: $P(x)$ is true for at least one element of $x$ in the domain.
Equivalent to $P(x_1) \lor P(x_2) \lor \dots \lor P(x_n)$.

> [!tip] Empty Domains
> If the universe of discourse is empty:
> - $\forall x P(x) \equiv T$ (vacuously true, since there is no element to make it false).
> - $\exists x P(x) \equiv F$ (since there is no element to make it true).

### Logical Equivalences with Quantifiers
The quantifiers $\forall$ and $\exists$ have higher precedence over the logical operators from propositional calculus.
 **Distributing $\forall$:** $\forall x (P(x) \land Q(x)) \equiv \forall x P(x) \land \forall x Q(x)$ **Distributing $\exists$:** $\exists x (P(x) \lor Q(x)) \equiv \exists x P(x) \lor \exists x Q(x)$ Note: $\forall x (P(x) \lor Q(x))$ cannot simply be distributed as $\forall x P(x) \lor \forall x Q(x)$.

**De Morgan's Laws for Quantifiers:** $\neg \forall x P(x) \equiv \exists x \neg P(x)$ $\neg \exists x P(x) \equiv \forall x \neg P(x)$

### Nested Quantifiers
Two quantifiers are nested if one is within the scope of the other. The order of quantifiers is critical when mixing $\forall$ and $\exists$. $\forall x \forall y P(x, y) \equiv \forall y \forall x P(x, y)$ $\exists x \exists y P(x, y) \equiv \exists y \exists x P(x, y)$ $\forall x \exists y P(x, y)$ is generally **not** equivalent to $\exists y \forall x P(x, y)$.

### Translation Guide (English to Logic)
1. Identify the predicate.
2. Identify the universe of discourse.
3. If using universal quantification ($\forall$), use implication ($\rightarrow$). The subject is the premise.
*Example: All CS students studied. $\forall x (C(x) \rightarrow S(x))$*
4. If using existential quantification ($\exists$), use conjunction ($\land$). The subject is "anded" with the rest.
*Example: Some CS students studied. $\exists x (C(x) \land S(x))$*
5. If referring to a specific subject (e.g. "Sarah"), do not use quantifiers, just use the value as the parameter: $S(\text{Sarah})$.

## Multiple Choice Questions

1. When does a propositional function $P(x, y)$ become a proposition with a definite truth value?
    - **A)** Whenever the universe of discourse is left unspecified
    - **B)** Only when both variables remain free
    - **C)** When all of its variables are bound by quantifiers or assigned specific values
    - **D)** Only when it is combined with an implication operator

2. In the statement $\forall x (P(x) \land Q(y))$, how are the variables $x$ and $y$ classified?
    - **A)** x is bound and y is free
    - **B)** Both x and y are bound
    - **C)** x is free and y is bound
    - **D)** Both x and y are free

3. If the universe of discourse is completely empty, how do $\forall x P(x)$ and $\exists x P(x)$ evaluate?
    - **A)** Both evaluate to false
    - **B)** ∀x P(x) is true (vacuously), and ∃x P(x) is false
    - **C)** ∀x P(x) is false, and ∃x P(x) is true
    - **D)** Both evaluate to true

4. What is sufficient to disprove the universal statement $\forall x P(x)$ over a given universe of discourse?
    - **A)** Showing that P(x) is false for every element in the domain
    - **B)** Showing that the domain contains at least two elements
    - **C)** Finding one counterexample element in the domain for which P(x) is false
    - **D)** Changing the universal quantifier to an existential quantifier without negation

5. Applying De Morgan's Laws for quantifiers, which expression is logically equivalent to $\neg \forall x P(x)$?
    - **A)** ∀x ¬P(x)
    - **B)** ¬∃x P(x)
    - **C)** ∃x P(x)
    - **D)** ∃x ¬P(x)

6. Which quantifier equivalence holds for ALL predicates $P(x)$ and $Q(x)$?
    - **A)** ∀x (P(x) ∨ Q(x)) ≡ ∀x P(x) ∨ ∀x Q(x)
    - **B)** ∀x (P(x) ∧ Q(x)) ≡ ∀x P(x) ∧ ∀x Q(x)
    - **C)** ∃x (P(x) ∧ Q(x)) ≡ ∃x P(x) ∧ ∃x Q(x)
    - **D)** ∀x (P(x) → Q(x)) ≡ ∀x P(x) → ∀x Q(x)

7. Which pair of statements is NOT generally logically equivalent?
    - **A)** ∀x ∀y P(x, y) and ∀y ∀x P(x, y)
    - **B)** ∃x ∃y P(x, y) and ∃y ∃x P(x, y)
    - **C)** ∀x ∃y P(x, y) and ∃y ∀x P(x, y)
    - **D)** ∀x P(x) and P(x₁) ∧ P(x₂) ∧ ... ∧ P(xₙ) over a finite domain

8. Let $C(x)$ mean "$x$ is a CS student" and $S(x)$ mean "$x$ studied". Following the translation guide, how is "All CS students studied" expressed?
    - **A)** ∀x (C(x) ∧ S(x))
    - **B)** ∃x (C(x) → S(x))
    - **C)** ∃x (C(x) ∧ S(x))
    - **D)** ∀x (C(x) → S(x))

9. Using the same predicates $C(x)$ and $S(x)$, how are "Some CS students studied" and "Sarah studied" translated into predicate logic?
    - **A)** ∃x (C(x) ∧ S(x)) and S(Sarah)
    - **B)** ∃x (C(x) → S(x)) and ∀x S(Sarah)
    - **C)** ∀x (C(x) ∧ S(x)) and ∃x S(Sarah)
    - **D)** ∃x (C(x) ∧ S(x)) and ∃Sarah S(Sarah)

10. How does the operator precedence of the quantifiers $\forall$ and $\exists$ compare to propositional logical connectives?
    - **A)** Quantifiers have lower precedence than all propositional logical operators
    - **B)** Quantifiers have higher precedence than the logical operators from propositional calculus
    - **C)** Quantifiers have the same precedence as conjunction and disjunction
    - **D)** Quantifiers have higher precedence than implication only, not negation

### Answer Key & Explanations

1. **C)** A propositional function is not a proposition until all of its variables are assigned specific values or bound by quantifiers.
2. **A)** In $\forall x (P(x) \land Q(y))$, $x$ falls within the scope of $\forall x$ so it is bound, whereas $y$ is not quantified and remains free.
3. **B)** On an empty universe of discourse, $\forall x P(x)$ is vacuously true because no element exists to falsify $P(x)$, whereas $\exists x P(x)$ is false because no element exists to satisfy $P(x)$.
4. **C)** A single counterexample element in the domain for which $P(x)$ evaluates to false suffices to falsify the universal quantification $\forall x P(x)$.
5. **D)** De Morgan's Law for universal quantification states $\neg \forall x P(x) \equiv \exists x \neg P(x)$: "not every $x$ satisfies $P(x)$" means "there exists an $x$ that does not satisfy $P(x)$."
6. **B)** Universal quantification distributes over conjunction ($\forall x (P(x) \land Q(x)) \equiv \forall x P(x) \land \forall x Q(x)$), whereas universal quantification does not distribute over disjunction and existential quantification does not distribute over conjunction.
7. **C)** Same-type nested quantifiers ($\forall x \forall y$ and $\exists x \exists y$) commute, but mixing $\forall$ and $\exists$ makes order critical: $\forall x \exists y P(x, y)$ is generally not equivalent to $\exists y \forall x P(x, y)$.
8. **D)** Universal statements restricting a subject use implication ($\rightarrow$) with the subject predicate as premise: $\forall x (C(x) \rightarrow S(x))$. Using $\land$ would incorrectly assert that every entity in the universe is a CS student.
9. **A)** Existential statements pair the subject with conjunction ($\land$), giving $\exists x (C(x) \land S(x))$, and a specific named individual such as Sarah is passed directly as a parameter without quantifiers: $S(\text{Sarah})$.
10. **B)** As noted under Logical Equivalences with Quantifiers, $\forall$ and $\exists$ have higher precedence than the logical operators from propositional calculus.

## References & Navigation

- **Previous Topic:** [[Equivalences]]
- **Next Topic:** [[Sums and Sequences]]
- **Related Notes:** [[Propositional Logic]], [[Sets]]

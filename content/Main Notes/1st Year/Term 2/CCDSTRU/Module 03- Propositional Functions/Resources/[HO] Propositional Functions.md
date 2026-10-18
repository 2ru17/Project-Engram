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


## References & Navigation

- **Related Notes:** [[Propositional Functions]]

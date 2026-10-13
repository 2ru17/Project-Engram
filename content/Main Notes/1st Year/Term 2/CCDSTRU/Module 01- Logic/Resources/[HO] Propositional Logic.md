---
id: proposition_logic_01
type: note
course: CCDSTRU
topic: Propositional Logic
status: completed
---

# Propositional Logic

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Conceptual]] #[[Propositional Logic]] #[[CCDSTRU]] #[[M1]]

---

## Key Definitions
 **Propositional Logic (or Propositional Calculus):** The area of logic dealing with propositions, developed by Aristotle. **Proposition:** A declarative sentence that is either true or false, but not both. (e.g., "the university is located in Manila.") **Compound Proposition:** Formed by combining one or more existing propositions using logical operators. **Propositional Variables:** Letters used to represent propositions, conventionally lowercase (e.g., $p$, $q$, $r$). **Logical Connectives:** Operators used to form compound propositions.

### Logical Connectives **Negation (Not, $\neg p$):** The opposite truth value of $p$. "It is not the case of $p$." **Conjunction (And, $p \land q$):** True if and only if both $p$ and $q$ are true. **Disjunction (Inclusive-Or, $p \lor q$):** True when either $p$ or $q$ is true. **Exclusive-Or (Xor, $p \oplus q$):** True when either $p$ or $q$ is true, but not both. **Implication (If-Then, $p \rightarrow q$):** Read as "if $p$ then $q$". False only when $p$ is true and $q$ is false. Here, $p$ is the hypothesis/premise, and $q$ is the conclusion/consequence. **Biconditional (If and only if, $p \leftrightarrow q$):** True when both $p$ and $q$ have the same truth value.

## Theoretical Framework

### Implication Variations
Given an implication statement $p \rightarrow q$: **Converse:** $q \rightarrow p$ **Inverse:** $\neg p \rightarrow \neg q$ **Contrapositive:** $\neg q \rightarrow \neg p$

> [!tip] Translation Tips for Implication ($p \rightarrow q$)
> - $p$ is sufficient for $q$
> - $q$ is necessary for $p$
> - $q$ when $p$
> - $q$ whenever $p$
> - $p$ only if $q$
> - $q$ unless $\neg p$
> - $q$ follows from $p$

### Truth Tables Summary

| $p$ | $q$ | Not ($\neg p$) | And ($p \land q$) | Or ($p \lor q$) | Xor ($p \oplus q$) | Implies ($p \rightarrow q$) | Iff ($p \leftrightarrow q$) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| T | T | F | T | T | F | T | T |
| T | F | F | F | T | T | F | F |
| F | T | T | F | T | T | T | F |
| F | F | T | F | F | F | T | T |


## References & Navigation

- **Related Notes:** [[Propositional Logic]]

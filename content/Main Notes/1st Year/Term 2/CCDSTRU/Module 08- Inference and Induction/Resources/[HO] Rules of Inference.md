---
id: rules_of_inference_08
type: note
course: CCDSTRU
topic: Rules of Inference
status: completed
---

# Rules of Inference

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[Logic]] #[[Inference]] #[[CCDSTRU]] #[[M8]]

---

## Important Formulas

An **argument** in propositional logic is a sequence of propositions where all but the last are *premises*, and the final proposition is the *conclusion*. An argument is **valid** if the truth of all premises implies that the conclusion is true.

### Standard Rules of Inference

| Rule of Inference | Name |
| :--- | :--- |
| $p$ <br> $q$ <br> $\therefore p \land q$ | **Conjunction** |
| $p$ <br> $\therefore p \lor q$ | **Addition** |
| $p \land q$ <br> $\therefore p$ | **Simplification** |
| $p \lor q$ <br> $\neg p \lor r$ <br> $\therefore q \lor r$ | **Resolution** |
| $p \rightarrow q$ <br> $q \rightarrow r$ <br> $\therefore p \rightarrow r$ | **Hypothetical Syllogism** |
| $p \lor q$ <br> $\neg p$ <br> $\therefore q$ | **Disjunctive Syllogism** |
| $p$ <br> $p \rightarrow q$ <br> $\therefore q$ | **Modus Ponens** |
| $\neg q$ <br> $p \rightarrow q$ <br> $\therefore \neg p$ | **Modus Tollens** |

### Rules of Inference for Quantified Statements

Let $c \in U$ (the universe of discourse).

| Rule | Description |
| :--- | :--- |
| **Universal Instantiation** | $\forall x P(x) \implies \therefore P(c)$ |
| **Universal Generalization** | $P(c)$ for an arbitrary $c \implies \therefore \forall x P(x)$ |
| **Existential Instantiation** | $\exists x P(x) \implies \therefore P(c)$ for *some* element $c$ |
| **Existential Generalization**| $P(c)$ for *some* element $c \implies \therefore \exists x P(x)$ |

> [!warning] Order of Instantiation
> When dealing with multiple quantified statements, if applicable, use **Existential Instantiation** before **Universal Instantiation** to avoid inadvertently restricting the universe.

## Worked Examples

**Example 1: Using Propositional Logic**
Given:
1. $\neg s \land c$
2. $w \rightarrow s$
3. $\neg w \rightarrow t$
4. $t \rightarrow h$

*Goal: Prove $h$* Step 5: $\neg s$ (Simplification from 1) Step 6: $\neg w$ (Modus Tollens on 5 and 2) Step 7: $\neg w \rightarrow h$ (Hypothetical Syllogism on 3 and 4) Step 8: $h$ (Modus Ponens on 6 and 7)

**Example 2: Using Quantified Logic**
Given:
1. $\forall x(C(x) \rightarrow A(x))$ (Everyone in this class has taken CCSALGE)
2. $C(\text{Tomy})$ (Tomy is a student in this class)

*Goal: Prove $A(\text{Tomy})$* Step 3: $C(\text{Tomy}) \rightarrow A(\text{Tomy})$ (Universal Instantiation on 1, substituting $x$ with Tomy) Step 4: $A(\text{Tomy})$ (Modus Ponens on 2 and 3)


## References & Navigation

- **Related Notes:** [[Rules of Inference and Induction]]

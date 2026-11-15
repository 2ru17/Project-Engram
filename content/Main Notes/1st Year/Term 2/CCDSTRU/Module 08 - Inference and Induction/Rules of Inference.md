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

## Multiple Choice Questions

1. In propositional logic, when is an argument consisting of premises and a conclusion considered **valid**?
    - **A)** Whenever the conclusion is a tautology regardless of the premises
    - **B)** When the truth of all premises implies that the conclusion is true
    - **C)** Whenever at least one premise is true and the conclusion is contingent
    - **D)** When all premises are negated prior to applying Modus Ponens

2. Which rule of inference derives $\neg p$ from the premises $\neg q$ and $p \rightarrow q$?
    - **A)** Modus Ponens
    - **B)** Disjunctive Syllogism
    - **C)** Modus Tollens
    - **D)** Hypothetical Syllogism

3. Given the premises $p \lor q$ and $\neg p \lor r$, what conclusion follows directly from the **Resolution** rule?
    - **A)** q ∨ r
    - **B)** p ∧ r
    - **C)** q ∧ r
    - **D)** ¬q ∨ r

4. Which option accurately pairs the **Addition** and **Simplification** rules of inference?
    - **A)** Addition: from p ∧ q infer p; Simplification: from p infer p ∨ q
    - **B)** Addition: from p and q infer p ∧ q; Simplification: from p ∨ q and ¬p infer q
    - **C)** Addition: from p → q and q → r infer p → r; Simplification: from p ∧ q infer p
    - **D)** Addition: from p infer p ∨ q; Simplification: from p ∧ q infer p

5. Given the premises $p \lor q$ and $\neg p$, which rule of inference concludes $q$?
    - **A)** Resolution
    - **B)** Disjunctive Syllogism
    - **C)** Conjunction
    - **D)** Modus Tollens

6. In Worked Example 1, which rule derives Step 7 ($\neg w \rightarrow h$) from Step 3 ($\neg w \rightarrow t$) and Step 4 ($t \rightarrow h$)?
    - **A)** Modus Ponens
    - **B)** Modus Tollens
    - **C)** Hypothetical Syllogism
    - **D)** Simplification

7. In Worked Example 1, after deriving $\neg s$ from $\neg s \land c$, which rule infers $\neg w$ from $\neg s$ and Premise 2 ($w \rightarrow s$)?
    - **A)** Modus Ponens
    - **B)** Disjunctive Syllogism
    - **C)** Resolution
    - **D)** Modus Tollens

8. What condition must element $c \in U$ satisfy to apply **Universal Generalization** ($P(c) \implies \therefore \forall x P(x)$)?
    - **A)** c must be an arbitrary element of the universe U
    - **B)** c must be a single specific witness produced by Existential Instantiation
    - **C)** c must be proven false via a counterexample first
    - **D)** U must be empty so that the generalization holds vacuously

9. When handling multiple quantified statements, in what order should instantiation rules be applied, and why?
    - **A)** Universal Instantiation before Existential Instantiation, to bind all variables simultaneously
    - **B)** Universal Generalization before Existential Instantiation, to keep c arbitrary
    - **C)** Existential Instantiation before Universal Instantiation, to avoid inadvertently restricting the universe
    - **D)** The order never affects validity because ∀ and ∃ always commute

10. In Worked Example 2 (premises $\forall x (C(x) \rightarrow A(x))$ and $C(\text{Tomy})$, goal $A(\text{Tomy})$), which sequence of inference rules completes the proof?
    - **A)** Existential Instantiation followed by Modus Tollens
    - **B)** Universal Instantiation followed by Modus Ponens
    - **C)** Universal Generalization followed by Hypothetical Syllogism
    - **D)** Existential Generalization followed by Modus Ponens

### Answer Key & Explanations

1. **B)** By definition, an argument is valid if the truth of all its premises implies that the conclusion is true.
2. **C)** Modus Tollens takes $\neg q$ and $p \rightarrow q$ as premises and infers $\neg p$.
3. **A)** Resolution combines $p \lor q$ and $\neg p \lor r$ by eliminating the complementary literals $p$ and $\neg p$, yielding $q \lor r$.
4. **D)** Addition introduces a disjunct ($p \therefore p \lor q$), whereas Simplification extracts a conjunct from a conjunction ($p \land q \therefore p$).
5. **B)** Disjunctive Syllogism takes $p \lor q$ and $\neg p$ and infers the remaining disjunct $q$.
6. **C)** Hypothetical Syllogism chains two implications ($\neg w \rightarrow t$ and $t \rightarrow h$) into $\neg w \rightarrow h$.
7. **D)** Given $\neg s$ (Step 5) and $w \rightarrow s$ (Premise 2), Modus Tollens infers $\neg w$ (Step 6).
8. **A)** Universal Generalization requires proving $P(c)$ for an *arbitrary* element $c \in U$ before generalizing to $\forall x P(x)$.
9. **C)** As warned under Order of Instantiation, Existential Instantiation should be applied before Universal Instantiation to avoid inadvertently restricting the universe of discourse.
10. **B)** Worked Example 2 first applies Universal Instantiation to $\forall x(C(x) \rightarrow A(x))$ with $x = \text{Tomy}$ to obtain $C(\text{Tomy}) \rightarrow A(\text{Tomy})$, and then applies Modus Ponens with $C(\text{Tomy})$ to conclude $A(\text{Tomy})$.

## References & Navigation

- **Previous Topic:** [[Matrices Detailed]]
- **Next Topic:** [[Mathematical Induction]]
- **Related Notes:** [[Propositional Logic]], [[Mathematical Induction]]

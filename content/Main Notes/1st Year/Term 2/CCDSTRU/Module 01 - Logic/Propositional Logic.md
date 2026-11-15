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

**Tags:** #[[Conceptual]] #[[Propositional Logic]] #[[CCDSTRU]] #[[M1]]

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

## Multiple Choice Questions

1. Which of the following sentences qualifies as a proposition in propositional logic?
    - **A)** What time does the lecture start?
    - **B)** Please submit the assignment before midnight.
    - **C)** The university is located in Manila.
    - **D)** x + 5 = 12 where x is an unspecified variable

2. Under which truth-value assignment of $p$ and $q$ is the implication $p \rightarrow q$ false?
    - **A)** When p is true and q is false
    - **B)** When p is false and q is true
    - **C)** When both p and q are false
    - **D)** When both p and q are true

3. When $p$ is true and $q$ is true, how do inclusive disjunction ($p \lor q$) and exclusive-or ($p \oplus q$) evaluate?
    - **A)** Both evaluate to false
    - **B)** Both evaluate to true
    - **C)** Inclusive-or evaluates to false, while exclusive-or evaluates to true
    - **D)** Inclusive-or evaluates to true, while exclusive-or evaluates to false

4. Given the implication $p \rightarrow q$, which proposition represents its contrapositive?
    - **A)** q → p
    - **B)** ¬q → ¬p
    - **C)** ¬p → ¬q
    - **D)** ¬p → q

5. Which English phrasing translates the implication $p \rightarrow q$?
    - **A)** p is necessary for q
    - **B)** q is sufficient for p
    - **C)** p only if q
    - **D)** p whenever q

6. Using the translation tips for implication, how is the statement "$q$ unless $\neg p$" expressed in propositional logic?
    - **A)** q → ¬p
    - **B)** ¬p → q
    - **C)** q → p
    - **D)** p → q

7. Based on the truth table for the biconditional ($p \leftrightarrow q$), when does $p \leftrightarrow q$ evaluate to true?
    - **A)** Only when p is true and q is true
    - **B)** Whenever p and q have the same truth value (both true or both false)
    - **C)** Whenever p and q have opposite truth values
    - **D)** Whenever p is false, regardless of the value of q

8. Suppose $p$ is false and $q$ is false. What are the truth values of $(p \oplus q)$ and $(p \rightarrow q)$, respectively?
    - **A)** False and True
    - **B)** True and False
    - **C)** False and False
    - **D)** True and True

9. Given the implication "If a circuit receives power ($p$), then the LED turns on ($q$)", which statement represents its inverse?
    - **A)** If the LED turns on, then the circuit receives power.
    - **B)** If the LED does not turn on, then the circuit does not receive power.
    - **C)** If the circuit does not receive power, then the LED does not turn on.
    - **D)** If the circuit receives power, then the LED does not turn on.

10. In the implication $p \rightarrow q$, what roles do $p$ and $q$ play, and how are propositional variables conventionally written?
    - **A)** p is the conclusion, q is the hypothesis, and propositional variables use uppercase letters
    - **B)** p is the hypothesis, q is the conclusion, and propositional variables use lowercase letters
    - **C)** Both p and q are conclusions, and propositional variables use Greek letters
    - **D)** p is the consequence, q is the premise, and propositional variables use lowercase letters

### Answer Key & Explanations

1. **C)** A proposition is a declarative sentence that is either true or false, but not both; "The university is located in Manila." is declarative with a definite truth value, whereas questions, commands, and expressions with unassigned variables are not propositions.
2. **A)** By the definition and truth table of implication ($p \rightarrow q$), it is false only when the hypothesis $p$ is true and the conclusion $q$ is false.
3. **D)** Inclusive disjunction ($p \lor q$) is true when either or both operands are true, whereas exclusive-or ($p \oplus q$) is true when one operand is true but not both, making $p \oplus q$ false when $p = T$ and $q = T$.
4. **B)** Given $p \rightarrow q$, the contrapositive negates and swaps both parts to form $\neg q \rightarrow \neg p$, whereas $q \rightarrow p$ is the converse and $\neg p \rightarrow \neg q$ is the inverse.
5. **C)** "$p$ only if $q$" translates directly to $p \rightarrow q$, whereas "$p$ is necessary for $q$", "$q$ is sufficient for $p$", and "$p$ whenever $q$" all translate to the converse $q \rightarrow p$.
6. **D)** According to the implication translation rules, "$q$ unless $\neg p$" means that if $\neg p$ does not hold (i.e., if $p$ holds), then $q$ must hold, which is $p \rightarrow q$.
7. **B)** From the biconditional truth table, $p \leftrightarrow q$ evaluates to true when $(p, q)$ is either $(T, T)$ or $(F, F)$, meaning both propositions share the same truth value.
8. **A)** Looking at the $(F, F)$ row of the truth tables summary, $p \oplus q$ evaluates to $F$ while $p \rightarrow q$ evaluates to $T$.
9. **C)** The inverse of $p \rightarrow q$ is $\neg p \rightarrow \neg q$, which negates both the hypothesis and conclusion without swapping them: "If the circuit does not receive power, then the LED does not turn on."
10. **B)** In $p \rightarrow q$, $p$ is the hypothesis (premise) and $q$ is the conclusion (consequence), and propositional variables are conventionally denoted by lowercase letters such as $p$, $q$, and $r$.

## References & Navigation

- **Previous Topic:** None
- **Next Topic:** [[Equivalences]]
- **Related Notes:** [[Propositional Functions]], [[Rules of Inference]]

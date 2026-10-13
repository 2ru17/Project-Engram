---
id: equivalences_01
type: note
course: CCDSTRU
topic: Equivalences
status: completed
---

# Equivalences

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Problem Solving]] #[[Equivalences]] #[[CCDSTRU]] #[[Logic]] #[[M1]]

---

## Important Formulas

### Logical Equivalence Rules
Compound propositions whose truth values are the same for all possible cases are said to be logically equivalent ($p \equiv q$ or $p \Leftrightarrow q$).

**Identity Laws:** $p \land T \equiv p$ $p \lor F \equiv p$

**Domination Laws:** $p \land F \equiv F$ $p \lor T \equiv T$

**Negation Laws:** $p \land \neg p \equiv F$ $p \lor \neg p \equiv T$

**Idempotent Laws:** $p \land p \equiv p$ $p \lor p \equiv p$

**Involution Law:** $\neg(\neg p) \equiv p$

**De Morgan's Laws:** $\neg(p \land q) \equiv \neg p \lor \neg q$ $\neg(p \lor q) \equiv \neg p \land \neg q$

**Commutative Laws:** $p \land q \equiv q \land p$ $p \lor q \equiv q \lor p$

**Associative Laws:** $p \land (q \land r) \equiv (p \land q) \land r$ $p \lor (q \lor r) \equiv (p \lor q) \lor r$

**Distributive Laws:** $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$

**Absorption Laws:** $p \land (p \lor q) \equiv p$ $p \lor (p \land q) \equiv p$

**Material Implication Laws:** $p \rightarrow q \equiv \neg p \lor q$

**Material Equivalence Laws:** $p \leftrightarrow q \equiv (p \rightarrow q) \land (q \rightarrow p)$ $p \leftrightarrow q \equiv (p \land q) \lor (\neg p \land \neg q)$

## Worked Examples

### Definitions of Truth Value Types **Tautology (Fact):** A compound proposition whose truth value is always true. **Contradiction (Fallacy):** A compound proposition whose truth value is always false. **Contingency:** A compound proposition whose truth value is not a tautology nor a contradiction.

> [!tip] Verification
> You can verify equivalence pairs (e.g., $p \rightarrow q$ and $\neg q \rightarrow \neg p$) using Rules of Logical Equivalences or by constructing truth tables and verifying that their outputs match for all possible truth assignments of their variables.


## References & Navigation

- **Related Notes:** [[Propositional Logic]]

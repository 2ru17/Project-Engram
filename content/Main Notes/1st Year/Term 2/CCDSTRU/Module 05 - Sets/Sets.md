---
id: sets_05
type: note
course: CCDSTRU
topic: Sets
status: completed
---
# Sets

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[Sets]] #[[Set Theory]] #[[CCDSTRU]] #[[M5]]

---

## Important Formulas & Concepts

### Set Basics **Set:** An unordered collection of objects (elements or members). $a \in A$: $a$ is an element of set $A$. $a \notin A$: $a$ is not an element of set $A$.

### Important Sets $\mathbb{N}$: Natural numbers $\{0, 1, 2, 3, \dots\}$ (0 may or may not be included depending on convention). $\mathbb{Z}$: Integers $\{\dots, -2, -1, 0, 1, 2, \dots\}$. $\mathbb{Z}^+$: Positive integers $\{1, 2, 3, \dots\}$. $\mathbb{Z}^-$: Negative integers $\{\dots, -3, -2, -1\}$. $\mathbb{Q}$: Rational numbers $\{ p/q \mid p \in \mathbb{Z} \land q \in \mathbb{Z} \land q \neq 0 \}$. $\mathbb{C}$: Complex numbers.

### Set Relationships **Equal Sets ($A = B$):** Have the exact same elements. $\forall x (x \in A \leftrightarrow x \in B)$. Order and repetition do not matter. **Empty Set / Null Set ($\emptyset$ or $\{\}$):** A set containing no elements. Note that $\emptyset \neq \{\emptyset\}$. **Singleton Set:** A set containing exactly one element. **Cardinality ($|S|$):** The number of *distinct* elements in a set $S$. **Subset ($A \subseteq B$):** Every element of $A$ is in $B$. $\forall x (x \in A \rightarrow x \in B)$. **Proper Subset ($A \subset B$):** $A \subseteq B$ but $A \neq B$. $\forall x (x \in A \rightarrow x \in B) \land \exists x (x \in B \land x \notin A)$.

> [!tip] Note on Empty Set
> $\emptyset$ is a subset of all sets, and a set is always a subset of itself ($S \subseteq S$).

### Advanced Set Operations **Power Set ($P(S)$):** The set of all subsets of $S$.
Size of Power Set: $|P(S)| = 2^{|S|}$ **Cartesian Product ($A \times B$):** The set of all ordered pairs $(a, b)$, such that $a \in A \land b \in B$.
$|A \times B| = |A||B|$.
$A \times B \neq B \times A$ unless $A = \emptyset$, $B = \emptyset$, or $A = B$.

## Worked Examples

### Basic Set Operations
Let $A$ and $B$ be sets within a universe $U$. **Union ($A \cup B$):** $\{ x \mid x \in A \lor x \in B \}$ **Intersection ($A \cap B$):** $\{ x \mid x \in A \land x \in B \}$ (If $A \cap B = \emptyset$, $A$ and $B$ are disjoint). **Difference ($A - B$):** $\{ x \mid x \in A \land x \notin B \}$ **Complement ($\bar{A}$):** $\{ x \in U \mid x \notin A \}$

### Set Identities **Identity Laws:** $A \cap U = A$, $A \cup \emptyset = A$ **Domination Laws:** $A \cap \emptyset = \emptyset$, $A \cup U = U$ **Idempotent Laws:** $A \cap A = A$, $A \cup A = A$ **Complement Laws:** $A \cap \bar{A} = \emptyset$, $A \cup \bar{A} = U$ **Complementation Law:** $\bar{\bar{A}} = A$ **De Morgan's Laws:** $\overline{A \cap B} = \bar{A} \cup \bar{B}$, $\overline{A \cup B} = \bar{A} \cap \bar{B}$ **Commutative Laws:** $A \cap B = B \cap A$, $A \cup B = B \cup A$ **Associative Laws:** $A \cap (B \cap C) = (A \cap B) \cap C$, $A \cup (B \cup C) = (A \cup B) \cup C$ **Distributive Laws:**
$A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$
$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ **Absorption Laws:** $A \cap (A \cup C) = A$, $A \cup (A \cap C) = A$

> [!tip] Difference Law
> Often useful in derivations: $A - B = A \cap \bar{B}$.

## Multiple Choice Questions

1. Why is the statement $\emptyset = \{\emptyset\}$ false?
    - **A)** ∅ has cardinality 0, whereas {∅} is a singleton set containing one element
    - **B)** ∅ is not a subset of {∅}
    - **C)** Repeated elements change the cardinality of ∅
    - **D)** {∅} represents the universal set U

2. Let $A = \{1, 2, 2, 3\}$ and $B = \{3, 1, 2\}$. What is $|A|$, and is $A = B$?
    - **A)** |A| = 4, and A ≠ B
    - **B)** |A| = 3, and A = B
    - **C)** |A| = 3, and A ≠ B because the order differs
    - **D)** |A| = 4, and A = B

3. Which quantified statement accurately defines a **proper subset** $A \subset B$?
    - **A)** ∀x (x ∈ A ↔ x ∈ B)
    - **B)** ∀x (x ∈ B → x ∈ A)
    - **C)** ∀x (x ∈ A → x ∈ B) ∧ ∃x (x ∈ B ∧ x ∉ A)
    - **D)** ∀x (x ∈ A → x ∈ B) ∧ ∃x (x ∈ A ∧ x ∉ B)

4. If a finite set $S$ has cardinality $|S| = 4$, what is the cardinality of its power set $|P(S)|$?
    - **A)** 4
    - **B)** 8
    - **C)** 12
    - **D)** 16

5. Under which exact condition does $A \times B = B \times A$ hold for sets $A$ and $B$?
    - **A)** Whenever |A| = |B|
    - **B)** When A = ∅, B = ∅, or A = B
    - **C)** Only when A and B are disjoint (A ∩ B = ∅)
    - **D)** Whenever A ⊆ B

6. If $|A| = 3$ and $|B| = 5$, how many ordered pairs are contained in the Cartesian product $A \times B$?
    - **A)** 8
    - **B)** 2⁸
    - **C)** 15
    - **D)** 3⁵

7. When are two sets $A$ and $B$ called **disjoint**?
    - **A)** When A ∩ B = ∅
    - **B)** When A ∪ B = ∅
    - **C)** When A ⊆ B and B ⊆ A
    - **D)** When A - B = B - A

8. According to the Difference Law, which set expression is equivalent to $A - B$ within universe $U$?
    - **A)** A ∪ (complement of B)
    - **B)** (complement of A) ∩ B
    - **C)** B ∩ (complement of A)
    - **D)** A ∩ (complement of B)

9. Applying De Morgan's Laws for sets, what is the complement of $A \cup B$?
    - **A)** (complement of A) ∪ (complement of B)
    - **B)** (complement of A) ∩ (complement of B)
    - **C)** A ∩ (complement of B)
    - **D)** complement of (A ∩ B)

10. Which set-builder description correctly defines the set of rational numbers $\mathbb{Q}$?
    - **A)** {p/q | p ∈ ℤ ∧ q ∈ ℤ ∧ q ≠ 0}
    - **B)** {p/q | p ∈ ℕ ∧ q ∈ ℕ}
    - **C)** {p/q | p ∈ ℤ⁺ ∧ q ∈ ℤ⁻}
    - **D)** {x | x ∈ ℤ ∧ x > 0}

### Answer Key & Explanations

1. **A)** The empty set $\emptyset$ contains zero elements, whereas $\{\emptyset\}$ is a singleton set containing one element (namely $\emptyset$), so $\emptyset \neq \{\emptyset\}$.
2. **B)** For sets, order and repetition do not affect membership or cardinality; $A$ has three distinct elements $\{1, 2, 3\}$ and shares the exact same elements as $B$, so $|A| = 3$ and $A = B$.
3. **C)** A proper subset $A \subset B$ requires $A \subseteq B$ ($\forall x (x \in A \rightarrow x \in B)$) and $A \neq B$, meaning there exists at least one element in $B$ that is not in $A$ ($\exists x (x \in B \land x \notin A)$).
4. **D)** The cardinality of the power set $P(S)$ is $|P(S)| = 2^{|S|}$; for $|S| = 4$, $|P(S)| = 2^4 = 16$.
5. **B)** Because Cartesian products form ordered pairs, $A \times B \neq B \times A$ in general; equality holds only when $A = \emptyset$, $B = \emptyset$, or $A = B$.
6. **C)** The size of a Cartesian product is $|A \times B| = |A||B|$, giving $3 \times 5 = 15$ ordered pairs.
7. **A)** Two sets $A$ and $B$ are disjoint if they have no elements in common, which means $A \cap B = \emptyset$.
8. **D)** The Difference Law expresses $A - B$ (elements in $A$ and not in $B$) as $A \cap \bar{B}$.
9. **B)** De Morgan's Law for union states $\overline{A \cup B} = \bar{A} \cap \bar{B}$, switching union to intersection when taking the complement.
10. **A)** The set of rational numbers $\mathbb{Q}$ consists of all ratios $p/q$ where both $p$ and $q$ are integers ($\mathbb{Z}$) and the denominator $q \neq 0$.

## References & Navigation

- **Previous Topic:** [[Sums and Sequences]]
- **Next Topic:** [[Functions]]
- **Related Notes:** [[Relations]], [[Propositional Functions]]

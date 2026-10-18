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


## References & Navigation

- **Related Notes:** [[Sets]]

---
id: Handout_13_-_Binary_Search_Trees_(BST)
type: note
course: CCDSALG
topic: Binary Search Trees (BST)
status: completed
---

# Binary Search Trees (BST)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Binary Search Trees (BST)]] #[[Conceptual]] #[[M5]]

---

## Overview

Binary Search Trees (BST) are binary trees that maintain a specific property: for any node $x$, the keys in its left subtree are less than or equal to $x$'s key, and keys in its right subtree are greater than or equal to $x$'s key. The document details core BST operations including search, finding minimum/maximum, finding predecessor/successor, insertion, and deletion.

## Important Formulas

**BST Invariant:**
$$\forall y \in \text{LeftSubtree}(x), \; \text{key}(y) \le \text{key}(x) \quad \text{and} \quad \forall z \in \text{RightSubtree}(x), \; \text{key}(z) \ge \text{key}(x)$$

**Time Complexity:**
- Search / Minimum / Maximum: $O(h)$ where $h$ is tree height ($\Theta(\log n)$ balanced, $O(n)$ skewed)
- Insertion / Deletion: $O(h)$
- In-Order Traversal: $\Theta(n)$ (yields strictly monotonically increasing sorted keys)

## Theoretical Framework: BST Deletion Decision Logic

```mermaid
flowchart TD
    Find["Locate node z to delete"] --> CheckChildren{"Number of children of z?"}
    CheckChildren -- "0 Children (Leaf)" --> Case0["Case 1: Simply unlink z from parent<br/>(set parent pointer to null)"]
    CheckChildren -- "1 Child" --> Case1["Case 2: Splice z out, link parent directly to child of z"]
    CheckChildren -- "2 Children" --> Case2["Case 3: Find in-order successor y = TREE-MINIMUM(z.right)"]
    Case2 --> SuccCheck{"Is y the immediate right child of z?"}
    SuccCheck -- "Yes" --> ReplaceY1["Replace z with y, attaching z.left to y"]
    SuccCheck -- "No" --> ReplaceY2["1. Replace y with y.right in right subtree<br/>2. Replace z with y, attaching both z.left and z.right to y"]
```

### Visual Trace: Case 3 Deletion (Two Children)

```mermaid
graph TD
    subgraph Before["Before Deletion of Key 50 (z)"]
        R50["50 [z: to delete]"] --> L30["30"]
        R50 --> R70["70"]
        L30 --> L20["20"]
        L30 --> L40["40"]
        R70 --> R60["60 [y: In-order Successor]"]
        R70 --> R80["80"]
        R60 --> R65["65 [y.right]"]
    end

    subgraph After["After Deletion (Successor 60 spliced into z position)"]
        R60_new["60 [y: Promoted Root]"] --> L30_b["30"]
        R60_new --> R70_b["70"]
        L30_b --> L20_b["20"]
        L30_b --> L40_b["40"]
        R70_b --> R65_b["65 [Relinked as left child of 70]"]
        R70_b --> R80_b["80"]
    end
```

## Worked Examples

1. **Deletion Cases:**
   - **Case 1 (Leaf):** Delete node 20. Parent 30 sets its left child pointer to `null`.
   - **Case 2 (Single Child):** Delete node 70 if 80 were its only child. 50 updates its right pointer directly to 80.
   - **Case 3 (Two Children):** Delete node 50. In-order successor is the minimum node in right subtree (60). Successor 60 takes the place of 50, and 60's right child (65) is spliced to where 60 was.


## References & Navigation

- **Related Notes:** [[Binary Search Trees]]

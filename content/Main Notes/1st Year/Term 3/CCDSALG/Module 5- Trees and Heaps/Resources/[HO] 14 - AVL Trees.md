---
id: Handout_14_-_AVL_Trees
type: note
course: CCDSALG
topic: AVL Trees
status: completed
---

# AVL Trees

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[AVL Trees]] #[[Conceptual]] #[[M5]]

---

## Overview

AVL Trees, named after Adelson-Velskii and Landis, are height-balanced binary search trees. For every node, the heights of its left and right subtrees differ by at most 1. This balancing ensures that search, insert, and delete operations execute in $O(\log n)$ time. Insertions and deletions that violate the balance property are fixed using rotations.

## Important Formulas

**Balance Factor:**
$$BF(x) = \text{Height}(x.\text{left}) - \text{Height}(x.\text{right})$$

**AVL Invariant:**
$$\forall x \in T, \quad |BF(x)| \le 1 \iff BF(x) \in \{-1, 0, 1\}$$

**Time Complexity:**
- Search: $O(\log n)$
- Insertion: $O(\log n)$ (at most 1 single or double rotation to restore balance)
- Deletion: $O(\log n)$ (may require up to $O(\log n)$ rotations propagating to the root)

## Theoretical Framework: The Four Rotation Cases

```mermaid
flowchart TD
    Detect["Node z is unbalanced: |BF(z)| > 1"] --> CheckBF{"BF(z) > 1 (Left Heavy)?"}
    CheckBF -- "Yes (BF = +2)" --> CheckChildL{"BF(z.left) >= 0?"}
    CheckChildL -- "Yes (Left-Left)" --> RotR["Single Right Rotation: rotateRight(z)"]
    CheckChildL -- "No (Left-Right)" --> RotLR["Double LR Rotation:<br/>1. rotateLeft(z.left)<br/>2. rotateRight(z)"]
    CheckBF -- "No (BF = -2)" --> CheckChildR{"BF(z.right) <= 0?"}
    CheckChildR -- "Yes (Right-Right)" --> RotL["Single Left Rotation: rotateLeft(z)"]
    CheckChildR -- "No (Right-Left)" --> RotRL["Double RL Rotation:<br/>1. rotateRight(z.right)<br/>2. rotateLeft(z)"]
```

### 1. Single Rotations (LL and RR)

#### Left-Left (LL) Case: Right Rotation on z
Triggered when a node is inserted into the left subtree of the left child.

```mermaid
graph TD
    subgraph Before_LL["LL Imbalance at z (BF = +2)"]
        z1["z (k3) [BF=+2]"] --> y1["y (k2) [BF=+1]"]
        z1 --> T4["T4 (height h)"]
        y1 --> x1["x (k1) [BF=0]"]
        y1 --> T3["T3 (height h)"]
        x1 --> T1["T1 (height h)"]
        x1 --> T2["T2 (height h)"]
    end

    subgraph After_LL["After rotateRight(z) (Balanced)"]
        y2["y (k2) [BF=0]"] --> x2["x (k1) [BF=0]"]
        y2 --> z2["z (k3) [BF=0]"]
        x2 --> T1_b["T1 (height h)"]
        x2 --> T2_b["T2 (height h)"]
        z2 --> T3_b["T3 (height h)"]
        z2 --> T4_b["T4 (height h)"]
    end
```

### 2. Double Rotations (LR and RL)

#### Left-Right (LR) Case: rotateLeft(y) followed by rotateRight(z)
Triggered when a node is inserted into the right subtree of the left child.

```mermaid
graph TD
    subgraph Before_LR["LR Imbalance at z (BF = +2)"]
        z_lr["z (k3) [BF=+2]"] --> y_lr["y (k1) [BF=-1]"]
        z_lr --> T4_lr["T4 (height h)"]
        y_lr --> T1_lr["T1 (height h)"]
        y_lr --> x_lr["x (k2) [BF=0]"]
        x_lr --> T2_lr["T2 (height h-1)"]
        x_lr --> T3_lr["T3 (height h-1)"]
    end

    subgraph Step1_LR["Step 1: rotateLeft(y) -> LL Shape"]
        z_s1["z (k3) [BF=+2]"] --> x_s1["x (k2) [BF=+1]"]
        z_s1 --> T4_s1["T4 (height h)"]
        x_s1 --> y_s1["y (k1) [BF=0]"]
        x_s1 --> T3_s1["T3 (height h-1)"]
        y_s1 --> T1_s1["T1 (height h)"]
        y_s1 --> T2_s1["T2 (height h-1)"]
    end

    subgraph Step2_LR["Step 2: rotateRight(z) -> Perfectly Balanced"]
        x_s2["x (k2) [BF=0]"] --> y_s2["y (k1) [BF=0]"]
        x_s2 --> z_s2["z (k3) [BF=0]"]
        y_s2 --> T1_s2["T1 (height h)"]
        y_s2 --> T2_s2["T2 (height h-1)"]
        z_s2 --> T3_s2["T3 (height h-1)"]
        z_s2 --> T4_s2["T4 (height h)"]
    end
```

## Worked Examples

1. **Concrete Insertion Trace: Keys [30, 20, 10, 40, 50, 25]**
   - Insert 30, 20: Tree is balanced.
   - Insert 10: Node 30 has $BF = +2$, left child 20 has $BF = +1$. **LL Case**. Single right rotation on 30 makes 20 the root with left child 10 and right child 30.
   - Insert 40: Right child of 30.
   - Insert 50: Node 30 has $BF = -2$, right child 40 has $BF = -1$. **RR Case**. Single left rotation on 30 makes 40 the parent of 30 and 50.
   - Insert 25: Node 20 has $BF = -2$, right child 40 has $BF = +1$. **RL Case**. Double rotation: right rotation on 40, followed by left rotation on 20. Middle key 30 becomes the new root.


## References & Navigation

- **Related Notes:** [[AVL Trees]]

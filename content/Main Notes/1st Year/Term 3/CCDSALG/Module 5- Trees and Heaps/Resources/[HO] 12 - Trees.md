---
id: Handout_12_-_Trees
type: note
course: CCDSALG
topic: Trees
status: completed
---

# Trees

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Trees]] #[[Conceptual]] #[[M5]]

---

## Overview

The document defines trees as connected, acyclic, undirected graphs. It introduces rooted trees, binary trees, and complete $k$-ary trees, along with terminology like root, leaf, internal node, ancestor, descendant, depth, and height. It also covers tree traversal algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS), focusing specifically on inorder, preorder, and postorder tree walks.

## Important Formulas

**Leaves in a complete $k$-ary tree of height $h$:** $k^h$
**Height of a complete $k$-ary tree with $n$ leaves:** $\log_k n$
**Nodes in a complete $k$-ary tree with height $h$:** $\sum_{j=0}^{h} k^j$

## Worked Examples

1. **Inorder Walk:** Visits left subtree, root, then right subtree. Produces a sorted list of keys for a Binary Search Tree.
2. **Preorder Walk:** Visits root, left subtree, then right subtree.
3. **Postorder Walk:** Visits left subtree, right subtree, then root.


## References & Navigation

- **Related Notes:** [[Trees]]

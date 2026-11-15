---
id: ccdsalg_trees
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


## Multiple Choice Questions

1. Which graph-theoretic definition accurately characterizes a tree?
    - **A)** A directed graph containing at least one simple cycle
    - **B)** A connected, acyclic, undirected graph
    - **C)** A disconnected undirected graph with equal in-degree and out-degree
    - **D)** A complete graph where every pair of distinct vertices is adjacent

2. In a complete $k$-ary tree of height $h$, how many leaves exist and what is the height of a complete $k$-ary tree with $n$ leaves?
    - **A)** k·h leaves, with height h = n / k
    - **B)** 2^h leaves, with height h = log2(n) regardless of k
    - **C)** k^h leaves, with height h = log_k(n)
    - **D)** k^(h+1) leaves, with height h = k^n

3. Which expression gives the total number of nodes in a complete $k$-ary tree of height $h$?
    - **A)** ∑ (j = 0 to h) k^j
    - **B)** ∑ (j = 1 to h) j·k
    - **C)** k^h - 1
    - **D)** h · k^(h-1)

4. Which DFS tree traversal order visits the left subtree first, then the right subtree, and finally the root?
    - **A)** Inorder walk
    - **B)** Preorder walk
    - **C)** Breadth-first search
    - **D)** Postorder walk

5. Which tree walk visits the left subtree, then the root, then the right subtree, and produces a sorted list of keys for a Binary Search Tree?
    - **A)** Preorder walk
    - **B)** Inorder walk
    - **C)** Postorder walk
    - **D)** Level-order walk

### Answer Key & Explanations

1. **B)** As defined in the Overview, a tree is a connected, acyclic, undirected graph.
2. **C)** From Important Formulas, a complete $k$-ary tree of height $h$ has $k^h$ leaves, and a complete $k$-ary tree with $n$ leaves has height $\log_k n$.
3. **A)** The total number of nodes across levels $0$ through $h$ in a complete $k$-ary tree of height $h$ is given by $\sum_{j=0}^{h} k^j$.
4. **D)** As listed in Worked Examples, a postorder walk visits the left subtree, then the right subtree, and finally the root (whereas preorder visits the root first).
5. **B)** An inorder walk visits the left subtree, root, then right subtree, which yields a sorted sequence of keys when applied to a Binary Search Tree.

## References & Navigation

- **Previous Topic:** [[Hash Tables]]
- **Next Topic:** [[Binary Search Trees (BST)]]
- **Related Notes:** [[Binary Search Trees (BST)]], [[AVL Trees]], [[Heaps]]

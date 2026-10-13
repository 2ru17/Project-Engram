---
id: csalgcm_ps_magician_08_preorder
type: problem_set
course: CSALGCM
topic: "Tree Preorder Traversal"
status: solved
difficulty: Easy
hackerrank_domain: Trees
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Trees]] #[[Recursion]] #[[DFS]]

---

---

# Tree: Preorder Traversal

## Problem Description
Given a pointer to the root of a binary tree, print the values of its nodes in a **Preorder Traversal** format as a single line of space-separated values.

**Input Format:**
NEED HELP?
Our test code passes the root node of a binary tree to the preOrder function.

**Output Format:**
    
Print the tree's preorder traversal as a single line of space-separated values.
                                                                                                                M O R E D E TA I LS

**Constraints:**
 View discussions$
$
    Nodes in the tree                                                                                            View top submissions$
                                                                                                                RATE THIS CHALLENGE$

**Sample:**
| Input | Output |
|-------|--------|
| ` Download problem statement<br>          1<br>           \                                                                                                     Download all test cases<br>            2<br>                                                                                                                 Suggest Edits<br>             \<br>              5<br>             / \<br>            3   6<br>             \<br>              4` | `1 2 5 3 4 6` |

---

## Approach & Intuition
The task is to traverse a binary tree and print its node values using a **Preorder Traversal**. In tree terminology, "Pre" refers to when we process the parent root node relative to its children. Therefore, Preorder means:
1. Process the **Root** (the current node).
2. Traverse the **Left** subtree.
3. Traverse the **Right** subtree.

Because a tree is a recursive data structure (every child node is itself the root of a smaller subtree), the most intuitive way to implement this traversal is through **Recursion** (Depth-First Search). 
Here is how the C++ function accomplishes this:
1. **Base Case:** The function `preOrder(Node *root)` first checks if the current `root` is `NULL`. If it is, it means we have hit the bottom of a branch (a leaf's empty child), so we simply `return` to stop the recursion.
2. **Visit Node:** Following the Preorder sequence, we immediately print the data of the current node (`cout << root->data << " "`).
3. **Traverse Left:** We recursively call `preOrder(root->left)`. This will continuously dive down the left-most edge of the tree, printing nodes as it goes, until it hits `NULL`.
4. **Traverse Right:** Once a left subtree is fully exhausted, the function unpauses and recursively calls `preOrder(root->right)`, repeating the exact same process for the right subtree.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N)$** — The recursive function visits every single node in the tree exactly once. The work done at each node (printing a value and making two recursive calls) is $O(1)$. Therefore, the time scales linearly with $N$, the total number of nodes. |
| **Space** | **$O(H)$** — We do not use any explicit data structures, but the recursive call stack takes up memory. The maximum depth of the call stack corresponds to the height of the tree, $H$. In the worst case (a completely skewed, linked-list-like tree), $H = N$, resulting in $O(N)$ space. In the best/average case (a perfectly balanced tree), $H = \log N$, resulting in $O(\log N)$ space. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

class Node {
    public:
        int data;
        Node *left;
        Node *right;
        Node(int d) {
            data = d;
            left = NULL;
            right = NULL;
        }
};

class Solution {
    public:
  		Node* insert(Node* root, int data) {
            if(root == NULL) {
                return new Node(data);
            } else {
                Node* cur;
                if(data <= root->data) {
                    cur = insert(root->left, data);
                    root->left = cur;
                } else {
                    cur = insert(root->right, data);
                    root->right = cur;
               }

               return root;
           }
        }

/* you only have to complete the function given below.  
Node is defined as  

class Node {
    public:
        int data;
        Node *left;
        Node *right;
        Node(int d) {
            data = d;
            left = NULL;
            right = NULL;
        }
};

*/

    void preOrder(Node *root) {
    // Write your code here
}

}; //End of Solution

int main() {
  
    Solution myTree;
    Node* root = NULL;
    
    int t;
    int data;

    std::cin >> t;

    while(t-- > 0) {
        std::cin >> data;
        root = myTree.insert(root, data);
    }
  
	myTree.preOrder(root);
    return 0;
}
```

---

## Full Solution
```cpp
#include <bits/stdc++.h>

using namespace std;

class Node {
    public:
        int data;
        Node *left;
        Node *right;
        Node(int d) {
            data = d;
            left = NULL;
            right = NULL;
        }
};

class Solution {
    public:
  		Node* insert(Node* root, int data) {
            if(root == NULL) {
                return new Node(data);
            } else {
                Node* cur;
                if(data <= root->data) {
                    cur = insert(root->left, data);
                    root->left = cur;
                } else {
                    cur = insert(root->right, data);
                    root->right = cur;
               }

               return root;
           }
        }

/* you only have to complete the function given below.  
Node is defined as  

class Node {
    public:
        int data;
        Node *left;
        Node *right;
        Node(int d) {
            data = d;
            left = NULL;
            right = NULL;
        }
};

*/

    void preOrder(Node *root) {
        // Preorder: root -> left subtree -> right subtree
        if (root == NULL) return;
        cout << root->data << " ";
        preOrder(root->left);
        preOrder(root->right);
    }

}; //End of Solution

int main() {
  
    Solution myTree;
    Node* root = NULL;
    
    int t;
    int data;

    std::cin >> t;

    while(t-- > 0) {
        std::cin >> data;
        root = myTree.insert(root, data);
    }
  
	myTree.preOrder(root);
    return 0;
}
```

---

## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[07 - Sparse Arrays]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

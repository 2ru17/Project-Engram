---
id: csalgcm_ps_magician_04_is_bst
type: problem_set
course: CSALGCM
topic: "Is This a Binary Search Tree"
status: solved
difficulty: Medium
hackerrank_domain: Trees
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Trees]] #[[BST]]

---

---

# Is This a Binary Search Tree?

## Problem Description
Determine whether a given binary tree is a valid Binary Search Tree (BST). A binary tree is a valid BST if the values of all nodes in a node's left subtree are strictly less than its data value, and the values of all nodes in its right subtree are strictly greater than its data value. There are no duplicate values allowed.

**Input Format:**
You are not responsible for reading any input from stdin. Hidden code stubs will assemble a binary
                                                                                                                  
tree and pass its root node to your function as an argument.                                                  M O R E D E TA I LS

**Output Format:**
 Suggest Edits
You are not responsible for printing any output to stdout. Your function must return true if the tree is a
binary search tree; otherwise, it must return false. Hidden code stubs will print this result as a Yes or
No answer on a new line.

**Constraints:**
 Download problem statement$
 • $ Download all test cases$

**Sample:**
| Input | Output |
|-------|--------|
| `` | `No` |

---

## Approach & Intuition
The problem asks us to verify if a given binary tree is a valid Binary Search Tree (BST). A common beginner mistake is to simply check if `left->data < root->data < right->data` for every node. However, this only checks local properties; a node deep in the right subtree might have a value smaller than the absolute root, violating the global BST property.

The correct intuition is that **every node in a BST operates within a strict allowable range of values** `(minVal, maxVal)`. The provided C++ solution enforces this using a Recursive Top-Down Depth-First Search (DFS) approach.

Here is the step-by-step breakdown of the C++ code:
1. **Initialization:** The main function `checkBST(root)` kicks off the recursion by calling the helper `checkBSTHelper(root, INT_MIN, INT_MAX)`. The root node is allowed to have any value, so its bounds are effectively $(-\infty, +\infty)$.
2. **Base Cases:** Inside `checkBSTHelper`, if the current `node` is `NULL`, we return `true` (an empty tree is a valid BST).
3. **Range Validation:** We check if `node->data <= minVal` or `node->data >= maxVal`. If the current node's value steps out of its permitted boundary (or equals it, since duplicates aren't allowed), we immediately return `false`.
4. **Recursive Constraint Narrowing:** We recursively check the left and right subtrees, progressively tightening the allowed bounds:
   - When branching **left**, all values must be less than the current node's value. We pass the current node's value as the new `maxVal`: `checkBSTHelper(node->left, minVal, node->data)`.
   - When branching **right**, all values must be greater than the current node's value. We pass the current node's value as the new `minVal`: `checkBSTHelper(node->right, node->data, maxVal)`.
5. **Combination:** The function returns `true` only if both the left AND right subtrees are fully valid.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N)$** — The recursive function visits every node in the binary tree exactly once. The work done at each node (comparisons and logical ANDs) is $O(1)$, resulting in an overall time linear to the number of nodes $N$. |
| **Space** | **$O(H)$** — We do not use auxiliary data structures, but the recursive call stack takes space proportional to the maximum height of the tree $H$. In the worst-case (a completely skewed, linked-list-like tree), $H = N$, making space $O(N)$. In the best/average case (a balanced tree), space is $O(\log N)$. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

struct Node {
	int data;
	Node* left;
	Node* right;
	
	Node() {
		this->data = -1;
		this->left = NULL;
		this->right = NULL;
	}
};
	
class Tree {
	
public:
	// List of node data values:
	std::vector<int> values;
	// Total number of nodes in the tree:
	int count;


	Tree() {
		this->count = 0;
	}

/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node struct is defined as follows:
	struct Node {
		int data;
		Node* left;
		Node* right;
	}
*/

	// Helper: checks whether every node in the subtree lies strictly within (minVal, maxVal)
	bool checkBSTHelper(Node* node, int minVal, int maxVal) {
    // Write your code here
}

	bool checkBST(Node* root) {
    // Write your code here
}

	void inOrder (Node* root, int levels) {

		if(root != NULL) {
			// If there are still unfilled levels, fill left subtree:
			if (levels > 0) {
				// Create a new left child node:
				root->left = new Node();
				inOrder(root->left, levels - 1);
			}    
			
			// Set node data:
			root->data = values.at(count);
			count++;
			
			// If there are still unfilled levels, fill right subtree:
			if (levels > 0) {
				// Create a new right child node:
				root->right = new Node();
				inOrder(root->right, levels - 1);
			}
		}
	}

};

int main(int argc, char *argv[]) {
	int height;
	cin >> height;
	
	// Read data values for tree's nodes:
	Tree* tree = new Tree();
	int value;
	while (cin >> value){
		tree->values.push_back(value);
	}
		
	// Fill tree:
	Node* root = new Node(); 
	tree->inOrder(root, height);
	
	// Print result:
	if(tree->checkBST(root) == true) {
		cout << "Yes";
	}
	else {
		cout << "No";
	}
}
```

---

## Full Solution
```cpp
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

struct Node {
	int data;
	Node* left;
	Node* right;
	
	Node() {
		this->data = -1;
		this->left = NULL;
		this->right = NULL;
	}
};
	
class Tree {
	
public:
	// List of node data values:
	std::vector<int> values;
	// Total number of nodes in the tree:
	int count;


	Tree() {
		this->count = 0;
	}

/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node struct is defined as follows:
	struct Node {
		int data;
		Node* left;
		Node* right;
	}
*/

	// Helper: checks whether every node in the subtree lies strictly within (minVal, maxVal)
	bool checkBSTHelper(Node* node, int minVal, int maxVal) {
		if (node == NULL) return true;
		if (node->data <= minVal || node->data >= maxVal) return false;
		return checkBSTHelper(node->left,  minVal,    node->data)
		    && checkBSTHelper(node->right, node->data, maxVal);
	}

	bool checkBST(Node* root) {
		// Use INT_MIN and INT_MAX as sentinels for the initial valid range
		return checkBSTHelper(root, INT_MIN, INT_MAX);
	}

	void inOrder (Node* root, int levels) {

		if(root != NULL) {
			// If there are still unfilled levels, fill left subtree:
			if (levels > 0) {
				// Create a new left child node:
				root->left = new Node();
				inOrder(root->left, levels - 1);
			}    
			
			// Set node data:
			root->data = values.at(count);
			count++;
			
			// If there are still unfilled levels, fill right subtree:
			if (levels > 0) {
				// Create a new right child node:
				root->right = new Node();
				inOrder(root->right, levels - 1);
			}
		}
	}

};

int main(int argc, char *argv[]) {
	int height;
	cin >> height;
	
	// Read data values for tree's nodes:
	Tree* tree = new Tree();
	int value;
	while (cin >> value){
		tree->values.push_back(value);
	}
		
	// Fill tree:
	Node* root = new Node(); 
	tree->inOrder(root, height);
	
	// Print result:
	if(tree->checkBST(root) == true) {
		cout << "Yes";
	}
	else {
		cout << "No";
	}
}
```


## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[03 - Find The Running Median]]
- **Next Problem:** [[05 - Queue Using Two Stacks]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

---
id: csalgcm_ps_magician_02_cycle_detection
type: problem_set
course: CSALGCM
topic: "Cycle Detection"
status: solved
difficulty: Medium
hackerrank_domain: Linked Lists
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Linked Lists]] #[[Floyd's Algorithm]]

---

---

# Cycle Detection

## Problem Description
A linked list contains a cycle if any node is visited more than once during traversal. Given a pointer to the head of a singly linked list, determine whether it contains a cycle. Return `1` (or `true`) if a cycle is present, and `0` (or `false`) otherwise.

**Input Format:**
The code stub reads from stdin and passes the appropriate argument to your function. The custom
test cases format will not be described for this question due to its complexity. Expand the section for
the main function and review the code if you would like to figure out how to create a custom case.

**Output Format:**
• int:     if there is a cycle or       if there is not
                                                                                                             Suggest Edits
Note: If the list is empty,              will be null.

**Constraints:**
• $

**Sample:**
| Input | Output |
|-------|--------|
| `References to each of the following linked lists are passed as arguments to your function:` | `0<br>     1` |

---

## Approach & Intuition
The objective is to determine if a singly linked list contains a cycle (a loop where a node's `next` pointer points back to a previous node). A naive approach might be to store visited nodes in a hash set, which requires $O(N)$ extra space. Instead, the provided C++ solution employs an elegant $O(1)$ space algorithm known as **Floyd’s Tortoise and Hare** (a Two Pointers technique).

The intuition is analogous to two runners on a track. If the track is a straight line, the faster runner will eventually reach the finish line. However, if the track has a loop, the faster runner will continuously lap the track and inevitably catch up to the slower runner from behind.

Here is exactly how the C++ implementation works:
1. **Pointer Initialization:** We initialize two pointers, `slow` and `fast`, both starting at the `head` of the linked list.
2. **Traversal:** We use a `while` loop that continues as long as `fast` and its next node `fast->next` are not `nullptr`. This condition prevents segmentation faults (null pointer dereferences) when reaching the end of a list.
3. **Pacing:** Inside the loop, the `slow` pointer takes one step forward (`slow = slow->next`), while the `fast` pointer takes two steps forward (`fast = fast->next->next`).
4. **Collision Check:** After moving both pointers, we check if they point to the exact same node (`slow == fast`). If they do, a cycle exists, and we immediately return `true`.
5. **Termination:** If the `while` loop terminates naturally, it means the `fast` pointer reached the end of the list (`nullptr`). This definitively proves the list is linear and has no cycle, so we return `false`.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N)$** — If there is no cycle, the `fast` pointer reaches the end in $N/2$ steps. If there is a cycle, the `fast` and `slow` pointers will collide in at most $N$ steps after entering the loop. Thus, the time scales linearly with the number of nodes $N$. |
| **Space** | **$O(1)$** — The algorithm only requires two node pointers (`slow` and `fast`) regardless of how large the linked list is, making it highly memory efficient. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

class SinglyLinkedListNode {
    public:
        int data;
        SinglyLinkedListNode *next;

        SinglyLinkedListNode(int node_data) {
            this->data = node_data;
            this->next = nullptr;
        }
};

class SinglyLinkedList {
    public:
        SinglyLinkedListNode *head;
        SinglyLinkedListNode *tail;

        SinglyLinkedList() {
            this->head = nullptr;
            this->tail = nullptr;
        }

        void insert_node(int node_data) {
            SinglyLinkedListNode* node = new SinglyLinkedListNode(node_data);

            if (!this->head) {
                this->head = node;
            } else {
                this->tail->next = node;
            }

            this->tail = node;
        }
};

void print_singly_linked_list(SinglyLinkedListNode* node, string sep, ofstream& fout) {
    while (node) {
        fout << node->data;

        node = node->next;

        if (node) {
            fout << sep;
        }
    }
}

void free_singly_linked_list(SinglyLinkedListNode* node) {
    while (node) {
        SinglyLinkedListNode* temp = node;
        node = node->next;

        free(temp);
    }
}

// Complete the has_cycle function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode* next;
 * };
 *
 */
bool has_cycle(SinglyLinkedListNode* head) {
    // Write your code here
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    int tests;
    cin >> tests;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    for (int tests_itr = 0; tests_itr < tests; tests_itr++) {
        int index;
        cin >> index;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        SinglyLinkedList* llist = new SinglyLinkedList();

        int llist_count;
        cin >> llist_count;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (int i = 0; i < llist_count; i++) {
            int llist_item;
            cin >> llist_item;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');

            llist->insert_node(llist_item);
        }
      
      	SinglyLinkedListNode* extra = new SinglyLinkedListNode(-1);
      	SinglyLinkedListNode* temp = llist->head;
      
      	for (int i = 0; i < llist_count; i++) {
            if (i == index) {
          		extra = temp;
            }
          	
          	if (i != llist_count-1) {
          		temp = temp->next;
            }
        }
      
      	temp->next = extra;

        bool result = has_cycle(llist->head);

        fout << result << "\n";
    }

    fout.close();

    return 0;
}
```

---

## Full Solution
```cpp
#include <bits/stdc++.h>

using namespace std;

class SinglyLinkedListNode {
    public:
        int data;
        SinglyLinkedListNode *next;

        SinglyLinkedListNode(int node_data) {
            this->data = node_data;
            this->next = nullptr;
        }
};

class SinglyLinkedList {
    public:
        SinglyLinkedListNode *head;
        SinglyLinkedListNode *tail;

        SinglyLinkedList() {
            this->head = nullptr;
            this->tail = nullptr;
        }

        void insert_node(int node_data) {
            SinglyLinkedListNode* node = new SinglyLinkedListNode(node_data);

            if (!this->head) {
                this->head = node;
            } else {
                this->tail->next = node;
            }

            this->tail = node;
        }
};

void print_singly_linked_list(SinglyLinkedListNode* node, string sep, ofstream& fout) {
    while (node) {
        fout << node->data;

        node = node->next;

        if (node) {
            fout << sep;
        }
    }
}

void free_singly_linked_list(SinglyLinkedListNode* node) {
    while (node) {
        SinglyLinkedListNode* temp = node;
        node = node->next;

        free(temp);
    }
}

// Complete the has_cycle function below.

/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode* next;
 * };
 *
 */
bool has_cycle(SinglyLinkedListNode* head) {
    // Floyd's tortoise-and-hare algorithm
    SinglyLinkedListNode* slow = head;
    SinglyLinkedListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // cycle detected
    }
    return false;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    int tests;
    cin >> tests;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');

    for (int tests_itr = 0; tests_itr < tests; tests_itr++) {
        int index;
        cin >> index;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        SinglyLinkedList* llist = new SinglyLinkedList();

        int llist_count;
        cin >> llist_count;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (int i = 0; i < llist_count; i++) {
            int llist_item;
            cin >> llist_item;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');

            llist->insert_node(llist_item);
        }
      
      	SinglyLinkedListNode* extra = new SinglyLinkedListNode(-1);
      	SinglyLinkedListNode* temp = llist->head;
      
      	for (int i = 0; i < llist_count; i++) {
            if (i == index) {
          		extra = temp;
            }
          	
          	if (i != llist_count-1) {
          		temp = temp->next;
            }
        }
      
      	temp->next = extra;

        bool result = has_cycle(llist->head);

        fout << result << "\n";
    }

    fout.close();

    return 0;
}
```


## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[01 - Breadth First Search Shortest Reach]]
- **Next Problem:** [[03 - Find The Running Median]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

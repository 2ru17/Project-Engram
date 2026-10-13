---
id: Handout_06_-_Algorithms_-_Sort
type: note
course: CCDSALG
topic: Algorithms - Sort
status: completed
---

# Algorithms - Sort

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Algorithms - Sort]] #[[Code Snippets]] #[[M2]]

---

## Overview

A sorting algorithm rearranges a sequence of $n$ numbers $(a_1, a_2, a_3, \dots, a_n)$ such that they are in non-decreasing order ($a_1' \le a_2' \le a_3' \le \dots \le a_n'$). Many of these algorithms operate **in-place**, meaning they sort the data without requiring additional array storage.

The primary algorithms discussed include:
1. **Bubble Sort**: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. 
2. **Insertion Sort**: Builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into its correct position among the already-sorted elements.
3. **Merge Sort**: A divide-and-conquer algorithm that recursively splits the array in half until each sub-array contains a single element, and then merges the sub-arrays in sorted order.

## Theoretical Framework: Divide-and-Conquer Call Tree

```mermaid
graph TD
    subgraph DividePhase["Merge Sort: Recursive Splitting & Ordered Combination"]
        Root["Array: [38, 27, 43, 3, 9, 82, 10]<br/>n = 7"] --> L1["Left: [38, 27, 43, 3]"]
        Root --> R1["Right: [9, 82, 10]"]
        L1 --> L2_1["[38, 27]"]
        L1 --> L2_2["[43, 3]"]
        R1 --> R2_1["[9, 82]"]
        R1 --> R2_2["[10] (Base Case)"]
        L2_1 --> L3_1["[38] (Base Case)"]
        L2_1 --> L3_2["[27] (Base Case)"]
        L2_2 --> L3_3["[43] (Base Case)"]
        L2_2 --> L3_4["[3] (Base Case)"]
        R2_1 --> R3_1["[9] (Base Case)"]
        R2_1 --> R3_2["[82] (Base Case)"]
    end
```

### Two-Pointer Linear Merge Pipeline

```mermaid
flowchart TD
    Init["Initialize pointers:<br/>Left Subarray L: i = 0<br/>Right Subarray R: j = 0<br/>Merged Target A: k = firstInd"] --> LoopCheck{"i < lSize AND j < rSize?"}
    LoopCheck -- "Yes" --> ValComp{"L[i] <= R[j]?"}
    ValComp -- "Yes (Stable Choice)" --> PickL["A[k] = L[i]<br/>i = i + 1, k = k + 1"]
    ValComp -- "No" --> PickR["A[k] = R[j]<br/>j = j + 1, k = k + 1"]
    PickL --> LoopCheck
    PickR --> LoopCheck
    LoopCheck -- "No (One array finished)" --> DrainCheck{"Remaining elements in L or R?"}
    DrainCheck --> Drain["Append all remaining elements directly to A[k..]"]
    Drain --> MergedDone["Subarray A[firstInd..lastInd] Fully Sorted"]
```

## Code Implementation

### Bubble Sort
```c
void execBubbleSort(int A[], int n) {
    int j, k;
    for (j = 0; j <= n - 1; j++) {
        for (k = n - 1; k >= j + 1; k--) {
            if (A[k] < A[k - 1]) {
                swap(A[k], A[k - 1]);
            }
        }
    }
}
```

### Merge Sort (Merge Step)
```c
void merge(int A[], int firstInd, int mid, int lastInd) {
    int j, x, y, L[n], R[n];
    int lSize = mid - firstInd + 1;
    int rSize = lastInd - mid;
    
    arrayCopy(L, A, firstInd, mid);
    arrayCopy(R, A, mid + 1, lastInd);
    
    x = 0;
    y = 0;
    j = firstInd;
    
    while (x < lSize && y < rSize) {
        if (L[x] <= R[y]) {
            A[j] = L[x];
            x++;
        } else {
            A[j] = R[y];
            y++;
        }
        j++;
    }
    
    while (x < lSize) {
        A[j] = L[x];
        x++;
        j++;
    }
    
    while (y < rSize) {
        A[j] = R[y];
        y++;
        j++;
    }
}
```

## Complexity Analysis

* **Bubble Sort**: Time complexity is $O(n^2)$ due to the nested loops traversing the array. It operates in-place.
* **Insertion Sort**: Time complexity is $O(n^2)$ in the worst case (reverse sorted array) but can perform at $O(n)$ if the array is nearly sorted. Operates in-place.
* **Merge Sort**: Time complexity is $O(n \log_2 n)$ because it divides the array in half logarithmically and merges them in linear time. It is generally not in-place because the `merge` function requires auxiliary arrays (`L` and `R`).


## References & Navigation

- **Related Notes:** [[Sorting Algorithms]]

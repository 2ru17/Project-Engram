---
id: Handout_05_-_Algorithms_-_Search
type: note
course: CCDSALG
topic: Algorithms - Search
status: completed
---

# Algorithms - Search

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Algorithms - Search]] #[[Code Snippets]] #[[M2]]

---

## Overview

Searching is the process of finding a given value (key) within an array of numbers and returning the index of its first occurrence. If the value is not found, a sentinel value like `-1` is typically returned. 
Two primary search algorithms are:
1. **Linear Search**: The simplest solution that iterates and checks each element of the array until there is a match or the end of the array is reached. It does not require the array to be sorted.
2. **Binary Search**: A more efficient algorithm that requires the array to be **sorted**. It repeatedly divides the search space in half by comparing the key to the middle element.

## Code Implementation

### Linear Search

**Iterative Approach:**
```c
int execLinearSearch(int A[], int n, int key) {
    int j = 0;
    while (j < n && A[j] != key)
        j++;
        
    if (j < n)
        return j;
    return -1;
}
```

**Recursive Approach:**
```c
int execLinearSearch(int A[], int n, int key) {
    if (n == 0)
        return -1;
    else if (A[n - 1] == key)
        return n - 1;
        
    return execLinearSearch(A, n - 1, key);
}
```

### Binary Search

**Iterative Approach:**
```c
int execBinarySearch(int A[], int lo, int hi, int key) {
    int mid = (lo + hi) / 2;
    while (lo <= hi && A[mid] != key) {
        if (key < A[mid])
            hi = mid - 1;
        else if (key > A[mid])
            lo = mid + 1;
            
        mid = (lo + hi) / 2;
    }
    
    if (lo > hi)
        return -1;
    return mid;
}
```

**Recursive Approach:**
```c
int execBinarySearch(int A[], int lo, int hi, int key) {
    int mid = (lo + hi) / 2;
    
    if (lo > hi)
        return -1;
        
    if (A[mid] == key)
        return mid;
        
    if (key < A[mid])
        return execBinarySearch(A, lo, mid - 1, key);
        
    if (key > A[mid])
        return execBinarySearch(A, mid + 1, hi, key);
}
```

## Complexity Analysis

1. **Which is more efficient?**
   Binary search is more efficient than linear search, provided the array is already sorted.
2. **Maximum number of comparisons for Linear Search?**
   In the worst case (the element is not in the array, or is at the very end), linear search takes $n$ comparisons, so its worst-case time complexity is $O(n)$.
3. **Minimum number of comparisons?**
   In the best case (the element is at the first index checked), both searches take $1$ comparison, meaning the best-case time complexity is $O(1)$.
4. **Maximum number of comparisons for Binary Search?**
   Because the search space is halved in each step, the worst-case number of comparisons is proportional to $\log_2 n$. Its worst-case time complexity is $O(\log_2 n)$.


## References & Navigation

- **Related Notes:** [[Searching Algorithms]]

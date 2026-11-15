---
id: ccdsalg_algorithms_search
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


## Multiple Choice Questions

1. What precondition must be satisfied for Binary Search to work correctly, unlike Linear Search?
    - **A)** The array length n must be a power of 2
    - **B)** All elements in the array must be positive and distinct
    - **C)** The input array must already be sorted
    - **D)** The target key must be present inside the array

2. Comparing the iterative and recursive `execLinearSearch` implementations in the note, what happens if `key` appears at multiple indices in `A`?
    - **A)** Both implementations return the lowest matching index
    - **B)** The iterative version returns the first (lowest) matching index, whereas the recursive version scans from A[n - 1] downward and returns the last (highest) matching index
    - **C)** Both implementations return -1 whenever duplicate keys exist
    - **D)** The recursive version returns the sum of all matching indices

3. In the iterative `execLinearSearch` function, suppose `A = {4, 9, 2, 7}`, `n = 4`, and `key = 5`. What value does `j` hold when the `while` loop ends, and what does the function return?
    - **A)** j equals 4, so j < n is false and the function returns -1
    - **B)** j equals 3, so the function returns 3
    - **C)** j equals 4, so the function returns 4
    - **D)** j equals 0, so the function returns -1

4. Trace the iterative `execBinarySearch` function on `A = {3, 8, 12, 19, 25, 31, 40}` with `lo = 0`, `hi = 6`, and `key = 31`. Which sequence of `mid` indices is checked before returning?
    - **A)** 3, 4, then 5
    - **B)** 2, then 5
    - **C)** 3, 6, then 5
    - **D)** 3, then 5

5. In the iterative `execBinarySearch` implementation, what condition causes the function to return the sentinel `-1`?
    - **A)** A[mid] == 0
    - **B)** lo > hi after the search interval becomes empty
    - **C)** mid == 0 while key > A[0]
    - **D)** lo == hi before checking A[mid]

6. Suppose iterative `execBinarySearch` is called on `A = {2, 5, 8, 11, 14, 17, 20, 23}` with `lo = 0`, `hi = 7`, and `key = 6`. Immediately after the first loop iteration updates the bounds from `mid = 3` (`A[3] = 11`), what are `lo`, `hi`, and `mid`?
    - **A)** lo = 4, hi = 7, mid = 5
    - **B)** lo = 0, hi = 3, mid = 1
    - **C)** lo = 0, hi = 2, mid = 1
    - **D)** lo = 1, hi = 2, mid = 1

7. What is the minimum number of element comparisons and best-case time complexity for BOTH Linear Search and Binary Search?
    - **A)** 1 comparison, giving O(1) best-case time complexity
    - **B)** 2 comparisons, giving O(1) best-case time complexity
    - **C)** log₂ n comparisons, giving O(log₂ n) best-case time complexity
    - **D)** n / 2 comparisons, giving O(n) best-case time complexity

8. When does Linear Search incur its worst-case number of comparisons ($n$ comparisons, $O(n)$)?
    - **A)** When the array is sorted in ascending order
    - **B)** When the key is located at index 0
    - **C)** When the key equals the middle element A[n / 2]
    - **D)** When the key is at the last position checked or is not present in the array

9. Why is the worst-case time complexity of Binary Search $O(\log_2 n)$?
    - **A)** Because it traverses the array recursively twice on every step
    - **B)** Because each comparison halves the remaining search space until the key is found or lo > hi
    - **C)** Because it sorts the array during the search process
    - **D)** Because the while loop always executes exactly n / 2 iterations

10. In the iterative Linear Search loop `while (j < n && A[j] != key)`, why is `j < n` placed before `A[j] != key`?
    - **A)** So that the loop skips index 0 on the first pass
    - **B)** Because C requires integer inequalities on the right side of &&
    - **C)** So short-circuit evaluation prevents accessing A[n] out of bounds when key is not found
    - **D)** To force the function to return n instead of -1 when key is absent

### Answer Key & Explanations

1. **C)** Binary Search compares `key` with `A[mid]` and discards half the array on that comparison, which is only valid if `A` is sorted; Linear Search works on unsorted arrays.
2. **B)** Iterative `execLinearSearch` increments `j` from `0` upward and stops at the first match, while recursive `execLinearSearch` inspects `A[n - 1]` first and recurses down to `0`, returning the highest matching index.
3. **A)** Because `5` is absent, `j` increments through `0, 1, 2, 3` until `j == 4`, failing `j < n`; then `if (j < n)` is false, so `-1` is returned.
4. **D)** Initially `mid = (0 + 6) / 2 = 3` (`A[3] = 19 < 31`), so `lo` becomes `3 + 1 = 4`; next `mid = (4 + 6) / 2 = 5` (`A[5] = 31 == key`), exiting the loop and returning `5`.
5. **B)** When the search space narrows until `lo > hi`, the `while` loop terminates and `if (lo > hi) return -1;` returns the sentinel.
6. **C)** Since `6 < A[3]` (`6 < 11`), `hi` updates to `mid - 1 = 2` while `lo` stays `0`, and `mid = (0 + 2) / 2 = 1`.
7. **A)** When the key matches the very first element checked (`A[0]` in iterative Linear Search or the initial `A[mid]` in Binary Search), only $1$ comparison is needed, yielding $O(1)$.
8. **D)** Linear Search performs the maximum $n$ comparisons when the target is at the final element checked or absent from the array.
9. **B)** Halving the search interval at each comparison bounds the maximum number of comparisons proportionally to $\log_2 n$, giving $O(\log_2 n)$.
10. **C)** When `j` reaches `n`, `j < n` evaluates to false and short-circuits `&&`, preventing an out-of-bounds read at `A[n]`.

## References & Navigation

- **Previous Topic:** [[Recurrence Relations]]
- **Next Topic:** [[Sorting Algorithms]]
- **Related Notes:** [[Searching Algorithms]]

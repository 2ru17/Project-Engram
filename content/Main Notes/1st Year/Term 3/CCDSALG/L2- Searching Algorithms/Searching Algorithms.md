---
id: Searching-Algorithms
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Searching Algorithms

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Searching]] #[[Data Structures]] #[[Search Efficiency]] #[[Sorting]] #[[Fundamental Data Structures]] #[[Computational Complexity]] #[[Analysis of Algorithms]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> 2025-06-05 02:14:45

## Key Concepts
 Best case Worst case Average case Best case Worst case

## Details / Theory

2025-06-05 02:14:45

---

# Searching and Sorting Arrays

## What is an Array?
 A collection of elements stored in contiguous memory. Indexed data structure (0-based index in most languages). Can be accessed in constant time $O(1)$ using index. Fixed size in many languages (e.g., C, Java).

### 1. Linear Search
 Checks each element sequentially until finding the target or reaching the end.

**Characteristics**:
 Works on both sorted and unsorted arrays. **Best case**: element is at the start $O(1)$ **Worst case**: element is not found or at end $O(n)$ **Average case**: $O(n)$

**Code**:

```c
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i;
    }
    return -1;
}
```

### 2. Binary Search
 Requires a sorted array. Repeatedly divides the search interval in half.

**Characteristics**:
 **Best case**: element is at the middle $O(1)$ **Worst case**: element is not found $O(\log n)$ **Average case**: $O(\log n)$

**Iterative Implementation**:

```c
int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
```

**Recursive Implementation**:

```c
int binarySearchRecursive(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] > x) return binarySearchRecursive(arr, l, mid - 1, x);
        return binarySearchRecursive(arr, mid + 1, r, x);
    }
    return -1;
}
```

## Sorting Algorithms

### 1. Bubble Sort

**How it works**:
 Repeatedly steps through the list. Compares adjacent elements and swaps them if they are in the wrong order.

**Characteristics**:
 **Best case**: $O(n)$ when array is already sorted **Worst case**: $O(n^2)$ **Average case**: $O(n^2)$ **Space complexity**: $O(1)$ **Stable**: Yes

**Code**:

```c
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
```

**Optimized Bubble Sort**:

```c
void optimizedBubbleSort(int arr[], int n) {
    int swapped;
    for (int i = 0; i < n-1; i++) {
        swapped = 0;
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0) break;
    }
}
```

### 2. Selection Sort

**How it works**:
 Divides the input list into sorted and unsorted portions. Finds the smallest element in the unsorted portion. Swaps it with the first element of the unsorted portion.

**Characteristics**:
 **Best case**: $O(n^2)$ **Worst case**: $O(n^2)$ **Average case**: $O(n^2)$ **Space complexity**: $O(1)$ **Stable**: No

**Code**:

```c
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}
```

### 3. Insertion Sort

**How it works**:
 Builds the sorted array one element at a time. Takes one element from the unsorted portion and places it in the correct position in the sorted portion.

**Characteristics**:
 **Best case**: $O(n)$ when array is already sorted **Worst case**: $O(n^2)$ **Average case**: $O(n^2)$ **Space complexity**: $O(1)$ **Stable**: Yes

**Code**:

```c
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
}
```

### 4. Merge Sort

**How it works**:
 Divide and conquer algorithm. Divides the array into halves, sorts them, and then merges them.

**Characteristics**:
 **Best case**: $O(n \log n)$ **Worst case**: $O(n \log n)$ **Average case**: $O(n \log n)$ **Space complexity**: $O(n)$ **Stable**: Yes

**Code**:

```c
void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
```

### 5. Quick Sort

**How it works**:
 Divide and conquer algorithm. Selects a 'pivot' element and partitions the array around the pivot.

**Characteristics**:
 **Best case**: $O(n \log n)$ **Worst case**: $O(n^2)$ when poorly pivoted **Average case**: $O(n \log n)$ **Space complexity**: $O(\log n)$ **Stable**: No

**Code**:

```c
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

## Algorithm Comparison

### Time Complexity Comparison

| Algorithm      | Best Case     | Average Case  | Worst Case    | Space Complexity | Stable |
| -------------- | ------------- | ------------- | ------------- | ---------------- | ------ |
| Linear Search  | $O(1)$        | $O(n)$        | $O(n)$        | $O(1)$           | N/A    |
| Binary Search  | $O(1)$        | $O(\log n)$   | $O(\log n)$   | $O(1)$           | N/A    |
| Bubble Sort    | $O(n)$        | $O(n^2)$      | $O(n^2)$      | $O(1)$           | Yes    |
| Selection Sort | $O(n^2)$      | $O(n^2)$      | $O(n^2)$      | $O(1)$           | No     |
| Insertion Sort | $O(n)$        | $O(n^2)$      | $O(n^2)$      | $O(1)$           | Yes    |
| Merge Sort     | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$           | Yes    |
| Quick Sort     | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$      | $O(\log n)$      | No     |

## Common Pitfalls
 Using **binary search** on an unsorted array — binary search requires the array to be sorted first Forgetting that **linear search** is $O(n)$ in the worst case but can be $O(1)$ in the best case (element at index 0) Off-by-one errors in **binary search** bounds — use `low <= high` (not `<`) and update `mid ± 1` (not just `mid`) Confusing **stability** of sorting algorithms — bubble sort, insertion sort, and merge sort are stable; selection sort and quick sort are not Assuming **bubble sort** is always $O(n^2)$ — with an early-termination flag, best case is $O(n)$ on already-sorted input Forgetting that **quick sort** has $O(n^2)$ worst case (e.g., already-sorted input with naive pivot), despite $O(n \log n)$ average

## Summary

> TL;DR — **Searching**: linear search is $O(n)$, binary search is $O(\log n)$ but requires sorted input. **Sorting**: bubble sort $O(n^2)$, selection sort $O(n^2)$, insertion sort $O(n^2)$ worst / $O(n)$ best, merge sort $O(n \log n)$ guaranteed, quick sort $O(n \log n)$ average / $O(n^2)$ worst. Choose based on stability, space, and expected input.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What is a defining characteristic of an Array?
- **A)** It uses non-contiguous memory.
- **B)** Elements are stored in contiguous memory and can be accessed in constant time $O(1)$ using an index.
- **C)** It grows dynamically infinitely.
- **D)** It only supports binary search.

2. What is the average case time complexity for Linear Search?
- **A)** $O(1)$
- **B)** $O(\log n)$
- **C)** $O(n)$
- **D)** $O(n^2)$

3. What prerequisite condition must be met before using Binary Search on an array?
- **A)** The array must contain only positive numbers.
- **B)** The array must be sorted.
- **C)** The array must have an even number of elements.
- **D)** The array must be partitioned.

4. What is the worst-case time complexity of Binary Search?
- **A)** $O(n)$
- **B)** $O(\log n)$
- **C)** $O(n \log n)$
- **D)** $O(1)$

5. In an Optimized Bubble Sort with an early-termination flag, what is the best-case time complexity?
- **A)** $O(1)$
- **B)** $O(\log n)$
- **C)** $O(n)$
- **D)** $O(n^2)$

6. Which sorting algorithm builds the sorted array one element at a time by placing an element in the correct position in the sorted portion?
- **A)** Selection Sort
- **B)** Insertion Sort
- **C)** Merge Sort
- **D)** Quick Sort

7. What is the worst-case time complexity of Merge Sort?
- **A)** $O(n \log n)$
- **B)** $O(n^2)$
- **C)** $O(n)$
- **D)** $O(\log n)$

8. What scenario triggers the $O(n^2)$ worst-case time complexity for Quick Sort?
- **A)** When the array is already sorted and a naive pivot (like the last element) is chosen.
- **B)** When the array is completely reversed.
- **C)** When the array contains no duplicates.
- **D)** When the pivot is the median element.

9. Which of the following sorting algorithms is NOT stable?
- **A)** Bubble Sort
- **B)** Insertion Sort
- **C)** Merge Sort
- **D)** Selection Sort

10. What is a common off-by-one error when implementing Binary Search?
- **A)** Using `low < high` instead of `low <= high` in the while loop condition.
- **B)** Starting the array index at 1.
- **C)** Returning `mid` instead of `-1`.
- **D)** Updating `mid` to `mid * 2`.

### Answer Key & Explanations
1. **B)** Because an array is one continuous block of RAM, the computer can instantly jump to any index in exactly $O(1)$ time.
2. **C)** On average, linear search will have to scan half the array before finding the target, which algebraically simplifies to $O(n)$.
3. **B)** Binary search exploits the fact that data is ordered; if it is unsorted, cutting the array in half provides no information about where the target resides.
4. **B)** The algorithm halves the search space iteratively. In the worst case (target not found), it will take exactly $\log_2 n$ steps to exhaust the array.
5. **C)** If the array is already perfectly sorted, the optimized algorithm runs through the array exactly once, swaps nothing, and terminates early in $O(n)$ time.
6. **B)** Insertion sort conceptually partitions the array. It takes the first element of the unsorted half and shifts it down into its exact spot in the sorted half.
7. **A)** Merge Sort rigidly divides the array every single time, meaning its best, average, and worst cases are strictly identically bounded at $O(n \log n)$.
8. **A)** If you blindly pick the rightmost element as a pivot on a sorted array, the partition separates just 1 element instead of splitting it in half, causing $n$ levels of recursion.
9. **D)** Selection sort can swap non-adjacent elements across long distances, inadvertently shuffling identically-valued items out of their original relative order.
10. **A)** If you use strictly `<` instead of `<=`, the loop will prematurely terminate and fail to check the final element when the bounds converge on the same index.

## References & Navigation

- **Previous Topic:** [[Reccurences]]
- **Next Topic:** [[Stacks]]
- **Related Notes:** [[Algorithm]], [[Divide and Conquer]]

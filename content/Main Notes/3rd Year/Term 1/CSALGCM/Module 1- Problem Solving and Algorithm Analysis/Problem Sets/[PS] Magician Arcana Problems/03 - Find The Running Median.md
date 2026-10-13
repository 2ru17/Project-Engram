---
id: csalgcm_ps_magician_03_running_median
type: problem_set
course: CSALGCM
topic: "Find The Running Median"
status: solved
difficulty: Hard
hackerrank_domain: Heaps
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Heaps]] #[[Priority Queue]]

---

---

# Find the Running Median

## Problem Description
Given a data stream of $N$ integers, you must keep track of a "running list" of integers and print the median of this updated list every time a new integer is added. The output should be formatted as a double-precision float scaled to 1 decimal place.

**Input Format:**
The first line contains a single integer, , the number of integers in the data stream.
Each line of the          subsequent lines contains an integer,         , to be inserted into the list.

**Output Format:**
- float[n]: the median of the array after each insertion, modify the print statement in main to get
proper formatting.

**Constraints:**
• $• $

**Sample:**
| Input | Output |
|-------|--------|
| `STDIN           Function<br>     -----           --------<br>     6               a[] size n = 6<br>     12              a = [12, 4, 5, 3, 8, 7]<br>     4<br>     5<br>     3<br>     8<br>     7` | `12.0<br>     8.0<br>     5.0<br>     4.5<br>     5.0<br>     6.0` |

---

## Approach & Intuition
We need to efficiently find the median of a dynamically growing stream of integers. Calculating the median dynamically requires us to constantly keep the elements conceptually sorted. Using an array and sorting it on every insertion would take $O(N^2 \log N)$ or $O(N^2)$ overall, which is too slow.

The optimal approach is to conceptually divide the sorted stream into two halves: a "lower half" and an "upper half." We only ever need to know the largest element of the lower half and the smallest element of the upper half to calculate the median. 
The C++ solution implements this using the **Two Heaps Pattern**:
1. **Heap Setup:** We define a Max-Heap (`lower`) to store the smaller half of the numbers, meaning `lower.top()` gives us the largest number in this half. We define a Min-Heap (`upper`) using `greater<int>` to store the larger half of the numbers, meaning `upper.top()` gives us the smallest number in this half.
2. **Insertion:** When a new number `x` arrives, we compare it to `lower.top()`. If `x` is smaller than or equal to `lower.top()` (or if `lower` is empty), it belongs in the `lower` half. Otherwise, it belongs in the `upper` half.
3. **Rebalancing:** To maintain the median property, the sizes of the two heaps must never differ by more than 1. If `lower` has two more elements than `upper`, we pop the top of `lower` and push it into `upper`. Conversely, if `upper` has more elements than `lower`, we pop the top of `upper` and push it into `lower`. 
4. **Calculating the Median:** After rebalancing, we can easily find the median in $O(1)$ time:
   - If the heaps are exactly the same size (even total elements), the median is the average of the two tops: `(lower.top() + upper.top()) / 2.0`.
   - If the sizes differ (odd total elements), our rebalancing logic guarantees that the `lower` heap will always hold the one extra element. So, the median is simply `lower.top()`.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N \log N)$** — For each of the $N$ integers in the stream, we perform $O(1)$ heap insertions and deletions. A heap push or pop takes $O(\log K)$ time, where $K$ is the size of the heap. Over $N$ elements, the total time is bounded by $O(N \log N)$. |
| **Space** | **$O(N)$** — We store all $N$ elements from the data stream inside the two priority queues, taking linear space. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'runningMedian' function below.
 *
 * The function is expected to return a DOUBLE_ARRAY.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

vector<double> runningMedian(vector<int> a) {
    // Write your code here
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string a_count_temp;
    getline(cin, a_count_temp);

    int a_count = stoi(ltrim(rtrim(a_count_temp)));

    vector<int> a(a_count);

    for (int i = 0; i < a_count; i++) {
        string a_item_temp;
        getline(cin, a_item_temp);

        int a_item = stoi(ltrim(rtrim(a_item_temp)));

        a[i] = a_item;
    }

    vector<double> result = runningMedian(a);

    for (size_t i = 0; i < result.size(); i++) {
        fout << result[i];

        if (i != result.size() - 1) {
            fout << "\n";
        }
    }

    fout << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}
```

---

## Full Solution
```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'runningMedian' function below.
 *
 * The function is expected to return a DOUBLE_ARRAY.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

vector<double> runningMedian(vector<int> a) {
    // lower half: max-heap  (stores the smaller half)
    priority_queue<int> lower;
    // upper half: min-heap  (stores the larger half)
    priority_queue<int, vector<int>, greater<int>> upper;

    vector<double> result;

    for (int x : a) {
        // Insert into the appropriate heap
        if (lower.empty() || x <= lower.top()) {
            lower.push(x);
        } else {
            upper.push(x);
        }

        // Rebalance so that sizes differ by at most 1
        if (lower.size() > upper.size() + 1) {
            upper.push(lower.top());
            lower.pop();
        } else if (upper.size() > lower.size()) {
            lower.push(upper.top());
            upper.pop();
        }

        // Compute median
        if (lower.size() == upper.size()) {
            result.push_back((lower.top() + upper.top()) / 2.0);
        } else {
            result.push_back((double)lower.top());
        }
    }

    return result;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string a_count_temp;
    getline(cin, a_count_temp);

    int a_count = stoi(ltrim(rtrim(a_count_temp)));

    vector<int> a(a_count);

    for (int i = 0; i < a_count; i++) {
        string a_item_temp;
        getline(cin, a_item_temp);

        int a_item = stoi(ltrim(rtrim(a_item_temp)));

        a[i] = a_item;
    }

    vector<double> result = runningMedian(a);

    for (size_t i = 0; i < result.size(); i++) {
        fout << result[i];

        if (i != result.size() - 1) {
            fout << "\n";
        }
    }

    fout << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}
```

---

## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[02 - Cycle Detection]]
- **Next Problem:** [[04 - Is This a Binary Search Tree]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

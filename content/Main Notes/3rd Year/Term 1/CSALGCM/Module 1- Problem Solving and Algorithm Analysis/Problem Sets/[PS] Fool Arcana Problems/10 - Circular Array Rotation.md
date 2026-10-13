---
id: csalgcm_ps_fool_10_circular_array_rotation
type: problem_set
course: CSALGCM
topic: "Circular Array Rotation"
status: solved
difficulty: Easy
hackerrank_domain: Arrays
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Arrays]] #[[Modular Arithmetic]]

---

# Circular Array Rotation

## Problem Description

John Watson performs `k` **right rotations** on an array. In one right rotation, the last element moves to the front. After `k` rotations, Watson asks `q` queries — for each query index `m`, what value is at position `m`?

**Input Format:**
- First line: `n k q` (array size, rotations, queries)
- Second line: `n` space-separated integers (the array)
- Next `q` lines: one query index `m` per line (0-indexed)

**Output Format:**
- For each query: the value at position `m` after `k` rotations.

**Constraints:** $1 \leq n \leq 10^5$; $1 \leq k \leq 10^5$; $1 \leq q \leq 500$; $0 \leq m < n$

**Sample:**
| Input | Output |
|-------|--------|
| `3 2 3`<br>`1 2 3`<br>`0`<br>`1`<br>`2` | `2`<br>`3`<br>`1` |

*After 2 right rotations: [1,2,3] → [3,1,2] → [2,3,1]. Query 0→2, 1→3, 2→1.*

---

## Approach & Intuition

The naive approach would actually perform `k` rotations on the array — that's $O(n \cdot k)$, which can be up to $10^{10}$ operations. **Do not do this.**

**Key Insight:** Instead of physically rotating the array, we can figure out where each original element ends up **mathematically**.

After `k` right rotations, the element originally at index `i` moves to index `(i + k) % n`.

So for a query index `m`, we need the **original index** whose element ended up at `m`:
$$\text{original index} = (m - k\%n + n) \% n$$

The `+n` ensures the result is non-negative before the final `%n` (since `m - k%n` can be negative).

> [!note] Why `k % n` instead of `k`?
> Rotating an array of size `n` exactly `n` times returns it to its original state. So rotating `k` times is equivalent to rotating `k % n` times. This also prevents index errors when `k > n`.

> [!tip] Modular Index Mapping
> The formula `(m - rot + n) % n` is the standard **inverse circular offset** trick. Remember it — it also appears in problems involving ring buffers, clock arithmetic, and cyclic indexing.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(1)$ per query — the mathematical formula computes the answer in constant time. Total: $O(q)$. |
| **Space** | $O(n)$ — the original array is stored unchanged; no auxiliary rotation array needed. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'circularArrayRotation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER k
 *  3. INTEGER_ARRAY queries
 */

vector<int> circularArrayRotation(vector<int> a, int k, vector<int> queries) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string first_multiple_input_temp;
    getline(cin, first_multiple_input_temp);

    vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

    int n = stoi(first_multiple_input[0]);

    int k = stoi(first_multiple_input[1]);

    int q = stoi(first_multiple_input[2]);

    string a_temp_temp;
    getline(cin, a_temp_temp);

    vector<string> a_temp = split(rtrim(a_temp_temp));

    vector<int> a(n);

    for (int i = 0; i < n; i++) {
        int a_item = stoi(a_temp[i]);

        a[i] = a_item;
    }

    vector<int> queries(q);

    for (int i = 0; i < q; i++) {
        string queries_item_temp;
        getline(cin, queries_item_temp);

        int queries_item = stoi(ltrim(rtrim(queries_item_temp)));

        queries[i] = queries_item;
    }

    vector<int> result = circularArrayRotation(a, k, queries);

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

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
```

## Full Solution

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'circularArrayRotation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER k
 *  3. INTEGER_ARRAY queries
 */

vector<int> circularArrayRotation(vector<int> a, int k, vector<int> queries) {
    int n = a.size();
    // After k right rotations, the element at original index i moves to (i + k) % n.
    // So for a query index m, the answer is a[(m - k % n + n) % n].
    int rot = k % n;
    vector<int> result;
    for (int m : queries) {
        result.push_back(a[((m - rot) % n + n) % n]);
    }
    return result;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string first_multiple_input_temp;
    getline(cin, first_multiple_input_temp);

    vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

    int n = stoi(first_multiple_input[0]);

    int k = stoi(first_multiple_input[1]);

    int q = stoi(first_multiple_input[2]);

    string a_temp_temp;
    getline(cin, a_temp_temp);

    vector<string> a_temp = split(rtrim(a_temp_temp));

    vector<int> a(n);

    for (int i = 0; i < n; i++) {
        int a_item = stoi(a_temp[i]);

        a[i] = a_item;
    }

    vector<int> queries(q);

    for (int i = 0; i < q; i++) {
        string queries_item_temp;
        getline(cin, queries_item_temp);

        int queries_item = stoi(ltrim(rtrim(queries_item_temp)));

        queries[i] = queries_item;
    }

    vector<int> result = circularArrayRotation(a, k, queries);

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

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
```


## References & Navigation

- **Related Notes:** [[Complexity Analysis]], [[Computational Thinking in Problem Solving]]
- **Previous Problem:** [[09 - Anagram]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

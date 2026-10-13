---
id: csalgcm_ps_fool_06_minimum_distances
type: problem_set
course: CSALGCM
topic: "Minimum Distances"
status: solved
difficulty: Easy
hackerrank_domain: Arrays
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Arrays]] #[[Hash Map]]

---

# Minimum Distances

## Problem Description

The **distance** between two indices $i$ and $j$ in an array is defined as $|i - j|$. Given an array, find the minimum distance between any two matching values. If no matching pair exists, return $-1$.

**Input Format:**
- First line: integer `n`
- Second line: `n` space-separated integers

**Output Format:**
- A single integer: the minimum distance, or `-1` if no pair exists.

**Constraints:** $1 \leq n \leq 10^3$; $1 \leq a[i] \leq 10^5$

**Sample:**
| Input | Output | Reason |
|-------|--------|--------|
| `6`<br>`7 1 3 4 1 7` | `3` | `7` at index 0 and 5 → distance 5. `1` at index 1 and 4 → distance **3** (minimum). |

---

## Approach & Intuition

A naive approach would check every pair of equal values — that's $O(n^2)$. The smart approach uses a **hash map** to remember the last seen index of each value.

**Strategy:**
1. Walk through the array left to right.
2. For each element `a[i]`:
   - If the value has been seen before (it's in the map), compute the distance `i - lastSeen[a[i]]` and update the minimum.
   - Store `lastSeen[a[i]] = i` (the most recent occurrence).
3. Return the minimum distance found, or `-1` if none.

> [!note] Why store only the *last* seen index?
> Because we're scanning left to right, the distance from the current index to the **most recent** occurrence of the same value is always smaller than the distance to any earlier occurrence. You only need to track one index per value.

> [!tip] Data Structure Pattern
> This is the classic **"first/last seen" hash map** pattern. Memorize it — it appears in dozens of interview problems (e.g., Two Sum, Longest Substring Without Repeating Characters).

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(n)$ — single pass through the array; each hash map operation is $O(1)$ amortized. |
| **Space** | $O(k)$ — where $k$ is the number of distinct values; at most $O(n)$. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'minimumDistances' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */a

int minimumDistances(vector<int> a) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string a_temp_temp;
    getline(cin, a_temp_temp);

    vector<string> a_temp = split(rtrim(a_temp_temp));

    vector<int> a(n);

    for (int i = 0; i < n; i++) {
        int a_item = stoi(a_temp[i]);

        a[i] = a_item;
    }

    int result = minimumDistances(a);

    fout << result << "\n";

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
 * Complete the 'minimumDistances' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

int minimumDistances(vector<int> a) {
    unordered_map<int, int> lastSeen; // value -> last index
    int minDist = INT_MAX;

    for (int i = 0; i < (int)a.size(); i++) {
        if (lastSeen.count(a[i])) {
            minDist = min(minDist, i - lastSeen[a[i]]);
        }
        lastSeen[a[i]] = i;
    }

    return (minDist == INT_MAX) ? -1 : minDist;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string a_temp_temp;
    getline(cin, a_temp_temp);

    vector<string> a_temp = split(rtrim(a_temp_temp));

    vector<int> a(n);

    for (int i = 0; i < n; i++) {
        int a_item = stoi(a_temp[i]);

        a[i] = a_item;
    }

    int result = minimumDistances(a);

    fout << result << "\n";

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

- **Related Notes:** [[Problems, Problem Types, and Algorithms]], [[Complexity Analysis]]
- **Previous Problem:** [[05 - Library Fine]]
- **Next Problem:** [[07 - Repeated String]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

---
id: csalgcm_ps_fool_03_mini_max_sum
type: problem_set
course: CSALGCM
topic: "Mini-Max Sum"
status: solved
difficulty: Easy
hackerrank_domain: Warmup
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Arrays]] #[[Math]]

---

# Mini-Max Sum

## Problem Description

Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers.

**Input Format:**
- A single line with 5 space-separated integers.

**Output Format:**
- Two space-separated long integers: the minimum sum and maximum sum.

**Constraints:** $1 \leq arr[i] \leq 10^9$

**Sample:**
| Input | Output |
|-------|--------|
| `1 2 3 4 5` | `10 14` |

*Explanation: Min = 1+2+3+4=10 (drop the max). Max = 2+3+4+5=14 (drop the min).*

---

## Approach & Intuition

The key observation is that if you want to **minimize** the sum of 4 out of 5 elements, you should **exclude the largest** element. Conversely, to **maximize**, you exclude the **smallest** element.

This means you only need two things from the array:
1. The **total sum** of all five elements.
2. The **minimum** and **maximum** individual elements.

Then:
- **Min sum** = `total - max`
- **Max sum** = `total - min`

This avoids sorting and runs in a single linear pass!

> [!warning] Integer Overflow
> Each element can be up to $10^9$. Four of them can sum to $4 \times 10^9$, which exceeds the range of a 32-bit signed integer (`INT_MAX` ≈ $2.1 \times 10^9$). You **must** use `long long` for the accumulator, otherwise you get silent overflow and wrong answers.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(n)$ — single pass to compute total, min, and max simultaneously. |
| **Space** | $O(1)$ — only three extra variables: `total`, `mn`, `mx`. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

void miniMaxSum(vector<int> arr) {

}

int main()
{

    string arr_temp_temp;
    getline(cin, arr_temp_temp);

    vector<string> arr_temp = split(rtrim(arr_temp_temp));

    vector<int> arr(5);

    for (int i = 0; i < 5; i++) {
        int arr_item = stoi(arr_temp[i]);

        arr[i] = arr_item;
    }

    miniMaxSum(arr);

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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

void miniMaxSum(vector<int> arr) {
    long long total = 0;
    int mn = arr[0], mx = arr[0];
    for (int x : arr) {
        total += x;
        mn = min(mn, x);
        mx = max(mx, x);
    }
    // min sum = sum of 4 smallest = total - largest
    // max sum = sum of 4 largest  = total - smallest
    cout << (total - mx) << " " << (total - mn) << "\n";
}

int main()
{

    string arr_temp_temp;
    getline(cin, arr_temp_temp);

    vector<string> arr_temp = split(rtrim(arr_temp_temp));

    vector<int> arr(5);

    for (int i = 0; i < 5; i++) {
        int arr_item = stoi(arr_temp[i]);

        arr[i] = arr_item;
    }

    miniMaxSum(arr);

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
- **Previous Problem:** [[02 - Simple Array Sum]]
- **Next Problem:** [[04 - CamelCase]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

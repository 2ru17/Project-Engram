---
id: csalgcm_ps_fool_08_sherlock_and_squares
type: problem_set
course: CSALGCM
topic: "Sherlock and Squares"
status: solved
difficulty: Easy
hackerrank_domain: Math
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Math]] #[[Square Roots]]

---

# Sherlock and Squares

## Problem Description

Watson gives Sherlock two integers, `a` and `b`. Sherlock must count the number of **perfect square integers** within the inclusive range `[a, b]`.

A perfect square is an integer that is the square of another integer (e.g., 1, 4, 9, 16, 25…).

**Input Format:**
- First line: `q` (number of test cases)
- Next `q` lines: two integers `a` and `b`

**Output Format:**
- For each test case, a single integer: the count of perfect squares in `[a, b]`.

**Constraints:** $1 \leq a \leq b \leq 10^9$; $1 \leq q \leq 100$

**Sample:**
| Input | Output | Explanation |
|-------|--------|-------------|
| `2`<br>`3 9`<br>`17 24` | `2`<br>`0` | Squares in [3,9]: 4=2², 9=3² → 2. Squares in [17,24]: none → 0 |

---

## Approach & Intuition

The number of perfect squares in the range `[1, x]` is exactly $\lfloor \sqrt{x} \rfloor$ — there are `floor(sqrt(x))` perfect squares from 1 to x (namely $1^2, 2^2, \ldots, \lfloor\sqrt{x}\rfloor^2$).

Using this, the count of perfect squares in `[a, b]` is:
$$\text{count} = \lfloor\sqrt{b}\rfloor - \lfloor\sqrt{a-1}\rfloor$$

**Why?**  
`floor(sqrt(b))` counts squares in `[1, b]`.  
`floor(sqrt(a-1))` counts squares in `[1, a-1]`.  
Subtracting gives the squares strictly in `[a, b]`.

> [!warning] Floating-Point Precision
> `sqrt()` returns a `double`, which has precision limits. For large inputs near $10^9$, `sqrt(999999999)` might return `31622.776...` but `31623.0 - epsilon`, causing incorrect integer truncation. The solution must **verify and correct** the computed integer square root.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(1)$ per query — just two `sqrt` calls plus constant-time correction. |
| **Space** | $O(1)$ — no data structures. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'squares' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER a
 *  2. INTEGER b
 */

int squares(int a, int b) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string q_temp;
    getline(cin, q_temp);

    int q = stoi(ltrim(rtrim(q_temp)));

    for (int q_itr = 0; q_itr < q; q_itr++) {
        string first_multiple_input_temp;
        getline(cin, first_multiple_input_temp);

        vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

        int a = stoi(first_multiple_input[0]);

        int b = stoi(first_multiple_input[1]);

        int result = squares(a, b);

        fout << result << "\n";
    }

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
 * Complete the 'squares' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER a
 *  2. INTEGER b
 */

int squares(int a, int b) {
    // Number of perfect squares in [a, b]:
    //   floor(sqrt(b)) - floor(sqrt(a - 1))
    int sqrtB = (int)sqrt((double)b);
    int sqrtA = (int)sqrt((double)(a - 1));

    // Guard against floating-point imprecision
    while ((long long)sqrtB * sqrtB > b)  sqrtB--;
    while ((long long)(sqrtA + 1) * (sqrtA + 1) <= (a - 1)) sqrtA++;

    return sqrtB - sqrtA;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string q_temp;
    getline(cin, q_temp);

    int q = stoi(ltrim(rtrim(q_temp)));

    for (int q_itr = 0; q_itr < q; q_itr++) {
        string first_multiple_input_temp;
        getline(cin, first_multiple_input_temp);

        vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

        int a = stoi(first_multiple_input[0]);

        int b = stoi(first_multiple_input[1]);

        int result = squares(a, b);

        fout << result << "\n";
    }

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

- **Related Notes:** [[Complexity Analysis]]
- **Previous Problem:** [[07 - Repeated String]]
- **Next Problem:** [[09 - Anagram]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

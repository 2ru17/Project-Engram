---
id: csalgcm_ps_fool_05_library_fine
type: problem_set
course: CSALGCM
topic: "Library Fine"
status: solved
difficulty: Easy
hackerrank_domain: Implementation
---
# Library Fine

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status` | **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Implementation]] #[[Conditionals]]

---

## Problem Description

A library charges fines for late book returns. Given the actual return date and the due date, calculate the fine.

**Fine Rules:**
- Returned **before or on** the due date: **No fine** ($0$)
- Returned **after the due day** (same month and year): $15 \times (\text{days late})$ Hackos
- Returned **after the due month** (same year): $500 \times (\text{months late})$ Hackos
- Returned **after the due year**: fixed fine of $10000$ Hackos

**Input Format:**
- Line 1: three space-separated integers `d1 m1 y1` — actual return date (day, month, year)
- Line 2: three space-separated integers `d2 m2 y2` — due date (day, month, year)

**Output Format:**
- A single integer: the fine amount (or $0$ if there is none).

**Constraints:**
- $1 \leq d1, d2 \leq 31$
- $1 \leq m1, m2 \leq 12$
- $1 \leq y1, y2 \leq 3000$
- It is guaranteed that the dates will be valid Gregorian calendar dates.

**Sample Input 0**

```text
9 6 2015
6 6 2015
```

**Sample Output 0**

```text
45
```

*Explanation: Same year and same month ($y_1 = y_2 = 2015, m_1 = m_2 = 6$), and $9 - 6 = 3$ days late, so $15 \times 3 = 45$.*

**Sample Input 1**

```text
1 1 2016
1 1 2015
```

**Sample Output 1**

```text
10000
```

*Explanation: Returned after the expected calendar year ($y_1 > y_2$), so the flat fine is $10000$.*

**Sample Input 2**

```text
5 3 2015
5 4 2015
```

**Sample Output 2**

```text
0
```

*Explanation: Returned before the due date, so no fine is charged.*

---

## Approach & Intuition

This is a **cascading conditional** (priority-ordered if-else) problem. The key is to check conditions in the **right order** — from coarsest granularity (year) down to finest (day):

1. **Check year first:** If `y1 > y2`, the penalty is always flat regardless of month/day.
2. **Check month next** (only if same year): If `m1 > m2`, charge per month.
3. **Check day last** (only if same year and month): If `d1 > d2`, charge per day.
4. **Otherwise:** Return 0 (on time or early).

> [!warning] Common Mistake
> Do NOT use a combined date comparison like `return15 * (d1-d2)` without first checking that `y1 == y2 && m1 == m2`. If the return is in a different month or year, the day difference is meaningless.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(1)$ — a fixed number of comparisons regardless of input size. |
| **Space** | $O(1)$ — six integer variables, no dynamic allocation. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'libraryFine' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER d1
 *  2. INTEGER m1
 *  3. INTEGER y1
 *  4. INTEGER d2
 *  5. INTEGER m2
 *  6. INTEGER y2
 */

int libraryFine(int d1, int m1, int y1, int d2, int m2, int y2) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string first_multiple_input_temp;
    getline(cin, first_multiple_input_temp);

    vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

    int d1 = stoi(first_multiple_input[0]);

    int m1 = stoi(first_multiple_input[1]);

    int y1 = stoi(first_multiple_input[2]);

    string second_multiple_input_temp;
    getline(cin, second_multiple_input_temp);

    vector<string> second_multiple_input = split(rtrim(second_multiple_input_temp));

    int d2 = stoi(second_multiple_input[0]);

    int m2 = stoi(second_multiple_input[1]);

    int y2 = stoi(second_multiple_input[2]);

    int result = libraryFine(d1, m1, y1, d2, m2, y2);

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
 * Complete the 'libraryFine' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER d1  (actual return day)
 *  2. INTEGER m1  (actual return month)
 *  3. INTEGER y1  (actual return year)
 *  4. INTEGER d2  (due day)
 *  5. INTEGER m2  (due month)
 *  6. INTEGER y2  (due year)
 */

int libraryFine(int d1, int m1, int y1, int d2, int m2, int y2) {
    // Returned after the due year
    if (y1 > y2) return 10000;
    // Returned in the same year but after the due month
    if (y1 == y2 && m1 > m2) return 500 * (m1 - m2);
    // Returned in the same year and month but after the due day
    if (y1 == y2 && m1 == m2 && d1 > d2) return 15 * (d1 - d2);
    // On time or early
    return 0;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string first_multiple_input_temp;
    getline(cin, first_multiple_input_temp);

    vector<string> first_multiple_input = split(rtrim(first_multiple_input_temp));

    int d1 = stoi(first_multiple_input[0]);

    int m1 = stoi(first_multiple_input[1]);

    int y1 = stoi(first_multiple_input[2]);

    string second_multiple_input_temp;
    getline(cin, second_multiple_input_temp);

    vector<string> second_multiple_input = split(rtrim(second_multiple_input_temp));

    int d2 = stoi(second_multiple_input[0]);

    int m2 = stoi(second_multiple_input[1]);

    int y2 = stoi(second_multiple_input[2]);

    int result = libraryFine(d1, m1, y1, d2, m2, y2);

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

- **Related Notes:** [[Computational Thinking in Problem Solving]]
- **Previous Problem:** [[04 - CamelCase]]
- **Next Problem:** [[06 - Minimum Distances]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

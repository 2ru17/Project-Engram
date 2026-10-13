---
id: csalgcm_ps_fool_07_repeated_string
type: problem_set
course: CSALGCM
topic: "Repeated String"
status: solved
difficulty: Easy
hackerrank_domain: Strings
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Strings]] #[[Math]] #[[Modular Arithmetic]]

---

# Repeated String

## Problem Description

Lilah has a string `s` that she repeats infinitely. Given `s` and an integer `n`, count the number of times the character `'a'` appears in the first `n` characters of the infinite repetition.

**Input Format:**
- Line 1: string `s`
- Line 2: long integer `n`

**Output Format:**
- A single long integer: the count of `'a'` in the first `n` characters.

**Constraints:** $1 \leq |s| \leq 100$; $1 \leq n \leq 10^{12}$

**Sample:**
| Input | Output | Explanation |
|-------|--------|-------------|
| `aba`<br>`10` | `7` | `ababababab` (first 10 chars). `a` appears at positions 0,2,4,6,8,9 — wait, count: a,b,a,b,a,b,a,b,a,b → 7 `a`'s. |

---

## Approach & Intuition

The key trap here is `n` can be up to $10^{12}$ — you **cannot** build the actual repeated string. That would be a memory and time disaster. Instead, use **math**.

**Key Insight:** The infinite string is just the pattern `s` repeated forever. The first `n` characters consist of:
- `fullCopies = n / len` complete copies of `s`
- A remaining prefix of length `remainder = n % len`

So the count of `'a'` in the first `n` characters is:
$$\text{count} = \text{fullCopies} \times \text{countInFull} + \text{countInRem}$$

Where:
- `countInFull` = number of `'a'`'s in one full copy of `s`
- `countInRem` = number of `'a'`'s in `s[0..remainder-1]`

This reduces an $O(n)$ problem (building the string) to an $O(|s|)$ computation!

> [!tip] This is a Division + Remainder Pattern
> Anytime you deal with a repeating structure and a large `n`, decompose it into `quotient × unit_count + remainder_count`. This pattern appears in many periodic/cyclic problems.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(\|s\|)$ — two passes through `s` at most (once for `countInFull`, once for the prefix of length `remainder ≤ |s|`). |
| **Space** | $O(1)$ — no extra data structures; just a few long integers. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */

long repeatedString(string s, long n) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string s;
    getline(cin, s);

    string n_temp;
    getline(cin, n_temp);

    long n = stol(ltrim(rtrim(n_temp)));

    long result = repeatedString(s, n);

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
```

## Full Solution

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */

long repeatedString(string s, long n) {
    long len = s.length();

    // Count 'a's in one full copy of s
    long countInFull = 0;
    for (char c : s) {
        if (c == 'a') countInFull++;
    }

    long fullCopies   = n / len;
    long remainder    = n % len;

    // Count 'a's in the partial prefix of length 'remainder'
    long countInRem = 0;
    for (long i = 0; i < remainder; i++) {
        if (s[i] == 'a') countInRem++;
    }

    return fullCopies * countInFull + countInRem;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string s;
    getline(cin, s);

    string n_temp;
    getline(cin, n_temp);

    long n = stol(ltrim(rtrim(n_temp)));

    long result = repeatedString(s, n);

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
```


## References & Navigation

- **Related Notes:** [[Complexity Analysis]], [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[06 - Minimum Distances]]
- **Next Problem:** [[08 - Sherlock and Squares]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

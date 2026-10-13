---
id: csalgcm_ps_fool_09_anagram
type: problem_set
course: CSALGCM
topic: "Anagram"
status: solved
difficulty: Easy
hackerrank_domain: Strings
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Strings]] #[[Frequency Count]]

---

# Anagram

## Problem Description

Two strings are **anagrams** if one can be rearranged to form the other — meaning they contain exactly the same characters with the same frequencies.

Given a string `s`, split it into two halves of equal length, and determine the **minimum number of character substitutions** needed to make the two halves anagrams of each other.

If the string has an **odd length**, it cannot be split equally — return `-1`.

**Input Format:**
- First line: integer `q` (test cases)
- Next `q` lines: one string `s` per line

**Output Format:**
- For each test case: the minimum substitutions, or `-1`.

**Constraints:** $1 \leq q \leq 100$; $1 \leq |s| \leq 10^4$; `s` contains only lowercase English letters.

**Sample:**
| Input | Output | Explanation |
|-------|--------|-------------|
| `aaabbb` | `3` | left=`aaa`, right=`bbb`. Change 3 `a`→`b` or 3 `b`→`a`. |
| `ab` | `1` | left=`a`, right=`b`. 1 change. |
| `abc` | `-1` | Odd length → impossible. |

---

## Approach & Intuition

After splitting the string into `left` and `right` halves, we need to find how many characters we must change in one half so that both halves have identical character frequencies.

**Key Insight:** Use a **frequency difference array** of size 26 (one slot per lowercase letter):
1. For each character in `left`, **increment** its frequency count.
2. For each character in `right`, **decrement** its frequency count.
3. The final array shows the **surplus** of each character in `left` over `right`.
4. The number of substitutions needed is the **sum of all positive surpluses** (characters that `left` has too many of — we change those to match what `right` needs).

> [!note] Why only count positive values?
> A positive entry means `left` has excess of that character; a negative entry means `right` has excess. Each substitution fixes one surplus in `left` AND one deficit simultaneously (you change a surplus character to a deficit character). So summing only the positives (or only the negatives) gives the exact number of changes. They will be equal.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(n)$ — two linear passes through the two halves plus a fixed 26-element scan. |
| **Space** | $O(1)$ — the frequency array is always size 26, regardless of input length. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

int anagram(string s) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string q_temp;
    getline(cin, q_temp);

    int q = stoi(ltrim(rtrim(q_temp)));

    for (int q_itr = 0; q_itr < q; q_itr++) {
        string s;
        getline(cin, s);

        int result = anagram(s);

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
```

## Full Solution

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

int anagram(string s) {
    int len = s.length();
    // If length is odd, it's impossible to split into two equal anagrams
    if (len % 2 != 0) return -1;

    int half = len / 2;
    string left  = s.substr(0, half);
    string right = s.substr(half);

    int freq[26] = {0};

    // Increment for each char in left half
    for (char c : left)  freq[c - 'a']++;
    // Decrement for each char in right half
    for (char c : right) freq[c - 'a']--;

    // The number of changes needed equals the total surplus in either direction
    int changes = 0;
    for (int i = 0; i < 26; i++) {
        if (freq[i] > 0) changes += freq[i];
    }
    return changes;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string q_temp;
    getline(cin, q_temp);

    int q = stoi(ltrim(rtrim(q_temp)));

    for (int q_itr = 0; q_itr < q; q_itr++) {
        string s;
        getline(cin, s);

        int result = anagram(s);

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
```


## References & Navigation

- **Related Notes:** [[Problems, Problem Types, and Algorithms]], [[Complexity Analysis]]
- **Previous Problem:** [[08 - Sherlock and Squares]]
- **Next Problem:** [[10 - Circular Array Rotation]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

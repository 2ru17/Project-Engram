---
id: csalgcm_ps_fool_04_camelcase
type: problem_set
course: CSALGCM
topic: "CamelCase"
status: solved
difficulty: Easy
hackerrank_domain: Strings
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Strings]]

---

# CamelCase

## Problem Description

Given a camelCase string, determine how many words it contains.

A camelCase string is a single string formed by concatenating multiple words where the **first letter of each word after the first is capitalized**. The first word is always lowercase.

**Input Format:**
- A single camelCase string `s`.

**Output Format:**
- A single integer: the number of words.

**Constraints:** $1 \leq \text{len}(s) \leq 10^5$

**Sample:**
| Input | Output | Explanation |
|-------|--------|-------------|
| `saveChangesInTheEditor` | `5` | save / Changes / In / The / Editor |

---

## Approach & Intuition

The key property of camelCase is that **every uppercase letter signals the start of a new word**. The first word has no leading uppercase letter, so we account for it by starting the count at **1**.

Then we simply scan the string character by character and increment the counter every time we encounter an uppercase letter.

**Mental model:** Think of an uppercase letter as a "word separator" embedded inside the string rather than being a separate whitespace character.

> [!tip] Pattern Recognition
> This is a **linear scan with a counter** pattern — one of the most common patterns in string problems. Recognize it: you only care about one specific property of each character, you never need to look ahead or behind.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(n)$ — each character is examined exactly once. |
| **Space** | $O(1)$ — only a single integer counter is maintained. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

/*
 * Complete the 'camelcase' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

int camelcase(string s) {

}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string s;
    getline(cin, s);

    int result = camelcase(s);

    fout << result << "\n";

    fout.close();

    return 0;
}
```

## Full Solution

```cpp
#include <bits/stdc++.h>

using namespace std;

/*
 * Complete the 'camelcase' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

int camelcase(string s) {
    // Each uppercase letter marks the start of a new word.
    // The first word has no leading uppercase, so start count at 1.
    int count = 1;
    for (char c : s) {
        if (isupper(c)) count++;
    }
    return count;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string s;
    getline(cin, s);

    int result = camelcase(s);

    fout << result << "\n";

    fout.close();

    return 0;
}
```


## References & Navigation

- **Related Notes:** [[Computational Thinking in Problem Solving]]
- **Previous Problem:** [[03 - Mini-Max Sum]]
- **Next Problem:** [[05 - Library Fine]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]

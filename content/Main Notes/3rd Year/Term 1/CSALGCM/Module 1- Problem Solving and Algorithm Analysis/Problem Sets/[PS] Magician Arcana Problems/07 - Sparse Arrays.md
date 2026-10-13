---
id: csalgcm_ps_magician_07_sparse_arrays
type: problem_set
course: CSALGCM
topic: "Sparse Arrays"
status: solved
difficulty: Medium
hackerrank_domain: Strings
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Strings]] #[[Hash Map]]

---

---

# Sparse Arrays

## Problem Description
Given a collection of input strings (`stringList`) and a collection of query strings (`queries`), determine how many times each query string occurs in the input list. The result should be an array of counts mapping iteratively to the query requests.

**Input Format:**
 Suggest Edits
The first line contains and integer , the size of                                     .
Each of the next       lines contains a string                                .
The next line contains , the size of                           .
Each of the next      lines contains a string                        .

**Output Format:**
 Download problem statement
 •          : the results of each query
                                                                                                                          Download all test cases

**Constraints:**
.$
$
                                                                                                         Copy Download$

**Sample:**
| Input | Output |
|-------|--------|
| `1<br><br><br><br>                                                                                                      4<br>                   aba baba aba xzxb                                                                  aba<br>                                                                                                      baba<br>                       Array: stringList                                                              aba<br>                                                                                                      xzxb<br>                                                                                                      3<br>                                                                                                      aba<br>                                                                                                      xzxb<br>                                                                                                      ab<br><br>                     aba xzxb ab<br>                      Array: queries` | `1<br><br><br>     2<br>     1<br>     0` |

---

## Approach & Intuition
The problem asks us to count how many times various query strings appear within a list of input strings. A naive approach would be to take each query string and iterate through the entire input list to count matches. If there are $Q$ queries and $N$ input strings, this requires $O(Q \times N)$ comparisons, which will Time Out on large datasets.

To optimize this, we can precompute the frequencies of the input strings using a **Hash Map**, transforming the costly linear scans into instant lookups.
Here is the step-by-step logic of the C++ implementation:
1. **Frequency Map Building:** We instantiate an `unordered_map<string, int> freq`. We loop through each string `s` in the `stringList` and increment its count in the map (`freq[s]++`). Hash maps provide amortized $O(1)$ insertion time, so tallying up all frequencies happens in a single, fast pass.
2. **Query Resolution:** We create a `result` vector to store our answers. We then loop through each query string `q` in the `queries` array.
3. **Constant-Time Lookups:** For each query `q`, we check if it exists in our hash map using `freq.count(q)`. If it does, we append its stored frequency (`freq[q]`) to the `result` vector. If it doesn't exist, it means the query string never appeared in the input list, so we append `0`.
4. **Final Return:** We return the fully populated `result` vector.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N \cdot L + Q \cdot L)$** — where $N$ is the size of `stringList`, $Q$ is the number of `queries`, and $L$ is the maximum length of a string. We spend $O(N \cdot L)$ to hash all input strings into the map and $O(Q \cdot L)$ to hash and look up the queries. This is significantly faster than the $O(Q \cdot N \cdot L)$ naive approach. |
| **Space** | **$O(N \cdot L)$** — In the worst-case scenario where every string in the input list is completely unique, the hash map will store $N$ distinct strings of length up to $L$, consuming linear space relative to the input size. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);

/*
 * Complete the 'matchingStrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY stringList
 *  2. STRING_ARRAY queries
 */

vector<int> matchingStrings(vector<string> stringList, vector<string> queries) {
    // Write your code here
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string stringList_count_temp;
    getline(cin, stringList_count_temp);

    int stringList_count = stoi(ltrim(rtrim(stringList_count_temp)));

    vector<string> stringList(stringList_count);

    for (int i = 0; i < stringList_count; i++) {
        string stringList_item;
        getline(cin, stringList_item);

        stringList[i] = stringList_item;
    }

    string queries_count_temp;
    getline(cin, queries_count_temp);

    int queries_count = stoi(ltrim(rtrim(queries_count_temp)));

    vector<string> queries(queries_count);

    for (int i = 0; i < queries_count; i++) {
        string queries_item;
        getline(cin, queries_item);

        queries[i] = queries_item;
    }

    vector<int> res = matchingStrings(stringList, queries);

    for (size_t i = 0; i < res.size(); i++) {
        fout << res[i];

        if (i != res.size() - 1) {
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
 * Complete the 'matchingStrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY stringList
 *  2. STRING_ARRAY queries
 */

vector<int> matchingStrings(vector<string> stringList, vector<string> queries) {
    unordered_map<string, int> freq;
    for (const string& s : stringList) freq[s]++;

    vector<int> result;
    for (const string& q : queries) {
        result.push_back(freq.count(q) ? freq[q] : 0);
    }
    return result;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string stringList_count_temp;
    getline(cin, stringList_count_temp);

    int stringList_count = stoi(ltrim(rtrim(stringList_count_temp)));

    vector<string> stringList(stringList_count);

    for (int i = 0; i < stringList_count; i++) {
        string stringList_item;
        getline(cin, stringList_item);

        stringList[i] = stringList_item;
    }

    string queries_count_temp;
    getline(cin, queries_count_temp);

    int queries_count = stoi(ltrim(rtrim(queries_count_temp)));

    vector<string> queries(queries_count);

    for (int i = 0; i < queries_count; i++) {
        string queries_item;
        getline(cin, queries_item);

        queries[i] = queries_item;
    }

    vector<int> res = matchingStrings(stringList, queries);

    for (size_t i = 0; i < res.size(); i++) {
        fout << res[i];

        if (i != res.size() - 1) {
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
- **Previous Problem:** [[06 - Sherlock and Array]]
- **Next Problem:** [[08 - Tree Preorder Traversal]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

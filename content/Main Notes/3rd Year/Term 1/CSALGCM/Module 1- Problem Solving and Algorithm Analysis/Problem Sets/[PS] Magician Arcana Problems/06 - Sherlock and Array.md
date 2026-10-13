---
id: csalgcm_ps_magician_06_sherlock_array
type: problem_set
course: CSALGCM
topic: "Sherlock and Array"
status: solved
difficulty: Easy
hackerrank_domain: Arrays
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Arrays]] #[[Prefix Sum]]

---

---

# Sherlock and Array

## Problem Description
Given an array of integers, determine if there exists an element such that the sum of the elements on its left is strictly equal to the sum of the elements on its right. If it exists, return "YES", otherwise return "NO". (Elements outside the bounds of the array are considered to have a sum of $0$).

**Input Format:**
The first line contains    , the number of test cases.
The next       pairs of lines each represent a test case.
- The first line contains , the number of elements in the array           .
- The second line contains       space-separated integers             where              .

**Output Format:**
 Suggest Edits
 • string: either YES or NO

**Constraints:**
$

**Sample:**
| Input | Output |
|-------|--------|
| `0<br><br><br>   2<br>   3<br>   123<br>   4<br>   1233` | `0<br><br><br>   NO<br>   YES` |

---

## Approach & Intuition
We need to find if there's an index in an array where the sum of all elements to its left equals the sum of all elements to its right. A brute-force approach would loop through each index and calculate the left sum and right sum from scratch, taking $O(N^2)$ time, which is far too slow for large arrays.

The optimal strategy uses the **Prefix Sum** technique combined with basic algebra to solve this in a single pass. 
Here is how the C++ code achieves this step-by-step:
1. **Total Sum Calculation:** First, we traverse the entire array once to compute the `total` sum of all its elements.
2. **Prefix Sum Traversal:** We initialize a `leftSum` variable to 0. We then iterate through the array a second time, index by index.
3. **Algebraic Deduction:** At any given index `i`, we already know the `total` sum of the array, the current `arr[i]` element, and the accumulated `leftSum` up to this point. Because `total = leftSum + arr[i] + rightSum`, we can deduce the right sum without a loop: `rightSum = total - leftSum - arr[i]`.
4. **Balance Check:** We check if `leftSum == rightSum`. If they match, we have found a balanced pivot and immediately return `"YES"`.
5. **Accumulation:** If they don't match, we add the current `arr[i]` to `leftSum` so it is ready for the next iteration step.
6. **Failure State:** If the loop finishes without ever finding a balanced point, we return `"NO"`.

---

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(N)$** — We pass through the array exactly twice: once to calculate the total sum ($O(N)$), and once to find the balance point ($O(N)$). This yields a linear overall time complexity. |
| **Space** | **$O(1)$** — We achieve the result using only three scalar variables (`total`, `leftSum`, and `rightSum`), meaning the memory footprint remains constant regardless of the array's size. |

---

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'balancedSums' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

string balancedSums(vector<int> arr) {
    // Write your code here
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string T_temp;
    getline(cin, T_temp);

    int T = stoi(ltrim(rtrim(T_temp)));

    for (int T_itr = 0; T_itr < T; T_itr++) {
        string n_temp;
        getline(cin, n_temp);

        int n = stoi(ltrim(rtrim(n_temp)));

        string arr_temp_temp;
        getline(cin, arr_temp_temp);

        vector<string> arr_temp = split(rtrim(arr_temp_temp));

        vector<int> arr(n);

        for (int i = 0; i < n; i++) {
            int arr_item = stoi(arr_temp[i]);

            arr[i] = arr_item;
        }

        string result = balancedSums(arr);

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

---

## Full Solution
```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'balancedSums' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

string balancedSums(vector<int> arr) {
    long long total = 0;
    for (int x : arr) total += x;

    long long leftSum = 0;
    for (int i = 0; i < (int)arr.size(); i++) {
        // rightSum = total - leftSum - arr[i]
        long long rightSum = total - leftSum - arr[i];
        if (leftSum == rightSum) return "YES";
        leftSum += arr[i];
    }
    return "NO";
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string T_temp;
    getline(cin, T_temp);

    int T = stoi(ltrim(rtrim(T_temp)));

    for (int T_itr = 0; T_itr < T; T_itr++) {
        string n_temp;
        getline(cin, n_temp);

        int n = stoi(ltrim(rtrim(n_temp)));

        string arr_temp_temp;
        getline(cin, arr_temp_temp);

        vector<string> arr_temp = split(rtrim(arr_temp_temp));

        vector<int> arr(n);

        for (int i = 0; i < n; i++) {
            int arr_item = stoi(arr_temp[i]);

            arr[i] = arr_item;
        }

        string result = balancedSums(arr);

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

---

## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[05 - Queue Using Two Stacks]]
- **Next Problem:** [[07 - Sparse Arrays]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

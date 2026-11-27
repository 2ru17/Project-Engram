---
id: csalgcm_ps_magician_01_bfs
type: problem_set
course: CSALGCM
topic: "Breadth First Search Shortest Reach"
status: solved
difficulty: Medium
hackerrank_domain: Graphs
---
# Breadth First Search: Shortest Reach

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status` | **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[BFS]] #[[Graphs]]

---

## Problem Description

Consider an undirected graph where each edge weighs $6$ units. Each of the nodes is labeled consecutively from $1$ to $n$.

You will be given a number of queries. For each query, you will be given a list of edges describing an undirected graph. After you create a representation of the graph, you must determine and report the shortest distance to each of the other nodes from a given starting position $s$ using the breadth-first search algorithm (BFS). Return an array of distances from the start node in node number order (excluding the start node). If a node is unreachable, return `-1` for that node.

**Input Format:**
The first line contains an integer $q$, the number of queries. Each of the following $q$ sets of lines has the following format:
- The first line contains two space-separated integers $n$ and $m$, the number of nodes and edges in the graph.
- Each line $i$ of the $m$ subsequent lines contains two space-separated integers, $u$ and $v$, that describe an edge between nodes $u$ and $v$.
- The last line contains a single integer, $s$, the node number to start from.

**Output Format:**
- `int[n-1]`: the distances to nodes in increasing node number order, not including the start node (`-1` if a node is not reachable), printed as space-separated integers on a single line per query.

**Constraints:**
- $1 \leq q \leq 10$
- $2 \leq n \leq 1000$
- $1 \leq m \leq \frac{n \cdot (n - 1)}{2}$
- $1 \leq u, v, s \leq n$

**Sample Input 0**

```text
2
4 2
1 2
1 3
1
3 1
2 3
2
```

**Sample Output 0**

```text
6 6 -1
-1 6
```

*Explanation:*
1. Query 1 ($n = 4, s = 1$): nodes $2$ and $3$ are 1 edge ($6$ units) away, and node $4$ is unreachable (`-1`), giving `[6, 6, -1]`.
2. Query 2 ($n = 3, s = 2$): node $1$ is unreachable (`-1`), and node $3$ is 1 edge ($6$ units) away, giving `[-1, 6]`.

---

## Approach & Intuition
In this problem, we need to find the shortest distance from a designated starting node `s` to all other nodes in an undirected graph. Because every edge in the graph carries an identical weight of 6 units, this problem simplifies to finding the shortest path in an unweighted graph, making **Breadth-First Search (BFS)** the ideal algorithm. 

BFS explores the graph radially, level by level, moving outwards from the starting node. Here is the step-by-step logic applied in the provided C++ solution:
1. **Graph Representation:** We first construct the graph using an adjacency list `vector<vector<int>> adj(n + 1)`. For each edge `(u, v)`, we add `v` to `u`'s list and `u` to `v`'s list. Since nodes are 1-indexed, we allocate space for `n + 1` nodes.
2. **State Tracking:** We initialize a `dist` array of size `n + 1` with `-1` for all nodes. This acts both as a tracker for the shortest distance from `s` to each node, and as a "visited" flag (any node with `dist != -1` has been visited). We set the distance of the starting node `dist[s] = 0`.
3. **Queue Initialization:** We push the starting node `s` into a standard `queue<int> bfsQ` to kick off the traversal.
4. **Level-Order Traversal:** While the queue isn't empty, we pop the front node (`cur`). For every unvisited neighbor (`nb`) of `cur`, we set its distance to `dist[nb] = dist[cur] + 6` (since each edge is exactly 6 units long) and push `nb` into the queue. By doing this, we guarantee we record the shortest possible path to `nb`.
5. **Formatting the Output:** Finally, we loop through nodes `1` to `n`. If the node isn't the starting node `s`, we append its computed distance (or `-1` if it remained unreachable) to the `result` vector.

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **$O(V + E)$** — We build the adjacency list in $O(E)$ time. During the BFS, each of the $V$ vertices is pushed and popped from the queue exactly once, and we iterate through all of their neighbors, visiting each of the $E$ edges at most twice (once from each end). This makes the overall traversal time linear with respect to the graph size. |
| **Space** | **$O(V + E)$** — The adjacency list requires $O(V + E)$ space to store the nodes and all undirected edges. Additionally, the BFS queue and the `dist` array each take $O(V)$ auxiliary space. |

---

## Original Stub (HackerRank Template)

```cpp
#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

vector<int> bfs(int n, int m, vector<vector<int>> edges, int s) {
    // Write your code here
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

        int n = stoi(first_multiple_input[0]);

        int m = stoi(first_multiple_input[1]);

        vector<vector<int>> edges(m);

        for (int i = 0; i < m; i++) {
            edges[i].resize(2);

            string edges_row_temp_temp;
            getline(cin, edges_row_temp_temp);

            vector<string> edges_row_temp = split(rtrim(edges_row_temp_temp));

            for (int j = 0; j < 2; j++) {
                int edges_row_item = stoi(edges_row_temp[j]);

                edges[i][j] = edges_row_item;
            }
        }

        string s_temp;
        getline(cin, s_temp);

        int s = stoi(ltrim(rtrim(s_temp)));

        vector<int> result = bfs(n, m, edges, s);

        for (size_t i = 0; i < result.size(); i++) {
            fout << result[i];

            if (i != result.size() - 1) {
                fout << " ";
            }
        }

        fout << "\n";
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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

vector<int> bfs(int n, int m, vector<vector<int>> edges, int s) {
    const int EDGE_WEIGHT = 6;

    // Build adjacency list (1-indexed nodes)
    vector<vector<int>> adj(n + 1);
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }

    // BFS from source s
    vector<int> dist(n + 1, -1);
    queue<int> bfsQ;
    dist[s] = 0;
    bfsQ.push(s);

    while (!bfsQ.empty()) {
        int cur = bfsQ.front();
        bfsQ.pop();
        for (int nb : adj[cur]) {
            if (dist[nb] == -1) {
                dist[nb] = dist[cur] + EDGE_WEIGHT;
                bfsQ.push(nb);
            }
        }
    }

    // Collect distances for all nodes except the source
    vector<int> result;
    for (int i = 1; i <= n; i++) {
        if (i != s) result.push_back(dist[i]);
    }
    return result;
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

        int n = stoi(first_multiple_input[0]);

        int m = stoi(first_multiple_input[1]);

        vector<vector<int>> edges(m);

        for (int i = 0; i < m; i++) {
            edges[i].resize(2);

            string edges_row_temp_temp;
            getline(cin, edges_row_temp_temp);

            vector<string> edges_row_temp = split(rtrim(edges_row_temp_temp));

            for (int j = 0; j < 2; j++) {
                int edges_row_item = stoi(edges_row_temp[j]);

                edges[i][j] = edges_row_item;
            }
        }

        string s_temp;
        getline(cin, s_temp);

        int s = stoi(ltrim(rtrim(s_temp)));

        vector<int> result = bfs(n, m, edges, s);

        for (size_t i = 0; i < result.size(); i++) {
            fout << result[i];

            if (i != result.size() - 1) {
                fout << " ";
            }
        }

        fout << "\n";
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
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Next Problem:** [[02 - Cycle Detection]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]

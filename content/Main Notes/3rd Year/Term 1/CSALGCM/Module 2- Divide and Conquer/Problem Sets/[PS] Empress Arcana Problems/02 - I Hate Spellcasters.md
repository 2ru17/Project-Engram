---
id: csalgcm_ps_empress_02_spellcasters
type: problem_set
course: CSALGCM
topic: "I Hate Spellcasters"
status: solved
difficulty: Easy
hackerrank_domain: Implementation
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Empress Arcana]]

---

# I Hate Spellcasters

## Problem Description
Pat is a new tunnel master for the popular tabletop roleplaying game Tunnels and Troglodytes.
She had recently finished a campaign with her T&T group, but one particular encounter near the
end of the campaign sort of went badly because of one kind of character: the spellcaster.
Their tunnel master (the one who runs the game) told them afterwards that they should never put
more than 6 spellcasters in combat, because the headaches induced by having spellcasters in
combat grow very quickly. In fact, there is a formula to compute for the headache measure H of
an encounter, which only requires one variable n, which is the number of spellcasters. The
formula is as follows
$H = a \cdot sin(n) + a \cdot n$
where a is a constant and n is the number of spellcasters.
Note that even in the fantastical world of Tunnels and Troglodytes, there is no such thing as a half
creature or a negative creature, so n must be a non-negative integer i.e. $n \ge 0$.
Now, the tunnelmaster of the real world secretly knows Pat's headache threshold T. This means
that if an encounter's H value is strictly greater than T, Pat will not be able to run the encounter
at all and she will spontaneously combust on the spot.
Given a and several values of T, find the maximum number of spellcasters n Pat can handle in an
encounter without spontaneously combusting.

**Input Format:**
Input consists of a single line containing 2 space-separated integers a and Q, indicating the
constant in the headache measure formula and the number of queries.
Q lines follow, each containing a single value for T, which indicates Pat's headache threshold.

**Output Format:**
Output consists of N lines, each containing the maximum integer n, denoting the maximum
spellcasters Pat can put in her encounters without spontaneously combusting.
If Pat can handle an unlimited number of spellcasters, print "Pat is the Best Tunnel Master!"
without quotes on the corresponding line.

**Constraints:**
$0 \le a, T \le 10^9$
$1 \le Q \le 2 \cdot 10^5$

**Sample:**
| Input | Output |
|-------|--------|
| `1 3<br>10<br>20<br>30` | `10<br>19<br>30` |

---

## Approach & Intuition
> **🗂️ Abstract the problem**
> The headache formula is `H(n) = a·sin(n) + a·n`. Given a constant `a` and a threshold `T`, find the maximum non-negative integer `n` such that `H(n) ≤ T`. If `a = 0`, headache is always 0 → unlimited spellcasters.

> **🐢 Dumb sol?**
> Try n = 0, 1, 2, ... until H(n) > T. Return n−1.
> **O(T/a)** — if T = 10⁹ and a = 1, that's a billion iterations → TLE.

> **🚀 Smart sol?**
> Since sin(n) ∈ [−1, 1], H(n) ≥ a·(n−1). So the maximum possible answer is at most `T/a + 2`. Start from there and scan downward (at most ~3 steps).
> **O(1) per query** — instant.

---

## Why Not Binary Search?

`H(n) = a·(sin(n) + n)` is **NOT monotone** because sin oscillates:

```
n:   0    1    2    3    4    5    6    7    8    9   10   11
H: 0.00 1.84 2.91 3.14 3.24 4.04 5.72 7.66 8.99 9.41 9.46 10.00
                        ↓                                    ↑
                  H dips here                          H jumps here
```

Binary search assumes monotonicity. It would pick the wrong half on a dip. However, the sin contribution is bounded to ±a, so the function can't dip MORE than 1 unit below `a·n`. That's why scanning down from `T/a + 2` always works — we only ever need to check ~3 values.

---

## Trace (a=1, T=10)

```
Upper bound = 10/1 + 2 = 12

n=12: H = sin(12)+12 = 11.46 > 10 → skip
n=11: H = sin(11)+11 = 10.00 > 10 → skip  (barely! ~10.000010)
n=10: H = sin(10)+10 = 9.456 ≤ 10 → answer = 10 ✓
```

Only 3 iterations from the upper bound!

---

## ⚠️ Pitfall: Floating Point Precision

At n=11, a=1: `sin(11) + 11 ≈ 10.0000097`, which is BARELY above 10. Double precision has ~15 significant digits, so this is well within safe territory. But if the problem used larger `a` values and marginal thresholds, precision would matter more. Lucky for us, constraints keep things clean.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(Q)$ | Based on optimal algorithm
| **Space** | $O(1)$ | Required memory

---

## Original Stub (HackerRank Template)
```c
#include <stdio.h>
#include <math.h>

typedef long long ll;

int main() {
  	ll a, q;
    scanf("%lld%lld",&a,&q);
    for(int i = 0; i < q; i++) {
      	ll T;  
      	scanf("%lld",&T);
        /* compute and print answer here */
      	
    }
}
```

## Full Solution
```c
#include <stdio.h>
#include <math.h>

typedef long long ll;

int main() {
  	ll a, q;
    scanf("%lld%lld",&a,&q);
    for(int i = 0; i < q; i++) {
      	ll T;  
      	scanf("%lld",&T);
        /* compute and print answer here */
        // H(n) = a*sin(n) + a*n = a*(sin(n) + n)
        // Find max n >= 0 such that H(n) <= T
        // If a == 0: H = 0 for all n -> unlimited
        if (a == 0) {
            printf("Pat is the Best Tunnel Master!\n");
        } else {
            // H(n) >= a*(n-1), so if a*(n-1) > T then n is too big.
            // Max possible n: T/a + 2 (since sin can be -1 at best)
            ll upper = T / a + 2;
            // Scan downward from upper to find the largest valid n
            ll ans = 0;
            for (ll n = upper; n >= 0; n--) {
                double H = (double)a * (sin((double)n) + (double)n);
                if (H <= (double)T) {
                    ans = n;
                    break;
                }
            }
            printf("%lld\n", ans);
        }
    }
}
```

---

## References & Navigation
- **Related Notes:** [[Divide and Conquer Introduction]]
- **Previous Problem:** [[01 - DPS Check in the Knights of Favonius]]
- **Next Problem:** [[03 - Metacognitive Frequencies]]
- **Parent Set:** [[[PS] Empress Arcana|Empress Arcana Index]]

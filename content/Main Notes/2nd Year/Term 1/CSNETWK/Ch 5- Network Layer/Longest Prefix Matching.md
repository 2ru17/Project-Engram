---
id: Longest-Prefix-Matching
type: note
course: CSNETWK
topic:
status: completed
---

# Longest Prefix Matching

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Longest Prefix Matching is the algorithm used by routers to select the correct output interface for a packet. When a router receives a packet, it l...

## Key Concepts
 Interface 1 Interface 3 Interface 6

## Details / Theory

Definition

Longest Prefix Matching is the algorithm used by routers to select the correct output interface for a packet. When a router receives a packet, it looks at the Destination IP Address. It compares this address against a list of "Prefixes" in its forwarding table.

The Golden Rule

If the destination address matches multiple prefixes in the table, the router must select the entry with the longest matching prefix (the most specific match).
 _Analogy:_ Think of this like a postal address. "USA" is a match, "California, USA" is a longer match, and "San Francisco, California, USA" is the longest match. The router always delivers to the most specific location known.

## 2. The Forwarding Table

|                           |                  |
| ------------------------- | ---------------- |
| **Prefix Match (Binary)** | **Interface ID** |
| `00`                      | 1                |
| `10`                      | 2                |
| `000`                     | 3                |
| `101`                     | 4                |
| `010`                     | 5                |
| `otherwise` (Default)     | 6                |

**Visual Check**
 **Interface 1** catches addresses starting with `00...` (unless `000...` catches them first!) **Interface 3** catches addresses starting with `000...` (this is _more specific_ than Interface 1). **Interface 6** is the "catch-all" or default gateway. If nothing else matches, it goes here.

## 3. Problem Analysis

### Question 1

**Suppose a datagram arrives at the router, with destination address `11001101`. To which interface will this datagram be forwarded using longest-prefix matching?**

**Analytical Breakdown:**

1. **Analyze the Destination:** `11001101`
2. **Compare against Table:**
Does it start with `00`? **No.** (Starts with 11)
Does it start with `10`? **No.** (Starts with 11)
Does it start with `000`? **No.**
Does it start with `101`? **No.**
Does it start with `010`? **No.**

3. **Conclusion:** Since none of the specific prefixes match the start of the address `11...`, the "Otherwise" rule applies.

**Correct Answer:** **Interface 6**

### Question 2

**Suppose a datagram arrives at the router, with destination address `01110000`. To which interface will this datagram be forwarded using longest-prefix matching?**

**Analytical Breakdown:**

1. **Analyze the Destination:** `01110000`
2. **Compare against Table:**
Does it start with `00`? **No.** (Starts with 01)
Does it start with `10`? **No.**
Does it start with `000`? **No.**
Does it start with `101`? **No.**
Does it start with `010`? **No.** (Close! But the third bit is `1`, not `0`).

3. **Conclusion:** Even though it starts with `0`, it strictly doesn't match `00`, `000`, or `010`. It falls through to the default.

**Correct Answer:** **Interface 6**

### Question 3

**Suppose a datagram arrives at the router, with destination address `01001010`. To which interface will this datagram be forwarded using longest-prefix matching?**

**Analytical Breakdown:**

1. **Analyze the Destination:** `01001010`
2. **Compare against Table:**
Does it start with `00`? **No.** (Starts with 01)
Does it start with `10`? **No.**
Does it start with `000`? **No.**
Does it start with `101`? **No.**
Does it start with `010`? **YES.** The first three bits are an exact match.

3. **Check for Longer Matches:** Are there any other rules longer than 3 bits that match? Looking at the table, `010` is the only match for this pattern.
4. **Conclusion:** The longest (and only) prefix match is `010`.

**Correct Answer:** **Interface 5**

## Summary of Logic (Cheat Sheet)

1. **Step 1:** Read the first few bits of the destination address.
2. **Step 2:** Scan the "Prefix Match" column.
3. **Step 3:** Mark _every_ row that matches the start of the address.
4. **Step 4:** Pick the row with the **most bits** in the prefix.
5. **Step 5:** If NO rows match, choose "Otherwise".

## Common Pitfalls
 Picking the **first** matching prefix instead of the **longest** (most specific) match. Forgetting the "Otherwise" default route when no prefix matches at all. Miscounting prefix bits when converting between dotted-decimal and binary.

## Summary

> TL;DR — Longest prefix matching forwards packets to the interface whose forwarding table prefix matches the most bits of the destination address. When multiple prefixes match, the longest (most specific) one wins; if none match, the default "Otherwise" route is used.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "**Conclusion:** Even though _____ starts with `0`, it strictly doesn't match `00`, `000`, or `010`."?
- **A)** Protocol
- **B)** Router
- **C)** Network
- **D)** it

2. Which word completes the following sentence from the text: "Problem Analysis  ### Question 1  **Suppose a datagram _____ at the router, with destination address `11001101`."?
- **A)** Router
- **B)** arrives
- **C)** Protocol
- **D)** Network

3. Which word completes the following sentence from the text: "--- id: Longest-Prefix-Matching type: note course: CSNETWK topic: status: completed ---  # Longest Prefix Matching  > [!info] Document Metadata > - **Course:** `=this.course` > - **Topic:** `=this.topic` > - **Status:** `=this.status`  **🏷️ _____ #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]  ---  ## Overview  > Longest Prefix Matching is the algorithm used by routers to select the correct output interface for a packet."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** Tags

4. Which word completes the following sentence from the text: "**Compare against Table:** Does _____ start with `00`?"?
- **A)** Router
- **B)** Protocol
- **C)** Network
- **D)** it

5. Which word completes the following sentence from the text: "When multiple prefixes match, the longest (most specific) one _____ if none match, the default "Otherwise" route is used."?
- **A)** Network
- **B)** Router
- **C)** Protocol
- **D)** wins

6. Which word completes the following sentence from the text: "**Step 3:** Mark _every_ row that _____ the start of the address."?
- **A)** Network
- **B)** Protocol
- **C)** Router
- **D)** matches

7. Which word completes the following sentence from the text: "It compares this address against a _____ of "Prefixes" in its forwarding table."?
- **A)** Network
- **B)** Router
- **C)** Protocol
- **D)** list

8. Which word completes the following sentence from the text: "**Correct Answer:** **Interface 6**  ### Question 2  **Suppose a _____ arrives at the router, with destination address `01110000`."?
- **A)** Router
- **B)** Protocol
- **C)** datagram
- **D)** Network

9. Which word completes the following sentence from the text: "To which interface will this datagram be _____ using longest-prefix matching?**  **Analytical Breakdown:**  1."?
- **A)** Router
- **B)** forwarded
- **C)** Network
- **D)** Protocol

10. Which word completes the following sentence from the text: "**Interface 6** is the _____ or default gateway."?
- **A)** Network
- **B)** catchall
- **C)** Router
- **D)** Protocol


### Answer Key & Explanations
1. **D)** it completes the sentence: **Conclusion:** Even though it starts with `0`, it...
2. **B)** arrives completes the sentence: Problem Analysis  ### Question 1  **Suppose a data...
3. **D)** Tags completes the sentence: --- id: Longest-Prefix-Matching type: note course:...
4. **D)** it completes the sentence: **Compare against Table:** Does it start with `00`...
5. **D)** wins completes the sentence: When multiple prefixes match, the longest (most sp...
6. **D)** matches completes the sentence: **Step 3:** Mark _every_ row that matches the star...
7. **D)** list completes the sentence: It compares this address against a list of "Prefix...
8. **C)** datagram completes the sentence: **Correct Answer:** **Interface 6**  ### Question ...
9. **B)** forwarded completes the sentence: To which interface will this datagram be forwarded...
10. **B)** catchall completes the sentence: **Interface 6** is the "catch-all" or default gate...

## References & Navigation

- **Previous Topic:** [[IPv6 Tunneling and Encapsulation]]
- **Next Topic:** [[Dijkstra's Link State Algorithm]]
- **Related Notes:** [[Internetworking]]

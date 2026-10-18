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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. Why do IP routers use the **Longest Prefix Matching (LPM)** rule when looking up a packet's destination IP address in a CIDR forwarding table?
    - **A)** Because IP addresses have variable total bit lengths between 8 and 64 bits.
    - **B)** Because hierarchical route aggregation allows a forwarding table to contain overlapping prefixes (e.g., `/16` for a large ISP block and `/24` for a specific customer subnet carved out of that block); matching the **longest (most specific) prefix** ensures traffic for the carved-out subnet goes to its specific next hop while all other addresses use the aggregate route.
    - **C)** Because shorter prefixes take longer to transmit on fiber-optic links.
    - **D)** Because Longest Prefix Matching chooses the route with the highest hop count.

2. Suppose a router's forwarding table has three entries:
   - Entry 1: `11001000 00010111 00010*** ********` (`/21`) $\to$ Interface 0
   - Entry 2: `11001000 00010111 00011000 ********` (`/24`) $\to$ Interface 1
   - Entry 3: `11001000 00010111 00011*** ********` (`/21`) $\to$ Interface 2
   - Entry 4: `otherwise` (`/0` default route) $\to$ Interface 3
   To which interface will a packet with destination IP `11001000 00010111 00011000 10101010` be forwarded?
    - **A)** Interface 1 (matches both Entry 2 of length `/24` and Entry 3 of length `/21`; `/24` is the longest matching prefix)
    - **B)** Interface 0
    - **C)** Interface 2
    - **D)** Interface 3

3. Using the same forwarding table in Question 2, to which interface will a packet with destination IP `11001000 00010111 00011001 00000001` be forwarded?
    - **A)** Interface 0
    - **B)** Interface 1
    - **C)** Interface 2 (fails Entry 2 at the 24th bit `1 != 0`, but matches all 21 prefix bits of Entry 3)
    - **D)** Interface 3

4. What does the default route `0.0.0.0/0` represent in Longest Prefix Matching?
    - **A)** An invalid address that drops all packets.
    - **B)** A Layer-2 broadcast address.
    - **C)** A `/32` host route to localhost.
    - **D)** A prefix of length $0$ bits that matches **every** 32-bit IPv4 address, serving as the catch-all fallback route whenever no longer prefix (`/1` through `/32`) matches.

5. What hardware memory technology is commonly used in high-speed core routers to perform Longest Prefix Matching across hundreds of thousands of prefixes in a **single clock cycle** ($O(1)$ lookup time)?
    - **A)** Magnetic tape storage
    - **B)** **TCAM (Ternary Content-Addressable Memory)**, which stores `0`, `1`, and `X` ("don't care" mask bits) and compares the destination IP against all prefix entries in parallel.
    - **C)** Standard rotational HDDs
    - **D)** Sequential linked-list traversal in swap space

### Answer Key & Explanations

1. **B**. CIDR prefix hierarchy relies on Longest Prefix Matching so that specific sub-allocations (e.g., `/24`) override broader summary announcements (e.g., `/16`).
2. **A**. The packet's first 24 bits are `11001000 00010111 00011000`, which matches Entry 2 (24 bits), Entry 3 (21 bits), and Entry 4 (0 bits). By LPM, the 24-bit match wins $\to$ Interface 1.
3. **C**. The third octet is `00011001`, which differs from Entry 2 (`00011000`) at bit 24, but matches Entry 3 (`00011***`) across all 21 prefix bits $\to$ Interface 2.
4. **D**. A `/0` prefix compares $0$ leading bits, so every IP address matches it with match length $0$; it is selected only if no entry with prefix length $\ge 1$ matches.
5. **B**. TCAM allows each bit cell to hold `0`, `1`, or `X` (wildcard), performing parallel associative lookup across all CIDR prefixes simultaneously in hardware.

## References & Navigation

- **Previous Topic:** [[IPv6 Tunneling and Encapsulation]]
- **Next Topic:** [[Dijkstra's Link State Algorithm]]
- **Related Notes:** [[Internetworking]]

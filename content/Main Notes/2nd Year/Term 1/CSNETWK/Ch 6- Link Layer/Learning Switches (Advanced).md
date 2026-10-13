---
id: Learning-Switches-(Advanced)
type: note
course: CSNETWK
topic:
status: completed
---

# Learning Switches (Advanced)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Switch tables don't keep entries forever. They have a TTL (Time To Live).

## Key Concepts
 High TTL Low TTL Solution Logic Solution

## Details / Theory

## 1. Concept Overview: TTL in Switch Tables

Definition

Switch tables don't keep entries forever. They have a TTL (Time To Live).
 When an entry is created or refreshed (seen again), the TTL is reset to the max value (e.g., 60 minutes). If the table provided shows _different_ TTL values, it implies the entries were created at different times.

**The Logic**
 **High TTL** = Recently updated (Event happened later). **Low TTL** = Old entry (Event happened earlier). _Hypothesis for this Problem:_ The problem likely assumes a simple counter where TTL represents "Time Step" or the order of events.

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121094417.png]]
 Transmissions happened at $t=1, 2, ..., 9$. We are given a filled table and asked to identify who communicated at specific times ($t=4, t=8$, etc.).

## 3. Problem Analysis

_Note: Without the explicit "TTL Rule" defined in the question (e.g., "TTL starts at 10 and decrements by 1 every step"), we must infer relationships from the solution._

### Question 1: At $t=4$, what two nodes communicated?
 **Solution:** L. (Transmission C $\rightarrow$ L). **Logic:**
Look at Switch 2 Table: **L** is on Interface 15.
Look at Switch 1 Table: **C** is on Interface 3.
_Deduction:_ If the solution says "L", it means L was the _Source_ or _Destination_ recorded/refreshed at that timestamp. In learning switch problems, we typically track the **Source** because that is who gets added to the table.
However, the solution says "Transmission was C $\rightarrow$ L". This means **C** would be added to Switch 1 (Int 3) and Switch 2 (Int 8). **L** would be added _only_ if L replied.
_Correction:_ The prompt says "the destination replies immediately".
Therefore: C $\rightarrow$ L (C added). Reply L $\rightarrow$ C (L added).

### Question 2: At $t=8$, what two nodes communicated?
 **Solution:** G, H. (Transmission G $\rightarrow$ H). **Logic:**
Look for entries with high/specific TTLs matching step 8.
**G** is in Switch 2 table (Int 10).
**H** is in Switch 2 table (Int 11).
Since both are on the same switch, traffic G $\rightarrow$ H stays local to Switch 2 _if_ Switch 2 already knows H. If not, it floods.

### Question 3: At $t=3$, what two nodes communicated?
 **Solution:** A. (Transmission I $\rightarrow$ A). **Logic:**
**I** (Source) is on Switch 2.
**A** (Dest/Reply) is on Switch 1.

## Summary of Logic (Cheat Sheet)

**How to Solve "Reverse" Problems:**

1. **Check the "TTL" or "Time" column:** Match the value to the question's time step.
_Example:_ If the question asks about $t=4$, look for entries that have a value indicating they were touched at step 4.

2. **Check for Replies:** Remember that every transmission $A \rightarrow B$ is immediately followed by $B \rightarrow A$.
This means **BOTH** A and B will appear in the tables (or refresh their TTLs) at that timestamp.

3. **Locality:**
If A and B are on the **same switch**, the entry might only update on that one switch (once the switch has learned both).
If A and B are on **different switches**, entries update on **both** switches (as traffic crosses the middle link).

## Common Pitfalls
 Ignoring TTL values when deducing past traffic — higher TTL means the entry was learned **more recently**. Forgetting the locality rule: same-switch traffic updates only **one** switch table; cross-switch traffic updates **both**. Not considering that expired TTL entries are effectively unknown, so the switch would flood again.

## Summary

> TL;DR — Advanced switch problems involve TTL-based table entries and reverse-engineering which nodes communicated and when. Cross-switch traffic updates both switches; same-switch traffic updates only one.

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121094417.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "Cross-switch traffic updates both switches; _____ traffic updates only one."?
    - **A)** sameswitch
    - **B)** Protocol
    - **C)** Network
    - **D)** Router

2. Which word completes the following sentence from the text: "_Hypothesis for this Problem:_ The problem likely assumes a simple _____ where TTL represents "Time Step" or the order of events."?
    - **A)** counter
    - **B)** Router
    - **C)** Protocol
    - **D)** Network

3. Which word completes the following sentence from the text: "However, the solution says _____ was C $\rightarrow$ L"."?
    - **A)** Router
    - **B)** Transmission
    - **C)** Protocol
    - **D)** Network

4. Which word completes the following sentence from the text: "**Check for Replies:** Remember that every transmission $A _____ B$ is immediately followed by $B \rightarrow A$."?
    - **A)** rightarrow
    - **B)** Router
    - **C)** Network
    - **D)** Protocol

5. Which word completes the following sentence from the text: "When an entry is created or refreshed (seen again), the _____ is reset to the max value (e.g., 60 minutes)."?
    - **A)** Network
    - **B)** Router
    - **C)** TTL
    - **D)** Protocol

6. Which word completes the following sentence from the text: "Since both are on the same switch, traffic G $\rightarrow$ H _____ local to Switch 2 _if_ Switch 2 already knows H."?
    - **A)** stays
    - **B)** Protocol
    - **C)** Router
    - **D)** Network

7. Which word completes the following sentence from the text: "If the table provided shows _different_ TTL values, _____ implies the entries were created at different times."?
    - **A)** Protocol
    - **B)** it
    - **C)** Router
    - **D)** Network

8. Which word completes the following sentence from the text: "_Example:_ If the question asks about $t=4$, look for entries _____ have a value indicating they were touched at step 4."?
    - **A)** Network
    - **B)** Router
    - **C)** Protocol
    - **D)** that

9. Which word completes the following sentence from the text: "This means **C** would be added to Switch _____ (Int 3) and Switch 2 (Int 8)."?
    - **A)** 1
    - **B)** Network
    - **C)** Protocol
    - **D)** Router

10. Which word completes the following sentence from the text: "In learning switch problems, we typically track the **Source** _____ that is who gets added to the table."?
    - **A)** because
    - **B)** Network
    - **C)** Protocol
    - **D)** Router


### Answer Key & Explanations
1. **A)** sameswitch completes the sentence: Cross-switch traffic updates both switches; same-s...
2. **A)** counter completes the sentence: _Hypothesis for this Problem:_ The problem likely ...
3. **B)** Transmission completes the sentence: However, the solution says "Transmission was C $\r...
4. **A)** rightarrow completes the sentence: **Check for Replies:** Remember that every transmi...
5. **C)** TTL completes the sentence: When an entry is created or refreshed (seen again)...
6. **A)** stays completes the sentence: Since both are on the same switch, traffic G $\rig...
7. **B)** it completes the sentence: If the table provided shows _different_ TTL values...
8. **D)** that completes the sentence: _Example:_ If the question asks about $t=4$, look ...
9. **A)** 1 completes the sentence: This means **C** would be added to Switch 1 (Int 3...
10. **A)** because completes the sentence: In learning switch problems, we typically track th...

## References & Navigation

- **Previous Topic:** [[Learning Switches (Basic)]]
- **Next Topic:** [[Physical Layer]]
- **Related Notes:** [[Internetworking]]

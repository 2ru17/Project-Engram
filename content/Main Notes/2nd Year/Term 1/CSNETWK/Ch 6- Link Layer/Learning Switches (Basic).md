---
id: Learning-Switches-(Basic)
type: note
course: CSNETWK
topic:
status: completed
---

# Learning Switches (Basic)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> A switch is "transparent." It doesn't have a hardcoded map. It learns by listening.

## Key Concepts
 If Known If Unknown Switch 1 (Right) Switch 2 (Left) Inter-Switch Link

## Details / Theory

## 1. Concept Overview: Self-Learning Switches

Definition

A switch is "transparent." It doesn't have a hardcoded map. It learns by listening.

**The Algorithm**

1. **Listen (Learn):** When a frame arrives on Interface $X$ with Source MAC $A$, the switch writes in its table: **(MAC A** $\rightarrow$ **Interface X)**.
2. **Forward (Act):** The switch looks at the _Destination_ MAC.
**If Known:** Send only to the specific interface found in the table.
**If Unknown:** **Flood** the frame out to _all_ interfaces (except the incoming one).

## 2. The Network Topology

**Connections**
![[Pasted image 20251121094303.png]]
 **Switch 1 (Right):** Connects computers A-F and link to Switch 2. **Switch 2 (Left):** Connects computers G-L and link to Switch 1. **Inter-Switch Link:** Switch 1 (Int 7) $\leftrightarrow$ Switch 2 (Int 8).

## 3. Problem Analysis (Step-by-Step)

### Time $t=1$: $K \rightarrow L$
 **Action:** Node K sends to Node L. **Switch 2 (Left):** Receives frame from K on Int 14.
**Learn:** Records **(K, 14)**.
**Forward:** Does it know L? No (Table is empty). **Floods** to everyone, including Switch 1 via Int 8. **Switch 1 (Right):** Receives flooded frame from Switch 2 (Source K) on Int 7.
**Learn:** Records **(K, 7)**. _(Note: Switch 1 thinks K is "out that way" towards Int 7)._

**Table Entries Added:**
 Switch 1: **(K, 7)** Switch 2: **(K, 14)**

### Time $t=2$: $B \rightarrow I$
 **Action:** Node B sends to Node I. **Switch 1 (Right):** Receives from B on Int 2.
**Learn:** Records **(B, 2)**.
**Forward:** Does it know I? No. **Floods**. Sends to Switch 2 via Int 7. **Switch 2 (Left):** Receives from Switch 1 (Source B) on Int 8.
**Learn:** Records **(B, 8)**.
**Forward:** Does it know I? No. **Floods**.

**Table Entries Added:**
 Switch 1: **(B, 2)** Switch 2: **(B, 8)**

### Time $t=3$: $F \rightarrow E$
 **Action:** Node F sends to Node E. **Switch 1 (Right):** Receives from F on Int 6.
**Learn:** Records **(F, 6)**.
**Forward:** Does it know E? No. **Floods**. Sends to Switch 2 via Int 7. **Switch 2 (Left):** Receives from Switch 1 (Source F) on Int 8.
**Learn:** Records **(F, 8)**.

**Table Entries Added:**
 Switch 1: **(F, 6)** Switch 2: **(F, 8)**

### Time $t=4$: $G \rightarrow B$
 **Action:** Node G sends to Node B. **Switch 2 (Left):** Receives from G on Int 10.
**Learn:** Records **(G, 10)**.
**Forward:** Does it know B? **YES!** (Learned at $t=2$). Table says B is on Int 8.
**Selective Forward:** Sends _only_ to Int 8 (Switch 1). **Switch 1 (Right):** Receives from Switch 2 (Source G) on Int 7.
**Learn:** Records **(G, 7)**.
**Forward:** Does it know B? **YES!** (Learned at $t=2$). Sends to Int 2.

**Table Entries Added:**
 Switch 1: **(G, 7)** Switch 2: (G, 10)
  (Note: No entry for B is added because it already exists).

## Summary of Logic (Cheat Sheet)

1. **Source Check:** Always add the **Source MAC** and the **Incoming Interface** to the table.
2. **Dest Check:** Look for Destination MAC.
Found? $\rightarrow$ Send to specific port.
Not Found? $\rightarrow$ Flood (send to all).

3. **Inter-Switch Rule:** If a packet comes from another switch, the "Interface" recorded is the link connecting the switches.

## Common Pitfalls
 Assuming a switch knows all MAC addresses from the start — switches start with **empty** tables and learn incrementally. Confusing **flooding** (sending to all ports except the source) with **forwarding** (sending to a specific known port). Forgetting that the switch records the **source** MAC and the **incoming** interface, not the destination.

## Summary

> TL;DR — Self-learning switches build MAC-to-port tables by recording source addresses of incoming frames. Known destinations are forwarded to specific ports; unknown destinations are flooded to all ports.

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121094303.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "**Switch 2 (Left):** Connects computers _____ and link to Switch 1."?
    - **A)** Protocol
    - **B)** Network
    - **C)** GL
    - **D)** Router

2. Which word completes the following sentence from the text: "**Listen (Learn):** When a frame arrives on Interface $X$ with Source MAC _____ the switch writes in its table: **(MAC A** $\rightarrow$ **Interface X)**."?
    - **A)** Protocol
    - **B)** A
    - **C)** Network
    - **D)** Router

3. Which word completes the following sentence from the text: "**_____ 1 (Right):** Receives flooded frame from Switch 2 (Source K) on Int 7."?
    - **A)** Switch
    - **B)** Router
    - **C)** Network
    - **D)** Protocol

4. Which word completes the following sentence from the text: "**Inter-Switch Rule:** If a packet comes from ano_____r switch, the "Interface" recorded is the link connecting the switches."?
    - **A)** Protocol
    - **B)** the
    - **C)** Network
    - **D)** Router

5. Which word completes the following sentence from the text: "**Switch 1 (Right):** Receives from Switch _____ (Source G) on Int 7."?
    - **A)** Protocol
    - **B)** Router
    - **C)** 2
    - **D)** Network

6. Which word completes the following sentence from the text: "**Table Entries Added:**  Switch 1: **(F, 6)** Switch 2: **(F, 8)**  ### _____ $t=4$: $G \rightarrow B$  **Action:** Node G sends to Node B."?
    - **A)** Time
    - **B)** Network
    - **C)** Router
    - **D)** Protocol

7. Which word completes the following sentence from the text: "**Switch 2 (Left):** Receives from Switch _____ (Source F) on Int 8."?
    - **A)** Network
    - **B)** Protocol
    - **C)** Router
    - **D)** 1

8. Which word completes the following sentence from the text: "**If Unknown:** **Flood** the frame out _____ _all_ interfaces (except the incoming one)."?
    - **A)** Protocol
    - **B)** Router
    - **C)** Network
    - **D)** to

9. Which word completes the following sentence from the text: "**Inter-Switch Link:** Switch 1 (Int _____ $\leftrightarrow$ Switch 2 (Int 8)."?
    - **A)** Protocol
    - **B)** Router
    - **C)** Network
    - **D)** 7

10. Which word completes the following sentence from the text: "_(Note: Switch 1 thinks K is "out that way" towards Int 7)._  **Table Entries Added:**  Switch 1: **(K, _____ Switch 2: **(K, 14)**  ### Time $t=2$: $B \rightarrow I$  **Action:** Node B sends to Node I."?
    - **A)** 7
    - **B)** Router
    - **C)** Network
    - **D)** Protocol


### Answer Key & Explanations
1. **C)** GL completes the sentence: **Switch 2 (Left):** Connects computers G-L and li...
2. **B)** A completes the sentence: **Listen (Learn):** When a frame arrives on Interf...
3. **A)** Switch completes the sentence: **Switch 1 (Right):** Receives flooded frame from ...
4. **B)** the completes the sentence: **Inter-Switch Rule:** If a packet comes from anot...
5. **C)** 2 completes the sentence: **Switch 1 (Right):** Receives from Switch 2 (Sour...
6. **A)** Time completes the sentence: **Table Entries Added:**  Switch 1: **(F, 6)** Swi...
7. **D)** 1 completes the sentence: **Switch 2 (Left):** Receives from Switch 1 (Sourc...
8. **D)** to completes the sentence: **If Unknown:** **Flood** the frame out to _all_ i...
9. **D)** 7 completes the sentence: **Inter-Switch Link:** Switch 1 (Int 7) $\leftrigh...
10. **A)** 7 completes the sentence: _(Note: Switch 1 thinks K is "out that way" toward...

## References & Navigation

- **Previous Topic:** [[Addressing and Forwarding]]
- **Next Topic:** [[Learning Switches (Advanced)]]
- **Related Notes:** [[Internetworking]]

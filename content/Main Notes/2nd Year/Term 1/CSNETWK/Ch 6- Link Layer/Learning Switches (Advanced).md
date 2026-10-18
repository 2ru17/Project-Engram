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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121094417.png]] **Source / Reference:**

## Multiple Choice Questions

1. Suppose two Layer-2 self-learning switches $S_1$ and $S_2$ are interconnected via port $4$ on $S_1$ and port $1$ on $S_2$, with both switch tables initially empty. Host $A$ (on $S_1$ port 1) sends a frame to Host $E$ (on $S_2$ port 2). Which switch table entries are learned during this **single frame transmission**, and which ports receive the frame?
    - **A)** Both $S_1$ and $S_2$ learn the locations of both $A$ and $E$ immediately, and the frame goes only to $E$.
    - **B)** $S_1$ learns `(MAC_A -> Port 1)` and floods the frame out all other ports (including port 4 to $S_2$); $S_2$ receives the frame on port 1, learns **`(MAC_A -> Port 1)`**, and floods the frame out all its other ports (including port 2 to $E$). Neither switch learns `MAC_E` until $E$ transmits a frame!
    - **C)** $S_1$ drops the frame because `MAC_E` is not in its table.
    - **D)** $S_2$ learns `(MAC_A -> Port 2)`.

2. Continuing Question 1, after $A \to E$ completes, suppose Host $B$ (also on $S_1$, port 2) sends a frame to Host $A$ (on $S_1$, port 1). Does Switch $S_2$ ever see this frame?
    - **A)** **No**; $S_1$ learns `(MAC_B -> Port 2)`, looks up destination `MAC_A` in its switch table, finds `(MAC_A -> Port 1)`, and **unicast-forwards** the frame exclusively out Port 1 without flooding it across the inter-switch trunk to $S_2$ (traffic isolation).
    - **B)** Yes, $S_1$ floods all frames to $S_2$.
    - **C)** Yes, because $S_2$ must approve every frame on $S_1$.
    - **D)** No, because $S_1$ filters the frame as a same-port collision.

3. Next, suppose Host $A$ (on $S_1$, port 1) sends a frame to Host $B$ (on $S_1$, port 2), where both `MAC_A` and `MAC_B` are already in $S_1$'s table. What happens if both Host $A$ and Host $B$ are instead attached to the **same shared hub/segment connected to Port 1** of $S_1$?
    - **A)** $S_1$ forwards the frame back out Port 1, creating a duplicate frame collision.
    - **B)** $S_1$ floods the frame out all ports except Port 1.
    - **C)** $S_1$ sees `(MAC_B -> Port 1)` matches the **exact incoming interface (Port 1)** and performs **filtering** (drops/discards the frame without re-transmitting it back out Port 1, since $B$ already received it on the shared segment).
    - **D)** $S_1$ clears its entire MAC table.

4. Why do redundant physical loops in a Layer-2 switched topology cause catastrophic **Broadcast Storms** and **MAC Table Instability** unless **Spanning Tree Protocol (STP, IEEE 802.1D)** is enabled?
    - **A)** Because Layer-2 Ethernet frames have a TTL field of 255.
    - **B)** Because STP increases the physical cable speed.
    - **C)** Because switches convert broadcast frames into BGP updates.
    - **D)** Because Layer-2 Ethernet frames have **no TTL (Time-To-Live) field**, so any broadcast or unknown-unicast frame flooded by switches in a physical loop circulates and multiplies endlessly around the cycle, saturating all link bandwidth and causing switches to see the same source MAC arriving on oscillating ports.

5. How does a **VLAN (Virtual Local Area Network, IEEE 802.1Q)** alter the broadcast and forwarding behavior of a Layer-2 switch?
    - **A)** It merges all subnets on the Internet into a single broadcast domain.
    - **B)** It partitions a single physical switch (or multi-switch trunked fabric using 4-byte 802.1Q VLAN tags) into **multiple isolated logical broadcast domains**: broadcast and unknown-unicast frames from a port in VLAN 10 are flooded ONLY to other ports in VLAN 10, and traffic between VLAN 10 and VLAN 20 requires routing through a Layer-3 device.
    - **C)** It removes MAC addresses from Ethernet frames.
    - **D)** It forces all ports to operate in half-duplex hub mode.

### Answer Key & Explanations

1. **B**. Switches learn **only from the Source MAC** of arriving frames. When $A$ sends to $E$, $S_1$ learns `A -> Port 1` and floods; $S_2$ receives the flooded frame on its trunk port (Port 1), learns `A -> Port 1`, and floods to $E$.
2. **A**. Because $S_1$ already learned `MAC_A -> Port 1`, it forwards $B$'s frame directly out Port 1, isolating local traffic on $S_1$ from the trunk link to $S_2$.
3. **C**. Self-learning switch rule: if the destination MAC is found in the table and its associated port equals the arrival port, the switch **filters** (does not forward) the frame.
4. **D**. Without a Layer-2 TTL field or STP blocking redundant ports to form an acyclic spanning tree, flooded frames loop infinitely and exponentially duplicate at branching switches.
5. **B**. VLANs logically segment one physical switch infrastructure into separate Layer-2 broadcast domains, improving security and containing broadcast traffic.

## References & Navigation

- **Previous Topic:** [[Learning Switches (Basic)]]
- **Next Topic:** [[Physical Layer]]
- **Related Notes:** [[Internetworking]]

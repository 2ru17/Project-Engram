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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121094303.png]] **Source / Reference:**

## Multiple Choice Questions

1. Why is a Layer-2 Ethernet switch described as **transparent** and **plug-and-play**?
    - **A)** Because its plastic casing is see-through.
    - **B)** Because hosts and routers are completely unaware of the switch's existence (frames are addressed to host/router MACs, not the switch's MAC), and the switch builds its forwarding table **automatically via self-learning** without requiring manual configuration or a routing protocol.
    - **C)** Because it assigns IP addresses via DHCP automatically.
    - **D)** Because it broadcasts every frame to every port permanently like a Layer-1 hub.

2. When a frame with **Source MAC $X$** and **Destination MAC $Y$** arrives on **Interface $i$** of a self-learning switch, which field does the switch use to **update (learn) its switch table**, and which field does it use to **make the forwarding decision**?
    - **A)** It **learns** by recording `(Source MAC X, Interface i, Timestamp)` in its switch table, and **forwards** by looking up **Destination MAC $Y$** in its switch table.
    - **B)** It learns from Destination MAC $Y$ and forwards using Source MAC $X$.
    - **C)** It learns from the IP header and forwards using the TCP port.
    - **D)** It only updates its table when an ARP Reply arrives.

3. What are the **three possible actions** a self-learning switch can take after looking up the frame's **Destination MAC $Y$** (which arrived on Interface $i$) in its switch table?
    - **A)** Encrypt, Compress, or Fragment
    - **B)** Drop all unknown frames, broadcast known frames, and reboot on broadcast frames.
    - **C)** (1) **Flood** (broadcast out all interfaces *except* $i$) if $Y$ is not in the table (or if $Y$ is `FF-FF-FF-FF-FF-FF`); (2) **Forward** (send unicast out interface $j$) if $Y$ is in the table mapped to interface $j \ne i$; (3) **Filter** (discard/drop) if $Y$ is in the table mapped to the same incoming interface $i$.
    - **D)** Decrement TTL, recompute IP checksum, and send ICMP Redirect.

4. How does a **Layer-2 Ethernet Switch** improve performance compared to a legacy **Layer-1 Hub (Repeater)**?
    - **A)** A hub inspects Layer-3 IP headers, whereas a switch only repeats bits.
    - **B)** There is no difference between a hub and a switch.
    - **C)** A switch divides the broadcast domain, whereas a hub divides the collision domain.
    - **D)** A Layer-1 hub blindly repeats every incoming bit out all ports, placing all connected hosts in a **single shared collision domain**; a full-duplex Layer-2 switch buffers frames and isolates **each switch port into its own separate collision domain**, allowing simultaneous collision-free transmissions ($A \to B$ and $C \to D$ at the same time).

5. Why does a switch associate an **aging timer (TTL)** with every learned `(MAC Address, Interface)` entry in its switch table?
    - **A)** Because Ethernet cables lose conductivity after 10 minutes.
    - **B)** So that if a laptop is unplugged from Port 1 and plugged into Port 5 (or leaves the network), outdated entries are automatically forgotten and refreshed without manual administrator intervention.
    - **C)** To force hosts to renew their IP addresses.
    - **D)** Because IEEE 802.3 forbids tables with more than 4 entries.

### Answer Key & Explanations

1. **B**. Hosts address frames directly to destination MACs as if on a direct wire; the switch invisibly intercepts, learns source locations, and forwards frames with zero configuration.
2. **A**. An arriving frame on port $i$ proves that `Source MAC X` is reachable via port $i$ (learning), while `Destination MAC Y` determines where the frame needs to go next (forwarding).
3. **C**. The three canonical switch actions are **Flood** (unknown destination or broadcast), **Forward** (known destination on port $j \ne i$), and **Filter** (known destination on arrival port $i$).
4. **D**. Modern full-duplex switches eliminate collisions entirely by giving each port a dedicated point-to-point link and storing-and-forwarding frames selectively across high-speed internal switch fabrics.
5. **B**. Aging timers (plus instant port-reassignment overwrites when a MAC is seen on a new port) keep the switch table accurate as devices move or power off.

## References & Navigation

- **Previous Topic:** [[Addressing and Forwarding]]
- **Next Topic:** [[Learning Switches (Advanced)]]
- **Related Notes:** [[Internetworking]]

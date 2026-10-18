---
id: End-to-End-Throughput-and-Bottleneck-Links
type: note
course: CSNETWK
topic:
status: completed
---

# End to End Throughput and Bottleneck Links

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Definition: Throughput

## Key Concepts
 Topology Server Links ( Client Links ( Shared Middle Link ( Fair Sharing

## Details / Theory

## 1. Concept Overview: Throughput & Bottlenecks

Definition: Throughput

Throughput is the actual rate at which data can be transferred from a sender to a receiver. It is determined by the "slowest" link in the path.

Definition: The Bottleneck Link

In any chain of links, the Bottleneck Link is the link with the minimum transmission rate. The entire path cannot be faster than this single link.

The Formula (Fair Share)

If $N$ connections share a common link with rate $R$, each connection gets a "fair share" of $R/N$.

$$\text{Throughput} = \min(R_s, R_c, \frac{R}{N})$$
 $R_s$: Rate of Server Link $R_c$: Rate of Client Link $R$: Rate of Shared Link $N$: Number of concurrent flows

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121094535.png]]
 **Topology:** 4 Servers sending to 4 Clients (4 pairs). **Server Links (**$R_s$**):** 10 Mbps each. **Client Links (**$R_c$**):** 90 Mbps each. **Shared Middle Link (**$R$**):** 400 Mbps total. **Fair Sharing:** The middle link divides its capacity equally among the 4 pairs.

## 3. Problem Analysis

### Question 1

**What is the maximum achievable end-end throughput (in Mbps) for each of four client-to-server pairs?**

**Analytical Breakdown:**

1. **Identify Constraints:** We need to find the minimum speed along the path for _one_ single pair.
2. **Link 1 (Server Side):** $R_s = 10$ Mbps.
3. **Link 2 (Shared Middle):** The total is 400 Mbps, but it is shared by 4 pairs.
Per-pair capacity = $400 / 4 = 100$ Mbps.

4. **Link 3 (Client Side):** $R_c = 90$ Mbps.
5. **Calculate Minimum:**
$\min(10, 100, 90)$

$10 < 90 < 100$

6. **Conclusion:** The server link is the slowest part of the chain.

**Correct Answer:** **10 Mbps**

### Question 2

**Which link is the bottleneck link?**

**Analytical Breakdown:**

1. **Compare Capacities:**
$R_s = 10$ Mbps
Shared Share ($R/4$) = 100 Mbps
$R_c = 90$ Mbps

2. **Identify Lowest:** The value 10 is the lowest.
3. **Map to Link:** This value corresponds to $R_s$ (Server Link).

**Correct Answer:** **Rs**

### Question 3

**Assuming that the servers are sending at the maximum rate possible, what are the link utilizations for the server links (Rs)?**

**Analytical Breakdown:**

1. **Definition:** $\text{Utilization} = \frac{\text{Actual Traffic Flow}}{\text{Link Capacity}}$
2. **Actual Flow:** The maximum throughput we calculated in Q1 is 10 Mbps.
3. **Link Capacity:** The capacity of $R_s$ is 10 Mbps.
4. **Calculation:** $10 / 10 = 1.0$ (or 100%).

**Correct Answer:** **1**

### Question 4

**Assuming that the servers are sending at the maximum rate possible, what are the link utilizations for the client links (Rc)?**

**Analytical Breakdown:**

1. **Actual Flow:** The traffic arriving at the client is limited by the bottleneck, so it is still arriving at **10 Mbps**.
2. **Link Capacity:** The capacity of $R_c$ is **90 Mbps**.
3. **Calculation:** $10 / 90 \approx 0.111...$

**Correct Answer:** **0.11**

### Question 5

**Assuming that the servers are sending at the maximum rate possible, what is the link utilizations for the shared link (R)?**

**Analytical Breakdown:**

1. **Actual Flow:** There are **4** pairs, each sending **10 Mbps**.
Total Flow = $4 \times 10 = 40$ Mbps.

2. **Link Capacity:** The total capacity of the shared link $R$ is **400 Mbps**.
3. **Calculation:** $40 / 400 = 0.1$.
4. _Alternative Method:_ Calculate per-pair utilization. Share = 10 Mbps. Capacity Share = 100 Mbps. $10/100 = 0.1$.

**Correct Answer:** **0.1**

## Summary of Logic (Cheat Sheet)

|                 |                                                                   |                                                              |
| --------------- | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| **Concept**     | **Formula**                                                       | **Logic**                                                    |
| **Bottleneck**  | $\min(\text{Link}_1, \text{Link}_2, ...)$                         | A chain is only as strong as its weakest link.               |
| **Shared Link** | $\text{Capacity}_{\text{effective}} = \frac{R_{\text{total}}}{N}$ | Always divide shared bandwidth by the number of users first. |
| **Utilization** | $\frac{\text{Throughput}}{\text{Capacity}}$                       | How "full" is the pipe? (0 to 1).                            |

**Critical Check:**
 If $R_s$ is small (e.g., dial-up), the server is the bottleneck. If $R$ is small (e.g., congested backbone), the core is the bottleneck. If $R_c$ is small (e.g., weak Wi-Fi), the client is the bottleneck.

## Common Pitfalls
 Forgetting that end-to-end throughput is determined by the **bottleneck** (slowest) link, not the fastest. Not dividing the shared backbone link $R$ by the number of active connections $N$ when multiple flows compete. Confusing link capacity with actual per-flow throughput — $\min(R_s, R_c, R/N)$ is the correct formula.

## Summary

> TL;DR — End-to-end throughput equals $\min(R_s, R_c, R/N)$ where $R_s$ is server link rate, $R_c$ is client link rate, and $R/N$ is the shared backbone divided among $N$ flows. The bottleneck link limits overall performance.

## Links
 **Related:** - [[Pasted image 20251121094535.png]] **Source / Reference:**

## Multiple Choice Questions

1. Suppose a server sends a large file to a client across a 2-link path with no other competing traffic: the server's access link has transmission rate $R_s$, and the client's access link has transmission rate $R_c$. What is the instantaneous **end-to-end throughput**?
    - **A)** $R_s + R_c$
    - **B)** $\min(R_s, R_c)$, the rate of the **bottleneck link** along the path
    - **C)** $\max(R_s, R_c)$
    - **D)** $\frac{R_s + R_c}{2}$

2. A server has an uplink rate $R_s = 100\text{ Mbps}$, a client has a downlink rate $R_c = 15\text{ Mbps}$, and they communicate across a shared core backbone link of capacity $R = 1\text{ Gbps}$ ($1000\text{ Mbps}$) shared equally among $N = 10$ simultaneous downloads. What is the per-connection end-to-end throughput, and which link is the bottleneck?
    - **A)** $15\text{ Mbps}$ (since $\min(R_s, R_c, R/N) = \min(100, 15, 1000/10) = \min(100, 15, 100) = 15\text{ Mbps}$; the client's access link $R_c$ is the bottleneck)
    - **B)** $100\text{ Mbps}$ (server uplink is the bottleneck)
    - **C)** $1000\text{ Mbps}$ (backbone link is the bottleneck)
    - **D)** $1.5\text{ Mbps}$

3. Using the same network from Question 2 ($R_s = 100\text{ Mbps}$, $R_c = 15\text{ Mbps}$, shared backbone $R = 1000\text{ Mbps}$), suppose the number of simultaneous connections sharing the backbone increases to $N = 100$. What is the new per-connection throughput, and where is the bottleneck now?
    - **A)** $15\text{ Mbps}$ (client access link)
    - **B)** $100\text{ Mbps}$ (server uplink)
    - **C)** $10\text{ Mbps}$ (since $R / N = 1000 / 100 = 10\text{ Mbps}$, so $\min(100, 15, 10) = 10\text{ Mbps}$; the shared core backbone is now the bottleneck)
    - **D)** $1\text{ Mbps}$

4. If a file of size $F = 30\text{ Megabits}$ ($30 \times 10^6\text{ bits}$) is transferred across an end-to-end path whose bottleneck throughput is $15\text{ Mbps}$ ($15 \times 10^6\text{ bits/sec}$), approximately how long does the file transfer take (ignoring protocol header overhead and propagation delay)?
    - **A)** $0.5\text{ seconds}$
    - **B)** $450.0\text{ seconds}$
    - **C)** $15.0\text{ seconds}$
    - **D)** $2.0\text{ seconds}$

5. What is the fundamental difference between **Transmission Delay ($d_{\text{trans}} = L / R$)** and **Propagation Delay ($d_{\text{prop}} = d / s$)** on a single physical link?
    - **A)** They are two names for the exact same delay.
    - **B)** **Transmission delay** $L / R$ is the time required for the router's NIC to push all $L$ bits of the packet onto the link at bit rate $R$ (independent of link length $d$); **Propagation delay** $d / s$ is the time required for a single electromagnetic bit to travel the physical distance $d$ along the medium at wave propagation speed $s \approx 2 \times 10^8\text{ m/s}$ (independent of packet size $L$ and bit rate $R$).
    - **C)** Transmission delay depends on cable length $d$, while propagation delay depends on packet size $L$.
    - **D)** Upgrading a link from $10\text{ Mbps}$ to $10\text{ Gbps}$ reduces propagation delay by a factor of $1000$.

### Answer Key & Explanations

1. **B**. Fluid-flow conservation dictates that steady-state end-to-end throughput cannot exceed the capacity of the slowest link along the path: $\text{Throughput} = \min(R_1, R_2, \dots, R_k)$.
2. **A**. Each of the $10$ flows gets at most $R/10 = 1000/10 = 100\text{ Mbps}$ in the core, so the end-to-end throughput is $\min(100, 15, 100) = 15\text{ Mbps}$, constrained by the client access link $R_c$.
3. **C**. With $N = 100$ flows sharing the $1000\text{ Mbps}$ backbone, each flow's fair share of the core drops to $1000/100 = 10\text{ Mbps} < 15\text{ Mbps}$, shifting the bottleneck from the edge to the core.
4. **D**. Transfer time $= \frac{F}{\text{Throughput}} = \frac{30\text{ Mbits}}{15\text{ Mbps}} = 2.0\text{ seconds}$.
5. **B**. $d_{\text{trans}} = L/R$ is serialization time onto the wire; $d_{\text{prop}} = d/s$ is speed-of-light travel time across distance $d$.

## References & Navigation

- **Previous Topic:** [[Physical Layer]]
- **Next Topic:** [[Security]]
- **Related Notes:** [[Internetworking]]

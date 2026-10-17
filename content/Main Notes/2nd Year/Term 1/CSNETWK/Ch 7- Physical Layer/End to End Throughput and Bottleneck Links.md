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

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121094535.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "$$\text{Throughput} = \min(R_s, R_c, \frac{R}{N})$$  $R_s$: Rate of Server Link $R_c$: Rate of _____ Link $R$: Rate of Shared Link $N$: Number of concurrent flows  ## 2."?
- **A)** Client
- **B)** Router
- **C)** Network
- **D)** Protocol

2. Which word completes the following sentence from the text: "Confusing link capacity with actual per-flow throughput _____ $\min(R_s, R_c, R/N)$ is the correct formula."?
- **A)** Protocol
- **B)** Router
- **C)** Network
- **D)** 

3. Which word completes the following sentence from the text: "**Correct Answer:** **1**  ### Question 4  **Assuming that the servers are sending at the maximum _____ possible, what are the link utilizations for the client links (Rc)?**  **Analytical Breakdown:**  1."?
- **A)** rate
- **B)** Network
- **C)** Protocol
- **D)** Router

4. Which word completes the following sentence from the text: "**Link Capacity:** The total capacity of _____ shared link $R$ is **400 Mbps**."?
- **A)** Network
- **B)** Protocol
- **C)** the
- **D)** Router

5. Which word completes the following sentence from the text: "If $R_c$ is small (e.g., weak _____ the client is the bottleneck."?
- **A)** Router
- **B)** Protocol
- **C)** WiFi
- **D)** Network

6. Which word completes the following sentence from the text: "**Actual Flow:** There are **4** _____ each sending **10 Mbps**."?
- **A)** Network
- **B)** Protocol
- **C)** Router
- **D)** pairs

7. Which word completes the following sentence from the text: "The Network Topology  **Scenario Data** ![[Pasted image 20251121094535.png]]  _____ 4 Servers sending to 4 Clients (4 pairs)."?
- **A)** Network
- **B)** Topology
- **C)** Protocol
- **D)** Router

8. Which word completes the following sentence from the text: "The entire path cannot be _____ than this single link."?
- **A)** faster
- **B)** Protocol
- **C)** Network
- **D)** Router

9. Which word completes the following sentence from the text: "**Compare Capacities:** $R_s = 10$ Mbps Shared Share _____ = 100 Mbps $R_c = 90$ Mbps  2."?
- **A)** R4
- **B)** Router
- **C)** Protocol
- **D)** Network

10. Which word completes the following sentence from the text: "**Correct Answer:** **Rs**  ### Question 3  **Assuming that the servers are sending at the maximum _____ possible, what are the link utilizations for the server links (Rs)?**  **Analytical Breakdown:**  1."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** rate


### Answer Key & Explanations
1. **A)** Client completes the sentence: $$\text{Throughput} = \min(R_s, R_c, \frac{R}{N})$...
2. **D)**  completes the sentence: Confusing link capacity with actual per-flow throu...
3. **A)** rate completes the sentence: **Correct Answer:** **1**  ### Question 4  **Assum...
4. **C)** the completes the sentence: **Link Capacity:** The total capacity of the share...
5. **C)** WiFi completes the sentence: If $R_c$ is small (e.g., weak Wi-Fi), the client i...
6. **D)** pairs completes the sentence: **Actual Flow:** There are **4** pairs, each sendi...
7. **B)** Topology completes the sentence: The Network Topology  **Scenario Data** ![[Pasted ...
8. **A)** faster completes the sentence: The entire path cannot be faster than this single ...
9. **A)** R4 completes the sentence: **Compare Capacities:** $R_s = 10$ Mbps Shared Sha...
10. **D)** rate completes the sentence: **Correct Answer:** **Rs**  ### Question 3  **Assu...

## References & Navigation

- **Previous Topic:** [[Physical Layer]]
- **Next Topic:** [[Security]]
- **Related Notes:** [[Internetworking]]

---
id: IPv6-Tunneling-and-Encapsulation
type: note
course: CSNETWK
topic:
status: completed
---

# IPv6 Tunneling and Encapsulation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Tunneling is a technique used when two IPv6 networks need to communicate but are separated by an older IPv4 network. Since the intermediate IPv4 ro...

## Key Concepts
 Dual-Stack Routers Encapsulation The Path Path Tunnel Entrance

## Details / Theory

## 1. Concept Overview: Tunneling

Definition

Tunneling is a technique used when two IPv6 networks need to communicate but are separated by an older IPv4 network. Since the intermediate IPv4 routers cannot understand IPv6 addresses, the edge routers must "wrap" (encapsulate) the entire IPv6 packet inside a standard IPv4 packet.

**The Mechanism**
 **Dual-Stack Routers:** The routers at the edge (Entrance and Exit) must speak _both_ protocols. **Encapsulation:** The IPv6 packet becomes the _payload_ (data) of the IPv4 packet. **The Path:** To the intermediate routers, the packet looks like normal IPv4 traffic. They only care about the IPv4 headers and ignore the IPv6 payload inside.

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121092752.png]]
 **Path:** Subnet B $\rightarrow$ Router B $\rightarrow$ Router c $\rightarrow$ Router d $\rightarrow$ Router E $\rightarrow$ Subnet D **Tunnel Entrance:** Router B (IPv4: `152.17.200.113`) **Tunnel Exit:** Router E (IPv4: `156.225.10.66`) **Original Source (IPv6):** `7555...3D9E` (Host in Subnet B) **Final Destination (IPv6):** `B6D2...D28B` (Host in Subnet D)

## 3. Problem Analysis

### Phase 1: Inside the Tunnel (B $\rightarrow$ c $\rightarrow$ d $\rightarrow$ E)

**1. Is the datagram... IPv4 or IPv6?**
 **Analysis:** We are traversing the IPv4-only network (Routers c and d). The IPv6 packet cannot travel naked here; it must be enclosed in an IPv4 shell. **Correct Answer:** **IPv4**

**2/3. What are the Source and Destination addresses?**
 **Analysis (The "Vehicle"):** The "Vehicle" is the IPv4 packet carrying the data.
**Destination:** The router _ending_ the tunnel (Router E). **Correct Answer (Source):** **152.17.200.113** (Router B) **Correct Answer (Dest):** **156.225.10.66** (Router E)

**4/5/6. Is it encapsulating? What is inside?**
 **Analysis (The "Passenger"):** Inside the IPv4 payload sits the original IPv6 packet. It remains untouched.
**Inner Dest:** The original IPv6 receiver. **Correct Answer (Encapsulated?):** **Yes** **Correct Answer (Inner Source):** **7555:F3BE...3D9E** **Correct Answer (Inner Dest):** **B6D2:9E28...D28B**

_(Note: This logic applies identically to the hop from c_ $\rightarrow$ _d and d_ $\rightarrow$ _E. As long as the packet is in the tunnel, the outer IPv4 headers remain constant to guide it to Router E.)_

### Phase 2: Exiting the Tunnel (E $\rightarrow$ D)

**19. Is the datagram... IPv4 or IPv6?**
 **Analysis:** Router E receives the IPv4 packet, sees that it is the destination, strips off the IPv4 header (decapsulation), and reveals the IPv6 packet. It then forwards this IPv6 packet to Subnet D. **Correct Answer:** **IPv6**

**20/21. What are the Source and Destination addresses?**
 **Analysis:** The IPv4 wrapper is gone. We are back to the original packet. **Correct Answer (Source):** **7555:F3BE...3D9E** **Correct Answer (Dest):** **B6D2:9E28...D28B**

**22. Is it encapsulating?**
 **Analysis:** No. The "Vehicle" has been discarded. The "Passenger" is now walking on their own. **Correct Answer:** **No**

## Summary of Logic (Cheat Sheet)

|                   |                 |                          |                         |                          |
| ----------------- | --------------- | ------------------------ | ----------------------- | ------------------------ |
| **Location**      | **Packet Type** | **Outer Source**         | **Outer Dest**          | **Inner Content**        |
| **Before Tunnel** | IPv6            | Original IPv6            | Original IPv6           | Data                     |
| **Inside Tunnel** | **IPv4**        | **Tunnel Entry (Rtr B)** | **Tunnel Exit (Rtr E)** | **Complete IPv6 Packet** |
| **After Tunnel**  | IPv6            | Original IPv6            | Original IPv6           | Data                     |

**Visual Rule:**
 **Inside the Tunnel:** You have TWO sets of IP addresses.
Outer = Router to Router (IPv4).
Inner = Host to Host (IPv6).

## Common Pitfalls
 Forgetting that intermediate IPv4 routers only see the **outer** IPv4 header and are unaware of the inner IPv6 packet. Confusing the tunnel endpoints (dual-stack routers) with regular IPv4-only routers in the middle. Not recognizing that encapsulation adds overhead — the outer IPv4 header increases total packet size.

## Summary

> TL;DR — IPv6 tunneling wraps IPv6 packets inside IPv4 headers so they can traverse IPv4-only networks. Dual-stack routers at tunnel endpoints handle encapsulation/decapsulation; intermediate IPv4 routers forward based on the outer header only.

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121092752.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "IPv4 or IPv6?**  **Analysis:** We are traversing _____ IPv4-only network (Routers c and d)."?
- **A)** Router
- **B)** Network
- **C)** the
- **D)** Protocol

2. Which word completes the following sentence from the text: "What is inside?**  **Analysis (The "Passenger"):** Inside _____ IPv4 payload sits the original IPv6 packet."?
- **A)** Router
- **B)** the
- **C)** Network
- **D)** Protocol

3. Which word completes the following sentence from the text: "**The Path:** To _____ intermediate routers, the packet looks like normal IPv4 traffic."?
- **A)** the
- **B)** Protocol
- **C)** Network
- **D)** Router

4. Which word completes the following sentence from the text: "What are the Source and Destination addresses?**  **Analysis (The _____ The "Vehicle" is the IPv4 packet carrying the data."?
- **A)** Vehicle
- **B)** Network
- **C)** Router
- **D)** Protocol

5. Which word completes the following sentence from the text: "Confusing the tunnel endpoints (dual-stack routers) _____ regular IPv4-only routers in the middle."?
- **A)** with
- **B)** Network
- **C)** Router
- **D)** Protocol

6. Which word completes the following sentence from the text: "They only care about the IPv4 _____ and ignore the IPv6 payload inside."?
- **A)** Network
- **B)** Router
- **C)** headers
- **D)** Protocol

7. Which word completes the following sentence from the text: "IPv4 or IPv6?**  **Analys_____:** Router E receives the IPv4 packet, sees that it is the destination, strips off the IPv4 header (decapsulation), and reveals the IPv6 packet."?
- **A)** is
- **B)** Protocol
- **C)** Router
- **D)** Network

8. Which word completes the following sentence from the text: "Concept Overview: Tunneling  Definition  Tunneling is a technique used when two IPv6 _____ need to communicate but are separated by an older IPv4 network."?
- **A)** Network
- **B)** Protocol
- **C)** Router
- **D)** networks

9. Which word completes the following sentence from the text: "**Destination:** The router _ending_ _____ tunnel (Router E)."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** the

10. Which word completes the following sentence from the text: "Problem Analysis  ### Phase 1: Inside the Tunnel _____ $\rightarrow$ c $\rightarrow$ d $\rightarrow$ E)  **1."?
- **A)** Router
- **B)** Protocol
- **C)** B
- **D)** Network


### Answer Key & Explanations
1. **C)** the completes the sentence: IPv4 or IPv6?**  **Analysis:** We are traversing t...
2. **B)** the completes the sentence: What is inside?**  **Analysis (The "Passenger"):**...
3. **A)** the completes the sentence: **The Path:** To the intermediate routers, the pac...
4. **A)** Vehicle completes the sentence: What are the Source and Destination addresses?**  ...
5. **A)** with completes the sentence: Confusing the tunnel endpoints (dual-stack routers...
6. **C)** headers completes the sentence: They only care about the IPv4 headers and ignore t...
7. **A)** is completes the sentence: IPv4 or IPv6?**  **Analysis:** Router E receives t...
8. **D)** networks completes the sentence: Concept Overview: Tunneling  Definition  Tunneling...
9. **D)** the completes the sentence: **Destination:** The router _ending_ the tunnel (R...
10. **C)** B completes the sentence: Problem Analysis  ### Phase 1: Inside the Tunnel (...

## References & Navigation

- **Previous Topic:** [[Network Address Translation]]
- **Next Topic:** [[Longest Prefix Matching]]
- **Related Notes:** [[Internetworking]]

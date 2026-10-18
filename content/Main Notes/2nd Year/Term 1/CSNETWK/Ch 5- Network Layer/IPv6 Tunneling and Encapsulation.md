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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121092752.png]] **Source / Reference:**

## Multiple Choice Questions

1. Why was **IPv6** standardized with a **128-bit address space** and a simplified **fixed 40-byte base header**?
    - **A)** To reduce address size compared to IPv4's 32-bit addresses.
    - **B)** To permanently solve 32-bit IPv4 address exhaustion ($2^{128} \approx 3.4 \times 10^{38}$ addresses) and accelerate router packet forwarding by eliminating header-length variability, in-network fragmentation, and per-hop header checksum recomputation.
    - **C)** To replace MAC addresses at Layer 2.
    - **D)** To require NAT on every home router.

2. Which three IPv4 header fields were **removed** from the base IPv6 header to speed up Layer-3 router processing?
    - **A)** **Header Checksum** (relies on Layer-2 and Layer-4 checksums instead), **In-Network Fragmentation fields** (`ID`, `Flags`, `Fragment Offset`—IPv6 routers never fragment packets in flight; they send an ICMPv6 *Packet Too Big* message), and variable-length **Options** (moved to Next Header extension headers).
    - **B)** Source IP Address, Destination IP Address, and Version
    - **C)** Hop Limit (TTL), Payload Length, and Next Header
    - **D)** Traffic Class and Flow Label

3. What is **IPv6-over-IPv4 Tunneling**, and how does it enable two IPv6 islands to communicate across legacy IPv4-only intermediate routers?
    - **A)** The border router translates the 128-bit IPv6 address into a 32-bit IPv4 address by deleting 96 bits of the header, losing the original address permanently.
    - **B)** Intermediate IPv4 routers are upgraded in real time via ICMP packets.
    - **C)** The ingress dual-stack border router **encapsulates the entire IPv6 datagram (header + payload) inside the payload field of a new IPv4 datagram** addressed to the egress border router; intermediate IPv4 routers route the outer IPv4 packet normally, and the egress router strips the outer IPv4 header to recover the intact IPv6 datagram.
    - **D)** The IPv6 packet is sent at Layer 2 using ARP across the entire Internet.

4. When an ingress border router $B$ encapsulates an IPv6 packet (originating from IPv6 host $A$ and destined for IPv6 host $F$) into an IPv4 tunnel ending at egress border router $E$, what are the **outer IPv4 source and destination addresses** while inside the tunnel?
    - **A)** Source $= A$'s IPv6 address; Destination $= F$'s IPv6 address
    - **B)** Outer IPv4 Source $=$ Router $E$; Outer IPv4 Destination $=$ Router $B$
    - **C)** Outer IPv4 Source $= 0.0.0.0$; Outer IPv4 Destination $= 255.255.255.255$
    - **D)** Outer IPv4 Source $=$ **Router $B$'s IPv4 address**; Outer IPv4 Destination $=$ **Router $E$'s IPv4 address** (while the inner IPv6 header retains Source $= A$ and Destination $= F$).

5. From the perspective of the IPv6 routing architecture at endpoints $B$ and $E$, what does the intervening chain of IPv4-only routers ($C \to D$) look like?
    - **A)** An Application-layer HTTP proxy.
    - **B)** A single virtual **data-link layer (Layer-2) channel** directly connecting IPv6 router $B$ to IPv6 router $E$.
    - **C)** A DNS authoritative zone.
    - **D)** A disconnected network segment with infinite hop count.

### Answer Key & Explanations

1. **B**. IPv6 expands addresses from 32 bits to 128 bits and streamlines the base header to a fixed 40 bytes so core routers can process headers at hardware line rate.
2. **A**. Removing the IPv4 Header Checksum (which had to be recomputed at every hop as TTL decremented), in-network router fragmentation, and inline variable options dramatically simplifies router fast-path forwarding.
3. **C**. Tunneling treats the entire IPv6 datagram as opaque payload inside an IPv4 packet (with IPv4 `Protocol = 41`), preserving all IPv6 fields end-to-end across IPv4 transit networks.
4. **D**. Inside the tunnel, IPv4 routers only inspect the outer IPv4 header, which carries the tunnel endpoint IPv4 addresses (Source $= B$, Destination $= E$); the inner IPv6 header keeps Source $= A$ and Destination $= F$.
5. **B**. Tunneling abstracts the multi-hop IPv4 transit network into a single logical Layer-2 link (single IPv6 hop) between dual-stack tunnel endpoints $B$ and $E$.

## References & Navigation

- **Previous Topic:** [[Network Address Translation]]
- **Next Topic:** [[Longest Prefix Matching]]
- **Related Notes:** [[Internetworking]]

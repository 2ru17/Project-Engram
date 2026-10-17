---
id: network_layer
type: note
course: CSNETWK
topic: Network Layer
status: completed
---

# Network Layer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Network Layer]] #[[Problem Solving]]

---

## Overview

The Network Layer encapsulates transport-layer segments into datagrams and transfers them from a sending host to a receiving host. Its two key functions are:
1. **Forwarding (Data Plane):** The local, per-router process of moving an arriving packet from an input link to the appropriate output link using a forwarding table. It is implemented in hardware (nanosecond timeframe).
2. **Routing (Control Plane):** The network-wide logic that determines the end-to-end path packets take from source to destination using routing algorithms. It is implemented in software (millisecond timeframe).

### Router Architecture
A router consists of input ports, a switching fabric, output ports, and a routing processor. **Input ports:** Perform physical layer reception, link layer protocol handling, and decentralized switching (lookup, forwarding, queueing). **Longest Prefix Matching:** When looking for a forwarding table entry for a destination IP address, the router uses the longest address prefix that matches. This is often performed using Ternary Content Addressable Memory (TCAM).

### Internet Protocol (IP) and Addressing
The IP datagram features a header that includes a version, length, Type of Service, Time-to-Live (TTL), upper layer protocol, header checksum, and source/destination IP addresses. The total IP header is typically 20 bytes. **IP Addressing:** 32-bit identifier associated with a host or router interface. Expressed in dotted-decimal notation. **Subnets:** Devices that can physically reach each other without passing through an intervening router. **CIDR (Classless InterDomain Routing):** The format `a.b.c.d/x` where `x` is the number of bits in the subnet portion. **DHCP (Dynamic Host Configuration Protocol):** Dynamically allocates an IP address (as well as first-hop router IP, DNS server IP, and network mask) to a host joining the network.

### NAT and IPv6 **NAT (Network Address Translation):** Allows devices in a local network to share a single public IPv4 address, mitigating IPv4 exhaustion. Local devices use private IP space, and the NAT router changes the source IP and port for outgoing datagrams. **IPv6:** Features a 128-bit address space, a fixed 40-byte header, and removes checksum and fragmentation from the network layer to speed up processing. **Tunneling:** A transition method where an IPv6 datagram is encapsulated as the payload within an IPv4 datagram to travel across IPv4 routers.

### Routing Algorithms
Routing algorithms determine the least-cost path through a network graph. **Link State (LS) Algorithm (Dijkstra's):** Centralized (global information). All routers have the complete topology and link costs. It computes the least-cost path from a source to all other nodes. Complexity is $O(n^2)$. Can suffer from route oscillations. **Distance Vector (DV) Algorithm:** Decentralized. Nodes exchange distance information only with their neighbors iteratively. Uses the Bellman-Ford equation.

## Important Formulas
 **Bellman-Ford Equation (Distance Vector):**
  $$ D_x(y) = \min_v \{ c_{x,v} + D_v(y) \} $$
  Where $D_x(y)$ is the least-cost path from $x$ to $y$, $c_{x,v}$ is the cost of the direct link from $x$ to neighbor $v$, and $D_v(y)$ is the estimated least-cost path from $v$ to $y$.

## Worked Examples

**Example 1: Longest Prefix Match**
A router has the following forwarding table: Prefix A: `11001000 00010111 00010` (Interface 0) Prefix B: `11001000 00010111 00011000` (Interface 1) Prefix C: `11001000 00010111 00011` (Interface 2) Otherwise: Interface 3

Given the destination address: `11001000 00010111 00010110 10100001` Matches Prefix A (first 21 bits are `11001000 00010111 00010`). Does not match Prefix B or C (the 21st bit is 0, not 1).
**Result:** Forward to Interface 0.

Given the destination address: `11001000 00010111 00011000 10101010` Matches Prefix C (first 21 bits are `... 00011`). Matches Prefix B (first 24 bits are `... 00011000`).
Since Prefix B is a longer match (24 bits vs 21 bits), the router forwards the packet to Interface 1.

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "It is implemented _____ hardware (nanosecond timeframe)."?
- **A)** Router
- **B)** in
- **C)** Protocol
- **D)** Network

2. Which word completes the following sentence from the text: "**CIDR (Classless InterDomain Routing):** The format `a.b.c.d/x` where `x` _____ the number of bits in the subnet portion."?
- **A)** Router
- **B)** Protocol
- **C)** Network
- **D)** is

3. Which word completes the following sentence from the text: "Nodes exchange distance information _____ with their neighbors iteratively."?
- **A)** Network
- **B)** Protocol
- **C)** Router
- **D)** only

4. Which word completes the following sentence from the text: "**Tunneling:** A transition method where an IPv6 datagram is encapsulated as _____ payload within an IPv4 datagram to travel across IPv4 routers."?
- **A)** the
- **B)** Router
- **C)** Network
- **D)** Protocol

5. Which word completes the following sentence from the text: "**DHCP (Dynamic Host Configuration Protocol):** Dynamically allocates an IP address (as well as first-hop _____ IP, DNS server IP, and network mask) to a host joining the network."?
- **A)** Protocol
- **B)** Router
- **C)** router
- **D)** Network

6. Which word completes the following sentence from the text: "Local devices use private IP space, and the NAT _____ changes the source IP and port for outgoing datagrams."?
- **A)** router
- **B)** Network
- **C)** Router
- **D)** Protocol

7. Which word completes the following sentence from the text: "**Routing (Control Plane):** The network-wide logic that determines the end-to-end _____ packets take from source to destination using routing algorithms."?
- **A)** path
- **B)** Router
- **C)** Network
- **D)** Protocol

8. Which word completes the following sentence from the text: "Given the destination address: `11001000 00010111 00011000 10101010` _____ Prefix C (first 21 bits are `..."?
- **A)** Router
- **B)** Matches
- **C)** Protocol
- **D)** Network

9. Which word completes the following sentence from the text: "All routers have the _____ topology and link costs."?
- **A)** Protocol
- **B)** Network
- **C)** Router
- **D)** complete

10. Which word completes the following sentence from the text: "Does not match Prefix B or C _____ 21st bit is 0, not 1)."?
- **A)** Protocol
- **B)** Network
- **C)** the
- **D)** Router


### Answer Key & Explanations
1. **B)** in completes the sentence: It is implemented in hardware (nanosecond timefram...
2. **D)** is completes the sentence: **CIDR (Classless InterDomain Routing):** The form...
3. **D)** only completes the sentence: Nodes exchange distance information only with thei...
4. **A)** the completes the sentence: **Tunneling:** A transition method where an IPv6 d...
5. **C)** router completes the sentence: **DHCP (Dynamic Host Configuration Protocol):** Dy...
6. **A)** router completes the sentence: Local devices use private IP space, and the NAT ro...
7. **A)** path completes the sentence: **Routing (Control Plane):** The network-wide logi...
8. **B)** Matches completes the sentence: Given the destination address: `11001000 00010111 ...
9. **D)** complete completes the sentence: All routers have the complete topology and link co...
10. **C)** the completes the sentence: Does not match Prefix B or C (the 21st bit is 0, n...

## References & Navigation

- **Previous Topic:** [[Sockets Programming]]
- **Next Topic:** [[Sub-net Addressing]]
- **Related Notes:** [[Internetworking]], [[Security]]

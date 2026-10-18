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

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Network Layer]] #[[Problem Solving]]

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

1. What is the fundamental architectural distinction between **forwarding** (in the **Data Plane**) and **routing** (in the **Control Plane**) at the Network Layer?
    - **A)** Forwarding and routing are synonyms for the exact same global algorithm.
    - **B)** **Forwarding** is the **local, per-packet router action** (taking nanoseconds in hardware) of moving an arriving datagram from an input port to the appropriate output port using a local forwarding table; **Routing** is the **network-wide control process** (taking milliseconds to seconds in software, via OSPF/BGP/RIP) that determines the end-to-end paths and populates those forwarding tables.
    - **C)** Forwarding happens at the Application layer, while routing happens at the Physical layer.
    - **D)** Routing moves individual bytes across a switch fabric, while forwarding computes Dijkstra's algorithm.

2. How is the service model of the Internet's Network Layer (IP) characterized?
    - **A)** **Best-Effort Service**: connectionless datagram delivery with **no guarantees** on packet delivery (packets may be dropped), **no guarantee** on in-order arrival (packets may take different paths), and **no guarantee** on end-to-end delay or minimum bandwidth.
    - **B)** Guaranteed bandwidth, zero jitter, in-order reliable delivery
    - **C)** Circuit-switched TDM reservation end-to-end before any packet is sent
    - **D)** Broadcast-only delivery to all hosts on the Internet

3. Inside a high-speed router's input/output port architecture, where and why does **queueing (and packet loss / buffer overflow)** occur?
    - **A)** Only inside the DNS server.
    - **B)** Inside the fiber-optic glass core where bits wait in queues.
    - **C)** At **input port buffers** (if the switching fabric is slower than the sum of input line rates or experiences **Head-of-Line (HOL) blocking**) and at **output port buffers** (when the aggregate arrival rate of packets switched to a given output link exceeds that output link's transmission capacity $R_{\text{line}}$).
    - **D)** Only when the TTL field equals $255$.

4. What is the purpose of the 8-bit **Time-To-Live (TTL)** field (called **Hop Limit** in IPv6) in the IP datagram header?
    - **A)** It records the exact wall-clock timestamp at which the packet was created.
    - **B)** It counts the number of switches in a single LAN.
    - **C)** It specifies the TCP window size in kilobytes.
    - **D)** Every router along the path decrements the TTL field by $1$ before forwarding; if TTL reaches $0$, the router **drops the datagram** and sends an ICMP *Time Exceeded* (Type 11, Code 0) message back to the source, preventing packets caught in transient routing loops from circulating forever.

5. Among the three internal router **switching fabric** designs—**Switching via Memory**, **Switching via a Shared Bus**, and **Switching via an Interconnection Network (Crossbar)**—which design allows multiple packets to be forwarded in parallel simultaneously?
    - **A)** Switching via Memory (limited by memory bus bandwidth to 1 packet at a time)
    - **B)** **Crossbar / Banyan Interconnection Network**, which can transfer multiple packets concurrently across disjoint input-to-output paths as long as they target different output ports.
    - **C)** Switching via a Shared Bus (limited by bus contention to 1 packet at a time)
    - **D)** None of them can forward more than 1 bit per second.

### Answer Key & Explanations

1. **B**. Forwarding is the local data-plane lookup performed on each arriving packet (`Destination IP -> Output Interface`); routing is the distributed control-plane algorithm that computes shortest paths across the network.
2. **A**. IP provides a minimalist, connectionless "best-effort" datagram service; reliability, congestion control, and in-order byte-stream semantics are delegated to Layer 4 (TCP).
3. **C**. Packet queues form whenever instantaneous arrival rate exceeds service rate at the switch fabric (input queueing / HOL blocking) or at a contended outgoing link (output port queueing).
4. **D**. Decrementing TTL by 1 at every Layer-3 router hop bounds the maximum lifetime of a datagram in the network and enables `traceroute` diagnostics.
5. **B**. A crossbar switch fabric is non-blocking for distinct output ports, enabling parallel multi-packet transfers across multiple crosspoints simultaneously.

## References & Navigation

- **Previous Topic:** [[Sockets Programming]]
- **Next Topic:** [[Sub-net Addressing]]
- **Related Notes:** [[Internetworking]], [[Security]]

---
id: Sub-net-Addressing
type: note
course: CSNETWK
topic:
status: completed
---

# Sub-net Addressing

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Subnetting allows a network administrator to break a large network into smaller, efficient sub-networks. The goal is to minimize wasted IP addresse...

## Key Concepts
 Base Network Subnet A Subnet B Subnet C Analysis

## Details / Theory

## 1. Concept Overview: VLSM

Definition

Subnetting allows a network administrator to break a large network into smaller, efficient sub-networks. The goal is to minimize wasted IP addresses while accommodating the required number of hosts.

The Golden Rule of VLSM (Variable Length Subnet Masking)

When assigning subnets to groups of different sizes, always assign the largest group first, then the next largest, and so on. This prevents "fragmentation" of the address space.

Key Formula

$$\text{Hosts} = 2^h - 2$$

Where $h$ is the number of host bits (0s in the mask). We subtract 2 for:

1. **Network Address:** The very first IP (all host bits 0).
2. **Broadcast Address:** The very last IP (all host bits 1).

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121092345.png]]
 **Base Network:** `172.30.172.0/24` **Subnet A:** 81 hosts **Subnet B:** 25 hosts **Subnet C:** 37 hosts

## 3. Problem Analysis

### General Questions

**1. Is the address space public or private?**
 **Analysis:** The address starts with `172.30`. The RFC 1918 private range for Class B is `172.16.0.0` to `172.31.255.255`. **Correct Answer:** **Private**

**2. How many hosts can there be in this address space?**
 **Analysis:** The base network is `/24`. This means 24 bits are for the network, leaving $32 - 24 = 8$ bits for hosts. **Calculation:** $2^8 - 2 = 256 - 2 = 254$. **Correct Answer:** **254**

### Subnet Allocation Strategy (Mental Step)

Before answering specific questions, we must determine the block sizes.

1. **Sort by Hosts:** A (81) > C (37) > B (25).
2. **Calculate A (81):** Needs $>83$ IPs. Nearest power of 2 is $128$ ($2^7$). Mask: $/25$.
3. **Calculate C (37):** Needs $>39$ IPs. Nearest power of 2 is $64$ ($2^6$). Mask: $/26$.
4. **Calculate B (25):** Needs $>27$ IPs. Nearest power of 2 is $32$ ($2^5$). Mask: $/27$.

### Subnet A (81 Hosts)

**3. What is the subnet address of subnet A? (CIDR notation)**
 **Analysis:** Subnet A is the largest, so it starts at the beginning of the block: `.0`. It needs 128 addresses (a $/25$ block). **Correct Answer:** **172.30.172.0/25**

**4. What is the broadcast address of subnet A?**
 **Analysis:** Start at `.0` + 128 addresses - 1 = `.127`. **Correct Answer:** **172.30.172.127**

**5. What is the starting address of subnet A?**
 **Analysis:** Subnet ID + 1. **Correct Answer:** **172.30.172.1**

**6. What is the ending address of subnet A?**
 **Analysis:** Broadcast Address - 1. **Correct Answer:** **172.30.172.126**

### Subnet B (25 Hosts)

_Note: Even though B is Question 7, logic dictates we calculate its position after C because C is larger. However, the answer key provides the specific result for B based on it sitting in the "third" slot after A and C._

**7. What is the subnet address of subnet B? (CIDR notation)**
 **Analysis:**
Subnet A used `0` to `127`.
Subnet C (next largest) uses `128` to `191` (64 IPs).
Subnet B starts after C. Start = `192`. Size = 32 IPs ($/27$). **Correct Answer:** **172.30.172.192/27**

**8. What is the broadcast address of subnet B?**
 **Analysis:** Start `.192` + 32 addresses - 1 = `.223`. **Correct Answer:** **172.30.172.223**

**9. What is the starting address of subnet B?**
 **Analysis:** Subnet ID (`.192`) + 1. **Correct Answer:** **172.30.172.193**

**10. What is the ending address of subnet B?**
 **Analysis:** Broadcast (`.223`) - 1. **Correct Answer:** **172.30.172.222**

### Subnet C (37 Hosts)

**11. What is the subnet address of subnet C? (CIDR notation)**
 **Analysis:** Subnet C is the second largest. It starts immediately after Subnet A.
Subnet A ended at `127`.
Subnet C starts at `128`. It needs 64 addresses ($2^6$ covers 37 hosts).
Mask: $32 - 6 = /26$. **Correct Answer:** **172.30.172.128/26**

**12. What is the broadcast address of subnet C?**
 **Analysis:** Start `.128` + 64 addresses - 1 = `.191`. **Correct Answer:** **172.30.172.191**

**13. What is the starting address of subnet C?**
 **Analysis:** Subnet ID (`.128`) + 1. **Correct Answer:** **172.30.172.129**

**14. What is the ending address of subnet C?**
 **Analysis:** Broadcast (`.191`) - 1. **Correct Answer:** **172.30.172.190**

## Summary of Logic (Cheat Sheet)

1. **Count Hosts:** Add +2 to every host requirement (Network ID + Broadcast).
2. **Find Power of 2:** Find the smallest power of 2 that fits that number (e.g., 37 hosts -> need 39 -> use 64).
3. **Sort Descending:** Arrange subnets from Largest to Smallest (A -> C -> B).
4. **Stack Blocks:**
Block 1 starts at `.0`.
Block 2 starts at `.0 + Block 1 Size`.
Block 3 starts at `.0 + Block 1 + Block 2`.

## Common Pitfalls
 Forgetting to subtract 2 from $2^h$ for the network and broadcast addresses: usable hosts = $2^h - 2$. Not sorting subnets **largest-first** when performing VLSM allocation, causing address space fragmentation. Miscalculating the next subnet’s starting address — it must be the previous subnet’s start + block size.

## Summary

> TL;DR — VLSM partitions a network into variable-size subnets. Allocate largest-first, compute host bits with $2^h - 2 \ge \text{needed hosts}$, and track subnet/broadcast addresses carefully.

## Links
 **Related:** - [[Pasted image 20251121092345.png]] **Source / Reference:**

## Multiple Choice Questions

1. In **CIDR (Classless Inter-Domain Routing)** notation `a.b.c.d/x`, what does the prefix length `/x` specify?
    - **A)** The number of routers in the subnet.
    - **B)** That the **most significant (leftmost) $x$ bits** of the 32-bit IPv4 address identify the **network/subnet prefix**, while the remaining **$32 - x$ bits** identify the **host interface** within that subnet.
    - **C)** The maximum TCP port number allowed on the subnet.
    - **D)** The number of bits in the MAC address.

2. Given a `/26` IPv4 subnet (e.g., `192.168.10.64/26`), what is its dotted-decimal subnet mask, and how many **usable host IP addresses** does it provide?
    - **A)** Mask `255.255.255.0`; $254$ usable hosts
    - **B)** Mask `255.255.255.192`; $2^{32-26} - 2 = 2^6 - 2 = 64 - 2 = \mathbf{62}$ usable hosts
    - **C)** Mask `255.255.255.128`; $126$ usable hosts
    - **D)** Mask `255.255.255.224`; $30$ usable hosts

3. For the subnet `192.168.1.128/26`, what are the **Network Address**, the **First Usable Host IP**, the **Last Usable Host IP**, and the **Directed Broadcast Address**?
    - **A)** Network: `192.168.1.128`, First: `192.168.1.129`, Last: `192.168.1.190`, Broadcast: `192.168.1.191`
    - **B)** Network: `192.168.1.128`, First: `192.168.1.128`, Last: `192.168.1.191`, Broadcast: `192.168.1.192`
    - **C)** Network: `192.168.1.0`, First: `192.168.1.1`, Last: `192.168.1.254`, Broadcast: `192.168.1.255`
    - **D)** Network: `192.168.1.128`, First: `192.168.1.130`, Last: `192.168.1.254`, Broadcast: `192.168.1.255`

4. Why do we subtract $2$ from $2^{32-x}$ when computing the number of assignable host addresses on a standard IPv4 subnet?
    - **A)** Because two addresses are reserved: the **all-$0$s host bits** address represents the **Subnet/Network Identifier** itself, and the **all-$1$s host bits** address represents the **Subnet Directed Broadcast Address**.
    - **B)** Because two addresses are always reserved for DNS servers.
    - **C)** Because IPv4 cannot use odd numbers.
    - **D)** Because the first two bits of every IPv4 address are always `11`.

5. How does **Route Aggregation (Supernetting)** allow an ISP that owns four contiguous `/22` blocks (`200.23.16.0/22`, `200.23.20.0/22`, `200.23.24.0/22`, and `200.23.28.0/22`) to advertise all four blocks to the global BGP routing table using a **single** prefix?
    - **A)** By advertising `200.23.0.0/16`.
    - **B)** Since the third octets `16` (`00010000`), `20` (`00010100`), `24` (`00011000`), and `28` (`00011100`) share the first 4 bits `0001` ($8 + 8 + 4 = 20$ common leading bits), all four `/22` blocks aggregate cleanly into the single summary prefix **`200.23.16.0/20`**.
    - **C)** By advertising `200.23.16.0/24`.
    - **D)** Contiguous blocks cannot be aggregated in CIDR.

### Answer Key & Explanations

1. **B**. In CIDR `a.b.c.d/x`, the first $x$ bits form the network prefix (mask of $x$ leading $1$s followed by $32-x$ trailing $0$s), and the remaining $32-x$ bits identify hosts within that subnet.
2. **B**. `/26` has $26$ leading $1$s: `11111111.11111111.11111111.11000000` $= 255.255.255.192$, leaving $32 - 26 = 6$ host bits ($2^6 - 2 = 62$ usable hosts).
3. **A**. A `/26` block has size $2^6 = 64$, so the block starting at `.128` spans `.128` through `.191`. `.128` is the network ID, `.129`–`.190` are the $62$ usable hosts, and `.191` (all host bits $= 1$) is the directed broadcast address.
4. **A**. Host portion all-zeros (`00...0`) is the subnet address, and host portion all-ones (`11...1`) is the subnet broadcast address; neither may be assigned to a standard host interface.
5. **B**. Combining $4 = 2^2$ contiguous `/22` blocks shortens the prefix length by $2$ bits ($22 - 2 = 20$), yielding the single aggregate prefix `200.23.16.0/20`.

## References & Navigation

- **Previous Topic:** [[Network Layer]]
- **Next Topic:** [[Network Address Translation]]
- **Related Notes:** [[Internetworking]]

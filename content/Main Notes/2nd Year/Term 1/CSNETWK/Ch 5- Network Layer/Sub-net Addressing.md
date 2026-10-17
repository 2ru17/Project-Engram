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

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121092345.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "The goal is to minimize wasted IP _____ while accommodating the required number of hosts."?
- **A)** Protocol
- **B)** Router
- **C)** Network
- **D)** addresses

2. Which word completes the following sentence from the text: "What is the broadcast address of subnet B?**  **Analysis:** _____ `.192` + 32 addresses - 1 = `.223`."?
- **A)** Network
- **B)** Router
- **C)** Start
- **D)** Protocol

3. Which word completes the following sentence from the text: "The Golden Rule of VLSM (Variable Length Subnet Masking)  When assigning subnets to groups of _____ sizes, always assign the largest group first, then the next largest, and so on."?
- **A)** Protocol
- **B)** different
- **C)** Network
- **D)** Router

4. Which word completes the following sentence from the text: "**Correct Answer:** **172.30.172.222**  ### _____ C (37 Hosts)  **11."?
- **A)** Protocol
- **B)** Subnet
- **C)** Router
- **D)** Network

5. Which word completes the following sentence from the text: "**Network Address:** The very first _____ (all host bits 0)."?
- **A)** Network
- **B)** Protocol
- **C)** Router
- **D)** IP

6. Which word completes the following sentence from the text: "Concept Overview: VLSM  Definition  Subnetting allows a network administra_____r to break a large network into smaller, efficient sub-networks."?
- **A)** to
- **B)** Network
- **C)** Protocol
- **D)** Router

7. Which word completes the following sentence from the text: "**Broadcast Address:** The very last _____ (all host bits 1)."?
- **A)** Router
- **B)** IP
- **C)** Protocol
- **D)** Network

8. Which word completes the following sentence from the text: "What is the ending address of _____ C?**  **Analysis:** Broadcast (`.191`) - 1."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** subnet

9. Which word completes the following sentence from the text: "What is the starting address of _____ A?**  **Analysis:** Subnet ID + 1."?
- **A)** Router
- **B)** subnet
- **C)** Network
- **D)** Protocol

10. Which word completes the following sentence from the text: "**Correct Answer:** **172.30.172.190**  ## Summary _____ Logic (Cheat Sheet)  1."?
- **A)** Network
- **B)** Router
- **C)** of
- **D)** Protocol


### Answer Key & Explanations
1. **D)** addresses completes the sentence: The goal is to minimize wasted IP addresses while ...
2. **C)** Start completes the sentence: What is the broadcast address of subnet B?**  **An...
3. **B)** different completes the sentence: The Golden Rule of VLSM (Variable Length Subnet Ma...
4. **B)** Subnet completes the sentence: **Correct Answer:** **172.30.172.222**  ### Subnet...
5. **D)** IP completes the sentence: **Network Address:** The very first IP (all host b...
6. **A)** to completes the sentence: Concept Overview: VLSM  Definition  Subnetting all...
7. **B)** IP completes the sentence: **Broadcast Address:** The very last IP (all host ...
8. **D)** subnet completes the sentence: What is the ending address of subnet C?**  **Analy...
9. **B)** subnet completes the sentence: What is the starting address of subnet A?**  **Ana...
10. **C)** of completes the sentence: **Correct Answer:** **172.30.172.190**  ## Summary...

## References & Navigation

- **Previous Topic:** [[Network Layer]]
- **Next Topic:** [[Network Address Translation]]
- **Related Notes:** [[Internetworking]]

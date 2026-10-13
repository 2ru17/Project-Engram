---
id: Addressing-and-Forwarding
type: note
course: CSNETWK
topic:
status: completed
---

# Addressing and Forwarding

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> The Golden Rule of Forwarding

## Key Concepts
 IP Addresses (Network Layer) MAC Addresses (Link Layer) Sender Receiver Path

## Details / Theory

## 1. Concept Overview: MAC vs. IP

**The Golden Rule of Forwarding**
 **IP Addresses (Network Layer):** act like the "Final Destination" on a letter. They **NEVER CHANGE** from source to destination (ignoring NAT). **MAC Addresses (Link Layer):** act like the "Next Hop" ticket. They **CHANGE at every router**. The source MAC is always the device _sending_ the frame onto the wire, and the destination MAC is the device _receiving_ it on that specific wire.

The Journey

When a packet travels from Host A to Host B through a Router:

1. **Hop 1 (A** $\rightarrow$ **Router):** Src=MAC_A, Dest=MAC_Router.
2. **Hop 2 (Router** $\rightarrow$ **B):** Src=MAC_Router, Dest=MAC_B.
3. **IP Address:** Always Src=IP_A, Dest=IP_B.

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121094215.png]]
 **Sender:** Node C (`128.119.156.36`, MAC `E3...`) **Receiver:** Node A (`128.119.184.242`, MAC `35...`) **Path:** C $\rightarrow$ Router (Right) $\rightarrow$ Router (Center) $\rightarrow$ Router (Left) $\rightarrow$ A.

## 3. Problem Analysis

### Point 6 (Node C $\rightarrow$ First Router)

_Context: The packet is leaving the source computer (C) and heading to its default gateway (the router interface)._

**1/2. MAC Addresses (Link Layer)**
 **Source MAC:** The device sending the frame. $\rightarrow$ **Node C (E3-A8...)** **Destination MAC:** The interface of the router receiving it. $\rightarrow$ **Router Interface 6 (81-D8...)**

**3/4. IP Addresses (Network Layer)**
 **Source IP:** The original sender. $\rightarrow$ **Node C (128.119.156.36)** **Destination IP:** The final target. $\rightarrow$ **Node A (128.119.184.242)**

### Point 4 (Between Routers)

**5. Do the source and destination MAC addresses change at point 4?**
 **Analysis:** Point 4 represents a new physical link (wire). The router at Point 6 stripped the old Link Layer header and built a new one to send to the next router. **Correct Answer:** **Yes** (The previous MACs were for the C-Router link; the new MACs are for the Router-Router link).

### Point 2 (Last Router $\rightarrow$ Node A)

_Context: The final router is delivering the packet to the destination computer._

**6. Do the source and destination MAC addresses change at point 2?**
 **Analysis:** Yes. The router is now the sender (Link Layer), and Node A is the receiver.

**7/8. MAC Addresses**
 **Source MAC:** The router interface sending the frame. $\rightarrow$ **Router Interface 2 (52-19...)** **Destination MAC:** The final computer's NIC. $\rightarrow$ **Node A (35-14...)**

### Point 1 (Node A's Network Card)

**9. Do the source and destination MAC addresses change at point 1?**
 **Analysis:** Point 1 and Point 2 are on the **same wire** (the same subnet). A frame does not change mid-wire. **Correct Answer:** **No**

## Summary of Logic (Cheat Sheet)

|             |                  |                                          |
| ----------- | ---------------- | ---------------------------------------- |
| **Layer**   | **Address Type** | **Behavior**                             |
| **Network** | IP Address       | **Constant** (Start to Finish)           |
| **Link**    | MAC Address      | **Changes Every Hop** (Router to Router) |

## Common Pitfalls
 Thinking IP addresses change at each hop — **IP stays constant** end-to-end; only **MAC addresses** change per hop. Confusing the source/destination MAC at a given hop with the original sender/receiver. Forgetting that routers replace MAC headers at each hop using ARP to resolve the next-hop MAC.

## Summary

> TL;DR — The "golden rule": IP addresses remain constant from source to destination, while MAC addresses change at every router hop. Routers use ARP to find the next-hop MAC and rewrite the link-layer header accordingly.

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121094215.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "MAC Addresses**  **Source MAC:** The _____ interface sending the frame."?
    - **A)** Network
    - **B)** Router
    - **C)** Protocol
    - **D)** router

2. Which word completes the following sentence from the text: "Problem Analysis  ### Point 6 (Node C $\rightarrow$ First Router)  _Context: The packet is _____ the source computer (C) and heading to its default gateway (the router interface)._  **1/2."?
    - **A)** Router
    - **B)** Network
    - **C)** Protocol
    - **D)** leaving

3. Which word completes the following sentence from the text: "Do the source and destination MAC addresses change at point _____  **Analysis:** Point 4 represents a new physical link (wire)."?
    - **A)** Protocol
    - **B)** Router
    - **C)** Network
    - **D)** 4

4. Which word completes the following sentence from the text: "Do the source and destination MAC _____ change at point 2?**  **Analysis:** Yes."?
    - **A)** addresses
    - **B)** Router
    - **C)** Network
    - **D)** Protocol

5. Which word completes the following sentence from the text: "$\rightarrow$ **Router Interface _____ (81-D8...)**  **3/4."?
    - **A)** Protocol
    - **B)** Network
    - **C)** 6
    - **D)** Router

6. Which word completes the following sentence from the text: "The router is now the sender (Link _____ and Node A is the receiver."?
    - **A)** Layer
    - **B)** Router
    - **C)** Protocol
    - **D)** Network

7. Which word completes the following sentence from the text: "**Correct Answer:** **Yes** (The previous MACs were for the _____ link; the new MACs are for the Router-Router link)."?
    - **A)** Protocol
    - **B)** Router
    - **C)** Network
    - **D)** CRouter

8. Which word completes the following sentence from the text: "**MAC Addresses (Link Layer):** act _____ the "Next Hop" ticket."?
    - **A)** Network
    - **B)** Router
    - **C)** Protocol
    - **D)** like

9. Which word completes the following sentence from the text: "Confusing the source/destination MAC at a _____ hop with the original sender/receiver."?
    - **A)** given
    - **B)** Network
    - **C)** Router
    - **D)** Protocol

10. Which word completes the following sentence from the text: "--- id: Addressing-and-Forwarding type: note course: CSNETWK topic: status: completed ---  # Addressing and Forwarding  > [!info] Document Metadata > - **Course:** `=this.course` > - **Topic:** `=this.topic` > - **Status:** `=this.status`  **🏷️ Tags:** #[[CSNETWK]] _____ Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]  ---  ## Overview  > The Golden Rule of Forwarding  ## Key Concepts  IP Addresses (Network Layer) MAC Addresses (Link Layer) Sender Receiver Path  ## Details / Theory  ## 1."?
    - **A)** Network
    - **B)** Computer
    - **C)** Protocol
    - **D)** Router


### Answer Key & Explanations
1. **D)** router completes the sentence: MAC Addresses**  **Source MAC:** The router interf...
2. **D)** leaving completes the sentence: Problem Analysis  ### Point 6 (Node C $\rightarrow...
3. **D)** 4 completes the sentence: Do the source and destination MAC addresses change...
4. **A)** addresses completes the sentence: Do the source and destination MAC addresses change...
5. **C)** 6 completes the sentence: $\rightarrow$ **Router Interface 6 (81-D8...)**  *...
6. **A)** Layer completes the sentence: The router is now the sender (Link Layer), and Nod...
7. **D)** CRouter completes the sentence: **Correct Answer:** **Yes** (The previous MACs wer...
8. **D)** like completes the sentence: **MAC Addresses (Link Layer):** act like the "Next...
9. **A)** given completes the sentence: Confusing the source/destination MAC at a given ho...
10. **B)** Computer completes the sentence: --- id: Addressing-and-Forwarding type: note cours...

## References & Navigation

- **Previous Topic:** [[Link Layer]]
- **Next Topic:** [[Learning Switches (Basic)]]
- **Related Notes:** [[Internetworking]]

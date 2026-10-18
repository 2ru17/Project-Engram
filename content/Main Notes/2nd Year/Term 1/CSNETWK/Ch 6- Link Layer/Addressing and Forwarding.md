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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121094215.png]] **Source / Reference:**

## Multiple Choice Questions

1. How do **Layer-2 MAC (Link-Layer) addresses** and **Layer-3 IP (Network-Layer) addresses** differ in structure, mutability, and purpose?
    - **A)** MAC addresses are 32-bit hierarchical addresses that change at every router hop; IP addresses are 48-bit flat addresses burned into the NIC.
    - **B)** A **MAC address** is a **48-bit (6-byte) flat hardware identifier** (represented in hexadecimal like `1A-2F-BB-76-09-AD`) that stays portable with the NIC, whereas an **IP address** is a **hierarchical topological address** (32-bit IPv4 / 128-bit IPv6) determined by the subnet to which the host is currently attached.
    - **C)** MAC addresses are used by BGP to route across the global Internet, while IP addresses are used only inside a single Ethernet switch.
    - **D)** They are identical 64-bit numbers.

2. As an IP datagram travels from Host $A$ (on Subnet 1) through Router $R$ to Host $B$ (on Subnet 2), what happens to the **Source/Destination IP addresses** vs. the **Source/Destination MAC addresses** when the packet passes through Router $R$ (assuming no NAT)?
    - **A)** The Layer-3 **Source IP ($A$) and Destination IP ($B$) remain unchanged end-to-end**, whereas the Layer-2 **Frame Source MAC and Destination MAC are stripped and rewritten at every router hop** (Hop 1 Frame: $\text{Src MAC} = A, \text{Dst MAC} = R_{\text{in}}$; Hop 2 Frame: $\text{Src MAC} = R_{\text{out}}, \text{Dst MAC} = B$).
    - **B)** Both the IP addresses and the MAC addresses are rewritten at Router $R$.
    - **C)** The MAC addresses remain unchanged end-to-end, while the IP addresses change at every hop.
    - **D)** Neither MAC nor IP addresses ever change.

3. What is the role of the **Address Resolution Protocol (ARP)** when Host $A$ on a LAN knows the target IP address $IP_X$ on the **same subnet** but does not know its Layer-2 MAC address?
    - **A)** Host $A$ sends a DNS query to the Root DNS server asking for the MAC address.
    - **B)** Host $A$ sends an ARP Request across 10 routers to the remote subnet.
    - **C)** Host $A$ broadcasts an **ARP Request** frame to the Layer-2 broadcast MAC address **`FF-FF-FF-FF-FF-FF`** asking *"Who has $IP_X$?"*; all nodes on the LAN receive the broadcast, and only node $X$ replies with a **unicast ARP Reply** frame containing its MAC address $MAC_X$.
    - **D)** Host $A$ uses DHCP to assign a new MAC address to $X$.

4. When Host $A$ (`192.168.1.10/24`) wants to send an IP packet to a remote server $B$ (`8.8.8.8`) located on a **different subnet**, which IP address does Host $A$ query via ARP to put in the Ethernet frame's **Destination MAC** field?
    - **A)** It sends an ARP request for `8.8.8.8` directly.
    - **B)** It sends the IP packet without an Ethernet frame header.
    - **C)** It sets the Destination MAC to `00-00-00-00-00-00`.
    - **D)** It checks its subnet mask, determines that `8.8.8.8` is off-subnet, and uses ARP to resolve the MAC address of its **Default Gateway (first-hop router interface on `192.168.1.0/24`)**; the Ethernet frame is addressed to the router's MAC while the encapsulated IP packet is addressed to `8.8.8.8`.

5. Why are entries in a host's **ARP Cache (ARP Table)** assigned a Time-To-Live (typically ~20 minutes) rather than being stored permanently?
    - **A)** Because ARP tables can only hold 1 entry at a time.
    - **B)** To automatically purge stale IP-to-MAC mappings if a host's NIC is replaced or a DHCP lease reassigns an IP address to a different physical machine on the LAN (plug-and-play self-healing).
    - **C)** Because MAC addresses increment by 1 every 20 minutes.
    - **D)** To force the router to reboot every 20 minutes.

### Answer Key & Explanations

1. **B**. MAC addresses are 48-bit flat link-layer identifiers used for local single-hop frame delivery; IP addresses are hierarchical network-layer locators used for multi-hop routing across subnets.
2. **A**. Without NAT, the IP header's Source IP ($A$) and Destination IP ($B$) stay fixed from source to destination, while each link along the path encapsulates the datagram in a new Layer-2 frame with hop-specific Source and Destination MAC addresses.
3. **C**. ARP resolves a same-subnet IPv4 address to a 48-bit MAC address by broadcasting the query (`FF-FF-FF-FF-FF-FF`) on the local broadcast domain and receiving a unicast reply from the target owner.
4. **D**. ARP works only within the local Layer-2 broadcast domain (same subnet). To reach an off-subnet IP (`8.8.8.8`), the sender addresses the Layer-2 Ethernet frame to its local default gateway's MAC address.
5. **B**. Expiring cached ARP entries after a timeout ensures that dynamic IP reassignments or hardware NIC swaps do not permanently blackhole local LAN traffic.

## References & Navigation

- **Previous Topic:** [[Link Layer]]
- **Next Topic:** [[Learning Switches (Basic)]]
- **Related Notes:** [[Internetworking]]

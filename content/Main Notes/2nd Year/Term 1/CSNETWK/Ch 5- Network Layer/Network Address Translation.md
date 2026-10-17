---
id: Network-Address-Translation
type: note
course: CSNETWK
topic:
status: completed
---

# Network Address Translation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> NAT (Network Address Translation) allows a local network to use a set of "Private" IP addresses internally while sharing a single "Public" IP addre...

## Key Concepts
 Host (Internal) Router (LAN Side) Router (WAN/Internet Side) Remote Server (Destination) Traffic Details

## Details / Theory

## 1. Concept Overview: NAT

Definition

NAT (Network Address Translation) allows a local network to use a set of "Private" IP addresses internally while sharing a single "Public" IP address for Internet communication. The router acts as an agent, replacing the internal IP with its own public IP for outgoing traffic and remembering where to send the replies.

The NAT Table

The router maintains a translation table mapping {Private IP : Private Port} to {Public IP : Public Port}. This allows it to route incoming responses back to the correct internal device.

**Scenario Data**
![[Pasted image 20251121092549.png]]
 **Host (Internal):** `10.0.1.19` (Private) **Router (LAN Side):** `10.0.1.25` **Router (WAN/Internet Side):** `135.122.202.208` (Public) **Remote Server (Destination):** `128.119.166.189` **Traffic Details:** Host `10.0.1.19` sends to `128.119.166.189`.
Source Port: `3415`
Destination Port: `80`

## 2. The Network Topology

## 3. Problem Analysis

This scenario traces a single packet leaving the network (Steps 1-2) and the response coming back (Steps 3-4).

### Step 1: Host sends to Router (Inside the LAN)

_Context: The packet has just left the computer but hasn't touched the router yet._

**1. Consider the datagram at step 1... What is the source IP address for this datagram?**
 **Analysis:** Inside the LAN, the packet acts normally. The source is the machine sending it. **Correct Answer:** **10.0.1.19**

**2. At step 1, what is the destination IP address?**
 **Analysis:** The computer wants to reach the web server. The destination IP never changes (unless the _server_ is also behind NAT, which doesn't matter here). It aims for the final target. **Correct Answer:** **128.119.166.189**

### Step 2: Router sends to Internet (WAN Side)

_Context: The router has processed the packet. It swaps the "Private" source with its own "Public" source so the return mail can find it._

**3. Now consider the datagram at step 2... What is the source IP address for this datagram?**
 **Analysis:** The router performs NAT. It replaces `10.0.1.19` with its own WAN address so the internet sees the request coming from the router. **Correct Answer:** **135.122.202.208**

**4. At step 2, what is the destination IP address for this datagram?**
 **Analysis:** The router does not touch the destination. It is still heading to the remote server. **Correct Answer:** **128.119.166.189**

**5. Will the source port have changed? Yes or No.**
 **Analysis:** Yes. To distinguish between multiple internal computers potentially using port 3415, the router assigns a new, unique source port on the WAN side (e.g., 5001) and records this in the NAT table. **Correct Answer:** **Yes**

### Step 3: Internet responds to Router (WAN Side)

_Context: The server has received the request and is sending a reply. The reply hits the router's outside interface._

**6. Now consider the datagram at step 3... What is the source IP address for this datagram?**
 **Analysis:** This is an incoming packet from the server. The sender is the server. **Correct Answer:** **128.119.166.189**

**7. At step 3, what is the destination IP address for this datagram?**
 **Analysis:** The server is replying to the IP it saw in Step 2. It sends the mail to the Router's Public IP. **Correct Answer:** **135.122.202.208**

### Step 4: Router forwards to Host (LAN Side)

_Context: The router looks up the destination port in its NAT table, finds the original internal host, swaps the IPs back, and forwards it to the LAN._

**8. Last, consider the datagram at step 4... What is the source IP address for this datagram?**
 **Analysis:** The router does not change the sender (the server). It only changes the destination to route it internally. **Correct Answer:** **128.119.166.189**

**9. At step 4, what is the destination IP address for this datagram**
 **Analysis:** The router translates the Public destination back to the Private destination (`10.0.1.19`) based on the NAT table entry. **Correct Answer:** **10.0.1.19**

## Summary of Logic (Cheat Sheet)

|             |               |                        |                        |                                        |
| ----------- | ------------- | ---------------------- | ---------------------- | -------------------------------------- |
| **Step**    | **Direction** | **Source IP**          | **Destination IP**     | **Why?**                               |
| **1 (LAN)** | Outgoing      | **Private IP** (Host)  | **Remote IP** (Server) | Host sends normally.                   |
| **2 (WAN)** | Outgoing      | **Public IP** (Router) | **Remote IP** (Server) | Router "masquerades" as the host.      |
| **3 (WAN)** | Incoming      | **Remote IP** (Server) | **Public IP** (Router) | Server replies to the Router.          |
| **4 (LAN)** | Incoming      | **Remote IP** (Server) | **Private IP** (Host)  | Router directs reply to specific host. |
 **Key Rule:** Destination IP never changes on the way OUT. Source IP never changes on the way IN.

## Common Pitfalls
 Forgetting that NAT modifies the **source IP** (private → public) on outgoing traffic and the **destination IP** (public → private) on incoming traffic. Confusing the NAT table’s port mapping — the WAN-side port is assigned by the router, not the host. Thinking destination IP changes on the way **out** — it stays as the remote server’s IP until the server responds.

## Summary

> TL;DR — NAT translates private IPs to a single public IP using port numbers. Outgoing: source IP replaced. Incoming: destination IP replaced. The NAT table maps (private IP:port) ↔ (public IP:WAN port).

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121092549.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "**Scenario Data** ![[Pasted image 20251121092549.png]]  **Host (Internal):** `10.0.1.19` (Private) **Router (LAN Side):** `10.0.1.25` **Router _____ Side):** `135.122.202.208` (Public) **Remote Server (Destination):** `128.119.166.189` **Traffic Details:** Host `10.0.1.19` sends to `128.119.166.189`."?
- **A)** Router
- **B)** Network
- **C)** WANInternet
- **D)** Protocol

2. Which word completes the following sentence from the text: "What is the source IP address for this _____  **Analysis:** Inside the LAN, the packet acts normally."?
- **A)** datagram
- **B)** Network
- **C)** Protocol
- **D)** Router

3. Which word completes the following sentence from the text: "_____ | **3 (WAN)** | Incoming      | **Remote IP** (Server) | **Public IP** (Router) | Server replies to the Router."?
- **A)** Router
- **B)** Protocol
- **C)** 
- **D)** Network

4. Which word completes the following sentence from the text: "At step 4, what is the destination IP address for this datagram**  **Analysis:** The router _____ the Public destination back to the Private destination (`10.0.1.19`) based on the NAT table entry."?
- **A)** Network
- **B)** Router
- **C)** translates
- **D)** Protocol

5. Which word completes the following sentence from the text: "The reply hits the _____ outside interface._  **6."?
- **A)** routers
- **B)** Network
- **C)** Router
- **D)** Protocol

6. Which word completes the following sentence from the text: "The NAT Table  The router maintains a translation table mapping _____ IP : Private Port} to {Public IP : Public Port}."?
- **A)** Network
- **B)** Router
- **C)** Private
- **D)** Protocol

7. Which word completes the following sentence from the text: "This allows it to route incoming _____ back to the correct internal device."?
- **A)** Network
- **B)** responses
- **C)** Protocol
- **D)** Router

8. Which word completes the following sentence from the text: "At step 2, what is the destination IP address for _____ datagram?**  **Analysis:** The router does not touch the destination."?
- **A)** Protocol
- **B)** this
- **C)** Router
- **D)** Network

9. Which word completes the following sentence from the text: "It replaces `10.0.1.19` with its own WAN address so _____ internet sees the request coming from the router."?
- **A)** Router
- **B)** Protocol
- **C)** the
- **D)** Network

10. Which word completes the following sentence from the text: "At step 1, what is the destination IP address?**  _____ The computer wants to reach the web server."?
- **A)** Analysis
- **B)** Network
- **C)** Protocol
- **D)** Router


### Answer Key & Explanations
1. **C)** WANInternet completes the sentence: **Scenario Data** ![[Pasted image 20251121092549.p...
2. **A)** datagram completes the sentence: What is the source IP address for this datagram?**...
3. **C)**  completes the sentence: | | **3 (WAN)** | Incoming      | **Remote IP** (S...
4. **C)** translates completes the sentence: At step 4, what is the destination IP address for ...
5. **A)** routers completes the sentence: The reply hits the router's outside interface._  *...
6. **C)** Private completes the sentence: The NAT Table  The router maintains a translation ...
7. **B)** responses completes the sentence: This allows it to route incoming responses back to...
8. **B)** this completes the sentence: At step 2, what is the destination IP address for ...
9. **C)** the completes the sentence: It replaces `10.0.1.19` with its own WAN address s...
10. **A)** Analysis completes the sentence: At step 1, what is the destination IP address?**  ...

## References & Navigation

- **Previous Topic:** [[Sub-net Addressing]]
- **Next Topic:** [[IPv6 Tunneling and Encapsulation]]
- **Related Notes:** [[Internetworking]], [[Security]]

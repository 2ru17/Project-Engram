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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121092549.png]] **Source / Reference:**

## Multiple Choice Questions

1. What is the primary purpose of **Network Address Translation (NAT) / NAPT (Port-Based NAT)** in IPv4 home and enterprise networks?
    - **A)** To encrypt packet payloads using AES-256.
    - **B)** To allow multiple hosts on a private LAN (using RFC 1918 private addresses such as `10.0.0.0/8`, `172.16.0.0/12`, or `192.168.0.0/16`) to share a **single public IPv4 address** on the WAN by multiplexing connections using distinct 16-bit Transport-layer port numbers.
    - **C)** To replace DNS resolution with ARP broadcasts.
    - **D)** To convert TCP segments into UDP datagrams.

2. Suppose internal host `10.0.1.19` (source port `3345`) sends an HTTP request to public web server `128.119.166.189` (port `80`) through a NAT router whose public WAN IP is `135.122.202.208`. If the NAT router assigns WAN port `5001`, how does the NAT router modify the **outgoing** packet header?
    - **A)** It changes the Destination IP to `135.122.202.208` and leaves the Source IP as `10.0.1.19`.
    - **B)** It rewrites the **Source IP and Source Port** from `(10.0.1.19, 3345)` to `(135.122.202.208, 5001)` (leaving Destination IP `128.119.166.189` and Port `80` untouched), and records `(135.122.202.208, 5001) <-> (10.0.1.19, 3345)` in its NAT translation table.
    - **C)** It encapsulates the packet inside an IPv6 header without modifying the IPv4 addresses.
    - **D)** It only changes the MAC address and leaves all IP and TCP fields unchanged.

3. In the scenario from Question 2, when the remote web server `128.119.166.189:80` sends its HTTP reply back to `(135.122.202.208, 5001)`, what transformation does the NAT router perform on the **incoming** reply packet?
    - **A)** It looks up destination `(135.122.202.208, 5001)` in its NAT translation table and rewrites the **Destination IP and Destination Port** to `(10.0.1.19, 3345)` before forwarding the packet onto the internal LAN.
    - **B)** It rewrites the Source IP from `128.119.166.189` to `10.0.1.19`.
    - **C)** It broadcasts the packet to every host on `10.0.1.0/24`.
    - **D)** It drops the packet because private IPs cannot receive replies.

4. Why must a NAT router recompute **both** the Layer-3 IPv4 header checksum **and** the Layer-4 TCP/UDP checksum whenever it translates a packet?
    - **A)** Because the payload text is modified.
    - **B)** Because the IPv4 header checksum covers the IP addresses, and the TCP/UDP checksum covers a **pseudo-header** (which includes the 32-bit Source IP and Destination IP) as well as the 16-bit TCP/UDP port numbers.
    - **C)** Because Ethernet CRC-32 is stored inside the TCP header.
    - **D)** NAT routers never recompute checksums.

5. Why do architectural purists consider NAT a **violation of strict layering and the End-to-End Principle**?
    - **A)** Because a Layer-3 network device (the router) inspects and modifies Layer-4 transport port numbers, and external hosts on the public Internet cannot initiate unsolicited inbound connections directly to an internal private host without explicit port forwarding or NAT traversal (STUN/TURN/UPnP).
    - **B)** Because NAT operates only at the Physical layer (Layer 1).
    - **C)** Because NAT requires fiber-optic cables.
    - **D)** Because NAT forces all applications to use IPv6.

### Answer Key & Explanations

1. **B**. RFC 1918 private addresses are not routable on the public Internet; NAPT maps `(Private IP, Private Port)` pairs to `(Public WAN IP, Assigned WAN Port)` so up to $\sim 65,535$ concurrent flows can share one public IPv4 address.
2. **B**. On outbound traffic, the NAT router substitutes its own public WAN IP and a unique NAT port as the new Source `(135.122.202.208, 5001)` so the remote server knows where to send the reply.
3. **A**. When the reply arrives addressed to `(135.122.202.208, 5001)`, the NAT table maps port `5001` back to internal destination `(10.0.1.19, 3345)`.
4. **B**. Modifying either an IP address or a TCP/UDP port invalidates both the IPv4 header checksum and the TCP/UDP transport checksum (which includes the IPv4 pseudo-header).
5. **A**. NAPT crosses the Layer-3/Layer-4 boundary by rewriting port numbers and breaks universal end-to-end host addressability for inbound connections.

## References & Navigation

- **Previous Topic:** [[Sub-net Addressing]]
- **Next Topic:** [[IPv6 Tunneling and Encapsulation]]
- **Related Notes:** [[Internetworking]], [[Security]]

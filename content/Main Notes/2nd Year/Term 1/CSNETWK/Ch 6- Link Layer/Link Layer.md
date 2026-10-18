---
id: link_layer
type: note
course: CSNETWK
topic: Link Layer
status: completed
---

# Link Layer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Link Layer]] #[[Conceptual]]

---

## Overview

The Link Layer is responsible for transferring a datagram from one node (host or router) to an adjacent node over a specific link (wired, wireless, LAN). A datagram is encapsulated into a layer-2 packet known as a **frame**. Because a datagram may pass through various types of links (e.g., Ethernet, WiFi), different link protocols apply and offer different services. The link layer is typically implemented in the Network Interface Card (NIC) which attaches to the host's system buses.

### Link Layer Services
1. **Framing & Link Access:** Encapsulating a datagram into a frame by adding a header and a trailer. Managing access to a shared medium.
2. **Addressing:** Uses MAC addresses in frame headers to identify the source and destination at the local level.
3. **Reliable Delivery:** Ensures frames are delivered correctly between adjacent nodes. (Often used for wireless links due to high error rates).
4. **Flow Control:** Pacing the transmission rate between adjacent sending and receiving nodes.
5. **Error Detection & Correction:** Receiver detects errors (e.g., via cyclic redundancy check, CRC) and either requests retransmission or corrects the bit errors directly.
6. **Duplexing:** Half-duplex (nodes can transmit but not at the same time) or full-duplex (simultaneous transmission).

### MAC Addresses and ARP **MAC Address:** A 48-bit flat identifier (like a Social Security Number) burned into the NIC's ROM and administered by IEEE. It uniquely identifies an interface locally on a LAN. Unlike a hierarchical IP address (like a postal address), a MAC address is portable and doesn't change when the node moves. **ARP (Address Resolution Protocol):** Translates an IP address into a MAC address. Each IP node keeps an **ARP Table** mapping IP addresses to MAC addresses with a Time To Live (TTL). If an IP isn't in the table, the node broadcasts an ARP Query frame to the special MAC address `FF-FF-FF-FF-FF-FF`, and the target node replies with its MAC address.

### Ethernet
The dominant wired LAN technology. It is simple, cheap, and capable of speeds from 10 Mbps to over 400 Gbps. **Characteristics:** Connectionless (no handshaking) and unreliable (does not send ACKs or NAKs). Errors require higher-layer recovery (like TCP). Relies on the CSMA/CD protocol. **Ethernet Frame Structure:** 
**Preamble:** 8 bytes used to synchronize clock rates (seven bytes of `10101010` and one byte of `10101011`).
**Addresses:** 6-byte source and destination MAC addresses.
**Type:** Indicates the higher-layer protocol (mostly IP) to demultiplex the payload.
**Data (Payload):** The encapsulated IP datagram.
**CRC:** Cyclic Redundancy Check for error detection.

### Ethernet Switches
Switches are active link-layer devices that store and forward Ethernet frames. **Transparent and Plug-and-Play:** Hosts are unaware of switches, and switches are self-learning (they require no manual configuration). **Multiple Simultaneous Transmissions:** A switch maintains dedicated, direct connections to hosts and buffers packets. Because each link is its own collision domain using full-duplex Ethernet, there are no collisions, and multiple hosts can transmit simultaneously (e.g., A to A' and B to B') as long as they target different destination ports.

## Important Formulas

*(No specific formulas were discussed in this module)*

## Worked Examples

**Example 1: End-to-End Delivery Across Subnets**
When Host A wants to send a datagram to Host B on a different subnet through Router R:
1. Host A encapsulates the IP datagram (Source IP: A, Dest IP: B) into a frame. The frame's destination MAC address is Router R's MAC.
2. Router R receives the frame, extracts the datagram, and checks the IP destination.
3. Router R determines the outgoing interface for B, creates a *new* link-layer frame encapsulating the same IP datagram, and sets the frame's destination MAC address to B's MAC address.
4. B receives the frame, extracts the datagram, and passes it up the protocol stack.

## Multiple Choice Questions

1. What are the core services provided by the **Data Link Layer (Layer 2)**?
    - **A)** End-to-end process-to-process congestion control and DNS resolution
    - **B)** **Framing** (encapsulating network-layer datagrams into link-layer frames), **Link Access / Medium Access Control (MAC)** (coordinating frame transmission over shared or point-to-point media), local hop-to-hop delivery via MAC addressing, and **Error Detection** (e.g., CRC).
    - **C)** Global BGP path selection across autonomous systems
    - **D)** HTML rendering and TLS certificate validation

2. Where in a host computer is the Link Layer primarily implemented?
    - **A)** primarily in hardware/firmware on the **Network Interface Card (NIC / Network Adapter)** attached to the system bus, with high-level link signaling glue in OS device drivers.
    - **B)** Entirely inside the web browser JavaScript engine
    - **C)** Inside the CPU's floating-point unit (FPU)
    - **D)** On the remote DNS server

3. In **Cyclic Redundancy Check (CRC)** error detection using a degree-$r$ generator polynomial $G$ (having $r + 1$ bits), how does the sender compute the $r$-bit CRC remainder $R$ for a data bitstring $D$, and how does the receiver verify it?
    - **A)** The sender adds $D + G$ in base 10; the receiver subtracts $G$.
    - **B)** The sender counts the number of $1$s in $D$ and appends a single parity bit.
    - **C)** The sender appends $r$ zero bits to $D$ (forming $D \cdot 2^r$) and divides by $G$ using **modulo-2 (XOR) arithmetic without carry/borrow** to get the $r$-bit remainder $R$; the sender transmits $\langle D, R \rangle$, and the receiver divides $\langle D, R \rangle$ by $G$ in modulo-2 arithmetic—if the remainder is **non-zero**, a bit error occurred.
    - **D)** The sender encrypts $D$ with $G$ using RSA.

4. Which class of Multiple Access Control (MAC) protocol do **CSMA/CD (Ethernet)** and **CSMA/CA (802.11 Wi-Fi)** belong to, and how do they differ from **Channel Partitioning (TDMA/FDMA)** and **Taking Turns (Token Passing / Polling)**?
    - **A)** They are Channel Partitioning protocols that divide bandwidth equally even when only 1 node is active.
    - **B)** They never experience collisions under any load.
    - **C)** They require a central master controller to poll every laptop in round-robin order.
    - **D)** They are **Random Access Protocols**: an active node transmits at the full channel data rate $R$ without prior slot reservation, listening to the carrier before transmitting (**Carrier Sense**); CSMA/CD detects collisions while transmitting on wired links and aborts + backs off exponentially, whereas CSMA/CA avoids collisions on wireless links (where collision detection is impractical due to hidden terminals and signal fading) using random backoff timers, ACKs, and optional RTS/CTS.

5. In Ethernet's **Binary Exponential Backoff** algorithm after a frame experiences its $m$-th consecutive collision (for $m \le 10$), from what discrete set does the NIC choose the random number of $512$-bit-time slot delays $K$ to wait before re-attempting transmission?
    - **A)** $\{0, 1\}$ for all $m$
    - **B)** $\{0, 1, 2, \dots, 2^m - 1\}$ (doubling the contention window size after each collision so the adapter adapts dynamically to the number of colliding stations)
    - **C)** $\{1, 2, \dots, m\}$
    - **D)** $\{2^m\}$ deterministically (so both colliding nodes always pick the exact same wait time and collide again)

### Answer Key & Explanations

1. **B**. Layer 2 handles single-hop node-to-adjacent-node transfer over a physical link: framing, MAC channel access, hardware addressing, and hardware CRC error detection.
2. **A**. The NIC controller chip implements framing, MAC protocol timing, and CRC calculation in dedicated hardware, interfacing with host memory via DMA and interrupts.
3. **C**. CRC treats bitstrings as polynomials over $\text{GF}(2)$ (XOR addition/subtraction); appending $R = \text{rem}(D \cdot 2^r / G)$ ensures that $D \cdot 2^r \oplus R$ is an exact multiple of $G$.
4. **D**. Random access protocols give a single active node the full channel rate $R$ and resolve contention probabilistically via Carrier Sense + Collision Detection (wired 802.3) or Collision Avoidance (wireless 802.11).
5. **B**. Sampling $K$ uniformly from $\{0, 1, \dots, 2^m - 1\}$ keeps retransmission delay tiny when contention is light ($m=1 \implies \{0, 1\}$) while rapidly spreading out transmissions when many nodes collide.

## References & Navigation

- **Previous Topic:** [[Bellman Ford Distance Vector Algorithm]]
- **Next Topic:** [[Addressing and Forwarding]]
- **Related Notes:** [[Internetworking]]

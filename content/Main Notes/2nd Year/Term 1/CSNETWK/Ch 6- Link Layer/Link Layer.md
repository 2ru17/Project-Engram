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

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Link Layer]] #[[Conceptual]]

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

1. Which word completes the following sentence from the text: "--- id: link_layer type: note course: CSNETWK topic: Link Layer status: completed ---  # Link Layer  > [!info] Document Metadata > - **Course:** `=this.course` > - **Topic:** `=this.topic` > - **Status:** `=this.status`  **🏷️ Tags:** _____ Science]] #[[CSNETWK]] #[[Link Layer]] #[[Conceptual]]  ---  ## Overview  The Link Layer is responsible for transferring a datagram from one node (host or router) to an adjacent node over a specific link (wired, wireless, LAN)."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** Computer

2. Which word completes the following sentence from the text: "**Flow Control:** Pacing the transmission rate _____ adjacent sending and receiving nodes."?
- **A)** between
- **B)** Network
- **C)** Protocol
- **D)** Router

3. Which word completes the following sentence from the text: "If an IP isn't in the table, the node broadcasts an ARP Query frame _____ the special MAC address `FF-FF-FF-FF-FF-FF`, and the target node replies with its MAC address."?
- **A)** Router
- **B)** Protocol
- **C)** to
- **D)** Network

4. Which word completes the following sentence from the text: "**Reliable Delivery:** Ensures frames are _____ correctly between adjacent nodes."?
- **A)** Router
- **B)** Protocol
- **C)** Network
- **D)** delivered

5. Which word completes the following sentence from the text: "(Often used for wireless links _____ to high error rates)."?
- **A)** due
- **B)** Protocol
- **C)** Router
- **D)** Network

6. Which word completes the following sentence from the text: "**Type:** Indicates the higher-layer protocol _____ IP) to demultiplex the payload."?
- **A)** Network
- **B)** Router
- **C)** Protocol
- **D)** mostly

7. Which word completes the following sentence from the text: "Each IP node keeps an **ARP Table** mapping IP _____ to MAC addresses with a Time To Live (TTL)."?
- **A)** addresses
- **B)** Protocol
- **C)** Network
- **D)** Router

8. Which word completes the following sentence from the text: "**Error Detection & Correction:** Receiver detects errors (e.g., via cyclic redundancy _____ CRC) and either requests retransmission or corrects the bit errors directly."?
- **A)** Protocol
- **B)** Network
- **C)** check
- **D)** Router

9. Which word completes the following sentence from the text: "The frame's destination MAC _____ is Router R's MAC."?
- **A)** Router
- **B)** Network
- **C)** address
- **D)** Protocol

10. Which word completes the following sentence from the text: "It uniquely identifies an _____ locally on a LAN."?
- **A)** interface
- **B)** Router
- **C)** Network
- **D)** Protocol


### Answer Key & Explanations
1. **D)** Computer completes the sentence: --- id: link_layer type: note course: CSNETWK topi...
2. **A)** between completes the sentence: **Flow Control:** Pacing the transmission rate bet...
3. **C)** to completes the sentence: If an IP isn't in the table, the node broadcasts a...
4. **D)** delivered completes the sentence: **Reliable Delivery:** Ensures frames are delivere...
5. **A)** due completes the sentence: (Often used for wireless links due to high error r...
6. **D)** mostly completes the sentence: **Type:** Indicates the higher-layer protocol (mos...
7. **A)** addresses completes the sentence: Each IP node keeps an **ARP Table** mapping IP add...
8. **C)** check completes the sentence: **Error Detection & Correction:** Receiver detects...
9. **C)** address completes the sentence: The frame's destination MAC address is Router R's ...
10. **A)** interface completes the sentence: It uniquely identifies an interface locally on a L...

## References & Navigation

- **Previous Topic:** [[Bellman Ford Distance Vector Algorithm]]
- **Next Topic:** [[Addressing and Forwarding]]
- **Related Notes:** [[Internetworking]]

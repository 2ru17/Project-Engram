---
id: introduction
type: note
course: CSNETWK
topic: Introduction
status: completed
---

# Introduction

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Introduction]] #[[Conceptual]]

---

## Overview

The Internet is an interconnected "network of networks" that impacts daily life. It consists of billions of connected computing devices known as **hosts** (or end systems) located at the network's "edge." The "core" is made up of **packet switches** (routers and switches) that forward chunks of data (packets) through various communication links (fiber, copper, radio, satellite) characterized by their transmission rate (bandwidth).

Network communication is strictly governed by **protocols**, which define the format, order of messages sent and received, and actions taken upon transmission or receipt. Prominent Internet protocols include HTTP, TCP, IP, WiFi, and Ethernet. Internet standards are formalized via RFCs (Requests for Comments) published by the IETF (Internet Engineering Task Force).

### Network Edge
The edge includes hosts (clients and servers, often in data centers) and access networks. **Cable-based Access:** Uses frequency division multiplexing (FDM) over a shared hybrid fiber coax (HFC) to transmit data and TV at different frequencies. Asymmetric speeds: 40 Mbps to 1.2 Gbps downstream, 30-100 Mbps upstream. **Digital Subscriber Line (DSL):** Uses existing telephone lines to connect to a DSLAM in the central office, carrying voice and data at different frequencies. Dedicated speeds: 24-52 Mbps downstream, 3.5-16 Mbps upstream. **Home and Wireless Access Networks:** Combines modems, routers, NAT, firewalls, and Wi-Fi access points. Wireless LANs (WLANs/WiFi) provide 11 to 450 Mbps locally, while cellular networks (4G/5G) cover tens of kilometers at tens of Mbps. **Enterprise and Data Center Networks:** Utilize high-speed Ethernet (100 Mbps to 10 Gbps) and Wi-Fi to interlink switches and routers, scaling up to hundreds of Gbps for inter-server connections.

### Physical Media **Guided media:** Solid transmission mediums like twisted pair copper wire (Category 5/6), coaxial cable (broadband, bidirectional), and fiber optic cables (high-speed light pulses, low error rate, immune to noise). **Unguided media:** Electromagnetic signals (wireless radio) affected by reflection, obstruction, and noise. Examples include Wi-Fi, Bluetooth, 4G/5G, terrestrial microwave, and satellite.

### Network Core
The core is a mesh of interconnected routers implementing packet switching. Hosts break application messages into smaller packets, which are forwarded hop-by-hop. **Store-and-forward:** An entire packet must be received at a router before it can begin transmission on the next link. **Queueing and Loss:** Packets queue if the arrival rate exceeds the link's transmission rate. If the router's memory (buffer) is full, packets are dropped (lost). **Forwarding vs Routing:** Forwarding (switching) is the local action of moving an arriving packet to the appropriate output link based on its header. Routing is the global action of determining the end-to-end path using routing algorithms.

### Circuit Switching
An alternative to packet switching used in traditional telephone networks. Resources (bandwidth) are allocated and reserved end-to-end for a "call," ensuring guaranteed performance without sharing. The link's capacity is divided via **Frequency Division Multiplexing (FDM)** or **Time Division Multiplexing (TDM)**. While packet switching handles bursty data efficiently with on-demand allocation, it can suffer from congestion, unlike circuit switching's reliable but less scalable dedicated reservations.

### Internet Structure
Access ISPs connect edge devices to the Internet. Connecting millions of access ISPs directly does not scale ($O(N^2)$). Instead, a hierarchical structure is used: **Tier 1 Commercial ISPs** (e.g., AT&T, Sprint) and massive **Content Provider Networks** (e.g., Google) sit at the center. **Regional ISPs** and **Internet Exchange Points (IXPs)** connect lower-tier access ISPs to the core.

## Important Formulas
 **Packet Transmission Delay:** 
  $$ d_{trans} = \frac{L}{R} $$
  Where $L$ is the packet length (in bits) and $R$ is the link transmission rate or bandwidth (in bits/sec).

## Worked Examples

**Example 1: Single-hop Packet Transmission Delay**
Given a packet size $L = 10 \text{ Kbits}$ and a link transmission rate $R = 100 \text{ Mbps}$.
Calculate the transmission delay for this single hop.
$$ d_{trans} = \frac{10 \times 10^3 \text{ bits}}{100 \times 10^6 \text{ bps}} = \frac{10,000}{100,000,000} \text{ seconds} = 0.0001 \text{ seconds} = 0.1 \text{ msec} $$

## Multiple Choice Questions

1. What term refers to the computing devices connected at the "edge" of the network?
    - **A)** Core switches
    - **B)** Packet switches
    - **C)** Hosts (or end systems)
    - **D)** Regional ISPs

2. Which organization is responsible for publishing Internet standards via Requests for Comments (RFCs)?
    - **A)** IEEE
    - **B)** W3C
    - **C)** ICANN
    - **D)** IETF

3. What type of multiplexing is used by Cable-based Access networks to transmit data and TV at different frequencies?
    - **A)** Time Division Multiplexing (TDM)
    - **B)** Frequency Division Multiplexing (FDM)
    - **C)** Code Division Multiplexing (CDM)
    - **D)** Spatial Division Multiplexing (SDM)

4. Which access network technology uses existing telephone lines to connect to a DSLAM in the central office?
    - **A)** Cable broadband
    - **B)** Digital Subscriber Line (DSL)
    - **C)** Fiber to the Home (FTTH)
    - **D)** 4G Cellular

5. What is an example of an unguided physical medium?
    - **A)** Twisted pair copper wire
    - **B)** Coaxial cable
    - **C)** Fiber optic cable
    - **D)** Electromagnetic signals (wireless radio)

6. In a packet-switched network, what happens if the packet arrival rate exceeds a router's link transmission rate and its buffer is full?
    - **A)** Packets are compressed
    - **B)** Packets are dropped (lost)
    - **C)** Packets are rerouted instantly
    - **D)** Packets are sent back to the sender

7. What is the difference between routing and forwarding in a network core?
    - **A)** Routing is a local action; forwarding is a global action
    - **B)** Routing determines the end-to-end path; forwarding moves a packet to the output link
    - **C)** Routing uses physical addresses; forwarding uses IP addresses
    - **D)** Routing is done by hosts; forwarding is done by routers

8. How does circuit switching differ from packet switching?
    - **A)** Circuit switching allocates resources on-demand without reservations
    - **B)** Circuit switching reserves resources end-to-end for a call
    - **C)** Circuit switching handles bursty data more efficiently
    - **D)** Circuit switching does not provide guaranteed performance

9. If a packet size is 10 Kbits and the link transmission rate is 100 Mbps, what is the single-hop transmission delay?
    - **A)** 1 msec
    - **B)** 0.1 msec
    - **C)** 10 msec
    - **D)** 0.01 msec

10. Why is a hierarchical structure used for the Internet rather than connecting all access ISPs directly?
    - **A)** To increase the transmission delay for security
    - **B)** Direct connections scale at O(N^2), which is not feasible
    - **C)** To prevent regional ISPs from competing with tier 1 ISPs
    - **D)** Direct connections require circuit switching

### Answer Key & Explanations
1. **C)** Hosts or end systems are located at the network's edge.
2. **D)** Internet standards are formalized via RFCs published by the IETF.
3. **B)** Cable-based access uses Frequency Division Multiplexing (FDM) to separate channels.
4. **B)** Digital Subscriber Line (DSL) uses existing telephone lines connecting to a DSLAM.
5. **D)** Electromagnetic signals (wireless radio) are unguided media, unlike solid guided cables.
6. **B)** If a router's buffer is full, newly arriving packets are dropped (lost).
7. **B)** Forwarding is the local switching of packets to an output link, whereas routing is the global determination of the path.
8. **B)** Circuit switching reserves resources end-to-end for a call, ensuring guaranteed performance without sharing.
9. **B)** d_trans = L / R = 10,000 bits / 100,000,000 bps = 0.0001 seconds = 0.1 msec.
10. **B)** Connecting millions of access ISPs directly does not scale because it requires O(N^2) connections.

## References & Navigation

- **Next Topic:** [[Layered Network Design]]
- **Related Notes:** [[Internetworking]]

---
id: layered_network_design
type: note
course: CSNETWK
topic: Layered Network Design
status: completed
---

# Layered Network Design

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Layered Network Design]] #[[Conceptual]]

---

## Overview

Network architecture relies on a structured, layered approach to reduce design complexity. A **Network Architecture** is a formal, logical structure defining how network devices interact, ensuring **interoperability**—the capability of hardware and software from different vendors to successfully communicate.

All communications are governed by **protocols**, which dictate the format, the order of messages sent and received, and the specific actions to take upon message transmission and receipt.

### OSI Architecture
The **Open Systems Interconnection (OSI)** model was developed in 1978 by the ISO to standardize network architectures and enable non-proprietary interoperability. It is comprised of 7 layers, offering clear advantages: functional isolation, simpler design, and independent technology updates without affecting other layers.

1. **Application Layer (Layer 7):** Interfaces with end-user applications. Defines specific user-oriented services (e.g., HTTP for web, SMTP for email).
2. **Presentation Layer (Layer 6):** Translates, formats, encrypts, and compresses data. It concerns itself with syntax and semantics (e.g., ASCII conversion).
3. **Session Layer (Layer 5):** Manages communication sessions between nodes. Enforces rules of dialog (e.g., half-duplex vs. full-duplex), synchronizes data flow, and handles connection recovery.
4. **Transport Layer (Layer 4):** Ensures error-free and complete delivery of data end-to-end. Partitions data into smaller packets if necessary (e.g., TCP, UDP).
5. **Network Layer (Layer 3):** Handles end-to-end routing and switching between heterogeneous networks using logical addressing (e.g., IP).
6. **Data Link Layer (Layer 2):** Transfers data across a physical link, handling error detection, framing, and flow control. Resolves damaged, lost, or duplicate frames (e.g., Ethernet).
7. **Physical Layer (Layer 1):** Transmits raw bit streams over a physical medium, translating bits into signals over wires, connectors, etc.

*Layers 7-5 are Software/Application-oriented. Layer 4 handles Delivery. Layers 3-1 are Hardware/Network-oriented.*

### TCP/IP Suite
The TCP/IP model is a 4-layer architecture developed by the US Department of Defense. 
1. **Application Layer:** Equivalent to OSI Layers 5, 6, and 7. Interfaces with applications.
2. **Transport Layer:** Equivalent to OSI Layer 4. Features two distinct protocols:
**TCP (Transmission Control Protocol):** Connection-oriented, provides reliable, error-checked, ordered data transmission. Retransmits missing data and prevents duplicates. Used in Telnet, FTP, SMTP.
**UDP (User Datagram Protocol):** Connectionless, provides unreliable datagram service. Does not guarantee delivery, order, or check for duplicates. Used in DNS, TFTP.
3. **Internet Layer:** Equivalent to OSI Layer 3. Routes user messages across networks utilizing metrics and IP addresses to locate hosts.
4. **Network Interface Layer:** Equivalent to OSI Layers 1 and 2. Connects the host to the local hardware/physical medium.

### Encapsulation and Decapsulation
**Encapsulation** involves packaging data with protocol information as it passes down through the layers. This generic packaged data is called a **Protocol Data Unit (PDU)**. Protocol information consists of headers (address info) and trailers (error control).
**Application Layer:** Creates the core data/message ($M$).
**Transport Layer:** Encapsulates the message with a transport header ($H_t$) to create a **Segment**.
**Network Layer:** Encapsulates the segment with a network header ($H_n$) to create a **Datagram**.
**Data Link Layer:** Encapsulates the datagram with a link header ($H_l$) (and potentially a trailer) to create a **Frame**.

Decapsulation occurs at the destination, stripping the respective headers layer by layer as data moves upward.

## Important Formulas

*(No specific formulas were discussed in this module)*

## Worked Examples

*(No quantitative worked examples were provided in this module)*

## Multiple Choice Questions

1. In the 5-layer Internet protocol stack, what is the correct top-to-bottom order of layers and their corresponding Protocol Data Units (PDUs)?
    - **A)** Application (Message) $\to$ Transport (Segment) $\to$ Network (Datagram) $\to$ Link (Frame) $\to$ Physical (Bit)
    - **B)** Application (Frame) $\to$ Network (Segment) $\to$ Transport (Datagram) $\to$ Link (Bit) $\to$ Physical (Message)
    - **C)** Physical (Bit) $\to$ Network (Frame) $\to$ Link (Datagram) $\to$ Transport (Segment) $\to$ Application (Message)
    - **D)** Application (Packet) $\to$ Session (Frame) $\to$ Transport (Bit) $\to$ Network (Segment) $\to$ Physical (Message)

2. What happens during **encapsulation** as data travels down the protocol stack at the sending host?
    - **A)** Each layer strips off the header from the layer above before transmitting.
    - **B)** Each layer takes the PDU from the layer above as its payload and prepends its own layer-specific header (and trailer at the Link layer) to form a new PDU.
    - **C)** The Physical layer encrypts the Application message directly without Transport or Network headers.
    - **D)** Routers add new Transport layer headers at every hop.

3. According to the **End-to-End Principle** and standard Internet layering, which layers are processed by an intermediate **Layer-3 core router** versus a **Layer-2 link-layer switch**?
    - **A)** Both routers and switches process all 5 layers up to the Application layer.
    - **B)** A Layer-2 switch processes up to Layer 2 (Physical + Link), whereas a Layer-3 router processes up to Layer 3 (Physical + Link + Network); neither processes Transport (Layer 4) or Application (Layer 5) headers in the normal data plane.
    - **C)** A Layer-2 switch processes Layer 3 IP addresses, whereas a Layer-3 router only processes MAC addresses.
    - **D)** Routers only process the Physical layer.

4. Which two layers exist in the **7-layer ISO/OSI Reference Model** but are omitted as separate layers in the **5-layer Internet (TCP/IP) stack** (their functions being absorbed into the Application layer if needed)?
    - **A)** Network and Data Link layers
    - **B)** Transport and Physical layers
    - **C)** Presentation and Session layers
    - **D)**Subnetwork and Convergence layers

5. What is the primary architectural advantage of organizing network protocols into modular **layers**?
    - **A)** It eliminates all propagation delay on physical links.
    - **B)** It enforces separation of concerns: the internal implementation of one layer (e.g., swapping Wi-Fi for Fiber at Layer 1/2) can be changed without modifying the higher layers (Network, Transport, Application), as long as the service interface between adjacent layers remains unchanged.
    - **C)** It reduces total packet size by removing all headers.
    - **D)** It allows every layer to directly modify the internal state of non-adjacent layers.

### Answer Key & Explanations

1. **A**. From top to bottom, the 5-layer Internet stack consists of Application (Message), Transport (Segment/User Datagram), Network (IP Datagram), Link (Frame), and Physical (Bits on the wire).
2. **B**. Encapsulation wraps the upper-layer PDU as payload and attaches the current layer's control header (e.g., $H_T$ at Layer 4, $H_N$ at Layer 3, $H_L$ at Layer 2).
3. **B**. Link-layer switches forward frames using Layer-2 MAC headers (Layers 1–2); routers decapsulate frames to inspect Layer-3 IP headers (Layers 1–3); Layers 4 and 5 run end-to-end on the source and destination hosts.
4. **C**. The 7-layer OSI model includes Session (Layer 5) and Presentation (Layer 6) between Transport and Application; in TCP/IP, session management and data encoding/TLS are handled within the Application layer.
5. **B**. Layering provides clean abstraction boundaries and modularity so hardware or protocol upgrades at one layer do not break the rest of the protocol stack.

## References & Navigation

- **Previous Topic:** [[Introduction]]
- **Next Topic:** [[Applications]]
- **Related Notes:** [[Internetworking]], [[Security]]

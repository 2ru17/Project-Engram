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

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Layered Network Design]] #[[Conceptual]]

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

1. Which word completes the following sentence from the text: "Defines specific user-oriented services (e.g., _____ for web, SMTP for email)."?
- **A)** HTTP
- **B)** Protocol
- **C)** Router
- **D)** Network

2. Which word completes the following sentence from the text: "**Network Layer (Layer 3):** Handles end-to-end routing and _____ between heterogeneous networks using logical addressing (e.g., IP)."?
- **A)** Router
- **B)** switching
- **C)** Network
- **D)** Protocol

3. Which word completes the following sentence from the text: "**Physical Layer (Layer 1):** Transmits raw bit streams over a _____ medium, translating bits into signals over wires, connectors, etc."?
- **A)** Protocol
- **B)** Router
- **C)** Network
- **D)** physical

4. Which word completes the following sentence from the text: "**Application Layer (Layer 7):** _____ with end-user applications."?
- **A)** Router
- **B)** Protocol
- **C)** Network
- **D)** Interfaces

5. Which word completes the following sentence from the text: "**Data Link Layer (Layer 2):** Transfers data across a _____ link, handling error detection, framing, and flow control."?
- **A)** Protocol
- **B)** physical
- **C)** Network
- **D)** Router

6. Which word completes the following sentence from the text: "It is comprised of 7 layers, offering clear advantages: functional _____ simpler design, and independent technology updates without affecting other layers."?
- **A)** Router
- **B)** Protocol
- **C)** isolation
- **D)** Network

7. Which word completes the following sentence from the text: "**Network Layer:** Encapsulates the segment with a _____ header ($H_n$) to create a **Datagram**."?
- **A)** Router
- **B)** Network
- **C)** network
- **D)** Protocol

8. Which word completes the following sentence from the text: "**Transport Layer (Layer 4):** Ensures error-free _____ complete delivery of data end-to-end."?
- **A)** Network
- **B)** Router
- **C)** and
- **D)** Protocol

9. Which word completes the following sentence from the text: "Decapsulation occurs at the destination, stripping the respective _____ layer by layer as data moves upward."?
- **A)** Router
- **B)** headers
- **C)** Network
- **D)** Protocol

10. Which word completes the following sentence from the text: "**Application Layer:** Creates _____ core data/message ($M$)."?
- **A)** Router
- **B)** Network
- **C)** the
- **D)** Protocol


### Answer Key & Explanations
1. **A)** HTTP completes the sentence: Defines specific user-oriented services (e.g., HTT...
2. **B)** switching completes the sentence: **Network Layer (Layer 3):** Handles end-to-end ro...
3. **D)** physical completes the sentence: **Physical Layer (Layer 1):** Transmits raw bit st...
4. **D)** Interfaces completes the sentence: **Application Layer (Layer 7):** Interfaces with e...
5. **B)** physical completes the sentence: **Data Link Layer (Layer 2):** Transfers data acro...
6. **C)** isolation completes the sentence: It is comprised of 7 layers, offering clear advant...
7. **C)** network completes the sentence: **Network Layer:** Encapsulates the segment with a...
8. **C)** and completes the sentence: **Transport Layer (Layer 4):** Ensures error-free ...
9. **B)** headers completes the sentence: Decapsulation occurs at the destination, stripping...
10. **C)** the completes the sentence: **Application Layer:** Creates the core data/messa...

## References & Navigation

- **Previous Topic:** [[Introduction]]
- **Next Topic:** [[Applications]]
- **Related Notes:** [[Internetworking]], [[Security]]

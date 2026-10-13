---
id: applications
type: note
course: CSNETWK
topic: Applications
status: completed
---

# Applications

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Applications]] #[[Code Snippets]]

---

## Overview

The Application Layer is the top layer where network applications and their application-layer protocols reside. The development of network applications focuses on end systems without writing code for the network core, taking advantage of rapid application development.

### Network Paradigms **Client-Server Architecture:** A server is an always-on host with a permanent IP address that waits to be contacted, often scaled via data centers. Clients intermittently connect to the server and do not directly communicate with each other (e.g., HTTP, IMAP, FTP). **Peer-to-Peer (P2P) Architecture:** There is no always-on server. Arbitrary end systems directly communicate, bringing self-scalability since each peer adds service capacity and demand. Examples include BitTorrent.

### Inter-process Communication and Sockets
Processes (programs running on a host) communicate across different hosts via messages. They send and receive messages through **sockets**—the interface (or "door") between the application layer and transport layer. Processes are identified using a combination of the host's 32-bit IP address and a port number (e.g., Port 80 for an HTTP server, Port 25 for a mail server).

### Application-Layer Protocols
Protocols define the types of messages exchanged (request/response), syntax (fields and their delimiters), semantics (meaning of the fields), and rules for how processes respond. **Open protocols:** Defined in RFCs for interoperability (HTTP, SMTP). **Proprietary protocols:** Closed definitions (Skype, Zoom).

### Transport Services Required by Applications
Applications vary in their transport requirements: **Data Integrity:** Some require 100% reliable transfer (file transfers, web), others are loss-tolerant (audio). **Timing:** Some require low delay (Internet telephony, interactive games). **Throughput:** Some need a minimum bandwidth (multimedia), others are "elastic" and use what is available. **Security:** Needs for encryption and data integrity.

TCP provides reliable, in-order delivery, flow control, and congestion control. UDP provides unreliable, best-effort datagram delivery with no connection setup.

### The Web and HTTP **HTTP (Hypertext Transfer Protocol):** The Web's application-layer protocol, based on a client/server model. It is a **stateless** protocol meaning it maintains no information about past client requests. It typically uses TCP on port 80. **HTTP Connections:** 
*Non-persistent:* Opens a new TCP connection for each object.
*Persistent:* Multiple objects sent over a single TCP connection. **HTTP Requests:** Includes methods like GET (requests object), POST (sends user input), HEAD (requests headers only), PUT (uploads object). **HTTP Responses:** Includes status codes (e.g., `200 OK`, `301 Moved Permanently`, `400 Bad Request`, `404 Not Found`, `505 Version Not Supported`). **Cookies:** Used by sites to maintain state. Components include cookie headers in HTTP messages, a local cookie file on the client, and a back-end database on the server. **Web Caches (Proxy Servers):** Intermediaries that store recently requested objects to satisfy client requests locally. This reduces response time and traffic on the institution's access link. A `Conditional GET` (using `If-modified-since`) helps keep caches up to date. **HTTP/2 & HTTP/3:** HTTP/2 mitigates head-of-line (HOL) blocking by dividing objects into frames and interleaving them. HTTP/3 moves transport to UDP to prevent TCP loss recovery from stalling all object transmissions and adds integrated security.

### E-mail and DNS **E-mail components:** User agents (readers), mail servers (mailbox and outgoing queue), and **SMTP** (Simple Mail Transfer Protocol, used between mail servers to send messages). **DNS (Domain Name System):** A distributed, hierarchical database mapping human-readable hostnames to IP addresses. It consists of root DNS servers, Top-Level Domain (TLD) servers (like .com, .edu), and authoritative servers. Queries can be iterated or recursive. DNS aggressively uses caching (with a TTL) to improve response times.

## Important Formulas

*(No specific formulas were discussed in this module)*

## Worked Examples

**Example 1: Web Cache Delay Analysis**
Given an access link rate of 1.54 Mbps, average object size of 100K bits, and a request rate of 15 requests/sec.
*Without cache:*
Data rate to browsers = $15 \times 100 \text{ Kbits/sec} = 1.5 \text{ Mbps}$.
Access link utilization = $1.5 / 1.54 = 0.97$ (97%), leading to high queueing delays (minutes).
*With cache (40% hit rate):*
The request rate going to the origin server drops to 60%.
Data rate on access link = $0.6 \times 1.5 \text{ Mbps} = 0.9 \text{ Mbps}$.
Access link utilization = $0.9 / 1.54 = 0.58$ (58%). Delay drops to milliseconds.
Average end-to-end delay = $0.6 \times (\text{origin delay}) + 0.4 \times (\text{cache delay})$.

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "**HTTP Responses:** Includes status codes (e.g., `200 OK`, `301 Moved _____ `400 Bad Request`, `404 Not Found`, `505 Version Not Supported`)."?
    - **A)** Router
    - **B)** Protocol
    - **C)** Network
    - **D)** Permanently

2. Which word completes the following sentence from the text: "A `Conditional GET` (using `If-modified-since`) _____ keep caches up to date."?
    - **A)** Router
    - **B)** helps
    - **C)** Network
    - **D)** Protocol

3. Which word completes the following sentence from the text: "UDP provides unreliable, best-effort datagram _____ with no connection setup."?
    - **A)** Protocol
    - **B)** Network
    - **C)** delivery
    - **D)** Router

4. Which word completes the following sentence from the text: "**Proprietary protocols:** Closed _____ (Skype, Zoom)."?
    - **A)** Network
    - **B)** Router
    - **C)** Protocol
    - **D)** definitions

5. Which word completes the following sentence from the text: "Arbitrary end systems directly communicate, bringing self-scalability _____ each peer adds service capacity and demand."?
    - **A)** Network
    - **B)** Protocol
    - **C)** since
    - **D)** Router

6. Which word completes the following sentence from the text: "*With cache (40% hit rate):* The request rate _____ to the origin server drops to 60%."?
    - **A)** Protocol
    - **B)** Router
    - **C)** going
    - **D)** Network

7. Which word completes the following sentence from the text: "**Web Caches (Proxy Servers):** Intermediaries that store _____ requested objects to satisfy client requests locally."?
    - **A)** Router
    - **B)** Protocol
    - **C)** Network
    - **D)** recently

8. Which word completes the following sentence from the text: "**DNS (Domain Name System):** A distributed, hierarchical _____ mapping human-readable hostnames to IP addresses."?
    - **A)** Network
    - **B)** Protocol
    - **C)** Router
    - **D)** database

9. Which word completes the following sentence from the text: "Clients intermittently connect to the server and do not _____ communicate with each other (e.g., HTTP, IMAP, FTP)."?
    - **A)** Protocol
    - **B)** Network
    - **C)** directly
    - **D)** Router

10. Which word completes the following sentence from the text: "**HTTP Requests:** Includes methods like GET (requests object), POST _____ user input), HEAD (requests headers only), PUT (uploads object)."?
    - **A)** Protocol
    - **B)** sends
    - **C)** Network
    - **D)** Router


### Answer Key & Explanations
1. **D)** Permanently completes the sentence: **HTTP Responses:** Includes status codes (e.g., `...
2. **B)** helps completes the sentence: A `Conditional GET` (using `If-modified-since`) he...
3. **C)** delivery completes the sentence: UDP provides unreliable, best-effort datagram deli...
4. **D)** definitions completes the sentence: **Proprietary protocols:** Closed definitions (Sky...
5. **C)** since completes the sentence: Arbitrary end systems directly communicate, bringi...
6. **C)** going completes the sentence: *With cache (40% hit rate):* The request rate goin...
7. **D)** recently completes the sentence: **Web Caches (Proxy Servers):** Intermediaries tha...
8. **D)** database completes the sentence: **DNS (Domain Name System):** A distributed, hiera...
9. **C)** directly completes the sentence: Clients intermittently connect to the server and d...
10. **B)** sends completes the sentence: **HTTP Requests:** Includes methods like GET (requ...

## References & Navigation

- **Previous Topic:** [[Layered Network Design]]
- **Next Topic:** [[Transport Layer]]
- **Related Notes:** [[Internetworking]]

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

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Applications]] #[[Code Snippets]]

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

1. In the **Client-Server** vs. **Peer-to-Peer (P2P)** application architectures, how does the minimum distribution time to deliver a file of size $F$ to $N$ peers scale as $N$ grows large?
    - **A)** Client-Server scales as $O(1)$ while P2P scales as $O(N^2)$.
    - **B)** In Client-Server, the server must upload $N$ copies sequentially over its uplink $u_s$, so distribution time grows **linearly** with $N$ ($\ge \frac{NF}{u_s}$); in P2P, each downloading peer also contributes its own upload bandwidth $u_i$, enabling **self-scalability** where distribution time remains bounded even as $N$ grows.
    - **C)** Both architectures require exact $NF / u_s$ time regardless of peer upload rates.
    - **D)** P2P requires a dedicated always-on supercomputer to relay every byte of the file.

2. How many Round-Trip Times (RTTs) are required to fetch a base HTML page plus $10$ referenced JPEG objects over **Non-Persistent HTTP/1.0** (without parallel connections) versus **Persistent HTTP/1.1 with pipelining**?
    - **A)** Non-Persistent HTTP requires $2\text{ RTTs per object}$ ($1$ RTT for TCP 3-way handshake $+ 1$ RTT for HTTP request/response), totaling $2 \times 11 = 22\text{ RTTs}$; Persistent HTTP with pipelining reuses a single TCP connection ($1$ RTT handshake $+ 1$ RTT base HTML $+ 1$ RTT for all $10$ pipelined objects) totaling $3\text{ RTTs}$.
    - **B)** Non-Persistent requires $1$ RTT total; Persistent requires $22$ RTTs.
    - **C)** Both require $11$ RTTs.
    - **D)** Non-Persistent HTTP uses UDP and requires $0$ RTTs.

3. In the **Domain Name System (DNS)** hierarchy, what is the difference between a **recursive query** and an **iterative query**?
    - **A)** A recursive query uses TCP port 80, whereas an iterative query uses UDP port 25.
    - **B)** Iterative queries encrypt the domain name, whereas recursive queries do not.
    - **C)** In a recursive query (typically sent from a host to its local DNS resolver), the contacted server takes full responsibility for resolving the name on behalf of the requester; in an iterative query (typically used by the local resolver querying Root, TLD, and Authoritative servers), each contacted server replies with a referral to the next server to contact.
    - **D)** Recursive queries only resolve IPv6 `AAAA` records.

4. Which DNS Resource Record (RR) type maps a hostname alias (e.g., `www.example.com`) to its canonical hostname, and which RR type maps a domain to the hostname of its mail server?
    - **A)** `A` record for alias; `PTR` record for mail server
    - **B)** `TXT` record for alias; `SOA` record for mail server
    - **C)** `NS` record for alias; `AAAA` record for mail server
    - **D)** `CNAME` record for canonical name alias; `MX` record for mail exchange server

5. Why does **FTP (File Transfer Protocol)** described as maintaining an **out-of-band** control connection, whereas **HTTP** sends control information **in-band**?
    - **A)** FTP uses UDP for files and ICMP for control.
    - **B)** FTP uses a persistent TCP control connection on **port 21** for commands/replies and opens a separate TCP data connection on **port 20** for file transfers; HTTP sends headers and file payloads within the **same** TCP connection on port 80/443.
    - **C)** HTTP uses two separate ports (80 and 81) for every image.
    - **D)** Out-of-band means FTP cannot traverse routers.

### Answer Key & Explanations

1. **B**. In Client-Server, $D_{cs} = \max\left(\frac{NF}{u_s}, \frac{F}{d_{\min}}\right)$ grows linearly in $N$; in P2P, $D_{p2p} = \max\left(\frac{F}{u_s}, \frac{F}{d_{\min}}, \frac{NF}{u_s + \sum_{i=1}^N u_i}\right)$ self-scales because aggregate upload capacity $\sum u_i$ grows with $N$.
2. **A**. Non-Persistent HTTP tears down and re-establishes TCP for every object ($2\text{ RTTs/object} \times 11 = 22\text{ RTTs}$). Persistent pipelined HTTP/1.1 keeps TCP open ($1$ RTT handshake $+ 1$ RTT HTML $+ 1$ RTT pipelined assets $= 3\text{ RTTs}$).
3. **C**. Hosts normally issue a single recursive query to their local DNS resolver, which then performs iterative queries across the Root $\to$ TLD $\to$ Authoritative hierarchy.
4. **D**. `CNAME` maps an alias hostname to its canonical domain name; `MX` specifies the mail server responsible for accepting email for a domain.
5. **B**. FTP separates control signaling (TCP port 21) from data transfer (TCP port 20, "out-of-band"), whereas HTTP interleaves control headers and body payload on the same TCP stream ("in-band").

## References & Navigation

- **Previous Topic:** [[Layered Network Design]]
- **Next Topic:** [[Transport Layer]]
- **Related Notes:** [[Internetworking]]

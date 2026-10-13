---
id: p2p_architecture_and_bittorrent
type: note
course: NSCOM01
topic: "P2P Architecture and BitTorrent"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSCOM01]] #[[Conceptual]] #[[P2P]] #[[BitTorrent]]

---

## Overview
Unlike traditional client-server architectures that rely on always-on central servers, Peer-to-Peer (P2P) architectures distribute the workload among the end systems (peers). This paradigm provides incredible self-scalability because every new peer joining the network adds not only demand but also service capacity (upload bandwidth). BitTorrent is a prominent protocol that leverages P2P for efficient, large-scale file distribution.

## Key Definitions
- **Peer-to-Peer (P2P):** A decentralized network architecture where end systems communicate directly without passing through a central server.
- **Torrent:** A group of peers participating in the exchange of chunks of a specific file.
- **Tracker:** A centralized server in BitTorrent that keeps track of the peers currently active in a torrent.
- **Tit-for-Tat:** A BitTorrent algorithm where a peer uploads only to the peers that are uploading to them at the highest rates.

## Theoretical Framework / Core Concepts

### Distribution Time Comparison
The primary advantage of P2P is distribution time scaling. Let $F$ be the file size, $N$ the number of peers, $u_s$ the server upload speed, $u_i$ the upload speed of peer $i$, and $d_{min}$ the minimum download speed among peers.

**Client-Server Distribution:**
The server must sequentially upload a full copy of the file to every client. The distribution time grows linearly with the number of clients:
$$D_{c-s} \ge \max\left\{ \frac{N \cdot F}{u_s}, \frac{F}{d_{min}} \right\}$$

**P2P Distribution:**
In P2P, clients help the server distribute the file. As $N$ increases, the total available upload capacity $(u_s + \sum u_i)$ increases, drastically reducing the distribution time:
$$D_{P2P} \ge \max\left\{ \frac{F}{u_s}, \frac{F}{d_{min}}, \frac{N \cdot F}{u_s + \sum u_i} \right\}$$

### BitTorrent Operation
1. **Chunking:** Files are divided into smaller, fixed-size chunks (typically 256 Kb).
2. **Joining a Torrent:** A peer contacts the **Tracker** to get a list of active peers in the torrent, then forms direct TCP connections with a subset of them (neighbors).
3. **Rarest First Strategy:** To ensure all chunks remain available even if the original seeder leaves, peers ask neighbors for their chunk lists and specifically request the chunks that are the rarest (least available) in the local network first.
4. **Incentive Mechanism (Tit-for-Tat):**
   - A peer continuously evaluates the download rates from its neighbors (every 10 seconds).
   - It sends (unchokes) chunks only to the top 4 peers that are currently providing data to it at the highest rate.
5. **Optimistic Unchoking:** 
   - Every 30 seconds, a peer randomly selects one additional neighbor to send chunks to, regardless of their download rate.
   - This probes the network for potentially better trading partners and allows new peers (who have nothing to trade yet) to get their first chunks.

## Summary & Key Takeaways
- P2P architecture is inherently self-scaling; new peers bring additional upload capacity.
- Compared to Client-Server, P2P significantly reduces the time required to distribute large files to many users.
- BitTorrent maximizes efficiency and file longevity using the Rarest First strategy.
- BitTorrent enforces cooperation and prevents "leeching" via the Tit-for-Tat incentive mechanism, while allowing new peers to join via Optimistic Unchoking.

## Multiple Choice Questions
1. What is a defining characteristic of a P2P architecture?
    - **A)** It requires an always-on central database server.
    - **B)** End systems communicate directly with each other.
    - **C)** All traffic must route through a Proxy server.
    - **D)** Upload capacity remains constant regardless of the number of users.

2. Why is P2P considered "self-scaling"?
    - **A)** Because the central server automatically upgrades its CPU.
    - **B)** Because new peers bring both service demands and new service capacity (upload bandwidth).
    - **C)** Because it uses UDP instead of TCP.
    - **D)** Because files are never larger than 256 Kb.

3. In a Client-Server model, as the number of clients ($N$) increases, the distribution time:
    - **A)** Decreases exponentially
    - **B)** Remains constant
    - **C)** Increases linearly
    - **D)** Drops to zero

4. In BitTorrent, what is a "Torrent"?
    - **A)** A single file being downloaded
    - **B)** The central server that stores the files
    - **C)** The group of peers exchanging chunks of a file
    - **D)** The algorithm used to sort files

5. What is the role of a Tracker in BitTorrent?
    - **A)** It stores and uploads the file chunks to peers.
    - **B)** It monitors network bandwidth for the ISP.
    - **C)** It keeps track of the IP addresses of peers participating in the torrent.
    - **D)** It encrypts the chunks before transmission.

6. What size are BitTorrent chunks typically?
    - **A)** 64 bytes
    - **B)** 160 bytes
    - **C)** 256 Kb
    - **D)** 1 Mb

7. Which strategy ensures that the most scarce pieces of a file are duplicated quickly across the network?
    - **A)** Tit-for-Tat
    - **B)** Optimistic Unchoking
    - **C)** Rarest First
    - **D)** Round-Robin

8. What is the primary purpose of the Tit-for-Tat mechanism in BitTorrent?
    - **A)** To encrypt data streams
    - **B)** To reward peers that upload at high rates and penalize leechers
    - **C)** To synchronize audio and video playout
    - **D)** To locate the nearest Tracker

9. How often does a BitTorrent peer re-evaluate its top 4 trading partners under the Tit-for-Tat rule?
    - **A)** Every 1 second
    - **B)** Every 10 seconds
    - **C)** Every 30 seconds
    - **D)** Every hour

10. What mechanism allows a brand-new peer, who has no chunks to trade, to receive their first chunk?
    - **A)** Rarest First
    - **B)** Tracker Handshake
    - **C)** Optimistic Unchoking
    - **D)** Registrar Server

### Answer Key & Explanations
1. **B** - P2P is decentralized; peers connect directly.
2. **B** - Every peer that joins adds their own upload bandwidth to the total capacity of the network.
3. **C** - The server must send an entire copy to each client sequentially.
4. **C** - A torrent refers to the swarm of peers collaborating to share a specific file.
5. **C** - The tracker is merely a directory service; it does not host the files itself.
6. **C** - Files are divided into 256 Kb chunks for efficient distribution.
7. **C** - Requesting the rarest chunks first ensures that no single point of failure (like the original seeder leaving) will result in an incomplete file in the swarm.
8. **B** - It is an incentive mechanism; you only get fast downloads if you provide fast uploads.
9. **B** - Trading partners are evaluated every 10 seconds to dynamically adapt to network conditions.
10. **C** - By randomly sending data to a peer every 30 seconds, optimistic unchoking probes for better partners and kickstarts new peers.

## References & Navigation

- **Previous Topic:** [[Session Initiation Protocol]]
- **Next Topic:** [[Skype and P2P Voice Architecture]]
- **Related Notes:** [[Applications]]

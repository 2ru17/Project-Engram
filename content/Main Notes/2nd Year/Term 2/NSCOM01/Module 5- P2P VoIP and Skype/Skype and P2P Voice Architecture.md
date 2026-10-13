---
id: skype_and_p2p_voice_architecture
type: note
course: NSCOM01
topic: "Skype and P2P Voice Architecture"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSCOM01]] #[[Conceptual]] #[[Skype]] #[[P2P]] #[[VoIP]]

---

## Overview
While standard VoIP protocols like SIP rely on centralized proxy and registrar servers, early Skype pioneered a hybrid approach. Skype utilized a proprietary architecture that combined a centralized login server for authentication with a massive Peer-to-Peer (P2P) overlay network for user discovery, routing, and voice traffic, bypassing traditional server bottlenecks and ingeniously solving Network Address Translation (NAT) traversal issues.

## Key Definitions
- **Supernode (SN):** A highly capable Skype peer (fast connection, public IP) that acts as a directory and routing hub for ordinary nodes.
- **NAT Traversal:** Techniques used to establish connections between devices that are hidden behind Network Address Translation routers.
- **Overlay Network:** A logical network built on top of another network (the physical Internet), composed of Supernodes in the Skype architecture.

## Theoretical Framework / Core Concepts

### Skype's Hybrid Architecture
Skype was distinct from standard SIP setups because it did not use centralized SIP proxies for call routing.
1. **Centralized Authentication:** A central login server verifies user credentials (usernames and passwords) ensuring security and identity verification.
2. **P2P Overlay:** User discovery, connection routing, and the actual media transport are handled via a P2P network consisting of ordinary peers and Supernodes.

### Supernodes
Not all peers are equal in the Skype network. 
- Regular peers connect to a **Supernode**.
- Supernodes are peers that have high bandwidth, no NAT restrictions (public IP), and good uptime.
- Supernodes form an overlay network among themselves to track the IP addresses of logged-in users and facilitate call setups.

### NAT Traversal (Peers as Relays)
One of the major challenges of P2P VoIP is NAT. If both Alice and Bob are on home networks behind NAT routers, neither can accept an inbound connection directly from the other.

**Skype's Solution:**
1. **Outbound Connections:** When Alice and Bob turn on Skype, their clients establish an *outbound* connection to their assigned Supernodes. NAT routers allow outbound connections and keep the return path open.
2. **Call Setup:** When Alice calls Bob, her Supernode communicates with Bob's Supernode across the overlay network.
3. **Relay Routing:** Since Bob cannot receive a direct inbound connection from Alice, Bob's Supernode routes the incoming call data down the pre-existing, open outbound connection that Bob established earlier. 
4. **Result:** The Supernodes act as traffic relays. The media streams from Alice $\rightarrow$ Alice's SN $\rightarrow$ Bob's SN $\rightarrow$ Bob.

## Summary & Key Takeaways
- Skype utilizes a hybrid architecture: centralized for authentication, decentralized P2P for user discovery and media routing.
- Supernodes are elevated peers that form an overlay network to handle routing duties.
- To bypass NAT restrictions, Skype leverages Supernodes as traffic relays, routing inbound calls through pre-established outbound connections.

## Multiple Choice Questions
1. What type of architecture did the classic Skype network utilize?
    - **A)** Pure Client-Server
    - **B)** Pure Peer-to-Peer
    - **C)** Hybrid (Centralized Authentication + P2P Routing)
    - **D)** Ring Topology

2. What function in Skype was strictly centralized?
    - **A)** User discovery
    - **B)** Voice traffic routing
    - **C)** NAT traversal
    - **D)** User login and authentication

3. In the Skype network, what is a Supernode?
    - **A)** A centralized database server owned by Microsoft
    - **B)** A highly capable user peer that helps track users and route connections
    - **C)** A proxy server used exclusively for SIP traffic
    - **D)** A router used by ISPs to limit P2P traffic

4. Why are ordinary peers often unable to form direct connections with each other?
    - **A)** Because they use UDP instead of TCP.
    - **B)** Because their ISPs block all VoIP traffic.
    - **C)** Because they are hidden behind NAT routers that block inbound connections.
    - **D)** Because their CPUs are too slow for encryption.

5. How does a regular Skype peer interact with a Supernode when first launching the app?
    - **A)** It sends a SIP INVITE to the Supernode.
    - **B)** It establishes an open outbound connection to the Supernode.
    - **C)** It downloads the entire Supernode database via BitTorrent.
    - **D)** It waits for the Supernode to initiate an inbound connection.

6. If Alice and Bob are both behind NATs, how does Alice's voice traffic reach Bob in Skype's P2P model?
    - **A)** It routes directly from Alice's router to Bob's router.
    - **B)** It routes through a central SIP proxy server.
    - **C)** It is relayed through Alice's Supernode and Bob's Supernode.
    - **D)** It is broadcasted to the entire P2P network until it finds Bob.

7. What characteristic is required for a peer to become a Supernode?
    - **A)** Must be behind a strict NAT firewall
    - **B)** Must have a public IP address and high bandwidth
    - **C)** Must only use the network for text chatting
    - **D)** Must be a dedicated hardware appliance

8. Skype's use of Supernodes to relay traffic is a solution to which networking problem?
    - **A)** Delay Jitter
    - **B)** Packet Loss Concealment
    - **C)** NAT Traversal
    - **D)** Playout Buffering

9. What is an overlay network in the context of Skype?
    - **A)** The physical Ethernet cables connecting routers
    - **B)** A logical network of Supernodes built on top of the physical Internet
    - **C)** The graphical user interface overlaying the screen
    - **D)** The application layer header added to UDP packets

10. Which protocol is Skype's P2P architecture most often contrasted with regarding VoIP call routing?
    - **A)** BitTorrent
    - **B)** SIP
    - **C)** HTTP
    - **D)** RTSP

### Answer Key & Explanations
1. **C** - Skype is a hybrid system; it uses servers for logins but P2P for the actual calls.
2. **D** - Authentication (verifying passwords) must be centralized for security.
3. **B** - Supernodes are regular users with great internet connections that act as hubs for the network.
4. **C** - NAT (Network Address Translation) prevents external devices from initiating direct inbound connections to internal devices.
5. **B** - By initiating an outbound connection, the NAT router keeps a path open for the Supernode to send data back.
6. **C** - Since direct connection fails, the traffic is relayed: Alice -> Alice's SN -> Bob's SN -> Bob.
7. **B** - A Supernode must be reachable by others, which requires a public, non-NAT IP address and good bandwidth.
8. **C** - Relaying traffic through an external node with a public IP is a classic NAT traversal technique.
9. **B** - The overlay network is the logical, application-level web of connections formed specifically between Skype Supernodes.
10. **B** - SIP uses a formal infrastructure of Proxy and Registrar servers, whereas Skype uses decentralized Supernodes.

## References & Navigation

- **Previous Topic:** [[P2P Architecture and BitTorrent]]
- **Related Notes:** [[Applications]]

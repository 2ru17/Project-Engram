---
id: nscom01_finals_reviewer
type: note
course: NSCOM01
topic: "Finals Reviewer"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSCOM01]] #[[Conceptual]] #[[Reviewer]]

---

## NSCOM01 Comprehensive Finals Reviewer

This reviewer covers all core topics for the Term 2 Finals, including VoIP Basics, Real-Time Protocols (RTP, RTCP, RTSP), SIP, P2P Architecture, BitTorrent, and Skype's VoIP implementation.

### Comprehensive 20-Item Test

1. To maintain a seamless VoIP conversation, the end-to-end delay must be kept below:
    - **A)** 50 ms
    - **B)** 150 ms
    - **C)** 400 ms
    - **D)** 1000 ms

2. The fluctuation in end-to-end delay of consecutive packets caused by variable network congestion is known as:
    - **A)** Packet loss
    - **B)** Propagation delay
    - **C)** Delay jitter
    - **D)** Interleaving

3. How does increasing the playout buffer ($q$) affect VoIP performance?
    - **A)** Improves interactivity and reduces packet loss.
    - **B)** Worsens interactivity but reduces packet loss.
    - **C)** Improves interactivity but increases packet loss.
    - **D)** Worsens interactivity and increases packet loss.

4. Interleaving is a loss concealment technique that works by:
    - **A)** Sending duplicate packets.
    - **B)** Requesting retransmission of lost packets via TCP.
    - **C)** Spreading chunks of audio across multiple packets to prevent complete gaps.
    - **D)** Reducing the audio encoding rate dynamically.

5. Which of the following is true regarding the Real-Time Transport Protocol (RTP)?
    - **A)** It provides guaranteed Quality of Service (QoS).
    - **B)** It is typically encapsulated in TCP segments.
    - **C)** It provides a standardized packet format including sequence numbers and timestamps.
    - **D)** It acts as an out-of-band control protocol for VCR functions.

6. Which RTP header field allows the receiver to properly synchronize playout and handle jitter?
    - **A)** Payload Type
    - **B)** Sequence Number
    - **C)** Time Stamp
    - **D)** SSRC

7. What is the primary function of the Real-Time Control Protocol (RTCP)?
    - **A)** To carry the audio/video payload.
    - **B)** To limit total bandwidth usage to 50%.
    - **C)** To provide periodic transmission statistics and synchronize streams.
    - **D)** To map SIP URIs to IP addresses.

8. RTSP (Real-Time Streaming Protocol) is primarily designed to:
    - **A)** Provide "Internet VCR" remote controls for streaming media servers.
    - **B)** Setup VoIP phone calls.
    - **C)** Bypass NAT restrictions.
    - **D)** Distribute files in a P2P network.

9. In SIP, which server is responsible for routing `INVITE` messages to locate the callee?
    - **A)** Tracker
    - **B)** Registrar Server
    - **C)** Proxy Server
    - **D)** Supernode

10. What message is used by a SIP client upon bootup to bind its current dynamic IP address to its SIP URI?
    - **A)** SETUP
    - **B)** INVITE
    - **C)** HELLO
    - **D)** REGISTER

11. If a SIP callee receives an INVITE but does not support the requested media codec, what response should they send?
    - **A)** 200 OK
    - **B)** 606 Not Acceptable
    - **C)** 404 Not Found
    - **D)** ACK

12. In a P2P network distributing a file to $N$ peers, what happens to the total available upload capacity as $N$ increases?
    - **A)** It decreases.
    - **B)** It remains constant.
    - **C)** It increases because new peers bring additional upload capacity.
    - **D)** It fluctuates randomly.

13. What is the role of a Tracker in the BitTorrent protocol?
    - **A)** It stores the rarest chunks of the file.
    - **B)** It tracks the IP addresses of peers participating in a torrent.
    - **C)** It enforces the Tit-for-Tat algorithm globally.
    - **D)** It converts the file into 256 Kb chunks.

14. BitTorrent's "Rarest First" strategy is designed to:
    - **A)** Download the smallest chunks first.
    - **B)** Ensure that the least common chunks are duplicated quickly to prevent data loss if the original seeder leaves.
    - **C)** Send data only to peers with high download speeds.
    - **D)** Encrypt the chunks with the rarest keys.

15. The BitTorrent algorithm that rewards peers for uploading and penalizes leechers is called:
    - **A)** Rarest First
    - **B)** Optimistic Unchoking
    - **C)** Tit-for-Tat
    - **D)** Supernode Routing

16. What is the purpose of Optimistic Unchoking in BitTorrent?
    - **A)** To randomly disconnect from slow peers.
    - **B)** To probe for better trading partners and give brand-new peers a chance to get their first chunk.
    - **C)** To unchoke the Tracker server.
    - **D)** To bypass NAT routers.

17. Classic Skype utilized a hybrid architecture consisting of:
    - **A)** P2P authentication and centralized media routing.
    - **B)** Centralized login/authentication and P2P user discovery/routing.
    - **C)** Centralized SIP Proxies and centralized Media Servers.
    - **D)** Pure P2P with no centralized servers at all.

18. What is a Skype Supernode?
    - **A)** A Microsoft datacenter server used for billing.
    - **B)** A standard peer hidden behind a strict NAT router.
    - **C)** A highly capable peer with a public IP that acts as a routing hub in the overlay network.
    - **D)** A specialized BitTorrent tracker.

19. How does Skype overcome the issue of NAT Traversal when both callers are behind NAT routers?
    - **A)** It uses a centralized SIP proxy to route the call.
    - **B)** It forces the routers to open port 5060.
    - **C)** Both peers maintain open outbound connections to Supernodes, which then act as traffic relays.
    - **D)** It disables the firewalls using an RTSP SETUP command.

20. During a talk spurt, if audio is encoded at 64 kbps and packetized every 20 msec, what is the size of the payload chunk in bytes?
    - **A)** 128 bytes
    - **B)** 160 bytes
    - **C)** 256 bytes
    - **D)** 320 bytes

### Answer Key & Explanations
1. **B** - End-to-end delay must be < 150 ms to prevent noticeable lag in conversation.
2. **C** - Delay jitter is the variation in transit time for consecutive packets.
3. **B** - A larger buffer ($q$) gives late packets time to arrive (reducing loss), but increases total delay, hurting interactivity.
4. **C** - Interleaving splits chunks across packets. A lost packet causes a minor quality drop instead of a total gap.
5. **C** - RTP structures the data (sequence, timestamp) but does not guarantee QoS and runs over UDP.
6. **C** - The timestamp indicates the exact sampling instant, allowing the receiver to buffer and play smoothly.
7. **C** - RTCP provides out-of-band QoS feedback and enables audio/video synchronization.
8. **A** - RTSP acts as a network remote control for Video-on-Demand (VoD) servers.
9. **C** - The Proxy Server acts like DNS, routing requests through the network.
10. **D** - REGISTER updates the network with the user's current location.
11. **B** - 606 Not Acceptable indicates the destination was reached, but session parameters are incompatible.
12. **C** - This is the core advantage of P2P; it is self-scaling because every downloader is also an uploader.
13. **B** - The Tracker is a directory server that maintains lists of active peers.
14. **B** - Rarest First maximizes file availability across the swarm.
15. **C** - Tit-for-Tat strictly unchokes (sends to) the top peers who are sending data to you.
16. **B** - By randomly sending data to a random peer every 30s, it discovers better peers and kickstarts new joiners.
17. **B** - Authentication is centralized for security, while the heavy lifting of routing is done P2P.
18. **C** - Supernodes form the P2P overlay network to route calls and track users.
19. **C** - Since NAT prevents inbound connections, routing via open outbound connections to Supernodes traverses the NAT.
20. **B** - 64 kbps = 8,000 bytes/sec. 8,000 * 0.020 sec = 160 bytes.


## References & Navigation

- **Related Notes:** [[Network Communications]]

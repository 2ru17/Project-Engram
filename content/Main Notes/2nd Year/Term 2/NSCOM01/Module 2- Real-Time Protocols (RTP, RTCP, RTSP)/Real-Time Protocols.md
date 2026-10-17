---
id: real_time_protocols
type: note
course: NSCOM01
topic: "Real-Time Protocols"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSCOM01]] #[[Conceptual]] #[[RTP]] #[[RTCP]] #[[RTSP]]

---

## Overview
To support real-time multimedia over IP, specific application-layer protocols have been standardized. The Real-Time Transport Protocol (RTP) handles the actual delivery of media, while the Real-Time Control Protocol (RTCP) provides out-of-band statistics and control information. For streaming stored media like Video-on-Demand (VoD), the Real-Time Streaming Protocol (RTSP) provides remote control functionalities similar to a VCR.

## Key Definitions
- **RTP (Real-Time Transport Protocol):** Defines a standardized packet format for delivering audio and video.
- **RTCP (Real-Time Control Protocol):** Works alongside RTP to monitor transmission statistics and Quality of Service (QoS).
- **RTSP (Real-Time Streaming Protocol):** A network control protocol designed for use in entertainment and communications systems to control streaming media servers.
- **SSRC (Synchronization Source ID):** A 32-bit unique identifier for the source of an RTP stream.

## Theoretical Framework / Core Concepts

### Real Time Protocol (RTP)
- **RFC:** 3550
- **Architecture:** RTP sits between the application and the transport layer in end systems. It is typically encapsulated in UDP segments.
- **Limitation:** RTP **does not** provide QoS guarantees. Routers treat RTP packets identically to regular IP/UDP traffic; it relies on the application to handle jitter and loss.

**RTP Header Fields:**
1. **Payload Type (7 bits):** Indicates the encoding format (e.g., 0 = PCM mu-law, 33 = MPEG2 video). Encodings can change dynamically mid-stream.
2. **Sequence Number (16 bits):** Increments by 1 for each packet. Allows the receiver to detect missing packets and restore packet order.
3. **Time Stamp (32 bits):** Reflects the sampling instant of the first byte in the packet. Critical for jitter buffering and smooth playout.
4. **SSRC (32 bits):** Uniquely identifies the stream source.

### Real-Time Control Protocol (RTCP)
RTCP periodically sends control packets to all participants in a session to report network health and statistics.

**RTCP Packet Types:**
1. **Receiver Reports:** Details the fraction of lost packets, last sequence number received, and interarrival jitter.
2. **Sender Reports:** Details the SSRC, current wall-clock time, total packets sent, and total bytes sent.
3. **Source Description:** Maps the SSRC to a human-readable identifier (e.g., name or email).

**Key Features of RTCP:**
- **Stream Synchronization:** Ties relative RTP timestamps to an absolute "wall-clock" time, allowing receivers to sync audio and video streams (e.g., lip-syncing).
- **Bandwidth Scaling:** RTCP traffic is strictly limited to 5% of the total session bandwidth to prevent control overhead from overwhelming the network (75% allocated to receivers, 25% to the sender).

### Real Time Streaming Protocol (RTSP)
- **RFC:** RFC 2326
RTSP acts as a network remote control for media servers, enabling "Internet VCR" features like pause, rewind, and fast-forward for Video-on-Demand.

**Architecture Workflow:**
1. Browser requests a meta file from a Web Server via HTTP.
2. Browser passes the meta file to a Media Player.
3. Media Player opens an out-of-band RTSP connection with the Media Server to send commands.
4. Media (audio/video) streams over a separate, in-band RTP connection.

**Common RTSP Methods:**
- `SETUP`: Allocates resources for a stream.
- `PLAY`: Starts data transmission.
- `PAUSE`: Temporarily halts the stream.
- `RECORD`: Initiates recording on the server.
- `TEARDOWN`: Frees resources and closes the session.

## Summary & Key Takeaways
- RTP provides sequence numbering, timestamps, and payload identification for real-time media but offers no QoS guarantees.
- RTCP provides vital statistics and enables stream synchronization, carefully limiting its bandwidth footprint to 5%.
- RTSP operates out-of-band to provide VCR-like controls for streaming media servers.

## Multiple Choice Questions
1. Which protocol is responsible for actually carrying the audio and video payload in VoIP?
- **A)** RTCP
- **B)** RTSP
- **C)** RTP
- **D)** HTTP

2. Does RTP provide Quality of Service (QoS) guarantees to ensure timely delivery?
- **A)** Yes, by prioritizing its packets at the router level.
- **B)** Yes, by using TCP retransmissions.
- **C)** No, routers treat RTP packets as standard best-effort traffic.
- **D)** No, but it reserves bandwidth using RSVP.

3. Which RTP header field allows the receiver to detect packet loss?
- **A)** Payload Type
- **B)** SSRC
- **C)** Time Stamp
- **D)** Sequence Number

4. What is the purpose of the RTP Time Stamp?
- **A)** To identify the user's email address
- **B)** To synchronize the playout and manage delay jitter
- **C)** To define the media encoding being used
- **D)** To record when the packet arrived at the receiver

5. Which RTCP packet type details the fraction of packets lost and average jitter?
- **A)** Sender Reports
- **B)** Receiver Reports
- **C)** Source Description
- **D)** Stream Synchronization

6. How does RTCP enable the synchronization of separate audio and video streams?
- **A)** By interleaving audio and video into the same RTP packet
- **B)** By mapping relative RTP timestamps to absolute "wall-clock" time
- **C)** By adjusting the router queueing delays
- **D)** By increasing the total session bandwidth

7. What percentage of the total session bandwidth is RTCP control traffic limited to?
- **A)** 1%
- **B)** 5%
- **C)** 10%
- **D)** 25%

8. What is the primary function of RTSP?
- **A)** To provide QoS for live streams
- **B)** To encapsulate video data for transmission
- **C)** To provide VCR-like remote controls (pause, play) for streaming media
- **D)** To map mnemonic user identifiers to IP addresses

9. How are RTSP control messages and the actual media streams separated?
- **A)** They use the same TCP connection.
- **B)** RTSP uses an out-of-band control connection, while media flows over a separate RTP connection.
- **C)** RTSP is sent via UDP, and media via HTTP.
- **D)** They are both handled entirely by the web server.

10. Which of the following is a valid RTSP method?
- **A)** GET
- **B)** INVITE
- **C)** TEARDOWN
- **D)** ACK

### Answer Key & Explanations
1. **C** - RTP (Real-Time Transport Protocol) specifies the packet structure for carrying the actual media data.
2. **C** - RTP runs on the end systems and is encapsulated in UDP; routers do not give it special priority.
3. **D** - The sequence number increments by one for each packet, allowing detection of missing packets.
4. **B** - The time stamp indicates the exact sampling instant, enabling the receiver to play back the media smoothly.
5. **B** - Receiver Reports give feedback to the sender regarding the quality of the received stream (loss, jitter).
6. **B** - RTCP ties the independent relative timestamps of the audio and video streams to a common wall-clock time so they can be synced.
7. **B** - RTCP scales its bandwidth usage, capping it at 5% of the total session bandwidth to avoid network congestion.
8. **C** - RTSP was designed to support Video-on-Demand by allowing users to send commands like play, pause, and rewind.
9. **B** - RTSP maintains an out-of-band connection strictly for control commands, separating control traffic from the heavy media payload.
10. **C** - TEARDOWN is an RTSP method used to close the streaming session and free resources.

## References & Navigation

- **Previous Topic:** [[Voice over IP and Multimedia Basics]]
- **Next Topic:** [[Session Initiation Protocol]]
- **Related Notes:** [[Applications]]

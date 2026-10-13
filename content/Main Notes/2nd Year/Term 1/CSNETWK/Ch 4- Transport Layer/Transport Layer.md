---
id: transport_layer
type: note
course: CSNETWK
topic: Transport Layer
status: completed
---

# Transport Layer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Transport Layer]] #[[Code Snippets]]

---

## Overview

The Transport Layer provides logical communication between application processes running on different hosts. While the network layer facilitates communication between hosts, the transport layer enhances it to enable communication between specific processes. The sender breaks application messages into segments and passes them to the network layer. The receiver reassembles these segments and passes them up to the application layer.

### Multiplexing and Demultiplexing
To deliver data to the correct application, the transport layer uses specific header information. **Multiplexing (Sender):** Handling data from multiple sockets and adding a transport header to create segments. **Demultiplexing (Receiver):** Using header info to deliver received segments to the correct socket.
Demultiplexing relies on IP addresses and port numbers. UDP uses connectionless demultiplexing, relying only on the destination port number. TCP uses connection-oriented demultiplexing, identifying a socket uniquely by a **4-tuple**: source IP, source port, destination IP, and destination port.

### UDP: User Datagram Protocol
UDP is a bare-bones, connectionless transport protocol providing "best effort" service. It offers unreliable, unordered delivery. **Features:** No handshaking (avoids RTT delay for setup), no connection state, small header size (Source port, Dest port, Length, Checksum), and no congestion control. **Use cases:** Streaming multimedia, DNS, SNMP, and HTTP/3 (where reliability is implemented at the application layer). **UDP Checksum:** Used for error detection. The sender treats the UDP segment as a sequence of 16-bit integers and computes the one's complement sum. The receiver verifies this checksum to catch bit flips.

### TCP: Transmission Control Protocol
TCP provides a connection-oriented, reliable, and in-order byte stream.  **Features:** Pipelining, flow control (prevents sender from overwhelming receiver), congestion control, cumulative ACKs, full-duplex data. **TCP Segment Structure:** Includes source/dest ports, sequence number (byte stream number of the first byte of data), acknowledgment number (sequence number of the next expected byte), receive window (`rwnd`), header length, and checksum. **Connection Management:** Uses a **3-way handshake** (SYN, SYN-ACK, ACK) to establish a connection safely, agreeing on initial sequence numbers. A connection is closed using segments with the FIN bit set. **Flow Control:** The receiver advertises its free buffer space in the `rwnd` field of the TCP header. The sender limits unACKed data to this value, guaranteeing the receiver's buffer won't overflow. **Reliable Data Transfer:** TCP uses timeouts and fast retransmit. If a segment's timer expires, it is retransmitted. If the sender receives **3 duplicate ACKs** for the same data (indicating a gap), it performs a **Fast Retransmit**, resending the unACKed segment with the smallest sequence number before the timeout occurs.

### RTT and Timeout Estimation
TCP dynamically adjusts its timeout interval based on measured Round Trip Times (`SampleRTT`). It uses an Exponential Weighted Moving Average (EWMA) to calculate an `EstimatedRTT` and estimates the variance (`DevRTT`). The `TimeoutInterval` is then set to the estimate plus a safety margin.

## Important Formulas
 **Estimated RTT (Exponential Weighted Moving Average):**
  $$ \text{EstimatedRTT} = (1 - \alpha) \times \text{EstimatedRTT} + \alpha \times \text{SampleRTT} $$
  *(Typical value: $\alpha = 0.125$)*
 **RTT Deviation (Safety Margin Calculation):**
  $$ \text{DevRTT} = (1 - \beta) \times \text{DevRTT} + \beta \times |\text{SampleRTT} - \text{EstimatedRTT}| $$
  *(Typical value: $\beta = 0.25$)*
 **Timeout Interval:**
  $$ \text{TimeoutInterval} = \text{EstimatedRTT} + 4 \times \text{DevRTT} $$
 **Internet Checksum:**
  Computed by adding all 16-bit words of the segment and taking the 1's complement. During addition, any carryout from the most significant bit is wrapped around and added to the least significant bit.

## Worked Examples

**Example 1: Computing Estimated RTT**
Suppose the current $\text{EstimatedRTT}$ is $100 \text{ ms}$, $\alpha = 0.125$, and a new $\text{SampleRTT}$ of $120 \text{ ms}$ is measured.
$$ \text{EstimatedRTT}_{new} = (1 - 0.125) \times 100 + 0.125 \times 120 = 0.875 \times 100 + 15 = 87.5 + 15 = 102.5 \text{ ms} $$

**Example 2: 16-bit Checksum Addition (Wraparound)**
Add two 16-bit binary numbers: `1110011001100110` and `1101010101010101`.
Sum:
`1110011001100110`
`1101010101010101`
--------------------
`11011101110111011` (17 bits)
Wraparound the carry out (1):
 `1011101110111011` + `1` = `1011101110111100`
1's complement (Checksum): `0100010001000011`

## Multiple Choice Questions

1. What is the primary purpose of multiplexing in the transport layer?
    - **A)** Encrypting data for secure transmission
    - **B)** Handling data from multiple sockets and adding a transport header to create segments
    - **C)** Delivering received segments to the correct socket using header info
    - **D)** Routing packets to their final destination

2. Which 4-tuple is used by TCP for connection-oriented demultiplexing?
    - **A)** Source IP, Source MAC, Destination IP, Destination MAC
    - **B)** Source IP, Source port, Destination IP, Destination port
    - **C)** Source IP, Destination IP, Protocol, TTL
    - **D)** Source port, Destination port, Sequence number, ACK number

3. Which feature is NOT provided by UDP?
    - **A)** Small header size
    - **B)** Connectionless demultiplexing
    - **C)** Congestion control
    - **D)** Error detection via checksum

4. What is the purpose of the `rwnd` field in the TCP header?
    - **A)** It indicates the routing window size
    - **B)** It specifies the congestion window size
    - **C)** It advertises the receiver's free buffer space for flow control
    - **D)** It holds the next expected sequence number

5. How does TCP establish a connection safely?
    - **A)** Using a 2-way handshake
    - **B)** Using a 3-way handshake (SYN, SYN-ACK, ACK)
    - **C)** Using a 4-way handshake (FIN, ACK, FIN, ACK)
    - **D)** By broadcasting a connection request

6. When does a TCP Fast Retransmit occur?
    - **A)** When the sender's timeout interval expires
    - **B)** When the receiver's buffer is full
    - **C)** When the sender receives 3 duplicate ACKs for the same data
    - **D)** When a segment's checksum fails

7. What is the role of the $\alpha$ parameter in estimating TCP's RTT?
    - **A)** It determines the weight given to the new SampleRTT versus the previous EstimatedRTT
    - **B)** It sets the safety margin for the timeout interval
    - **C)** It defines the maximum window size
    - **D)** It acts as a multiplier for the Deviation RTT

8. If EstimatedRTT is 100 ms and DevRTT is 10 ms, what is the TimeoutInterval?
    - **A)** 110 ms
    - **B)** 140 ms
    - **C)** 104 ms
    - **D)** 90 ms

9. How is the Internet Checksum computed for a UDP segment?
    - **A)** By XORing all 16-bit integers
    - **B)** By adding all 16-bit words and taking the 1's complement
    - **C)** By calculating an MD5 hash of the payload
    - **D)** By performing a cyclic redundancy check (CRC)

10. What sequence numbers does the connection establishment handshake agree upon?
    - **A)** Final sequence numbers
    - **B)** Initial sequence numbers
    - **C)** Acknowledgment window numbers
    - **D)** Port numbers

### Answer Key & Explanations
1. **B)** Multiplexing involves gathering data from multiple sockets at the sender and adding headers to create segments.
2. **B)** TCP uses a 4-tuple (source IP, source port, destination IP, and destination port) to uniquely identify a socket for demultiplexing.
3. **C)** UDP does not provide congestion control.
4. **C)** `rwnd` is the receive window, advertising free buffer space for flow control to prevent overflowing the receiver's buffer.
5. **B)** TCP uses a 3-way handshake (SYN, SYN-ACK, ACK) to establish a connection.
6. **C)** Fast Retransmit is triggered when the sender receives 3 duplicate ACKs, indicating a gap in received segments.
7. **A)** The $\alpha$ parameter (typically 0.125) is used in the Exponential Weighted Moving Average to weight the new SampleRTT against the old EstimatedRTT.
8. **B)** TimeoutInterval = EstimatedRTT + 4 * DevRTT = 100 + 4(10) = 140 ms.
9. **B)** The Internet Checksum adds all 16-bit words (with carry wraparound) and takes the 1's complement.
10. **B)** The 3-way handshake is used to agree on the initial sequence numbers between client and server.

## References & Navigation

- **Previous Topic:** [[Applications]]
- **Next Topic:** [[Sockets Programming]]
- **Related Notes:** [[Internetworking]]

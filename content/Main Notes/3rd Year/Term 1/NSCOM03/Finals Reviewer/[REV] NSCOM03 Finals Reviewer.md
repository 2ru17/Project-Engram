---
id: finals_reviewer
type: note
course: NSCOM03
topic: "Finals Reviewer"
status: completed
---
> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSCOM03]] #[[Conceptual]] #[[Finals Review]]

---

## Overview

This comprehensive Finals Reviewer consolidates the core curriculum of NSCOM03: Data Communications and Physical/Data Link Layer Networking. It spans transmission media and impairments, theoretical channel capacity limits (Nyquist and Shannon), digital line coding (Manchester, AMI), analog modulation (QAM constellations), digital multiplexing (TDM and T-1 carriers), error detection (CRC modulo-2 division), random access media control (CSMA/CD slot times), Ethernet II switching, and WAN protocols (HDLC bit stuffing and PPP).

---

## Comprehensive Curriculum Review Matrix

| Layer / Topic | Core Concepts | Key Formulas & Constraints | Dominant Standards / Formats |
| :--- | :--- | :--- | :--- |
| **Physical Impairments** | Attenuation, Distortion, Thermal Noise | $\text{dB} = 10 \log_{10}(P_2 / P_1)$, $SNR_{dB} = 10 \log_{10}(SNR)$ | Cat5e/6 UTP, Single/Multimode Fiber |
| **Channel Capacity** | Noiseless vs Gaussian Noisy Channels | $C_{Nyq} = 2B \log_2 L$, $C_{Shan} = B \log_2(1 + SNR)$ | Voice-grade local loop ($34.8\text{ kbps}$) |
| **Digital Line Coding** | Clock recovery, DC bias elimination | $S = N / r$; Manchester has mid-bit transition | 10BASE-T (Manchester), B8ZS (T-1) |
| **Analog Modulation** | Constellation mapping, baud vs bit rate | $N = S \log_2 L$; 16-QAM (4 b/sym), 256-QAM (8 b/sym) | DOCSIS Cable, 802.11a/g/n/ac/ax Wi-Fi |
| **Multiplexing** | FDM, WDM, Synchronous & Statistical TDM | $T_1 = 24\text{ ch} \times 8\text{ b} + 1 = 193\text{ b} \times 8000 = 1.544\text{ Mbps}$ | T-1/DS1 ($1.544\text{ Mbps}$), E-1 ($2.048\text{ Mbps}$) |
| **Error Detection** | Redundancy, Modulo-2 division | $d_{min} \ge s + 1$; CRC Remainder length = degree $r$ | CRC-32 (Ethernet), Checksum (IPv4/TCP) |
| **Media Access Control**| Random access, collision detection | CSMA/CD: $L_{min} \ge 2 \cdot t_{prop} \cdot R$; ALOHA: $18.4\%$ vs $36.8\%$ | IEEE 802.3 (Ethernet), IEEE 802.11 (Wi-Fi) |
| **LAN Data Link** | Transparent bridging, 48-bit MAC | Minimum 64 bytes, Maximum 1518 bytes | Ethernet II, IEEE 802.3, ARP |
| **WAN Data Link** | Flag delimiters, transparency stuffing | Bit stuffing: insert `0` after five consecutive `1`s | HDLC (`0x7E`), PPP (LCP, NCP, CHAP) |

---

## Worked Review Calculations

### 1. Unified Channel Engineering Calculation
An engineer must design a high-speed point-to-point link over an analog channel with bandwidth $B = 50\text{ kHz}$ and a signal-to-noise ratio $SNR = 1023$ ($SNR_{dB} = 10 \log_{10}(1023) \approx 30.1\text{ dB}$).
1. **Calculate the Shannon Capacity Limit:**
   $$C = B \log_2(1 + SNR) = 50000 \cdot \log_2(1 + 1023) = 50000 \cdot \log_2(1024)$$
   Since $1024 = 2^{10}$, $\log_2(1024) = 10$:
   $$C = 50000 \times 10 = 500000\text{ bps} = 500\text{ kbps}$$

2. **Determine Required QAM Constellation for Nyquist Signaling:**
   If the modulation scheme runs at a symbol rate $S = 50000\text{ baud}$, find the minimum number of constellation points $L$ needed to achieve $400\text{ kbps}$:
   $$r = \frac{N}{S} = \frac{400000\text{ bps}}{50000\text{ baud}} = 8\text{ bits/symbol} \implies L = 2^8 = 256\text{ points (256-QAM)}$$

### 2. CSMA/CD Slot Time & Minimum Frame Size
In a $100\text{ Mbps}$ Fast Ethernet network ($R = 10^8\text{ bps}$), the maximum distance between stations is $d = 2000\text{ meters}$, with cable propagation velocity $v = 2 \times 10^8\text{ m/s}$.
1. Round-trip propagation time:
   $$2 t_{prop} = 2 \times \frac{2000\text{ m}}{2 \times 10^8\text{ m/s}} = 2 \times 10^{-5}\text{ s} = 20\text{ }\mu\text{s}$$
2. Minimum frame size:
   $$L_{min} = 2 t_{prop} \times R = (20 \times 10^{-6}\text{ s}) \times 10^8\text{ bps} = 2000\text{ bits} = 250\text{ bytes}$$

---

## Multiple Choice Practice Questions

1. A channel has a bandwidth of $10\text{ kHz}$ and an $SNR_{dB} = 20\text{ dB}$. What is its maximum theoretical Shannon capacity?
    - **A)** $10\text{ kbps}$
    - **B)** $66.5\text{ kbps}$
    - **C)** $33.2\text{ kbps}$
    - **D)** $100\text{ kbps}$

2. In Pulse Code Modulation (PCM), if the number of quantization levels is increased from 64 to 256, what is the effect on the required bits per sample and the signal-to-quantization-noise ratio (SQNR)?
    - **A)** Bits per sample decrease from 8 to 6; SQNR drops by $12\text{ dB}$
    - **B)** Bits per sample increase from 6 to 8; SQNR improves by approximately $12\text{ dB}$
    - **C)** Bits per sample remain 8; SQNR is unchanged
    - **D)** Bits per sample double from 6 to 12; SQNR improves by $3\text{ dB}$

3. Which line coding scheme provides a clock synchronization transition at the exact center of every bit interval while maintaining zero net DC voltage?
    - **A)** Unipolar NRZ
    - **B)** Manchester Encoding
    - **C)** NRZ-Inverted
    - **D)** Run-Length Limited (RLL)

4. If a transmitter utilizes 64-QAM over a channel operating at $12000\text{ baud}$, what is the resulting data transmission bit rate?
    - **A)** $24\text{ kbps}$
    - **B)** $48\text{ kbps}$
    - **C)** $72\text{ kbps}$
    - **D)** $96\text{ kbps}$

5. How many total bits are transmitted per second on a standard North American T-1 digital transmission line?
    - **A)** $64\text{ kbps}$
    - **B)** $1.544\text{ Mbps}$
    - **C)** $2.048\text{ Mbps}$
    - **D)** $10.0\text{ Mbps}$

6. A CRC error-detecting system uses the generator polynomial $G(x) = x^4 + x^3 + 1$. How many parity check bits (FCS) are appended to each data word?
    - **A)** 3 bits
    - **B)** 4 bits
    - **C)** 5 bits
    - **D)** 8 bits

7. In a half-duplex CSMA/CD network, why will collisions fail to be detected reliably if packets are smaller than $L_{min} = 2 \cdot t_{prop} \cdot R$?
    - **A)** The packet CRC will automatically compute to zero
    - **B)** The sender will finish transmission before the collision signal from the most distant node arrives back, erroneously assuming successful delivery
    - **C)** The receiver buffer will overflow immediately
    - **D)** The jam signal will be blocked by intermediate repeaters

8. How does a Layer 2 transparent switch handle an incoming frame if its destination MAC address is `FF:FF:FF:FF:FF:FF`?
    - **A)** It forwards the frame only out the default uplink trunk port
    - **B)** It floods the frame out all active ports except the port on which it arrived
    - **C)** It drops the frame as an illegal broadcast
    - **D)** It stores the frame in NVRAM until an ARP reply is received

9. In HDLC framing, what bit is inserted by the transmitter immediately after encountering five consecutive binary 1s (`11111`) in the data payload?
    - **A)** `1`
    - **B)** `0`
    - **C)** An escape byte `0x7D`
    - **D)** A parity bit

10. What fundamental architectural advantage does CHAP have over PAP in PPP link authentication?
    - **A)** CHAP uses a three-way challenge-response exchange where the password is never sent across the wire
    - **B)** CHAP encrypts packets using hardware IPSec
    - **C)** CHAP requires dedicated token keyfobs
    - **D)** PAP can only authenticate Unix systems

---

### Answer Key & Explanations

1. **B**. $SNR_{dB} = 20\text{ dB} \implies SNR = 10^{20/10} = 100$. By Shannon's theorem: $C = B \log_2(1 + 100) = 10000 \cdot \log_2(101)$. Since $\log_2(101) \approx 6.658$, $C \approx 10000 \times 6.658 \approx 66580\text{ bps} \approx 66.6\text{ kbps}$.
2. **B**. $L = 64 = 2^6$ (6 bits/sample), while $L = 256 = 2^8$ (8 bits/sample). Each additional bit of quantization improves the $SQNR$ by approximately $6.02\text{ dB}$. Adding 2 bits ($8 - 6 = 2$) improves $SQNR$ by $2 \times 6.02 \approx 12\text{ dB}$.
3. **B**. Manchester encoding enforces a voltage transition at the center of every bit interval (providing continuous clock recovery) and balances high and low voltage states, eliminating net DC bias.
4. **C**. For 64-QAM, each symbol represents $r = \log_2(64) = 6$ bits. Bit rate $N = S \times r = 12000\text{ baud} \times 6\text{ bits/symbol} = 72000\text{ bps} = 72\text{ kbps}$.
5. **B**. A T-1 carrier frame carries $(24 \times 8) + 1 = 193$ bits. Transmitting at 8000 frames per second yields $193 \times 8000 = 1544000\text{ bps} = 1.544\text{ Mbps}$.
6. **B**. The number of FCS check bits equals the degree of the generator polynomial. For $G(x) = x^4 + x^3 + 1$, the degree is $r = 4$, requiring 4 check bits.
7. **B**. If a frame finishes transmitting before the round-trip propagation time expires, a collision occurring at the far end will reflect back only after the sender has already released the channel and assumed success, violating the collision detection invariant.
8. **B**. MAC address `FF:FF:FF:FF:FF:FF` is the Layer 2 broadcast address. A transparent switch replicates and forwards broadcast frames out all active ports except the arrival port.
9. **B**. HDLC bit stuffing guarantees that the flag sequence `01111110` never appears in user data by having the transmitter inject a `0` after any sequence of five consecutive `1`s.
10. **A**. In PAP, credentials cross the link in plaintext. In CHAP, the server sends a random challenge, and the client returns a one-way MD5 hash of the secret and challenge; the plaintext secret never traverses the wire.

---

## References & Navigation

- **Related Notes:** [[Physical Communication Layer]], [[Digital Transmission]], [[Media Access Control]], [[Data Link Protocols (LAN)]]

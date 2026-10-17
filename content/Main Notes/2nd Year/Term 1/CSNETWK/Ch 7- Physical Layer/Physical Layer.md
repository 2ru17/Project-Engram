---
id: physical_layer
type: note
course: CSNETWK
topic: Physical Layer
status: completed
---

# Physical Layer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Physical Layer]] #[[Conceptual]]

---

## Overview

The Physical Layer is the foundational layer responsible for transporting the raw bits that make up a data link layer frame across network media. It accepts complete frames, encodes the bits into a predefined series of signals (1s and 0s), and transmits them over the local medium. Network Interface Cards (NICs) physically connect end devices to the network media.

### Fundamental Principles **Physical Components:** Electronic hardware devices, network adapters, connectors, and cable designs that carry signals. **Encoding:** The method of converting data bits into a predefined "code" or predictable pattern recognized by both sender and receiver. **Signaling:** The method of representing the bits physically (e.g., specific voltage levels or light pulses representing a '0' or '1').

### Throughput and Bandwidth **Bandwidth:** The theoretical capacity of a medium to carry data, typically measured in kb/s or Mb/s. It depends on physical properties and signaling technologies. **Throughput:** The actual rate at which bits are sent from sender to receiver. Throughput is constrained by traffic volume, traffic type, network delays, and most importantly, the **bottleneck link**—the link along the end-to-end path with the lowest capacity (the minimum of the server's rate $R_s$, the client's rate $R_c$, or shared backbone rates).

### Physical Media Types
1. **Copper Media:** Transmits signals as electrical pulses.
*Issues:* Suffers from **attenuation** (signal deterioration over distance), **Electromagnetic/Radio Frequency Interference (EMI/RFI)**, and **crosstalk** (magnetic field disturbance between adjacent wires).
*Solutions:* strict distance limits, shielding, and twisting wire pairs (Twisted Pair cables).
2. **Fiber-Optic Cable:** Transmits signals as patterns of light pulses.
*Advantages:* Supports longer distances and much higher bandwidths, experiences less attenuation, and is completely immune to EMI and RFI.
*Use Cases:* Enterprise networks, Fiber-to-the-Home (FTTH), Long-Haul, and Submarine cables.
3. **Wireless Media:** Transmits signals via electromagnetic radio or microwave frequencies.
*Issues:* Coverage area is limited by obstacles/terrain. Susceptible to interference (microwaves, fluorescent lights), security risks, and the fact that it is a shared medium (only one device can send/receive at a time).

### Wireless and Mobile Networks (IEEE 802.11 & Bluetooth)
Wireless links have unique characteristics: **Free Space Path Loss (Fading):** Signal strength attenuates proportionally to the square of the distance and frequency. **Multipath Propagation:** Radio signals reflect off objects, causing delayed overlap (pulse spreading). The *coherence time* is the time a bit is present in the channel, inversely proportional to frequency and receiver velocity. **Noise:** Interference reduces the Signal-to-Noise Ratio (SNR). Higher SNR lowers the Bit Error Rate (BER). **Rate adaptation** dynamically changes the transmission rate based on the SNR (slower rates have lower BERs at low SNR). **Hidden Terminal Problem:** Environmental attenuation may cause two nodes to be unaware of each other's transmissions, leading to collisions at the receiver. **Multiple Access:** 802.11 uses CSMA/CA (Collision Avoidance). It avoids collisions since collision detection is too difficult due to fading and hidden terminals. **Network Modes:**
*Infrastructure Mode:* Devices communicate with a base station / Access Point (AP). The AP coordinates access and relays traffic.
*Ad-hoc Mode:* No base stations; nodes communicate directly with peers. **Bluetooth (PAN):** Personal Area Network under 10 meters, used as a cable replacement. Uses a master/client model where the master polls clients for transmission.

## Important Formulas
 **End-to-End Throughput:**
  The throughput is limited by the bottleneck link capacity:
  $$ \text{Throughput} = \min(R_c, R_s, R_{backbone}) $$
  Where $R_c$ is the client link rate, $R_s$ is the server link rate.
 **Free Space Path Loss:**
  Path loss is proportional to the square of the frequency ($f$) and the distance ($d$):
  $$ \text{Path Loss} \propto (f \times d)^2 $$

## Worked Examples

**Example 1: Bottleneck Throughput**
A server sends data over a link with capacity $R_s = 100 \text{ Mbps}$. The client receives data over an access link with capacity $R_c = 15 \text{ Mbps}$. There is a shared backbone with capacity $R = 1 \text{ Gbps}$ serving 10 equal connections.
The per-connection share of the backbone is $1000 \text{ Mbps} / 10 = 100 \text{ Mbps}$.
Throughput = $\min(100, 15, 100) = 15 \text{ Mbps}$. The client's access link is the bottleneck.

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "**Rate adaptation** dynamically changes _____ transmission rate based on the SNR (slower rates have lower BERs at low SNR)."?
- **A)** Network
- **B)** Protocol
- **C)** the
- **D)** Router

2. Which word completes the following sentence from the text: "Throughput is constrained by traffic volume, traffic type, network delays, and most importantly, the **bottleneck link**—the link along the end-to-end _____ with the lowest capacity (the minimum of the server's rate $R_s$, the client's rate $R_c$, or shared backbone rates)."?
- **A)** Network
- **B)** path
- **C)** Router
- **D)** Protocol

3. Which word completes the following sentence from the text: "*Issues:* Suffers from **attenuation** (signal deterioration over distance), **Electromagnetic/Radio Frequency _____ (EMI/RFI)**, and **crosstalk** (magnetic field disturbance between adjacent wires)."?
- **A)** Protocol
- **B)** Router
- **C)** Network
- **D)** Interference

4. Which word completes the following sentence from the text: "The client receives data over an access _____ with capacity $R_c = 15 \text{ Mbps}$."?
- **A)** link
- **B)** Network
- **C)** Protocol
- **D)** Router

5. Which word completes the following sentence from the text: "**Bluetooth (PAN):** Personal Area Network under _____ meters, used as a cable replacement."?
- **A)** Protocol
- **B)** Router
- **C)** 10
- **D)** Network

6. Which word completes the following sentence from the text: "Throughput = $\min(100, 15, _____ = 15 \text{ Mbps}$."?
- **A)** 100
- **B)** Network
- **C)** Protocol
- **D)** Router

7. Which word completes the following sentence from the text: "It depends on physical _____ and signaling technologies."?
- **A)** Router
- **B)** properties
- **C)** Network
- **D)** Protocol

8. Which word completes the following sentence from the text: "There is a shared backbone with capacity $R _____ 1 \text{ Gbps}$ serving 10 equal connections."?
- **A)** 
- **B)** Protocol
- **C)** Router
- **D)** Network

9. Which word completes the following sentence from the text: "**Wireless Media:** Transmits signals via _____ radio or microwave frequencies."?
- **A)** Protocol
- **B)** electromagnetic
- **C)** Network
- **D)** Router

10. Which word completes the following sentence from the text: "**Network Modes:** *Infr_____structure Mode:* Devices communicate with a base station / Access Point (AP)."?
- **A)** Network
- **B)** a
- **C)** Protocol
- **D)** Router


### Answer Key & Explanations
1. **C)** the completes the sentence: **Rate adaptation** dynamically changes the transm...
2. **B)** path completes the sentence: Throughput is constrained by traffic volume, traff...
3. **D)** Interference completes the sentence: *Issues:* Suffers from **attenuation** (signal det...
4. **A)** link completes the sentence: The client receives data over an access link with ...
5. **C)** 10 completes the sentence: **Bluetooth (PAN):** Personal Area Network under 1...
6. **A)** 100 completes the sentence: Throughput = $\min(100, 15, 100) = 15 \text{ Mbps}...
7. **B)** properties completes the sentence: It depends on physical properties and signaling te...
8. **A)**  completes the sentence: There is a shared backbone with capacity $R = 1 \t...
9. **B)** electromagnetic completes the sentence: **Wireless Media:** Transmits signals via electrom...
10. **B)** a completes the sentence: **Network Modes:** *Infrastructure Mode:* Devices ...

## References & Navigation

- **Previous Topic:** [[Learning Switches (Advanced)]]
- **Next Topic:** [[End to End Throughput and Bottleneck Links]]
- **Related Notes:** [[Internetworking]]

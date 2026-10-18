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

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Physical Layer]] #[[Conceptual]]

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

1. What are the three main physical Impairments that degrade signals traveling across guided copper media (such as Unshielded Twisted Pair — UTP)?
    - **A)** Routing loops, DNS spoofing, and ARP poisoning
    - **B)** **Attenuation** (loss of signal amplitude/power over distance), **Electromagnetic / Radio Frequency Interference (EMI/RFI)** from external power lines and motors, and **Crosstalk** (inductive/capacitive coupling of signals between adjacent wire pairs).
    - **C)** TCP slow start, head-of-line blocking, and NAT translation
    - **D)** Total internal reflection and chromatic dispersion

2. Why are the insulated copper wires inside a Cat5e/Cat6 Ethernet cable **twisted together in pairs**?
    - **A)** Simply to make the cable shorter and stiffer.
    - **B)** Twisting the two differential conductors causes external electromagnetic noise and adjacent-pair fields to affect both wires equally (common-mode noise), which **cancels out** when the receiver takes the voltage difference between the two wires, dramatically reducing **crosstalk and EMI**.
    - **C)** To increase the propagation speed of electrons above the speed of light.
    - **D)** To convert digital bits into optical laser pulses.

3. What are the primary physical advantages of **Single-Mode and Multi-Mode Optical Fiber** over copper twisted-pair cabling for long-haul backbone links?
    - **A)** Optical fiber is immune to Electromagnetic Interference (EMI) and crosstalk, suffers extremely low signal attenuation over tens to hundreds of kilometers, and supports vastly higher bandwidth (tens to hundreds of Gbps per wavelength).
    - **B)** Optical fiber can carry high-voltage AC power to PoE devices.
    - **C)** Optical fiber requires no transceivers or termination equipment.
    - **D)** Optical fiber is unaffected by sharp $90^\circ$ physical bends or glass fractures.

4. In wireless physical-layer transmission (IEEE 802.11 Wi-Fi), how does **Rate Adaptation** respond when a mobile user walks farther away from the Access Point and the **Signal-to-Noise Ratio (SNR)** drops?
    - **A)** It increases the modulation rate to 1024-QAM so bits arrive before they fade.
    - **B)** As SNR decreases, the Bit Error Rate (BER) for dense modulation schemes rises sharply; Rate Adaptation **dynamically steps down to a more robust, lower-bit-rate modulation scheme** (e.g., from 64-QAM down to 16-QAM, QPSK, or BPSK) to keep the BER within acceptable bounds.
    - **C)** It switches the Access Point from Infrastructure Mode to Ad-Hoc Mode.
    - **D)** It changes the MAC address of the laptop.

5. In IEEE 802.11 wireless networks, what is the difference between **Infrastructure Mode** and **Ad-Hoc Mode**?
    - **A)** In Infrastructure Mode, wireless stations communicate through a central **Base Station / Access Point (AP)** that bridges traffic onto the wired distribution network; in Ad-Hoc Mode, wireless stations communicate directly peer-to-peer with one another without an Access Point.
    - **B)** Infrastructure Mode uses coaxial cables, whereas Ad-Hoc Mode uses fiber optics.
    - **C)** Infrastructure Mode only supports Bluetooth under 10 meters.
    - **D)** Ad-Hoc Mode requires a cellular 5G tower.

### Answer Key & Explanations

1. **B**. Copper transmission suffers from resistive/dielectric attenuation over distance, external EMI/RFI pickup, and near-end/far-end crosstalk between neighboring wire pairs.
2. **B**. Differential signaling over twisted pairs ensures that external magnetic flux induces equal voltages in alternating half-twists, canceling out at the differential receiver.
3. **A**. Photons in glass fiber do not couple with external electromagnetic fields (zero EMI/crosstalk) and experience minimal attenuation ($\sim 0.2\text{ dB/km}$ at $1550\text{ nm}$), ideal for high-capacity backbones.
4. **B**. At low SNR, symbols packed closely in constellation space (e.g., 64-QAM) are easily corrupted by noise; stepping down to QPSK/BPSK separates constellation points, lowering BER at the cost of lower bit rate.
5. **A**. Infrastructure mode associates wireless clients with an AP (forming a Basic Service Set connected to a wired LAN), whereas Ad-Hoc mode forms an Independent BSS directly between wireless peers.

## References & Navigation

- **Previous Topic:** [[Learning Switches (Advanced)]]
- **Next Topic:** [[End to End Throughput and Bottleneck Links]]
- **Related Notes:** [[Internetworking]]

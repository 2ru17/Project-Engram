---
id: security
type: note
course: CSNETWK
topic: Security
status: completed
---

# Security

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Security]] #[[Conceptual]]

---

## Overview

Network security encompasses several key principles: **Confidentiality:** Only the sender and intended receiver should understand the message contents (achieved via encryption). **Authentication:** Sender and receiver must confirm each other's identity. **Message Integrity:** Ensuring the message was not altered in transit. **Access and Availability:** Services must be accessible to legitimate users.

Malicious actors can perform various attacks, including eavesdropping, message insertion, impersonation (spoofing), hijacking connections, and Denial of Service (DoS).

### Cryptography Types
1. **Symmetric Key Cryptography:** Both sender and receiver share the same secret key.
Examples: DES (Data Encryption Standard - 56-bit key), 3DES, and AES (Advanced Encryption Standard - 128, 192, or 256-bit keys).
*Pros:* Very fast (AES is ~100x faster than RSA).
*Cons:* Requires a secure way to establish the shared key beforehand.
2. **Public Key Cryptography:** The receiver has a public key (known to everyone) and a private key (known only to them).
To send a confidential message, the sender encrypts it using the receiver's public key. The receiver decrypts it using their private key.
Example: **RSA** (Rivest-Shamir-Adleman).

### The RSA Algorithm
RSA relies on the mathematical difficulty of factoring large numbers.
1. Choose two large prime numbers $p$ and $q$.
2. Compute $n = pq$ and $z = (p-1)(q-1)$.
3. Choose $e$ (where $e < n$) such that it has no common factors with $z$ ($e$ and $z$ are relatively prime).
4. Choose $d$ such that $e \cdot d - 1$ is exactly divisible by $z$ (i.e., $ed \pmod z = 1$).
5. **Public Key:** $(n, e)$
6. **Private Key:** $(n, d)$

Because RSA exponentiation is computationally intensive, it is typically used only to securely exchange a **symmetric session key**. The faster symmetric key is then used for the actual data transmission.

### Authentication and Message Integrity **Authentication:** Defeating playback attacks (where an intruder records and replays a packet) requires a **nonce** (a number used once in a lifetime). The sender must encrypt the nonce to prove they are live. **Digital Signatures:** Analogous to hand-written signatures. A sender signs a document by encrypting it with their *private* key. The receiver verifies it by decrypting with the sender's *public* key. **Message Digests:** A hash function (like MD5 or SHA-1) processes a message to produce a fixed-size fingerprint. It is computationally infeasible to find two messages with the same hash. A practical digital signature is formed by signing (encrypting) the message digest rather than the entire message. **Certification Authorities (CA):** To prevent a "man-in-the-middle" from distributing fake public keys, CAs bind public keys to specific entities. The CA issues a certificate containing the entity's public key, digitally signed by the CA's own private key.

## Important Formulas
 **RSA Encryption:**
  $$ c = m^e \pmod n $$
  Where $m$ is the plaintext message represented as an integer, and $c$ is the ciphertext.
 **RSA Decryption:**
  $$ m = c^d \pmod n $$
 **Modular Arithmetic Properties:**
  $$ (a \pmod n \times b \pmod n) \pmod n = (a \times b) \pmod n $$
  $$ (m^e \pmod n)^d \pmod n = m^{ed} \pmod n = m $$

## Worked Examples

**Example 1: RSA Key Generation and Encryption**
1. Choose primes $p = 5$ and $q = 7$.
2. Compute $n = 5 \times 7 = 35$ and $z = (5-1)(7-1) = 24$.
3. Choose $e = 5$ (since 5 and 24 are relatively prime).
4. Find $d$ such that $5d \pmod{24} = 1$. Let's test values: $5 \times 5 = 25 \pmod{24} = 1$. So, $d = 5$. (Wait, the notes used $d=29$ because $29 \times 5 = 145 = 6 \times 24 + 1$). Let's use $d = 29$.
5. Public key is $(35, 5)$, Private key is $(35, 29)$.
*Encryption:* If message $m = 12$:
$c = 12^5 \pmod{35} = 248832 \pmod{35} = 17$
*Decryption:*
$m = 17^{29} \pmod{35} = 12$

## Multiple Choice Questions

1. What are the core security properties of the **CIA Triad plus Authentication and Non-Repudiation** in network security?
    - **A)** Caching, Indexing, and Aggregation
    - **B)** **Confidentiality** (only authorized sender/receiver can understand message contents, via encryption), **Integrity** (detecting any in-flight tampering/alteration of message bits, via MACs/hashes), **Availability** (keeping network services operational for legitimate users despite DoS attacks), and **Authentication** (verifying the true identity of the communicating peer).
    - **C)** Collision Detection, Interleaving, and Acknowledgment
    - **D)** Classful Addressing, ICMP, and ARP

2. How do **Symmetric-Key Cryptography** (e.g., AES) and **Public-Key (Asymmetric) Cryptography** (e.g., RSA, Diffie-Hellman) differ, and how are they combined in protocols like **TLS**?
    - **A)** Symmetric encryption uses a **single shared secret key** $K_S$ for both encryption and decryption and is computationally fast for bulk data, while Asymmetric cryptography uses a mathematically linked **(Public Key $K^+$, Private Key $K^-$) pair**; TLS uses asymmetric cryptography during the handshake to authenticate the server and securely establish a shared ephemeral **symmetric session key** used to encrypt the bulk session traffic.
    - **B)** Symmetric cryptography uses two different keys and is $1000\times$ slower than RSA.
    - **C)** TLS encrypts every megabyte of video streaming directly with 4096-bit RSA without symmetric keys.
    - **D)** Public-key cryptography requires meeting in person to exchange the private key.

3. To create a **Digital Signature** on a document $m$ that provides both **sender authentication** and **message integrity**, which key does Alice use to sign the cryptographic hash $H(m)$, and which key does Bob use to verify it?
    - **A)** Alice signs with Bob's public key $K_B^+$; Bob verifies with Bob's private key $K_B^-$.
    - **B)** Alice signs with Alice's public key $K_A^+$; Bob verifies with Alice's private key $K_A^-$.
    - **C)** Alice encrypts/signs the hash $H(m)$ using **Alice's own Private Key $K_A^-$**; anyone (including Bob) can verify the signature by applying **Alice's Public Key $K_A^+$** to recover $H(m)$ and comparing it against a freshly computed hash of the received document $m$.
    - **D)** No keys are used; sending $H(m)$ in plaintext is a digital signature.

4. Why is sending an unkeyed cryptographic hash $H(m)$ alongside a plaintext message $\langle m, H(m) \rangle$ **insufficient** to protect message integrity against an active Man-in-the-Middle attacker?
    - **A)** Because hash functions like SHA-256 are reversible.
    - **B)** Because routers strip SHA-256 hashes at Layer 3.
    - **C)** Because $H(m)$ is always longer than $m$.
    - **D)** Because hash algorithms are publicly known: an active attacker can intercept $\langle m, H(m) \rangle$, modify the message to $m'$, compute the valid hash $H(m')$ themselves, and forward $\langle m', H(m') \rangle$; preventing this requires a **Message Authentication Code (MAC / HMAC)** $H(m + s)$ that incorporates a shared secret key $s$ (or a digital signature).

5. At which layers of the Internet protocol stack do **TLS (Transport Layer Security)**, **IPsec**, and **WPA2/WPA3 (802.11i)** respectively operate?
    - **A)** TLS operates at Layer 1; IPsec at Layer 5; WPA2 at Layer 3.
    - **B)** **TLS** secures Application/Transport streams (above TCP at Layer 4/5); **IPsec** secures Network-layer IP datagrams host-to-host or gateway-to-gateway (Layer 3); **WPA2/WPA3** secures wireless Link-layer frames between a device and the Wi-Fi Access Point (Layer 2).
    - **C)** All three operate exclusively inside DNS servers.
    - **D)** All three encrypt Ethernet MAC addresses at Layer 1.

### Answer Key & Explanations

1. **B**. Network security rests on Confidentiality (encryption), Message Integrity (HMAC/signatures), Endpoint Authentication (certificates/keys), and Service Availability.
2. **A**. Hybrid cryptosystems like TLS combine the key-exchange/authentication strength of asymmetric cryptography (RSA/ECDHE) with the high throughput of symmetric ciphers (AES-GCM) for bulk payload encryption.
3. **C**. Because only Alice possesses her private key $K_A^-$, only Alice could have produced $K_A^-(H(m))$; anyone with Alice's public key $K_A^+$ can verify that $K_A^+(K_A^-(H(m))) = H(m)$.
4. **D**. Without a secret key $s$ (as in an HMAC) or private signing key, an attacker can trivially recompute $H(m')$ for a forged message $m'$.
5. **B**. Security protocols provide defense-in-depth at different layers: WPA2/WPA3 on the wireless link (L2), IPsec on IP datagrams (L3), and TLS on application/TCP connections (L4/L5).

## References & Navigation

- **Previous Topic:** [[End to End Throughput and Bottleneck Links]]
- **Related Notes:** [[Cybersecurity Awareness]], [[Security]]

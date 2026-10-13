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

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Security]] #[[Conceptual]]

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

1. Which word completes the following sentence from the text: "*Cons:* Requires a secure way _____ establish the shared key beforehand."?
    - **A)** Router
    - **B)** Network
    - **C)** to
    - **D)** Protocol

2. Which word completes the following sentence from the text: "The sender must encrypt the _____ to prove they are live."?
    - **A)** nonce
    - **B)** Protocol
    - **C)** Network
    - **D)** Router

3. Which word completes the following sentence from the text: "To send a confidential message, the sender _____ it using the receiver's public key."?
    - **A)** encrypts
    - **B)** Router
    - **C)** Network
    - **D)** Protocol

4. Which word completes the following sentence from the text: "The CA issues a certificate containing the entity's public _____ digitally signed by the CA's own private key."?
    - **A)** Router
    - **B)** Protocol
    - **C)** key
    - **D)** Network

5. Which word completes the following sentence from the text: "(Wait, the notes used $d=29$ because $29 \times _____ = 145 = 6 \times 24 + 1$)."?
    - **A)** 5
    - **B)** Network
    - **C)** Router
    - **D)** Protocol

6. Which word completes the following sentence from the text: "**RSA Decryption:**   $$ m = c^d _____ n $$  **Modular Arithmetic Properties:**   $$ (a \pmod n \times b \pmod n) \pmod n = (a \times b) \pmod n $$   $$ (m^e \pmod n)^d \pmod n = m^{ed} \pmod n = m $$  ## Worked Examples  **Example 1: RSA Key Generation and Encryption** 1."?
    - **A)** Network
    - **B)** Router
    - **C)** Protocol
    - **D)** pmod

7. Which word completes the following sentence from the text: "**Access and Availability:** Services must _____ accessible to legitimate users."?
    - **A)** Protocol
    - **B)** Router
    - **C)** Network
    - **D)** be

8. Which word completes the following sentence from the text: "**Public Key Cryp_____graphy:** The receiver has a public key (known to everyone) and a private key (known only to them)."?
    - **A)** to
    - **B)** Network
    - **C)** Protocol
    - **D)** Router

9. Which word completes the following sentence from the text: "**Symmetric Key Cryptography:** Both sender and _____ share the same secret key."?
    - **A)** Network
    - **B)** Protocol
    - **C)** receiver
    - **D)** Router

10. Which word completes the following sentence from the text: "A sender signs a document by _____ it with their *private* key."?
    - **A)** encrypting
    - **B)** Router
    - **C)** Protocol
    - **D)** Network


### Answer Key & Explanations
1. **C)** to completes the sentence: *Cons:* Requires a secure way to establish the sha...
2. **A)** nonce completes the sentence: The sender must encrypt the nonce to prove they ar...
3. **A)** encrypts completes the sentence: To send a confidential message, the sender encrypt...
4. **C)** key completes the sentence: The CA issues a certificate containing the entity'...
5. **A)** 5 completes the sentence: (Wait, the notes used $d=29$ because $29 \times 5 ...
6. **D)** pmod completes the sentence: **RSA Decryption:**   $$ m = c^d \pmod n $$  **Mod...
7. **D)** be completes the sentence: **Access and Availability:** Services must be acce...
8. **A)** to completes the sentence: **Public Key Cryptography:** The receiver has a pu...
9. **C)** receiver completes the sentence: **Symmetric Key Cryptography:** Both sender and re...
10. **A)** encrypting completes the sentence: A sender signs a document by encrypting it with th...

## References & Navigation

- **Previous Topic:** [[End to End Throughput and Bottleneck Links]]
- **Related Notes:** [[Cybersecurity Awareness]], [[Security]]

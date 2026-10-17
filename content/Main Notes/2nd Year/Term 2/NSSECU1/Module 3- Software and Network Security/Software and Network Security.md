---
id: software_and_network_security
type: note
course: NSSECU1
topic: "Software and Network Security"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSSECU1]] #[[Conceptual]] #[[Network Security]] #[[Software Security]]

---

## Overview
This module bridges the gap between securing software applications and protecting the networks they traverse. Network security involves defending against unauthorized access to corporate networks, while software security (AppSec) focuses on embedding security within the Software Development Life Cycle (SDLC) to prevent vulnerabilities like injection and cross-site scripting.

## Key Definitions
- **Firewall:** A network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies.
- **IDS/IPS:** Intrusion Detection System (monitors and alerts) and Intrusion Prevention System (blocks active threats).
- **OWASP Top 10:** A standard awareness document for developers and web application security detailing the most critical security risks.
- **SDLC:** Software Development Life Cycle.

## Theoretical Framework / Core Concepts

### Network Security Architecture
- **OSI Model Security:** Security controls can be applied at various layers (e.g., MAC filtering at Layer 2, IPsec at Layer 3, TLS at Layer 4/6, WAF at Layer 7).
- **DMZ (Demilitarized Zone):** A physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted network (the Internet).
- **VPN (Virtual Private Network):** Creates a secure, encrypted connection over a less secure network.

### Software Security Concepts
- **Input Validation:** Ensuring all user input is sanitized and validated to prevent injection attacks (SQLi, XSS).
- **Secure SDLC (DevSecOps):** Integrating security checks (SAST, DAST, SCA) into the CI/CD pipeline.
- **Buffer Overflows:** A software vulnerability where a program writes data beyond the allocated memory bounds, potentially leading to arbitrary code execution.

## Worked Examples / Protocol Walkthroughs / Calculations

### TCP Three-Way Handshake & SYN Flood
1. **Normal Handshake:** Client sends `SYN`, Server replies `SYN-ACK`, Client replies `ACK`.
2. **SYN Flood Attack:** Attacker sends thousands of spoofed `SYN` packets. Server allocates memory and replies with `SYN-ACK`, waiting for `ACK`s that never arrive, leading to resource exhaustion.
3. **Mitigation:** SYN Cookies — Server encodes the state into the TCP sequence number rather than allocating memory.

### SQL Injection Example
- Vulnerable Query: `SELECT * FROM users WHERE username = '$user' AND password = '$pass'`
- Attack Input: `user = "admin' --"`
- Executed Query: `SELECT * FROM users WHERE username = 'admin' --' AND password = ''`
- The `--` comments out the password check, granting unauthorized access.

## Summary & Key Takeaways
- Network security relies on layered defense (Firewalls, IDS/IPS, Network Segmentation).
- The OWASP Top 10 highlights critical web vulnerabilities, heavily emphasizing injection and broken authentication.
- Secure coding practices and integrating security into the SDLC are paramount for robust software.

## Multiple Choice Questions
1. Which layer of the OSI model does a traditional packet-filtering firewall operate at?
- **A)** Layer 2
- **B)** Layer 3 and 4
- **C)** Layer 7
- **D)** Layer 1

2. What is the primary purpose of a DMZ?
- **A)** To store internal databases securely
- **B)** To host external-facing services separated from the internal network
- **C)** To encrypt all network traffic
- **D)** To provide remote employee access

3. In the TCP three-way handshake, what is the second packet sent?
- **A)** SYN
- **B)** ACK
- **C)** SYN-ACK
- **D)** FIN

4. Which attack is mitigated by using SYN Cookies?
- **A)** SQL Injection
- **B)** Cross-Site Scripting
- **C)** SYN Flood
- **D)** DNS Spoofing

5. What does SAST stand for in software security?
- **A)** Static Application Security Testing
- **B)** System Architecture Security Tool
- **C)** Standard Application Security Test
- **D)** Secure Architecture and Software Testing

6. Which vulnerability involves an attacker executing malicious scripts in the victim's browser?
- **A)** SQL Injection
- **B)** Cross-Site Scripting (XSS)
- **C)** Buffer Overflow
- **D)** Path Traversal

7. How is SQL Injection best prevented?
- **A)** Encrypting the database
- **B)** Using Parameterized Queries / Prepared Statements
- **C)** Using complex passwords
- **D)** Installing an IPS

8. A buffer overflow attack primarily targets which system component?
- **A)** Hard drive storage
- **B)** Network bandwidth
- **C)** System memory (RAM)
- **D)** CPU caches

9. Which tool is used to monitor network traffic for suspicious activity without blocking it?
- **A)** Firewall
- **B)** IPS
- **C)** IDS
- **D)** WAF

10. Which protocol is typically used to create a secure VPN tunnel over the internet?
- **A)** HTTP
- **B)** FTP
- **C)** IPsec
- **D)** Telnet

### Answer Key & Explanations
1. **B.** Traditional packet filters inspect IP addresses (Layer 3) and ports (Layer 4).
2. **B.** A DMZ isolates internet-facing servers from the internal LAN to prevent internal breaches if a public server is compromised.
3. **C.** The sequence is SYN, SYN-ACK, ACK.
4. **C.** SYN Cookies prevent memory exhaustion on the server during a SYN Flood DDoS attack.
5. **A.** SAST (Static Application Security Testing) analyzes source code for vulnerabilities without executing the program.
6. **B.** XSS allows attackers to inject client-side scripts into web pages viewed by other users.
7. **B.** Parameterized queries ensure that user input is treated strictly as data, not as executable SQL code.
8. **C.** Buffer overflows overwrite adjacent memory locations, often corrupting the stack or heap.
9. **C.** An Intrusion Detection System (IDS) is passive and monitors/alerts, unlike an IPS which actively blocks.
10. **C.** IPsec provides secure, encrypted communication at the network layer, widely used for VPNs.

## References & Navigation

- **Previous Topic:** [[OS Basics and Cryptography]]
- **Next Topic:** [[Vulnerability Assessment and Penetration Testing]]
- **Related Notes:** [[Cybersecurity Awareness]], [[Security]]

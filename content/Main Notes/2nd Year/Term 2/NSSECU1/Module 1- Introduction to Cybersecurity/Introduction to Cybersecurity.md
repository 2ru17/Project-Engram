---
id: introduction_to_cybersecurity
type: note
course: NSSECU1
topic: "Introduction to Cybersecurity"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSSECU1]] #[[Conceptual]] #[[Introduction to Cybersecurity]]

---

## Overview
Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes. This module provides a foundational understanding of the cybersecurity landscape, the CIA Triad, risk management, and basic threat modeling.

## Key Definitions
- **Threat:** Any circumstance or event with the potential to adversely impact organizational operations, assets, or individuals.
- **Vulnerability:** A weakness in an information system, system security procedures, internal controls, or implementation that could be exploited.
- **Risk:** A measure of the extent to which an entity is threatened by a potential circumstance or event.
- **CIA Triad:** The foundational model for information security, consisting of Confidentiality, Integrity, and Availability.

## Theoretical Framework / Core Concepts

### The CIA Triad
The CIA Triad is the core pillar of information security.
- **Confidentiality:** Ensuring that information is not disclosed to unauthorized individuals, entities, or processes (e.g., encryption, access controls).
- **Integrity:** Maintaining and assuring the accuracy and completeness of data over its entire lifecycle (e.g., hashing, digital signatures).
- **Availability:** Ensuring that authorized users have access to information and associated assets when required (e.g., DDoS mitigation, redundancy).

### Risk Management Framework
Risk management involves identifying, assessing, and mitigating risks to an acceptable level.
- **Risk Assessment:** Identifying vulnerabilities and threats.
- **Risk Mitigation:** Implementing controls (preventative, detective, corrective).
- **Risk Acceptance:** Acknowledging the risk and choosing not to implement controls because the cost outweighs the benefit.

## Worked Examples / Protocol Walkthroughs / Calculations

### Threat Modeling Scenario
Consider a web application that stores user data.
1. **Identify the Asset:** User database.
2. **Identify the Threat:** SQL Injection attack by an external hacker.
3. **Identify the Vulnerability:** Lack of input validation on the login form.
4. **Calculate Risk:** Risk = Threat $\times$ Vulnerability $\times$ Impact. High likelihood $\times$ High impact = Critical Risk.
5. **Mitigation:** Implement parameterized queries (prepared statements).

## Summary & Key Takeaways
- Cybersecurity aims to protect the confidentiality, integrity, and availability of information.
- Risk management is an ongoing process of identifying and mitigating threats.
- Threat modeling helps proactively secure systems by thinking from an attacker's perspective.

## Multiple Choice Questions
1. Which of the following is NOT part of the CIA Triad?
    - **A)** Confidentiality
    - **B)** Integrity
    - **C)** Authorization
    - **D)** Availability

2. What does Confidentiality ensure?
    - **A)** Data is accessible when needed
    - **B)** Data is accurate and unaltered
    - **C)** Data is only accessible to authorized individuals
    - **D)** Systems are redundant

3. A weakness in a system that can be exploited is called a:
    - **A)** Threat
    - **B)** Vulnerability
    - **C)** Risk
    - **D)** Exploit

4. Which security control is designed to fix an issue after an incident has occurred?
    - **A)** Preventative
    - **B)** Detective
    - **C)** Corrective
    - **D)** Deterrent

5. What is the formula often used to conceptualize risk?
    - **A)** Risk = Threat $\times$ Vulnerability $\times$ Impact
    - **B)** Risk = Threat + Vulnerability
    - **C)** Risk = Impact / Threat
    - **D)** Risk = Vulnerability - Mitigation

6. Hashing is primarily used to ensure which part of the CIA Triad?
    - **A)** Confidentiality
    - **B)** Integrity
    - **C)** Availability
    - **D)** Non-repudiation

7. Implementing a backup generator is an example of supporting which principle?
    - **A)** Confidentiality
    - **B)** Integrity
    - **C)** Availability
    - **D)** Authentication

8. Threat modeling is best performed during which phase of software development?
    - **A)** Deployment
    - **B)** Maintenance
    - **C)** Design
    - **D)** Incident Response

9. Accepting a risk means:
    - **A)** Implementing all possible controls
    - **B)** Ignoring the risk completely
    - **C)** Acknowledging the risk and choosing not to mitigate it further due to cost-benefit analysis
    - **D)** Transferring the risk to a third party

10. Which of the following best describes an Insider Threat?
    - **A)** A state-sponsored hacker
    - **B)** A script kiddie
    - **C)** A disgruntled employee with valid access
    - **D)** An automated botnet

### Answer Key & Explanations
1. **C.** Authorization is not part of the CIA Triad; the triad consists of Confidentiality, Integrity, and Availability.
2. **C.** Confidentiality ensures that only authorized individuals can view or access the data.
3. **B.** A vulnerability is a flaw or weakness in system security procedures, design, implementation, or internal controls.
4. **C.** Corrective controls aim to restore the system to normal operations after an incident.
5. **A.** Risk is commonly understood as a function of threats exploiting vulnerabilities to cause impact.
6. **B.** Hashing creates a unique mathematical representation of data, which verifies that the data has not been altered (Integrity).
7. **C.** Backup generators ensure systems remain online during power failures, supporting Availability.
8. **C.** Threat modeling is most effective during the design phase to build security in from the start.
9. **C.** Risk acceptance is a formal process of understanding a risk and deciding that the cost of mitigation outweighs the potential loss.
10. **C.** An insider threat involves an individual who has legitimate access to the organization's network, systems, or data.

## References & Navigation

- **Next Topic:** [[OS Basics and Cryptography]]
- **Related Notes:** [[Cybersecurity Awareness]], [[Security]]

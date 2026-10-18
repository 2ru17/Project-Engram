---
id: nssecu1_defensive_security_quiz
type: note
course: NSSECU1
topic: "NSSECU1 Defensive Security Quiz"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSSECU1]] #[[Conceptual]] #[[Quiz]] #[[Defensive Security]]

---

## Overview
This document contains the curated 15-item quiz for the Defensive Security topic of NSSECU1. It covers fundamental concepts of Security Operations Centers (SOC), security controls, data privacy laws (RA 10173), malware classification, and historical cyber incidents.

---

## Multiple Choice Questions

**Instructions:** Choose the letter of the best answer for each item.

1. Which of the following BEST describes the primary goal of a Security Operations Center (SOC)?
    - **A)** Performing penetration tests against external clients
    - **B)** Developing new software vulnerabilities for research
    - **C)** Protecting, monitoring, identifying, and eliminating threats in an organization's IT systems
    - **D)** Managing human resources and employee training programs

2. A SOC analyst receives an alert from the SIEM platform about multiple failed login attempts on a critical server. Which tool MOST LIKELY generated this alert?
    - **A)** msfvenom
    - **B)** Nmap
    - **C)** An Intrusion Detection System (IDS)
    - **D)** A vulnerability scanner

3. Which type of security control is an Intrusion Detection System (IDS) classified as, based on its functionality?
    - **A)** Deter
    - **B)** Prevent
    - **C)** Detect
    - **D)** Recover

4. An organization deploys physical access controls, logical/technical controls, and administrative controls in layers so that if one layer is breached, the attacker is stopped by the next. What strategy does this describe?
    - **A)** Zero Trust Architecture
    - **B)** Defense in Depth
    - **C)** Vulnerability Management
    - **D)** Incident Response Planning

5. An employee is required to agree to a document that outlines what they can and cannot do when using the company's computers and network resources. What type of document is this?
    - **A)** Non-Disclosure Agreement (NDA)
    - **B)** Service Level Agreement (SLA)
    - **C)** Memorandum of Understanding (MOU)
    - **D)** Acceptable Use Policy (AUP)

6. A company enters into a legal contract with a partner firm, restricting both parties from sharing confidential information obtained during their collaboration. What type of agreement is this?
    - **A)** Acceptable Use Policy (AUP)
    - **B)** Non-Disclosure Agreement (NDA)
    - **C)** Memorandum of Understanding (MOU)
    - **D)** Service Level Agreement (SLA)

7. Republic Act No. 10173, also known as the Data Privacy Act of 2012, was signed into law in the Philippines to protect personal data. Which of the following violations carries the HIGHEST maximum fine for Sensitive Personal Information (SPI)?
    - **A)** Improper Disposal
    - **B)** Unauthorized Disclosure
    - **C)** Combination or Series of Acts
    - **D)** Unauthorized Processing

8. Which international standard specifically provides requirements for establishing, implementing, and maintaining an Information Security Management System (ISMS)?
    - **A)** NIST SP 800-53
    - **B)** ISO/IEC 27002
    - **C)** ISO/IEC 27001
    - **D)** NIST Cybersecurity Framework

9. A type of malware self-replicates and spreads across a network without requiring any user interaction. Which malware type is this?
    - **A)** Trojan Horse
    - **B)** Ransomware
    - **C)** Virus
    - **D)** Worm

10. CryptoMalware is considered a new generation of ransomware. What is its defining characteristic that differentiates it from traditional ransomware?
    - **A)** It steals credentials by recording keystrokes
    - **B)** It encrypts the victim's data files and demands payment for the decryption key
    - **C)** It replicates itself across the network without user interaction
    - **D)** It disguises itself as a legitimate program to trick users into installing it

11. A security analyst receives a suspicious email with the subject "URGENT: Validate your account immediately." The email is addressed to "Dear user," contains a link to an unfamiliar website, and threatens account deactivation. Which characteristic of this email is the STRONGEST indicator of a phishing attempt?
    - **A)** The email has a subject line
    - **B)** The email contains a link
    - **C)** The combination of urgency, generic greeting, threat, and suspicious link
    - **D)** The email was sent during business hours

12. A malware embeds its starting code into the boot sector of a storage device, activating before the operating system loads. What type of virus is this?
    - **A)** Program Virus
    - **B)** Macro Virus
    - **C)** Script Virus
    - **D)** Boot Sector Virus

13. Which of the following online tools allows a security analyst to scan a suspicious URL or file hash against multiple antivirus engines simultaneously?
    - **A)** Shodan
    - **B)** VirusTotal
    - **C)** OpenVAS
    - **D)** Nessus

14. The ILOVEYOU worm caused an estimated $5.5 to $8.7 billion in damages worldwide. Where did this worm originate?
    - **A)** China
    - **B)** Russia
    - **C)** The Philippines
    - **D)** United States

15. Which of the following is NOT included in the RA 10173 compliance checklist under "Manage Security Risks"?
    - **A)** Firewalls used
    - **B)** Vulnerability Assessment
    - **C)** Designating a Data Protection Officer (DPO)
    - **D)** Audit logs

### Answer Key & Explanations

1. **C**. The SOC team's core function is to protect, monitor, identify, and eliminate threats in an organization's IT systems. It is the defensive frontline of cybersecurity operations.
2. **C**. An IDS (Intrusion Detection System) is designed to detect and alert on suspicious activity such as repeated login failures. SIEM platforms aggregate these alerts from tools like IDS.
3. **C**. IDS is classified under the Detect functionality — it is intended to detect incidents. It does not prevent or correct them on its own.
4. **B**. Defense in Depth is the strategy of using multiple layered security controls so that if one layer is breached, the next layer contains the attacker.
5. **D**. An Acceptable Use Policy (AUP) defines what a user can and cannot do when using company computing resources, whether on a company-provided or personal device.
6. **B**. A Non-Disclosure Agreement (NDA) is a legal contract between parties that restricts the sharing of confidential information obtained during their relationship.
7. **C**. A Combination or Series of Acts carries the highest penalty under RA 10173 — imprisonment of 3 to 6 years and a fine of up to 5,000,000 pesos for SPI.
8. **C**. ISO/IEC 27001 specifies the requirements for establishing and maintaining an ISMS. ISO 27002 provides best practice recommendations but does not set formal requirements.
9. **D**. A worm self-replicates and spreads across a network without requiring any user interaction. A virus requires a user to execute a program to spread.
10. **B**. CryptoMalware's defining trait is that it encrypts the victim's data files and demands payment for the decryption key, while leaving the operating system running.
11. **C**. The combination of urgency, a generic greeting, a threat of account deactivation, and a suspicious link together are the strongest composite indicators of a phishing email.
12. **D**. A Boot Sector Virus embeds its code in the boot sector of a storage device, activating before the OS loads. The example given in the lecture was the "Stoned" virus from 1987.
13. **B**. VirusTotal allows analysts to scan suspicious files, URLs, domains, and IP addresses against multiple antivirus engines simultaneously. It also supports hash value searches.
14. **C**. The ILOVEYOU worm originated in the Pandacan neighborhood of Manila, Philippines on May 4, 2000, and spread globally within hours.
15. **C**. Designating a Data Protection Officer (DPO) falls under compliance checklist item 1: Establish Data Privacy Governance — not under Manage Security Risks.

## References & Navigation

- **Related Notes:** [[Defensive Security]]

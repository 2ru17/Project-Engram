---
id: defensive_security_and_soc_operations
type: note
course: NSSECU1
topic: "Defensive Security and SOC Operations"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSSECU1]] #[[Conceptual]] #[[Defensive Security]] #[[SOC]]

---

## Overview
Defensive security focuses on maintaining a robust security posture to prevent, detect, and respond to cyber threats. The Security Operations Center (SOC) is the centralized function within an organization responsible for continuously monitoring and analyzing security posture.

## Key Definitions
- **SOC (Security Operations Center):** A centralized team and facility responsible for monitoring, detecting, analyzing, and responding to cybersecurity incidents.
- **SIEM (Security Information and Event Management):** Software that aggregates and analyzes activity from many different resources across an IT infrastructure.
- **Incident Response (IR):** A structured approach to handling cybersecurity breaches or incidents.
- **Threat Hunting:** Proactively searching through networks to detect and isolate advanced threats that evade existing security solutions.

## Theoretical Framework / Core Concepts

### SOC Functions and Tiers
- **Tier 1 (Triage/Alert Analysis):** Monitors SIEM alerts, performs initial triage, and escalates true positives.
- **Tier 2 (Incident Response):** Deep-dive analysis of escalated incidents, containment, and eradication planning.
- **Tier 3 (Threat Hunting/Malware Analysis):** Proactive hunting, reverse engineering, and advanced forensics.

### NIST Incident Response Lifecycle
1. **Preparation:** Establishing policies, tools, and training before an incident occurs.
2. **Detection & Analysis:** Identifying signs of an incident and determining its scope and severity.
3. **Containment, Eradication, & Recovery:** Stopping the spread, removing the threat, and restoring systems.
4. **Post-Incident Activity (Lessons Learned):** Documenting what happened and improving processes.

## Worked Examples / Protocol Walkthroughs / Calculations

### SIEM Alert Triage Workflow
1. **Alert Generation:** SIEM flags "Multiple Failed Logins from IP 203.0.113.5".
2. **Enrichment:** Tier 1 analyst checks Threat Intelligence feeds; IP is known for SSH brute-forcing.
3. **Validation:** Analyst checks server logs to see if a successful login followed the failures.
4. **Escalation/Action:** If no successful login, block IP at firewall. If successful, escalate to Tier 2 for compromised account containment.

## Summary & Key Takeaways
- The SOC is the heart of an organization's defensive capabilities, relying heavily on SIEM technology.
- Effective Incident Response is cyclical and emphasizes Preparation and Lessons Learned.
- Defensive security requires a shift from purely reactive alert-handling to proactive threat hunting.

## Multiple Choice Questions
1. What is the primary function of a Security Operations Center (SOC)?
    - **A)** Developing secure software
    - **B)** Performing authorized penetration tests
    - **C)** Protecting, monitoring, identifying, and eliminating threats
    - **D)** Managing IT infrastructure and cabling

2. Which technology is central to a SOC for aggregating and analyzing log data?
    - **A)** IDS
    - **B)** SIEM
    - **C)** Firewall
    - **D)** VPN

3. In a typical SOC hierarchy, which tier is responsible for initial alert triage?
    - **A)** Tier 1
    - **B)** Tier 2
    - **C)** Tier 3
    - **D)** Tier 4

4. Proactively searching networks for threats that bypass standard security controls is called:
    - **A)** Penetration Testing
    - **B)** Vulnerability Scanning
    - **C)** Threat Hunting
    - **D)** Patch Management

5. According to the NIST Incident Response lifecycle, what is the first phase?
    - **A)** Detection and Analysis
    - **B)** Preparation
    - **C)** Containment
    - **D)** Post-Incident Activity

6. Which phase of IR involves isolating a compromised host from the network?
    - **A)** Preparation
    - **B)** Detection
    - **C)** Containment
    - **D)** Recovery

7. What is an Indicator of Compromise (IoC)?
    - **A)** A firewall policy rule
    - **B)** A piece of forensic data that identifies potentially malicious activity
    - **C)** A software patch
    - **D)** A security policy document

8. After resolving a major security incident, the team holds a meeting to discuss what went wrong and how to improve. Which phase is this?
    - **A)** Preparation
    - **B)** Containment
    - **C)** Eradication
    - **D)** Post-Incident Activity

9. What does SOAR stand for in the context of modern SOC operations?
    - **A)** Security Operations and Assessment Reporting
    - **B)** Security Orchestration, Automation, and Response
    - **C)** System Optimization and Alert Resolution
    - **D)** Secure Online Authentication Register

10. A SOC analyst receives an alert for a known malware hash. Which system most likely generated this specific alert?
    - **A)** Network Router
    - **B)** Endpoint Detection and Response (EDR) / Antivirus
    - **C)** Load Balancer
    - **D)** DHCP Server

### Answer Key & Explanations
1. **C.** The SOC is responsible for the continuous monitoring and defense of the organization's IT systems.
2. **B.** SIEM (Security Information and Event Management) platforms collect and correlate logs from across the enterprise.
3. **A.** Tier 1 analysts handle the initial influx of alerts and determine if they are false positives or require escalation.
4. **C.** Threat Hunting is a proactive, analyst-driven process to find hidden threats.
5. **B.** Preparation (having plans, tools, and training ready) is the first and most critical phase.
6. **C.** Containment aims to stop the spread of an incident, such as disconnecting a compromised machine from the network.
7. **B.** IoCs (like malicious IPs, domains, or file hashes) are evidence that a breach has occurred.
8. **D.** Post-Incident Activity (Lessons Learned) focuses on improving future response efforts based on past incidents.
9. **B.** SOAR tools help automate repetitive SOC tasks and orchestrate responses across multiple security tools.
10. **B.** Antivirus and EDR solutions running on endpoints are responsible for identifying malicious files by their hash values.

## References & Navigation

- **Previous Topic:** [[Vulnerability Assessment and Penetration Testing]]
- **Next Topic:** [[Capture the Flag and Applied Security]]
- **Related Notes:** [[Cybersecurity Awareness]], [[Security]]

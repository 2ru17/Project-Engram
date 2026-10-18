---
id: attack_path_development
type: note
course: NSSECU2
topic: "Attack Path Development"
status: completed
---

# Attack Path Development

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSSECU2]] #[[Cybersecurity]] #[[Attack Path Development]] #[[Threat Modeling]] #[[Exploit Matching]] #[[Searchsploit]] #[[CVE]]

---

## Overview

> Attack path development is the strategic analytical process of correlating fragmented discoveries from reconnaissance, network scanning, enumeration, and vulnerability identification into coherent, prioritized chains of exploitation. Rather than firing automated exploits randomly, an ethical security analyst rigorously evaluates technical preconditions, software compatibility, operating system dependencies, and business impact. By establishing non-destructive validation plans and stopping conditions, practitioners verify real-world risk while ensuring the operational stability of target infrastructure.

## Key Definitions

- **Attack Path (Attack Chain):** A logical sequence of adversarial steps connecting an external entry point or initial weakness to the ultimate compromise of a critical business asset (e.g., External Recon $\rightarrow$ Unauthenticated API $\rightarrow$ Credential Disclosure $\rightarrow$ SSH Login $\rightarrow$ Local Root Escalation).
- **Threat Modeling:** A structured approach to identifying, quantifying, and addressing the security risks and attack vectors associated with an application or system architecture.
- **Exploit Matching:** The disciplined verification process of confirming whether a publicly available exploit script or technique exactly matches the target's software version, operating system, compilation architecture, and active configuration.
- **Proof of Concept (PoC):** A minimal, demonstrative script or manual procedure proving that a theoretical vulnerability is genuinely exploitable without causing denial of service or data loss.
- **Non-Destructive Validation:** A testing methodology designed to confirm vulnerability exploitability through benign actions (e.g., executing `whoami`, `id`, or reading non-sensitive environment variables) rather than altering databases, corrupting file systems, or rebooting daemons.
- **Stop Condition:** A predefined operational boundary or threshold that, once reached, dictates immediate cessation of testing on a target component to prevent accidental system outages or data corruption.

## Theoretical Framework / Core Concepts

### 1. Multi-Clue Evidence Correlation

Professional penetration testing relies on converging evidence across multiple assessment stages:

```text
+-----------------------------------------------------------------------------------+
|                         ATTACK PATH CORRELATION PIPELINE                          |
+-----------------------------------------------------------------------------------+
|  [Reconnaissance]    -> Discovers staging subdomain: `staging.portal.target.com`   |
|         |                                                                         |
|  [Network Scanning]  -> Identifies TCP/8080 open; filtered TCP/22 SSH             |
|         |                                                                         |
|  [Enumeration]       -> Web header reveals `Apache Tomcat 9.0.31`; `/manager/html`|
|         |               returns HTTP 401 Basic Auth                               |
|  [Vuln Assessment]   -> Default credential list includes `tomcat:s3cret`          |
|         |                                                                         |
|  [Attack Path Plan]  -> Attempt non-destructive manager login; deploy test WAR    |
|                         package executing `id`; establish unprivileged shell.     |
+-----------------------------------------------------------------------------------+
```

### 2. The Correlation Matrix

A correlation table systematically organizes observations, interpretations, and hypotheses:

| Observation Source | Technical Clue Observed | Technical Interpretation | Follow-Up Test / Hypothesis |
| :--- | :--- | :--- | :--- |
| **Nmap Scan** | TCP/3306 open to public internet | MySQL database bound to `0.0.0.0` instead of `127.0.0.1` | Check for default `root` account with empty password or anonymous access. |
| **Gobuster Fuzz** | Discovered `/api/v1/debug_logs` (200 OK) | Internal logging endpoint accidentally exposed | Inspect log contents for session tokens, database connection strings, or system paths. |
| **cURL Banner** | `OpenSSH 7.2p2 Ubuntu 4ubuntu2.8` | Ubuntu Xenial (16.04 LTS); legacy kernel potential | If local access achieved, evaluate kernel privilege escalation (e.g., Dirty COW). |
| **Burp Repeater** | `X-Custom-Auth-Bypass: true` changes 403 to 200 | Upstream reverse proxy misconfiguration | Verify if administrative API routes can be fully invoked without valid session cookies. |

### 3. The 6-Point Exploit Matching Checklist

Before executing any exploit code, an analyst must verify all six prerequisites:

```text
+-----------------------------------------------------------------------------------+
|                     6-POINT EXPLOIT MATCHING CHECKLIST                            |
+-----------------------------------------------------------------------------------+
|  [ ] 1. EXACT PRODUCT MATCH                                                       |
|         Target must run the exact software daemon (e.g., vsftpd != ProFTPD).      |
+-----------------------------------------------------------------------------------+
|  [ ] 2. VERSION VULNERABILITY RANGE                                               |
|         Target version must fall strictly within the vulnerable release window.   |
+-----------------------------------------------------------------------------------+
|  [ ] 3. OS & ARCHITECTURE COMPATIBILITY                                           |
|         Target OS (Linux x86_64 vs Windows x86) must match exploit shellcode/APIs.|
+-----------------------------------------------------------------------------------+
|  [ ] 4. REQUIRED MODULES / CONFIGURATIONS ACTIVE                                  |
|         Specific vulnerable plugin or setting (e.g., `mod_cgi` enabled) must exist.|
+-----------------------------------------------------------------------------------+
|  [ ] 5. AUTHENTICATION & ACCESS PRECONDITIONS MET                                |
|         Exploit prerequisites (e.g., anonymous login, low-priv account) satisfied.|
+-----------------------------------------------------------------------------------+
|  [ ] 6. NON-DESTRUCTIVE PROOF & SAFETY VERIFIED                                   |
|         Code reviewed line-by-line; payload replaces destructive shellcode with   |
|         benign evidence gathering (`id`, `whoami`).                               |
+-----------------------------------------------------------------------------------+
```

### 4. Prioritization Matrix (Evidence Strength vs. Potential Impact)

Prioritizing attack paths optimizes engagement time and delivers the highest risk findings first:

```text
               High Impact
                   ^
                   |
   [ RESEARCH MORE ] |  [ VALIDATE FIRST (Priority 1) ]
   - Weak evidence   |  - Strong, verified evidence
   - High potential  |  - High system impact
   - Complex exploit |  - Direct RCE / Auth Bypass
   -----------------+----------------------------------> Strong Evidence
   [ PARK / IGNORE ] |  [ VALIDATE LATER (Priority 2) ]
   - Weak evidence   |  - Strong evidence
   - Low impact      |  - Low/Medium impact
   - Speculative CVE |  - Information disclosure / Self-XSS
                   |
               Low Impact
```

## Exploit Research Tooling & Command Protocols

Ethical hackers leverage structured vulnerability repositories and offline CLI tools to locate exploit code:

```bash
# 1. Searchsploit Exact Title & Version Search
searchsploit "Apache 2.4.41"
searchsploit "vsftpd 2.3.4"
searchsploit "WordPress Plugin Contact Form 7"

# 2. Inspect Exploit Source Code & Explanatory Metadata
searchsploit -x 42024.py

# 3. Mirror Exploit Script to Current Working Directory
searchsploit -m 42024.py

# 4. Display Exploit-DB Web URL for Further Research
searchsploit -p 42024
```

- **NVD (National Vulnerability Database):** Authoritative database providing standardized CVSS metrics, vulnerability descriptions, and affected CPEs.
- **Exploit-DB:** A public repository of exploit scripts, PoCs, and vulnerable software archives maintained by OffSec.
- **Searchsploit:** The official offline command-line search utility for Exploit-DB, enabling fast offline querying during air-gapped or restricted assessments.
- **Rapid7 Vulnerability Database:** Comprehensive repository detailing Metasploit module coverage and remediation advice.

## Structured Validation Plan Architecture

Every candidate attack path requires a formal validation plan before execution:

```text
================================================================================
VALIDATION PLAN: CANDIDATE AP-01
================================================================================
Suspected Issue:      Unauthenticated Remote Code Execution via Exposed Redis CLI
Affected Target:      192.168.10.45:6379 (Redis 5.0.7)
Supporting Evidence:  1. Nmap confirms TCP/6379 is OPEN.
                      2. `nc -vn 192.168.10.45 6379` responded to `PING` with `+PONG`.
                      3. No password authentication configured (Null Auth).

Safe Validation Step: 1. Connect via `redis-cli -h 192.168.10.45`.
                      2. Query benign configuration: `INFO server` to confirm version.
                      3. Check working directory: `CONFIG GET dir`.
                      4. DO NOT overwrite `authorized_keys` or write PHP webshells.

Expected Proof:       Capture `redis-cli` output showing `redis_version:5.0.7` and
                      `role:master` without authentication prompt.

Stop Condition:       If Redis requires `AUTH <password>`, stop immediately; do NOT
                      attempt automated brute-force without client sign-off.
================================================================================
```

## Common Pitfalls & Operational Restraint

- **The Title-Matching Fallacy:** Finding a searchsploit entry for `Apache 2.4.x` and executing it without verifying whether the vulnerability requires a specific non-standard module (e.g., `mod_lua` or `mod_proxy_fcgi`) that is not installed on the target.
- **Blind Execution of Untrusted Exploits:** Running uninspected Python, C, or Perl scripts downloaded from GitHub or Exploit-DB. Many public exploits contain embedded backdoors, hardcoded malicious IPs, or unhandled exceptions that crash the target server.
- **Overclaiming Unvalidated Flaws:** Documenting an issue as "Remote Code Execution Confirmed" in a client report when only an open port was observed.
- **Neglecting Target Availability:** Executing denial-of-service payloads (e.g., memory exhaustion or thread deadlocks) during production assessments.

## Multiple Choice Questions

1. What is the primary purpose of developing an Attack Path rather than running random automated exploit modules?
    - **A)** To increase the number of network packets transmitted per second
    - **B)** To logically correlate multi-stage evidence, verify preconditions, minimize system instability, and achieve demonstrable proof of business risk
    - **C)** To avoid generating written documentation
    - **D)** To permanently delete the target's operating system

2. Which condition in the 6-Point Exploit Matching Checklist ensures that a compiled buffer overflow exploit will execute valid CPU instructions on the target host?
    - **A)** Operating System and Architecture Compatibility (e.g., Linux x86_64 vs Windows x86)
    - **B)** Product Title Match
    - **C)** Color of the Terminal Text
    - **D)** Domain Name Registration Expiration Date

3. An analyst uses the command `searchsploit -m 50123.py`. What does the `-m` flag perform?
    - **A)** It automatically compiles and executes the script against `localhost`.
    - **B)** It mails the exploit to the system administrator.
    - **C)** It mirrors (copies) the exploit script directly into the current working directory for safe code review and modification.
    - **D)** It deletes the exploit from Exploit-DB.

4. In the Prioritization Matrix, what priority tier should be assigned to an attack path with Strong Supporting Evidence and High Potential Impact (e.g., verified unauthenticated RCE)?
    - **A)** Park / Ignore
    - **B)** Validate Later (Priority 2)
    - **C)** Research More
    - **D)** Validate First (Priority 1)

5. Why must an ethical hacker inspect the source code of a public exploit script line-by-line before running it against a client target?
    - **A)** To translate the programming language into HTML
    - **B)** To verify that the script does not contain destructive actions (e.g., `rm -rf /`), unhandled memory crashes, or backdoored payloads
    - **C)** To verify that the exploit contains at least 10,000 lines of code
    - **D)** To remove all comments and variable names

6. What is a "Stop Condition" in the context of a penetration testing validation plan?
    - **A)** The moment when the tester shuts down their laptop for lunch
    - **B)** An operating system command that disables all CPU interrupts
    - **C)** A predetermined operational boundary where testing halts immediately if unexpected behavior, errors, or risks of disruption occur
    - **D)** The expiration of the client's commercial software license

7. An analyst discovers an open port 8080 running Jenkins. Nmap scripts report the version as `Jenkins 2.121.1`. Searchsploit reveals an unauthenticated RCE exploit (CVE-2018-1000861). What is the safest non-destructive validation step?
    - **A)** Send a benign pre-flight probe or execute a non-destructive command (e.g., `whoami` or `id`) to confirm code execution without modifying job configurations
    - **B)** Format the hard drive of the Jenkins server
    - **C)** Immediately delete all client build pipelines and user accounts
    - **D)** Disconnect the client's data center power supply

8. What mistake is made when a tester assumes a server is vulnerable to a remote exploit simply because the base software version matches, without checking if the required vulnerable module is loaded?
    - **A)** Reverse Shell Pivoting
    - **B)** Correct Threat Modeling
    - **C)** Thorough Enumeration
    - **D)** Title-Matching Fallacy

### Answer Key & Explanations

1. **B**. **Attack Path Development** provides a structured, evidence-based methodology that logically links verified clues, respects operational safety, and demonstrates genuine business impact.
2. **A**. **Architecture compatibility** (CPU instruction set, bitness, and OS system call conventions) is essential; running x86 shellcode on an ARM or x86_64 architecture results in instant segmentation faults and daemon crashes.
3. **C**. The **`-m` (mirror)** flag in `searchsploit` copies the specified exploit file into the current working directory, enabling offline code auditing and customization.
4. **D**. High potential impact combined with strong supporting evidence represents the highest risk finding and must be **Validated First (Priority 1)**.
5. **B**. Public exploit code must always be **manually audited** to ensure it contains no destructive payload commands, rogue network callbacks, or unhandled exceptions that could crash production systems.
6. **C**. A **Stop Condition** protects client assets by defining unambiguous criteria (e.g., authentication prompts, error codes, service slowdowns) that halt the exploit attempt before collateral damage occurs.
7. **A**. **Non-destructive validation** proves exploitability through benign execution (e.g., `whoami` or `id`), capturing timestamped evidence while preserving system state.
8. **D**. The **Title-Matching Fallacy** occurs when an analyst assumes an exploit will succeed based purely on version text matching, ignoring prerequisites such as optional modules or operating system dependencies.

## References & Navigation

- **Previous Topic:** [[Vulnerability Identification and CVSS Scoring]]
- **Next Topic:** [[Authentication Weakness Testing]]
- **Related Notes:** [[Vulnerability Identification and CVSS Scoring]], [[Exploitation Workflow with Metasploit]]

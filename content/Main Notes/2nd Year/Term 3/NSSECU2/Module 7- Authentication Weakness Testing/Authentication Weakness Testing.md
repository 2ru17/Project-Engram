---
id: authentication_weakness_testing
type: note
course: NSSECU2
topic: "Authentication Weakness Testing"
status: completed
---

# Authentication Weakness Testing

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSSECU2]] #[[Cybersecurity]] #[[Authentication]] #[[Password Attacks]] #[[Hash Cracking]] #[[Hydra]] #[[Hashcat]] #[[John The Ripper]]

---

## Overview

> Authentication mechanisms serve as the primary security barrier protecting system entry points, APIs, and administrative interfaces. When authentication controls fail—whether through default factory credentials, predictable account naming conventions, vulnerability to automated password spraying, weak cryptographic hashing, or broken session handling—adversaries gain illegitimate access without needing to exploit low-level memory vulnerabilities. Ethical security testing systematically evaluates authentication resilience across network protocols and web applications while strictly avoiding account lockouts and business disruption.

## Key Definitions

- **Authentication:** The process of verifying the claimed identity of a user, process, or device (e.g., verifying username and password credentials).
- **Authorization:** The process of determining the specific access privileges, operations, and resources an authenticated identity is permitted to perform.
- **Default Credentials:** Standard factory-configured username and password combinations shipped with hardware daemons or software frameworks (e.g., `admin:admin`, `root:toor`, `cisco:cisco`, `tomcat:s3cret`).
- **Brute-Force Attack:** An exhaustive online or offline attack that attempts all possible character combinations or large wordlist entries against a target authentication interface.
- **Password Spraying:** A horizontal authentication attack that tests a single common password (e.g., `Spring2026!`, `Welcome123`) across hundreds or thousands of unique usernames to bypass account lockout thresholds.
- **Username Enumeration:** An information disclosure flaw where an application reveals whether a specific username exists in the system through differential error messages, status codes, or response times.
- **Offline Hash Cracking:** The computationally intensive process of calculating cryptographic hashes of candidate passwords on a local machine and comparing them against captured hash values without interacting with the target network.
- **Session Fixation:** An attack where an adversary forces a victim to use a known session identifier, enabling the attacker to hijack the session once the victim authenticates.

## Theoretical Framework / Core Concepts

### 1. Authentication vs. Authorization Paradigm

A fundamental principle in security architecture is separating identity verification from access rights:

```text
+-----------------------------------------------------------------------------------+
|                        ACCESS CONTROL SYSTEM ARCHITECTURE                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ UNKNOWN USER ]  ====== 1. Authentication (Who are you?) ======> [ VALID USER ]  |
|                                                                         |         |
|                                                               2. Authorization    |
|                                                              (What can you do?)   |
|                                                                         |         |
|  [ ACCESS GRANTED: Standard Dashboard ] <---- [ Role: User ] <----------+         |
|  [ ACCESS DENIED:  Admin Config ]                                       |         |
|                                                                 [ Role: Admin ]   |
|                                                                         |         |
|  [ ACCESS GRANTED: Admin Config ] <-------------------------------------+         |
+-----------------------------------------------------------------------------------+
```

### 2. Username Enumeration Dynamics

Applications frequently leak user identity information through subtle response discrepancies:

```text
================================================================================
CASE A: VULNERABLE LOGIN PORTAL (EXPOSES USER EXISTENCE)
================================================================================
Request 1: Submit username `alice` (Valid user) + wrong password
Response:  "Invalid password for user alice." (HTTP 200 / Length: 1420 bytes / Time: 180ms)

Request 2: Submit username `unknown_user` (Invalid user) + wrong password
Response:  "User does not exist." (HTTP 200 / Length: 1380 bytes / Time: 25ms)

ANALYSIS:  Attacker easily enumerates all valid employee usernames based on response text,
           status length, or server execution time!

================================================================================
CASE B: SECURE, HARDENED LOGIN PORTAL
================================================================================
Request 1 (Valid User / Bad Pass)   -> "Invalid login credentials." (Time: 200ms)
Request 2 (Invalid User / Bad Pass) -> "Invalid login credentials." (Time: 200ms)
```

### 3. Password Attack Paradigms: Brute Force vs. Password Spraying

Modern defensive architectures implement account lockout policies (e.g., lock account after 5 failed attempts within 10 minutes). Attackers adapt their methodologies accordingly:

```text
TRADITIONAL BRUTE FORCE (VERTICAL ATTACK)
Target: 1 User (e.g. `admin`)
Attempts: Pass1, Pass2, Pass3, Pass4, Pass5 ---> [ ACCOUNT LOCKED! ALARM TRIGGERED! ]

PASSWORD SPRAYING (HORIZONTAL ATTACK)
Password: `Company2026!`
Target: 1,000 corporate usernames
- User 1:  Attempt 1 -> Failed
- User 2:  Attempt 1 -> Failed
- User 3:  Attempt 1 -> SUCCESS! [ ACCESS ACHIEVED! 0 LOCKOUTS TRIGGERED! ]
...
- User 1000: Attempt 1
```

### 4. Session Security & Cookie Lifecycle Attributes

Once authenticated, web applications issue session tokens (typically stored in HTTP cookies). Security attributes protect these tokens from theft:

| Cookie Attribute | Security Function & Protection Mechanism |
| :--- | :--- |
| **`HttpOnly`** | Prevents client-side scripts (JavaScript `document.cookie`) from accessing the cookie; direct mitigation against session theft via Cross-Site Scripting (XSS). |
| **`Secure`** | Instructs the browser to transmit the cookie exclusively over encrypted HTTPS connections, preventing cleartext interception over insecure Wi-Fi/networks. |
| **`SameSite=Strict`** | Restricts cookie transmission entirely to first-party requests originating from the same domain; robust defense against Cross-Site Request Forgery (CSRF). |
| **`SameSite=Lax`** | Default modern browser behavior; allows cookies on top-level GET navigations from external sites while blocking on cross-site POST requests. |

## Tooling & Command Protocols

### 1. Online Protocol Authentication Testing

Online tools test credentials directly against live network daemons (SSH, FTP, HTTP, SMB, RDP):

```bash
# 1. Hydra: Online SSH Password Brute-Force with Rate Control
hydra -l admin -P /usr/share/wordlists/rockyou.txt -t 4 -f 192.168.10.45 ssh

# 2. Hydra: Web Form POST Authentication Testing
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.10.45 http-post-form \
  "/login.php:username=^USER^&password=^PASS^&Login=Login:Invalid password" -f

# 3. CrackMapExec / NetExec: Multi-Host SMB Credential Validation
crackmapexec smb 192.168.10.0/24 -u users.txt -p "Summer2026!" --continue-on-success

# 4. Anonymous SMB File Share Enumeration
smbclient -L //192.168.10.45/ -N
```

- `-l <user>`: Target single username.
- `-P <path>`: Path to password dictionary.
- `-t <threads>`: Number of concurrent connection threads (keep low to avoid DoS).
- `-f`: Exit immediately upon finding the first valid credential pair.
- `-N`: No password (null/guest session).

### 2. Custom Wordlist Engineering

Target-specific wordlists are dramatically more effective than generic dictionaries:

```bash
# Generate Custom Wordlist by Scraping Target Corporate Website
cewl https://target.com -d 2 -m 6 -w custom_wordlist.txt

# Append Common Password Mutation Rules via Hashcat / John
# e.g., TargetWord2026!, TargetWord123
```

- `cewl`: Custom Word List generator; spider client website to depth `-d 2` extracting words with minimum length `-m 6`.

### 3. Offline Cryptographic Hash Cracking

When password hashes are extracted from databases, LDAP directories, or SAM databases, cracking is conducted entirely offline on GPU/CPU clusters:

```bash
# 1. Identify Hash Algorithm / Format
hashid "098f6bcd4621d373cade4e832627b4f6"

# 2. John the Ripper: Fast Hash Cracking with Wordlist
john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-md5 hashes.txt
john --show --format=raw-md5 hashes.txt

# 3. Hashcat: GPU-Accelerated Hash Cracking
# Mode 0 = MD5, Mode 1000 = NTLM, Mode 1800 = sha512crypt (Linux /etc/shadow)
hashcat -m 1000 -a 0 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt -O
```

- `-m <mode>`: Hash type identifier in Hashcat (`0` = MD5, `1000` = NTLM, `1800` = SHA-512).
- `-a 0`: Straight dictionary attack mode.
- `-O`: Enable optimized GPU kernel routines for maximum candidate throughput.

## Evidence Documentation & Safe Testing Rules

Ethical testers must document valid credential discoveries with extreme care:

```text
================================================================================
AUTHENTICATION VULNERABILITY EVIDENCE
================================================================================
Vulnerability:       Default Administrative Credentials on Embedded Web UI
Affected URL:        http://192.168.10.45:8080/admin/
Discovered Pair:     admin : admin
Role / Authority:    Full System Administrator

Safe Proof:          Logged in using verified credentials; captured administrative
                     dashboard banner showing `Role: SuperAdmin` and firmware `v1.4`.
                     NO configuration changes or user account modifications performed.
================================================================================
```

> [!important] PII and Credential Redaction
> Never paste plaintext client customer passwords, full Social Security numbers, or credit card records into reports or unencrypted scratchpads. Redact sensitive characters (e.g., `Pa55w0rd!123` $\rightarrow$ `Pa55********`).

## Defensive Countermeasures

- **Multi-Factor Authentication (MFA):** Enforce time-based one-time password (TOTP) or hardware FIDO2 tokens on all public interfaces.
- **Account Lockout & Progressive Delays:** Enforce temporary lockouts after 5 consecutive failures and introduce exponential delays between failed attempts.
- **Generic Error Responses:** Always return neutral error messages (e.g., `"Invalid email or password"`) to eliminate username enumeration.
- **Secure Hash Storage:** Hash passwords using modern, memory-hard key derivation functions: **Argon2id**, **bcrypt**, or **PBKDF2** with high work factors.

## Multiple Choice Questions

1. How does a Password Spraying attack successfully circumvent account lockout policies?
    - **A)** By attempting thousands of different passwords against a single administrator account within 5 seconds
    - **B)** By attempting a single common password across many different user accounts, ensuring the threshold of failed attempts per user is never reached
    - **C)** By disabling the target server's Active Directory database
    - **D)** By decrypting the private SSH server key

2. An application displays the error `"Password incorrect for user jsmith"` when a bad password is submitted for `jsmith`, but displays `"User not found"` when `invaliduser` is tested. What vulnerability does this introduce?
    - **A)** Remote Buffer Overflow
    - **B)** Username Enumeration
    - **C)** Cross-Site Scripting (XSS)
    - **D)** Local File Inclusion (LFI)

3. What protection is provided to a web session cookie by the `HttpOnly` attribute flag?
    - **A)** The cookie is encrypted using RSA-4096 before transmission.
    - **B)** The cookie cannot be accessed or read by client-side JavaScript, preventing session hijacking via XSS.
    - **C)** The cookie expires automatically after 5 milliseconds.
    - **D)** The cookie can only be accessed by search engine web crawlers.

4. Which tool is specifically designed to spider a target organization's website and extract unique vocabulary to build customized brute-force wordlists?
    - **A)** `cewl`
    - **B)** `nmap`
    - **C)** `nikto`
    - **D)** `wireshark`

5. An analyst captures an NTLM password hash from a Windows workstation. Which Hashcat mode (`-m`) should be specified to crack this hash?
    - **A)** `-m 0`
    - **B)** `-m 1000`
    - **C)** `-m 1800`
    - **D)** `-m 22000`

6. What is the fundamental difference between Authentication and Authorization?
    - **A)** Authentication verifies the identity of the user, while Authorization determines the resources and actions the user is allowed to access.
    - **B)** Authentication is performed only by web servers, while Authorization is performed by routers.
    - **C)** Authentication encrypts files, while Authorization decrypts files.
    - **D)** There is no difference; they are interchangeable terms.

7. Why is performing online brute-force attacks against SSH or web logins considered higher risk than offline hash cracking during an enterprise engagement?
    - **A)** Online attacks can trigger account lockouts, degrade service performance, and create massive operational disruptions for real employees.
    - **B)** Online attacks are illegal even with a signed RoE.
    - **C)** Offline hash cracking requires 10 gigabytes of network bandwidth.
    - **D)** Online attacks automatically format the penetration tester's hard drive.

8. Which modern cryptographic algorithm is recommended for securely storing user passwords in databases due to its resistance against GPU/ASIC acceleration?
    - **A)** MD5
    - **B)** SHA-1
    - **C)** Argon2id
    - **D)** Base64

### Answer Key & Explanations

1. **B**. **Password Spraying** avoids triggering lockout policies by testing a single likely password across numerous accounts horizontally, remaining below per-account failure limits.
2. **B**. Differential error messages disclose whether an account exists in the database, allowing adversaries to harvest a clean list of valid **usernames**.
3. **B**. The **`HttpOnly`** flag instructs the browser that the cookie should not be accessible via `document.cookie`, mitigating credential theft from XSS flaws.
4. **A**. **`cewl`** spiders target websites to harvest industry- and company-specific terms, generating tailored wordlists.
5. **B**. In Hashcat, **Mode `1000`** is the dedicated hash type for **NTLM** (Windows NT LAN Manager hashes). Mode `0` is MD5; Mode `1800` is SHA-512 crypt.
6. **A**. **Authentication** answers *"Who are you?"*, while **Authorization** enforces *"What permissions do you possess?"*.
7. **A**. Online brute-forcing sends live requests to target systems, risking **account lockouts** (disrupting legitimate employees) and generating intense log volume.
8. **C**. **Argon2id** (winner of the Password Hashing Competition) is memory-hard and computationally intensive, offering superior defense against parallel GPU/ASIC cracking.

## References & Navigation

- **Previous Topic:** [[Attack Path Development]]
- **Next Topic:** [[Web Application Pentesting]]
- **Related Notes:** [[Web Application Pentesting]], [[Security & Authentication]]

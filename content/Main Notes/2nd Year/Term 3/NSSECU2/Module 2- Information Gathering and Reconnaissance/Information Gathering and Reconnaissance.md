---
id: information_gathering_and_reconnaissance
type: note
course: NSSECU2
topic: "Information Gathering and Reconnaissance"
status: completed
---

# Information Gathering and Reconnaissance

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSSECU2]] #[[Cybersecurity]] #[[Reconnaissance]] #[[OSINT]] #[[Information Gathering]] #[[DNS]] #[[Footprinting]]

---

## Overview

> Information gathering and reconnaissance constitute the foundational preparatory phase of any offensive security assessment. By systematically identifying, aggregating, and analyzing publicly available data and direct system telemetry, security professionals construct an exhaustive profile of the target organization's attack surface. Methodological distinction between passive OSINT (which avoids target interaction) and active reconnaissance (which sends direct probes) ensures comprehensive visibility while respecting operational security and engagement boundaries.

## Key Definitions

- **Reconnaissance:** The systematic process of gathering intelligence about a target organization, network, infrastructure, personnel, and technological stack prior to active probing.
- **Passive Reconnaissance:** Intelligence gathering conducted exclusively through third-party repositories, public registries, search engines, and cached archives without generating network traffic directly toward the target's servers.
- **Active Reconnaissance:** Intelligence gathering that directly interacts with target systems (e.g., DNS queries, port probes, HTTP requests), creating traceable server log entries and potentially alerting defensive monitoring systems.
- **OSINT (Open Source Intelligence):** Intelligence derived from publicly accessible data sources, including search engines, government registries, social platforms, and public code repositories.
- **Attack Surface:** The total sum of all accessible entry points, services, subdomains, APIs, network interfaces, and human vectors through which an unauthorized user could attempt to enter or extract data.
- **Footprinting:** Mapping the digital boundaries, autonomous system numbers (ASNs), IP ranges, subnets, and hostnames belonging to an enterprise.
- **DNS Zone Transfer (AXFR):** A DNS mechanism designed for database replication between primary and secondary DNS servers; if misconfigured, it exposes all internal DNS records to unauthorized query clients.
- **OPSEC (Operational Security):** The discipline of protecting operational intentions, source IP addresses, and testing activities from premature detection or counter-intelligence tracking.

## Theoretical Framework / Core Concepts

### 1. Attack Surface Mapping Architecture

Reconnaissance transforms an ambiguous organizational entity into a granular, interconnected map of technical assets:

```text
+-----------------------------------------------------------------------------------+
|                           ORGANIZATIONAL ATTACK SURFACE                           |
+-----------------------------------------------------------------------------------+
|  1. EXTERNAL DOMAIN & IP SPACE                                                    |
|     - Apex Domains, Subdomains, Staging/Dev Environments, CDNs, Cloud Buckets     |
|     - Autonomous System Numbers (ASNs), BGP Routes, Public CIDR Blocks            |
+-----------------------------------------------------------------------------------+
|  2. EXPOSED SERVICES & INFRASTRUCTURE                                            |
|     - Web Portals, VPN Concentrators, Remote Access (SSH, RDP), Mail Servers (MX) |
|     - Historical Certificates, DNS Records (A, AAAA, CNAME, TXT, SRV, SOA)       |
+-----------------------------------------------------------------------------------+
|  3. APPLICATION & TECH STACK PROFILING                                            |
|     - Web Frameworks, Server Daemon Versions, CMS Platforms, APIs, Dependencies   |
+-----------------------------------------------------------------------------------+
|  4. HUMAN & ORGANIZATIONAL INTELLIGENCE                                           |
|     - Employee Directory, Corporate Email Patterns, Breached Credentials, GitHub  |
+-----------------------------------------------------------------------------------+
```

### 2. Passive vs. Active Reconnaissance Dynamics

Understanding the trade-offs between passive and active reconnaissance is vital for operational security:

| Feature / Dimension | Passive Reconnaissance | Active Reconnaissance |
| :--- | :--- | :--- |
| **Target Contact** | Zero direct interaction with target infrastructure | Direct network packets sent to target systems |
| **Target Log Generation** | Zero logs generated on target systems | Direct entries in target firewalls, WAFs, and server logs |
| **Detection Probability** | Undetectable by target security operations (SOC) | Moderate to High probability of detection/alerting |
| **Data Recency** | Dependent on third-party crawl/index cycles (may be stale) | Real-time, ground-truth operational telemetry |
| **Primary Sources** | Google Dorking, WHOIS, `crt.sh`, Shodan, Wayback Machine | `dnsrecon` AXFR, `whatweb`, `sublist3r` brute-force |
| **Risk of Scope Breach** | Low | Higher if scanning unconfirmed third-party CDNs/IPs |

```text
PASSIVE RECON FLOW:
Tester ------> Third-Party Cache / OSINT Platform ------> Aggregated Target Info
(Target never sees Tester's IP)

ACTIVE RECON FLOW:
Tester -------------------- Direct Network Probes --------------------> Target Systems
(Target logs Tester's IP in Access Logs / IDS Alerts)
```

## Reconnaissance Tool Suites & Command Walkthroughs

### 1. Search Engine Intelligence (Google Dorking)

Google Dorking leverages advanced search operators to uncover exposed configuration files, database backups, admin portals, and leaked credentials indexed by search spiders:

| Operator | Syntax Example | Offensive & Analytical Utility |
| :--- | :--- | :--- |
| `site:` | `site:target.com` | Restricts queries strictly to the specified domain and all indexed subdomains. |
| `filetype:` / `ext:` | `site:target.com filetype:env` | Identifies sensitive file formats (`pdf`, `docx`, `sql`, `env`, `conf`, `log`, `bak`). |
| `intitle:` | `site:target.com intitle:"index of /"` | Uncovers web servers with open directory listing enabled. |
| `inurl:` | `site:target.com inurl:login` | Locates authentication portals, API endpoints, or administrative routes. |
| `""` (Quotes) | `site:target.com "internal use only"` | Forces exact phrase matching for proprietary classification labels. |
| `-` (Negation) | `site:target.com -www` | Excludes primary production web hosts to isolate obscure subdomains. |

```bash
# Example Google Dorks for Attack Surface Discovery
site:target.com inurl:admin | inurl:login | inurl:dashboard
site:target.com filetype:sql | filetype:bak | filetype:conf
site:target.com intitle:"index of /" "backup"
site:target.com intext:"SQL syntax error" | intext:"Warning: mysql_connect()"
```

### 2. Domain & Certificate Intelligence

Public registries and SSL transparency logs provide comprehensive insight into organizational infrastructure:

```bash
# Query Domain Ownership and Registration Data
whois target.com

# Extract ASN and IP Block allocations
whois -h whois.radb.net -- "-i origin AS13335"

# Query Certificate Transparency (CT) Logs via curl and jq
curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value' | sort -u
```

- **WHOIS:** Exposes domain registrar, administrative contacts, nameservers, registration dates, and CIDR ranges.
- **Certificate Transparency (`crt.sh`):** SSL/TLS certificate authorities publicly log all issued certificates. Querying wildcards (`%.target.com`) reveals active, historical, and staging subdomains (e.g., `dev.target.com`, `vpn-backup.target.com`).

### 3. Automated Active Reconnaissance Tools

```bash
# 1. DNS Enumeration and Zone Transfer Testing
dnsrecon -d target.com -t axfr
dnsrecon -d target.com -t std,brt -D /usr/share/wordlists/dnsmap.txt

# 2. Multi-Engine Subdomain Discovery
sublist3r -d target.com -b -t 10 -o subdomains.txt

# 3. Web Technology Profiling
whatweb -v -a 3 http://target.com

# 4. OSINT Email and Employee Harvesting
theHarvester -d target.com -b all -l 500

# 5. Social Media Username Profiling across 300+ platforms
sherlock target_employee_username
```

- `dnsrecon`: Checks for DNS Zone Transfers (`axfr`), standard records (A, AAAA, MX, NS, SOA, TXT), and brute-forces subdomains.
- `sublist3r`: Aggregates subdomains from search engines (Google, Bing, Baidu, Yahoo) and Netcraft.
- `whatweb`: Discovers CMS versions, web servers, embedded JavaScript libraries, analytics plugins, and HTTP headers.
- `theHarvester`: Gathers corporate email addresses, names, subdomains, and virtual hosts from public sources.
- `sherlock`: Scans social platforms to identify operational aliases used by employees.

### 4. IoT & Shodan Search Engine

Shodan continuously crawls the entire IPv4 space, indexing banners from connected devices, industrial systems, databases, and servers:

```text
# High-Yield Shodan Search Filters:
hostname:"target.com"              -> Finds assets explicitly belonging to target hostname
org:"Target Corporation"           -> Indexes all IP ranges registered to organization
net:"192.168.10.0/24"              -> Discovers exposed services in specific CIDR block
product:"Apache httpd" port:8080   -> Locates specific web daemon versions on custom ports
ssl:"target.com"                   -> Isolates hosts presenting target SSL certificates
```

## Building the Target Profile

Systematic intelligence gathering consolidates scattered data points into an actionable matrix:

```text
================================================================================
TARGET PROFILE SYNTHESIS
================================================================================
Domain Target:        target.com
Primary ASN:          AS64512 (Target Enterprise Hosting)
Assigned CIDR:        198.51.100.0/24

Subdomains Identified:
- www.target.com           [198.51.100.10] (Production Web - Cloudflare CDN)
- api.target.com           [198.51.100.25] (Node.js Express / Swagger Docs exposed)
- vpn.target.com           [198.51.100.50] (Pulse Secure Gateway - Outdated Build)
- dev-portal.target.com    [198.51.100.99] (Direct Origin IP - Bypass CDN)

Discovered Technologies:
- Server Header:           nginx/1.18.0 (Ubuntu)
- Backend:                 PHP 7.4.3 / Laravel
- DNS Misconfigurations:   TXT record exposes internal mail server IP (10.0.5.15)

High-Priority Attack Vectors for Scanning Phase:
1. Port scan origin server `198.51.100.99` directly to bypass CDN WAF rules.
2. Probe `vpn.target.com` for known gateway authentication vulnerabilities.
3. Enumerate API endpoints on `api.target.com`.
================================================================================
```

## Common Traps & OPSEC Guidelines

- **Premature Active Probing:** Initiating aggressive DNS brute-forcing or web crawling before completing passive OSINT wastes time and alerts defenders.
- **Third-Party Infrastructure Probing:** Scanning IP addresses hosted by SaaS providers, shared CDNs, or cloud platforms without verifying that the tenant is solely the client violates scope.
- **Unverified OSINT Clues:** Accepting outdated WHOIS records or archived subdomains as active systems without validating current DNS resolution leads to dead ends.
- **Exposing Tester Identity:** Conducting OSINT from non-VPN infrastructure or personal accounts can compromise engagement anonymity and client confidentiality.

## Multiple Choice Questions

1. What is the fundamental characteristic of passive reconnaissance that differentiates it from active reconnaissance?
    - **A)** Passive reconnaissance requires administrative credentials on the target domain.
    - **B)** Passive reconnaissance relies entirely on third-party data sources without directly interacting with target systems.
    - **C)** Passive reconnaissance automatically exploits remote buffer overflow vulnerabilities.
    - **D)** Passive reconnaissance only works against IPv6 networks.

2. Which Google Dork operator would an ethical hacker use to identify publicly exposed database backup files on a client's website?
    - **A)** `site:target.com filetype:sql | filetype:bak`
    - **B)** `site:target.com link:admin`
    - **C)** `site:target.com define:database`
    - **D)** `site:target.com cache:index`

3. A security tester queries `crt.sh` using the search string `%.example.com`. What information will this query uncover?
    - **A)** Cleartext user passwords stored in database tables
    - **B)** The full source code of the backend web server
    - **C)** All current and historical SSL/TLS certificates logged for the domain and its subdomains
    - **D)** Active SSH session keys for the Linux server

4. What severe vulnerability occurs when a DNS server allows any external client to execute an `AXFR` query?
    - **A)** Denial of Service via buffer exhaustion
    - **B)** Server-side SQL injection in the DNS daemon
    - **C)** Cross-Site Scripting (XSS) in the browser
    - **D)** Full DNS Zone Transfer exposing all internal and external DNS mapping records

5. Which tool is specifically designed to crawl social media platforms to determine if an employee's username exists across hundreds of public services?
    - **A)** `dnsrecon`
    - **B)** `sherlock`
    - **C)** `whatweb`
    - **D)** `sublist3r`

6. Why might a penetration tester search Shodan using the filter `ssl:"target.com"` instead of simply scanning `www.target.com`?
    - **A)** To automatically crack all SSL certificates using brute force
    - **B)** To alter the DNS records on root nameservers
    - **C)** To discover obscure, unindexed origin servers hosting the target's SSL certificate that may bypass CDN firewalls
    - **D)** To encrypt the target's web server traffic

7. During passive reconnaissance, an analyst finds an old GitHub commit from a client developer containing hardcoded API keys. What is the most appropriate next step?
    - **A)** Document the discovery, timestamp the repository URL, and flag the finding for safe validation
    - **B)** Immediately use the keys to wipe the production database
    - **C)** Post the keys to a public forum to force the developer to fix it
    - **D)** Ignore the finding because it came from a passive source

8. Why is it dangerous to perform active reconnaissance against an IP address discovered via WHOIS without additional verification?
    - **A)** Active reconnaissance will immediately disable all DNS servers globally.
    - **B)** It will instantly corrupt the penetration tester's operating system.
    - **C)** WHOIS data is always encrypted and cannot be read without a license.
    - **D)** The IP may belong to a multi-tenant cloud provider or shared hosting environment outside the authorized scope.

### Answer Key & Explanations

1. **B**. **Passive reconnaissance** is defined by the complete absence of direct network contact with the target; all data is harvested from external mirrors, search engines, and registries.
2. **A**. The `filetype:` (or `ext:`) operator combined with boolean `|` (OR) allows targeted identification of exposed database dump (`.sql`) and backup (`.bak`) files.
3. **C**. **Certificate Transparency (CT)** logs indexed by `crt.sh` provide a public ledger of all issued certificates, revealing forgotten subdomains, internal staging portals, and development environments.
4. **D**. A misconfigured **DNS Zone Transfer (AXFR)** permits any requester to copy the entire zone database, instantly exposing all registered hostnames, subnets, and mail servers.
5. **B**. **Sherlock** is an OSINT automation tool that queries username availability across 300+ social and developer websites to build digital human profiles.
6. **C**. Searching Shodan for SSL certificates can reveal the **direct origin IP addresses** of backend servers that sit behind Cloudflare/Akamai CDNs, allowing direct scanning that bypasses edge WAF controls.
7. **A**. Ethical testers maintain disciplined documentation, recording the exact commit hash and location as evidence while preparing for non-destructive verification according to the RoE.
8. **D**. IP ranges listed in WHOIS may be shared across thousands of unrelated tenants on cloud services (AWS, Azure, Cloudflare). Directly scanning without confirming tenant ownership risks attacking out-of-scope third parties.

## References & Navigation

- **Previous Topic:** [[Introduction to Offensive Security and Kali Linux]]
- **Next Topic:** [[Network Scanning]]
- **Related Notes:** [[Network Scanning]], [[Enumeration]]

---
id: vapt_reporting
type: note
course: NSSECU2
topic: "VAPT Reporting"
status: completed
---

# VAPT Reporting

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSSECU2]] #[[Cybersecurity]] #[[VAPT Reporting]] #[[Penetration Testing]] #[[Documentation]] #[[Remediation]] #[[CVSS]]

---

## Overview

> The Vulnerability Assessment and Penetration Testing (VAPT) report is the single most important deliverable of any offensive security engagement. Technical prowess and complex exploitation chains provide zero business value if the resulting risks, impacts, and remediation pathways are not clearly articulated to stakeholders. A professional VAPT report bridges the technical and executive domains through **dual-audience design**: providing non-technical leadership with strategic risk posture analysis while delivering developers and systems engineers with reproducible proof-of-concept steps, vulnerability classifications (CVE/CWE), and actionable remediation guidance.

## Key Definitions

- **VAPT Report:** The formal, legally binding technical and executive documentation detailing all discovered vulnerabilities, attack paths, risk scores, and remediation recommendations resulting from a security assessment.
- **Executive Summary:** A concise, high-level overview written for business executives (CISO, CIO, CEO) that summarizes organizational risk posture, business impact, and strategic priorities without technical jargon.
- **Technical Finding:** An individual, structured section within a pentest report that documents a specific vulnerability, including reproduction steps, affected assets, severity scores, and technical remediation code.
- **Proof of Concept (PoC):** Verifiable, step-by-step documentation (commands, scripts, or sanitized HTTP transcripts) proving that a vulnerability exists and is exploitable.
- **Remediation Roadmap:** A prioritized, timeline-driven action plan categorizing fixes into immediate tactical mitigations ("quick wins") and strategic architectural changes.
- **CVE (Common Vulnerabilities and Exposures):** A standardized dictionary of publicly known cybersecurity vulnerabilities and exposures (e.g., `CVE-2021-44228`).
- **CWE (Common Weakness Enumeration):** A community-developed taxonomy of software and hardware weakness types (e.g., `CWE-89: SQL Injection`, `CWE-79: Cross-Site Scripting`).

## Theoretical Framework / Core Concepts

### 1. Dual-Audience Design Paradigm

A successful security report effectively addresses two distinct reader personas:

```text
+-----------------------------------------------------------------------------------+
|                           DUAL-AUDIENCE REPORT DESIGN                             |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ AUDIENCE 1: EXECUTIVE LEADERSHIP (C-Suite, Directors, Board of Directors) ]   |
|  - Core Question: "What is our business risk and financial/operational impact?"   |
|  - Language: Plain business language, risk charts, heatmaps, budget implications  |
|  - Content: Executive Summary, Overall Risk Posture, High-Level Roadmap           |
|                                                                                   |
|  [ AUDIENCE 2: TECHNICAL STAKEHOLDERS (Devs, Sysadmins, SecOps, DevOps) ]        |
|  - Core Question: "Where is the bug, how was it exploited, and how do we fix it?" |
|  - Language: Precise technical terminology, code snippets, network packets, CVEs  |
|  - Content: Detailed Findings, PoC Reproduction Steps, Remediation Code Examples  |
+-----------------------------------------------------------------------------------+
```

### 2. Standard VAPT Report Architecture

Industry-standard frameworks (PTES, NIST SP 800-115) recommend the following structural layout:

```text
1. Document Information & Non-Disclosure Notice
2. Executive Summary
   ├── 2.1 Engagement Overview & Context
   ├── 2.2 Overall Security Posture & Scorecard
   └── 2.3 Key Strengths & Critical Findings Summary
3. Scope & Rules of Engagement (RoE)
   ├── 3.1 In-Scope IP Addresses / Domains / Web Applications
   └── 3.2 Out-of-Scope Assets & Operational Constraints
4. Assessment Methodology & Frameworks (PTES, OWASP WSTG, OSSTMM)
5. Vulnerability Severity Ratings Matrix (CVSS v3.1 Thresholds)
6. Detailed Technical Findings (Structured Finding Anatomy)
7. Prioritized Remediation Roadmap (Immediate, Medium-Term, Long-Term)
8. Appendices (Raw Tool Outputs, Scan Logs, Terminology Glossary)
```

## The 8-Point Anatomy of a Vulnerability Finding

Every individual finding within the report must follow a deterministic, 8-component structure:

```text
+-----------------------------------------------------------------------------------+
|                     8-POINT TECHNICAL FINDING ANATOMY                             |
+-----------------------------------------------------------------------------------+
|  1. UNIQUE FINDING ID & DESCRIPTIVE TITLE (e.g., FIND-01: SQL Injection)         |
+-----------------------------------------------------------------------------------+
|  2. SEVERITY RATING & CVSS v3.1 SCORE / VECTOR STRING                             |
+-----------------------------------------------------------------------------------+
|  3. VULNERABILITY CLASSIFICATION (CVE, CWE Taxonomy Identifiers)                 |
+-----------------------------------------------------------------------------------+
|  4. AFFECTED ASSET(S) (Exact Hostname, IP Address, Port, URL, Parameter)          |
+-----------------------------------------------------------------------------------+
|  5. TECHNICAL DESCRIPTION & ROOT CAUSE ANALYSIS                                   |
+-----------------------------------------------------------------------------------+
|  6. PROOF OF CONCEPT (PoC) & STEP-BY-STEP REPRODUCTION WALKTHROUGH                |
+-----------------------------------------------------------------------------------+
|  7. TECHNICAL & BUSINESS IMPACT EVALUATION                                        |
+-----------------------------------------------------------------------------------+
|  8. ACTIONABLE REMEDIATION GUIDANCE & CODE/CONFIG EXAMPLES                        |
+-----------------------------------------------------------------------------------+
```

## Worked Vulnerability Finding Example

Below is a complete, enterprise-grade technical finding illustrating the required depth:

```text
================================================================================
FINDING ID:          SEC-2026-001
TITLE:               Unauthenticated SQL Injection in Authentication Endpoint
SEVERITY:            CRITICAL (CVSS: 9.8)
CVSS v3.1 VECTOR:    CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
CLASSIFICATION:      CWE-89: Improper Neutralization of Special Elements used in an
                     SQL Command ('SQL Injection')
AFFECTED ASSET:      https://portal.target.com/api/v1/auth/login (Parameter: `username`)

1. TECHNICAL DESCRIPTION:
The login endpoint fails to parameterize or sanitize user input supplied in the
`username` JSON field. The input is directly concatenated into a dynamic SQL query
executed by the backend PostgreSQL database server.

2. PROOF OF CONCEPT (REPRODUCTION STEPS):
Step 1: Intercept the login POST request using an intercepting proxy.
Step 2: Submit the following crafted payload in the `username` field:
        Payload: admin' OR '1'='1' --

Raw Request:
POST /api/v1/auth/login HTTP/1.1
Host: portal.target.com
Content-Type: application/json

{"username": "admin' OR '1'='1' --", "password": "arbitrary_password"}

Raw Response:
HTTP/1.1 200 OK
Content-Type: application/json

{"status": "success", "token": "eyJuYW1la...[REDACTED_JWT]...", "role": "admin"}

Step 3: Note that administrative access was granted without supplying a valid password.

3. IMPACT ANALYSIS:
An unauthenticated remote attacker can completely bypass authentication, retrieve all
customer financial records (Confidentiality), alter system data (Integrity), or drop
database tables (Availability).

4. REMEDIATION GUIDANCE:
Refactor the backend query to use Prepared Statements (Parameterized Queries). Ensure
all input parameters are treated strictly as data literals.

Remediation Code Example (Node.js / pg-promise):
// INSECURE:
// const query = `SELECT * FROM users WHERE user = '${req.body.username}'`;

// SECURE (Parameterized):
const query = 'SELECT id, password_hash, role FROM users WHERE username = $1';
const user = await db.oneOrNone(query, [req.body.username]);
================================================================================
```

## Remediation Prioritization Strategy

Remediation must balance CVSS scores with organizational context:

| Priority Tier | Timeline | Criteria & Examples |
| :--- | :--- | :--- |
| **Immediate (Emergency)** | 24–48 Hours | Critical flaws directly exploitable from internet (Unauthenticated RCE, SQLi on public login, default admin creds). |
| **High Priority** | 1–2 Weeks | Flaws requiring minimal preconditions (IDOR exposing PII, Stored XSS, missing critical patches). |
| **Medium Priority** | 30 Days | Internal privilege escalation vectors, missing cookie security flags (`HttpOnly`), verbose server banners. |
| **Low / Informational** | Next Release Cycle | Best practice hardening (enforcing strict TLS cipher suites, implementing rate limiting). |

## Common Pitfalls in VAPT Reporting

- **Automated Scanner Dumps:** Copy-pasting raw Nessus or OpenVAS scan summaries directly into the report without manual validation or customization.
- **Missing Reproduction Steps:** Writing "SQL injection found on the site" without providing the specific URL, HTTP parameter, or raw payload.
- **Overly Theoretical Remediation:** Providing generic advice ("Fix code") rather than concrete, framework-specific code snippets or configuration settings.
- **Exposing Sensitive Client Data:** Pasting unredacted client customer credit card numbers, passwords, or personal data into the report body.

## Multiple Choice Questions

1. What is the primary purpose of the Executive Summary section in a VAPT report?
    - **A)** To list every raw Nmap command executed during the assessment
    - **B)** To communicate organizational risk posture, business impact, and strategic priorities to non-technical leadership in clear, accessible language
    - **C)** To provide assembly code for buffer overflow exploits
    - **D)** To invoice the client for software licenses

2. Which classification taxonomy identifies specific flaw mechanisms like "CWE-89: SQL Injection" or "CWE-79: Cross-Site Scripting"?
    - **A)** Common Weakness Enumeration (CWE)
    - **B)** Common Vulnerabilities and Exposures (CVE)
    - **C)** Payment Card Industry Data Security Standard (PCI-DSS)
    - **D)** ISO 27001

3. What is the fundamental requirement of the "Proof of Concept (PoC)" section within a technical finding?
    - **A)** It must include at least 500 lines of unrelated Python code.
    - **B)** It must provide clear, repeatable, step-by-step instructions that allow developers to reproduce and verify the vulnerability independently.
    - **C)** It must delete all server logs to hide the tester's identity.
    - **D)** It must be written in binary machine code.

4. How does an analyst prioritize remediation actions when presenting recommendations to a client?
    - **A)** Alphabetically by vulnerability name
    - **B)** By balancing CVSS severity scores, business criticality of affected assets, and the feasibility/speed of mitigation (quick wins vs strategic fixes)
    - **C)** By fixing the lowest severity issues first
    - **D)** Based on the order the vulnerabilities were discovered in the calendar week

5. Why is copy-pasting raw automated vulnerability scanner outputs directly into a client deliverable considered unprofessional?
    - **A)** It causes the PDF file size to exceed email limits.
    - **B)** Automated outputs frequently contain unverified false positives, lack business context, and fail to provide tailored remediation guidance.
    - **C)** Scanners always write reports in ancient Latin.
    - **D)** Automated scanners only test hardware cables.

6. An analyst documents an IDOR vulnerability affecting customer invoices. Which remediation recommendation is technically accurate?
    - **A)** Rename the database table to `invoices_hidden`.
    - **B)** Implement server-side authorization checks ensuring the requesting user ID matches the ownership record of the requested invoice object before returning data.
    - **C)** Switch the website font to Comic Sans.
    - **D)** Hide the URL using a URL shortener.

7. What information belongs in the Scope & Rules of Engagement section of a VAPT report?
    - **A)** The penetration tester's home address
    - **B)** The explicitly authorized IP ranges, domains, testing timeframes, and explicitly excluded systems
    - **C)** The client CEO's personal social media password
    - **D)** The source code of the Kali Linux operating system

8. When documenting evidence of a high-severity vulnerability involving customer passwords in a database, how should the data be presented in the final report?
    - **A)** Displayed in full plaintext in 48pt font on the title page
    - **B)** Sanitized and redacted (e.g., masking sensitive characters) to prove data access without creating a secondary data leak
    - **C)** Uploaded to a public torrent website
    - **D)** Deleted from the report entirely without mentioning the vulnerability

### Answer Key & Explanations

1. **B**. The **Executive Summary** is tailored for executive stakeholders, translating technical vulnerabilities into actionable **business risk, financial exposure, and strategic roadmaps**.
2. **A**. **Common Weakness Enumeration (CWE)** provides the categorical taxonomy of software weaknesses and architectural flaws, whereas CVE tracks specific individual vulnerability instances.
3. **B**. A **Proof of Concept (PoC)** must be **reproducible, clear, and unambiguous**, enabling developers and security engineers to verify the issue and confirm post-fix resolution.
4. **B**. Effective **Remediation Prioritization** weighs technical severity (CVSS), asset criticality, and implementation complexity to deliver actionable tactical and strategic milestones.
5. **B**. Raw scanner dumps are prone to **false positives** and lack human analysis; client deliverables require curated, validated, and context-aware synthesis.
6. **B**. Remediating **IDOR** requires robust **server-side authorization verification** on every request to confirm data ownership.
7. **B**. The **Scope & RoE section** legally documents the assessment parameters, including tested IP addresses, authorized dates, and excluded infrastructure.
8. **B**. Professional reports strictly **sanitize and redact sensitive PII/credentials** to protect client confidentiality and comply with data privacy regulations.

## References & Navigation

- **Previous Topic:** [[Post-Exploitation Awareness and Privilege Escalation]]
- **Related Notes:** [[Vulnerability Identification and CVSS Scoring]], [[Post-Exploitation Awareness and Privilege Escalation]]

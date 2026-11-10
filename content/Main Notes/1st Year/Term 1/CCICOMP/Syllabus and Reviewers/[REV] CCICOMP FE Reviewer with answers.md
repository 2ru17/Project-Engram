---
id: ccicomp_fe_reviewer_with_answers
type: note
course: CCICOMP
topic: "CCICOMP FE Reviewer with answers"
status: completed
---

# CCICOMP FE Reviewer with answers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Reviewer]] #[[Final Exam]]

---

## Overview

This document is a comprehensive Final Exam Reviewer for CCICOMP (Introduction to Computing). It covers key core concepts across Computer Hardware (CPU, Motherboard, Memory, Storage, I/O), Software (Operating Systems, Application Software), Virtualization, Internetworking, Cybersecurity, the Software Development Life Cycle (SDLC), and Relational Databases.

---

## Theoretical Framework & Exam Review Reference

### 1. Computer Hardware: CPU and Motherboard
- **Clock Speed:** The fundamental execution cycle rate of a processor, determined by the system clock generator.
- **Multicore Architecture:** Improves overall computational throughput by allowing concurrent execution of multiple hardware threads across distinct physical processing cores.
- **System Bus:** The parallel or serial communications subsystem on the motherboard responsible for transporting data, memory addresses, and control signals between the CPU, system RAM, and attached peripherals.
- **Control Unit (CU):** The internal CPU subsystem that decodes machine instructions and directs the flow of data through registers, the ALU, and external buses during the fetch-decode-execute cycle.
- **Chipset:** The motherboard integrated circuit architecture (historically Northbridge and Southbridge, or modern unified PCH) that manages high-speed and low-speed peripheral communications.

### 2. Computer Hardware: Memory and Storage
- **Dynamic RAM (DRAM):** Volatile primary memory that stores each bit in a microscopic capacitor-transistor cell; requires periodic electrical refresh cycles thousands of times per second to prevent charge leakage.
- **SSDs vs HDDs:** Solid State Drives (SSDs) utilize non-volatile NAND flash memory chips, providing substantially higher random read/write speeds, lower latency, and shock resistance compared to mechanical Hard Disk Drives (HDDs).
- **Cache Memory:** High-speed Static RAM (SRAM) positioned directly on or adjacent to the CPU core to stage frequently executed instructions and data lines, minimizing main memory latency.
- **Optical Storage:** Storage media that uses laser optics to read pits and lands stamped into a polycarbonate disc (e.g. CD, DVD, Blu-ray).
- **Memory Hierarchy:** The CPU accesses memory in order of increasing latency: Registers $\to$ L1 Cache $\to$ L2 Cache $\to$ L3 Cache $\to$ Primary DRAM $\to$ Secondary NVMe/SSD/HDD storage.

### 3. Computer Hardware: Input and Output Devices
- **Touchscreen Technologies:**
  - *Resistive Touchscreens:* Composed of two flexible, conductive layers separated by a microscopic gap; touch pressure forces the layers together, altering resistance at that coordinate.
  - *Capacitive Touchscreens:* Coated with a transparent conductive material (such as Indium Tin Oxide); touching the surface draws a minute electrical current from the human body, detecting coordinates via capacitance shift.
- **Optical Character Recognition (OCR):** Software technology coupled with flatbed or sheet-fed scanners to translate raster scanned images of text into machine-readable character strings.
- **I/O Buffering:** Temporary memory staging areas that smooth throughput discrepancies between high-speed CPU/bus controllers and lower-speed peripheral devices.
- **Hypervisor I/O Management:** In virtualized environments, guest device access is intercepted and mediated by the hypervisor to ensure hardware isolation.
- **Dot Matrix Impact Printers:** Printers that produce text and graphics by striking an ink-soaked ribbon with pins; uniquely suited for continuous-feed multipart carbonless forms.

### 4. Computer Software: Operating Systems and Utilities
- **Virtual Memory:** An operating system memory management abstraction that utilizes secondary storage (paging file or swap partition) to extend physical RAM through demand paging and address translation.
- **Real-Time Operating System (RTOS):** An operating system engineered with deterministic scheduling guarantees to respond to external hardware interrupts within rigid, predefined deadlines.
- **BIOS / UEFI:** Firmware initialized immediately upon power-on to execute Power-On Self-Test (POST) routines and bootstrap the bootloader into main memory.
- **File Compression Utilities:** Algorithms (such as Huffman coding or Lempel-Ziv dictionary compression) that eliminate data redundancy to reduce disk usage and transfer time.
- **Process Scheduler:** The OS kernel subsystem responsible for selecting runnable processes from the ready queue and dispatching CPU time slices.

### 5. Computer Software: Applications and Programming Environments
- **Open Source Software:** Software distributed under licenses (e.g. MIT, GPL, Apache) that grant users rights to inspect, modify, and redistribute source code.
- **Compilers vs Interpreters:** Compilers translate the complete source code file into standalone machine code before execution; interpreters evaluate and execute source code statements line by line at runtime.
- **Integrated Development Environment (IDE):** A unified graphical programming workspace integrating source code editors, syntax highlighters, build automation, and interactive debuggers.
- **Software as a Service (SaaS):** A cloud distribution model where applications are hosted by a service provider and accessed over the web via a browser or thin client.
- **Computational Simulation:** Software designed to numerically model and emulate physical or logical real-world behaviors under parameterized conditions.

### 6. Virtualization
- **Server Virtualization:** Partitioning one physical server into multiple isolated virtual machines (VMs), maximizing hardware utilization and workload isolation.
- **Type-1 vs Type-2 Hypervisors:** Type-1 bare-metal hypervisors run directly on the underlying server hardware (e.g. VMware ESXi, KVM); Type-2 hosted hypervisors execute as applications on top of a conventional host OS (e.g. VirtualBox).
- **Virtualization Advantages:** Rapid disaster recovery, workload migration, and efficient hardware consolidation. Note that increased physical space is not an advantage of virtualization.
- **Storage Virtualization:** Pooling physical storage from multiple network storage devices into what appears to be a single, centrally managed storage volume.

### 7. Internetworking
- **Bandwidth:** The maximum theoretical data transfer capacity of a communications network channel, measured in bits per second (bps, Mbps, Gbps).
- **Fiber-Optic Cabling:** Uses modulated light pulses through silica glass cores; exhibits minimal attenuation over long distances and complete immunity to electromagnetic interference (EMI).
- **IPv4 Subnetting:** For an IPv4 address `192.168.1.1/24`, the `/24` CIDR prefix designates 24 network bits, corresponding to the subnet mask `255.255.255.0`.
- **Layer 2 Ethernet Switch:** Inspects frame destination MAC addresses and uses an internal CAM forwarding table to selectively forward frames to the correct egress port.
- **Wireless LAN (Wi-Fi):** IEEE 802.11 standards utilizing radio frequencies (2.4 GHz, 5 GHz, 6 GHz) for local data transmission.

### 8. Cybersecurity Fundamentals
- **WannaCry Ransomware:** A global ransomware worm that propagated across local networks by exploiting unpatched vulnerabilities in the Windows Server Message Block (SMBv1) protocol via the EternalBlue exploit.
- **Mirai Botnet:** Malware that compromised millions of IoT devices using default factory credentials to launch massive volumetric Distributed Denial-of-Service (DDoS) attacks.
- **Ethical Hacking / Penetration Testing:** Authorized security assessments simulating real-world attacker techniques to discover and remediate security vulnerabilities before malicious exploitation.
- **Phishing Defense:** Rigorous sender address verification, multi-factor authentication (MFA), and domain inspection before following embedded hyperlinks.
- **Confidentiality, Integrity, Availability (CIA Triad):** The core security model ensuring data is shielded from unauthorized observation, protected against unauthorized modification, and accessible to authorized parties on demand.

### 9. Software Development Life Cycle (SDLC)
- **Waterfall Model:** A linear, sequential development methodology where each phase (Requirements, Design, Implementation, Verification, Maintenance) must complete before the next begins; exhibits high rigidity against mid-project requirement changes.
- **Agile Methodology:** An iterative, incremental approach prioritizing rapid iterations, cross-functional collaboration, customer feedback, and flexibility.
- **Software Design Phase:** The stage where system architecture, database schemas, and interface models are formalized using structural and behavioral UML diagrams.
- **DevOps:** An engineering philosophy unifying software development (Dev) and IT operations (Ops) through automated Continuous Integration and Continuous Delivery (CI/CD) pipelines.
- **Integration Testing:** Verification stage verifying that distinct software units or modules communicate and exchange data correctly according to interface contracts.

### 10. Databases and Data Management
- **Network Database Model:** An early hierarchical database model permitting many-to-many relationships through a graph structure of parent-child records.
- **Relational Foreign Key:** A column or combination of columns in one table whose values match the Primary Key of another table, enforcing referential integrity.
- **SQL Data Modification:**
  - `DELETE FROM table_name WHERE condition;` removes specified rows while preserving the table schema and structural definitions.
  - `DROP TABLE table_name;` permanently destroys the entire table schema, indexes, and all contained records.
- **NoSQL Systems:** Non-relational databases (document, key-value, column-family, graph) optimized for horizontal partitioning, flexible schema models, and high ingestion throughput.
- **Database Indexes:** Specialized data structures (typically B+ Trees or hash tables) that accelerate record lookups by mapping indexed key values directly to row storage locations.

---

## References & Navigation

- **Related Notes:** [[Introduction to Computing]]

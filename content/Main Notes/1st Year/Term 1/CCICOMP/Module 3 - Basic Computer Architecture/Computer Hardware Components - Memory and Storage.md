---
id: 90_computer_hardware_components__memory_and_storage
type: note
course: CCICOMP
topic: "9.0 Computer Hardware Components - Memory and Storage"
status: completed
---

# 9.0 Computer Hardware Components - Memory and Storage

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Conceptual]] #[[M3]]

---

## Overview

> A computer system relies on a hierarchy of memory and storage devices to balance speed, cost, and capacity. Primary memory (Internal Memory) is volatile, highly expensive, extremely fast, and interacts directly with the CPU. Secondary storage (External Memory) is non-volatile, economical, provides vast capacities, but operates at much slower speeds. Memory architecture is structured such that frequently accessed data moves closer to the CPU to optimize execution time, progressing from secondary storage into main RAM, then into caches, and finally into CPU registers.

## Key Definitions
 **Primary Memory (Internal):** High-speed, volatile memory accessed directly by the processor (e.g., RAM, Cache, Registers). **Secondary Storage (External):** Slower, non-volatile memory used for long-term data storage (e.g., HDDs, SSDs, Flash Drives). **RAM (Random Access Memory):** The main memory of a computer that temporarily stores data and instructions currently in use. **ROM (Read-Only Memory):** Non-volatile memory containing firm, unchanging system instructions (like the BIOS/UEFI). Includes PROM, EPROM, and EEPROM. **Memory Access Time:** The amount of time it takes the processor to read data, instructions, and information from memory.

## Theoretical Framework

### 1. Types of RAM **SRAM (Static RAM):** Uses a complex transistor circuit (flip-flop) to store each bit. It is incredibly fast, expensive, consumes more power, and does not need to be constantly refreshed. Primarily used for CPU Registers and Cache (L1, L2, L3). **DRAM (Dynamic RAM):** Uses a single transistor and capacitor per bit. It is slower, highly economical, consumes less power, but must be continuously refreshed (thousands of times per second) or the data leaks away. Used for the system's Main Memory (e.g., DDR3, DDR4 SDRAM).

### 2. The Memory Hierarchy
When the processor requires data or instructions, it searches memory in a strictly hierarchical order designed to minimize delay:
1. **CPU Registers:** Fastest, smallest capacity.
2. **L1 Cache:** Built directly into the CPU core.
3. **L2 Cache:** Slightly larger/slower, usually per-core.
4. **L3 Cache:** Shared across all cores.
5. **Main Memory (RAM):** Placed on the motherboard.
6. **Secondary Storage:** If the data is not in RAM (a page fault), the system must fetch it from the hard drive or SSD, which incurs a massive latency penalty.

### 3. Secondary Storage Technologies
Data moves between Main Memory and Secondary Storage via read/write operations. **Magnetic Storage:** Hard Disk Drives (HDD) and magnetic tapes. Uses mechanical read/write heads and spinning platters. High capacity, lowest cost, but mechanically slow and prone to physical failure. **Solid-State Storage:** Solid-State Drives (SSD), USB Flash Drives, Memory Cards. Uses NAND flash memory with no moving parts. Significantly faster than HDDs, durable, and increasingly standard. **Optical Storage:** CD, DVD, Blu-Ray (BRD). Uses lasers to read/write microscopic pits on a plastic disc. **Enterprise / Cloud Storage:** 
*NAS (Network Attached Storage):* Specialized file server attached to a local network.
*SAN (Storage Area Network):* High-performance dedicated network for block-level storage.
*Cloud Storage:* Internet-based storage hosted by third-party data centers, providing off-site redundancy and elasticity.

## Multiple Choice Questions

1. Which characteristic best describes Primary Memory (Internal) compared to Secondary Storage?
- **A)** It is non-volatile, highly economical, and extremely slow.
- **B)** It is volatile, highly expensive, and extremely fast.
- **C)** It is used exclusively for long-term data archiving.
- **D)** It is comprised entirely of magnetic spinning platters.

2. What type of RAM uses a complex transistor circuit (flip-flop) and does not need to be constantly refreshed?
- **A)** VRAM
- **B)** DRAM (Dynamic RAM)
- **C)** SRAM (Static RAM)
- **D)** EEPROM

3. Why is DRAM typically used for a system's Main Memory rather than SRAM?
- **A)** It is slower but highly economical and uses a single transistor and capacitor per bit.
- **B)** It is much faster than SRAM and does not require refreshing.
- **C)** It is non-volatile and can retain data without power.
- **D)** It is built directly into the CPU cores.

4. What does ROM (Read-Only Memory) typically contain?
- **A)** Temporary data for actively running applications.
- **B)** Non-volatile, unchanging system instructions like the BIOS/UEFI.
- **C)** Frequently accessed user documents and media files.
- **D)** Network configuration caching for the hypervisor.

5. In the memory hierarchy, which storage type is the fastest but has the smallest capacity?
- **A)** L3 Cache
- **B)** Main Memory (RAM)
- **C)** Secondary Storage
- **D)** CPU Registers

6. What happens if the processor requires data that is not currently in RAM (a page fault)?
- **A)** The system immediately crashes.
- **B)** The CPU automatically terminates the running program.
- **C)** The system must fetch it from much slower secondary storage, incurring a latency penalty.
- **D)** The data is permanently lost.

7. How does Solid-State Storage differ from Magnetic Storage?
- **A)** It uses mechanical read/write heads and is more prone to physical failure.
- **B)** It uses NAND flash memory with no moving parts and is significantly faster.
- **C)** It uses lasers to read microscopic pits on a disc.
- **D)** It relies on continuous electrical refreshing to maintain state.

8. Which secondary storage technology uses lasers to read and write microscopic pits on a plastic disc?
- **A)** Magnetic Tape
- **B)** SSDs
- **C)** Optical Storage (CD, DVD, BRD)
- **D)** Storage Area Networks

9. What is a Storage Area Network (SAN)?
- **A)** A lightweight, low-cost USB flash drive architecture.
- **B)** An Internet-based storage solution hosted by third parties.
- **C)** A specialized file server attached to a local network.
- **D)** A high-performance dedicated network for block-level storage.

10. Which type of cache is typically shared across all cores in a multi-core CPU?
- **A)** L1 Cache
- **B)** L2 Cache
- **C)** L3 Cache
- **D)** CPU Registers

### Answer Key & Explanations
1. **B)** Primary memory is defined as volatile, highly expensive, extremely fast, and interacts directly with the CPU.
2. **C)** SRAM uses a complex flip-flop circuit, is extremely fast, and does not need to be constantly refreshed.
3. **A)** DRAM is highly economical, uses a single transistor/capacitor per bit, and is used for Main Memory, though it requires constant refreshing.
4. **B)** ROM contains firm, unchanging system instructions like the BIOS/UEFI.
5. **D)** CPU Registers are placed at the very top of the memory hierarchy, meaning they are the fastest but have the smallest capacity.
6. **C)** When a page fault occurs, the system must fetch data from the hard drive or SSD, incurring a massive latency penalty.
7. **B)** Solid-State Storage uses NAND flash memory, has no moving parts, and is significantly faster than magnetic storage.
8. **C)** Optical storage uses lasers to read/write microscopic pits on discs.
9. **D)** A SAN is defined as a high-performance dedicated network for block-level storage.
10. **C)** L3 cache is described in the memory hierarchy as being shared across all cores.

## References & Navigation

- **Previous Topic:** [[Computer Hardware Components - CPU and Motherboard]]
- **Next Topic:** [[Computer Hardware - IO Devices]]
- **Related Notes:** [[Memory System Organization & Hierarchy]], [[Cache Memory Principles & Mapping Architectures]]

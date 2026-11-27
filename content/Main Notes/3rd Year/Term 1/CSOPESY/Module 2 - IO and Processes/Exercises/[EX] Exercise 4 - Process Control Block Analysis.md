---
id: csopesy_04_ex4_process_control_block
type: note
course: CSOPESY
topic: "Exercise 4 - Process Control Block Analysis"
status: completed
---

# [EX] Exercise 4 - Process Control Block Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSOPESY]] #[[Operating Systems]] #[[Processes]] #[[PCB]] #[[Exercise]]

---

## Overview

A **Process Control Block (PCB)** is the kernel-space C structure that preserves every piece of state needed to schedule, suspend, resume, and account for an OS process. This exercise analyzes a raw 64-byte kernel hexadecimal memory dump starting at address `0xC0001000` on a **little-endian** architecture, containing two contiguous 32-byte PCB instances. By decoding byte offsets, reversing little-endian byte order, and interpreting pointers between structures, we reconstruct both processes' execution state and uncover their parent-child relationship.

## Kernel PCB Structure Definition

Each PCB occupies exactly $32\text{ bytes}$ (`0x20` bytes) with natural alignment (zero hidden padding bytes):

```c
// Total struct size = 4 + 4 + 8 + 4 + 4 + 8 = 32 bytes (0x20)
// Architecture: Little-Endian (Least Significant Byte stored at lowest address)
struct process_control_block {
    uint32_t process_id;        // Offset 0x00 (4 bytes): Unique process identifier (PID)
    uint32_t process_state;     // Offset 0x04 (4 bytes): 0=NEW, 1=READY, 2=RUNNING, 3=WAITING, 4=TERMINATED
    uint64_t program_counter;   // Offset 0x08 (8 bytes): Virtual address of next instruction
    uint32_t memory_limit;      // Offset 0x10 (4 bytes): Maximum memory allocation in bytes
    uint32_t open_files_count;  // Offset 0x14 (4 bytes): Count of currently open file descriptors
    uint64_t parent_pcb_ptr;    // Offset 0x18 (8 bytes): Kernel pointer to parent process's PCB
};
```

```mermaid
flowchart LR
    PCB2["PCB 2 at 0xC0001020 (PID 2050, TERMINATED)"] -->|"parent_pcb_ptr = 0xC0001000"| PCB1["PCB 1 at 0xC0001000 (PID 2048, RUNNING)"]
    PCB1 -->|"parent_pcb_ptr = 0xC0000050"| Ancestor["Parent Kernel PCB at 0xC0000050"]
```

---

## Raw Kernel Memory Dump

Memory dump starting at base address `0xC0001000` (16 bytes per row):

| Address | +0 | +1 | +2 | +3 | +4 | +5 | +6 | +7 | +8 | +9 | +A | +B | +C | +D | +E | +F |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`0xC0001000`** | `00` | `08` | `00` | `00` | `02` | `00` | `00` | `00` | `20` | `A1` | `40` | `00` | `00` | `00` | `00` | `00` |
| **`0xC0001010`** | `00` | `00` | `10` | `00` | `0C` | `00` | `00` | `00` | `50` | `00` | `00` | `C0` | `00` | `00` | `00` | `00` |
| **`0xC0001020`** | `02` | `08` | `00` | `00` | `04` | `00` | `00` | `00` | `50` | `B4` | `40` | `00` | `00` | `00` | `00` | `00` |
| **`0xC0001030`** | `00` | `00` | `20` | `00` | `00` | `00` | `00` | `00` | `00` | `10` | `00` | `C0` | `00` | `00` | `00` | `00` |

**Little-Endian Decoding Rule:**
For a multi-byte integer stored across addresses $a, a+1, \dots, a+k-1$ with bytes $[b_0, b_1, \dots, b_{k-1}]$, the logical value reads from highest address to lowest address:
$$\text{Value} = \text{0x}\,b_{k-1}\dots b_1 b_0 = \sum_{j=0}^{k-1} b_j \cdot 256^j$$

Because `sizeof(struct process_control_block) = 0x20` ($32\text{ bytes}$):
- **Process 1 (PCB 1)** spans rows `0xC0001000` through `0xC000101F`.
- **Process 2 (PCB 2)** spans rows `0xC0001020` through `0xC000103F`.

---

## Step-by-Step Decoding & Complete Solutions

### Process 1 (`0xC0001000` – `0xC000101F`)

| Field | Offset | Raw Bytes (LE) | Reversed Hex Value | Decoded Result |
| :--- | :---: | :--- | :--- | :--- |
| `process_id` | `+0x00` (4B) | `00 08 00 00` | `0x00000800` | **$2{,}048$** ($8 \times 16^2 = 2048$) |
| `process_state` | `+0x04` (4B) | `02 00 00 00` | `0x00000002` | **$2 \implies$ `RUNNING`** |
| `program_counter` | `+0x08` (8B) | `20 A1 40 00 00 00 00 00` | `0x000000000040A120` | **`0x000000000040A120`** |
| `memory_limit` | `+0x10` (4B) | `00 00 10 00` | `0x00100000` | $1{,}048{,}576\text{ bytes}$ ($1\text{ MiB}$) |
| `open_files_count` | `+0x14` (4B) | `0C 00 00 00` | `0x0000000C` | **$12$** open files |
| `parent_pcb_ptr` | `+0x18` (8B) | `50 00 00 C0 00 00 00 00` | `0x00000000C0000050` | **`0x00000000C0000050`** |

- **Q1 (`process_id` of Process 1):** **`2048`** (`0x0800` $= 8 \times 256 = 2048$).
- **Q2 (State of Process 1):** **`Running`** (state code `2`).
- **Q3 (Program Counter of Process 1):** **`0x000000000040A120`**.
- **Q4 (Open files of Process 1):** **`12`** (`0x0C`).
- **Q5 (64-bit Parent PCB Address of Process 1):** **`0x00000000C0000050`**.

---

### Process 2 (`0xC0001020` – `0xC000103F`)

| Field | Offset | Raw Bytes (LE) | Reversed Hex Value | Decoded Result |
| :--- | :---: | :--- | :--- | :--- |
| `process_id` | `+0x00` (4B) | `02 08 00 00` | `0x00000802` | **$2{,}050$** ($8 \times 16^2 + 2 = 2050$) |
| `process_state` | `+0x04` (4B) | `04 00 00 00` | `0x00000004` | **$4 \implies$ `TERMINATED`** |
| `program_counter` | `+0x08` (8B) | `50 B4 40 00 00 00 00 00` | `0x000000000040B450` | **`0x000000000040B450`** |
| `memory_limit` | `+0x10` (4B) | `00 00 20 00` | `0x00200000` | $2{,}097{,}152\text{ bytes}$ ($2\text{ MiB}$) |
| `open_files_count` | `+0x14` (4B) | `00 00 00 00` | `0x00000000` | **$0$** open files |
| `parent_pcb_ptr` | `+0x18` (8B) | `00 10 00 C0 00 00 00 00` | `0x00000000C0001000` | **`0x00000000C0001000`** |

- **Q6 (`process_id` of Process 2):** **`2050`** (`0x0802` $= 2048 + 2 = 2050$).
- **Q7 (State of Process 2):** **`Terminated`** (state code `4`).
- **Q8 (Program Counter of Process 2):** **`0x000000000040B450`**.
- **Q9 (Open files of Process 2):** **`0`** (`0x00`).
- **Q10 (64-bit Parent PCB Address of Process 2):** **`0x00000000C0001000`**.

> [!note] Forensic OS Insight: Zombie Process Signature
> Look at Process 2's decoded fields together: its state is **`TERMINATED`**, its `open_files_count` has already been cleaned up to `0`, yet its PCB still resides in kernel memory at `0xC0001020` with `parent_pcb_ptr = 0xC0001000`—pointing directly to **Process 1 (PID 2048)**, which is still **`RUNNING`**. This is the exact kernel-memory signature of a **zombie process** awaiting its parent to call `wait()` / `waitpid()` so the kernel can reap its PCB entry.

---

## Multiple Choice Questions

1. Based on the decoded `parent_pcb_ptr` fields and process states in the memory dump, what is the exact OS relationship between Process 1 (`0xC0001000`) and Process 2 (`0xC0001020`)?
    - **A)** Process 1 is an orphan child of Process 2
    - **B)** Process 2 is a terminated child of Process 1, consistent with a zombie process awaiting `wait()`
    - **C)** Both processes share the exact same parent PCB at `0xC0000050`
    - **D)** Process 1 and Process 2 are independent kernel threads sharing one stack

2. Why does the second PCB begin at address `0xC0001020` rather than `0xC0001018` or `0xC0001024`?
    - **A)** Because `sizeof(struct process_control_block)` is $32\text{ bytes}$ (`0x20`), consisting of four 4-byte `uint32_t` fields and two 8-byte `uint64_t` fields with no internal padding
    - **B)** Because the kernel inserts 8 bytes of random guard padding between adjacent PCBs
    - **C)** Because little-endian architectures double the size of 32-bit integers in memory
    - **D)** Because `parent_pcb_ptr` is stored in user space at offset `0x20`

3. [INPUT] Decode the little-endian bytes `00 08 00 00` at offset `+0x00` of Process 1 (`0xC0001000`). What is Process 1's `process_id` in decimal?

4. [INPUT] Decode the little-endian bytes `20 A1 40 00 00 00 00 00` at offset `+0x08` of Process 1. Write the 64-bit Program Counter in standard 16-hex-digit format (`0x...`).

5. [INPUT] What is Process 2's `memory_limit` in **MiB** given the little-endian bytes `00 00 20 00` at address `0xC0001030`?

6. [BLANK] Complete the decoded PCB summary table for Process 1 (`0xC0001000`) and Process 2 (`0xC0001020`):

| Process | PID (Decimal) | State Name | Open Files | 64-bit Parent PCB Pointer |
| :--- | :---: | :---: | :---: | :--- |
| **Process 1** | 2048 | {{1}} | {{2}} | `0x00000000C0000050` |
| **Process 2** | {{3}} | {{4}} | {{5}} | {{6}} |

### Answer Key & Explanations

1. **B)** Process 2's `parent_pcb_ptr` is `0x00000000C0001000` (Process 1's base address), Process 2 is in state `4` (`TERMINATED`) with `0` open files, and Process 1 is still `RUNNING`. A terminated child whose PCB has not yet been reaped by its living parent is a zombie process.
2. **A)** Summing the field widths in order: `0x00..0x03` (4B), `0x04..0x07` (4B), `0x08..0x0F` (8B — already 8-byte aligned!), `0x10..0x13` (4B), `0x14..0x17` (4B), `0x18..0x1F` (8B — also 8-byte aligned!). Total size is $32 = \text{0x20}$ bytes with zero padding.
3. **[2048; 2,048]** Reversing `00 08 00 00` yields `0x00000800` $= 8 \times 16^2 = 8 \times 256 = 2048$.
4. **[0x000000000040A120; 0x40A120]** Reversing the 8 little-endian bytes `20 A1 40 00 00 00 00 00` yields `0x000000000040A120`.
5. **[2; 2 MiB; 2MiB; 2 MB]** Reversing `00 00 20 00` gives `0x00200000` $= 2 \times 16^5 = 2 \times 2^{20}\text{ bytes} = 2\text{ MiB}$.
6. **[1: RUNNING/Running; 2: 12; 3: 2050/2,050; 4: TERMINATED/Terminated; 5: 0; 6: 0x00000000C0001000/0xC0001000]** Process 1 has state `0x02` (`RUNNING`) and `0x0C` (`12`) open files. Process 2 has PID `0x0802` (`2050`), state `0x04` (`TERMINATED`), `0` open files, and `parent_pcb_ptr` `0x00000000C0001000`.

## References & Navigation

- **Related Notes:** [[CSOPESY 04 - Processes]], [[CSOPESY 05 - Threads]], [[[QZ] CSOPESY Practice Quiz 1 - OS Foundations]], [[[QZ] CSOPESY Midterm Examination Compilation]]

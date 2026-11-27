---
id: csopesy_midterm_examination_compilation
type: note
course: CSOPESY
topic: "CSOPESY Midterm Examination Compilation"
status: completed
---

# [QZ] CSOPESY Midterm Examination Compilation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSOPESY]] #[[Operating Systems]] #[[CPU Scheduling]] #[[Processes]] #[[Threads]] #[[Quiz]] #[[Reviewer]]

---

## Overview

This compilation provides a fully verified, mathematically audited solution guide for the 44-question **CSOPESY Midterm Examination**, spanning OS foundations and kernel architecture (Questions 1–17), single-core Round Robin CPU scheduling (Questions 18–27), dual-core Preemptive SJF / SRTF multiprocessor scheduling (Questions 28–29), and C++ `Process` class program analysis (Questions 30–44). Every conceptual answer is paired with distractor elimination, every scheduling trace is derived tick-by-tick, and discrepancies in the original Round Robin summary options (Q26–Q27) are explicitly proved and resolved.

```mermaid
flowchart LR
    P1["Part I: OS Concepts & Architecture (Q1-Q17)"] --> P2["Part II: Round Robin q=3 Trace (Q18-Q27)"]
    P2 --> P3["Part III: 2-Core Preemptive SJF (Q28-Q29)"]
    P3 --> P4["Part IV: C++ Process Class Analysis (Q30-Q44)"]
```

---

## Part I: Conceptual Multiple Choice (Questions 1–17)

### Question 1
**Prompt:** Which of the following best describes the difference in OS development between an actual kernel versus an emulator, such as the CSOPESY emulator?
- The CSOPESY emulator is only limited to simulating a small set of scheduling algorithms.
- **Actual kernel development involves the need for bootloading, ISO generation, and the use of a virtual machine.** *(Correct)*
- Developers of the CSOPESY emulator also need to consider the CPU's instruction set if it's x86-based, ARM-based, or RISC-based.
- Actual kernel programs and CSOPESY emulator programs can both be compiled as a `.exe` file.
- Actual kernel programs and CSOPESY emulator programs require the creation of system-level APIs from scratch.

**Solution:** Building a real bare-metal OS kernel requires writing or configuring a bootloader, packaging an ISO/disk image, and booting it on hardware or a virtual machine (QEMU/VirtualBox). In contrast, the CSOPESY emulator is a user-space C++ application compiled with host OS libraries into a standard executable, so it does not require bare-metal ISA handling, bootloading, or rebuilding host system APIs from scratch.

---

### Question 2
**Prompt:** Which of the following statements is/are TRUE for threads and processes?
- Multiple tasks inside an application can be handled by different threads.
- Process creation is heavy-weight while thread creation is light-weight.
- Using multiple processes/threads increase efficiency of a program.
- **All of the above** *(Correct)*
- None of the above

**Solution:** All three statements are true. Threads execute concurrent tasks within one process, spawning a thread avoids duplicating an entire address space (making it lightweight relative to `fork()`), and concurrency/parallelism via threads or processes improves responsiveness and multi-core throughput.

---

### Question 3
**Prompt:** A server application creates hundreds of short-lived client tasks every minute. To avoid the performance overhead of constantly invoking thread creation and destruction system calls, which technique should the software use?
- Deferred cancellation
- Signal handlers
- **A Thread Pool** *(Correct)*
- Non-maskable hardware interrupts

**Solution:** A **thread pool** pre-creates a bounded set of worker threads at startup and reuses them across incoming tasks, eliminating repeated creation/teardown overhead while bounding peak concurrency.

---

### Question 4
**Prompt:** Which C++ function under the `conio.h` library detects when a key has been pressed?
- **`_kbhit()`** *(Correct)*
- `getch()`
- `GetAsyncKeyState(int vkey)`
- `OnKeyPressed()`
- `PollKeyboard (KeyboardEventHandler keyboardHandler)`

**Solution:** `_kbhit()` (defined in `<conio.h>`) performs a non-blocking check returning a nonzero integer if a keystroke is waiting in the console input buffer. `getch()` blocks until a key is read, `GetAsyncKeyState()` belongs to Win32 `<windows.h>`, and the remaining options are non-standard custom names.

---

### Question 5
**Prompt:** A programmer invokes a system call that requires 10 different configuration arguments, exceeding the number of available CPU registers. How does the operating system typically receive these parameters?
- By forcing the process to make 10 consecutive individual system calls.
- **By storing parameters in a block/table in memory and passing the block's memory address in a single register.** *(Correct)*
- By writing the parameters directly onto the secondary storage boot sector.
- By escalating the user program to run permanently in kernel mode.

**Solution:** When parameter counts exceed register capacity, OSes (including Linux and Solaris) store the parameters in a contiguous memory block/table (or push them onto the stack) and pass only the starting pointer in a single CPU register.

---

### Question 6
**Prompt:** This is a mechanism that allows an application to determine if a key has been pressed in real time.
- Event-Driven Application
- Interrupt Mechanism
- **Keyboard Polling** *(Correct)*
- Keyboard Event Handling
- Message Passing

**Solution:** **Keyboard polling** continuously checks the keyboard input status inside a real-time execution loop (e.g., via `_kbhit()`) without blocking, allowing real-time console applications to detect keypresses on every frame tick.

---

### Question 7
**Prompt:** Which of the following best describes the role of device drivers in an operating system?
- Manage memory allocation
- **Facilitate communication between the OS and hardware devices** *(Correct)*
- Execute user applications
- Control network protocols
- All of the above

**Solution:** Device drivers encapsulate hardware-specific controller commands and expose a uniform kernel I/O interface so the OS can communicate with diverse peripherals without embedding device-specific logic in the core kernel.

---

### Question 8
**Prompt:** In what way do operating systems enhance user experience?
- By minimizing the need for hardware interaction.
- **By providing efficient resource management and multitasking capabilities.** *(Correct)*
- By eliminating the need for programming languages.
- By increasing the computational power of the hardware.
- All of the above.

**Solution:** Operating systems cannot physically increase hardware clock speed or eliminate programming languages (eliminating "All of the above"). They improve responsiveness and productivity by managing CPU/RAM/I/O resources efficiently and enabling smooth multitasking.

---

### Question 9
**Prompt:** A legacy embedded controller is designed with a monolithic kernel. The engineering team decides to port it to a microkernel architecture like the Mach operating system to improve fault isolation. What structural architectural change occurs?
- All user processes are moved into the kernel address space.
- **Nonessential kernel components (such as device drivers and file systems) are moved to user space and communicate via message passing.** *(Correct)*
- The operating system replaces all system calls with direct register mapping.
- System libraries are completely removed and merged into hardware firmware.

**Solution:** Microkernels retain only minimal primitives (basic scheduling, low-level memory management, and IPC) in kernel mode while migrating file systems, device drivers, and network stacks into isolated user-space servers communicating over message passing.

---

### Question 10
**Prompt:** A system engineer investigates an issue where a kernel module crashes the entire system due to an invalid memory pointer dereference. What architectural property of monolithic kernels makes this failure fatal?
- Monolithic kernels execute drivers in user space via IPC.
- **All monolithic kernel components share the same address space without hardware memory protection between subsystems.** *(Correct)*
- Monolithic kernels lack an interrupt service table.
- The microkernel message bus cannot handle invalid pointers.

**Solution:** Because every driver and subsystem inside a monolithic kernel executes in privileged kernel mode within a single shared address space, a stray pointer dereference corrupts kernel memory and forces a full kernel panic.

---

### Question 11
**Prompt:** An application uses a user-level thread library based on the Many-to-One multithreading model. While running on a quad-core processor, one thread issues a blocking I/O system call. What is the impact on the application?
- Only the calling thread blocks; the other threads continue running in parallel across the remaining cores.
- **The entire process blocks in the kernel because the single associated kernel thread is blocked.** *(Correct)*
- The OS automatically converts the process to the One-to-One model at runtime.
- The user thread library spawns a replacement kernel thread without delay.

**Solution:** In the Many-to-One model, all user threads are multiplexed onto a single kernel schedulable entity. When any user thread blocks in a kernel system call, the sole kernel thread sleeps, stalling the entire process even on a multi-core CPU.

---

### Question 12
**Prompt:** Which of the following statements is/are TRUE for threads and processes?
- A) Threads are lightweight tasks inside a program.
- B) A program can have multiple processes.
- C) Processes can share resources across other processes.
- **Both A and B** *(Correct)*
- Both B and C

**Solution:** Threads are lightweight units of execution inside a process (A is true), and a single application/program can spawn multiple cooperating processes—such as multi-process web browsers (B is true). By default, distinct processes run in isolated address spaces and do not natively share resources without explicit OS-mediated IPC mechanisms, making **Both A and B** the intended answer.

---

### Question 13
**Prompt:** Two cooperating scientific processes need to exchange gigabytes of numerical data per second on the same physical workstation. Which Interprocess Communication (IPC) mechanism provides maximum transfer throughput with minimal OS overhead?
- Message queues passing copies through the kernel
- Unidirectional anonymous pipes
- **Shared memory regions established between the processes** *(Correct)*
- Remote Procedure Calls (RPC) over localhost network sockets

**Solution:** **Shared memory** requires kernel involvement only during initial segment creation/attachment. Once mapped into both processes' page tables, reads and writes proceed directly at RAM speed with zero kernel copying.

---

### Question 14
**Prompt:** A developer uses GCC to build a C program split across multiple modules (`math.c`, `main.c`). Which utility is responsible for resolving external symbol references between object files and producing the final executable binary?
- Assembler
- Loader
- **Linker** *(Correct)*
- Compiler preprocessor

**Solution:** The **linker** (`ld`) combines relocatable object files (`math.o`, `main.o`) and libraries, resolves cross-module external symbols, and emits the executable binary. The assembler produces `.o` files from assembly, and the loader maps the finished executable into RAM at launch.

---

### Question 15
**Prompt:** A system programmer is designing a secure kernel service. To maintain modularity, the team decides to enforce a strict separation of mechanism and policy. Which of the following illustrates a "policy"?
- Utilizing a programmable hardware timer to generate interrupts.
- **Allocating a maximum time slice of 10 milliseconds to interactive user threads.** *(Correct)*
- Implementing a bit flag to indicate kernel vs. user execution mode.
- Providing a system call vector table in low memory.

**Solution:** **Mechanism** determines *how* to do something (hardware timer, mode bit, syscall vector table); **policy** decides *what* will be done—such as selecting a $10\text{ ms}$ time quantum for interactive threads.

---

### Question 16
**Prompt:** Which of the following statements is/are TRUE for scheduling algorithms?
- *Statement A:* First-come-first-serve does not exhibit a convoy effect (short processes waiting for long processes to finish). *(FALSE — FCFS is the textbook cause of the convoy effect.)*
- *Statement B:* The shortest-job-first does not yield a high CPU utilization. *(FALSE — SJF keeps the CPU utilized while minimizing average waiting time.)*
- *Statement C:* The round-robin is like a first-come-first-serve scheduling if the time slice given per process is always greater than the CPU burst required by each process. *(TRUE)*
- *Statement D:* It is possible for processes to be 'promoted' 1 level higher in a multi-level queue scheduler. *(FALSE — standard **Multilevel Queue (MLQ)** statically pins processes to fixed queues; queue promotion/demotion belongs to **Multilevel Feedback Queue (MLFQ)**.)*

*Choices:*
- Statements A and B
- Statements B and C
- Statements C and D
- All of the above
- **None of the above** *(Correct)*

**Solution:** Only Statement C is true (A, B, and D are all false). Because no choice lists Statement C alone, the strictly correct choice is **None of the above**. *(Key distinction: MLQ forbids inter-queue migration, whereas MLFQ permits promotion and demotion.)*

---

### Question 17
**Prompt:** Which of the following statements about real-time and event-driven applications is true?
- All real-time applications still require functionality that waits for events before performing respective tasks. *(FALSE — real-time loops execute continuously on a fixed tick/frame without blocking for events.)*
- All event-driven applications are derived from real-time applications. *(FALSE — event-driven architectures are independent of real-time execution loops.)*
- Real-time applications only refresh the screen if there is an input or event. *(FALSE — this describes event-driven GUIs, not real-time applications.)*
- Event-driven applications always need to handle keyboard events. *(FALSE — event-driven programs may respond exclusively to network, timer, mouse, or sensor events.)*
- **None of the above** *(Correct)*

**Solution:** All four specific claims mischaracterize either real-time or event-driven design paradigms; therefore **None of the above** is correct.

---

## Part II: Round Robin Scheduler Trace (Questions 18–27)

### Reference Process Table (Round Robin, Time Quantum $q = 3$)

| Process | Arrival Time ($AT$) | CPU Burst ($BT$) |
| :---: | :---: | :---: |
| **P1** | $0$ | $7$ |
| **P2** | $3$ | $5$ |
| **P3** | $6$ | $6$ |
| **P4** | $9$ | $3$ |

**Queue Convention (Standard CSOPESY Rule):** When a new process arrives at the exact timestamp a running process's quantum expires, the **newly arrived process enters the ready queue before the preempted process is re-enqueued**.

### Complete Slice-by-Slice Ready Queue Trace

| Slice | Time Window | Running | Remaining After | New Arrival at Boundary | Ready Queue After Slice (Front $\to$ Tail) |
| :---: | :---: | :---: | :---: | :--- | :--- |
| **1** | $0 \to 3$ | **P1** | $4$ | $P_2$ ($t=3$) | `[P2, P1]` |
| **2** | $3 \to 6$ | **P2** | $2$ | $P_3$ ($t=6$) | `[P1, P3, P2]` |
| **3** | $6 \to 9$ | **P1** | $1$ | $P_4$ ($t=9$) | `[P3, P2, P4, P1]` |
| **4** | $9 \to 12$ | **P3** | $3$ | — | `[P2, P4, P1, P3]` |
| **5** | $12 \to 14$ | **P2** | $0$ (**Done**, $CT=14$) | — | `[P4, P1, P3]` |
| **6** | $14 \to 17$ | **P4** | $0$ (**Done**, $CT=17$) | — | `[P1, P3]` |
| **7** | $17 \to 18$ | **P1** | $0$ (**Done**, $CT=18$) | — | `[P3]` |
| **8** | $18 \to 21$ | **P3** | $0$ (**Done**, $CT=21$) | — | `[]` |

**Gantt Chart:**
```text
|  P1  |  P2  |  P1  |  P3  | P2 |  P4  |P1|  P3  |
0      3      6      9     12   14     17 18     21
```

### Verified Process Metrics

| Process | AT | BT | First Start | CT | TAT ($CT - AT$) | WT ($TAT - BT$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | $0$ | $7$ | $0$ | $18$ | $18$ | $11$ |
| **P2** | $3$ | $5$ | $3$ | $14$ | $11$ | $6$ |
| **P3** | $6$ | $6$ | $9$ | $21$ | $15$ | $9$ |
| **P4** | $9$ | $3$ | $14$ | $17$ | $8$ | $5$ |

$$\text{Avg } TAT = \frac{18 + 11 + 15 + 8}{4} = \frac{52}{4} = \mathbf{13.00}, \qquad \text{Avg } WT = \frac{11 + 6 + 9 + 5}{4} = \frac{31}{4} = \mathbf{7.75}$$

### Verified Answers for Questions 18–27

| Question | Prompt | Verified Answer | Justification |
| :---: | :--- | :---: | :--- |
| **Q18** | Ready queue contents at $t = 10$ (in order) | **`P2, P4, P1`** | At $t = 9$, $P_3$ is dispatched from `[P3, P2, P4, P1]`; throughout $t \in [9, 12)$, the ready queue holds `P2, P4, P1`. |
| **Q19** | Process running at $t = 15$ | **`P4`** | Slice 6 runs $P_4$ from $t = 14$ to $t = 17$. |
| **Q20** | Time $P_3$ first starts running | **`9`** | $P_3$ arrives at $t = 6$ and is first dispatched at $t = 9$. |
| **Q21** | Completion time of $P_4$ | **`17`** | $P_4$ ($BT = 3$) runs in one full slice $14 \to 17$. |
| **Q22** | Which process finishes first? | **`P2`** | $CT_{P2} = 14$ (before $P_4$ at $17$, $P_1$ at $18$, $P_3$ at $21$). |
| **Q23** | Which process finishes last? | **`P3`** | $CT_{P3} = 21$. |
| **Q24** | Shortest turnaround time | **`P4`** | $TAT_{P4} = 8$ (smallest among $18, 11, 15, 8$). |
| **Q25** | Longest waiting time | **`P1`** | $WT_{P1} = 11$ (largest among $11, 6, 9, 5$). |
| **Q26** | Average turnaround time | **`13.00`** *(See Audit Note)* | Exact value for the 4-process table: $52 / 4 = 13.00$. |
| **Q27** | Average waiting time | **`7.75`** *(See Audit Note)* | Exact value for the 4-process table: $31 / 4 = 7.75$. |

> [!warning] Mathematical Audit Note on Questions 26 & 27 (Original Exam Option Discrepancy)
> In the raw exam transcript, Q26 listed choices `{11.6, 11.8, 12.0, 12.2, 12.4}` and Q27 listed `{7.2, 7.3, 7.4, 7.5, 7.6}`—while Q19 and Q22–Q25 also included `P5` as an option. For **any** valid Round Robin schedule of the 4 integer-valued processes given in the table ($P_1$–$P_4$), the sum of turnaround times and sum of waiting times are integers divided by $4$, which can only end in `.00`, `.25`, `.50`, or `.75` (never `.2, .3, .4, .6, .8`), and $\text{Avg } TAT - \text{Avg } WT = \text{Avg } BT = 21/4 = 5.25$. Exhaustive verification of all $2^3 = 8$ boundary tie-breaking combinations confirms:
> - **Standard convention** (arrivals before re-queue): $\text{Avg } TAT = \mathbf{13.00}$, $\text{Avg } WT = \mathbf{7.75}$.
> - **Reverse boundary at $t = 9$** ($P_1$ re-queued before $P_4$): $\text{Avg } TAT = \mathbf{12.50}$, $\text{Avg } WT = \mathbf{7.25}$.
> - **Strict re-queue before arrival everywhere**: $\text{Avg } TAT = \mathbf{11.50}$, $\text{Avg } WT = \mathbf{6.25}$.
>
> Thus, the decimal-tenth choices in Q26–Q27 reflect either an omitted 5th process row (`P5`) in the transcript or an errant option key on the original exam. For the given 4-process table, **`13.00`** and **`7.75`** are the exact answers.

---

## Part III: Multi-Core CPU Scheduling — 2-Core Preemptive SJF (Questions 28–29)

### Reference Process Table (Preemptive SJF / SRTF Across 2 CPUs)

| Process | Arrival Time ($AT$) | CPU Burst ($BT$) |
| :---: | :---: | :---: |
| **P1** | $0$ | $8$ |
| **P2** | $2$ | $6$ |
| **P3** | $3$ | $2$ |
| **P4** | $5$ | $4$ |
| **P5** | $8$ | $5$ |

**Tie-Breaking Rule:** When a tie occurs between running processes with equal remaining burst times, the **process that arrived earlier retains its CPU** while the later-arriving process is preempted. Unoccupied core ticks are labeled `0`.

### Tick-by-Tick Dual-Core Scheduling Trace

| Time ($t$) | Active Pool `(Process: Rem)` | Decision Logic | CPU0 | CPU1 |
| :---: | :--- | :--- | :---: | :---: |
| **$0$** | `P1:8` | Only $P_1$ available; CPU1 idle | `P1` | `0` |
| **$1$** | `P1:7` | Only $P_1$ available; CPU1 idle | `P1` | `0` |
| **$2$** | `P1:6, P2:6` | $P_2$ arrives; assigned to idle CPU1 | `P1` | `P2` |
| **$3$** | `P1:5, P2:5, P3:2` | $P_3(2)$ preempts one of `P1(5)`/`P2(5)`. Tie at rem $= 5$: **$P_1$ arrived earlier ($0 < 2$) and retains CPU0; $P_2$ is preempted on CPU1** | `P1` | `P3` |
| **$4$** | `P1:4, P2:5, P3:1` | Shortest two are $P_3(1)$ and $P_1(4)$ | `P1` | `P3` |
| **$5$** | `P1:3, P2:5, P4:4` | $P_3$ done ($CT=5$); $P_4(4)$ arrives; $P_4(4) < P_2(5) \implies P_4$ takes CPU1 | `P1` | `P4` |
| **$6$** | `P1:2, P2:5, P4:3` | Shortest two are $P_1(2)$ and $P_4(3)$ | `P1` | `P4` |
| **$7$** | `P1:1, P2:5, P4:2` | Shortest two are $P_1(1)$ and $P_4(2)$ | `P1` | `P4` |
| **$8$** | `P2:5, P4:1, P5:5` | $P_1$ done ($CT=8$); $P_5(5)$ arrives. Tie between $P_2(5)$ and $P_5(5)$: **$P_2$ arrived earlier ($2 < 8$) and takes CPU0** | `P2` | `P4` |
| **$9$** | `P2:4, P5:5` | $P_4$ done ($CT=9$); $P_5$ takes CPU1 | `P2` | `P5` |
| **$10$** | `P2:3, P5:4` | Both continue | `P2` | `P5` |
| **$11$** | `P2:2, P5:3` | Both continue | `P2` | `P5` |
| **$12$** | `P2:1, P5:2` | Both continue | `P2` | `P5` |
| **$13$** | `P5:1` | $P_2$ done ($CT=13$); CPU0 idle, $P_5$ finishes on CPU1 | `0` | `P5` |
| **$14$** | Empty | $P_5$ done ($CT=14$); both cores idle | `0` | `0` |

### Question 28 Solution: Multi-Core Timeline Grid (Time 0 to 14)

| Core | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **CPU0** | `P1` | `P1` | `P1` | `P1` | `P1` | `P1` | `P1` | `P1` | `P2` | `P2` | `P2` | `P2` | `P2` | `0` | `0` |
| **CPU1** | `0` | `0` | `P2` | `P3` | `P3` | `P4` | `P4` | `P4` | `P4` | `P5` | `P5` | `P5` | `P5` | `P5` | `0` |

### Question 29 Solution: Turnaround Time & Wait Time Table

| Process | Arrival Time ($AT$) | Burst Time ($BT$) | Completion Time ($CT$) | Turnaround Time ($TAT = CT - AT$) | Wait Time ($WT = TAT - BT$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | $0$ | $8$ | $8$ | **$8$** | **$0$** |
| **P2** | $2$ | $6$ | $13$ | **$11$** | **$5$** |
| **P3** | $3$ | $2$ | $5$ | **$2$** | **$0$** |
| **P4** | $5$ | $4$ | $9$ | **$4$** | **$0$** |
| **P5** | $8$ | $5$ | $14$ | **$6$** | **$1$** |

**Summary Averages:** $\text{Avg } TAT = (8 + 11 + 2 + 4 + 6) / 5 = 31 / 5 = \mathbf{6.20}$, $\text{Avg } WT = (0 + 5 + 0 + 0 + 1) / 5 = 6 / 5 = \mathbf{1.20}$.

---

## Part IV: C++ `Process` Class Program Analysis (Questions 30–44)

### Reference C++ Header

```cpp
class Process {
public:
    struct RequirementFlags
    {
        bool requireFiles;
        int numFiles;
        bool requireMemory;
        int memoryRequired;
    };
    enum ProcessState
    {
        READY,
        RUNNING,
        WAITING,
        FINISHED
    };
    Process(int pid, String name, RequirementFlags requirementFlags);
    void addCommand(ICommand::CommandType commandType);
    void executeCurrentCommand() const;
    void moveToNextLine();
    bool isFinished() const;
    int getRemainingTime() const;
    int getCommandCounter() const;
    int getLinesOfCode() const;
    int getPID() const;
    int getCPUCoreID() const;
    ProcessState getState() const;
    String getName() const;
    void test_generateRandomCommands(int limit);

private:
    int pid;
    String name;
    typedef std::vector<std::shared_ptr<ICommand>> CommandList;
    CommandList commandList;
    int commandCounter;
    int cpuCoreID = -1;
    RequirementFlags requirementFlags;
    ProcessState currentState;
    friend class ResourceEmulator;
};
```

### Verified Solutions for Questions 30–44

| Q# | Focus | Verified Answer | Rationale |
| :---: | :--- | :--- | :--- |
| **Q30** | Essential constructor setup arguments | **`pid` (identity), `name` (description), `requirementFlags` (resource needs)** | Directly matches the constructor signature `Process(int pid, String name, RequirementFlags requirementFlags)`. |
| **Q31** | State transition upon clean completion | **It would transition to `FINISHED`.** | Matches the terminal enum literal `ProcessState::FINISHED` (distinct from `READY` and `WAITING`). |
| **Q32** | Check required for `requireMemory = true, memoryRequired = 2048` | **Confirm that the system can allocate 2048 units of memory for the process.** | Before dispatching a process to `RUNNING`, the resource allocator must verify sufficient memory capacity exists. |
| **Q33** | Populating 3 commands (load file, ADD, PRINT) before execution | **Call `addCommand()` three times, each with a different `ICommand::CommandType`.** | `addCommand()` appends typed `ICommand` instructions to `commandList`; `executeCurrentCommand()` and `moveToNextLine()` run existing commands. |
| **Q34** | Most direct check for removal upon completion | **`if (process.isFinished())`** | Encapsulates completion detection cleanly in a single boolean predicate method. |
| **Q35** | Private members defining identity & immediate resource profile | **`pid`, `name`, and `requirementFlags`.** | These three private fields directly store the constructor-injected identity and resource requirements. |
| **Q36** | Mechanism letting `ResourceEmulator` mutate private `currentState` | **`ResourceEmulator` is declared as a friend of the `Process` class.** | Line `friend class ResourceEmulator;` grants full access to private members without exposing public setters. |
| **Q37** | Method called after `executeCurrentCommand()` to advance PC | **`moveToNextLine()`** | Increments the internal instruction pointer (`commandCounter`) because `executeCurrentCommand() const` cannot mutate state. |
| **Q38** | Primary benefit of `std::shared_ptr<ICommand>` | **It enables multiple `Process` objects or other entities to safely share ownership of the same `ICommand` instance.** | `std::shared_ptr` uses reference counting to support shared ownership and automatic deallocation, unlike exclusive `std::unique_ptr`. |
| **Q39** | Meaning of `getCPUCoreID()` returning `-1` | **The process is unassigned and is eligible for placement on an available CPU core.** | `cpuCoreID` defaults to `-1` as a sentinel indicating no core is currently assigned. |
| **Q40** | Public method displaying total process workload / complexity | **`getLinesOfCode()`** | Returns the total command count in `commandList`, whereas `getRemainingTime()` reflects only unexecuted work. |
| **Q41** | Filtering suspended / I/O-waiting processes | **`getState()` checked against `Process::WAITING`.** | Directly matches the `WAITING` state in `enum ProcessState`. |
| **Q42** | Pre-loading a specified number of commands for testing | **`test_generateRandomCommands()`** | Accepts `int limit` to bulk-populate `commandList` with random test commands. |
| **Q43** | Metric decreasing toward zero during execution | **`getRemainingTime()`** | Counts remaining instructions/ticks (`linesOfCode - commandCounter`), declining to `0` as execution advances. |
| **Q44** | Statement causing a compilation error outside `Process` / `ResourceEmulator` | **`myProcess.currentState = Process::FINISHED;`** | `currentState` is declared `private`; external functions cannot write to it directly, whereas `addCommand`, `executeCurrentCommand`, and `getState` are `public`. |

---

## Multiple Choice Questions

1. Under the separation of mechanism and policy in operating system design, which of the following is a **policy** rather than a mechanism?
    - **A)** Using a programmable hardware timer to fire periodic interrupts
    - **B)** Maintaining a hardware mode bit to distinguish User Mode from Kernel Mode
    - **C)** Assigning a $10\text{ ms}$ maximum time quantum to interactive user threads
    - **D)** Storing ISR function pointers in a low-memory interrupt vector table

2. Why is Statement D in Question 16 (*"It is possible for processes to be promoted 1 level higher in a multi-level queue scheduler"*) false?
    - **A)** Because standard Multilevel Queue (MLQ) statically assigns each process to a fixed queue; inter-queue promotion and demotion exist only in Multilevel Feedback Queue (MLFQ)
    - **B)** Because priority queues can never preempt lower-priority queues
    - **C)** Because processes in an MLQ can only be demoted downward, never promoted upward
    - **D)** Because MLQ only supports single-core non-preemptive FCFS

3. In the C++ `Process` class from Part IV, why can `ResourceEmulator` directly assign `proc.currentState = Process::WAITING;` while an external scheduler function causes a compilation error doing the same?
    - **A)** Because `ResourceEmulator` inherits publicly from `Process`
    - **B)** Because `Process` declares `friend class ResourceEmulator;`, granting private member access solely to `ResourceEmulator`
    - **C)** Because `currentState` is declared `protected` inside `Process`
    - **D)** Because `enum ProcessState` is defined in the `public` section of `Process`

4. In the C++ `Process` class, why must `moveToNextLine()` be invoked separately after `executeCurrentCommand()`?
    - **A)** Because `executeCurrentCommand()` is declared `const`, so it cannot modify `commandCounter` to advance execution
    - **B)** Because `executeCurrentCommand()` automatically resets `commandCounter` back to `0`
    - **C)** Because `moveToNextLine()` allocates the `std::shared_ptr<ICommand>` entries in `commandList`
    - **D)** Because `executeCurrentCommand()` transitions `currentState` directly to `FINISHED`

5. [INPUT] In Part II (Round Robin, $q = 3$, processes $P_1(0,7)$, $P_2(3,5)$, $P_3(6,6)$, $P_4(9,3)$ with standard arrival-before-requeue order), at what timestamp does $P_4$ complete execution?

6. [INPUT] In Part II (Round Robin, $q = 3$, 4-process table), what is the exact **Average Waiting Time** across $P_1$–$P_4$?

7. [INPUT] In Part III (2-Core Preemptive SJF across $P_1$–$P_5$), what is the **Average Waiting Time** across all five processes?

8. [BLANK] Complete the verified **Part II Round Robin ($q = 3$)** execution milestones:

| Metric | Ready Queue at $t = 10$ | Running at $t = 15$ | First Start of $P_3$ | Process Finishing First | Process Finishing Last |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Value** | {{1}} | {{2}} | {{3}} | {{4}} | {{5}} |

9. [BLANK] Complete the verified **Part III Dual-Core Preemptive SJF** Turnaround Time ($TAT$) and Wait Time ($WT$) table:

| Process | Arrival ($AT$) | Burst ($BT$) | Completion ($CT$) | Turnaround Time ($TAT$) | Wait Time ($WT$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **P1** | 0 | 8 | 8 | {{1}} | {{2}} |
| **P2** | 2 | 6 | {{3}} | {{4}} | {{5}} |
| **P5** | 8 | 5 | {{6}} | 6 | 1 |

10. [MSQ] Which of the following statements from the Midterm Examination Compilation are TRUE? (Select all that apply)
    - **A)** `_kbhit()` in `<conio.h>` performs non-blocking detection of a pending keystroke
    - **B)** In the Many-to-One threading model, one blocking I/O system call blocks the entire process
    - **C)** Shared memory IPC provides the highest throughput for gigabyte-scale same-host transfers because data is not copied through the kernel
    - **D)** In the 2-Core Preemptive SJF tie at $t = 3$ (`P1` rem 5 vs. `P2` rem 5), $P_2$ retains its core while $P_1$ is preempted

### Answer Key & Explanations

1. **C)** Mechanism specifies *how* a capability is implemented (timers, mode bits, interrupt tables), whereas policy decides *what* operational parameter or rule to enforce—here, a $10\text{ ms}$ time slice for interactive threads.
2. **A)** In a classic Multilevel Queue (MLQ) scheduler, processes are permanently assigned to a single queue based on job class. Dynamic movement (promotion/demotion) between queues is the defining feature of Multilevel Feedback Queue (MLFQ).
3. **B)** `currentState` is a `private` member of `Process`, so external non-friend functions trigger a compiler access error. Declaring `friend class ResourceEmulator;` explicitly permits `ResourceEmulator` to bypass private access restrictions.
4. **A)** The signature `void executeCurrentCommand() const;` guarantees the method does not modify member variables of `Process`, so advancing `commandCounter` requires calling the non-`const` mutator `moveToNextLine()`.
5. **[17; t=17; t = 17]** $P_4$ ($AT = 9, BT = 3$) executes in Slice 6 from $t = 14$ to $t = 17$, completing at $CT = 17$.
6. **[7.75; 31/4]** Waiting times for the 4-process table under standard arrival-before-requeue are $P_1 = 11$, $P_2 = 6$, $P_3 = 9$, and $P_4 = 5$, giving $(11 + 6 + 9 + 5) / 4 = 31 / 4 = 7.75$.
7. **[1.2; 1.20; 6/5]** In the 2-core SRTF schedule, waiting times are $P_1 = 0$, $P_2 = 5$, $P_3 = 0$, $P_4 = 0$, and $P_5 = 1$, giving $(0 + 5 + 0 + 0 + 1) / 5 = 6 / 5 = 1.20$.
8. **[1: P2, P4, P1/P2,P4,P1; 2: P4/p4; 3: 9; 4: P2/p2; 5: P3/p3]** At $t = 9$, $P_3$ begins running ($9 \to 12$) leaving `[P2, P4, P1]` in the ready queue at $t = 10$. $P_4$ runs $14 \to 17$ (active at $t = 15$), $P_2$ completes first at $t = 14$, and $P_3$ completes last at $t = 21$.
9. **[1: 8; 2: 0; 3: 13; 4: 11; 5: 5; 6: 14]** $P_1$ runs continuously $0 \to 8$ ($TAT = 8, WT = 0$). $P_2$ runs $2 \to 3$, is preempted until $t = 8$, and finishes $8 \to 13$ ($CT = 13, TAT = 11, WT = 5$). $P_5$ waits $8 \to 9$ and finishes $9 \to 14$ ($CT = 14$).
10. **A, B, C)** `_kbhit()` checks console input without blocking (A), Many-to-One maps all user threads onto a single kernel thread so any blocking syscall stalls the whole process (B), and shared memory avoids per-transfer kernel copies (C). D is false because the earlier-arriving process ($P_1$, $AT = 0$) retains CPU0 while $P_2$ ($AT = 2$) is preempted by $P_3$ on CPU1.

## References & Navigation

- **Related Notes:** [[CSOPESY 01 - Introduction]], [[CSOPESY 02 - Operating System Structure]], [[CSOPESY 03 - IO and Display]], [[CSOPESY 04 - Processes]], [[CSOPESY 05 - Threads]], [[CSOPESY 06 - CPU Scheduling]], [[CSOPESY 07 - Synchronization Tools]], [[[QZ] CSOPESY Midterm Mock Exam]], [[[EX] Exercise 1 - CPU Scheduling (FCFS and SJF)]], [[[EX] Exercise 2 - CPU Scheduling (Priority and SRTF)]], [[[EX] Exercise 3 - CPU Scheduling (Round Robin)]], [[[EX] Exercise 4 - Process Control Block Analysis]]

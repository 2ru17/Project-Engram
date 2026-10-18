---
id: csopesy_practice_quiz_1_os_foundations
type: note
course: CSOPESY
topic: "CSOPESY Practice Quiz 1 - OS Foundations"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSOPESY]] #[[Operating Systems]] #[[Quiz]] #[[Reviewer]]

---

# CSOPESY Practice Quiz 1: OS Foundations (Weeks 1-5)

## Overview

This quiz covers the conceptual foundations of CSOPESY from Weeks 1 through 5: OS introduction and roles, OS architectural structures, I/O subsystems, process management, and multithreading. All questions are multiple choice. Aim for a passing score of 70% (14/20) before the midterm.

**Coverage:**
- Module 1: OS Introduction and OS Structure (Notes 01, 02)
- Module 2: I/O and Display, Processes, Threads (Notes 03, 04, 05)

---

## Multiple Choice Questions

1. A large factory automation system runs with no keyboard, mouse, or display. Its operating system must run silently, managing sensors and actuators without human interaction. From which OS perspective does this best exemplify?
    - **A)** User View — maximizing ease of use
    - **B)** System View — acting as a resource allocator
    - **C)** User View — designed for embedded, headless operation
    - **D)** System View — acting as a control program for interactive sessions

2. A hardware device has finished an operation and needs to notify the CPU. It asserts an electrical signal on the system bus. The CPU immediately suspends its current task, saves its context, and jumps to a handler routine. What is the table of function pointers that maps signal numbers to these handler routines called?
    - **A)** Process Control Block (PCB)
    - **B)** Interrupt Vector Table
    - **C)** Page Table
    - **D)** System Call Interface

3. A system has a cache access time of $T_c = 2$ ns and a main memory access time of $T_m = 100$ ns. Under the sequential access model (cache is checked first, memory accessed only on a miss), what is the Effective Access Time (EAT) when the cache hit ratio $H = 0.90$?
    - **A)** 11.8 ns
    - **B)** 12.0 ns
    - **C)** 92.0 ns
    - **D)** 10.0 ns

4. Which of the following represents a Non-Maskable Interrupt (NMI)?
    - **A)** A keystroke from the user keyboard
    - **B)** A network packet arriving at the NIC
    - **C)** A hardware memory parity error signaling data corruption
    - **D)** A printer completing a print job

5. A developer wants to call a function that requires full hardware privileges — for example, modifying the CPU's memory management registers. Under Dual-Mode Operation, what must happen for this to execute safely?
    - **A)** The application can call it directly because all code runs in the same mode
    - **B)** The CPU must be in User Mode (mode bit = 1) to allow privileged operations
    - **C)** The application triggers a system call (software interrupt), switching the CPU to Kernel Mode (mode bit = 0), where the OS executes the privileged instruction
    - **D)** The compiler automatically inserts mode-switching instructions during compilation

6. Which OS architectural design runs all kernel services — including device drivers, file systems, and memory management — in a single large binary sharing one address space?
    - **A)** Microkernel
    - **B)** Layered Architecture
    - **C)** Monolithic Kernel
    - **D)** Loadable Kernel Modules

7. A device driver crashes on a microkernel-based operating system. What is the most likely outcome, and why?
    - **A)** The entire OS crashes, because all services share one kernel address space
    - **B)** Only the driver process crashes; the kernel remains stable because drivers run in user space
    - **C)** The CPU enters an infinite loop because there is no interrupt handler available
    - **D)** The OS automatically reloads the monolithic kernel from disk

8. A programmer writes `printf("Hello")` in C. This never directly invokes a system call. Instead, it calls a function in the C Standard Library, which eventually triggers a kernel trap. What is the name for the layer between the programmer's API call and the raw kernel system call?
    - **A)** Dynamic Linker
    - **B)** Run-Time Environment (RTE) / Standard Library
    - **C)** Bootstrap Program
    - **D)** Interrupt Service Routine


9. A disk controller needs to transfer 512 KB of data into RAM. Using Interrupt-Driven I/O with one interrupt per byte and a context-switch cost of 50 CPU cycles per interrupt, how many total CPU cycles are consumed in interrupt overhead?
    - **A)** 50 cycles
    - **B)** 512 cycles
    - **C)** 26,214,400 cycles
    - **D)** 1,024 cycles

10. An application calls `read()` on a network socket. The call returns immediately with the error `EWOULDBLOCK` because no data has arrived yet. The application proceeds to render a UI frame and then polls the socket again. Which I/O model is this?
    - **A)** Synchronous Blocking I/O
    - **B)** Asynchronous I/O with callbacks
    - **C)** Synchronous Non-Blocking I/O
    - **D)** Direct Memory Access I/O

11. Which I/O subsystem service is responsible for managing an exclusive device (e.g., a printer) that cannot handle interleaved data streams, by queuing jobs on disk and feeding them sequentially?
    - **A)** Buffering
    - **B)** Caching
    - **C)** Scheduling
    - **D)** Spooling

12. A USB mouse is connected to the system. The OS classifies it as what type of device, and why?
    - **A)** Block Device — because mouse events are transferred in fixed-size blocks
    - **B)** Character Device — because mouse events are processed as a sequential byte stream
    - **C)** Network Device — because USB uses packet-switching protocols
    - **D)** Memory-Mapped File — because mouse state is directly written into RAM


13. In a standard process memory layout, which two regions grow towards each other and can cause an error if they collide?
    - **A)** Text section and Data section
    - **B)** Stack (grows downward) and Heap (grows upward)
    - **C)** Kernel space and Text section
    - **D)** BSS segment and Data segment

14. A process has called `exit()`. Its resources have been partially cleaned up, but its parent process has not yet called `wait()` to collect the exit status. What state is this process in?
    - **A)** Blocked / Waiting
    - **B)** Orphan
    - **C)** Terminated (Zombie)
    - **D)** Ready

15. The OS needs to transfer CPU control from Process A (currently running) to Process B (in the Ready state). What sequence of operations occurs?
    - **A)** The OS saves Process A's PCB, loads Process B's PCB, and resumes Process B
    - **B)** The OS directly overwrites Process A's registers with Process B's data
    - **C)** Process A voluntarily calls `fork()` to spawn Process B as its child
    - **D)** The Loader copies Process B's binary into Process A's memory address space

16. A web server process uses a strategy where each incoming request is handled by a separate worker — but instead of creating a new process with `fork()` each time (which is expensive), each worker shares the same code and data sections while only getting its own stack and registers. What construct is being described?
    - **A)** Separate child processes communicating via Shared Memory IPC
    - **B)** Threads within the same process
    - **C)** Separate processes communicating via Message Passing
    - **D)** Daemon processes managed by `systemd`

17. Which type of scheduler operates most frequently (potentially hundreds of times per second) and is responsible for selecting which process in the Ready Queue gets the CPU next?
    - **A)** Long-Term Scheduler (Job Scheduler)
    - **B)** Medium-Term Scheduler
    - **C)** Short-Term Scheduler (CPU Scheduler)
    - **D)** I/O Scheduler


18. An application is 40% sequential and 60% parallelizable. Using Amdahl's Law, what is the maximum theoretical speedup achievable with an infinite number of processors? (Use $S = 0.40$, $N \to \infty$)
$$Speedup \le \frac{1}{S + \frac{1-S}{N}}$$

    - **A)** 1.67x
    - **B)** 2.50x
    - **C)** 4.00x
    - **D)** Infinite

19. In the Many-to-One threading model, all user-level threads map to a single kernel thread. What is the critical failure mode of this model?
    - **A)** Creating too many threads overloads the kernel thread table
    - **B)** If one user thread makes a blocking system call, the entire process blocks because the single kernel thread is occupied
    - **C)** True parallelism is only possible on single-core systems
    - **D)** The kernel cannot perform context switches between user threads

20. A developer uses `#pragma omp parallel for` in a C program, and the compiler automatically splits a for-loop across all available CPU cores without the developer manually creating threads. What threading paradigm is this an example of?
    - **A)** Explicit threading with POSIX Pthreads
    - **B)** Many-to-Many threading model implementation
    - **C)** Implicit Threading using a compiler directive (OpenMP)
    - **D)** Asynchronous Deferred Thread Cancellation

### Answer Key & Explanations

1. **C**. Embedded/headless systems (IoT, factory automation) represent the User View perspective for devices with no human interaction — the OS is invisible and focused on automated operation. This is distinct from the System View's resource allocation and control roles.
2. **B**. The Interrupt Vector Table (IVT) is a table of function pointers in memory where each entry maps an interrupt number (IRQ) to the address of its corresponding Interrupt Service Routine (ISR). The PCB (A) stores process state. Page tables (C) manage virtual memory.
3. **B**. Sequential EAT formula: $EAT = H \times T_c + (1-H) \times (T_c + T_m)$
$= 0.90(2) + 0.10(2 + 100) = 1.8 + 10.2 = 12.0$ ns.
Note: 11.8 ns (A) applies under the parallel access model where cache and memory are checked simultaneously.
4. **C**. Non-maskable interrupts are critical, unignorable hardware signals indicating severe faults such as memory parity errors or hardware failures. Keystrokes (A), network packets (B), and printer completions (D) are all maskable (deferrable) interrupts.
5. **C**. The application issues a software interrupt (trap/syscall instruction), which automatically clears the mode bit (0 = Kernel Mode). The OS executes the privileged instruction inside the kernel, then restores user mode (mode bit = 1) before returning control. User programs can never directly execute privileged instructions (A, B).
6. **C**. A Monolithic Kernel places all OS services in one large binary. This is fast (no IPC overhead between subsystems) but fragile — a buggy driver can crash the entire kernel. Linux uses a monolithic base with loadable modules.
7. **B**. In a microkernel architecture, device drivers and file systems run as isolated user-space server processes. If a driver crashes, only that process is affected; the minimal kernel (handling only IPC, basic scheduling, and memory) continues running stably.
8. **B**. The C Standard Library (`libc`) and the Run-Time Environment (RTE) serve as the translation layer. `printf()` is a C library function that buffers output and eventually calls `write()`, which triggers the actual kernel trap. This abstraction makes code portable across OS versions.
9. **C**. With 512 KB = 512 × 1024 = 524,288 bytes and one interrupt per byte at 50 cycles per interrupt:
$524,288 \times 50 = 26,214,400$ cycles wasted. With DMA, only 1 interrupt is generated for the entire transfer: just 50 cycles.
10. **C**. This is Synchronous Non-Blocking I/O. The thread did not sleep (blocking would be A), but it is still responsible for polling the socket repeatedly (asynchronous I/O in B uses kernel callbacks/signals so the application does not need to poll).
11. **D**. Spooling (Simultaneous Peripheral Operations On-Line) queues job data on disk for sequential delivery to exclusive devices. Buffering (A) smooths speed mismatches. Caching (B) retains hot data in fast memory. Scheduling (C) reorders I/O requests.
12. **B**. A mouse generates a sequential byte stream of events (button clicks, position deltas) with no random-access capability. It is a Character Device. Block devices (A) such as disks are accessed in fixed-size blocks with random addressing.
13. **B**. The Stack starts at high memory addresses and grows downward with each function call frame. The Heap starts above the data segment and grows upward with each `malloc()`. A stack overflow occurs when they collide.
14. **C**. A process that has called `exit()` but whose parent hasn't yet called `wait()` is a Zombie process. It retains its entry in the process table to preserve its exit status. An Orphan (B) is a process whose parent terminated before it did.
15. **A**. A context switch: the OS saves the running process's CPU registers and state into its PCB, then loads the next process's PCB (restoring its registers and program counter), and resumes execution. This entire operation is pure kernel overhead — no application code runs during it.
16. **B**. Threads share the same process address space (code, data, heap, open file descriptors) while each having a private stack, registers, and thread ID. This is far cheaper than creating separate child processes (A, C) because no memory space duplication occurs.
17. **C**. The Short-Term Scheduler (CPU Scheduler) operates in the millisecond range, selecting the next ready process whenever the CPU becomes free. The Long-Term Scheduler (A) admits jobs into memory rarely. The Medium-Term Scheduler (B) swaps processes to/from disk.
18. **B**. $Speedup = \frac{1}{0.40 + \frac{0.60}{\infty}} = \frac{1}{0.40 + 0} = \frac{1}{0.40} = 2.5x$.
Amdahl's Law shows that the sequential fraction (40%) acts as a hard ceiling on parallel speedup, regardless of how many cores are added.
19. **B**. In the Many-to-One model, all user threads share a single kernel thread. One blocking system call (like `read()` waiting on disk I/O) occupies that kernel thread, causing the entire process to stall. True parallelism on multicore (A→D) is also impossible, but the critical failure mode is the blocking cascade.
20. **C**. OpenMP is a compiler directive framework for implicit threading. `#pragma omp parallel for` instructs the compiler to automatically distribute loop iterations across cores without the programmer explicitly creating/managing threads. This contrasts with explicit Pthreads (A) where every thread lifecycle is manual.

## References & Navigation

- **Related Notes:** [[CSOPESY 01 - Introduction]], [[CSOPESY 02 - Operating System Structure]], [[CSOPESY 03 - IO and Display]], [[CSOPESY 04 - Processes]], [[CSOPESY 05 - Threads]]
- **Next Quiz:** [[QZ] CSOPESY Practice Quiz 2 - CPU Scheduling]
- **Mock Exam:** [[QZ] CSOPESY Midterm Mock Exam]

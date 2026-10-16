---
id: csopesy_practice_quiz_2_cpu_scheduling
type: note
course: CSOPESY
topic: "CSOPESY Practice Quiz 2 - CPU Scheduling"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSOPESY]] #[[Operating Systems]] #[[CPU Scheduling]] #[[Quiz]] #[[Reviewer]]

---

# CSOPESY Practice Quiz 2: CPU Scheduling (Weeks 6-8)

## Overview

This quiz covers CPU Scheduling algorithms and Process Synchronization from Weeks 6 through 8. It is structured as a real exam format: **Part I** tests conceptual understanding with multiple choice questions, and **Part II** requires manual Gantt chart construction and metric computation.

**Coverage:**
- Note 06: CPU Scheduling (FCFS, SJF, SRTF, Priority, Round Robin, Dispatcher)
- Note 07: Synchronization Tools (Race Conditions, Mutex, Semaphores, Deadlock)

---

## Part I: Multiple Choice (15 items)

**Instructions:** Choose the letter of the best answer.

---

**1. Which CPU scheduling algorithm is provably optimal for minimizing average waiting time among all non-preemptive algorithms?**

    - **A)** First-Come First-Served (FCFS)
    - **B)** Non-preemptive Priority Scheduling
    - **C)** Round Robin
    - **D)** Shortest Job First (SJF)

**2. A CPU scheduler uses the exponential average formula $\tau_{n+1} = \alpha t_n + (1-\alpha)\tau_n$ to predict future CPU burst lengths. If $\alpha = 0$, what is the behavior of this predictor?**

    - **A)** The prediction equals exactly the most recent burst
    - **B)** The prediction is always the same constant and never changes regardless of actual burst history
    - **C)** The prediction oscillates between the maximum and minimum observed bursts
    - **D)** The prediction is always zero, effectively running the CPU idle

**3. Process P1 (burst = 10ms) is currently running. At time t=5, Process P2 arrives with a burst of 3ms. Under the Shortest Remaining Time First (SRTF) algorithm, what happens?**

    - **A)** P1 continues running because it arrived first
    - **B)** P1 is preempted immediately; P2 takes the CPU because 3ms < 5ms (P1's remaining time)
    - **C)** P2 waits in the ready queue until P1 completes its full 10ms burst
    - **D)** The OS terminates P2 because it cannot interrupt a running process

**4. Which of the following is the primary drawback of FCFS scheduling in a mixed-workload environment?**

    - **A)** It requires knowledge of future burst times to function correctly
    - **B)** It can cause starvation of high-priority processes
    - **C)** The Convoy Effect causes short I/O-bound jobs to wait behind long CPU-bound jobs
    - **D)** Its time quantum must be carefully tuned to avoid excessive context switching

**5. In Priority Scheduling, a low-priority process has been waiting in the ready queue for an extremely long time and has never received the CPU. What technique prevents this indefinite starvation?**

    - **A)** Preemption
    - **B)** Aging (gradually increasing a process's priority the longer it waits)
    - **C)** Reducing the time quantum
    - **D)** Switching from preemptive to non-preemptive mode

**6. Round Robin with a very large time quantum (approaching infinity) behaves like which other scheduling algorithm?**

    - **A)** SJF
    - **B)** SRTF
    - **C)** FCFS
    - **D)** Priority Scheduling

**7. The time it takes for the OS to stop the current process, save its state, load the next process's state, and hand control to it is called:**

    - **A)** Response Time
    - **B)** Turnaround Time
    - **C)** Dispatch Latency
    - **D)** Scheduling Overhead Index

**8. Two threads access a shared counter variable without synchronization. Thread A reads the value (5), Thread B reads the value (5), Thread A increments and writes (6), Thread B increments and writes (6). The final value is 6 instead of the expected 7. What problem does this illustrate?**

    - **A)** Deadlock
    - **B)** Starvation
    - **C)** Race Condition
    - **D)** Priority Inversion

**9. A correct solution to the Critical Section Problem must satisfy three conditions. Which of the following is NOT one of them?**

    - **A)** Mutual Exclusion
    - **B)** Progress
    - **C)** Bounded Waiting
    - **D)** Preemptive Scheduling

**10. A `mutex_lock()` call on a mutex that is already held by another thread causes the calling thread to spin in a tight while-loop until the mutex is released. What is this behavior called?**

    - **A)** Semaphore P-operation
    - **B)** Busy-Waiting / Spinlock
    - **C)** Asynchronous Deferred Cancellation
    - **D)** Context Switch on Block

**11. A Counting Semaphore is initialized to the value 3. Three threads each call `wait()` (P-operation), acquiring it successfully. A fourth thread calls `wait()`. What happens to the fourth thread?**

    - **A)** It immediately proceeds, because semaphore values wrap around to 0
    - **B)** It terminates with an error because the semaphore is exhausted
    - **C)** It blocks (is placed in the semaphore's wait queue) until one of the three holders calls `signal()` (V-operation)
    - **D)** It decrements the semaphore to -1 and runs anyway

**12. For a deadlock to occur, which of the following four necessary conditions must ALL be present simultaneously?**

    - **A)** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait
    - **B)** Priority Inversion, Starvation, Busy-Waiting, Race Condition
    - **C)** Mutual Exclusion, Preemption, No Hold-and-Wait, Linear Wait
    - **D)** Circular Wait, Bounded Waiting, Progress, Mutual Exclusion

**13. Process A holds Resource 1 and is waiting for Resource 2. Process B holds Resource 2 and is waiting for Resource 1. Which deadlock condition does this scenario directly demonstrate?**

    - **A)** Hold and Wait
    - **B)** No Preemption
    - **C)** Circular Wait
    - **D)** Mutual Exclusion

**14. Which of the following scheduling criteria should be MINIMIZED to improve system performance?**

    - **A)** CPU Utilization and Throughput
    - **B)** Turnaround Time and Waiting Time
    - **C)** Number of processes in the Ready Queue
    - **D)** Cache Hit Rate

**15. A process is currently in the Running state and its time quantum expires. It has not finished its burst. Which state transition occurs next?**

    - **A)** Running → Terminated
    - **B)** Running → Waiting (Blocked)
    - **C)** Running → Ready
    - **D)** Running → New

---

## Part II: Problem Solving — CPU Scheduling Gantt Charts

### Problem 1: FCFS and Non-Preemptive SJF

Given the following set of processes:

| Process | Arrival Time (AT) | Burst Time (BT) |
| :------ | :-----------: | :-----------: |
| P1      | 0             | 10            |
| P2      | 2             | 5             |
| P3      | 4             | 4             |
| P4      | 6             | 7             |

**Solve for each algorithm:**
1. Draw the Gantt chart (execution timeline).
2. Compute Completion Time (CT), Turnaround Time (TAT = CT - AT), and Waiting Time (WT = TAT - BT) for each process.
3. Compute the Average Waiting Time.

**Formulas:**
$$TAT = CT - AT$$
$$WT = TAT - BT$$
$$Avg\ WT = \frac{\sum WT_i}{n}$$

---

### Problem 2: SRTF and Round Robin (q = 3)

Use the same process table from Problem 1.

For **Round Robin with quantum q = 3**:
- Processes arriving at the same time a quantum expires join the queue BEFORE the preempted process is re-queued.
- Processes with the same remaining time: do not preempt (continue running the current process).

---

## Answer Key — Part I

**1. D)** SJF is mathematically proven to minimize average waiting time among all non-preemptive algorithms, because it always greedily selects the shortest remaining work in the queue. FCFS (A) depends on arrival order. RR (C) optimizes response time, not waiting time.

**2. B)** When $\alpha = 0$: $\tau_{n+1} = 0 \cdot t_n + 1 \cdot \tau_n = \tau_n$. The prediction is frozen at its initial value and ignores all actual burst history. When $\alpha = 1$ (A): $\tau_{n+1} = t_n$ — the predictor uses only the most recent burst.

**3. B)** SRTF is preemptive SJF. At t=5, P1 has 5ms remaining and P2 has 3ms. Since 3 < 5, P1 is immediately preempted and P2 takes the CPU. This is the defining behavior of SRTF versus non-preemptive SJF.

**4. C)** The Convoy Effect occurs in FCFS when a long CPU-burst process (e.g., a video renderer) arrives first and all short I/O-bound processes queue behind it, causing excessive average waiting times. Option A describes SJF's limitation. Option B describes Priority Scheduling. Option D describes Round Robin's trade-off.

**5. B)** Aging gradually increases the priority of long-waiting processes, ensuring they eventually receive the CPU. Without aging, a continuous stream of high-priority arrivals could starve lower-priority processes indefinitely.

**6. C)** As the time quantum grows toward infinity, each process runs to completion before the next is dispatched — which is exactly FCFS behavior. Very small quanta (A/B characteristics) maximize preemption and context switch overhead.

**7. C)** Dispatch Latency is the time consumed by the Dispatcher module to perform the context switch: saving the running process's PCB, loading the next process's PCB, switching to user mode, and jumping to the new program counter. This is pure overhead — no application progress is made.

**8. C)** This is a classic Race Condition (also called a Read-Modify-Write hazard). Both threads read the same stale value before either writes back, causing one increment to be lost. Proper synchronization (mutex or atomic operations) prevents this. Deadlock (A) would require circular waiting for resources.

**9. D)** The three required conditions for a correct critical section solution are: Mutual Exclusion (at most one process in the CS at a time), Progress (a process can enter if the CS is free), and Bounded Waiting (a waiting process will eventually enter). Preemptive scheduling is an OS policy, not a correctness condition.

**10. B)** A spinlock (busy-waiting) keeps the blocked thread consuming CPU cycles in a tight loop checking the lock. This is efficient only when the expected wait time is shorter than a context switch. For longer waits, blocking the thread and yielding the CPU is preferred.

**11. C)** A counting semaphore initialized to 3 allows exactly 3 concurrent acquisitions. The fourth `wait()` call decrements the value to 0 (or below in some implementations) and blocks the calling thread in the semaphore's internal wait queue until a `signal()` is issued.

**12. A)** All four conditions — Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait — must be present simultaneously for deadlock to occur. Breaking any single one prevents deadlock. Option B describes related but distinct concurrency problems.

**13. C)** A holds R1, waits for R2. B holds R2, waits for R1. This is a circular dependency: A→R2→B→R1→A. Circular Wait is the most direct observable condition. Hold and Wait (A) is also present, but the specific circular chain shown is Circular Wait.

**14. B)** Turnaround Time and Waiting Time are performance costs that should be minimized. CPU Utilization and Throughput (A) are benefits that should be maximized. Number of processes in the ready queue (C) and cache hit rate (D) are not scheduling criteria.

**15. C)** When a time quantum expires (a timer interrupt fires), the scheduler preempts the running process and moves it back to the Ready state — it is placed at the back of the ready queue to await its next turn. It moves to Waiting (B) only on I/O requests, not quantum expiry.

---

## Answer Key — Part II

### Problem 1 Solution: FCFS

**Gantt Chart:**

```
| P1             | P2      | P3    | P4           |
0               10        15     19             26
```

**Process Metrics:**

| Process | AT | BT | CT | TAT | WT |
| :------ | :-: | :-: | :-: | :-: | :-: |
| P1      | 0  | 10 | 10 | 10 | 0  |
| P2      | 2  | 5  | 15 | 13 | 8  |
| P3      | 4  | 4  | 19 | 15 | 11 |
| P4      | 6  | 7  | 26 | 20 | 13 |

**Average Waiting Time:** $(0 + 8 + 11 + 13) / 4 = 32 / 4 = \mathbf{8.0}$ ms

---

### Problem 1 Solution: Non-Preemptive SJF

**Selection logic:**
- t=0: Only P1 available → P1 runs (0→10).
- t=10: P2 (BT=5), P3 (BT=4), P4 (BT=7) all present → shortest is P3 (4) → P3 runs (10→14).
- t=14: P2 (5), P4 (7) → shortest is P2 (5) → P2 runs (14→19).
- t=19: Only P4 → P4 runs (19→26).

**Gantt Chart:**

```
| P1             | P3    | P2      | P4           |
0               10      14        19             26
```

**Process Metrics:**

| Process | AT | BT | CT | TAT | WT |
| :------ | :-: | :-: | :-: | :-: | :-: |
| P1      | 0  | 10 | 10 | 10 | 0  |
| P2      | 2  | 5  | 19 | 17 | 12 |
| P3      | 4  | 4  | 14 | 10 | 6  |
| P4      | 6  | 7  | 26 | 20 | 13 |

**Average Waiting Time:** $(0 + 12 + 6 + 13) / 4 = 31 / 4 = \mathbf{7.75}$ ms

---

### Problem 2 Solution: SRTF (Preemptive SJF)

**Event-by-event trace:**

| Time | Event | Remaining Times | CPU |
| :--- | :---- | :-------------- | :-- |
| t=0  | P1 arrives | P1(10) | P1 |
| t=2  | P2 arrives (5) < P1 rem (8) → preempt P1 | P1(8), P2(5) | P2 |
| t=4  | P3 arrives (4) > P2 rem (3) → continue | P1(8), P2(3), P3(4) | P2 |
| t=6  | P4 arrives (7) > P2 rem (1) → continue | P1(8), P2(1), P3(4), P4(7) | P2 |
| t=7  | P2 finishes. Shortest: P3(4) | P1(8), P3(4), P4(7) | P3 |
| t=11 | P3 finishes. Shortest: P4(7) | P1(8), P4(7) | P4 |
| t=18 | P4 finishes. Only P1 left | P1(8) | P1 |
| t=26 | P1 finishes | — | — |

**Gantt Chart:**

```
| P1 | P2         | P3    | P4           | P1             |
0    2            7      11             18              26
```

**Process Metrics:**

| Process | AT | BT | CT | TAT | WT |
| :------ | :-: | :-: | :-: | :-: | :-: |
| P1      | 0  | 10 | 26 | 26 | 16 |
| P2      | 2  | 5  | 7  | 5  | 0  |
| P3      | 4  | 4  | 11 | 7  | 3  |
| P4      | 6  | 7  | 18 | 12 | 5  |

**Average Waiting Time:** $(16 + 0 + 3 + 5) / 4 = 24 / 4 = \mathbf{6.0}$ ms

---

### Problem 2 Solution: Round Robin (q = 3)

**Queue trace** (format: [Queue] → Run → [Queue after]):

| Slice | Time | Process | Remaining After | Queue Before Next |
| :---- | :--- | :------ | :------------- | :---------------- |
| 1 | 0→3 | P1 | P1(7) | [P2, P3*, P1] — P2 at t=2, P3 at t=3 |
| 2 | 3→6 | P2 | P2(2) | [P3, P4*, P1, P2] — P3 at t=4, P4 at t=6 |
| 3 | 6→9 | P3 | P3(1) | [P4, P1, P2, P3] |
| 4 | 9→12 | P4 | P4(4) | [P1, P2, P3, P4] |
| 5 | 12→15 | P1 | P1(4) | [P2, P3, P4, P1] |
| 6 | 15→17 | P2 | DONE (CT=17) | [P3, P4, P1] |
| 7 | 17→20 | P3 | P3(0) → DONE (CT=20) | [P4, P1] |
| 8 | 20→23 | P4 | P4(1) | [P1, P4] |
| 9 | 23→26 | P1 | P1(1) | [P4, P1] |
| 10 | 26→27 | P4 | DONE (CT=27) | [P1] |
| 11 | 27→28 | P1 | DONE (CT=28) | — |

**Gantt Chart:**

```
|P1 |P2 |P3 |P4 |P1 |P2|P3 |P4 |P1 |P4|P1|
0   3   6   9  12  15 17 20  23  26 27  28
```

**Process Metrics:**

| Process | AT | BT | CT | TAT | WT |
| :------ | :-: | :-: | :-: | :-: | :-: |
| P1      | 0  | 10 | 28 | 28 | 18 |
| P2      | 2  | 5  | 17 | 15 | 10 |
| P3      | 4  | 4  | 20 | 16 | 12 |
| P4      | 6  | 7  | 27 | 21 | 14 |

**Average Waiting Time:** $(18 + 10 + 12 + 14) / 4 = 54 / 4 = \mathbf{13.5}$ ms

> [!note] Takeaway
> For this process set: SRTF achieves the best Avg WT (6.0 ms), followed by SJF (7.75 ms), FCFS (8.0 ms), and RR (13.5 ms). SRTF is optimal but requires preemption overhead and future burst knowledge.

---

## References & Navigation

- **Related Notes:** [[CSOPESY 06 - CPU Scheduling]], [[CSOPESY 07 - Synchronization Tools]]
- **Previous Quiz:** [[QZ] CSOPESY Practice Quiz 1 - OS Foundations]
- **Mock Exam:** [[QZ] CSOPESY Midterm Mock Exam]

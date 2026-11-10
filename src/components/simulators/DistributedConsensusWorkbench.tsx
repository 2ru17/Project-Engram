"use client";

import { useState } from "react";

type ConsensusMode = "raft" | "vector-clocks";

interface RaftNode {
  id: number;
  role: "follower" | "candidate" | "leader" | "crashed";
  term: number;
  votedFor: number | null;
  votesReceived: number;
  heartbeatTicksRemaining: number;
}

export function DistributedConsensusWorkbench() {
  const [mode, setMode] = useState<ConsensusMode>("raft");

  // Raft state: 5 nodes
  const [nodes, setNodes] = useState<RaftNode[]>([
    { id: 0, role: "leader", term: 1, votedFor: 0, votesReceived: 3, heartbeatTicksRemaining: 3 },
    { id: 1, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 6 },
    { id: 2, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 5 },
    { id: 3, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 7 },
    { id: 4, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 8 },
  ]);

  const [raftLog, setRaftLog] = useState<string[]>([
    "Node 0 elected as Leader for Term 1 with quorum (3 of 5 votes).",
    "Node 0 broadcasting AppendEntries heartbeats to keep followers alive.",
  ]);

  // Vector clock state: 3 processes with vector timestamps [P0, P1, P2]
  const [vectorClocks, setVectorClocks] = useState<[number, number, number][]>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);

  const [causalityLog, setCausalityLog] = useState<string[]>([
    "Initial state: P0=[1,0,0], P1=[0,1,0], P2=[0,0,1].",
  ]);

  const currentLeader = nodes.find((n) => n.role === "leader");
  const candidateFollower = nodes.find((n) => n.role === "follower");

  // Raft actions
  const crashLeader = () => {
    const leader = nodes.find((n) => n.role === "leader");
    if (!leader) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === leader.id ? { ...n, role: "crashed", heartbeatTicksRemaining: 0 } : n))
    );
    setRaftLog((prev) => [
      `Node ${leader.id} (Leader) crashed! Followers will detect heartbeat timeout.`,
      ...prev.slice(0, 7),
    ]);
  };

  const recoverNode = (nodeId: number) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, role: "follower", heartbeatTicksRemaining: 6 } : n))
    );
    setRaftLog((prev) => [
      `Node ${nodeId} recovered and rejoined cluster as Follower.`,
      ...prev.slice(0, 7),
    ]);
  };

  const triggerElection = (candidateId: number) => {
    setNodes((prev) => {
      const target = prev[candidateId];
      if (!target || target.role === "crashed") return prev;

      const newTerm = target.term + 1;
      const votes = 3; // Majority quorum in 5-node cluster
      return prev.map((n) => {
        if (n.id === candidateId) {
          return {
            ...n,
            role: "leader",
            term: newTerm,
            votedFor: candidateId,
            votesReceived: votes,
            heartbeatTicksRemaining: 4,
          };
        }
        if (n.role !== "crashed") {
          return {
            ...n,
            role: "follower",
            term: newTerm,
            votedFor: candidateId,
            heartbeatTicksRemaining: Math.floor(Math.random() * 5) + 5,
          };
        }
        return n;
      });
    });

    setRaftLog((prev) => [
      `Node ${candidateId} timed out, transitioned to Candidate, requested votes, and won majority election (Term ${nodes[candidateId].term + 1}).`,
      ...prev.slice(0, 7),
    ]);
  };

  const recoverAll = () => {
    setNodes([
      { id: 0, role: "leader", term: 1, votedFor: 0, votesReceived: 3, heartbeatTicksRemaining: 3 },
      { id: 1, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 6 },
      { id: 2, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 5 },
      { id: 3, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 7 },
      { id: 4, role: "follower", term: 1, votedFor: 0, votesReceived: 0, heartbeatTicksRemaining: 8 },
    ]);
    setRaftLog(["Cluster state reset. Node 0 is healthy Leader for Term 1."]);
  };

  // Vector clock actions
  const triggerLocalEvent = (processIdx: number) => {
    setVectorClocks((prev) => {
      const updated = prev.map((clock) => [...clock] as [number, number, number]);
      updated[processIdx][processIdx] += 1;
      return updated;
    });
    setCausalityLog((prev) => [
      `P${processIdx} executed local event. Incremented V${processIdx}[${processIdx}]. New clock: [${
        vectorClocks[processIdx][0] + (processIdx === 0 ? 1 : 0)
      }, ${vectorClocks[processIdx][1] + (processIdx === 1 ? 1 : 0)}, ${
        vectorClocks[processIdx][2] + (processIdx === 2 ? 1 : 0)
      }].`,
      ...prev.slice(0, 7),
    ]);
  };

  const sendMessage = (senderIdx: number, receiverIdx: number) => {
    const senderClock = [...vectorClocks[senderIdx]];
    senderClock[senderIdx] += 1; // sender increments before sending

    setVectorClocks((prev) => {
      const updated = prev.map((clock) => [...clock] as [number, number, number]);
      updated[senderIdx] = senderClock as [number, number, number];

      // receiver updates: V_receiver[k] = max(V_receiver[k], V_msg[k]), and increments V_receiver[receiverIdx]
      const recClock = [...updated[receiverIdx]];
      for (let k = 0; k < 3; k++) {
        recClock[k] = Math.max(recClock[k], senderClock[k]);
      }
      recClock[receiverIdx] += 1;
      updated[receiverIdx] = recClock as [number, number, number];
      return updated;
    });

    setCausalityLog((prev) => [
      `P${senderIdx} sent message to P${receiverIdx}. P${receiverIdx} applied vector merge rule: V[k]=max(V[k], msg[k]) + local tick.`,
      ...prev.slice(0, 7),
    ]);
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            DISTRIBUTED SYSTEMS // CONSENSUS & LOGICAL TIME
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Raft Consensus & Vector Clock Causality Studio
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "raft", label: "RAFT LEADER ELECTION" },
            { id: "vector-clocks", label: "VECTOR CLOCK CAUSALITY" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as ConsensusMode)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                mode === tab.id
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "raft" ? (
        /* Raft Consensus Simulator */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--zen-void)]/60 p-3 rounded-lg border border-[var(--zen-border)]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                disabled={!currentLeader}
                onClick={crashLeader}
                className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-rose-500/20 border border-rose-400 text-rose-300 hover:bg-rose-500/30 transition-all disabled:opacity-40"
              >
                {currentLeader ? `CRASH LEADER (NODE ${currentLeader.id})` : "LEADER CRASHED"}
              </button>
              {candidateFollower && (
                <button
                  onClick={() => triggerElection(candidateFollower.id)}
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 transition-all"
                >
                  TIMEOUT NODE {candidateFollower.id} (ELECTION)
                </button>
              )}
              <button
                onClick={recoverAll}
                className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              >
                RESET CLUSTER
              </button>
            </div>
            <div className="text-xs font-mono text-[var(--zen-cyan)]">
              Quorum Rule: Majority (floor(N/2) + 1 = 3 of 5 nodes)
            </div>
          </div>

          {/* 5-Node Raft Visual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {nodes.map((node) => {
              let badgeColor = "border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-ink-muted)]";
              let roleLabel = "FOLLOWER";

              if (node.role === "leader") {
                badgeColor = "border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.2)]";
                roleLabel = "LEADER";
              } else if (node.role === "candidate") {
                badgeColor = "border-amber-400 bg-amber-500/20 text-amber-300 animate-pulse";
                roleLabel = "CANDIDATE";
              } else if (node.role === "crashed") {
                badgeColor = "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-60";
                roleLabel = "OFFLINE";
              }

              const handleNodeClick = () => {
                if (node.role === "leader") crashLeader();
                else if (node.role === "crashed") recoverNode(node.id);
                else triggerElection(node.id);
              };

              return (
                <div
                  key={node.id}
                  onClick={handleNodeClick}
                  title={`Click to ${node.role === "leader" ? "crash" : node.role === "crashed" ? "recover" : "trigger election on"} Node ${node.id}`}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between min-h-[140px] font-mono cursor-pointer hover:border-[var(--zen-cyan)] transition-all universe-card ${badgeColor}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-[var(--zen-ink-muted)]">
                        NODE #{node.id}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded border border-current font-bold uppercase">
                        {roleLabel}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--zen-snow)] mt-1">
                      Term: {node.term}
                    </div>
                  </div>

                  <div className="text-[10px] text-[var(--zen-ink-muted)] space-y-0.5 border-t border-current/20 pt-2 mt-2">
                    <div>Voted For: {node.votedFor !== null ? `Node ${node.votedFor}` : "None"}</div>
                    {node.role === "leader" ? (
                      <div className="text-cyan-300 font-bold">Heartbeat: Broadcasting</div>
                    ) : node.role === "crashed" ? (
                      <div className="text-rose-400">Partitioned</div>
                    ) : (
                      <div>Timeout: {node.heartbeatTicksRemaining}s</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Raft Audit Log */}
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase block font-semibold mb-2">
              RAFT CONSENSUS EVENT AUDIT LOG
            </span>
            <div className="space-y-1.5">
              {raftLog.map((log, idx) => (
                <div key={idx} className="text-[var(--zen-snow)]/90 flex items-start gap-2">
                  <span className="text-[var(--zen-cyan)] opacity-75">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Vector Clock Causality Mode */
        <div className="space-y-6">
          {/* Action Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[0, 1, 2].map((pIdx) => (
              <div
                key={pIdx}
                className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col justify-between font-mono text-xs gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-[var(--zen-cyan)]">PROCESS P{pIdx}</span>
                    <span className="text-xs font-bold text-[var(--zen-snow)]">
                      Clock: [{vectorClocks[pIdx].join(", ")}]
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => triggerLocalEvent(pIdx)}
                    className="w-full py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] text-[11px] transition-all"
                  >
                    + Local Event
                  </button>
                  <div className="grid grid-cols-2 gap-1">
                    {[0, 1, 2]
                      .filter((target) => target !== pIdx)
                      .map((target) => (
                        <button
                          key={target}
                          onClick={() => sendMessage(pIdx, target)}
                          className="py-1 rounded border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 text-[var(--zen-cyan)] text-[10px] font-bold"
                        >
                          Send &rarr; P{target}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Causality Relationship Analysis Card */}
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 font-mono text-xs space-y-2">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              CAUSALITY THEOREM // HAPPENS-BEFORE VS CONCURRENCY
            </span>
            <p className="text-[11px] text-[var(--zen-frost)]/80 leading-relaxed font-sans">
              For two timestamps $V(A)$ and $V(B)$: Event $A \to B$ ($A$ causally precedes $B$) if and only if for all components $k$, $V(A)[k] \le V(B)[k]$, and at least one component is strictly less. If neither $V(A) \le V(B)$ nor $V(B) \le V(A)$, the events are <strong>concurrent</strong> ($A \parallel B$).
            </p>
          </div>

          {/* Causality Log */}
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase block font-semibold mb-2">
              VECTOR CLOCK DISPATCH LOG
            </span>
            <div className="space-y-1.5">
              {causalityLog.map((log, idx) => (
                <div key={idx} className="text-[var(--zen-snow)]/90 flex items-start gap-2">
                  <span className="text-[var(--zen-cyan)] opacity-75">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

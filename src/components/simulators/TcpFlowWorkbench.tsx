"use client";

import { useState } from "react";

type TcpMode = "handshake" | "sliding-window" | "teardown";

interface PacketEvent {
  step: number;
  sender: "client" | "server";
  flags: string;
  seq: number;
  ack: number;
  length: number;
  clientState: string;
  serverState: string;
  annotation: string;
}

export function TcpFlowWorkbench() {
  const [mode, setMode] = useState<TcpMode>("handshake");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<number>(4);
  const [packetLoss, setPacketLoss] = useState<boolean>(false);

  // Handshake events trace
  const handshakeSteps: PacketEvent[] = [
    {
      step: 0,
      sender: "client",
      flags: "SYN",
      seq: 1000,
      ack: 0,
      length: 0,
      clientState: "SYN_SENT",
      serverState: "LISTEN",
      annotation: "Client sends SYN segment with Initial Sequence Number (ISN_c = 1000).",
    },
    {
      step: 1,
      sender: "server",
      flags: "SYN + ACK",
      seq: 5000,
      ack: 1001,
      length: 0,
      clientState: "SYN_SENT",
      serverState: "SYN_RCVD",
      annotation: "Server responds with SYN-ACK: sets own ISN_s = 5000 and ACKs Client ISN + 1 (1001).",
    },
    {
      step: 2,
      sender: "client",
      flags: "ACK",
      seq: 1001,
      ack: 5001,
      length: 0,
      clientState: "ESTABLISHED",
      serverState: "ESTABLISHED",
      annotation: "Client acknowledges Server ISN + 1 (5001). Full duplex socket is now ESTABLISHED.",
    },
    {
      step: 3,
      sender: "client",
      flags: "PSH + ACK",
      seq: 1001,
      ack: 5001,
      length: 512,
      clientState: "ESTABLISHED",
      serverState: "ESTABLISHED",
      annotation: "Client initiates HTTP request transmission with payload (512 bytes). Next SEQ = 1513.",
    },
    {
      step: 4,
      sender: "server",
      flags: "ACK",
      seq: 5001,
      ack: 1513,
      length: 0,
      clientState: "ESTABLISHED",
      serverState: "ESTABLISHED",
      annotation: "Server validates and ACKs 512 bytes received: ACK = 1513. Sliding window slides right.",
    },
  ];

  // Teardown trace
  const teardownSteps: PacketEvent[] = [
    {
      step: 0,
      sender: "client",
      flags: "FIN + ACK",
      seq: 2500,
      ack: 8200,
      length: 0,
      clientState: "FIN_WAIT_1",
      serverState: "ESTABLISHED",
      annotation: "Client sends FIN to initiate passive half-close. Transitions to FIN_WAIT_1.",
    },
    {
      step: 1,
      sender: "server",
      flags: "ACK",
      seq: 8200,
      ack: 2501,
      length: 0,
      clientState: "FIN_WAIT_2",
      serverState: "CLOSE_WAIT",
      annotation: "Server acknowledges Client FIN (ACK=2501). Server application prepares for socket cleanup.",
    },
    {
      step: 2,
      sender: "server",
      flags: "FIN + ACK",
      seq: 8201,
      ack: 2501,
      length: 0,
      clientState: "TIME_WAIT",
      serverState: "LAST_ACK",
      annotation: "Server sends FIN after releasing local descriptors. Client enters 2MSL TIME_WAIT.",
    },
    {
      step: 3,
      sender: "client",
      flags: "ACK",
      seq: 2501,
      ack: 8202,
      length: 0,
      clientState: "CLOSED (after 2MSL)",
      serverState: "CLOSED",
      annotation: "Client sends final ACK (8202). Server closes immediately; Client expires after 2MSL timeout.",
    },
  ];

  // Sliding window segments (frames 0 to 7)
  const windowFrames = [
    { id: 0, status: "acked", bytes: 512, seq: 1000 },
    { id: 1, status: "acked", bytes: 512, seq: 1512 },
    { id: 2, status: packetLoss ? "lost" : "in-flight", bytes: 512, seq: 2024 },
    { id: 3, status: "in-flight", bytes: 512, seq: 2536 },
    { id: 4, status: "usable", bytes: 512, seq: 3048 },
    { id: 5, status: "usable", bytes: 512, seq: 3560 },
    { id: 6, status: "outside", bytes: 512, seq: 4072 },
    { id: 7, status: "outside", bytes: 512, seq: 4584 },
  ];

  const currentSteps = mode === "teardown" ? teardownSteps : handshakeSteps;
  const currentEvent = currentSteps[Math.min(activeStep, currentSteps.length - 1)];

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            NETWORKING WORKBENCH // TRANSPORT LAYER PROTOCOLS
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            TCP 3-Way Handshake & Sliding Window Studio
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "handshake", label: "3-WAY HANDSHAKE" },
            { id: "sliding-window", label: "SLIDING WINDOW" },
            { id: "teardown", label: "4-WAY TEARDOWN" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id as TcpMode);
                setActiveStep(0);
              }}
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

      {mode === "sliding-window" ? (
        /* Sliding Window Visualizer Mode */
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--zen-cyan)] block">
                  FLOW CONTROL BUFFER // SENDER PERSPECTIVE
                </span>
                <span className="text-xs text-[var(--zen-frost)]">
                  Advertised Receiver Window (rwnd) = {windowSize * 512} bytes ({windowSize} MSS segments)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPacketLoss((p) => !p)}
                  className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
                    packetLoss
                      ? "border-rose-400 bg-rose-500/20 text-rose-300 font-bold"
                      : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)]"
                  }`}
                >
                  {packetLoss ? "PACKET LOSS ACTIVE" : "SIMULATE PACKET LOSS"}
                </button>
                <button
                  onClick={() => setWindowSize((w) => (w === 4 ? 6 : 4))}
                  className="px-3 py-1 rounded text-xs font-mono border border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-snow)]"
                >
                  Toggle Window ({windowSize === 4 ? "Expand to 6" : "Contract to 4"})
                </button>
              </div>
            </div>

            {/* Window Buffer Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 my-4">
              {windowFrames.map((frame) => {
                let statusClasses = "bg-[var(--zen-void)] border-[var(--zen-border)] text-[var(--zen-ink-muted)]";
                let statusLabel = "Outside Window";

                if (frame.status === "acked") {
                  statusClasses = "bg-emerald-500/15 border-emerald-500/50 text-emerald-300";
                  statusLabel = "Sent & ACKed";
                } else if (frame.status === "lost") {
                  statusClasses = "bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse";
                  statusLabel = "DROPPED (RTO)";
                } else if (frame.status === "in-flight") {
                  statusClasses = "bg-cyan-500/20 border-cyan-400 text-cyan-300";
                  statusLabel = "Sent / In-Flight";
                } else if (frame.status === "usable") {
                  statusClasses = "bg-amber-500/15 border-amber-400/50 text-amber-300";
                  statusLabel = "Usable in Window";
                }

                return (
                  <div
                    key={frame.id}
                    className={`p-3 rounded-lg border flex flex-col justify-between min-h-[90px] font-mono text-xs transition-all ${statusClasses}`}
                  >
                    <div>
                      <span className="text-[10px] block opacity-75">FRAME #{frame.id}</span>
                      <span className="font-bold block mt-0.5">SEQ {frame.seq}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase block tracking-wider mt-1">{statusLabel}</span>
                      <span className="text-[9px] opacity-60 block">{frame.bytes}B MSS</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AIMD Congestion Explanation */}
            <div className="p-3.5 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] font-mono text-xs space-y-1.5">
              <span className="text-[10px] text-[var(--zen-cyan)] uppercase block font-semibold">
                CONGESTION CONTROL DYNAMICS // AIMD
              </span>
              <p className="text-[11px] text-[var(--zen-frost)]/80 leading-relaxed">
                When packet loss occurs (Segment #2 dropped), TCP triggers <strong>Fast Retransmit</strong> after receiving 3 duplicate ACKs or backs off via <strong>Retransmission Timeout (RTO)</strong>. The Congestion Window (cwnd) drops to 1 MSS in Tahoe or halves in Reno (Multiplicative Decrease), returning to Additive Increase when normal acknowledgment streams resume.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Sequence Diagram Mode (Handshake or Teardown) */
        <div className="space-y-6">
          {/* Progress / Step Navigator */}
          <div className="flex items-center justify-between gap-3 bg-[var(--zen-void)]/60 p-3 rounded-lg border border-[var(--zen-border)]">
            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] disabled:opacity-30 disabled:hover:border-[var(--zen-border)]"
              >
                PREVIOUS STEP
              </button>
              <button
                disabled={activeStep >= currentSteps.length - 1}
                onClick={() => setActiveStep((p) => Math.min(currentSteps.length - 1, p + 1))}
                className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold disabled:opacity-30"
              >
                NEXT SEGMENT
              </button>
              <button
                onClick={() => setActiveStep(0)}
                className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              >
                RESET
              </button>
            </div>
            <div className="text-xs font-mono text-[var(--zen-cyan)] font-semibold">
              Step {activeStep + 1} of {currentSteps.length}
            </div>
          </div>

          {/* Interactive Dual-Host Timeline */}
          <div className="p-4 sm:p-6 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]">
            {/* Host Headers */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[var(--zen-border)] font-mono text-center">
              <div className="p-2.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[10px] text-[var(--zen-cyan)] uppercase block">CLIENT HOST (192.168.1.10)</span>
                <span className="text-xs font-bold text-[var(--zen-snow)] block mt-0.5">
                  State: {currentEvent.clientState}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[10px] text-[var(--zen-cyan)] uppercase block">SERVER HOST (203.0.113.80)</span>
                <span className="text-xs font-bold text-[var(--zen-snow)] block mt-0.5">
                  State: {currentEvent.serverState}
                </span>
              </div>
            </div>

            {/* Ladder Diagram Events */}
            <div className="space-y-4 py-6">
              {currentSteps.map((evt, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                const isClient = evt.sender === "client";

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all font-mono text-xs ${
                      isActive
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-midnight)] shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                        : isPast
                        ? "border-[var(--zen-border)] bg-[var(--zen-card)]/60 text-[var(--zen-ink-muted)]"
                        : "border-[var(--zen-border)]/40 bg-[var(--zen-void)]/40 opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-[var(--zen-cyan)]">
                        {isClient ? "CLIENT -> SERVER" : "SERVER -> CLIENT"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] text-[var(--zen-snow)] font-bold text-[10px]">
                        [{evt.flags}]
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--zen-snow)]">
                      <span>SEQ = {evt.seq}</span>
                      <span>ACK = {evt.ack}</span>
                      <span>LEN = {evt.length}</span>
                    </div>

                    <p className="text-[11px] text-[var(--zen-frost)]/80 mt-2 font-sans leading-relaxed">
                      {evt.annotation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

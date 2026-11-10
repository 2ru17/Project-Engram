"use client";

import { useState } from "react";

export function SubnetRouterWorkbench() {
  const [ip, setIp] = useState("192.168.10.75");
  const [cidr, setCidr] = useState(24);

  // Compute IPv4 Subnetting details
  const computeSubnet = () => {
    const parts = ip.split(".").map((p) => parseInt(p) || 0);
    if (parts.length !== 4) return null;

    const ipNum =
      ((parts[0] << 24) >>> 0) +
      ((parts[1] << 16) >>> 0) +
      ((parts[2] << 8) >>> 0) +
      (parts[3] >>> 0);

    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const wildNum = (~maskNum) >>> 0;
    const bcastNum = (netNum | wildNum) >>> 0;

    const numToIp = (num: number) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255,
    ].join(".");

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    const firstUsable = cidr >= 31 ? numToIp(netNum) : numToIp(netNum + 1);
    const lastUsable = cidr >= 31 ? numToIp(bcastNum) : numToIp(bcastNum - 1);

    return {
      network: numToIp(netNum),
      netmask: numToIp(maskNum),
      wildcard: numToIp(wildNum),
      broadcast: numToIp(bcastNum),
      firstUsable,
      lastUsable,
      totalHosts,
      usableHosts,
    };
  };

  const res = computeSubnet();

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            NETWORKING // CSNETWK & NSCOM01
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            IPv4 Subnet Calculator & CIDR Partition Workbench
          </h4>
        </div>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            Target IPv4 Host Address
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-sm text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
            placeholder="192.168.1.1"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            CIDR Prefix (/{cidr})
          </label>
          <select
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-sm text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          >
            {Array.from({ length: 25 }, (_, i) => i + 8).map((p) => (
              <option key={p} value={p}>
                /{p} ({Math.pow(2, 32 - p) - (p >= 31 ? 0 : 2)} usable)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Computed Subnet Telemetry Cards */}
      {res && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
              Network ID
            </span>
            <span className="text-base font-mono font-bold text-[var(--zen-cyan)]">
              {res.network}/{cidr}
            </span>
          </div>
          <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
              Subnet Mask
            </span>
            <span className="text-base font-mono font-bold text-[var(--zen-snow)]">
              {res.netmask}
            </span>
          </div>
          <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
              Broadcast IP
            </span>
            <span className="text-base font-mono font-bold text-amber-700 dark:text-amber-400">
              {res.broadcast}
            </span>
          </div>
          <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
              Usable Hosts
            </span>
            <span className="text-base font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {res.usableHosts.toLocaleString()} Addresses
            </span>
          </div>
        </div>
      )}

      {/* Usable Host Range Bar */}
      {res && (
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 mb-4">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-[var(--zen-ink-muted)] uppercase">Usable Host Range:</span>
            <span className="font-bold text-[var(--zen-snow)]">
              {res.firstUsable} → {res.lastUsable}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--zen-midnight)] overflow-hidden flex border border-[var(--zen-border)]">
            <div className="w-2 bg-red-500 shrink-0" title="Network Address" />
            <div className="flex-1 bg-[var(--zen-cyan)]/70" title="Usable Host Pool" />
            <div className="w-2 bg-amber-500 shrink-0" title="Broadcast Address" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-[var(--zen-ink-muted)] mt-1.5">
            <span className="text-red-700 dark:text-red-400">Net: {res.network}</span>
            <span className="text-[var(--zen-cyan)]">{res.usableHosts} Usable Hosts</span>
            <span className="text-amber-700 dark:text-amber-400">Bcast: {res.broadcast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

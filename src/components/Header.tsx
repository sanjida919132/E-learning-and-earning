import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  Radio, 
  DollarSign, 
  Bell, 
  Plus, 
  Sliders,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { LabAlert } from '../types';

interface HeaderProps {
  totalEarnings: number;
  activeNodes: number;
  totalNodes: number;
  alerts: LabAlert[];
  onOpenMilestoneModal: () => void;
  onOpenBroadcastModal: () => void;
  onSwitchToTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalEarnings,
  activeNodes,
  totalNodes,
  alerts,
  onOpenMilestoneModal,
  onOpenBroadcastModal,
  onSwitchToTerminal
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [utcStr, setUtcStr] = useState<string>('');
  const unreadAlerts = alerts.filter(a => !a.acknowledged).length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
      setUtcStr(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-[#050D1A] border-b border-[#1E3A5F] z-30 sticky top-0">
      {/* Top micro-telemetry ticker banner */}
      <div className="w-full bg-[#010F1F] border-b border-[#1E3A5F]/70 px-4 py-1 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#94A3B8]">
        <div className="flex items-center space-x-4 overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="flex items-center space-x-1.5 text-[#10B981]">
            <span className="w-2 h-2 bg-[#10B981] animate-pulse inline-block"></span>
            <span className="font-semibold uppercase tracking-widest text-[#6EE7B7]">LIVE TELEMETRY // CORE ACTIVE</span>
          </div>
          <span className="text-[#334E68]">|</span>
          <div className="flex items-center space-x-1 text-[#F8FAFC]">
            <span className="text-[#94A3B8]">SYS UPTIME:</span>
            <span className="font-mono text-[#10B981]">99.98%</span>
          </div>
          <span className="text-[#334E68]">|</span>
          <div className="flex items-center space-x-1">
            <span className="text-[#94A3B8]">BANDWIDTH:</span>
            <span className="font-mono text-[#0284C7]">37.7 GBPS</span>
          </div>
          <span className="text-[#334E68] hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-[#94A3B8]">GPU LOAD:</span>
            <span className="font-mono text-[#F59E0B]">88.5% (TENSOR H100)</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div className="font-mono text-[#F8FAFC]">
            <span className="text-[#94A3B8] mr-1">DHAKA:</span>
            <span className="text-[#10B981] font-bold">{timeStr}</span>
            <span className="text-[#64748B] ml-2 text-[10px] hidden md:inline">({utcStr})</span>
          </div>
          <span className="text-[#334E68]">|</span>
          <div className="hidden lg:flex items-center space-x-1 text-[#6EE7B7] bg-[#064E3B] px-1.5 py-0.5 border border-[#10B981]/50 text-[10px] uppercase font-semibold">
            <span>■ CLEARANCE: LEVEL 4</span>
          </div>
        </div>
      </div>

      {/* Main command bar */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-[#0B1E36] border border-[#10B981] flex items-center justify-center text-[#10B981] relative">
            <Radio className="w-5 h-5 animate-pulse" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#10B981]"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-space font-bold text-lg sm:text-xl tracking-tight text-[#F8FAFC] uppercase">
                Command Center <span className="text-[#10B981]">ICT</span>
              </h1>
              <span className="bg-[#0B1E36] text-[#0284C7] border border-[#0284C7]/50 text-[10px] px-1.5 py-0.2 font-mono uppercase font-bold tracking-wider hidden sm:inline-block">
                OPS-CONSOLE v4.2
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase hidden sm:block">
              Freelancing, Systems Engineering & AI Skills Laboratory Hub
            </p>
          </div>
        </div>

        {/* Global Live Statistics Ticker */}
        <div className="hidden xl:flex items-center space-x-6 border-l border-r border-[#1E3A5F] px-6 py-1">
          {/* Earning ticker */}
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase flex items-center space-x-1">
              <DollarSign className="w-3 h-3 text-[#10B981]" />
              <span>YTD Freelance Yield</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="font-space font-bold text-xl text-[#F8FAFC] tabular-nums">
                ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-mono text-[#10B981] font-semibold">
                ▲ +18.4%
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-[#1E3A5F]"></div>

          {/* Node capacity */}
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase flex items-center space-x-1">
              <Activity className="w-3 h-3 text-[#0284C7]" />
              <span>Active Workstations</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="font-space font-bold text-xl text-[#F8FAFC] tabular-nums">
                {activeNodes} <span className="text-sm text-[#64748B]">/ {totalNodes}</span>
              </span>
              <span className="text-[11px] font-mono text-[#6EE7B7] font-semibold">
                {((activeNodes / totalNodes) * 100).toFixed(1)}% CAP
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onSwitchToTerminal}
            title="Terminal CLI"
            className="hidden md:flex items-center space-x-1.5 bg-[#0B1E36] hover:bg-[#122846] border border-[#1E3A5F] hover:border-[#10B981] text-[#94A3B8] hover:text-[#10B981] px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">CLI Console</span>
          </button>

          <button
            onClick={onOpenBroadcastModal}
            className="flex items-center space-x-1.5 bg-[#0B1E36] hover:bg-[#122846] border border-[#334E68] hover:border-[#F59E0B] text-[#F8FAFC] px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors relative"
          >
            <Radio className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="hidden sm:inline">Broadcast</span>
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EF4444] text-[#050D1A] text-[9px] font-bold px-1 min-w-[14px] text-center">
                {unreadAlerts}
              </span>
            )}
          </button>

          <button
            onClick={onOpenMilestoneModal}
            className="flex items-center space-x-1.5 bg-[#10B981] hover:bg-[#059669] text-[#050D1A] px-3 sm:px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all chamfer-tr-sm shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Log Milestone</span>
          </button>
        </div>
      </div>
    </header>
  );
};

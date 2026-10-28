import React, { useState } from 'react';
import { Workstation } from '../types';
import { 
  X, 
  Cpu, 
  Terminal, 
  Activity, 
  GitBranch, 
  ShieldCheck, 
  DollarSign, 
  Radio, 
  RefreshCw,
  Send,
  AlertTriangle,
  User
} from 'lucide-react';

interface WorkstationModalProps {
  workstation: Workstation | null;
  onClose: () => void;
  onDispatchMentor: (wsId: string) => void;
  onRebootNode: (wsId: string) => void;
}

export const WorkstationModal: React.FC<WorkstationModalProps> = ({
  workstation,
  onClose,
  onDispatchMentor,
  onRebootNode
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);

  if (!workstation) return null;

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    setCommandFeedback(`SIGNAL TRANSMITTED: "${commandInput}" -> ${workstation.id} CONSOLE`);
    setCommandInput('');
    setTimeout(() => setCommandFeedback(null), 4000);
  };

  const getStatusBadge = () => {
    switch (workstation.status) {
      case 'active':
        return { label: '■ ACTIVE // COMPUTING', bg: 'bg-[#064E3B] text-[#6EE7B7] border-[#10B981]' };
      case 'benchmark':
        return { label: '■ BENCHMARK IN PROGRESS', bg: 'bg-[#0C4A6E] text-[#7DD3FC] border-[#0284C7]' };
      case 'assist':
        return { label: '■ MENTOR ASSIST REQUESTED', bg: 'bg-[#78350F] text-[#FCD34D] border-[#F59E0B]' };
      case 'standby':
        return { label: '■ STANDBY / IDLE', bg: 'bg-[#1E293B] text-[#94A3B8] border-[#64748B]' };
      default:
        return { label: '■ OFFLINE', bg: 'bg-[#450a0a] text-[#fca5a5] border-[#EF4444]' };
    }
  };

  const statusStyle = getStatusBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050D1A]/85 backdrop-blur-[8px]">
      {/* Centered Modal Frame with 1px solid #334E68 and 2px #10B981 header divider */}
      <div className="w-full max-w-[640px] bg-[#0B1E36] border border-[#334E68] shadow-2xl relative overflow-hidden text-[#F8FAFC]">
        {/* Emerald horizontal bar separating header block */}
        <div className="h-[2px] w-full bg-[#10B981]"></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E3A5F] flex items-center justify-between bg-[#050D1A]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space font-bold text-lg tracking-tight uppercase text-[#F8FAFC]">
                {workstation.labId} // WORKSTATION {workstation.id.replace('WS-', '')}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 border uppercase font-bold ${statusStyle.bg}`}>
                {statusStyle.label}
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">
              TELEMETRY INSPECTION & DIRECT HARDWARE BUS
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1.5 hover:bg-[#122846] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Occupant Talent Card if present */}
          {workstation.occupant ? (
            <div className="bg-[#122846] border border-[#334E68] p-3.5 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0B1E36] border border-[#10B981] flex items-center justify-center font-space font-bold text-base text-[#10B981]">
                    {workstation.occupant.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-space font-semibold text-base text-[#F8FAFC]">
                      {workstation.occupant.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#0284C7] uppercase">
                      {workstation.occupant.track} // {workstation.occupant.platform}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#94A3B8] uppercase">BILLABLE RATE</div>
                  <div className="font-space font-bold text-base text-[#10B981] tabular-nums">
                    ${workstation.occupant.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E3A5F] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="text-[#94A3B8]">
                  ACTIVE CONTRACT: <span className="text-[#F8FAFC] font-medium">{workstation.occupant.activeContract}</span>
                </div>
                <div className="text-[#6EE7B7] text-[10px] font-semibold">
                  ★ {workstation.occupant.rating}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#050D1A] border border-[#1E3A5F] p-4 text-center text-xs font-mono text-[#94A3B8]">
              NO OPERATOR ASSIGNED TO THIS SEAT // NODE IN IDLE STANDBY
            </div>
          )}

          {/* Live Telemetry Resource Bars */}
          <div className="bg-[#050D1A] border border-[#1E3A5F] p-3.5 space-y-3">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#94A3B8] flex items-center justify-between">
              <span>HARDWARE TELEMETRY READOUTS</span>
              <span className="text-[#10B981]">UPTIME: {workstation.metrics.uptimeHours.toFixed(1)} HRS</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* CPU load */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94A3B8]">CPU (32-TH):</span>
                  <span className="text-[#F8FAFC] font-bold tabular-nums">{workstation.metrics.cpuPercent}%</span>
                </div>
                <div className="w-full bg-[#1E3A5F] h-2">
                  <div
                    className={`h-full ${
                      workstation.metrics.cpuPercent > 80 ? 'bg-[#EF4444]' : 'bg-[#10B981]'
                    }`}
                    style={{ width: `${workstation.metrics.cpuPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* GPU load */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94A3B8]">GPU ACCEL:</span>
                  <span className="text-[#F8FAFC] font-bold tabular-nums">{workstation.metrics.gpuPercent}%</span>
                </div>
                <div className="w-full bg-[#1E3A5F] h-2">
                  <div
                    className={`h-full ${
                      workstation.metrics.gpuPercent > 85 ? 'bg-[#F59E0B]' : 'bg-[#0284C7]'
                    }`}
                    style={{ width: `${workstation.metrics.gpuPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* RAM */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94A3B8]">RAM ALLOCATION:</span>
                  <span className="text-[#F8FAFC] font-bold tabular-nums">
                    {workstation.metrics.ramUsedGB} / {workstation.metrics.ramTotalGB} GB
                  </span>
                </div>
                <div className="w-full bg-[#1E3A5F] h-2">
                  <div
                    className="h-full bg-[#0284C7]"
                    style={{ width: `${(workstation.metrics.ramUsedGB / workstation.metrics.ramTotalGB) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Network */}
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#94A3B8]">NETWORK EGRESS:</span>
                  <span className="text-[#10B981] font-bold tabular-nums">{workstation.metrics.networkMbps} Mbps</span>
                </div>
                <div className="w-full bg-[#1E3A5F] h-2">
                  <div
                    className="h-full bg-[#10B981]"
                    style={{ width: `${Math.min(100, (workstation.metrics.networkMbps / 500) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Active Process & Git Context */}
            <div className="pt-2 border-t border-[#1E3A5F] space-y-1.5 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                <span className="text-[#94A3B8]">EXEC:</span>
                <span className="text-[#F8FAFC] font-semibold truncate bg-[#122846] px-1.5 py-0.5 border border-[#334E68]/60 w-full">
                  {workstation.metrics.activeProcess}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span className="text-[#94A3B8]">BRANCH:</span>
                <span className="text-[#FCD34D] font-mono">{workstation.metrics.gitBranch}</span>
              </div>
            </div>
          </div>

          {/* Interactive Direct Terminal Ping Command */}
          <form onSubmit={handleSendCommand} className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] block">
              TRANSMIT DIRECT OPERATOR SIGNAL TO WORKSTATION DISPLAY
            </label>
            <div className="flex">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="e.g. Please commit changes before 21:30 sprint review..."
                className="flex-1 bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-[#122846] hover:bg-[#1E3A5F] border border-[#334E68] text-[#F8FAFC] px-4 py-2 text-xs font-mono uppercase font-bold flex items-center space-x-1"
              >
                <Send className="w-3 h-3 text-[#10B981]" />
                <span>Transmit</span>
              </button>
            </div>
            {commandFeedback && (
              <div className="text-[11px] font-mono text-[#6EE7B7] bg-[#064E3B] px-2 py-1 border border-[#10B981]">
                {commandFeedback}
              </div>
            )}
          </form>
        </div>

        {/* Modal Action Bar per design spec: aligned to right with square primary & secondary buttons */}
        <div className="p-4 sm:p-5 bg-[#050D1A] border-t border-[#1E3A5F] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onRebootNode(workstation.id);
                onClose();
              }}
              className="bg-transparent hover:bg-[#EF4444]/15 border border-[#EF4444] text-[#EF4444] px-3 py-2 text-xs font-mono uppercase font-bold transition-colors flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reboot Node</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="bg-[#0B1E36] hover:bg-[#122846] border border-[#334E68] hover:border-[#10B981] text-[#F8FAFC] px-4 py-2 text-xs font-mono uppercase font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDispatchMentor(workstation.id);
                onClose();
              }}
              className="bg-[#10B981] hover:bg-[#059669] text-[#050D1A] font-bold px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Dispatch Mentor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

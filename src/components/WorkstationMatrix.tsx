import React, { useState } from 'react';
import { Workstation, LabCluster, WorkstationStatus } from '../types';
import { 
  Cpu, 
  Search, 
  Filter, 
  Activity, 
  Terminal, 
  Wifi, 
  Flame, 
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface WorkstationMatrixProps {
  lab: LabCluster;
  workstations: Workstation[];
  onSelectWorkstation: (ws: Workstation) => void;
  onSelectOtherLab: (labId: LabCluster['id']) => void;
  allLabs: LabCluster[];
}

export const WorkstationMatrix: React.FC<WorkstationMatrixProps> = ({
  lab,
  workstations,
  onSelectWorkstation,
  onSelectOtherLab,
  allLabs
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | WorkstationStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkstations = workstations.filter((ws) => {
    if (statusFilter !== 'ALL' && ws.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = ws.id.toLowerCase().includes(q);
      const matchName = ws.occupant?.name.toLowerCase().includes(q);
      const matchProcess = ws.metrics.activeProcess.toLowerCase().includes(q);
      const matchTask = ws.occupant?.activeContract.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchProcess && !matchTask) return false;
    }
    return true;
  });

  const getStatusColor = (status: WorkstationStatus) => {
    switch (status) {
      case 'active':
        return {
          border: 'border-[#1E3A5F] hover:border-[#10B981]',
          bg: 'bg-[#0B1E36]',
          indicator: 'bg-[#10B981]',
          tag: 'text-[#6EE7B7] bg-[#064E3B]'
        };
      case 'benchmark':
        return {
          border: 'border-[#0284C7]/60 hover:border-[#0284C7]',
          bg: 'bg-[#0B1E36]',
          indicator: 'bg-[#0284C7]',
          tag: 'text-[#7DD3FC] bg-[#0C4A6E]'
        };
      case 'assist':
        return {
          border: 'border-[#F59E0B] hover:border-[#F59E0B]',
          bg: 'bg-[#1a1705]',
          indicator: 'bg-[#F59E0B] animate-ping',
          tag: 'text-[#FCD34D] bg-[#78350F]'
        };
      case 'standby':
        return {
          border: 'border-[#1E3A5F]/50',
          bg: 'bg-[#050D1A]',
          indicator: 'bg-[#64748B]',
          tag: 'text-[#94A3B8] bg-[#1E293B]'
        };
      default:
        return {
          border: 'border-[#EF4444]/60',
          bg: 'bg-[#210909]',
          indicator: 'bg-[#EF4444]',
          tag: 'text-[#fca5a5] bg-[#450a0a]'
        };
    }
  };

  return (
    <div className="space-y-5">
      {/* Lab Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#1E3A5F] pb-3">
        {allLabs.map((l) => {
          const isCurrent = l.id === lab.id;
          return (
            <button
              key={l.id}
              onClick={() => onSelectOtherLab(l.id)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                isCurrent
                  ? 'bg-[#122846] border-[#10B981] text-[#F8FAFC]'
                  : 'bg-[#0B1E36] border-[#1E3A5F] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#334E68]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={isCurrent ? 'text-[#10B981]' : 'text-[#64748B]'}>{l.id}</span>
                <span className="hidden sm:inline">// {l.track}</span>
                <span className="text-[10px] tabular-nums text-[#6EE7B7]">
                  ({l.activeSeats}/{l.totalSeats})
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lab Telemetry Banner */}
      <div className="bg-[#0B1E36] border border-[#1E3A5F] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-space font-bold text-xl text-[#F8FAFC] tracking-tight uppercase">
              {lab.designation}
            </h2>
            <span className="text-[10px] font-mono bg-[#064E3B] text-[#6EE7B7] border border-[#10B981] px-2 py-0.5 uppercase font-bold">
              ■ {lab.status}
            </span>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            MENTOR IN CHARGE: <span className="text-[#F8FAFC] font-semibold">{lab.mentor}</span> ({lab.mentorClearance})
          </p>
        </div>

        {/* Environmental Readouts */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="bg-[#050D1A] border border-[#1E3A5F] px-3 py-2">
            <span className="text-[#64748B] block text-[10px] uppercase">ACCELERATOR</span>
            <span className="text-[#F8FAFC] font-bold">{lab.gpuCluster}</span>
          </div>
          <div className="bg-[#050D1A] border border-[#1E3A5F] px-3 py-2">
            <span className="text-[#64748B] block text-[10px] uppercase">RACK THERMALS</span>
            <span className="text-[#10B981] font-bold tabular-nums">{lab.temperatureC}°C NOMINAL</span>
          </div>
          <div className="bg-[#050D1A] border border-[#1E3A5F] px-3 py-2">
            <span className="text-[#64748B] block text-[10px] uppercase">NETWORK SFP+</span>
            <span className="text-[#0284C7] font-bold tabular-nums">{lab.bandwidthGbps} Gbps SYMMETRIC</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0B1E36] border border-[#1E3A5F] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-[#64748B] text-[10px] uppercase font-bold mr-1">STATUS:</span>
          {(['ALL', 'active', 'benchmark', 'assist', 'standby'] as const).map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 text-[11px] uppercase font-bold tracking-wider border transition-all ${
                  isSelected
                    ? 'bg-[#10B981] text-[#050D1A] border-[#10B981]'
                    : 'bg-[#050D1A] text-[#94A3B8] border-[#1E3A5F] hover:text-[#F8FAFC]'
                }`}
              >
                {status === 'ALL' ? 'ALL NODES' : status.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search WS-ID, talent, process..."
            className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-xs font-mono text-[#F8FAFC] pl-8 pr-3 py-1.5 outline-none"
          />
        </div>
      </div>

      {/* 32-Seat Tactical Grid per lab (arranged in 4 pods of 8 workstations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredWorkstations.map((ws) => {
          const style = getStatusColor(ws.status);
          return (
            <div
              key={ws.id}
              onClick={() => onSelectWorkstation(ws)}
              className={`${style.bg} border ${style.border} p-3.5 cursor-pointer transition-all hover:bg-[#122846] relative group flex flex-col justify-between min-h-[145px]`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="font-space font-bold text-sm text-[#F8FAFC] tracking-tight">
                    {ws.id}
                  </div>
                  <span className={`text-[9px] font-mono px-1 py-0.2 border uppercase font-bold ${style.tag}`}>
                    {ws.status}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 ${style.indicator}`}></span>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase">POD {Math.ceil(ws.seatNumber / 8)}</span>
                </div>
              </div>

              {/* Occupant / Task Info */}
              <div className="my-2">
                {ws.occupant ? (
                  <div>
                    <div className="font-space font-medium text-xs text-[#F8FAFC] group-hover:text-[#6EE7B7] transition-colors truncate">
                      {ws.occupant.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#94A3B8] truncate mt-0.5">
                      {ws.occupant.activeContract}
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-[#64748B] italic">
                    IDLE / AVAILABLE SEAT
                  </div>
                )}
              </div>

              {/* Resource Metrics Mini-footer */}
              <div className="pt-2 border-t border-[#1E3A5F]/60 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <div className="flex items-center space-x-2">
                  <span>CPU <span className="text-[#F8FAFC] font-semibold">{ws.metrics.cpuPercent}%</span></span>
                  <span>GPU <span className="text-[#0284C7] font-semibold">{ws.metrics.gpuPercent}%</span></span>
                </div>
                <span className="text-[#10B981] group-hover:translate-x-0.5 transition-transform text-[9px] uppercase font-bold">
                  INSPECT &gt;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWorkstations.length === 0 && (
        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-8 text-center text-xs font-mono text-[#94A3B8]">
          NO WORKSTATION MATCHES CRITERIA. ADJUST SEARCH OR STATUS FILTER.
        </div>
      )}
    </div>
  );
};

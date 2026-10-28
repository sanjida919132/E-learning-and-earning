import React from 'react';
import { LabCluster } from '../types';
import { Cpu, UserCheck, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface LaboratoryCardProps {
  lab: LabCluster;
  onSelect: (labId: LabCluster['id']) => void;
  isSelected?: boolean;
}

export const LaboratoryCard: React.FC<LaboratoryCardProps> = ({
  lab,
  onSelect,
  isSelected = false
}) => {
  const occupancyPercent = Math.round((lab.activeSeats / lab.totalSeats) * 100);
  const totalSegments = 16;
  const activeSegments = Math.round((lab.activeSeats / lab.totalSeats) * totalSegments);

  return (
    <div
      onClick={() => onSelect(lab.id)}
      className={`bg-[#0B1E36] border transition-all cursor-pointer relative group flex flex-col justify-between ${
        isSelected
          ? 'border-[#10B981] shadow-[inset_0_0_0_1px_#10B981]'
          : 'border-[#1E3A5F] hover:border-[#334E68]'
      }`}
    >
      {/* 45-degree chamfer top corner indicator */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-[#10B981] chamfer-tr"></div>

      {/* Header Block */}
      <div className="p-4 sm:p-5 border-b border-[#1E3A5F]/70">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase">
              {lab.id}
            </span>
            <span className="text-[#334E68]">//</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 uppercase font-bold tracking-wider ${
                lab.status === 'OPTIMAL'
                  ? 'bg-[#064E3B] text-[#6EE7B7] border border-[#10B981]/60'
                  : 'bg-[#78350F] text-[#FCD34D] border border-[#F59E0B]/60'
              }`}
            >
              ■ {lab.status}
            </span>
          </div>

          <div className="font-mono text-xs text-[#F8FAFC] tabular-nums font-bold">
            <span className="text-[#10B981]">{lab.activeSeats}</span> / {lab.totalSeats} <span className="text-[10px] text-[#64748B]">NODES ACTIVE</span>
          </div>
        </div>

        <h3 className="font-space font-semibold text-lg text-[#F8FAFC] tracking-tight group-hover:text-[#6EE7B7] transition-colors leading-snug">
          {lab.name}
        </h3>
        <p className="text-xs font-mono text-[#94A3B8] mt-1.5 line-clamp-1">
          {lab.specializationSummary}
        </p>
      </div>

      {/* Telemetry Segmented Progress Bar per design spec */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#010F1F] border-b border-[#1E3A5F]/60">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1.5">
          <span className="uppercase tracking-wider flex items-center space-x-1">
            <Zap className="w-3 h-3 text-[#10B981]" />
            <span>Compute & Seat Allocation</span>
          </span>
          <span className="text-[#F8FAFC] font-bold tabular-nums">
            {occupancyPercent}% LOAD
          </span>
        </div>

        {/* 16-Segment Segmented Progress Line */}
        <div className="grid grid-cols-16 gap-1 w-full h-2">
          {Array.from({ length: totalSegments }).map((_, idx) => {
            const isFilled = idx < activeSegments;
            return (
              <div
                key={idx}
                className={`h-full transition-colors ${
                  isFilled
                    ? 'bg-[#10B981]'
                    : 'bg-[#1E3A5F]'
                }`}
              />
            );
          })}
        </div>

        {/* Hardware & Environmental Readouts */}
        <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-[#1E3A5F]/40 text-[10px] font-mono text-[#64748B]">
          <div className="flex items-center space-x-1">
            <span>TEMP:</span>
            <span className="text-[#F8FAFC] font-semibold">{lab.temperatureC}°C</span>
          </div>
          <div className="flex items-center space-x-1 justify-end">
            <span>MESH:</span>
            <span className="text-[#0284C7] font-semibold">{lab.bandwidthGbps} Gbps</span>
          </div>
        </div>
      </div>

      {/* Footer Metadata */}
      <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] uppercase tracking-wider text-[10px]">Lead Mentor:</span>
            <span className="text-[#F8FAFC] font-medium truncate max-w-[200px] text-right">
              {lab.mentor}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] uppercase tracking-wider text-[10px]">Active Track:</span>
            <span className="text-[#0284C7] font-medium truncate max-w-[200px] text-right">
              {lab.track}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs font-mono">
          <span className="text-[#10B981] group-hover:translate-x-1 transition-transform flex items-center space-x-1 uppercase text-[11px] font-semibold">
            <span>Open Workstation Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-[10px] text-[#64748B]">
            GRID 4x8
          </span>
        </div>
      </div>
    </div>
  );
};

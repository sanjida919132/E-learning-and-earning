import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  badge?: string;
  accentColor?: 'emerald' | 'cyan' | 'amber' | 'slate';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  trend,
  isPositive = true,
  icon: Icon,
  badge,
  accentColor = 'emerald'
}) => {
  const getAccentBorder = () => {
    switch (accentColor) {
      case 'emerald':
        return 'hover:border-[#10B981]';
      case 'cyan':
        return 'hover:border-[#0284C7]';
      case 'amber':
        return 'hover:border-[#F59E0B]';
      default:
        return 'hover:border-[#334E68]';
    }
  };

  return (
    <div
      className={`bg-[#0B1E36] border border-[#1E3A5F] ${getAccentBorder()} p-4 sm:p-5 flex flex-col justify-between transition-colors relative group`}
    >
      {/* Top Bar with Micro Label & Icon/Badge */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-mono font-bold tracking-[0.1em] uppercase text-[#94A3B8]">
          {label}
        </span>
        <div className="flex items-center space-x-2">
          {badge && (
            <span className="bg-[#122846] text-[#0284C7] border border-[#0284C7]/40 text-[9px] font-mono px-1.5 py-0.5 uppercase font-semibold">
              {badge}
            </span>
          )}
          {Icon && (
            <Icon className="w-4 h-4 text-[#64748B] group-hover:text-[#10B981] transition-colors" />
          )}
        </div>
      </div>

      {/* Center: Oversized Metric Value in Space Grotesk */}
      <div className="my-1">
        <div className="font-space font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-tight text-[#F8FAFC] tabular-nums tracking-tight">
          {value}
        </div>
        {subValue && (
          <div className="text-xs font-mono text-[#64748B] mt-1">
            {subValue}
          </div>
        )}
      </div>

      {/* Bottom: Trend Indicator */}
      <div className="mt-3 pt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-1.5">
          <span
            className={`font-semibold ${
              isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {isPositive ? '▲' : '▼'} {trend}
          </span>
        </div>
        <span className="text-[10px] text-[#64748B] uppercase tracking-wider">
          RUN-TIME TELEMETRY
        </span>
      </div>

      {/* Subtle corner marker */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#1E3A5F] group-hover:border-[#10B981]"></div>
    </div>
  );
};

import React from 'react';
import { LabAlert } from '../types';
import { ShieldAlert, CheckCircle2, UserCheck, AlertTriangle, Info, Bell, Radio } from 'lucide-react';

interface AlertsViewProps {
  alerts: LabAlert[];
  onAcknowledge: (alertId: string) => void;
  onOpenBroadcastModal: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onAcknowledge,
  onOpenBroadcastModal
}) => {
  const getSeverityStyle = (severity: LabAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          border: 'border-[#EF4444]',
          tag: 'bg-[#450a0a] text-[#fca5a5] border-[#EF4444]',
          icon: AlertTriangle,
          iconColor: 'text-[#EF4444]'
        };
      case 'WARNING':
        return {
          border: 'border-[#F59E0B]',
          tag: 'bg-[#78350F] text-[#FCD34D] border-[#F59E0B]',
          icon: AlertTriangle,
          iconColor: 'text-[#F59E0B]'
        };
      case 'ACHIEVEMENT':
        return {
          border: 'border-[#10B981]',
          tag: 'bg-[#064E3B] text-[#6EE7B7] border-[#10B981]',
          icon: CheckCircle2,
          iconColor: 'text-[#10B981]'
        };
      case 'INFO':
      default:
        return {
          border: 'border-[#0284C7]',
          tag: 'bg-[#0C4A6E] text-[#7DD3FC] border-[#0284C7]',
          icon: Info,
          iconColor: 'text-[#0284C7]'
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-[#0B1E36] border border-[#1E3A5F] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-space font-bold text-xl text-[#F8FAFC] tracking-tight uppercase">
              DISPATCH QUEUE & LABORATORY ALERTS
            </h2>
            <span className="text-[10px] font-mono bg-[#122846] text-[#0284C7] border border-[#0284C7] px-2 py-0.5 uppercase font-bold">
              ■ INCIDENT BUS
            </span>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            REAL-TIME FLOOR REQUESTS, HARDWARE ANOMALIES & MILESTONE ACHIEVEMENTS
          </p>
        </div>

        <button
          onClick={onOpenBroadcastModal}
          className="bg-[#122846] hover:bg-[#1E3A5F] border border-[#334E68] text-[#F8FAFC] px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider transition-colors flex items-center space-x-1.5"
        >
          <Radio className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Broadcast Notice</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = getSeverityStyle(alert.severity);
          const Icon = style.icon;
          return (
            <div
              key={alert.id}
              className={`bg-[#0B1E36] border ${
                alert.acknowledged ? 'border-[#1E3A5F]/70 opacity-80' : style.border
              } p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`p-2 bg-[#050D1A] border border-[#1E3A5F] shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${style.iconColor}`} />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.2 border uppercase font-bold ${style.tag}`}>
                      {alert.severity}
                    </span>
                    <span className="font-mono text-xs text-[#10B981] font-bold">
                      {alert.labId} {alert.workstationId && `// ${alert.workstationId}`}
                    </span>
                    <span className="text-[#334E68]">•</span>
                    <span className="font-mono text-[11px] text-[#64748B]">
                      {alert.timestamp}
                    </span>
                  </div>

                  <h3 className="font-space font-semibold text-base text-[#F8FAFC]">
                    {alert.title}
                  </h3>
                  <p className="font-geist text-xs text-[#94A3B8] max-w-3xl leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                {alert.acknowledged ? (
                  <span className="text-[11px] font-mono text-[#64748B] uppercase flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>ACKNOWLEDGED</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="bg-[#050D1A] hover:bg-[#10B981] text-[#94A3B8] hover:text-[#050D1A] border border-[#1E3A5F] hover:border-[#10B981] px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

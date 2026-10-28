import React, { useState } from 'react';
import { LabId } from '../types';
import { X, Radio, Send, AlertTriangle } from 'lucide-react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendBroadcast: (message: string, severity: 'INFO' | 'WARNING' | 'CRITICAL', targetLab: string) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onSendBroadcast
}) => {
  const [targetLab, setTargetLab] = useState<string>('ALL');
  const [severity, setSeverity] = useState<'INFO' | 'WARNING' | 'CRITICAL'>('INFO');
  const [message, setMessage] = useState<string>('Daily Standup & Milestone Review starts in 10 minutes at Central Auditorium.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendBroadcast(message.trim(), severity, targetLab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050D1A]/85 backdrop-blur-[8px]">
      <div className="w-full max-w-[640px] bg-[#0B1E36] border border-[#334E68] shadow-2xl relative overflow-hidden text-[#F8FAFC]">
        {/* Emerald horizontal bar separating header block */}
        <div className="h-[2px] w-full bg-[#10B981]"></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E3A5F] flex items-center justify-between bg-[#050D1A]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space font-bold text-lg tracking-tight uppercase text-[#F8FAFC]">
                CENTRAL AUDIO-VISUAL LAB BROADCAST
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[#F59E0B] bg-[#78350F] text-[#FCD34D] uppercase font-bold">
                ■ TRANSMITTER READY
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">
              OVERRIDE SCREENS & HEADS-UP NOTIFICATIONS ACROSS WORKSTATION STATIONS
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1.5 hover:bg-[#122846] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  TARGET RECIPIENT CLUSTER
                </label>
                <select
                  value={targetLab}
                  onChange={(e) => setTargetLab(e.target.value)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                >
                  <option value="ALL">ALL 128 NODES (GLOBAL BROADCAST)</option>
                  <option value="LAB-01">LAB-01 Full-Stack Architecture</option>
                  <option value="LAB-02">LAB-02 AI Accelerator</option>
                  <option value="LAB-03">LAB-03 Cloud & DevSecOps</option>
                  <option value="LAB-04">LAB-04 Freelance Nexus</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  BROADCAST PRIORITY LEVEL
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                >
                  <option value="INFO">STANDARD ADVISORY (CYAN)</option>
                  <option value="WARNING">PRIORITY ALERT (AMBER)</option>
                  <option value="CRITICAL">CRITICAL HALT / EMERGENCY (RED)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                SIGNAL TRANSMISSION PAYLOAD (BROADCAST TEXT)
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type broadcast announcement message here..."
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono p-3 outline-none"
              />
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#050D1A] border-t border-[#1E3A5F] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0B1E36] hover:bg-[#122846] border border-[#334E68] text-[#F8FAFC] px-4 py-2 text-xs font-mono uppercase font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#10B981] hover:bg-[#059669] text-[#050D1A] font-bold px-5 py-2 text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Over Air</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

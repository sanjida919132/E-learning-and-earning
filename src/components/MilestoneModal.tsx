import React, { useState } from 'react';
import { StudentFreelancer, EarningTransaction } from '../types';
import { X, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentFreelancer[];
  selectedStudent?: StudentFreelancer | null;
  onAddTransaction: (transaction: EarningTransaction, updatedEarnings: number) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  students,
  selectedStudent,
  onAddTransaction
}) => {
  const [studentId, setStudentId] = useState<string>(selectedStudent ? selectedStudent.id : (students[0]?.id || ''));
  const [platform, setPlatform] = useState<'Upwork' | 'Fiverr Pro' | 'Toptal' | 'Direct Enterprise'>('Upwork');
  const [amount, setAmount] = useState<string>('2400');
  const [projectTitle, setProjectTitle] = useState<string>('LLM Tool Calling Integration Sprint 2');
  const [clientCountry, setClientCountry] = useState<string>('United States');
  const [notes, setNotes] = useState<string>('All acceptance tests passed. Client released escrow.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const currentStudent = students.find(s => s.id === studentId) || students[0];
    const newTxn: EarningTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      freelancerName: currentStudent ? currentStudent.name : 'Operative',
      studentId: currentStudent ? currentStudent.id : 'STU-000',
      platform,
      amount: numAmount,
      projectTitle: projectTitle.trim() || 'Contract Milestone Completed',
      clientCountry: clientCountry.trim() || 'Global Client',
      timestamp: 'Just now',
      verificationHash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      status: 'VERIFIED'
    };

    onAddTransaction(newTxn, numAmount);
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
                LOG CONTRACT MILESTONE & ESCROW PAYOUT
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[#10B981] bg-[#064E3B] text-[#6EE7B7] uppercase font-bold">
                ■ VERIFIED
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">
              TELEMETRY INGESTION INTO CENTRAL ICT EARNINGS REPOSITORY
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1.5 hover:bg-[#122846] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Student Operative selector */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                STUDENT OPERATIVE / FREELANCER
              </label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#050D1A]">
                    {s.name} ({s.id}) // {s.track} - {s.workstationId}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform & Amount Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  FREELANCE PLATFORM
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                >
                  <option value="Upwork">Upwork Global</option>
                  <option value="Toptal">Toptal Core</option>
                  <option value="Fiverr Pro">Fiverr Pro</option>
                  <option value="Direct Enterprise">Direct Enterprise Client</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  PAYOUT AMOUNT (USD $)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[#10B981] font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="50"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono pl-7 pr-3 py-2 outline-none tabular-nums font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Project Title */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                CONTRACT / MILESTONE DELIVERABLE TITLE
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
                placeholder="e.g. Multi-Agent RAG Engine Phase 1"
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
              />
            </div>

            {/* Client Jurisdiction */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                CLIENT JURISDICTION / LOCATION
              </label>
              <input
                type="text"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                placeholder="e.g. United States (San Francisco, CA)"
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
              />
            </div>

            {/* Audit Notes */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                VERIFICATION REMARKS & AUDIT HASH
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Modal Action Bar per design spec: aligned to right with square buttons */}
          <div className="p-4 sm:p-5 bg-[#050D1A] border-t border-[#1E3A5F] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0B1E36] hover:bg-[#122846] border border-[#334E68] hover:border-[#10B981] text-[#F8FAFC] px-4 py-2 text-xs font-mono uppercase font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#10B981] hover:bg-[#059669] text-[#050D1A] font-bold px-5 py-2 text-xs font-mono uppercase tracking-wider transition-colors flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Verify & Ingest Payout</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

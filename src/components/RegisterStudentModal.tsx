import React, { useState } from 'react';
import { StudentFreelancer, LabId } from '../types';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

interface RegisterStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (student: StudentFreelancer) => void;
}

export const RegisterStudentModal: React.FC<RegisterStudentModalProps> = ({
  isOpen,
  onClose,
  onRegister
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState<StudentFreelancer['track']>('Agentic AI');
  const [assignedLab, setAssignedLab] = useState<LabId>('LAB-02');
  const [workstationId, setWorkstationId] = useState('WS-15');
  const [platform, setPlatform] = useState<StudentFreelancer['platform']>('Upwork');
  const [hourlyRate, setHourlyRate] = useState('75');
  const [skills, setSkills] = useState('LangGraph, Gemini 2.0, Python, TypeScript');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: StudentFreelancer = {
      id: `STU-${Math.floor(1300 + Math.random() * 800)}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@ictcenter.gov.bd`,
      track,
      assignedLab,
      workstationId,
      platform,
      profileScore: '100% JSS // Rising Star',
      hourlyRate: parseInt(hourlyRate, 10) || 75,
      totalEarnedYTD: 0,
      activeContractsCount: 1,
      activeMilestoneTitle: 'Initial Client Onboarding Architecture Sprint',
      activeMilestoneAmount: 1200,
      status: 'ACTIVE',
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      joinedDate: new Date().toISOString().split('T')[0]
    };

    onRegister(newStudent);
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
                REGISTER TALENT OPERATIVE TO LAB CLUSTER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[#0284C7] bg-[#0C4A6E] text-[#7DD3FC] uppercase font-bold">
                ■ CLEARANCE L3
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider mt-0.5">
              ALLOCATE HARDWARE WORKSTATION & SPRINT ROSTER
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
          <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  OPERATIVE FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariqul Islam"
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  CENTRAL EMAIL / IDENTITY
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. t.islam@ictcenter.gov.bd"
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  TRACK
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value as any)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-2.5 py-2 outline-none"
                >
                  <option value="Agentic AI">Agentic AI</option>
                  <option value="Fullstack Web">Fullstack Web</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Cyber Security">Cyber Security</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  ASSIGNED LAB
                </label>
                <select
                  value={assignedLab}
                  onChange={(e) => setAssignedLab(e.target.value as any)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-2.5 py-2 outline-none"
                >
                  <option value="LAB-01">LAB-01 Fullstack</option>
                  <option value="LAB-02">LAB-02 AI Accelerator</option>
                  <option value="LAB-03">LAB-03 Cloud/DevOps</option>
                  <option value="LAB-04">LAB-04 Freelance Nexus</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  SEAT ID
                </label>
                <input
                  type="text"
                  value={workstationId}
                  onChange={(e) => setWorkstationId(e.target.value)}
                  placeholder="WS-15"
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  PRIMARY PLATFORM
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                >
                  <option value="Upwork">Upwork</option>
                  <option value="Toptal">Toptal</option>
                  <option value="Fiverr Pro">Fiverr Pro</option>
                  <option value="Direct Enterprise">Direct Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                  BASE HOURLY RATE ($)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-1 font-bold">
                TECHNICAL SKILLS (COMMA SEPARATED)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React 19, LangGraph, Python, Docker"
                className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-[#F8FAFC] text-xs font-mono px-3 py-2 outline-none"
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
              <UserPlus className="w-4 h-4 stroke-[2.5]" />
              <span>Enroll Operative</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

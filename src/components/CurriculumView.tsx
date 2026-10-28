import React from 'react';
import { CurriculumSprint } from '../types';
import { BookOpen, CheckCircle, Code, Layers, Users, Award, ExternalLink, Zap } from 'lucide-react';

interface CurriculumViewProps {
  sprints: CurriculumSprint[];
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ sprints }) => {
  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="bg-[#0B1E36] border border-[#1E3A5F] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-space font-bold text-xl text-[#F8FAFC] tracking-tight uppercase">
              HIGH-INTENSITY ICT CURRICULUM PIPELINE
            </h2>
            <span className="text-[10px] font-mono bg-[#064E3B] text-[#6EE7B7] border border-[#10B981] px-2 py-0.5 uppercase font-bold">
              ■ SPRINTS ACTIVE
            </span>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            4 PARALLEL COHORTS // 128 CONCURRENT TALENT OPERATIVES // 97.2% AVERAGE CONTRACT PASS RATE
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="bg-[#050D1A] border border-[#1E3A5F] px-3.5 py-2">
            <span className="text-[#64748B] block text-[10px] uppercase">SPRINT CYCLE</span>
            <span className="text-[#10B981] font-bold">WEEK 8 OF 12</span>
          </div>
          <div className="bg-[#050D1A] border border-[#1E3A5F] px-3.5 py-2">
            <span className="text-[#64748B] block text-[10px] uppercase">CODE REVIEWS</span>
            <span className="text-[#0284C7] font-bold">412 COMPLETED</span>
          </div>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sprints.map((sprint, idx) => (
          <div
            key={sprint.id}
            className="bg-[#0B1E36] border border-[#1E3A5F] hover:border-[#334E68] transition-colors p-5 flex flex-col justify-between relative group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase">
                    TRACK // 0{idx + 1}
                  </span>
                  <span className="text-[#334E68]">//</span>
                  <span className="font-mono text-[10px] text-[#94A3B8] uppercase">
                    {sprint.cohort}
                  </span>
                </div>
                <h3 className="font-space font-semibold text-lg text-[#F8FAFC] mt-1">
                  {sprint.track}
                </h3>
              </div>

              <div className="bg-[#050D1A] border border-[#1E3A5F] px-2.5 py-1 text-right">
                <span className="text-[9px] font-mono text-[#64748B] block uppercase">PASS RATE</span>
                <span className="font-space font-bold text-sm text-[#10B981] tabular-nums">
                  {sprint.milestoneAcceptanceRate}%
                </span>
              </div>
            </div>

            {/* Current sprint & Progress bar */}
            <div className="my-3 p-3 bg-[#050D1A] border border-[#1E3A5F]/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#F8FAFC] font-semibold">{sprint.currentSprint}</span>
                <span className="text-[#10B981] font-bold tabular-nums">{sprint.weekProgress}%</span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-[#1E3A5F] h-2">
                <div
                  className="bg-[#10B981] h-full transition-all"
                  style={{ width: `${sprint.weekProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Key Tech Badges */}
            <div className="my-2">
              <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1.5">
                STACK & PRODUCTION ARTIFACTS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sprint.keyTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#122846] text-[#d4e4fa] border border-[#334E68] text-[10px] font-mono px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer instructor info */}
            <div className="pt-3 mt-3 border-t border-[#1E3A5F]/60 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-[#94A3B8]">
                <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>LEAD: <strong className="text-[#F8FAFC]">{sprint.leadInstructor}</strong></span>
              </div>

              <span className="text-[#10B981] font-bold text-[11px] uppercase">
                {sprint.enrolledTalent} ACTIVE TALENT
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

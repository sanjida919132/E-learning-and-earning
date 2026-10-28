import React, { useState } from 'react';
import { StudentFreelancer } from '../types';
import { Search, Filter, ArrowUpDown, DollarSign, Award, ExternalLink, Plus } from 'lucide-react';

interface StudentTableProps {
  students: StudentFreelancer[];
  onLogMilestoneForStudent: (student: StudentFreelancer) => void;
  onRegisterStudent: () => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onLogMilestoneForStudent,
  onRegisterStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<string>('ALL');
  const [platformFilter, setPlatformFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'totalEarnedYTD' | 'hourlyRate' | 'name'>('totalEarnedYTD');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'totalEarnedYTD' | 'hourlyRate' | 'name') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredStudents = students
    .filter((s) => {
      if (trackFilter !== 'ALL' && s.track !== trackFilter) return false;
      if (platformFilter !== 'ALL' && s.platform !== platformFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q);
        const matchId = s.id.toLowerCase().includes(q);
        const matchSkill = s.skills.some(skill => skill.toLowerCase().includes(q));
        const matchContract = s.activeMilestoneTitle.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchSkill && !matchContract) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const getStatusBadge = (status: StudentFreelancer['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="bg-[#064E3B] border border-[#10B981] text-[#6EE7B7] text-[10px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider whitespace-nowrap">
            ■ ACTIVE
          </span>
        );
      case 'STANDBY':
        return (
          <span className="bg-[#1E293B] border border-[#64748B] text-[#94A3B8] text-[10px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider whitespace-nowrap">
            ■ STANDBY
          </span>
        );
      case 'PENDING_REVIEW':
        return (
          <span className="bg-[#78350F] border border-[#F59E0B] text-[#FCD34D] text-[10px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider whitespace-nowrap">
            ■ REVIEW
          </span>
        );
      case 'CERTIFIED':
        return (
          <span className="bg-[#0C4A6E] border border-[#0284C7] text-[#7DD3FC] text-[10px] font-mono px-2 py-0.5 uppercase font-bold tracking-wider whitespace-nowrap">
            ■ CERTIFIED
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-[#0B1E36] border border-[#1E3A5F] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Track Filters */}
          <span className="text-[10px] font-mono uppercase text-[#64748B] font-bold">TRACK:</span>
          {['ALL', 'Agentic AI', 'Fullstack Web', 'DevOps & Cloud', 'Cyber Security'].map((track) => (
            <button
              key={track}
              onClick={() => setTrackFilter(track)}
              className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider border transition-all ${
                trackFilter === track
                  ? 'bg-[#122846] border-[#10B981] text-[#F8FAFC]'
                  : 'bg-[#050D1A] border-[#1E3A5F] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, ID, skill..."
              className="w-full bg-[#050D1A] border border-[#1E3A5F] focus:border-[#10B981] text-xs font-mono text-[#F8FAFC] pl-8 pr-3 py-1.5 outline-none"
            />
          </div>

          <button
            onClick={onRegisterStudent}
            className="bg-[#10B981] hover:bg-[#059669] text-[#050D1A] px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Register Operative</span>
          </button>
        </div>
      </div>

      {/* Strict Grid System Student Data Table */}
      <div className="border border-[#1E3A5F] overflow-x-auto bg-[#050D1A]">
        <table className="w-full border-collapse text-left font-geist">
          {/* Header Row: #050D1A, uppercase label-md, 1px solid #1E3A5F lower border */}
          <thead>
            <tr className="bg-[#050D1A] border-b border-[#1E3A5F] text-[11px] font-mono uppercase tracking-[0.08em] text-[#94A3B8] select-none">
              <th className="py-3 px-4 border-r border-[#1E3A5F]">ID // OPERATIVE</th>
              <th className="py-3 px-4 border-r border-[#1E3A5F]">SPECIALIZATION TRACK</th>
              <th className="py-3 px-4 border-r border-[#1E3A5F]">STATION & LAB</th>
              <th className="py-3 px-4 border-r border-[#1E3A5F]">PLATFORM / RATING</th>
              <th
                onClick={() => handleSort('hourlyRate')}
                className="py-3 px-4 border-r border-[#1E3A5F] cursor-pointer hover:text-[#10B981] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>HOURLY</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('totalEarnedYTD')}
                className="py-3 px-4 border-r border-[#1E3A5F] cursor-pointer hover:text-[#10B981] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>YTD EARNINGS</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4 border-r border-[#1E3A5F]">ACTIVE MILESTONE</th>
              <th className="py-3 px-4 border-r border-[#1E3A5F]">STATUS</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>

          {/* Table Body with alternating zebra-striping: #0B1E36 to #08172A */}
          <tbody>
            {filteredStudents.map((student, idx) => {
              const isEven = idx % 2 === 0;
              const rowBg = isEven ? 'bg-[#0B1E36]' : 'bg-[#08172A]';

              return (
                <tr
                  key={student.id}
                  className={`${rowBg} hover:bg-[#122846] transition-colors group relative border-b border-[#1E3A5F]/40 hover:shadow-[inset_2px_0_0_0_#10B981]`}
                >
                  {/* Name and ID */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F] whitespace-nowrap">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 bg-[#050D1A] border border-[#1E3A5F] group-hover:border-[#10B981] flex items-center justify-center font-space font-bold text-xs text-[#10B981]">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-space font-semibold text-sm text-[#F8FAFC]">
                          {student.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#64748B]">
                          {student.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Specialization */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F]">
                    <div className="text-xs font-mono font-medium text-[#F8FAFC]">
                      {student.track}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="bg-[#050D1A] text-[#94A3B8] text-[9px] font-mono px-1 border border-[#1E3A5F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Station & Lab */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F] whitespace-nowrap font-mono text-xs">
                    <span className="text-[#10B981] font-bold">{student.workstationId}</span>
                    <span className="text-[#64748B] ml-1.5">// {student.assignedLab}</span>
                  </td>

                  {/* Platform */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F]">
                    <div className="text-xs font-mono text-[#0284C7] font-semibold">
                      {student.platform}
                    </div>
                    <div className="text-[10px] font-mono text-[#64748B] truncate max-w-[140px]">
                      {student.profileScore}
                    </div>
                  </td>

                  {/* Hourly Rate */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F] whitespace-nowrap font-mono text-xs font-bold text-[#F8FAFC] tabular-nums">
                    ${student.hourlyRate}/hr
                  </td>

                  {/* YTD Total Earned */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F] whitespace-nowrap font-mono text-sm font-bold text-[#10B981] tabular-nums">
                    ${student.totalEarnedYTD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  {/* Active Milestone */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F] max-w-[220px]">
                    <div className="text-xs font-mono text-[#F8FAFC] truncate">
                      {student.activeMilestoneTitle}
                    </div>
                    <div className="text-[10px] font-mono text-[#F59E0B]">
                      VALUED AT: ${student.activeMilestoneAmount.toLocaleString()}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 border-r border-[#1E3A5F]">
                    {getStatusBadge(student.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onLogMilestoneForStudent(student)}
                      className="bg-[#050D1A] hover:bg-[#10B981] text-[#94A3B8] hover:text-[#050D1A] border border-[#1E3A5F] hover:border-[#10B981] px-2.5 py-1 text-[11px] font-mono uppercase font-bold transition-all"
                    >
                      + Payout
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-[#0B1E36] border border-[#1E3A5F] p-8 text-center text-xs font-mono text-[#94A3B8]">
          NO STUDENT OPERATIVES MATCHED GIVEN CRITERIA.
        </div>
      )}
    </div>
  );
};

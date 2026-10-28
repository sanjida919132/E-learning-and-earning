import React from 'react';
import { Student, Course, Batch, Lab, Coordinator } from '../types/elearning';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  XCircle, 
  BookOpen, 
  CalendarRange, 
  Cpu, 
  UserCheck, 
  BarChart3, 
  Printer, 
  Award,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface StudentSummaryProps {
  students: Student[];
  courses: Course[];
  batches: Batch[];
  labs: Lab[];
  coordinators: Coordinator[];
}

export const StudentSummaryView: React.FC<StudentSummaryProps> = ({
  students,
  courses,
  batches,
  labs,
  coordinators
}) => {
  const total = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const pendingCount = students.filter(s => s.status === 'Pending').length;
  const completedCount = students.filter(s => s.status === 'Completed').length;
  const inactiveCount = students.filter(s => s.status === 'Inactive').length;

  const totalFreelanceEarnings = students.reduce((acc, s) => acc + (s.freelancingEarningsUSD || 0), 0);

  // Group by Course
  const courseBreakdown = courses.map(c => {
    const enrolled = students.filter(s => s.courseId === c.id || s.courseName === c.name);
    return {
      course: c,
      total: enrolled.length,
      active: enrolled.filter(s => s.status === 'Active').length,
      completed: enrolled.filter(s => s.status === 'Completed').length,
      earnings: enrolled.reduce((acc, s) => acc + (s.freelancingEarningsUSD || 0), 0)
    };
  });

  // Group by Batch
  const batchBreakdown = batches.map(b => {
    const enrolled = students.filter(s => s.batchId === b.id || s.batchName === b.batchName);
    return {
      batch: b,
      total: enrolled.length,
      active: enrolled.filter(s => s.status === 'Active').length,
      capacity: b.maxCapacity
    };
  });

  // Group by Lab (2 Labs: Freelancing Lab & Artificial Intelligence Lab)
  const labBreakdown = labs.map(l => {
    const enrolled = students.filter(s => s.assignedLab === l.id);
    return {
      lab: l,
      total: enrolled.length,
      active: enrolled.filter(s => s.status === 'Active').length,
      capacity: l.workstationsCount,
      occupancyPercent: Math.min(100, Math.round((enrolled.length / l.workstationsCount) * 100))
    };
  });

  // Group by Coordinator
  const coordinatorBreakdown = coordinators.map(c => {
    const assigned = students.filter(s => s.coordinatorId === c.id || s.coordinatorName === c.fullName);
    return {
      coordinator: c,
      total: assigned.length,
      active: assigned.filter(s => s.status === 'Active').length,
      completed: assigned.filter(s => s.status === 'Completed').length
    };
  });

  // Group by Upazila (Sirajganj Region)
  const upazilaMap: Record<string, number> = {};
  students.forEach(s => {
    const u = s.upazila || 'Sirajganj Sadar';
    upazilaMap[u] = (upazilaMap[u] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Title & Print Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Comprehensive Student Summary & Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated aggregation across courses, batches, 2 dedicated labs (Freelancing Lab & Artificial Intelligence Lab), and coordinators
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Print Summary Report</span>
        </button>
      </div>

      {/* 5 Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Registered */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
            <span>Total Registered</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono-num">
            {total}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">100% of Center Roster</div>
        </div>

        {/* Active Students */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold uppercase mb-2">
            <span>Active Students</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono-num">
            {activeCount}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">
            {total > 0 ? `${Math.round((activeCount / total) * 100)}% active in labs` : '0%'}
          </div>
        </div>

        {/* Completed Students */}
        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs">
          <div className="flex items-center justify-between text-blue-700 text-xs font-bold uppercase mb-2">
            <span>Graduated / Completed</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-700 font-mono-num">
            {completedCount}
          </div>
          <div className="text-[11px] text-blue-600 mt-1">
            {total > 0 ? `${Math.round((completedCount / total) * 100)}% completion rate` : '0%'}
          </div>
        </div>

        {/* Pending Students */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 text-xs font-bold uppercase mb-2">
            <span>Pending Verification</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono-num">
            {pendingCount}
          </div>
          <div className="text-[11px] text-amber-600 mt-1">Documentation Review</div>
        </div>

        {/* Inactive Students */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-2">
            <span>Inactive / On Leave</span>
            <XCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-600 font-mono-num">
            {inactiveCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Temporary Leave</div>
        </div>
      </div>

      {/* Two Divisions Breakdown Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 p-5 rounded-2xl text-white shadow-md border border-emerald-700/50 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
              Division 1 • Freelancing Lab
            </span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Students (Freelancing Lab)</span>
            </h3>
            <p className="text-xs text-slate-300">
              PDF Student List (75 Persons) • Web Dev, Graphic Design, Marketing
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono-num">
              {students.filter(s => s.assignedLab === 'Freelancing Lab' || s.division === 'Students' || (!s.id.startsWith('AI-') && s.assignedLab !== 'Artificial Intelligence Lab')).length}
            </span>
            <span className="block text-[11px] text-emerald-200">Enrolled Students</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-5 rounded-2xl text-white shadow-md border border-purple-700/50 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
              Division 2 • Artificial Intelligence Lab
            </span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span>AI Lab Students</span>
            </h3>
            <p className="text-xs text-slate-300">
              Artificial Intelligence Lab (25 Students) • AI, LLM & Prompt Eng.
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-purple-400 font-mono-num">
              {students.filter(s => s.assignedLab === 'Artificial Intelligence Lab' || s.division === 'AI Lab Students' || s.id.startsWith('AI-')).length}
            </span>
            <span className="block text-[11px] text-purple-200">Enrolled Students</span>
          </div>
        </div>
      </div>

      {/* Freelance Earnings Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Total Student Freelancing Revenue Generated
            </h3>
            <p className="text-xs text-emerald-200/80">
              Verified earnings on Upwork, Fiverr, and international client retainers
            </p>
          </div>
        </div>

        <div className="text-right self-end sm:self-auto">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-num">
            ${totalFreelanceEarnings.toLocaleString()} USD
          </div>
          <div className="text-xs text-slate-300">
            approx ৳ {(totalFreelanceEarnings * 121).toLocaleString()} BDT
          </div>
        </div>
      </div>

      {/* Grid: 1. Student Count by Course & 2. Student Count by Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Summary Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                1. Student Count by Course
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {courses.length} Courses
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <th className="pb-2">Course Name</th>
                  <th className="pb-2">Lab</th>
                  <th className="pb-2 text-center">Active</th>
                  <th className="pb-2 text-right">Total</th>
                  <th className="pb-2 text-right">Revenue ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseBreakdown.map((item) => (
                  <tr key={item.course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-800">
                      {item.course.name}
                    </td>
                    <td className="py-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px]">
                        {item.course.assignedLab}
                      </span>
                    </td>
                    <td className="py-2.5 text-center font-semibold text-emerald-700">
                      {item.active}
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-900 font-mono-num">
                      {item.total}
                    </td>
                    <td className="py-2.5 text-right font-semibold text-emerald-600 font-mono-num">
                      ${item.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dedicated Labs Summary Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                2. Student Count by Dedicated Lab (Freelancing Lab & Artificial Intelligence Lab)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600">
              {labs.length} Labs
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <th className="pb-2">Lab Identifier</th>
                  <th className="pb-2">Workstations</th>
                  <th className="pb-2">Assigned</th>
                  <th className="pb-2">Occupancy</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labBreakdown.map((item) => (
                  <tr key={item.lab.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-900">
                      <div>{item.lab.id}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{item.lab.name.split('&')[0]}</div>
                    </td>
                    <td className="py-2.5 text-slate-600 font-mono-num">
                      {item.capacity} seats
                    </td>
                    <td className="py-2.5 font-bold text-slate-900 font-mono-num">
                      {item.total} students
                    </td>
                    <td className="py-2.5 font-semibold text-emerald-700">
                      {item.occupancyPercent}%
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {item.lab.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid: 3. Student Count by Batch & 4. Student Count by Coordinator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batch Summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <CalendarRange className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                3. Student Count by Batch
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {batches.length} Batches
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <th className="pb-2">Batch Name</th>
                  <th className="pb-2">Assigned Lab</th>
                  <th className="pb-2 text-center">Active</th>
                  <th className="pb-2 text-right">Enrolled</th>
                  <th className="pb-2 text-right">Batch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {batchBreakdown.map((item) => (
                  <tr key={item.batch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-800">
                      <div>{item.batch.batchName}</div>
                      <div className="text-[10px] text-slate-500">{item.batch.courseName}</div>
                    </td>
                    <td className="py-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px]">
                        {item.batch.assignedLab}
                      </span>
                    </td>
                    <td className="py-2.5 text-center font-semibold text-emerald-700 font-mono-num">
                      {item.active}
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-900 font-mono-num">
                      {item.total} / {item.capacity}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.batch.status === 'Running'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.batch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coordinator Summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                4. Student Count by Coordinator
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {coordinators.length} Mentors
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100">
                  <th className="pb-2">Coordinator Name</th>
                  <th className="pb-2">Supervised Lab</th>
                  <th className="pb-2 text-center">Active</th>
                  <th className="pb-2 text-center">Graduated</th>
                  <th className="pb-2 text-right">Assigned Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coordinatorBreakdown.map((item) => (
                  <tr key={item.coordinator.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-800">
                      <div>{item.coordinator.fullName}</div>
                      <div className="text-[10px] text-slate-500">{item.coordinator.designation}</div>
                    </td>
                    <td className="py-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-emerald-800">
                        {item.coordinator.assignedLab}
                      </span>
                    </td>
                    <td className="py-2.5 text-center font-semibold text-emerald-700 font-mono-num">
                      {item.active}
                    </td>
                    <td className="py-2.5 text-center font-semibold text-blue-700 font-mono-num">
                      {item.completed}
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-900 font-mono-num">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upazila Geographic Distribution Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <MapPin className="w-4 h-4 text-rose-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            5. Sirajganj Upazila Geographic Distribution
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(upazilaMap).map(([upazila, count]) => (
            <div key={upazila} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium block truncate">
                {upazila}
              </span>
              <div className="text-lg font-bold text-slate-900 font-mono-num mt-0.5">
                {count} <span className="text-[11px] text-slate-500 font-normal">students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

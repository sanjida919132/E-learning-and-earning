import React, { useState } from 'react';
import { Student, Announcement, Lab } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  BookOpen, 
  CalendarRange, 
  Cpu, 
  UserCheck, 
  Lock, 
  Bell, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  KeyRound,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

interface StudentPortalProps {
  students: Student[];
  announcements: Announcement[];
  labs: Lab[];
}

export const StudentPortalView: React.FC<StudentPortalProps> = ({
  students,
  announcements,
  labs
}) => {
  const { currentUser, updatePassword } = useAuth();

  // Find the logged-in student record
  const currentStudent = students.find(s => 
    s.id === currentUser?.studentId || s.email.toLowerCase() === currentUser?.email.toLowerCase()
  ) || students[0];

  const assignedLab = labs.find(l => l.id === currentStudent?.assignedLab);

  // Password Change Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }

    setIsSubmitting(true);
    const result = await updatePassword(oldPassword, newPassword);
    setIsSubmitting(false);

    if (result.success) {
      setPasswordStatus({ type: 'success', message: result.message });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordStatus({ type: 'error', message: result.message });
    }
  };

  if (!currentStudent) {
    return (
      <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
        <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">No Student Profile Linked</h3>
        <p className="text-xs text-slate-500 mt-1">Please sign in with a registered student account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Welcome Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white/10">
              {currentStudent.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800/80">
                  {currentStudent.id}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-900">
                  {currentStudent.status}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentStudent.fullName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentStudent.email}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentStudent.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentStudent.upazila || 'Sirajganj Sadar'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10 self-start md:self-auto text-right">
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block">Freelancing Marketplace Income</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono-num">
              ${(currentStudent.freelancingEarningsUSD || 0).toLocaleString()} USD
            </div>
            <span className="text-[11px] text-slate-400">Verified by Sirajganj Center</span>
          </div>
        </div>
      </div>

      {/* Primary Details Grid (Course, Batch, Lab, Coordinator) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrolled Course */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enrolled Course</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentStudent.courseName}
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            ID: {currentStudent.courseId}
          </p>
        </div>

        {/* Batch Name & Number */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Batch</span>
            <CalendarRange className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentStudent.batchName}
          </h3>
          <p className="text-xs text-emerald-700 font-bold">
            {currentStudent.batchNumber}
          </p>
        </div>

        {/* Assigned Lab */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dedicated Lab</span>
            <Cpu className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentStudent.assignedLab}
          </h3>
          <p className="text-xs text-slate-500">
            {assignedLab ? assignedLab.roomNumber : 'Room 201, ICT Building'}
          </p>
        </div>

        {/* Coordinator Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Academic Mentor</span>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentStudent.coordinatorName}
          </h3>
          <p className="text-xs text-slate-500">
            Senior Lab Coordinator
          </p>
        </div>
      </div>

      {/* Split Section: Security & Password Change + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Secure Password Change Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-4">
            <KeyRound className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Security & Password Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update your login credentials securely
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-3.5 text-xs">
            {passwordStatus && (
              <div className={`p-3 rounded-xl font-medium ${
                passwordStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {passwordStatus.message}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                New Password (Minimum 6 Characters)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl shadow-xs transition-colors mt-2"
            >
              {isSubmitting ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 block">Read-Only Notice:</span>
            <p>
              Students can view personal records and change account password. Academic and enrollment modifications must be requested through your coordinator or branch administration.
            </p>
          </div>
        </div>

        {/* Center Circulars & Student Notices (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-4">
              <Bell className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Class Notices & Center Circulars
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Important announcements for Sirajganj Center students
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ann.category}
                    </span>
                    <span className="text-slate-400 font-mono font-medium">{ann.date}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {ann.title}
                  </h4>

                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {ann.description}
                  </p>

                  <div className="pt-1 text-[10px] text-slate-400">
                    Published by: <strong className="text-slate-600">{ann.author}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Sirajganj Helpdesk: 01711-234567</span>
            <span className="text-emerald-600 font-semibold">Active Student Portal Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

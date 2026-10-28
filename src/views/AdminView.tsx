import React, { useState } from 'react';
import { 
  Student, 
  Course, 
  Batch, 
  Lab, 
  Coordinator, 
  Announcement, 
  PageView 
} from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  CalendarRange, 
  Cpu, 
  UserCheck, 
  FileSpreadsheet, 
  PlusCircle, 
  Bell, 
  Settings, 
  Database,
  ArrowRight,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Edit3,
  Save,
  X,
  Phone,
  Mail,
  Check
} from 'lucide-react';

interface AdminViewProps {
  students: Student[];
  courses: Course[];
  batches: Batch[];
  labs: Lab[];
  coordinators: Coordinator[];
  announcements: Announcement[];
  onNavigate: (view: PageView) => void;
  onOpenAddStudent: () => void;
  onExportCSV: () => void;
  onResetData: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  students,
  courses,
  batches,
  labs,
  coordinators,
  announcements,
  onNavigate,
  onOpenAddStudent,
  onExportCSV,
  onResetData
}) => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [adminName, setAdminName] = useState(currentUser?.name || 'sajib sheikh');
  const [adminPhone, setAdminPhone] = useState(currentUser?.phone || '+880 1711-234567');
  const [adminEmail, setAdminEmail] = useState(currentUser?.email || 'sajib@elearning.sirajganj.gov.bd');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: adminName.trim(),
      phone: adminPhone.trim(),
      email: adminEmail.trim(),
      avatar: '/assets/aistudio/20262_653f23ab.png'
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingProfile(false);
    }, 1200);
  };

  const adminAvatar = currentUser?.avatar || '/assets/aistudio/20262_653f23ab.png';

  return (
    <div className="space-y-6">
      {/* Admin Operations Banner with Sajib Sheikh Profile */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Admin Official Portrait */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-emerald-500/40 shadow-xl bg-slate-800 shrink-0">
                <img
                  src={adminAvatar}
                  alt={currentUser?.name || 'sajib sheikh'}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to local asset
                    (e.target as HTMLImageElement).src = '/assets/aistudio/20262_653f23ab.png';
                  }}
                />
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-slate-950 p-1 rounded-full ring-2 ring-slate-900" title="Active Admin">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            {/* Admin Details */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Executive Administrator & Coordinator // Sirajganj Center</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                <span>{currentUser?.name || 'sajib sheikh'}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live System Admin
                </span>
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser?.email || 'sajib@elearning.sirajganj.gov.bd'}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser?.phone || '+880 1711-234567'}
                </span>
                <span className="text-emerald-400 font-mono">
                  ● 2 Labs: Freelancing Lab (75) & AI Lab (25)
                </span>
              </div>

              <p className="text-xs text-slate-400 pt-1 max-w-xl leading-relaxed">
                Central administrative authority for student records, batches, course catalog, attendance, and branch operations. Edits update live in real-time.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => {
                setAdminName(currentUser?.name || 'sajib sheikh');
                setAdminPhone(currentUser?.phone || '+880 1711-234567');
                setAdminEmail(currentUser?.email || 'sajib@elearning.sirajganj.gov.bd');
                setIsEditingProfile(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={onOpenAddStudent}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Enroll Student</span>
            </button>

            <button
              onClick={onExportCSV}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Roster (CSV)</span>
            </button>
          </div>
        </div>

        {/* Live Admin Profile Edit Drawer / Form */}
        {isEditingProfile && (
          <div className="mt-6 pt-6 border-t border-slate-800 animate-fadeIn">
            <form onSubmit={handleSaveProfile} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">Live Admin Profile Editor</span>
                  <span className="text-xs text-emerald-400 font-mono">(Live update across system)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Full Name</label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-400">
                  Profile photo locked to official portrait: <code className="text-emerald-400">/assets/aistudio/20262_653f23ab.png</code>
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Updated Live!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Live Update</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Admin Modules Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Records Hub */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Student Directory Management</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Register new students with auto-generated unique Student IDs, update profiles, reassign batches, and manage enrollments.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-700">{students.length} Records</span>
            <button
              onClick={() => onNavigate('students')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Manage Students →</span>
            </button>
          </div>
        </div>

        {/* Two Dedicated Labs System */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Two Dedicated Labs (Freelancing Lab & Artificial Intelligence Lab)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Configure workstations, assign specialized courses and cohorts, supervise dual-monitor nodes, and check lab capacity.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-purple-700 font-mono">2 Labs // 100 Seats</span>
            <button
              onClick={() => onNavigate('labs')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Manage Labs →</span>
            </button>
          </div>
        </div>

        {/* Courses & Training Modules */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Curriculum & Course Catalog</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add or revise market-driven courses: Web Dev, Graphic Design, Digital Marketing, Artificial Intelligence, and Video Editing.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-700">{courses.length} Active Courses</span>
            <button
              onClick={() => onNavigate('courses')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Manage Courses →</span>
            </button>
          </div>
        </div>

        {/* Batches & Scheduling */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarRange className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Batch Creation & Timetables</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create morning/evening cohorts, set start/end milestones, assign to specific physical labs, and enforce seat limits.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-700">{batches.length} Batches Scheduled</span>
            <button
              onClick={() => onNavigate('batches')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Manage Batches →</span>
            </button>
          </div>
        </div>

        {/* Academic Coordinators */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Coordinator & Staff Roles</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designate lead instructors for each lab, update contact details, supervise attendance, and adjust teaching workloads.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-700">{coordinators.length} Coordinators (E-Learning &amp; AI)</span>
            <button
              onClick={() => onNavigate('coordinators')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Coordinator Directory →</span>
            </button>
          </div>
        </div>

        {/* Circulars & Notice Publisher */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Center Circulars & News</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Publish admission notices, holiday schedules, exam dates, and award announcements to students and staff.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-700">{announcements.length} Published</span>
            <button
              onClick={() => onNavigate('announcements')}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>Manage Notices →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety & System Recovery Bar */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-700">
          <Database className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span className="font-medium text-slate-800">Live Database Persistence & Real-time Sync Active</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">All admin updates, student rosters, courses, and schedules reflect live</span>
        </div>

        <button
          onClick={onResetData}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
        >
          Reset Database to Official Factory Defaults
        </button>
      </div>
    </div>
  );
};

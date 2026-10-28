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
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  CalendarRange, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Building2,
  Calendar,
  FileSpreadsheet,
  Camera,
  Eye,
  Maximize2,
  X,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  students: Student[];
  courses: Course[];
  batches: Batch[];
  labs: Lab[];
  coordinators: Coordinator[];
  announcements: Announcement[];
  onNavigate: (view: PageView) => void;
  onOpenAddStudent: () => void;
  onExportCSV: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  courses,
  batches,
  labs,
  coordinators,
  announcements,
  onNavigate,
  onOpenAddStudent,
  onExportCSV
}) => {
  const { currentUser, hasRole } = useAuth();
  const { t, language } = useLanguage();
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState(false);

  const totalStudentsCount = students.length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;
  const completedStudentsCount = students.filter(s => s.status === 'Completed').length;
  const totalCoursesCount = courses.length;
  const totalBatchesCount = batches.length;
  const totalCoordinatorsCount = coordinators.length;
  const totalLabsCount = labs.length; // Exactly 4 labs

  const currentDateFormatted = new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate course enrollments
  const courseEnrollmentMap = courses.map(course => {
    const count = students.filter(s => s.courseId === course.id || s.courseName === course.name).length;
    return {
      name: course.name,
      lab: course.assignedLab,
      count,
      percentage: totalStudentsCount > 0 ? Math.round((count / totalStudentsCount) * 100) : 0
    };
  });

  // Recent 5 students
  const recentStudents = [...students].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Cover / Hero Banner with Group Photo */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* Left Column: Welcome & Center Information (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Sirajganj District ICT Operations Center</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t('welcomeMsg')}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Empowering youth across Sirajganj Sadar, Belkuchi, Kazipur, Shahjadpur, Ullapara, and nearby Upazilas with world-class freelancing, web engineering, graphic design, and AI skills.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentDateFormatted}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Session: 2026 Academic Cycle</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-950/80 text-emerald-300 px-3.5 py-2 rounded-xl border border-emerald-700/60 font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>100 Dedicated Workstations (2 Labs)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Group Photo Cover Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => setIsPhotoLightboxOpen(true)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800 border-2 border-emerald-500/40 shadow-2xl hover:border-emerald-400 transition-all cursor-pointer transform hover:-translate-y-1"
            >
              {/* Photo Image */}
              <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src="/assets/aistudio/Group_photo_7bf06186.jpg"
                  alt="E-Learning and Earning, Sirajganj Branch - Batch 2026 Students & Mentors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              {/* Gradient Bottom Overlay with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex flex-col justify-between p-3.5 sm:p-4 pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="bg-slate-900/85 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase tracking-wider flex items-center space-x-1">
                    <Camera className="w-3 h-3" />
                    <span>Sirajganj Center Family</span>
                  </span>

                  <span className="bg-white/95 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-emerald-600" />
                    <span>Click to Zoom</span>
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-white text-xs sm:text-sm font-bold drop-shadow-sm">
                    শিক্ষার্থী ও সমন্বয়ক পরিবার • সিরাজগঞ্জ শাখা
                  </h4>
                  <p className="text-[11px] text-emerald-300 font-medium drop-shadow-sm">
                    E-Learning & Earning Ltd. — Batch 2026
                  </p>
                </div>
              </div>

              {/* Official Logo Floating Badge in Corner */}
              <div className="absolute top-2.5 right-2.5 p-1 bg-white rounded-lg shadow-lg border border-slate-200 pointer-events-none hidden sm:block">
                <img
                  src="/assets/aistudio/Logo_84a679ee.png"
                  alt="Official Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>LEDP Sirajganj Campus Gathering</span>
              <button
                type="button"
                onClick={() => setIsPhotoLightboxOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Full-size view</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative backdrop glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none hidden md:block"></div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Summary KPI Cards Grid (Total Students, Active, Courses, Batches, Coordinators, Total Labs: 4) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Students */}
        <div 
          onClick={() => onNavigate('students')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('totalStudents')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num">
            {totalStudentsCount}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Enrolled Students</span>
          </div>
        </div>

        {/* Active Students */}
        <div 
          onClick={() => onNavigate('summary')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('activeStudents')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono-num">
            {activeStudentsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {totalStudentsCount > 0 ? `${Math.round((activeStudentsCount / totalStudentsCount) * 100)}% attendance rate` : '100%'}
          </div>
        </div>

        {/* Total Courses */}
        <div 
          onClick={() => onNavigate('courses')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('totalCourses')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num">
            {totalCoursesCount}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            7 Skill Disciplines
          </div>
        </div>

        {/* Total Batches */}
        <div 
          onClick={() => onNavigate('batches')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('totalBatches')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarRange className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num">
            {totalBatchesCount}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            7 Freelancing + 2 AI
          </div>
        </div>

        {/* Total Coordinators */}
        <div 
          onClick={() => onNavigate('coordinators')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('totalCoordinators')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num">
            {totalCoordinatorsCount}
          </div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            E-Learning &amp; AI Leads
          </div>
        </div>

        {/* Total Labs: 2 */}
        <div 
          onClick={() => onNavigate('labs')}
          className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/40 shadow-xs hover:shadow-md hover:border-emerald-600 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t('totalLabs')}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-num flex items-baseline space-x-1">
            <span>{totalLabsCount}</span>
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wide">LABS</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            Freelancing Lab & Artificial Intelligence Lab
          </div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500"></div>
        </div>
      </div>

      {/* Quick-Access Buttons Row for Students, Courses, Batches, Labs, Coordinators */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>{t('quickActions')}:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasRole(['ADMIN', 'COORDINATOR']) && (
            <button
              onClick={onOpenAddStudent}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('addNewStudent')}</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('students')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span>Students Directory</span>
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>Courses</span>
          </button>

          <button
            onClick={() => onNavigate('batches')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <CalendarRange className="w-3.5 h-3.5 text-slate-600" />
            <span>Batches</span>
          </button>

          <button
            onClick={() => onNavigate('labs')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>2 Dedicated Labs</span>
          </button>

          <button
            onClick={() => onNavigate('coordinators')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Coordinators</span>
          </button>

          {hasRole(['ADMIN', 'COORDINATOR']) && (
            <button
              onClick={onExportCSV}
              className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
              title="Export Full Directory to CSV/Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Middle Grid: Charts and Enrollment Distributions + Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Enrollment Breakdown Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Course Enrollment Distribution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time student headcount across Sirajganj training disciplines
                </p>
              </div>

              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>Manage Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {courseEnrollmentMap.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 truncate max-w-[280px]">
                      {item.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {item.lab}
                      </span>
                      <span className="text-slate-900 font-bold font-mono-num">
                        {item.count} students ({item.percentage}%)
                      </span>
                    </div>
                  </div>

                  {/* Clean progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.lab === 'Artificial Intelligence Lab' 
                          ? 'bg-purple-600'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.max(item.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Official Government ELED Course Registry</span>
            <button
              onClick={() => onNavigate('summary')}
              className="text-emerald-600 font-semibold hover:underline"
            >
              View Full Analytics Report →
            </button>
          </div>
        </div>

        {/* 2 Dedicated Labs Capacity Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Two Dedicated Labs Status
                </h3>
              </div>
              <button
                onClick={() => onNavigate('labs')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>Lab Grid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {labs.map((lab) => {
                const assignedStudentCount = students.filter(s => s.assignedLab === lab.id).length;
                const capacityPercent = Math.min(100, Math.round((assignedStudentCount / lab.workstationsCount) * 100));
                return (
                  <div 
                    key={lab.id} 
                    onClick={() => onNavigate('labs')}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{lab.id}</span>
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[170px]">
                          {lab.name.split('&')[0]}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {lab.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Occupancy: {assignedStudentCount} / {lab.workstationsCount} Workstations</span>
                      <span className="font-semibold text-slate-700">{capacityPercent}%</span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Total Campus Capacity: {labs.reduce((acc, l) => acc + l.workstationsCount, 0)} Workstations</span>
            <span className="text-emerald-600 font-semibold">100% Operational</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Registrations & Latest Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Registrations Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {t('recentRegistrations')}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest students admitted into the Sirajganj Center
              </p>
            </div>

            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
            >
              <span>{t('viewAll')} ({totalStudentsCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Student ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Lab</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">
                      {s.id}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      <div>{s.fullName}</div>
                      <div className="text-[10px] text-slate-400">{s.upazila}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 truncate max-w-[160px]">
                      {s.courseName}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-700">
                      {s.assignedLab}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : s.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Latest Announcements & Updates (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {t('latestAnnouncements')}
              </h3>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>All Notices</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {announcements.slice(0, 3).map((ann) => (
                <div 
                  key={ann.id}
                  onClick={() => onNavigate('announcements')}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ann.category}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {ann.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-emerald-700 transition-colors">
                    {ann.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {ann.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Branch Helpline: 16122</span>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-emerald-600 font-semibold hover:underline"
            >
              Read full circulars →
            </button>
          </div>
        </div>
      </div>

      {/* Official Sirajganj Center Location Card (Matching Official Branch Details) */}
      <div className="bg-[#e8f5e9]/70 rounded-2xl p-4 sm:p-5 border-2 border-[#a5d6a7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Map Image Thumbnail */}
          <div className="w-full sm:w-56 h-36 rounded-xl overflow-hidden border border-[#81c784] shadow-xs shrink-0 bg-white">
            <img 
              src="/assets/aistudio/image_41da00d0.png" 
              alt="Sirajganj Center Map Location - Hayder Complex, Railgate, Sirajganj"
              className="w-full h-full object-cover object-center" 
            />
          </div>

          {/* Details */}
          <div className="space-y-2 text-slate-800 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Sirajganj
            </h3>

            <div className="flex items-start justify-center sm:justify-start space-x-2 text-sm sm:text-base text-slate-800">
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <span className="font-medium">
                Hayder Complex (4th Floor), SB Fazlul Haque Road, Railgate, Sirajganj
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base text-slate-800">
              <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="font-semibold font-mono tracking-wide">
                01332852680 - 01332852681
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base text-slate-800">
              <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="font-medium text-slate-800">
                sirajganj.elel@gmail.com
              </span>
            </div>
          </div>
        </div>

        <a 
          href="https://maps.google.com/?q=Hayder+Complex+SB+Fazlul+Haque+Road+Railgate+Sirajganj" 
          target="_blank" 
          rel="noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-colors text-center shrink-0 flex items-center justify-center space-x-2 shadow-xs"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Group Cover Photo Lightbox Modal */}
      {isPhotoLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPhotoLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      LEDP Sirajganj Center
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-white font-semibold">
                      শিক্ষার্থী ও সমন্বয়ক পরিবার
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    E-Learning & Earning Ltd. — Official Center Photo
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="/assets/aistudio/Group_photo_7bf06186.jpg"
                  target="_blank"
                  rel="noreferrer"
                  download="sirajganj-branch-family.jpg"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Full Image</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPhotoLightboxOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Container */}
            <div className="bg-black/90 p-2 sm:p-4 flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src="/assets/aistudio/Group_photo_7bf06186.jpg"
                alt="E-Learning and Earning, Sirajganj Branch Students and Coordinators"
                className="w-full h-auto max-h-[72vh] object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ই-লার্নিং অ্যান্ড আর্নিং লিমিটেড • সিরাজগঞ্জ শাখা • প্রশিক্ষণার্থী ও কর্মকর্তা সম্মেলন</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Two Labs (Freelancing Lab & Artificial Intelligence Lab) • Sirajganj Center Roster
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { PageView } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  BookOpen, 
  CalendarRange, 
  Cpu, 
  UserCheck, 
  GraduationCap, 
  Bell, 
  Settings,
  Building2,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isMobileOpen,
  onCloseMobile
}) => {
  const { currentUser, hasRole } = useAuth();
  const { t } = useLanguage();

  const isAdmin = hasRole(['ADMIN']);
  const isCoordinator = hasRole(['COORDINATOR', 'ADMIN']);
  const isStudent = hasRole(['STUDENT']);

  const navItems = [
    {
      id: 'dashboard' as PageView,
      label: t('dashboard'),
      icon: LayoutDashboard,
      visible: true
    },
    {
      id: 'admin' as PageView,
      label: t('adminPanel'),
      icon: ShieldCheck,
      visible: isAdmin,
      badge: 'Admin'
    },
    {
      id: 'students' as PageView,
      label: t('students'),
      icon: Users,
      visible: isCoordinator
    },
    {
      id: 'summary' as PageView,
      label: t('summary'),
      icon: BarChart3,
      visible: isCoordinator
    },
    {
      id: 'courses' as PageView,
      label: t('courses'),
      icon: BookOpen,
      visible: true
    },
    {
      id: 'batches' as PageView,
      label: t('batches'),
      icon: CalendarRange,
      visible: isCoordinator
    },
    {
      id: 'labs' as PageView,
      label: t('labs'),
      icon: Cpu,
      visible: true,
      badge: '2 Labs'
    },
    {
      id: 'coordinators' as PageView,
      label: t('coordinators'),
      icon: UserCheck,
      visible: isCoordinator
    },
    {
      id: 'student_portal' as PageView,
      label: t('studentPortal'),
      icon: GraduationCap,
      visible: isStudent || isAdmin,
      highlight: isStudent
    },
    {
      id: 'announcements' as PageView,
      label: t('announcements'),
      icon: Bell,
      visible: true
    },
    {
      id: 'profile_settings' as PageView,
      label: t('profileSettings'),
      icon: Settings,
      visible: true
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 lg:top-[88px] left-0 bottom-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } h-[calc(100vh-64px)] lg:h-[calc(100vh-88px)] overflow-y-auto`}
      >
        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Main Management Modules
          </div>

          {navItems.filter(item => item.visible).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    isActive
                      ? 'bg-emerald-700 text-emerald-100'
                      : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Branch Info Box */}
        <div className="p-3 m-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Sirajganj Center</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
            Hayder Complex (4th Floor), SB Fazlul Haque Road, Railgate, Sirajganj
          </p>
          <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-mono text-emerald-400">01332852680</span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};

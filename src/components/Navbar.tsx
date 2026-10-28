import React, { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { PageView } from '../types/elearning';
import { 
  Bell, 
  Globe, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Shield, 
  Users, 
  GraduationCap, 
  ChevronDown,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  announcementCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onToggleMobileMenu,
  isMobileMenuOpen,
  announcementCount
}) => {
  const { currentUser, logout, quickLogin, isAuthenticated } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Ministry & Branch Micro-Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 sm:px-6 py-1 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">
            {t('govSubtitle')}
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-emerald-400 font-semibold">
            LEDP Sirajganj Center
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline text-slate-400">
            {currentDateStr}
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 font-semibold text-xs hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-emerald-400"
            title="Toggle English / বাংলা"
          >
            <Globe className="w-3 h-3" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => onNavigate('dashboard')} 
            className="cursor-pointer"
          >
            <Logo size="md" />
          </div>
        </div>

        {/* Center: Quick Role Switcher (Ideal for review and verification) */}
        <div className="hidden xl:flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2">Role Preview:</span>
          
          <button
            onClick={() => quickLogin('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentUser?.role === 'ADMIN'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin (sajib sheikh)</span>
          </button>

          <button
            onClick={() => quickLogin('coordinator')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentUser?.role === 'COORDINATOR'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>Coordinator</span>
          </button>

          <button
            onClick={() => quickLogin('student')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentUser?.role === 'STUDENT'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Student</span>
          </button>
        </div>

        {/* Right: Notification & Profile */}
        <div className="flex items-center space-x-3">
          {/* Announcements notification */}
          <button
            onClick={() => onNavigate('announcements')}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="View Announcements"
          >
            <Bell className="w-5 h-5" />
            {announcementCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Current User dropdown */}
          {isAuthenticated && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-1 ring-slate-200">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('')
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile dropdown menu */}
              {isProfileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-emerald-500/30 bg-slate-100 shrink-0">
                      <img 
                        src={currentUser.avatar || '/assets/aistudio/20262_653f23ab.png'} 
                        alt={currentUser.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                        {currentUser.role} ACCESS
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    {currentUser.role === 'STUDENT' ? (
                      <button
                        onClick={() => {
                          onNavigate('student_portal');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>My Student Portal</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <Shield className="w-4 h-4 text-slate-600" />
                        <span>Admin Console</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onNavigate('profile_settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-slate-600" />
                      <span>Profile & Change Password</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                        onNavigate('login');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

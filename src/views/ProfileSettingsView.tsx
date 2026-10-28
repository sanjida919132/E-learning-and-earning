import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  User, 
  KeyRound, 
  ShieldCheck, 
  Database, 
  Building2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ProfileSettingsViewProps {
  onResetData: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({ onResetData }) => {
  const { currentUser, updatePassword } = useAuth();
  const { language, toggleLanguage } = useLanguage();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New password and confirm password do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    setIsSubmitting(true);
    const res = await updatePassword(oldPassword, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setPasswordStatus({ type: 'success', message: res.message });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          User Profile & System Settings
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Account credentials, branch information, and security preferences
        </p>
      </div>

      {/* User Information Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 font-extrabold text-xl flex items-center justify-center shadow-md border-2 border-emerald-500/20">
            {currentUser?.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-900">{currentUser?.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentUser?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Account Role</span>
            <span className="font-semibold text-slate-800">{currentUser?.role} Clearance</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Assigned Center</span>
            <span className="font-semibold text-slate-800">Sirajganj Branch (LEDP)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Language Mode</span>
            <button
              onClick={toggleLanguage}
              className="font-bold text-emerald-600 hover:underline flex items-center space-x-1"
            >
              <span>{language === 'en' ? 'English (Switch to বাংলা)' : 'বাংলা (Switch to English)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <KeyRound className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">Change Account Password</h3>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs max-w-md">
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
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              New Password (Min 6 Characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs transition-colors"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Database Maintenance Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-rose-600">
          <Database className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">Database & Sample Data Management</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The application saves all students, courses, batches, and lab settings locally in your browser storage. If you want to reset the demonstration database back to the factory defaults, use the button below:
        </p>

        <button
          onClick={onResetData}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore Default Sample Records</span>
        </button>
      </div>
    </div>
  );
};

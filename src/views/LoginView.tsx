import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { PageView } from '../types/elearning';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (view: PageView) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const { login, quickLogin, resetPasswordRequest } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotResult, setForgotResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      onLoginSuccess('dashboard');
    } else {
      setErrorMessage(res.message || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = (role: 'admin' | 'coordinator' | 'student') => {
    quickLogin(role);
    if (role === 'student') {
      onLoginSuccess('student_portal');
    } else if (role === 'admin') {
      onLoginSuccess('admin');
    } else {
      onLoginSuccess('dashboard');
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await resetPasswordRequest(forgotEmail);
    setForgotResult(res.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header with Official Logo */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <Logo size="lg" light={true} />
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Central Management Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Sirajganj Branch • ICT Division, Govt. of Bangladesh
          </p>

          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Authorized Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sajib@elearning.sirajganj.gov.bd"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 pl-10 pr-3 py-2.5 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase">
                  Account Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email || 'sajib@elearning.sirajganj.gov.bd');
                    setForgotResult(null);
                    setIsForgotModalOpen(true);
                  }}
                  className="text-[11px] text-emerald-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 pl-10 pr-3 py-2.5 rounded-xl outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher per prompt requirement to test Admin, Coordinator, and Student roles */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2.5">
              Instant 1-Click Persona Login (For Testing)
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold flex flex-col items-center justify-center space-y-1 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Admin (sajib sheikh)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('coordinator')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold flex flex-col items-center justify-center space-y-1 transition-colors"
              >
                <Users className="w-4 h-4 text-sky-600" />
                <span>Coordinator</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold flex flex-col items-center justify-center space-y-1 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Student</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Government E-Learning and Earning Project • Sirajganj Center
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Forgot Password Recovery</h3>
              <button onClick={() => setIsForgotModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="p-5 space-y-3.5 text-xs">
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Enter your registered Sirajganj branch email address to receive password reset tokens.
              </p>

              {forgotResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-medium">
                  {forgotResult}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs"
                >
                  Request Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

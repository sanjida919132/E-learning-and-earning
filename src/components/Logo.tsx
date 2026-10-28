import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
  variant?: 'full' | 'mark-only';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
  variant = 'full'
}) => {
  const imgHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16'
  };

  const branchBadgeSizes = {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm'
  };

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Official Uploaded Logo Image */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden transition-all ${
        light ? 'bg-white p-1.5 shadow-sm ring-1 ring-white/20' : 'bg-white p-1'
      }`}>
        <img
          src="/assets/aistudio/Logo_84a679ee.png"
          alt="e-Learning & Earning Ltd. Logo"
          className={`${imgHeights[size]} w-auto object-contain`}
          loading="eager"
        />
      </div>

      {/* Sirajganj Branch Tag & Credentials */}
      {showSubtitle && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1.5">
            <span className={`font-extrabold tracking-tight leading-none ${branchBadgeSizes[size]} ${
              light ? 'text-white' : 'text-slate-900'
            }`}>
              Sirajganj Branch
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              LEDP
            </span>
          </div>

          <div className="flex items-center space-x-1.5 mt-0.5 text-[11px]">
            <span className={light ? 'text-emerald-300 font-semibold' : 'text-emerald-700 font-semibold'}>
              সিরাজগঞ্জ শাখা
            </span>
            <span className={light ? 'text-slate-400' : 'text-slate-300'}>•</span>
            <span className={`truncate hidden sm:inline ${
              light ? 'text-slate-300' : 'text-slate-500'
            }`}>
              ICT Division Center
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

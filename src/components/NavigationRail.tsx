import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  BookOpen, 
  Server, 
  ShieldAlert, 
  ChevronRight,
  Terminal,
  Activity
} from 'lucide-react';
import { ViewMode } from '../types';

interface NavigationRailProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  unreadAlertCount: number;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  currentView,
  onSelectView,
  unreadAlertCount
}) => {
  const navItems: { id: ViewMode; index: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', index: '01', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'labs', index: '02', label: 'LAB CLUSTERS', icon: Cpu },
    { id: 'talent', index: '03', label: 'TALENT & EARNINGS', icon: Users },
    { id: 'curriculum', index: '04', label: 'CURRICULUM PIPELINE', icon: BookOpen },
    { id: 'hardware', index: '05', label: 'HARDWARE & NODES', icon: Server },
    { id: 'alerts', index: '06', label: 'DISPATCH & ALERTS', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar Rail */}
      <aside className="hidden md:flex flex-col bg-[#050D1A] border-r border-[#1E3A5F] w-[72px] xl:w-[260px] shrink-0 min-h-[calc(100vh-85px)] select-none">
        {/* Navigation Section Title */}
        <div className="hidden xl:block px-5 py-3 border-b border-[#1E3A5F]/60 text-[10px] font-mono uppercase tracking-[0.15em] text-[#64748B]">
          // MODULE SELECTION
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-3 flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center transition-all group relative ${
                  isActive
                    ? 'bg-[#122846] text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0B1E36]'
                } px-3 xl:px-5 py-3.5`}
              >
                {/* Active Indicator Accent Line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#10B981]"></div>
                )}

                <div className="flex items-center justify-center w-8 shrink-0">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#10B981]' : 'text-[#64748B] group-hover:text-[#10B981]'
                    }`}
                  />
                </div>

                {/* Desktop text label */}
                <div className="hidden xl:flex items-center justify-between flex-1 ml-3 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-[#64748B] group-hover:text-[#10B981] font-semibold">
                      // {item.index}
                    </span>
                    <span className="font-space font-medium text-xs tracking-wider uppercase">
                      {item.label}
                    </span>
                  </div>

                  {item.id === 'alerts' && unreadAlertCount > 0 && (
                    <span className="bg-[#EF4444] text-[#050D1A] text-[10px] font-mono font-bold px-1.5 py-0.2">
                      {unreadAlertCount}
                    </span>
                  )}

                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#10B981]" />
                  )}
                </div>

                {/* Tablet Alert badge indicator */}
                {item.id === 'alerts' && unreadAlertCount > 0 && (
                  <span className="xl:hidden absolute top-2 right-2 w-2 h-2 bg-[#EF4444]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom System Terminal Specs */}
        <div className="p-3 xl:p-4 border-t border-[#1E3A5F] bg-[#010F1F]">
          <div className="hidden xl:block font-mono text-[10px] text-[#64748B] space-y-1">
            <div className="flex justify-between items-center text-[#94A3B8]">
              <span>CLUSTER ID:</span>
              <span className="text-[#10B981] font-bold">DHAKA-NEXUS-01</span>
            </div>
            <div className="flex justify-between items-center">
              <span>HOST ARCH:</span>
              <span className="text-[#F8FAFC]">x86_64 // EPYC-9654</span>
            </div>
            <div className="flex justify-between items-center">
              <span>NETWORK MESH:</span>
              <span className="text-[#0284C7]">INFINIBAND 100G</span>
            </div>
          </div>
          <div className="xl:hidden flex justify-center">
            <Activity className="w-5 h-5 text-[#10B981] animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Utility Navigation Bar per design specification */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050D1A] border-t border-[#1E3A5F] flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 relative ${
                isActive ? 'text-[#10B981]' : 'text-[#64748B]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-mono uppercase tracking-wider mt-1">
                {item.index}
              </span>
              {isActive && (
                <div className="w-4 h-[2px] bg-[#10B981] absolute -bottom-1"></div>
              )}
              {item.id === 'alerts' && unreadAlertCount > 0 && (
                <span className="absolute top-0 right-1 w-2 h-2 bg-[#EF4444]"></span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

import React from 'react';
import { UserRole } from '../types';
import { useCivic } from '../context/CivicContext';
import { User, ShieldCheck, HardHat, Building2, RotateCcw, LogOut } from 'lucide-react';

interface DemoRoleBannerProps {
  onOpenLoginModal: () => void;
}

export const DemoRoleBanner: React.FC<DemoRoleBannerProps> = ({ onOpenLoginModal }) => {
  const { userRole, currentUser, switchRole, resetDemoData, logout, isLoggedIn } = useCivic();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      role: 'citizen',
      label: 'Citizen',
      icon: <User className="w-3.5 h-3.5" />,
      desc: 'Report, vote & participate'
    },
    {
      role: 'field_officer',
      label: 'Field Officer',
      icon: <HardHat className="w-3.5 h-3.5" />,
      desc: 'Fix assigned issues'
    },
    {
      role: 'dept_admin',
      label: 'Dept Admin',
      icon: <Building2 className="w-3.5 h-3.5" />,
      desc: 'Assign & publish challenges'
    },
    {
      role: 'super_admin',
      label: 'Super Admin',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: 'City-wide governance'
    }
  ];

  return (
    <aside
      id="demo-pitch-banner"
      aria-label="Hackathon Pitching Controller"
      className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 select-none z-50 sticky top-0"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Hackathon Pitch indicator */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border border-amber-400/30">
            Pitching Demo
          </span>
          <span className="text-slate-400 hidden md:inline">
            Simulated Role:
          </span>
        </div>

        {/* Center: Role Switch Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
          {roles.map((item) => {
            const isActive = isLoggedIn && userRole === item.role;
            return (
              <button
                key={item.role}
                type="button"
                id={`role-btn-${item.role}`}
                onClick={() => switchRole(item.role)}
                title={item.desc}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all font-medium whitespace-nowrap text-xs ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Reset Demo State & Login Screen */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <span className="hidden lg:inline text-slate-400 text-[11px]">
              Active: <strong className="text-slate-200">{currentUser.name}</strong>
            </span>
          ) : (
            <span className="text-amber-300 text-[11px]">Not logged in</span>
          )}

          <button
            type="button"
            id="btn-reset-demo"
            onClick={() => {
              if (window.confirm('Reset all demo complaints, votes, and ideas back to initial pitching state?')) {
                resetDemoData();
              }
            }}
            title="Reset data back to initial pitching state"
            className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors px-2 py-1 rounded hover:bg-slate-800 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {isLoggedIn ? (
            <button
              type="button"
              id="btn-demo-logout"
              onClick={logout}
              title="Show Simulated Login Page"
              className="flex items-center gap-1 text-slate-400 hover:text-rose-300 transition-colors px-1.5 py-1 rounded hover:bg-slate-800 text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Auth Demo</span>
            </button>
          ) : (
            <button
              type="button"
              id="btn-demo-login-modal"
              onClick={onOpenLoginModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[11px] font-medium"
            >
              Login Screen
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

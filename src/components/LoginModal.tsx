import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { UserRole } from '../types';
import { Building2, HardHat, ShieldCheck, User as UserIcon, ArrowRight, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useCivic();
  const [email, setEmail] = useState('citizen@demo.civicbridge.org');
  const [password, setPassword] = useState('demo1234');
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [showRoleStep, setShowRoleStep] = useState(false);

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRoleStep(true);
  };

  const handleGoogleDemoLogin = () => {
    setEmail('google.user@civicbridge.org');
    setShowRoleStep(true);
  };

  const handleCompleteLogin = (roleToUse?: UserRole) => {
    const finalRole = roleToUse || selectedRole;
    login(email, finalRole);
    if (onClose) onClose();
  };

  const roleOptions: { role: UserRole; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      role: 'citizen',
      title: 'Citizen',
      desc: 'Report problems, track updates, suggest solutions & vote on community ideas',
      icon: <UserIcon className="w-5 h-5 text-blue-600" />
    },
    {
      role: 'field_officer',
      title: 'Field Officer',
      desc: 'View assigned issues, update work status, and upload resolution proof',
      icon: <HardHat className="w-5 h-5 text-amber-600" />
    },
    {
      role: 'dept_admin',
      title: 'Department Admin',
      desc: 'Assign field officers, set deadlines, and publish unsolved issues as Open Challenges',
      icon: <Building2 className="w-5 h-5 text-indigo-600" />
    },
    {
      role: 'super_admin',
      title: 'Super Admin',
      desc: 'City-wide oversight, cross-department tracking, and pilot approvals',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
    }
  ];

  return (
    <div
      id="demo-auth-overlay"
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <div
        id="demo-auth-card"
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 text-center border-b border-slate-800">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/30 text-blue-400 mb-3 border border-blue-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Welcome to CivicBridge</h2>
          <p className="text-xs text-slate-400 mt-1">From Protest to Participation</p>
          <div className="mt-2 inline-block px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono border border-blue-800">
            Simulated Pitching Authentication
          </div>
        </div>

        <div className="p-6">
          {!showRoleStep ? (
            /* Standard Login Screen Step */
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  id="demo-input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="demo-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <button
                type="submit"
                id="btn-demo-continue"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-slate-500 uppercase tracking-wider">
                  OR
                </span>
              </div>

              <button
                type="button"
                id="btn-demo-google"
                onClick={handleGoogleDemoLogin}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Direct Quick Role Switcher */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center mb-2 font-medium">
                  Or jump directly into demo role:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCompleteLogin('citizen')}
                    className="text-xs py-1.5 px-2 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors text-center"
                  >
                    Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteLogin('field_officer')}
                    className="text-xs py-1.5 px-2 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors text-center"
                  >
                    Field Officer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteLogin('dept_admin')}
                    className="text-xs py-1.5 px-2 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors text-center"
                  >
                    Dept Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteLogin('super_admin')}
                    className="text-xs py-1.5 px-2 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors text-center"
                  >
                    Super Admin
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Role Selection Screen Step */
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-base font-bold text-slate-900">Continue as:</h3>
                <p className="text-xs text-slate-500 mt-0.5">Select a role for the pitch demo</p>
              </div>

              <div className="space-y-2">
                {roleOptions.map((option) => (
                  <button
                    key={option.role}
                    type="button"
                    id={`login-role-${option.role}`}
                    onClick={() => setSelectedRole(option.role)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                      selectedRole === option.role
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{option.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">
                          {option.title}
                        </span>
                        {selectedRole === option.role && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                        {option.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRoleStep(false)}
                  className="w-1/3 py-2 text-xs text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  id="btn-confirm-demo-login"
                  onClick={() => handleCompleteLogin()}
                  className="w-2/3 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Enter CivicBridge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Building2,
  PlusCircle,
  FileText,
  Lightbulb,
  Vote,
  BarChart3,
  Menu,
  X,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

export type NavView =
  | 'landing'
  | 'citizen_home'
  | 'report_problem'
  | 'problem_tracking'
  | 'my_problems'
  | 'community_solutions'
  | 'consultations'
  | 'innovations'
  | 'public_dashboard'
  | 'field_officer'
  | 'dept_admin'
  | 'super_admin'
  | 'review_solutions';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenLogin }) => {
  const { userRole, currentUser, switchRole, isLoggedIn } = useCivic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isCitizen = userRole === 'citizen';

  // Citizen Navigation links
  const citizenLinks: { id: NavView; label: string; icon: React.ReactNode }[] = [
    { id: 'citizen_home', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { id: 'report_problem', label: 'Report Problem', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'my_problems', label: 'My Problems', icon: <FileText className="w-4 h-4" /> },
    { id: 'community_solutions', label: 'Community Solutions', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'consultations', label: 'Consultations', icon: <Vote className="w-4 h-4" /> },
    { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  // Role-specific Government Navigation links
  const getGovtLinks = (): { id: NavView; label: string; icon: React.ReactNode }[] => {
    if (userRole === 'field_officer') {
      return [
        { id: 'field_officer', label: 'Assigned Problems', icon: <Building2 className="w-4 h-4" /> },
        { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4" /> },
        { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4" /> }
      ];
    }
    if (userRole === 'dept_admin') {
      return [
        { id: 'dept_admin', label: 'Department Console', icon: <Building2 className="w-4 h-4" /> },
        { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4" /> },
        { id: 'review_solutions', label: 'Review Solutions', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4" /> }
      ];
    }
    // super_admin
    return [
      { id: 'super_admin', label: 'Admin Console', icon: <Building2 className="w-4 h-4" /> },
      { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4" /> },
      { id: 'review_solutions', label: 'Review Solutions', icon: <UserCheck className="w-4 h-4" /> },
      { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4" /> }
    ];
  };

  const activeLinks = isCitizen ? citizenLinks : getGovtLinks();

  const handleNavClick = (view: NavView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    // Navigate to appropriate default view
    if (role === 'citizen') {
      onNavigate('citizen_home');
    } else if (role === 'field_officer') {
      onNavigate('field_officer');
    } else if (role === 'dept_admin') {
      onNavigate('dept_admin');
    } else {
      onNavigate('super_admin');
    }
  };

  const getHomeViewForRole = (): NavView => {
    if (userRole === 'citizen') return 'citizen_home';
    if (userRole === 'field_officer') return 'field_officer';
    if (userRole === 'dept_admin') return 'dept_admin';
    return 'super_admin';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[33px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="nav-logo"
              onClick={() => onNavigate(getHomeViewForRole())}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs font-bold text-lg group-hover:bg-blue-800 transition-colors">
                CB
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg leading-tight tracking-tight flex items-center gap-1.5">
                  <span>CivicBridge</span>
                  {!isCitizen && (
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-medium border border-slate-300">
                      Govt Portal
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">
                  From Protest to Participation
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {activeLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Action / Profile Demo Switch */}
          <div className="flex items-center gap-2">
            {isCitizen ? (
              <button
                type="button"
                id="nav-btn-quick-report"
                onClick={() => onNavigate('report_problem')}
                className="hidden sm:inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium px-3.5 py-2 rounded-md shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Problem</span>
              </button>
            ) : null}

            {/* Role / Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="btn-nav-role-dropdown"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-800 font-medium transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="leading-tight text-xs font-semibold">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{currentUser.roleTitle}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  id="nav-role-dropdown-menu"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                    {currentUser.department && (
                      <p className="text-[10px] text-blue-700 font-medium mt-0.5">{currentUser.department}</p>
                    )}
                  </div>

                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Demo Role Switcher
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('citizen')}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      userRole === 'citizen' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Citizen (Ananya)</span>
                    {userRole === 'citizen' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('field_officer')}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      userRole === 'field_officer' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Field Officer (Rahul)</span>
                    {userRole === 'field_officer' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('dept_admin')}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      userRole === 'dept_admin' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Dept Admin (Vikram)</span>
                    {userRole === 'dept_admin' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('super_admin')}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                      userRole === 'super_admin' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Super Admin (Sunita)</span>
                    {userRole === 'super_admin' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRoleDropdownOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 font-medium"
                    >
                      Show Full Login Screen...
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {activeLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('landing');
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-slate-900"
            >
              Pitch Landing Page
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

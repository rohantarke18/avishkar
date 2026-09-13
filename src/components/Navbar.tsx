import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import StrokeText from './reactbits/StrokeText';
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
  ChevronDown,
  ShieldCheck,
  HardHat,
  PhoneCall,
  Activity,
  CheckCircle2,
  LogOut,
  User,
  Sparkles
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
  const { userRole, currentUser, switchRole, isLoggedIn, logout } = useCivic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);

  const isCitizen = userRole === 'citizen';

  // Navigation configurations
  const citizenLinks: { id: NavView; label: string; icon: React.ReactNode }[] = [
    { id: 'citizen_home', label: 'Citizen Home', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
    { id: 'report_problem', label: 'Report Problem', icon: <PlusCircle className="w-4 h-4 text-indigo-600" /> },
    { id: 'my_problems', label: 'My Submissions', icon: <FileText className="w-4 h-4 text-amber-600" /> },
    { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4 text-amber-500" /> },
    { id: 'consultations', label: 'Public Polls', icon: <Vote className="w-4 h-4 text-purple-600" /> },
    { id: 'public_dashboard', label: 'City Transparency', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> }
  ];

  const getGovtLinks = (): { id: NavView; label: string; icon: React.ReactNode }[] => {
    if (userRole === 'field_officer') {
      return [
        { id: 'field_officer', label: 'Assigned Work Orders', icon: <HardHat className="w-4 h-4 text-amber-600" /> },
        { id: 'community_solutions', label: 'Open Challenges', icon: <Lightbulb className="w-4 h-4 text-blue-600" /> },
        { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> }
      ];
    }
    if (userRole === 'dept_admin') {
      return [
        { id: 'dept_admin', label: 'Department Console', icon: <Building2 className="w-4 h-4 text-indigo-600" /> },
        { id: 'review_solutions', label: 'Review Solutions', icon: <UserCheck className="w-4 h-4 text-blue-600" /> },
        { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4 text-amber-600" /> },
        { id: 'public_dashboard', label: 'Transparency', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> }
      ];
    }
    // super_admin
    return [
      { id: 'super_admin', label: 'Administration Console', icon: <ShieldCheck className="w-4 h-4 text-purple-600" /> },
      { id: 'review_solutions', label: 'Review Solutions', icon: <UserCheck className="w-4 h-4 text-blue-600" /> },
      { id: 'community_solutions', label: 'Civic Challenges', icon: <Lightbulb className="w-4 h-4 text-amber-600" /> },
      { id: 'public_dashboard', label: 'City Transparency', icon: <BarChart3 className="w-4 h-4 text-emerald-600" /> }
    ];
  };

  const activeLinks = isCitizen ? citizenLinks : getGovtLinks();

  const handleNavClick = (view: NavView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleSwitchWorkspace = (role: UserRole) => {
    switchRole(role);
    setWorkspaceDropdownOpen(false);
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
    if (currentView === 'landing') return 'landing';
    if (userRole === 'citizen') return 'citizen_home';
    if (userRole === 'field_officer') return 'field_officer';
    if (userRole === 'dept_admin') return 'dept_admin';
    return 'super_admin';
  };

  const getRoleTheme = () => {
    switch (userRole) {
      case 'citizen':
        return {
          badge: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-600',
          title: 'Citizen Portal'
        };
      case 'field_officer':
        return {
          badge: 'bg-amber-50 text-amber-900 border-amber-200',
          dot: 'bg-amber-500',
          title: 'Field Operations'
        };
      case 'dept_admin':
        return {
          badge: 'bg-indigo-50 text-indigo-900 border-indigo-200',
          dot: 'bg-indigo-600',
          title: 'Department Admin'
        };
      case 'super_admin':
        return {
          badge: 'bg-purple-50 text-purple-900 border-purple-200',
          dot: 'bg-purple-600',
          title: 'City Administration'
        };
    }
  };

  const currentTheme = getRoleTheme();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* 1. Official Government Micro-Header Bar */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-medium border-b border-slate-800 px-4 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 text-slate-100 font-semibold tracking-wide">
              <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Municipal Corporation of Greater Metropolis</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-400 font-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Citizen Engagement System</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:18002484246"
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              title="24x7 Citizen Grievance Helpline"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Citizen Helpline:</span>
              <span className="font-semibold text-white">1800-CIVIC-GOV</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <Activity className="w-3 h-3 text-blue-400" />
              <span>SLA Resolution: 83.1%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              id="nav-logo"
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
              title="Return to CivicBridge Homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-teal-600 text-white flex items-center justify-center shadow-sm font-black text-lg group-hover:shadow-md transition-all group-hover:scale-[1.02] shrink-0">
                CB
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-xl leading-none tracking-tight font-sans">
                    CivicBridge
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${currentTheme.badge}`}>
                    {currentTheme.title}
                  </span>
                </div>
                <div className="w-48 h-4 mt-0.5 overflow-hidden">
                  <StrokeText
                    text="From Protest to Participation"
                    strokeColor="#2563EB"
                    fillColor="#2563EB"
                    strokeWidth={1.2}
                    drawDuration={1.4}
                    fillDelay={0.15}
                    stagger={0.03}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontSize={15}
                    fontWeight={600}
                    letterSpacing={-0.2}
                    className="w-full text-blue-600"
                  />
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
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 shadow-xs border border-blue-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action & Workspace Switcher */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button: Report a Problem (Always available or prominent) */}
            <button
              type="button"
              id="nav-btn-report-problem"
              onClick={() => onNavigate('report_problem')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all group"
            >
              <PlusCircle className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors" />
              <span>Report Problem</span>
            </button>

            {/* Portal / Workspace Switcher Menu */}
            <div className="relative">
              <button
                type="button"
                id="btn-workspace-switcher"
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-xs font-medium text-slate-800 transition-all shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="leading-tight text-xs font-bold text-slate-900">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    {currentUser.roleTitle}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Workspace Switcher Menu Modal / Dropdown */}
              {workspaceDropdownOpen && (
                <div
                  id="workspace-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                        {currentUser.roleTitle}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{currentUser.email}</div>
                    {currentUser.department && (
                      <div className="text-[11px] text-blue-700 font-medium mt-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{currentUser.department}</span>
                      </div>
                    )}
                  </div>

                  {/* Switch Portal Workspace Header */}
                  <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Workspace Portal
                  </div>

                  <div className="space-y-1 px-1.5">
                    {/* Citizen Workspace */}
                    <button
                      type="button"
                      onClick={() => handleSwitchWorkspace('citizen')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        userRole === 'citizen'
                          ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Citizen Portal</div>
                          <div className="text-[10px] text-slate-500">Report issues, vote & track updates</div>
                        </div>
                      </div>
                      {userRole === 'citizen' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                    </button>

                    {/* Field Officer Workspace */}
                    <button
                      type="button"
                      onClick={() => handleSwitchWorkspace('field_officer')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        userRole === 'field_officer'
                          ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <HardHat className="w-4 h-4 text-amber-600" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Field Operations</div>
                          <div className="text-[10px] text-slate-500">Work orders & resolution proof</div>
                        </div>
                      </div>
                      {userRole === 'field_officer' && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
                    </button>

                    {/* Department Admin Workspace */}
                    <button
                      type="button"
                      onClick={() => handleSwitchWorkspace('dept_admin')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        userRole === 'dept_admin'
                          ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-indigo-600" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">Department Console</div>
                          <div className="text-[10px] text-slate-500">Dispatch officers & open challenges</div>
                        </div>
                      </div>
                      {userRole === 'dept_admin' && <CheckCircle2 className="w-4 h-4 text-indigo-700" />}
                    </button>

                    {/* Super Admin Workspace */}
                    <button
                      type="button"
                      onClick={() => handleSwitchWorkspace('super_admin')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        userRole === 'super_admin'
                          ? 'bg-purple-50 text-purple-900 font-bold border border-purple-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-semibold text-slate-900 text-xs">City Administration</div>
                          <div className="text-[10px] text-slate-500">City oversight & pilot funding</div>
                        </div>
                      </div>
                      {userRole === 'super_admin' && <CheckCircle2 className="w-4 h-4 text-purple-700" />}
                    </button>
                  </div>

                  {/* Public Portal Link */}
                  <div className="border-t border-slate-100 my-1 pt-1 px-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setWorkspaceDropdownOpen(false);
                        onNavigate('landing');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                    >
                      <span>Public Overview Portal</span>
                      <span className="text-[10px] text-slate-400">View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWorkspaceDropdownOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg flex items-center justify-between"
                    >
                      <span>Manage Credentials / Sign In</span>
                      <UserCheck className="w-3.5 h-3.5" />
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
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onNavigate('report_problem');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-lg bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 mb-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report a Problem</span>
          </button>

          {activeLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-3 ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('landing');
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Municipal Overview Home
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

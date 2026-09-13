import React, { useState } from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import { Navbar, NavView } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { LandingPage } from './components/LandingPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { ReportProblemFlow } from './components/citizen/ReportProblemFlow';
import { ProblemTracking } from './components/citizen/ProblemTracking';
import { CommunityChallenges } from './components/citizen/CommunityChallenges';
import { ConsultationsView } from './components/citizen/ConsultationsView';
import { InnovationsView } from './components/citizen/InnovationsView';
import { PublicTransparency } from './components/citizen/PublicTransparency';
import { MyProblemsView } from './components/citizen/MyProblemsView';
import { FieldOfficerDashboard } from './components/government/FieldOfficerDashboard';
import { DepartmentAdminDashboard } from './components/government/DepartmentAdminDashboard';
import { SuperAdminDashboard } from './components/government/SuperAdminDashboard';
import { ChallengeSolutionsReview } from './components/government/ChallengeSolutionsReview';
import { Building2, ShieldCheck, PhoneCall, CheckCircle2, Heart } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentRole, isLoggedIn } = useCivic();

  // Navigation view state
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [selectedProblemId, setSelectedProblemId] = useState<string>('CB-2026-1042');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

  // Login Modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProblemTracking = (problemId: string) => {
    setSelectedProblemId(problemId);
    setCurrentView('problem_tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChallenge = (challengeId: string) => {
    setSelectedChallengeId(challengeId);
    setCurrentView('community_solutions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Main Dynamic Content */}
      <main className="flex-1 pb-16">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenProblemTracking={handleOpenProblemTracking}
            onOpenChallenge={handleOpenChallenge}
            onReportProblem={() => handleNavigate('report_problem')}
            onExploreChallenges={() => handleNavigate('community_solutions')}
            onGetStarted={() => {
              if (currentRole === 'citizen') {
                handleNavigate('citizen_home');
              } else if (currentRole === 'field_officer') {
                handleNavigate('field_officer');
              } else if (currentRole === 'dept_admin') {
                handleNavigate('dept_admin');
              } else {
                handleNavigate('super_admin');
              }
            }}
          />
        )}

        {currentView === 'citizen_home' && (
          <CitizenDashboard
            onNavigate={handleNavigate}
            onOpenProblemTracking={handleOpenProblemTracking}
            onOpenChallenge={handleOpenChallenge}
          />
        )}

        {currentView === 'report_problem' && (
          <ReportProblemFlow
            onSuccessNavigateToTracking={handleOpenProblemTracking}
            onCancel={() => handleNavigate('citizen_home')}
          />
        )}

        {currentView === 'problem_tracking' && (
          <ProblemTracking
            problemId={selectedProblemId}
            onBack={() => {
              if (currentRole === 'citizen') {
                handleNavigate('my_problems');
              } else if (currentRole === 'field_officer') {
                handleNavigate('field_officer');
              } else if (currentRole === 'dept_admin') {
                handleNavigate('dept_admin');
              } else {
                handleNavigate('super_admin');
              }
            }}
            onOpenChallenge={handleOpenChallenge}
          />
        )}

        {currentView === 'community_solutions' && (
          <CommunityChallenges
            selectedChallengeId={selectedChallengeId}
            onSelectChallenge={setSelectedChallengeId}
          />
        )}

        {currentView === 'consultations' && <ConsultationsView />}

        {currentView === 'innovations' && <InnovationsView />}

        {currentView === 'public_dashboard' && <PublicTransparency />}

        {currentView === 'my_problems' && (
          <MyProblemsView
            onSelectProblem={handleOpenProblemTracking}
            onOpenReport={() => handleNavigate('report_problem')}
          />
        )}

        {/* Government Views */}
        {currentView === 'field_officer' && <FieldOfficerDashboard />}

        {currentView === 'dept_admin' && (
          <DepartmentAdminDashboard
            onOpenProblemTracking={handleOpenProblemTracking}
            onOpenChallenges={() => handleNavigate('community_solutions')}
          />
        )}

        {currentView === 'super_admin' && (
          <SuperAdminDashboard
            onOpenProblemTracking={handleOpenProblemTracking}
            onOpenChallengesReview={() => handleNavigate('review_solutions')}
          />
        )}

        {currentView === 'review_solutions' && (
          <ChallengeSolutionsReview
            onBack={() => {
              if (currentRole === 'super_admin') {
                handleNavigate('super_admin');
              } else {
                handleNavigate('dept_admin');
              }
            }}
          />
        )}
      </main>

      {/* 3. Official Municipal Portal Footer */}
      <footer className="border-t border-slate-200 bg-white pt-10 pb-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Column 1: Identity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 via-indigo-700 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  CB
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-sm tracking-tight block">CivicBridge</span>
                  <span className="text-[10px] text-slate-500">Municipal Citizen Engagement</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empowering residents and municipal authorities to report problems, accelerate resolutions, and co-create urban infrastructure solutions.
              </p>
            </div>

            {/* Column 2: Quick Portals */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">Citizen Services</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <button type="button" onClick={() => handleNavigate('report_problem')} className="hover:text-blue-700">
                    Report Public Problem
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavigate('problem_tracking')} className="hover:text-blue-700">
                    Track Grievance By ID
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavigate('community_solutions')} className="hover:text-blue-700">
                    Open Civic Challenges
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavigate('consultations')} className="hover:text-blue-700">
                    Ward Consultations & Polls
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Administration & Transparency */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">Transparency & SLA</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <button type="button" onClick={() => handleNavigate('public_dashboard')} className="hover:text-blue-700">
                    Public City Transparency Board
                  </button>
                </li>
                <li>
                  <span className="text-slate-500">Citizen Charter 72-hr SLA Standard</span>
                </li>
                <li>
                  <span className="text-slate-500">Ministry of Housing & Urban Affairs</span>
                </li>
                <li>
                  <span className="text-slate-500">Right to Information (RTI) Cell</span>
                </li>
              </ul>
            </div>

            {/* Column 4: 24/7 Helpline */}
            <div>
              <h4 className="font-bold text-slate-900 mb-2.5 text-xs uppercase tracking-wider">24/7 Citizen Support</h4>
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                  <span>Toll-Free Helpline</span>
                </div>
                <div className="font-mono font-bold text-base text-blue-950">1800-CIVIC-GOV</div>
                <p className="text-[11px] text-blue-800/80 leading-tight">
                  Toll-free 24x7 municipal assistance, emergency utility dispatch & grievance registration.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 Municipal Corporation of Greater Metropolis. All official rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>All Municipal Systems Operational</span>
              </span>
              <span>ISO 27001 Certified Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccessRedirect={(role) => {
            if (role === 'citizen') handleNavigate('citizen_home');
            else if (role === 'field_officer') handleNavigate('field_officer');
            else if (role === 'dept_admin') handleNavigate('dept_admin');
            else handleNavigate('super_admin');
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <CivicProvider>
      <MainAppContent />
    </CivicProvider>
  );
}

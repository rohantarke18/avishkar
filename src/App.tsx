import React, { useState } from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import { DemoRoleBanner } from './components/DemoRoleBanner';
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
      {/* 1. Fast Role Switcher for Hackathon Judges & Pitching */}
      <DemoRoleBanner
        onSwitchRole={(role) => {
          if (role === 'citizen') {
            setCurrentView('citizen_home');
          } else if (role === 'field_officer') {
            setCurrentView('field_officer');
          } else if (role === 'department_admin') {
            setCurrentView('dept_admin');
          } else if (role === 'super_admin') {
            setCurrentView('super_admin');
          }
        }}
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* 3. Main Dynamic Content */}
      <main className="flex-1 pb-16">
        {currentView === 'landing' && (
          <LandingPage
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
            onReportProblem={() => handleNavigate('report_problem')}
            onExploreChallenges={() => handleNavigate('community_solutions')}
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

      {/* 4. Minimal Pitch-Friendly Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">CivicBridge</span>
            <span className="text-slate-300">|</span>
            <span>From Protest to Participation</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              Hackathon Pitch Demo
            </span>
            <span>Instant Local State Sync & Verified Geo-Resolution</span>
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

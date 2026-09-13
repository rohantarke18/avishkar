import React from 'react';
import { useCivic } from '../context/CivicContext';
import { NavView } from './Navbar';
import {
  ArrowRight,
  AlertTriangle,
  HardHat,
  Lightbulb,
  CheckCircle2,
  Users,
  Building,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: NavView) => void;
  onOpenProblemTracking: (id: string) => void;
  onOpenChallenge: (id: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenProblemTracking,
  onOpenChallenge
}) => {
  const { stats, challenges, problems, switchRole } = useCivic();

  return (
    <div id="landing-page" className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="pt-14 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Pitch Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>CivicBridge: From Protest to Participation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          From Problems to Participation
        </h1>

        <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Report problems. Track action. Help build better solutions.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            id="hero-btn-report"
            onClick={() => onNavigate('report_problem')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Report a Problem</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-btn-explore-solutions"
            onClick={() => onNavigate('community_solutions')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Explore Community Solutions</span>
          </button>
        </div>

        {/* Real-looking Demo Statistics */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg border border-slate-200/70 shadow-xs">
              <div className="text-2xl font-bold text-slate-900">
                {stats.totalReported.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Problems Reported</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200/70 shadow-xs">
              <div className="text-2xl font-bold text-emerald-700">
                {stats.totalResolved.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Resolved</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200/70 shadow-xs">
              <div className="text-2xl font-bold text-blue-700">
                {stats.totalIdeas.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Community Ideas</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200/70 shadow-xs">
              <div className="text-2xl font-bold text-slate-800">
                {stats.resolutionRate}%
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">Resolution Rate</div>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 tracking-wide uppercase">
            Demo Platform Statistics
          </div>
        </div>
      </section>

      {/* Visual Explanation Flow: REPORT -> ACTION -> SOLUTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h2 className="text-xs font-bold text-blue-800 tracking-wider uppercase">
              The 3-Step Civic Cycle
            </h2>
            <p className="text-lg font-bold text-slate-900 mt-1">
              How CivicBridge bridges citizens and government
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1: REPORT */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-base mb-3">
                  1
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-700" />
                  <h3 className="text-base font-bold text-slate-900">REPORT</h3>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Citizens submit civic issues in under 60 seconds with verified GPS, map pin drops, and photo evidence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-blue-700">
                → Live Tracking ID Generated
              </div>
            </div>

            {/* Step 2: ACTION */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base mb-3">
                  2
                </div>
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-amber-700" />
                  <h3 className="text-base font-bold text-slate-900">ACTION</h3>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Department Admins dispatch field engineers with strict deadlines. Officers upload on-site completion proof.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-amber-800">
                → Citizen Verifies & Signs Off
              </div>
            </div>

            {/* Step 3: SOLUTION */}
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-base mb-3">
                  3
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-slate-900">SOLUTION</h3>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  When government is stuck on tough problems, issues become Open Civic Challenges. Citizens propose & vote on ideas for municipal pilot funding.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700">
                → High-Vote Ideas Get Piloted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pitch Quick-Demo Section: 30-Second Demonstration for Judges */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-6">
        <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
                Pitch Demonstration Shortcuts
              </span>
              <h3 className="text-xl font-bold mt-1 text-white">
                Experience both sides of CivicBridge
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Click any workflow below to demonstrate live without typing or mock stubs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Shortcut 1 */}
            <button
              type="button"
              id="pitch-demo-track-pothole"
              onClick={() => onOpenProblemTracking('CB-2026-1042')}
              className="text-left p-4 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-blue-500 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400">CB-2026-1042</span>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded">In Progress</span>
              </div>
              <h4 className="font-semibold text-sm text-white mt-2 group-hover:text-blue-300 transition-colors">
                Track Pothole near College
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                See real-time timeline, assigned officer Rahul, and deadline tracking.
              </p>
              <div className="mt-3 text-xs text-blue-400 font-medium flex items-center gap-1">
                <span>Open Tracking Flow</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Shortcut 2 */}
            <button
              type="button"
              id="pitch-demo-challenge-waterlogging"
              onClick={() => onOpenChallenge('chal-101')}
              className="text-left p-4 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-emerald-500 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400">Open Civic Challenge</span>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">4 Solutions</span>
              </div>
              <h4 className="font-semibold text-sm text-white mt-2 group-hover:text-emerald-300 transition-colors">
                Ward 12 Waterlogging Challenge
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                See solutions sorted strictly by citizen likes, vote live, or suggest an idea.
              </p>
              <div className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span>Vote & Propose Solutions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Shortcut 3 */}
            <button
              type="button"
              id="pitch-demo-verify-drain"
              onClick={() => onOpenProblemTracking('CB-2026-1031')}
              className="text-left p-4 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-purple-500 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-purple-400">Citizen Verification</span>
                <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 py-0.5 rounded">Resolution Pending</span>
              </div>
              <h4 className="font-semibold text-sm text-white mt-2 group-hover:text-purple-300 transition-colors">
                Verify Fixed Storm Drain
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Officer submitted repair photo. Citizen clicks [✓ Problem Solved] or [Still Exists].
              </p>
              <div className="mt-3 text-xs text-purple-400 font-medium flex items-center gap-1">
                <span>Test Citizen Sign-off</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Civic Challenges Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Civic Challenges</h2>
            <p className="text-xs text-slate-500">Problems government needs citizen intelligence to solve</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('community_solutions')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All ({challenges.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.slice(0, 2).map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-medium text-blue-700">{challenge.department}</span>
                  <span>📍 {challenge.location}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {challenge.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {challenge.problemDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  💡 {challenge.solutionsCount} community solutions
                </span>
                <button
                  type="button"
                  onClick={() => onOpenChallenge(challenge.id)}
                  className="px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold transition-colors"
                >
                  View Challenge →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

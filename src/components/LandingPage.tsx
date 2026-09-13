import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { NavView } from './Navbar';
import StrokeText from './reactbits/StrokeText';
import {
  ArrowRight,
  AlertTriangle,
  HardHat,
  Lightbulb,
  CheckCircle2,
  Users,
  Building,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  MapPin,
  Clock,
  Check,
  PhoneCall,
  Flame,
  ThumbsUp
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: NavView) => void;
  onOpenProblemTracking: (id: string) => void;
  onOpenChallenge: (id: string) => void;
  onReportProblem?: () => void;
  onExploreChallenges?: () => void;
  onGetStarted?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenProblemTracking,
  onOpenChallenge,
  onReportProblem,
  onExploreChallenges,
  onGetStarted
}) => {
  const { stats, challenges, problems } = useCivic();
  const [quickTrackId, setQuickTrackId] = useState('');

  // Fallback safe handlers
  const handleReportClick = () => {
    if (onReportProblem) {
      onReportProblem();
    } else if (onNavigate) {
      onNavigate('report_problem');
    }
  };

  const handleExploreClick = () => {
    if (onExploreChallenges) {
      onExploreChallenges();
    } else if (onNavigate) {
      onNavigate('community_solutions');
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = quickTrackId.trim();
    if (id) {
      onOpenProblemTracking(id);
    } else {
      onOpenProblemTracking('CB-2026-1042');
    }
  };

  return (
    <div id="landing-page" className="min-h-screen bg-slate-50/70 pb-20">
      {/* 2. Vibrant & Coloured Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        {/* Subtle decorative color glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Official Civic Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-300 text-blue-900 text-xs font-bold mb-6 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Municipal Citizen Engagement & Grievance Redressal System</span>
        </div>

        {/* 1. Main Heading: CivicBridge (Clean bold display typography matching screenshot) */}
        <div className="max-w-4xl mx-auto my-1 flex justify-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-none select-none font-sans">
            CivicBridge
          </h1>
        </div>

        {/* 2. Second Heading: From Protest to Participation with StrokeText from React Bits */}
        <div className="max-w-2xl mx-auto mt-2 mb-4 px-4 flex justify-center">
          <StrokeText
            text="From Protest to Participation"
            strokeColor="#2563EB"
            fillColor="#1D4ED8"
            strokeWidth={1.4}
            drawDuration={1.5}
            fillDelay={0.2}
            stagger={0.035}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={44}
            fontWeight={700}
            letterSpacing={-0.5}
            className="w-full text-blue-700 max-w-xl mx-auto"
          />
        </div>

        {/* 3. Subtitle / Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Report civic problems, track government action, propose solutions, and participate in decisions that affect your community.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            id="hero-btn-report"
            onClick={handleReportClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
          >
            <AlertTriangle className="w-4 h-4 text-blue-200" />
            <span>Report a Problem</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-btn-explore-solutions"
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-bold text-sm border-2 border-amber-400 shadow-xs hover:border-amber-500 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
          >
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Explore Community Solutions</span>
          </button>
        </div>

        {/* 3. Coloured Live Statistics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {/* Metric 1: Total Reported (Sapphire Blue) */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Total Reported</span>
                <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-blue-950 mt-2">
                {stats.totalReported.toLocaleString()}
              </div>
              <div className="text-xs text-blue-700/80 mt-1 font-medium flex items-center gap-1">
                <span>✓ Verified with GPS & photo evidence</span>
              </div>
            </div>

            {/* Metric 2: Verified Resolved (Vibrant Emerald) */}
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Verified Resolved</span>
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-emerald-950 mt-2">
                {stats.totalResolved.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700 mt-1 font-medium flex items-center gap-1">
                <span className="font-bold">{stats.resolutionRate}%</span>
                <span>citizen sign-off rate</span>
              </div>
            </div>

            {/* Metric 3: Community Ideas (Warm Amber) */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Community Solutions</span>
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  <Lightbulb className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-amber-950 mt-2">
                {stats.totalIdeas.toLocaleString()}
              </div>
              <div className="text-xs text-amber-800/80 mt-1 font-medium">
                18 solutions funded for city pilots
              </div>
            </div>

            {/* Metric 4: Avg Turnaround (Indigo) */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">Average Turnaround</span>
                <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-3xl font-black text-indigo-950 mt-2">
                4.2 Days
              </div>
              <div className="text-xs text-indigo-700/80 mt-1 font-medium">
                Official Municipal SLA: 5 Days
              </div>
            </div>
          </div>
        </div>

        {/* 4. Instant Problem Tracking Lookup Box */}
        <div className="mt-8 max-w-3xl mx-auto bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="input-landing-track"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                placeholder="Have a Tracking ID? e.g. CB-2026-1042"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="button"
              id="btn-landing-track-search"
              onClick={handleTrackSubmit}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Track Live Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Problem ID shortcuts */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Quick Track:</span>
            <button
              type="button"
              onClick={() => onOpenProblemTracking('CB-2026-1042')}
              className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 font-medium transition-colors"
            >
              🟡 CB-2026-1042 (Pothole - In Progress)
            </button>
            <button
              type="button"
              onClick={() => onOpenProblemTracking('CB-2026-1031')}
              className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 font-medium transition-colors"
            >
              🟣 CB-2026-1031 (Storm Drain - Verification)
            </button>
            <button
              type="button"
              onClick={() => onOpenProblemTracking('CB-2026-1018')}
              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-medium transition-colors"
            >
              🟢 CB-2026-1018 (Streetlight - Solved)
            </button>
          </div>
        </div>
      </section>

      {/* 5. The 3-Step Civic Resolution Engine (Coloured Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Public Accountability Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            How CivicBridge Bridges Citizens & City Hall
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
            A transparent 3-step closed-loop lifecycle ensuring issues aren't just filed, but solved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: REPORT */}
          <div className="p-6 rounded-2xl bg-white border-2 border-blue-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-lg">
                  01
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
                  Citizen Action
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Smart Geo-Reporting
              </h3>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                Report issues in under 60 seconds. Drop an interactive GPS pin on the municipal map, attach photos, and receive a permanent Tracking ID with live milestones.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReportClick}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Report an issue now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Step 2: ACTION */}
          <div className="p-6 rounded-2xl bg-white border-2 border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg">
                  02
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                  Field Enforcement
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                Assigned SLA & Work Orders
              </h3>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                Department Admins assign designated ward officers with binding repair deadlines. Officers perform on-site repairs and must upload timestamped proof photos before resolution.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <span>Strict 5-day municipal SLA guarantee</span>
              </span>
            </div>
          </div>

          {/* Step 3: SOLUTION */}
          <div className="p-6 rounded-2xl bg-white border-2 border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-lg">
                  03
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                  Citizen Sign-Off
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Citizen Verification & Co-Creation
              </h3>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                The citizen inspects the repair and clicks <strong>[✓ Solved]</strong> to close the ticket. If problems persist or are systemic, they convert to Open Civic Challenges for community solutions.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleExploreClick}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Browse civic challenges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Active Civic Challenges Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-12">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-blue-900/60">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 text-blue-300 text-xs font-bold mb-2 border border-blue-700">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Open Civic Innovation Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Active Community Challenges
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                When conventional repairs fall short, the city invites residents, engineers, and urban planners to propose and vote on innovative solutions for municipal pilot funding.
              </p>
            </div>

            <button
              type="button"
              id="landing-btn-view-all-challenges"
              onClick={handleExploreClick}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span>View All Challenges</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {challenges.slice(0, 2).map((challenge) => (
              <div
                key={challenge.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 rounded-2xl p-6 transition-all shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-900/80 text-blue-300 border border-blue-800 font-semibold">
                      {challenge.department}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {challenge.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {challenge.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                    {challenge.problemDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>{challenge.solutionsCount} Community Solutions Proposed</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenChallenge(challenge.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Vote & Propose</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Verified Resolutions Showcase (Before & After Proof) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-12">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Verified Municipal Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real Issues, Real Proof, Real Resolution
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
            Every closed problem includes verifiable photographic proof submitted by field officers and signed off by the reporting citizen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Pothole Fix */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80"
                  alt="Before Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-rose-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  BEFORE
                </span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80"
                  alt="After Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-emerald-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  AFTER REPAIR
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-700">Roads & Infrastructure</span>
                <span>Ward 4</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Pothole on 5th Main Resurfaced
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Repaired in 48 hours by Field Officer Rahul Verma. Verified by citizen Ananya.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Citizen Signed-Off</span>
                </span>
                <span className="font-mono text-slate-400">CB-2026-1018</span>
              </div>
            </div>
          </div>

          {/* Card 2: Drainage Clear */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80"
                  alt="Before Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-rose-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  BEFORE
                </span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
                  alt="After Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-emerald-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  AFTER CLEARING
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-700">Water Supply & Drainage</span>
                <span>Ward 12</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Storm Drain Silt Extraction Completed
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Excavator team removed 3 tons of debris prior to monsoon peak.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Citizen Signed-Off</span>
                </span>
                <span className="font-mono text-slate-400">CB-2026-1031</span>
              </div>
            </div>
          </div>

          {/* Card 3: Streetlight Replacement */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&q=80"
                  alt="Before Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-rose-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  BEFORE
                </span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=400&q=80"
                  alt="After Repair"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-emerald-700/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  AFTER REPLACING
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-blue-700">Electrical & Streetlights</span>
                <span>Ward 7</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                High-Mast LED Fixture Replaced
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                New energy-efficient LED array installed. Dark intersection illuminated.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Citizen Signed-Off</span>
                </span>
                <span className="font-mono text-slate-400">CB-2026-0988</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Municipal Departments & Direct Access */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Municipal Corporation Redressal Directory
              </h3>
              <p className="text-xs text-slate-500">
                All departments actively connected to CivicBridge with dedicated field response teams
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full self-start">
              100% Operational In All 16 Wards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-900">Roads & Public Infrastructure</h4>
              <p className="text-[11px] text-slate-500 mt-1">Potholes, footpaths, signals, road caving</p>
              <div className="mt-2 text-[10px] text-blue-700 font-semibold">14 Active Field Crews</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-900">Water Supply & Drainage</h4>
              <p className="text-[11px] text-slate-500 mt-1">Main leaks, storm drains, contamination</p>
              <div className="mt-2 text-[10px] text-blue-700 font-semibold">18 Active Field Crews</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-900">Solid Waste & Sanitation</h4>
              <p className="text-[11px] text-slate-500 mt-1">Garbage overflow, illegal dumping, segregation</p>
              <div className="mt-2 text-[10px] text-blue-700 font-semibold">22 Active Field Crews</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-900">Electrical & Streetlights</h4>
              <p className="text-[11px] text-slate-500 mt-1">Dark junctions, exposed wiring, loose poles</p>
              <div className="mt-2 text-[10px] text-blue-700 font-semibold">11 Active Field Crews</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

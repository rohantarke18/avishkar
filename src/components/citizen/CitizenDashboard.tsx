import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { NavView } from '../Navbar';
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Vote,
  ChevronRight,
  MapPin,
  ThumbsUp
} from 'lucide-react';
import { ProblemStatus } from '../../types';

interface CitizenDashboardProps {
  onNavigate: (view: NavView) => void;
  onOpenProblemTracking: (id: string) => void;
  onOpenChallenge: (id: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  onNavigate,
  onOpenProblemTracking,
  onOpenChallenge
}) => {
  const { currentUser, problems, challenges, consultations, getUserVote } = useCivic();

  const getStatusBadge = (status: ProblemStatus) => {
    switch (status) {
      case 'reported':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Reported
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Assigned
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            🟡 In Progress
          </span>
        );
      case 'resolution_pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            Verification Pending
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            🟢 Resolved
          </span>
        );
      case 'reopened':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Reopened
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div id="citizen-dashboard" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Large Primary Action */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
            Citizen Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            What would you like to do today?
          </p>
        </div>

        {/* Large primary action */}
        <button
          type="button"
          id="btn-dashboard-report-problem"
          onClick={() => onNavigate('report_problem')}
          className="px-6 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 shrink-0 group"
        >
          <PlusCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span>+ Report a Problem</span>
        </button>
      </div>

      {/* Section 1: My Problems */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">My Problems</h2>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {problems.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('my_problems')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {problems.slice(0, 4).map((problem) => (
            <div
              key={problem.id}
              id={`card-problem-${problem.id}`}
              onClick={() => onOpenProblemTracking(problem.id)}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    {problem.id}
                  </span>
                  {getStatusBadge(problem.status)}
                </div>

                <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                  {problem.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{problem.location.address}</span>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {problem.assignedOfficer ? `Officer: ${problem.assignedOfficer}` : 'Pending assignment'}
                </span>
                <span className="font-medium text-blue-700 flex items-center gap-0.5">
                  Track →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Community Solutions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Community Solutions</h2>
            <p className="text-xs text-slate-500">Help solve problems that need new community ideas</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('community_solutions')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
          >
            <span>Explore Challenges</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.slice(0, 2).map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="text-blue-700 font-semibold">{challenge.department}</span>
                  <span>📍 {challenge.location}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {challenge.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                  {challenge.problemDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  {challenge.solutionsCount} solutions submitted
                </span>
                <button
                  type="button"
                  onClick={() => onOpenChallenge(challenge.id)}
                  className="px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  View & Vote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Consultations */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Consultations</h2>
            <p className="text-xs text-slate-500">Vote on city initiatives and public priorities</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('consultations')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
          >
            <span>All Polls</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
          {consultations.slice(0, 1).map((consultation) => {
            const userVote = getUserVote(consultation.id);
            return (
              <div key={consultation.id} className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">{consultation.category}</span>
                  <span>Deadline: {consultation.deadline}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {consultation.question}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {consultation.explanation}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Total responses: <strong className="text-slate-800">{consultation.totalVotes}</strong>
                    {userVote && (
                      <span className="ml-2 text-emerald-700 font-medium">✓ You voted</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('consultations')}
                    className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Vote className="w-3.5 h-3.5" />
                    <span>{userVote ? 'View Results' : 'Vote Now'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

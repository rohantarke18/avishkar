import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Problem, ProblemStatus } from '../../types';
import {
  Building2,
  UserCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface DepartmentAdminDashboardProps {
  onOpenProblemTracking?: (id: string) => void;
  onOpenChallenges?: () => void;
}

export const DepartmentAdminDashboard: React.FC<DepartmentAdminDashboardProps> = ({
  onOpenProblemTracking,
  onOpenChallenges
}) => {
  const {
    problems,
    currentUser,
    assignOfficer,
    setProblemDeadline,
    publishProblemAsChallenge
  } = useCivic();

  // 3 Tabs requested: Needs Attention | In Progress | Resolved
  const [activeTab, setActiveTab] = useState<'needs_attention' | 'in_progress' | 'resolved'>(
    'needs_attention'
  );

  // Modals for actions
  const [assigningProblem, setAssigningProblem] = useState<Problem | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState('Rahul Sharma');
  const [selectedDeadline, setSelectedDeadline] = useState('15 Sep 2026');

  const [challengeModalProblem, setChallengeModalProblem] = useState<Problem | null>(null);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeWhyDifficult, setChallengeWhyDifficult] = useState('');

  // Partition problems into the 3 buckets
  const needsAttentionList = problems.filter(
    (p) => p.status === 'reported' || p.status === 'reopened' || p.status === 'resolution_pending'
  );

  const inProgressList = problems.filter(
    (p) => p.status === 'assigned' || p.status === 'in_progress'
  );

  const resolvedList = problems.filter((p) => p.status === 'resolved');

  const availableOfficers = [
    { name: 'Rahul Sharma', title: 'Senior Field Engineer' },
    { name: 'Suresh More', title: 'Sanitation Inspector' },
    { name: 'Pooja Patil', title: 'Electrical Assistant Engineer' },
    { name: 'Amit Shinde', title: 'Stormwater Technician' }
  ];

  const handleOpenAssign = (problem: Problem) => {
    setAssigningProblem(problem);
    setSelectedOfficer(problem.assignedOfficer || 'Rahul Sharma');
    setSelectedDeadline(problem.deadline || '15 Sep 2026');
  };

  const handleConfirmAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningProblem) return;
    assignOfficer(assigningProblem.id, selectedOfficer, selectedDeadline);
    setAssigningProblem(null);
  };

  const handleOpenChallengeModal = (problem: Problem) => {
    setChallengeModalProblem(problem);
    setChallengeTitle(`How can we permanently solve: ${problem.title}?`);
    setChallengeWhyDifficult(
      `Conventional excavation at ${problem.location.address} is restricted by dense utility cables and heritage structures. Seeking community ideas for pilot implementation.`
    );
  };

  const handleConfirmPublishChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeModalProblem) return;
    publishProblemAsChallenge(challengeModalProblem.id, challengeTitle, challengeWhyDifficult);
    setChallengeModalProblem(null);
    if (onOpenChallenges) onOpenChallenges();
  };

  return (
    <div id="dept-admin-dashboard" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Department Admin
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Manage Department Problems
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {currentUser.department || 'Public Works Department (PWD)'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <div className="font-semibold text-slate-900">{currentUser.name}</div>
            <div className="text-slate-500">Executive Engineer</div>
          </div>
        </div>
      </div>

      {/* 3 Simple Buckets / Tabs requested in prompt */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          id="tab-needs-attention"
          onClick={() => setActiveTab('needs_attention')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'needs_attention'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Needs Attention</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-amber-100 text-amber-900">
            {needsAttentionList.length}
          </span>
        </button>

        <button
          type="button"
          id="tab-in-progress"
          onClick={() => setActiveTab('in_progress')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'in_progress'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4 text-blue-600" />
          <span>In Progress</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-blue-100 text-blue-900">
            {inProgressList.length}
          </span>
        </button>

        <button
          type="button"
          id="tab-resolved"
          onClick={() => setActiveTab('resolved')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'resolved'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Resolved</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-100 text-emerald-900">
            {resolvedList.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-3">
        {(activeTab === 'needs_attention'
          ? needsAttentionList
          : activeTab === 'in_progress'
          ? inProgressList
          : resolvedList
        ).map((problem) => (
          <div
            key={problem.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500">
                  {problem.id}
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {problem.category}
                </span>

                {problem.status === 'resolution_pending' ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900">
                    Awaiting Citizen Verification
                  </span>
                ) : problem.status === 'reopened' ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-900">
                    Citizen Reopened
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                    {problem.status.replace('_', ' ')}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {problem.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{problem.location.address}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span>
                  Assigned:{' '}
                  <strong className="text-slate-800">
                    {problem.assignedOfficer || 'Not Assigned'}
                  </strong>
                </span>
                <span>
                  Deadline:{' '}
                  <strong className="text-slate-800">
                    {problem.deadline || 'None'}
                  </strong>
                </span>
              </div>
            </div>

            {/* Main actions requested in prompt:
                [ Assign Officer ]
                [ Set Deadline ]
                [ Review Resolution ]
                + [ Publish as Open Challenge ] when stuck! */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <button
                type="button"
                id={`btn-admin-assign-${problem.id}`}
                onClick={() => handleOpenAssign(problem)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Assign Officer & Deadline
              </button>

              {problem.status === 'resolution_pending' && onOpenProblemTracking && (
                <button
                  type="button"
                  id={`btn-admin-review-${problem.id}`}
                  onClick={() => onOpenProblemTracking(problem.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-semibold transition-colors"
                >
                  Review Resolution
                </button>
              )}

              {/* Publish as Open Challenge button for difficult/unsolved problems */}
              {!problem.publishedToChallenge && problem.status !== 'resolved' && (
                <button
                  type="button"
                  id={`btn-admin-publish-challenge-${problem.id}`}
                  onClick={() => handleOpenChallengeModal(problem)}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-colors flex items-center gap-1"
                  title="When conventional engineering is stuck, open as civic challenge"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Publish as Challenge</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assign Officer & Set Deadline Modal */}
      {assigningProblem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setAssigningProblem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-mono text-xs text-blue-700 font-bold">
                {assigningProblem.id}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Assign Field Officer & Deadline
              </h3>
              <p className="text-xs text-slate-500">{assigningProblem.title}</p>
            </div>

            <form onSubmit={handleConfirmAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Field Officer
                </label>
                <select
                  value={selectedOfficer}
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                >
                  {availableOfficers.map((off) => (
                    <option key={off.name} value={off.name}>
                      {off.name} ({off.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution Deadline
                </label>
                <input
                  type="text"
                  value={selectedDeadline}
                  onChange={(e) => setSelectedDeadline(e.target.value)}
                  placeholder="e.g. 15 Sep 2026 or Due today"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAssigningProblem(null)}
                  className="px-4 py-2 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-confirm-officer-assignment"
                  className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish as Open Challenge Modal */}
      {challengeModalProblem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setChallengeModalProblem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                <Sparkles className="w-4 h-4" />
                <span>Open Civic Challenge Publishing</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Open to Community Co-Creation
              </h3>
              <p className="text-xs text-slate-500">
                Convert unsolved issue {challengeModalProblem.id} into a public challenge.
              </p>
            </div>

            <form onSubmit={handleConfirmPublishChallenge} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Why Conventional Solutions Failed
                </label>
                <textarea
                  rows={3}
                  value={challengeWhyDifficult}
                  onChange={(e) => setChallengeWhyDifficult(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChallengeModalProblem(null)}
                  className="px-4 py-2 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-confirm-publish-challenge"
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
                >
                  Publish Public Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Problem, ProblemStatus } from '../../types';
import {
  MapPin,
  Clock,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  Calendar,
  Sparkles,
  Camera,
  RefreshCcw
} from 'lucide-react';

interface ProblemTrackingProps {
  problemId: string;
  onBack: () => void;
  onOpenChallenge?: (challengeId: string) => void;
}

export const ProblemTracking: React.FC<ProblemTrackingProps> = ({
  problemId,
  onBack,
  onOpenChallenge
}) => {
  const { getProblemById, verifyProblem, challenges } = useCivic();
  const problem = getProblemById(problemId);

  const [verificationFeedbackNote, setVerificationFeedbackNote] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState<'solved' | 'still_exists' | null>(null);

  if (!problem) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-600">Problem not found with ID {problemId}.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-xs font-semibold text-blue-700 hover:underline"
        >
          Return to My Problems
        </button>
      </div>
    );
  }

  // Linked challenge if any
  const linkedChallenge = challenges.find((c) => c.linkedProblemId === problem.id);

  // 5 Canonical Milestones
  const steps: { key: ProblemStatus | 'verification'; label: string }[] = [
    { key: 'reported', label: 'Reported' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolution_pending', label: 'Resolution Pending' },
    { key: 'verification', label: 'Citizen Verification' }
  ];

  const getStepState = (stepKey: string) => {
    const order = ['reported', 'assigned', 'in_progress', 'resolution_pending', 'resolved'];
    const currentIdx = order.indexOf(problem.status === 'reopened' ? 'in_progress' : problem.status);

    if (stepKey === 'verification') {
      if (problem.status === 'resolved') return 'completed';
      if (problem.status === 'resolution_pending') return 'active';
      return 'pending';
    }

    const stepIdx = order.indexOf(stepKey);
    if (problem.status === 'resolved') return 'completed';
    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  const handleConfirmVerification = (feedback: 'solved' | 'still_exists') => {
    verifyProblem(
      problem.id,
      feedback,
      verificationFeedbackNote || (feedback === 'solved' ? 'Verified on ground: Issue resolved.' : 'Work is incomplete.')
    );
    setShowFeedbackModal(null);
    setVerificationFeedbackNote('');
  };

  return (
    <div id="problem-tracking-view" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Problems</span>
        </button>

        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
          Tracking ID: {problem.id}
        </span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            {problem.category}
          </span>
          <div className="flex items-center gap-2">
            {problem.status === 'resolved' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>🟢 Resolved</span>
              </span>
            )}
            {problem.status === 'in_progress' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>🔵 In Progress</span>
              </span>
            )}
            {problem.status === 'resolution_pending' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
                <Clock className="w-3.5 h-3.5" />
                <span>⚪ Verification Pending</span>
              </span>
            )}
            {problem.status === 'assigned' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <span>🟢 Assigned</span>
              </span>
            )}
            {problem.status === 'reported' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <span>🟢 Reported</span>
              </span>
            )}
            {problem.status === 'reopened' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Reopened by Citizen</span>
              </span>
            )}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          {problem.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {problem.description}
        </p>

        {/* Core Metadata Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Building className="w-4 h-4 text-blue-700 shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 block text-[10px] uppercase">Department</span>
              <span className="font-semibold text-slate-800">{problem.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <User className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 block text-[10px] uppercase">Assigned Officer</span>
              <span className="font-semibold text-slate-800">
                {problem.assignedOfficer || 'Pending Assignment'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-400 block text-[10px] uppercase">Deadline</span>
              <span className="font-semibold text-slate-800">
                {problem.deadline || 'Standard (72 hrs)'}
              </span>
            </div>
          </div>
        </div>

        {/* Location Display */}
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-700">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
            <span className="font-medium">{problem.location.address}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 shrink-0 hidden sm:inline">
            Lat: {problem.location.lat.toFixed(4)}, Lng: {problem.location.lng.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Linked Open Challenge Callout if published */}
      {(problem.publishedToChallenge || linkedChallenge) && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Published as Open Civic Challenge</span>
            </div>
            <p className="text-xs text-slate-200 mt-1 max-w-xl">
              Because traditional repairs faced constraints, the department opened this issue to citizen co-creation.
            </p>
          </div>
          {onOpenChallenge && linkedChallenge && (
            <button
              type="button"
              onClick={() => onOpenChallenge(linkedChallenge.id)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 transition-colors"
            >
              View Challenge & Votes →
            </button>
          )}
        </div>
      )}

      {/* CITIZEN VERIFICATION ACTION CALLOUT (Interactive sign-off) */}
      {problem.status === 'resolution_pending' && (
        <div className="p-5 rounded-xl bg-purple-50/80 border-2 border-purple-300 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Citizen Action Required
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Officer submitted resolution proof
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Please verify if the problem has been solved on the ground.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-200 text-purple-900 font-semibold text-xs">
              Sign-Off Pending
            </span>
          </div>

          {/* Officer's Resolution Proof */}
          {problem.resolutionPhoto && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-lg border border-purple-200">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                  Resolution Photo by {problem.assignedOfficer}
                </span>
                <img
                  src={problem.resolutionPhoto}
                  alt="Resolution proof"
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-cover rounded-md border border-slate-200"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                    Officer's Note
                  </span>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
                    "{problem.resolutionNotes || 'Repair completed. Site verified safe.'}"
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Completed on: {problem.timeline[problem.timeline.length - 1]?.timestamp || 'Recent'}
                </div>
              </div>
            </div>
          )}

          {/* Verification Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              id="btn-citizen-confirm-solved"
              onClick={() => handleConfirmVerification('solved')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>✓ Problem Solved</span>
            </button>

            <button
              type="button"
              id="btn-citizen-report-still-exists"
              onClick={() => handleConfirmVerification('still_exists')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Problem Still Exists</span>
            </button>
          </div>
        </div>
      )}

      {/* Citizen Feedback Banner if already answered */}
      {problem.citizenFeedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
            problem.citizenFeedback === 'solved'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {problem.citizenFeedback === 'solved' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold">
              {problem.citizenFeedback === 'solved'
                ? 'Citizen confirmed: Problem Solved'
                : 'Citizen reported: Problem Still Exists (Reopened)'}
            </div>
            {problem.citizenFeedbackNote && (
              <div className="mt-0.5 text-slate-700">"{problem.citizenFeedbackNote}"</div>
            )}
          </div>
        </div>
      )}

      {/* Clean Timeline Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Resolution Progress</h2>
          <p className="text-xs text-slate-500">Live operational audit trail</p>
        </div>

        {/* Milestone Steps Bar */}
        <div className="relative py-2">
          <div className="grid grid-cols-5 gap-2 text-center relative">
            {steps.map((step, idx) => {
              const state = getStepState(step.key);
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : state === 'active'
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {state === 'completed' ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 leading-tight ${
                      state === 'completed'
                        ? 'text-emerald-800'
                        : state === 'active'
                        ? 'text-blue-900 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Timeline Events */}
        <div className="border-t border-slate-100 pt-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Activity Updates
          </h3>
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {problem.timeline.map((event) => (
              <div key={event.id} className="relative pl-7 text-xs">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white" />
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-500 mb-1 text-[11px]">
                    <span className="font-semibold text-slate-800">{event.author}</span>
                    <span>{event.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{event.note}</p>
                  {event.photoUrl && (
                    <img
                      src={event.photoUrl}
                      alt="Update evidence"
                      referrerPolicy="no-referrer"
                      className="mt-2 w-36 h-24 object-cover rounded border border-slate-200"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

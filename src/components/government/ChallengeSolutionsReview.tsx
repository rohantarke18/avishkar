import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { CommunitySolution } from '../../types';
import {
  Trophy,
  ThumbsUp,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface ChallengeSolutionsReviewProps {
  onBack?: () => void;
}

export const ChallengeSolutionsReview: React.FC<ChallengeSolutionsReviewProps> = ({ onBack }) => {
  const {
    challenges,
    getSolutionsForChallenge,
    reviewSolution
  } = useCivic();

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    challenges[0]?.id || ''
  );

  const activeChallenge = challenges.find((c) => c.id === selectedChallengeId) || challenges[0];
  const solutions = activeChallenge ? getSolutionsForChallenge(activeChallenge.id) : [];

  const handleAction = (
    solutionId: string,
    action: 'shortlist' | 'expert_review' | 'pilot' | 'reject'
  ) => {
    let note = '';
    switch (action) {
      case 'shortlist':
        note = 'Shortlisted by Municipal Review Committee for preliminary feasibility study.';
        break;
      case 'expert_review':
        note = 'Transferred to Department Chief Structural and Hydraulic Consultant.';
        break;
      case 'pilot':
        note = 'Approved for 60-day Ward Micro-Pilot under City Innovation Fund.';
        break;
      case 'reject':
        note = 'Reviewed: Clashes with underground high-voltage transmission grid.';
        break;
    }
    reviewSolution(solutionId, action, note);
  };

  return (
    <div id="solutions-review-console" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Municipal Evaluation Board</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Review Community Solutions
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Community likes indicate public priority and support. Evaluate structural feasibility, safety, and cost before marking ideas for pilots.
        </p>

        {/* Challenge selector pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
          {challenges.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedChallengeId(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedChallengeId === c.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Title Banner */}
      {activeChallenge && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
              Evaluating Challenge
            </span>
            <span className="font-bold text-sm text-white">{activeChallenge.title}</span>
            <span className="text-slate-300 ml-2">({activeChallenge.location})</span>
          </div>
          <div className="text-slate-300">
            {solutions.length} proposals received
          </div>
        </div>
      )}

      {/* Solutions list ranked by likes */}
      <div className="space-y-4">
        {solutions.map((sol, index) => {
          const isTop = index === 0;

          return (
            <div
              key={sol.id}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                isTop ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {isTop && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        <span>🏆 Most Supported</span>
                      </span>
                    )}

                    <span className="text-xs font-mono font-bold text-slate-400">
                      Rank #{index + 1}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      <ThumbsUp className="w-3 h-3 text-blue-700" />
                      <span>{sol.likes} Public Likes</span>
                    </span>

                    {/* Status Badge */}
                    {sol.status === 'pilot' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Marked for Pilot
                      </span>
                    )}
                    {sol.status === 'shortlisted' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        Shortlisted
                      </span>
                    )}
                    {sol.status === 'expert_review' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        Under Expert Review
                      </span>
                    )}
                    {sol.status === 'rejected' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        Rejected
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {sol.title}
                  </h3>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-800">Proposal: </strong>
                      <span>{sol.idea}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Mechanism: </strong>
                      <span>{sol.howItHelps}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Expected Impact: </strong>
                      <span>{sol.expectedImpact}</span>
                    </div>
                  </div>

                  {sol.reviewerNotes && (
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <strong className="text-blue-900">Official Decision Note: </strong>
                      <span>{sol.reviewerNotes}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    Proposed by {sol.author}
                  </div>
                </div>

                {/* 4 Government Actions requested in prompt:
                    [ Shortlist ]
                    [ Send for Expert Review ]
                    [ Mark for Pilot ]
                    [ Reject ] */}
                <div className="lg:border-l lg:border-slate-100 lg:pl-4 flex flex-wrap lg:flex-col gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    type="button"
                    id={`btn-action-shortlist-${sol.id}`}
                    onClick={() => handleAction(sol.id, 'shortlist')}
                    className="px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-semibold transition-colors"
                  >
                    Shortlist
                  </button>

                  <button
                    type="button"
                    id={`btn-action-expert-${sol.id}`}
                    onClick={() => handleAction(sol.id, 'expert_review')}
                    className="px-3 py-1.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-semibold transition-colors"
                  >
                    Send for Expert Review
                  </button>

                  <button
                    type="button"
                    id={`btn-action-pilot-${sol.id}`}
                    onClick={() => handleAction(sol.id, 'pilot')}
                    className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Mark for Pilot
                  </button>

                  <button
                    type="button"
                    id={`btn-action-reject-${sol.id}`}
                    onClick={() => handleAction(sol.id, 'reject')}
                    className="px-3 py-1.5 rounded-md bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

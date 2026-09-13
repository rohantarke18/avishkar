import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { OpenChallenge, CommunitySolution } from '../../types';
import {
  Lightbulb,
  ThumbsUp,
  MapPin,
  Building,
  AlertTriangle,
  PlusCircle,
  CheckCircle2,
  Trophy,
  ChevronLeft,
  X,
  Share2
} from 'lucide-react';

interface CommunityChallengesProps {
  selectedChallengeId?: string | null;
  onSelectChallenge: (id: string | null) => void;
}

export const CommunityChallenges: React.FC<CommunityChallengesProps> = ({
  selectedChallengeId,
  onSelectChallenge
}) => {
  const {
    challenges,
    getChallengeById,
    getSolutionsForChallenge,
    likeSolution,
    hasUserLiked,
    addSolution
  } = useCivic();

  // Suggest Solution Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solutionTitle, setSolutionTitle] = useState('');
  const [solutionIdea, setSolutionIdea] = useState('');
  const [solutionHowHelps, setSolutionHowHelps] = useState('');
  const [solutionImpact, setSolutionImpact] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // If a specific challenge is selected, show detail view
  const activeChallenge = selectedChallengeId ? getChallengeById(selectedChallengeId) : null;

  const handleOpenSubmitModal = () => {
    setSolutionTitle('');
    setSolutionIdea('');
    setSolutionHowHelps('');
    setSolutionImpact('');
    setSubmitSuccess(false);
    setIsModalOpen(true);
  };

  const handleSubmitSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChallenge) return;

    addSolution(activeChallenge.id, {
      title: solutionTitle,
      idea: solutionIdea,
      howItHelps: solutionHowHelps,
      expectedImpact: solutionImpact
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
    }, 1200);
  };

  // Quick autofill template
  const handleQuickFillSolution = () => {
    setSolutionTitle('Smart Sub-Sump Micro Detention Basins');
    setSolutionIdea(
      'Retrofit existing neighborhood road medians with perforated precast chambers that store peak 15-minute stormwater before releasing gradually.'
    );
    setSolutionHowHelps(
      'Absorbs localized downpours right at street level without digging up legacy utilities or widening pipes.'
    );
    setSolutionImpact(
      'Zero utility disruption; 50% flood volume reduction during heavy thunderstorms.'
    );
  };

  // ----------------------------------------------------
  // VIEW 1: Challenge Detail View
  // ----------------------------------------------------
  if (activeChallenge) {
    const solutionsList = getSolutionsForChallenge(activeChallenge.id);

    return (
      <div id="challenge-detail-view" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => onSelectChallenge(null)}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>All Civic Challenges</span>
        </button>

        {/* Challenge Overview Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Open Civic Challenge
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Building className="w-3.5 h-3.5 text-blue-700" />
                {activeChallenge.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {activeChallenge.location}
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeChallenge.title}
          </h1>

          {/* Problem description */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Problem Description
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeChallenge.problemDescription}
            </p>
          </div>

          {/* Why existing solutions are difficult */}
          <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Why conventional municipal solutions failed:</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              {activeChallenge.whyDifficult}
            </p>
          </div>
        </div>

        {/* Solutions Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Community Solutions</h2>
              <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {solutionsList.length} ideas
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by citizen votes. Top-voted ideas are reviewed for city pilots.
            </p>
          </div>

          {/* Suggest a Solution Button */}
          <button
            type="button"
            id="btn-suggest-solution-open"
            onClick={handleOpenSubmitModal}
            className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Suggest a Solution</span>
          </button>
        </div>

        {/* Ranked Solutions List (Highest likes strictly first) */}
        <div className="space-y-4">
          {solutionsList.map((sol, index) => {
            const isLiked = hasUserLiked(sol.id);
            const isTop1 = index === 0;

            return (
              <div
                key={sol.id}
                id={`solution-card-${sol.id}`}
                className={`bg-white rounded-xl border p-5 sm:p-6 transition-all shadow-xs ${
                  isTop1
                    ? 'border-blue-300 ring-1 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {isTop1 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <Trophy className="w-3.5 h-3.5 text-amber-600" />
                          <span>🏆 Most Supported</span>
                        </span>
                      )}

                      <span className="text-xs font-mono text-slate-400 font-bold">
                        #{index + 1}
                      </span>

                      {/* Status Badges */}
                      {sol.status === 'pilot' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Marked for Pilot
                        </span>
                      )}
                      {sol.status === 'shortlisted' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          Shortlisted
                        </span>
                      )}
                      {sol.status === 'expert_review' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                          Under Expert Review
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {sol.title}
                    </h3>

                    {/* Idea body */}
                    <div className="mt-3 space-y-2 text-xs text-slate-700">
                      <div>
                        <strong className="text-slate-900">Idea: </strong>
                        <span>{sol.idea}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">How it helps: </strong>
                        <span>{sol.howItHelps}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">Expected impact: </strong>
                        <span>{sol.expectedImpact}</span>
                      </div>
                    </div>

                    {/* Reviewer notes if any */}
                    {sol.reviewerNotes && (
                      <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600">
                        <strong className="text-blue-900 font-semibold">Govt Review: </strong>
                        <span>{sol.reviewerNotes}</span>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Proposed by <strong className="text-slate-700">{sol.author}</strong></span>
                      <span>Public Voting Open</span>
                    </div>
                  </div>

                  {/* Right: Like Button & Count (Dynamic) */}
                  <div className="sm:pl-4 sm:border-l sm:border-slate-100 flex sm:flex-col items-center justify-between sm:justify-center gap-2 shrink-0">
                    <button
                      type="button"
                      id={`btn-like-solution-${sol.id}`}
                      onClick={() => likeSolution(sol.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        isLiked
                          ? 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title={isLiked ? 'Click to remove support' : 'Click to support this solution'}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : ''}`} />
                      <span>{sol.likes}</span>
                    </button>
                    <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                      {isLiked ? 'Supported' : 'Support'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggest Solution Modal Form */}
        {isModalOpen && (
          <div
            id="modal-suggest-solution"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between mb-4 pr-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Suggest a Solution</h3>
                  <p className="text-xs text-slate-500">For: {activeChallenge.title}</p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFillSolution}
                  className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 hover:bg-blue-100"
                >
                  Auto-Fill
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">✓ Solution Submitted</h4>
                  <p className="text-xs text-slate-500">
                    Your idea is now live in the community solutions list and ready for citizen voting!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitSolution} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Solution Title *
                    </label>
                    <input
                      type="text"
                      id="input-solution-title"
                      value={solutionTitle}
                      onChange={(e) => setSolutionTitle(e.target.value)}
                      placeholder="e.g. Smart Sub-Sump Micro Detention Basins"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      What is your idea? *
                    </label>
                    <textarea
                      id="input-solution-idea"
                      rows={3}
                      value={solutionIdea}
                      onChange={(e) => setSolutionIdea(e.target.value)}
                      placeholder="Explain the core mechanism or method..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      How will it help? *
                    </label>
                    <textarea
                      id="input-solution-how-helps"
                      rows={2}
                      value={solutionHowHelps}
                      onChange={(e) => setSolutionHowHelps(e.target.value)}
                      placeholder="Why does this overcome previous constraints?"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Expected impact
                    </label>
                    <input
                      type="text"
                      id="input-solution-impact"
                      value={solutionImpact}
                      onChange={(e) => setSolutionImpact(e.target.value)}
                      placeholder="e.g. 50% flood volume reduction with zero utility clashes"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="btn-submit-solution"
                      className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      Submit Solution
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: Open Civic Challenges List
  // ----------------------------------------------------
  return (
    <div id="community-challenges-list" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
          Community Solutions
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Help solve problems that need new ideas.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          When standard government interventions reach technical or budgetary deadlocks, departments publish them as Open Civic Challenges. Vote on ideas or propose your own!
        </p>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            id={`challenge-card-${challenge.id}`}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-blue-700">{challenge.department}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {challenge.location}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {challenge.title}
              </h2>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {challenge.problemDescription}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {challenge.solutionsCount} solutions submitted
              </span>

              <button
                type="button"
                id={`btn-view-challenge-${challenge.id}`}
                onClick={() => onSelectChallenge(challenge.id)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                View Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Lightbulb, PlusCircle, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Innovation } from '../../types';

export const InnovationsView: React.FC = () => {
  const { innovations, addInnovation } = useCivic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInnovation({ title, problem, solution, expectedImpact });
    setSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccess(false);
      setTitle('');
      setProblem('');
      setSolution('');
      setExpectedImpact('');
    }, 1200);
  };

  const handleQuickFill = () => {
    setTitle('Solar-Powered Micro Hydrant Pressure Monitors');
    setProblem('Fire and municipal water lines suffer unmonitored pressure drops causing leaks to go undetected for weeks.');
    setSolution('Clamp-on acoustic vibration sensor with micro solar cell sending daily burst telemetry to ward water engineers.');
    setExpectedImpact('Detects underground pipe bursts 10 days earlier, saving 40,000L daily per ward.');
  };

  const getStatusBadge = (status: Innovation['status']) => {
    switch (status) {
      case 'under_review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Under Review</span>;
      case 'shortlisted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Shortlisted</span>;
      case 'pilot':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">Marked for Pilot</span>;
      case 'implemented':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">Implemented</span>;
    }
  };

  return (
    <div id="innovations-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Citizen Innovations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Community Ideas & Pilots
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Have a systemic solution for our city? Submit your proposal for municipal review.
          </p>
        </div>

        <button
          type="button"
          id="btn-open-submit-innovation"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Submit an Innovation</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {innovations.map((inn) => (
          <div
            key={inn.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-slate-400 font-semibold">{inn.id}</span>
              {getStatusBadge(inn.status)}
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">{inn.title}</h3>

            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">Problem: </strong>
                <span>{inn.problem}</span>
              </div>
              <div>
                <strong className="text-slate-900">Proposed Solution: </strong>
                <span>{inn.solution}</span>
              </div>
              <div>
                <strong className="text-slate-900">Expected Impact: </strong>
                <span>{inn.expectedImpact}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Submitted by <strong className="text-slate-700">{inn.author}</strong></span>
              <span>Open for Technical Evaluation</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mb-4 pr-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Submit an Innovation</h3>
                <p className="text-xs text-slate-500">Propose a systemic municipal idea</p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 hover:bg-blue-100"
              >
                Auto-Fill
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">✓ Innovation Submitted</h4>
                <p className="text-xs text-slate-500">
                  Your proposal has been routed to the Municipal Innovation Cell for review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Solar-Powered Water Level Telemetry Nodes"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Problem Identified *
                  </label>
                  <textarea
                    rows={2}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="What specific civic inefficiency or failure occurs?"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Proposed Solution *
                  </label>
                  <textarea
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Describe how the idea works..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Expected Impact
                  </label>
                  <input
                    type="text"
                    value={expectedImpact}
                    onChange={(e) => setExpectedImpact(e.target.value)}
                    placeholder="e.g. 15-minute advance flood warning, saves 40k liters daily"
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
                    className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Vote, CheckCircle2, Calendar, Building, Users } from 'lucide-react';

export const ConsultationsView: React.FC = () => {
  const { consultations, voteConsultation, getUserVote } = useCivic();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelect = (consultationId: string, optionKey: string) => {
    setSelectedOptions((prev) => ({ ...prev, [consultationId]: optionKey }));
  };

  const handleSubmit = (consultationId: string) => {
    const chosen = selectedOptions[consultationId];
    if (chosen) {
      voteConsultation(consultationId, chosen);
    }
  };

  return (
    <div id="consultations-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
          Public Consultations
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Have your say on city policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Direct civic democracy. Municipal leaders evaluate consultation votes before drafting urban policy.
        </p>
      </div>

      <div className="space-y-6">
        {consultations.map((con) => {
          const userVote = getUserVote(con.id);
          const currentSelection = selectedOptions[con.id] || userVote || '';

          return (
            <div
              key={con.id}
              id={`consultation-card-${con.id}`}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {con.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {con.department}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Deadline: {con.deadline}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {con.question}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {con.explanation}
              </p>

              {/* Poll Options / Results */}
              <div className="pt-2 space-y-2.5">
                {con.options.map((opt) => {
                  const percentage =
                    con.totalVotes > 0
                      ? Math.round((opt.votes / con.totalVotes) * 100)
                      : 0;
                  const isSelected = currentSelection === opt.key;
                  const isSubmittedVote = userVote === opt.key;

                  return (
                    <div
                      key={opt.key}
                      onClick={() => !userVote && handleSelect(con.id, opt.key)}
                      className={`relative overflow-hidden p-3 rounded-lg border transition-all ${
                        userVote
                          ? isSubmittedVote
                            ? 'border-blue-500 bg-blue-50/40'
                            : 'border-slate-200 bg-slate-50/50'
                          : isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs cursor-pointer'
                          : 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
                      }`}
                    >
                      {/* Percentage background progress bar when voted */}
                      {userVote && (
                        <div
                          className={`absolute top-0 bottom-0 left-0 opacity-15 pointer-events-none transition-all duration-500 ${
                            isSubmittedVote ? 'bg-blue-600' : 'bg-slate-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      )}

                      <div className="relative flex items-center justify-between z-10 text-xs">
                        <div className="flex items-center gap-2.5">
                          {!userVote ? (
                            <input
                              type="radio"
                              name={`consultation-${con.id}`}
                              checked={isSelected}
                              onChange={() => handleSelect(con.id, opt.key)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                          ) : (
                            isSubmittedVote && (
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            )
                          )}
                          <span
                            className={`font-medium ${
                              isSubmittedVote
                                ? 'font-bold text-blue-950'
                                : 'text-slate-800'
                            }`}
                          >
                            {opt.label}
                          </span>
                        </div>

                        {userVote && (
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-slate-400 text-[11px]">
                              {opt.votes} votes
                            </span>
                            <span className="font-bold text-slate-800 text-xs">
                              {percentage}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action / Results summary */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Total citizen votes: <strong className="text-slate-800">{con.totalVotes}</strong>
                  </span>
                </div>

                {!userVote ? (
                  <button
                    type="button"
                    id={`btn-submit-vote-${con.id}`}
                    onClick={() => handleSubmit(con.id)}
                    disabled={!currentSelection}
                    className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    Submit Response
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Response recorded</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

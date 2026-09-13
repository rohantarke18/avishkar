import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { ProblemStatus } from '../../types';
import {
  PlusCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter
} from 'lucide-react';

interface MyProblemsViewProps {
  onSelectProblem: (id: string) => void;
  onOpenReport: () => void;
}

export const MyProblemsView: React.FC<MyProblemsViewProps> = ({
  onSelectProblem,
  onOpenReport
}) => {
  const { problems } = useCivic();
  const [filter, setFilter] = useState<'all' | ProblemStatus>('all');

  const filteredProblems =
    filter === 'all' ? problems : problems.filter((p) => p.status === filter);

  const getStatusBadge = (status: ProblemStatus) => {
    switch (status) {
      case 'reported':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Reported</span>;
      case 'assigned':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">Assigned</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300">🟡 In Progress</span>;
      case 'resolution_pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-300">⚪ Verification Pending</span>;
      case 'resolved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">🟢 Resolved</span>;
      case 'reopened':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">Reopened</span>;
    }
  };

  return (
    <div id="my-problems-view" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Problems</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track real-time status and sign off on field resolutions
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenReport}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Problem</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {(
          [
            { key: 'all', label: 'All' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'resolution_pending', label: 'Action Required' },
            { key: 'resolved', label: 'Resolved' },
            { key: 'assigned', label: 'Assigned' }
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              filter === item.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            id={`problem-row-${problem.id}`}
            onClick={() => onSelectProblem(problem.id)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-500">
                  {problem.id}
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {problem.category}
                </span>
                {getStatusBadge(problem.status)}
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {problem.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{problem.location.address}</span>
              </div>
            </div>

            <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between gap-1">
              <div className="text-xs text-slate-500">
                {problem.assignedOfficer ? (
                  <span>Officer: <strong className="text-slate-800">{problem.assignedOfficer}</strong></span>
                ) : (
                  <span className="text-amber-700 font-medium">Pending assignment</span>
                )}
              </div>
              <div className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                <span>View Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

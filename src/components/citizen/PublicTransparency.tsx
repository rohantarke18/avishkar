import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { CheckCircle2, AlertTriangle, Lightbulb, Users, BarChart2 } from 'lucide-react';

export const PublicTransparency: React.FC = () => {
  const { stats, problems, challenges } = useCivic();

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  problems.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div id="public-transparency-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
          Public Transparency
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Open Civic Metrics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Real-time accountability data showing complaints resolved and active citizen co-creation.
        </p>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Problems Reported</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats.totalReported.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">100% geo-verified</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Problems Resolved</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {stats.totalResolved.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Citizen verified</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Open Challenges</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">
            {challenges.length}
          </div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">Community co-creation</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Community Ideas</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">
            {stats.totalIdeas.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Publicly supported</div>
        </div>
      </div>

      {/* Resolution Rate Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 text-sm">Overall City Resolution Rate</span>
          <span className="font-bold text-emerald-700 text-base">{stats.resolutionRate}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-700"
            style={{ width: `${stats.resolutionRate}%` }}
          />
        </div>
        <p className="text-xs text-slate-500">
          Average turnaround time from citizen report to verified fix: <strong>3.2 days</strong>
        </p>
      </div>

      {/* Categories Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Issues by Category</h2>
        <div className="space-y-2.5">
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const pct = Math.round((count / problems.length) * 100);
            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                  <span>{cat}</span>
                  <span className="font-mono text-slate-500">{count} issues ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-700 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Problem, ProblemStatus } from '../../types';
import {
  ShieldAlert,
  Building,
  Lightbulb,
  Users,
  FileBarChart,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
  X
} from 'lucide-react';

interface SuperAdminDashboardProps {
  onOpenProblemTracking?: (id: string) => void;
  onOpenChallengesReview?: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onOpenProblemTracking,
  onOpenChallengesReview
}) => {
  const { problems, challenges, departments, addDepartment, addChallenge, currentUser, stats } = useCivic();

  // Show only 5 requested tabs: Problems, Departments, Community Challenges, Users, Reports
  const [activeTab, setActiveTab] = useState<
    'problems' | 'departments' | 'challenges' | 'users' | 'reports'
  >('problems');

  // Modals state
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');

  const [showAddChallengeModal, setShowAddChallengeModal] = useState(false);
  const [newChallengeTitle, setNewChallengeTitle] = useState('');
  const [newChallengeDesc, setNewChallengeDesc] = useState('');
  const [newChallengeWhy, setNewChallengeWhy] = useState('');
  const [newChallengeDept, setNewChallengeDept] = useState(departments[0]?.name || 'Public Works Department (PWD)');
  const [newChallengeLoc, setNewChallengeLoc] = useState('');

  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim() || !newDeptHead.trim()) return;
    addDepartment({
      name: newDeptName.trim(),
      head: newDeptHead.trim(),
      activeProblems: 0,
      resolved: 0
    });
    triggerToast(`Department "${newDeptName.trim()}" registered successfully.`);
    setNewDeptName('');
    setNewDeptHead('');
    setShowAddDeptModal(false);
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChallengeTitle.trim() || !newChallengeDesc.trim() || !newChallengeLoc.trim()) return;
    addChallenge({
      title: newChallengeTitle.trim(),
      problemDescription: newChallengeDesc.trim(),
      whyDifficult: newChallengeWhy.trim() || 'Standard municipal engineering reached constraints. Open for community solutions.',
      department: newChallengeDept,
      location: newChallengeLoc.trim()
    });
    triggerToast(`Civic Challenge "${newChallengeTitle.trim()}" published for citizen solutions.`);
    setNewChallengeTitle('');
    setNewChallengeDesc('');
    setNewChallengeWhy('');
    setNewChallengeLoc('');
    setShowAddChallengeModal(false);
  };

  const registeredUsers = [
    { name: 'Aarav Mehta', role: 'Citizen', location: 'Ward 12, Chhatrapati Sambhajinagar', joined: 'Jan 2026' },
    { name: 'Rahul Sharma', role: 'Field Officer (Roads)', department: 'PWD', joined: 'Feb 2026' },
    { name: 'Sunita Patil', role: 'Department Admin', department: 'Water Supply', joined: 'Dec 2025' },
    { name: 'Suresh More', role: 'Field Officer (Sanitation)', department: 'Solid Waste', joined: 'Mar 2026' },
    { name: 'Dr. Anjali Sen', role: 'Citizen', location: 'College Road, Ward 4', joined: 'Apr 2026' }
  ];

  return (
    <div id="super-admin-dashboard" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Super Admin Console
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Manage CivicBridge</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            City-wide oversight and civic co-creation orchestration
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>Administrator: <strong className="text-slate-900">{currentUser.name}</strong></div>
          <div>Municipality: <strong className="text-slate-900">City Municipal Corporation</strong></div>
        </div>
      </div>

      {/* 5 Tabs: Problems | Departments | Community Challenges | Users | Reports */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-px">
        <button
          type="button"
          id="tab-super-problems"
          onClick={() => setActiveTab('problems')}
          className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'problems'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Problems ({problems.length})
        </button>

        <button
          type="button"
          id="tab-super-departments"
          onClick={() => setActiveTab('departments')}
          className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'departments'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Departments ({departments.length})
        </button>

        <button
          type="button"
          id="tab-super-challenges"
          onClick={() => setActiveTab('challenges')}
          className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'challenges'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Community Challenges ({challenges.length})
        </button>

        <button
          type="button"
          id="tab-super-users"
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'users'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Authorized Users ({registeredUsers.length})
        </button>

        <button
          type="button"
          id="tab-super-reports"
          onClick={() => setActiveTab('reports')}
          className={`pb-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'reports'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Reports & SLA
        </button>
      </div>

      {/* Tab 1: Problems */}
      {activeTab === 'problems' && (
        <div className="space-y-3">
          {problems.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-600">{p.id}</span>
                  <span className="font-bold text-blue-700">{p.department}</span>
                  <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium">
                    {p.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="font-semibold text-slate-900 text-sm">{p.title}</div>
                <div className="text-slate-500">{p.location.address}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Assigned</span>
                  <span className="font-medium text-slate-800">{p.assignedOfficer || 'Unassigned'}</span>
                </div>

                {onOpenProblemTracking && (
                  <button
                    type="button"
                    onClick={() => onOpenProblemTracking(p.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
                  >
                    View →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Departments */}
      {activeTab === 'departments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">Municipal Departments</h3>
              <p className="text-xs text-slate-500">Government departments and public utility authorities registered on CivicBridge.</p>
            </div>
            <button
              type="button"
              id="btn-super-add-department"
              onClick={() => setShowAddDeptModal(true)}
              className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id || dept.name}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Building className="w-5 h-5 text-blue-700" />
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active SLA
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{dept.name}</h3>
                <div className="text-xs text-slate-500">Nodal Head: {dept.head}</div>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Active</span>
                    <span className="font-bold text-slate-800">{dept.activeProblems}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Resolved</span>
                    <span className="font-bold text-emerald-700">{dept.resolved}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Community Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">City Civic Challenges</h3>
              <p className="text-xs text-slate-500">Post open urban problems for citizen co-creation and innovative proposals.</p>
            </div>
            <button
              type="button"
              id="btn-super-add-challenge"
              onClick={() => setShowAddChallengeModal(true)}
              className="px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Civic Challenge</span>
            </button>
          </div>

          <div className="space-y-3">
            {challenges.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700">{c.department}</span>
                    <span className="text-slate-400">📍 {c.location}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{c.title}</h3>
                  <p className="text-slate-600 line-clamp-2">{c.problemDescription}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                    {c.solutionsCount} Solutions
                  </span>

                  {onOpenChallengesReview && (
                    <button
                      type="button"
                      onClick={onOpenChallengesReview}
                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-xs transition-colors"
                    >
                      Review Ideas →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {registeredUsers.map((u, i) => (
            <div key={i} className="p-4 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                <div className="text-slate-500">{u.location || u.department}</div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-800">
                  {u.role}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">Joined {u.joined}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Reports & SLA */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Monthly City Operations Audit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Average Response Time</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">4.2 Hours</span>
              <span className="text-[10px] text-emerald-600 font-medium">92% within 24h SLA</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Citizen Verification Rate</span>
              <span className="text-xl font-bold text-emerald-700 mt-1 block">94.8%</span>
              <span className="text-[10px] text-slate-500">Problems signed off by citizen</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">Community Co-Creation</span>
              <span className="text-xl font-bold text-blue-700 mt-1 block">3 Active Pilots</span>
              <span className="text-[10px] text-blue-600 font-medium">Derived from citizen ideas</span>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{feedbackToast}</span>
        </div>
      )}

      {/* Modal: Add Department */}
      {showAddDeptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">Add Municipal Department</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddDeptModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDepartment} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Department Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Parks, Gardens & Urban Forestry"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Nodal Officer / In-Charge</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay Kulkarni (Chief Horticulturist)"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddDeptModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-xs"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Civic Challenge */}
      {showAddChallengeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Add City Civic Challenge</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddChallengeModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Post complex municipal challenges so citizens, architects, engineers, and college students can propose co-created solutions.
            </p>

            <form onSubmit={handleCreateChallenge} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Challenge Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Micro-Detention Basins for Ward 12 Flooding"
                  value={newChallengeTitle}
                  onChange={(e) => setNewChallengeTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Responsible Department</label>
                  <select
                    value={newChallengeDept}
                    onChange={(e) => setNewChallengeDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium bg-white"
                  >
                    {departments.map((d) => (
                      <option key={d.id || d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Target Location / Ward</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ward 12, West Zone"
                    value={newChallengeLoc}
                    onChange={(e) => setNewChallengeLoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Problem Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain the recurring physical or systemic issue..."
                  value={newChallengeDesc}
                  onChange={(e) => setNewChallengeDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">Why Conventional Approaches Failed (Constraints)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Underground utility cables prevent excavation; seasonal water surges overwhelm gravity storm lines..."
                  value={newChallengeWhy}
                  onChange={(e) => setNewChallengeWhy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddChallengeModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-xs"
                >
                  Publish Civic Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

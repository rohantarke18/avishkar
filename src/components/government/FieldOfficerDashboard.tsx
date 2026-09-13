import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Problem, ProblemStatus } from '../../types';
import {
  HardHat,
  Clock,
  MapPin,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  ChevronRight,
  Upload,
  X
} from 'lucide-react';

export const FieldOfficerDashboard: React.FC = () => {
  const { problems, currentUser, updateProblemStatus, uploadResolution } = useCivic();

  // Filter problems assigned to this field officer or unassigned
  const assignedProblems = problems.filter(
    (p) => !p.assignedOfficer || p.assignedOfficer.includes(currentUser.name) || p.assignedOfficer.includes('Rahul')
  );

  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);

  // Field Officer Action Modals
  const [modalMode, setModalMode] = useState<'status' | 'update' | 'resolution' | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatus>('in_progress');
  const [statusNote, setStatusNote] = useState('');
  const [fieldNote, setFieldNote] = useState('');

  // Resolution Upload form
  const [resolutionPhoto, setResolutionPhoto] = useState(
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
  );
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleOpenProblem = (problem: Problem) => {
    setActiveProblem(problem);
    setSelectedStatus(problem.status);
    setModalMode(null);
  };

  const handleApplyStatusChange = () => {
    if (!activeProblem) return;
    updateProblemStatus(
      activeProblem.id,
      selectedStatus,
      statusNote || `Field officer changed status to ${selectedStatus.replace('_', ' ')}.`
    );
    setModalMode(null);
    setStatusNote('');
    // Refresh activeProblem
    setActiveProblem((prev) => (prev ? { ...prev, status: selectedStatus } : null));
  };

  const handleAddUpdateNote = () => {
    if (!activeProblem || !fieldNote.trim()) return;
    updateProblemStatus(activeProblem.id, activeProblem.status, fieldNote);
    setModalMode(null);
    setFieldNote('');
  };

  const handleSubmitResolution = () => {
    if (!activeProblem) return;
    uploadResolution(
      activeProblem.id,
      resolutionPhoto,
      resolutionNotes || 'Field repairs completed. Site inspected and confirmed safe.'
    );
    setModalMode(null);
    setResolutionNotes('');
  };

  return (
    <div id="field-officer-dashboard" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Officer Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Field Officer Console
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Assigned Problems ({assignedProblems.length})
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Handle problems assigned to you on the ground.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>Officer: <strong className="text-slate-800">{currentUser.name}</strong></div>
          <div>Zone: <strong className="text-slate-800">{currentUser.ward || 'Central & West'}</strong></div>
        </div>
      </div>

      {/* Assigned Problems List */}
      <div className="space-y-3">
        {assignedProblems.map((prob) => {
          const isUrgent = prob.deadline?.toLowerCase().includes('today') || prob.urgency === 'urgent';
          const isTomorrow = prob.deadline?.toLowerCase().includes('tomorrow');

          return (
            <div
              key={prob.id}
              id={`officer-task-${prob.id}`}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {prob.id}
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {prob.category}
                  </span>

                  {/* Resolution Deadline with Time prominently displayed to field workers */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Resolution Deadline: <strong className="text-slate-900">{prob.deadline || 'Standard Municipal SLA'}</strong></span>
                  </div>

                  {isUrgent && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      🔴 Priority
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {prob.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{prob.location.address}</span>
                </div>
              </div>

              {/* Action Button: [ Open ] */}
              <button
                type="button"
                id={`btn-officer-open-${prob.id}`}
                onClick={() => handleOpenProblem(prob)}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto flex items-center gap-1.5"
              >
                <span>Open Task</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Problem Detail & Officer Actions Drawer/Modal */}
      {activeProblem && (
        <div
          id="modal-officer-problem"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setActiveProblem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">
                  {activeProblem.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                  Status: {activeProblem.status.replace('_', ' ')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {activeProblem.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">{activeProblem.description}</p>
            </div>

            {/* Assigned Resolution Target & Time Banner */}
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                    Assigned Resolution Target & Time
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {activeProblem.deadline || 'Standard Municipal SLA (48 Hours)'}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-900 bg-white/80 px-2.5 py-1 rounded-md border border-amber-200 self-start sm:self-auto">
                Officer Action Target
              </span>
            </div>

            {/* Location & Reported Info */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>{activeProblem.location.address}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                Lat: {activeProblem.location.lat.toFixed(4)}, Lng: {activeProblem.location.lng.toFixed(4)}
              </span>
            </div>

            {/* Photos */}
            {activeProblem.evidencePhotos?.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Citizen Evidence Photos:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeProblem.evidencePhotos.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Citizen evidence"
                      referrerPolicy="no-referrer"
                      className="w-24 h-20 object-cover rounded border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Existing Updates */}
            <div>
              <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                Recent Logs:
              </span>
              <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
                {activeProblem.timeline.slice(-3).map((tl) => (
                  <div key={tl.id} className="border-b border-slate-200/60 pb-1 last:border-0">
                    <span className="text-[10px] text-slate-400 font-mono mr-2">{tl.timestamp}</span>
                    <strong className="text-slate-800">{tl.author}: </strong>
                    <span>{tl.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Core Field Officer Actions requested in prompt:
                [ Update Status ]
                [ Add Update ]
                [ Upload Resolution ] */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Field Officer Actions
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="btn-officer-action-status"
                  onClick={() => setModalMode('status')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    modalMode === 'status'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Update Status
                </button>

                <button
                  type="button"
                  id="btn-officer-action-add-update"
                  onClick={() => setModalMode('update')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    modalMode === 'update'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Add Update
                </button>

                <button
                  type="button"
                  id="btn-officer-action-upload-resolution"
                  onClick={() => setModalMode('resolution')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                    modalMode === 'resolution'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Upload Resolution
                </button>
              </div>
            </div>

            {/* Sub-form 1: Update Status */}
            {modalMode === 'status' && (
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 space-y-3">
                <span className="text-xs font-bold text-blue-900 block">Select New Status:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['assigned', 'in_progress', 'resolution_pending'] as ProblemStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`p-2 rounded text-xs font-medium border ${
                        selectedStatus === st
                          ? 'bg-blue-700 text-white border-blue-700 font-bold'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Optional log note (e.g. dispatched crew with cold-mix asphalt)"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded border border-slate-300"
                />
                <button
                  type="button"
                  id="btn-confirm-officer-status"
                  onClick={handleApplyStatusChange}
                  className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs"
                >
                  Save Status
                </button>
              </div>
            )}

            {/* Sub-form 2: Add Update */}
            {modalMode === 'update' && (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Add Operational Field Note:</span>
                <textarea
                  rows={2}
                  value={fieldNote}
                  onChange={(e) => setFieldNote(e.target.value)}
                  placeholder="e.g. Hydraulic arm repaired. Electrical crew tested luminaire under load."
                  className="w-full px-3 py-2 text-xs bg-white rounded border border-slate-300"
                />
                <button
                  type="button"
                  id="btn-confirm-officer-note"
                  onClick={handleAddUpdateNote}
                  className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Post Note to Timeline
                </button>
              </div>
            )}

            {/* Sub-form 3: Upload Resolution */}
            {modalMode === 'resolution' && (
              <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">
                    Upload Resolution Proof for Citizen Verification:
                  </span>
                  <p className="text-[11px] text-emerald-800">
                    This marks the problem as "Resolution Pending" and notifies the citizen to verify.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={resolutionPhoto}
                    alt="Resolution preview"
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-cover rounded border border-emerald-300"
                  />
                  <div className="flex-1 text-xs">
                    <span className="text-slate-600 block mb-1">Select Verification Evidence:</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setResolutionPhoto(
                            'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
                          )
                        }
                        className="px-2 py-1 rounded bg-white border border-slate-200 text-[11px] hover:border-emerald-500"
                      >
                        Repaired Asphalt
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setResolutionPhoto(
                            'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80'
                          )
                        }
                        className="px-2 py-1 rounded bg-white border border-slate-200 text-[11px] hover:border-emerald-500"
                      >
                        Cleared Waste
                      </button>
                    </div>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Summary of repair work completed (e.g. Pothole filled with standard bituminous mix, roller compacted, road open for traffic)..."
                  className="w-full px-3 py-2 text-xs bg-white rounded border border-emerald-300"
                />

                <button
                  type="button"
                  id="btn-confirm-officer-resolution"
                  onClick={handleSubmitResolution}
                  className="w-full py-2.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                >
                  Submit Resolution for Citizen Sign-off
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

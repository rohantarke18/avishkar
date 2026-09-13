import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { LeafletMapPicker } from '../LeafletMapPicker';
import { ProblemCategory, ProblemLocation } from '../../types';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  FileImage,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ReportProblemFlowProps {
  onSuccessNavigateToTracking: (problemId: string) => void;
  onCancel: () => void;
}

export const ReportProblemFlow: React.FC<ReportProblemFlowProps> = ({
  onSuccessNavigateToTracking,
  onCancel
}) => {
  const { addProblem } = useCivic();

  // Step state (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Problem Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProblemCategory>('Roads');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  // Step 2: Location Form
  const [location, setLocation] = useState<ProblemLocation>({
    lat: 19.8762,
    lng: 75.3433,
    address: 'Waluj Road, Chhatrapati Sambhajinagar, Maharashtra',
    source: 'pin'
  });

  // Step 3: Evidence Photos
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
  ]);

  // Step 4: Submission & Success State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProblemId, setCreatedProblemId] = useState<string | null>(null);

  const categories: ProblemCategory[] = [
    'Roads',
    'Water',
    'Garbage',
    'Streetlights',
    'Drainage',
    'Public Safety',
    'Other'
  ];

  // Demo sample photos for quick 1-click pitch demonstration
  const sampleEvidencePhotos = [
    {
      label: 'Pothole',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Overflowing Waste',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Water Leak',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Broken Streetlight',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotos((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSamplePhoto = (url: string) => {
    if (!photos.includes(url)) {
      setPhotos((prev) => [...prev, url]);
    }
  };

  // Preset quick fill for pitch demo
  const handleQuickFillDemo = () => {
    setTitle('Pothole near college gate');
    setDescription(
      'Deep 8-inch road crater directly outside the college entrance. Causing traffic bottlenecks and water accumulation.'
    );
    setCategory('Roads');
    setUrgency('urgent');
    setLocation({
      lat: 19.8762,
      lng: 75.3433,
      address: 'Waluj Road, Opp. Engineering College Gate, Chhatrapati Sambhajinagar, Maharashtra',
      source: 'pin'
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newProb = addProblem({
        title: title || 'Reported Civic Issue',
        description: description || 'No detailed description provided.',
        category,
        location,
        evidencePhotos: photos,
        urgency
      });

      setCreatedProblemId(newProb.id);
      setIsSubmitting(false);
    }, 600);
  };

  // SUCCESS STATE (Rendered after submission)
  if (createdProblemId) {
    return (
      <div id="report-success-state" className="max-w-xl mx-auto px-4 py-12 text-center animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            ✓ Problem Reported
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Your complaint has been submitted to the municipal authority.
          </p>

          {/* Generated Demo Problem ID */}
          <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Complaint Tracking ID
            </div>
            <div className="text-2xl font-extrabold font-mono text-blue-700 mt-1">
              {createdProblemId}
            </div>
            <div className="text-xs text-slate-500 mt-1.5 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-xs">{location.address}</span>
            </div>
          </div>

          {/* Track Problem Button */}
          <div className="space-y-3">
            <button
              type="button"
              id="btn-track-submitted-problem"
              onClick={() => onSuccessNavigateToTracking(createdProblemId)}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Track Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Return to Citizen Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="report-problem-container" className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb & Pitch Quick-Fill */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </button>

        <button
          type="button"
          onClick={handleQuickFillDemo}
          className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium border border-blue-200 transition-colors"
          title="Auto-fill with realistic demo problem for rapid pitching"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pitch Auto-Fill</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Step Progress Bar */}
        <div className="border-b border-slate-200 bg-slate-50/60 px-6 py-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Step {currentStep} of 4</span>
            <span className="text-blue-700 uppercase tracking-wider">
              {currentStep === 1 && '1. Problem Details'}
              {currentStep === 2 && '2. Verified Location'}
              {currentStep === 3 && '3. Evidence Photos'}
              {currentStep === 4 && '4. Review & Submit'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`h-1.5 rounded-full transition-all ${
                  stepNum <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Problem Title, Description, Category */}
          {currentStep === 1 && (
            <div id="report-step-1" className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-slate-900">1. Problem Details</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Describe what needs attention in your neighborhood
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Problem Title *
                </label>
                <input
                  type="text"
                  id="input-problem-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pothole near college gate"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      id={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                        category === cat
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description *
                </label>
                <textarea
                  id="input-problem-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide specific details such as depth, safety hazards, or duration of the issue..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Urgency Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'urgent'] as const).map((urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setUrgency(urg)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium capitalize border transition-all ${
                        urgency === urg
                          ? urg === 'urgent'
                            ? 'bg-rose-50 border-rose-600 text-rose-900 font-bold'
                            : 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Location with Leaflet + OpenStreetMap */}
          {currentStep === 2 && (
            <div id="report-step-2" className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-slate-900">2. Incident Location</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Use device GPS or drag the pin. The address is automatically detected.
                </p>
              </div>

              {/* Real Leaflet Map Picker */}
              <LeafletMapPicker location={location} onChange={setLocation} />
            </div>
          )}

          {/* STEP 3: Evidence Photos */}
          {currentStep === 3 && (
            <div id="report-step-3" className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-slate-900">3. Evidence</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload on-site photos to help officers identify and dispatch repair crews
                </p>
              </div>

              {/* Upload Drop Area */}
              <label
                id="dropzone-evidence-photos"
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors"
              >
                <Upload className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-semibold text-slate-800">
                  + Add Photo
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Drag & drop files or click to upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Demo Sample Photos Selector for Fast Pitching */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-600 block mb-2">
                  Or select sample demo photos for fast pitching:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sampleEvidencePhotos.map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => handleAddSamplePhoto(sample.url)}
                      className="p-2 rounded-lg border border-slate-200 hover:border-blue-400 bg-white text-left transition-all group"
                    >
                      <img
                        src={sample.url}
                        alt={sample.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-16 object-cover rounded mb-1.5"
                      />
                      <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-700">
                        + {sample.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Uploaded Photos Preview List */}
              {photos.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Attached Evidence ({photos.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photos.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-lg overflow-hidden border border-slate-200 group bg-slate-100"
                      >
                        <img
                          src={url}
                          alt={`Evidence ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review Problem, Location, Evidence */}
          {currentStep === 4 && (
            <div id="report-step-4" className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-slate-900">4. Review & Confirm</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm the details before submitting to the department
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
                {/* Problem Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      {category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                      Urgency: {urgency}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {title || 'Pothole near college gate'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {description || 'Deep 8-inch pothole outside college gate causing traffic safety risks.'}
                  </p>
                </div>

                {/* Location Info */}
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    📍 Verified Location
                  </span>
                  <div className="text-xs text-slate-800 font-medium bg-white p-2.5 rounded border border-slate-200">
                    {location.address}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)} ({location.source === 'gps' ? 'Device GPS' : 'Map Pin'})
                  </div>
                </div>

                {/* Evidence Info */}
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Attached Photos ({photos.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt="Evidence"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-md border border-slate-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls between steps */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                id="btn-report-prev-step"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                id="btn-report-next-step"
                onClick={() => {
                  if (currentStep === 1 && !title.trim()) {
                    setTitle('Pothole near college gate');
                    if (!description) {
                      setDescription('Deep crater reported on Waluj Road creating traffic hazard.');
                    }
                  }
                  setCurrentStep((prev) => prev + 1);
                }}
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-submit-problem"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold transition-all shadow-md flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Problem</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

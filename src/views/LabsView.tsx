import React, { useState } from 'react';
import { Lab, Student, Course, Batch, LabIdentifier } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  Cpu, 
  Users, 
  BookOpen, 
  CalendarRange, 
  UserCheck, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Monitor, 
  Sparkles,
  X,
  Plus
} from 'lucide-react';

interface LabsViewProps {
  labs: Lab[];
  students: Student[];
  courses: Course[];
  batches: Batch[];
  onUpdateLab: (lab: Lab) => void;
  onNavigateToStudentsWithLabFilter: (labId: LabIdentifier) => void;
}

export const LabsView: React.FC<LabsViewProps> = ({
  labs,
  students,
  courses,
  batches,
  onUpdateLab,
  onNavigateToStudentsWithLabFilter
}) => {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['ADMIN']);

  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCoordinator, setFormCoordinator] = useState('');
  const [formStatus, setFormStatus] = useState<Lab['status']>('Operational');
  const [formSpecs, setFormSpecs] = useState('');
  const [formRoom, setFormRoom] = useState('');

  const openEditModal = (lab: Lab) => {
    setEditingLab(lab);
    setFormName(lab.name);
    setFormDescription(lab.description);
    setFormCoordinator(lab.assignedCoordinator);
    setFormStatus(lab.status);
    setFormSpecs(lab.specifications);
    setFormRoom(lab.roomNumber);
  };

  const handleSaveLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLab) return;

    const updated: Lab = {
      ...editingLab,
      name: formName.trim(),
      description: formDescription.trim(),
      assignedCoordinator: formCoordinator.trim(),
      status: formStatus,
      specifications: formSpecs.trim(),
      roomNumber: formRoom.trim()
    };

    onUpdateLab(updated);
    setEditingLab(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Dedicated Lab Management System
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              2 Labs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Freelancing Lab (Freelancing & IT Skills) & Artificial Intelligence Lab (2 Dedicated Labs)
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <Monitor className="w-4 h-4 text-emerald-600" />
          <span>Total Workstation Capacity: {labs.reduce((acc, l) => acc + l.workstationsCount, 0)} Workstations</span>
        </div>
      </div>

      {/* The 2 Labs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((lab) => {
          const assignedStudents = students.filter(s => s.assignedLab === lab.id);
          const studentCount = assignedStudents.length;
          const capacityPercent = Math.min(100, Math.round((studentCount / lab.workstationsCount) * 100));
          const labCourses = courses.filter(c => c.assignedLab === lab.id);
          const labBatches = batches.filter(b => b.assignedLab === lab.id);

          return (
            <div
              key={lab.id}
              className={`bg-white rounded-2xl border shadow-xs transition-all hover:shadow-md flex flex-col justify-between overflow-hidden ${
                lab.id === 'Artificial Intelligence Lab'
                  ? 'border-purple-200 ring-1 ring-purple-100'
                  : 'border-slate-200/80'
              }`}
            >
              {/* Lab Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-white">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      lab.id === 'Artificial Intelligence Lab'
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {lab.id}
                    </span>

                    <span className="text-xs text-slate-500 font-semibold">
                      {lab.roomNumber}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      lab.status === 'Operational'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      ● {lab.status}
                    </span>

                    {isAdmin && (
                      <button
                        onClick={() => openEditModal(lab)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Lab Information"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {lab.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {lab.description}
                </p>
              </div>

              {/* Lab Hardware & Capacity Telemetry */}
              <div className="px-5 sm:px-6 py-4 bg-slate-50/60 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Workstations Allocation</span>
                  </span>
                  <span className="font-bold text-slate-900 font-mono-num">
                    {studentCount} / {lab.workstationsCount} seats ({capacityPercent}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      lab.id === 'Artificial Intelligence Lab'
                        ? 'bg-purple-600'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-500 font-mono pt-1">
                  <strong className="text-slate-700">Hardware:</strong> {lab.specifications}
                </div>
              </div>

              {/* Middle: Assigned Courses & Batches */}
              <div className="p-5 sm:p-6 space-y-3.5 text-xs flex-1">
                {/* Courses */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Assigned Courses ({labCourses.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {labCourses.map(c => (
                      <span
                        key={c.id}
                        className="px-2 py-1 bg-slate-100 rounded-lg text-slate-800 font-medium text-[11px] border border-slate-200/80"
                      >
                        {c.name}
                      </span>
                    ))}
                    {labCourses.length === 0 && (
                      <span className="text-slate-400 italic">No courses currently assigned</span>
                    )}
                  </div>
                </div>

                {/* Batches */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Running & Upcoming Batches ({labBatches.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {labBatches.map(b => (
                      <span
                        key={b.id}
                        className="px-2 py-1 bg-emerald-50 rounded-lg text-emerald-800 font-medium text-[11px] border border-emerald-100"
                      >
                        {b.batchName} ({b.scheduleTime.split('(')[0]})
                      </span>
                    ))}
                    {labBatches.length === 0 && (
                      <span className="text-slate-400 italic">No batches currently assigned</span>
                    )}
                  </div>
                </div>

                {/* Coordinator */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Assigned Coordinator:</span>
                  <span className="font-bold text-slate-900">{lab.assignedCoordinator}</span>
                </div>
              </div>

              {/* Lab Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {studentCount} Students Currently Enrolled
                </span>

                <button
                  onClick={() => onNavigateToStudentsWithLabFilter(lab.id)}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center space-x-1"
                >
                  <span>View Lab Students →</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Lab Modal */}
      {editingLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">{editingLab.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">Edit Lab Information</h3>
              </div>
              <button onClick={() => setEditingLab(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLab} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Official Lab Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Description & Purpose
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Room Identification
                  </label>
                  <input
                    type="text"
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Operating Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Assigned Lead Coordinator
                </label>
                <input
                  type="text"
                  value={formCoordinator}
                  onChange={(e) => setFormCoordinator(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Workstation Specifications
                </label>
                <textarea
                  rows={2}
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingLab(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Save Lab Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Batch, Student, Course, Coordinator, LabIdentifier, BatchStatus } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  CalendarRange, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Eye, 
  X,
  UserCheck
} from 'lucide-react';

interface BatchesViewProps {
  batches: Batch[];
  students: Student[];
  courses: Course[];
  coordinators: Coordinator[];
  onAddBatch: (batch: Batch) => void;
  onUpdateBatch: (batch: Batch) => void;
  onDeleteBatchRequest: (batch: Batch) => void;
}

export const BatchesView: React.FC<BatchesViewProps> = ({
  batches,
  students,
  courses,
  coordinators,
  onAddBatch,
  onUpdateBatch,
  onDeleteBatchRequest
}) => {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['ADMIN']);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [inspectBatch, setInspectBatch] = useState<Batch | null>(null);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formNumber, setFormNumber] = useState('Batch 01');
  const [formCourseId, setFormCourseId] = useState('');
  const [formLab, setFormLab] = useState<LabIdentifier>('Freelancing Lab');
  const [formCoordinator, setFormCoordinator] = useState('sajib sheikh');
  const [formStartDate, setFormStartDate] = useState('2026-05-01');
  const [formEndDate, setFormEndDate] = useState('2026-08-01');
  const [formSchedule, setFormSchedule] = useState('09:00 AM - 01:00 PM (Sat - Thu)');
  const [formStatus, setFormStatus] = useState<BatchStatus>('Running');
  const [formCapacity, setFormCapacity] = useState('30');
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setFormId(`BATCH-SRJ-${Date.now().toString().slice(-4)}`);
    setFormName('');
    setFormNumber(`Batch 0${batches.length + 1}`);
    setFormCourseId(courses[0]?.id || '');
    setFormLab(courses[0]?.assignedLab || 'Freelancing Lab');
    setFormCoordinator(coordinators[0]?.fullName || 'sajib sheikh');
    setFormStartDate(new Date().toISOString().split('T')[0]);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    setFormEndDate(endDate.toISOString().split('T')[0]);
    setFormSchedule('09:00 AM - 01:00 PM (Sat - Thu)');
    setFormStatus('Running');
    setFormCapacity('30');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (batch: Batch) => {
    setEditingBatch(batch);
    setFormId(batch.id);
    setFormName(batch.batchName);
    setFormNumber(batch.batchNumber);
    setFormCourseId(batch.courseId);
    setFormLab(batch.assignedLab);
    setFormCoordinator(batch.coordinatorName);
    setFormStartDate(batch.startDate);
    setFormEndDate(batch.endDate);
    setFormSchedule(batch.scheduleTime);
    setFormStatus(batch.status);
    setFormCapacity(batch.maxCapacity.toString());
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Batch Name is required.');
      return;
    }

    const courseObj = courses.find(c => c.id === formCourseId) || courses[0];

    const batchData: Batch = {
      id: formId.trim(),
      batchName: formName.trim(),
      batchNumber: formNumber.trim(),
      courseId: courseObj.id,
      courseName: courseObj.name,
      assignedLab: formLab,
      coordinatorName: formCoordinator.trim(),
      startDate: formStartDate,
      endDate: formEndDate,
      scheduleTime: formSchedule.trim(),
      status: formStatus,
      maxCapacity: parseInt(formCapacity, 10) || 30
    };

    try {
      if (editingBatch) {
        onUpdateBatch(batchData);
        setEditingBatch(null);
      } else {
        onAddBatch(batchData);
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred.');
    }
  };

  const filteredBatches = batches.filter(b => {
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Batch Management & Schedules</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {batches.length} Batches Total
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total 9 Training Cohorts: 7 Freelancing Batches (Freelancing Lab) &amp; 2 AI Batches (Artificial Intelligence Lab)
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        {['ALL', 'Running', 'Upcoming', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === status
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {status === 'ALL' ? 'All Batches' : `${status} Batches`}
          </button>
        ))}
      </div>

      {/* Batches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const batchStudents = students.filter(s => s.batchId === batch.id || s.batchName === batch.batchName);
          const studentCount = batchStudents.length;

          return (
            <div
              key={batch.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                    {batch.id}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    batch.status === 'Running'
                      ? 'bg-emerald-100 text-emerald-800'
                      : batch.status === 'Upcoming'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {batch.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {batch.batchName}
                </h3>

                <div className="text-xs font-medium text-emerald-700">
                  Course: {batch.courseName}
                </div>
              </div>

              {/* Meta details */}
              <div className="p-5 space-y-2.5 bg-slate-50/50 flex-1 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-slate-500">
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assigned Lab:</span>
                  </span>
                  <span className="font-bold text-slate-900">{batch.assignedLab}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Class Timing:</span>
                  </span>
                  <span className="font-medium text-slate-800 truncate max-w-[170px]">{batch.scheduleTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Timeline:</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-700">{batch.startDate} → {batch.endDate}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500">Coordinator:</span>
                  <span className="font-bold text-slate-900">{batch.coordinatorName}</span>
                </div>

                {/* Enrollment Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Enrolled Students</span>
                    <span className="font-bold text-slate-900 font-mono-num">{studentCount} / {batch.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (studentCount / batch.maxCapacity) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setInspectBatch(batch)}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Student Roster</span>
                </button>

                {isAdmin && (
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => openEditModal(batch)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Edit Batch"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteBatchRequest(batch)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete Batch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Batch Student Roster Modal */}
      {inspectBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{inspectBatch.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{inspectBatch.batchName} Roster</h3>
                <p className="text-xs text-slate-400">{inspectBatch.courseName} • {inspectBatch.assignedLab}</p>
              </div>
              <button onClick={() => setInspectBatch(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {(() => {
                const roster = students.filter(s => s.batchId === inspectBatch.id || s.batchName === inspectBatch.batchName);
                if (roster.length === 0) {
                  return (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No students are currently enrolled in this batch.
                    </div>
                  );
                }
                return (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="pb-2">Student ID</th>
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Phone</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2 text-right">Earnings ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {roster.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-mono font-bold text-slate-900">{s.id}</td>
                          <td className="py-2.5 font-semibold text-slate-800">{s.fullName}</td>
                          <td className="py-2.5 text-slate-500">{s.phone}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                              {s.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-right font-mono font-bold text-emerald-600">
                            ${s.freelancingEarningsUSD || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setInspectBatch(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Batch Modal */}
      {(isAddModalOpen || editingBatch) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingBatch ? `Edit Batch: ${editingBatch.batchName}` : 'Create New Training Batch'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sirajganj Center Batch Allocation
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingBatch(null);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 font-medium rounded-xl">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Batch ID *</label>
                  <input
                    type="text"
                    required
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 font-mono text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Batch Number *</label>
                  <input
                    type="text"
                    required
                    value={formNumber}
                    onChange={(e) => setFormNumber(e.target.value)}
                    placeholder="Batch 01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. WDD Batch 01 (Morning)"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Associated Course *</label>
                  <select
                    value={formCourseId}
                    onChange={(e) => {
                      const cId = e.target.value;
                      setFormCourseId(cId);
                      const crs = courses.find(c => c.id === cId);
                      if (crs) setFormLab(crs.assignedLab);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Assigned Lab (2 Labs) *</label>
                  <select
                    value={formLab}
                    onChange={(e) => setFormLab(e.target.value as LabIdentifier)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 font-bold text-emerald-800 px-3 py-2 rounded-xl outline-none"
                  >
                    <option value="Freelancing Lab">Freelancing Lab (Freelancing & IT Skills - 75 Seats)</option>
                    <option value="Artificial Intelligence Lab">Artificial Intelligence Lab (25 Seats)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Assigned Coordinator *</label>
                  <select
                    value={formCoordinator}
                    onChange={(e) => setFormCoordinator(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    {coordinators.map(c => (
                      <option key={c.id} value={c.fullName}>{c.fullName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Max Capacity (Seats)</label>
                  <input
                    type="number"
                    value={formCapacity}
                    onChange={(e) => setFormCapacity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Class Schedule & Timings *</label>
                <input
                  type="text"
                  required
                  value={formSchedule}
                  onChange={(e) => setFormSchedule(e.target.value)}
                  placeholder="09:00 AM - 01:00 PM (Sat - Thu)"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-2 py-2 rounded-xl outline-none text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formEndDate}
                    onChange={(e) => setFormEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-2 py-2 rounded-xl outline-none text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Batch Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as BatchStatus)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-2 py-2 rounded-xl outline-none"
                  >
                    <option value="Running">Running</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingBatch(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  {editingBatch ? 'Save Batch Changes' : 'Create Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

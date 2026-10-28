import React, { useState } from 'react';
import { Coordinator, Student, LabIdentifier } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Search,
  CheckCircle2,
  X,
  FileSpreadsheet,
  LayoutGrid,
  ShieldCheck,
  Building2,
  Award,
  Users
} from 'lucide-react';

interface CoordinatorsViewProps {
  coordinators: Coordinator[];
  students: Student[];
  onAddCoordinator: (coord: Coordinator) => void;
  onUpdateCoordinator: (coord: Coordinator) => void;
  onDeleteCoordinatorRequest: (coord: Coordinator) => void;
}

export const CoordinatorsView: React.FC<CoordinatorsViewProps> = ({
  coordinators,
  students,
  onAddCoordinator,
  onUpdateCoordinator,
  onDeleteCoordinatorRequest
}) => {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['ADMIN']);

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [editingCoordinator, setEditingCoordinator] = useState<Coordinator | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formDesignation, setFormDesignation] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLab, setFormLab] = useState<LabIdentifier>('Freelancing Lab');
  const [formCourse, setFormCourse] = useState('Web Design and Development');
  const [formBatch, setFormBatch] = useState('7th Batch');
  const [formStatus, setFormStatus] = useState<'Active' | 'On Leave'>('Active');
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setFormId(`STAFF-SRJ-${(coordinators.length + 1).toString().padStart(2, '0')}`);
    setFormName('');
    setFormDesignation('Trainer');
    setFormPhone('+880 17');
    setFormEmail('@elearning.sirajganj.gov.bd');
    setFormLab('Freelancing Lab');
    setFormCourse('Freelancing & Technical Training');
    setFormBatch('7th Batch');
    setFormStatus('Active');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (c: Coordinator) => {
    setEditingCoordinator(c);
    setFormId(c.id);
    setFormName(c.fullName);
    setFormDesignation(c.designation);
    setFormPhone(c.phone);
    setFormEmail(c.email);
    setFormLab(c.assignedLab);
    setFormCourse(c.assignedCourse);
    setFormBatch(c.assignedBatch);
    setFormStatus(c.status);
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Full Name is required.');
      return;
    }

    const coordData: Coordinator = {
      id: formId.trim(),
      fullName: formName.trim(),
      designation: formDesignation.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
      assignedLab: formLab,
      assignedCourse: formCourse.trim(),
      assignedBatch: formBatch.trim(),
      status: formStatus,
      joinedDate: editingCoordinator ? editingCoordinator.joinedDate : new Date().toISOString().split('T')[0]
    };

    try {
      if (editingCoordinator) {
        onUpdateCoordinator(coordData);
        setEditingCoordinator(null);
      } else {
        onAddCoordinator(coordData);
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred.');
    }
  };

  const filteredCoordinators = coordinators.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.fullName.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchDesignation = c.designation.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchDesignation && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Branch Coordinators Directory</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {coordinators.length} Coordinators
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            1 E-Learning and Earning Coordinator (sajib sheikh) &amp; 1 AI Coordinator (kamal bhuban) — Sirajganj Center
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Sheet Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={openAddModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, designation, phone..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* View 1: Employee Attendance Sheet Table (Matching the User's Screenshot) */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs uppercase tracking-wider">
                Employee Attendance & Staff Register • Sirajganj Center
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Total Staff: {filteredCoordinators.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase text-[11px] tracking-wider select-none">
                <tr>
                  <th className="py-3 px-4 w-14 text-center border-r border-slate-200 bg-slate-100/70">SI</th>
                  <th className="py-3 px-4 border-r border-slate-200">Name of Employees</th>
                  <th className="py-3 px-4 border-r border-slate-200">Designation</th>
                  <th className="py-3 px-4 border-r border-slate-200">Phone / Contact</th>
                  <th className="py-3 px-4 border-r border-slate-200">Email Address</th>
                  <th className="py-3 px-4 border-r border-slate-200">Status</th>
                  {isAdmin && <th className="py-3 px-4 text-right">Actions</th>}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredCoordinators.map((c, index) => (
                  <tr key={c.id} className="hover:bg-emerald-50/40 transition-colors">
                    {/* SI */}
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700 border-r border-slate-200 bg-slate-50/50">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 border-r border-slate-200">
                      <div className="font-bold text-slate-900 text-sm">
                        {c.fullName}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {c.id}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="py-3.5 px-4 border-r border-slate-200">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200/80">
                        {c.designation}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600 border-r border-slate-200 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.email}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 border-r border-slate-200 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    {/* Admin actions */}
                    {isAdmin && (
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => openEditModal(c)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Edit Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCoordinatorRequest(c)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Remove Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Coordinators Cards Grid */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCoordinators.map((coordinator, idx) => {
            return (
              <div
                key={coordinator.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 border-b border-slate-100 text-center relative">
                  {/* SI Number Badge */}
                  <span className="absolute top-4 left-4 text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    SI #{idx + 1}
                  </span>

                  {/* Status badge */}
                  <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    coordinator.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {coordinator.status}
                  </span>

                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md border-2 border-emerald-500/20 mb-3 mt-4">
                    {coordinator.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <span className="font-mono text-[10px] text-slate-400 font-bold block uppercase">
                    {coordinator.id}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {coordinator.fullName}
                  </h3>

                  <p className="text-xs text-emerald-700 font-bold mt-1 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                    {coordinator.designation}
                  </p>
                </div>

                {/* Coordinator Metadata */}
                <div className="p-4 space-y-2.5 bg-slate-50/50 flex-1 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{coordinator.email}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{coordinator.phone}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-bold text-slate-800">
                      {coordinator.assignedCourse}
                    </span>
                  </div>
                </div>

                {/* Admin actions */}
                {isAdmin && (
                  <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openEditModal(coordinator)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Edit Coordinator"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCoordinatorRequest(coordinator)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Remove Coordinator"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Coordinator Modal */}
      {(isAddModalOpen || editingCoordinator) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingCoordinator ? 'Edit Employee / Teacher' : 'Add Employee / Teacher'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCoordinator(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. sajib sheikh"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Designation *
                </label>
                <input
                  type="text"
                  required
                  value={formDesignation}
                  onChange={(e) => setFormDesignation(e.target.value)}
                  placeholder="e.g. Co-ordinator, Lead Trainer, Ai Trainer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as 'Active' | 'On Leave')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCoordinator(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
                >
                  {editingCoordinator ? 'Save Changes' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

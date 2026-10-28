import React, { useState, useMemo } from 'react';
import { 
  Student, 
  Course, 
  Batch, 
  Lab, 
  Coordinator, 
  StudentStatus, 
  LabIdentifier,
  StudentDivision
} from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  UserPlus, 
  Sparkles,
  GraduationCap,
  Users,
  Bot,
  Layers,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  courses: Course[];
  batches: Batch[];
  labs: Lab[];
  coordinators: Coordinator[];
  onAddStudent: (student: Omit<Student, 'id'> & { customId?: string }) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudentRequest: (student: Student) => void;
  onExportCSV: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  courses,
  batches,
  labs,
  coordinators,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudentRequest,
  onExportCSV
}) => {
  const { hasRole } = useAuth();
  const { t } = useLanguage();
  const isAdmin = hasRole(['ADMIN']);

  // Division Filter: strictly "Students" and "AI Lab Students" (no Lab-A, Lab-B, Lab-C split)
  const [activeDivision, setActiveDivision] = useState<'Students' | 'AI Lab Students' | 'ALL'>('Students');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState<'id' | 'fullName' | 'registrationDate' | 'courseName'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Modals
  const [inspectStudent, setInspectStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formDivision, setFormDivision] = useState<StudentDivision>('Students');
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formGender, setFormGender] = useState<'Male' | 'Female'>('Male');
  const [formFatherName, setFormFatherName] = useState('');
  const [formMotherName, setFormMotherName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('017');
  const [formCourseId, setFormCourseId] = useState('');
  const [formBatchId, setFormBatchId] = useState('');
  const [formCoordinatorId, setFormCoordinatorId] = useState('');
  const [formStatus, setFormStatus] = useState<StudentStatus>('Active');
  const [formUpazila, setFormUpazila] = useState('Sirajganj Sadar');
  const [formNid, setFormNid] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const regularStudentsCount = students.filter(
    s => s.division === 'Students' || (s.assignedLab !== 'Artificial Intelligence Lab' && s.assignedLab !== 'AI Lab' && !s.id.startsWith('AI-'))
  ).length;

  const aiLabStudentsCount = students.filter(
    s => s.division === 'AI Lab Students' || s.assignedLab === 'Artificial Intelligence Lab' || s.assignedLab === 'AI Lab' || s.id.startsWith('AI-')
  ).length;

  const openAddModal = (initialDiv: StudentDivision = activeDivision === 'AI Lab Students' ? 'AI Lab Students' : 'Students') => {
    setFormDivision(initialDiv);
    const count = initialDiv === 'AI Lab Students' ? aiLabStudentsCount + 1 : regularStudentsCount + 1;
    setFormId(initialDiv === 'AI Lab Students' ? `AI-SRJ-${count.toString().padStart(2, '0')}` : `DYD64-E35B7G1-${count.toString().padStart(2, '0')}`);
    setFormName('');
    setFormGender('Male');
    setFormFatherName('');
    setFormMotherName('');
    setFormEmail('');
    setFormPhone('017');
    setFormNid('');
    setFormStatus('Active');
    setFormUpazila('Sirajganj Sadar');

    if (initialDiv === 'AI Lab Students') {
      const aiCourse = courses.find(c => c.name.includes('Artificial Intelligence') || c.id === 'CRS-AI-02') || courses[0];
      setFormCourseId(aiCourse?.id || '');
      setFormBatchId(batches.find(b => b.assignedLab === 'Artificial Intelligence Lab' || b.assignedLab === 'AI Lab')?.id || batches[0]?.id || '');
      const aiCoord = coordinators.find(c => c.fullName.toLowerCase().includes('kamal') || c.designation.toLowerCase().includes('ai')) || coordinators[0];
      setFormCoordinatorId(aiCoord?.id || '');
    } else {
      const flCourse = courses.find(c => c.name.toLowerCase().includes('freelanc') || c.id === 'CRS-FL-01') || courses[0];
      setFormCourseId(flCourse?.id || '');
      setFormBatchId(batches[0]?.id || '');
      setFormCoordinatorId(coordinators[0]?.id || '');
    }

    setFormError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    const isAi = student.division === 'AI Lab Students' || student.assignedLab === 'Artificial Intelligence Lab' || student.assignedLab === 'AI Lab' || student.id.startsWith('AI-');
    setFormDivision(isAi ? 'AI Lab Students' : 'Students');
    setFormId(student.id);
    setFormName(student.fullName);
    setFormGender((student.gender as 'Male' | 'Female') || 'Male');
    setFormFatherName(student.fatherName || '');
    setFormMotherName(student.motherName || '');
    setFormEmail(student.email);
    setFormPhone(student.phone);
    setFormCourseId(student.courseId);
    setFormBatchId(student.batchId);
    setFormCoordinatorId(student.coordinatorId);
    setFormStatus(student.status);
    setFormUpazila(student.upazila || 'Sirajganj Sadar');
    setFormNid(student.nidOrBirthCert || '');
    setFormError(null);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Student Name is required.');
      return;
    }

    if (!formPhone.trim()) {
      setFormError('Phone / Mobile number is required.');
      return;
    }

    const selectedCourse = courses.find(c => c.id === formCourseId) || courses[0];
    const selectedBatch = batches.find(b => b.id === formBatchId) || batches[0];
    const selectedCoordinator = coordinators.find(c => c.id === formCoordinatorId) || coordinators[0];
    const assignedLab: LabIdentifier = formDivision === 'AI Lab Students' ? 'Artificial Intelligence Lab' : (selectedCourse?.assignedLab || 'Freelancing Lab');

    try {
      if (editingStudent) {
        // Update existing
        const updated: Student = {
          ...editingStudent,
          id: formId.trim(),
          division: formDivision,
          fullName: formName.trim(),
          gender: formGender,
          fatherName: formFatherName.trim(),
          motherName: formMotherName.trim(),
          email: formEmail.trim() || `${formName.toLowerCase().replace(/[^a-z0-9]/g, '')}@elearning.sirajganj.gov.bd`,
          phone: formPhone.trim(),
          courseId: selectedCourse.id,
          courseName: selectedCourse.name,
          batchId: selectedBatch.id,
          batchName: selectedBatch.batchName,
          batchNumber: selectedBatch.batchNumber,
          assignedLab: assignedLab,
          coordinatorId: selectedCoordinator.id,
          coordinatorName: selectedCoordinator.fullName,
          status: formStatus,
          upazila: formUpazila,
          nidOrBirthCert: formNid.trim()
        };
        onUpdateStudent(updated);
        setEditingStudent(null);
      } else {
        // Add new
        onAddStudent({
          customId: formId.trim(),
          division: formDivision,
          fullName: formName.trim(),
          gender: formGender,
          fatherName: formFatherName.trim(),
          motherName: formMotherName.trim(),
          email: formEmail.trim() || `${formName.toLowerCase().replace(/[^a-z0-9]/g, '')}@elearning.sirajganj.gov.bd`,
          phone: formPhone.trim(),
          courseId: selectedCourse.id,
          courseName: selectedCourse.name,
          batchId: selectedBatch.id,
          batchName: selectedBatch.batchName,
          batchNumber: selectedBatch.batchNumber,
          assignedLab: assignedLab,
          registrationDate: new Date().toISOString().split('T')[0],
          coordinatorId: selectedCoordinator.id,
          coordinatorName: selectedCoordinator.fullName,
          status: formStatus,
          upazila: formUpazila,
          nidOrBirthCert: formNid.trim()
        });
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving.');
    }
  };

  // Sort & Filter
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        // Filter by Division: Strictly "Students" and "AI Lab Students"
        const isAi = s.division === 'AI Lab Students' || s.assignedLab === 'Artificial Intelligence Lab' || s.assignedLab === 'AI Lab' || s.id.startsWith('AI-');
        if (activeDivision === 'Students' && isAi) return false;
        if (activeDivision === 'AI Lab Students' && !isAi) return false;

        if (courseFilter !== 'ALL' && s.courseName !== courseFilter && s.courseId !== courseFilter) return false;
        if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = s.fullName.toLowerCase().includes(q);
          const matchId = s.id.toLowerCase().includes(q);
          const matchPhone = s.phone.toLowerCase().includes(q);
          const matchFather = (s.fatherName || '').toLowerCase().includes(q);
          const matchMother = (s.motherName || '').toLowerCase().includes(q);
          const matchNid = (s.nidOrBirthCert || '').toLowerCase().includes(q);
          const matchCourse = s.courseName.toLowerCase().includes(q);
          if (!matchName && !matchId && !matchPhone && !matchFather && !matchMother && !matchNid && !matchCourse) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const valA = a[sortField] || '';
        const valB = b[sortField] || '';
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [students, activeDivision, courseFilter, statusFilter, searchQuery, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'id' | 'fullName' | 'registrationDate' | 'courseName') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Student Management</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {students.length} Total Registered
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Two distinct divisions: <strong>Students</strong> (Freelancing Lab - 75 Persons) and <strong>AI Lab Students</strong> (Artificial Intelligence Lab - 25 Persons)
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onExportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
            title="Download full CSV list"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => openAddModal()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Student</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Division Switcher Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {/* Division 1: Students */}
            <button
              onClick={() => {
                setActiveDivision('Students');
                setCurrentPage(1);
              }}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
                activeDivision === 'Students'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Students</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                activeDivision === 'Students' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {regularStudentsCount}
              </span>
            </button>

            {/* Division 2: AI Lab Students */}
            <button
              onClick={() => {
                setActiveDivision('AI Lab Students');
                setCurrentPage(1);
              }}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs transition-all ${
                activeDivision === 'AI Lab Students'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Lab Students</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                activeDivision === 'AI Lab Students' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
              }`}>
                {aiLabStudentsCount}
              </span>
            </button>

            {/* View All */}
            <button
              onClick={() => {
                setActiveDivision('ALL');
                setCurrentPage(1);
              }}
              className={`hidden md:flex items-center space-x-1.5 px-4 py-3 rounded-xl font-semibold text-xs transition-all ${
                activeDivision === 'ALL'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({students.length})</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 px-3 font-medium">
            Currently viewing:{' '}
            <strong className="text-slate-800">
              {activeDivision === 'Students'
                ? `Freelancing Lab Students (${regularStudentsCount} Persons)`
                : activeDivision === 'AI Lab Students'
                ? `Artificial Intelligence Lab Students (${aiLabStudentsCount} Persons)`
                : `All Students (${students.length} Persons)`}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar (Cleaned, without Lab-A/B/C) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, name, mobile, father, NID..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl outline-none"
            />
          </div>

          {/* Course Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase shrink-0">Course:</label>
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
            >
              <option value="ALL">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase shrink-0">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Summary of Active Filter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{paginatedStudents.length}</strong> of{' '}
            <strong className="text-slate-800 font-semibold">{filteredStudents.length}</strong> {activeDivision}
          </span>
          {(courseFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setCourseFilter('ALL');
                setStatusFilter('ALL');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase text-[11px] tracking-wider select-none">
              <tr>
                <th className="py-3 px-3 w-12 text-center">SL</th>
                <th 
                  onClick={() => toggleSort('id')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Student ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => toggleSort('fullName')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Mobile / Contact</th>
                {activeDivision === 'Students' && (
                  <>
                    <th className="py-3 px-4">Father Name</th>
                    <th className="py-3 px-4">Mother Name</th>
                  </>
                )}
                {activeDivision !== 'Students' && (
                  <>
                    <th className="py-3 px-4">Division</th>
                    <th className="py-3 px-4">Assigned Lab</th>
                  </>
                )}
                <th 
                  onClick={() => toggleSort('courseName')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>Course</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((s, idx) => {
                  const sl = (currentPage - 1) * itemsPerPage + idx + 1;
                  const isAi = s.division === 'AI Lab Students' || s.assignedLab === 'Artificial Intelligence Lab' || s.assignedLab === 'AI Lab' || s.id.startsWith('AI-');

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* SL */}
                      <td className="py-3 px-3 text-center font-bold text-slate-400">
                        {sl}
                      </td>

                      {/* Student ID */}
                      <td className="py-3 px-4 font-mono font-bold whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          isAi 
                            ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                          {s.serialNumber || s.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{s.fullName}</div>
                        {s.nidOrBirthCert && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            NID: {s.nidOrBirthCert}
                          </div>
                        )}
                      </td>

                      {/* Gender */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          s.gender === 'Female' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {s.gender || 'Male'}
                        </span>
                      </td>

                      {/* Mobile / Phone */}
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{s.phone}</span>
                        </div>
                      </td>

                      {/* Regular Students: Father & Mother Names */}
                      {activeDivision === 'Students' && (
                        <>
                          <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                            {s.fatherName || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                            {s.motherName || '—'}
                          </td>
                        </>
                      )}

                      {/* Non-Students Tab: Division & Lab */}
                      {activeDivision !== 'Students' && (
                        <>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isAi
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isAi ? 'AI Lab' : 'Students'}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-bold text-slate-700">
                              {s.assignedLab}
                            </span>
                          </td>
                        </>
                      )}

                      {/* Course */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 truncate max-w-[200px]">
                          {s.courseName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {s.batchName || s.batchNumber}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : s.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {s.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setInspectStudent(s)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="View Full Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {isAdmin && (
                            <>
                              <button
                                onClick={() => openEditModal(s)}
                                className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Edit Student"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteStudentRequest(s)}
                                className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Delete Student"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">No students found matching current filters.</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the search query or course filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs outline-none"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span>
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Student Profile Modal */}
      {inspectStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectStudent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xl border-2 border-emerald-500/30 shadow-md">
                {inspectStudent.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    inspectStudent.division === 'AI Lab Students' || inspectStudent.assignedLab === 'Artificial Intelligence Lab' || inspectStudent.assignedLab === 'AI Lab'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {inspectStudent.division || (inspectStudent.assignedLab === 'Artificial Intelligence Lab' || inspectStudent.assignedLab === 'AI Lab' ? 'AI Lab Students' : 'Students')}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {inspectStudent.serialNumber || inspectStudent.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {inspectStudent.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  {inspectStudent.courseName}
                </p>
              </div>
            </div>

            {/* Student Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Gender</span>
                <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.gender || 'Male'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Mobile Number</span>
                <span className="text-slate-800 font-bold mt-0.5 block font-mono">{inspectStudent.phone}</span>
              </div>

              {inspectStudent.fatherName && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Father's Name</span>
                  <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.fatherName}</span>
                </div>
              )}

              {inspectStudent.motherName && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Mother's Name</span>
                  <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.motherName}</span>
                </div>
              )}

              {inspectStudent.nidOrBirthCert && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">NID / Birth Certificate</span>
                  <span className="text-slate-800 font-mono font-bold mt-0.5 block">{inspectStudent.nidOrBirthCert}</span>
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">District & Upazila</span>
                <span className="text-slate-800 font-bold mt-0.5 block">
                  {inspectStudent.upazila || 'Sirajganj Sadar'}, Sirajganj
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Assigned Lab</span>
                <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.assignedLab}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Coordinator / Trainer</span>
                <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.coordinatorName}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Registration Date</span>
                <span className="text-slate-800 font-bold mt-0.5 block">{inspectStudent.registrationDate}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold uppercase text-[10px]">Status</span>
                <span className="text-emerald-700 font-bold mt-0.5 block">{inspectStudent.status}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectStudent(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingStudent ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
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

            <form onSubmit={handleSaveStudent} className="space-y-3.5 text-xs">
              {/* Division Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Student Division
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormDivision('Students');
                      if (!editingStudent) {
                        setFormId(`DYD64-E35B7G1-${(regularStudentsCount + 1).toString().padStart(2, '0')}`);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-colors ${
                      formDivision === 'Students'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    👨‍🎓 Students (Regular)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormDivision('AI Lab Students');
                      if (!editingStudent) {
                        setFormId(`AI-SRJ-${(aiLabStudentsCount + 1).toString().padStart(2, '0')}`);
                        const aiCourse = courses.find(c => c.name.includes('Artificial Intelligence')) || courses[0];
                        setFormCourseId(aiCourse?.id || '');
                      }
                    }}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-colors ${
                      formDivision === 'AI Lab Students'
                        ? 'border-purple-600 bg-purple-50 text-purple-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🤖 AI Lab Students
                  </button>
                </div>
              </div>

              {/* ID & Full Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Student ID / Serial *
                  </label>
                  <input
                    type="text"
                    required
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Gender *
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as 'Male' | 'Female')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Tarikul Islam"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              {/* Mobile Phone & NID */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 01712939394"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    NID / Birth Certificate
                  </label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={formNid}
                    onChange={(e) => setFormNid(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Parents (for Regular Students) */}
              {formDivision === 'Students' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      placeholder="Father's name"
                      value={formFatherName}
                      onChange={(e) => setFormFatherName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      placeholder="Mother's name"
                      value={formMotherName}
                      onChange={(e) => setFormMotherName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Course & Coordinator */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Course
                  </label>
                  <select
                    value={formCourseId}
                    onChange={(e) => setFormCourseId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Coordinator / Trainer
                  </label>
                  <select
                    value={formCoordinatorId}
                    onChange={(e) => setFormCoordinatorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    {coordinators.map(c => (
                      <option key={c.id} value={c.id}>{c.fullName} ({c.designation})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status & Upazila */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StudentStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Upazila (Sirajganj)
                  </label>
                  <select
                    value={formUpazila}
                    onChange={(e) => setFormUpazila(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-500"
                  >
                    <option value="Sirajganj Sadar">Sirajganj Sadar</option>
                    <option value="Belkuchi">Belkuchi</option>
                    <option value="Kazipur">Kazipur</option>
                    <option value="Shahjadpur">Shahjadpur</option>
                    <option value="Ullapara">Ullapara</option>
                    <option value="Raiganj">Raiganj</option>
                    <option value="Kamarkhanda">Kamarkhanda</option>
                    <option value="Tarash">Tarash</option>
                    <option value="Chauhali">Chauhali</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
                >
                  {editingStudent ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

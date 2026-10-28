import React, { useState } from 'react';
import { Course, Student, LabIdentifier, CourseStatus } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  Cpu, 
  CheckCircle2, 
  X, 
  Search,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  students: Student[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourseRequest: (course: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  students,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourseRequest
}) => {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['ADMIN']);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Freelancing');
  const [formDescription, setFormDescription] = useState('');
  const [formDuration, setFormDuration] = useState('3 Months (200 Hours)');
  const [formLab, setFormLab] = useState<LabIdentifier>('Freelancing Lab');
  const [formBatchName, setFormBatchName] = useState('7th Batch');
  const [formCoordinator, setFormCoordinator] = useState('sajib sheikh');
  const [formStatus, setFormStatus] = useState<CourseStatus>('Active');
  const [formSkills, setFormSkills] = useState('Upwork, Fiverr, Web Design, Graphic Design, Marketing');
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setFormId(`CRS-SRJ-0${courses.length + 1}`);
    setFormName('');
    setFormCategory('Freelancing');
    setFormDescription('');
    setFormDuration('3 Months (200 Hours)');
    setFormLab('Freelancing Lab');
    setFormBatchName('7th Batch');
    setFormCoordinator('sajib sheikh');
    setFormStatus('Active');
    setFormSkills('Upwork, Fiverr, Web Design, Graphic Design, Marketing');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormId(course.id);
    setFormName(course.name);
    setFormCategory(course.category);
    setFormDescription(course.description);
    setFormDuration(course.duration);
    setFormLab(course.assignedLab);
    setFormBatchName(course.batchName || 'Batch 01');
    setFormCoordinator(course.assignedCoordinator);
    setFormStatus(course.courseStatus);
    setFormSkills(course.skillsTaught.join(', '));
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim()) {
      setFormError('Course Name is required.');
      return;
    }

    const courseData: Course = {
      id: formId.trim(),
      name: formName.trim(),
      category: formCategory,
      description: formDescription.trim(),
      duration: formDuration.trim(),
      assignedLab: formLab,
      batchName: formBatchName.trim(),
      assignedCoordinator: formCoordinator.trim(),
      courseStatus: formStatus,
      skillsTaught: formSkills.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingCourse) {
        onUpdateCourse(courseData);
        setEditingCourse(null);
      } else {
        onAddCourse(courseData);
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      setFormError(err.message || 'An error occurred.');
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Courses & Freelancing Training Modules
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Vocational freelancing and artificial intelligence curriculum (2 Dedicated Courses)
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by title, ID, description..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
          >
            <option value="ALL">All Categories (2 Courses)</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
          </select>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const enrolledCount = students.filter(s => s.courseId === course.id || s.courseName === course.name).length;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                    {course.id}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    course.courseStatus === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {course.courseStatus}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {course.name}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Meta Info */}
              <div className="p-5 space-y-3 bg-slate-50/50 flex-1 text-xs">
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-800">{course.assignedLab}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-600">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Enrolled: <strong className="text-slate-900 font-bold font-mono-num">{enrolledCount} Students</strong></span>
                </div>

                <div className="text-[11px] text-slate-500">
                  Coordinator: <strong className="text-slate-800">{course.assignedCoordinator}</strong>
                </div>

                {/* Skills tags */}
                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
                  {course.skillsTaught.slice(0, 4).map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-700 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              {isAdmin && (
                <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Edit Course"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCourseRequest(course)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Course Modal */}
      {(isAddModalOpen || editingCourse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingCourse ? `Edit Course: ${editingCourse.name}` : 'Create New Course Module'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  E-Learning and Earning Curriculum System
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCourse(null);
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
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Course ID *</label>
                  <input
                    type="text"
                    required
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="CRS-FL-01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 font-mono text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    <option value="Freelancing">Freelancing</option>
                    <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Modern Fullstack React & Node.js"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Course Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed course description, practical modules, and market relevance..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="3 Months (200 Hours)"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
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
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Lead Coordinator *</label>
                  <input
                    type="text"
                    required
                    value={formCoordinator}
                    onChange={(e) => setFormCoordinator(e.target.value)}
                    placeholder="Engr. Tanvir Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Course Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as CourseStatus)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Skills Taught (Comma Separated)</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="React, Tailwind, Node.js, Upwork Proposal"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

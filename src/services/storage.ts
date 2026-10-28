import { 
  Student, 
  Course, 
  Batch, 
  Lab, 
  Coordinator, 
  Announcement, 
  LabIdentifier 
} from '../types/elearning';

import { 
  INITIAL_STUDENTS, 
  INITIAL_COURSES, 
  INITIAL_BATCHES, 
  INITIAL_LABS, 
  INITIAL_COORDINATORS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/initialData';
import { SEVENTH_BATCH_STUDENTS, SEVENTH_BATCH_BATCHES } from '../data/seventhBatchStudents';

const KEYS = {
  STUDENTS: 'eled_srj_students_v11',
  COURSES: 'eled_srj_courses_v9',
  BATCHES: 'eled_srj_batches_v10',
  LABS: 'eled_srj_labs_v9',
  COORDINATORS: 'eled_srj_coordinators_v10',
  ANNOUNCEMENTS: 'eled_srj_announcements_v5'
};

// Safe JSON parse helper
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading key ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing key ${key} to storage:`, e);
  }
}

export const StorageService = {
  // Students
  getStudents: (): Student[] => {
    return getStored<Student[]>(KEYS.STUDENTS, INITIAL_STUDENTS);
  },

  saveStudents: (students: Student[]): void => {
    setStored(KEYS.STUDENTS, students);
  },

  addStudent: (student: Omit<Student, 'id'> & { customId?: string }): Student => {
    const students = StorageService.getStudents();
    const nextNumber = students.length + 101;
    const generatedId = student.customId?.trim() || `ELED-SRJ-2026-${nextNumber.toString().padStart(4, '0')}`;
    
    // Check uniqueness
    if (students.some(s => s.id === generatedId)) {
      throw new Error(`Student ID ${generatedId} already exists! Student IDs must be strictly unique.`);
    }

    const newStudent: Student = {
      ...student,
      id: generatedId
    };

    const updated = [newStudent, ...students];
    StorageService.saveStudents(updated);
    return newStudent;
  },

  updateStudent: (updatedStudent: Student): void => {
    const students = StorageService.getStudents();
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    StorageService.saveStudents(updated);
  },

  deleteStudent: (studentId: string): void => {
    const students = StorageService.getStudents();
    const updated = students.filter(s => s.id !== studentId);
    StorageService.saveStudents(updated);
  },

  generateNextStudentId: (): string => {
    const students = StorageService.getStudents();
    const currentMax = students.reduce((max, s) => {
      const match = s.id.match(/ELED-SRJ-2026-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 100);
    return `ELED-SRJ-2026-${(currentMax + 1).toString().padStart(4, '0')}`;
  },

  // Courses
  getCourses: (): Course[] => {
    return getStored<Course[]>(KEYS.COURSES, INITIAL_COURSES);
  },

  saveCourses: (courses: Course[]): void => {
    setStored(KEYS.COURSES, courses);
  },

  addCourse: (course: Course): void => {
    const courses = StorageService.getCourses();
    if (courses.some(c => c.id === course.id)) {
      throw new Error(`Course ID ${course.id} already exists.`);
    }
    StorageService.saveCourses([...courses, course]);
  },

  updateCourse: (updatedCourse: Course): void => {
    const courses = StorageService.getCourses();
    const updated = courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    StorageService.saveCourses(updated);
  },

  deleteCourse: (courseId: string): void => {
    const courses = StorageService.getCourses();
    StorageService.saveCourses(courses.filter(c => c.id !== courseId));
  },

  // Batches
  getBatches: (): Batch[] => {
    const list = getStored<Batch[]>(KEYS.BATCHES, INITIAL_BATCHES);
    const hasSeventhBatch = list.some(b => b.batchNumber === '7th Batch');
    if (!hasSeventhBatch) {
      const merged = [...SEVENTH_BATCH_BATCHES, ...list];
      setStored(KEYS.BATCHES, merged);
      return merged;
    }
    return list;
  },

  saveBatches: (batches: Batch[]): void => {
    setStored(KEYS.BATCHES, batches);
  },

  addBatch: (batch: Batch): void => {
    const batches = StorageService.getBatches();
    if (batches.some(b => b.id === batch.id)) {
      throw new Error(`Batch ID ${batch.id} already exists.`);
    }
    StorageService.saveBatches([...batches, batch]);
  },

  updateBatch: (updatedBatch: Batch): void => {
    const batches = StorageService.getBatches();
    const updated = batches.map(b => b.id === updatedBatch.id ? updatedBatch : b);
    StorageService.saveBatches(updated);
  },

  deleteBatch: (batchId: string): void => {
    const batches = StorageService.getBatches();
    StorageService.saveBatches(batches.filter(b => b.id !== batchId));
  },

  // Labs
  getLabs: (): Lab[] => {
    return getStored<Lab[]>(KEYS.LABS, INITIAL_LABS);
  },

  updateLab: (updatedLab: Lab): void => {
    const labs = StorageService.getLabs();
    const updated = labs.map(l => l.id === updatedLab.id ? updatedLab : l);
    setStored(KEYS.LABS, updated);
  },

  // Coordinators
  getCoordinators: (): Coordinator[] => {
    return getStored<Coordinator[]>(KEYS.COORDINATORS, INITIAL_COORDINATORS);
  },

  saveCoordinators: (coordinators: Coordinator[]): void => {
    setStored(KEYS.COORDINATORS, coordinators);
  },

  addCoordinator: (coordinator: Coordinator): void => {
    const coordinators = StorageService.getCoordinators();
    if (coordinators.some(c => c.id === coordinator.id)) {
      throw new Error(`Coordinator ID ${coordinator.id} already exists.`);
    }
    StorageService.saveCoordinators([...coordinators, coordinator]);
  },

  updateCoordinator: (updatedCoordinator: Coordinator): void => {
    const coordinators = StorageService.getCoordinators();
    const updated = coordinators.map(c => c.id === updatedCoordinator.id ? updatedCoordinator : c);
    StorageService.saveCoordinators(updated);
  },

  deleteCoordinator: (coordinatorId: string): void => {
    const coordinators = StorageService.getCoordinators();
    StorageService.saveCoordinators(coordinators.filter(c => c.id !== coordinatorId));
  },

  // Announcements
  getAnnouncements: (): Announcement[] => {
    return getStored<Announcement[]>(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  },

  saveAnnouncements: (announcements: Announcement[]): void => {
    setStored(KEYS.ANNOUNCEMENTS, announcements);
  },

  addAnnouncement: (announcement: Announcement): void => {
    const announcements = StorageService.getAnnouncements();
    StorageService.saveAnnouncements([announcement, ...announcements]);
  },

  deleteAnnouncement: (id: string): void => {
    const announcements = StorageService.getAnnouncements();
    StorageService.saveAnnouncements(announcements.filter(a => a.id !== id));
  },

  // Reset to initial defaults
  resetAllData: (): void => {
    localStorage.removeItem(KEYS.STUDENTS);
    localStorage.removeItem(KEYS.COURSES);
    localStorage.removeItem(KEYS.BATCHES);
    localStorage.removeItem(KEYS.LABS);
    localStorage.removeItem(KEYS.COORDINATORS);
    localStorage.removeItem(KEYS.ANNOUNCEMENTS);
  },

  // Export students as CSV
  exportStudentsToCSV: (students: Student[]): void => {
    const headers = [
      'SL',
      'Division',
      'District',
      'Group',
      'Batch',
      'SERIAL',
      'STUDENT NAME',
      'GENDER',
      'NID',
      'FATHER NAME',
      'MOTHER NAME',
      'PHONE',
      'EMAIL',
      'COURSE NAME',
      'ASSIGNED LAB',
      'COORDINATOR',
      'STATUS',
      'UPAZILA',
      'EARNINGS (USD)'
    ];

    const rows = students.map((s, index) => [
      `"${index + 1}"`,
      `"${s.division || (s.assignedLab === 'Artificial Intelligence Lab' || s.id.startsWith('AI-') ? 'AI Lab Students' : 'Students')}"`,
      `"${s.district || 'Sirajganj'}"`,
      `"${s.group || (s.id.startsWith('AI-') ? 'AI Group' : 'Freelancing Group')}"`,
      `"${s.batchNumber || s.batchName}"`,
      `"${s.serialNumber || s.id}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.gender || 'N/A'}"`,
      `"${s.nidOrBirthCert || 'N/A'}"`,
      `"${(s.fatherName || '').replace(/"/g, '""')}"`,
      `"${(s.motherName || '').replace(/"/g, '""')}"`,
      `"${s.phone}"`,
      `"${s.email}"`,
      `"${s.courseName}"`,
      `"${s.assignedLab}"`,
      `"${s.coordinatorName}"`,
      `"${s.status}"`,
      `"${s.upazila || 'Sirajganj Sadar'}"`,
      `"${s.freelancingEarningsUSD || 0}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `elearning_sirajganj_students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

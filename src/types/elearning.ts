export type UserRole = 'ADMIN' | 'COORDINATOR' | 'STUDENT';

export type LabIdentifier = 'Freelancing Lab' | 'Artificial Intelligence Lab' | string;

export type StudentStatus = 'Active' | 'Inactive' | 'Completed' | 'Pending';

export type BatchStatus = 'Upcoming' | 'Running' | 'Completed';

export type CourseStatus = 'Active' | 'Upcoming' | 'Completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  studentId?: string;
  coordinatorId?: string;
}

export type StudentDivision = 'Students' | 'AI Lab Students';

export interface Student {
  id: string; // Unique, e.g. "ELED-SRJ-2026-0101"
  fullName: string;
  email: string;
  phone: string;
  division?: StudentDivision; // 'Students' | 'AI Lab Students'
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  batchNumber: string;
  assignedLab: LabIdentifier;
  registrationDate: string; // YYYY-MM-DD
  coordinatorId: string;
  coordinatorName: string;
  status: StudentStatus;
  profilePhoto?: string;
  gender?: 'Male' | 'Female' | 'Other';
  upazila?: string; // e.g. "Sirajganj Sadar", "Belkuchi", "Kazipur", "Shahjadpur", "Ullapara"
  nidOrBirthCert?: string;
  district?: string; // e.g. "Sirajganj"
  group?: string; // e.g. "Group-A", "Group-B", "Group-C"
  serialNumber?: string; // e.g. "DYD64-E35B7G1-01"
  fatherName?: string;
  motherName?: string;
  freelancingEarningsUSD?: number;
  notes?: string;
}

export interface Course {
  id: string; // e.g. "CRS-WDD-01"
  name: string;
  category: string;
  description: string;
  duration: string; // e.g. "3 Months (200 Hours)"
  assignedLab: LabIdentifier;
  batchName?: string;
  assignedCoordinator: string;
  courseStatus: CourseStatus;
  skillsTaught: string[];
  totalEnrolled?: number;
}

export interface Lab {
  id: LabIdentifier;
  name: string;
  description: string;
  workstationsCount: number;
  assignedCourses: string[];
  batchList: string[];
  assignedCoordinator: string;
  status: 'Operational' | 'Maintenance' | 'Scheduled';
  specifications: string;
  roomNumber: string;
}

export interface Batch {
  id: string; // e.g. "BATCH-SRJ-WDD-01"
  batchName: string;
  batchNumber: string;
  courseId: string;
  courseName: string;
  assignedLab: LabIdentifier;
  coordinatorName: string;
  startDate: string;
  endDate: string;
  scheduleTime: string;
  status: BatchStatus;
  maxCapacity: number;
}

export interface Coordinator {
  id: string; // e.g. "COORD-SRJ-01"
  fullName: string;
  designation: string;
  phone: string;
  email: string;
  assignedLab: LabIdentifier;
  assignedCourse: string;
  assignedBatch: string;
  status: 'Active' | 'On Leave';
  joinedDate: string;
  avatar?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Batch Announcement' | 'Course Registration' | 'Class Schedule' | 'Notice' | 'Exam / Certification';
  description: string;
  date: string;
  author: string;
  isPinned?: boolean;
  targetRole?: 'ALL' | 'STUDENTS' | 'COORDINATORS';
  imageUrl?: string;
}

export type PageView = 
  | 'dashboard' 
  | 'admin' 
  | 'students' 
  | 'summary' 
  | 'courses' 
  | 'batches' 
  | 'labs' 
  | 'coordinators' 
  | 'student_portal' 
  | 'announcements' 
  | 'profile_settings'
  | 'login';

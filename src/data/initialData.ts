import { Lab, Course, Batch, Coordinator, Student, Announcement, User } from '../types/elearning';
import { SEVENTH_BATCH_BATCHES, SEVENTH_BATCH_STUDENTS } from './seventhBatchStudents';
import { AI_LAB_STUDENTS } from './aiLabStudents';
import { TEACHERS_AND_STAFF } from './teachersAndStaff';

export const INITIAL_LABS: Lab[] = [
  {
    id: 'Freelancing Lab',
    name: 'Freelancing Lab (Freelancing & IT Skills)',
    description: 'High-capacity technology laboratory dedicated to Freelancing & Global Marketplace Skills: Web Design & Development, Graphic Design, Video Editing, Digital Marketing, and IT Freelancing.',
    workstationsCount: 75,
    assignedCourses: ['Freelancing'],
    batchList: ['1st Batch', '2nd Batch', '3rd Batch', '4th Batch', '7th Batch (Group-A)', '7th Batch (Group-B)', '7th Batch (Group-C)'],
    assignedCoordinator: 'sajib sheikh',
    status: 'Operational',
    specifications: '75x High-Performance Intel Core i7 / i5 Workstations, 32GB RAM, Dedicated GPUs, Dual Displays, 1 Gbps High-Speed Fiber Dedicated Line',
    roomNumber: 'Rooms 201-203 (2nd Floor Combined Wing)'
  },
  {
    id: 'Artificial Intelligence Lab',
    name: 'Artificial Intelligence Lab',
    description: 'Flagship high-performance computing laboratory for Generative AI, Large Language Models (LLMs), Python neural workflows, and AI automation.',
    workstationsCount: 25,
    assignedCourses: ['Artificial Intelligence (AI)'],
    batchList: ['AI Accelerator Batch 01', 'AI Accelerator Batch 02'],
    assignedCoordinator: 'kamal bhuban',
    status: 'Operational',
    specifications: '25x Ryzen 9 7950X, RTX 4090 24GB GPUs, 64GB RAM, Local LLM Inference Node & Tensor Acceleration',
    roomNumber: 'Room 302 (3rd Floor - Innovation Wing)'
  }
];

export const INITIAL_COORDINATORS: Coordinator[] = [...TEACHERS_AND_STAFF];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'CRS-FL-01',
    name: 'Freelancing',
    category: 'Freelancing',
    description: 'Comprehensive professional freelancing program covering Upwork, Fiverr, international marketplace bidding, client communication, web design, graphic design, and digital marketing skills.',
    duration: '3 Months (240 Hours)',
    assignedLab: 'Freelancing Lab',
    batchName: '7th Batch (Freelancing)',
    assignedCoordinator: 'sajib sheikh',
    courseStatus: 'Active',
    skillsTaught: ['Freelancing Fundamentals', 'Upwork & Fiverr Mastery', 'Web & Graphic Design', 'Digital Marketing', 'Client Communication & Payment Gateways']
  },
  {
    id: 'CRS-AI-02',
    name: 'Artificial Intelligence (AI)',
    category: 'Artificial Intelligence (AI)',
    description: 'Cutting-edge Generative AI training including Prompt Engineering, LLM integration, Python for AI, automation agents, Midjourney, Gemini, and AI-assisted freelancing workflows.',
    duration: '2 Months (160 Hours)',
    assignedLab: 'Artificial Intelligence Lab',
    batchName: 'AI Accelerator Batch 01 & 02',
    assignedCoordinator: 'kamal bhuban',
    courseStatus: 'Active',
    skillsTaught: ['Generative AI & LLMs', 'Prompt Engineering', 'Python for AI', 'AI Agents & Automation', 'Gemini & OpenAI APIs']
  }
];

export const INITIAL_BATCHES: Batch[] = [
  // 1. Freelancing 1st Batch (Archive / Completed)
  {
    id: 'BATCH-SRJ-FL-01',
    batchName: '1st Batch (Freelancing)',
    batchNumber: '1st Batch',
    courseId: 'CRS-FL-01',
    courseName: 'Freelancing',
    assignedLab: 'Freelancing Lab',
    coordinatorName: 'sajib sheikh',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    scheduleTime: '09:00 AM - 05:00 PM (Sat - Thu)',
    status: 'Completed',
    maxCapacity: 25
  },
  // 2. Freelancing 2nd Batch (Completed)
  {
    id: 'BATCH-SRJ-FL-02',
    batchName: '2nd Batch (Freelancing)',
    batchNumber: '2nd Batch',
    courseId: 'CRS-FL-01',
    courseName: 'Freelancing',
    assignedLab: 'Freelancing Lab',
    coordinatorName: 'sajib sheikh',
    startDate: '2024-07-01',
    endDate: '2024-10-01',
    scheduleTime: '09:00 AM - 05:00 PM (Sat - Thu)',
    status: 'Completed',
    maxCapacity: 25
  },
  // 3. Freelancing 3rd Batch (Completed)
  {
    id: 'BATCH-SRJ-FL-03',
    batchName: '3rd Batch (Freelancing)',
    batchNumber: '3rd Batch',
    courseId: 'CRS-FL-01',
    courseName: 'Freelancing',
    assignedLab: 'Freelancing Lab',
    coordinatorName: 'sajib sheikh',
    startDate: '2024-11-01',
    endDate: '2025-02-01',
    scheduleTime: '09:00 AM - 05:00 PM (Sat - Thu)',
    status: 'Completed',
    maxCapacity: 25
  },
  // 4. Freelancing 4th Batch (Completed)
  {
    id: 'BATCH-SRJ-FL-04',
    batchName: '4th Batch (Freelancing)',
    batchNumber: '4th Batch',
    courseId: 'CRS-FL-01',
    courseName: 'Freelancing',
    assignedLab: 'Freelancing Lab',
    coordinatorName: 'sajib sheikh',
    startDate: '2025-03-01',
    endDate: '2025-06-01',
    scheduleTime: '09:00 AM - 05:00 PM (Sat - Thu)',
    status: 'Completed',
    maxCapacity: 25
  },
  // 5, 6, 7. Freelancing 7th Batch (Group-A, Group-B, Group-C) - 75 Students Active
  ...SEVENTH_BATCH_BATCHES,
  // 8. Artificial Intelligence Accelerator Batch 01 (Running - 25 Students Active)
  {
    id: 'BATCH-SRJ-AI-01',
    batchName: 'AI Accelerator Batch 01',
    batchNumber: 'AI Batch 01',
    courseId: 'CRS-AI-02',
    courseName: 'Artificial Intelligence (AI)',
    assignedLab: 'Artificial Intelligence Lab',
    coordinatorName: 'kamal bhuban',
    startDate: '2026-03-01',
    endDate: '2026-05-01',
    scheduleTime: '09:00 AM - 04:00 PM (Sat - Thu)',
    status: 'Running',
    maxCapacity: 25
  },
  // 9. Artificial Intelligence Advanced Batch 02 (Upcoming / Scheduled)
  {
    id: 'BATCH-SRJ-AI-02',
    batchName: 'AI Accelerator Batch 02',
    batchNumber: 'AI Batch 02',
    courseId: 'CRS-AI-02',
    courseName: 'Artificial Intelligence (AI)',
    assignedLab: 'Artificial Intelligence Lab',
    coordinatorName: 'kamal bhuban',
    startDate: '2026-05-15',
    endDate: '2026-07-15',
    scheduleTime: '09:00 AM - 04:00 PM (Sat - Thu)',
    status: 'Upcoming',
    maxCapacity: 25
  }
];

export const INITIAL_STUDENTS: Student[] = [
  ...SEVENTH_BATCH_STUDENTS.map(s => ({
    ...s,
    division: 'Students' as const,
    courseId: 'CRS-FL-01',
    courseName: 'Freelancing',
    assignedLab: 'Freelancing Lab' as const,
    coordinatorId: 'STAFF-SRJ-01',
    coordinatorName: 'sajib sheikh'
  })),
  ...AI_LAB_STUDENTS.map(s => ({
    ...s,
    division: 'AI Lab Students' as const,
    courseId: 'CRS-AI-02',
    courseName: 'Artificial Intelligence (AI)',
    assignedLab: 'Artificial Intelligence Lab' as const,
    coordinatorId: 'STAFF-SRJ-02',
    coordinatorName: 'kamal bhuban'
  }))
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-SRJ-01',
    title: 'Admissions Open: Batch 02 (May - August 2026) for Freelancing & AI Tracks',
    category: 'Batch Announcement',
    description: 'Registration is now officially open for Batch 02 across the Freelancing track (Freelancing Lab) and Artificial Intelligence track (Artificial Intelligence Lab). Interested youth of Sirajganj district can apply online or visit the Sirajganj Center at Hayder Complex (4th Floor), SB Fazlul Haque Road, Railgate, Sirajganj by April 20, 2026.',
    date: '2026-04-01',
    author: 'sajib sheikh (Branch Director & Admin)',
    isPinned: true,
    targetRole: 'ALL'
  },
  {
    id: 'ANN-SRJ-02',
    title: 'Specialized Generative AI & Prompt Engineering Masterclass in Artificial Intelligence Lab',
    category: 'Course Registration',
    description: 'An intensive 3-day weekend workshop on LangGraph, Gemini 2.0 API, and tool calling will be hosted in the Artificial Intelligence Lab on Friday, April 24, 2026. All active students with basic programming knowledge can register through their coordinator.',
    date: '2026-03-28',
    author: 'kamal bhuban (AI Coordinator)',
    isPinned: true,
    targetRole: 'STUDENTS'
  },
  {
    id: 'ANN-SRJ-03',
    title: 'Ramadan & Eid Class Schedule Adjustment Notice',
    category: 'Class Schedule',
    description: 'During Ramadan, morning batch timings will run from 09:00 AM to 01:00 PM, and afternoon sessions will run from 01:30 PM to 05:00 PM. High-speed internet access in both Freelancing Lab and Artificial Intelligence Lab will remain open until 08:00 PM for project work.',
    date: '2026-03-15',
    author: 'Branch Administration',
    isPinned: false,
    targetRole: 'ALL'
  },
  {
    id: 'ANN-SRJ-04',
    title: 'ICT Division Freelancing Excellence Award & Certificate Distribution',
    category: 'Exam / Certification',
    description: 'Graduating students of Batch 01 who have successfully earned $500+ on global freelance marketplaces will receive their official ICT Division Govt. Certification and honorarium laptop bags during the district conference.',
    date: '2026-03-10',
    author: 'District Project Coordinator',
    isPinned: false,
    targetRole: 'STUDENTS'
  }
];

export const DEMO_USERS: Record<string, { user: User; pass: string }> = {
  admin: {
    user: {
      id: 'USR-ADMIN-01',
      name: 'sajib sheikh',
      email: 'sajib@elearning.sirajganj.gov.bd',
      role: 'ADMIN',
      phone: '+880 1711-234567',
      avatar: '/assets/aistudio/20262_653f23ab.png'
    },
    pass: 'admin123'
  },
  coordinator: {
    user: {
      id: 'STAFF-SRJ-01',
      name: 'sajib sheikh',
      email: 'coordinator@elearning.sirajganj.gov.bd',
      role: 'COORDINATOR',
      coordinatorId: 'STAFF-SRJ-01',
      phone: '+880 1711-234567',
      avatar: '/assets/aistudio/20262_653f23ab.png'
    },
    pass: 'coord123'
  },
  student: {
    user: {
      id: 'USR-STU-01',
      name: 'Md. Tarikul Islam',
      email: 'student@elearning.sirajganj.gov.bd',
      role: 'STUDENT',
      studentId: 'AI-SRJ-01',
      phone: '01712939394',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    },
    pass: 'student123'
  }
};

import { Coordinator } from '../types/elearning';

export interface StaffMember extends Coordinator {
  serialNo: number;
  roleCategory: 'Coordinator';
}

export const TEACHERS_AND_STAFF: StaffMember[] = [
  {
    id: 'STAFF-SRJ-01',
    serialNo: 1,
    fullName: 'sajib sheikh',
    designation: 'E-Learning & Earning Coordinator',
    roleCategory: 'Coordinator',
    phone: '+880 1711-234567',
    email: 'sajib.sheikh@elearning.sirajganj.gov.bd',
    assignedLab: 'Freelancing Lab',
    assignedCourse: 'Freelancing',
    assignedBatch: '7th Batch (Group-A, B, C)',
    status: 'Active',
    joinedDate: '2023-01-01',
    avatar: '/assets/aistudio/20262_653f23ab.png'
  },
  {
    id: 'STAFF-SRJ-02',
    serialNo: 2,
    fullName: 'kamal bhuban',
    designation: 'Artificial Intelligence (AI) Coordinator',
    roleCategory: 'Coordinator',
    phone: '+880 1716-789012',
    email: 'kamal.bhuban@elearning.sirajganj.gov.bd',
    assignedLab: 'Artificial Intelligence Lab',
    assignedCourse: 'Artificial Intelligence (AI)',
    assignedBatch: 'AI Accelerator Batch 01 & 02',
    status: 'Active',
    joinedDate: '2023-04-01',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  }
];

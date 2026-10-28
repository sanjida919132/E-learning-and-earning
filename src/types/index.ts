export type ViewMode = 'overview' | 'labs' | 'talent' | 'curriculum' | 'hardware' | 'alerts';

export type LabId = 'LAB-01' | 'LAB-02' | 'LAB-03' | 'LAB-04';

export type WorkstationStatus = 'active' | 'standby' | 'benchmark' | 'assist' | 'offline';

export interface Workstation {
  id: string; // e.g. "WS-01"
  labId: LabId;
  seatNumber: number;
  status: WorkstationStatus;
  occupant?: {
    id: string;
    name: string;
    avatarInitials: string;
    track: string;
    platform: 'Upwork' | 'Fiverr Pro' | 'Toptal' | 'Direct Enterprise';
    rating: string;
    hourlyRate: number;
    activeContract: string;
  };
  metrics: {
    cpuPercent: number;
    gpuPercent: number;
    ramUsedGB: number;
    ramTotalGB: number;
    networkMbps: number;
    activeProcess: string;
    gitBranch: string;
    uptimeHours: number;
  };
}

export interface LabCluster {
  id: LabId;
  name: string;
  designation: string;
  totalSeats: number;
  activeSeats: number;
  mentor: string;
  mentorClearance: string;
  track: string;
  gpuCluster: string;
  temperatureC: number;
  bandwidthGbps: number;
  status: 'OPTIMAL' | 'LOAD_SURGE' | 'MAINTENANCE';
  specializationSummary: string;
}

export interface StudentFreelancer {
  id: string;
  name: string;
  email: string;
  track: 'Agentic AI' | 'Fullstack Web' | 'DevOps & Cloud' | 'Cyber Security';
  assignedLab: LabId;
  workstationId: string;
  platform: 'Upwork' | 'Fiverr Pro' | 'Toptal' | 'Direct Enterprise';
  profileScore: string;
  hourlyRate: number;
  totalEarnedYTD: number;
  activeContractsCount: number;
  activeMilestoneTitle: string;
  activeMilestoneAmount: number;
  status: 'ACTIVE' | 'STANDBY' | 'PENDING_REVIEW' | 'CERTIFIED';
  skills: string[];
  joinedDate: string;
}

export interface EarningTransaction {
  id: string;
  freelancerName: string;
  studentId: string;
  platform: 'Upwork' | 'Fiverr Pro' | 'Toptal' | 'Direct Enterprise';
  amount: number;
  projectTitle: string;
  clientCountry: string;
  timestamp: string;
  verificationHash: string;
  status: 'VERIFIED' | 'CLEARING' | 'PENDING_ESCROW';
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: 'SYS' | 'EARN' | 'NETWORK' | 'ALERT' | 'HARDWARE';
  message: string;
}

export interface LabAlert {
  id: string;
  labId: LabId;
  workstationId?: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'ACHIEVEMENT';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface CurriculumSprint {
  id: string;
  track: string;
  cohort: string;
  currentSprint: string;
  weekProgress: number; // percentage
  enrolledTalent: number;
  milestoneAcceptanceRate: number;
  keyTechnologies: string[];
  leadInstructor: string;
}

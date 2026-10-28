import { LabCluster, Workstation, StudentFreelancer, EarningTransaction, TerminalLog, LabAlert, CurriculumSprint, LabId, WorkstationStatus } from '../types';

export const INITIAL_LABS: LabCluster[] = [
  {
    id: 'LAB-01',
    name: 'Full-Stack Architecture & High-Scale Systems',
    designation: 'LAB-01 // FULL-STACK NEXUS',
    totalSeats: 32,
    activeSeats: 31,
    mentor: 'Arifur Rahman (Principal Architect)',
    mentorClearance: 'SEC-LVL 4',
    track: 'Fullstack Web Systems',
    gpuCluster: 'Node Cluster Alpha (RTX 4090 Dedicated)',
    temperatureC: 21.2,
    bandwidthGbps: 9.4,
    status: 'OPTIMAL',
    specializationSummary: 'Distributed React 19, Next.js 15, PostgreSQL microservices, Node.js clusters & GraphQL gateways.'
  },
  {
    id: 'LAB-02',
    name: 'AI Accelerator & Autonomous Agent Systems',
    designation: 'LAB-02 // AI ACCELERATOR',
    totalSeats: 32,
    activeSeats: 32,
    mentor: 'Dr. Nusrat Jahan (AI Research Lead)',
    mentorClearance: 'SEC-LVL 5',
    track: 'Agentic AI & Neural Systems',
    gpuCluster: 'H100 Tensor Cluster (4x 80GB SXM5)',
    temperatureC: 22.8,
    bandwidthGbps: 9.8,
    status: 'LOAD_SURGE',
    specializationSummary: 'Gemini 2.0 / 3.x Flash integrations, LangGraph pipelines, Vector RAG search, custom fine-tuning.'
  },
  {
    id: 'LAB-03',
    name: 'Distributed Cloud, Kubernetes & DevSecOps',
    designation: 'LAB-03 // CLOUD INFRASTRUCTURE',
    totalSeats: 32,
    activeSeats: 29,
    mentor: 'Tanvir Hossain (Cloud Operations Lead)',
    mentorClearance: 'SEC-LVL 4',
    track: 'DevOps & Cloud Systems',
    gpuCluster: 'Compute Pod Delta (Dual EPYC 9654)',
    temperatureC: 20.6,
    bandwidthGbps: 8.9,
    status: 'OPTIMAL',
    specializationSummary: 'Terraform IaC, multi-region Kubernetes clusters, CI/CD automated test harness & zero-trust posture.'
  },
  {
    id: 'LAB-04',
    name: 'High-Yield Freelance Operations & Enterprise Nexus',
    designation: 'LAB-04 // FREELANCE COMMAND',
    totalSeats: 32,
    activeSeats: 32,
    mentor: 'Farhana Kabir (Top-Rated Plus Strategist)',
    mentorClearance: 'SEC-LVL 4',
    track: 'Enterprise Freelancing & Global Delivery',
    gpuCluster: 'Workstation Grid Epsilon',
    temperatureC: 21.5,
    bandwidthGbps: 9.6,
    status: 'OPTIMAL',
    specializationSummary: 'Upwork Enterprise client sprints, Toptal core contracts, rapid delivery, 100% Job Success Score standard.'
  }
];

export const INITIAL_STUDENTS: StudentFreelancer[] = [
  {
    id: 'STU-1084',
    name: 'Tanvir Chowdhury',
    email: 'tanvir.c@ictcenter.gov.bd',
    track: 'Agentic AI',
    assignedLab: 'LAB-02',
    workstationId: 'WS-04',
    platform: 'Upwork',
    profileScore: '100% JSS // Top Rated Plus',
    hourlyRate: 85,
    totalEarnedYTD: 34200,
    activeContractsCount: 3,
    activeMilestoneTitle: 'Multi-Agent Financial Risk Analyzer (LangGraph + Gemini)',
    activeMilestoneAmount: 3400,
    status: 'ACTIVE',
    skills: ['LangGraph', 'Gemini API', 'TypeScript', 'Vector RAG', 'Python'],
    joinedDate: '2024-03-12'
  },
  {
    id: 'STU-1092',
    name: 'Farzana Akter',
    email: 'farzana.a@ictcenter.gov.bd',
    track: 'Fullstack Web',
    assignedLab: 'LAB-01',
    workstationId: 'WS-12',
    platform: 'Upwork',
    profileScore: '100% JSS // Top Rated',
    hourlyRate: 75,
    totalEarnedYTD: 28950,
    activeContractsCount: 2,
    activeMilestoneTitle: 'HealthTech Patient Portal & HIPAA Compliance Core',
    activeMilestoneAmount: 2800,
    status: 'ACTIVE',
    skills: ['Next.js 15', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Stripe'],
    joinedDate: '2024-04-01'
  },
  {
    id: 'STU-1105',
    name: 'Shakil Ahmed',
    email: 'shakil.ahmed@ictcenter.gov.bd',
    track: 'DevOps & Cloud',
    assignedLab: 'LAB-03',
    workstationId: 'WS-08',
    platform: 'Toptal',
    profileScore: 'Top 3% Verified Engineer',
    hourlyRate: 95,
    totalEarnedYTD: 42100,
    activeContractsCount: 2,
    activeMilestoneTitle: 'Global Kubernetes Multi-Region Cluster Migration',
    activeMilestoneAmount: 4500,
    status: 'ACTIVE',
    skills: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus'],
    joinedDate: '2024-02-15'
  },
  {
    id: 'STU-1120',
    name: 'Mahmudul Hasan',
    email: 'm.hasan@ictcenter.gov.bd',
    track: 'Agentic AI',
    assignedLab: 'LAB-02',
    workstationId: 'WS-18',
    platform: 'Direct Enterprise',
    profileScore: 'Retainer Contract ($8,000/mo)',
    hourlyRate: 90,
    totalEarnedYTD: 39500,
    activeContractsCount: 1,
    activeMilestoneTitle: 'Autonomous Customer Support Swarm with Tool Calling',
    activeMilestoneAmount: 4000,
    status: 'ACTIVE',
    skills: ['Function Calling', 'ChromaDB', 'FastAPI', 'Redis', 'Python'],
    joinedDate: '2024-03-20'
  },
  {
    id: 'STU-1144',
    name: 'Nusrat Tabassum',
    email: 'nusrat.t@ictcenter.gov.bd',
    track: 'Fullstack Web',
    assignedLab: 'LAB-01',
    workstationId: 'WS-02',
    platform: 'Fiverr Pro',
    profileScore: '5.0 ★ (48 Reviews)',
    hourlyRate: 65,
    totalEarnedYTD: 24700,
    activeContractsCount: 4,
    activeMilestoneTitle: 'SaaS Multi-Tenant Billing Engine & Subscription Webhooks',
    activeMilestoneAmount: 1950,
    status: 'ACTIVE',
    skills: ['React 19', 'TypeScript', 'Supabase', 'Node.js', 'Prisma'],
    joinedDate: '2024-05-10'
  },
  {
    id: 'STU-1168',
    name: 'Rashedul Islam',
    email: 'rashedul.i@ictcenter.gov.bd',
    track: 'Cyber Security',
    assignedLab: 'LAB-03',
    workstationId: 'WS-22',
    platform: 'Upwork',
    profileScore: '98% JSS // Top Rated',
    hourlyRate: 80,
    totalEarnedYTD: 21300,
    activeContractsCount: 2,
    activeMilestoneTitle: 'Penetration Testing & SOC 2 Compliance Remediation',
    activeMilestoneAmount: 2500,
    status: 'ACTIVE',
    skills: ['OWASP ZAP', 'Burp Suite', 'Network Security', 'SIEM', 'Go'],
    joinedDate: '2024-06-01'
  },
  {
    id: 'STU-1182',
    name: 'Kazi Mominul',
    email: 'kazi.m@ictcenter.gov.bd',
    track: 'Agentic AI',
    assignedLab: 'LAB-04',
    workstationId: 'WS-05',
    platform: 'Upwork',
    profileScore: '100% JSS // Rising Star',
    hourlyRate: 70,
    totalEarnedYTD: 18400,
    activeContractsCount: 2,
    activeMilestoneTitle: 'Automated Document Extraction with Multimodal Vision',
    activeMilestoneAmount: 2100,
    status: 'ACTIVE',
    skills: ['Multimodal LLM', 'PyTorch', 'Vector Search', 'FastAPI'],
    joinedDate: '2024-06-18'
  },
  {
    id: 'STU-1205',
    name: 'Sabrina Mostafa',
    email: 'sabrina.m@ictcenter.gov.bd',
    track: 'Fullstack Web',
    assignedLab: 'LAB-04',
    workstationId: 'WS-14',
    platform: 'Direct Enterprise',
    profileScore: 'Enterprise Preferred Partner',
    hourlyRate: 85,
    totalEarnedYTD: 31200,
    activeContractsCount: 1,
    activeMilestoneTitle: 'High-Throughput Analytics Dashboard with WebGL Charts',
    activeMilestoneAmount: 3200,
    status: 'ACTIVE',
    skills: ['Three.js', 'React 19', 'WebGL', 'Tailwind CSS', 'WebSockets'],
    joinedDate: '2024-04-14'
  },
  {
    id: 'STU-1219',
    name: 'Zubair Al Mamun',
    email: 'zubair.m@ictcenter.gov.bd',
    track: 'DevOps & Cloud',
    assignedLab: 'LAB-03',
    workstationId: 'WS-17',
    platform: 'Upwork',
    profileScore: '100% JSS // Top Rated',
    hourlyRate: 75,
    totalEarnedYTD: 22600,
    activeContractsCount: 2,
    activeMilestoneTitle: 'Zero-Downtime Blue/Green Deployment Automation',
    activeMilestoneAmount: 1850,
    status: 'PENDING_REVIEW',
    skills: ['Docker', 'GitLab CI', 'AWS ECS', 'Bash', 'Terraform'],
    joinedDate: '2024-05-22'
  },
  {
    id: 'STU-1234',
    name: 'Mehedi Hasan Niloy',
    email: 'mehedi.n@ictcenter.gov.bd',
    track: 'Agentic AI',
    assignedLab: 'LAB-02',
    workstationId: 'WS-28',
    platform: 'Toptal',
    profileScore: 'Verified Core AI Engineer',
    hourlyRate: 110,
    totalEarnedYTD: 48900,
    activeContractsCount: 2,
    activeMilestoneTitle: 'Autonomous Code Refactoring Agent with Test Synthesis',
    activeMilestoneAmount: 5200,
    status: 'ACTIVE',
    skills: ['AST Parsing', 'Agent Swarms', 'Python', 'LLM Fine-tuning'],
    joinedDate: '2024-01-10'
  }
];

export const INITIAL_TRANSACTIONS: EarningTransaction[] = [
  {
    id: 'TXN-9024',
    freelancerName: 'Mehedi Hasan Niloy',
    studentId: 'STU-1234',
    platform: 'Toptal',
    amount: 5200,
    projectTitle: 'Autonomous Code Refactoring Agent Sprint 4',
    clientCountry: 'United States (San Francisco)',
    timestamp: '2 mins ago',
    verificationHash: '0x8f2a...c391',
    status: 'VERIFIED'
  },
  {
    id: 'TXN-9023',
    freelancerName: 'Tanvir Chowdhury',
    studentId: 'STU-1084',
    platform: 'Upwork',
    amount: 3400,
    projectTitle: 'Multi-Agent Financial Risk Engine Delivery',
    clientCountry: 'United Kingdom (London)',
    timestamp: '14 mins ago',
    verificationHash: '0x3b1c...e904',
    status: 'VERIFIED'
  },
  {
    id: 'TXN-9022',
    freelancerName: 'Shakil Ahmed',
    studentId: 'STU-1105',
    platform: 'Toptal',
    amount: 4500,
    projectTitle: 'Kubernetes Multi-Region Production Cutover',
    clientCountry: 'Germany (Berlin)',
    timestamp: '38 mins ago',
    verificationHash: '0x17d2...aa82',
    status: 'VERIFIED'
  },
  {
    id: 'TXN-9021',
    freelancerName: 'Farzana Akter',
    studentId: 'STU-1092',
    platform: 'Upwork',
    amount: 2800,
    projectTitle: 'HealthTech HIPAA Core Architecture Phase 2',
    clientCountry: 'Canada (Toronto)',
    timestamp: '1 hr ago',
    verificationHash: '0x44fa...719b',
    status: 'VERIFIED'
  },
  {
    id: 'TXN-9020',
    freelancerName: 'Sabrina Mostafa',
    studentId: 'STU-1205',
    platform: 'Direct Enterprise',
    amount: 3200,
    projectTitle: 'High-Throughput Analytics WebGL Canvas Engine',
    clientCountry: 'Singapore',
    timestamp: '2.5 hrs ago',
    verificationHash: '0x99e1...120a',
    status: 'VERIFIED'
  },
  {
    id: 'TXN-9019',
    freelancerName: 'Nusrat Tabassum',
    studentId: 'STU-1144',
    platform: 'Fiverr Pro',
    amount: 1950,
    projectTitle: 'SaaS Multi-Tenant Subscription Engine',
    clientCountry: 'Australia (Sydney)',
    timestamp: '3 hrs ago',
    verificationHash: '0x76c3...fd54',
    status: 'VERIFIED'
  }
];

export const INITIAL_LOGS: TerminalLog[] = [
  {
    id: 'LOG-01',
    timestamp: '20:58:12',
    level: 'SYS',
    message: 'COMMAND CENTER ICT KERNEL INITIALIZED // DAEMON ONLINE // 128 WORKSTATION NODES LINKED'
  },
  {
    id: 'LOG-02',
    timestamp: '20:58:20',
    level: 'HARDWARE',
    message: 'GPU CLUSTER H100 (LAB-02) REPORTS 89.4% ALLOCATION // COOLING FANS ENGAGED AT 78%'
  },
  {
    id: 'LOG-03',
    timestamp: '20:58:44',
    level: 'EARN',
    message: 'INCOMING ESCROW RELEASE: $5,200.00 FROM TOPTAL (ESCROW ID: 0x8f2a...c391) // TALENT: MEHEDI H.'
  },
  {
    id: 'LOG-04',
    timestamp: '20:59:01',
    level: 'NETWORK',
    message: 'CORE SFP+ FIBER SWITCH: 37.7 GBPS AGGREGATE LAB THROUGHPUT // PACKET LOSS 0.000%'
  },
  {
    id: 'LOG-05',
    timestamp: '20:59:15',
    level: 'SYS',
    message: 'DAILY YIELD BENCHMARK EXCEEDED: +18.4% RUN-RATE SURPASSES WEEKLY TARGET'
  },
  {
    id: 'LOG-06',
    timestamp: '20:59:30',
    level: 'ALERT',
    message: 'WORKSTATION WS-21 (LAB-03) REQUESTED MENTOR ASSISTANCE // SUBJECT: TERRAFORM STATE LOCK CONFLICT'
  }
];

export const INITIAL_ALERTS: LabAlert[] = [
  {
    id: 'ALT-101',
    labId: 'LAB-03',
    workstationId: 'WS-21',
    severity: 'WARNING',
    title: 'Workstation Mentor Request: Terraform Locking',
    description: 'Workstation WS-21 engineer requested senior DevOps review for live enterprise client lock conflict in DynamoDB state backend.',
    timestamp: '3 mins ago',
    acknowledged: false,
    assignedTo: 'Tanvir Hossain'
  },
  {
    id: 'ALT-102',
    labId: 'LAB-02',
    workstationId: 'WS-04',
    severity: 'ACHIEVEMENT',
    title: 'Major Milestone Cleared: $3,400.00 Upwork',
    description: 'Tanvir Chowdhury received client acceptance on LangGraph financial multi-agent architecture with 5-star rating.',
    timestamp: '14 mins ago',
    acknowledged: true
  },
  {
    id: 'ALT-103',
    labId: 'LAB-02',
    severity: 'INFO',
    title: 'H100 Tensor Pod Thermal Throttling Guard',
    description: 'GPU cluster auto-regulated clock frequency to maintain target temperature under 74°C during batch embedding pass.',
    timestamp: '28 mins ago',
    acknowledged: true
  },
  {
    id: 'ALT-104',
    labId: 'LAB-01',
    workstationId: 'WS-16',
    severity: 'WARNING',
    title: 'High Network Egress Burst Detected',
    description: 'WS-16 streaming 850 Mbps during automated Playwright distributed E2E test runs against staging cluster.',
    timestamp: '42 mins ago',
    acknowledged: false
  }
];

export const CURRICULUM_SPRINTS: CurriculumSprint[] = [
  {
    id: 'SPR-01',
    track: 'Agentic AI & Neural Reasoning Systems',
    cohort: 'Cohort 2026-Alpha',
    currentSprint: 'Sprint 08 // Autonomous Multi-Agent Workflows & Tool Use',
    weekProgress: 72,
    enrolledTalent: 32,
    milestoneAcceptanceRate: 97.4,
    keyTechnologies: ['Gemini 2.0 Flash / Pro', 'LangGraph', 'Vector Search', 'MCP Protocol', 'FastAPI'],
    leadInstructor: 'Dr. Nusrat Jahan'
  },
  {
    id: 'SPR-02',
    track: 'Full-Stack High-Scale Web Architecture',
    cohort: 'Cohort 2026-Beta',
    currentSprint: 'Sprint 10 // Distributed Caching, WebSockets & Server Actions',
    weekProgress: 88,
    enrolledTalent: 32,
    milestoneAcceptanceRate: 96.1,
    keyTechnologies: ['React 19', 'Next.js 15 App Router', 'PostgreSQL', 'Redis', 'Tailwind CSS v4'],
    leadInstructor: 'Arifur Rahman'
  },
  {
    id: 'SPR-03',
    track: 'Cloud-Native Kubernetes & DevSecOps Engineering',
    cohort: 'Cohort 2026-Gamma',
    currentSprint: 'Sprint 07 // Zero-Trust GitOps, ArgoCD & Service Meshes',
    weekProgress: 64,
    enrolledTalent: 32,
    milestoneAcceptanceRate: 94.8,
    keyTechnologies: ['Terraform', 'Kubernetes (EKS/GKE)', 'Istio', 'GitHub Actions', 'Prometheus'],
    leadInstructor: 'Tanvir Hossain'
  },
  {
    id: 'SPR-04',
    track: 'Global Freelance Mastery & High-Yield Client Acquisition',
    cohort: 'Continuous Masterclass',
    currentSprint: 'Module 06 // $10k+ Contract Negotiation & Enterprise Proposals',
    weekProgress: 91,
    enrolledTalent: 32,
    milestoneAcceptanceRate: 99.2,
    keyTechnologies: ['Upwork Enterprise', 'Toptal Core', 'Contract Pricing', 'Client Onboarding', 'SOW Structuring'],
    leadInstructor: 'Farhana Kabir'
  }
];

// Helper to generate 32 workstations per lab
export function generateWorkstations(labId: LabId): Workstation[] {
  const workstations: Workstation[] = [];
  const statusDist: WorkstationStatus[] = [
    'active', 'active', 'active', 'active', 'active', 'active', 'active', 'active',
    'active', 'active', 'active', 'active', 'active', 'active', 'active', 'benchmark',
    'active', 'active', 'active', 'active', 'assist', 'active', 'active', 'active',
    'active', 'active', 'active', 'active', 'standby', 'active', 'active', 'active'
  ];

  const processPool = [
    'npm run dev (Next.js 15 Server)',
    'docker compose up -d (Postgres + Redis)',
    'python -m agentic.swarm --model gemini',
    'terraform apply -auto-approve',
    'cargo build --release',
    'pnpm test:e2e (Playwright suite)',
    'uvicorn main:app --reload --workers 4',
    'kubectl rollout status deployment/api'
  ];

  const branches = ['main', 'feat/agent-tools', 'fix/db-indexes', 'feat/stripe-webhooks', 'perf/vector-retrieval'];

  for (let i = 1; i <= 32; i++) {
    const id = `WS-${i.toString().padStart(2, '0')}`;
    const status = statusDist[(i - 1) % statusDist.length];
    const isOccupied = status !== 'standby' && status !== 'offline';
    
    // Check if we have a student for this lab/seat
    const matchedStudent = INITIAL_STUDENTS.find(s => s.assignedLab === labId && s.workstationId === id);

    workstations.push({
      id,
      labId,
      seatNumber: i,
      status,
      occupant: isOccupied ? {
        id: matchedStudent ? matchedStudent.id : `ENG-${labId.replace('LAB-', '')}${i.toString().padStart(2, '0')}`,
        name: matchedStudent ? matchedStudent.name : `Operative ${labId}-${i.toString().padStart(2, '0')}`,
        avatarInitials: matchedStudent ? matchedStudent.name.split(' ').map(n => n[0]).join('') : `OP${i}`,
        track: matchedStudent ? matchedStudent.track : 'Software Engineering',
        platform: matchedStudent ? matchedStudent.platform : 'Upwork',
        rating: matchedStudent ? matchedStudent.profileScore : '100% Job Success',
        hourlyRate: matchedStudent ? matchedStudent.hourlyRate : 70,
        activeContract: matchedStudent ? matchedStudent.activeMilestoneTitle : 'Enterprise Microservice Modernization'
      } : undefined,
      metrics: {
        cpuPercent: isOccupied ? Math.floor(45 + Math.random() * 45) : 8,
        gpuPercent: isOccupied ? (labId === 'LAB-02' ? Math.floor(70 + Math.random() * 28) : Math.floor(20 + Math.random() * 40)) : 0,
        ramUsedGB: isOccupied ? Math.floor(24 + Math.random() * 28) : 6,
        ramTotalGB: 64,
        networkMbps: isOccupied ? Math.floor(120 + Math.random() * 400) : 12,
        activeProcess: processPool[(i * 3) % processPool.length],
        gitBranch: branches[(i + 1) % branches.length],
        uptimeHours: 7.4 + (i * 0.2)
      }
    });
  }

  return workstations;
}

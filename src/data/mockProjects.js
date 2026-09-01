export const PROJECT_LIFECYCLE_STAGES = [
  'Research',
  'Prototype',
  'Testing',
  'Implementation',
  'Completed'
];

export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-JH-2026-081',
    name: 'Project JalRakshak: Solar Fluoride IoT Filtration System',
    challengeId: 'CH-JH-2026-001',
    challengeTitle: 'Severe Groundwater Depletion & Fluoride Contamination in Angara Block',
    category: 'Water Management',
    district: 'Ranchi',
    university: 'Birla Institute of Technology (BIT) Mesra',
    teamName: 'Team JalRakshak',
    leadName: 'Aarav Sharma',
    industryMentor: 'Dr. Vivek Sengupta (Chief Sustainability Officer, Tata Steel Foundation)',
    govtCoordinator: 'Shri Rajesh K. Mishra (Executive Engineer, DW&SD Ranchi)',
    currentStage: 'Prototype',
    currentStageIndex: 1,
    completionPercentage: 62,
    status: 'In Progress',
    budget: '₹4,50,000',
    fundedBy: 'Tata Steel CSR & DST Seed Grant',
    startDate: '2026-01-05',
    expectedCompletion: '2026-06-30',
    description: 'Developing a localized low-cost activated alumina-bauxite adsorbent column coupled with an IoT telemetry board measuring real-time PPM fluoride and water flow rate.',
    teamMembers: [
      { name: 'Aarav Sharma', role: 'Team Lead & Chemical Design', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { name: 'Priya Kumari', role: 'IoT & Embedded Hardware', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
      { name: 'Rohan Verma', role: 'Mechanical Rig & Hydraulics', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Sneha Murmu', role: 'Field Testing & Community Liaison', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' }
    ],
    milestones: [
      { id: 'm1', title: 'Adsorbent Breakthrough & Lab Fluoride Analysis', dueDate: '2026-01-20', completionDate: '2026-01-18', status: 'Completed', note: 'Achieved 94.2% fluoride removal efficiency at pH 6.8.' },
      { id: 'm2', title: 'Benchtop 100 LPH Prototype Assembly', dueDate: '2026-02-15', completionDate: '2026-02-12', status: 'Completed', note: 'Fabricated stainless steel filtration column with regeneration port.' },
      { id: 'm3', title: 'IoT Flow & Fluoride Telemetry Integration', dueDate: '2026-03-25', status: 'In Progress', note: 'Interfacing electrochemical sensor node with ESP32 GSM gateway.' },
      { id: 'm4', title: 'Angara Panchayat 500-Liter Community Field Trial', dueDate: '2026-04-20', status: 'Upcoming', note: 'Scheduled with Angara Gram Sabha.' },
      { id: 'm5', title: 'Full Implementation & Operator Handover', dueDate: '2026-06-30', status: 'Upcoming', note: 'Final operational transfer to Village Water Committee.' }
    ],
    tasks: [
      { id: 't1', title: 'Calibrate fluoride optical sensor against spectrophotometer', assignee: 'Priya Kumari', status: 'Done', priority: 'High' },
      { id: 't2', title: 'Stress test 24V solar DC booster pump for continuous 8hr run', assignee: 'Rohan Verma', status: 'In Progress', priority: 'High' },
      { id: 't3', title: 'Design backwash sludge precipitation protocol', assignee: 'Aarav Sharma', status: 'In Progress', priority: 'Medium' },
      { id: 't4', title: 'Draft Gram Panchayat training manual in Hindi & Mundari', assignee: 'Sneha Murmu', status: 'To Do', priority: 'Low' }
    ],
    updates: [
      { id: 'u1', author: 'Aarav Sharma', date: '2026-02-25', content: 'Completed test run 4 with raw water from Angara borewell. Fluoride reduced from 3.8 mg/L to 0.65 mg/L well under BIS standard limit.' },
      { id: 'u2', author: 'Dr. Vivek Sengupta (Mentor)', date: '2026-02-20', content: 'Reviewed mechanical CAD drawing. Advise switching the primary seal to EPDM gasket to handle high iron mineral deposits common in Ranchi soil.' }
    ],
    documents: [
      { name: 'Water_Quality_Lab_Report_Jan2026.pdf', size: '2.4 MB', date: '2026-01-28' },
      { name: 'JalRakshak_System_Architecture_v2.pdf', size: '4.8 MB', date: '2026-02-12' }
    ],
    mentorFeedback: [
      { id: 'f1', mentor: 'Dr. Vivek Sengupta', org: 'Tata Steel Foundation', rating: 5, date: '2026-02-22', text: 'Exceptional progress by the student team. The adsorbent lifecycle analysis looks commercially viable for replication across 50+ panchayats in Kolhan and South Chotanagpur.' }
    ]
  },
  {
    id: 'PRJ-JH-2026-082',
    name: 'Project ShikshaSetu: Offline Solar Mesh STEM Lab',
    challengeId: 'CH-JH-2026-004',
    challengeTitle: 'Digital STEM Lab Gap in Tribal High Schools of Saraikela & Ghatshila',
    category: 'Education & STEM',
    district: 'East Singhbhum (Jamshedpur)',
    university: 'National Institute of Technology (NIT) Jamshedpur',
    teamName: 'Team ShikshaSetu',
    leadName: 'Manish Hansda',
    industryMentor: 'Rashmi Sen (Head of EdTech Innovation, TCS Foundation)',
    govtCoordinator: 'Anupama Toppo (District Education Officer, East Singhbhum)',
    currentStage: 'Testing',
    currentStageIndex: 2,
    completionPercentage: 78,
    status: 'In Progress',
    budget: '₹3,20,000',
    fundedBy: 'Tata Steel CSR Education Grant',
    startDate: '2025-11-01',
    expectedCompletion: '2026-05-15',
    description: 'Low-cost Raspberry Pi micro-servers operating autonomous Wi-Fi mesh networks loaded with PhET interactive simulations, audio books in Santhali & Hindi, and offline coding sandboxes.',
    teamMembers: [
      { name: 'Manish Hansda', role: 'Software Architecture & Ol Chiki Localization', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { name: 'Ankita Das', role: 'UI/UX & Pedagogical Design', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
      { name: 'Deepak Soren', role: 'Solar Power Circuit & Hardware Casing', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80' }
    ],
    milestones: [
      { id: 'm1', title: 'Content curation in Santhali & Hindi', dueDate: '2025-11-20', status: 'Completed', note: 'Mapped 140 science & math modules.' },
      { id: 'm2', title: 'Solar enclosure with 12V LiFePO4 battery pack', dueDate: '2026-01-15', status: 'Completed', note: 'Gives 14-hour continuous runtime without grid.' },
      { id: 'm3', title: 'Pilot in Potka High School (120 students)', dueDate: '2026-02-10', status: 'Completed', note: 'Zero packet loss on 40 simultaneous tablet connections.' },
      { id: 'm4', title: 'Scale to 10 more schools in Ghatshila', dueDate: '2026-04-15', status: 'In Progress', note: 'Procuring 10 Raspberry Pi 5 kits.' }
    ],
    tasks: [
      { id: 't1', title: 'Translate 20 physics simulation guides to Ol Chiki', assignee: 'Manish Hansda', status: 'In Progress', priority: 'High' },
      { id: 't2', title: 'Create offline quiz scoring analytics dashboard', assignee: 'Ankita Das', status: 'Done', priority: 'Medium' }
    ],
    updates: [
      { id: 'u1', author: 'Manish Hansda', date: '2026-02-27', content: 'Potka High School headmaster reported an 85% attendance increase on STEM lab activity days!' }
    ],
    documents: [
      { name: 'Potka_School_Student_Feedback_Jan2026.pdf', size: '1.9 MB', date: '2026-02-15' }
    ],
    mentorFeedback: [
      { id: 'f1', mentor: 'Rashmi Sen', org: 'TCS Foundation', rating: 5, date: '2026-02-18', text: 'The offline mesh capability is phenomenal for areas with zero cellular connectivity.' }
    ]
  },
  {
    id: 'PRJ-JH-2026-083',
    name: 'Project CoolChain: Solar Evaporative Micro Cold Storage',
    challengeId: 'CH-JH-2026-002',
    challengeTitle: 'Post-Harvest Tomato & Vegetable Spoilage in Ormanjhi Market Hub',
    category: 'Agriculture & Cold Chain',
    district: 'Ranchi',
    university: 'Birsa Agricultural University & IIT ISM Dhanbad',
    teamName: 'Team CoolChain X',
    leadName: 'Vikas Kumar',
    industryMentor: 'Sanjay Agarwal (VP Supply Chain, Reliance Retail East)',
    govtCoordinator: 'Dr. R. P. Singh (Director, JSLPS Agriculture Wing)',
    currentStage: 'Testing',
    currentStageIndex: 2,
    completionPercentage: 74,
    status: 'In Progress',
    budget: '₹6,00,000',
    fundedBy: 'NABARD Innovation Fund',
    startDate: '2025-12-01',
    expectedCompletion: '2026-05-30',
    description: '15-metric-ton walk-in evaporative cold room utilizing phase change materials (PCM) to maintain 8-12°C and 90% relative humidity without diesel generators.',
    teamMembers: [
      { name: 'Vikas Kumar', role: 'Thermal & Refrigeration Design', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
      { name: 'Kavita Mahato', role: 'Post-Harvest Bio-Quality Testing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }
    ],
    milestones: [
      { id: 'm1', title: 'PCM Thermal Storage Modeling', dueDate: '2025-12-10', status: 'Completed', note: 'Validated with CFD simulations.' },
      { id: 'm2', title: 'Prefabricated Insulated PUF Chamber', dueDate: '2026-01-20', status: 'Completed', note: 'Installed at Ormanjhi APMC yard.' },
      { id: 'm3', title: '14-Day Tomato Shelf-life validation', dueDate: '2026-02-28', status: 'Completed', note: 'Shelf-life extended from 2 days to 16 days.' }
    ],
    tasks: [
      { id: 't1', title: 'Calibrate digital relative humidity sensors', assignee: 'Vikas Kumar', status: 'Done', priority: 'Medium' }
    ],
    updates: [
      { id: 'u1', author: 'Vikas Kumar', date: '2026-02-26', content: 'Stored 250 crates of tomatoes during last week market price crash; farmers sold them 8 days later at ₹18/kg instead of distress price ₹3/kg!' }
    ],
    documents: [
      { name: 'Ormanjhi_Cold_Room_Trial_Results.pdf', size: '3.5 MB', date: '2026-02-22' }
    ],
    mentorFeedback: []
  }
];

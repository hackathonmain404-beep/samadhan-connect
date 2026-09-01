const usersData = [
  {
    name: 'Ramesh Mahto',
    email: 'citizen@example.com',
    password: 'password123',
    role: 'citizen',
    phone: '+91 9876543210',
    location: 'Ranchi, Jharkhand',
    bio: 'Local community representative and social activist in Ranchi district focusing on water and civic infrastructure.',
    skills: ['Community Organizing', 'Civic Action', 'Local Governance'],
    university: '',
    organization: 'Ranchi Citizens Welfare Association'
  },
  {
    name: 'Sunita Oraon',
    email: 'sunita.citizen@example.com',
    password: 'password123',
    role: 'citizen',
    phone: '+91 9876543211',
    location: 'Khunti, Jharkhand',
    bio: 'Organic farmer and tribal self-help group coordinator in Khunti district.',
    skills: ['Agriculture', 'Tribal Handicrafts', 'Rural Self Help Groups'],
    university: '',
    organization: 'Birsa Rural Self-Help Group'
  },
  {
    name: 'Rahul Kumar',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    phone: '+91 9876543212',
    location: 'BIT Mesra, Ranchi, Jharkhand',
    bio: 'Final year Computer Science student passionate about IoT, AI for social impact, and renewable energy.',
    skills: ['React', 'Node.js', 'Python', 'IoT', 'Machine Learning', 'Embedded Systems'],
    university: 'Birla Institute of Technology (BIT) Mesra',
    organization: 'Robotics & Innovation Club'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.student@example.com',
    password: 'password123',
    role: 'student',
    phone: '+91 9876543213',
    location: 'NIT Jamshedpur, Jharkhand',
    bio: 'Electronics and Electrical Engineering student building low-cost environmental monitoring devices.',
    skills: ['Embedded C', 'Arduino', 'Python', 'PCB Design', 'LoRaWAN'],
    university: 'National Institute of Technology (NIT) Jamshedpur',
    organization: 'Green Energy Innovators'
  },
  {
    name: 'Prof. Amit Verma',
    email: 'university@example.com',
    password: 'password123',
    role: 'university',
    phone: '+91 9876543214',
    location: 'Ranchi, Jharkhand',
    bio: 'Dean of Research & Innovation at BIT Mesra. Mentoring university student teams tackling state societal problems.',
    skills: ['Research Mentorship', 'Environmental Engineering', 'Project Management', 'Grant Writing'],
    university: 'Birla Institute of Technology (BIT) Mesra',
    organization: 'Centre for Innovation and Incubation (CII)'
  },
  {
    name: 'Dr. Sneha Singh',
    email: 'sneha.nit@example.com',
    password: 'password123',
    role: 'university',
    phone: '+91 9876543215',
    location: 'Jamshedpur, Jharkhand',
    bio: 'Associate Professor, Department of Civil & Environmental Engineering, NIT Jamshedpur.',
    skills: ['Water Quality Assessment', 'Sensors', 'Hydrology', 'Environmental Sustainability'],
    university: 'National Institute of Technology (NIT) Jamshedpur',
    organization: 'NIT Water Research Cell'
  },
  {
    name: 'Rajesh Agarwal',
    email: 'industry@example.com',
    password: 'password123',
    role: 'industry',
    phone: '+91 9876543216',
    location: 'Jamshedpur, Jharkhand',
    bio: 'Head of CSR & Sustainable Technology at Tata Steel Jamshedpur.',
    skills: ['CSR Initiatives', 'Industrial IoT', 'Supply Chain', 'Clean Tech Mentorship'],
    university: '',
    organization: 'Tata Steel Limited'
  },
  {
    name: 'Vikram Malhotra',
    email: 'sail.industry@example.com',
    password: 'password123',
    role: 'industry',
    phone: '+91 9876543217',
    location: 'Bokaro Steel City, Jharkhand',
    bio: 'Chief Innovation Officer, SAIL Bokaro Plant. Supporting grassroots innovation in Jharkhand.',
    skills: ['Metallurgy', 'Manufacturing', 'Green Hydrogen', 'Industrial Automation'],
    university: '',
    organization: 'Steel Authority of India Limited (SAIL)'
  },
  {
    name: 'Anil Kumar Jha',
    email: 'government@example.com',
    password: 'password123',
    role: 'government',
    phone: '+91 9876543218',
    location: 'Project Building, Dhurwa, Ranchi',
    bio: 'Director of Urban Planning & Citizen Services, Department of Urban Development and Housing, Government of Jharkhand.',
    skills: ['Public Administration', 'Policy Making', 'Smart City Implementation', 'GovTech'],
    university: '',
    organization: 'Government of Jharkhand'
  },
  {
    name: 'Samadhan Admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    phone: '+91 9876543219',
    location: 'Ranchi, Jharkhand',
    bio: 'Master Administrator for Samadhan Connect Portal.',
    skills: ['Platform Administration', 'Data Analytics', 'Stakeholder Coordination', 'System Security'],
    university: '',
    organization: 'Jharkhand Innovation Council'
  }
];

const universitiesData = [
  {
    name: 'Birla Institute of Technology (BIT) Mesra',
    location: 'Mesra Campus, Ranchi',
    district: 'Ranchi',
    description: 'Premier technical institute established in 1955 known for cutting-edge engineering, space technology, and rural technology incubation.',
    specializations: ['Computer Science', 'IoT & Embedded Systems', 'Environmental Engineering', 'Space Technology', 'Robotics'],
    website: 'https://www.bitmesra.ac.in',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&auto=format&fit=crop&q=80',
    researchers: 85,
    studentTeams: 32,
    activeProjects: 6,
    completedProjects: 14
  },
  {
    name: 'National Institute of Technology (NIT) Jamshedpur',
    location: 'Adityapur, Jamshedpur',
    district: 'East Singhbhum',
    description: 'Institute of National Importance with strong focus on manufacturing, smart materials, civil infrastructure, and clean water technologies.',
    specializations: ['Civil & Water Resources', 'Mechanical Engineering', 'Clean Energy', 'AI & Data Science'],
    website: 'https://www.nitjsr.ac.in',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&auto=format&fit=crop&q=80',
    researchers: 72,
    studentTeams: 28,
    activeProjects: 5,
    completedProjects: 11
  },
  {
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    location: 'Sardar Patel Nagar, Dhanbad',
    district: 'Dhanbad',
    description: 'World-renowned institute pioneering mining engineering, earth sciences, geophysics, and automated environmental sensor networks.',
    specializations: ['Mining & Geology', 'Air Quality Monitoring', 'Geotechnical Engineering', 'Computer Science'],
    website: 'https://www.iitism.ac.in',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80',
    researchers: 120,
    studentTeams: 45,
    activeProjects: 8,
    completedProjects: 19
  },
  {
    name: 'Ranchi University',
    location: 'Morabadi, Ranchi',
    district: 'Ranchi',
    description: 'Major state university supporting extensive multidisciplinary research in tribal sociology, rural economics, and herbal medicine.',
    specializations: ['Tribal Studies', 'Botany & Herbal Medicine', 'Rural Development', 'Information Technology'],
    website: 'https://www.ranchiuniversity.ac.in',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&auto=format&fit=crop&q=80',
    researchers: 45,
    studentTeams: 18,
    activeProjects: 3,
    completedProjects: 8
  },
  {
    name: 'Kolhan University',
    location: 'Chaibasa, West Singhbhum',
    district: 'West Singhbhum',
    description: 'Prominent regional state university catering to Kolhan division with dedicated research in forest products, indigenous languages, and public health.',
    specializations: ['Forest Produce Tech', 'Indigenous Health', 'Vocational Education', 'Environmental Science'],
    website: 'https://www.kolhanuniversity.ac.in',
    logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&auto=format&fit=crop&q=80',
    researchers: 30,
    studentTeams: 14,
    activeProjects: 2,
    completedProjects: 5
  }
];

const industryData = [
  {
    name: 'Tata Steel Limited',
    industry: 'Steel & Metallurgy / Smart Manufacturing',
    location: 'Jamshedpur, East Singhbhum',
    description: 'One of the world’s most geographically diversified steel producers, supporting sustainable community innovation through CSR and technical mentorship in Jharkhand.',
    expertise: ['Industrial Automation', 'Water Recycling', 'Clean Technology', 'Sustainable Supply Chains'],
    website: 'https://www.tatasteel.com',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    projectsMentored: 12,
    projectsSponsored: 8
  },
  {
    name: 'Steel Authority of India Limited (SAIL) - Bokaro',
    industry: 'Heavy Industry / Steel Manufacturing',
    location: 'Bokaro Steel City',
    description: 'Maharatna CPSE operating the flagship Bokaro Steel Plant, actively funding innovation projects in air pollution control and skill development.',
    expertise: ['Heavy Machinery', 'Thermal Management', 'Emission Reduction', 'Vocational Training'],
    website: 'https://www.sail.co.in',
    logo: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=200&auto=format&fit=crop&q=80',
    projectsMentored: 7,
    projectsSponsored: 5
  },
  {
    name: 'Central Coalfields Limited (CCL)',
    industry: 'Mining & Natural Resources',
    location: 'Darbhanga House, Ranchi',
    description: 'Category-I Mini-Ratna company under Ministry of Coal fostering mine reclamation, groundwater rejuvenation, and solar energy transitions across Jharkhand coalfields.',
    expertise: ['Ecological Restoration', 'Solar Microgrids', 'Groundwater Management', 'Heavy Earth Moving Safety'],
    website: 'https://www.centralcoalfields.in',
    logo: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=200&auto=format&fit=crop&q=80',
    projectsMentored: 9,
    projectsSponsored: 6
  },
  {
    name: 'Jindal Steel & Power (JSPL)',
    industry: 'Infrastructure & Power Generation',
    location: 'Balkudra, Patratu, Ramgarh',
    description: 'Major industrial conglomerate driving state-of-the-art wire rod mills and community solar micro-grids in Ramgarh and Ranchi districts.',
    expertise: ['Renewable Energy', 'Civil Structural Design', 'Community Health', 'Fly Ash Utilization'],
    website: 'https://www.jindalsteelpower.com',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
    projectsMentored: 4,
    projectsSponsored: 3
  },
  {
    name: 'Tata Motors Commercial Vehicles',
    industry: 'Automotive & Electric Mobility',
    location: 'Telco Colony, Jamshedpur',
    description: 'India’s leading commercial vehicle manufacturing unit supporting electric mobility pilots and smart transit solutions for Jharkhand towns.',
    expertise: ['Electric Vehicles', 'Telematics', 'Fleet Logistics', 'Battery Management Systems'],
    website: 'https://www.tatamotors.com',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
    projectsMentored: 6,
    projectsSponsored: 4
  }
];

const challengesData = [
  {
    title: 'High Fluoride & Arsenic Contamination in Rural Handpumps of Palamu',
    shortDescription: 'Over 40 villages in Palamu district suffer from severe groundwater fluoride contamination causing dental and skeletal fluorosis among children.',
    description: 'Groundwater sampling across Daltonganj and Hussainabad blocks in Palamu reveals fluoride levels exceeding 4.5 mg/L (safe limit is 1.0 mg/L). Villagers and primary school students are experiencing crippling joint pain and dental fluorosis. A sustainable, community-maintained, electricity-independent filtration solution is urgently required.',
    category: 'Water Management',
    location: 'Hussainabad Block, Daltonganj',
    district: 'Palamu',
    urgency: 'critical',
    status: 'verified',
    affectedPeople: '25,000+ residents across 42 villages',
    duration: 'Ongoing for 5+ years',
    expectedOutcome: 'Low-cost decentralized filter reducing fluoride < 1.0 mg/L with easy adsorbent recharging by village panchayats.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'palamu_handpump_sample.jpg'
      }
    ],
    supportCount: 48,
    teamCount: 4,
    solutionCount: 2
  },
  {
    title: 'Lack of Solar Cold Storage for Lac & Mahua Forest Produce Harvesters',
    shortDescription: 'Tribal farmers in Khunti face 40% post-harvest spoilage of Mahua blossoms and Lac resins due to absent climate-controlled storage in remote villages.',
    description: 'Smallholder tribal collectors in Torpa and Rania blocks of Khunti district harvest premium quality Lac resin and Mahua flowers during peak season. Without local cold storage or drying units, distress selling occurs at 1/3rd market price to middlemen. Solar-powered micro cold storage hubs can preserve produce and triple tribal family incomes.',
    category: 'Rural Livelihood',
    location: 'Torpa Block, Khunti',
    district: 'Khunti',
    urgency: 'high',
    status: 'verified',
    affectedPeople: '8,000+ tribal harvesting families',
    duration: 'Seasonal peak (March-June)',
    expectedOutcome: 'Off-grid 5-metric ton solar-powered modular cold room prototype operated by women self-help groups.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'mahua_harvest_khunti.jpg'
      }
    ],
    supportCount: 36,
    teamCount: 3,
    solutionCount: 2
  },
  {
    title: 'Severe Industrial Fly Ash & Particulate Dispersion in Jharia Coal Belt',
    shortDescription: 'Uncontrolled coal dust and particulate emissions (PM2.5 > 350) near residential colonies and schools surrounding Jharia opencast mines.',
    description: 'Open cast coal mining and unpaved coal transportation routes generate immense dust clouds in Bastacolla and Lodna areas of Dhanbad. Residents face chronic respiratory ailments and asthma. We need autonomous mist cannons, dust suppression surfactants, and real-time community air quality alerting screens.',
    category: 'Environment',
    location: 'Bastacolla Area, Jharia',
    district: 'Dhanbad',
    urgency: 'critical',
    status: 'verified',
    affectedPeople: '80,000+ residents',
    duration: 'Chronic continuous issue',
    expectedOutcome: 'IoT dust monitoring sensor array linked to automated solar water mist cannons reducing PM2.5 by 60%.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'jharia_dust_pollution.jpg'
      }
    ],
    supportCount: 62,
    teamCount: 5,
    solutionCount: 3
  },
  {
    title: 'Difficult Maternal Emergency Transit Across Forest Hills in Santhal Parganas',
    shortDescription: 'Expectant mothers in hilly forested hamlets of Deoghar face 4-hour delays reaching Community Health Centres during monsoons.',
    description: 'In Sarwan and Mohanpur blocks, hilly forest roads become impassable for standard four-wheeler ambulances during the monsoon. Pregnant women are often carried on makeshift cots, leading to high-risk obstetric emergencies. A customized all-terrain e-ambulance or drone blood-delivery network is desperately required.',
    category: 'Healthcare',
    location: 'Sarwan Forest Belt, Deoghar',
    district: 'Deoghar',
    urgency: 'critical',
    status: 'open',
    affectedPeople: '15,000+ villagers across 28 forest hamlets',
    duration: 'Critical during June to October monsoons',
    expectedOutcome: 'Ruggedized solar electric mini-ambulance with tele-triage kit deployed at Sarwan CHC.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'deoghar_rural_healthcare.jpg'
      }
    ],
    supportCount: 54,
    teamCount: 3,
    solutionCount: 1
  },
  {
    title: 'Monsoon Flash Waterlogging and Silted Storm Drains in Ranchi Smart City Zone',
    shortDescription: 'Heavy waterlogging on Harmu bypass, Kantatoli, and Morabadi following 30 minutes of rain due to silted underground culverts.',
    description: 'Urban runoffs inundate commercial and residential streets causing severe traffic gridlocks and water contamination in Ranchi. Traditional municipal drain cleaning is reactive and lacks depth sensors or blockage mapping. A smart acoustic or LiDAR silt profiling tool for open and closed drains will streamline preventive maintenance.',
    category: 'Urban Infrastructure',
    location: 'Harmu Bypass & Kantatoli',
    district: 'Ranchi',
    urgency: 'high',
    status: 'in_progress',
    affectedPeople: '150,000+ daily commuters and residents',
    duration: 'Every monsoon season',
    expectedOutcome: 'Smart drainage sensor mesh alerting municipal corporation (RMC) 48 hours prior to overflow blockages.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'ranchi_urban_drainage.jpg'
      }
    ],
    supportCount: 77,
    teamCount: 6,
    solutionCount: 2
  },
  {
    title: 'Solar Powered Smart Interactive Classrooms for Remote Tribal Residential Schools',
    shortDescription: 'Frequent grid power outages (12-16 hours/day) in West Singhbhum disrupt digital literacy in Kasturba Gandhi Balika Vidyalayas (KGBVs).',
    description: 'Girl students in KGBV schools across Chaibasa and Jhinkpani have computers and digital tablets provided under state schemes, but irregular grid electricity prevents usage. A resilient DC microgrid combined with offline vernacular digital content servers in Ho and Mundari languages is needed.',
    category: 'Education',
    location: 'Jhinkpani KGBV School, Chaibasa',
    district: 'West Singhbhum',
    urgency: 'medium',
    status: 'verified',
    affectedPeople: '4,500+ tribal girl students across 12 KGBVs',
    duration: 'Persistent year-round',
    expectedOutcome: '100% solar microgrid powered smart interactive boards with offline NCERT/JCERT localized curriculum.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'chaibasa_school_classroom.jpg'
      }
    ],
    supportCount: 41,
    teamCount: 2,
    solutionCount: 1
  },
  {
    title: 'Post-Harvest Loss of Organic Vegetables in Bero & Mandar Green Belt',
    shortDescription: 'Cauliflower and tomato farmers in Ranchi rural corridor dump tons of produce during glut weeks due to lack of solar dehydration technology.',
    description: 'Farmers in Bero mandis produce bumper crops of tomatoes, capsicum, and cabbage. During peak surplus weeks, wholesale prices crash to Rs 2/kg and surplus rots in open fields. High-efficiency solar hybrid dryers and pulping units could create shelf-stable sun-dried vegetables and tomato puree.',
    category: 'Agriculture',
    location: 'Bero Vegetable Market',
    district: 'Ranchi',
    urgency: 'high',
    status: 'open',
    affectedPeople: '6,200+ marginal vegetable growers',
    duration: 'December - March harvest cycles',
    expectedOutcome: 'Low-cost community solar hybrid tunnel dryer with processing capacity of 500kg/day per panchayat.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23d9a?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'bero_vegetable_mandi.jpg'
      }
    ],
    supportCount: 29,
    teamCount: 2,
    solutionCount: 1
  },
  {
    title: 'Plastic Waste Accumulation at Weekly Rural Haats in Bokaro',
    shortDescription: 'Single-use plastic bags and thermocol discarded weekly across 18 village haats clog irrigation canals and harm grazing livestock.',
    description: 'Weekly village haats in Chas and Chandankyari generate over 2 tons of single-use plastic waste every week. Uncollected plastic ends up in ponds and fields. We need a circular economy solution using local Sal leaf bio-packaging alternatives and decentralized shredding for road-asphalt mixes.',
    category: 'Sanitation',
    location: 'Chas Rural Haat, Bokaro',
    district: 'Bokaro',
    urgency: 'medium',
    status: 'verified',
    affectedPeople: '30,000+ haat visitors and farmers',
    duration: 'Ongoing weekly',
    expectedOutcome: '100% biodegradable Sal leaf pressing cooperatives replacing polythene, plus localized mini plastic baling unit.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'bokaro_haat_waste.jpg'
      }
    ],
    supportCount: 23,
    teamCount: 1,
    solutionCount: 1
  },
  {
    title: 'Lack of Accessibility Ramps & Assistive Auditory Aids in Giridih Civil Hospital',
    shortDescription: 'Divyangjan and elderly citizens face physical barriers accessing diagnostic labs, OPD counters, and wards on higher floors.',
    description: 'Giridih Sadar Hospital serves over 1,200 daily patients. However, wheelchair ramps have steep unsafe gradients, braille signage is nonexistent, and the audio queue announcement system is broken, leaving visually and hearing impaired patients stranded.',
    category: 'Accessibility',
    location: 'Sadar Hospital Campus, Giridih',
    district: 'Giridih',
    urgency: 'medium',
    status: 'verified',
    affectedPeople: '12,000+ disabled & elderly visitors yearly',
    duration: 'Over 3 years since building expansion',
    expectedOutcome: 'Universal design retrofits: tactile paving, multi-lingual audio-visual smart queue kiosk, and standard grade 1:12 ramps.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'giridih_hospital_ramp.jpg'
      }
    ],
    supportCount: 31,
    teamCount: 2,
    solutionCount: 1
  },
  {
    title: 'Delays in Direct Benefit Pension & Ration Allotment Redressal in Dumka',
    shortDescription: 'Elderly tribal pensioners in Dumka travel up to 35 km repeatedly to block offices to resolve fingerprint biometric mismatch issues.',
    description: 'Due to manual labor, biometric fingerprint wear among elderly Santhal citizens causes frequent failure at POS ration shops and bank CSPs. Grievance filing requires paper forms that take months to reach the Sub-Divisional Officer. An iris/facial recognition mobile verification unit and localized SMS tracking will resolve distress.',
    category: 'Public Services',
    location: 'Ranishwar & Shikaripara Blocks',
    district: 'Dumka',
    urgency: 'high',
    status: 'pending',
    affectedPeople: '18,500+ social security beneficiaries',
    duration: 'Ongoing biometric issue',
    expectedOutcome: 'Mobile Iris-enabled door-step authentication van and instant ticket tracking via WhatsApp chatbot in Santhali & Hindi.',
    evidence: [
      {
        url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80',
        fileType: 'image',
        originalName: 'dumka_ration_beneficiary.jpg'
      }
    ],
    supportCount: 19,
    teamCount: 1,
    solutionCount: 0
  }
];

module.exports = {
  usersData,
  universitiesData,
  industryData,
  challengesData
};

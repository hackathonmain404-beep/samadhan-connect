const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Solution = require('../models/Solution');
const Project = require('../models/Project');
const Team = require('../models/Team');
const University = require('../models/University');
const IndustryPartner = require('../models/IndustryPartner');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const ProjectUpdate = require('../models/ProjectUpdate');
const Milestone = require('../models/Milestone');
const Support = require('../models/Support');
const Message = require('../models/Message');

const {
  usersData,
  universitiesData,
  industryData,
  challengesData
} = require('./seedData');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/samadhan_connect';
    console.log(`Connecting to database: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing database collections...');
    await Promise.all([
      User.deleteMany(),
      Challenge.deleteMany(),
      Solution.deleteMany(),
      Project.deleteMany(),
      Team.deleteMany(),
      University.deleteMany(),
      IndustryPartner.deleteMany(),
      Comment.deleteMany(),
      Notification.deleteMany(),
      ProjectUpdate.deleteMany(),
      Milestone.deleteMany(),
      Support.deleteMany(),
      Message.deleteMany()
    ]);
    console.log('Database cleared.');

    // 1. Seed Universities
    console.log('Seeding Universities...');
    const createdUniversities = await University.insertMany(universitiesData);
    console.log(`Seeded ${createdUniversities.length} universities.`);

    // 2. Seed Industry Partners
    console.log('Seeding Industry Partners...');
    const createdIndustry = await IndustryPartner.insertMany(industryData);
    console.log(`Seeded ${createdIndustry.length} industry partners.`);

    // 3. Seed Users
    console.log('Seeding Users (with hashed passwords)...');
    const createdUsers = [];
    for (const u of usersData) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`Seeded ${createdUsers.length} users across citizen, student, university, industry, government, and admin roles.`);

    const citizenUser = createdUsers.find((u) => u.email === 'citizen@example.com');
    const sunitaCitizen = createdUsers.find((u) => u.email === 'sunita.citizen@example.com');
    const studentUser = createdUsers.find((u) => u.email === 'student@example.com');
    const priyaStudent = createdUsers.find((u) => u.email === 'priya.student@example.com');
    const univUser = createdUsers.find((u) => u.email === 'university@example.com');
    const snehaUniv = createdUsers.find((u) => u.email === 'sneha.nit@example.com');
    const industryUser = createdUsers.find((u) => u.email === 'industry@example.com');
    const sailIndustry = createdUsers.find((u) => u.email === 'sail.industry@example.com');
    const govtUser = createdUsers.find((u) => u.email === 'government@example.com');
    const adminUser = createdUsers.find((u) => u.email === 'admin@example.com');

    // 4. Seed Teams
    console.log('Seeding Student Innovator Teams...');
    const team1 = await Team.create({
      name: 'BIT Jal Suraksha Innovators',
      leader: studentUser._id,
      members: [studentUser._id, priyaStudent._id],
      university: 'Birla Institute of Technology (BIT) Mesra',
      skills: ['IoT', 'Water Filtration', 'Microcontrollers', 'React']
    });

    const team2 = await Team.create({
      name: 'NIT CleanAir Warriors',
      leader: priyaStudent._id,
      members: [priyaStudent._id, studentUser._id],
      university: 'National Institute of Technology (NIT) Jamshedpur',
      skills: ['LoRaWAN', 'Air Sensors', 'Embedded C', 'Hardware Prototyping']
    });

    const team3 = await Team.create({
      name: 'Green Agro Innovators',
      leader: studentUser._id,
      members: [studentUser._id],
      university: 'Birla Institute of Technology (BIT) Mesra',
      skills: ['Solar Energy', 'Cold Storage Tech', 'Thermal Modeling']
    });
    console.log('Seeded 3 teams.');

    // 5. Seed Challenges
    console.log('Seeding 10 Jharkhand Challenges...');
    const createdChallenges = [];
    for (let i = 0; i < challengesData.length; i++) {
      const c = challengesData[i];
      const submitter = i % 2 === 0 ? citizenUser._id : sunitaCitizen._id;
      const challenge = await Challenge.create({
        ...c,
        submittedBy: submitter
      });
      createdChallenges.push(challenge);
    }
    console.log(`Seeded ${createdChallenges.length} challenges.`);

    // 6. Seed Solutions
    console.log('Seeding Solution Proposals...');
    const solution1 = await Solution.create({
      title: 'IoT-enabled Activated Alumina Bio-Sand Fluoride Filtration Unit',
      challenge: createdChallenges[0]._id, // Palamu Water
      description: 'A hybrid gravity-fed domestic and community water purification system using locally sourced activated alumina and modified bio-sand layers. Embedded with an ultrasonic flow sensor and ESP32 IoT node to notify village water committees when adsorbent saturation reaches 85%.',
      team: team1._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      proposedTechnology: ['Activated Alumina Adsorption', 'ESP32 IoT Sensor Node', 'Bio-Sand Multi-Barrier Filter', 'Solar Battery Unit'],
      implementationPlan: 'Phase 1: Lab water testing & column design at BIT Mesra. Phase 2: Pilot deployment of 5 units in Hussainabad village. Phase 3: Panchayat training & local supply chain for regenerant.',
      expectedImpact: 'Reduces groundwater fluoride from 4.8 mg/L to < 0.6 mg/L, providing clean potable water to over 2,500 school children and villagers.',
      estimatedDuration: '4 months',
      requiredResources: 'Rs 1,50,000 prototype funding, water testing spectrophotometer access, adsorbent materials.',
      industrySupportRequired: true,
      documents: [
        {
          url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80',
          fileType: 'document',
          originalName: 'palamu_fluoride_technical_blueprint.pdf'
        }
      ],
      status: 'approved',
      submittedBy: studentUser._id,
      feedback: 'Excellent proposal with high grassroots relevance. Approved for project prototyping funding.'
    });

    const solution2 = await Solution.create({
      title: 'Decentralized Solar-Powered Phase-Change Cold Pods for Forest Produce',
      challenge: createdChallenges[1]._id, // Khunti Cold Storage
      description: 'Micro cold room utilizing PCM (Phase Change Material) thermal storage panels and 3kW rooftop solar array to maintain 4°C - 10°C temperature for Mahua flowers and Lac gum without grid power or diesel generators.',
      team: team3._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      proposedTechnology: ['Phase Change Materials (PCM)', 'Solar DC Compressors', 'Bamboo Composite Thermal Insulation'],
      implementationPlan: 'Fabricate 1 portable 3-ton demonstration pod in Torpa block, integrate mobile app monitoring, and hand over management to Mahila Samiti.',
      expectedImpact: 'Reduces post-harvest produce spoilage from 40% to under 4%, enhancing seasonal income of 450 tribal households by 180%.',
      estimatedDuration: '6 months',
      requiredResources: 'PCM panels, solar inverter, insulated puff panels.',
      industrySupportRequired: true,
      documents: [
        {
          url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
          fileType: 'document',
          originalName: 'solar_cold_pod_khunti.pdf'
        }
      ],
      status: 'approved',
      submittedBy: studentUser._id,
      feedback: 'Approved by State Rural Development Panel and supported by CCL CSR.'
    });

    const solution3 = await Solution.create({
      title: 'LoRaWAN PM2.5/PM10 Sensor Grid with Automated Water Fog Cannons',
      challenge: createdChallenges[2]._id, // Dhanbad Pollution
      description: 'Solar-powered optical particle counter mesh network deployed along coal haul routes in Jharia. When particulate levels cross threshold (PM2.5 > 150), it triggers localized low-volume dry fog cannons automatically.',
      team: team2._id,
      university: 'National Institute of Technology (NIT) Jamshedpur',
      proposedTechnology: ['LoRaWAN 868MHz', 'Plantower PMS5003 Laser Sensors', 'Automated Relay Misting Cannons', 'Grafana Dashboard'],
      implementationPlan: 'Install 10 sensing nodes across Jharia Bastacolla corridor and link telemetry to SAIL/BCCL environment monitoring cell.',
      expectedImpact: 'Instant 55% reduction in localized breathable dust clouds along school transit paths in mining townships.',
      estimatedDuration: '3 months',
      requiredResources: 'Sensor components, high-pressure fog nozzles, micro-solar kits.',
      industrySupportRequired: true,
      documents: [
        {
          url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop&q=80',
          fileType: 'document',
          originalName: 'jharia_clean_air_specs.pdf'
        }
      ],
      status: 'approved',
      submittedBy: priyaStudent._id,
      feedback: 'Approved for pilot installation under Jharia Action Plan.'
    });

    const solution4 = await Solution.create({
      title: 'Solar Electric All-Terrain Maternal Health Triage Van',
      challenge: createdChallenges[3]._id, // Deoghar Healthcare
      description: 'Customized heavy-duty high-ground-clearance 48V electric all-terrain tricycle ambulance equipped with onboard battery-operated Doppler fetal monitor, emergency oxygen, and satellite SOS beacon.',
      team: team1._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      proposedTechnology: ['48V BLDC Mid-Drive Motor', 'LiFePO4 High Temp Battery Pack', 'Portable Ultrasound Doppler', 'Tele-consultation Tablet'],
      implementationPlan: 'Build prototype vehicle chassis at BIT Mechanical Workshop and conduct field trials in Sarwan forest trails.',
      expectedImpact: 'Emergency transit time to hospital reduced from 4.5 hours to 45 minutes for 15 remote hamlets.',
      estimatedDuration: '5 months',
      requiredResources: 'Custom chassis parts, medical monitoring kits, batteries.',
      industrySupportRequired: true,
      documents: [],
      status: 'shortlisted',
      submittedBy: studentUser._id
    });

    const solution5 = await Solution.create({
      title: 'AI Ultrasonic Silt Profiler & Storm Drain Early Warning Mesh',
      challenge: createdChallenges[4]._id, // Ranchi Waterlogging
      description: 'Solar-powered IP68 submersible ultrasonic sonar sensors positioned at major culvert bottlenecks across Ranchi. Real-time telemetry predicts water inundation and alerts municipal clearance teams before monsoons.',
      team: team2._id,
      university: 'National Institute of Technology (NIT) Jamshedpur',
      proposedTechnology: ['Underwater Ultrasonic Transducers', 'NB-IoT / GSM Telemetry', 'Hydrodynamic Silt Prediction Model', 'Web GIS Dashboard'],
      implementationPlan: 'Deploy 20 sensors in Kantatoli and Harmu drains, integrate with Ranchi Smart City Command Center.',
      expectedImpact: 'Eliminates sudden road flooding in 4 major city intersections through 48-hour proactive silt desilting.',
      estimatedDuration: '4 months',
      requiredResources: 'Sensors, RMC clearance permission, server hosting.',
      industrySupportRequired: false,
      documents: [],
      status: 'approved',
      submittedBy: priyaStudent._id,
      feedback: 'Integrated into Ranchi Smart City Mission pilot.'
    });

    console.log('Seeded 5 solutions.');

    // 7. Seed Projects
    console.log('Seeding Projects & Milestones...');
    const project1 = await Project.create({
      name: 'Palamu Clean Water Initiative: Low-Cost Fluoride Filtration',
      challenge: createdChallenges[0]._id,
      solution: solution1._id,
      team: team1._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      industryMentor: industryUser._id,
      governmentCoordinator: govtUser._id,
      status: 'prototype',
      progress: 45,
      description: 'Developing and deploying community water filtration units with IoT saturation sensors across 5 fluoride-endemic villages in Palamu district.',
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      expectedCompletionDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000)
    });

    const project2 = await Project.create({
      name: 'Solar Phase-Change Cold Pod for Khunti Forest Produce',
      challenge: createdChallenges[1]._id,
      solution: solution2._id,
      team: team3._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      industryMentor: sailIndustry._id,
      governmentCoordinator: govtUser._id,
      status: 'testing',
      progress: 70,
      description: 'Field installation and performance testing of 5-ton off-grid solar cold storage units for tribal Mahua collectors in Torpa, Khunti.',
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      expectedCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    const project3 = await Project.create({
      name: 'Jharia Coal Belt Smart Air Quality & Dust Mist Network',
      challenge: createdChallenges[2]._id,
      solution: solution3._id,
      team: team2._id,
      university: 'National Institute of Technology (NIT) Jamshedpur',
      industryMentor: industryUser._id,
      governmentCoordinator: govtUser._id,
      status: 'implementation',
      progress: 85,
      description: '10-node LoRa sensor grid installed with automated dry-fog dust suppression along coal transport corridors in Dhanbad.',
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      expectedCompletionDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    });

    const project4 = await Project.create({
      name: 'Ranchi Smart Drainage Silt Detection & Flood Prevention',
      challenge: createdChallenges[4]._id,
      solution: solution5._id,
      team: team2._id,
      university: 'National Institute of Technology (NIT) Jamshedpur',
      industryMentor: industryUser._id,
      governmentCoordinator: govtUser._id,
      status: 'research',
      progress: 25,
      description: 'Sonar telemetry sensor prototyping for Ranchi Municipal Corporation storm culverts.',
      startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      expectedCompletionDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000)
    });

    const project5 = await Project.create({
      name: 'Tribal School Interactive Solar DC Microgrid Classrooms',
      challenge: createdChallenges[5]._id,
      solution: solution1._id,
      team: team1._id,
      university: 'Birla Institute of Technology (BIT) Mesra',
      industryMentor: sailIndustry._id,
      governmentCoordinator: govtUser._id,
      status: 'completed',
      progress: 100,
      description: 'Successfully deployed solar microgrid and localized Ho/Mundari digital boards in 3 Kasturba Gandhi Balika Vidyalayas in West Singhbhum.',
      startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
      expectedCompletionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    });

    console.log('Seeded 5 projects.');

    // 8. Seed Milestones
    console.log('Seeding Project Milestones...');
    await Milestone.create([
      {
        project: project1._id,
        title: 'Laboratory Column Testing of Adsorbent Media',
        description: 'Complete breakthrough curve analysis with water samples from Hussainabad.',
        status: 'completed',
        dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
      },
      {
        project: project1._id,
        title: 'Pilot Enclosure Fabrication & Sensor Integration',
        description: 'Build weather-proof fiberglass casing and wire ESP32 flow sensors.',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      },
      {
        project: project1._id,
        title: 'Village Handover & Water Quality Certification',
        description: 'Conduct final testing with Public Health Engineering Department (PHED) Jharkhand.',
        status: 'pending',
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      {
        project: project2._id,
        title: 'Phase Change Material Thermal Efficiency Validation',
        description: 'Achieve 48 hours of 5°C holding capacity during power loss simulation.',
        status: 'completed',
        dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
      },
      {
        project: project2._id,
        title: 'Torpa Block Field Installation',
        description: 'Erect 5-ton unit at Torpa market hub with SHG training.',
        status: 'completed',
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        project: project3._id,
        title: 'Install 10 LoRaWAN Air Monitoring Nodes in Jharia',
        description: 'Mount sensor stations along mining access road pillars.',
        status: 'completed',
        dueDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Seeded milestones.');

    // 9. Seed Project Updates
    console.log('Seeding Project Updates...');
    await ProjectUpdate.create([
      {
        project: project1._id,
        author: studentUser._id,
        title: 'Water sample analysis complete: 94% fluoride reduction achieved in lab bench test',
        description: 'We passed 500 liters of 4.5 mg/L Palamu water through our new activated alumina compound. Effluent showed 0.38 mg/L fluoride, well below WHO safety limits.',
        attachments: []
      },
      {
        project: project2._id,
        author: studentUser._id,
        title: 'Torpa village installation completed with 120 SHG women attending training',
        description: 'The solar refrigeration unit is now fully operational. 3.2 tons of fresh Mahua flowers stored this week with zero spoilage.',
        attachments: []
      },
      {
        project: project3._id,
        author: priyaStudent._id,
        title: 'Dry fog mist cannons linked to live PM10 threshold triggers',
        description: 'Automated water spray system successfully actuated 14 times today during heavy coal truck convoys, lowering ambient PM10 by 62%.',
        attachments: []
      }
    ]);
    console.log('Seeded project updates.');

    // 10. Seed Comments
    console.log('Seeding Comments...');
    await Comment.create([
      {
        author: citizenUser._id,
        challenge: createdChallenges[0]._id,
        text: 'Thank you for prioritizing our village problem. The school children in Hussainabad will benefit immensely.'
      },
      {
        author: univUser._id,
        challenge: createdChallenges[0]._id,
        text: 'Our environmental engineering lab at BIT Mesra will provide free spectrometer testing support.'
      },
      {
        author: industryUser._id,
        project: project1._id,
        text: 'Tata Steel CSR is ready to sponsor the material cost for 10 community filter installations once pilot metrics are verified.'
      }
    ]);
    console.log('Seeded comments.');

    // 11. Seed Notifications
    console.log('Seeding Notifications...');
    await Notification.create([
      {
        user: citizenUser._id,
        title: 'Challenge Verified by Government',
        message: 'Your challenge regarding Palamu Fluoride Contamination has been verified by the Urban & Rural Development Department.',
        type: 'success',
        relatedChallenge: createdChallenges[0]._id
      },
      {
        user: studentUser._id,
        title: 'Solution Proposal Approved!',
        message: 'Your solution "IoT Activated Alumina Filter" was approved and converted into an active project.',
        type: 'success',
        relatedProject: project1._id
      },
      {
        user: govtUser._id,
        title: 'New Challenge Pending Review',
        message: 'A new public service challenge was submitted in Dumka regarding pension biometric redressal.',
        type: 'info',
        relatedChallenge: createdChallenges[9]._id
      }
    ]);
    console.log('Seeded notifications.');

    // 12. Seed Supports / Upvotes
    console.log('Seeding Supports...');
    await Support.create([
      { user: citizenUser._id, challenge: createdChallenges[0]._id },
      { user: studentUser._id, challenge: createdChallenges[0]._id },
      { user: priyaStudent._id, challenge: createdChallenges[0]._id },
      { user: sunitaCitizen._id, challenge: createdChallenges[1]._id },
      { user: studentUser._id, challenge: createdChallenges[1]._id }
    ]);

    // 13. Seed Messages
    console.log('Seeding Direct Messages...');
    await Message.create([
      {
        sender: citizenUser._id,
        receiver: studentUser._id,
        message: 'Hello Rahul, thank you for working on the water filter for Palamu. When is the team visiting the site?'
      },
      {
        sender: studentUser._id,
        receiver: citizenUser._id,
        message: 'Hello Ramesh ji! Our team from BIT Mesra will visit Hussainabad block this coming Saturday with the first filter prototype.'
      },
      {
        sender: industryUser._id,
        receiver: studentUser._id,
        message: 'Rahul, please share the material bill for the phase-change pods so we can process CSR grant support.'
      }
    ]);

    console.log('====================================================');
    console.log('✅ Database seeded successfully with realistic Jharkhand data!');
    console.log('====================================================');
    console.log('DEMO ACCOUNTS (Password for all: password123):');
    console.log('• Citizen:    citizen@example.com');
    console.log('• Student:    student@example.com');
    console.log('• University: university@example.com');
    console.log('• Industry:   industry@example.com');
    console.log('• Government: government@example.com');
    console.log('• Admin:      admin@example.com');
    console.log('====================================================');

    process.exit(0);
  } catch (error) {
    console.error('Error while seeding database:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Destroy only
  const destroyDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/samadhan_connect');
      await mongoose.connection.dropDatabase();
      console.log('Database dropped successfully.');
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  };
  destroyDB();
} else {
  seedDB();
}

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    participantId: 'user-cit-01',
    participantName: 'Sunita Soren (Gram Pradhan, Angara)',
    participantRole: 'Citizen',
    participantAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'We have prepped the concrete platform at Panchayat Bhavan for the filtration trial.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'user-cit-01', text: 'Namaste Aarav ji, when will your BIT Mesra team be arriving for the water sampling test in Angara?', timestamp: 'Yesterday 3:30 PM' },
      { id: 'm2', senderId: 'user-stu-01', text: 'Namaste Pradhan ji! We have finalized the IoT sensor unit. Our team will visit this Thursday at 10 AM.', timestamp: 'Yesterday 4:15 PM' },
      { id: 'm3', senderId: 'user-cit-01', text: 'We have prepped the concrete platform at Panchayat Bhavan for the filtration trial.', timestamp: '10:45 AM' }
    ]
  },
  {
    id: 'conv-2',
    participantId: 'user-ind-01',
    participantName: 'Dr. Vivek Sengupta (Tata Steel)',
    participantRole: 'Industry Mentor',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'The revised CAD drawings for the bauxite pressure column look solid. Proceed with procurement.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm4', senderId: 'user-stu-01', text: 'Dr. Sengupta, we uploaded the updated mechanical schematics with the EPDM high-pressure seal.', timestamp: '2 days ago' },
      { id: 'm5', senderId: 'user-ind-01', text: 'The revised CAD drawings for the bauxite pressure column look solid. Proceed with procurement.', timestamp: 'Yesterday 5:20 PM' }
    ]
  },
  {
    id: 'conv-3',
    participantId: 'user-gov-01',
    participantName: 'Shri Rajesh K. Mishra (DW&SD)',
    participantRole: 'Government Official',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    lastMessage: 'Official clearance issued for borehole telemetry integration in Angara Block.',
    lastMessageTime: 'Feb 26',
    unreadCount: 0,
    messages: [
      { id: 'm6', senderId: 'user-gov-01', text: 'Official clearance issued for borehole telemetry integration in Angara Block.', timestamp: 'Feb 26' }
    ]
  }
];

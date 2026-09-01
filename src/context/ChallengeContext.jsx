import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CHALLENGES } from '../data/mockChallenges';
import { API } from '../services/api';

const ChallengeContext = createContext();

// Helper to normalize backend challenge documents into frontend-friendly structures
const normalizeChallenge = (c) => ({
  id: c._id || c.id,
  _id: c._id || c.id,
  title: c.title,
  category: c.category || 'Water Management',
  district: c.district || 'Ranchi',
  state: c.state || 'Jharkhand',
  location: c.location || `${c.district || 'Ranchi'}, Jharkhand`,
  pincode: c.pincode || '834001',
  urgency: c.urgency ? c.urgency.charAt(0).toUpperCase() + c.urgency.slice(1) : 'Medium',
  status: c.status === 'verified' || c.status === 'open'
    ? 'Open for Solutions'
    : c.status === 'in_progress'
    ? 'In Progress'
    : c.status === 'resolved'
    ? 'Resolved'
    : c.status === 'under_review'
    ? 'Under Review'
    : 'Pending Review',
  lifecycleStage: c.status || 'Pending',
  submittedBy: c.submittedBy?.name || (typeof c.submittedBy === 'string' ? c.submittedBy : 'Citizen Contributor'),
  userRole: c.submittedBy?.role || 'Citizen',
  submittedDate: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  shortDescription: c.shortDescription || c.description?.slice(0, 140) + '...',
  problemDescription: c.description || '',
  background: 'Community reported challenge verified via Gram Panchayat GPS coordinates.',
  communityImpact: `Directly impacts approximately ${c.affectedPeople || '2,500+'} residents in ${c.district || 'Ranchi'}.`,
  currentSituation: c.status || 'Awaiting initial district administrative screening.',
  expectedOutcome: c.expectedOutcome || 'Implementation of a sustainable, cost-effective community solution.',
  availableResources: 'Panchayat premises and local volunteer support available.',
  images: c.evidence && c.evidence.length > 0
    ? c.evidence.map(e => e.url.startsWith('http') ? e.url : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${e.url}`)
    : ['https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'],
  supportCount: c.supportCount || 0,
  teamsWorking: c.teamCount || 0,
  proposalCount: c.solutionCount || 0,
  interestedTeams: [],
  supportingOrgs: ['Jharkhand State Innovation Cell'],
  comments: (c.comments || []).map(comm => ({
    id: comm._id || `c-${Date.now()}`,
    author: comm.author?.name || 'Community Member',
    role: comm.author?.role || 'Contributor',
    institution: comm.author?.university || comm.author?.organization || 'Jharkhand',
    text: comm.text,
    date: comm.createdAt ? new Date(comm.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  }))
});

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_challenges');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse challenges', e);
    }
    return INITIAL_CHALLENGES;
  });

  const [supportedChallenges, setSupportedChallenges] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_supported');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['CH-JH-2026-001', 'CH-JH-2026-003'];
  });

  const [bookmarkedChallenges, setBookmarkedChallenges] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['CH-JH-2026-001'];
  });

  // Fetch Live Challenges from Backend on Mount
  useEffect(() => {
    async function fetchLiveChallenges() {
      try {
        const res = await API.get('/challenges?limit=50');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const normalized = res.data.map(normalizeChallenge);
          setChallenges(normalized);
        }
      } catch (err) {
        console.log('[ChallengeContext] Backend idle or using local state fallback');
      }
    }
    fetchLiveChallenges();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_challenges', JSON.stringify(challenges));
    } catch (e) {}
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_supported', JSON.stringify(supportedChallenges));
    } catch (e) {}
  }, [supportedChallenges]);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_bookmarks', JSON.stringify(bookmarkedChallenges));
    } catch (e) {}
  }, [bookmarkedChallenges]);

  // Support / Upvote challenge
  const toggleSupport = async (challengeId) => {
    const isSupported = supportedChallenges.includes(challengeId);
    
    // Optimistic UI update
    if (isSupported) {
      setSupportedChallenges(prev => prev.filter(id => id !== challengeId));
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, supportCount: Math.max(0, c.supportCount - 1) } : c));
    } else {
      setSupportedChallenges(prev => [...prev, challengeId]);
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, supportCount: c.supportCount + 1 } : c));
    }

    // Call Backend API if valid MongoDB ObjectId
    if (typeof challengeId === 'string' && challengeId.length === 24) {
      try {
        await API.post(`/challenges/${challengeId}/support`);
      } catch (e) {
        console.warn('[ChallengeContext] Backend support toggle error:', e.message);
      }
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (challengeId) => {
    setBookmarkedChallenges(prev =>
      prev.includes(challengeId) ? prev.filter(id => id !== challengeId) : [...prev, challengeId]
    );
  };

  // Add new submitted problem
  const addChallenge = async (formData, user) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const tempId = `JH-SAM-2026-${randomNum}`;

    let newChallenge = {
      id: tempId,
      title: formData.title,
      category: formData.category || 'Water Management',
      district: formData.district || 'Ranchi',
      state: 'Jharkhand',
      location: formData.location || `${formData.district || 'Ranchi'}, Jharkhand`,
      pincode: formData.pincode || '834001',
      urgency: formData.urgency || 'High',
      status: 'Under Review',
      lifecycleStage: 'Pending',
      submittedBy: user?.name || 'Citizen Contributor',
      userRole: user?.role || 'Citizen',
      submittedDate: new Date().toISOString().split('T')[0],
      shortDescription: formData.shortDescription || formData.description?.slice(0, 140) + '...',
      problemDescription: formData.detailedDescription || formData.description || '',
      background: formData.background || 'Community reported challenge verified via Gram Panchayat GPS coordinates.',
      communityImpact: formData.communityImpact || `Directly impacts approximately ${formData.affectedCount || '2,500+'} residents in ${formData.district || 'Ranchi'}.`,
      currentSituation: formData.currentSituation || 'Awaiting initial district administrative screening.',
      expectedOutcome: formData.expectedOutcome || 'Implementation of a sustainable, cost-effective community solution.',
      availableResources: formData.availableResources || 'Panchayat premises and local volunteer support available.',
      images: formData.images && formData.images.length > 0 ? formData.images : [
        'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
      ],
      supportCount: 1,
      teamsWorking: 0,
      proposalCount: 0,
      interestedTeams: [],
      supportingOrgs: ['Jharkhand State Innovation Cell (Under Verification)'],
      comments: [
        {
          id: `c-${Date.now()}`,
          author: 'System Verification Bot',
          role: 'Govt Automated Review',
          institution: 'Samadhan Connect AI',
          text: 'Challenge received and queued for administrative verification. Categorized and matched with relevant university departments.',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };

    // Attempt live API post
    try {
      const res = await API.post('/challenges', {
        title: formData.title,
        shortDescription: formData.shortDescription || formData.description?.slice(0, 140) + '...',
        description: formData.detailedDescription || formData.description || '',
        category: formData.category || 'Water Management',
        district: formData.district || 'Ranchi',
        location: formData.location || `${formData.district || 'Ranchi'}, Jharkhand`,
        urgency: (formData.urgency || 'medium').toLowerCase(),
        affectedPeople: formData.affectedCount ? `${formData.affectedCount}+` : '500+',
        expectedOutcome: formData.expectedOutcome || ''
      });

      if (res.success && res.data) {
        newChallenge = normalizeChallenge(res.data);
      }
    } catch (err) {
      console.warn('[ChallengeContext] Live challenge post failed, saved to local state:', err.message);
    }

    setChallenges(prev => [newChallenge, ...prev]);
    return newChallenge;
  };

  // Add comment to challenge
  const addComment = async (challengeId, text, user) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: user?.name || 'Community Member',
      role: user?.role || 'Contributor',
      institution: user?.institution || user?.company || user?.department || 'Jharkhand',
      text,
      date: new Date().toISOString().split('T')[0]
    };

    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          comments: [...(c.comments || []), newComment]
        };
      }
      return c;
    }));

    if (typeof challengeId === 'string' && challengeId.length === 24) {
      try {
        await API.post(`/challenges/${challengeId}/comments`, { text });
      } catch (e) {
        console.warn('[ChallengeContext] Backend comment post failed:', e.message);
      }
    }
  };

  // Government Admin status actions
  const updateChallengeStatus = async (challengeId, newStatus, assignedOrg = null) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const updated = {
          ...c,
          status: newStatus,
          lifecycleStage: newStatus === 'Open for Solutions' ? 'Open' : newStatus
        };
        if (assignedOrg) {
          updated.supportingOrgs = Array.from(new Set([...(c.supportingOrgs || []), assignedOrg]));
        }
        return updated;
      }
      return c;
    }));

    if (typeof challengeId === 'string' && challengeId.length === 24) {
      try {
        if (newStatus === 'Open for Solutions' || newStatus === 'Verified') {
          await API.patch(`/admin/challenges/${challengeId}/verify`);
        } else if (newStatus === 'Rejected') {
          await API.patch(`/admin/challenges/${challengeId}/reject`, { reason: 'Administrative rejection' });
        }
      } catch (e) {
        console.warn('[ChallengeContext] Backend status patch failed:', e.message);
      }
    }
  };

  return (
    <ChallengeContext.Provider value={{
      challenges,
      supportedChallenges,
      bookmarkedChallenges,
      toggleSupport,
      toggleBookmark,
      addChallenge,
      addComment,
      updateChallengeStatus
    }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengeContext);

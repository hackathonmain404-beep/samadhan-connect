import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CHALLENGES } from '../data/mockChallenges';

const ChallengeContext = createContext();

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
  const toggleSupport = (challengeId) => {
    const isSupported = supportedChallenges.includes(challengeId);
    if (isSupported) {
      setSupportedChallenges(prev => prev.filter(id => id !== challengeId));
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, supportCount: Math.max(0, c.supportCount - 1) } : c));
    } else {
      setSupportedChallenges(prev => [...prev, challengeId]);
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, supportCount: c.supportCount + 1 } : c));
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (challengeId) => {
    setBookmarkedChallenges(prev =>
      prev.includes(challengeId) ? prev.filter(id => id !== challengeId) : [...prev, challengeId]
    );
  };

  // Add new submitted problem
  const addChallenge = (formData, user) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `JH-SAM-2026-${randomNum}`;
    const newChallenge = {
      id: newId,
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

    setChallenges(prev => [newChallenge, ...prev]);
    return newChallenge;
  };

  // Add comment to challenge
  const addComment = (challengeId, text, user) => {
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
  };

  // Government Admin status actions
  const updateChallengeStatus = (challengeId, newStatus, assignedOrg = null) => {
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

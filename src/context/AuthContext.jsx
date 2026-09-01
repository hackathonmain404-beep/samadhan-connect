import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const USER_ROLES = {
  CITIZEN: 'Citizen',
  STUDENT: 'Student / Researcher',
  UNIVERSITY: 'University',
  INDUSTRY: 'Industry Partner',
  GOVERNMENT: 'Government Official',
  ADMIN: 'Platform Administrator'
};

export const DEMO_USERS = {
  [USER_ROLES.CITIZEN]: {
    id: 'user-cit-01',
    name: 'Sunita Soren',
    email: 'sunita.soren@jharkhandmail.in',
    role: USER_ROLES.CITIZEN,
    district: 'Ranchi',
    location: 'Angara Block, Rural Ranchi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    title: 'Gram Pradhan & Social Worker',
    submittedProblemsCount: 3,
    supportedChallengesCount: 14
  },
  [USER_ROLES.STUDENT]: {
    id: 'user-stu-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@bitmesra.ac.in',
    role: USER_ROLES.STUDENT,
    district: 'Ranchi',
    institution: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Chemical Engineering (4th Year)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    title: 'Student Innovator & Team Lead',
    team: 'Team JalRakshak',
    activeProjectsCount: 2,
    proposalsSubmittedCount: 4
  },
  [USER_ROLES.UNIVERSITY]: {
    id: 'user-uni-01',
    name: 'Prof. Alok Mukherjee',
    email: 'dean.innovation@bitmesra.ac.in',
    role: USER_ROLES.UNIVERSITY,
    district: 'Ranchi',
    institution: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Dean of Research & Incubation',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    title: 'Dean, R&D and Technology Incubation',
    managedTeamsCount: 42,
    activeProjectsCount: 18
  },
  [USER_ROLES.INDUSTRY]: {
    id: 'user-ind-01',
    name: 'Dr. Vivek Sengupta',
    email: 'vivek.sengupta@tatasteel.com',
    role: USER_ROLES.INDUSTRY,
    district: 'East Singhbhum (Jamshedpur)',
    company: 'Tata Steel Foundation & CSR',
    designation: 'Chief Sustainability Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    title: 'Industry Mentor & CSR Grant Evaluator',
    projectsMentoredCount: 12,
    activeSponsorshipsCount: 6
  },
  [USER_ROLES.GOVERNMENT]: {
    id: 'user-gov-01',
    name: 'Shri Rajesh K. Mishra',
    email: 'rkmishra.ias@jharkhand.gov.in',
    role: USER_ROLES.GOVERNMENT,
    district: 'Ranchi',
    department: 'Dept of Drinking Water & Sanitation / IT Secretary',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    title: 'State Nodal Officer & Joint Secretary',
    pendingVerificationsCount: 8,
    approvedChallengesCount: 142
  },
  [USER_ROLES.ADMIN]: {
    id: 'user-adm-01',
    name: 'Dr. Sanjay Kumar Toppo',
    email: 'admin@samadhanconnect.gov.in',
    role: USER_ROLES.ADMIN,
    district: 'Ranchi',
    department: 'State Innovation Mission Jharkhand',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    title: 'State Mission Director & Super Admin',
    totalUsersManaged: 48500
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.role) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved user', e);
    }
    return DEMO_USERS[USER_ROLES.STUDENT];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [currentUser]);

  const switchPersona = (roleName) => {
    if (DEMO_USERS[roleName]) {
      setCurrentUser(DEMO_USERS[roleName]);
      setIsAuthenticated(true);
      localStorage.setItem('samadhan_jwt', `mock_token_${Date.now()}`);
    }
  };

  const login = (email, password, role) => {
    const matchedUser = Object.values(DEMO_USERS).find(u => u.role === role) || DEMO_USERS[USER_ROLES.CITIZEN];
    const userToSet = {
      ...matchedUser,
      email: email || matchedUser.email
    };
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    localStorage.setItem('samadhan_jwt', `mock_token_${Date.now()}`);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      submittedProblemsCount: 0,
      supportedChallengesCount: 0,
      activeProjectsCount: 0,
      proposalsSubmittedCount: 0,
      ...userData
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('samadhan_jwt', `mock_token_${Date.now()}`);
    return true;
  };

  const logout = () => {
    setCurrentUser(DEMO_USERS[USER_ROLES.CITIZEN]);
    localStorage.removeItem('samadhan_jwt');
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case USER_ROLES.CITIZEN:
        return '/dashboard/citizen';
      case USER_ROLES.STUDENT:
        return '/dashboard/student';
      case USER_ROLES.UNIVERSITY:
        return '/dashboard/university';
      case USER_ROLES.INDUSTRY:
        return '/dashboard/industry';
      case USER_ROLES.GOVERNMENT:
        return '/dashboard/government';
      case USER_ROLES.ADMIN:
        return '/dashboard/admin';
      default:
        return '/dashboard/citizen';
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      switchPersona,
      login,
      register,
      logout,
      getDashboardRoute,
      USER_ROLES,
      DEMO_USERS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

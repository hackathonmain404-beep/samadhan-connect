import React, { createContext, useContext, useState, useEffect } from 'react';
import { API } from '../services/api';

const AuthContext = createContext();

export const USER_ROLES = {
  CITIZEN: 'Citizen',
  STUDENT: 'Student / Researcher',
  UNIVERSITY: 'University',
  INDUSTRY: 'Industry Partner',
  GOVERNMENT: 'Government Official',
  ADMIN: 'Platform Administrator'
};

// Role mapping from frontend UI strings to backend lowercase enums
export const ROLE_MAP = {
  [USER_ROLES.CITIZEN]: 'citizen',
  [USER_ROLES.STUDENT]: 'student',
  [USER_ROLES.UNIVERSITY]: 'university',
  [USER_ROLES.INDUSTRY]: 'industry',
  [USER_ROLES.GOVERNMENT]: 'government',
  [USER_ROLES.ADMIN]: 'admin',
};

export const DEMO_USERS = {
  [USER_ROLES.CITIZEN]: {
    id: 'user-cit-01',
    name: 'Ramesh Mahto',
    email: 'citizen@example.com',
    role: USER_ROLES.CITIZEN,
    backendRole: 'citizen',
    district: 'Ranchi',
    location: 'Ranchi, Jharkhand',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    title: 'Gram Pradhan & Social Worker',
    submittedProblemsCount: 3,
    supportedChallengesCount: 14
  },
  [USER_ROLES.STUDENT]: {
    id: 'user-stu-01',
    name: 'Rahul Kumar',
    email: 'student@example.com',
    role: USER_ROLES.STUDENT,
    backendRole: 'student',
    district: 'Ranchi',
    institution: 'Birla Institute of Technology (BIT) Mesra',
    department: 'Chemical Engineering (4th Year)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    title: 'Student Innovator & Team Lead',
    team: 'BIT Jal Suraksha Innovators',
    activeProjectsCount: 2,
    proposalsSubmittedCount: 4
  },
  [USER_ROLES.UNIVERSITY]: {
    id: 'user-uni-01',
    name: 'Prof. Amit Verma',
    email: 'university@example.com',
    role: USER_ROLES.UNIVERSITY,
    backendRole: 'university',
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
    name: 'Rajesh Agarwal',
    email: 'industry@example.com',
    role: USER_ROLES.INDUSTRY,
    backendRole: 'industry',
    district: 'East Singhbhum (Jamshedpur)',
    company: 'Tata Steel Limited',
    designation: 'Chief Sustainability Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    title: 'Industry Mentor & CSR Grant Evaluator',
    projectsMentoredCount: 12,
    activeSponsorshipsCount: 6
  },
  [USER_ROLES.GOVERNMENT]: {
    id: 'user-gov-01',
    name: 'Anil Kumar Jha',
    email: 'government@example.com',
    role: USER_ROLES.GOVERNMENT,
    backendRole: 'government',
    district: 'Ranchi',
    department: 'Dept of Drinking Water & Sanitation / IT Secretary',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    title: 'State Nodal Officer & Joint Secretary',
    pendingVerificationsCount: 8,
    approvedChallengesCount: 142
  },
  [USER_ROLES.ADMIN]: {
    id: 'user-adm-01',
    name: 'Samadhan Admin',
    email: 'admin@example.com',
    role: USER_ROLES.ADMIN,
    backendRole: 'admin',
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

  // Sync with Backend /api/auth/me on mount if token exists
  useEffect(() => {
    async function verifyBackendSession() {
      const token = localStorage.getItem('samadhan_jwt');
      if (token && !token.startsWith('mock_token_')) {
        try {
          const res = await API.get('/auth/me');
          if (res.success && res.data) {
            const u = res.data;
            const uiRole = Object.keys(ROLE_MAP).find(k => ROLE_MAP[k] === u.role) || USER_ROLES.CITIZEN;
            setCurrentUser({
              id: u._id,
              name: u.name,
              email: u.email,
              role: uiRole,
              backendRole: u.role,
              district: u.location ? u.location.split(',')[0] : 'Ranchi',
              avatar: u.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
              institution: u.university || '',
              company: u.organization || '',
              bio: u.bio || ''
            });
            setIsAuthenticated(true);
          }
        } catch (e) {
          console.log('[Auth] Backend sync idle or using local state');
        }
      }
    }
    verifyBackendSession();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  }, [currentUser]);

  const switchPersona = async (roleName) => {
    const demo = DEMO_USERS[roleName];
    if (demo) {
      setCurrentUser(demo);
      setIsAuthenticated(true);

      // Attempt live login with demo credentials
      try {
        const res = await API.post('/auth/login', {
          email: demo.email,
          password: 'password123'
        });
        if (res.success && res.token) {
          localStorage.setItem('samadhan_jwt', res.token);
          return;
        }
      } catch (err) {
        // Fallback to offline demo mode
      }
      localStorage.setItem('samadhan_jwt', `mock_token_${Date.now()}`);
    }
  };

  const login = async (email, password, role) => {
    try {
      const res = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });

      if (res.success && res.user) {
        const u = res.user;
        const uiRole = Object.keys(ROLE_MAP).find(k => ROLE_MAP[k] === u.role) || USER_ROLES.CITIZEN;
        const userObj = {
          id: u._id,
          name: u.name,
          email: u.email,
          role: uiRole,
          backendRole: u.role,
          district: u.location ? u.location.split(',')[0] : 'Ranchi',
          avatar: u.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          institution: u.university || '',
          company: u.organization || '',
          bio: u.bio || ''
        };
        setCurrentUser(userObj);
        setIsAuthenticated(true);
        localStorage.setItem('samadhan_jwt', res.token);
        return true;
      }
    } catch (err) {
      console.warn('[Auth] Live API login error, fallback to demo user:', err.message);
    }

    // Fallback if backend offline
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

  const register = async (userData) => {
    try {
      const backendRole = ROLE_MAP[userData.role] || 'citizen';
      const res = await API.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password || 'password123',
        role: backendRole,
        university: userData.institution || userData.university || '',
        organization: userData.company || userData.organization || '',
        location: userData.district ? `${userData.district}, Jharkhand` : 'Ranchi, Jharkhand'
      });

      if (res.success && res.user) {
        const u = res.user;
        const uiRole = Object.keys(ROLE_MAP).find(k => ROLE_MAP[k] === u.role) || USER_ROLES.CITIZEN;
        const userObj = {
          id: u._id,
          name: u.name,
          email: u.email,
          role: uiRole,
          backendRole: u.role,
          district: userData.district || 'Ranchi',
          avatar: u.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          ...userData
        };
        setCurrentUser(userObj);
        setIsAuthenticated(true);
        localStorage.setItem('samadhan_jwt', res.token);
        return true;
      }
    } catch (err) {
      console.warn('[Auth] Live API register error, fallback to local state:', err.message);
    }

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

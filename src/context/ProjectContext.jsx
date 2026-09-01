import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '../data/mockProjects';
import { INITIAL_SOLUTIONS } from '../data/mockSolutions';
import { INITIAL_TEAMS } from '../data/mockTeams';
import { INITIAL_UNIVERSITIES } from '../data/mockUniversities';
import { INITIAL_INDUSTRIES } from '../data/mockIndustries';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse projects', e);
    }
    return INITIAL_PROJECTS;
  });

  const [solutions, setSolutions] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_solutions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_SOLUTIONS;
  });

  const [teams, setTeams] = useState(() => {
    try {
      const saved = localStorage.getItem('samadhan_v2_teams');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TEAMS;
  });

  const [universities] = useState(INITIAL_UNIVERSITIES);
  const [industries] = useState(INITIAL_INDUSTRIES);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_projects', JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_solutions', JSON.stringify(solutions));
    } catch (e) {}
  }, [solutions]);

  useEffect(() => {
    try {
      localStorage.setItem('samadhan_v2_teams', JSON.stringify(teams));
    } catch (e) {}
  }, [teams]);

  const submitProposal = (formData, user) => {
    const newSolution = {
      id: `SOL-JH-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      challengeId: formData.challengeId,
      challengeTitle: formData.challengeTitle,
      category: formData.category || 'Water Management',
      district: formData.district || 'Ranchi',
      teamName: formData.teamName || user?.team || 'Student Innovation Team',
      university: formData.university || user?.institution || 'Birla Institute of Technology (BIT) Mesra',
      leadName: user?.name || formData.leadName || 'Student Innovator',
      technologies: formData.technologies ? (Array.isArray(formData.technologies) ? formData.technologies : formData.technologies.split(',').map(t => t.trim())) : ['IoT', 'Embedded Hardware'],
      expectedImpact: formData.expectedImpact || 'Practical community benefit for local residents.',
      estimatedDuration: formData.duration || '4 Months',
      status: 'Proposed & Under Review',
      industrySupportRequirement: formData.industrySupportRequirement || 'Prototyping mentorship & grant assistance.',
      description: formData.description || formData.overview || '',
      submissionDate: new Date().toISOString().split('T')[0]
    };

    setSolutions(prev => [newSolution, ...prev]);
    return newSolution;
  };

  const createTeam = (teamData, user) => {
    const newTeam = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      university: user?.institution || teamData.university || 'University in Jharkhand',
      district: user?.district || 'Ranchi',
      membersCount: 1,
      lead: user?.name || 'Student Lead',
      leadEmail: user?.email || 'lead@univ.ac.in',
      skills: teamData.skills ? (Array.isArray(teamData.skills) ? teamData.skills : teamData.skills.split(',').map(s => s.trim())) : ['React', 'IoT', 'Problem Solving'],
      currentChallenge: teamData.currentChallenge || 'Open for Matchmaking',
      activeProject: 'New Incubation',
      status: 'Looking for Members',
      lookingFor: teamData.lookingFor ? (Array.isArray(teamData.lookingFor) ? teamData.lookingFor : teamData.lookingFor.split(',').map(s => s.trim())) : ['Hardware Engineer'],
      members: [
        {
          name: user?.name || 'Student Lead',
          role: 'Team Lead',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
        }
      ]
    };

    setTeams(prev => [newTeam, ...prev]);
    return newTeam;
  };

  const joinTeam = (teamId, user) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        const isMember = t.members.some(m => m.name === user?.name);
        if (!isMember) {
          return {
            ...t,
            membersCount: t.membersCount + 1,
            members: [...t.members, {
              name: user?.name || 'New Member',
              role: 'Collaborator',
              avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
            }]
          };
        }
      }
      return t;
    }));
  };

  const updateProjectTask = (projectId, taskId, status) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedTasks = (p.tasks || []).map(t => t.id === taskId ? { ...t, status } : t);
        return { ...p, tasks: updatedTasks };
      }
      return p;
    }));
  };

  const addProjectUpdate = (projectId, content, user) => {
    const newUpdate = {
      id: `u-${Date.now()}`,
      author: user?.name || 'Project Contributor',
      date: new Date().toISOString().split('T')[0],
      content
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          updates: [newUpdate, ...(p.updates || [])]
        };
      }
      return p;
    }));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      solutions,
      teams,
      universities,
      industries,
      submitProposal,
      createTeam,
      joinTeam,
      updateProjectTask,
      addProjectUpdate
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

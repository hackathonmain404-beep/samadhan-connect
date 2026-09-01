import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Challenge Verified by District Nodal Officer',
    message: 'Your reported problem "Severe Groundwater Depletion in Angara Block" has been verified and listed for university solution matching.',
    timestamp: '10 minutes ago',
    type: 'success',
    link: '/challenges/CH-JH-2026-001',
    read: false
  },
  {
    id: 'n2',
    title: 'New Solution Proposal Received',
    message: 'Team JalRakshak from BIT Mesra submitted a proposal for "Severe Groundwater Depletion in Angara Block".',
    timestamp: '2 hours ago',
    type: 'info',
    link: '/projects/PRJ-JH-2026-081',
    read: false
  },
  {
    id: 'n3',
    title: 'Industry Mentorship Approved',
    message: 'Tata Steel CSR Foundation accepted mentorship for Project JalRakshak (Solar Fluoride IoT Filtration).',
    timestamp: '1 day ago',
    type: 'mentor',
    link: '/projects/PRJ-JH-2026-081',
    read: true
  },
  {
    id: 'n4',
    title: 'Milestone 2 Achieved',
    message: 'Project ShikshaSetu successfully tested offline solar mesh lab across 120 tribal students in Potka.',
    timestamp: '2 days ago',
    type: 'milestone',
    link: '/projects/PRJ-JH-2026-082',
    read: true
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('samadhan_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('samadhan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    const newNotif = {
      id: `n-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

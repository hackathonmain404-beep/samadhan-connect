import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Error Boundary
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ChallengeProvider } from './context/ChallengeContext';
import { ProjectProvider } from './context/ProjectContext';
import { MessageProvider } from './context/MessageContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { ExploreChallenges } from './pages/ExploreChallenges';
import { ChallengeDetails } from './pages/ChallengeDetails';
import { ReportProblem } from './pages/ReportProblem';
import { SolutionsMarket } from './pages/SolutionsMarket';
import { ProposeSolution } from './pages/ProposeSolution';
import { ProjectsList } from './pages/ProjectsList';
import { ProjectWorkspace } from './pages/ProjectWorkspace';
import { UniversityDirectory } from './pages/UniversityDirectory';
import { IndustryDirectory } from './pages/IndustryDirectory';
import { CollaborationHub } from './pages/CollaborationHub';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { HowItWorks } from './pages/HowItWorks';
import { ImpactShowcase } from './pages/ImpactShowcase';

// Auth Pages
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// Dashboards
import { CitizenDashboard } from './pages/Dashboards/CitizenDashboard';
import { StudentDashboard } from './pages/Dashboards/StudentDashboard';
import { UniversityDashboard } from './pages/Dashboards/UniversityDashboard';
import { IndustryDashboard } from './pages/Dashboards/IndustryDashboard';
import { GovernmentDashboard } from './pages/Dashboards/GovernmentDashboard';
import { AdminDashboard } from './pages/Dashboards/AdminDashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ChallengeProvider>
          <ProjectProvider>
            <MessageProvider>
              <NotificationProvider>
                <Router>
                  <Routes>
                    {/* Public Layout Routes */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/challenges" element={<ExploreChallenges />} />
                      <Route path="/challenges/:id" element={<ChallengeDetails />} />
                      <Route path="/report-problem" element={<ReportProblem />} />
                      <Route path="/solutions" element={<SolutionsMarket />} />
                      <Route path="/propose-solution" element={<ProposeSolution />} />
                      <Route path="/propose-solution/:challengeId" element={<ProposeSolution />} />
                      <Route path="/projects" element={<ProjectsList />} />
                      <Route path="/projects/:id" element={<ProjectWorkspace />} />
                      <Route path="/universities" element={<UniversityDirectory />} />
                      <Route path="/industry-partners" element={<IndustryDirectory />} />
                      <Route path="/collaboration" element={<CollaborationHub />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/notifications" element={<NotificationsPage />} />
                      <Route path="/how-it-works" element={<HowItWorks />} />
                      <Route path="/impact" element={<ImpactShowcase />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Authenticated Dashboard Layout Routes */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route path="citizen" element={<CitizenDashboard />} />
                      <Route path="student" element={<StudentDashboard />} />
                      <Route path="university" element={<UniversityDashboard />} />
                      <Route path="industry" element={<IndustryDashboard />} />
                      <Route path="government" element={<GovernmentDashboard />} />
                      <Route path="admin" element={<AdminDashboard />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Router>
              </NotificationProvider>
            </MessageProvider>
          </ProjectProvider>
        </ChallengeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

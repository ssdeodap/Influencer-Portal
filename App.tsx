import React, { useState, useEffect } from 'react';
import Auth from './components/auth/Auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Socials from './components/Socials';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import FindCampaigns from './components/FindCampaigns';
import MyCollaborations from './components/MyCollaborations';
import OnboardingTutorial from './components/OnboardingTutorial';
import type { UserProfile, Campaign, Application, Collaboration } from './types';
import { mockCampaigns, createInfluencerWorkflow } from './mockData';

export type Page = 'Dashboard' | 'Profile' | 'Social Media' | 'Find Campaigns' | 'My Collaborations' | 'Analytics' | 'Settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [applications, setApplications] = useState<Application[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);

  // Load user session on initial render
  useEffect(() => {
    const sessionEmail = localStorage.getItem('currentUserEmail');
    if (sessionEmail) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = users.find((u: any) => u.credentials.email === sessionEmail);
      if (currentUser) {
        setUserProfile(currentUser.profile);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    }
  }, []);

  // Effect to simulate brand accepting an application
  useEffect(() => {
    const pendingApplication = applications.find(app => app.status === 'Applied');
    if (pendingApplication) {
        const timer = setTimeout(() => {
            setApplications(prev => prev.map(app => 
                app.id === pendingApplication.id ? { ...app, status: 'Accepted' } : app
            ));
            const newCollaboration: Collaboration = {
                id: `collab-${pendingApplication.id}`,
                campaign: pendingApplication.campaign,
                status: 'In Progress',
                workflow: createInfluencerWorkflow(),
            };
            setCollaborations(prev => [...prev, newCollaboration]);
        }, 5000); 
        return () => clearTimeout(timer);
    }
  }, [applications]);

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.credentials.email === updatedProfile.email);
        if (userIndex > -1) {
            users[userIndex].profile = updatedProfile;
            localStorage.setItem('users', JSON.stringify(users));
        }
    } catch (error) {
        console.error("Failed to update user profile in localStorage", error);
    }
  };

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsAuthenticated(true);
    localStorage.setItem('currentUserEmail', profile.email);

    const hasCompletedOnboarding = localStorage.getItem(`onboarding_${profile.email}`);
    if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('currentUserEmail');
  };
  
  const handleApply = (campaignId: number) => {
    const appliedCampaign = campaigns.find(c => c.id === campaignId);
    if (appliedCampaign && !applications.some(a => a.campaign.id === campaignId)) {
        const newApplication: Application = {
            id: `app-${Date.now()}`,
            campaign: appliedCampaign,
            status: 'Applied',
            appliedDate: new Date().toISOString(),
        };
        setApplications(prev => [...prev, newApplication]);
    }
  };
  
  const handleWorkflowUpdate = (updatedCollaboration: Collaboration) => {
    setCollaborations(prev => prev.map(c => c.id === updatedCollaboration.id ? updatedCollaboration : c));
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    if(userProfile) {
        localStorage.setItem(`onboarding_${userProfile.email}`, 'completed');
    }
  }

  const renderPage = () => {
    if (!userProfile) return null;
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard userProfile={userProfile} collaborations={collaborations} applications={applications} />;
      case 'Profile':
        return <Profile userProfile={userProfile} onUpdateProfile={handleUpdateProfile} setCurrentPage={setCurrentPage} />;
      case 'Social Media':
        return <Socials userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />;
      case 'Find Campaigns':
        return <FindCampaigns campaigns={campaigns} applications={applications} onApply={handleApply} />;
      case 'My Collaborations':
        return <MyCollaborations applications={applications.filter(a => a.status !== 'Accepted')} collaborations={collaborations} onWorkflowUpdate={handleWorkflowUpdate} />;
      case 'Analytics':
        return <Analytics />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard userProfile={userProfile} collaborations={collaborations} applications={applications} />;
    }
  };

  if (!isAuthenticated || !userProfile) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
      <div className="flex h-screen bg-brand-bg font-sans">
        {showOnboarding && <OnboardingTutorial onClose={handleCloseOnboarding} setCurrentPage={setCurrentPage} />}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Header userProfile={userProfile} onLogout={handleLogout} pageTitle={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-bg p-6">
                {renderPage()}
            </main>
        </div>
      </div>
  );
};

export default App;

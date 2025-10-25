import React from 'react';
import { DashboardIcon, ProfileIcon, SocialIcon, OffersIcon, AnalyticsIcon, SettingsIcon, SponsorshipIcon } from './icons';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-indigo-100 transition-colors duration-200
        ${isActive ? 'bg-gradient-to-r from-brand-primary-start to-brand-primary-end text-white shadow-md' : ''}`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { label: 'Profile', icon: <ProfileIcon className="w-6 h-6" /> },
    { label: 'Social Media', icon: <SocialIcon className="w-6 h-6" /> },
    { label: 'Find Campaigns', icon: <SponsorshipIcon className="w-6 h-6" /> },
    { label: 'My Collaborations', icon: <OffersIcon className="w-6 h-6" /> },
    { label: 'Analytics', icon: <AnalyticsIcon className="w-6 h-6" /> },
    { label: 'Settings', icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className="w-64 bg-white flex-shrink-0 p-4 border-r flex flex-col" id="tour-step-1">
      <div className="text-2xl font-bold font-heading text-brand-text-primary mb-8 px-2">
        Portal.
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              isActive={currentPage === item.label}
              onClick={() => setCurrentPage(item.label)}
            />
          ))}
        </ul>
      </nav>
      <div className="p-4 bg-indigo-50 rounded-lg text-center">
        <h4 className="font-bold text-indigo-800">Need Help?</h4>
        <p className="text-sm text-indigo-600 mt-1">Check out our FAQ and support docs.</p>
        <button className="mt-3 text-sm font-semibold text-indigo-700 hover:underline">Get Support</button>
      </div>
    </aside>
  );
};

export default Sidebar;

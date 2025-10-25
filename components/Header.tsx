import React, { useState } from 'react';
import type { Page } from '../App';
import { UserProfile } from '../types';
import { BellIcon, LogoutIcon, SettingsIcon, ProfileIcon } from './icons';

interface HeaderProps {
  userProfile: UserProfile | null;
  onLogout: () => void;
  pageTitle: string;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onLogout, pageTitle, setCurrentPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white p-4 flex items-center justify-between border-b">
      <h1 className="text-2xl font-bold font-heading text-brand-text-primary">{pageTitle}</h1>
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-gray-800 relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-secondary"></span>
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3"
          >
            <img
              src={userProfile?.profilePicture || "https://via.placeholder.com/100"}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left hidden md:block">
              <p className="font-semibold text-brand-text-primary">{userProfile?.fullName}</p>
              <p className="text-xs text-brand-text-secondary">{userProfile?.email}</p>
            </div>
          </button>
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
               <button onClick={() => { setCurrentPage('Profile'); setIsDropdownOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <ProfileIcon className="w-5 h-5" /> Profile
                </button>
                <button onClick={() => { setCurrentPage('Settings'); setIsDropdownOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <SettingsIcon className="w-5 h-5" /> Settings
                </button>
              <div className="border-t my-1"></div>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogoutIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import Login from './Login';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';
import PendingVerification from './PendingVerification';
import { UserProfile } from '../../types';

interface AuthProps {
  onLogin: (profile: UserProfile) => void;
}

type AuthView = 'login' | 'signup1' | 'signup2' | 'pendingVerification';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [signupData, setSignupData] = useState<Partial<UserProfile & { password?: string }>>(() => {
    try {
      const savedData = localStorage.getItem('signupData');
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error("Failed to parse signup data from localStorage", error);
      return {};
    }
  });

  const handleStep1Complete = (data: { email?: string; password?: string }) => {
    const updatedData = { ...signupData, ...data };
    setSignupData(updatedData);
    localStorage.setItem('signupData', JSON.stringify(updatedData));
    setView('signup2');
  };

  const handleStep2Complete = (data: object) => {
    const finalSignupData = { ...signupData, ...data };

    let profilePictureUrl: string | null = "https://via.placeholder.com/100";
    const pic = (finalSignupData as any).profilePicture;
    if (pic instanceof File) {
        profilePictureUrl = URL.createObjectURL(pic);
    } else if (typeof pic === 'string') {
        profilePictureUrl = pic;
    }

    const fullProfile: UserProfile = {
      fullName: finalSignupData.fullName || "Influencer",
      profilePicture: profilePictureUrl,
      email: finalSignupData.email || "user@example.com",
      phone: finalSignupData.phone || "",
      country: finalSignupData.country || "",
      city: finalSignupData.city || "",
      dob: finalSignupData.dob || "",
      // FIX: Ensure niche is always a string array, handling both string and string[] inputs.
      niche: finalSignupData.niche ? (Array.isArray(finalSignupData.niche) ? finalSignupData.niche : [finalSignupData.niche]) : [],
      bio: "Welcome to my profile! I'm excited to collaborate with amazing brands.",
      gender: (finalSignupData as any).gender || 'Prefer not to say',
      languages: ['English'],
      website: [],
      experience: 0,
      audienceDemographics: [],
      contentStyle: '',
      engagementRate: 0,
      preferredCollaborations: [],
      socialAccounts: [],
      interests: [],
      authenticity: 93,
      avgWatchTime: 5,
    };
    
    // Multi-user support: Store users in an array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUserIndex = users.findIndex((u: any) => u.credentials.email === finalSignupData.email);

    const newUser = {
      credentials: { email: finalSignupData.email, password: finalSignupData.password },
      profile: fullProfile
    };

    if (existingUserIndex > -1) {
      users[existingUserIndex] = newUser;
    } else {
      users.push(newUser);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    setSignupData(fullProfile);
    setView('pendingVerification');
  };
  
  const handleLoginSuccess = (profile: UserProfile) => {
    onLogin(profile);
    localStorage.removeItem('signupData');
  };

  const handleGoBackToStep1 = () => {
    setView('signup1');
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login onLogin={handleLoginSuccess} onSwitchToSignUp={() => setView('signup1')} />;
      case 'signup1':
        return <SignUpStep1 onNext={handleStep1Complete} onSwitchToLogin={() => setView('login')} initialData={signupData} />;
      case 'signup2':
        return <SignUpStep2 onComplete={handleStep2Complete} initialData={signupData} />;
      case 'pendingVerification':
        return <PendingVerification onVerified={() => {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const currentUser = users.find((u: any) => u.credentials.email === signupData.email);
          if (currentUser) {
            handleLoginSuccess(currentUser.profile);
          }
        }} userData={signupData} onGoBackToStep1={handleGoBackToStep1} />;
      default:
        return <Login onLogin={handleLoginSuccess} onSwitchToSignUp={() => setView('signup1')} />;
    }
  };

  const isLoginView = view === 'login';

  return (
    <div className={`min-h-screen bg-brand-bg flex ${isLoginView ? 'items-center justify-center' : ''}`}>
      {!isLoginView && (
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-primary-start to-brand-primary-end p-12 flex-col justify-between text-white">
          <div>
            <h1 className="text-3xl font-bold font-heading">Portal.</h1>
            <h2 className="text-4xl font-bold mt-12">Join a thriving community of creators.</h2>
            <p className="mt-4 opacity-80">Connect with top brands, manage your collaborations, and grow your influence.</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">"This platform changed the game for me. I landed my dream collaboration within a month!"</p>
            <p className="mt-2 opacity-70">- Jessica Doe, Lifestyle Influencer</p>
          </div>
        </div>
      )}
      
      <main className={`w-full flex items-center justify-center p-4 md:p-8 ${isLoginView ? '' : 'lg:w-1-2'}`}>
        <div className="w-full max-w-md">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Auth;

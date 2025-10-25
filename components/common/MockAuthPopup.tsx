import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InstagramIcon, YoutubeIcon, TiktokIcon } from '../icons';

interface MockAuthPopupProps {
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  popupRef: Window | null;
}

const platformDetails = {
  Instagram: {
    icon: <InstagramIcon className="w-16 h-16 text-pink-500" />,
    name: 'Instagram',
    color: 'bg-pink-500',
  },
  YouTube: {
    icon: <YoutubeIcon className="w-16 h-16 text-red-600" />,
    name: 'Google (for YouTube)',
    color: 'bg-red-600',
  },
  TikTok: {
    icon: <TiktokIcon className="w-16 h-16 text-black" />,
    name: 'TikTok',
    color: 'bg-black',
  },
};

const PopupContent: React.FC<{ platform: 'Instagram' | 'YouTube' | 'TikTok' }> = ({ platform }) => {
  const details = platformDetails[platform];

  const handleAllow = () => {
    if (window.opener) {
      window.opener.postMessage({ type: 'mock-oauth-callback', platform, success: true }, window.location.origin);
      window.close();
    }
  };

  const handleDeny = () => {
    if (window.opener) {
      window.opener.postMessage({ type: 'mock-oauth-callback', platform, success: false }, window.location.origin);
      window.close();
    }
  };
  
  useEffect(() => {
      const handleBeforeUnload = () => {
        if (window.opener) {
             window.opener.postMessage({ type: 'mock-oauth-closed' }, window.location.origin);
        }
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [])

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-8 text-center font-sans">
        <style>{`
            body { margin: 0; }
            button {
                cursor: pointer;
                border: none;
                font-size: 1rem;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                transition: opacity 0.2s;
            }
            button:hover { opacity: 0.9; }
            .allow-btn { background-color: #4285F4; color: white; }
            .deny-btn { background-color: #e0e0e0; color: #333; }
        `}</style>
      {details.icon}
      <h1 className="text-2xl font-bold mt-4">Authorize Access</h1>
      <p className="text-gray-600 mt-2">
        <strong>InfluencerPortal</strong> is requesting permission to access your {details.name} account data.
      </p>
      <p className="text-sm text-gray-500 mt-4">
        This will allow InfluencerPortal to view your profile information and public content. We will never post on your behalf.
      </p>
      <div className="mt-8 flex gap-4 w-full">
        <button onClick={handleDeny} className="deny-btn w-1/2">
          Deny
        </button>
        <button onClick={handleAllow} className="allow-btn w-1/2">
          Allow Access
        </button>
      </div>
    </div>
  );
};


const MockAuthPopup: React.FC<MockAuthPopupProps> = ({ platform, popupRef }) => {
  useEffect(() => {
    if (popupRef && popupRef.document) {
      const doc = popupRef.document;
      doc.title = `Authorize with ${platform}`;

      // Add Tailwind CSS
      const tailwindScript = doc.createElement('script');
      tailwindScript.src = "https://cdn.tailwindcss.com";
      doc.head.appendChild(tailwindScript);
      
      const poppinsFont = doc.createElement('link');
      poppinsFont.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap";
      poppinsFont.rel = 'stylesheet';
      doc.head.appendChild(poppinsFont);
      
      const interFont = doc.createElement('link');
      interFont.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      interFont.rel = 'stylesheet';
      doc.head.appendChild(interFont);


      const body = doc.body;
      body.innerHTML = '<div id="root" class="h-full"></div>';
      
      const rootEl = doc.getElementById('root');
      if (rootEl) {
        const root = createRoot(rootEl);
        root.render(
          <React.StrictMode>
            <PopupContent platform={platform} />
          </React.StrictMode>
        );
      }
    }
  }, [platform, popupRef]);

  return null; // This component doesn't render anything in the main window
};

export default MockAuthPopup;

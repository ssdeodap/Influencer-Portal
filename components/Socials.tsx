
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { SocialAccount, UserProfile } from '../types';
import { InstagramIcon, YoutubeIcon, TiktokIcon, CheckCircleIcon } from './icons';
import MockAuthPopup from './common/MockAuthPopup';


// Helper to generate random data
const generateRandomData = (platform: 'Instagram' | 'YouTube' | 'TikTok', handle: string): Omit<SocialAccount, 'platform' | 'connected' | 'lastSync' | 'handle'> => {
    const followers = Math.floor(Math.random() * (2000000 - 1000 + 1) + 1000);
    const engagementRate = parseFloat((Math.random() * (15 - 1) + 1).toFixed(1));

    const generatePosts = (count: number, seed: string) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            image: `https://picsum.photos/seed/${seed}${handle}${i}/200`,
            likes: Math.floor(Math.random() * (followers * 0.1)),
            comments: Math.floor(Math.random() * (followers * 0.01)),
        }));
    };
    
    return {
        url: `#`,
        followers,
        engagementRate,
        avgLikes: Math.floor(followers * (engagementRate / 100)),
        avgViews: platform === 'Instagram' ? 0 : Math.floor(followers * 1.5),
        avgComments: Math.floor(followers * (engagementRate / 200)),
        avgWatchTime: platform === 'Instagram' ? 0 : Math.floor(Math.random() * (180 - 5 + 1) + 5),
        recentPosts: generatePosts(5, platform),
    };
};

const socialPlatforms: {
  name: 'Instagram' | 'YouTube' | 'TikTok';
  icon: React.ReactNode;
}[] = [
  { 
    name: 'Instagram', 
    icon: <InstagramIcon className="text-pink-500" />,
  },
  { 
    name: 'YouTube', 
    icon: <YoutubeIcon className="text-red-600" />,
  },
  { 
    name: 'TikTok', 
    icon: <TiktokIcon className="text-black" />,
  },
];

interface SocialsProps {
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const SocialAccountCard: React.FC<{
  account: SocialAccount | undefined;
  platformInfo: typeof socialPlatforms[0];
  onConnect: (platformName: 'Instagram' | 'YouTube' | 'TikTok') => void;
  onDisconnect: (platform: 'Instagram' | 'YouTube' | 'TikTok') => void;
  connectionStatus: 'idle' | 'authorizing' | 'finalizing';
}> = ({ account, platformInfo, onConnect, onDisconnect, connectionStatus }) => {
    const {name, icon} = platformInfo;
    const isConnected = !!account;
    const isCurrentPlatformConnecting = connectionStatus !== 'idle' && !isConnected;

    const renderStatusContent = () => {
        if (isCurrentPlatformConnecting) {
            return (
                 <div className="text-brand-text-secondary my-4 h-[215px] flex flex-col items-center justify-center text-center">
                    {connectionStatus === 'authorizing' && (
                        <>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary-start mx-auto"></div>
                            <p className="mt-4">Waiting for authorization...</p>
                            <p className="text-xs mt-1">Please complete the login in the pop-up window.</p>
                        </>
                    )}
                    {connectionStatus === 'finalizing' && (
                        <>
                            <CheckCircleIcon className="w-8 h-8 text-green-500 mx-auto" />
                            <p className="mt-4">Finalizing Connection...</p>
                             <p className="text-xs mt-1">Almost there! Just securing your account.</p>
                        </>
                    )}
                </div>
            )
        }

        if (isConnected) {
            return (
                <>
                    <p className="text-brand-text-secondary my-4">@{account.handle}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-xl font-bold">{Intl.NumberFormat('en-US', { notation: 'compact' }).format(account.followers)}</p>
                            <p className="text-xs text-brand-text-secondary">Followers</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{account.engagementRate}%</p>
                            <p className="text-xs text-brand-text-secondary">Engagement</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{Intl.NumberFormat('en-US', { notation: 'compact' }).format(account.avgLikes || 0)}</p>
                            <p className="text-xs text-brand-text-secondary">Avg. Likes</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{Intl.NumberFormat('en-US', { notation: 'compact' }).format(account.avgViews || 0)}</p>
                            <p className="text-xs text-brand-text-secondary">Avg. Views</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h5 className="text-sm font-semibold mb-2">Recent Posts</h5>
                        <div className="grid grid-cols-3 gap-2">
                           {account.recentPosts.slice(0, 3).map(p => <img key={p.id} src={p.image} className="rounded-md aspect-square object-cover" alt="Recent post" />)}
                        </div>
                    </div>
                    <p className="text-xs text-center text-brand-text-secondary mt-4">Last sync: {account.lastSync}</p>
                </>
            )
        }

        return <p className="text-brand-text-secondary my-4 h-[215px] flex items-center justify-center">Connect your account to view stats.</p>;
    }


    return (
        <Card>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    {icon}
                    <h4 className="text-lg font-bold font-heading">{name}</h4>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            
            {renderStatusContent()}

            <Button onClick={() => isConnected ? onDisconnect(name) : onConnect(name)} variant={isConnected ? 'ghost' : 'primary'} className="w-full mt-4" disabled={connectionStatus !== 'idle'}>
                {isConnected ? 'Disconnect Account' : `Connect ${name}`}
            </Button>
        </Card>
    );
}

const Socials: React.FC<SocialsProps> = ({ userProfile, onUpdateProfile }) => {
    const [connectingPlatform, setConnectingPlatform] = useState<'Instagram' | 'YouTube' | 'TikTok' | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'authorizing' | 'finalizing'>('idle');
    const oauthPopup = React.useRef<Window | null>(null);

    useEffect(() => {
        const handleOauthCallback = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            const { type, platform, success } = event.data;

            if (type === 'mock-oauth-callback' && platform === connectingPlatform && success) {
                setConnectionStatus('finalizing');
                
                // --- Simulating backend token exchange ---
                setTimeout(() => {
                    const randomHandle = `${userProfile.fullName.split(' ')[0].toLowerCase().replace(/\s/g, '')}${Math.floor(Math.random() * 900 + 100)}`;
                    const randomData = generateRandomData(platform, randomHandle);
                    const newAccount: SocialAccount = {
                        platform,
                        handle: randomHandle,
                        connected: true,
                        lastSync: new Date().toLocaleString(),
                        ...randomData,
                    };

                    const updatedAccounts = [...userProfile.socialAccounts.filter(a => a.platform !== newAccount.platform), newAccount];
                    onUpdateProfile({ ...userProfile, socialAccounts: updatedAccounts });

                    // Reset state
                    setConnectingPlatform(null);
                    setConnectionStatus('idle');
                }, 2000); // Simulate 2 second finalization
            } else if (type === 'mock-oauth-closed') {
                if (connectionStatus !== 'finalizing') {
                     setConnectingPlatform(null);
                     setConnectionStatus('idle');
                }
            }
        };

        window.addEventListener('message', handleOauthCallback);
        return () => window.removeEventListener('message', handleOauthCallback);
    }, [connectingPlatform, onUpdateProfile, userProfile, connectionStatus]);
    
    const handleConnectClick = (platformName: 'Instagram' | 'YouTube' | 'TikTok') => {
        setConnectingPlatform(platformName);
        setConnectionStatus('authorizing');

        const width = 500, height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        
        const popup = window.open('', `${platformName}Auth`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`);
        
        if (popup) {
            oauthPopup.current = popup;
            const root = (popup.document.getElementById('root') as HTMLElement);
            if(root) {
                 // The popup's content is rendered via MockAuthPopup.tsx,
                 // which will post a message back on completion or close.
            }
        }
    };
    
    const handleDisconnect = (platform: 'Instagram' | 'YouTube' | 'TikTok') => {
        const updatedAccounts = userProfile.socialAccounts.filter(acc => acc.platform !== platform);
        onUpdateProfile({ ...userProfile, socialAccounts: updatedAccounts });
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialPlatforms.map((platformInfo) => (
                    <SocialAccountCard 
                        key={platformInfo.name} 
                        platformInfo={platformInfo}
                        account={userProfile.socialAccounts.find(acc => acc.platform === platformInfo.name)}
                        onConnect={handleConnectClick}
                        onDisconnect={handleDisconnect}
                        connectionStatus={connectingPlatform === platformInfo.name ? connectionStatus : 'idle'}
                    />
                ))}
            </div>
            {connectingPlatform && connectionStatus === 'authorizing' && (
                <MockAuthPopup
                    platform={connectingPlatform}
                    popupRef={oauthPopup.current}
                />
            )}
        </>
    );
};

export default Socials;
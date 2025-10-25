import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { UserProfile } from '../types';
import Input from './common/Input';
import { HeartIcon, CommentIcon, ViewsIcon, EngagementIcon, FollowersIcon, AuthenticityIcon, WatchTimeIcon, InterestIcon, TrashIcon } from './icons';
import Pill from './common/Pill';
import { Page } from '../App';
import TagSelector from './common/TagSelector';

interface ProfileProps {
    userProfile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
    setCurrentPage: (page: Page) => void;
}

const StatDisplayCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string; }> = ({ icon, value, label, color }) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${color}`}>
            {icon}
        </div>
        <p className="text-2xl font-bold text-brand-text-primary">{value}</p>
        <p className="text-xs text-brand-text-secondary uppercase font-semibold">{label}</p>
    </div>
);

const DetailItem: React.FC<{ label: string; value?: string; children?: React.ReactNode }> = ({ label, value, children }) => (
    <div>
        <p className="text-sm font-semibold text-brand-text-secondary">{label}</p>
        {children ? <div className="text-brand-text-primary mt-1 space-y-1">{children}</div> : <p className="text-brand-text-primary mt-1">{value || '-'}</p>}
    </div>
);

const nicheOptions = ['Fashion', 'Beauty', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel', 'Gaming', 'Photography', 'Music', 'Entertainment', 'Education', 'Business', 'Health & Wellness', 'Parenting'];
const collaborationOptions = ['Sponsored Posts', 'Product Reviews', 'Brand Ambassadorship', 'Affiliate Marketing', 'Event Appearances', 'UGC Content', 'Giveaways'];
const audienceOptions = ['Gen Z (18-24)', 'Millennials (25-40)', 'Gen X (41-56)', 'Parents', 'Students', 'Tech Enthusiasts', 'Fashion Lovers', 'Foodies', 'Fitness Fanatics', 'Gamers'];
const interestOptions = [
    'Beauty & Cosmetics', 'Clothes, Shoes, Handbags & Accessories', 'Art & Design',
    'Fashion', 'Lifestyle', 'Fitness', 'Food & Drink', 'Travel', 'Technology',
    'Gaming', 'Photography', 'Music', 'Entertainment', 'Education', 'Business',
    'Health & Wellness', 'Parenting', 'DIY & Crafts', 'Automotive', 'Sports'
];

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, setCurrentPage }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableProfile, setEditableProfile] = useState<UserProfile>(userProfile);

    const calculateAge = (dob: string) => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} Years`;
    };

    const connectedAccounts = useMemo(() => userProfile.socialAccounts.filter(acc => acc.connected), [userProfile.socialAccounts]);

    const aggregatedStats = useMemo(() => {
        const stats = {
            totalFollowers: 0,
            avgLikes: 0,
            avgComments: 0,
            avgViews: 0,
            avgEngagementRate: 0,
            avgWatchTime: 0,
        };
        if (connectedAccounts.length === 0) return stats;

        connectedAccounts.forEach(acc => {
            stats.totalFollowers += acc.followers || 0;
            stats.avgLikes += acc.avgLikes || 0;
            stats.avgComments += acc.avgComments || 0;
            stats.avgViews += acc.avgViews || 0;
            stats.avgEngagementRate += acc.engagementRate || 0;
            stats.avgWatchTime += acc.avgWatchTime || 0;
        });

        stats.avgLikes = Math.round(stats.avgLikes / connectedAccounts.length);
        stats.avgComments = Math.round(stats.avgComments / connectedAccounts.length);
        stats.avgViews = Math.round(stats.avgViews / connectedAccounts.length);
        stats.avgWatchTime = Math.round(stats.avgWatchTime / connectedAccounts.length);
        stats.avgEngagementRate = parseFloat((stats.avgEngagementRate / connectedAccounts.length).toFixed(2));
        
        return stats;
    }, [connectedAccounts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const finalValue = type === 'number' ? parseInt(value, 10) || 0 : value;
        setEditableProfile(prev => ({ ...prev, [id]: finalValue }));
    };

    const handleTagSelectionChange = (field: 'niche' | 'preferredCollaborations' | 'audienceDemographics' | 'interests', values: string[]) => {
        setEditableProfile(prev => ({ ...prev, [field]: values }));
    };
    
    const handleWebsiteChange = (index: number, value: string) => {
        const newWebsites = [...editableProfile.website];
        newWebsites[index] = value;
        setEditableProfile(prev => ({...prev, website: newWebsites}));
    };

    const addWebsite = () => {
        setEditableProfile(prev => ({...prev, website: [...prev.website, '']}));
    };
    
    const removeWebsite = (index: number) => {
        const newWebsites = editableProfile.website.filter((_, i) => i !== index);
        setEditableProfile(prev => ({...prev, website: newWebsites}));
    };

    const handleSaveChanges = () => {
        onUpdateProfile({...editableProfile, website: editableProfile.website.filter(url => url.trim() !== '')});
        setIsEditMode(false);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
        return num.toString();
    };

    if (!isEditMode) {
        return (
            <div className="space-y-6" id="tour-step-profile">
                <Card>
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold font-heading text-brand-text-primary">Influencer Details</h2>
                        <Button variant="primary" onClick={() => setIsEditMode(true)}>Edit Profile</Button>
                    </div>

                    {connectedAccounts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 my-6">
                            <StatDisplayCard icon={<HeartIcon className="text-red-500"/>} value={formatNumber(aggregatedStats.avgLikes)} label="Avg Likes" color="bg-red-100" />
                            <StatDisplayCard icon={<CommentIcon className="text-yellow-500"/>} value={formatNumber(aggregatedStats.avgComments)} label="Avg Comments" color="bg-yellow-100" />
                            <StatDisplayCard icon={<ViewsIcon className="text-purple-500"/>} value={formatNumber(aggregatedStats.avgViews)} label="Avg Views" color="bg-purple-100" />
                            <StatDisplayCard icon={<EngagementIcon className="text-orange-500"/>} value={`${aggregatedStats.avgEngagementRate}%`} label="Engagement" color="bg-orange-100" />
                            <StatDisplayCard icon={<FollowersIcon className="text-blue-500"/>} value={formatNumber(aggregatedStats.totalFollowers)} label="Followers" color="bg-blue-100" />
                            <StatDisplayCard icon={<AuthenticityIcon className="text-green-500"/>} value={`${userProfile.authenticity}%`} label="Authenticity" color="bg-green-100" />
                            <StatDisplayCard icon={<WatchTimeIcon className="text-indigo-500"/>} value={`${aggregatedStats.avgWatchTime}s`} label="Avg. Watch Time" color="bg-indigo-100" />
                        </div>
                    ) : (
                        <div className="text-center p-8 my-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold font-heading text-brand-text-primary">View Your Influencer Stats</h3>
                            <p className="text-brand-text-secondary mt-2 mb-6 max-w-md mx-auto">Connect your social media accounts to automatically pull in your follower counts, engagement rates, and other key metrics.</p>
                            <Button variant="primary" onClick={() => setCurrentPage('Social Media')}>
                                Connect Accounts Now
                            </Button>
                        </div>
                    )}
                </Card>
                <Card>
                    <h3 className="text-xl font-bold font-heading text-brand-text-primary mb-2">About Me</h3>
                    <p className="text-brand-text-secondary whitespace-pre-wrap">{userProfile.bio || 'No bio provided. Click "Edit Profile" to add one.'}</p>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold font-heading text-brand-text-primary mb-4">Personal Details</h3>
                     <div className="flex flex-wrap gap-2">
                        <Pill>{userProfile.gender}</Pill>
                        <Pill>{calculateAge(userProfile.dob)}</Pill>
                        <Pill>{userProfile.city}, {userProfile.country}</Pill>
                        <Pill>Speaks {userProfile.languages.join(' & ')}</Pill>
                    </div>
                </Card>

                 <Card>
                    <h3 className="text-xl font-bold font-heading text-brand-text-primary mb-4">Professional Details & Interests</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <DetailItem label="Years of Experience" value={`${userProfile.experience} years`} />
                        <DetailItem label="Content Style" value={userProfile.contentStyle || '-'} />
                         <DetailItem label="Platform Links">
                            {userProfile.website && userProfile.website.length > 0 ? (
                                userProfile.website.map((url, index) => (
                                     <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-brand-primary-start hover:underline break-all block">
                                        {url}
                                    </a>
                                ))
                            ) : '-'}
                        </DetailItem>
                    </div>
                    
                    <div className="mt-6 border-t pt-6 space-y-6">
                         <div>
                            <h4 className="font-semibold text-brand-text-primary mb-2">Target Audience</h4>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.audienceDemographics.length > 0 ? userProfile.audienceDemographics.map(a => <Pill key={a}>{a}</Pill>) : <p className="text-sm text-brand-text-secondary">No audience demographics selected.</p>}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-brand-text-primary mb-2">Niches</h4>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.niche.length > 0 ? userProfile.niche.map(n => <Pill key={n}>{n}</Pill>) : <p className="text-sm text-brand-text-secondary">No niches selected.</p>}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-brand-text-primary mb-2">Preferred Collaborations</h4>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.preferredCollaborations.length > 0 ? userProfile.preferredCollaborations.map(c => <Pill key={c}>{c}</Pill>) : <p className="text-sm text-brand-text-secondary">No collaboration types selected.</p>}
                            </div>
                        </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                                <InterestIcon className="text-brand-text-primary h-5 w-5"/>
                                <h4 className="font-semibold text-brand-text-primary">Interests</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {userProfile.interests.length > 0 ? userProfile.interests.map(interest => <Pill key={interest}>{interest}</Pill>) : <p className="text-sm text-brand-text-secondary">No interests selected.</p>}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // EDIT MODE
    return (
        <div className="space-y-6">
            <Card title="Edit Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="fullName" label="Full Name" value={editableProfile.fullName} onChange={handleInputChange} />
                    <Input id="email" label="Email Address" type="email" value={editableProfile.email} disabled />
                    <Input id="phone" label="Phone Number" type="tel" value={editableProfile.phone} onChange={handleInputChange} />
                    <Input id="country" label="Country" value={editableProfile.country} onChange={handleInputChange} />
                    <Input id="city" label="City" value={editableProfile.city} onChange={handleInputChange} />
                    <Input id="dob" label="Date of Birth" type="date" value={editableProfile.dob} onChange={handleInputChange} />
                     <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-brand-text-secondary mb-1">Gender</label>
                        <select id="gender" value={editableProfile.gender} onChange={handleInputChange} className="block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-start focus:border-brand-primary-start text-brand-text-primary">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Non-binary</option>
                            <option>Prefer not to say</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-brand-text-secondary mb-1">Bio/Description (500 characters)</label>
                        <textarea id="bio" rows={4} maxLength={500} className="block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-start focus:border-brand-primary-start text-brand-text-primary" value={editableProfile.bio} onChange={handleInputChange}></textarea>
                    </div>
                </div>
            </Card>

            <Card title="Edit Professional Details & Interests">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="experience" label="Years of Experience" type="number" value={editableProfile.experience} onChange={handleInputChange} />
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-brand-text-secondary mb-1">Platform Links</label>
                        <div className="space-y-2">
                        {editableProfile.website.map((url, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    id={`website-${index}`}
                                    label={`URL #${index + 1}`}
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleWebsiteChange(index, e.target.value)}
                                    className="flex-grow"
                                />
                                <Button type="button" variant="ghost" onClick={() => removeWebsite(index)} className="!p-2 text-red-500 hover:bg-red-50">
                                    <TrashIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                        </div>
                        <Button type="button" variant="ghost" onClick={addWebsite} className="mt-2 text-sm">
                            + Add another link
                        </Button>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="contentStyle" className="block text-sm font-medium text-brand-text-secondary mb-1">Content Style/Specialty</label>
                        <textarea id="contentStyle" rows={3} className="block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-start focus:border-brand-primary-start text-brand-text-primary" value={editableProfile.contentStyle} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="md:col-span-2">
                         <TagSelector 
                            title="Target Audience Demographics"
                            description="Select the groups you primarily create content for."
                            options={audienceOptions}
                            selectedOptions={editableProfile.audienceDemographics}
                            onSelectionChange={(selected) => handleTagSelectionChange('audienceDemographics', selected)}
                        />
                    </div>
                     <div className="md:col-span-2">
                        <TagSelector 
                            title="Niches"
                            description="Select all categories that apply to your content."
                            options={nicheOptions}
                            selectedOptions={editableProfile.niche}
                            onSelectionChange={(selected) => handleTagSelectionChange('niche', selected)}
                        />
                    </div>
                    <div className="md:col-span-2">
                       <TagSelector 
                            title="Preferred Collaboration Types"
                            description="What kind of brand partnerships are you interested in?"
                            options={collaborationOptions}
                            selectedOptions={editableProfile.preferredCollaborations}
                            onSelectionChange={(selected) => handleTagSelectionChange('preferredCollaborations', selected)}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <TagSelector 
                            title="Interests"
                            description="Select topics that best describe your personal interests."
                            options={interestOptions}
                            selectedOptions={editableProfile.interests}
                            onSelectionChange={(selected) => handleTagSelectionChange('interests', selected)}
                        />
                    </div>
                </div>
            </Card>

            <div className="flex justify-end gap-4 sticky bottom-4">
                <Button variant="ghost" onClick={() => { setIsEditMode(false); setEditableProfile(userProfile); }}>Cancel</Button>
                <Button variant="primary" className="px-8" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );
};

export default Profile;
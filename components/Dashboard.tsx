import React, { useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import ProgressBar from './common/ProgressBar';
import { UserProfile, Collaboration, Application } from '../types';

interface DashboardProps {
    userProfile: UserProfile;
    collaborations: Collaboration[];
    applications: Application[];
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, collaborations, applications }) => {

    const profileCompletionPercentage = useMemo(() => {
        const fields = [
            userProfile.fullName, userProfile.bio, userProfile.phone,
            userProfile.country, userProfile.city, userProfile.dob,
            userProfile.gender,
            userProfile.languages.length > 0,
            userProfile.niche.length > 0,
            userProfile.website.length > 0,
            userProfile.experience > 0,
            userProfile.audienceDemographics.length > 0,
            userProfile.contentStyle,
            userProfile.preferredCollaborations.length > 0,
            userProfile.interests.length > 0,
            userProfile.socialAccounts.length > 0
        ];
        const completed = fields.filter(Boolean).length;
        return Math.round((completed / fields.length) * 100);
    }, [userProfile]);
    
    const activeCollaborations = collaborations.filter(c => c.status === 'In Progress');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-heading text-brand-text-primary">Welcome back, {userProfile.fullName.split(' ')[0]}!</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Active Collaborations</h3>
                        <p className="text-5xl font-bold text-brand-primary-start my-2">{activeCollaborations.length}</p>
                    </div>
                    <Button variant="ghost">View Collaborations</Button>
                </Card>
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Pending Applications</h3>
                        <p className="text-5xl font-bold text-brand-primary-start my-2">{applications.length}</p>
                    </div>
                     <Button variant="ghost">View Applications</Button>
                </Card>
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Profile Completion</h3>
                         <div className="my-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-brand-primary-start">Progress</span>
                                <span className="text-sm font-medium text-brand-primary-start">{profileCompletionPercentage}%</span>
                            </div>
                            <ProgressBar percentage={profileCompletionPercentage} />
                        </div>
                    </div>
                    <Button variant="ghost">Complete Your Profile</Button>
                </Card>
            </div>

            <Card title="Recent Activity" id="tour-step-2">
                {collaborations.length === 0 && applications.length === 0 ? (
                    <p className="text-brand-text-secondary">No recent activity. Find a new campaign to get started!</p>
                ) : (
                    <ul className="space-y-3">
                        {applications.slice(0, 2).map(app => (
                             <li key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p>You applied to <strong>{app.campaign.campaignTitle}</strong></p>
                                    <p className="text-xs text-brand-text-secondary">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                </div>
                                <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Pending</span>
                            </li>
                        ))}
                         {activeCollaborations.slice(0, 2).map(collab => (
                            <li key={collab.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p>Your collaboration with <strong>{collab.campaign.brandName}</strong> is in progress!</p>
                                    <p className="text-xs text-brand-text-secondary">Status: {collab.workflow.find(s => s.status === 'Action Needed')?.title || 'In Progress'}</p>
                                </div>
                               <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">In Progress</span>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default Dashboard;

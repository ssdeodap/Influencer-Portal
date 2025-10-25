import React, { useState } from 'react';
import type { Campaign, Application } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { BackIcon } from './icons';

const CampaignCard: React.FC<{ campaign: Campaign; onClick: () => void; }> = ({ campaign, onClick }) => (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-xl transition-shadow duration-300">
        <img src={campaign.campaignImage} alt={campaign.campaignTitle} className="w-full h-48 object-cover rounded-t-xl -m-6 mb-4" />
        <h3 className="font-bold font-heading text-lg">{campaign.campaignTitle}</h3>
        <p className="text-brand-text-secondary text-sm">{campaign.brandName}</p>
        <p className="mt-2 font-semibold text-brand-primary-start">{campaign.compensation}</p>
        <div className="flex flex-wrap gap-2 mt-4">
            {campaign.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    </Card>
);

const CampaignDetail: React.FC<{ campaign: Campaign; onBack: () => void; onApply: () => void; hasApplied: boolean; }> = ({ campaign, onBack, onApply, hasApplied }) => (
    <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
            <BackIcon className="w-5 h-5" /> Back to Campaigns
        </Button>
        <Card>
            <img src={campaign.campaignImage} alt={campaign.campaignTitle} className="w-full h-64 object-cover rounded-t-xl -m-6 mb-6"/>
            <h1 className="text-3xl font-bold font-heading">{campaign.campaignTitle}</h1>
            <p className="text-lg text-brand-text-secondary mt-1">{campaign.brandName}</p>
            <div className="my-6 border-t border-b py-4 flex justify-between items-center">
                <span className="font-bold text-lg">Compensation</span>
                <span className="text-xl font-bold text-brand-primary-start">{campaign.compensation}</span>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-bold font-heading text-xl mb-2">Description</h3>
                    <p className="text-brand-text-secondary whitespace-pre-wrap">{campaign.description}</p>
                </div>
                <div>
                    <h3 className="font-bold font-heading text-xl mb-2">Deliverables</h3>
                    <ul className="list-disc list-inside text-brand-text-secondary space-y-1">
                        {campaign.deliverables.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className="flex justify-end sticky bottom-4">
                    <Button variant="primary" onClick={onApply} disabled={hasApplied} className="px-10 py-3 text-lg">
                        {hasApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>
        </Card>
    </div>
);

const FindCampaigns: React.FC<{ campaigns: Campaign[]; applications: Application[]; onApply: (id: number) => void; }> = ({ campaigns, applications, onApply }) => {
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    if (selectedCampaign) {
        return <CampaignDetail 
            campaign={selectedCampaign} 
            onBack={() => setSelectedCampaign(null)}
            onApply={() => {
                onApply(selectedCampaign.id);
                setSelectedCampaign(null);
            }}
            hasApplied={applications.some(a => a.campaign.id === selectedCampaign.id)}
        />
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold font-heading">Find Sponsorships</h2>
                <p className="text-brand-text-secondary mt-1">Discover and apply for campaigns from top brands.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {campaigns.map(campaign => (
                    <CampaignCard 
                        key={campaign.id}
                        campaign={campaign}
                        onClick={() => setSelectedCampaign(campaign)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FindCampaigns;

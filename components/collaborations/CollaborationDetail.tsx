import React from 'react';
import type { Application, Collaboration } from '../../types';
import CollaborationWorkflow from './CollaborationWorkflow';
import Card from '../common/Card';

interface CollaborationDetailProps {
    item: Application | Collaboration;
    onWorkflowUpdate: (collaboration: Collaboration) => void;
}

const CollaborationDetail: React.FC<CollaborationDetailProps> = ({ item, onWorkflowUpdate }) => {
    const isApplication = 'appliedDate' in item;

    if (isApplication) {
        return (
            <Card className="h-full flex flex-col justify-center">
                <div className="text-center">
                    <img src={item.campaign.campaignImage} alt={item.campaign.brandName} className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                    <h2 className="text-xl font-bold font-heading">{item.campaign.campaignTitle}</h2>
                    <p className="text-brand-text-secondary">{item.campaign.brandName}</p>
                    <div className="mt-6">
                        <p className="text-sm text-brand-text-secondary mb-2">Application Status</p>
                        <p className="text-2xl font-bold text-yellow-600">{item.status}</p>
                         <p className="text-xs text-brand-text-secondary mt-1">Applied on {new Date(item.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-brand-text-secondary mt-8 max-w-sm mx-auto">The brand is currently reviewing applications. You will be notified once a decision has been made.</p>
                </div>
            </Card>
        );
    }
    
    // It's a Collaboration
    return <CollaborationWorkflow collaboration={item} onUpdate={onWorkflowUpdate} />;
};

export default CollaborationDetail;

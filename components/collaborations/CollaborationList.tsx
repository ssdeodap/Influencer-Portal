import React, { useState } from 'react';
import type { Application, Collaboration } from '../../types';

interface CollaborationListProps {
    applications: Application[];
    collaborations: Collaboration[];
    onSelectItem: (item: Application | Collaboration) => void;
    selectedItemId: string | null;
}

type Tab = 'Applications' | 'Collaborations';

const ListItem: React.FC<{ item: Application | Collaboration; isSelected: boolean; onClick: () => void; }> = ({ item, isSelected, onClick }) => {
    const isApplication = 'appliedDate' in item;
    const status = isApplication ? item.status : item.status;
    const statusColor = isApplication ? 'text-yellow-600' : 'text-blue-600';

    return (
        <div 
            onClick={onClick}
            className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 border-brand-primary-start shadow-md' : 'hover:bg-gray-50'}`}
        >
            <img src={item.campaign.campaignImage} alt={item.campaign.brandName} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 overflow-hidden">
                <p className="font-bold truncate">{item.campaign.campaignTitle}</p>
                <p className="text-sm text-gray-500 truncate">{item.campaign.brandName}</p>
                <p className={`text-sm font-semibold ${statusColor}`}>{status}</p>
            </div>
        </div>
    );
};

const CollaborationList: React.FC<CollaborationListProps> = ({ applications, collaborations, onSelectItem, selectedItemId }) => {
    const [activeTab, setActiveTab] = useState<Tab>('Collaborations');

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl font-bold font-heading">My Collaborations</h2>
            </div>
            <div className="flex border-b mb-4">
                <button 
                    onClick={() => setActiveTab('Collaborations')}
                    className={`flex-1 py-2 text-center font-semibold border-b-2 transition-colors ${activeTab === 'Collaborations' ? 'text-brand-primary-start border-brand-primary-start' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                >
                    Collaborations ({collaborations.length})
                </button>
                <button 
                    onClick={() => setActiveTab('Applications')}
                    className={`flex-1 py-2 text-center font-semibold border-b-2 transition-colors ${activeTab === 'Applications' ? 'text-brand-primary-start border-brand-primary-start' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
                >
                    Applications ({applications.length})
                </button>
            </div>
            <div className="space-y-3">
                {activeTab === 'Collaborations' && (
                    collaborations.length > 0 ? collaborations.map(collab => (
                        <ListItem key={collab.id} item={collab} isSelected={selectedItemId === collab.id} onClick={() => onSelectItem(collab)} />
                    )) : <p className="text-center text-gray-500 mt-8">No active collaborations yet.</p>
                )}
                {activeTab === 'Applications' && (
                     applications.length > 0 ? applications.map(app => (
                        <ListItem key={app.id} item={app} isSelected={selectedItemId === app.id} onClick={() => onSelectItem(app)} />
                    )) : <p className="text-center text-gray-500 mt-8">You haven't applied to any campaigns yet.</p>
                )}
            </div>
        </div>
    );
};

export default CollaborationList;

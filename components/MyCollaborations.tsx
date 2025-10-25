import React, { useState } from 'react';
import type { Application, Collaboration } from '../types';
import CollaborationList from './collaborations/CollaborationList';
import CollaborationDetail from './collaborations/CollaborationDetail';
import Card from './common/Card';

interface MyCollaborationsProps {
    applications: Application[];
    collaborations: Collaboration[];
    onWorkflowUpdate: (collaboration: Collaboration) => void;
}

const MyCollaborations: React.FC<MyCollaborationsProps> = ({ applications, collaborations, onWorkflowUpdate }) => {
    const [selectedItem, setSelectedItem] = useState<Application | Collaboration | null>(null);

    const handleSelectItem = (item: Application | Collaboration) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex h-full" id="tour-step-collaborations">
            <div className="w-1/3 border-r pr-4 overflow-y-auto">
                <CollaborationList 
                    applications={applications}
                    collaborations={collaborations}
                    onSelectItem={handleSelectItem}
                    selectedItemId={selectedItem?.id}
                />
            </div>
            <div className="w-2/3 pl-4 overflow-y-auto">
                {selectedItem ? (
                    <CollaborationDetail 
                        item={selectedItem} 
                        onWorkflowUpdate={onWorkflowUpdate} 
                    />
                ) : (
                    <Card className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-bold font-heading">Select an Item</h2>
                            <p className="text-brand-text-secondary mt-2">Choose an application or collaboration from the list to see its details.</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default MyCollaborations;

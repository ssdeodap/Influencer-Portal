import React from 'react';
import type { Collaboration, WorkflowStep } from '../../types';
import { CheckCircleIcon, ClockIcon, AlertCircleIcon } from '../icons';
import Button from '../common/Button';

interface CollaborationWorkflowProps { 
    collaboration: Collaboration;
    onUpdate: (collaboration: Collaboration) => void;
}

const CollaborationWorkflow: React.FC<CollaborationWorkflowProps> = ({ collaboration, onUpdate }) => {
    const { campaign: campaign, workflow } = collaboration;

    const handleAction = (stepId: number) => {
        const stepIndex = workflow.findIndex(s => s.id === stepId);
        if (stepIndex === -1 || workflow[stepIndex].status !== 'Action Needed') return;
        
        const newWorkflow = [...workflow];
        newWorkflow[stepIndex] = { ...newWorkflow[stepIndex], status: 'Completed', date: new Date().toLocaleString() };

        const nextStepIndex = newWorkflow.findIndex(s => s.status === 'Upcoming');
        if (nextStepIndex > -1) {
            newWorkflow[nextStepIndex] = { ...newWorkflow[nextStepIndex], status: 'Waiting', date: new Date().toLocaleString() };
        }
        
        onUpdate({ ...collaboration, workflow: newWorkflow });
    };

    const getStatusIcon = (status: WorkflowStep['status']) => {
        switch (status) {
            case 'Completed': return <div className="bg-green-500 rounded-full p-1.5"><CheckCircleIcon className="w-5 h-5 text-white" /></div>;
            case 'Action Needed': return <div className="bg-red-500 rounded-full p-1.5 animate-pulse"><AlertCircleIcon className="w-5 h-5 text-white" /></div>;
            case 'Waiting': return <div className="bg-yellow-500 rounded-full p-1.5"><ClockIcon className="w-5 h-5 text-white" /></div>;
            case 'Upcoming': return <div className="border-2 border-gray-300 rounded-full p-1.5"><div className="w-5 h-5"></div></div>;
        }
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-md">
            <div className="p-4 border-b">
                 <h2 className="font-bold text-lg font-heading">{campaign.campaignTitle}</h2>
                 <p className="text-sm text-gray-500">{campaign.brandName}</p>
            </div>

            <div className="space-y-2 p-6 overflow-y-auto">
                {workflow.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            {getStatusIcon(step.status)}
                            {index < workflow.length - 1 && <div className="w-px flex-grow bg-gray-300 my-1"></div>}
                        </div>
                        <div className="pb-8 w-full">
                            <p className={`font-bold ${step.status === 'Upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>{step.title}</p>
                            {step.date && <p className="text-xs text-gray-500">{step.date}</p>}
                            {step.description && <p className="text-sm mt-1 text-gray-600">{step.description}</p>}
                            {step.feedback && (
                                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                                    <span className="font-bold">Brand Feedback:</span> {step.feedback}
                                </div>
                            )}
                            {step.actionLabel && step.status === 'Action Needed' && (
                                <div className="mt-3">
                                    <Button variant="primary" onClick={() => handleAction(step.id)}>{step.actionLabel}</Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollaborationWorkflow;

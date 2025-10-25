
import React from 'react';

interface PillProps {
    children: React.ReactNode;
    className?: string;
}

const Pill: React.FC<PillProps> = ({ children, className = '' }) => {
    return (
        <div className={`py-1.5 px-4 bg-gray-100 text-brand-text-primary text-sm font-medium rounded-full ${className}`}>
            {children}
        </div>
    );
};

export default Pill;
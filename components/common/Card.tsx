
import React from 'react';

// FIX: Extend React.HTMLAttributes to allow passing standard HTML attributes like 'id'.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`} {...props}>
      {title && <h3 className="text-xl font-heading font-semibold text-brand-text-primary mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

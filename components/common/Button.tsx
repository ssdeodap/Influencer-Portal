
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";

  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-primary-start to-brand-primary-end text-white shadow-lg focus:ring-brand-primary-start',
    secondary: 'bg-brand-secondary text-white shadow-lg focus:ring-brand-secondary',
    ghost: 'bg-transparent text-brand-text-primary hover:bg-gray-100 focus:ring-brand-primary-start',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

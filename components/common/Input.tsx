import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ label, id, type = 'text', error, helperText, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasError = !!error;
  const baseRingClasses = "focus:ring-2 focus:ring-offset-1";
  const errorRingClasses = "border-red-500 focus:ring-red-400";
  const defaultRingClasses = "border-gray-300 focus:border-brand-primary-start focus:ring-brand-primary-start";

  return (
    <div className="relative">
      <input
        id={id}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        className={`peer block w-full px-3 py-2.5 bg-transparent border rounded-md shadow-sm placeholder-transparent focus:outline-none text-brand-text-primary 
          ${baseRingClasses} ${hasError ? errorRingClasses : defaultRingClasses}`}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-2 -top-2.5 bg-brand-bg px-1 text-sm transition-all 
          peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-text-secondary 
          peer-focus:-top-2.5 peer-focus:text-sm 
          ${hasError ? 'text-red-600 peer-focus:text-red-600' : 'text-gray-500 peer-focus:text-brand-primary-start'}`}
      >
        {label}
      </label>
      {type === 'password' && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      )}
      {(error || helperText) && (
        <p className={`mt-2 text-xs ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
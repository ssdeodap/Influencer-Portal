import React, { useState } from 'react';
import Button from '../common/Button';
import { CheckCircleIcon } from '../icons';
import { UserProfile } from '../../types';

interface PendingVerificationProps {
  onVerified: (data: Partial<UserProfile>) => void;
  userData: Partial<UserProfile>;
  onGoBackToStep1: () => void;
}

const PendingVerification: React.FC<PendingVerificationProps> = ({ onVerified, userData, onGoBackToStep1 }) => {
  const [resentMessage, setResentMessage] = useState('');

  const handleResend = () => {
    setResentMessage('Verification email resent!');
    setTimeout(() => {
        setResentMessage('');
    }, 3000);
  };

  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-brand-primary-start to-brand-primary-end">
        <CheckCircleIcon className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold font-heading mt-6">Please Verify Your Email</h1>
      <p className="text-brand-text-secondary mt-2 max-w-sm mx-auto">
        We've sent a verification link to <strong>{userData.email}</strong>. Please check your inbox and click the link to activate your account.
      </p>
      <div className="mt-8 space-y-4">
        {/* This button simulates the user having verified their email */}
        <Button onClick={() => onVerified(userData)} variant="primary" className="w-full max-w-xs mx-auto !py-3">
          I've Verified My Email (Continue)
        </Button>
        <Button variant="ghost" className="w-full max-w-xs mx-auto" onClick={handleResend}>
          Resend Verification Email
        </Button>
        {resentMessage && <p className="text-sm text-green-600">{resentMessage}</p>}
      </div>
       <p className="text-center text-xs text-brand-text-secondary !mt-6">
          Wrong email?{' '}
          <button type="button" onClick={onGoBackToStep1} className="font-medium text-brand-primary-start hover:text-brand-primary-end">
            Change email address
          </button>
        </p>
    </div>
  );
};

export default PendingVerification;

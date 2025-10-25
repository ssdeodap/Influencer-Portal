import React, { useState, FormEvent } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

interface SignUpStep1Props {
  onNext: (data: object) => void;
  onSwitchToLogin: () => void;
  initialData: any;
}

const SignUpStep1: React.FC<SignUpStep1Props> = ({ onNext, onSwitchToLogin, initialData }) => {
  const [formData, setFormData] = useState({ 
      email: initialData.email || '', 
      password: '', 
      confirmPassword: '' 
  });
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', terms: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '', terms: '' };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (formData.password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, and a number.';
        isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
    if (!termsAccepted) {
        newErrors.terms = 'You must accept the terms and conditions.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext({ email: formData.email, password: formData.password });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [e.target.id]: e.target.value});
  }

  return (
    <div className="w-full">
      <div className="text-left mb-8">
        <p className="text-sm font-semibold text-brand-primary-start">STEP 1 OF 2</p>
        <h1 className="text-3xl font-bold font-heading mt-1">Create Your Account</h1>
        <p className="text-brand-text-secondary mt-2">Let's get you started. Provide your basic account details.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <Input id="password" label="Password" type="password" value={formData.password} onChange={handleChange} error={errors.password} helperText="8+ characters, with uppercase, lowercase, and a number." required />
        <Input id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 text-brand-primary-start focus:ring-brand-primary-end border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I agree to the <a href="#" className="font-medium text-brand-primary-start hover:text-brand-primary-end">Terms</a> and <a href="#" className="font-medium text-brand-primary-start hover:text-brand-primary-end">Privacy Policy</a>
            </label>
            {errors.terms && <p className="text-xs text-red-600 mt-1">{errors.terms}</p>}
          </div>
        </div>
        
        <div className="pt-4">
            <Button type="submit" variant="primary" className="w-full !py-3">
                Create Account & Continue
            </Button>
        </div>
        
        <p className="text-center text-sm text-brand-text-secondary !mt-6">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="font-medium text-brand-primary-start hover:text-brand-primary-end">
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpStep1;
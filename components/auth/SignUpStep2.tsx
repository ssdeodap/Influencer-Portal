import React, { useState, FormEvent, useMemo } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import ImageUpload from '../common/ImageUpload';
import ProgressBar from '../common/ProgressBar';

interface SignUpStep2Props {
  onComplete: (data: object) => void;
  initialData: any;
}

const formElementClasses = "block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-start focus:border-brand-primary-start text-brand-text-primary";


const SignUpStep2: React.FC<SignUpStep2Props> = ({ onComplete, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    profilePicture: initialData.profilePicture || null as File | null,
    phone: initialData.phone || '',
    country: initialData.country || '',
    city: initialData.city || '',
    dob: initialData.dob || '',
    gender: initialData.gender || '',
    niche: (Array.isArray(initialData.niche) ? initialData.niche[0] : initialData.niche) || '',
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const totalFields = Object.keys(formData).length;
  const completedFields = useMemo(() => {
    return Object.values(formData).filter(value => {
        if (value === null) return false;
        if (typeof value === 'string') return value.trim() !== '';
        return true;
    }).length;
  }, [formData]);

  const progress = (completedFields / totalFields) * 100;
  const isFormComplete = progress >= 100;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (isFormComplete) {
      onComplete(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="w-full">
      <div className="text-left mb-6">
        <p className="text-sm font-semibold text-brand-primary-start">STEP 2 OF 2</p>
        <h1 className="text-3xl font-bold font-heading mt-1">Complete Your Profile</h1>
        <p className="text-brand-text-secondary mt-2">This information is required to match you with the best brands.</p>
      </div>
      
      <div className="mb-6">
          <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-brand-primary-start">Profile Progress</span>
              <span className="text-sm font-medium text-brand-primary-start">{Math.round(progress)}%</span>
          </div>
          <ProgressBar percentage={progress} />
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input id="fullName" label="Full Name*" type="text" value={formData.fullName} onChange={handleChange} required />
        
        <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Profile Picture*</label>
            <ImageUpload onFileChange={(file) => setFormData(prev => ({ ...prev, profilePicture: file }))} />
        </div>
        
        <Input id="phone" label="Phone Number*" type="tel" value={formData.phone} onChange={handleChange} required />
        <Input id="country" label="Country*" type="text" value={formData.country} onChange={handleChange} required />
        <Input id="city" label="City/State*" type="text" value={formData.city} onChange={handleChange} required />
        <Input id="dob" label="Date of Birth*" type="date" value={formData.dob} onChange={handleChange} helperText="You must be 18+ to sign up." required />
        
        <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-500 mb-1">Gender*</label>
            <select id="gender" value={formData.gender} onChange={handleChange} required className={formElementClasses}>
                <option value="">Select your gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
            </select>
        </div>
        
        <div>
            <label htmlFor="niche" className="block text-sm font-medium text-gray-500 mb-1">Primary Niche/Category*</label>
            <select id="niche" value={formData.niche} onChange={handleChange} required className={formElementClasses}>
                <option value="">Select your main category</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Tech</option>
                <option>Lifestyle</option>
                <option>Fitness</option>
                <option>Food</option>
                <option>Travel</option>
            </select>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full !py-3" disabled={!isFormComplete}>
            Complete Registration
          </Button>
          {attemptedSubmit && !isFormComplete && (
            <p className="text-center text-xs text-brand-secondary mt-2">
                Please fill out all required fields marked with * to continue.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUpStep2;

import React, { FormEvent, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { UserProfile } from '../../types';

interface LoginProps {
  onLogin: (profile: UserProfile) => void;
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
        setError('No accounts found. Please sign up first.');
        return;
    }

    try {
        const users = JSON.parse(usersStr);
        const foundUser = users.find((user: any) => 
            user.credentials.email === email && user.credentials.password === password
        );

        if (foundUser) {
            onLogin(foundUser.profile);
        } else {
            const emailExists = users.some((user: any) => user.credentials.email === email);
            if (emailExists) {
                setError('Incorrect password. Please try again.');
            } else {
                setError('No account found with that email. Please sign up.');
            }
        }
    } catch (err) {
        setError('An error occurred during login. Please try again.');
        console.error("Login error:", err);
    }
  };
  
  return (
    <div className="w-full">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-brand-primary-start to-brand-primary-end">
                Welcome Back
            </h1>
            <p className="text-brand-text-secondary mt-2">
                Please log in to your account to continue.
            </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input id="email" label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary-start focus:ring-brand-primary-end border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                </div>
                <a href="#" className="font-medium text-brand-primary-start hover:text-brand-primary-end">Forgot password?</a>
            </div>
            
            <Button type="submit" variant="primary" className="w-full !py-3">
                Log In
            </Button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-brand-bg px-2 text-gray-500">Or continue with</span>
                </div>
            </div>
            
             {/* Placeholder for social logins */}
            <Button type="button" variant="ghost" className="w-full border border-gray-300">
                Continue with Google
            </Button>
            
            <p className="text-center text-sm text-brand-text-secondary !mt-8">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchToSignUp} className="font-medium text-brand-primary-start hover:text-brand-primary-end">
                Sign up
                </button>
            </p>
        </form>
    </div>
  );
};

export default Login;

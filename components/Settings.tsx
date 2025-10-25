
import React from 'react';
import Card from './common/Card';
import Input from './common/Input';
import Button from './common/Button';

const Settings: React.FC = () => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card title="Account Settings">
                <div className="space-y-4">
                    <Input id="email" label="Email Address" type="email" defaultValue="jessica.doe@example.com" />
                    <Input id="currentPassword" label="Current Password" type="password" />
                    <Input id="newPassword" label="New Password" type="password" />
                    <div className="pt-2 flex justify-end">
                        <Button variant="primary">Update Password</Button>
                    </div>
                </div>
            </Card>

            <Card title="Payment Information">
                 <div className="space-y-4">
                    <Input id="paypalEmail" label="PayPal Email" type="email" defaultValue="j.doe.creative@example.com" />
                    <Input id="accountHolder" label="Bank Account Holder" defaultValue="Jessica Doe" />
                    <Input id="routingNumber" label="Routing Number" defaultValue="123456789" />
                    <Input id="accountNumber" label="Account Number" defaultValue="************1234" />
                    <div className="pt-2 flex justify-end">
                        <Button variant="primary">Save Payment Info</Button>
                    </div>
                </div>
            </Card>

            <Card title="Notification Preferences">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p>New collaboration offers</p>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary-start"></div>
                        </label>
                    </div>
                     <div className="flex items-center justify-between">
                        <p>Application status updates</p>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary-start"></div>
                        </label>
                    </div>
                     <div className="flex items-center justify-between">
                        <p>Platform newsletter</p>
                         <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary-start"></div>
                        </label>
                    </div>
                </div>
            </Card>

            <Card title="Delete Account">
                <p className="text-brand-text-secondary mb-4">
                    Permanently delete your account and all of your content. This action is not reversible.
                </p>
                <div className="flex justify-end">
                    <Button variant="secondary">Delete My Account</Button>
                </div>
            </Card>
        </div>
    );
};

export default Settings;

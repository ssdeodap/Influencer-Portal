
import React from 'react';
import Card from './common/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const followerGrowthData = [
  { name: 'Jan', followers: 4000 },
  { name: 'Feb', followers: 3000 },
  { name: 'Mar', followers: 5000 },
  { name: 'Apr', followers: 4500 },
  { name: 'May', followers: 6000 },
  { name: 'Jun', followers: 7500 },
];

const engagementData = [
  { name: 'Jan', Instagram: 4.5, YouTube: 10.2 },
  { name: 'Feb', Instagram: 4.2, YouTube: 11.1 },
  { name: 'Mar', Instagram: 5.1, YouTube: 12.0 },
  { name: 'Apr', Instagram: 4.8, YouTube: 11.5 },
  { name: 'May', Instagram: 5.5, YouTube: 12.5 },
  { name: 'Jun', Instagram: 5.8, YouTube: 13.1 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
       <div>
            <h2 className="text-3xl font-bold font-heading">Analytics & Performance</h2>
            <p className="text-brand-text-secondary mt-1">Track your growth and engagement across all platforms.</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="tour-step-5">
        <Card title="Follower Growth (All Platforms)">
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={followerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="followers" stroke="#6B46FF" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
        <Card title="Engagement Rate (%)">
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Instagram" fill="#FF6B6B" />
                    <Bar dataKey="YouTube" fill="#00D4FF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
      <Card title="Top Performing Content">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-3">Platform</th>
                        <th className="p-3">Content</th>
                        <th className="p-3">Engagement</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 border-b">
                        <td className="p-3">Instagram Reel</td>
                        <td className="p-3">"My Morning Routine"</td>
                        <td className="p-3 text-green-500 font-semibold">18.5%</td>
                        <td className="p-3">June 15, 2024</td>
                    </tr>
                    <tr className="hover:bg-gray-50 border-b">
                        <td className="p-3">YouTube Video</td>
                        <td className="p-3">"Unboxing the latest tech"</td>
                        <td className="p-3 text-green-500 font-semibold">15.2%</td>
                        <td className="p-3">June 10, 2024</td>
                    </tr>
                     <tr className="hover:bg-gray-50">
                        <td className="p-3">Instagram Post</td>
                        <td className="p-3">"Summer fashion haul"</td>
                        <td className="p-3 text-green-500 font-semibold">12.1%</td>
                        <td className="p-3">June 5, 2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;

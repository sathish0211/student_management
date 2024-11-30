import React from 'react';
import { Users, BookOpen } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '197', icon: Users, change: 12, changeType: 'increase' },
  { name: 'Total Classes', value: '3', icon: BookOpen, change: 2, changeType: 'increase' },
];

export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.imgur.com/jkVXNOx.jpeg')",
        backgroundSize: 'cover',  // Ensure the background image covers the entire screen
      }}
    >
      <div className="bg-white bg-opacity-0 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white bg-opacity-70 rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center justify-center p-3 rounded-lg bg-indigo-50">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

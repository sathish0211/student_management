import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Hash, Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500">Student Profile</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <User className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Hash className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium text-gray-900">{user?.studentId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-medium text-gray-900">{user?.class}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
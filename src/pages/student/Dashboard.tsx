import React from 'react';
import { Bell, BookOpen, Calendar, Clock } from 'lucide-react';

const upcomingClasses = [
  { id: 1, subject: 'Mathematics', time: '09:00 AM', teacher: 'Dr. Smith', room: 'Room 101' },
  { id: 2, subject: 'Physics', time: '10:30 AM', teacher: 'Prof. Johnson', room: 'Room 203' },
  { id: 3, subject: 'English', time: '01:00 PM', teacher: 'Ms. Davis', room: 'Room 305' },
];

const recentNotices = [
  { id: 1, title: 'Mid-term Exam Schedule', date: '2024-03-15', type: 'Academic' },
  { id: 2, title: 'Science Fair Registration', date: '2024-03-14', type: 'Event' },
  { id: 3, title: 'Library Hours Update', date: '2024-03-13', type: 'General' },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="mt-2 text-indigo-100">Class 10A • Roll No: 2024001</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-indigo-100">Attendance</p>
            <p className="text-2xl font-semibold">95%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-indigo-100">Assignments</p>
            <p className="text-2xl font-semibold">12/15</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-indigo-100">Average Grade</p>
            <p className="text-2xl font-semibold">A-</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{class_.subject}</p>
                      <p className="text-sm text-gray-500">{class_.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{class_.time}</span>
                    </div>
                    <p className="text-sm text-gray-500">{class_.room}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Notices</h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{notice.title}</p>
                    <p className="text-sm text-gray-500">{notice.type}</p>
                  </div>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
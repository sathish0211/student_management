import React from 'react';
import { BarChart3, PieChart, LineChart, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Attendance Overview</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">85%</p>
          <p className="text-sm text-gray-500 mt-1">Average attendance rate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Academic Performance</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">B+</p>
          <p className="text-sm text-gray-500 mt-1">Average grade</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Student Growth</h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">+12%</p>
          <p className="text-sm text-gray-500 mt-1">Year over year growth</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Detailed Reports</h3>
        <div className="space-y-4">
          {['Attendance Report', 'Academic Performance Report', 'Student Progress Report'].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <span className="text-gray-900">{report}</span>
              <button className="inline-flex items-center px-3 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from 'react';
import { User, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStudentByRegisterNumber, validateAdminCredentials, initializeDemoData } from '../services/firestore';

export default function Login() {
  const { login } = useAuth();
  const [isStudent, setIsStudent] = React.useState(true);
  const [formData, setFormData] = React.useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize demo data when component mounts
  useEffect(() => {
    initializeDemoData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isStudent) {
        const student = await getStudentByRegisterNumber(formData.identifier);
        console.log(student)
        if (student && student.password === formData.password) {
          login(student);
        } else {
          setError('Invalid register number or password');
        }
      } else {
        const admin = await validateAdminCredentials(formData.identifier, formData.password);
        if (admin) {
          login(admin);
        } else {
          setError('Invalid admin credentials');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsStudent(true)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 ${
              isStudent
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setIsStudent(false)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 ${
              !isStudent
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isStudent ? 'Register Number' : 'Email'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={isStudent ? "text" : "email"}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={isStudent ? "Enter your register number" : "Enter your email"}
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Demo credentials */}
        
      </div>
    </div>
  );
}
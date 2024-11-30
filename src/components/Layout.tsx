import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User as UserIcon, Bell, BookOpen, Users, Home, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navigation = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Classes', href: '/admin/classes', icon: BookOpen },
        { name: 'Students', href: '/admin/studentsAll', icon: Users },
        
      ]
    : [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Notices', href: '/notices', icon: Bell },
        { name: 'Profile', href: '/profile', icon: UserIcon },
      ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} // Sidebar is controlled by sidebarOpen on all screen sizes
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Student Management System</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false); // Close sidebar on mobile after navigation
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:block">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-600">
                <UserIcon className="w-6 h-6" />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-gray-900">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

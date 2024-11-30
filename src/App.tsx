import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

import Classes from './pages/admin/Classes';
import Students from './pages/admin/Students';
import StudentsAll from './pages/admin/StudentsAll';

import Reports from './pages/admin/Reports';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Admin Routes */}
          {user.role === 'admin' && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/classes" element={<Classes />} />
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/studentsAll" element={<StudentsAll />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/" element={<Navigate to="/admin" replace />} />
            </>
          )}

          {/* Student Routes */}
          {user.role === 'student' && (
            <>
              <Route path="/dashboard" element={<StudentDashboard />} />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
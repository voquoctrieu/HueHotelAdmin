import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './layout/Layout';
import Admin from './page/admin';
import Login from './page/login';
import Dashboard from './page/dashboard';
import Profile from './page/profile';
import NotFound from './page/notFound';
import CheckInOut from './page/checkInOut';
import Statistics from './page/statistics';
import AccountantDashboard from './page/accountant';
import ReceptionistDashboard from './page/receptionist';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />

          {/* Protected routes */}
          <Route path='/' element={
            <PrivateRoute>
              <Layout>
                <Outlet />
              </Layout>
            </PrivateRoute>
          }>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='admin/*' element={
              <RoleRoute allowedRoles={['admin']}>
                <Admin />
              </RoleRoute>
            } />
            <Route path='accountant/*' element={
              <RoleRoute allowedRoles={['accountant', 'admin']}>
                <AccountantDashboard />
              </RoleRoute>
            } />
            <Route path='receptionist/*' element={
              <RoleRoute allowedRoles={['receptionist', 'admin']}>
                <ReceptionistDashboard />
              </RoleRoute>
            } />
            <Route path='check-in-out/*' element={<CheckInOut />} />
            <Route path='statistics/*' element={<Statistics />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

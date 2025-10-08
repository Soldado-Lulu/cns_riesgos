import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboardPage from './pages/AdminPages/AdminDashboardPage.jsx';
import UserDashboardPage from './pages/UserPages/UserDashboardPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* haz que la raíz muestre el login para probar más fácil */}
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute allowedRoles={['user','admin']}>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

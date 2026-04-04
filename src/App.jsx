import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Auth Pages
import SplashScreen from './pages/auth/SplashScreen';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Donor Pages
import DonorDashboard from './pages/donor/DonorDashboard';
import DonatePage from './pages/donor/DonatePage';
import DonationHistoryPage from './pages/donor/DonationHistoryPage';
import ImpactPage from './pages/donor/ImpactPage';
import CertificatePage from './pages/donor/CertificatePage';
import NotificationsPage from './pages/donor/NotificationsPage';
import ProfilePage from './pages/donor/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Shared Pages
import SettingsPage from './pages/shared/SettingsPage';
import HelpPage from './pages/shared/HelpPage';


// 🔒 Fake auth + role (for now)
const isAuthenticated = true;
const userRole = "donor"; // change to "admin" to test

// 🔒 Protected Route Component
function ProtectedRoute({ children, role }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* DONOR ROUTES */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="donor">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/history" element={<DonationHistoryPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<Layout />}>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* SHARED */}
        <Route element={<Layout />}>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
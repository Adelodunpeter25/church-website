import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import LandingPage from './pages/landing/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import Dashboard from './pages/dashboard/Dashboard'
import MemberDashboard from './pages/member-dashboard/MemberDashboard'
import MembershipPage from './pages/membership/MembershipPage'
import SermonsPage from './pages/sermons/SermonsPage'
import EventsPage from './pages/events/EventsPage'
import LiveStreamPage from './pages/live/LiveStreamPage'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage'
import FormsPage from './pages/forms/FormsPage'
import PlaylistsPage from './pages/playlists/PlaylistsPage'
import UserManagementPage from './pages/users/UserManagementPage'
import ContentManagementPage from './pages/content/ContentManagementPage'
import SettingsPage from './pages/settings/SettingsPage'
import ProfilePage from './pages/profile/ProfilePage'
import PublicFormPage from './pages/forms/PublicFormPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/forms/:id" element={<PublicFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><Dashboard /></ProtectedRoute>} />
        <Route path="/member-dashboard" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
        <Route path="/membership" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><MembershipPage /></ProtectedRoute>} />
        <Route path="/sermons" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><SermonsPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><EventsPage /></ProtectedRoute>} />
        <Route path="/live" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><LiveStreamPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/forms" element={<ProtectedRoute allowedRoles={['admin', 'pastor', 'minister', 'staff']}><FormsPage /></ProtectedRoute>} />
        <Route path="/playlists" element={<ProtectedRoute><PlaylistsPage /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagementPage /></ProtectedRoute>} />
        <Route path="/content" element={<ProtectedRoute allowedRoles={['admin', 'pastor']}><ContentManagementPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><SettingsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

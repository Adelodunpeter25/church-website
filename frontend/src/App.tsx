import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import Dashboard from './pages/dashboard/Dashboard'
import MemberDashboard from './pages/member-dashboard/MemberDashboard'
import MembershipPage from './pages/membership/MembershipPage'
import SermonsPage from './pages/sermons/SermonsPage'
import EventsPage from './pages/events/EventsPage'
import LiveStreamPage from './pages/live/LiveStreamPage'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage'
import FormsPage from './pages/forms/FormsPage'
import PlaylistsPage from './pages/playlists/PlaylistsPage'
import SettingsPage from './pages/settings/SettingsPage'
import ProfilePage from './pages/profile/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/sermons" element={<SermonsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/live" element={<LiveStreamPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

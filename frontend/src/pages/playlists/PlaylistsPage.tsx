


import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import PlaylistGrid from './PlaylistGrid';
import CreatePlaylistModal from './CreatePlaylistModal';
import { usePlaylists } from '@/hooks/usePlaylists';

export default function PlaylistsPage() {
  const { fetchPlaylists, loading } = usePlaylists();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold text-gray-900">My Playlists</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Organize your favorite sermons into custom playlists for easy listening.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <i className="ri-grid-line mr-1"></i>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer whitespace-nowrap ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <i className="ri-list-check mr-1"></i>
                    List
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  disabled={loading}
                  className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Loading...
                    </>
                  ) : (
                    <>
                      <i className="ri-add-line mr-2"></i>
                      New Playlist
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <PlaylistGrid viewMode={viewMode} onRefresh={fetchPlaylists} onCreateClick={() => setShowCreateModal(true)} />
            </div>
          </div>
        </main>
      </div>

      <CreatePlaylistModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchPlaylists}
      />
    </div>
  );
}

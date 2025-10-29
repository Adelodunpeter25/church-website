import { useState } from 'react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden cursor-pointer"
        onClick={onMenuClick}
      >
        <i className="ri-menu-line text-xl"></i>
      </button>

      <div className="h-6 w-px bg-gray-200 lg:hidden"></div>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="ri-search-line text-gray-400 text-sm"></i>
          </div>
          <input
            className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
            placeholder="Search sermons, members, events..."
            type="search"
          />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="relative">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="ri-notification-2-line text-xl"></i>
            </button>
            {showNotifications && (
              <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b">
                  Notifications
                </div>
                <div className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-user-add-line text-blue-500"></i>
                    <span>5 new members joined this week</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <i className="ri-calendar-line text-green-500"></i>
                    <span>Youth event scheduled for tomorrow</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="ri-upload-line text-orange-500"></i>
                    <span>New sermon uploaded by Pastor John</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"></div>

          <div className="relative">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://readdy.ai/api/search-image?query=professional%20pastor%20headshot%20photo%20with%20warm%20smile%20and%20friendly%20expression%2C%20clean%20church%20office%20background%20with%20soft%20lighting%2C%20wearing%20formal%20attire%20suitable%20for%20church%20leadership&width=100&height=100&seq=profile1&orientation=squarish"
                alt="Profile"
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                  Pastor David
                </span>
                <i className="ml-2 ri-arrow-down-s-line text-gray-400"></i>
              </span>
            </button>
            {showProfile && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Your Profile
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Settings
                </Link>
                <Link to="/landing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

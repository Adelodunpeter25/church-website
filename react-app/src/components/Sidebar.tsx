
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ri-dashboard-line', current: false },
  { name: 'Members', href: '/membership', icon: 'ri-team-line', current: false },
  { name: 'Sermons', href: '/sermons', icon: 'ri-book-open-line', current: false },
  { name: 'Events', href: '/events', icon: 'ri-calendar-line', current: false },
  { name: 'Announcements', href: '/announcements', icon: 'ri-megaphone-line', current: false },
  { name: 'Forms', href: '/forms', icon: 'ri-file-list-3-line', current: false },
  { name: 'Playlists', href: '/playlists', icon: 'ri-play-list-line', current: false },
  { name: 'Live Stream', href: '/live', icon: 'ri-live-line', current: false },
  { name: 'Settings', href: '/settings', icon: 'ri-settings-3-line', current: false },
  { name: 'Profile', href: '/profile', icon: 'ri-user-line', current: false },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={onClose}></div>
        <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Pacifico, serif" }}>
                logo
              </div>
            </div>
            <button
              type="button"
              className="rounded-md text-gray-700 hover:text-gray-900"
              onClick={onClose}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center">
            <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Pacifico, serif" }}>
              logo
            </div>
          </div>
          <SidebarContent />
        </div>
      </div>
    </>
  );
}

function SidebarContent() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium cursor-pointer whitespace-nowrap 
                  ${item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

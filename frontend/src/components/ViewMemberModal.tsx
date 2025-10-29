interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number;
}

export default function ViewMemberModal({ isOpen, onClose, memberId }: ViewMemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Member Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                className="h-20 w-20 rounded-full" 
                src={`https://readdy.ai/api/search-image?query=professional%20church%20member%20portrait&width=100&height=100&seq=member${memberId}`}
                alt="Member"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Member since 2020</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">sarah.johnson@email.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">(555) 123-4567</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Leader</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ministry</p>
                <p className="text-sm text-gray-900">Youth Ministry</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Attendance</p>
                <p className="text-sm text-gray-900">January 14, 2025</p>
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

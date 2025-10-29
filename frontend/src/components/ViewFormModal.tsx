interface ViewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  formId: number;
}

export default function ViewFormModal({ isOpen, onClose, onEdit, formId }: ViewFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Form Preview</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p className="text-sm text-blue-800">This is a preview of how the form will appear to users</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your full name" disabled />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="your.email@example.com" disabled />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="(555) 123-4567" disabled />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Your message here..." disabled></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Close
              </button>
              <button onClick={onEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Edit Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

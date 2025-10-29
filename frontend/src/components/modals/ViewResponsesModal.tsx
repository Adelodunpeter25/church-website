interface ViewResponsesModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: number;
}

const sampleResponses = [
  { id: 1, name: 'John Smith', email: 'john@email.com', date: '2025-01-15', status: 'Completed' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', date: '2025-01-14', status: 'Completed' },
  { id: 3, name: 'Michael Brown', email: 'michael@email.com', date: '2025-01-13', status: 'Completed' },
];

export default function ViewResponsesModal({ isOpen, onClose, formId }: ViewResponsesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Form Responses</h3>
              <p className="text-sm text-gray-500 mt-1">Total responses: {sampleResponses.length}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total Responses</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">{sampleResponses.length}</p>
                  </div>
                  <i className="ri-file-list-line text-blue-600 text-2xl"></i>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Completion Rate</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">100%</p>
                  </div>
                  <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Avg. Time</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">3.5 min</p>
                  </div>
                  <i className="ri-time-line text-purple-600 text-2xl"></i>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleResponses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {response.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <i className="ri-download-line mr-2"></i>
                Export to CSV
              </button>
              <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

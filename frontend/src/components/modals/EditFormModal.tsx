import { useState } from 'react';

interface EditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId: number;
}

interface FormField {
  id: number;
  name: string;
  type: string;
}

export default function EditFormModal({ isOpen, onClose, formId }: EditFormModalProps) {
  const [fields, setFields] = useState<FormField[]>([
    { id: 1, name: 'Full Name', type: 'Text' },
    { id: 2, name: 'Email Address', type: 'Email' },
    { id: 3, name: 'Phone Number', type: 'Phone' },
  ]);
  const [editingField, setEditingField] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');

  if (!isOpen) return null;

  const handleAddField = () => {
    const newField = { id: Date.now(), name: 'New Field', type: 'Text' };
    setFields([...fields, newField]);
    setEditingField(newField.id);
    setEditName(newField.name);
    setEditType(newField.type);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field.id);
    setEditName(field.name);
    setEditType(field.type);
  };

  const handleSaveField = () => {
    setFields(fields.map(f => 
      f.id === editingField ? { ...f, name: editName, type: editType } : f
    ));
    setEditingField(null);
  };

  const handleDeleteField = (id: number) => {
    setFields(fields.filter(f => f.id !== id));
    if (editingField === id) setEditingField(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Edit Form</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title *</label>
              <input type="text" defaultValue="Youth Retreat Registration" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea rows={3} defaultValue="Registration form for the annual youth retreat" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Form Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Event Registration</option>
                  <option>Membership</option>
                  <option>Survey</option>
                  <option>Volunteer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              
              <div className="flex items-center pt-8">
                <input type="checkbox" id="isPublic" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">Make form public</label>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Form Fields</h4>
              <div className="space-y-2 text-sm">
                {fields.map((field) => (
                  <div key={field.id}>
                    {editingField === field.id ? (
                      <div className="p-2 bg-blue-50 rounded space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Field name"
                        />
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option>Text</option>
                          <option>Email</option>
                          <option>Phone</option>
                          <option>Number</option>
                          <option>Date</option>
                          <option>Textarea</option>
                        </select>
                        <div className="flex space-x-2">
                          <button onClick={handleSaveField} className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                            Save
                          </button>
                          <button onClick={() => setEditingField(null)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-700">{field.name} ({field.type})</span>
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditField(field)} className="text-blue-600 hover:text-blue-800">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteField(field.id)} className="text-red-600 hover:text-red-800">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={handleAddField} className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                <i className="ri-add-line mr-1"></i>Add Field
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

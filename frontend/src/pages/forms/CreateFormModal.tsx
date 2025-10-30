


import { useState } from 'react';
import { useForms } from '@/hooks/useForms';

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateFormModal({ isOpen, onClose, onSuccess }: CreateFormModalProps) {
  const { createForm } = useForms();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'registration',
    isPublic: true,
    deadline: '',
    allowMultiple: false,
    requireLogin: true,
    template: 'blank'
  });

  const templates = [
    { id: 'blank', name: 'Blank Form', description: 'Start from scratch with a blank form' },
    { id: 'event', name: 'Event Registration', description: 'Form for event registration with common fields' },
    { id: 'membership', name: 'Membership Application', description: 'Comprehensive membership form template' },
    { id: 'volunteer', name: 'Volunteer Sign-up', description: 'Form for volunteer opportunities and availability' },
    { id: 'survey', name: 'Survey Template', description: 'Basic survey form with rating and feedback fields' },
    { id: 'contact', name: 'Contact Information', description: 'Simple contact information collection form' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createForm(formData);
      onSuccess?.();
      onClose();
    setFormData({
      title: '',
      description: '',
      type: 'registration',
      isPublic: true,
      deadline: '',
      allowMultiple: false,
      requireLogin: true,
      template: 'blank'
    });
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Create New Form</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <form id="create-form-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter form title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                maxLength={500}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose of this form..."
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pr-8 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="registration">Event Registration</option>
                  <option value="membership">Membership Application</option>
                  <option value="survey">Survey</option>
                  <option value="volunteer">Volunteer Sign-up</option>
                  <option value="contact">Contact Form</option>
                  <option value="feedback">Feedback Form</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative cursor-pointer rounded-lg border p-4 ${
                      formData.template === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, template: template.id }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={formData.template === template.id}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {template.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Form Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="is-public"
                    name="isPublic"
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is-public" className="ml-2 text-sm text-gray-700">
                    Make this form publicly accessible (can be shared via link)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="require-login"
                    name="requireLogin"
                    type="checkbox"
                    checked={formData.requireLogin}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="require-login" className="ml-2 text-sm text-gray-700">
                    Require users to be logged in to submit
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="allow-multiple"
                    name="allowMultiple"
                    type="checkbox"
                    checked={formData.allowMultiple}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allow-multiple" className="ml-2 text-sm text-gray-700">
                    Allow multiple submissions from the same user
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Form'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

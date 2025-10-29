
'use client';

import { useState } from 'react';

interface FormsListProps {
  filterStatus: string;
}

const forms = [
  {
    id: 1,
    title: 'Youth Retreat Registration',
    description: 'Registration form for the annual youth retreat including accommodation preferences and dietary requirements.',
    type: 'Event Registration',
    status: 'active',
    responses: 45,
    createdDate: '2024-01-05',
    lastModified: '2024-01-10',
    author: 'Sarah Johnson',
    isPublic: true,
    deadline: '2024-03-01'
  },
  {
    id: 2,
    title: 'New Member Information',
    description: 'Comprehensive form for new members to provide personal information, ministry interests, and spiritual background.',
    type: 'Membership',
    status: 'active',
    responses: 23,
    createdDate: '2024-01-01',
    lastModified: '2024-01-08',
    author: 'Pastor John Smith',
    isPublic: true,
    deadline: null
  },
  {
    id: 3,
    title: 'Service Feedback Survey',
    description: 'Collect feedback from congregation about Sunday services, music, and overall worship experience.',
    type: 'Survey',
    status: 'active',
    responses: 187,
    createdDate: '2023-12-15',
    lastModified: '2024-01-03',
    author: 'Admin',
    isPublic: true,
    deadline: null
  },
  {
    id: 4,
    title: 'Volunteer Sign-up',
    description: 'Sign up form for various volunteer opportunities within the church including ministry preferences and availability.',
    type: 'Volunteer',
    status: 'draft',
    responses: 0,
    createdDate: '2024-01-12',
    lastModified: '2024-01-12',
    author: 'Michael Brown',
    isPublic: false,
    deadline: null
  },
  {
    id: 5,
    title: 'Christmas Event Registration',
    description: 'Registration for Christmas Eve service including preferred seating time and special accommodation needs.',
    type: 'Event Registration',
    status: 'closed',
    responses: 312,
    createdDate: '2023-11-01',
    lastModified: '2023-12-20',
    author: 'Pastor David Wilson',
    isPublic: false,
    deadline: '2023-12-20'
  }
];

export default function FormsList({ filterStatus }: FormsListProps) {
  const [selectedForms, setSelectedForms] = useState<number[]>([]);

  const filteredForms = forms.filter(form => {
    if (filterStatus === 'all') return true;
    return form.status === filterStatus;
  });

  const toggleForm = (id: number) => {
    setSelectedForms(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedForms.length === filteredForms.length) {
      setSelectedForms([]);
    } else {
      setSelectedForms(filteredForms.map(f => f.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Event Registration': return 'bg-blue-100 text-blue-800';
      case 'Membership': return 'bg-purple-100 text-purple-800';
      case 'Survey': return 'bg-orange-100 text-orange-800';
      case 'Volunteer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedForms.length === filteredForms.length && filteredForms.length > 0}
              onChange={toggleAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">
              {selectedForms.length > 0 ? `${selectedForms.length} selected` : 'Select all'}
            </span>
          </div>
          {selectedForms.length > 0 && (
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer whitespace-nowrap">
                Delete Selected
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                Export Data
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredForms.map((form) => (
          <div key={form.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedForms.includes(form.id)}
                onChange={() => toggleForm(form.id)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(form.status)}`}>
                      {form.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(form.type)}`}>
                      {form.type}
                    </span>
                    {form.isPublic && (
                      <span className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                        Public
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-edit-line"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-more-2-line"></i>
                      </div>
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{form.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <i className="ri-file-list-line mr-2"></i>
                    {form.responses} responses
                  </div>
                  <div className="flex items-center">
                    <i className="ri-user-line mr-2"></i>
                    Created by {form.author}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-calendar-line mr-2"></i>
                    Created {new Date(form.createdDate).toLocaleDateString()}
                  </div>
                  {form.deadline && (
                    <div className="flex items-center">
                      <i className="ri-time-line mr-2"></i>
                      Deadline: {new Date(form.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer whitespace-nowrap">
                      <i className="ri-eye-line mr-1"></i>
                      View Form
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer whitespace-nowrap">
                      <i className="ri-bar-chart-line mr-1"></i>
                      View Responses
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                      <i className="ri-share-line mr-1"></i>
                      Share
                    </button>
                  </div>

                  {form.status === 'active' && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-green-600">Live</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-file-list-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
          <p className="text-gray-500">
            {filterStatus === 'all' 
              ? 'Create your first form to get started.' 
              : `No ${filterStatus} forms at the moment.`
            }
          </p>
        </div>
      )}
    </div>
  );
}

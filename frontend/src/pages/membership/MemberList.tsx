


import { useState } from 'react';
import EditMemberModal from '@/components/EditMemberModal';
import ViewMemberModal from '@/components/ViewMemberModal';
import ConfirmDialog from '@/components/ConfirmDialog';

interface MemberListProps {
  searchTerm: string;
  filterRole: string;
}

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    role: 'Leader',
    joinDate: '2020-03-15',
    lastAttendance: '2025-01-14',
    status: 'Active',
    ministry: 'Youth Ministry'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 234-5678',
    role: 'Volunteer',
    joinDate: '2021-07-22',
    lastAttendance: '2025-01-14',
    status: 'Active',
    ministry: 'Music Team'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 345-6789',
    role: 'Member',
    joinDate: '2019-11-08',
    lastAttendance: '2025-01-07',
    status: 'Active',
    ministry: 'Children Ministry'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '(555) 456-7890',
    role: 'Leader',
    joinDate: '2018-05-12',
    lastAttendance: '2025-01-14',
    status: 'Active',
    ministry: 'Outreach Team'
  },
  {
    id: 5,
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@email.com',
    phone: '(555) 567-8901',
    role: 'Member',
    joinDate: '2022-01-30',
    lastAttendance: '2025-01-14',
    status: 'Active',
    ministry: 'Welcome Team'
  }
];

export default function MemberList({ searchTerm, filterRole }: MemberListProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<{ id: number; name: string } | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleMember = (id: number) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id));
    }
  };

  return (
    <div>
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                  onChange={toggleAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role & Ministry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Attendance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleMember(member.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full object-top object-cover" 
                      src={`https://readdy.ai/api/search-image?query=professional%20church%20member%20portrait%20photo%20with%20warm%20friendly%20smile%2C%20diverse%20person%20wearing%20casual%20formal%20attire%20suitable%20for%20church%20community%2C%20clean%20bright%20background%20with%20natural%20lighting&width=100&height=100&seq=member${member.id}&orientation=squarish`}
                      alt={member.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">Member since {new Date(member.joinDate).getFullYear()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.email}</div>
                  <div className="text-sm text-gray-500">{member.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.role === 'Leader' ? 'bg-purple-100 text-purple-800' :
                    member.role === 'Volunteer' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {member.role}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">{member.ministry}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(member.lastAttendance).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedMember(member.id);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      title="Edit"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-edit-line"></i>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedMember(member.id);
                        setShowViewModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                      title="View Details"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-eye-line"></i>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setMemberToDelete({ id: member.id, name: member.name });
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                      title="Delete"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-delete-bin-line"></i>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          console.log('Deleting member:', memberToDelete?.id);
        }}
        title="Delete Member"
        message={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {selectedMember && (
        <>
          <EditMemberModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            memberId={selectedMember}
          />
          <ViewMemberModal
            isOpen={showViewModal}
            onClose={() => setShowViewModal(false)}
            memberId={selectedMember}
          />
        </>
      )}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-user-search-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

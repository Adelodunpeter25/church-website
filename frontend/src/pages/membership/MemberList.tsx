


import { useState, useEffect } from 'react';
import { useMembers } from '@/hooks/useMembers';
import { Member } from '@/types';
import { getInitials, getAvatarColor } from '@/utils/avatar';
import EditMemberModal from '@/components/modals/EditMemberModal';
import ViewMemberModal from '@/components/modals/ViewMemberModal';
import ConfirmDialog from '@/components/modals/ConfirmDialog';

interface MemberListProps {
  searchTerm: string;
  filterRole: string;
}

export default function MemberList({ searchTerm, filterRole }: MemberListProps) {
  const { getMembers, deleteMember } = useMembers();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [searchTerm, filterRole]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const params: any = { role: 'member' };
      if (searchTerm) params.search = searchTerm;
      const data = await getMembers(params);
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;
    try {
      await deleteMember(memberToDelete.id);
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const filteredMembers = Array.isArray(members) ? members : [];

  const toggleMember = (id: string) => {
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

  if (loading) {
    return <div className="text-center py-12">Loading members...</div>;
  }

  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {filteredMembers.map((member) => (
            <div key={member.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.id)}
                  onChange={() => toggleMember(member.id)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${getAvatarColor(member.name)}`}>
                  {getInitials(member.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{member.email}</p>
                      <p className="text-xs text-gray-500">{member.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                      member.role === 'leader' ? 'bg-purple-100 text-purple-800' :
                      member.role === 'volunteer' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {member.role}
                    </span>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                      member.membershipStatus === 'active' ? 'bg-green-100 text-green-800' :
                      member.membershipStatus === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.membershipStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Since {new Date(member.dateJoined).getFullYear()}</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          setSelectedMember(member.id);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedMember(member.id);
                          setShowViewModal(true);
                        }}
                        className="text-green-600 hover:text-green-900 cursor-pointer"
                      >
                        <i className="ri-eye-line text-lg"></i>
                      </button>
                      <button 
                        onClick={() => {
                          setMemberToDelete({ id: member.id, name: member.name });
                          setShowDeleteConfirm(true);
                        }}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(member.name)}`}>
                      {getInitials(member.name)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">Member since {new Date(member.dateJoined).getFullYear()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.email}</div>
                  <div className="text-sm text-gray-500">{member.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.role === 'leader' ? 'bg-purple-100 text-purple-800' :
                    member.role === 'volunteer' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    member.membershipStatus === 'active' ? 'bg-green-100 text-green-800' :
                    member.membershipStatus === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.membershipStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(member.dateJoined).toLocaleDateString()}
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
        onConfirm={handleDelete}
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

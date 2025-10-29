export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pastor' | 'member';
  phone?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface UserPermissions {
  canManageUsers: boolean;
  canManageSermons: boolean;
  canManageEvents: boolean;
  canManageMembers: boolean;
  canViewReports: boolean;
}

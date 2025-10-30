export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pastor' | 'minister' | 'staff' | 'member';
  phone?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

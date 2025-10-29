export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  publishDate: string;
  expiryDate?: string;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt: string;
}

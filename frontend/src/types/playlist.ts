export interface Playlist {
  id: number;
  name: string;
  description?: string;
  member_id: number;
  sermon_count?: number;
  plays?: number;
  is_public?: boolean;
  created_at: string;
  updated_at: string;
}

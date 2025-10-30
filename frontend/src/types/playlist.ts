export interface Playlist {
  id: string;
  name: string;
  description?: string;
  memberId: string;
  sermons: string[];
  plays: number;
  isPublic: boolean;
  createdAt: string;
}

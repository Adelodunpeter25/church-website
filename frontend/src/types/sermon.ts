export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description?: string;
  series?: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  plays: number;
  tags?: string[];
  createdAt: string;
}

export interface SermonSeries {
  id: string;
  name: string;
  description?: string;
  sermonCount: number;
}

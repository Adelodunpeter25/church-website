export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description?: string;
  series?: string;
  series_name?: string;
  audio_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  plays: number;
  tags?: string[];
  created_at: string;
}

export interface SermonSeries {
  id: string;
  name: string;
  description?: string;
  sermon_count: number;
}

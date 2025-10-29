export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'worship' | 'retreat' | 'service' | 'seminar' | 'conference' | 'other';
  capacity?: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  memberId: string;
  registeredAt: string;
  attended: boolean;
}

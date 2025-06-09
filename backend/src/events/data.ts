export interface Attendee {
  id: string;
  name: string;
  email?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  attendees: Attendee[];
}

export const events: Event[] = [];

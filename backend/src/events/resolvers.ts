import { events, Attendee, Event } from "./data";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    events: (): Event[] => events,
    event: (_: any, { id }: { id: string }): Event | undefined =>
      events.find((e) => e.id === id),
  },

  Mutation: {
    createEvent: (
      _: any,
      { title, date }: { title: string; date: string }
    ): Event => {
      const newEvent: Event = { id: uuidv4(), title, date, attendees: [] };
      events.push(newEvent);
      return newEvent;
    },

    addAttendee: (
      _: any,
      {
        eventId,
        name,
        email,
      }: { eventId: string; name: string; email?: string }
    ): Attendee => {
      const event = events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");
      const attendee: Attendee = { id: uuidv4(), name, email };
      event.attendees.push(attendee);
      return attendee;
    },

    removeAttendee: (
      _: any,
      { eventId, attendeeId }: { eventId: string; attendeeId: string }
    ): boolean => {
      const event = events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");
      const idx = event.attendees.findIndex((a) => a.id === attendeeId);
      if (idx === -1) throw new Error("Attendee not found");
      event.attendees.splice(idx, 1);
      return true;
    },
  },
};

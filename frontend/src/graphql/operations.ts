// frontend/src/graphql/operations.ts
import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      attendees {
        id
      }
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      date
      attendees {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $date: String!) {
    createEvent(title: $title, date: $date) {
      id
      title
      date
      attendees {
        id
      }
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation AddAttendee($eventId: ID!, $name: String!, $email: String) {
    addAttendee(eventId: $eventId, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation RemoveAttendee($eventId: ID!, $attendeeId: ID!) {
    removeAttendee(eventId: $eventId, attendeeId: $attendeeId)
  }
`;

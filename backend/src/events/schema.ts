import { gql } from "apollo-server";

export const typeDefs = gql`
  type Attendee {
    id: ID!
    name: String!
    email: String
  }

  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [Attendee!]!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(title: String!, date: String!): Event!
    addAttendee(eventId: ID!, name: String!, email: String): Attendee!
    removeAttendee(eventId: ID!, attendeeId: ID!): Boolean!
  }
`;

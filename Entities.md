# Entity Relationship Design

This document outlines the data model for the **Mini Event Manager** assignment, describing entities, their attributes, relationships, and relevant constraints.

## Entities

### User

- **id**: `string` (UUID) — Primary Key
- **name**: `string` — Full name of the user
- **email**: `string` — Unique email address, indexed
- **createdAt**: `DateTime` — Record creation timestamp
- **updatedAt**: `DateTime` — Record last update timestamp

### Event

- **id**: `string` (UUID) — Primary Key
- **title**: `string` — Title of the event
- **description**: `string` (optional) — Details about the event
- **date**: `DateTime` — Scheduled date/time, indexed
- **createdBy**: `string` (UUID) — FK to `User.id`, indexed
- **createdAt**: `DateTime` — Record creation timestamp
- **updatedAt**: `DateTime` — Record last update timestamp

### Attendee

- **id**: `string` (UUID) — Primary Key
- **name**: `string` — Attendee’s name (required)
- **email**: `string` (optional) — Attendee’s email address
- **createdAt**: `DateTime` — Record creation timestamp
- **updatedAt**: `DateTime` — Record last update timestamp

### Tag

- **id**: `string` (UUID) — Primary Key
- **name**: `string` — Unique tag label (e.g., "Internal", "Public"), indexed

## Join Entities (Many-to-Many)

### EventTag

- **eventId**: `string` (UUID) — FK to `Event.id`
- **tagId**: `string` (UUID) — FK to `Tag.id`
- **Primary Key**: Composite (`eventId`, `tagId`)
- **Indexes**: Composite index on (`eventId`, `tagId`)

### EventAttendee

- **id**: `string` (UUID) — Primary Key
- **eventId**: `string` (UUID) — FK to `Event.id`, indexed
- **attendeeId**: `string` (UUID) — FK to `Attendee.id`, indexed
- **rsvpStatus**: `enum<"CONFIRMED"|"DECLINED"|"TENTATIVE">` — Defaults to `"CONFIRMED"`
- **rsvpAt**: `DateTime` — Timestamp when RSVP status was set
- **createdAt**: `DateTime` — Record creation timestamp
- **updatedAt**: `DateTime` — Record last update timestamp
- **Indexes**:

  - Composite index on (`eventId`, `attendeeId`)
  - Index on (`attendeeId`)

## Constraints & Indexes

- **Unique** constraints: `User.email`, `Tag.name`
- **Indexes**: `Event.date`, `Event.createdBy`
- **Composite Indexes**: `EventTag(eventId, tagId)`, `EventAttendee(eventId, attendeeId)`

## Assumptions

1. Attendees are not registered system Users; they exist separately in `Attendee`.
2. Each `Event` is created and owned by a single `User` (via `createdBy`).
3. Events can have multiple Tags, and Tags can apply to multiple Events.
4. RSVP status is tracked per (Event, Attendee) in `EventAttendee`.
5. All timestamps use UTC ISO 8601 format.
6. UUIDs are used for all primary keys for scalability and global uniqueness.

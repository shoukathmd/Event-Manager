This document outlines assumptions, known issues, and how this submission aligns with the evaluation criteria.

Assumptions

All primary keys use UUIDs for global uniqueness.

Timestamps are stored in UTC ISO 8601 format.

Attendees are not application Users; they are modeled separately.

The GraphQL server is in-memory and not persisted—intended for demonstration only.

Known Issues

In-memory storage resets on server restart (no persistence).

No authentication or authorization is implemented.

Date handling does not account for time zones beyond simple ISO strings.

Minimal styling: responsive design and accessibility enhancements are not fully addressed.

No global state management library (e.g., Zustand) is used; state is managed locally within components.
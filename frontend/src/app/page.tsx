"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/operations";

export default function EventsPage() {
  const { data, loading, error } = useQuery(GET_EVENTS);
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="space-y-2">
      {data.events.map((e: any) => (
        <li key={e.id}>
          <Link
            href={`/events/${e.id}`}
            className="text-blue-600 hover:underline"
          >
            {e.title} — {e.date} ({e.attendees.length} attendees)
          </Link>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { GET_EVENT, ADD_ATTENDEE, REMOVE_ATTENDEE } from "@/graphql/operations";

interface AttendeeForm {
  name: string;
  email: string;
}

export default function EventDetailPage() {
  const { id } = useParams() as { id: string };

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
  });

  const [addAttendee, { loading: adding }] = useMutation(ADD_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id } }],
  });
  const [removeAttendee] = useMutation(REMOVE_ATTENDEE, {
    refetchQueries: [{ query: GET_EVENT, variables: { id } }],
  });

  if (loading) return <p>Loading event…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.event;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">Date: {event.date}</p>

      <section>
        <h2 className="text-2xl font-semibold">Attendees</h2>
        {event.attendees.length === 0 ? (
          <p>No attendees yet.</p>
        ) : (
          <ul className="space-y-2">
            {event.attendees.map((a: any) => (
              <li key={a.id} className="flex justify-between">
                <span>
                  {a.name} {a.email && `(${a.email})`}
                </span>
                <button
                  onClick={() =>
                    removeAttendee({
                      variables: { eventId: id, attendeeId: a.id },
                    })
                  }
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold">Add Attendee</h3>
        <Formik<AttendeeForm>
          initialValues={{ name: "", email: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address"),
          })}
          onSubmit={async (vals, { resetForm }) => {
            await addAttendee({ variables: { eventId: id, ...vals } });
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="block">Name</label>
                <Field
                  name="name"
                  placeholder="Attendee name"
                  className="w-full border px-2 py-1"
                />
                {errors.name && touched.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block">Email (optional)</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full border px-2 py-1"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={adding}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {adding ? "Adding…" : "Add Attendee"}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

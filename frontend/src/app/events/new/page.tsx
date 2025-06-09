"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { CREATE_EVENT, GET_EVENTS } from "@/graphql/operations";

interface Values {
  title: string;
  date: string;
}

export default function NewEventPage() {
  const router = useRouter();

  // 1️⃣ Set up mutation; after creation we refetch the events list
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

      <Formik<Values>
        initialValues={{ title: "", date: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          date: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          await createEvent({ variables: values });
          router.push("/events");
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block">Title</label>
              <Field
                name="title"
                placeholder="Event title"
                className="w-full border px-2 py-1"
              />
              {errors.title && touched.title && (
                <p className="text-red-600 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block">Date</label>
              <Field
                name="date"
                type="date"
                className="w-full border px-2 py-1"
              />
              {errors.date && touched.date && (
                <p className="text-red-600 text-sm">{errors.date}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Creating…" : "Create Event"}
            </button>

            {error && (
              <p className="text-red-600 mt-2">Error: {error.message}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useStore from "@/store/post"; // Import the Zustand store

export type Post = {
  title: string;
  description: string;
  status: string;
  assignee: string;
  id: number;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must be maximum 30 characters")
    .required("Title is required"),
  status: Yup.string()
    .oneOf(["To Do", "In Progress", "Done"], "Invalid status")
    .required("Status is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be maximum 200 characters")
    .required("Description is required"),
  assignee: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Assign person name must be maximum 30 characters")
    .required("Assign to is required"),
});

export default function NewPost() {
  const { posts, addPost } = useStore(); // Access posts and addPost action from Zustand store

  const initialValues = {
    title: "",
    status: "To Do",
    description: "",
    assignee: "",
    id: 0,
  };

  const handleSubmit = async (
    values: Post,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    const newPost = { ...values, id: posts.length + 1 }; // Generate new post with ID

    // Simulate async post
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addPost(newPost); // Add new post to the store

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // Smooth scrolling to the bottom
    });

    // Reset the form after submission
    resetForm();

    // Set submitting to false after resetting
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className="gap-5 grid md:w-1/2 md:p-0 p-5 mx-auto">
            <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="TSP Reports"
                  className="input input-bordered w-full max-w-xs"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <Field
                  as="select"
                  name="status"
                  className="select select-bordered"
                >
                  <option disabled value="">
                    Pick one
                  </option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Bio"
                  className="textarea textarea-bordered"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Assign to</span>
                </label>
                <Field
                  type="text"
                  name="assignee"
                  placeholder="Ahmet Saridag"
                  className="input input-bordered w-full max-w-xs"
                />
                <ErrorMessage
                  name="assignee"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn mx-auto w-48 btn-outline btn-info"
              disabled={!isValid || isSubmitting} // Disable if invalid or submitting
            >
              {isSubmitting ? "Submitting..." : "Create New Post"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { findUserByEmail } from "@/data/users"; // Assuming this path is correct

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    let user = findUserByEmail(values.email);

    // If user is not found in in-memory users, check localStorage
    if (!user) {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (email === values.email && password === values.password) {
        user = {
          id: Date.now(),
          email: values.email,
          password: values.password,
        }; // Simulate user creation
      }
    }

    if (user && user.password === values.password) {
      // Simulate token creation and store in localStorage
      localStorage.setItem("token", `fake-jwt-token-${Date.now()}`);
      router.push("/");
    } else {
      setError("Invalid email or password");
      setShowPopup(true); // Show popup on error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input input-bordered"
                    placeholder="user1@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="input input-bordered"
                    placeholder="***********"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>

                <div className="mt-4">
                  <p>
                    Don't have an account?{" "}
                    <a href="/register" className="link link-primary">
                      Register here
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Error Popup */}
      {showPopup && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error</h3>
            <p>{error}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

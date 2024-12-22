"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation Schema for registration
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    // Check if user already exists in localStorage
    const existingEmail = localStorage.getItem("email");

    if (existingEmail && existingEmail === values.email) {
      setError("An account with this email already exists. Please log in.");
      setShowPopup(true);
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after showing the error
      }, 2000);
      return;
    }

    // Fake backend registration
    const fakeToken = `fake-jwt-token-${Date.now()}`; // Create a fake token
    localStorage.setItem("token", fakeToken); // Save token to localStorage
    localStorage.setItem("email", values.email); // Save email for reference
    localStorage.setItem("password", values.password); // Save email for reference

    // Show success message and redirect after a short delay
    setError("Account created successfully! Redirecting...");
    setShowPopup(true); // Show success popup
    setTimeout(() => {
      router.push("/"); // Redirect to the homepage
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
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

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="input input-bordered"
                    placeholder="***********"
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                    Register
                  </button>
                </div>

                <div className="mt-4">
                  <p>
                    Already have an account?{" "}
                    <a href="/login" className="link link-primary">
                      Login here
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Success or Error Popup */}
      {showPopup && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Notice</h3>
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

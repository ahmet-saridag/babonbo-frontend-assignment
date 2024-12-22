"use client";

import NewPost from "@/components/new-post";
import PostList from "@/components/post-list";
import { HiMiniHeart } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true); // Show modal if no token exists
    }
  }, []);

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    router.push("/login"); // Redirect to login page
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    router.push("/login"); // Redirect to login page
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg text-gray-700 font-bold mb-4">
              Unauthorized Access
            </h2>
            <p className="text-gray-700 mb-6">
              You must be logged in to access this page.
            </p>
            <button
              className="btn btn-primary w-full"
              onClick={handleModalClose}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto pt-10">
        <div className="flex justify-center items-center mb-5 gap-10">
          <h1 className="text-3xl font-bold">
            Babonbo Frontend Interview Assignment
          </h1>
          <button onClick={handleLogout} className="btn btn-error btn-outline">
            Logout
          </button>
        </div>
        <div className="flex justify-center items-center md:mb-20 mb-5 gap-2">
          <h6 className="text-xl font-bold text-center">
            Made it by{" "}
            <a
              href="https://www.linkedin.com/in/ahmet-saridag/"
              target="_blank"
              className="hover:text-red-600 underline"
            >
              Ahmet Saridag
            </a>{" "}
            with
          </h6>
          <HiMiniHeart style={{ color: "red" }} />
        </div>
        <NewPost />
        <PostList />
      </div>
    </>
  );
}

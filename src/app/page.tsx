"use client";

import NewPost from "@/components/new-post";
import PostList from "@/components/post-list";
import { HiMiniHeart } from "react-icons/hi2";

export default function Home() {
  return (
    <>
      <div className="container mx-auto pt-10">
        <h1 className="text-3xl font-bold text-center">
          Babonbo Frontend Interview Assignment
        </h1>
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

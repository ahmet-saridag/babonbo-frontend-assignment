"use client";
import React, { useState } from "react";
import { Post } from "@/components/new-post";
import useStore from "@/store/post";
import { GoTrash } from "react-icons/go";

export default function PostList() {
  const { posts, removePost, updatePostStatus } = useStore();

  const postsByStatus: Record<Post["status"], Post[]> = {
    Done: posts.filter((post) => post.status === "Done"),
    "In Progress": posts.filter((post) => post.status === "In Progress"),
    "To Do": posts.filter((post) => post.status === "To Do"),
  };

  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);

  const handleMouseEnter = (postId: number) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    postId: number
  ) => {
    event.dataTransfer.setData("postId", String(postId));
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableCellElement>,
    status: Post["status"]
  ) => {
    const postId = event.dataTransfer.getData("postId");
    if (postId) {
      updatePostStatus(Number(postId), status);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
  };

  return (
    <div className="md:mt-20 mt-10 md:mb-28 mb-10 bg-gray-900 text-white p-4 rounded-xl">
      <div className="overflow-x-auto">
        <table className="table w-full table-auto lg:table-fixed">
          <thead>
            <tr>
              <th className="text-center p-2">Done</th>
              <th className="text-center p-2">In Progress</th>
              <th className="text-center p-2">To Do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(postsByStatus).map((status) => (
                <td
                  className="align-top text-left p-2"
                  key={status}
                  onDrop={(event) =>
                    handleDrop(event, status as Post["status"])
                  }
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col gap-y-4">
                    {postsByStatus[status as Post["status"]].map(
                      (post) =>
                        post.description &&
                        post.title &&
                        post.status && (
                          <div
                            className="card w-80 bg-base-100 md:w-full relative cursor-pointer"
                            key={post.id}
                            draggable
                            onDragStart={(event) =>
                              handleDragStart(event, post.id)
                            }
                            onMouseEnter={() => handleMouseEnter(post.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {/* Trash Icon */}
                            {hoveredPostId === post.id && (
                              <button
                                className="absolute top-2 right-2 text-red-500 opacity-100"
                                style={{
                                  background: "transparent",
                                  border: "none",
                                }}
                                onClick={() => removePost(post.id)}
                              >
                                <GoTrash fontSize={"20px"} />
                              </button>
                            )}

                            <div className="card-body p-4">
                              <h2 className="card-title text-lg">
                                {post.title}
                              </h2>
                              <p>{post.description}</p>
                              {post.assignee && (
                                <p className="text-gray-500 text-right">
                                  Assign to: {post.assignee}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

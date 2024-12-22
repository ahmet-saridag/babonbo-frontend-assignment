"use client";
import React, { useState } from "react";
import { Post } from "@/components/new-post";
import useStore from "@/store/post";
import { GoTrash } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import EditModal from "@/components/edit-modal";

// Type Definitions
type SortBy = "title" | "status";
type FilterStatus = "All" | "Done" | "In Progress" | "To Do";

export default function PostList() {
  const { posts, removePost, updatePost } = useStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All");
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const postsPerPage: number = 5;

  const filteredPosts = posts
    .filter((post) => {
      if (filterStatus === "All") return true;
      return post.status === filterStatus;
    })
    .filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(e.target.value as FilterStatus);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSaveEdit = (updatedPost: Post) => {
    updatePost(updatedPost); // Title, description and status update
  };

  return (
    <div className="md:mt-20 mt-10 md:mb-28 mb-10 bg-gray-900 text-white p-4 rounded-xl">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="form-control w-full lg:w-1/3">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="grow"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <BiSearch />
          </label>
        </div>

        <div className="form-control w-full lg:w-1/3">
          <select
            className="select select-bordered"
            value={filterStatus}
            onChange={handleStatusFilterChange}
          >
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="To Do">To Do</option>
          </select>
        </div>

        <div className="form-control w-full lg:w-1/4">
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-auto lg:table-fixed">
          <thead>
            <tr>
              <th className="text-center p-2">Title</th>
              <th className="text-center p-2">Description</th>
              <th className="text-center p-2">Status</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td className="text-center">{post.status}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => removePost(post.id)}
                  >
                    <GoTrash />
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {editingPost && (
        <EditModal
          post={editingPost}
          onSave={handleSaveEdit}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
}

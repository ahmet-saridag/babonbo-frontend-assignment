import { create } from "zustand";
import { initialData } from "@/data/inital-data"; // Import initial data
import { Post } from "@/components/new-post";

interface StoreState {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (postId: number) => void;
  updatePostStatus: (postId: number, newStatus: Post["status"]) => void;
  updatePost: (updatedPost: Post) => void; // Update post by ID
  setPosts: (posts: Post[]) => void; // function to update posts
}

const useStore = create<StoreState>((set) => ({
  posts: initialData,

  // Add new post
  addPost: (post: Post) =>
    set((state) => ({
      posts: [...state.posts, post],
    })),

  // Remove post by ID
  removePost: (postId: number) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),

  // Update post status when it's dragged to another column
  updatePostStatus: (postId: number, newStatus: Post["status"]) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post
      ),
    })),

  setPosts: (posts) => set({ posts }), // function to update posts

  updatePost: (updatedPost: Post) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      ),
    }));
  },
}));

export default useStore;

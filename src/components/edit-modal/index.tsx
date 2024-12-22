import React, { useState } from "react";
import { Post } from "@/components/new-post";

type EditModalProps = {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ post, onSave, onClose }) => {
  const [title, setTitle] = useState<string>(post.title);
  const [description, setDescription] = useState<string>(post.description);
  const [status, setStatus] = useState<Post["status"]>(post.status);

  const handleSave = () => {
    onSave({ ...post, title, description, status });
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Post</h3>
        <div className="form-control mt-4">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered"
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Post["status"])}
            className="select select-bordered"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

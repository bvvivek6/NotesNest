import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({ notedata, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);

  const editNote = async () => {
    // You can implement edit logic here later
  };

  const addNewEdit = async () => {
    await addNote();
  };

  const handleAddNote = () => {
    if (!title || !content) {
      setError("Please enter both title and content!");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewEdit();
    }
    setTitle("");
    setContent("");
    setTags("");
  };

  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/addnotes", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.notes) {
        await getAllNotes(); // Wait for it to complete
        onClose(); // Then close modal
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add note. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen pt-10 flex justify-center items-center">
      <div className="bg-[#1c1c1c10] backdrop-blur-md p-6 rounded-xl w-full">
        <div className="mb-4 text-white">
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            className="w-full p-3 mt-2 bg-transparent border-b-2 border-gray-500 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4 text-white">
          <label className="block text-lg font-medium">Content</label>
          <textarea
            className="w-full p-3 mt-2 bg-transparent border-b-2 border-gray-500 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add note..."
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-4 text-white">
          <label className="block text-lg font-medium">Tags</label>
          <input
            type="text"
            className="w-full p-3 mt-2 bg-transparent border-b-2 border-gray-500 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={handleAddNote}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;

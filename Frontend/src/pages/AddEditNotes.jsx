import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({
  notedata,
  type,
  getAllNotes,
  onClose,
  onSaveSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);

  const editNote = async () => {
    const tagArray = tags
      .split(",") // Split by comma
      .map((tag) => tag.trim()) // Trim whitespace
      .filter((tag) => tag);
    const noteId = notedata._id;
    try {
      const response = await axiosInstance.put(`/api/v1/editnotes/${noteId}`, {
        title,
        content,
        tags: tagArray,
      });

      if (response.data && response.data.notes) {
        if (onSaveSuccess) {
          onSaveSuccess();
        } else {
          await getAllNotes();
          onClose();
        }
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to receive note. Try again later.");
      }
    }
  };

  const addNote = async () => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim()) // Trim whitespace
      .filter((tag) => tag);
    try {
      const response = await axiosInstance.post("/api/v1/addnotes", {
        title,
        content,
        tags: tagArray,
      });

      if (response.data && response.data.notes) {
        if (onSaveSuccess) {
          onSaveSuccess();
        } else {
          await getAllNotes();
          onClose();
        }
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add note. Try again later.");
      }
    }
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
      addNote();
    }
    setTitle("");
    setContent("");
    setTags("");
  };

  useEffect(() => {
    if (type === "edit" && notedata) {
      setTitle(notedata.title || "");
      setContent(notedata.content || "");
      setTags(notedata.tags || "");
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [type, notedata]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 font-mono">
      <div className="w-full max-w-3xl bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 space-y-6 text-white ">
        <h2 className="text-2xl font-bold text-center">
          {type === "edit" ? "Edit Note" : "Add New Note"}
        </h2>

        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Content</label>
          <textarea
            rows="6"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Tags</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNote}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-white rounded-lg transition"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;

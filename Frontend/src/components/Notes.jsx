import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Notes = ({
  title,
  date,
  content,
  tags,
  pinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="bg-[#161616] max-w-[400px]  text-white p-4 rounded-lg shadow-md font-mono tracking-tighter transition-all hover:shadow-lg ">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-[12px] text-gray-400">{date}</div>
      </div>

      <p
        className="text-sm text-[#616161] mb-4 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
        }}
      >
        {content}
      </p>

      {tags && (
        <div className="flex gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-2 py-1 font-semibold font-sans rounded-full text-xs"
            >
              # {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-row-reverse p-1.5 gap-2.5 items-center">
        <button
          onClick={onPinNote}
          className={`text-xl ${
            pinned ? "text-yellow-400" : "text-gray-500"
          } hover:text-yellow-400`}
        ></button>

        <button
          onClick={onEdit}
          className="text-xl text-blue-400 hover:text-blue-500"
        >
          <FiEdit />
        </button>

        <button
          onClick={onDelete}
          className="text-xl text-red-400 hover:text-red-500"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default Notes;

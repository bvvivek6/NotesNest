import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import { FiPlus } from "react-icons/fi";
import AddEditNotes from "./AddEditNotes";
import { motion } from "framer-motion";
import Modal from "react-modal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div className="min-h-screen bg-[#0E0E0E] pt-20 relative">
      <Navbar />

      <motion.div
        className="flex flex-wrap gap-3 md:max-w-screen-lg mx-auto px-4 text-white py-4"
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Notes
          title="Sample Note Title"
          date="April 19, 2025"
          content="This is a sample note content. It contains details about a certain topic that needs to be remembered."
          tags={["important", "work"]}
          pinned={false}
          onEdit={() => alert("Edit note")}
          onDelete={() => alert("Delete note")}
          onPinNote={() => alert("Pin/Unpin note")}
        />
        <Notes
          title="Sample Note Title"
          date="April 19, 2025"
          content="This is a sample note content. It contains details about a certain topic that needs to be remembered."
          tags={["important", "work"]}
          pinned={false}
          onEdit={() => alert("Edit note")}
          onDelete={() => alert("Delete note")}
          onPinNote={() => alert("Pin/Unpin note")}
        />
      </motion.div>

      {/* Create New Note Button */}
      <button
        onClick={() => {
          setIsModalOpen({ isShown: true, type: "add", data: null });
        }}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FiPlus className="text-2xl" />
      </button>

      <Modal
        isOpen={isModalOpen.isShown}
        onRequestClose={() => setIsModalOpen({ isShown: false })}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            inset: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
          },
        }}
        contentLabel="Add Note Modal"
        className="w-[40%]"
      >
        <AddEditNotes
          type={setIsModalOpen.type}
          notedata={setIsModalOpen.data}
          onClose={() =>
            setIsModalOpen({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
      {/* {isModalOpen && (
        <div className="fixed inset-0 w-fullflex justify-center items-center z-50">
          <AddEditNotes />
          <button
            onClick={toggleModal}
            className="absolute right-0 top bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
          >
            X
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;

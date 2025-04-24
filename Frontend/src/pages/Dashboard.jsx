import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import { FiPlus } from "react-icons/fi";
import AddEditNotes from "./AddEditNotes";
import moment from "moment";
import { motion } from "framer-motion";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const closeModal = () => {
    setIsModalOpen({ isShown: false, type: "add", data: null });
    getAllNotes();
  };

  const handleNoteSaved = () => {
    setIsModalOpen({ isShown: false, type: "add", data: null });
    getAllNotes();
  };

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  //get user
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance("/api/v1/get-user");
      console.log("User response:", response.data);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };
  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/getAll");

      if (response && response.data.notes) {
        console.log("Full response:", response.data);
        setAllNotes(response.data.notes);
      }
    } catch (err) {
      console.log(`An unexpected error happened ${err}`);
    }
  };
  //delete note
  const handleDelete = async (noteId) => {
    try {
      await axiosInstance.delete(`/api/v1/deletenote/${noteId}`);
      setAllNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteId)
      );
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  useEffect(() => {
    console.log("All Notes Updated:", allNotes);
  }, [allNotes]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] pt-20 relative">
      <Navbar userInfo={userInfo} />

      <motion.div
        className="flex flex-wrap gap-3 md:max-w-screen-lg mx-auto px-4 text-white py-4"
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {allNotes.map((item, index) => (
          <Notes
            key={item._id || index}
            title={item.title}
            date={moment(item.date).format("Do MMM YYYY")}
            content={item.content}
            tags={item.tags}
            pinned={item.isPinned}
            onEdit={() =>
              setIsModalOpen({
                isShown: true,
                type: "edit",
                data: item,
              })
            }
            onDelete={() => handleDelete(item._id)}
            onPinNote={() => alert("Pin/Unpin note")}
          />
        ))}
      </motion.div>

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
        onRequestClose={closeModal}
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
      >
        <div className="w-[90vw] md:w-[40vw]">
          <AddEditNotes
            type={isModalOpen.type}
            notedata={isModalOpen.data}
            onClose={closeModal}
            onSaveSuccess={handleNoteSaved}
            getAllNotes={getAllNotes}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;

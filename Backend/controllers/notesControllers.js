const Notes = require("../models/notesModel");

const addnotes = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title || !content) {
    return res.status(401).json({
      error: true,
      message: "Title and content are required",
    });
  }

  try {
    const note = new Notes({
      title,
      content,
      tags: tags || [],
      userId: user.id,
    });

    await note.save();

    return res.status(200).json({
      error: false,
      message: "Note added successfully!",
      note,
    });
  } catch (err) {
    console.error("Error adding note:", err);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

const editnote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ message: "No changes provided" });
  }

  try {
    const note = await Notes.findOne({
      _id: noteId,
      userId: user._id.toString(),
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "No note found" });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (typeof isPinned === "boolean") {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      message: "Note updated Successfully!",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAll = async (req, res) => {
  const user = req.user;
  try {
    const notes = await Notes.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      message: "All notes recieved successfully!",
      notes,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

const deletenote = async (req, res) => {
  const noteId = req.params.id;
  const user = req.user;

  try {
    const note = await Notes.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    await Notes.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

const pinnote = async (req, res) => {
  const noteId = req.params.id;
  const { isPinned } = req.body;
  const user = req.user;

  try {
    const note = await Notes.findOne({
      _id: noteId,
      userId: user._id.toString(),
    });

    if (!note) {
      return res.status(404).json({ error: true, message: "No note found" });
    }

    if (typeof isPinned === "boolean") {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note pinned Successfully!",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  addnotes,
  editnote,
  getAll,
  deletenote,
  pinnote,
};

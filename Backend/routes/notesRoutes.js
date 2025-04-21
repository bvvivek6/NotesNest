const routes = require("express").Router();
const { authenticateToken } = require("../utils");
const {
  addnotes,
  editnote,
  getAll,
  deletenote,
  pinnote,
} = require("../controllers/notesControllers");

// ✅ Protected route with middleware
routes.get("/getAll", authenticateToken, getAll);
routes.post("/addnotes", authenticateToken, addnotes);
routes.put("/editnotes/:id", authenticateToken, editnote);
routes.delete("/deleteNote/:id", authenticateToken, deletenote);
routes.put("/pin/:id", authenticateToken, pinnote);

module.exports = routes;

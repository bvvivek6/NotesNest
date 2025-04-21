const routes = require("express").Router();
const { authenticateToken } = require("../utils");
const { addnotes, editnote } = require("../controllers/notesControllers");

// ✅ Protected route with middleware
routes.post("/addnotes", authenticateToken, addnotes);
routes.put("/editnotes/:id", authenticateToken, editnote);

module.exports = routes;

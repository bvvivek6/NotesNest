const routes = require("express").Router();
const { authenticateToken } = require("../utils");

const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");

routes.post("/create-acc", createUser);
routes.post("/login", loginUser);
routes.get("/get-user", authenticateToken, getUser);

module.exports = routes;

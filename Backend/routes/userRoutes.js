const routes = require("express").Router();
const { createUser, loginUser } = require("../controllers/userControllers");

routes.post("/create-acc", createUser);
routes.post("/login", loginUser);

module.exports = routes;

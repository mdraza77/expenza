const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", authController.registerController);

module.exports = authRouter;

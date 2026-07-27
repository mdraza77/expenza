const express = require("express");
const groupController = require("../controllers/group.controller");
const identifyUser = require("../middlewares/auth.middleware");

const groupRouter = express.Router();

groupRouter.post("/", identifyUser, groupController.createGroupController);
groupRouter.get("/", identifyUser, groupController.getAllGroupsController);
groupRouter.get("/:id", identifyUser, groupController.getSingleGroupController);
groupRouter.put("/:id", identifyUser, groupController.updateGroupController);
groupRouter.delete("/:id", identifyUser, groupController.deleteGroupController);

module.exports = groupRouter;

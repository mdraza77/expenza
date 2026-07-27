const express = require("express");
const groupController = require("../controllers/group.controller");
const identifyUser = require("../middlewares/auth.middleware");

const groupRouter = express.Router();

// Create Group
groupRouter.post("/", identifyUser, groupController.createGroupController);
// Get All Group
groupRouter.get("/", identifyUser, groupController.getAllGroupsController);
// Get Single Group
groupRouter.get("/:id", identifyUser, groupController.getSingleGroupController);
// Update Group
groupRouter.put("/:id", identifyUser, groupController.updateGroupController);
// Delete Group
groupRouter.delete("/:id", identifyUser, groupController.deleteGroupController);

// Add Group Member
groupRouter.post(
  "/:id/members",
  identifyUser,
  groupController.addGroupMemberController,
);

// Get Group Members
groupRouter.get(
  "/:id/members",
  identifyUser,
  groupController.getGroupMembersController,
);

// Remove Group Members
groupRouter.delete(
  "/:id/members/:userId",
  identifyUser,
  groupController.removeGroupMemberController,
);

module.exports = groupRouter;

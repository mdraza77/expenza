const groupModel = require("../models/group.model");

const createGroupController = async (req, res) => {
  console.log(req.user);
  try {
    const { name, description, icon } = req.body;

    const group = await groupModel.create({
      name,
      description,
      icon,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllGroupsController = async (req, res) => {
  try {
    const groups = await groupModel
      .find({ members: req.user.id })
      .populate("members", "name username, email, profilePicture");

    res.status(200).json({
      message: "Groups fetched successfully",
      groups,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching groups",
      error: error.message,
    });
  }
};

const getSingleGroupController = async (req, res) => {
  try {
    const group = await groupModel
      .findById(req.params.id)
      .populate("members", "name username email profilePicture");

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const isMember = group.members.some(
      (member) => member._id.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this group",
      });
    }

    return res.status(200).json({
      message: "Group fetched successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching group",
      error: error.message,
    });
  }
};

const updateGroupController = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const group = await groupModel.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const isGroupCreator = group.createdBy.toString() === req.user.id;

    if (!isGroupCreator) {
      return res.status(403).json({
        message: "You are not allowed to update this group",
      });
    }

    group.name = name || group.name;
    group.description = description || group.description;
    group.icon = icon || group.icon;

    await group.save();

    return res.status(200).json({
      message: "Group updated successfully",
      group,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid group id",
      });
    }

    return res.status(500).json({
      message: "Error while updating group",
      error: error.message,
    });
  }
};

const deleteGroupController = async (req, res) => {
  try {
    const group = await groupModel.findById(req.params.id);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const isGroupCreator = group.createdBy.toString() === req.user.id;

    if (!isGroupCreator) {
      return res.status(403).json({
        message: "You are not allowed to delete this group",
      });
    }

    await group.deleteOne();

    res.status(200).json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid group id",
      });
    }

    return res.status(500).json({
      message: "Error while deleting group",
      error: error.message,
    });
  }
};

module.exports = {
  createGroupController,
  getAllGroupsController,
  getSingleGroupController,
  updateGroupController,
  deleteGroupController,
};

const express = require("express");
const Router = express.Router();

const {
  invitation,
  getInvitationHistory,
} = require("../controllers/hrInvitationController");

Router.post("/invitation", invitation);
Router.get("/invitationHistory", getInvitationHistory);

module.exports = Router;

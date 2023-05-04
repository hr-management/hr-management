const express = require("express");
const Router = express.Router();
const authorization = require("../middlewares/authorization");
const {
  invitation,
  getInvitationHistory,
  getInfoForNewApplicaiton,
} = require("../controllers/hrInvitationController");

Router.post("/invitation", invitation);
Router.get("/invitationHistory", getInvitationHistory);
Router.get("/newApplicationInfo", authorization, getInfoForNewApplicaiton);

module.exports = Router;

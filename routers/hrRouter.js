const express = require("express");
const Router = express.Router();

const { invitation } = require("../controllers/hrInvitationController");

Router.post("/invitation", invitation);

module.exports = Router;

const express = require("express");
const Router = express.Router();

const { invitation } = require("../controllers/hrController");

Router.post("/invitation", invitation);

module.exports = Router;

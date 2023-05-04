const express = require("express");
const Router = express.Router();
const authorization = require("../middlewares/authorization");
const {
  invitation,
  getInvitationHistory,
  getInfoForNewApplicaiton,
} = require("../controllers/hrInvitationController");
const { getAllEmployees,getEmployeeById } = require("../controllers/hrManagementController")
const { checkEmail } = require("../middlewares/validator")

Router.post("/invitation",checkEmail, invitation);
Router.get("/invitationHistory", getInvitationHistory);
Router.get("/newApplicationInfo", authorization, getInfoForNewApplicaiton);

// get all employees
Router.get('/',getAllEmployees)
// get one emplyee by ID
Router.get('/:id', getEmployeeById)
// get application by status: pending | rejected | approved
Router.get("/applications/:status", (req, res) => {
    res.send("")
})
// get visaEmplyees, if not status, return all visa-employees, if status === inprogress, return inprogress F1 employees
Router.get("/visaEmployees/:status", (req, res) => {
    res.send("")
})
module.exports = Router;

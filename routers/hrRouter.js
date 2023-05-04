const express = require("express");
const Router = express.Router();
const authorization = require("../middlewares/authorization");
const {
  invitation,
  getInvitationHistory,
  getInfoForNewApplicaiton,
} = require("../controllers/hrInvitationController");
const { getAllEmployees,
  getEmployeeById,
  getApplicationsByStatus,
  getVisaEmployees,
  updateApplicationStatus,
  updateApplicationRejectedFeedback,
updateVisaAuthStatus
} = require("../controllers/hrManagementController")
const { checkEmail } = require("../middlewares/validator")
const   findEmployeeById = require("../middlewares/findEmployeeById")

Router.post("/invitation",checkEmail, invitation);
Router.get("/invitationHistory", getInvitationHistory);
Router.get("/newApplicationInfo", authorization, getInfoForNewApplicaiton);

// get all employees
Router.get('/',getAllEmployees)
// get one emplyee by ID
Router.get('/:id', findEmployeeById,getEmployeeById)
// get application by status: pending | rejected | approved
Router.get("/applications/:status", getApplicationsByStatus)
// get visaEmplyees, if status===all, return all visa-employees, 
// if status === inprogress, return inprogress F1 employees
Router.get("/visaEmployees/:status", getVisaEmployees)

Router.put("/:id/applicationStatus", findEmployeeById,updateApplicationStatus)
Router.put("/:id/application/feedback", findEmployeeById,updateApplicationRejectedFeedback)
Router.put("/visaEmployees/workAuthStatus",updateVisaAuthStatus)
module.exports = Router;

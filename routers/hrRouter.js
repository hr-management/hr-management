const express = require("express");
const Router = express.Router();
const authorization = require("../middlewares/authorization");
const {
  invitation,
  getInvitationHistory,
  getInfoForNewApplicaiton,
} = require("../controllers/hrInvitationController");
const {
  getAllEmployees,
  getEmployeeById,
  getApplicationsByStatus,
  getVisaEmployees,
  updateApplicationStatus,
  updateVisaAuthStatus,
} = require("../controllers/hrManagementController");
const { checkEmail, HROnly } = require("../middlewares/validator");
const findEmployeeById = require("../middlewares/findEmployeeById");

Router.post("/invitation", checkEmail, authorization, HROnly, invitation);
Router.get("/invitationHistory", authorization, HROnly, getInvitationHistory);
Router.get("/newApplicationInfo", authorization, getInfoForNewApplicaiton);

// get all employees
Router.get("/", getAllEmployees);
// get one emplyee by ID
Router.get("/:id", findEmployeeById, getEmployeeById);
// get application by status: pending | rejected | approved
Router.get("/applications/:status", getApplicationsByStatus);
// get visaEmplyees, if status===all, return all visa-employees,
// if status === inprogress, return inprogress F1 employees
Router.get("/visaEmployees/:status", getVisaEmployees);

Router.put("/:id/applicationStatus", findEmployeeById, updateApplicationStatus);

Router.put(
  "/visaEmployees/workAuthStatus",
  findEmployeeById,
  updateVisaAuthStatus
);
module.exports = Router;

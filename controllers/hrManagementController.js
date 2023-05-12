const userModel = require("../models/User");

exports.getAllEmployees = async (req, res) => {
  const search = req.query.search;
  try {
    const employees = await userModel
      .find({
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { preferredName: { $regex: search, $options: "i" } },
        ],
      })
      .sort({ lastName: 1 });
    return res
      .status(200)
      .json({ success: true, length: employees.length, employees });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong.", err });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    return res.status(200).json({ success: true, employee: req.employee });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong.", err });
  }
};

// get application by status: pending | rejected | approved
exports.getApplicationsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!["pending", "rejected", "approved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invaild status, only pending, rejected or approved.",
      });
    }
    let applications;
    if (status === "pending") {
      applications = await userModel.find({ applicationStatus: "pending" });
    } else if (status === "rejected") {
      applications = await userModel.find({ applicationStatus: "rejected" });
    } else {
      applications = await userModel.find({ applicationStatus: "approved" });
    }
    return res.status(200).json({
      success: true,
      applicationType: status,
      length: applications.length,
      applications,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong.", err });
  }
};

// get visaEmplyees, if status===all, return all visa-employees,
// if status === inprogress, return inprogress F1 employees
exports.getVisaEmployees = async (req, res) => {
  try {
    const { status } = req.params;
    let visaEmployees, employeeType;
    if (!["all", "inprogress"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invaild status, only all or inprogress.",
      });
    }
    if (status === "all") {
      visaEmployees = await userModel.find({ requireWorkAuthorization: true });
      employeeType = "All visa employees";
    } else {
      //visa===F1(CPT/OPT) && applicationStatus===pending
      visaEmployees = await userModel.find({
        "visa.type": "F1(CPT/OPT)",
        OPTCompleted: false,
      });
      employeeType = "Inprogress visa employees";
    }
    return res.status(200).json({
      success: true,
      employeeType,
      length: visaEmployees.length,
      visaEmployees,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong.", err });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const status = req.body.status;
    let feedback = req.body.feedback;

    if (!["reject", "approve"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invaild status, only reject or approve.",
      });
    }
    const employee = req.employee; // from findEmplyeeById middleware
    if (employee.applicationStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "You can't update this application status.",
      });
    }

    if (status === "approve") {
      await userModel.updateOne(
        { _id: employee._id },
        { applicationStatus: "approved" }
      );
      return res
        .status(200)
        .json({ success: true, applicationStatus: "approved" });
    } else {
      if (!feedback) {
        feedback = "";
      }
      await userModel.updateOne(
        { _id: employee._id },
        { applicationStatus: "rejected", applicationRejectedFeedback: feedback }
      );
      return res
        .status(200)
        .json({ success: true, applicationStatus: "rejected", feedback });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong.", err });
  }
};

exports.updateVisaAuthStatus = async (req, res) => {
  try {
    const { status, feedback } = req.body;
    if (!["reject", "approve"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invaild status, only reject or approve.",
      });
    }
    const employee = req.employee; // from findEmplyeeById middleware
    if (employee.visa.type === "F1(CPT/OPT)") {
      const workAuthDocs = employee.workAuthDoc;
      const docTypes = ["OPT_Receipt", "OPT_EAD", "I-983", "I-20"];
      let curStep = workAuthDocs.length - 1;
      if (workAuthDocs[curStep].status !== "submitted") {
        return res.status(400).json({
          success: false,
          message: "You can't update this visa auth status.",
        });
      }
      let OPTCompleted = false;
      if (status === "approve") {
        workAuthDocs[curStep].status = "approved";

        if (curStep < 3) {
          workAuthDocs.push({
            type: docTypes[curStep + 1],
            status: "notSubmitted",
          });
        } else {
          OPTCompleted = true;
        }
        await userModel.updateOne(
          { _id: employee._id },
          { workAuthDoc: workAuthDocs, OPTCompleted }
        );
        return res.status(200).json({
          success: true,
          nextStep: docTypes[curStep + 1]
            ? docTypes[curStep + 1]
            : "Approved all documentations.",
          workAuthDoc: workAuthDocs,
          OPTCompleted,
        });
      } else {
        workAuthDocs[curStep].status = "rejected";
        if (!feedback) {
          feedback = "";
        }
        workAuthDocs[curStep].feedback = feedback;
        await userModel.updateOne(
          { _id: employee._id },
          { workAuthDoc: workAuthDocs }
        );
        return res.status(200).json({
          success: true,
          rejected: docTypes[curStep],
          workAuthDoc: workAuthDocs,
          OPTCompleted,
          feedback,
        });
      }
    }
    return res
      .status(400)
      .json({ success: false, message: "This is not a F1(CPT/OPT) employee." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", err });
  }
};

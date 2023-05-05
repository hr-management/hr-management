const userModel = require('../models/User');
const mongoose = require("mongoose")
const objectId = require("mongoose").ObjectId;
const { upload } = require("../utils/s3Handler");

exports.getAllEmployees = async (req, res) => {
    const employees = await userModel.find({ role: "employee" })
    return res.status(200).json({success: true, length:employees.length,employees})
}

exports.getEmployeeById = async (req, res) => {
    const id =new mongoose.Types.ObjectId(req.params.id) 
    // console.log(typeof id)
    console.log(id)
     console.log(mongoose.Types.ObjectId.isValid(id))
    const employee = await userModel.findOne({ firstName: "John" })
    console.log(employee._id)
    console.log(req.params.id)
    console.log(employee._id === req.params.id)
    const employee1 = await userModel.findById(employee._id)
   return  res.status(200).json({success: true, employee1})
} 

// get application by status: pending | rejected | approved
exports.getApplicationsByStatus = async (req, res) => {
    const {status} = req.params
    if (!["pending","rejected","approved"].includes(status)) {
        return res.status(400).json({success: false, message:"Invaild status, only pending, rejected or approved."})
    }
    let applications
    if (status === "pending") {
        applications = await userModel.find({applicationStatus:"pending"}) 
    } else if (status === "rejected") {
        applications = await userModel.find({applicationStatus:"rejected"})
    } else {
        applications = await userModel.find({applicationStatus:"approved"})
    }
     return res.status(200).json({success: true, applicationType:status,length:applications.length,applications})
}

// get visaEmplyees, if status===all, return all visa-employees, 
// if status === inprogress, return inprogress F1 employees
exports.getVisaEmployees = async (req, res) => {
    const { status } = req.params
    let visaEmplyees, employeeType;
    if (!["all","inprogress"].includes(status)) {
        return res.status(400).json({success: false, message:"Invaild status, only all or inprogress."})
    }
    if (status==="all") {
        visaEmplyees = await userModel.find({ requireWorkAuthorization: true })
        employeeType="All visa employees"
    } else {
        //requireWorkAuthorization && visa===F1(CPT/OPT) && applicationStatus===pending
        visaEmplyees = await userModel.find({ requireWorkAuthorization: true, visa: { type: "F1(CPT/OPT)" }, applicationStatus: "pending" })
        employeeType="Inprogress visa employees" 
    }
     return res.status(200).json({success: true, employeeType, length:visaEmplyees.length,visaEmplyees})
}  
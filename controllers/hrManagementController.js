const userModel = require('../models/User');
const mongoose = require("mongoose")
const objectId = require("mongoose").ObjectId;
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
     return res.status(200).json({success: true, applicationType:"status",length:applications.length,applications})
}
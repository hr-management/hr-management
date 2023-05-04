const userModel = require('../models/User');
const mongoose = require("mongoose");

exports.getAllEmployees = async (req, res) => {
    const employees = await userModel.find({ role: "employee" })
    res.status(200).json({success: true, length:employees.length,employees})
}

exports.getEmployeeById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(mongoose.Types.ObjectId.isValid(id))
    const employee = await userModel.findById(id)
    res.status(200).json({success: true, employee})
}
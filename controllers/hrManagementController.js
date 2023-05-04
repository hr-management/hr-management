const userModel = require('../models/User');

exports.getAllEmployees = async (req, res) => {
    const employees = await userModel.find({ role: "employee" })
    res.status(200).json({success: true, length:employees.length,employees})
}
const userModel = require('../models/User');

exports.getAllEmployees = async (req, res) => {
    const employees = await userModel.find({ role: "HR" })
    res.status(200).json({success: true, employees})
}
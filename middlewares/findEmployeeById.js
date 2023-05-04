const userModel = require('../models/User');
const mongoose = require("mongoose")

module.exports = async (req, res, next) => {
    let id = req.params.id? req.params.id : req.body.employeeId
    if (!id) {
         return res.status(400).json({success:false, message:"Please provide employeeId"})
    }
    id =new mongoose.Types.ObjectId(req.params.id) 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success:false, message:"Invalid Id."})
    }
    const employee = await userModel.findById(id)
    if (employee===null) {
        return res.status(404).json({ success: false, message:"This employee is not exist."})
    }
    req.employee = employee
    next()
}
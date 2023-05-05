const userModel = require('../models/User');
const mongoose = require("mongoose")
const { ObjectId } = require('mongodb');
module.exports = async (req, res, next) => {
    try {
        let id = req.params.id? req.params.id : req.body.employeeId
        if (!id) {
            return res.status(400).json({success:false, message:"Please provide employeeId"})
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({success:false, message:"Invalid Id."})
        }
        id = new ObjectId(id) 
        const employee = await userModel.findById(id)
        if (employee===null) {
            return res.status(404).json({ success: false, message:"This employee is not exist."})
        }
        req.employee = employee
        next()
    } catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
    
}
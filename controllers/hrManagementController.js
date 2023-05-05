const userModel = require('../models/User');

exports.getAllEmployees = async (req, res) => {
    try{
        const employees = await userModel.find({ role: "employee" })
        return res.status(200).json({ success: true, length: employees.length, employees })
    } catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
}

exports.getEmployeeById = async (req, res) => {
    try{
        return res.status(200).json({ success: true, employee: req.employee })
    }
    catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
} 

// get application by status: pending | rejected | approved
exports.getApplicationsByStatus = async (req, res) => {
    try {
        const { status } = req.params
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
    } catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
   
     
}

// get visaEmplyees, if status===all, return all visa-employees, 
// if status === inprogress, return inprogress F1 employees
exports.getVisaEmployees = async (req, res) => {
    try {
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
        return res.status(200).json({ success: true, employeeType, length: visaEmplyees.length, visaEmplyees })
    } catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
}  

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body
          
        if (status !== "pending") {
            return res.status(400).json({success: false, message:"You can't update this application status."})
        }
        if (!["rejected","approved"].includes(status)) {
            return res.status(400).json({success: false, message:"Invaild status, only rejected or approved."})
        } 
        const employee = req.employee // from findEmplyeeById middleware
        await userModel.updateOne({ _id: employee._id }, { applicationStatus: status })  

        return res.status(200).json({ success: true, applicationStatus: status, message: "updated!" })
    } catch (err) {
        return res.status(500).json({success: false, message:"Something went wrong.",err} )
    }
}

exports.updateApplicationRejectedFeedback = async (req, res) => {
    try {
        const { feedback } = req.body
        if (!feedback) {
            return res.status(400).json({success: false, message:"Please provide feedback for this application."})
        }
        const employee = req.employee // from findEmplyeeById middleware
        await userModel.updateOne({ _id: employee._id }, { applicationRejectedFeedback: feedback })
        return res.status(200).json({ success: true, feedback, message: "updated!" })
    } catch (err) {
    return res.status(500).json({ success: false,message: "Something went wrong", err });
  }
    
}

exports.updateVisaAuthStatus = async (req, res) => {
    try {
        const employee = req.employee // from findEmplyeeById middleware
        
    } catch (err) {
        return res.status(500).json({ success: false,message: "Something went wrong", err });
  }
}



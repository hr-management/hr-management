const userModel = require('../models/User');
const { ObjectId } = require('mongodb');

const userOnboarding = async (req, res) => {
    const status = req.tokenUser.applicationStatus;
    if (status === "notStarted" || status === "rejected") {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: req.tokenUser._id },
                { ...req.body, applicationStatus: "pending" },
                { new: true }
            );
            res.status(200).json({ success: true, user: updatedUser });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    } else if (status === "pending") {
        const id = req.tokenUser._id;
        const user = await userModel.findOne({ _id: new ObjectId(id) });
        res.status(400).json({ message: "Please wait for HR to review your application", user: user });
    } else {
        // approved
        res.status(200).json({ success: true })
    }
};

const userVisaUpload = async (req, res) => {
    const file = req.body.file;
    const visa_order = ['OPT_Receipt', 'OPT_EAD', 'I-983', 'I-20'];
    const workAuthDoc = req.tokenUser.workAuthDoc;

    if (workAuthDoc.legnth === 4) {
        return res.status(400).json({ message: "All documents have been approved", success: false });
    }
    const { status, type } = workAuthDoc[workAuthDoc.length - 1];
    if (status === 'rejected') {
        // update
        const updateDoc = { status: 'submitted', file, type, feedback: '' };
        const result = await userModel.findOneAndUpdate(
            { _id: req.tokenUser._id, workAuthDoc: { $elemMatch: { type } } },
            { $set: { 'workAuthDoc.$': updateDoc } },
        );
        return res.status(200).json({ success: true, data: result });
    } else if (status === 'approved') {
        // create
        const newAuthDoc = { status: 'submitted', file, type: visa_order[workAuthDoc.length], feedback: '' };
        const result = await userModel.findOneAndUpdate(
            { _id: req.tokenUser._id },
            { $push: { workAuthDoc: newAuthDoc } },
        );
        return res.status(200).json({ success: true, data: result });
    } else {
        return res.status(400).json({ message: "Waiting for HR to approve", success: false });
    }
}

const getUserInfoById = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a request parameter
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getUsersByHouseId = async (req, res) => {
    try {
        const houseId = req.params.houseId;  // Get houseId from request parameters
        console.log('houseId:', houseId, 'User:', userModel);
        const users = await userModel.find({ 'assignedHouse._id': houseId });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    userOnboarding,
    userVisaUpload,
    getUserInfoById,
    getUsersByHouseId
};

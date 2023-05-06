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

module.exports = {
    userOnboarding
};

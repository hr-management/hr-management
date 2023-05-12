const Housing = require("../models/housing");

// Create a new house
exports.createHouse = async (req, res) => {
  try {
    const newHouse = await Housing.create(req.body);
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View existing houses
exports.getHouses = async (req, res) => {
  try {
    const houses = await Housing.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View house details
exports.getHouseDetails = async (req, res) => {
  try {
    const house = await Housing.findById(req.params.houseId);
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a house
exports.deleteHouse = async (req, res) => {
  try {
    const house = await Housing.findByIdAndDelete(req.params.houseId);
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }
    res.status(200).json({ message: "House deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getting housing details
exports.getHousingDetails = async (req, res) => {
  try {
    const housingDetails = await Housing.find({}, { address: 1, roommates: 1 });
    res.status(200).json(housingDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// creating a new facility report
exports.createReport = async (req, res) => {
  try {
    const housing = await Housing.findById(req.body.housingId);
    if (!housing) {
      return res.status(404).json({ error: "Housing not found" });
    }
    const report = {
      title: req.body.title,
      description: req.body.description,
      createdBy: req.body.createdBy,
      comments: [],
    };
    housing.reports.push(report);
    await housing.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getting all facility reports
exports.getReports = async (req, res) => {
  try {
    const housing = await Housing.find();
    const reports = housing.map((h) => h.reports).flat();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getting a specific facility report
exports.getReportById = async (req, res) => {
  try {
    const housing = await Housing.findOne(
      { "reports._id": req.params.reportId },
      { "reports.$": 1 }
    );
    if (!housing) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(housing.reports[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// getting all comments on a specific facility report
exports.getReportComments = async (req, res) => {
  try {
    const housing = await Housing.findOne(
      { "reports._id": req.params.reportId },
      { "reports.$": 1 }
    );
    if (!housing) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(housing.reports[0].comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// adding a comment to a specific facility report
exports.addReportComment = async (req, res) => {
  try {
    if (!req.body.description || !req.body.createdBy) {
      return res
        .status(400)
        .json({ error: "Both description and createdBy are required" });
    }

    const housing = await Housing.findOne(
      { "reports._id": req.params.reportId },
      { "reports.$": 1 }
    );
    if (!housing) {
      return res.status(404).json({ error: "Report not found" });
    }

    const report = housing.reports[0];

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const comment = {
      description: req.body.description,
      createdBy: req.body.createdBy,
    };
    await Housing.updateOne(
      { "reports._id": req.params.reportId },
      { $push: { "reports.$.comments": comment } }
    );    
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// updating a comment on a specific facility report
exports.updateReportComment = async (req, res) => {
  try {
    const result = await Housing.updateOne(
      { "reports._id": req.params.reportId },
      { $set: { "reports.$.comments.$[comment].description": req.body.description } },
      { arrayFilters: [{ "comment._id": req.params.commentId }] }
    );

    if (result.n === 0) {
      return res.status(404).json({ error: "Report or comment not found" });
    }

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


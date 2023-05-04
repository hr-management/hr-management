const Housing = require("../models/housing");

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
    const housing = await Housing.findOne(
      { "reports._id": req.params.reportId },
      { "reports.$": 1 }
    );
    if (!housing) {
      return res.status(404).json({ error: "Report not found" });
    }
    res
      .status(200)
      .json({req: req.body.description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.addReportComment = async (req, res) => {
//   try {
//     const description = req.body.createdBy;
//     // if (!req.body.description || !req.body.createdBy) {
//     //   return res
//     //     .status(400)
//     //     .json({ error: "Both description and createdBy are required" });
//     // }

//     // const housing = await Housing.findOne(
//     //     { "reports._id": req.params.reportId },
//     //     { "reports.$": 1 }
//     //   );
//     //   if (!housing) {
//     //     return res.status(404).json({ error: "Report not found" });
//     //   }

//     // const report = housing.reports[0].comments;

//     // if (!report) {
//     //   return res.status(404).json({ error: "Report not found" });
//     // }

//     // const comment = {
//     //   description: req.body.description,
//     //   createdBy: req.body.createdBy,
//     // };
//     // report.comments.push(comment);
//     // await housing.save();
//     // res.status(201).json(comment);
//     res.status(200).json(description);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// updating a comment on a specific facility report
exports.updateReportComment = async (req, res) => {
  try {
    const housing = await Housing.findOne({
      "reports._id": req.params.reportId,
    });
    if (!housing) {
      return res.status(404).json({ error: "Report not found" });
    }

    const report = housing.reports.id(req.params.reportId);
    const comment = report.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.description = req.body.description || comment.description;
    await housing.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

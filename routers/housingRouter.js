const express = require('express');
const housingController = require('../controllers/housingController');

const router = express.Router();

// Create a new house
router.post('/', housingController.createHouse);

// View existing houses
router.get('/', housingController.getHouses);

// View house details
router.get('/house-details', housingController.getHousingDetails);

// Delete a house
router.delete('/:houseId', housingController.deleteHouse);

// Move these route definitions below the `/house-details` route
router.get('/:houseId', housingController.getHouseDetails);
router.post('/facility-reports', housingController.createReport);
router.get('/facility-reports/:reportId', housingController.getReportById);
router.get('/facility-reports/:reportId/comments', housingController.getReportComments);
router.post('/facility-reports/:reportId/comments', housingController.addReportComment);
router.put('/facility-reports/:reportId/comments/:commentId', housingController.updateReportComment);

module.exports = router;

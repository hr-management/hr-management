const express = require('express');
const housingController = require('../controllers/housingController');

const Router = express.Router();

// Create a new house
Router.post('/', housingController.createHouse);

// View existing houses
Router.get('/', housingController.getHouses);

// View house details
Router.get('/:houseId', housingController.getHouseDetails);

// Delete a house
Router.delete('/:houseId', housingController.deleteHouse);

Router.get('/house-details', housingController.getHousingDetails);

Router.post('/facility-reports', housingController.createReport);
Router.get('/facility-reports', housingController.getReports);
Router.get('/facility-reports/:reportId', housingController.getReportById);
Router.get('/facility-reports/:reportId/comments', housingController.getReportComments);
Router.post('/facility-reports/:reportId/comments', housingController.addReportComment);
Router.put('/facility-reports/:reportId/comments/:commentId', housingController.updateReportComment);

module.exports = Router;

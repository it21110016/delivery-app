const {
    createLocation,
    getLocations,
    getCost
} = require('../controllers/locationController');

// import express module
const express = require('express');

// create router object
const router = express.Router();

router.post('/', createLocation);

router.get('/', getLocations);

router.get('/delivery-cost/:postalCode', getCost);

module.exports = router;
const {
    createLocation,
    getCost
} = require('../controllers/locationController');

const express = require('express');

const router = express.Router();

router.post('/', createLocation);

router.post('/delivery-cost', getCost);

module.exports = router;
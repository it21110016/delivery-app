const Location = require('../models/locations');

// Create new location
const createLocation = async (req, res) => {
    try {
        const newLocation = new Location(req.body);
        const savedLocation = await newLocation.save();
        res.status(201).json(savedLocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all locations
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get delivery cost by postal code
const getCost = async (req, res) => {
    try {
        const { postalCode } = req.params;
        const locations = await Location.find({
            'cities.suburbs.postalCodes.list': postalCode
        });
        res.status(200).json(locations);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createLocation,
    getLocations,
    getCost
};
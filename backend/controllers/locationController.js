const Location = require('../models/locations');

const postalCodeValidator = function(postalCodeType, value) {
    if (postalCodeType === 'Single') {
      return /^\d{4}$/.test(value);
    } else if (postalCodeType === 'Range') {
      return /^\d{4}-\d{4}$/.test(value);
    } else if (postalCodeType === 'List') {
      return /^(\d{4})(,\s?\d{4})*$/.test(value);
    } else {
      return false;
    }
  };
  
  const createLocation = async (req, res) => {
      try {
          const { cities } = req.body;
  
          // Validate postal codes
          for (const city of cities) {
              for (const suburb of city.suburbs) {
                  const { postalCodeType, postalCodes } = suburb;
                  if (!postalCodeValidator(postalCodeType, postalCodes)) {
                      return res.status(400).json({ 
                          message: `${postalCodes} is not a valid postal code for type ${postalCodeType}` 
                      });
                  }
              }
          }
  
          const newLocation = new Location(req.body);
          const savedLocation = await newLocation.save();
          res.status(201).json(savedLocation);
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  };

// Get delivery cost by postal code
const getCost = async (req, res) => {
    try {
        const { postalCodes } = req.body;

        if (!postalCodes) {
            return res.status(400).json({ message: 'Postal code is required.' });
        }

        const location = await Location.findOne({
            "cities.suburbs.postalCodes": postalCodes
        });

        if (!location) {
            return res.status(404).json({ message: "Postal code not found" });
        }

        const suburb = location.cities
            .flatMap(city => city.suburbs)
            .find(suburb => suburb.postalCodes === postalCodes);

        if (!suburb) {
            return res.status(404).json({ message: "Suburb not found" });
        }

        return res.status(200).json(suburb.delivery_costs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createLocation,
    getCost
};
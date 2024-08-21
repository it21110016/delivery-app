const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LocationSchema = new mongoose.Schema({
  stateId: { type: String, default: uuidv4 },
  stateName: { type: String, required: true },
  cities: [
    {
      cityId: { type: String, default: uuidv4 },
      cityName: { type: String, required: true },
      suburbs: [
        {
          suburbId: { type: String, default: uuidv4 },
          suburbName: { type: String, required: true },
          state: { type: String, required: true },
          postalCodeType: { type: String, required: true, enum: ['Single', 'Range', 'List'] },
          postalCodes: {
            type: String,
            required: true,
          },
          delivery_costs: {
            thresholds: [
              {
                orderValue: { type: Number },
                cost: { type: Number },
              }
            ],
            above_threshold: { type: Number, default: 0.00 }
          },
          pickup_options: {
            thresholds: [
              {
                orderValue: { type: Number },
                cost: { type: Number },
              }
            ],
            above_threshold: { type: Number, default: 0.00 }
          }
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LocationSchema = new mongoose.Schema({
    stateId: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    cities: [
        {
            cityId: { type: String, default: uuidv4 },
            name: { type: String, required: true },
            suburbs: [
                {
                    suburbId: { type: String, default: uuidv4 },
                    name: { type: String, required: true },
                    state: { type: String, required: true },
                    postalCodes: {
                        type: Map,
                        of: String
                    },
                    delivery_costs: {
                        type: Map,
                        of: new mongoose.Schema({
                            thresholds: {
                                type: Map,
                                of: Number
                            },
                            above_threshold: { type: Number, default: 0.00 }
                        })
                    },
                    pickup_options: {
                        thresholds: {
                            type: Map,
                            of: Number
                        },
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

const mongoose = require('mongoose');

// Define the schema
const PlanSchema = new mongoose.Schema({
    duration: {
    days: {type: Number, required: true},
    hours: {type: Number, required: true},
    },
    coins: {type: Number, required: true},
    details: {type: String, required: true},
    speed: {type: String, required: true},
});

const PlansModel = mongoose.model('plan', PlanSchema);

module.exports = PlansModel;
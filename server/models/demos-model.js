const mongoose = require('mongoose');

const DemosSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
  });
  
  // Create the model from the schema
  const DemoModel = mongoose.model('demo', DemosSchema);

  module.exports = DemoModel;
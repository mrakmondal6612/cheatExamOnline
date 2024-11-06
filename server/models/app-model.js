const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    version: {
      type: String,
      required: true
    },
    release_date: {
      type: String,
      required: true
    },
    download_link: {
      type: String,
      default: ''
    },
    features: {
      type: [String],
      required: true
    }
  });
  
  // Create the model from the schema
  const Version = mongoose.model('Version', versionSchema);

  module.exports = Version;
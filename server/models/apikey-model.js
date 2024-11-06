const mongoose = require('mongoose');
const moment = require('moment');

// Define the schema
const keySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index on this field
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  speed: {
    type: String,
    require: true
  }
});

// Virtual field to calculate time left until expiration
keySchema.virtual('timeLeft').get(function () {
  const now = moment();
  const expirationDate = moment(this.expireAt);
  const duration = moment.duration(expirationDate.diff(now));

  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours()) % 24;
  const minutes = Math.floor(duration.asMinutes()) % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes`;
});

// Ensure virtual fields are serialized when converting to JSON
keySchema.set('toJSON', { virtuals: true });

// Create the model
const KeyModel = mongoose.model('Key', keySchema);

module.exports = KeyModel;

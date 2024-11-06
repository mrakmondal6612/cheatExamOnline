const mongoose = require('mongoose');

// Define the schema
const PaymentSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    require: true
  }
});



// Create the model
const PaymentModel = mongoose.model('payment', PaymentSchema);

module.exports = PaymentModel;

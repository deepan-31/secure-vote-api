const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true // aadharNumber must be unique for all users
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: function(phoneNumber) {
            // Phone number must be a valid 10-digit phone number
            const regex = /^\d{10}$/;
            return regex.test(phoneNumber);
          },
          message: props => `${props.value} is not a valid phone number. Phone number must be a valid 10-digit phone number.`
        }
      },
      
      party: {
        type: String,
        required: true,
        unique: true // party name should be different for all candidates
      },
      partyLogoUrl: {
        type: String,
        required: true
      }
  });
  

module.exports = mongoose.model('candidates',candidateSchema)
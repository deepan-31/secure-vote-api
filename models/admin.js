const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true // employee id must be unique for all admins
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (phoneNumber) {
        // Phone number must be a valid 10-digit phone number
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
      },
      message: props => `${props.value} is not a valid phone number. Phone number must be a valid 10-digit phone number.`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        // Password must contain at least one uppercase letter, one lowercase letter,
        // one number, and one special character, and be at least 8 characters long
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        return regex.test(password);
      },
      message: props => `${props.value} is not a valid password. Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.`
    }
  }
});


module.exports = mongoose.model('admins', adminSchema)
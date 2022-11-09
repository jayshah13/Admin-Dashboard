const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema & model
const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name field is required']
    },
    mobile: {
        type: Number,
        require: [true, 'Mobile number is required']
    },
   password: {
        type: String,
        require: [true, 'Password is required']
   },
   Address: {
    type: String,
    require: [true, 'Address is required']
   },
   Email: {
    type: String,
    require: [true, 'Email is required']
   }
});

const User = mongoose.model('customer',UserSchema);

module.exports = User;
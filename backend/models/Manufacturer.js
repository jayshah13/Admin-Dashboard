const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create manufacturer schema & model
const ManufacturerSchema = new Schema({   
        name: {
            type: String,
            require: [true, 'Name field is required']
        },
        contact_details: [{
            mobile: {
                type: Number,
                require: [true, 'Mobile number is required']
            },
            email: {
                type: String,
                require: [true, 'Email is required']
            },
        }],
        address: {
            type: String,
            require: [true, 'Address is required']
        },
        pincode: {
            type: Number,
            require: [true, 'Pincode is required']
        }
      

});

const Manufacturer = mongoose.model('Manufacturer',ManufacturerSchema);

module.exports = Manufacturer;
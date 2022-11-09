const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema & model
const PaymentSchema = new Schema({
    
    User_id: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'User ID is required']
    },
    Payment_Reference_id: {
        type: String,
        unique: true,
        required: [true, 'Payment Reference is required']
    },
    Order_id: {
        type:Schema.Types.ObjectId,
        ref:'Order',
        required: [true, 'Order id is required']
    },
    Amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    Date: {
        type: Date,
        required: [true, 'Date is required'],
        default:Date.now
    }

        
});

const Payment = mongoose.model('payment',PaymentSchema);

module.exports = Payment;